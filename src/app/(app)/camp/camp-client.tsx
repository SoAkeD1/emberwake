"use client";

import { useMemo, useState } from "react";
import { ATTRIBUTES, levelFor, titleFor } from "@/lib/game/constants";
import { INDULGENCES, SHELF_RELICS } from "@/lib/game/sample-data";
import { useGameActions, useGameState } from "@/lib/game/game-context";
import type { Attribute, QuestType } from "@/lib/game/types";
import { StatBar } from "@/components/stat-bar";
import { RavenPanel } from "@/components/raven-panel";
import { ForgeQuestModal } from "@/components/forge-quest-modal";
import { QuestCard } from "./quest-card";
import styles from "./camp.module.css";

const TABS: { type: QuestType; label: string }[] = [
  { type: "vigil", label: "Vigils" },
  { type: "oath", label: "Oaths" },
  { type: "bounty", label: "Bounties" },
];
const SUB_FILTERS: Record<QuestType, string[]> = {
  vigil: ["All", "Due", "Not Due"],
  oath: ["All", "Weak", "Strong"],
  bounty: ["Active", "Scheduled", "Completed"],
};

export function CampClient() {
  const state = useGameState();
  const { allocate, spend } = useGameActions();
  const [tab, setTab] = useState<QuestType>("vigil");
  const [sub, setSub] = useState(0);
  const [search, setSearch] = useState("");
  const [ravensOpen, setRavensOpen] = useState(false);
  const [forgeOpen, setForgeOpen] = useState(false);

  const lv = useMemo(() => levelFor(state.lifetime), [state.lifetime]);
  const title = titleFor(state.streak);

  const vigils = state.quests.filter((q) => q.type === "vigil");
  const stamina = vigils.length ? Math.round((vigils.filter((q) => q.done).length / vigils.length) * 100) : 0;

  const counts = { vigil: 0, oath: 0, bounty: 0 };
  state.quests.forEach((q) => (counts[q.type] += 1));

  const filtered = state.quests
    .filter((q) => q.type === tab)
    .filter((q) => !search || q.title.toLowerCase().includes(search.toLowerCase()));

  const ringPct = Math.round(((state.lifetime - lv.floor) / lv.need) * 100);

  return (
    <main className={`${styles.main} fx-fadein`}>
      <section aria-label="Character status" className={styles.hud}>
        <div className={styles.portraitBlock}>
          <div className={styles.portrait} aria-hidden="true" />
          <div>
            <div className={styles.name}>Halvard</div>
            <div className={styles.charTitle}>{title}</div>
            <div className={styles.classLevel}>Sentinel · Level {lv.level}</div>
          </div>
        </div>

        <div className={styles.barsBlock}>
          <StatBar label="Health" icon="i-vigor" color="#9e2a2b" colorLight="#c4676a" now={state.health} max={50} readout={`${state.health} / 50`} hit={state.hit > 0} />
          <StatBar label="Focus" icon="i-mind" color="#3a6ea5" colorLight="#6f9fcf" now={state.focus} max={30} readout={`${state.focus} / 30`} />
          <StatBar label="Stamina" icon="i-endurance" color="#5b8a3c" colorLight="#8cb868" now={stamina} max={100} readout={`${stamina}%`} />
        </div>

        <div className={styles.bonfireBlock}>
          <div className={styles.bonfireRow}>
            <svg width="30" height="30" aria-hidden="true" className={styles.flameIcon}>
              <use href="#i-flame" />
            </svg>
            <span className={styles.streakNumber}>{state.streak}</span>
          </div>
          <div className={styles.bonfireLabel}>Bonfires Lit</div>
          <div className={styles.flasks} aria-label={`${state.flasks} of 3 Ember Flasks remain`}>
            {[0, 1, 2].map((i) => (
              <svg key={i} width="17" height="17" aria-hidden="true" style={{ color: i < state.flasks ? "var(--ember)" : "#3a322a" }}>
                <use href="#i-flask" />
              </svg>
            ))}
          </div>
          <div className={styles.bonfireLabel}>Ember Flasks</div>
        </div>

        <div className={styles.runesBlock}>
          <div className={styles.runesText}>
            <div className={styles.runesValue}>{state.displayRunes.toLocaleString()}</div>
            <div className={styles.runesLabel}>Runes Held</div>
            <div className={styles.toNext}>{(lv.floor + lv.need - state.lifetime).toLocaleString()} runes to Ascension</div>
          </div>
          <div className={styles.levelRing} style={{ background: `conic-gradient(var(--gold) ${ringPct}%, var(--raised) 0)` }}>
            <div className={styles.levelRingInner}>{lv.level}</div>
          </div>
          <div className={styles.ravenWrap}>
            <button
              type="button"
              className={styles.ravenBell}
              aria-label="Ravens, 3 unread"
              onClick={() => setRavensOpen((v) => !v)}
            >
              <svg width="20" height="20" aria-hidden="true">
                <use href="#i-bell" />
              </svg>
            </button>
            <span className={styles.ravenBadge} aria-hidden="true">
              3
            </span>
            {ravensOpen && <RavenPanel onDismissAll={() => setRavensOpen(false)} />}
          </div>
        </div>
      </section>

      {state.cache > 0 && (
        <div className={styles.cacheBanner}>
          <svg width="19" height="19" aria-hidden="true">
            <use href="#i-skull" />
          </svg>
          <p>
            A Rune Cache of <strong>{state.cache.toLocaleString()}</strong> lies where you fell. Complete any quest
            within 24 hours to reclaim it.
          </p>
        </div>
      )}

      <div className={styles.grid}>
        <section aria-label="Quest Log" className={styles.questLog}>
          <div className={styles.questLogHead}>
            <div className={styles.questLogTop}>
              <h1 className={styles.questLogTitle}>Quest Log</h1>
              <button type="button" className={styles.forgeButton} onClick={() => setForgeOpen(true)}>
                <svg width="15" height="15" aria-hidden="true">
                  <use href="#i-sword" />
                </svg>
                Forge Quest
              </button>
            </div>

            <div role="tablist" aria-label="Quest types" className={styles.tabs}>
              {TABS.map((t) => (
                <button
                  key={t.type}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.type}
                  className={`${styles.tab}${tab === t.type ? ` ${styles.tabActive}` : ""}`}
                  onClick={() => {
                    setTab(t.type);
                    setSub(0);
                  }}
                >
                  {t.label} <span className={styles.tabCount}>{counts[t.type]}</span>
                </button>
              ))}
            </div>

            <div className={styles.toolbar}>
              <span className={styles.searchField}>
                <svg width="14" height="14" aria-hidden="true">
                  <use href="#i-search" />
                </svg>
                <input
                  type="search"
                  placeholder="Search the log…"
                  aria-label="Search quests"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </span>
              {SUB_FILTERS[tab].map((label, i) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={sub === i}
                  className={`${styles.subFilter}${sub === i ? ` ${styles.subFilterActive}` : ""}`}
                  onClick={() => setSub(i)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.questList}>
            {filtered.map((q) => (
              <QuestCard key={q.id} quest={q} fx={!!state.fx[q.id]} float={state.floats[q.id] ?? null} />
            ))}
            {filtered.length === 0 && <p className={styles.emptyLog}>The quest log lies empty. The world waits.</p>}
          </div>
        </section>

        <aside className={styles.aside}>
          <section aria-label="Attributes" className={styles.asideSection}>
            <h2 className={styles.asideTitle}>Paths of Mastery</h2>
            <div className={styles.attrRows}>
              {(Object.keys(ATTRIBUTES) as Attribute[]).map((name) => {
                const a = state.attrs[name];
                const meta = ATTRIBUTES[name];
                return (
                  <div className={styles.attrRow} key={name}>
                    <svg width="19" height="19" aria-hidden="true" style={{ flex: "none", color: meta.color }}>
                      <use href={`#${meta.icon}`} />
                    </svg>
                    <span className={styles.attrName}>{name}</span>
                    <span
                      className={styles.attrTrack}
                      role="progressbar"
                      aria-label={`${name} progress to next level`}
                      aria-valuenow={a.pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <span className={styles.attrFill} style={{ width: `${a.pct}%` }} />
                    </span>
                    <span className={styles.attrLevel}>{a.lvl}</span>
                  </div>
                );
              })}
            </div>
            <div className={styles.allocateRow}>
              <span className={styles.allocateLabel}>Unspent points</span>
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className={styles.allocatePoints}>{state.points}</span>
                <button
                  type="button"
                  className={styles.allocateBtn}
                  aria-label="Allocate a stat point"
                  disabled={state.points === 0}
                  onClick={allocate}
                >
                  +
                </button>
              </span>
            </div>
          </section>

          <section aria-label="Indulgences" className={styles.asideSection}>
            <h2 className={styles.asideTitle}>Indulgences</h2>
            <p className={styles.indulgenceSub}>Spend what you have earned.</p>
            <div className={styles.indulgenceList}>
              {INDULGENCES.map((i) => {
                const poor = state.held < i.price;
                return (
                  <div className={styles.indulgenceRow} key={i.title}>
                    <span className={styles.indulgenceTitle}>{i.title}</span>
                    <button
                      type="button"
                      className={styles.buyBtn}
                      disabled={poor}
                      onClick={() => spend(i.price, i.title)}
                    >
                      {i.price.toLocaleString()}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <section aria-label="Relics" className={styles.asideSection}>
            <div className={styles.relicShelfHead}>
              <h2 className={styles.asideTitle} style={{ margin: 0 }}>
                Relic Shelf
              </h2>
              <a href="/relics" className={styles.relicShelfLink}>
                Hall of Relics →
              </a>
            </div>
            <div className={styles.relicGrid}>
              {SHELF_RELICS.map((r) => (
                <div
                  key={r.name}
                  className={`${styles.relicTile}${r.unlocked ? ` ${styles.relicTileUnlocked}` : ""}`}
                >
                  <svg
                    width="25"
                    height="25"
                    aria-hidden="true"
                    className={r.unlocked ? styles.relicTileIconUnlocked : styles.relicTileIcon}
                  >
                    <use href={`#${r.icon}`} />
                  </svg>
                  <span className={`${styles.relicTileName}${r.unlocked ? ` ${styles.relicTileNameUnlocked}` : ""}`}>
                    {r.name}
                  </span>
                  {r.unlocked && <span className={styles.shimmer} aria-hidden="true" />}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {forgeOpen && <ForgeQuestModal onClose={() => setForgeOpen(false)} />}
    </main>
  );
}
