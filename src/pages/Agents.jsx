import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import AgentSelector from '../components/agents/AgentSelector'
import ChatPanel from '../components/agents/ChatPanel'
import MemoryPanel from '../components/agents/MemoryPanel'

const API = 'https://agents-api.mattcorwin.dev'

export default function Agents() {
  const [agents, setAgents] = useState([])
  const [agentsLoading, setAgentsLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  const [selectedAgent, setSelectedAgent] = useState('max')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [rateLimited, setRateLimited] = useState(false)

  const [memoryData, setMemoryData] = useState(null)
  const [memoryLoading, setMemoryLoading] = useState(false)

  const [memoryOpen, setMemoryOpen] = useState(false) // mobile toggle

  // Check API and load agents
  useEffect(() => {
    async function init() {
      try {
        const ping = await fetch(`${API}/ping`)
        if (!ping.ok) throw new Error('offline')
        const res = await fetch(`${API}/agents`)
        const data = await res.json()
        setAgents(data.agents || [])
      } catch {
        setOffline(true)
      } finally {
        setAgentsLoading(false)
      }
    }
    init()
  }, [])

  // Load agent status when agent changes (pre-populate memory panel)
  useEffect(() => {
    if (offline) return
    setMessages([])
    setMemoryData(null)
    setMemoryLoading(true)
    fetch(`${API}/agents/${selectedAgent}/status`)
      .then(r => r.json())
      .then(data => {
        setMemoryData({
          semantic_hits: [],
          core_memories: [],
          procedural: [],
          shared_memories: [],
          affect: data.affect,
          q_values: null,
          graph_context: null,
          self_narrative: data.self_narrative,
          goals: data.goals,
          stats: data.stats,
        })
      })
      .catch(() => {})
      .finally(() => setMemoryLoading(false))
  }, [selectedAgent, offline])

  const handleSend = useCallback(async (text) => {
    const history = messages.slice(-4).map(m => ({
      role: m.role,
      content: m.content,
    }))

    setMessages(prev => [...prev, { role: 'user', content: text }])
    setChatLoading(true)

    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent: selectedAgent, message: text, history }),
      })

      if (res.status === 429) {
        setRateLimited(true)
        setTimeout(() => setRateLimited(false), 30000)
        setMessages(prev => prev.slice(0, -1)) // remove optimistic user msg
        return
      }

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        agent: data.agent,
        agentDisplay: data.agent_display,
      }])
      setMemoryData(data.memories_used)
      setMemoryOpen(true) // auto-open on mobile after first response
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Something went wrong. The API may be temporarily unavailable.',
        agent: selectedAgent,
        agentDisplay: '',
      }])
    } finally {
      setChatLoading(false)
    }
  }, [messages, selectedAgent])

  return (
    <div className="min-h-screen bg-[#0a0a0f] font-mono flex flex-col">
      {/* Grid background */}
      <div className="fixed inset-0 opacity-[0.06] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 border-b border-cyan-500/20 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-1.5 text-xs ${offline ? 'text-red-400' : 'text-emerald-400'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${offline ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'}`} />
              {offline ? 'Demo offline' : 'Live'}
            </div>
            <a
              href="https://github.com/alanwatts07/drift-agents"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-cyan-400 transition-colors"
            >
              drift-agents ↗
            </a>
          </div>
        </div>
      </nav>

      {/* Offline banner */}
      {offline && (
        <div className="relative z-10 bg-red-500/10 border-b border-red-500/30 px-4 py-3 text-center text-sm text-red-400">
          The demo API is currently offline (runs on a local machine). Check back shortly or{' '}
          <a href="mailto:me@mattcorwin.dev" className="underline hover:text-red-300">reach out</a>.
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-1 max-w-7xl mx-auto w-full px-4 py-4 gap-4 min-h-0">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400">drift-agents</span>
            <span className="text-gray-500 font-normal text-sm">— live memory demo</span>
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">Chat with an agent and watch its memory system retrieve, rank, and surface relevant context in real time.</p>
        </div>

        {/* Agent Selector */}
        <AgentSelector
          agents={agents}
          selected={selectedAgent}
          onSelect={setSelectedAgent}
          loading={agentsLoading && !offline}
        />

        {/* Main split pane */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0" style={{ minHeight: '500px' }}>

          {/* Chat panel */}
          <div className="flex flex-col border border-dark-700 rounded-2xl overflow-hidden bg-dark-900/50 lg:w-1/2 min-h-[400px] lg:min-h-0">
            <div className="px-4 py-2 border-b border-dark-700 bg-dark-800/50 text-xs text-gray-500 flex items-center gap-2">
              <span className="text-cyan-400">◉</span> Chat
            </div>
            <div className="flex-1 min-h-0">
              <ChatPanel
                messages={messages}
                loading={chatLoading}
                rateLimited={rateLimited}
                onSend={handleSend}
                agentName={selectedAgent}
                input={input}
                setInput={setInput}
              />
            </div>
          </div>

          {/* Memory panel */}
          <div className="flex flex-col border border-cyan-500/20 rounded-2xl overflow-hidden bg-dark-900/50 lg:w-1/2 min-h-0">
            {/* Mobile toggle */}
            <button
              className="lg:hidden px-4 py-2 border-b border-cyan-500/20 bg-dark-800/50 text-xs text-cyan-400 flex items-center justify-between w-full"
              onClick={() => setMemoryOpen(o => !o)}
            >
              <span className="flex items-center gap-2"><span>🧠</span> Memory Panel</span>
              <span>{memoryOpen ? '▲ hide' : '▼ show'}</span>
            </button>

            <div className={`${memoryOpen ? 'flex' : 'hidden'} lg:flex flex-col flex-1 min-h-0`}>
              <div className="px-4 py-2 border-b border-cyan-500/20 bg-dark-800/50 text-xs text-cyan-400 hidden lg:flex items-center gap-2">
                <span>🧠</span> Memory Retrieval
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <MemoryPanel data={memoryData} loading={memoryLoading} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-600 pb-2">
          Powered by{' '}
          <a href="https://github.com/alanwatts07/drift-agents" target="_blank" rel="noopener noreferrer" className="text-cyan-500/60 hover:text-cyan-400 transition-colors">
            drift-memory
          </a>
          {' '}· pgvector · PostgreSQL · Claude API · 10 req/min rate limit
        </div>
      </div>
    </div>
  )
}
