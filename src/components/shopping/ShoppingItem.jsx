export default function ShoppingItem({ item, onToggle, onRemove }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <input type="checkbox" className="w-5 h-5 accent-green-500 rounded"
        checked={item.checked} onChange={onToggle} />
      <div className={`flex-1 ${item.checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        <span className="text-sm">{item.name}</span>
        {item.note && <span className="text-xs text-gray-400 ml-1">（{item.note}）</span>}
      </div>
      <button onClick={onRemove} className="text-gray-300 hover:text-red-400 text-sm px-1">✕</button>
    </div>
  )
}
