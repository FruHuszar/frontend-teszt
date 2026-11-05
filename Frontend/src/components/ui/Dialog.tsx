import { useEffect, useRef, type ReactNode } from 'react'
import Button from './Button'

interface DialogProps {
  title: string
  hideTitle?: boolean
  onClose: () => void
  children: ReactNode
}

// Natív <dialog>, modalként. A szülő feltételesen rendereli: {open && <Dialog ... />},
// így minden megnyitáskor tiszta állapottal indul a tartalma.
function Dialog({ title, hideTitle = false, onClose, children }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      // Esc: a böngésző bezárja. A target ellenőrzés kell, mert egy belső dialog eseménye is ide jutna.
      onClose={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      // Kattintás a sötét háttérre (a dialog saját magára) = bezárás
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="m-auto w-[min(92vw,36rem)] rounded-3xl bg-(--color-theme-moduls) text-inherit backdrop:bg-black/50"
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between gap-2">
          {!hideTitle && <h2>{title}</h2>}
          <Button icon="close" label="Close" onClick={onClose} className="ml-auto" />
        </div>
        {children}
      </div>
    </dialog>
  )
}

export default Dialog
