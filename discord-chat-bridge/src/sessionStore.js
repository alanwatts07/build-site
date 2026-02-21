const sessions = new Map()

const TTL = parseInt(process.env.SESSION_TTL_MINUTES || '30', 10) * 60_000

export function createSession(sessionId, { handle, threadId }) {
  sessions.set(sessionId, {
    handle,
    threadId,
    socketId: null,
    messages: [],
    createdAt: Date.now(),
    lastActivity: Date.now(),
    disconnectTimer: null,
  })
  return sessions.get(sessionId)
}

export function getSession(sessionId) {
  return sessions.get(sessionId) || null
}

export function getSessionByThreadId(threadId) {
  for (const [sessionId, session] of sessions) {
    if (session.threadId === threadId) {
      return { sessionId, ...session }
    }
  }
  return null
}

export function updateSocketId(sessionId, socketId) {
  const session = sessions.get(sessionId)
  if (!session) return null
  session.socketId = socketId
  session.lastActivity = Date.now()

  // Clear any pending disconnect timer
  if (session.disconnectTimer) {
    clearTimeout(session.disconnectTimer)
    session.disconnectTimer = null
  }

  return session
}

export function addMessage(sessionId, message) {
  const session = sessions.get(sessionId)
  if (!session) return
  session.messages.push(message)
  session.lastActivity = Date.now()
}

export function startDisconnectTimer(sessionId) {
  const session = sessions.get(sessionId)
  if (!session) return

  session.socketId = null
  session.disconnectTimer = setTimeout(() => {
    sessions.delete(sessionId)
  }, TTL)
}

export function getSessionBySocketId(socketId) {
  for (const [sessionId, session] of sessions) {
    if (session.socketId === socketId) {
      return sessionId
    }
  }
  return null
}

export function getActiveSessionCount() {
  return sessions.size
}

// Periodic cleanup of expired sessions
setInterval(() => {
  const now = Date.now()
  for (const [id, session] of sessions) {
    if (now - session.lastActivity > TTL && !session.socketId) {
      if (session.disconnectTimer) clearTimeout(session.disconnectTimer)
      sessions.delete(id)
    }
  }
}, 60_000)
