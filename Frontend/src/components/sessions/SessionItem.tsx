import type { Session } from '../../models/quest'
import { useQuestContext } from '../../hooks/useContexts'
import Toggle from '../ui/Toggle'

interface SessionItemProps {
  elem: Session
  readOnly?: boolean
}

// Egy sor az idővonalon: pötty a vonalon, cím, időpont, be/ki kapcsoló (readOnly-nál csak felirat)
function SessionItem({ elem, readOnly = false }: SessionItemProps) {
  const { toggleSession } = useQuestContext()

  return (
    <li className="relative flex items-center gap-3 py-1 pl-5">
      <span
        aria-hidden="true"
        className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rounded-full border bg-(--color-theme-moduls)"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate">{elem.title}</p>
        <p className="truncate text-xs opacity-80">{elem.subtitle}</p>
      </div>
      <p className="flex shrink-0 flex-col items-end text-xs">
        <time dateTime={`${elem.date}T${elem.start}`}>{elem.start}</time>
        <span className="sr-only">to</span>
        <time dateTime={`${elem.date}T${elem.end}`}>{elem.end}</time>
      </p>
      {readOnly ? (
        <span className="w-8 shrink-0 text-center text-xs">{elem.enabled ? 'On' : 'Off'}</span>
      ) : (
        <Toggle label={`Enable ${elem.title}`} checked={elem.enabled} onChange={() => toggleSession(elem.id)} />
      )}
    </li>
  )
}

export default SessionItem
