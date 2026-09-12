import type { Attribute, Quest, RelicDef, Ware } from "./types";

/**
 * Fixture data standing in for the database until auth + the quest API
 * exist. Every value here is taken from the design handoff's own sample
 * state, not invented — see docs/design-handoff/Emberwake.dc.html.
 */

export const SAMPLE_QUESTS: Quest[] = [
  { id: "q1", type: "vigil", title: "Kindle the Morning", notes: "Boots by the door the night before.", attr: "Vigor", diff: "Standard", streak: 12, meta: "Due today", done: false },
  { id: "q2", type: "vigil", title: "Hour of the Scholar", notes: "One chapter, no screens in the room.", attr: "Mind", diff: "Hard", streak: 5, meta: "Due today", done: false },
  { id: "q3", type: "vigil", title: "The Iron Vigil", notes: "Squats, presses, the long carry.", attr: "Strength", diff: "Legendary", streak: 2, meta: "Due today", done: false },
  { id: "q4", type: "vigil", title: "Walk the Long Road", notes: "Five thousand paces before dusk.", attr: "Endurance", diff: "Standard", streak: 31, meta: "Conquered", done: true },
  { id: "q5", type: "oath", title: "Drink of the Well", notes: "A cup at every waking hour.", attr: "Vigor", diff: "Trivial", streak: 18, meta: "Strong", done: false, strength: "strong" },
  { id: "q6", type: "oath", title: "Practise the Strings", notes: "Twenty minutes, scales first.", attr: "Dexterity", diff: "Standard", streak: 4, meta: "Holding", done: false, strength: "mid" },
  { id: "q7", type: "oath", title: "Sup on Ash", notes: "Late sugar, and the sleep it steals.", attr: "Vigor", diff: "Standard", streak: 0, meta: "Neglected · Vice", done: false, strength: "weak", vice: true },
  { id: "q8", type: "bounty", title: "Mend the Broken Blade", notes: "Regrind the edge, oil the tang.", attr: "Dexterity", diff: "Hard", streak: 0, meta: "Checklist 2/4 · due in 2 days", done: false },
  { id: "q9", type: "bounty", title: "Letters to the Keep", notes: "Three replies owed since the thaw.", attr: "Mind", diff: "Standard", streak: 0, meta: "Due tomorrow", done: false },
];

export const WARES: Ware[] = [
  { name: "Iron Warblade", rarity: "Common", slot: "Main Hand", bonus: "+2 Strength", price: 180, icon: "i-sword", req: 1 },
  { name: "Bulwark of the Pale Gate", rarity: "Rare", slot: "Off Hand", bonus: "+3 Endurance · +1 Vigor", price: 540, icon: "i-shield", req: 4 },
  { name: "Circlet of Nine Thoughts", rarity: "Epic", slot: "Head", bonus: "+5 Mind", price: 900, icon: "i-ring", req: 6 },
  { name: "Sovereign's Edge", rarity: "Legendary", slot: "Main Hand", bonus: "+8 Strength · +2 Dexterity", price: 2400, icon: "i-sword", req: 10 },
  { name: "Ember Flask", rarity: "Common", slot: "Consumable", bonus: "Refills one flask", price: 200, icon: "i-flask", req: 1 },
  { name: "Blessing of Plenty", rarity: "Rare", slot: "Consumable", bonus: "+25% runes for one hour", price: 300, icon: "i-scroll", req: 3 },
];

export const FEATURED_WARE_NAMES = ["Circlet of Nine Thoughts", "Ember Flask", "Bulwark of the Pale Gate"];

export const INDULGENCES: { title: string; price: number }[] = [
  { title: "One episode, no more", price: 150 },
  { title: "A long bath, door shut", price: 260 },
  { title: "The good coffee", price: 90 },
  { title: "A day with no quests", price: 1500 },
];

export const RELIC_DEFS: RelicDef[] = [
  { group: "First Steps", name: "First Light", criteria: "Complete the First Steps checklist.", icon: "i-sigil", unlockedOn: "12 Mar", progress: 100 },
  { group: "First Steps", name: "First Blood", criteria: "Complete your first quest.", icon: "i-skull", unlockedOn: "12 Mar", progress: 100 },
  { group: "First Steps", name: "Merchant's Favour", criteria: "Buy your first ware.", icon: "i-ring", unlockedOn: "14 Mar", progress: 100 },
  { group: "First Steps", name: "Oathsworn", criteria: "Keep 10 Oaths at once.", icon: "i-seal", progress: 70 },
  { group: "Bonfires", name: "Seven Flames", criteria: "Keep the bonfire lit 7 days.", icon: "i-chalice", unlockedOn: "19 Mar", progress: 100 },
  { group: "Bonfires", name: "Unbroken", criteria: "Keep the bonfire lit 30 days.", icon: "i-flame", progress: 40 },
  { group: "Bonfires", name: "Rise Again", criteria: "Reclaim a Rune Cache after falling.", icon: "i-flask", progress: 0 },
  { group: "Mastery", name: "Master of Mind", criteria: "Raise Mind to level 10.", icon: "i-mind", progress: 90 },
  { group: "Mastery", name: "Centurion", criteria: "Complete 100 quests.", icon: "i-sword", unlockedOn: "2 Apr", progress: 100 },
  { group: "Mastery", name: "Ironbound", criteria: "Raise Strength to level 10.", icon: "i-strength", progress: 60 },
  { group: "Treasures", name: "Hoarder", criteria: "Hold 5,000 runes at once.", icon: "i-scroll", progress: 26 },
  { group: "Treasures", name: "Fully Arrayed", criteria: "Equip every armour slot.", icon: "i-shield", unlockedOn: "8 Apr", progress: 100 },
  { group: "Secrets", name: "???", criteria: "Its criteria are not yet known to you.", icon: "i-seal", progress: 0 },
  { group: "Secrets", name: "???", criteria: "Its criteria are not yet known to you.", icon: "i-seal", progress: 0 },
];

