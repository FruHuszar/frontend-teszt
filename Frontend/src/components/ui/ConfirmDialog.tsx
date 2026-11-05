import Button from './Button'
import Dialog from './Dialog'

interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel: string
  onConfirm: () => void
  onClose: () => void
}

function ConfirmDialog({ title, message, confirmLabel, onConfirm, onClose }: ConfirmDialogProps) {
  function handleConfirm() {
    onConfirm()
    onClose()
  }

  return (
    <Dialog title={title} onClose={onClose}>
      <p>{message}</p>
      <div className="flex justify-end gap-2">
        <Button onClick={onClose}>Cancel</Button>
        <Button primary onClick={handleConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  )
}

export default ConfirmDialog
