import { createContext, useState, type ReactNode } from 'react'
import type { BalanceCategory, Quest, Session } from '../models/quest'
import { CATEGORIES, QUESTS, SESSIONS } from '../data/quests'
import { emitPremiumEvent } from '../components/premium/engine'

interface QuestContextValue {
  quests: Quest[]
  sessions: Session[]
  categories: BalanceCategory[]
  setQuestDone: (id: number, done: boolean) => void
  updateQuest: (quest: Quest) => void
  toggleSession: (id: number) => void
  updateCategories: (categories: BalanceCategory[]) => void
}

export const QuestContext = createContext<QuestContextValue | undefined>(undefined)

interface QuestProviderProps {
  children: ReactNode
}

export function QuestProvider({ children }: QuestProviderProps) {
  const [quests, setQuests] = useState<Quest[]>(QUESTS)
  const [sessions, setSessions] = useState<Session[]>(SESSIONS)
  const [categories, setCategories] = useState<BalanceCategory[]>(CATEGORIES)

  function setQuestDone(id: number, done: boolean) {
    setQuests(quests.map((quest) => (quest.id === id ? { ...quest, done: done } : quest)))
    // A prémium téma karaktere reagál, ha kipipálunk egy questet
    if (done) emitPremiumEvent('quest_completed')
  }

  function updateQuest(updated: Quest) {
    setQuests(quests.map((quest) => (quest.id === updated.id ? updated : quest)))
  }

  function toggleSession(id: number) {
    setSessions(sessions.map((session) => (session.id === id ? { ...session, enabled: !session.enabled } : session)))
  }

  function updateCategories(updated: BalanceCategory[]) {
    setCategories(updated)
  }

  return (
    <QuestContext.Provider
      value={{ quests, sessions, categories, setQuestDone, updateQuest, toggleSession, updateCategories }}
    >
      {children}
    </QuestContext.Provider>
  )
}
