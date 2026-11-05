import { useLayoutContext } from '../../hooks/useContexts'
import BoxById from './BoxById'

// A rács 5 helye (slot): asztali nézetben 3 oszlop x 2 sor, a középső hely két sor magas.
// A boxOrder mondja meg, melyik doboz melyik helyen áll, húzással ez cserélődik.
const SLOTS = [
  'lg:col-start-1 lg:row-start-1',
  'lg:col-start-1 lg:row-start-2',
  'md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1',
  'lg:col-start-3 lg:row-start-1',
  'lg:col-start-3 lg:row-start-2',
]

function GridLayout() {
  const { boxOrder } = useLayoutContext()

  return (
    <main
      data-el="Dashboard"
      className="mx-auto grid w-[90vw] flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:min-h-0 lg:grid-cols-3 lg:grid-rows-2"
    >
      {/* key = a doboz id-ja: csere után a React csak áthelyezi a dobozt, a belső állapota (pl. fül) megmarad */}
      {boxOrder.map((id, slot) => (
        <BoxById key={id} id={id} className={SLOTS[slot]} />
      ))}
    </main>
  )
}

export default GridLayout
