// Persona Studio export · premium engine · re-export overwrites this file (delete this line to keep your edits)
//
// The "Persona Look" of the Blender preview (character/look.py), on top of three's Lambert lighting:
//   L    = luma(diffuse light of a white surface) * lightGain        (key / fill / rim suns + world, with shadows)
//   t    = mix(min(L, 1), smoothstep(threshold - softness, threshold + softness, L), toon)
//   lit  = albedo * mix(shadowColor, 1, t)
//   rim  = clamp(smoothstep(1 - rimWidth, 1, 1 - |N.V|) * (0.55 + 0.45 t) * rimStrength)
//   out  = mix(lit, rimColor, rim) + albedo * glow
// Blender sun strength S lights a white surface with S * cos / pi, exactly like a three DirectionalLight of
// intensity S, and a world of colour W gives W (= AmbientLight W with intensity pi).
import * as THREE from "three";
import type { LookSettings, MaterialSettings } from "./types";

export type { LookSettings, MaterialSettings };

const PARS = /* glsl */ `
uniform float uToon;
uniform float uThreshold;
uniform float uSoftness;
uniform float uLightGain;
uniform vec3 uShadow;
uniform vec3 uRimColor;
uniform float uRimStrength;
uniform float uRimWidth;
uniform float uSaturation;
uniform float uBrightness;
uniform vec3 uFlat;
uniform float uTexMix;
uniform vec3 uTint;
uniform float uRecolor;
uniform float uGlow;

vec3 pcRgbToHsv(vec3 c) {
  float cmax = max(c.r, max(c.g, c.b));
  float cmin = min(c.r, min(c.g, c.b));
  float d = cmax - cmin;
  float h = 0.0;
  float s = cmax > 0.0 ? d / cmax : 0.0;
  if (d > 0.0) {
    if (cmax == c.r) h = (c.g - c.b) / d;
    else if (cmax == c.g) h = 2.0 + (c.b - c.r) / d;
    else h = 4.0 + (c.r - c.g) / d;
    h /= 6.0;
    if (h < 0.0) h += 1.0;
  }
  return vec3(h, s, cmax);
}

vec3 pcHsvToRgb(vec3 hsv) {
  vec3 p = abs(fract(hsv.xxx + vec3(1.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0);
  return hsv.z * mix(vec3(1.0), clamp(p - 1.0, 0.0, 1.0), hsv.y);
}
`;

const LIGHTING = /* glsl */ `
LambertMaterial material;
material.diffuseColor = vec3(1.0);
material.specularStrength = 1.0;
`;

const SHADE = /* glsl */ `
{
  vec3 lightRGB = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
  float Lw = dot(lightRGB, vec3(0.2126, 0.7152, 0.0722)) * uLightGain;
  float term = mix(min(Lw, 1.0), smoothstep(uThreshold - uSoftness, uThreshold + uSoftness, Lw), uToon);
  vec3 base = mix(uFlat, diffuseColor.rgb, uTexMix);
  float lum2 = dot(base, vec3(0.2126, 0.7152, 0.0722)) * 2.0;
  vec3 albedo = mix(base, clamp(uTint * lum2, 0.0, 1.0), uRecolor);
  vec3 hsv = pcRgbToHsv(max(albedo, vec3(0.0)));
  hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0);
  hsv.z *= uBrightness;
  albedo = pcHsvToRgb(hsv);
  vec3 lit = albedo * mix(uShadow, vec3(1.0), term);
  float facing = 1.0 - abs(dot(normal, normalize(vViewPosition)));
  float rim = clamp(smoothstep(1.0 - uRimWidth, 1.0, facing) * (term * 0.45 + 0.55) * uRimStrength, 0.0, 1.0);
  outgoingLight = mix(lit, uRimColor, rim) + albedo * uGlow;
}
`;

function color(hex: string | undefined, fallback: string) {
  return new THREE.Color(hex ?? fallback);
}

/** Lambert material whose shading is replaced by the Persona Look (keeps skinning, shadows, textures, alpha). */
export function toonMaterial(src: THREE.Material, look: LookSettings, m: MaterialSettings | undefined) {
  const s = src as THREE.MeshStandardMaterial;
  const mat = new THREE.MeshLambertMaterial({
    name: s.name,
    color: s.color ? s.color.clone() : new THREE.Color(1, 1, 1),
    map: s.map ?? null,
    alphaMap: s.alphaMap ?? null,
    transparent: s.transparent,
    opacity: s.opacity,
    alphaTest: s.alphaTest,
    side: s.side,
    vertexColors: s.vertexColors,
  });
  const uniforms = {
    uToon: { value: look.toon },
    uThreshold: { value: look.threshold },
    uSoftness: { value: look.softness },
    uLightGain: { value: look.light_gain ?? 1 },
    uShadow: { value: color(look.shadow_color, "#555566") },
    uRimColor: { value: color(look.rim_color, "#ffffff") },
    uRimStrength: { value: look.rim_strength },
    uRimWidth: { value: look.rim_width },
    uSaturation: { value: look.saturation },
    uBrightness: { value: look.brightness },
    uFlat: { value: color(m?.flat_color, "#ebe0cc") },
    uTexMix: { value: m?.texture_mix ?? 1 },
    uTint: { value: color(m?.tint, "#ffffff") },
    uRecolor: { value: m?.recolor ?? 0 },
    uGlow: { value: m?.glow ?? 0 },
  };
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\n" + PARS)
      .replace("#include <lights_lambert_fragment>", LIGHTING)
      .replace("#include <opaque_fragment>", SHADE + "\n#include <opaque_fragment>");
  };
  mat.customProgramCacheKey = () => "persona-look";
  mat.userData.look = uniforms;
  mat.userData.lookBase = { tint: uniforms.uTint.value.clone(), recolor: uniforms.uRecolor.value };
  return mat;
}

type LookUniforms = { uTint: { value: THREE.Color }; uRecolor: { value: number } };

/** Shop colour on a Persona Look material (null = its own colour again). */
export function recolor(mat: THREE.Material, hex: string | null) {
  const u = mat.userData.look as LookUniforms | undefined;
  const base = mat.userData.lookBase as { tint: THREE.Color; recolor: number } | undefined;
  if (!u || !base) return;
  if (hex) {
    u.uTint.value.set(hex);
    u.uRecolor.value = 1;
  } else {
    u.uTint.value.copy(base.tint);
    u.uRecolor.value = base.recolor;
  }
}

/** Inverted hull outline: back faces pushed out along the normals (like the Blender Solidify outline). */
export function outlineMaterial(hex: string, width: number) {
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(hex), side: THREE.BackSide });
  const uniforms = { uOutline: { value: width } };
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uOutline;")
      .replace(
        "#include <skinning_vertex>",
        "#include <skinning_vertex>\n#ifdef USE_SKINNING\ntransformed += normalize(objectNormal) * uOutline;\n#else\ntransformed += normalize(normal) * uOutline;\n#endif",
      );
  };
  mat.customProgramCacheKey = () => "persona-outline";
  return mat;
}
