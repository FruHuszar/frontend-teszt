import { useState } from 'react'
import { usePlayerContext } from '../../hooks/useContexts'
import BoxFrame from '../dashboard/BoxFrame'
import Button from '../ui/Button'
import Waveform from './Waveform'
import PlaylistModal from './PlaylistModal'

interface VibeControllerBoxProps {
  className?: string
}

function VibeControllerBox({ className = '' }: VibeControllerBoxProps) {
  const { playlist, currentIndex, playing, togglePlay, nextTrack, previousTrack } = usePlayerContext()
  const [playlistOpen, setPlaylistOpen] = useState(false)
  const track = playlist[currentIndex]

  return (
    <BoxFrame
      boxId="player"
      className={className}
      action={<Button icon="queue_music" label="Open playlist" onClick={() => setPlaylistOpen(true)} />}
    >
      <p className="truncate">
        {track.title} <span className="text-sm opacity-70">· {track.artist}</span>
      </p>
      <Waveform playing={playing} />
      <p className="self-end text-sm">0:00 / {track.duration}</p>

      <div role="group" aria-label="Playback controls" className="flex items-center justify-center gap-4">
        <Button icon="skip_previous" label="Previous track" onClick={previousTrack} />
        <Button
          icon={playing ? 'pause' : 'play_arrow'}
          label={playing ? 'Pause' : 'Play'}
          onClick={togglePlay}
          className="size-12 border"
        />
        <Button icon="skip_next" label="Next track" onClick={nextTrack} />
      </div>

      {playlistOpen && <PlaylistModal onClose={() => setPlaylistOpen(false)} />}
    </BoxFrame>
  )
}

export default VibeControllerBox
