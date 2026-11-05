export interface User {
  name: string
  avatar: string
  level: number
  xp: number
  xpToNext: number
  coins: number
  streak: number
  bestStreak: number
  frozenToday: boolean
}

// "Notification" néven már létezik egy böngészős típus, ezért AppNotification
export interface AppNotification {
  id: number
  text: string
  time: string
  read: boolean
}

export interface LevelRank {
  minLevel: number
  title: string
}
