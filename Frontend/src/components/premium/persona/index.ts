// Persona Studio export · premium theme persona · 2026-11-04 · re-export overwrites this file
// The theme's entry for the premium registry (../registry.ts). Its Layout puts the backdrop and the 3D scene
// behind the app's UI and places the app's boxes (found by their data-el names) like in Blender.
// Everything from Blender is in ./theme.generated.ts.
import "../../../css/themes/persona.css";
import type { PremiumTheme } from "../../../models/premium";
import { createThemeLayout } from "../engine";
import { THEME } from "./theme.generated";

const personaPremium: PremiumTheme = {
  key: THEME.key,
  label: THEME.label,
  Layout: createThemeLayout(THEME),
};

export default personaPremium;
