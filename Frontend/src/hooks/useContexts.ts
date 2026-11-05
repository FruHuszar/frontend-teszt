import { useContext, type Context } from 'react'
import { UserContext } from '../contexts/UserContext'
import { QuestContext } from '../contexts/QuestContext'
import { PresetContext } from '../contexts/PresetContext'
import { LayoutContext } from '../contexts/LayoutContext'
import { ShopContext } from '../contexts/ShopContext'
import { PlayerContext } from '../contexts/PlayerContext'

// Egy közös hook minden contexthez: visszaadja az értékét, vagy hibát dob, ha nincs körülötte a Provider.
// <T>: bármilyen context típussal működik, így nem kell hatszor ugyanazt megírni.
function useRequiredContext<T>(context: Context<T | undefined>, name: string): T {
  const value = useContext(context)

  if (value === undefined) {
    throw new Error(`${name} can only be used inside its Provider.`)
  }
  return value
}

// A komponensek ezeket használják, pl. const { quests } = useQuestContext()
export const useUserContext = () => useRequiredContext(UserContext, 'useUserContext')
export const useQuestContext = () => useRequiredContext(QuestContext, 'useQuestContext')
export const usePresetContext = () => useRequiredContext(PresetContext, 'usePresetContext')
export const useLayoutContext = () => useRequiredContext(LayoutContext, 'useLayoutContext')
export const useShopContext = () => useRequiredContext(ShopContext, 'useShopContext')
export const usePlayerContext = () => useRequiredContext(PlayerContext, 'usePlayerContext')
