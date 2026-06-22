import { useState } from 'react'

export default function WeightInput({ onRecord }) {
  const [weight, setWeight] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (weight) { onRecord(Number(weight)); setWeight('') }
  }
  return (
    <form onSubmit={submit} className="flex gap-2 items-end">
      <div className="flex-1 space-y-1">
        <label className="text-sm font-medium text-gray-700">今日の体重 (kg)</label>
        <input
          type="number" step="0.1" required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="70.5"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">記録</button>
    </form>
  )
}
