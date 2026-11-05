import { useUserContext, useQuestContext } from '../../hooks/useContexts'
import { isToday } from '../../utils/date'
import Dialog from '../ui/Dialog'

interface StatsModalProps {
  onClose: () => void
}

// A számokat a meglévő adatokból számoljuk, nincs külön statisztika lista
function StatsModal({ onClose }: StatsModalProps) {
  const { user } = useUserContext()
  const { quests } = useQuestContext()

  const todayQuests = quests.filter((quest) => isToday(quest.date))
  const doneToday = todayQuests.filter((quest) => quest.done)

  const stats = [
    { label: 'Current streak', value: `${user.streak} days` },
    { label: 'Best streak', value: `${user.bestStreak} days` },
    { label: 'Level', value: user.level },
    { label: 'Done today', value: `${doneToday.length} / ${todayQuests.length}` },
    { label: 'Routines done', value: doneToday.filter((quest) => quest.type === 'routine').length },
    { label: 'To-dos done', value: doneToday.filter((quest) => quest.type === 'todo').length },
  ]

  return (
    <Dialog title="Stats" onClose={onClose}>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 rounded-2xl border p-3">
            <dt className="text-xs">{stat.label}</dt>
            <dd className="text-2xl">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </Dialog>
  )
}

export default StatsModal
