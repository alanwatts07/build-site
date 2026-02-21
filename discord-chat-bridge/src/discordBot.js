/**
 * Discord REST API client — no gateway connection.
 *
 * Flow:
 * 1. Visitor sends first message → Terrance auto-replies once (secretary)
 *    using Claude Sonnet with Terrance's personality, contextual to what
 *    the visitor said. Falls back to canned greeting if API fails.
 * 2. Bridge DMs Matt: "someone's on the chat, go check it out"
 * 3. Matt replies in Discord thread → relayed to visitor in real-time
 * 4. Terrance stays out after the initial greeting
 */

import { getSessionByThreadId, addMessage } from './sessionStore.js'

const API = 'https://discord.com/api/v10'
const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages'

let botToken = null
let botUserId = null
let parentChannelId = null
let ownerUserId = null
let webhookId = null
let webhookToken = null
let anthropicKey = null
let io = null

// Display name overrides: Discord user ID → name shown to visitor
const DISPLAY_NAME_MAP = {}

// Track last-seen message per thread for polling
const threadCursors = new Map()

// Track webhook message IDs so we don't echo visitor messages back
const webhookMessageIds = new Set()

// Track which threads have already sent the secretary greeting
const greetedThreads = new Set()

const TERRANCE_SYSTEM_PROMPT = `You are Terrance DeJour — a friendly, high-energy frat guy (Kappa Sigma Alpha, '22) who works as a secretary/greeter on Matt Corwin's portfolio website (mattcorwin.dev). Matt is a Technical Product Architect who builds MVPs, data pipelines, and AI-powered tools.

Your job: When a visitor messages the chat widget, you reply ONCE — a warm, contextual greeting that acknowledges what they said, lets them know Matt will be right with them, and makes them feel welcome. You're enthusiastic but not fake. You talk like a real person — "bruh", "yo", etc.

Rules:
- ONE message only. Keep it 1-3 sentences max.
- Acknowledge what the visitor actually said/asked.
- Let them know Matt is being notified and will jump in shortly.
- Be yourself — Terrance energy. Not corporate, not robotic.
- If they mention hiring, jobs, or recruiting: be extra welcoming, mention Matt ships fast.
- If they mention a specific project: show genuine excitement.
- If they're just saying hi: match their energy, keep it chill.
- NEVER pretend to be Matt. You're Terrance, the greeter.
- Do NOT use emojis excessively. One max.`

const FALLBACK_GREETINGS = [
  "YO! Welcome to Matt's site! He's around here somewhere — lemme go grab him real quick. Hang tight!",
  "Hey hey! You've reached Matt's corner of the internet. Let me go poke him for you — one sec!",
  "BRO welcome! Matt's probably elbow-deep in some code right now but I'll get him. Sit tight!",
]

// ── Helpers ──

function headers() {
  return {
    Authorization: `Bot ${botToken}`,
    'Content-Type': 'application/json',
  }
}

async function api(method, path, body) {
  const opts = { method, headers: headers() }
  if (body) opts.body = JSON.stringify(body)

  const res = await fetch(`${API}${path}`, opts)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Discord API ${method} ${path}: ${res.status} ${text}`)
  }

  if (res.status === 204) return null
  return res.json()
}

// ── Terrance AI greeting ──

async function generateTerranceGreeting(visitorHandle, visitorMessage) {
  if (!anthropicKey) {
    return pickFallback()
  }

  try {
    const res = await fetch(ANTHROPIC_API, {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 200,
        system: TERRANCE_SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Visitor "${visitorHandle}" just opened the chat on Matt's portfolio site and said:\n\n"${visitorMessage}"\n\nGive your one-time Terrance greeting.`,
          },
        ],
      }),
    })

    if (!res.ok) {
      console.error('[Terrance] Anthropic API error:', res.status, await res.text())
      return ollamaFallback(visitorHandle, visitorMessage)
    }

    const data = await res.json()
    const text = data.content?.[0]?.text?.trim()
    return text || ollamaFallback(visitorHandle, visitorMessage)
  } catch (err) {
    console.error('[Terrance] Anthropic failed:', err.message)
    return ollamaFallback(visitorHandle, visitorMessage)
  }
}

