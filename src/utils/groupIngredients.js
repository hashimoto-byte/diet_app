import { FOOD_CATEGORIES } from '../constants/categories'

export function groupIngredients(items) {
  const groups = {}
  FOOD_CATEGORIES.forEach(cat => { groups[cat] = [] })
  items.forEach(item => {
    const cat = groups[item.category] ? item.category : 'その他'
    groups[cat].push(item)
  })
  return groups
}
