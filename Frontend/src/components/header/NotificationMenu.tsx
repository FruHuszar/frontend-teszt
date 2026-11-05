import { useUserContext } from '../../hooks/useContexts'
import RedDot from '../ui/RedDot'

// Lenyíló lista a natív popover-rel: a böngésző nyitja/zárja (kívülre kattintás, Esc), nem kell state hozzá
function NotificationMenu() {
  const { notifications, markAllRead } = useUserContext()
  const unread = notifications.filter((notification) => !notification.read).length

  return (
    <>
      <button
        type="button"
        popoverTarget="notification-menu"
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications'}
        className="relative grid size-10 place-items-center rounded-full hover:bg-current/10"
      >
        <span aria-hidden="true" className="material-symbols-outlined">
          notifications
        </span>
        {unread > 0 && <RedDot />}
      </button>

      <div
        id="notification-menu"
        popover="auto"
        className="inset-auto top-20 right-[5vw] m-0 w-[min(90vw,20rem)] rounded-2xl bg-(--color-theme-moduls) p-4 text-inherit shadow-xl"
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="font-bold">Notifications</p>
          <button type="button" disabled={unread === 0} onClick={markAllRead} className="text-sm underline disabled:no-underline disabled:opacity-50">
            Mark all read
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          {notifications.map((notification) => (
            <li key={notification.id} className={`rounded-xl p-2 ${notification.read ? 'opacity-60' : 'bg-current/10'}`}>
              <p className="text-sm">{notification.text}</p>
              <p className="text-xs">{notification.time}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default NotificationMenu
