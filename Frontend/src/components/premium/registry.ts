import type { PremiumTheme } from '../../models/premium'
import type { PremiumTheme as PremiumThemeData } from './engine'
import persona from './persona'
import { THEME as personaData } from './persona/theme.generated'

export const PREMIUM: Record<string, PremiumTheme> = {
  persona,
}

// A témák Blenderből exportált adatai (slotok, itemek) a CosmeticsModal-nak.
// Új prémium témánál ide is fel kell venni (az export csak a PREMIUM-ot bővíti).
export const PREMIUM_DATA: Record<string, PremiumThemeData> = {
  persona: personaData,
}
