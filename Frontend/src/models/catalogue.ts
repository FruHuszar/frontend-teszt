export type CatalogueItemType = 'theme' | 'cosmetic' | 'consumable' | 'sound'

// Egy bolti termék
export interface CatalogueItem {
  id: number
  name: string
  description: string
  type: CatalogueItemType
  icon: string
  price: number
  owned: boolean
}