export const RELIC_GROUPS = ["First Steps", "Bonfires", "Mastery", "Treasures", "Secrets"] as const;

export const SHELF_RELICS = [
  { name: "Seven Flames", icon: "i-chalice", unlocked: true },
  { name: "Centurion", icon: "i-sword", unlocked: true },
  { name: "Fully Arrayed", icon: "i-shield", unlocked: true },
  { name: "Unbroken", icon: "i-flame", unlocked: false },
  { name: "Master of Mind", icon: "i-mind", unlocked: false },
  { name: "Oathsworn", icon: "i-seal", unlocked: false },
];

export const CLASS_DEFS: { name: string; attr: Attribute; item: string }[] = [
  { name: "Knight", attr: "Strength", item: "A notched longsword, kept sharp by habit alone." },
  { name: "Scholar", attr: "Mind", item: "A candle that has outlasted three owners." },
  { name: "Ranger", attr: "Dexterity", item: "A yew shortbow, restrung with gut and patience." },
  { name: "Pilgrim", attr: "Vigor", item: "A walking staff worn smooth at the grip." },
  { name: "Sentinel", attr: "Endurance", item: "A tower shield, dented on the inside." },
];

export const STARTER_QUESTS: { title: string; kind: "Vigil" | "Oath"; diff: "Trivial" | "Standard" | "Hard" | "Legendary"; attr: string }[] = [
  { title: "Kindle the Morning", kind: "Vigil", diff: "Standard", attr: "Vigor" },
  { title: "Hour of the Scholar", kind: "Vigil", diff: "Hard", attr: "Mind" },
  { title: "Drink of the Well", kind: "Oath", diff: "Trivial", attr: "Vigor" },
  { title: "Walk the Long Road", kind: "Vigil", diff: "Standard", attr: "Endurance" },
  { title: "The Iron Vigil", kind: "Vigil", diff: "Legendary", attr: "Strength" },
  { title: "Practise the Strings", kind: "Oath", diff: "Standard", attr: "Dexterity" },
];

export const FIRST_STEPS_CHECKLIST: { label: string; done: boolean }[] = [
  { label: "Forge your first quest", done: true },
  { label: "Complete a quest", done: true },
  { label: "Allocate a stat point", done: true },
  { label: "Buy from the Merchant", done: false },
  { label: "Equip an item", done: false },
];

export const CHRONICLE_STATS = [
  { value: "31", label: "Longest bonfire" },
  { value: "148", label: "Quests conquered" },
  { value: "4,200", label: "Lifetime runes" },
  { value: "62", label: "Days awake" },
];

export const HEAT_COLORS = ["#1a1714", "#3f2c18", "#7a4a1c", "#b8691f", "#e89a3c"];

/** 26 weeks x 7 days of bonfire intensity — deterministic, matches the handoff's demo curve. */
export function buildHeatmap(): number[][] {
  const heat: number[][] = [];
  for (let w = 0; w < 26; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const t = w * 7 + d;
      const v = Math.sin(t * 1.7) * 0.5 + Math.cos(t * 0.43) * 0.5 + (w / 26) * 0.35;
      let k = v > 0.72 ? 4 : v > 0.34 ? 3 : v > -0.02 ? 2 : v > -0.46 ? 1 : 0;
      if (t > 178) k = 0;
      week.push(k);
    }
    heat.push(week);
  }
  return heat;
}

export const RUNE_WEEKS = [210, 340, 180, 425, 560, 300, 480, 640, 515, 700, 390, 610];

export const CHRONICLE_LOG: { title: string; attr: string; when: string; amount: string; good: boolean }[] = [
  { title: "Walk the Long Road", attr: "Endurance", when: "today", amount: "+38", good: true },
  { title: "Drink of the Well", attr: "Vigor", when: "today", amount: "+13", good: true },
  { title: "Sup on Ash", attr: "Vigor", when: "today", amount: "−6 health", good: false },
  { title: "Hour of the Scholar", attr: "Mind", when: "yesterday", amount: "+57", good: true },
  { title: "Kindle the Morning", attr: "Vigor", when: "yesterday", amount: "+31", good: true },
  { title: "The Iron Vigil", attr: "Strength", when: "yesterday", amount: "+112", good: true },
  { title: "Mend the Broken Blade", attr: "Dexterity", when: "2 days ago", amount: "+55", good: true },
  { title: "Practise the Strings", attr: "Dexterity", when: "2 days ago", amount: "+27", good: true },
];

export const RAVENS: { text: string; when: string; icon: string; color: string }[] = [
  { text: "The bonfire has burned twelve days. An Ember Flask was granted.", when: "this morning", icon: "i-flame", color: "#d9772b" },
  { text: "Relic claimed — “Fully Arrayed”.", when: "yesterday", icon: "i-seal", color: "#c9aa71" },
  { text: "First Steps: two tasks remain.", when: "3 days ago", icon: "i-scroll", color: "#a39787" },
];
