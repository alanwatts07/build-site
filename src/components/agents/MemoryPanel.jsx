import { useState } from 'react'

function timeAgo(dateStr) {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor(diff / 3600000)
  const mins = Math.floor(diff / 60000)
  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  return `${mins}m ago`
}

function simColor(sim) {
  if (sim === null || sim === undefined) return 'bg-gray-500'
  if (sim >= 0.65) return 'bg-emerald-400'
  if (sim >= 0.55) return 'bg-cyan-400'
  if (sim >= 0.45) return 'bg-amber-400'
  return 'bg-red-400'
}

function simTextColor(sim) {
  if (sim === null || sim === undefined) return 'text-gray-400'
  if (sim >= 0.65) return 'text-emerald-400'
  if (sim >= 0.55) return 'text-cyan-400'
  if (sim >= 0.45) return 'text-amber-400'
  return 'text-red-400'
}

function MemoryCard({ mem, showSim = true }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div
      className="rounded-lg border border-dark-700 bg-dark-950/50 p-3 cursor-pointer hover:border-dark-600 transition-colors"
      onClick={() => setExpanded(e => !e)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className={`text-xs font-mono text-gray-300 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
          {mem.content_preview}
        </p>
        <span className="text-gray-600 text-xs flex-shrink-0 mt-0.5">{expanded ? '▲' : '▼'}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {showSim && mem.similarity !== null && mem.similarity !== undefined && (
          <div className="flex items-center gap-1.5 flex-1 min-w-24">
            <span className={`text-xs font-mono font-bold ${simTextColor(mem.similarity)}`}>
              {mem.similarity.toFixed(2)}
            </span>
            <div className="flex-1 h-1 bg-dark-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${simColor(mem.similarity)} transition-all`}
                style={{ width: `${Math.min(mem.similarity / 0.8 * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${
            mem.type === 'core' ? 'bg-amber-500/20 text-amber-400' :
            mem.type === 'archive' ? 'bg-gray-500/20 text-gray-400' :
            'bg-cyan-500/20 text-cyan-400'
          }`}>{mem.type}</span>
          {mem.q_value !== undefined && (
            <span className="text-xs text-gray-500 font-mono">Q:{mem.q_value.toFixed(2)}</span>
          )}
          {mem.created && (
            <span className="text-xs text-gray-600">{timeAgo(mem.created)}</span>
          )}
        </div>
      </div>

      {mem.tags?.length > 0 && expanded && (
        <div className="flex flex-wrap gap-1 mt-2">
          {mem.tags.map(tag => (
            <span key={tag} className="text-xs px-1.5 py-0.5 rounded-full bg-dark-700 text-gray-500">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function Section({ title, icon, children, defaultOpen = true, accent = 'cyan' }) {
  const [open, setOpen] = useState(defaultOpen)
  const colors = {
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
    emerald: 'text-emerald-400',
    purple: 'text-purple-400',
    indigo: 'text-indigo-400',
    rose: 'text-rose-400',
  }
  return (
    <div className="border border-dark-700 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-dark-800/50 hover:bg-dark-800 transition-colors"
      >
        <span className={`flex items-center gap-2 text-sm font-medium ${colors[accent] || colors.cyan}`}>
          <span>{icon}</span>
          {title}
        </span>
        <span className="text-gray-600 text-xs">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="p-3 space-y-2">{children}</div>}
    </div>
  )
}

function AffectBar({ label, value, min = -1, max = 1, colorFn }) {
  const pct = ((value - min) / (max - min)) * 100
  const color = colorFn ? colorFn(value) : 'bg-cyan-400'
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-400">{label}</span>
        <span className="font-mono text-white">{value >= 0 ? '+' : ''}{value.toFixed(2)}</span>
      </div>
      <div className="h-2 bg-dark-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function Shimmer() {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-16 rounded-lg bg-dark-800 animate-pulse" />
      ))}
    </div>
  )
}

export default function MemoryPanel({ data, loading }) {
  if (loading) return (
    <div className="p-4 space-y-3">
      <Shimmer />
    </div>
  )

  if (!data) return (
    <div className="flex items-center justify-center h-full text-gray-600 text-sm p-8 text-center">
      <div>
        <div className="text-3xl mb-2">🧠</div>
        <p>Select an agent and send a message to see memory retrieval in real time.</p>
      </div>
    </div>
  )

  const {
    semantic_hits = [],
    core_memories = [],
    procedural = [],
    shared_memories = [],
    affect,
    q_values,
    graph_context,
    self_narrative,
    goals,
    stats,
  } = data

  return (
    <div className="overflow-y-auto h-full p-3 space-y-2">

      {/* Semantic Hits */}
      {semantic_hits.length > 0 && (
        <Section title={`Semantic Hits (${semantic_hits.length})`} icon="🔍" accent="cyan">
          {semantic_hits.map(mem => <MemoryCard key={mem.id} mem={mem} showSim={true} />)}
        </Section>
      )}

      {/* Core Memories */}
      {core_memories.length > 0 && (
        <Section title={`Core Memories (${core_memories.length})`} icon="💎" accent="amber" defaultOpen={false}>
          {core_memories.map(mem => <MemoryCard key={mem.id} mem={mem} showSim={false} />)}
        </Section>
      )}

      {/* Affect State */}
      {affect && (
        <Section title="Affect State" icon="🎭" accent="purple">
          <div className="space-y-3 px-1">
            <AffectBar
              label="Valence (mood)"
              value={affect.valence}
              min={-1} max={1}
              colorFn={v => v >= 0.1 ? 'bg-emerald-400' : v >= -0.1 ? 'bg-amber-400' : 'bg-rose-400'}
            />
            <AffectBar
              label="Arousal (energy)"
              value={affect.arousal}
              min={0} max={1}
              colorFn={a => a >= 0.6 ? 'bg-rose-400' : a >= 0.3 ? 'bg-amber-400' : 'bg-cyan-400'}
            />
            {affect.summary && (
              <p className="text-xs text-gray-500 font-mono">{affect.summary}</p>
            )}
          </div>
        </Section>
      )}

      {/* Q-Values */}
      {q_values && (
        <Section title="Q-Values" icon="📈" accent="emerald" defaultOpen={false}>
          <div className="px-1 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Trained memories</span>
              <span className="font-mono text-white">{q_values.trained_count}/{q_values.total_retrieved}</span>
            </div>
            <div className="h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${q_values.total_retrieved > 0 ? (q_values.trained_count / q_values.total_retrieved) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 font-mono">
              <span>avg Q: <span className="text-white">{q_values.avg_q?.toFixed(3)}</span></span>
              <span title="explore/exploit balance">λ = <span className="text-white">{q_values.lambda_val?.toFixed(2)}</span></span>
            </div>
          </div>
        </Section>
      )}

      {/* Graph Context */}
      {graph_context && (graph_context.community_summaries?.length > 0 || graph_context.expanded?.length > 0 || graph_context.expanded_count > 0) && (
        <Section title="Graph Context" icon="🕸️" accent="indigo" defaultOpen={false}>
          <div className="px-1 space-y-2">
            {graph_context.community_summaries?.map(c => (
              <div key={c.community_id} className="rounded-lg border border-dark-700 bg-dark-950/50 p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-indigo-400">{c.title}</span>
                  <span className="text-xs text-gray-500 font-mono">{c.size} mems</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{c.summary}</p>
              </div>
            ))}
            {graph_context.expanded?.length > 0 && (
              <>
                <p className="text-xs text-gray-500 font-medium mt-1">Graph Edges ({graph_context.expanded.length})</p>
                {graph_context.expanded.map(m => (
                  <div key={m.id} className="rounded-lg border border-dark-700 bg-dark-950/50 p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 font-mono">{m.rel_type}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{m.content}</p>
                  </div>
                ))}
              </>
            )}
            {graph_context.community_members?.length > 0 && (
              <>
                <p className="text-xs text-gray-500 font-medium mt-1">Cluster Members ({graph_context.community_members.length})</p>
                {graph_context.community_members.map(m => (
                  <div key={m.id} className="rounded-lg border border-dark-700 bg-dark-950/50 p-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 font-mono">{m.community_title}</span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{m.content}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </Section>
      )}

      {/* Procedural */}
      {procedural.length > 0 && (
        <Section title="Procedural Rules" icon="⚙️" accent="amber" defaultOpen={false}>
          <div className="space-y-1 px-1">
            {procedural.map((p, i) => (
              <p key={i} className="text-xs font-mono text-gray-400 leading-relaxed border-l-2 border-amber-500/40 pl-2">{p}</p>
            ))}
          </div>
        </Section>
      )}

      {/* Shared Memories */}
      {shared_memories.length > 0 && (
        <Section title={`Shared Memories (${shared_memories.length})`} icon="🤝" accent="rose" defaultOpen={false}>
          <div className="space-y-1 px-1">
            {shared_memories.map((s, i) => (
              <p key={i} className="text-xs font-mono text-gray-400 leading-relaxed border-l-2 border-rose-500/40 pl-2 line-clamp-2">{s}</p>
            ))}
          </div>
        </Section>
      )}

      {/* Self-Narrative */}
      {self_narrative && (
        <Section title="Self-Narrative" icon="🪞" accent="purple" defaultOpen={false}>
          <blockquote className="text-xs text-gray-300 italic leading-relaxed border-l-2 border-purple-500/40 pl-3 mx-1">
            "{self_narrative}"
          </blockquote>
        </Section>
      )}

      {/* Goals */}
      {goals && (
        <Section title="Goals" icon="🎯" accent="emerald" defaultOpen={false}>
          <pre className="text-xs text-gray-300 font-mono leading-relaxed whitespace-pre-wrap px-1">{goals}</pre>
        </Section>
      )}

      {/* Stats */}
      {stats && (
        <Section title="Stats" icon="💾" accent="cyan" defaultOpen={false}>
          <div className="grid grid-cols-2 gap-2 px-1">
            {[
              ['Total memories', stats.total_memories],
              ['Sessions', stats.sessions],
              ['Core', stats.core],
              ['Active', stats.active],
              ['Embeddings', stats.embeddings],
              ['Archive', stats.archive],
            ].map(([label, val]) => (
              <div key={label} className="text-xs">
                <span className="text-gray-500">{label}</span>
                <span className="text-white font-mono ml-2">{val}</span>
              </div>
            ))}
            {stats.last_memory && (
              <div className="col-span-2 text-xs text-gray-600">
                Last memory: {timeAgo(stats.last_memory)}
              </div>
            )}
          </div>
        </Section>
      )}
    </div>
  )
}
