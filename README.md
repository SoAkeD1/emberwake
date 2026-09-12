# Emberwake

A habit tracker themed as a grim, dark-fantasy Soulslike RPG. Habits become quests; completing one earns Runes and raises attributes; streaks are Bonfires; missed days drain Ember Flasks.

Built for the Life RPG project brief — see [`docs/`](./docs) for the full design spec and glossary.

## Status

Early scaffold. The Gate (landing hero) is implemented as static markup; auth, the quest engine, and the remaining screens (First Steps, The Camp, Chronicle, Merchant, Hall of Relics, Moments) are not built yet.

## Tech stack

- **Frontend:** Next.js 16 (App Router, TypeScript), Tailwind CSS, Framer Motion
- **Backend:** Next.js Route Handlers
- **Database:** PostgreSQL via Prisma ORM ([`prisma/schema.prisma`](./prisma/schema.prisma))
- **Auth:** Auth.js (credentials + Google) — not wired up yet
- **Validation:** Zod

## Getting started

```bash
npm install
cp .env.example .env   # then fill in DATABASE_URL, AUTH_SECRET, Google OAuth keys
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

See [`.env.example`](./.env.example) for the full list:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | Auth.js session signing secret |
| `NEXTAUTH_URL` | Base URL of the deployed app |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth sign-in |

## Database

The schema in [`prisma/schema.prisma`](./prisma/schema.prisma) models: `User`, `Character` (level, runes, health/focus, streak, ember flasks), `AttributeStat` (Vigor/Mind/Endurance/Strength/Dexterity), `Quest` (Vigils/Oaths/Bounties), `QuestCompletion` (permanent history log used for undo and anti-cheat), `DayLog`, `Item`/`InventoryItem` (the Merchant + Armory), `Relic`/`UserRelic` (Hall of Relics), `Indulgence`, and `Raven` (notifications).

All game math (runes, leveling, streaks, damage) runs server-side — the client only ever sends intent.

## Assets

Design reference and imagery came from a Claude Design handoff (`docs/design-handoff/`) — see that folder's README for full design tokens, copy, and motion specs.
