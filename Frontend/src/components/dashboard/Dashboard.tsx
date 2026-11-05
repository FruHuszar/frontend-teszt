import { useLayoutContext, usePresetContext } from '../../hooks/useContexts'
import { PREMIUM } from '../premium/registry'
import GridLayout from './GridLayout'
import IconLayout from './IconLayout'

function Dashboard() {
  const { layoutMode } = useLayoutContext()
  const { activeTheme } = usePresetContext()

  // A prémium téma a rácsos nézet dobozait rendezi át, ezért ott mindig a rács kell
  if (layoutMode === 'icons' && PREMIUM[activeTheme] === undefined) {
    return <IconLayout />
  }
  return <GridLayout />
}

export default Dashboard
