// Persona Studio export · premium engine · re-export overwrites this file (delete this line to keep your edits)
//
// App -> premium scene events. Call them from the contexts, e.g.
//   QuestContext:  emitPremiumEvent("quest_completed")
//   UserContext:   emitPremiumEvent("level_up")
//   ShopContext / PresetContext:  emitPremiumEvent("item_equipped", { slot: "hat" })  (equip changes already do it)
// "bored" is raised by the scene itself after a while without input.
import type { PremiumEventName } from "./types";

export type PremiumEventDetail = { slot?: string; item?: string };

export const premiumEvents = new EventTarget();

export function emitPremiumEvent(name: PremiumEventName, detail: PremiumEventDetail = {}) {
  premiumEvents.dispatchEvent(new CustomEvent<PremiumEventDetail>(name, { detail }));
}

/** Listen to a premium event; returns the unsubscribe function. */
export function onPremiumEvent(name: PremiumEventName, fn: (detail: PremiumEventDetail) => void) {
  const handler = (e: Event) => fn((e as CustomEvent<PremiumEventDetail>).detail ?? {});
  premiumEvents.addEventListener(name, handler);
  return () => premiumEvents.removeEventListener(name, handler);
}
