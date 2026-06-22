import { ACTIVITY_LEVELS } from '../constants/categories'

export function calcBMR({ gender, weight, height, age }) {
  if (gender === 'male') return Math.round(88.362 + 13.397 * weight + 4.799 * height - 5.677 * age)
  return Math.round(447.593 + 9.247 * weight + 3.098 * height - 4.330 * age)
}

export function calcTDEE(bmr, activityLevel) {
  const level = ACTIVITY_LEVELS.find(l => l.value === activityLevel)
  return Math.round(bmr * (level?.factor ?? 1.2))
}

const MIN_CALORIES = { male: 1500, female: 1200 }

export function calcTargetCalories(tdee, gender) {
  const raw = tdee - 500
  const min = MIN_CALORIES[gender] ?? 1200
  return { calories: Math.max(raw, min), clamped: raw < min }
}

export function calcEstimatedWeeks(currentWeight, targetWeight, targetCalories, tdee) {
  const deficit = tdee - targetCalories
  if (deficit <= 0) return null
  const kgToLose = currentWeight - targetWeight
  if (kgToLose <= 0) return null
  return Math.round((kgToLose * 7700) / (deficit * 7))
}

export function calcTargetProtein(weight) {
  return { min: Math.round(weight * 1.2), max: Math.round(weight * 1.6) }
}
