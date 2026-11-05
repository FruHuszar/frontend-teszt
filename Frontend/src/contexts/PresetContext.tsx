import { createContext, useState, type ReactNode } from 'react'
import type { CustomColors, ThemeOption } from '../models/customization'
import type { Equipped } from '../components/premium/engine'
import { THEMES } from '../data/themes'
import { clearCustomPalette, setCustomPalette } from '../utils/palette'

interface PresetContextValue {
  themes: ThemeOption[]
  activeTheme: string
  applyTheme: (key: string) => void
  customImages: string[]
  applyCustomTheme: (colors: CustomColors, images: string[]) => void
  equipped: Equipped
  equipItem: (slot: string, key: string | null) => void
}

export const PresetContext = createContext<PresetContextValue | undefined>(undefined)

interface PresetProviderProps {
  children: ReactNode
}

// A felhasználó beállításai: aktív téma, saját téma képei, prémium témán felvett itemek.
// Semmit nem mentünk a böngészőbe, frissítés után minden az alapra áll vissza.
export function PresetProvider({ children }: PresetProviderProps) {
  const [activeTheme, setActiveTheme] = useState<string>('default')
  // A saját téma 3 képe (üres szöveg = még nincs kép az adott helyen)
  const [customImages, setCustomImages] = useState<string[]>(['', '', ''])
  const [equipped, setEquipped] = useState<Equipped>({})

  function applyTheme(key: string) {
    clearCustomPalette()
    setActiveTheme(key)
    // A téma CSS fájljai a :root[data-theme="..."] szelektorra figyelnek
    document.documentElement.dataset.theme = key
  }

  function applyCustomTheme(colors: CustomColors, images: string[]) {
    setCustomImages(images)
    setActiveTheme('custom')
    document.documentElement.dataset.theme = 'custom'
    setCustomPalette(colors)
  }

  function equipItem(slot: string, key: string | null) {
    setEquipped({ ...equipped, [slot]: key })
  }

  return (
    <PresetContext.Provider
      value={{ themes: THEMES, activeTheme, applyTheme, customImages, applyCustomTheme, equipped, equipItem }}
    >
      {children}
    </PresetContext.Provider>
  )
}
