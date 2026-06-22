import { useState } from 'react'
import { FOOD_CATEGORIES } from '../../constants/categories'
import { groupIngredients } from '../../utils/groupIngredients'
import CategoryGroup from './CategoryGroup'
import AddItemInput from './AddItemInput'

export default function ShoppingScreen({ hook }) {
  const { items, addItem, toggle, deleteChecked, resetChecks, clearAll, removeItem } = hook
  const [confirming, setConfirming] = useState(false)

  const grouped = groupIngredients(items)
  const checkedCount = items.filter(i => i.checked).length

  return (
    <div className="p-4 space-y-4 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">買い物リスト</h1>
        <span className="text-sm text-gray-500">{items.length}件</span>
      </div>
      <AddItemInput onAdd={addItem} />
      <div className="flex gap-2 flex-wrap">
        <button onClick={resetChecks} className="text-xs border border-gray-300 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-50">チェックリセット</button>
        {checkedCount > 0 && (
          <button onClick={deleteChecked} className="text-xs border border-red-300 text-red-500 px-3 py-1 rounded-full hover:bg-red-50">
            チェック済み削除（{checkedCount}）
          </button>
        )}
        <button onClick={() => setConfirming(true)} className="text-xs border border-red-300 text-red-500 px-3 py-1 rounded-full hover:bg-red-50">全削除</button>
      </div>
      {confirming && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-2">
          <p className="text-sm text-red-700">リストを全件削除しますか？</p>
          <div className="flex gap-2">
            <button onClick={() => { clearAll(); setConfirming(false) }} className="flex-1 bg-red-500 text-white text-sm py-1.5 rounded-lg">削除する</button>
            <button onClick={() => setConfirming(false)} className="flex-1 border border-gray-300 text-sm py-1.5 rounded-lg">キャンセル</button>
          </div>
        </div>
      )}
      {items.length === 0
        ? <p className="text-center text-gray-400 py-10 text-sm">リストは空です</p>
        : FOOD_CATEGORIES.map(cat => (
            <CategoryGroup key={cat} category={cat} items={grouped[cat] || []}
              onToggle={toggle} onRemove={removeItem} />
          ))
      }
    </div>
  )
}
