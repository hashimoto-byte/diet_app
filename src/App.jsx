import { useState } from 'react'
import Nav from './components/Nav'
import ProfileScreen from './components/profile/ProfileScreen'
import MenuScreen from './components/menu/MenuScreen'
import ShoppingScreen from './components/shopping/ShoppingScreen'
import WeightScreen from './components/weight/WeightScreen'
import { useProfile } from './hooks/useProfile'
import { useMenu } from './hooks/useMenu'
import { useShopping } from './hooks/useShopping'
import { useWeight } from './hooks/useWeight'
import './index.css'

export default function App() {
  const [tab, setTab] = useState('profile')
  const profileHook = useProfile()
  const menuHook = useMenu()
  const shoppingHook = useShopping()
  const weightHook = useWeight()

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto">
      {tab === 'profile' && (
        <ProfileScreen profile={profileHook.profile} onSave={profileHook.save} />
      )}
      {tab === 'menu' && (
        <MenuScreen profile={profileHook.profile} menuHook={menuHook} shoppingHook={shoppingHook} />
      )}
      {tab === 'shopping' && (
        <ShoppingScreen hook={shoppingHook} />
      )}
      {tab === 'weight' && (
        <WeightScreen profile={profileHook.profile} weightHook={weightHook} onUpdateProfile={profileHook.updateWeight} />
      )}
      <Nav active={tab} onChange={setTab} />
    </div>
  )
}
