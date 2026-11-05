import type { DashboardBox, LayoutOption } from '../models/layout'

// A title egyben a doboz data-el neve, ezt a prémium téma (Persona) keresi, ne írd át!
export const DASHBOARD_BOXES: DashboardBox[] = [
  { id: 'player', title: 'Music Player', icon: 'music_note' },
  { id: 'sessions', title: "Today's Sessions", icon: 'event' },
  { id: 'radar', title: 'Balance Radar', icon: 'radar' },
  { id: 'quests', title: "Today's Quests", icon: 'task_alt' },
  { id: 'streak', title: 'Streak', icon: 'local_fire_department' },
]

export const LAYOUT_OPTIONS: LayoutOption[] = [
  { mode: 'grid', label: 'Grid', icon: 'grid_view' },
  { mode: 'icons', label: 'Icons', icon: 'apps' },
]
