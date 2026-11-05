import type { CatalogueItem } from '../../models/catalogue'
import { useShopContext, useUserContext } from '../../hooks/useContexts'
import Button from '../ui/Button'

interface ShopItemCardProps {
  elem: CatalogueItem
}

function ShopItemCard({ elem }: ShopItemCardProps) {
  const { buyItem } = useShopContext()
  const { user, changeCoins } = useUserContext()
  const canAfford = user.coins >= elem.price

  function handleBuy() {
    buyItem(elem.id)
    changeCoins(-elem.price)
  }

  let label = `Buy · ${elem.price} coins`
  if (elem.owned) label = 'Owned'
  else if (!canAfford) label = `Not enough coins (${elem.price})`

  return (
    <li className="flex flex-col gap-2 rounded-2xl border p-4">
      <span aria-hidden="true" className="material-symbols-outlined">
        {elem.icon}
      </span>
      <p className="font-bold">{elem.name}</p>
      <p className="flex-1 text-sm">{elem.description}</p>
      <Button primary={!elem.owned} disabled={elem.owned || !canAfford} onClick={handleBuy}>
        {label}
      </Button>
    </li>
  )
}

export default ShopItemCard
