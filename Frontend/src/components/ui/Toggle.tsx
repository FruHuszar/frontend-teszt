interface ToggleProps {
  label: string
  checked: boolean
  onChange: () => void
}

// Be/ki kapcsoló: checkbox, amit a képernyőolvasó kapcsolóként (switch) olvas fel
function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <input
      type="checkbox"
      role="switch"
      aria-label={label}
      checked={checked}
      onChange={onChange}
      className="size-5 shrink-0 accent-(--color-theme-accent)"
    />
  )
}

export default Toggle
