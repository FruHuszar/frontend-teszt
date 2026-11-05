import { usePresetContext } from '../../hooks/useContexts'
import { PREMIUM_DATA } from '../premium/registry'
import { ItemToggles } from '../premium/engine'
import Dialog from '../ui/Dialog'

interface CosmeticsModalProps {
  onClose: () => void
}

// Az aktív prémium téma itemjei (ruhák, színek). Sima témánál nincs mit felvenni.
function CosmeticsModal({ onClose }: CosmeticsModalProps) {
  const { activeTheme, equipped, equipItem } = usePresetContext()
  const theme = PREMIUM_DATA[activeTheme]

  return (
    <Dialog title="Cosmetics" onClose={onClose}>
      {!theme && <p>Cosmetics belong to premium themes. Apply a premium theme (like Persona) to dress it up.</p>}
      {theme && theme.slots.length === 0 && <p>{theme.label} has no cosmetic items yet.</p>}
      {theme && theme.slots.length > 0 && <ItemToggles theme={theme} equipped={equipped} onChange={equipItem} />}
    </Dialog>
  )
}

export default CosmeticsModal
