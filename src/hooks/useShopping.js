import { useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'

const KEY = 'shoppingList'
function load() { try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch { return [] } }
function persist(list) { localStorage.setItem(KEY, JSON.stringify(list)) }

export function useShopping() {
  const [items, setItems] = useState(load)

  const update = useCallback((fn) => {
    setItems(prev => { const next = fn(prev); persist(next); return next })
  }, [])

  const addFromMeals = useCallback((meals) => {
    update(prev => {
      const next = [...prev]
      meals.forEach(meal => {
        meal.ingredients?.forEach(ing => {
          if (!next.find(i => i.name === ing.name)) {
            next.push({ id: uuid(), ...ing, checked: false, addedFrom: 'menu' })
          }
        })
      })
      return next
    })
  }, [update])

  const addItem = useCallback((name, note = '', category = 'その他') => {
    update(prev => [...prev, { id: uuid(), name, note, category, checked: false, addedFrom: 'manual' }])
  }, [update])

  const toggle = useCallback((id) => {
    update(prev => prev.map(i => i.id === id ? { ...i, checked: !i.checked } : i))
  }, [update])

  const deleteChecked = useCallback(() => {
    update(prev => prev.filter(i => !i.checked))
  }, [update])

  const resetChecks = useCallback(() => {
    update(prev => prev.map(i => ({ ...i, checked: false })))
  }, [update])

  const clearAll = useCallback(() => { persist([]); setItems([]) }, [])

  const removeItem = useCallback((id) => {
    update(prev => prev.filter(i => i.id !== id))
  }, [update])

  return { items, addFromMeals, addItem, toggle, deleteChecked, resetChecks, clearAll, removeItem }
}
