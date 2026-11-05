import { useState } from 'react'
import { useQuestContext } from '../../hooks/useContexts'
import { isToday } from '../../utils/date'
import BoxFrame from '../dashboard/BoxFrame'
import Tabs from '../ui/Tabs'
import QuestList from './QuestList'
import AllQuestsModal from './AllQuestsModal'

const TABS = [
  { id: 'routine', label: 'Routines' },
  { id: 'todo', label: 'To-dos' },
]

interface QuestsBoxProps {
  className?: string
}

function QuestsBox({ className = '' }: QuestsBoxProps) {
  const { quests } = useQuestContext()
  const [tab, setTab] = useState('routine')
  const [allOpen, setAllOpen] = useState(false)

  const shownQuests = quests.filter((quest) => quest.type === tab && isToday(quest.date))

  return (
    <BoxFrame
      boxId="quests"
      className={className}
      action={
        <button type="button" onClick={() => setAllOpen(true)} className="rounded-full px-2 py-1 text-sm hover:bg-current/10">
          View All
        </button>
      }
    >
      <Tabs label="Quest type" tabs={TABS} active={tab} onChange={setTab} />

      <div role="tabpanel" className="min-h-0 flex-1 overflow-y-auto">
        <QuestList quests={shownQuests} />
      </div>

      {allOpen && <AllQuestsModal onClose={() => setAllOpen(false)} />}
    </BoxFrame>
  )
}

export default QuestsBox
