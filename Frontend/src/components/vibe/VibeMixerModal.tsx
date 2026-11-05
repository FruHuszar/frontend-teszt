import { usePlayerContext } from '../../hooks/useContexts'
import Dialog from '../ui/Dialog'
import FormField from '../ui/FormField'
import Toggle from '../ui/Toggle'

interface VibeMixerModalProps {
  onClose: () => void
}

// Háttérhangok hangereje + képernyő effektek. Hang még nem szól, csak az állapot változik.
function VibeMixerModal({ onClose }: VibeMixerModalProps) {
  const { ambientSounds, setAmbientVolume, effects, toggleEffect } = usePlayerContext()

  return (
    <Dialog title="Vibe mixer" onClose={onClose}>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 font-bold">Ambient sounds</legend>
        {ambientSounds.map((sound, i) => (
          <FormField
            key={sound.id}
            label={`${sound.name} · ${sound.volume}%`}
            type="range"
            min={0}
            max={100}
            value={sound.volume}
            onChange={(value) => setAmbientVolume(i, Number(value))}
          />
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 font-bold">Visual effects</legend>
        {effects.map((effect, i) => (
          <div key={effect.id} className="flex items-center justify-between gap-3">
            <span>{effect.name}</span>
            <Toggle label={effect.name} checked={effect.enabled} onChange={() => toggleEffect(i)} />
          </div>
        ))}
      </fieldset>
    </Dialog>
  )
}

export default VibeMixerModal
