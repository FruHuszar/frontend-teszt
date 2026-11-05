import { usePresetContext } from '../../hooks/useContexts'
import Dialog from '../ui/Dialog'
import Carousel from '../ui/Carousel'
import Button from '../ui/Button'
import CustomThemeForm from './CustomThemeForm'

interface ThemeModalProps {
  onClose: () => void
}

// 1 dia = 1 téma: 3 előnézeti kép + Apply gomb alul. Az utolsó dia a saját téma űrlapja.
function ThemeModal({ onClose }: ThemeModalProps) {
  const { themes, activeTheme, applyTheme } = usePresetContext()

  function handleApply(key: string) {
    applyTheme(key)
    onClose()
  }

  const slides = themes.map((theme) => (
    <div key={theme.key} className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h3>{theme.label}</h3>
        {theme.premium && <span className="rounded-full border px-2 text-xs">Premium</span>}
      </div>
      <p className="text-sm">{theme.description}</p>

      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) =>
          theme.images[i] ? (
            <img key={i} src={theme.images[i]} alt={`${theme.label} preview ${i + 1}`} className="aspect-[3/4] w-full rounded-xl bg-current/10 object-cover" />
          ) : (
            // Helyőrző, amíg nincs kép a témához
            <div key={i} className="grid aspect-[3/4] place-items-center rounded-xl bg-current/10 text-xs">
              Preview {i + 1}
            </div>
          ),
        )}
      </div>

      <Button primary disabled={activeTheme === theme.key} onClick={() => handleApply(theme.key)}>
        {activeTheme === theme.key ? 'Applied' : 'Apply'}
      </Button>
    </div>
  ))

  return (
    <Dialog title="Themes" onClose={onClose}>
      <Carousel label="Themes" slides={[...slides, <CustomThemeForm key="custom" onApplied={onClose} />]} />
    </Dialog>
  )
}

export default ThemeModal
