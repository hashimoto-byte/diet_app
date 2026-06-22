export async function generateMenu({ profile, unit, timing, date, options, alreadyGenerated = [] }) {
  const res = await fetch('/api/generate-menu', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, unit, timing, date, options, alreadyGenerated }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}
