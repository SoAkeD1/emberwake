import { StatBar } from "@/components/stat-bar";
import { RavenPanel } from "@/components/raven-panel";
import type { GameState } from "@/lib/game/types";
import styles from "./camp.module.css";

export function HudTop({
  state,
  level,
  title,
  stamina,
  ringPct,
  toNext,
  ravensOpen,
  onToggleRavens,
}: {
  state: GameState;
  level: number;
  title: string;
  stamina: number;
  ringPct: number;
  toNext: string;
  ravensOpen: boolean;
  onToggleRavens: () => void;
}) {
  return (
    <section aria-label="Character status" className={styles.hud}>
      <div className={styles.portraitBlock}>
        <div className={styles.portrait} aria-hidden="true" />
        <div>
          <div className={styles.name}>Halvard</div>
          <div className={styles.charTitle}>{title}</div>
          <div className={styles.classLevel}>Sentinel · Level {level}</div>
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
          <div className={styles.toNext}>{toNext} to Ascension</div>
        </div>
        <div className={styles.levelRing} style={{ background: `conic-gradient(var(--gold) ${ringPct}%, var(--raised) 0)` }}>
          <div className={styles.levelRingInner}>{level}</div>
        </div>
        <div className={styles.ravenWrap}>
          <button type="button" className={styles.ravenBell} aria-label="Ravens, 3 unread" onClick={onToggleRavens}>
            <svg width="20" height="20" aria-hidden="true">
              <use href="#i-bell" />
            </svg>
          </button>
          <span className={styles.ravenBadge} aria-hidden="true">
            3
          </span>
          {ravensOpen && <RavenPanel onDismissAll={onToggleRavens} />}
        </div>
      </div>
    </section>
  );
}
