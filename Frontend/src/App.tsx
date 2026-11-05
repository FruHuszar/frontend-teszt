import { usePresetContext } from './hooks/useContexts'
import { PREMIUM } from './components/premium/registry'
import Header from './components/header/Header'
import Dashboard from './components/dashboard/Dashboard'
import VibeFloatingButton from './components/vibe/VibeFloatingButton'
import VisualEffectsLayer from './components/vibe/VisualEffectsLayer'

function App() {
  const { activeTheme, equipped } = usePresetContext()

  // Prémium témánál (pl. Persona) a téma Layout-ja teszi a 3D hátteret a dashboard mögé
  const premium = PREMIUM[activeTheme]

  return (
    <div className="flex min-h-dvh flex-col gap-4 pt-4 pb-24 lg:h-dvh lg:overflow-hidden lg:pb-4">
      <Header />

      {premium ? (
        <premium.Layout equipped={equipped}>
          <Dashboard />
        </premium.Layout>
      ) : (
        <Dashboard />
      )}

      <VibeFloatingButton />
      <VisualEffectsLayer />
    </div>
  )
}

export default App
