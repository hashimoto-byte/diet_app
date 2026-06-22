export default function CalorieResult({ profile }) {
  if (!profile) return null
  const { bmr, tdee, targetCalories, calorieClamped, estimatedWeeks, targetProtein } = profile

  return (
    <div className="bg-green-50 rounded-xl p-4 space-y-3">
      <h3 className="font-semibold text-green-800">計算結果</h3>
      <div className="grid grid-cols-2 gap-3">
        <Stat label="基礎代謝（BMR）" value={`${bmr} kcal`} />
        <Stat label="消費カロリー（TDEE）" value={`${tdee} kcal`} />
        <Stat label="目標摂取カロリー" value={`${targetCalories} kcal`} accent />
        <Stat label="目標タンパク質" value={`${targetProtein} g/日`} accent />
      </div>
      {calorieClamped && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded p-2">
          ⚠️ 算出カロリーが低すぎるため、安全な下限値に調整しました
        </p>
      )}
      {estimatedWeeks && (
        <p className="text-sm text-green-700">
          📅 推定達成期間：約 <strong>{estimatedWeeks} 週間</strong>
        </p>
      )}
    </div>
  )
}

function Stat({ label, value, accent }) {
  return (
    <div className={`rounded-lg p-3 ${accent ? 'bg-green-100' : 'bg-white'}`}>
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`font-bold text-lg ${accent ? 'text-green-700' : 'text-gray-800'}`}>{value}</p>
    </div>
  )
}
