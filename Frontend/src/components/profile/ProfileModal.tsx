import { useState } from 'react'
import { useUserContext } from '../../hooks/useContexts'
import { LEVEL_RANKS } from '../../data/levelRanks'
import Dialog from '../ui/Dialog'
import Button from '../ui/Button'
import CosmeticsModal from '../theme/CosmeticsModal'

interface ProfileModalProps {
  onClose: () => void
}

function ProfileModal({ onClose }: ProfileModalProps) {
  const { user } = useUserContext()
  const [cosmeticsOpen, setCosmeticsOpen] = useState(false)

  // A legmagasabb rang, aminek a minimum szintjét már elérte
  const rank = LEVEL_RANKS.filter((r) => user.level >= r.minLevel).at(-1)

  const details = [
    { label: 'XP', value: `${user.xp} / ${user.xpToNext}` },
    { label: 'Coins', value: user.coins },
    { label: 'Streak', value: `${user.streak} days` },
  ]

  return (
    <Dialog title="Profile" onClose={onClose}>
      <div className="flex items-center gap-4">
        <img src={user.avatar} alt="" className="size-20 shrink-0 rounded-full object-cover" />
        <div className="flex flex-col">
          <p className="text-xl">{user.name}</p>
          <p className="text-sm">
            Lvl {user.level} · {rank?.title}
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-3">
        {details.map((detail) => (
          <div key={detail.label} className="flex flex-col gap-1 rounded-2xl border p-3">
            <dt className="text-xs">{detail.label}</dt>
            <dd>{detail.value}</dd>
          </div>
        ))}
      </dl>

      <Button icon="checkroom" onClick={() => setCosmeticsOpen(true)} className="self-start">
        Cosmetics
      </Button>

      {cosmeticsOpen && <CosmeticsModal onClose={() => setCosmeticsOpen(false)} />}
    </Dialog>
  )
}

export default ProfileModal
