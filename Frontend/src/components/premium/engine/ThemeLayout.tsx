// Persona Studio export · premium engine · re-export overwrites this file (delete this line to keep your edits)
//
// The premium theme around the app's own UI (App.tsx: <ThemeLayout>{dashboard}</ThemeLayout>).
//   stage    backdrop loop, the three.js scene and the foreground behind the whole UI
//   layout   while the theme is active it overwrites the classes of the app's elements with these data-el
//            names (theme.ui.boxes): the grid element (the dashboard <main>) becomes the theme's grid over the
//            screen, its boxes get their cells, the others (header, floating buttons) the same cell as a fixed
//            rectangle. The box keeps its own inner layout classes (direction, gaps, padding, text).
//            Leaving the theme puts the app's classes back.
//   chips    boxes that are chips at a breakpoint go to the dock; a chip opens its box as a modal
//            (a button, like the mixer button, is just clicked)
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { PremiumBackdrop } from "./PremiumBackdrop";
import { Icon } from "./PremiumLayout";
import { PremiumScene } from "./PremiumScene";
import type { Equipped, PremiumTheme } from "./types";

export type ThemeLayoutProps = {
  children: ReactNode;
  /** slot -> item key or cosmetics.file_path (null = empty); missing slots use the theme's starting setup */
  equipped?: Equipped;
};

/** Utility part of a class, without its variants ("lg:col-start-2" -> "col-start-2"; ":" inside [...] stays). */
function utility(cls: string) {
  let depth = 0;
  let cut = 0;
  for (let i = 0; i < cls.length; i++) {
    const ch = cls[i];
    if (ch === "[" || ch === "(") depth++;
    else if (ch === "]" || ch === ")") depth--;
    else if (ch === ":" && depth === 0) cut = i + 1;
  }
  return cls.slice(cut).replace(/^!|!$/g, "");
}

/** Classes the theme takes over: placement, size, position, surface. Display, direction, gaps, padding,
 *  alignment and text stay, so the box keeps its own inner layout. */
const REPLACED =
  /^-?(col-|row-|grid-cols|grid-rows|grid-flow|order-|self-|justify-self|place-self|w-|h-|size-|min-w-|min-h-|max-w-|max-h-|m[trblxyse]?-|inset|top-|right-|bottom-|left-|fixed$|absolute$|relative$|sticky$|static$|z-|bg-|from-|via-|to-|rounded|border|shadow|ring|outline|backdrop|opacity-|translate|scale|rotate|flex-1$|flex-auto$|flex-none$|flex-initial$|grow|shrink|basis-|overflow)/;

function kept(className: string) {
  return className
    .split(/\s+/)
    .filter((c) => c && !REPLACED.test(utility(c)))
    .join(" ");
}

function find(id: string) {
  return document.querySelector<HTMLElement>(`[data-el="${CSS.escape(id)}"]`);
}

type Owned = { original: string; applied: string };

/** The `Layout` of a premium theme for the app's registry: `Layout: createThemeLayout(THEME)`. */
export function createThemeLayout(theme: PremiumTheme) {
  function ThemeLayout({ children, equipped }: ThemeLayoutProps) {
    const ui = theme.ui;
    const [open, setOpen] = useState<string | null>(null);
    const [present, setPresent] = useState<string[]>([]);
    const owned = useRef(new Map<HTMLElement, Owned>());

    // after every render: the app may have re-rendered its elements (or changed their classes)
    useLayoutEffect(() => {
      if (!ui) return;
      const map = owned.current;
      const take = (el: HTMLElement, build: (original: string) => string) => {
        let rec = map.get(el);
        if (!rec || el.className !== rec.applied) rec = { original: el.className, applied: "" };
        rec.applied = build(rec.original).replace(/\s+/g, " ").trim();
        map.set(el, rec);
        if (el.className !== rec.applied) el.className = rec.applied;
      };
      const grid = find(ui.grid);
      if (grid) take(grid, () => ui.root);
      const found: string[] = [];
      for (const [id, b] of Object.entries(ui.boxes)) {
        const el = find(id);
        if (!el || el === grid) continue;
        found.push(id);
        if (open === id) {
          take(el, (o) => `${kept(o)} ${ui.modalPlace} pb-skin ${b.modal} ${b.radius}`);
        } else {
          const place = grid && grid.contains(el) ? b.box : b.place;
          take(el, (o) => `${kept(o)} ${place} pb-skin ${b.skin} ${b.radius} pointer-events-auto`);
        }
      }
      const key = found.join("\n");
      setPresent((p) => (p.join("\n") === key ? p : found));
    });

    // leaving the theme: the app's own classes back
    useLayoutEffect(() => {
      const map = owned.current;
      return () => {
        for (const [el, rec] of map) {
          if (el.isConnected && el.className === rec.applied) el.className = rec.original;
        }
        map.clear();
      };
    }, []);

    useEffect(() => {
      if (!open) return;
      const key = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(null);
      };
      window.addEventListener("keydown", key);
      return () => window.removeEventListener("keydown", key);
    }, [open]);

    if (!ui) return <>{children}</>;

    const choose = (id: string) => {
      const el = find(id);
      if (el?.matches("button, a[href]")) el.click();
      else setOpen(id);
    };

    return (
      <>
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[var(--pb-deep)]">
          <PremiumBackdrop theme={theme} />
          <PremiumScene theme={theme} equipped={equipped} />
          <PremiumBackdrop theme={theme} layer="front" />
        </div>
        {children}
        <nav aria-label="Quick panels" className={ui.dock}>
          {present.map((id) => {
            const b = ui.boxes[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => choose(id)}
                aria-label={b.title}
                title={b.title}
                className={`pb-skin ${ui.chipSkin} pointer-events-auto relative aspect-square max-h-full max-w-full shrink-0 ${ui.chipSize} ${b.chip}`}
              >
                <Icon theme={theme} name={b.icon} className={ui.chipIcon} />
              </button>
            );
          })}
        </nav>
        {open && (
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-40 cursor-default bg-[color-mix(in_oklab,var(--pb-void)_60%,transparent)]"
          />
        )}
      </>
    );
  }
  return ThemeLayout;
}
