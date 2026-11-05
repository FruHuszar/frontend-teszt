import { useId, useRef, useState, type DragEvent, type ReactNode } from 'react'
import type { BoxId } from '../../models/layout'
import { DASHBOARD_BOXES } from '../../data/layout'
import { useLayoutContext, usePresetContext } from '../../hooks/useContexts'
import { PREMIUM } from '../premium/registry'

interface BoxFrameProps {
  boxId: BoxId
  action?: ReactNode
  className?: string
  children: ReactNode
}

// Egy dashboard doboz kerete: fogó ikon + cím + opcionális gomb a jobb felső sarokban.
// A data-el = a doboz címe: a prémium téma ez alapján helyezi el a dobozt.
function BoxFrame({ boxId, action, className = '', children }: BoxFrameProps) {
  const titleId = useId()
  const sectionRef = useRef<HTMLElement>(null)
  const { layoutMode, swapBoxes } = useLayoutContext()
  const { activeTheme } = usePresetContext()
  const [dropTarget, setDropTarget] = useState(false)

  const title = DASHBOARD_BOXES.find((box) => box.id === boxId)?.title
  // Húzni csak a sima rács nézetben lehet (prémium témánál a téma rendezi a dobozokat)
  const canDrag = layoutMode === 'grid' && PREMIUM[activeTheme] === undefined

  function handleDragStart(e: DragEvent) {
    e.dataTransfer.setData('text/plain', boxId)
    // Húzás közben az egész doboz képe látszódjon, ne csak a kis ikoné
    if (sectionRef.current) e.dataTransfer.setDragImage(sectionRef.current, 24, 24)
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault() // enélkül a böngésző nem engedi ide ejteni
    setDropTarget(true)
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    setDropTarget(false)
    swapBoxes(e.dataTransfer.getData('text/plain') as BoxId, boxId)
  }

  return (
    <section
      ref={sectionRef}
      data-el={title}
      // A kiemelés data-attribútummal megy, nem a className változtatásával,
      // mert a prémium téma átírja a className-et, és azt nem szabad elrontani
      data-drop-target={dropTarget}
      aria-labelledby={titleId}
      onDragOver={canDrag ? handleDragOver : undefined}
      onDragLeave={canDrag ? () => setDropTarget(false) : undefined}
      onDrop={canDrag ? handleDrop : undefined}
      className={`flex flex-col gap-3 rounded-3xl bg-(--color-theme-moduls) p-5 outline-offset-2 data-[drop-target=true]:outline-2 data-[drop-target=true]:outline-dashed lg:min-h-0 lg:overflow-hidden ${className}`}
    >
      <div className="flex min-h-10 shrink-0 items-center gap-1">
        {canDrag && (
          <span
            draggable
            onDragStart={handleDragStart}
            onDragEnd={() => setDropTarget(false)}
            title="Drag to swap boxes"
            aria-hidden="true"
            className="material-symbols-outlined -ml-1.5 cursor-grab opacity-50 hover:opacity-100 active:cursor-grabbing"
          >
            drag_indicator
          </span>
        )}
        <h2 id={titleId} className="min-w-0 flex-1 truncate">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  )
}

export default BoxFrame
