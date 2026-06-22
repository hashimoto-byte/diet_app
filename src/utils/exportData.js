export function exportAllData() {
  const keys = ['dietProfile', 'menuHistory', 'shoppingList', 'weightLog', 'favorites']
  const data = {}
  keys.forEach(k => {
    const raw = localStorage.getItem(k)
    if (raw) data[k] = JSON.parse(raw)
  })
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `diet-backup-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importAllData(json) {
  const data = JSON.parse(json)
  Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)))
}
