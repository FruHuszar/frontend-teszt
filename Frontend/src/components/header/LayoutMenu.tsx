import { useLayoutContext, usePresetContext } from '../../hooks/useContexts'
import { LAYOUT_OPTIONS } from '../../data/layout'
import { PREMIUM } from '../premium/registry'

// Dashboard nézet váltó (rács / ikonok), natív popover-rel mint a NotificationMenu
function LayoutMenu() {
  const { layoutMode, changeLayout } = useLayoutContext()
  const { activeTheme } = usePresetContext()
  const premium = PREMIUM[activeTheme] !== undefined

  return (
    <>
      <button
        type="button"
        popoverTarget="layout-menu"
        aria-label="Dashboard layout"
        title="Dashboard layout"
        className="grid size-10 place-items-center rounded-full hover:bg-current/10"
      >
        <span aria-hidden="true" className="material-symbols-outlined">
          grid_view
        </span>
      </button>

      <div
        id="layout-menu"
        popover="auto"
        className="inset-auto top-20 right-[5vw] m-0 w-56 rounded-2xl bg-(--color-theme-moduls) p-4 text-inherit shadow-xl"
      >
        <p className="mb-2 font-bold">Dashboard layout</p>
        <div className="flex flex-col gap-1">
          {LAYOUT_OPTIONS.map((option) => (
            <button
              key={option.mode}
              type="button"
              // popoverTargetAction="hide": választás után a menü bezárul
              popoverTarget="layout-menu"
              popoverTargetAction="hide"
              aria-pressed={layoutMode === option.mode}
              disabled={premium && option.mode !== 'grid'}
              onClick={() => changeLayout(option.mode)}
              className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-current/10 disabled:opacity-50 aria-pressed:bg-current/15"
            >
              <span aria-hidden="true" className="material-symbols-outlined">
                {option.icon}
              </span>
              {option.label}
            </button>
          ))}
        </div>
        {premium && <p className="mt-2 text-xs">Premium themes use their own layout.</p>}
      </div>
    </>
  )
}

export default LayoutMenu
