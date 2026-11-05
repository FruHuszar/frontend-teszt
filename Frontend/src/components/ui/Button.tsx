import type { ReactNode } from 'react'

interface ButtonProps {
  icon?: string
  label?: string
  primary?: boolean
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  className?: string
  children?: ReactNode
}

// Szöveg nélkül kerek ikon gomb (ekkor kell label a képernyőolvasónak), szöveggel lekerekített gomb
function Button({ icon, label, primary = false, type = 'button', disabled = false, onClick, className = '', children }: ButtonProps) {
  const shape = children
    ? 'flex items-center justify-center gap-2 rounded-full px-4 py-2'
    : 'grid size-10 shrink-0 place-items-center rounded-full'
  const look = primary ? 'bg-(--color-theme-accent) text-white' : children ? 'border hover:bg-current/10' : 'hover:bg-current/10'

  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`${shape} ${look} disabled:cursor-default disabled:opacity-50 ${className}`}
    >
      {icon && (
        <span aria-hidden="true" className="material-symbols-outlined">
          {icon}
        </span>
      )}
      {children}
    </button>
  )
}

export default Button
