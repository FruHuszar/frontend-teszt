import { useState } from 'react'
import { useQuestContext } from '../../hooks/useContexts'
import BoxFrame from '../dashboard/BoxFrame'
import Button from '../ui/Button'
import EditCategoriesModal from './EditCategoriesModal'

const CENTER = 100
const RADIUS = 70
const RINGS = [25, 50, 75, 100]

// Az i. tengely pontja a value (0-100) értéknél. A 0. tengely felfelé mutat (-90°).
function point(i: number, count: number, value: number) {
  const angle = (Math.PI * 2 * i) / count - Math.PI / 2
  const r = (RADIUS * value) / 100
  return { x: CENTER + r * Math.cos(angle), y: CENTER + r * Math.sin(angle) }
}

interface RadarBoxProps {
  className?: string
}

function RadarBox({ className = '' }: RadarBoxProps) {
  const { categories } = useQuestContext()
  const [editOpen, setEditOpen] = useState(false)
  const count = categories.length

  // SVG polygon: "x,y x,y x,y ..." formátumú pontlista
  function polygon(values: number[]) {
    return values
      .map((value, i) => {
        const p = point(i, count, value)
        return `${p.x},${p.y}`
      })
      .join(' ')
  }

  return (
    <BoxFrame
      boxId="radar"
      className={className}
      action={<Button icon="edit" label="Edit balance categories" onClick={() => setEditOpen(true)} />}
    >
      <figure className="grid flex-1 place-items-center lg:min-h-0">
        <svg data-el="Radar Chart" viewBox="-60 0 320 200" className="w-full max-w-sm lg:max-h-full">
          {/* Kör alakú háttér gyűrűk: 1-2 kategóriánál is látszanak */}
          {RINGS.map((ring) => (
            <circle key={ring} cx={CENTER} cy={CENTER} r={(RADIUS * ring) / 100} fill="none" stroke="currentColor" opacity={0.2} />
          ))}
          {categories.map((category, i) => (
            <line key={category.id} x1={CENTER} y1={CENTER} x2={point(i, count, 100).x} y2={point(i, count, 100).y} stroke="currentColor" opacity={0.2} />
          ))}
          <polygon
            points={polygon(categories.map((category) => category.value))}
            fill="var(--color-theme-accent)"
            fillOpacity={0.35}
            stroke="var(--color-theme-accent)"
            strokeWidth={2}
          />
          {/* Pötty minden értéknél, mert 1-2 kategóriánál a sokszög csak egy pont vagy vonal */}
          {categories.map((category, i) => (
            <circle key={category.id} cx={point(i, count, category.value).x} cy={point(i, count, category.value).y} r={3} fill="var(--color-theme-accent)" />
          ))}
          {categories.map((category, i) => {
            const label = point(i, count, 122)
            // Jobb oldalon balra, bal oldalon jobbra igazítjuk a feliratot, hogy ne lógjon a diagramba
            const anchor = label.x > CENTER + 5 ? 'start' : label.x < CENTER - 5 ? 'end' : 'middle'
            return (
              <text key={category.id} x={label.x} y={label.y} textAnchor={anchor} dominantBaseline="middle" fontSize={11} fill="currentColor">
                {category.name}
              </text>
            )
          })}
        </svg>
        <figcaption className="sr-only">
          Balance: {categories.map((category) => `${category.name} ${category.value}%`).join(', ')}
        </figcaption>
      </figure>

      {editOpen && <EditCategoriesModal onClose={() => setEditOpen(false)} />}
    </BoxFrame>
  )
}

export default RadarBox
