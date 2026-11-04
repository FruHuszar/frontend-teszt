import type { ComponentType, ReactNode } from 'react'

export interface PremiumTheme {
  key: string
  label: string
  /** wraps the dashboard (3D scene, character, own placement) */
  Layout: ComponentType<{ children: ReactNode }>
}
