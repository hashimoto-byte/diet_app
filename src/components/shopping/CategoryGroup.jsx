import ShoppingItem from './ShoppingItem'

export default function CategoryGroup({ category, items, onToggle, onRemove }) {
  if (items.length === 0) return null
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 space-y-1">
      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{category}</h4>
      {items.map(item => (
        <ShoppingItem key={item.id} item={item}
          onToggle={() => onToggle(item.id)}
          onRemove={() => onRemove(item.id)} />
      ))}
    </div>
  )
}
