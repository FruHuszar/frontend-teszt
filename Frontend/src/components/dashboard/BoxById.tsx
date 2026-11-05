import type { BoxId } from '../../models/layout'
import VibeControllerBox from '../player/VibeControllerBox'
import SessionsBox from '../sessions/SessionsBox'
import RadarBox from '../radar/RadarBox'
import QuestsBox from '../quests/QuestsBox'
import StreakBox from '../streak/StreakBox'

interface BoxByIdProps {
  id: BoxId
  className?: string
}

// Az id alapján kirajzolja a megfelelő dobozt (a rács és az ikon nézet is ezt használja)
function BoxById({ id, className }: BoxByIdProps) {
  if (id === 'player') return <VibeControllerBox className={className} />
  if (id === 'sessions') return <SessionsBox className={className} />
  if (id === 'radar') return <RadarBox className={className} />
  if (id === 'quests') return <QuestsBox className={className} />
  return <StreakBox className={className} />
}

export default BoxById
