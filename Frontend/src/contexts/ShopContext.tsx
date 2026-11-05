import { createContext, useState, type ReactNode } from 'react'
import type { CatalogueItem } from '../models/catalogue'
import { CATALOGUE } from '../data/shop'

interface ShopContextValue {
  items: CatalogueItem[]
  buyItem: (id: number) => void
}

export const ShopContext = createContext<ShopContextValue | undefined>(undefined)

interface ShopProviderProps {
  children: ReactNode
}

export function ShopProvider({ children }: ShopProviderProps) {
  const [items, setItems] = useState<CatalogueItem[]>(CATALOGUE)

  // Most csak megvettnek jelöli, az érmék számát nem változtatja
  function buyItem(id: number) {
    setItems(items.map((item) => (item.id === id ? { ...item, owned: true } : item)))
  }

  return <ShopContext.Provider value={{ items, buyItem }}>{children}</ShopContext.Provider>
}
