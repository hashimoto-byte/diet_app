import MealCard from './MealCard'

export default function FavoritesList({ favorites, onFavorite, onAddToShopping }) {
  if (favorites.length === 0) {
    return <p className="text-center text-gray-400 py-8 text-sm">お気に入りはまだありません</p>
  }
  return (
    <div className="space-y-3">
      {favorites.map((meal, i) => (
        <MealCard
          key={i}
          meal={meal}
          isFavorite={true}
          onFavorite={() => onFavorite(meal)}
          onRegenerate={() => {}}
          onAddToShopping={() => onAddToShopping([meal])}
        />
      ))}
    </div>
  )
}
