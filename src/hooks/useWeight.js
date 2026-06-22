import { useState, useCallback } from 'react'

const KEY = 'weightLog'
function load() { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }
function persist(list) { localStorage.setItem(KEY, JSON.stringify(list)) }

export function useWeight() {
  const [log, setLog] = useState(load)

  const record = useCallback((weight, onUpdateProfile) => {
    const date = new Date().toISOString().slice(0, 10)
    setLog(prev => {
      const next = prev.filter(e => e.date !== date)
      next.push({ date, weight: Number(weight) })
      next.sort((a, b) => a.date.localeCompare(b.date))
      persist(next)
      return next
    })
    onUpdateProfile?.(Number(weight))
  }, [])

  const getRecentSummary = useCallback(() => {
    const recent = log.slice(-14)
    if (recent.length < 2) return null
    const diff = recent[recent.length - 1].weight - recent[0].weight
    return { days: recent.length, diff: Math.round(diff * 10) / 10 }
  }, [log])

  return { log, record, getRecentSummary }
}
