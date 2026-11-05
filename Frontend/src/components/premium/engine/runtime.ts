// Persona Studio export · premium engine · re-export overwrites this file (delete this line to keep your edits)
//
// The three.js side of a premium theme, framework free (PremiumScene.tsx wraps it for React):
//   stage    camera per breakpoint (focus point kept at its screen anchor), key / fill / rim suns, world light
//   base     the theme's model (character, house, vase): toon look, outline, idle, click, look-at
//   items    one per slot, loaded from the backend storage on demand and cached:
//              skin    re-bound to the base skeleton (clothes)
//              bone    follows its bone of the base rig (hats, glasses)
//              static  placed where it was in Blender (decor, flowers); its own clips loop (a stem's sway)
//              color   recolours a material of the scene (wall paint, glazes)
//   events   quest_completed / level_up / item_equipped from the app, bored from the inactivity timer:
//            the event's model clip + helpers (a butterfly) landing on the anchor of a slot's item
import * as THREE from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { premiumEvents, type PremiumEventDetail } from "./events";
import { outlineMaterial, recolor, toonMaterial } from "./toon";
import type { Clip, LookSettings, MaterialSettings, PremiumEventName, PremiumItem, PremiumTheme, Shot } from "./types";

/** Clicks on these (or inside them) belong to the app, not to the model behind it. */
const UI_TARGETS = "a, button, input, select, textarea, label, dialog, summary, [role=button], [role=tab], [data-el]";

const DEFAULT_LOOK: LookSettings = {
  toon: 0.65, threshold: 0.4, softness: 0.14, light_gain: 1, shadow_color: "#9a88aa", rim_color: "#ffd98a",
  rim_strength: 0.7, rim_width: 0.45, saturation: 1, brightness: 1,
};
const EVENT_ROLE: Record<PremiumEventName, string> = {
  bored: "bored", quest_completed: "complete", level_up: "level_up", item_equipped: "equip",
};

/** Site-relative URL of a public file of the theme (public/premium/<theme>/...). */
export function publicUrl(theme: PremiumTheme, file: string) {
  return `${import.meta.env.BASE_URL}${theme.publicPath}${file}`;
}

/** URL of the backend storage (VITE_STORAGE_URL, default "/storage": proxy it to Laravel in development). */
export function defaultStorageUrl(): string {
  const env = import.meta.env.VITE_STORAGE_URL as string | undefined;
  return (env && env.length ? env : "/storage").replace(/\/$/, "");
}

export function storageFileUrl(storageUrl: string, file: string) {
  return `${storageUrl.replace(/\/$/, "")}/${file.replace(/^\//, "")}`;
}

/** item key from a key or a cosmetics.file_path ("catalogue/cosmetics/vase/flower/rose.glb" -> "rose") */
export function itemKey(value: string) {
  const last = value.split("/").pop() ?? value;
  return last.replace(/\.(glb|gltf|json|png)$/i, "");
}

/** slot -> item key, with the theme's defaults for missing slots and required slots never empty */
export function resolveEquipped(theme: PremiumTheme, equipped?: Record<string, string | null | undefined>) {
  const out: Record<string, string | null> = {};
  for (const slot of theme.slots) {
    const given = equipped && slot.key in equipped ? equipped[slot.key] : theme.defaults[slot.key];
    let key = given ? itemKey(given) : null;
    if (key && !slot.items.some((i) => i.key === key)) key = null;
    if (!key && slot.required) key = theme.defaults[slot.key] ?? slot.items[0]?.key ?? null;
    out[slot.key] = key;
  }
  return out;
}

type Player = {
  mixer: THREE.AnimationMixer;
  actions: Map<string, THREE.AnimationAction>;
  clips: Clip[];
  idle: string;
  current: THREE.AnimationAction | null;
};

function makePlayer(root: THREE.Object3D, animations: THREE.AnimationClip[], clips: Clip[], idle: string,
                    fade: number): Player {
  const mixer = new THREE.AnimationMixer(root);
  const actions = new Map<string, THREE.AnimationAction>();
  for (const c of animations) actions.set(c.name, mixer.clipAction(c));
  const p: Player = { mixer, actions, clips, idle, current: null };
  mixer.addEventListener("finished", (e) => {
    if (e.action === p.current && p.idle) play(p, p.idle, fade);
  });
  return p;
}

