// Persona Studio export · premium engine · re-export overwrites this file (delete this line to keep your edits)
//
// Theme chooser preview: the slots of a theme with their items (thumbnails from the backend storage).
import type { ReactNode } from "react";
import { defaultStorageUrl, resolveEquipped, storageFileUrl } from "./runtime";
import type { Equipped, PremiumTheme } from "./types";

type Props = {
  theme: PremiumTheme;
  equipped?: Equipped;
  onChange: (slot: string, key: string | null) => void;
  /** items the user owns (free items count as owned); others show their price */
  owned?: (slot: string, key: string) => boolean;
  storageUrl?: string;
  className?: string;
};

export function ItemToggles({ theme, equipped, onChange, owned, storageUrl, className = "" }: Props) {
  const now = resolveEquipped(theme, equipped);
  const base = storageUrl ?? defaultStorageUrl();
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {theme.slots.map((slot) => (
        <fieldset key={slot.key} className="flex flex-col gap-1.5">
          <legend className="mb-1 text-sm font-semibold opacity-80">{slot.label}</legend>
          <div className="flex flex-wrap gap-2">
            {!slot.required && (
              <button
                type="button"
                aria-pressed={now[slot.key] === null}
                onClick={() => onChange(slot.key, null)}
                className={`grid size-16 place-items-center rounded-xl border text-xs transition ${
                  now[slot.key] === null ? "border-current" : "border-current/20 opacity-70 hover:opacity-100"
                }`}
              >
                None
              </button>
            )}
            {slot.items.map((it) => {
              const on = now[slot.key] === it.key;
              const mine = it.price === 0 || (owned ? owned(slot.key, it.key) : false);
              return (
                <button
                  key={it.key}
                  type="button"
                  aria-pressed={on}
                  title={it.label}
                  onClick={() => onChange(slot.key, on && !slot.required ? null : it.key)}
                  className={`relative size-16 overflow-hidden rounded-xl border transition ${
                    on ? "border-current ring-2 ring-current/40" : "border-current/20 opacity-80 hover:opacity-100"
                  }`}
                >
                  <img src={storageFileUrl(base, it.thumbnail)} alt={it.label} className="size-full object-cover" />
                  {!mine && (
                    <span className="absolute bottom-0.5 right-0.5 rounded-full bg-black/60 px-1.5 text-[10px] text-white">
                      {it.price}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

/** Docks its content to the right side (bottom on mobile) so the live scene stays visible while previewing. */
export function ItemPreviewPanel({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-50 max-h-[45dvh] overflow-auto rounded-t-2xl bg-[color:var(--color-theme-surface,#1d1d24)]/95 p-4 text-[color:var(--color-theme-text-light,#fff)] shadow-2xl backdrop-blur md:inset-y-4 md:left-auto md:right-4 md:max-h-none md:w-[360px] md:rounded-2xl"
      aria-label={title ?? "Preview"}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold">{title ?? "Preview"}</h2>
        <button type="button" onClick={onClose} className="rounded-full px-3 py-1 text-sm hover:bg-white/10">
          Back
        </button>
      </div>
      {children}
    </aside>
  );
}
