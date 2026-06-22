import { useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { generateMenu } from '../utils/menuApi'

const HISTORY_KEY = 'menuHistory'
const FAV_KEY = 'favorites'
const MAX_HISTORY = 5

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [] } catch { return [] }
}
function loadFavorites() {
  try { return JSON.parse(localStorage.getItem(FAV_KEY)) || [] } catch { return [] }
}
function saveHistory(list) { localStorage.setItem(HISTORY_KEY, JSON.stringify(list)) }
function saveFavorites(list) { localStorage.setItem(FAV_KEY, JSON.stringify(list)) }

export function useMenu() {
  const [history, setHistory] = useState(loadHistory)
  const [favorites, setFavorites] = useState(loadFavorites)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState(null)

  const generate = useCallback(async ({ profile, unit, timing, options }) => {
    setLoading(true)
    setError(null)
    try {
      const today = new Date().toISOString().slice(0, 10)
      let days = []

      if (unit === '1meal') {
        const res = await generateMenu({ profile, unit, timing, date: today, options })
        days = res.days
      } else {
        const count = unit === '1day' ? 1 : unit === '3days' ? 3 : 7
        for (let i = 0; i < count; i++) {
          const date = new Date(Date.now() + i * 86400000).toISOString().slice(0, 10)
          const alreadyGenerated = days.flatMap(d => d.meals.map(m => m.title))
          setProgress({ current: i + 1, total: count })
          const res = await generateMenu({ profile, unit: '1day', date, options, alreadyGenerated })
          days = [...days, ...res.days]
        }
      }

      const entry = { id: uuid(), generatedAt: today, unit, days }
      const next = [entry, ...loadHistory()].slice(0, MAX_HISTORY)
      saveHistory(next)
      setHistory(next)
      return entry
    } catch (e) {
      setError(e.message)
      return null
    } finally {
      setLoading(false)
      setProgress(null)
    }
  }, [])

  const regenerateMeal = useCallback(async ({ profile, historyId, dayIndex, mealIndex, options }) => {
    const entry = loadHistory().find(h => h.id === historyId)
    if (!entry) return
    const meal = entry.days[dayIndex]?.meals[mealIndex]
    if (!meal) return
    setLoading(true)
    setError(null)
    try {
      const res = await generateMenu({
        profile,
        unit: '1meal',
        timing: meal.timing,
        date: entry.days[dayIndex].date,
        options: { ...options, excludeMenu: meal.title },
      })
      const newMeal = res.days[0]?.meals[0]
      if (!newMeal) return
      const next = loadHistory().map(h => {
        if (h.id !== historyId) return h
        const days = h.days.map((d, di) => {
          if (di !== dayIndex) return d
          return { ...d, meals: d.meals.map((m, mi) => mi === mealIndex ? newMeal : m) }
        })
        return { ...h, days }
      })
      saveHistory(next)
      setHistory(next)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const toggleFavorite = useCallback((meal) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.title === meal.title)
      const next = exists
        ? prev.filter(f => f.title !== meal.title)
        : [...prev, { ...meal, savedAt: new Date().toISOString() }]
      saveFavorites(next)
      return next
    })
  }, [])

  const isFavorite = useCallback((meal) => favorites.some(f => f.title === meal.title), [favorites])

  return { history, favorites, loading, progress, error, generate, regenerateMeal, toggleFavorite, isFavorite }
}
