// Persona Studio export · premium engine · re-export overwrites this file (delete this line to keep your edits)
//
// Shape of a premium theme exported from Blender (premium/<theme>/theme.generated.ts).
// Lengths are metres, coordinates glTF / three.js (y up, the model faces +z), colours sRGB hex.

/** Persona Look (toon shading + rim), the same parameters as in Blender */
export type LookSettings = {
  toon: number;
  threshold: number;
  softness: number;
  light_gain: number;
  shadow_color: string;
  rim_color: string;
  rim_strength: number;
  rim_width: number;
  saturation: number;
  brightness: number;
};

/** per material: flat colour / texture mix, recolour (shop colours) and glow */
export type MaterialSettings = {
  name: string;
  role?: string;
  customizable?: boolean;
  flat_color?: string;
  texture_mix?: number;
  tint?: string;
  recolor?: number;
  glow?: number;
};

export type Clip = { name: string; role: string; loop: boolean; seconds?: number; frames?: number };

export type Shot = {
  fov: number;
  distance?: number;
  yaw?: number;
  pitch?: number;
  anchor_x: number;
  anchor_y: number;
  position: number[];
  target: number[];
};

export type StageLight = {
  name: string;
  type?: string;
  direction: number[];
  color: string;
  color_linear?: number[];
  strength: number;
};

export type Plate = { video?: string; poster?: string; foreground?: string };

export type PremiumStage = {
  /** min window width per breakpoint (base 0, md 768, lg 1024), like Tailwind */
  breakpoints: Record<string, number>;
  /** camera per breakpoint; the focus point stays at (anchor_x, anchor_y) of the screen */
  shots: Record<string, Shot>;
  lights: StageLight[];
  world: { color_linear: number[]; strength: number } | null;
  palette: Record<string, string>;
  /** files below publicPath; the portrait plate is used when the window is taller than wide */
  plates: { landscape: Plate; portrait: Plate };
};

export type AttachType = "skin" | "bone" | "static";

export type PremiumItem = {
  /** item id = file name (cosmetics.file_path ends with <key>.glb) */
  key: string;
  label: string;
  /** coins, 0 = free */
  price: number;
  /** part of the starting setup */
  starting: boolean;
  kind: "model" | "color";
  /** path below the storage URL = cosmetics.file_path */
  file: string;
  thumbnail: string;
  /** name of the item's root node in the GLB */
  node?: string;
  /** skin: re-bound to the base skeleton · bone: follows that bone · static: placed in the scene */
  attach?: { type: AttachType; bone: string };
  /** where event helpers land, relative to the item root (column-major 4x4, rest pose) */
  anchor?: number[];
  /** bone the anchor follows (the item's own rig, or the base rig for skin items); "" = the item root */
  anchorBone?: string;
  materials?: MaterialSettings[];
  /** the item's own clips (a stem's sway): loops play all the time, an "equip" clip when it is put on */
  clips?: Clip[];
  /** colour items: recolour this material of the scene */
  color?: { material: string; color: string };
};

export type PremiumSlot = { key: string; label: string; required: boolean; items: PremiumItem[] };

export type PremiumEventName = "bored" | "quest_completed" | "level_up" | "item_equipped";

export type PremiumEventAnim = {
  name: string;
  event: PremiumEventName;
  /** clip role of the event (bored, complete, level_up, equip) */
  role: string;
  /** model clip to play (empty = a clip with the event's role) */
  clip: string;
  /** helper GLB below publicPath (a butterfly), played once on the item of `slot` */
  helper: string | null;
  slot: string;
  seconds: number;
  /** seconds the helper keeps its last frame afterwards (0 = gone at once, -1 = until the event plays again) */
  stay: number;
};

export type PremiumBase = {
  model: string;
  height: number;
  draco: boolean;
  rig: "human" | "chain" | "none";
  clips: Clip[];
  behavior: { idle: string[]; bored_after_seconds: number; click_cooldown_seconds: number; crossfade_seconds: number };
  lookAt: { bones: { slot: string; bone: string; weight: number }[]; max_yaw_deg: number; max_pitch_deg: number };
  materials: MaterialSettings[];
  /** the model has a click reaction */
  click: boolean;
};

export type PremiumBox = {
  /** Blender component key */
  component: string;
  title: string;
  /** placement in the theme's grid per breakpoint, for an element inside the grid element (+ Free offsets /
   *  scales, tilt; hidden where it is a chip; contents in one row where the box is a thin bar) */
  box: string;
  /** the same cell as a fixed rectangle over the screen, for an element outside the grid element (header,
   *  floating buttons) */
  place: string;
  /** surface: skin or UI preset classes */
  skin: string;
  /** surface when the box opens as a modal */
  modal: string;
  radius: string;
  /** visibility of the box's chip in the dock per breakpoint */
  chip: string;
  icon: string;
  aspect?: string;
};

export type IconPath = [d: string, opacity: number, hub: boolean];

export type PremiumUi = {
  style: string;
  /** data-el of the app element that holds the boxes (App.tsx: the dashboard <main>) */
  grid: string;
  /** classes of that element while the theme is active: the theme's grid over the screen */
  root: string;
  /** the chip dock (fixed rectangle per breakpoint) */
  dock: string;
  /** a box opened from its chip */
  modalPlace: string;
  chipSkin: string;
  chipSize: string;
  chipIcon: string;
  grain: number;
  vignette: number;
  /** data-el of the app's elements -> their classes in the theme */
  boxes: Record<string, PremiumBox>;
  icons: Record<string, IconPath[]>;
};

export type PremiumTheme = {
  key: string;
  label: string;
  generator: string;
  /** folder of the theme's public files, relative to the site base (import.meta.env.BASE_URL) */
  publicPath: string;
  base: PremiumBase | null;
  look: LookSettings | null;
  outline: { enabled: boolean; width: number; color: string } | null;
  stage: PremiumStage;
  slots: PremiumSlot[];
  /** starting setup: slot -> item key (null = empty) */
  defaults: Record<string, string | null>;
  events: PremiumEventAnim[];
  ui: PremiumUi | null;
};

/** slot -> item key or cosmetics.file_path (null = empty slot, missing = the theme's default) */
export type Equipped = Record<string, string | null | undefined>;
