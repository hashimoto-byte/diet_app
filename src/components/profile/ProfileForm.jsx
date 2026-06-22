import { useState } from 'react'
import { ACTIVITY_LEVELS, FOOD_PREFERENCES, COOKING_LEVELS } from '../../constants/categories'

const DEFAULT = {
  name: '', age: '', height: '', currentWeight: '', targetWeight: '',
  gender: 'male', activityLevel: 'moderate', activityDetail: '',
  foodPreference: [], cookingLevel: 'simple', allergies: '',
}

export default function ProfileForm({ initialValues, onSave }) {
  const [form, setForm] = useState(initialValues || DEFAULT)

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const togglePref = (pref) => {
    set('foodPreference', form.foodPreference.includes(pref)
      ? form.foodPreference.filter(p => p !== pref)
      : [...form.foodPreference, pref])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, age: Number(form.age), height: Number(form.height), currentWeight: Number(form.currentWeight), targetWeight: Number(form.targetWeight) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="名前（任意）">
        <input className={input} value={form.name} onChange={e => set('name', e.target.value)} placeholder="例：田中太郎" />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="年齢">
          <input className={input} type="number" required value={form.age} onChange={e => set('age', e.target.value)} placeholder="33" />
        </Field>
        <Field label="性別">
          <select className={input} value={form.gender} onChange={e => set('gender', e.target.value)}>
            <option value="male">男性</option>
            <option value="female">女性</option>
          </select>
        </Field>
        <Field label="身長 (cm)">
          <input className={input} type="number" required value={form.height} onChange={e => set('height', e.target.value)} placeholder="170" />
        </Field>
        <Field label="現在体重 (kg)">
          <input className={input} type="number" step="0.1" required value={form.currentWeight} onChange={e => set('currentWeight', e.target.value)} placeholder="70" />
        </Field>
        <Field label="目標体重 (kg)">
          <input className={input} type="number" step="0.1" required value={form.targetWeight} onChange={e => set('targetWeight', e.target.value)} placeholder="65" />
        </Field>
      </div>
      <Field label="運動頻度">
        <select className={input} value={form.activityLevel} onChange={e => set('activityLevel', e.target.value)}>
          {ACTIVITY_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
      </Field>
      <Field label="活動詳細（任意）">
        <textarea className={input} rows={2} value={form.activityDetail} onChange={e => set('activityDetail', e.target.value)} placeholder="例：毎日犬の散歩1時間" />
      </Field>
      <Field label="食の好み">
        <div className="flex flex-wrap gap-2">
          {FOOD_PREFERENCES.map(pref => (
            <button key={pref} type="button"
              className={`px-3 py-1 rounded-full text-sm border transition-colors ${form.foodPreference.includes(pref) ? 'bg-green-500 text-white border-green-500' : 'border-gray-300 text-gray-600'}`}
              onClick={() => togglePref(pref)}>{pref}</button>
          ))}
        </div>
      </Field>
      <Field label="調理レベル">
        <select className={input} value={form.cookingLevel} onChange={e => set('cookingLevel', e.target.value)}>
          {COOKING_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
        </select>
      </Field>
      <Field label="アレルギー・NG食材（任意）">
        <textarea className={input} rows={2} value={form.allergies} onChange={e => set('allergies', e.target.value)} placeholder="例：甲殻類アレルギー" />
      </Field>
      <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-600 transition-colors">
        保存する
      </button>
    </form>
  )
}

function Field({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}

const input = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400'
