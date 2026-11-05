<!-- Persona Studio export · premium theme persona · re-export overwrites this file -->
# Premium theme: Persona (`persona`)

Exported by Persona Studio (Blender). Files:

| Where | What |
|---|---|
| `public/premium/persona/` | `base.glb` (the model without its parts), `stage/` backdrop, `helpers/` event helpers |
| `theme.generated.ts` | all data: camera per breakpoint, lights, look, slots, items, events, layout |
| `index.ts` | the registry entry `{ key, label, Layout }` (regenerated; delete its first line to keep edits) |
| `../engine/` | three.js runtime shared by every premium theme |
| css `persona.css` | palette on the app's variables, fonts, skins (`:root[data-theme="persona"]`) |
| backend `catalogue/cosmetics/persona/` | 0 shop items + thumbnails, `PremiumCosmeticsSeeder` |

## Use
Nothing to wire: the export adds the theme to `registry.ts`, so choosing it in the theme modal is enough.
`Layout` (engine/ThemeLayout.tsx) puts the backdrop and the 3D scene behind the UI and, while the theme is
active, overwrites the classes of the app's elements by their `data-el` names (Persona Export > Project
Mapping): the grid element (the dashboard `<main>`) becomes the theme's grid, its boxes get their cells, the
header and the floating buttons the same cell as a fixed rectangle. Each box keeps its own inner layout
(direction, gaps, padding); a box that is a thin bar shows its contents in one row. A box that is a chip at
a breakpoint goes to the dock and opens as a modal (Esc closes it); a button chip just clicks the button.

```tsx
import { emitPremiumEvent } from "./components/premium/engine";
emitPremiumEvent("quest_completed");    // QuestContext, after a quest is checked
emitPremiumEvent("level_up");           // UserContext, when the level goes up
emitPremiumEvent("item_equipped", { slot: "hat" });   // optional: equip changes trigger it already
```
The Layout also takes `equipped` (slot -> item key, from user_presets.equipped_cosmetics later); without it
the starting setup is shown. Idle / bored is handled by the scene; a click on the model plays its click clip.

## Shop items
The scene loads items from the backend storage: `VITE_STORAGE_URL` (default `/storage`).
In development proxy it to Laravel in `vite.config.ts`:
```ts
server: { proxy: { "/storage": "http://localhost:8000" } }
```
Seed (after the themes exist): `php artisan db:seed --class=PremiumCosmeticsSeeder`, and
`php artisan storage:link` once. Re-running updates names and prices (matched by theme + file_path).

## Theme chooser preview
`<ItemToggles theme={theme.theme} equipped={equipped} onChange={(slot, key) => ...} />` lists the slots
with their thumbnails; `<ItemPreviewPanel>` docks it to the side (bottom on mobile) over the live scene.
