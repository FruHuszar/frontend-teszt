import type { Track } from '../../models/playlist'
import { usePlayerContext } from '../../hooks/useContexts'

interface PlaylistItemRowProps {
  elem: Track
  index: number
}

function PlaylistItemRow({ elem, index }: PlaylistItemRowProps) {
  const { currentIndex, playing, selectTrack } = usePlayerContext()
  const current = index === currentIndex

  return (
    <li>
      <button
        type="button"
        aria-current={current}
        onClick={() => selectTrack(index)}
        className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left hover:bg-current/10 aria-current:bg-current/15"
      >
        <span aria-hidden="true" className="material-symbols-outlined">
          {current && playing ? 'equalizer' : 'music_note'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate">{elem.title}</span>
          <span className="block truncate text-xs">{elem.artist}</span>
        </span>
        <span className="text-sm">{elem.duration}</span>
      </button>
    </li>
  )
}

export default PlaylistItemRow
