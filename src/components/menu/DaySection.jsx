import MealCard from './MealCard'

export default function DaySection({ day, historyId, dayIndex, isFavorite, onFavorite, onRegenerate, onAddToShopping, onAddAllToShopping, regeneratingIndex }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-700">{day.date}</h3>
        <button
          onClick={() => onAddAllToShopping(day.meals)}
          className="text-xs text-green-600 border border-green-300 px-2 py-1 rounded-lg hover:bg-green-50 transition-colors"
        >
          全食事を追加
        </button>
      </div>
      <div className="space-y-3">
        {day.meals.map((meal, mi) => (
          <MealCard
            key={mi}
            meal={meal}
            isFavorite={isFavorite(meal)}
            onFavorite={() => onFavorite(meal)}
            onRegenerate={() => onRegenerate({ historyId, dayIndex, mealIndex: mi })}
            onAddToShopping={() => onAddToShopping([meal])}
            regenerating={regeneratingIndex === mi}
          />
        ))}
      </div>
    </div>
  )
}
