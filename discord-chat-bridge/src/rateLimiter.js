const messageBuckets = new Map()
const sessionBuckets = new Map()

const MSG_PER_MINUTE = parseInt(process.env.RATE_LIMIT_MESSAGES_PER_MINUTE || '10', 10)
const SESSIONS_PER_HOUR = 3

export function checkMessageRate(socketId) {
  const now = Date.now()
  const bucket = messageBuckets.get(socketId) || { timestamps: [] }

  // Purge timestamps older than 60s
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < 60_000)

  if (bucket.timestamps.length >= MSG_PER_MINUTE) {
    return false
  }

  bucket.timestamps.push(now)
  messageBuckets.set(socketId, bucket)
  return true
}

export function checkSessionRate(ip) {
  const now = Date.now()
  const bucket = sessionBuckets.get(ip) || { timestamps: [] }

  bucket.timestamps = bucket.timestamps.filter((t) => now - t < 3_600_000)

  if (bucket.timestamps.length >= SESSIONS_PER_HOUR) {
    return false
  }

  bucket.timestamps.push(now)
  sessionBuckets.set(ip, bucket)
  return true
}

export function clearSocketBucket(socketId) {
  messageBuckets.delete(socketId)
}

// Periodic cleanup of stale buckets
setInterval(() => {
  const now = Date.now()
  for (const [id, bucket] of messageBuckets) {
    bucket.timestamps = bucket.timestamps.filter((t) => now - t < 60_000)
    if (bucket.timestamps.length === 0) messageBuckets.delete(id)
  }
  for (const [ip, bucket] of sessionBuckets) {
    bucket.timestamps = bucket.timestamps.filter((t) => now - t < 3_600_000)
    if (bucket.timestamps.length === 0) sessionBuckets.delete(ip)
  }
}, 300_000)
