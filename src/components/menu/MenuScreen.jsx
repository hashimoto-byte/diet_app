import { useState } from 'react'
import UnitSelector from './UnitSelector'
import MenuOptions from './MenuOptions'
import DaySection from './DaySection'
import FavoritesList from './FavoritesList'

export default function MenuScreen({ profile, menuHook, shoppingHook }) {
  const [unit, setUnit] = useState('1day')
  const [timing, setTiming] = useState('昼食')
  const [options, setOptions] = useState({ eatOut: false, ingredient: '' })
  const [tab, setTab] = useState('generate')
  const [currentEntry, setCurrentEntry] = useState(null)

  const { generate, regenerateMeal, toggleFavorite, isFavorite, loading, progress, error } = menuHook

  const handleGenerate = async () => {
    if (!profile) return alert('先にプロフィールを登録してください')
    const entry = await generate({ profile, unit, timing, options })
    if (entry) setCurrentEntry(entry)
  }

  return (
    <div className="p-4 space-y-4 pb-24">
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {['generate', 'favorites'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`text-sm font-medium pb-1 border-b-2 transition-colors ${tab === t ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500'}`}>
            {t === 'generate' ? '献立生成' : 'お気に入り'}
          </button>
        ))}
      </div>

      {tab === 'generate' ? (
        <div className="space-y-4">
          <UnitSelector value={unit} timing={timing} onChange={setUnit} onTimingChange={setTiming} />
          <MenuOptions options={options} onChange={setOptions} />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-600 disabled:opacity-60 transition-colors"
          >
            {loading ? (progress ? `${progress.current}日目を生成中…（${progress.current}/${progress.total}）` : '生成中…') : '献立を生成する'}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {currentEntry && (
            <div className="space-y-6">
              {currentEntry.days.map((day, di) => (
                <DaySection
                  key={di}
                  day={day}
                  historyId={currentEntry.id}
                  dayIndex={di}
                  isFavorite={isFavorite}
                  onFavorite={toggleFavorite}
                  onRegenerate={({ historyId, dayIndex, mealIndex }) =>
                    regenerateMeal({ profile, historyId, dayIndex, mealIndex, options })}
                  onAddToShopping={shoppingHook.addFromMeals}
                  onAddAllToShopping={shoppingHook.addFromMeals}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <FavoritesList
          favorites={menuHook.favorites}
          onFavorite={toggleFavorite}
          onAddToShopping={shoppingHook.addFromMeals}
        />
      )}
    </div>
  )
}
