import type { Quest } from '../../models/quest'
import QuestItem from './QuestItem'

interface QuestListProps {
  quests: Quest[]
}

function QuestList({ quests }: QuestListProps) {
  if (quests.length === 0) {
    return <p className="text-sm">Nothing here yet.</p>
  }

  return (
    <ul className="flex flex-col gap-2">
      {quests.map((quest) => (
        <QuestItem key={quest.id} elem={quest} />
      ))}
    </ul>
  )
}

export default QuestList
