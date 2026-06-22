const TABS = [
  { id: 'profile', label: 'プロフィール', icon: '👤' },
  { id: 'menu', label: '献立', icon: '🍽️' },
  { id: 'shopping', label: '買い物', icon: '🛒' },
  { id: 'weight', label: '体重', icon: '📊' },
]

export default function Nav({ active, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex z-50">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 flex flex-col items-center py-2 text-xs gap-0.5 transition-colors ${
            active === tab.id ? 'text-green-600' : 'text-gray-500'
          }`}
        >
          <span className="text-xl">{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
