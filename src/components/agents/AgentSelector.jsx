const AGENT_META = {
  max:     { emoji: '🚀', vibe: 'Tech, crypto, dry humor',    img: '/agents/max.png' },
  beth:    { emoji: '🌿', vibe: 'Ethics, philosophy, warm',   img: '/agents/bethanyfinkel.png' },
  susan:   { emoji: '🎯', vibe: 'Quality judge, precise',     img: '/agents/susan.png' },
  debater: { emoji: '⚔️',  vibe: 'Debate machine, aggressive', img: '/agents/debator.png' },
  gerald:  { emoji: '📊', vibe: 'Data scientist, analytical', img: '/agents/gboxford.png' },
}

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
        const meta = AGENT_META[agent.name] || { emoji: '🤖', vibe: agent.specialty }
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
              {meta.img
                ? <img src={meta.img} alt={agent.display_name} className="w-6 h-6 rounded-full object-cover" />
                : <span className="text-lg">{meta.emoji}</span>
              }
              <span className="font-semibold text-sm">{agent.display_name}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${
                isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-dark-700 text-gray-500'
              }`}>
                {agent.stats.total_memories}
              </span>
            </div>
            <span className="text-xs text-gray-500 leading-tight">{meta.vibe}</span>
          </button>
        )
      })}
    </div>
  )
}
