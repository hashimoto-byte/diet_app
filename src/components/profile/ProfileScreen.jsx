import { useState } from 'react'
import ProfileForm from './ProfileForm'
import CalorieResult from './CalorieResult'

export default function ProfileScreen({ profile, onSave }) {
  const [toast, setToast] = useState(false)

  const handleSave = (form) => {
    onSave(form)
    setToast(true)
    setTimeout(() => setToast(false), 2500)
  }

  return (
    <div className="p-4 space-y-5 pb-24">
      <h1 className="text-xl font-bold text-gray-800">基礎情報</h1>
      <ProfileForm initialValues={profile} onSave={handleSave} />
      {profile && <CalorieResult profile={profile} />}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-5 py-2 rounded-full text-sm shadow-lg z-50">
          プロフィールを保存しました ✓
        </div>
      )}
    </div>
  )
}
