# Handoff: Emberwake — dark-fantasy habit tracker (marketing site + app UI)

## Overview
Emberwake is a habit tracker themed as a grim dark-fantasy RPG. Habits become quests, completions pay Runes and raise attributes, streaks are Bonfires, missed days drain Ember Flasks, Runes are spent at a Merchant, and badges are Relics.

This bundle contains a complete, working HTML prototype of:
- a **landing page** ("The Gate") — full-bleed hero + a seven-block About section, and
- six **in-app screens** — First Steps onboarding, The Camp (dashboard/quest log), Chronicle, Merchant, Hall of Relics, Moments — plus two modals (Forge Quest, Ascension) and a Ravens (notifications) popover.

The goal of the handoff is to rebuild all of this as a real, production website.

## About the design files
The files here are **design references created in HTML** — a prototype that demonstrates intended look, motion, and behavior. They are **not production code to copy**. The prototype is authored in a bespoke streaming-template runtime (`support.js`, `<x-dc>`, `<sc-for>`, `<sc-if>`, `{{ }}` holes, `class Component extends DCLogic`). Do **not** port that runtime.

Recreate the designs in the target codebase's existing environment and patterns (React/Next, Vue/Nuxt, Svelte, Astro, etc.). If no codebase exists yet, pick the framework that suits the project — a React/Next.js app with CSS Modules, Tailwind, or vanilla-extract is a natural fit — and implement there. The prototype uses inline styles only because the authoring runtime requires it; in production use the codebase's normal styling layer with the tokens listed below.

Open `Emberwake.dc.html` directly in a browser (keep `support.js` and `uploads/` next to it) to see everything running.

## Fidelity
**High fidelity.** Colors, type, spacing, copy, motion timings, and interaction states are final and should be matched closely. Every value in this README is taken from the prototype. Copy is final — use it verbatim.

---

## Design tokens

### Color
| Token | Hex | Use |
| --- | --- | --- |
| background | `#151210` | page background |
| background deep | `#0e0c0a` | scrim darkest stop, text shadow |
| surface | `#1e1a16` | panels, cards |
| raised | `#29231c` | inset wells, secondary buttons |
| surface dim | `#191817` | "Old Way" desaturated panel |
| well | `#100e0c` | empty progress track |
| border | `#2c251d` | hairline borders, dividers |
| border mid | `#4a3d2c` | inputs, tooltips, dim rules |
| gold dim | `#6b5836` | ornament borders, muted labels |
| gold | `#c9aa71` | primary accent, headings |
| gold bright | `#e8d3a0` | emphasis, buttons, active text |
| gold pale | `#f6ecd2` | slash/spark highlight |
| parchment | `#e6dcc8` | body text on dark |
| text secondary | `#a39787` | body copy, captions |
| ember orange | `#d9772b` | eyebrows, flame, alerts |
| health red | `#9e2a2b` | health bar, danger |
| health red light | `#b53637` | health bar gradient top |
| stamina green | `#5b8a3c` | stat/stamina fills |
| focus blue | `#3a6ea5` | focus-mode accent (app screens) |

Panel recipe (ornate): `background:#1e1a16; border:1px solid #6b5836; box-shadow: inset 0 0 0 3px #151210, inset 0 0 0 4px #6b5836;`
Panel recipe (plain): `background:#1e1a16; border:1px solid #2c251d; border-top:1px solid #6b5836;`

### Typography
- **Display / headings:** Cinzel (600, 700), uppercase, letter-spacing `.08em`–`.30em`.
- **Body / lore:** EB Garamond, 15–22px, line-height 1.5–1.62, italic for lore lines.
- **UI labels & numbers:** Alegreya Sans (Inter is an acceptable substitute), 9.5–13px, letter-spacing `.12em`–`.34em`, uppercase, `font-variant-numeric: tabular-nums` on all counters.
- Scale in use: h1 `clamp(46px,6.6vw,86px)` (hero) / 30px (app screens) · h2 `clamp(26px,3.4vw,40px)` (About intro), 26px, 20px, 18px, 15px · h3 15–17px · body 15–19px · eyebrow 10.5–11px.
- Never below 15px for body, never below 9.5px for uppercase micro-labels.

### Geometry & effects
- Border radius: `1px` (buttons/inputs) or `2px` (panels). Nothing is pill-shaped.
- Rules: 1px hairlines, often `linear-gradient(to right,transparent,#6b5836)` with a centered 10–12px diamond sigil.
- Corner filigree: 34px SVG (`#i-fil`) at `left:9px;top:9px`, `color:#6b5836`, on ornate panels. Toggleable.
- Film grain: fixed full-page SVG noise overlay at `opacity:.038`, `z-index:900`, `pointer-events:none`.
- Shadows: `0 22px 60px rgba(0,0,0,.6)` (raised panels), `0 12px 28px rgba(0,0,0,.6)` (tooltips), `0 30px 80px rgba(0,0,0,.75)` (modals).
- Focus ring: `outline:2px solid #e8d3a0; outline-offset:2–3px` everywhere.
- Touch targets: `min-height:44px` minimum; primary buttons 48px.

