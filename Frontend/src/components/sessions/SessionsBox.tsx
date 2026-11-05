import { useState } from 'react'
import { useQuestContext } from '../../hooks/useContexts'
import { isToday } from '../../utils/date'
import BoxFrame from '../dashboard/BoxFrame'
import Tabs from '../ui/Tabs'
import SessionItem from './SessionItem'
import UpcomingCalendar from './UpcomingCalendar'
import SessionsModal from './SessionsModal'

const TABS = [
  { id: 'today', label: 'Today' },
  { id: 'upcoming', label: 'Upcoming' },
]

interface SessionsBoxProps {
  className?: string
}

function SessionsBox({ className = '' }: SessionsBoxProps) {
  const { sessions } = useQuestContext()
  const [tab, setTab] = useState('today')
  const [viewOpen, setViewOpen] = useState(false)

  const todaySessions = sessions.filter((session) => isToday(session.date))
  const upcomingSessions = sessions.filter((session) => !isToday(session.date))

  return (
    <BoxFrame
      boxId="sessions"
      className={className}
      action={
        <button
          type="button"
          data-el="Session count"
          aria-label={`${todaySessions.length} sessions today, view all sessions`}
          title="View all sessions"
          onClick={() => setViewOpen(true)}
          className="grid size-7 shrink-0 place-items-center rounded-full border text-sm hover:bg-current/10"
        >
          {todaySessions.length}
        </button>
      }
    >
      <Tabs label="Session range" tabs={TABS} active={tab} onChange={setTab} />

      <div role="tabpanel" className="min-h-0 flex-1 overflow-y-auto">
        {tab === 'today' ? (
          <ol className="ml-1.5 flex flex-col gap-3 border-l">
            {todaySessions.map((session) => (
              <SessionItem key={session.id} elem={session} />
            ))}
          </ol>
        ) : (
          <UpcomingCalendar sessions={upcomingSessions} />
        )}
      </div>

      {viewOpen && <SessionsModal onClose={() => setViewOpen(false)} />}
    </BoxFrame>
  )
}

export default SessionsBox
