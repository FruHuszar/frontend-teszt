import { useState } from 'react'
import type { BoxId } from '../../models/layout'
import { DASHBOARD_BOXES } from '../../data/layout'
import { useLayoutContext } from '../../hooks/useContexts'
import Dialog from '../ui/Dialog'
import BoxById from './BoxById'

// Minden doboz egy ikon csempe (a rács sorrendjében), kattintásra a doboz egy modalban nyílik meg
function IconLayout() {
  const { boxOrder } = useLayoutContext()
  const [openBox, setOpenBox] = useState<BoxId | null>(null)

  const boxes = boxOrder.map((id) => DASHBOARD_BOXES.find((box) => box.id === id)!)
  const openTitle = boxes.find((box) => box.id === openBox)?.title ?? ''

  return (
    <main className="mx-auto grid w-[90vw] grid-cols-2 content-start gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {boxes.map((box) => (
        <button
          key={box.id}
          type="button"
          onClick={() => setOpenBox(box.id)}
          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl bg-(--color-theme-moduls) p-4 hover:opacity-90"
        >
          {/* text-5xl! = !important, különben a Google ikon CSS 24px-e nyerne */}
          <span aria-hidden="true" className="material-symbols-outlined text-5xl!">
            {box.icon}
          </span>
          {box.title}
        </button>
      ))}

      {openBox && (
        <Dialog title={openTitle} hideTitle onClose={() => setOpenBox(null)}>
          <BoxById id={openBox} />
        </Dialog>
      )}
    </main>
  )
}

export default IconLayout
