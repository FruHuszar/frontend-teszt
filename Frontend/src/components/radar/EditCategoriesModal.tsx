import { useState, type FormEvent } from 'react'
import type { BalanceCategory } from '../../models/quest'
import { useQuestContext } from '../../hooks/useContexts'
import Dialog from '../ui/Dialog'
import FormField from '../ui/FormField'
import Button from '../ui/Button'

const MIN_CATEGORIES = 1
const MAX_CATEGORIES = 8

interface EditCategoriesModalProps {
  onClose: () => void
}

// A radar tengelyei: átnevezés, + új, - törlés (1-8 darab). Az értékeket a questek adják, itt nem állíthatók.
// A módosítások csak Save után kerülnek a contextbe.
function EditCategoriesModal({ onClose }: EditCategoriesModalProps) {
  const { categories, updateCategories } = useQuestContext()
  const [draft, setDraft] = useState<BalanceCategory[]>(categories)

  function rename(index: number, name: string) {
    const newDraft = [...draft]
    newDraft[index] = { ...newDraft[index], name: name }
    setDraft(newDraft)
  }

  function addCategory() {
    // Új id: a legnagyobb meglévő + 1. Az érték 0, mert még egy quest sem adott rá pontot.
    const newId = Math.max(0, ...draft.map((category) => category.id)) + 1
    setDraft([...draft, { id: newId, name: `Category ${draft.length + 1}`, value: 0 }])
  }

  function removeCategory(id: number) {
    setDraft(draft.filter((category) => category.id !== id))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateCategories(draft)
    onClose()
  }

  return (
    <Dialog title="Balance categories" onClose={onClose}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {draft.map((category, i) => (
          <div key={category.id} className="flex items-end gap-2">
            <div className="flex-1">
              <FormField label={`Category ${i + 1}`} value={category.name} onChange={(name) => rename(i, name)} />
            </div>
            <Button
              icon="remove"
              label={`Remove ${category.name}`}
              disabled={draft.length <= MIN_CATEGORIES}
              onClick={() => removeCategory(category.id)}
            />
          </div>
        ))}

        <Button icon="add" disabled={draft.length >= MAX_CATEGORIES} onClick={addCategory} className="self-start">
          Add category ({draft.length}/{MAX_CATEGORIES})
        </Button>

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

export default EditCategoriesModal
