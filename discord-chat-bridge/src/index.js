import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { initDiscord } from './discordBot.js'
import { registerSocketHandlers } from './socketHandler.js'

const PORT = parseInt(process.env.PORT || '3001', 10)
const CORS_ORIGINS = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: CORS_ORIGINS,
    methods: ['GET', 'POST'],
  },
  pingInterval: 25000,
  pingTimeout: 20000,
})

// Health check endpoint
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'discord-chat-bridge' })
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() })
})

async function start() {
  try {
    // Initialize Discord bot (passes io so it can emit to sockets)
    await initDiscord(io)
    console.log('[Bridge] Discord bot connected')

    // Register Socket.IO event handlers
    registerSocketHandlers(io)
    console.log('[Bridge] Socket.IO handlers registered')

    httpServer.listen(PORT, () => {
      console.log(`[Bridge] Server listening on port ${PORT}`)
      console.log(`[Bridge] CORS origins: ${CORS_ORIGINS.join(', ')}`)
    })
  } catch (err) {
    console.error('[Bridge] Failed to start:', err)
    process.exit(1)
  }
}

start()
