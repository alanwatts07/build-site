import { useState } from 'react'

export default function PipBoyNamePrompt({ onSubmit, storedHandle }) {
  const [value, setValue] = useState(storedHandle || '')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || submitted) return
    setSubmitted(true)
    onSubmit(trimmed)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
      <div className="space-y-4 w-full max-w-xs">
        {/* Terminal boot text */}
        <div className="pip-text-dim text-base space-y-1">
          <p>VAULT-TEC COMM SYSTEMS v2.7.1</p>
          <p>INITIALIZING UPLINK...</p>
          <p className="pip-text">CONNECTION ESTABLISHED</p>
        </div>

        <div className="border-t border-[var(--pip-border)] my-3" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="pip-text text-lg block">
            {'>'} ENTER HANDLE:
          </label>
          <div className="flex items-center gap-1">
            <span className="pip-text text-lg">{'>'}</span>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              maxLength={24}
              autoFocus
              disabled={submitted}
              className="pip-input flex-1 w-full text-lg"
              placeholder="your_name"
            />
            {!value && <span className="pip-cursor" />}
          </div>
          <button
            type="submit"
            disabled={!value.trim() || submitted}
            className="w-full py-2 text-lg pip-text border border-[var(--pip-border)] hover:border-[var(--pip-green)] hover:bg-[var(--pip-green)]/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {submitted ? 'CONNECTING...' : '[ENTER]'}
          </button>
        </form>
      </div>
    </div>
  )
}
