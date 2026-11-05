export type QuestType = 'routine' | 'todo'

export interface Quest {
  id: number
  type: QuestType
  title: string
  date: string
  xp: number
  coins: number
  categoryId: number
  points: number
  done: boolean
}

export interface Session {
  id: number
  title: string
  subtitle: string
  date: string
  start: string
  end: string
  enabled: boolean
}

// A Balance Radar egy tengelye (value: 0-100)
export interface BalanceCategory {
  id: number
  name: string
  value: number
}
