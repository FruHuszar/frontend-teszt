// Dátumok 'YYYY-MM-DD' szövegként, ahogy majd a backend is küldi

// A mai naptól számított nap (0 = ma, 1 = holnap, ...)
export function dayFromToday(offset: number): string {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function isToday(date: string): boolean {
  return date === dayFromToday(0)
}

// '2026-11-07' -> 'Sat, Nov 7'
export function formatDay(date: string): string {
  return new Date(`${date}T00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
