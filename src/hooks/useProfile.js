import { useState, useCallback } from 'react'
import { calcBMR, calcTDEE, calcTargetCalories, calcEstimatedWeeks, calcTargetProtein } from '../utils/calories'

const STORAGE_KEY = 'dietProfile'

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null } catch { return null }
}

export function useProfile() {
  const [profile, setProfile] = useState(load)

  const save = useCallback((form) => {
    const bmr = calcBMR(form)
    const tdee = calcTDEE(bmr, form.activityLevel)
    const { calories: targetCalories, clamped } = calcTargetCalories(tdee, form.gender)
    const estimatedWeeks = calcEstimatedWeeks(Number(form.currentWeight), Number(form.targetWeight), targetCalories, tdee)
    const protein = calcTargetProtein(Number(form.currentWeight))
    const existing = load()
    const next = {
      ...form,
      bmr,
      tdee,
      targetCalories,
      calorieClamped: clamped,
      estimatedWeeks,
      targetProtein: Math.round((protein.min + protein.max) / 2),
      startWeight: existing?.startWeight ?? Number(form.currentWeight),
      startDate: existing?.startDate ?? new Date().toISOString().slice(0, 10),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setProfile(next)
    return next
  }, [])

  const updateWeight = useCallback((weight) => {
    setProfile(prev => {
      if (!prev) return prev
      const next = { ...prev, currentWeight: weight }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { profile, save, updateWeight }
}
