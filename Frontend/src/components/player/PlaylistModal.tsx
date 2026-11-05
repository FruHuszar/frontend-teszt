import { usePlayerContext } from '../../hooks/useContexts'
import Dialog from '../ui/Dialog'
import PlaylistItemRow from './PlaylistItemRow'

interface PlaylistModalProps {
  onClose: () => void
}

function PlaylistModal({ onClose }: PlaylistModalProps) {
  const { playlist } = usePlayerContext()

  return (
    <Dialog title="Playlist" onClose={onClose}>
      <ol className="flex flex-col gap-1">
        {playlist.map((track, i) => (
          <PlaylistItemRow key={track.id} elem={track} index={i} />
        ))}
      </ol>
    </Dialog>
  )
}

export default PlaylistModal
