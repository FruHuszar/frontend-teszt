interface Tab {
  id: string
  label: string
}

interface TabsProps {
  label: string
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
}

// Csak a fül sor. A tartalmat (role="tabpanel") a szülő rajzolja ki az active alapján.
function Tabs({ label, tabs, active, onChange }: TabsProps) {
  return (
    <div role="tablist" aria-label={label} className="grid grid-cols-2 gap-1 rounded-full border p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className="rounded-full py-1 aria-selected:bg-current/15"
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
