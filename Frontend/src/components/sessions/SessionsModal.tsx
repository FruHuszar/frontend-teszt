import { useQuestContext } from '../../hooks/useContexts'
import Dialog from '../ui/Dialog'
import UpcomingCalendar from './UpcomingCalendar'

interface SessionsModalProps {
  onClose: () => void
}

// Csak megtekintés: minden session naponként (ma + a következő napok), kapcsolók nélkül
function SessionsModal({ onClose }: SessionsModalProps) {
  const { sessions } = useQuestContext()

  return (
    <Dialog title="Sessions" onClose={onClose}>
      <UpcomingCalendar sessions={sessions} readOnly />
    </Dialog>
  )
}

export default SessionsModal
