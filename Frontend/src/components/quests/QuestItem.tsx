import { useState } from 'react'
import type { Quest } from '../../models/quest'
import { useQuestContext, useUserContext } from '../../hooks/useContexts'
import { formatDay, isToday } from '../../utils/date'
import Button from '../ui/Button'
import QuestFormModal from './QuestFormModal'
import SellToUncompleteModal from './SellToUncompleteModal'

interface QuestItemProps {
  elem: Quest
}

function QuestItem({ elem }: QuestItemProps) {
  const { categories, setQuestDone } = useQuestContext()
  const { changeCoins } = useUserContext()
  const [editOpen, setEditOpen] = useState(false)
  const [sellOpen, setSellOpen] = useState(false)
  // Ha a kategóriát közben törölték a radarból, nincs mit kiírni
  const category = categories.find((c) => c.id === elem.categoryId)

  // Kész questet csak az érmék "visszaadásával" lehet visszavonni, ezért ott előbb rákérdezünk
  function handleCheck() {
    if (elem.done) {
      setSellOpen(true)
    } else {
      setQuestDone(elem.id, true)
      changeCoins(elem.coins)
    }
  }

  return (
    <li className="flex items-center gap-2 rounded-2xl border py-1.5 pr-1.5 pl-3">
      <label className="group flex min-w-0 flex-1 cursor-pointer items-center gap-3">
        <input type="checkbox" checked={elem.done} onChange={handleCheck} className="size-4 shrink-0 accent-(--color-theme-accent)" />
        <span className="flex min-w-0 flex-col">
          <span className="group-has-checked:line-through">{elem.title}</span>
          <span className="text-xs opacity-80">
            +{elem.xp} XP · +{elem.coins} coins
            {category && ` · +${elem.points} ${category.name}`}
            {!isToday(elem.date) && ` · ${formatDay(elem.date)}`}
          </span>
        </span>
      </label>
      <Button icon="edit" label={`Edit ${elem.title}`} onClick={() => setEditOpen(true)} />

      {editOpen && <QuestFormModal quest={elem} onClose={() => setEditOpen(false)} />}
      {sellOpen && <SellToUncompleteModal quest={elem} onClose={() => setSellOpen(false)} />}
    </li>
  )
}

export default QuestItem
