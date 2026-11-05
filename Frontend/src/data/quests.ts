import type { BalanceCategory, Quest, Session } from '../models/quest'
import { dayFromToday } from '../utils/date'

// Mock adatok, amíg nincs backend. A dátumok a mai naphoz képest vannak megadva.
// Minden mock data ai generált.

export const CATEGORIES: BalanceCategory[] = [
  { id: 1, name: 'Soul', value: 70 },
  { id: 2, name: 'Social', value: 45 },
  { id: 3, name: 'Health', value: 60 },
  { id: 4, name: 'Study', value: 85 },
  { id: 5, name: 'Productivity', value: 75 },
]

export const QUESTS: Quest[] = [
  { id: 1, type: 'routine', title: 'Morning meditation', date: dayFromToday(0), xp: 20, coins: 10, categoryId: 1, points: 5, done: true },
  { id: 2, type: 'routine', title: 'Deep work 4 hours', date: dayFromToday(0), xp: 60, coins: 25, categoryId: 4, points: 8, done: true },
  { id: 3, type: 'routine', title: 'Evening workout', date: dayFromToday(0), xp: 40, coins: 15, categoryId: 3, points: 6, done: false },
  { id: 4, type: 'routine', title: 'Weekly review', date: dayFromToday(2), xp: 30, coins: 10, categoryId: 5, points: 5, done: false },
  { id: 5, type: 'todo', title: 'Finish thesis chapter', date: dayFromToday(0), xp: 50, coins: 20, categoryId: 4, points: 6, done: false },
  { id: 6, type: 'todo', title: 'Call grandma', date: dayFromToday(0), xp: 15, coins: 5, categoryId: 2, points: 4, done: true },
  { id: 7, type: 'todo', title: 'Clean the room', date: dayFromToday(0), xp: 20, coins: 8, categoryId: 1, points: 3, done: false },
  { id: 8, type: 'todo', title: 'Buy a birthday gift', date: dayFromToday(1), xp: 10, coins: 5, categoryId: 2, points: 3, done: false },
]

export const SESSIONS: Session[] = [
  { id: 1, title: 'Mind Reset', subtitle: '30 min meditation', date: dayFromToday(0), start: '09:00', end: '09:30', enabled: true },
  { id: 2, title: 'Deep Work', subtitle: 'Focus sprint', date: dayFromToday(0), start: '11:00', end: '15:00', enabled: true },
  { id: 3, title: 'Workout', subtitle: 'Evening routine', date: dayFromToday(0), start: '18:00', end: '19:00', enabled: false },
  { id: 4, title: 'Wind Down', subtitle: 'Reading', date: dayFromToday(0), start: '21:30', end: '22:00', enabled: false },
  { id: 5, title: 'Language Practice', subtitle: 'Flashcards', date: dayFromToday(1), start: '08:00', end: '08:30', enabled: true },
  { id: 6, title: 'Long Run', subtitle: '10 km', date: dayFromToday(3), start: '07:00', end: '08:00', enabled: false },
  { id: 7, title: 'Study Group', subtitle: 'Thesis review', date: dayFromToday(3), start: '16:00', end: '17:30', enabled: true },
]
