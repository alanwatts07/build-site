import { useState } from 'react'

// Known overrides — any agent NOT listed here gets auto-derived from API data
const AGENT_OVERRIDES = {
  max:         { emoji: '🚀', img: '/agents/max.png' },
  beth:        { emoji: '🌿', img: '/agents/bethanyfinkel.png' },
  susan:       { emoji: '🎯', img: '/agents/susan.png' },
  debater:     { emoji: '⚔️',  img: '/agents/debator.png' },
  gerald:      { emoji: '📊', img: '/agents/gboxford.png' },
  private_aye: { emoji: '🕵️', img: '/agents/earl.png' },
}

function AgentAvatar({ name, displayName, small = false }) {
  const [imgFailed, setImgFailed] = useState(false)
  const override = AGENT_OVERRIDES[name]
  const imgSrc = override?.img || `/agents/${name}.png`
  const emoji = override?.emoji || '🤖'
  const cls = small ? 'w-6 h-6' : 'w-8 h-8'

  return (
    <div className={`flex-shrink-0 ${cls} rounded-full bg-cyan-500/20 border border-cyan-500/30 overflow-hidden flex items-center justify-center text-sm`}>
      {imgFailed
        ? emoji
        : <img src={imgSrc} alt={displayName} className="w-full h-full object-cover" onError={() => setImgFailed(true)} />
      }
    </div>
  )
}

export { AgentAvatar }

export default function AgentSelector({ agents, selected, onSelect, loading }) {
  if (loading) {
    return (
      <div className="flex gap-2 flex-wrap">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-40 rounded-xl bg-dark-800 animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {agents.map(agent => {
        const isSelected = selected === agent.name
        return (
          <button
            key={agent.name}
            onClick={() => onSelect(agent.name)}
            className={`flex flex-col items-start px-4 py-3 rounded-xl border transition-all text-left ${
              isSelected
                ? 'border-cyan-500/60 bg-cyan-500/10 text-white'
                : 'border-dark-700 bg-dark-900/50 text-gray-400 hover:border-dark-600 hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <AgentAvatar name={agent.name} displayName={agent.display_name} small />
              <span className="font-semibold text-sm">{agent.display_name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-dark-700 text-gray-500'
              }`}>
                {agent.stats.total_memories}
              </span>
            </div>
            <span className="text-xs text-gray-500 leading-tight">{agent.specialty}</span>
          </button>
        )
      })}
    </div>
  )
}
