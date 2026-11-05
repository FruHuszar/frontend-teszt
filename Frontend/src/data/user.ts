import type { AppNotification, User } from '../models/user'
import avatar from '../assets/images/levi_avatar.jpg'

// Mock adatok, amíg nincs backend. Minden mock data ai generált.

export const USER: User = {
  name: 'Huszár Levi',
  avatar: avatar,
  level: 91,
  xp: 2108,
  xpToNext: 3400,
  coins: 6767,
  streak: 14,
  bestStreak: 21,
  frozenToday: false,
}

export const NOTIFICATIONS: AppNotification[] = [
  { id: 1, text: 'Your 14-day streak is on fire!', time: '10 min ago', read: false },
  { id: 2, text: 'New in the shop: Cherry Blossom theme', time: '2 h ago', read: false },
  { id: 3, text: 'Deep Work session starts at 11:00', time: 'Yesterday', read: true },
]
