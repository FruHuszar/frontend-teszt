import { createContext, useState, type ReactNode } from 'react'
import type { AppNotification, User } from '../models/user'
import { NOTIFICATIONS, USER } from '../data/user'

interface UserContextValue {
  user: User
  notifications: AppNotification[]
  markAllRead: () => void
  freezeStreak: () => void
  changeCoins: (amount: number) => void
}

export const UserContext = createContext<UserContextValue | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(USER)
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS)

  function markAllRead() {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  function freezeStreak() {
    setUser({ ...user, frozenToday: true })
  }

  // + jutalom, - vásárlás vagy visszaadás. 0 alá nem mehet.
  function changeCoins(amount: number) {
    setUser({ ...user, coins: Math.max(0, user.coins + amount) })
  }

  return (
    <UserContext.Provider value={{ user, notifications, markAllRead, freezeStreak, changeCoins }}>
      {children}
    </UserContext.Provider>
  )
}