async function ollamaFallback(visitorHandle, visitorMessage) {
  const ollamaUrl = process.env.OLLAMA_URL
  const ollamaModel = process.env.OLLAMA_MODEL
  if (!ollamaUrl || !ollamaModel) return pickCanned()

  try {
    console.log('[Terrance] Trying Ollama fallback...')
    const res = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: ollamaModel,
        stream: false,
        messages: [
          { role: 'system', content: TERRANCE_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Visitor "${visitorHandle}" just opened the chat on Matt's portfolio site and said:\n\n"${visitorMessage}"\n\nGive your one-time Terrance greeting.`,
          },
        ],
      }),
    })

    if (!res.ok) {
      console.error('[Terrance] Ollama error:', res.status)
      return pickCanned()
    }

    const data = await res.json()
    const text = data.message?.content?.trim()
    return text || pickCanned()
  } catch (err) {
    console.error('[Terrance] Ollama failed:', err.message)
    return pickCanned()
  }
}

function pickCanned() {
  return FALLBACK_GREETINGS[Math.floor(Math.random() * FALLBACK_GREETINGS.length)]
}

// ── DM Matt ──

let ownerDmChannelId = null

async function ensureDmChannel() {
  if (ownerDmChannelId) return ownerDmChannelId
  const dm = await api('POST', '/users/@me/channels', {
    recipient_id: ownerUserId,
  })
  ownerDmChannelId = dm.id
  return ownerDmChannelId
}

async function dmMatt(handle, threadId, visitorMessage) {
  try {
    const dmChannel = await ensureDmChannel()
    const guildId = process.env.DISCORD_GUILD_ID || ''
    const threadUrl = guildId
      ? `https://discord.com/channels/${guildId}/${threadId}`
      : `Thread ID: ${threadId}`

    await api('POST', `/channels/${dmChannel}/messages`, {
      content: `🟢 **New web chat from "${handle}"** on mattcorwin.dev\n> ${visitorMessage}\n${threadUrl}`,
    })
    console.log(`[Discord] DM sent to Matt about ${handle}`)
  } catch (err) {
    console.error('[Discord] Failed to DM Matt:', err.message)
  }
}

// ── Webhook management ──

async function ensureWebhook() {
  const webhooks = await api('GET', `/channels/${parentChannelId}/webhooks`)
  const existing = webhooks.find((w) => w.name === 'Vault-Tec Relay' && w.user?.id === botUserId)

  if (existing) {
    webhookId = existing.id
    webhookToken = existing.token
    console.log(`[Discord] Reusing existing webhook ${webhookId}`)
    return
  }

  const wh = await api('POST', `/channels/${parentChannelId}/webhooks`, {
    name: 'Vault-Tec Relay',
  })
  webhookId = wh.id
  webhookToken = wh.token
  console.log(`[Discord] Created webhook ${webhookId}`)
}

async function sendViaWebhook(threadId, username, content) {
  const url = `${API}/webhooks/${webhookId}/${webhookToken}?thread_id=${threadId}&wait=true`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, username }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Webhook send failed: ${res.status} ${text}`)
  }

  const msg = await res.json()
  webhookMessageIds.add(msg.id)
  return msg
}

// ── Public API ──

export async function initDiscord(socketIo) {
  io = socketIo
  botToken = process.env.DISCORD_BOT_TOKEN
  parentChannelId = process.env.DISCORD_CHANNEL_ID
  ownerUserId = process.env.OWNER_DISCORD_ID
  anthropicKey = process.env.ANTHROPIC_API_KEY || null

  if (!botToken) throw new Error('DISCORD_BOT_TOKEN is required')
  if (!parentChannelId) throw new Error('DISCORD_CHANNEL_ID is required')
  if (!ownerUserId) throw new Error('OWNER_DISCORD_ID is required')

  if (anthropicKey) {
    console.log('[Terrance] Anthropic API key loaded — contextual greetings enabled')
  } else {
    console.log('[Terrance] No Anthropic key — using fallback greetings')
  }

  const me = await api('GET', '/users/@me')
  botUserId = me.id
  console.log(`[Discord] REST authenticated as ${me.username}#${me.discriminator} (${botUserId})`)

  const mapStr = process.env.DISPLAY_NAME_MAP || ''
  for (const entry of mapStr.split(',').filter(Boolean)) {
    const [id, ...rest] = entry.split(':')
    if (id && rest.length) DISPLAY_NAME_MAP[id.trim()] = rest.join(':').trim()
  }

  await ensureWebhook()
  startPolling()
}

