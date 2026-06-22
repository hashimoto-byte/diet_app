export default function ProgressSummary({ profile, log }) {
  if (!profile || log.length === 0) return null
  const first = log[0]
  const last = log[log.length - 1]
  const diff = Math.round((last.weight - first.weight) * 10) / 10
  const toGoal = Math.round((last.weight - profile.targetWeight) * 10) / 10
  const recent7 = log.slice(-7)
  const avg7 = recent7.length > 1
    ? Math.round((recent7[recent7.length - 1].weight - recent7[0].weight) * 10) / 10
    : null

  return (
    <div className="grid grid-cols-3 gap-3">
      <Stat label="開始からの変化" value={`${diff > 0 ? '+' : ''}${diff} kg`} color={diff <= 0 ? 'text-green-600' : 'text-red-500'} />
      <Stat label="目標まで" value={toGoal > 0 ? `-${toGoal} kg` : '達成！🎉'} color="text-blue-600" />
      {avg7 !== null && <Stat label="直近7日平均" value={`${avg7 > 0 ? '+' : ''}${avg7} kg`} color={avg7 <= 0 ? 'text-green-600' : 'text-amber-500'} />}
    </div>
  )
}

function Stat({ label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 text-center">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`font-bold text-base ${color}`}>{value}</p>
    </div>
  )
}
