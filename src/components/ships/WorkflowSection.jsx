const methodCards = [
  {
    title: 'The Swarm Approach',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    description:
      'Architect the system, spin up agents for parallel module builds, synthesize and review. One engineer with multiple Claude Code sessions ships like a team.',
  },
  {
    title: 'Research & Distillation',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    description:
      'Use agents to gather docs, distill to bullet points, and prevent context rot. Fresh context per module means no accumulated hallucinations.',
  },
  {
    title: 'Human-in-the-Loop',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    description:
      'I make all architecture decisions, tech choices, and schema design. Claude generates code. I review every diff. The human decides, the AI executes.',
  },
  {
    title: 'QA as Architecture',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    description:
      'The verification layer is as important as the generation layer. Agent-driven QA catches what the generation agent misses — it is a first-class architectural concern.',
  },
]

export default function WorkflowSection() {
  return (
    <div>
      {/* Method cards — 2x2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {methodCards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-dark-700 bg-dark-900/50 p-5 hover:border-dark-600 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                {card.icon}
              </div>
              <h4 className="text-sm font-semibold text-white">{card.title}</h4>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* OpenClaw worked example */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5">
        <h4 className="text-sm font-semibold text-indigo-400 mb-3">
          Worked Example: OpenClaw PR #28199
        </h4>
        <ol className="space-y-2 text-sm text-gray-400">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">1</span>
            <span><span className="text-white">I found the bug</span> — 43K crash loops in production logs</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">2</span>
            <span><span className="text-white">I diagnosed it</span> — 340MB loaded before port check on every cycle</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold">3</span>
            <span><span className="text-white">Claude helped implement</span> — 9 iterative commits responding to CI and reviewer feedback</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
