// Persona Studio export · premium engine · re-export overwrites this file (delete this line to keep your edits)
import { publicUrl } from "./runtime";
import type { PremiumTheme } from "./types";

type Props = {
  theme: PremiumTheme;
  /** back: loop video (poster while it loads) · front: foreground PNG + grain / vignette (over the scene) */
  layer?: "back" | "front";
  className?: string;
};

const ORIENT = { landscape: "portrait:hidden", portrait: "landscape:hidden" } as const;

/** Rendered backdrop plates of the theme; the portrait plate is shown when the window is taller than wide. */
export function PremiumBackdrop({ theme, layer = "back", className = "" }: Props) {
  const plates = theme.stage.plates;
  const cls = `pointer-events-none absolute inset-0 size-full object-cover ${className}`;
  const out = [];
  for (const tag of ["landscape", "portrait"] as const) {
    const p = plates[tag];
    const hide = ORIENT[tag];
    if (layer === "back") {
      if (p.video) {
        out.push(
          <video
            key={tag}
            className={`${cls} ${hide}`}
            src={publicUrl(theme, p.video)}
            poster={p.poster ? publicUrl(theme, p.poster) : undefined}
            autoPlay
            loop
            muted
            playsInline
          />,
        );
      } else if (p.poster) {
        out.push(<img key={tag} className={`${cls} ${hide}`} src={publicUrl(theme, p.poster)} alt="" />);
      }
    } else if (p.foreground) {
      out.push(<img key={tag} className={`${cls} ${hide}`} src={publicUrl(theme, p.foreground)} alt="" />);
    }
  }
  if (layer === "front" && theme.ui) {
    if (theme.ui.vignette > 0) out.push(<div key="vignette" className="pb-vignette" />);
    if (theme.ui.grain > 0) out.push(<div key="grain" className="pb-grain" />);
  }
  return <>{out}</>;
}
