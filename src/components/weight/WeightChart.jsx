import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

export default function WeightChart({ log, profile }) {
  const [range, setRange] = useState('2weeks')

  const now = new Date()
  const filtered = log.filter(e => {
    const d = new Date(e.date)
    if (range === '2weeks') return now - d <= 14 * 86400000
    if (range === '1month') return now - d <= 30 * 86400000
    return true
  })

  const targetLine = (() => {
    if (!profile || !filtered.length) return []
    const start = new Date(profile.startDate)
    const end = new Date(start.getTime() + (profile.estimatedWeeks || 8) * 7 * 86400000)
    return filtered.map(e => {
      const t = (new Date(e.date) - start) / (end - start)
      return { date: e.date, target: Math.round((profile.startWeight + (profile.targetWeight - profile.startWeight) * t) * 10) / 10 }
    })
  })()

  const data = filtered.map((e, i) => ({ ...e, target: targetLine[i]?.target }))

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {[['2weeks', '2週間'], ['1month', '1ヶ月'], ['all', '全期間']].map(([v, l]) => (
          <button key={v} onClick={() => setRange(v)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${range === v ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-600'}`}>
            {l}
          </button>
        ))}
      </div>
      {data.length < 2
        ? <p className="text-center text-gray-400 text-sm py-6">データが少なすぎます（2件以上必要）</p>
        : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={d => d.slice(5)} />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 10 }} width={40} unit="kg" />
              <Tooltip formatter={(v, n) => [`${v}kg`, n === 'weight' ? '実績' : '目標']} labelFormatter={l => l} />
              <Line type="monotone" dataKey="weight" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} name="実績" />
              <Line type="monotone" dataKey="target" stroke="#93c5fd" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="目標" />
              {profile && <ReferenceLine y={profile.targetWeight} stroke="#3b82f6" strokeDasharray="3 3" label={{ value: '目標', fontSize: 10 }} />}
            </LineChart>
          </ResponsiveContainer>
        )
      }
    </div>
  )
}
