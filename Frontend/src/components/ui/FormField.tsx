interface FormFieldOption {
  value: string
  label: string
}

interface FormFieldProps {
  label: string
  value: string | number
  onChange: (value: string) => void
  type?: 'text' | 'number' | 'color' | 'range'
  options?: FormFieldOption[]
  min?: number
  max?: number
}

// Címke + mező. Ha van options, akkor legördülő lista (select) lesz belőle.
function FormField({ label, value, onChange, type = 'text', options, min, max }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      {label}
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded-xl border bg-transparent px-3 py-2 text-base"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          className={
            type === 'range' || type === 'color'
              ? 'w-full accent-(--color-theme-accent)'
              : 'rounded-xl border bg-transparent px-3 py-2 text-base'
          }
        />
      )}
    </label>
  )
}

export default FormField
