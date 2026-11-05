import { useState } from 'react'
import { useUserContext } from '../../hooks/useContexts'
import Button from '../ui/Button'
import ProfileBadge from './ProfileBadge'
import NotificationMenu from './NotificationMenu'
import LayoutMenu from './LayoutMenu'
import ThemeModal from '../theme/ThemeModal'
import ShopModal from '../shop/ShopModal'

function Header() {
  const { user } = useUserContext()
  const [themeOpen, setThemeOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)

  const xpPercent = Math.round((user.xp / user.xpToNext) * 100)

  return (
    <header
      data-el="Header"
      className="mx-auto flex w-[90vw] flex-col items-center gap-x-6 gap-y-3 rounded-3xl bg-(--color-theme-moduls) px-6 py-3 sm:flex-row sm:flex-wrap sm:justify-between md:flex-nowrap md:rounded-full md:py-2"
    >
      <ProfileBadge />

      <div data-el="XP" className="order-last flex w-full items-center gap-3 md:order-none md:max-w-md md:flex-1">
        <div
          data-el="XP Bar"
          role="progressbar"
          aria-label="Experience points"
          aria-valuemin={0}
          aria-valuemax={user.xpToNext}
          aria-valuenow={user.xp}
          className="h-2 flex-1 rounded-full bg-current/15"
        >
          {/* max(1em, ...): 0 XP-nél is látszódjon egy kicsi a csíkból */}
          <div className="h-full rounded-full bg-(image:--gradient)" style={{ width: `max(1em, ${xpPercent}%)` }} />
        </div>
        <span data-el="XP Text" className="shrink-0 text-sm">
          {user.xp} / {user.xpToNext} XP
        </span>
      </div>

      <nav data-el="User menu" aria-label="User menu">
        <ul className="flex flex-wrap items-center justify-center gap-1">
          <li>
            <NotificationMenu />
          </li>
          <li>
            <LayoutMenu />
          </li>
          <li data-el="Coins" className="flex items-center gap-1 px-2">
            <span aria-hidden="true" className="material-symbols-outlined">
              monetization_on
            </span>
            <data value={user.coins}>{user.coins}</data>
            <span className="sr-only">coins</span>
          </li>
          <li>
            <Button icon="palette" label="Change theme" onClick={() => setThemeOpen(true)} />
          </li>
          <li>
            <Button icon="shopping_cart" label="Shop" onClick={() => setShopOpen(true)} />
          </li>
          <li className="basis-full text-center sm:basis-auto">
            {/* Kijelentkezés: egyelőre nem csinál semmit */}
            <button type="button" className="rounded-full px-3 py-2 text-sm hover:bg-current/10">
              Log out
            </button>
          </li>
        </ul>
      </nav>

      {themeOpen && <ThemeModal onClose={() => setThemeOpen(false)} />}
      {shopOpen && <ShopModal onClose={() => setShopOpen(false)} />}
    </header>
  )
}

export default Header