export async function createThread(handle) {
  const date = new Date().toISOString().split('T')[0]

  const thread = await api('POST', `/channels/${parentChannelId}/threads`, {
    name: `[Web Chat] ${handle} - ${date}`,
    type: 11,
    auto_archive_duration: 60,
  })

  await api('POST', `/channels/${thread.id}/messages`, {
    content: `**New web chat session started**\nVisitor handle: **${handle}**\nReplies in this thread will be sent back to the visitor in real-time.`,
  })

  threadCursors.set(thread.id, thread.id)
  return thread.id
}

export async function sendToThread(threadId, handle, text) {
  // Post visitor message via webhook
  await sendViaWebhook(threadId, handle, text)

  // On FIRST visitor message: generate Terrance greeting + DM Matt
  if (!greetedThreads.has(threadId)) {
    greetedThreads.add(threadId)

    // Generate contextual greeting (async, don't block)
    generateTerranceGreeting(handle, text).then(async (greeting) => {
      const session = getSessionByThreadId(threadId)
      if (session) {
        const greetMsg = {
          id: `greeting-${threadId}`,
          sender: 'agent',
          displayName: 'Terrance',
          text: greeting,
          timestamp: Date.now(),
        }
        addMessage(session.sessionId, greetMsg)
        if (session.socketId) {
          io.to(session.socketId).emit('message', greetMsg)
        }
      }

      // Post greeting in Discord thread too
      await api('POST', `/channels/${threadId}/messages`, {
        content: `**Terrance (auto):** ${greeting}`,
      }).catch(() => {})
    })

    // DM Matt with the visitor's message + thread link
    dmMatt(handle, threadId, text)
  }
}

// ── Polling ──

const POLL_INTERVAL_MS = 1500

function startPolling() {
  setInterval(pollAllThreads, POLL_INTERVAL_MS)
  console.log(`[Discord] Polling active threads every ${POLL_INTERVAL_MS}ms`)
}

async function pollAllThreads() {
  for (const [threadId, cursor] of threadCursors) {
    const session = getSessionByThreadId(threadId)
    if (!session || !session.socketId) continue

    try {
      await pollThread(threadId, cursor, session)
    } catch (err) {
      if (err.message?.includes('404')) {
        threadCursors.delete(threadId)
      }
    }
  }
}

async function pollThread(threadId, afterMessageId, session) {
  const query = afterMessageId ? `?after=${afterMessageId}&limit=10` : '?limit=1'
  const messages = await api('GET', `/channels/${threadId}/messages${query}`)

  if (!messages || messages.length === 0) return

  const sorted = messages.reverse()

  for (const msg of sorted) {
    // Skip bot's own messages (welcome, greeting)
    if (msg.author.id === botUserId) continue

    // Skip webhook messages (visitor's own messages relayed in)
    if (webhookMessageIds.has(msg.id)) {
      webhookMessageIds.delete(msg.id)
      continue
    }
    if (msg.webhook_id === webhookId) continue

    const displayName =
      DISPLAY_NAME_MAP[msg.author.id] ||
      msg.author.global_name ||
      msg.author.username

    const relayMsg = {
      id: msg.id,
      sender: 'agent',
      displayName,
      text: msg.content,
      timestamp: new Date(msg.timestamp).getTime(),
    }

    addMessage(session.sessionId, relayMsg)

    if (session.socketId) {
      io.to(session.socketId).emit('message', relayMsg)
    }
  }

  threadCursors.set(threadId, sorted[sorted.length - 1].id)
}

// Cleanup
setInterval(() => {
  for (const [threadId] of threadCursors) {
    const session = getSessionByThreadId(threadId)
    if (!session) {
      threadCursors.delete(threadId)
      greetedThreads.delete(threadId)
    }
  }
  if (webhookMessageIds.size > 1000) webhookMessageIds.clear()
}, 60_000)

export function getClient() {
  return { botUserId }
}
