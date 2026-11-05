export type LayoutMode = 'grid' | 'icons'

export type BoxId = 'player' | 'sessions' | 'radar' | 'quests' | 'streak'

// title = a doboz data-el neve is, a prémium téma ez alapján találja meg
export interface DashboardBox {
  id: BoxId
  title: string
  icon: string
}

export interface LayoutOption {
  mode: LayoutMode
  label: string
  icon: string
}