function play(p: Player, name: string, fade: number) {
  const next = p.actions.get(name);
  if (!next) return false;
  const loop = p.clips.find((c) => c.name === name)?.loop ?? name === p.idle;
  next.reset();
  next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, Infinity);
  next.clampWhenFinished = !loop;
  next.enabled = true;
  next.setEffectiveWeight(1);
  next.play();
  if (p.current && p.current !== next) p.current.crossFadeTo(next, fade, false);
  p.current = next;
  return true;
}

function pick<T>(list: T[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function nodeName(name: string) {
  return THREE.PropertyBinding.sanitizeNodeName(name);
}

type Loaded = {
  item: PremiumItem;
  root: THREE.Object3D;
  holder: THREE.Object3D;
  anchor: THREE.Object3D;
  meshes: THREE.Mesh[];
  player: Player | null;
};

type SlotState = { key: string | null; loaded: Loaded | null; token: number };

export type RuntimeOptions = {
  storageUrl?: string;
  /** pointer look-at and click reactions (default true) */
  interactive?: boolean;
  onError?: (what: string, error: unknown) => void;
};

export class PremiumRuntime {
  readonly theme: PremiumTheme;
  private host: HTMLElement;
  private storageUrl: string;
  private interactive: boolean;
  private onError: (what: string, error: unknown) => void;
  private disposed = false;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private content = new THREE.Group();
  private camera = new THREE.PerspectiveCamera(30, 1, 0.01, 200);
  private suns: THREE.DirectionalLight[] = [];
  private loader = new GLTFLoader();
  private draco: DRACOLoader | null = null;
  private files = new Map<string, Promise<GLTF>>();
  private items = new Map<string, Promise<Loaded>>();
  private slots = new Map<string, SlotState>();
  private wanted: Record<string, string | null> = {};
  private first = true;
  private base: THREE.Object3D | null = null;
  private baseMeshes: THREE.Mesh[] = [];
  private basePlayer: Player | null = null;
  private baseReady: Promise<void>;
  private bones = new Map<string, THREE.Object3D>();
  private restWorld = new Map<string, THREE.Matrix4>();
  private lookBones: { bone: THREE.Object3D; weight: number; base: THREE.Quaternion }[] = [];
  private helpers: { root: THREE.Object3D; player: Player; left: number }[] = [];
  private look: LookSettings;
  private ro: ResizeObserver;
  private pointer = new THREE.Vector2();
  private pointerActive = false;
  private lastInput = performance.now();
  private lastClick = 0;
  private lastEvent = new Map<string, number>();
  private raycaster = new THREE.Raycaster();
  private yawPitch = new THREE.Vector2();
  private last = performance.now();
  private unsubscribe: (() => void)[] = [];

  constructor(host: HTMLElement, theme: PremiumTheme, options: RuntimeOptions = {}) {
    this.host = host;
    this.theme = theme;
    this.storageUrl = options.storageUrl ?? defaultStorageUrl();
    this.interactive = options.interactive ?? true;
    this.onError = options.onError ?? ((what, e) => console.error(`[premium ${theme.key}] ${what}:`, e));
    this.look = theme.look ?? DEFAULT_LOOK;
    if (theme.base?.draco || theme.slots.length) {
      this.draco = new DRACOLoader(); // decoder files come with three (bundled by Vite)
      this.loader.setDRACOLoader(this.draco);
    }

    const r = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.NoToneMapping;
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFShadowMap;
    r.setClearColor(0x000000, 0);
    r.domElement.style.display = "block";
    r.domElement.style.opacity = "0";
    r.domElement.style.transition = "opacity .6s ease";
    host.appendChild(r.domElement);
    this.renderer = r;
    this.scene.add(this.content);
    this.lights();
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(host);
    this.resize();
    this.baseReady = this.loadBase();
    this.listen();
    r.setAnimationLoop(() => this.frame());
  }

  // ---------------------------------------------------------------- stage
  private lights() {
    const { world, lights } = this.theme.stage;
    if (world) {
      const c = new THREE.Color().setRGB(world.color_linear[0], world.color_linear[1], world.color_linear[2],
        THREE.LinearSRGBColorSpace);
      this.scene.add(new THREE.AmbientLight(c, Math.PI * world.strength));
    }
    for (const l of lights) {
      const c = new THREE.Color();
      if (l.color_linear) c.setRGB(l.color_linear[0], l.color_linear[1], l.color_linear[2], THREE.LinearSRGBColorSpace);
      else c.set(l.color);
      const sun = new THREE.DirectionalLight(c, l.strength);
      sun.userData.direction = new THREE.Vector3(l.direction[0], l.direction[1], l.direction[2]).normalize();
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.bias = -0.0004;
      sun.shadow.normalBias = 0.02;
      this.scene.add(sun, sun.target);
      this.suns.push(sun);
    }
  }

  private shot(width: number): Shot {
    const { breakpoints, shots } = this.theme.stage;
    const order = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);
    for (const [name, min] of order) if (width >= min && shots[name]) return shots[name];
    return shots.base ?? Object.values(shots)[0];
  }

  private resize() {
    const W = Math.max(1, this.host.clientWidth);
    const H = Math.max(1, this.host.clientHeight);
    this.renderer.setSize(W, H);
    const s = this.shot(W);
    if (!s) return;
    const cam = this.camera;
    cam.fov = s.fov;
    cam.aspect = W / H;
    cam.position.set(s.position[0], s.position[1], s.position[2]);
    cam.lookAt(new THREE.Vector3(s.target[0], s.target[1], s.target[2]));
    cam.setViewOffset(W, H, (0.5 - s.anchor_x) * W, (0.5 - s.anchor_y) * H, W, H);
    cam.updateProjectionMatrix();
  }

  private fitShadows() {
    const box = new THREE.Box3().setFromObject(this.content);
    if (box.isEmpty()) return;
    const sphere = box.getBoundingSphere(new THREE.Sphere());
    for (const sun of this.suns) {
      const d = sun.userData.direction as THREE.Vector3;
      sun.target.position.copy(sphere.center);
      sun.position.copy(sphere.center).addScaledVector(d, -sphere.radius * 3);
      const c = sun.shadow.camera;
      c.left = c.bottom = -sphere.radius * 1.1;
      c.right = c.top = sphere.radius * 1.1;
      c.near = 0.01;
      c.far = sphere.radius * 6;
      c.updateProjectionMatrix();
    }
  }

  // ---------------------------------------------------------------- loading
  private file(url: string) {
    let p = this.files.get(url);
    if (!p) {
      p = this.loader.loadAsync(url);
      this.files.set(url, p);
      p.catch(() => this.files.delete(url));
    }
    return p;
  }

  /** toon materials (+ outline hulls) on every mesh below root; returns the meshes */
  private dress(root: THREE.Object3D, materials: MaterialSettings[] = []) {
    const mats = new Map(materials.map((m) => [m.name, m]));
    const meshes: THREE.Mesh[] = [];
    const hulls: [THREE.Object3D, THREE.Mesh][] = [];
    const outline = this.theme.outline;
    const height = this.theme.base?.height ?? 1;
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh || mesh.userData.hull) return;
      const swap = (m: THREE.Material) => toonMaterial(m, this.look, mats.get(m.name));
      mesh.material = Array.isArray(mesh.material) ? mesh.material.map(swap) : swap(mesh.material);
      mesh.castShadow = mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      meshes.push(mesh);
      if (outline?.enabled && outline.width > 0) {
        const scale = mesh.getWorldScale(new THREE.Vector3()).x || 1;
        const mat = outlineMaterial(outline.color, (0.004 * height * outline.width) / scale);
        const sk = mesh as THREE.SkinnedMesh;
        let hull: THREE.Mesh;
        if (sk.isSkinnedMesh) {
          const skinned = new THREE.SkinnedMesh(sk.geometry, mat);
          skinned.bind(sk.skeleton, sk.bindMatrix);
          hull = skinned;
        } else {
          hull = new THREE.Mesh(mesh.geometry, mat);
        }
        hull.userData.hull = mesh;
        hull.position.copy(mesh.position);
        hull.quaternion.copy(mesh.quaternion);
        hull.scale.copy(mesh.scale);
        hull.frustumCulled = false;
        hulls.push([mesh.parent ?? root, hull]);
      }
    });
    for (const [parent, hull] of hulls) parent.add(hull);
    return meshes;
  }

  private async loadBase() {
    const b = this.theme.base;
    if (!b) {
      this.renderer.domElement.style.opacity = "1";
      return;
    }
    try {
      const gltf = await this.file(publicUrl(this.theme, b.model));
      if (this.disposed) return;
      const root = gltf.scene;
      this.base = root;
      this.baseMeshes = this.dress(root, b.materials);
      this.content.add(root);
      root.updateMatrixWorld(true);
      // rest pose of every bone (bone items are placed against it)
      root.traverse((o) => {
        if ((o as THREE.Bone).isBone) {
          this.bones.set(o.name, o);
          this.restWorld.set(o.name, o.matrixWorld.clone());
        }
      });
      for (const lb of b.lookAt.bones) {
        const bone = this.bone(lb.bone);
        if (bone) this.lookBones.push({ bone, weight: lb.weight, base: bone.quaternion.clone() });
      }
      const idle = b.behavior.idle[0] ?? b.clips.find((c) => c.role === "idle")?.name ?? "";
      if (gltf.animations.length) {
        this.basePlayer = makePlayer(root, gltf.animations, b.clips, idle, b.behavior.crossfade_seconds);
        if (idle) play(this.basePlayer, idle, 0);
      }
      this.fitShadows();
    } catch (e) {
      this.onError("the base model could not be loaded", e);
    }
    this.renderer.domElement.style.opacity = "1";
  }

  private bone(name: string) {
    return this.bones.get(nodeName(name)) ?? this.bones.get(name) ?? null;
  }

  private rest(name: string) {
    return this.restWorld.get(nodeName(name)) ?? this.restWorld.get(name) ?? null;
  }

  private findItem(slot: string, key: string) {
    return this.theme.slots.find((s) => s.key === slot)?.items.find((i) => i.key === key) ?? null;
  }

  private loadItem(slot: string, item: PremiumItem) {
    const id = `${slot}/${item.key}`;
    let p = this.items.get(id);
    if (!p) {
      p = this.prepare(item);
      this.items.set(id, p);
      p.catch(() => this.items.delete(id));
    }
    return p;
  }

  private async prepare(item: PremiumItem): Promise<Loaded> {
    await this.baseReady;
    const gltf = await this.file(storageFileUrl(this.storageUrl, item.file));
    const root = gltf.scene;
    root.updateMatrixWorld(true);
    const holder = new THREE.Group();
    holder.name = `item:${item.key}`;
    const type = item.attach?.type ?? "static";
    if (type === "skin" && this.bones.size) {
      root.traverse((o) => {
        const sk = o as THREE.SkinnedMesh;
        if (!sk.isSkinnedMesh) return;
        // same bones as the base (by name): the item deforms with the base animation
        const bones = sk.skeleton.bones.map((b) => (this.bone(b.name) as THREE.Bone | null) ?? b);
        sk.bind(new THREE.Skeleton(bones, sk.skeleton.boneInverses), sk.bindMatrix);
      });
    }
    const meshes = this.dress(root, item.materials);
    if (type === "bone" && item.attach?.bone) {
      // exported in the rest pose at its world place: keep that offset to the bone
      const rest = this.rest(item.attach.bone);
      if (rest) holder.matrix.copy(rest).invert();
      holder.matrix.decompose(holder.position, holder.quaternion, holder.scale);
    }
    holder.add(root);
    let node: THREE.Object3D = root;
    if (item.node) node = root.getObjectByName(nodeName(item.node)) ?? root.children[0] ?? root;
    else if (root.children.length === 1) node = root.children[0];
    // the anchor (where helpers land), in the rest pose of the file; it follows its bone when it has one
    const anchor = new THREE.Object3D();
    anchor.name = `anchor:${item.key}`;
    const local = new THREE.Matrix4();
    if (item.anchor?.length === 16) local.fromArray(item.anchor);
    const world = node.matrixWorld.clone().multiply(local);
    let host: THREE.Object3D = node;
    let rel = local;
    if (item.anchorBone) {
      const own = type === "skin" ? null : root.getObjectByName(nodeName(item.anchorBone));
      const shared = type === "skin" ? this.bone(item.anchorBone) : null;
      const rest = own ? own.matrixWorld : shared ? this.rest(item.anchorBone) : null;
      if (rest) {
        host = (own ?? shared) as THREE.Object3D;
        rel = rest.clone().invert().multiply(world);
      }
    }
    rel.decompose(anchor.position, anchor.quaternion, anchor.scale);
    host.add(anchor);
    let player: Player | null = null;
    if (gltf.animations.length) {
      const clips = item.clips ?? [];
      const idle = clips.find((c) => c.loop)?.name ?? "";
      player = makePlayer(root, gltf.animations, clips, idle, 0.25);
    }
    return { item, root, holder, anchor, meshes, player };
  }

  private parentFor(l: Loaded) {
    if (l.item.attach?.type === "bone" && l.item.attach.bone) return this.bone(l.item.attach.bone) ?? this.content;
    return this.content;
  }

  // ---------------------------------------------------------------- equip
  /** slot -> item key (null = empty). Use resolveEquipped() to apply the theme's defaults first. */
  setEquipped(next: Record<string, string | null>) {
    const changed: string[] = [];
    for (const slot of this.theme.slots) {
      const key = next[slot.key] ?? null;
      if ((this.wanted[slot.key] ?? null) !== key || !(slot.key in this.wanted)) {
        if (!this.first) changed.push(slot.key);
        this.wanted[slot.key] = key;
        void this.applySlot(slot.key, key, !this.first);
      }
    }
    this.first = false;
    return changed;
  }

  private async applySlot(slot: string, key: string | null, announce: boolean) {
    const state = this.slots.get(slot) ?? { key: null, loaded: null, token: 0 };
    this.slots.set(slot, state);
    const token = ++state.token;
    const item = key ? this.findItem(slot, key) : null;
    // colour items do not load anything
    const prevItem = state.key ? this.findItem(slot, state.key) : null;
    if (prevItem?.kind === "color") this.paint(prevItem, null);
    if (item?.kind === "color") {
      this.detach(state);
      state.key = key;
      await this.baseReady;
      if (token !== state.token || this.disposed) return;
      this.paint(item, item.color?.color ?? null);
      if (announce) this.trigger("item_equipped", { slot, item: key ?? undefined });
      return;
    }
    let loaded: Loaded | null = null;
    if (item) {
      try {
        loaded = await this.loadItem(slot, item);
      } catch (e) {
        this.onError(`item ${slot}/${item.key} could not be loaded`, e);
      }
    }
    if (token !== state.token || this.disposed) return;
    this.detach(state);
    state.key = key;
    if (loaded) {
      this.parentFor(loaded).add(loaded.holder);
      state.loaded = loaded;
      this.repaint();
      if (loaded.player) {
        const p = loaded.player;
        if (p.idle) play(p, p.idle, 0);
        const equip = p.clips.find((c) => c.role === "equip")?.name;
        if (announce && equip) play(p, equip, 0.15);
      }
      this.fitShadows();
    }
    if (announce) this.trigger("item_equipped", { slot, item: key ?? undefined });
  }

  private detach(state: SlotState) {
    if (state.loaded) {
      state.loaded.holder.removeFromParent();
      state.loaded.player?.mixer.stopAllAction();
      if (state.loaded.player) state.loaded.player.current = null;
    }
    state.loaded = null;
  }

  private allMeshes() {
    const out = [...this.baseMeshes];
    for (const s of this.slots.values()) if (s.loaded) out.push(...s.loaded.meshes);
    return out;
  }

  private paint(item: PremiumItem, hex: string | null) {
    const name = item.color?.material;
    if (!name) return;
    for (const mesh of this.allMeshes()) {
      for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
        if (m.name === name) recolor(m, hex);
      }
    }
  }

  /** colour items again after a model item came in (it may use the recoloured material) */
  private repaint() {
    for (const [slot, s] of this.slots) {
      const it = s.key ? this.findItem(slot, s.key) : null;
      if (it?.kind === "color") this.paint(it, it.color?.color ?? null);
    }
  }

  // ---------------------------------------------------------------- events
  private listen() {
    for (const name of ["quest_completed", "level_up", "item_equipped", "bored"] as PremiumEventName[]) {
      const fn = (e: Event) => this.trigger(name, (e as CustomEvent<PremiumEventDetail>).detail ?? {});
      premiumEvents.addEventListener(name, fn);
      this.unsubscribe.push(() => premiumEvents.removeEventListener(name, fn));
    }
    if (!this.interactive) return;
    const el = this.renderer.domElement;
    const toNdc = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      this.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };
    const move = (e: PointerEvent) => {
      toNdc(e);
      this.pointerActive = true;
      this.lastInput = performance.now();
    };
    const leave = () => {
      this.pointerActive = false;
    };
    // The scene usually sits behind the app's UI (pointer-events-none), so clicks are read on the window: a click
    // on the app's own controls or boxes is theirs, any other click is tested against the model.
    const down = (e: PointerEvent) => {
      toNdc(e);
      this.lastInput = performance.now();
      const t = e.target as Element | null;
      if (t && t !== el && t.closest?.(UI_TARGETS)) return;
      this.click();
    };
    const key = () => {
      this.lastInput = performance.now();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("keydown", key);
    document.addEventListener("pointerleave", leave);
    this.unsubscribe.push(() => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("keydown", key);
      document.removeEventListener("pointerleave", leave);
    });
  }

  private click() {
    const b = this.theme.base;
    if (!b || !this.basePlayer || !b.click) return;
    const now = performance.now();
    if (now - this.lastClick < b.behavior.click_cooldown_seconds * 1000) return;
    this.raycaster.setFromCamera(this.pointer, this.camera);
    if (!this.raycaster.intersectObjects(this.allMeshes(), false).length) return;
    this.lastClick = now;
    const clicks = b.clips.filter((c) => c.role === "click").map((c) => c.name);
    if (clicks.length) play(this.basePlayer, pick(clicks), b.behavior.crossfade_seconds);
  }

  /** Play what an event means for this theme (the app's emitPremiumEvent and equip changes end up here). */
  trigger(name: PremiumEventName, detail: PremiumEventDetail = {}) {
    if (this.disposed) return;
    const id = `${name}:${detail.slot ?? ""}`;
    const now = performance.now();
    if (now - (this.lastEvent.get(id) ?? -1e9) < 800) return; // the app and the scene both reported it
    this.lastEvent.set(id, now);
    if (name !== "bored") this.lastInput = now;
    const b = this.theme.base;
    const entries = this.theme.events.filter((e) => e.event === name);
    let played = false;
    if (b && this.basePlayer) {
      const fade = b.behavior.crossfade_seconds;
      for (const e of entries) if (e.clip && !played) played = play(this.basePlayer, e.clip, fade);
      if (!played) {
        const role = EVENT_ROLE[name];
        const list = b.clips.filter((c) => c.role === role).map((c) => c.name);
        if (list.length) played = play(this.basePlayer, pick(list), fade);
      }
    }
    for (const e of entries) {
      if (!e.helper) continue;
      const slot = e.slot || (name === "item_equipped" ? detail.slot ?? "" : "");
      void this.playHelper(e.helper, slot, e.seconds, e.stay ?? 0);
    }
  }

  private async playHelper(file: string, slot: string, seconds: number, stay: number) {
    let parent: THREE.Object3D = this.content;
    if (slot) {
      const s = this.slots.get(slot);
      if (!s?.loaded) return; // nothing to land on
      parent = s.loaded.anchor;
    }
    try {
      const gltf = await this.file(publicUrl(this.theme, file));
      if (this.disposed) return;
      // one instance per helper file: replay from the start
      const old = this.helpers.findIndex((h) => h.root.userData.file === file);
      if (old >= 0) {
        this.helpers[old].root.removeFromParent();
        this.helpers[old].player.mixer.stopAllAction();
        this.helpers.splice(old, 1);
      }
      const root = gltf.scene;
      root.userData.file = file;
      if (!root.userData.dressed) {
        this.dress(root);
        root.userData.dressed = true;
      }
      parent.add(root);
      const player = makePlayer(root, gltf.animations, [], "", 0);
      let longest = seconds;
      for (const a of player.actions.values()) {
        a.reset();
        a.setLoop(THREE.LoopOnce, 1);
        a.clampWhenFinished = true; // keeps the last frame (landed) while it stays
        a.play();
        longest = Math.max(longest, a.getClip().duration);
      }
      // lifetime in animation time (slow devices play the clip slower, the helper still lands)
      this.helpers.push({ root, player, left: stay < 0 ? Infinity : longest + stay + 0.05 });
    } catch (e) {
      this.onError(`helper ${file} could not be loaded`, e);
    }
  }

  // ---------------------------------------------------------------- frame
  private lookAt(dt: number) {
    const b = this.theme.base;
    if (!b || !this.base || !this.lookBones.length || !this.interactive) return;
    const maxYaw = THREE.MathUtils.degToRad(b.lookAt.max_yaw_deg);
    const maxPitch = THREE.MathUtils.degToRad(b.lookAt.max_pitch_deg);
    let yaw = 0;
    let pitch = 0;
    if (this.pointerActive && performance.now() - this.lastInput < 4000) {
      const head = new THREE.Vector3();
      this.lookBones[this.lookBones.length - 1].bone.getWorldPosition(head);
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const p = this.raycaster.ray.at(this.raycaster.ray.origin.distanceTo(head), new THREE.Vector3());
      const dir = p.sub(head);
      const rootQ = this.base.getWorldQuaternion(new THREE.Quaternion());
      dir.applyQuaternion(rootQ.clone().invert());
      yaw = THREE.MathUtils.clamp(Math.atan2(dir.x, dir.z), -maxYaw, maxYaw);
      pitch = THREE.MathUtils.clamp(Math.atan2(dir.y, Math.hypot(dir.x, dir.z)), -maxPitch, maxPitch);
    }
    const k = 1 - Math.exp(-dt * 6);
    this.yawPitch.x += (yaw - this.yawPitch.x) * k;
    this.yawPitch.y += (pitch - this.yawPitch.y) * k;
    const rootQ = this.base.getWorldQuaternion(new THREE.Quaternion());
    const delta = new THREE.Quaternion().setFromEuler(new THREE.Euler(-this.yawPitch.y, this.yawPitch.x, 0, "YXZ"));
    const worldDelta = rootQ.clone().multiply(delta).multiply(rootQ.clone().invert());
    const parentQ = new THREE.Quaternion();
    const boneQ = new THREE.Quaternion();
    for (const { bone, weight } of this.lookBones) {
      const part = new THREE.Quaternion().slerp(worldDelta, weight);
      bone.parent?.getWorldQuaternion(parentQ);
      bone.getWorldQuaternion(boneQ);
      bone.quaternion.copy(parentQ.invert().multiply(part.multiply(boneQ)));
      bone.updateMatrixWorld(true);
    }
  }

  private frame() {
    const now = performance.now();
    const dt = Math.min(0.1, (now - this.last) / 1000);
    this.last = now;
    const b = this.theme.base;
    if (this.basePlayer) {
      // the look-at offset goes on top of the animation every frame
      for (const lb of this.lookBones) lb.bone.quaternion.copy(lb.base);
      this.basePlayer.mixer.update(dt);
      for (const lb of this.lookBones) lb.base.copy(lb.bone.quaternion);
      this.base?.updateMatrixWorld(true);
      this.lookAt(dt);
    }
    for (const s of this.slots.values()) s.loaded?.player?.mixer.update(dt);
    for (let i = this.helpers.length - 1; i >= 0; i--) {
      const h = this.helpers[i];
      h.player.mixer.update(dt);
      h.left -= dt;
      if (h.left <= 0) {
        h.root.removeFromParent();
        h.player.mixer.stopAllAction();
        this.helpers.splice(i, 1);
      }
    }
    if (b && now - this.lastInput > b.behavior.bored_after_seconds * 1000) {
      const idle = this.basePlayer?.actions.get(this.basePlayer.idle);
      if (!this.basePlayer || this.basePlayer.current === idle) this.trigger("bored");
      this.lastInput = now;
    }
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.ro.disconnect();
    for (const u of this.unsubscribe) u();
    this.basePlayer?.mixer.stopAllAction();
    const seen = new Set<THREE.Object3D>();
    const free = (root: THREE.Object3D) => {
      if (seen.has(root)) return;
      seen.add(root);
      root.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        if (!mesh.userData.hull) mesh.geometry.dispose();
        for (const m of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
          (m as THREE.MeshLambertMaterial).map?.dispose();
          m.dispose();
        }
      });
    };
    free(this.scene);
    for (const p of this.items.values()) p.then((l) => free(l.holder)).catch(() => undefined);
    this.draco?.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
