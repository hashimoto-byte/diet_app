import { useState } from 'react'

export default function AddItemInput({ onAdd }) {
  const [name, setName] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (name.trim()) { onAdd(name.trim()); setName('') }
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder="食材を手動追加"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors">追加</button>
    </form>
  )
}
