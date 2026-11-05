import { usePlayerContext } from '../../hooks/useContexts'

// A bekapcsolt effektek rétegei a teljes képernyő fölött. pointer-events-none: nem fogja meg a kattintást.
function VisualEffectsLayer() {
  const { effects } = usePlayerContext()

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30">
      {effects
        .filter((effect) => effect.enabled)
        .map((effect) => (
          <div key={effect.id} className={`absolute inset-0 ${effect.className}`} />
        ))}
    </div>
  )
}

export default VisualEffectsLayer
