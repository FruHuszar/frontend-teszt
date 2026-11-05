import type { Session } from '../../models/quest'
import { formatDay, isToday } from '../../utils/date'
import SessionItem from './SessionItem'

interface UpcomingCalendarProps {
  sessions: Session[]
  readOnly?: boolean
}

// Sessionök naponként csoportosítva (az Upcoming fül és a Sessions modal is ezt használja)
function UpcomingCalendar({ sessions, readOnly = false }: UpcomingCalendarProps) {
  // Minden nap csak egyszer (a Set kiszűri az ismétlődést), időrendben
  const days = [...new Set(sessions.map((session) => session.date))].sort()

  if (days.length === 0) {
    return <p className="text-sm">No upcoming sessions.</p>
  }

  return (
    <div className="flex flex-col gap-4">
      {days.map((day) => (
        <div key={day} className="flex flex-col gap-2">
          <p className="text-sm font-bold">{isToday(day) ? 'Today' : formatDay(day)}</p>
          <ol className="ml-1.5 flex flex-col gap-3 border-l">
            {sessions
              .filter((session) => session.date === day)
              .map((session) => (
                <SessionItem key={session.id} elem={session} readOnly={readOnly} />
              ))}
          </ol>
        </div>
      ))}
    </div>
  )
}

export default UpcomingCalendar
