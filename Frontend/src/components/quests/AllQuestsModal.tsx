import { useQuestContext } from '../../hooks/useContexts'
import Dialog from '../ui/Dialog'
import QuestList from './QuestList'

interface AllQuestsModalProps {
  onClose: () => void
}

// Minden quest (nem csak a mai), típus szerint két csoportban
function AllQuestsModal({ onClose }: AllQuestsModalProps) {
  const { quests } = useQuestContext()

  return (
    <Dialog title="All quests" onClose={onClose}>
      <section className="flex flex-col gap-2">
        <p className="font-bold">Routines</p>
        <QuestList quests={quests.filter((quest) => quest.type === 'routine')} />
      </section>
      <section className="flex flex-col gap-2">
        <p className="font-bold">To-dos</p>
        <QuestList quests={quests.filter((quest) => quest.type === 'todo')} />
      </section>
    </Dialog>
  )
}

export default AllQuestsModal
