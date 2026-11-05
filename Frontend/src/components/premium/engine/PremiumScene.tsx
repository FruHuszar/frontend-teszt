// Persona Studio export · premium engine · re-export overwrites this file (delete this line to keep your edits)
import { useEffect, useMemo, useRef } from "react";
import { PremiumRuntime, resolveEquipped } from "./runtime";
import type { Equipped, PremiumTheme } from "./types";

type Props = {
  theme: PremiumTheme;
  /** slot -> item key or cosmetics.file_path (null = empty); missing slots use the theme's starting setup */
  equipped?: Equipped;
  /** backend storage URL (default VITE_STORAGE_URL or "/storage") */
  storageUrl?: string;
  /** pointer look-at and click reactions (default true) */
  interactive?: boolean;
  className?: string;
  onError?: (what: string, error: unknown) => void;
};

/** The theme's three.js scene: full size of its parent (absolute inset-0), transparent over the backdrop. */
export function PremiumScene({ theme, equipped, storageUrl, interactive = true, className = "", onError }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const runtime = useRef<PremiumRuntime | null>(null);
  const errors = useRef(onError);
  errors.current = onError;
  const wanted = useMemo(() => JSON.stringify(resolveEquipped(theme, equipped)), [theme, equipped]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const rt = new PremiumRuntime(el, theme, {
      storageUrl,
      interactive,
      onError: (what, e) => (errors.current ? errors.current(what, e) : console.error(`[premium] ${what}:`, e)),
    });
    runtime.current = rt;
    return () => {
      rt.dispose();
      if (runtime.current === rt) runtime.current = null;
    };
  }, [theme, storageUrl, interactive]);

  useEffect(() => {
    runtime.current?.setEquipped(JSON.parse(wanted) as Record<string, string | null>);
  }, [wanted, theme, storageUrl, interactive]);

  return <div ref={host} className={`absolute inset-0 ${className}`} />;
}
