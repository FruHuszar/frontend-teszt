import { createContext, useState, type ReactNode } from 'react'
import type { AmbientSound, Track, VisualEffect } from '../models/playlist'
import { AMBIENT_SOUNDS, PLAYLIST, VISUAL_EFFECTS } from '../data/playlist'

// Zenelejátszó + Vibe mixer állapota. Hang még nem szól, csak az állapot változik.
interface PlayerContextValue {
  playlist: Track[]
  currentIndex: number
  playing: boolean
  togglePlay: () => void
  nextTrack: () => void
  previousTrack: () => void
  selectTrack: (index: number) => void
  ambientSounds: AmbientSound[]
  setAmbientVolume: (index: number, volume: number) => void
  effects: VisualEffect[]
  toggleEffect: (index: number) => void
}

export const PlayerContext = createContext<PlayerContextValue | undefined>(undefined)

interface PlayerProviderProps {
  children: ReactNode
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [ambientSounds, setAmbientSounds] = useState<AmbientSound[]>(AMBIENT_SOUNDS)
  const [effects, setEffects] = useState<VisualEffect[]>(VISUAL_EFFECTS)

  function togglePlay() {
    setPlaying(!playing)
  }

  // Az utolsó szám után az elsőre ugrik, és fordítva
  function nextTrack() {
    setCurrentIndex(currentIndex === PLAYLIST.length - 1 ? 0 : currentIndex + 1)
  }

  function previousTrack() {
    setCurrentIndex(currentIndex === 0 ? PLAYLIST.length - 1 : currentIndex - 1)
  }

  function selectTrack(index: number) {
    setCurrentIndex(index)
    setPlaying(true)
  }

  function setAmbientVolume(index: number, volume: number) {
    const newSounds = [...ambientSounds]
    newSounds[index] = { ...newSounds[index], volume: volume }
    setAmbientSounds(newSounds)
  }

  function toggleEffect(index: number) {
    const newEffects = [...effects]
    newEffects[index] = { ...newEffects[index], enabled: !newEffects[index].enabled }
    setEffects(newEffects)
  }

  return (
    <PlayerContext.Provider
      value={{
        playlist: PLAYLIST,
        currentIndex,
        playing,
        togglePlay,
        nextTrack,
        previousTrack,
        selectTrack,
        ambientSounds,
        setAmbientVolume,
        effects,
        toggleEffect,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
