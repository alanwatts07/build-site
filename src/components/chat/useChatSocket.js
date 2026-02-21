import { useState, useEffect, useCallback, useRef } from 'react'
import { io } from 'socket.io-client'

const SERVER_URL = import.meta.env.VITE_CHAT_SERVER_URL || 'http://localhost:3001'
const SESSION_KEY = 'pipboy_session_id'
const HANDLE_KEY = 'pipboy_handle'

export default function useChatSocket() {
  const [connected, setConnected] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [handle, setHandle] = useState(null)
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)
  const socketRef = useRef(null)

  // Initialize socket connection
  useEffect(() => {
    const existingSession = sessionStorage.getItem(SESSION_KEY)

    const socket = io(SERVER_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      auth: { sessionId: existingSession },
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      setError(null)

      // Auto-rejoin if we have an existing session
      if (existingSession) {
        socket.emit('join', { sessionId: existingSession })
      }
    })

    socket.on('disconnect', () => {
      setConnected(false)
    })

    socket.on('connect_error', (err) => {
      setConnected(false)
      setError(err.message)
    })

    socket.on('session', ({ sessionId: sid, handle: h, history }) => {
      setSessionId(sid)
      setHandle(h)
      setMessages(history || [])
      sessionStorage.setItem(SESSION_KEY, sid)
      if (h) sessionStorage.setItem(HANDLE_KEY, h)
    })

    socket.on('message', (msg) => {
      setMessages((prev) => {
        // Prevent duplicate messages
        if (prev.some((m) => m.id === msg.id)) return prev
        return [...prev, msg]
      })
    })

    socket.on('error_msg', ({ message }) => {
      setError(message)
      // Auto-clear error after 5s
      setTimeout(() => setError(null), 5000)
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  const join = useCallback((chosenHandle) => {
    const socket = socketRef.current
    if (!socket) return
    socket.emit('join', { handle: chosenHandle })
  }, [])

  const sendMessage = useCallback(
    (text) => {
      const socket = socketRef.current
      if (!socket || !sessionId) return
      socket.emit('message', { sessionId, text })
    },
    [sessionId]
  )

  const resetSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(HANDLE_KEY)
    setSessionId(null)
    setHandle(null)
    setMessages([])
  }, [])

  return {
    connected,
    sessionId,
    handle,
    messages,
    error,
    join,
    sendMessage,
    resetSession,
    storedHandle: sessionStorage.getItem(HANDLE_KEY),
  }
}
