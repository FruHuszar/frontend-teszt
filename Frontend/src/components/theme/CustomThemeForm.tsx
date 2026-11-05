import { useState, type ChangeEvent } from 'react'
import type { CustomColors } from '../../models/customization'
import { usePresetContext } from '../../hooks/useContexts'
import { paletteFromImages } from '../../utils/palette'
import Button from '../ui/Button'

interface CustomThemeFormProps {
  onApplied: () => void
}

const SWATCHES: { key: keyof CustomColors; label: string }[] = [
  { key: 'bg', label: 'Background' },
  { key: 'moduls', label: 'Boxes' },
  { key: 'text', label: 'Text' },
  { key: 'accent', label: 'Accent' },
]

// Saját téma: 3 feltöltött képből generált paletta. A képek nem kerülnek fel sehova,
// csak a böngésző memóriájában élnek (URL.createObjectURL), frissítés után eltűnnek.
function CustomThemeForm({ onApplied }: CustomThemeFormProps) {
  const { activeTheme, customImages, applyCustomTheme } = usePresetContext()
  const [images, setImages] = useState<string[]>(customImages)
  const [colors, setColors] = useState<CustomColors | null>(null)

  async function handleUpload(index: number, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const newImages = [...images]
    newImages[index] = URL.createObjectURL(file)
    setImages(newImages)
    // Minden új kép után újraszámoljuk a palettát a már feltöltött képekből
    setColors(await paletteFromImages(newImages.filter((image) => image !== '')))
  }

  function handleApply() {
    if (!colors) return
    applyCustomTheme(colors, images)
    onApplied()
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h3>Custom</h3>
        {activeTheme === 'custom' && <span className="rounded-full border px-2 text-xs">Active</span>}
      </div>
      <p className="text-sm">Upload 3 pictures, the colors are picked from them.</p>

      <div className="grid grid-cols-3 gap-2">
        {images.map((image, i) => (
          // A label-re kattintva nyílik a fájlválasztó, a valódi input rejtve van
          <label
            key={i}
            className="grid aspect-[3/4] cursor-pointer place-items-center overflow-hidden rounded-xl bg-current/10 text-xs hover:bg-current/15"
          >
            {image ? (
              <img src={image} alt={`Custom picture ${i + 1}`} className="size-full object-cover" />
            ) : (
              <span className="flex flex-col items-center gap-1">
                <span aria-hidden="true" className="material-symbols-outlined">
                  add_photo_alternate
                </span>
                Upload {i + 1}
              </span>
            )}
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => handleUpload(i, e)} />
          </label>
        ))}
      </div>

      {colors && (
        <ul aria-label="Generated palette" className="flex gap-2">
          {SWATCHES.map((swatch) => (
            <li key={swatch.key} className="flex flex-1 flex-col items-center gap-1 text-xs">
              <span className="h-6 w-full rounded-lg border" style={{ background: colors[swatch.key] }} />
              {swatch.label}
            </li>
          ))}
        </ul>
      )}

      <Button primary disabled={!colors} onClick={handleApply}>
        Apply
      </Button>
    </div>
  )
}

export default CustomThemeForm
