import xss from 'xss'

const MAX_MESSAGE_LENGTH = 500
const MAX_HANDLE_LENGTH = 24
const HANDLE_PATTERN = /^[a-zA-Z0-9_\-.\s]{1,24}$/

export function sanitizeMessage(text) {
  if (typeof text !== 'string') return ''
  const cleaned = xss(text.trim())
  return cleaned.slice(0, MAX_MESSAGE_LENGTH)
}

export function sanitizeHandle(handle) {
  if (typeof handle !== 'string') return null
  const trimmed = handle.trim()
  if (!trimmed || !HANDLE_PATTERN.test(trimmed)) return null
  return xss(trimmed).slice(0, MAX_HANDLE_LENGTH)
}
