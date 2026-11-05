import type { CustomColors } from '../models/customization'

// Melyik szín melyik CSS változót írja felül
const PALETTE_VARS: Record<keyof CustomColors, string> = {
  bg: '--color-theme-bg',
  moduls: '--color-theme-moduls',
  text: '--color-theme-text',
  accent: '--color-theme-accent',
}

// A saját téma színeit inline style-ként a <html>-re teszi, így minden téma fájlt felülírnak
export function setCustomPalette(colors: CustomColors) {
  const style = document.documentElement.style
  for (const key of Object.keys(PALETTE_VARS) as (keyof CustomColors)[]) {
    style.setProperty(PALETTE_VARS[key], colors[key])
  }
}

export function clearCustomPalette() {
  const style = document.documentElement.style
  for (const cssVar of Object.values(PALETTE_VARS)) {
    style.removeProperty(cssVar)
  }
}

interface ImageColor {
  rgb: string // a kép "fő színe", pl. 'rgb(200 120 90)'
  lightness: number // a kép átlagos világossága, 0 (fekete) - 1 (fehér)
}

// Egy kép színe: kicsire (32x32) rajzoljuk egy canvasra, és végigmegyünk a pixeleken.
// A fő színnél a színesebb pixelek többet számítanak, így nem egy szürkésbarna átlag jön ki.
function imageColor(url: string): Promise<ImageColor> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 32
      canvas.height = 32
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, 32, 32)
      const pixels = ctx.getImageData(0, 0, 32, 32).data // [r, g, b, a, r, g, b, a, ...]

      let r = 0, g = 0, b = 0, weightSum = 0, lightSum = 0
      for (let i = 0; i < pixels.length; i += 4) {
        const [pr, pg, pb] = [pixels[i], pixels[i + 1], pixels[i + 2]]
        const colorfulness = (Math.max(pr, pg, pb) - Math.min(pr, pg, pb)) / 255
        const weight = colorfulness * colorfulness + 0.01
        r += pr * weight
        g += pg * weight
        b += pb * weight
        weightSum += weight
        lightSum += (0.299 * pr + 0.587 * pg + 0.114 * pb) / 255
      }
      resolve({
        rgb: `rgb(${Math.round(r / weightSum)} ${Math.round(g / weightSum)} ${Math.round(b / weightSum)})`,
        lightness: lightSum / (pixels.length / 4),
      })
    }
    img.onerror = reject
    img.src = url
  })
}

// Paletta 1-3 képből: 1. kép -> háttér + szöveg, 2. kép -> dobozok, 3. kép -> kiemelő szín.
// Ha a képek sötétek, sötét téma lesz, különben világos. A color-mix a CSS-re bízza a keverést.
export async function paletteFromImages(urls: string[]): Promise<CustomColors> {
  const colors = await Promise.all(urls.map(imageColor))
  // Kevesebb kép esetén körbe megyünk: 1 kép -> mindhárom szerep ugyanabból a képből
  const [first, second, third] = [colors[0], colors[1 % colors.length], colors[2 % colors.length]]
  const dark = colors.reduce((sum, color) => sum + color.lightness, 0) / colors.length < 0.45

  if (dark) {
    return {
      bg: `color-mix(in oklab, ${first.rgb} 30%, black)`,
      moduls: `color-mix(in oklab, ${second.rgb} 25%, #1a1a1a)`,
      text: `color-mix(in oklab, ${first.rgb} 10%, white)`,
      accent: `color-mix(in oklab, ${third.rgb} 80%, white)`,
    }
  }
  return {
    bg: `color-mix(in oklab, ${first.rgb} 45%, white)`,
    moduls: `color-mix(in oklab, ${second.rgb} 12%, white)`,
    text: `color-mix(in oklab, ${first.rgb} 15%, black)`,
    accent: `color-mix(in oklab, ${third.rgb} 70%, black)`,
  }
}
