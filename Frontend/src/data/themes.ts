import type { ThemeOption } from '../models/customization'

// A téma váltó diái, később az adatbázisból jönnek. Ahol még nincs kép, ott a modal helyőrzőt mutat (images: []).
// Minden mock data ai generált.
export const THEMES: ThemeOption[] = [
  {
    key: 'default',
    label: 'Default',
    description: 'The classic Gamified Todo look.',
    premium: false,
    images: [],
  },
  {
    key: 'persona',
    label: 'Persona',
    description: '3D character and animated stage behind your dashboard.',
    premium: true,
    images: [
      '/premium/persona/stage/bg_landscape_poster.jpg',
      '/premium/persona/stage/fg_landscape.png',
      '/premium/persona/stage/bg_portrait_poster.jpg',
    ],
  },
  {
    key: 'cherry-blossom',
    label: 'Cherry Blossom',
    description: 'Soft pink spring palette.',
    premium: false,
    images: [],
  },
]
