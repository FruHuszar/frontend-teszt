import { useState } from 'react'
import { useUserContext } from '../../hooks/useContexts'
import BoxFrame from '../dashboard/BoxFrame'
import Button from '../ui/Button'
import ConfirmDialog from '../ui/ConfirmDialog'
import StatsModal from './StatsModal'

interface StreakBoxProps {
  className?: string
}

function StreakBox({ className = '' }: StreakBoxProps) {
  const { user, freezeStreak } = useUserContext()
  const [statsOpen, setStatsOpen] = useState(false)
  const [freezeOpen, setFreezeOpen] = useState(false)

  return (
    <BoxFrame
      boxId="streak"
      className={className}
      action={<Button icon="bar_chart" label="Open stats" onClick={() => setStatsOpen(true)} />}
    >
      {/* A szám és a gomb a doboz közepén, hogy ne legyen nagy üres rész felül */}
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4">
        <p data-el="Streak count" className="flex items-center gap-2">
          {/* text-4xl! = !important, különben a Google ikon CSS 24px-e nyerne */}
          <span aria-hidden="true" className="material-symbols-outlined text-4xl! text-(--color-theme-accent)">
            local_fire_department
          </span>
          <span className="text-5xl leading-none">{user.streak}</span>
          <span className="self-end">day streak</span>
        </p>
        <Button icon="ac_unit" disabled={user.frozenToday} onClick={() => setFreezeOpen(true)} className="text-sm">
          {user.frozenToday ? 'Frozen for today' : 'Freeze for today'}
        </Button>
      </div>

      {statsOpen && <StatsModal onClose={() => setStatsOpen(false)} />}
      {freezeOpen && (
        <ConfirmDialog
          title="Freeze your streak?"
          message="Your streak stays safe today even if you don't complete any quests."
          confirmLabel="Freeze"
          onConfirm={freezeStreak}
          onClose={() => setFreezeOpen(false)}
        />
      )}
    </BoxFrame>
  )
}

export default StreakBox
