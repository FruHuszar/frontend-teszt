// Persona Studio export · premium theme persona · 2026-11-04 · re-export overwrites this file
// Everything from Blender: base model, stage (camera per breakpoint, lights, backdrop), shop slots and
// items (files in the backend storage), starting setup, event animations and the layout classes.
import type { PremiumTheme } from "../engine/types";

export const THEME: PremiumTheme = {
  "key": "persona",
  "label": "Persona",
  "generator": "Persona Studio 2.5 · 2026-11-04T09:10:27",
  "publicPath": "premium/persona/",
  "base": {
    "model": "base.glb",
    "height": 2.0,
    "draco": false,
    "rig": "none",
    "clips": [],
    "behavior": {
      "idle": [],
      "bored_after_seconds": 20.0,
      "click_cooldown_seconds": 1.2,
      "crossfade_seconds": 0.25
    },
    "lookAt": {
      "bones": [],
      "max_yaw_deg": 35.0,
      "max_pitch_deg": 20.0
    },
    "materials": [],
    "click": false
  },
  "look": {
    "toon": 1.0,
    "threshold": 0.32,
    "softness": 0.03,
    "light_gain": 1.0,
    "shadow_color": "#bfb3d4",
    "rim_color": "#ffedcb",
    "rim_strength": 0.5,
    "rim_width": 0.3,
    "saturation": 1.1,
    "brightness": 1.0
  },
  "outline": {
    "enabled": true,
    "width": 1.0,
    "color": "#613f59"
  },
  "stage": {
    "breakpoints": {
      "base": 0,
      "md": 768,
      "lg": 1024
    },
    "shots": {
      "base": {
        "fov": 29.8,
        "distance": 3.705,
        "yaw": 7.0,
        "pitch": 1.3,
        "anchor_x": 0.5,
        "anchor_y": 0.444,
        "position": [
          0.45141,
          1.24006,
          3.67644
        ],
        "target": [
          0.0,
          1.156,
          -0.0
        ]
      },
      "md": {
        "fov": 27.8,
        "distance": 4.68,
        "yaw": 9.0,
        "pitch": 1.3,
        "anchor_x": 0.5,
        "anchor_y": 0.374,
        "position": [
          0.73192,
          1.26218,
          4.62119
        ],
        "target": [
          0.0,
          1.156,
          -0.0
        ]
      },
      "lg": {
        "fov": 24.8,
        "distance": 4.485,
        "yaw": 9.0,
        "pitch": 1.3,
        "anchor_x": 0.42,
        "anchor_y": 0.424,
        "position": [
          0.70143,
          1.25775,
          4.42864
        ],
        "target": [
          0.0,
          1.156,
          -0.0
        ]
      }
    },
    "lights": [
      {
        "name": "PS_Key",
        "type": "sun",
        "direction": [
          0.35574,
          -0.48481,
          -0.799
        ],
        "color": "#fffcfd",
        "color_linear": [
          1.0,
          0.97,
          0.98
        ],
        "strength": 2.924
      },
      {
        "name": "PS_Fill",
        "type": "sun",
        "direction": [
          -0.43301,
          -0.5,
          0.75
        ],
        "color": "#ffeff6",
        "color_linear": [
          1.0,
          0.86,
          0.92
        ],
        "strength": 0.448
      },
      {
        "name": "PS_Rim",
        "type": "sun",
        "direction": [
          -0.16318,
          -0.34202,
          0.92542
        ],
        "color": "#fff3f9",
        "color_linear": [
          1.0,
          0.9,
          0.95
        ],
        "strength": 0.504
      }
    ],
    "world": {
      "color_linear": [
        1.0,
        1.0,
        1.0
      ],
      "strength": 0.264
    },
    "palette": {
      "void": "#fdeef3",
      "deep": "#ffffff",
      "mist": "#f8c9d8",
      "jade": "#f0689a",
      "gold": "#f4b3c8",
      "glow": "#fff1f6",
      "ember": "#ff8fb1",
      "ivory": "#ffffff",
      "ink": "#4a2c3a"
    },
    "plates": {
      "landscape": {
        "video": "stage/bg_landscape.mp4",
        "poster": "stage/bg_landscape_poster.jpg",
        "foreground": "stage/fg_landscape.png"
      },
      "portrait": {
        "video": "stage/bg_portrait.mp4",
        "poster": "stage/bg_portrait_poster.jpg",
        "foreground": "stage/fg_portrait.png"
      }
    }
  },
  "slots": [],
  "defaults": {},
  "events": [],
  "ui": {
    "style": "girliepop",
    "grid": "Dashboard",
    "root": "pb-ui pb-style-girliepop theme-persona pointer-events-none absolute left-0 top-0 h-dvh w-full grid grid-cols-4 grid-rows-12 gap-[10px] p-[14px] md:grid-cols-8 md:grid-rows-14 md:gap-[14px] md:p-[22px] lg:grid-cols-12 lg:grid-rows-12 lg:gap-[20px] lg:p-[30px]",
    "dock": "pb-dock fixed z-10 pointer-events-none items-center justify-center gap-[10px] flex left-[calc(14px_+_3*(((100%_-_28px_-_30px)/4)_+_10px))] top-[calc(14px_+_3*(((100dvh_-_28px_-_110px)/12)_+_10px))] w-[calc(1*((100%_-_28px_-_30px)/4)_+_0px)] h-[calc(5*((100dvh_-_28px_-_110px)/12)_+_40px)] flex-col md:left-[calc(22px_+_7*(((100%_-_44px_-_98px)/8)_+_14px))] md:top-[calc(22px_+_1*(((100dvh_-_44px_-_182px)/14)_+_14px))] md:w-[calc(1*((100%_-_44px_-_98px)/8)_+_0px)] md:h-[calc(8*((100dvh_-_44px_-_182px)/14)_+_98px)] md:flex-col lg:hidden",
    "modalPlace": "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[min(calc(100%_-_32px),720px)] h-[min(calc(100dvh_-_96px),620px)] pointer-events-auto overflow-y-auto",
    "chipSkin": "pb-tok-candy-btn pb-skin-candy-btn",
    "chipSize": "w-[min(60px,100%)] h-auto lg:h-[min(60px,100%)] lg:w-auto",
    "chipIcon": "absolute left-[22.48%] top-[22.48%] w-[55.04%] aspect-square overflow-visible",
    "boxes": {
      "Header": {
        "component": "header",
        "title": "Header",
        "box": "min-h-0 min-w-0 col-start-1 col-span-4 row-start-1 row-span-1 max-md:flex-row max-md:items-center max-md:py-0.5 max-md:*:self-center md:col-start-1 md:col-span-8 md:row-start-1 md:row-span-1 md:max-lg:flex-row md:max-lg:items-center md:max-lg:py-0.5 md:max-lg:*:self-center lg:col-start-1 lg:col-span-12 lg:row-start-1 lg:row-span-1 lg:flex-row lg:items-center lg:py-0.5 lg:*:self-center",
        "place": "fixed z-10 left-[14px] top-[14px] w-[calc(4*((100%_-_28px_-_30px)/4)_+_30px)] h-auto min-h-[calc(1*((100dvh_-_28px_-_110px)/12)_+_0px)] md:left-[22px] md:top-[22px] md:w-[calc(8*((100%_-_44px_-_98px)/8)_+_98px)] md:h-auto md:min-h-[calc(1*((100dvh_-_44px_-_182px)/14)_+_0px)] lg:left-[30px] lg:top-[30px] lg:w-[calc(12*((100%_-_60px_-_220px)/12)_+_220px)] lg:h-auto lg:min-h-[calc(1*((100dvh_-_60px_-_220px)/12)_+_0px)]",
        "skin": "pb-tok-soft-pill pb-skin-soft-pill",
        "modal": "pb-tok-soft-card pb-skin-soft-card",
        "radius": "[--pb-radius:28px]",
        "chip": "hidden",
        "icon": "USER"
      },
      "Today's Quests": {
        "component": "todo",
        "title": "Today's Quests",
        "box": "min-h-0 min-w-0 col-start-1 col-span-4 row-start-9 row-span-4 md:col-start-1 md:col-span-4 md:row-start-10 md:row-span-5 lg:col-start-10 lg:col-span-3 lg:row-start-2 lg:row-span-6",
        "place": "fixed z-10 left-[14px] top-[calc(14px_+_8*(((100dvh_-_28px_-_110px)/12)_+_10px))] w-[calc(4*((100%_-_28px_-_30px)/4)_+_30px)] h-auto min-h-[calc(4*((100dvh_-_28px_-_110px)/12)_+_30px)] md:left-[22px] md:top-[calc(22px_+_9*(((100dvh_-_44px_-_182px)/14)_+_14px))] md:w-[calc(4*((100%_-_44px_-_98px)/8)_+_42px)] md:h-auto md:min-h-[calc(5*((100dvh_-_44px_-_182px)/14)_+_56px)] lg:left-[calc(30px_+_9*(((100%_-_60px_-_220px)/12)_+_20px))] lg:top-[calc(30px_+_1*(((100dvh_-_60px_-_220px)/12)_+_20px))] lg:w-[calc(3*((100%_-_60px_-_220px)/12)_+_40px)] lg:h-auto lg:min-h-[calc(6*((100dvh_-_60px_-_220px)/12)_+_100px)]",
        "skin": "pb-tok-soft-card pb-skin-soft-card",
        "modal": "pb-tok-soft-card pb-skin-soft-card",
        "radius": "[--pb-radius:28px]",
        "chip": "hidden",
        "icon": "CHECK"
      },
      "Streak": {
        "component": "streak",
        "title": "Streak",
        "box": "min-h-0 min-w-0 max-md:hidden md:max-lg:hidden lg:col-start-10 lg:col-span-3 lg:row-start-8 lg:row-span-4",
        "place": "fixed z-10 max-md:hidden md:max-lg:hidden lg:left-[calc(30px_+_9*(((100%_-_60px_-_220px)/12)_+_20px))] lg:top-[calc(30px_+_7*(((100dvh_-_60px_-_220px)/12)_+_20px))] lg:w-[calc(3*((100%_-_60px_-_220px)/12)_+_40px)] lg:h-auto lg:min-h-[calc(4*((100dvh_-_60px_-_220px)/12)_+_60px)]",
        "skin": "pb-tok-soft-card pb-skin-soft-card",
        "modal": "pb-tok-soft-card pb-skin-soft-card",
        "radius": "[--pb-radius:28px]",
        "chip": "flex lg:hidden",
        "icon": "FLAME"
      },
      "Music Player": {
        "component": "music",
        "title": "Music Player",
        "box": "min-h-0 min-w-0 max-md:hidden md:max-lg:hidden lg:col-start-4 lg:col-span-6 lg:row-start-12 lg:row-span-1 lg:flex-row lg:items-center lg:py-0.5 lg:*:self-center",
        "place": "fixed z-10 max-md:hidden md:max-lg:hidden lg:left-[calc(30px_+_3*(((100%_-_60px_-_220px)/12)_+_20px))] lg:top-[calc(30px_+_11*(((100dvh_-_60px_-_220px)/12)_+_20px))] lg:w-[calc(6*((100%_-_60px_-_220px)/12)_+_100px)] lg:h-auto lg:min-h-[calc(1*((100dvh_-_60px_-_220px)/12)_+_0px)]",
        "skin": "pb-tok-soft-pill pb-skin-soft-pill",
        "modal": "pb-tok-soft-card pb-skin-soft-card",
        "radius": "[--pb-radius:28px]",
        "chip": "flex lg:hidden",
        "icon": "NOTE"
      },
      "Today's Sessions": {
        "component": "upcoming",
        "title": "Today's Sessions",
        "box": "min-h-0 min-w-0 max-md:hidden md:col-start-5 md:col-span-4 md:row-start-10 md:row-span-5 lg:col-start-1 lg:col-span-3 lg:row-start-8 lg:row-span-5",
        "place": "fixed z-10 max-md:hidden md:left-[calc(22px_+_4*(((100%_-_44px_-_98px)/8)_+_14px))] md:top-[calc(22px_+_9*(((100dvh_-_44px_-_182px)/14)_+_14px))] md:w-[calc(4*((100%_-_44px_-_98px)/8)_+_42px)] md:h-auto md:min-h-[calc(5*((100dvh_-_44px_-_182px)/14)_+_56px)] lg:left-[30px] lg:top-[calc(30px_+_7*(((100dvh_-_60px_-_220px)/12)_+_20px))] lg:w-[calc(3*((100%_-_60px_-_220px)/12)_+_40px)] lg:h-auto lg:min-h-[calc(5*((100dvh_-_60px_-_220px)/12)_+_80px)]",
        "skin": "pb-tok-soft-card pb-skin-soft-card",
        "modal": "pb-tok-soft-card pb-skin-soft-card",
        "radius": "[--pb-radius:28px]",
        "chip": "flex md:hidden",
        "icon": "CALENDAR"
      },
      "Balance Radar": {
        "component": "radar",
        "title": "Balance Radar",
        "box": "min-h-0 min-w-0 max-md:hidden md:max-lg:hidden lg:col-start-1 lg:col-span-3 lg:row-start-2 lg:row-span-6",
        "place": "fixed z-10 max-md:hidden md:max-lg:hidden lg:left-[30px] lg:top-[calc(30px_+_1*(((100dvh_-_60px_-_220px)/12)_+_20px))] lg:w-[calc(3*((100%_-_60px_-_220px)/12)_+_40px)] lg:h-auto lg:min-h-[calc(6*((100dvh_-_60px_-_220px)/12)_+_100px)]",
        "skin": "pb-tok-soft-card pb-skin-soft-card",
        "modal": "pb-tok-soft-card pb-skin-soft-card",
        "radius": "[--pb-radius:28px]",
        "chip": "flex lg:hidden",
        "icon": "CHART"
      },
      "Mixer button": {
        "component": "settings",
        "title": "Mixer",
        "box": "min-h-0 min-w-0 max-md:hidden md:max-lg:hidden lg:col-start-12 lg:col-span-1 lg:row-start-12 lg:row-span-1 lg:self-center lg:justify-self-center lg:aspect-[1/1] lg:w-[min(100%,calc((1*((100dvh_-_60px_-_220px)/12)_+_0px)*1))]",
        "place": "fixed z-10 max-md:hidden md:max-lg:hidden lg:left-[calc(calc(30px_+_11*(((100%_-_60px_-_220px)/12)_+_20px))_+_(calc(1*((100%_-_60px_-_220px)/12)_+_0px)_-_min(calc(1*((100%_-_60px_-_220px)/12)_+_0px),calc(calc(1*((100dvh_-_60px_-_220px)/12)_+_0px)*1)))/2)] lg:top-[calc(calc(30px_+_11*(((100dvh_-_60px_-_220px)/12)_+_20px))_+_(calc(1*((100dvh_-_60px_-_220px)/12)_+_0px)_-_min(calc(1*((100%_-_60px_-_220px)/12)_+_0px),calc(calc(1*((100dvh_-_60px_-_220px)/12)_+_0px)*1))/1)/2)] lg:w-[min(calc(1*((100%_-_60px_-_220px)/12)_+_0px),calc(calc(1*((100dvh_-_60px_-_220px)/12)_+_0px)*1))] lg:h-[calc(min(calc(1*((100%_-_60px_-_220px)/12)_+_0px),calc(calc(1*((100dvh_-_60px_-_220px)/12)_+_0px)*1))/1)]",
        "skin": "pb-tok-candy-btn pb-skin-candy-btn",
        "modal": "pb-tok-soft-card pb-skin-soft-card",
        "radius": "[--pb-radius:28px]",
        "chip": "flex lg:hidden",
        "icon": "TUNE",
        "aspect": "1/1"
      }
    },
    "icons": {
      "CALENDAR": [
        [
          "M77.0,22.0 L79.3,22.3 L81.5,23.2 L83.4,24.6 L84.8,26.5 L85.7,28.7 L86.0,31.0 L86.0,79.0 L85.7,81.3 L84.8,83.5 L83.4,85.4 L81.5,86.8 L79.3,87.7 L77.0,88.0 L23.0,88.0 L20.7,87.7 L18.5,86.8 L16.6,85.4 L15.2,83.5 L14.3,81.3 L14.0,79.0 L14.0,31.0 L14.3,28.7 L15.2,26.5 L16.6,24.6 L18.5,23.2 L20.7,22.3 L23.0,22.0 Z M74.0,42.0 L75.0,42.1 L76.0,42.5 L76.8,43.2 L77.5,44.0 L77.9,45.0 L78.0,46.0 L78.0,76.0 L77.9,77.0 L77.5,78.0 L76.8,78.8 L76.0,79.5 L75.0,79.9 L74.0,80.0 L26.0,80.0 L25.0,79.9 L24.0,79.5 L23.2,78.8 L22.5,78.0 L22.1,77.0 L22.0,76.0 L22.0,46.0 L22.1,45.0 L22.5,44.0 L23.2,43.2 L24.0,42.5 L25.0,42.1 L26.0,42.0 Z",
          1.0,
          false
        ],
        [
          "M35.0,12.0 L35.8,12.1 L36.5,12.4 L37.1,12.9 L37.6,13.5 L37.9,14.2 L38.0,15.0 L38.0,27.0 L37.9,27.8 L37.6,28.5 L37.1,29.1 L36.5,29.6 L35.8,29.9 L35.0,30.0 L31.0,30.0 L30.2,29.9 L29.5,29.6 L28.9,29.1 L28.4,28.5 L28.1,27.8 L28.0,27.0 L28.0,15.0 L28.1,14.2 L28.4,13.5 L28.9,12.9 L29.5,12.4 L30.2,12.1 L31.0,12.0 Z",
          1.0,
          false
        ],
        [
          "M69.0,12.0 L69.8,12.1 L70.5,12.4 L71.1,12.9 L71.6,13.5 L71.9,14.2 L72.0,15.0 L72.0,27.0 L71.9,27.8 L71.6,28.5 L71.1,29.1 L70.5,29.6 L69.8,29.9 L69.0,30.0 L65.0,30.0 L64.2,29.9 L63.5,29.6 L62.9,29.1 L62.4,28.5 L62.1,27.8 L62.0,27.0 L62.0,15.0 L62.1,14.2 L62.4,13.5 L62.9,12.9 L63.5,12.4 L64.2,12.1 L65.0,12.0 Z",
          1.0,
          false
        ],
        [
          "M42.0,50.0 L42.5,50.1 L43.0,50.3 L43.4,50.6 L43.7,51.0 L43.9,51.5 L44.0,52.0 L44.0,60.0 L43.9,60.5 L43.7,61.0 L43.4,61.4 L43.0,61.7 L42.5,61.9 L42.0,62.0 L32.0,62.0 L31.5,61.9 L31.0,61.7 L30.6,61.4 L30.3,61.0 L30.1,60.5 L30.0,60.0 L30.0,52.0 L30.1,51.5 L30.3,51.0 L30.6,50.6 L31.0,50.3 L31.5,50.1 L32.0,50.0 Z",
          1.0,
          false
        ],
        [
          "M68.0,50.0 L68.5,50.1 L69.0,50.3 L69.4,50.6 L69.7,51.0 L69.9,51.5 L70.0,52.0 L70.0,60.0 L69.9,60.5 L69.7,61.0 L69.4,61.4 L69.0,61.7 L68.5,61.9 L68.0,62.0 L58.0,62.0 L57.5,61.9 L57.0,61.7 L56.6,61.4 L56.3,61.0 L56.1,60.5 L56.0,60.0 L56.0,52.0 L56.1,51.5 L56.3,51.0 L56.6,50.6 L57.0,50.3 L57.5,50.1 L58.0,50.0 Z",
          1.0,
          false
        ]
      ],
      "CHART": [
        [
          "M50.0,10.0 L89.9,39.0 L74.7,86.0 L25.3,86.0 L10.1,39.0 Z",
          0.35,
          false
        ],
        [
          "M50.0,22.0 L70.9,45.2 L70.0,79.5 L39.4,66.6 L25.3,44.0 Z",
          1.0,
          false
        ]
      ],
      "CHECK": [
        [
          "M20.1,55.9 L43.9,75.1 L81.0,35.7 L73.0,28.3 L40.1,64.9 L27.9,48.1 Z",
          1.0,
          false
        ]
      ],
      "FLAME": [
        [
          "M50.0,8.0 L62.0,30.0 L74.0,48.0 L78.0,64.0 L72.0,82.0 L50.0,94.0 L28.0,82.0 L22.0,64.0 L28.0,46.0 L38.0,34.0 L40.0,50.0 L48.0,30.0 Z",
          1.0,
          false
        ],
        [
          "M50.0,56.0 L58.0,68.0 L58.0,80.0 L50.0,86.0 L42.0,80.0 L42.0,68.0 Z",
          1.0,
          true
        ]
      ],
      "NOTE": [
        [
          "M48.0,72.0 L47.7,74.7 L46.9,77.4 L45.6,79.8 L43.9,81.9 L41.8,83.6 L39.4,84.9 L36.7,85.7 L34.0,86.0 L31.3,85.7 L28.6,84.9 L26.2,83.6 L24.1,81.9 L22.4,79.8 L21.1,77.4 L20.3,74.7 L20.0,72.0 L20.3,69.3 L21.1,66.6 L22.4,64.2 L24.1,62.1 L26.2,60.4 L28.6,59.1 L31.3,58.3 L34.0,58.0 L36.7,58.3 L39.4,59.1 L41.8,60.4 L43.9,62.1 L45.6,64.2 L46.9,66.6 L47.7,69.3 Z",
          1.0,
          false
        ],
        [
          "M49.5,72.0 L49.5,18.0 L42.5,18.0 L42.5,72.0 Z",
          1.0,
          false
        ],
        [
          "M46.0,15.0 L74.0,26.0 L74.0,40.0 L46.0,30.0 Z",
          1.0,
          false
        ]
      ],
      "STAR": [
        [
          "M50.0,4.0 L59.2,40.8 L96.0,50.0 L59.2,59.2 L50.0,96.0 L40.8,59.2 L4.0,50.0 L40.8,40.8 Z",
          1.0,
          false
        ]
      ],
      "TUNE": [
        [
          "M16.0,31.0 L84.0,31.0 L84.0,25.0 L16.0,25.0 Z",
          1.0,
          false
        ],
        [
          "M43.0,28.0 L42.7,30.3 L41.8,32.5 L40.4,34.4 L38.5,35.8 L36.3,36.7 L34.0,37.0 L31.7,36.7 L29.5,35.8 L27.6,34.4 L26.2,32.5 L25.3,30.3 L25.0,28.0 L25.3,25.7 L26.2,23.5 L27.6,21.6 L29.5,20.2 L31.7,19.3 L34.0,19.0 L36.3,19.3 L38.5,20.2 L40.4,21.6 L41.8,23.5 L42.7,25.7 Z",
          1.0,
          true
        ],
        [
          "M16.0,53.0 L84.0,53.0 L84.0,47.0 L16.0,47.0 Z",
          1.0,
          false
        ],
        [
          "M73.0,50.0 L72.7,52.3 L71.8,54.5 L70.4,56.4 L68.5,57.8 L66.3,58.7 L64.0,59.0 L61.7,58.7 L59.5,57.8 L57.6,56.4 L56.2,54.5 L55.3,52.3 L55.0,50.0 L55.3,47.7 L56.2,45.5 L57.6,43.6 L59.5,42.2 L61.7,41.3 L64.0,41.0 L66.3,41.3 L68.5,42.2 L70.4,43.6 L71.8,45.5 L72.7,47.7 Z",
          1.0,
          true
        ],
        [
          "M16.0,75.0 L84.0,75.0 L84.0,69.0 L16.0,69.0 Z",
          1.0,
          false
        ],
        [
          "M53.0,72.0 L52.7,74.3 L51.8,76.5 L50.4,78.4 L48.5,79.8 L46.3,80.7 L44.0,81.0 L41.7,80.7 L39.5,79.8 L37.6,78.4 L36.2,76.5 L35.3,74.3 L35.0,72.0 L35.3,69.7 L36.2,67.5 L37.6,65.6 L39.5,64.2 L41.7,63.3 L44.0,63.0 L46.3,63.3 L48.5,64.2 L50.4,65.6 L51.8,67.5 L52.7,69.7 Z",
          1.0,
          true
        ]
      ],
      "USER": [
        [
          "M68.0,34.0 L67.8,36.8 L67.1,39.6 L66.0,42.2 L64.6,44.6 L62.7,46.7 L60.6,48.6 L58.2,50.0 L55.6,51.1 L52.8,51.8 L50.0,52.0 L47.2,51.8 L44.4,51.1 L41.8,50.0 L39.4,48.6 L37.3,46.7 L35.4,44.6 L34.0,42.2 L32.9,39.6 L32.2,36.8 L32.0,34.0 L32.2,31.2 L32.9,28.4 L34.0,25.8 L35.4,23.4 L37.3,21.3 L39.4,19.4 L41.8,18.0 L44.4,16.9 L47.2,16.2 L50.0,16.0 L52.8,16.2 L55.6,16.9 L58.2,18.0 L60.6,19.4 L62.7,21.3 L64.6,23.4 L66.0,25.8 L67.1,28.4 L67.8,31.2 Z",
          1.0,
          false
        ],
        [
          "M65.0,58.0 L68.3,58.3 L71.5,59.3 L74.4,60.9 L77.0,63.0 L79.1,65.6 L80.7,68.5 L81.7,71.7 L82.0,75.0 L82.0,86.0 L81.9,87.2 L81.5,88.3 L81.0,89.3 L80.2,90.2 L79.3,91.0 L78.3,91.5 L77.2,91.9 L76.0,92.0 L24.0,92.0 L22.8,91.9 L21.7,91.5 L20.7,91.0 L19.8,90.2 L19.0,89.3 L18.5,88.3 L18.1,87.2 L18.0,86.0 L18.0,75.0 L18.3,71.7 L19.3,68.5 L20.9,65.6 L23.0,63.0 L25.6,60.9 L28.5,59.3 L31.7,58.3 L35.0,58.0 Z",
          1.0,
          false
        ]
      ]
    },
    "grain": 0.0,
    "vignette": 0.0
  }
};

export default THEME;
