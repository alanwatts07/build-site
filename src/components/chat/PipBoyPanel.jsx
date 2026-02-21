import { useState, useRef, useEffect } from 'react'
import PipBoyMessage from './PipBoyMessage'
import PipBoyNamePrompt from './PipBoyNamePrompt'

export default function PipBoyPanel({
  messages,
  handle,
  connected,
  error,
  onSendMessage,
  onJoin,
  onClose,
  storedHandle,
}) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when panel opens and handle is set
  useEffect(() => {
    if (handle) {
      inputRef.current?.focus()
    }
  }, [handle])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    onSendMessage(trimmed)
    setInput('')
  }

  return (
    <div className="pipboy-panel rounded-lg w-80 sm:w-96 h-[28rem] flex flex-col" style={{ zIndex: 50 }}>
      {/* ── Header ── */}
      <div className="relative z-20 flex items-center justify-between px-4 py-2 border-b border-[var(--pip-border)]">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connected ? 'bg-[var(--pip-green)]' : 'bg-red-500'
            }`}
            style={connected ? { boxShadow: '0 0 6px rgba(32,194,14,0.8)' } : {}}
          />
          <span className="pip-text text-base tracking-widest">VAULT-TEC COMM LINK</span>
        </div>
        <button
          onClick={onClose}
          className="pip-text text-xl leading-none hover:pip-text-bright transition-colors px-1"
          aria-label="Minimize chat"
        >
          _
        </button>
      </div>

      {/* ── Body ── */}
      <div className="relative z-20 flex-1 overflow-hidden flex flex-col">
        {!handle ? (
          <PipBoyNamePrompt onSubmit={onJoin} storedHandle={storedHandle} />
        ) : (
          <>
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto pip-scrollbar py-2">
              {messages.length === 0 && (
                <div className="px-3 py-4 pip-text-dim text-base">
                  <p>{'>'} UPLINK ACTIVE — TYPE TO TRANSMIT</p>
                  <p>{'>'} MESSAGES RELAY TO OPERATOR</p>
                </div>
              )}
              {messages.map((msg) => (
                <PipBoyMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Error banner */}
            {error && (
              <div className="px-3 py-1.5 text-sm border-t border-red-900/50" style={{ color: '#ff4444' }}>
                [ERROR] {error}
              </div>
            )}

            {/* Input area */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[var(--pip-border)] px-3 py-2 flex items-center gap-1"
            >
              <span className="pip-text text-lg shrink-0">{'>'}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="..."
                className="pip-input flex-1 text-lg"
              />
              <button
                type="submit"
                disabled={!input.trim() || !connected}
                className="pip-text text-base px-2 py-1 border border-[var(--pip-border)] hover:border-[var(--pip-green)] hover:bg-[var(--pip-green)]/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
              >
                TX
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
