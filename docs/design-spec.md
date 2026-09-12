# Emberwake — Design & Systems Spec

Dark-fantasy Soulslike habit tracker. Every completed habit should feel like a small victory against a hostile world, not a checkbox.

This is the working spec drafted before the visual design handoff existed (see [`design-handoff/README.md`](./design-handoff/README.md) for the final, high-fidelity tokens/copy — that document wins wherever the two disagree). Kept here for the game-systems detail (leveling math, streak/flask rules, anti-cheat, data model) that the visual handoff doesn't cover.

## IP rules (non-negotiable)

Evoke the mood of modern dark-fantasy action RPGs (misty ruins, golden fog, engraved gold UI). Use zero copyrighted or trademarked material: no game names, logos, characters, bosses, locations, sounds, or ripped assets. Banned terms: Estus, Tarnished, Ashen One, Unkindled, Maidenless, Erdtree, Site of Grace, "YOU DIED", Elden, Lands Between. All art, icons, and copy must be original, generated with commercial rights, or properly licensed; credit any CC-BY assets in the README.

## Glossary (use consistently in all UI copy)

| In-world term | Real-world meaning |
| --- | --- |
| Quests / Quest Log | Tasks |
| Oaths (Virtues / Vices) | Habits, +/- direction |
| Vigils | Dailies (scheduled) |
| Bounties | To-dos (one-off, checklist + due date) |
| Runes | Currency / XP |
| Bonfires Lit | Streak |
| Ember Flasks | Streak protection (max 3) |
| Ascension | Level up |
| Fallen | Health reaches 0 |
| The Wandering Merchant | Shop |
| The Armory | Inventory / equipment |
| Hall of Relics | Achievements / badges |
| Indulgences | Custom real-world rewards |
| Character Sheet | Profile |
| Ravens | Notifications |
| Sanctuary | Settings |
| Rest at the Sanctuary | Vacation mode / pause damage |
| First Steps | Onboarding checklist |
| Begin the Journey / Awaken | Sign up / Log in |
| Abandon Quest | Delete quest |

## Game systems (all math runs server-side)

### Runes & leveling (non-linear)

- One currency: Runes. Track `runesHeld` (spendable) and `lifetimeRunes` (never decreases).
- Level derives from `lifetimeRunes`, so spending at the Merchant never lowers your level.
- Runes needed from level *n* to *n+1* = `floor(100 * n^1.5)` — L1→2: 100, L2→3: 282, L5→6: 1,118, L10→11: 3,162.
- Runes per completion = difficulty base × bonfire multiplier × bonus roll:
  - Difficulty base: Trivial 10, Standard 25, Hard 50, Legendary 100
  - Bonfire multiplier: `1 + 0.02 * min(currentStreak, 30)` (max ×1.6)
  - Bonus roll: +0–15%, rolled server-side (never below base)
- Ascension grants +1 stat point, restores Health to full, and refills 1 Ember Flask.

### Attributes (one per quest category)

Vigor (sleep/nutrition/hydration) · Mind (study/reading/coding) · Endurance (cardio/consistency) · Strength (gym/lifting) · Dexterity (crafts/art/music). Each is also non-linear: `floor(50 * n^1.4)`. Displayed total = Trained + Allocated + Equipment + Blessings.

### HUD bars

- **Health** (red): starts 50, +1 per completion, full restore on Ascension; missed Vigils and Vices deal damage; 0 = Fallen.
- **Focus/FP** (blue): +2 per completion, max 30; spent on temporary Blessings (e.g. +25% runes for 1 hour).
- **Stamina** (green): today's % of due Vigils completed; resets at day start.

### Bonfires & Ember Flasks

- Consecutive days with ≥1 completion, computed in the user's timezone + custom day-start hour.
- Max 3 flasks. A missed day drains 1 flask to protect the streak; at 0 flasks the bonfire goes out (streak resets, Health damage).
- Earned at every 7-day milestone, on Ascension, or purchasable (capped at max).
- Titles by streak length: 0 Nameless Wanderer · 3 Ember-Bearer · 7 Oathkeeper · 14 Warden of the Flame · 30 Knight of the Long Vigil · 100 Sovereign of the Unbroken Dawn.

### Fallen

At 0 Health: lose 50% of `runesHeld` into a reclaimable "Rune Cache" (never lose level/items/lifetime runes). Completing any quest within 24h reclaims it. Health resets to full.

### Day rollover

Processed lazily on the user's next authenticated request: walk every day boundary since `lastRolloverAt` (timezone-aware) inside one DB transaction. Idempotent, no cron required.

### Anti-cheat

Client sends only intent (`POST /quests/:id/complete` + idempotency key). Server validates ownership + schedule and computes all rewards. Undo allowed same-day, reversing the exact recorded amounts. Zod validation on every input, rate limiting on mutations, ownership checks on every query.

## Tech stack

Next.js (App Router, TypeScript) + Tailwind CSS + Framer Motion · PostgreSQL + Prisma · Auth.js (credentials + Google) · Zod · deployed on Vercel.

## Data model

See [`prisma/schema.prisma`](../prisma/schema.prisma) for the authoritative, implemented schema (`User`, `Character`, `AttributeStat`, `Quest`, `QuestCompletion`, `DayLog`, `Item`/`InventoryItem`, `Relic`/`UserRelic`, `Indulgence`, `Raven`).

## Screens

Routes: `/` (The Gate) · `/onboarding` (First Steps) · `/camp` (dashboard) · `/chronicle` · `/merchant` · `/relics` (Hall of Relics) · `/moments`. Full per-screen layout, copy, and motion spec: [`design-handoff/README.md`](./design-handoff/README.md).

## Accessibility & responsiveness

Keyboard-operable everywhere (Tab/Enter/Space/Esc), visible focus rings, `role="progressbar"` on bars with `aria-valuenow/min/max`, `aria-live="polite"` reward announcements, WCAG AA contrast minimum, responsive 360px→1920px, `prefers-reduced-motion` collapses all animation.

## Hackathon deliverables checklist

- [ ] Public GitHub repo, clean commit history, README, `.env.example`
- [ ] Live deployed URL (production DB connected)
- [ ] 90–180s demo video (signup → quest → level up → purchase/equip → relic unlock → refresh persists)
- [ ] No localStorage-only data, no console errors, no runtime crashes
