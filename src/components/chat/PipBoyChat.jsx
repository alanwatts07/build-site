import { useState, useEffect } from 'react'
import useChatSocket from './useChatSocket'
import PipBoyPanel from './PipBoyPanel'
import './chatStyles.css'

export default function PipBoyChat() {
  const [open, setOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)
  const {
    connected,
    sessionId,
    handle,
    messages,
    error,
    join,
    sendMessage,
    storedHandle,
  } = useChatSocket()

  // Track unread messages when panel is closed
  useEffect(() => {
    if (!open && messages.length > 0) {
      const last = messages[messages.length - 1]
      if (last.sender === 'agent') {
        setHasUnread(true)
      }
    }
  }, [messages, open])

  const handleOpen = () => {
    setOpen(true)
    setHasUnread(false)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <PipBoyPanel
          messages={messages}
          handle={handle}
          connected={connected}
          error={error}
          onSendMessage={sendMessage}
          onJoin={join}
          onClose={() => setOpen(false)}
          storedHandle={storedHandle}
        />
      )}

      {/* Floating bubble */}
      {!open && (
        <button
          onClick={handleOpen}
          className={`pipboy-bubble w-14 h-14 rounded-full flex items-center justify-center ${
            hasUnread ? 'pipboy-bubble--unread' : ''
          }`}
          aria-label="Open chat"
        >
          <span
            className="pip-text text-xl font-bold leading-none"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            {'>_'}
          </span>
        </button>
      )}
    </div>
  )
}
