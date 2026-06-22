import WeightInput from './WeightInput'
import WeightChart from './WeightChart'
import ProgressSummary from './ProgressSummary'

export default function WeightScreen({ profile, weightHook, onUpdateProfile }) {
  const { log, record } = weightHook

  return (
    <div className="p-4 space-y-4 pb-24">
      <h1 className="text-xl font-bold text-gray-800">体重記録</h1>
      <WeightInput onRecord={(w) => record(w, onUpdateProfile)} />
      <ProgressSummary profile={profile} log={log} />
      {log.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <WeightChart log={log} profile={profile} />
        </div>
      )}
      {log.length === 0 && (
        <p className="text-center text-gray-400 py-8 text-sm">まだ記録がありません</p>
      )}
    </div>
  )
}