### Spacing
Section padding `84–104px` top on marketing blocks, `44px` on app screens; card padding `26px 24px`; grid gaps `18–26px`; content max-widths: 1340px (app + hero), 1240px (Relics), 1160px (Spoils/Stakes), 1100px (compare), 920/900px (intro, CTA).

### Icons
Single-color 1.5px-stroke line icons on a 24px grid, drawn as SVG `<symbol>`s in a hidden sprite and referenced with `<use href="#id">`. IDs: `i-vigor, i-mind, i-endurance, i-strength, i-dexterity, i-flask, i-sword, i-shield, i-ring, i-scroll, i-skull, i-chalice, i-seal, i-sigil, i-bell, i-flame, i-search, i-kebab, i-fil`. Lift the sprite verbatim from the prototype (top of the file) — it is original artwork.

---

## Screens / views

The prototype is a single-page switcher with a top bar: wordmark + nav (`The Gate, First Steps, The Camp, Chronicle, Merchant, Relics, Moments`) and a HUD-layout segmented control. In production, these become routes: `/` (Gate), `/onboarding`, `/camp`, `/chronicle`, `/merchant`, `/relics`, `/moments`.

### 1. The Gate — landing page (`isGate`)
**Purpose:** convert a visitor in under 30 seconds of scrolling.

**1a. Hero.** `min-height:620px`, flex-centered. Background photo `uploads/pasted-1789212993490-0.png` (`object-fit:cover; object-position:62% 42%; filter:saturate(.86) contrast(1.04)`), with four stacked overlays: an ember radial at 62%/42%, two slow drifting fog layers (`em-fog1` 34s, `em-fog2` 47s, both `ease-in-out infinite alternate`), a horizontal darkening gradient, and a vertical gradient that lands on `#151210` by 87% so the hero dissolves into the page.
Content row (`max-width:1340px; padding:90px 46px; gap:60px; flex-wrap`):
- Left `flex:1 1 420px`: eyebrow "A habit tracker for the unyielding" (11px/.34em/`#d9772b`); h1 "Emberwake" (Cinzel 700, `clamp(46px,6.6vw,86px)`, `#e8d3a0`, `text-shadow:0 2px 0 #0e0c0a, 0 0 42px rgba(201,170,113,.24)`); sigil divider; lore "Every habit is a battle. Every day, a bonfire." (22px italic `#e6dcc8`); buttons **Begin the Journey** (gold gradient `linear-gradient(#e8d3a0,#c9aa71)`, `#151210` text, hover lifts 2px) and **Awaken** (ghost, `1px solid #6b5836`).
- Right `flex:0 1 372px`: sign-up panel (ornate recipe + filigree) — h2 "Swear the First Oath", sub "No soul is turned from the gate.", labelled email field ("Name of record", placeholder `wanderer@keep.realm`), password field ("Ward"), full-width **Begin the Journey**, `OR` rule, **Continue with Google**, footer "Already awake? Awaken".

**1b–1h. About section** — everything below the hero sits on a second photo (`uploads/pasted-1789213345824-0.png`, `filter:saturate(.5) brightness(.48) contrast(1.06)`) under a full vertical scrim.

