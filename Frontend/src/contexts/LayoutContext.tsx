import { createContext, useState, type ReactNode } from 'react'
import type { BoxId, LayoutMode } from '../models/layout'
import { DASHBOARD_BOXES } from '../data/layout'

interface LayoutContextValue {
  layoutMode: LayoutMode
  changeLayout: (mode: LayoutMode) => void
  boxOrder: BoxId[]
  swapBoxes: (from: BoxId, to: BoxId) => void
}

export const LayoutContext = createContext<LayoutContextValue | undefined>(undefined)

interface LayoutProviderProps {
  children: ReactNode
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('grid')
  // Melyik doboz melyik helyen (slot) van a rácsban: boxOrder[0] az 1. helyen, ...
  const [boxOrder, setBoxOrder] = useState<BoxId[]>(DASHBOARD_BOXES.map((box) => box.id))

  function changeLayout(mode: LayoutMode) {
    setLayoutMode(mode)
  }

  // Két doboz helyet cserél (drag & drop)
  function swapBoxes(from: BoxId, to: BoxId) {
    const fromIndex = boxOrder.indexOf(from)
    const toIndex = boxOrder.indexOf(to)
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return

    const newOrder = [...boxOrder]
    newOrder[fromIndex] = to
    newOrder[toIndex] = from
    setBoxOrder(newOrder)
  }

  return (
    <LayoutContext.Provider value={{ layoutMode, changeLayout, boxOrder, swapBoxes }}>
      {children}
    </LayoutContext.Provider>
  )
}
