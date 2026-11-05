import type { AmbientSound, Track, VisualEffect } from '../models/playlist'

// Mock adatok a lejátszóhoz és a Vibe mixerhez, amíg nincs backend.
// Az effekteknél a className a VisualEffectsLayer rétegének Tailwind osztálya.
// Minden mock data ai generált.

export const PLAYLIST: Track[] = [
  { id: 1, title: 'Rainy Window', artist: 'Lofi Collective', duration: '3:44' },
  { id: 2, title: 'Morning Focus', artist: 'Study Beats', duration: '2:58' },
  { id: 3, title: 'Night Drive', artist: 'Synth Club', duration: '4:12' },
  { id: 4, title: 'Cherry Tea', artist: 'Chillhop Room', duration: '3:21' },
  { id: 5, title: 'Deep Work', artist: 'Ambient Lab', duration: '5:05' },
]

export const AMBIENT_SOUNDS: AmbientSound[] = [
  { id: 1, name: 'Rain', volume: 40 },
  { id: 2, name: 'Café', volume: 0 },
  { id: 3, name: 'Fireplace', volume: 20 },
  { id: 4, name: 'Forest', volume: 0 },
  { id: 5, name: 'White noise', volume: 0 },
]

export const VISUAL_EFFECTS: VisualEffect[] = [
  { id: 1, name: 'Dim the screen', className: 'bg-black/25', enabled: false },
  { id: 2, name: 'Warm light', className: 'bg-orange-300/15', enabled: false },
  { id: 3, name: 'Vignette', className: 'bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/0.45))]', enabled: false },
]
