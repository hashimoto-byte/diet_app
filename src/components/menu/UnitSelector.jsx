import { useState } from 'react'
import { MEAL_TIMINGS } from '../../constants/categories'

const UNITS = [
  { value: '1meal', label: '1食' },
  { value: '1day', label: '1日' },
  { value: '3days', label: '3日間' },
  { value: '1week', label: '1週間' },
]

export default function UnitSelector({ value, timing, onChange, onTimingChange }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {UNITS.map(u => (
          <button key={u.value} onClick={() => onChange(u.value)}
            className={`flex-1 py-2 text-sm rounded-lg border font-medium transition-colors ${value === u.value ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-600'}`}>
            {u.label}
          </button>
        ))}
      </div>
      {value === '1meal' && (
        <div className="flex gap-2">
          {MEAL_TIMINGS.map(t => (
            <button key={t} onClick={() => onTimingChange(t)}
              className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${timing === t ? 'bg-green-100 text-green-700 border-green-400' : 'border-gray-300 text-gray-600'}`}>
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
