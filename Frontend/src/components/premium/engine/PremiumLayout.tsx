// Persona Studio export · premium engine · re-export overwrites this file (delete this line to keep your edits)
import type { CSSProperties, ReactNode } from "react";
import type { PremiumBox, PremiumTheme } from "./types";

/** Classes of one app box in the theme: `outer` places it in the grid, `surface` is its skin. */
export function premiumBox(theme: PremiumTheme, id: string) {
  const b = theme.ui?.boxes[id];
  if (!b) return null;
  return {
    outer: `${b.box} min-h-0 min-w-0`,
    surface: `pb-skin ${b.skin} ${b.radius} pointer-events-auto relative size-full [container-type:size]`,
    modal: `pb-skin ${b.modal} ${b.radius} relative [container-type:size]`,
    chip: b.chip,
    aspect: b.aspect,
    title: b.title,
  };
}

/** Chip icon of the theme (the same vector icons as in Blender). */
export function Icon({ theme, name, className }: { theme: PremiumTheme; name: string; className?: string }) {
  const paths = theme.ui?.icons[name] ?? theme.ui?.icons.STAR ?? [];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {paths.map(([d, opacity, hub], i) => (
        <path
          key={i}
          d={d}
          fillRule={d.includes(" M") ? "evenodd" : undefined}
          opacity={opacity < 1 ? opacity : undefined}
          style={{ fill: hub ? "var(--pb-r-hub)" : "var(--pb-r-glyph)" }}
        />
      ))}
    </svg>
  );
}

function Panel({ b, children }: { b: PremiumBox; children: ReactNode }) {
  const section = (
    <section
      aria-label={b.title}
      className={`pb-skin ${b.skin} ${b.radius} pointer-events-auto relative size-full [container-type:size]`}
    >
      {children}
    </section>
  );
  if (b.aspect) {
    const fit: CSSProperties = { aspectRatio: b.aspect, width: `min(100cqw, calc(100cqh * ${b.aspect}))` };
    return (
      <div className={`${b.box} min-h-0 min-w-0 items-center justify-center [container-type:size]`}>
        <div style={fit}>{section}</div>
      </div>
    );
  }
  return <div className={`${b.box} min-h-0 min-w-0`}>{section}</div>;
}

type Props = {
  theme: PremiumTheme;
  /** the app's box contents by box id (the data-el names), e.g. { "Today's Quests": <QuestsBox />, Streak: <StreakBox /> } */
  boxes: Partial<Record<string, ReactNode>>;
  /** a chip (box collapsed to a round button at this breakpoint) was clicked: open the box as a modal */
  onOpen?: (id: string) => void;
  className?: string;
};

/** The theme's responsive grid with box components passed in by id. App.tsx renders its boxes itself and uses
 *  createThemeLayout() (ThemeLayout.tsx) instead; this one is for apps that split the boxes into components. */
export function PremiumLayout({ theme, boxes, onOpen, className = "" }: Props) {
  const ui = theme.ui;
  if (!ui) return null;
  const ids = Object.keys(ui.boxes).filter((id) => boxes[id] !== undefined);
  return (
    <div className={`${ui.root} ${className}`}>
      {ids.map((id) => (
        <Panel key={id} b={ui.boxes[id]}>
          {boxes[id]}
        </Panel>
      ))}
      <nav className={ui.dock} aria-label="Quick panels">
        {ids.map((id) => {
          const b = ui.boxes[id];
          return (
            <button
              key={id}
              type="button"
              onClick={() => onOpen?.(id)}
              aria-label={b.title}
              title={b.title}
              className={`pb-skin ${ui.chipSkin} pointer-events-auto relative aspect-square max-h-full max-w-full shrink-0 ${ui.chipSize} ${b.chip}`}
            >
              <Icon theme={theme} name={b.icon} className={ui.chipIcon} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
