import type { LevelRank } from '../models/user'

// Rangok szint szerint növekvő sorrendben. Minden mock data ai generált.
export const LEVEL_RANKS: LevelRank[] = [
  { minLevel: 1, title: 'Novice' },
  { minLevel: 10, title: 'Apprentice' },
  { minLevel: 25, title: 'Adept' },
  { minLevel: 50, title: 'Expert' },
  { minLevel: 75, title: 'Master' },
  { minLevel: 90, title: 'Legend' },
]
