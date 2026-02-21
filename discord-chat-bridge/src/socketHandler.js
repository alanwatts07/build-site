import { v4 as uuidv4 } from 'uuid'
import { sanitizeMessage, sanitizeHandle } from './sanitize.js'
import { checkMessageRate, checkSessionRate, clearSocketBucket } from './rateLimiter.js'
import {
  createSession,
  getSession,
  updateSocketId,
  addMessage,
  startDisconnectTimer,
  getSessionBySocketId,
  getActiveSessionCount,
} from './sessionStore.js'
import { createThread, sendToThread } from './discordBot.js'

const MAX_CONNECTIONS = 50

export function registerSocketHandlers(io) {
  io.use((socket, next) => {
    if (getActiveSessionCount() >= MAX_CONNECTIONS && !socket.handshake.auth.sessionId) {
      return next(new Error('Server is at capacity. Please try again later.'))
    }
    next()
  })

  io.on('connection', (socket) => {
    const ip =
      socket.handshake.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      socket.handshake.address

    console.log(`[Socket] Connected: ${socket.id} from ${ip}`)

    // --- JOIN ---
    socket.on('join', async ({ handle: rawHandle, sessionId: existingSessionId }) => {
      try {
        // Reconnect to existing session
        if (existingSessionId) {
          const existing = getSession(existingSessionId)
          if (existing) {
            updateSocketId(existingSessionId, socket.id)
            socket.emit('session', {
              sessionId: existingSessionId,
              handle: existing.handle,
              history: existing.messages,
            })
            console.log(`[Socket] Reconnected session ${existingSessionId}`)
            return
          }
        }

        // New session
        const handle = sanitizeHandle(rawHandle)
        if (!handle) {
          socket.emit('error_msg', { message: 'Invalid handle. Use letters, numbers, _ - . (1-24 chars).' })
          return
        }

        if (!checkSessionRate(ip)) {
          socket.emit('error_msg', { message: 'Session limit reached. Please try again later.' })
          return
        }

        const sessionId = uuidv4()
        const threadId = await createThread(handle)
        createSession(sessionId, { handle, threadId })
        updateSocketId(sessionId, socket.id)

        socket.emit('session', {
          sessionId,
          handle,
          history: [],
        })

        console.log(`[Socket] New session ${sessionId} for ${handle}`)
      } catch (err) {
        console.error('[Socket] Join error:', err)
        socket.emit('error_msg', { message: 'Failed to start session. Please try again.' })
      }
    })

    // --- MESSAGE ---
    socket.on('message', async ({ sessionId, text: rawText }) => {
      try {
        const session = getSession(sessionId)
        if (!session) {
          socket.emit('error_msg', { message: 'Session expired. Please refresh and reconnect.' })
          return
        }

        if (!checkMessageRate(socket.id)) {
          socket.emit('error_msg', { message: 'Slow down! Max 10 messages per minute.' })
          return
        }

        const text = sanitizeMessage(rawText)
        if (!text) return

        const msg = {
          id: uuidv4(),
          sender: 'visitor',
          displayName: session.handle,
          text,
          timestamp: Date.now(),
        }

        addMessage(sessionId, msg)
        socket.emit('message', msg)

        await sendToThread(session.threadId, session.handle, text)
      } catch (err) {
        console.error('[Socket] Message error:', err)
        socket.emit('error_msg', { message: 'Failed to send message.' })
      }
    })

    // --- TYPING ---
    socket.on('typing', ({ sessionId }) => {
      // Could relay typing indicators to Discord if desired
    })

    // --- DISCONNECT ---
    socket.on('disconnect', () => {
      console.log(`[Socket] Disconnected: ${socket.id}`)
      clearSocketBucket(socket.id)

      const sessionId = getSessionBySocketId(socket.id)
      if (sessionId) {
        startDisconnectTimer(sessionId)
        console.log(`[Socket] Session ${sessionId} disconnect timer started`)
      }
    })
  })
}
