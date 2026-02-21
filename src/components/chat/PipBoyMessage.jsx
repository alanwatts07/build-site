export default function PipBoyMessage({ message }) {
  const isVisitor = message.sender === 'visitor'
  const time = new Date(message.timestamp).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="pip-message px-3 py-1.5">
      <div className="flex items-baseline gap-2">
        <span className="pip-text-dim text-sm shrink-0">[{time}]</span>
        <span className={`text-lg ${isVisitor ? 'pip-text' : 'pip-text-bright'}`}>
          <span className="pip-text-dim">&lt;</span>
          {message.displayName}
          <span className="pip-text-dim">&gt;</span>
          {' '}
          {message.text}
        </span>
      </div>
    </div>
  )
}
