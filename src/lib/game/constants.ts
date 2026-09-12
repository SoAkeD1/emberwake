import type { Attribute, Difficulty } from "./types";

/** Base runes awarded per difficulty, before the bonfire multiplier and bonus roll. */
export const BASE_RUNES: Record<Difficulty, number> = {
  Trivial: 10,
  Standard: 25,
  Hard: 50,
  Legendary: 100,
};

export const ATTRIBUTES: Record<Attribute, { icon: string; color: string; domain: string }> = {
  Vigor: { icon: "i-vigor", color: "#9e2a2b", domain: "sleep · food · water" },
  Mind: { icon: "i-mind", color: "#3a6ea5", domain: "study · reading · craft of thought" },
  Endurance: { icon: "i-endurance", color: "#5b8a3c", domain: "cardio · routine · persistence" },
  Strength: { icon: "i-strength", color: "#d9772b", domain: "iron · lifting · labour" },
  Dexterity: { icon: "i-dexterity", color: "#c9aa71", domain: "art · music · handwork" },
};

export const RARITY_COLOR: Record<string, string> = {
  Common: "#7d7368",
  Rare: "#3a6ea5",
  Epic: "#8a5fb0",
  Legendary: "#c9aa71",
};

/** Runes needed to go from level n to n+1. Non-linear: each level costs more than the last. */
export function levelCost(n: number): number {
  return Math.floor(100 * Math.pow(n, 1.5));
}

/** Derives the current level (and progress toward the next one) from lifetime runes. */
export function levelFor(lifetime: number): { level: number; floor: number; need: number } {
  let level = 1;
  let spent = 0;
  while (spent + levelCost(level) <= lifetime) {
    spent += levelCost(level);
    level++;
  }
  return { level, floor: spent, need: levelCost(level) };
}

/** The title a streak earns, shown on the class card and HUD. */
export function titleFor(streak: number): string {
  if (streak >= 100) return "Sovereign of the Unbroken Dawn";
  if (streak >= 30) return "Knight of the Long Vigil";
  if (streak >= 14) return "Warden of the Flame";
  if (streak >= 7) return "Oathkeeper";
  if (streak >= 3) return "Ember-Bearer";
  return "Nameless Wanderer";
}

/** Splits a bar into ~10-unit segments, each partially filled by `now`. */
export function segments(now: number, max: number): number[] {
  const count = Math.max(1, Math.ceil(max / 10));
  const per = max / count;
  const out: number[] = [];
  for (let i = 0; i < count; i++) {
    out.push(Math.min(1, Math.max(0, (now - i * per) / per)));
  }
  return out;
}