| # | Block | Content |
| --- | --- | --- |
| 1 | Intro | Eyebrow "The Chronicle Begins"; h2 "Your Life Is the Hardest Game You'll Ever Play"; drawn sigil divider; lore paragraph ("Real progress is slow. A book, a workout, a lesson — the reward arrives months later, if at all. Emberwake gives you the victory now. Every habit becomes a quest, every day a battle, every streak a bonfire against the dark."). Five ember particles drift up behind it (2–3px dots, `em-ember` 8–12s infinite, staggered delays). |
| 2 | The Problem, and the Quest | Two panels, `repeat(auto-fit,minmax(280px,1fr))`. **Left "The Old Way"** — desaturated `#191817`/`#282725`, three grey checkbox rows at opacity 1/.5/.28 ("Go to the gym", "Read 20 pages", "Sleep by eleven"), caption "A checkbox. Nothing happens." **Right "The Emberwake Way"** — ornate quest card: Strength medallion, title "The Iron Vigil", note "Go to the gym. Squats, presses, the long carry.", 4 diamond difficulty pips (3 filled), "Hard · Strength", "+25 Runes", a 4-segment Strength bar (2 filled), a live rune counter in the header, and a **Complete Quest** button. Caption below the pair: "Same habit. Entirely different feeling." |
| 3 | How the Journey Works | Gold path rule draws left→right above three panels (`repeat(auto-fit,minmax(258px,1fr))`), numbered I/II/III, each with a 92px animated vignette — I: parchment unrolls, two gold "written" lines draw; II: a 24r ring fills (`stroke-dashoffset 151→46`) then **LV 2** stamps in; III: a flame scales up with an orange drop-shadow while a flask drains and refills. Copy per the brief (Swear Your Oaths / Conquer the Day / Keep the Bonfire Lit). |
| 4 | Paths of Mastery | Five medallion buttons (`minmax(196px,1fr)`): Vigor, Mind, Endurance, Strength, Dexterity — 62px round medallion, name, domain line ("sleep · nutrition · hydration" etc.), and a 4px stat bar. Hover/focus: card lifts 3px and rotates `-1.2deg`, rim gains `0 0 22px rgba(201,170,113,.34)`, bar fills to its sample value (72/64/58/46/35%) over 550ms, and a tooltip of example quests appears above. Caption: "Your real habits shape your character. Train the body, sharpen the mind." |
| 5 | Spoils of the Journey | 2×2 grid (`minmax(304px,1fr)`), each card an 76×84 vignette + copy: **Runes & Ascension** (runes trickle into a `1,240` counter chip), **The Wandering Merchant** (item tile flips 180° to a gold-bordered face), **The Hall of Relics** (stone medallion flips to gold with a shimmer sweep), **Bonfires & Flasks** (layered flickering bonfire with rising embers). |
| 6 | The World Pushes Back | Slim banner `#191411` / `1px solid #3a2320` with a red radial vignette. Copy: "Neglect your Vigils and your health falls. Fall completely and half your held Runes are lost — until you rise and reclaim them." A 12px health bar shudders, drops to 54%, then settles at 82%; "Rise Again" with a flame icon fades in at 1.9s. |
| 7 | Your Bonfire Awaits | 170px animated bonfire (three layered flame shapes with `border-radius:50% 50% 42% 42% / 68% 68% 32% 32%`, `em-flick` at 2.1s/1.3s/0.9s, log bars, four ember particles) over a radial glow that goes from `opacity:.5` to `1` when the CTA is hovered/focused. h2 "Every Legend Starts With a Single Oath", sub "Your bonfire awaits.", primary **Begin the Journey** + text link **Awaken (Log In)**. |

Footer: "EMBERWAKE · ALL ART ORIGINAL · ICONS UNDER CC-BY WHERE CREDITED".

### 2. First Steps (`isFirstSteps`)
Onboarding, "First Steps · I of III" → h1 "Choose Your Path" → lore → class/path cards, then a starting-checklist panel whose reward line reads "100 runes and the relic *First Light*".

### 3. The Camp (`isCamp`) — main dashboard
Three HUD layouts selectable from the top bar: **top bar** (default), **left rail** (248px sticky `top:78px`), **floating** (fixed bottom center pill). HUD shows portrait, name/title, level, XP bar, Runes, Bonfires, Ember Flasks, stamina, and a Ravens bell (`aria-label="Ravens, 3 unread"`) opening a notification popover.
Body grid `minmax(0,1.68fr) / minmax(0,1fr)`:
- **Quest Log** (ornate panel): h1 "Quest Log" + **Forge Quest** button; tablist Vigils / Oaths / Bounties; search field + sub-filters; quest rows with type icon, title, note, attribute, difficulty, streak, meta, complete control, and a kebab actions button.
- **Aside:** "Paths of Mastery" attribute bars + unspent points allocator; "Indulgences" (spend Runes on self-set rewards); "Relic Shelf" 3-column mini grid linking to the Hall.
- **Modals:** Forge Quest (600px, ornate, `max-height:88vh`) and Ascension takeover (rays + blurred letter-spaced "LEVEL" word animation). Escape closes; both use `role="dialog" aria-modal="true"`.

### 4. Chronicle (`isChronicle`)
h1 "The Chronicle", lore "Every fire you have lit, and every night you let one die." Contains a 26-week bonfire heatmap (`role="img"` with a descriptive label) and a 12-week "Runes Earned · By Week" bar chart, 170px tall.

### 5. Merchant (`isMerchant`)
Banner with merchant portrait placeholder and the quote "I keep no ledger of where these came from. Only of what they cost." Layout `200px / minmax(0,1fr)`: category nav (Weapons, Armor, Shields, Rings, Consumables, Realms, Titles & Frames) + wares grid with a featured item.

