import { useState, type FormEvent } from 'react'
import type { Quest } from '../../models/quest'
import { useQuestContext } from '../../hooks/useContexts'
import Dialog from '../ui/Dialog'
import FormField from '../ui/FormField'
import Button from '../ui/Button'

interface QuestFormModalProps {
  quest: Quest
  onClose: () => void
}

// Quest szerkesztése (új questet most nem lehet felvenni)
function QuestFormModal({ quest, onClose }: QuestFormModalProps) {
  const { categories, updateQuest } = useQuestContext()
  const [title, setTitle] = useState(quest.title)
  // Ha a quest kategóriáját közben törölték, az első kategória lesz kiválasztva
  const exists = categories.some((category) => category.id === quest.categoryId)
  const [categoryId, setCategoryId] = useState(exists ? quest.categoryId : categories[0].id)
  const [xp, setXp] = useState(quest.xp)
  const [coins, setCoins] = useState(quest.coins)
  const [points, setPoints] = useState(quest.points)

  const categoryOptions = categories.map((category) => ({ value: String(category.id), label: category.name }))

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateQuest({ ...quest, title, categoryId, xp, coins, points })
    onClose()
  }

  return (
    <Dialog title="Edit quest" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <FormField label="Title" value={title} onChange={setTitle} />
        <FormField label="Category" value={categoryId} options={categoryOptions} onChange={(value) => setCategoryId(Number(value))} />
        <div className="grid grid-cols-3 gap-3">
          <FormField label="XP" type="number" min={0} value={xp} onChange={(value) => setXp(Number(value))} />
          <FormField label="Coins" type="number" min={0} value={coins} onChange={(value) => setCoins(Number(value))} />
          <FormField label="Points" type="number" min={0} value={points} onChange={(value) => setPoints(Number(value))} />
        </div>
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" primary>
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default QuestFormModal
