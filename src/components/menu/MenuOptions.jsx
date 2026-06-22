export default function MenuOptions({ options, onChange }) {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4 accent-green-500"
          checked={options.eatOut}
          onChange={e => onChange({ ...options, eatOut: e.target.checked })} />
        <span className="text-sm text-gray-700">今日は外食・コンビニOK</span>
      </label>
      <div className="space-y-1">
        <label className="text-sm text-gray-700">使いたい食材（任意）</label>
        <input
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="例：サバ缶が余ってる"
          value={options.ingredient}
          onChange={e => onChange({ ...options, ingredient: e.target.value })}
        />
      </div>
    </div>
  )
}