### 6. Hall of Relics (`isRelics`)
Fixed full-bleed background photo (`uploads/pasted-1789221956752-0.png`, `opacity:.85`) under a vertical scrim (`rgba(23,19,16,.35) → .78`). `max-width:1240px; padding:44px 26px 80px`. h1 "Hall of Relics", sub "Seven of twenty-eight claimed. The rest wait in the dark.", divider, then five groups (First Steps, Bonfires, Mastery, Treasures, Secrets). Cards: `repeat(auto-fill,minmax(206px,1fr)); gap:18px` — 66px round disc, name, criteria, and either a 5px locked progress bar or "Claimed {date}" plus a looping shimmer sweep.

### 7. Moments (`isMoments`)
Four replayable "hero moment" cards (including Relic Unlocked) with a stage preview, a beat list with millisecond timings, and a "play" button that navigates to the screen where the moment happens.

---

## Interactions & behavior

### Complete Quest demo (About block 2)
1. Auto-plays once when the card is ≥25% visible; also fires on button click; **Replay** re-runs it.
2. `t=0` card compresses to `scale(.985)` (280ms ease); a diagonal gold-white slash sweeps across (`stroke-dashoffset 420→0`, 500ms); a sigil glint scales/rotates out (550ms); six spark particles fly on individual vectors (600–800ms).
3. `t=300ms` "+27 Runes" floats up and fades (1.3s); the header rune counter rolls `1,213 → 1,240` with a cubic ease-out over 700ms (rAF, tabular numerals); the third Strength segment fills green (450ms background transition).
4. `t=1250ms` the action row becomes a dimmed engraved **Conquered** state with a **Replay** link.
5. Announce to `aria-live="polite"`: "Quest complete. 27 runes earned. Strength increased."

### Scroll reveals
IntersectionObserver at ~20–25% visibility; each element carries a delay (0–1900ms) and an optional named animation, default `em-rise .7s cubic-bezier(.2,.7,.3,1)` (opacity 0→1, translateY 10px→0). Elements already above the viewport reveal instantly, and a passive scroll/resize sweep catches anything skipped by a fast fling — reproduce both safeguards or content can stay invisible. Reveal once; do not replay on scroll-up.

### Motion rules
- Micro-interactions 300–600ms; section reveals ≤800ms; stagger 60–100ms; eased/spring, never linear.
- Animate `transform`, `opacity`, and SVG `stroke-dashoffset` only.
- ≤25 particles per effect; looping ambience limited to fog, embers, flame flicker, and relic shimmer.
- `prefers-reduced-motion: reduce` collapses all animation and transition durations to ~0 and makes demo results appear instantly; there is also an in-design `reducedMotion` flag that does the same.
- Reserve space for every animated element (fixed vignette boxes, `min-height:48px` action rows) — no layout shift.

### Accessibility
Semantic `<section aria-labelledby>` per block, one h2 each, h3 per card, real `<button>`s for every control, 2px `#e8d3a0` focus rings, decorative layers `aria-hidden`, progress elements use `role="progressbar"` with `aria-valuenow/min/max`, charts use `role="img"` with descriptive labels, and a single visually-hidden `aria-live="polite"` region announces demo and app results. Contrast is AA or better throughout.

### Responsive
Breakpoints 360 / 768 / 1024 / 1440. Everything is fluid: `repeat(auto-fit,minmax(...))` grids, `flex-wrap`, `clamp()` type, `max-width` not fixed width. Below ~768px all two-column blocks stack, the Camp aside drops under the Quest Log, and the top-bar HUD is the sensible default.

## State
- `screen` — active route.
- Landing demo: `demo` (`idle | strike | burst | done`), `demoRunes` (1213→1240), `demoStr` (2→3), `hoverAttr` (-1..4), `ctaHot`.
- App: quests array (id, type `vigil|oath|bounty`, title, notes, attr, diff `Trivial|Standard|Hard|Legendary`, streak, meta, done, strength, vice), `runes`/`displayRunes`, `lifetime` XP → derived level, unspent `points`, `tab`, `cat`, `forgeOpen`, `ravensOpen`, `ascendLevel`, `announce`.
- Rune values by difficulty: Trivial 10, Standard 25, Hard 50, Legendary 100.
- Real product needs: auth, quest CRUD, daily reset/streak job, rune ledger, attribute XP, relic unlock rules, merchant inventory and purchases.

## Assets
- `uploads/pasted-1789212993490-0.png` — hero background (misty ruins).
- `uploads/pasted-1789213345824-0.png` — About-section background.
- `uploads/pasted-1789221956752-0.png` — Hall of Relics background (field of grass and ruins).
- Icons: inline SVG sprite in `Emberwake.dc.html` (original, no external icon library).
- Fonts: Google Fonts — Cinzel, EB Garamond, Alegreya Sans.
- All artwork and terminology are original. Keep it that way: no real game names, characters, locations, or terms from existing franchises.

## Files
- `Emberwake.dc.html` — the entire prototype (all screens, sprite, animations, state).
- `support.js` — runtime required to open the prototype locally. Reference only; do not port.
- `uploads/` — the three background photographs.
