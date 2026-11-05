import type { Quest } from '../../models/quest'
import { useQuestContext, useUserContext } from '../../hooks/useContexts'
import ConfirmDialog from '../ui/ConfirmDialog'

interface SellToUncompleteModalProps {
  quest: Quest
  onClose: () => void
}

// Egy kész quest visszavonása: a kapott érméket vissza kell adni ("eladni")
function SellToUncompleteModal({ quest, onClose }: SellToUncompleteModalProps) {
  const { setQuestDone } = useQuestContext()
  const { changeCoins } = useUserContext()

  function sellBack() {
    setQuestDone(quest.id, false)
    changeCoins(-quest.coins)
  }

  return (
    <ConfirmDialog
      title="Uncomplete quest?"
      message={`Unchecking "${quest.title}" gives back the ${quest.coins} coins you got for it.`}
      confirmLabel={`Sell back · ${quest.coins} coins`}
      onConfirm={sellBack}
      onClose={onClose}
    />
  )
}

export default SellToUncompleteModal
