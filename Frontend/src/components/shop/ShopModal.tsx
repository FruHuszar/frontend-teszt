import { useShopContext, useUserContext } from '../../hooks/useContexts'
import Dialog from '../ui/Dialog'
import ShopItemCard from './ShopItemCard'

interface ShopModalProps {
  onClose: () => void
}

function ShopModal({ onClose }: ShopModalProps) {
  const { items } = useShopContext()
  const { user } = useUserContext()

  return (
    <Dialog title="Shop" onClose={onClose}>
      <p className="flex items-center gap-1">
        <span aria-hidden="true" className="material-symbols-outlined">
          monetization_on
        </span>
        {user.coins} coins
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <ShopItemCard key={item.id} elem={item} />
        ))}
      </ul>
    </Dialog>
  )
}

export default ShopModal
