export interface Track {
  id: number
  title: string
  artist: string
  duration: string
}

// A Vibe mixer elemei
export interface AmbientSound {
  id: number
  name: string
  volume: number
}

export interface VisualEffect {
  id: number
  name: string
  className: string
  enabled: boolean
}
