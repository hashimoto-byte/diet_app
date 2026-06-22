export default function MealCard({ meal, isFavorite, onFavorite, onRegenerate, onAddToShopping, regenerating }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{meal.timing}</span>
          <h3 className="font-semibold text-gray-800 mt-1">{meal.title}</h3>
        </div>
        <button onClick={onFavorite} className={`text-xl ${isFavorite ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
      </div>

      <div className="space-y-1">
        {meal.dishes?.map((dish, i) => (
          <div key={i} className="flex justify-between text-sm text-gray-600">
            <span>{dish.name}（{dish.amount}）</span>
            <span className="text-gray-400">{dish.kcal}kcal</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 text-sm">
        <span className="font-semibold text-green-700">合計 {meal.totalKcal}kcal</span>
        <span className="text-gray-500">P:{meal.totalProtein}g</span>
      </div>

      {meal.cookingMemo && (
        <p className="text-xs text-gray-500 bg-gray-50 rounded p-2">💡 {meal.cookingMemo}</p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          onClick={onRegenerate}
          disabled={regenerating}
          className="flex-1 text-xs border border-green-400 text-green-600 py-1.5 rounded-lg hover:bg-green-50 disabled:opacity-50 transition-colors"
        >
          {regenerating ? '生成中…' : '🔄 再生成'}
        </button>
        <button
          onClick={onAddToShopping}
          className="flex-1 text-xs border border-gray-300 text-gray-600 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          🛒 買い物リストへ
        </button>
      </div>
    </div>
  )
}
