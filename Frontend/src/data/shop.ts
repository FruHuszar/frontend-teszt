import type { CatalogueItem } from '../models/catalogue'

// Mock bolti kínálat, amíg nincs backend. Minden mock data ai generált.

export const CATALOGUE: CatalogueItem[] = [
  { id: 1, name: 'Persona Theme', description: '3D character and animated stage.', type: 'theme', icon: 'face_retouching_natural', price: 2000, owned: true },
  { id: 2, name: 'Cherry Blossom Theme', description: 'Soft pink spring palette.', type: 'theme', icon: 'local_florist', price: 800, owned: false },
  { id: 3, name: 'Golden Avatar Frame', description: 'A shiny frame around your profile picture.', type: 'cosmetic', icon: 'workspace_premium', price: 500, owned: false },
  { id: 4, name: 'Lo-fi Playlist Pack', description: '10 extra tracks for the music player.', type: 'sound', icon: 'library_music', price: 300, owned: false },
  { id: 5, name: 'Thunderstorm Ambience', description: 'A new sound for the vibe mixer.', type: 'sound', icon: 'thunderstorm', price: 250, owned: false },
]
