import { useState } from 'react'
import VibeMixerModal from './VibeMixerModal'

// A jobb alsó sarokban lebegő gomb. A data-el="Mixer button" a prémium témának kell, maradjon a <button>-on.
function VibeFloatingButton() {
  const [mixerOpen, setMixerOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        data-el="Mixer button"
        aria-label="Open mixer"
        title="Open mixer"
        onClick={() => setMixerOpen(true)}
        className="fixed right-6 bottom-6 z-20 grid size-18 place-items-center rounded-full border bg-(--color-theme-moduls) shadow-lg hover:brightness-95"
      >
        {/* text-4xl! = !important, különben a Google ikon CSS 24px-e nyerne */}
        <span aria-hidden="true" className="material-symbols-outlined text-4xl!">
          tune
        </span>
      </button>

      {mixerOpen && <VibeMixerModal onClose={() => setMixerOpen(false)} />}
    </>
  )
}

export default VibeFloatingButton
