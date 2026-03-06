import { useEffect, useRef } from 'react'

const AGENT_META = {
  max:     { emoji: '🚀' },
  beth:    { emoji: '🌿' },
  susan:   { emoji: '🎯' },
  debater: { emoji: '⚔️' },
  gerald:  { emoji: '📊' },
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-sm">
          {AGENT_META[msg.agent]?.emoji || '🤖'}
        </div>
      )}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        {!isUser && (
          <span className="text-xs text-cyan-400 font-medium">{msg.agentDisplay}</span>
        )}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-indigo-500/20 border border-indigo-500/30 text-white rounded-tr-sm'
            : 'bg-dark-800 border border-dark-700 text-gray-200 rounded-tl-sm'
        }`}>
          {msg.content}
        </div>
      </div>
    </div>
  )
}

function TypingIndicator({ agentName }) {
  const meta = AGENT_META[agentName] || { emoji: '🤖' }
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-sm">
        {meta.emoji}
      </div>
      <div className="bg-dark-800 border border-dark-700 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function ChatPanel({ messages, loading, rateLimited, onSend, agentName, input, setInput }) {
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || loading || rateLimited) return
    onSend(input.trim())
    setInput('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-12">
            <div className="text-4xl mb-3">{AGENT_META[agentName]?.emoji || '🤖'}</div>
            <p className="text-sm">Start a conversation.</p>
            <p className="text-xs mt-1 text-gray-600">The memory panel updates with every response.</p>
          </div>
        )}
        {messages.map((msg, i) => <Message key={i} msg={msg} />)}
        {loading && <TypingIndicator agentName={agentName} />}
        <div ref={bottomRef} />
      </div>

      {/* Rate limited banner */}
      {rateLimited && (
        <div className="mx-4 mb-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs text-center">
          Rate limited — try again in a moment
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-dark-700">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={rateLimited ? 'Rate limited...' : 'Type a message...'}
            disabled={loading || rateLimited}
            className="flex-1 bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading || rateLimited}
            className="px-4 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-dark-700 disabled:text-gray-600 text-black font-medium rounded-xl text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  )
}
