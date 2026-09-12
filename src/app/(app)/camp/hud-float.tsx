import { StatBar } from "@/components/stat-bar";
import { RavenPanel } from "@/components/raven-panel";
import type { GameState } from "@/lib/game/types";
import styles from "./camp.module.css";

export function HudFloat({
  state,
  level,
  title,
  stamina,
  ringPct,
  ravensOpen,
  onToggleRavens,
}: {
  state: GameState;
  level: number;
  title: string;
  stamina: number;
  ringPct: number;
  ravensOpen: boolean;
  onToggleRavens: () => void;
}) {
  return (
    <div aria-label="Character status" className={styles.hudFloat}>
      <div className={styles.floatIdentity}>
        <div className={styles.floatPortrait} aria-hidden="true" />
        <div>
          <div className={styles.floatName}>Halvard</div>
          <div className={styles.floatMeta}>
            Lv {level} · {title}
          </div>
        </div>
      </div>
      <span className={styles.floatSep} aria-hidden="true" />
      <div className={styles.floatBars}>
        <div className={styles.floatBarSlot}>
          <StatBar variant="float" label="Health" icon="i-vigor" color="#9e2a2b" colorLight="#c4676a" now={state.health} max={50} readout={`${state.health} / 50`} hit={state.hit > 0} />
        </div>
        <div className={styles.floatBarSlot}>
          <StatBar variant="float" label="Focus" icon="i-mind" color="#3a6ea5" colorLight="#6f9fcf" now={state.focus} max={30} readout={`${state.focus} / 30`} />
        </div>
        <div className={styles.floatBarSlot}>
          <StatBar variant="float" label="Stamina" icon="i-endurance" color="#5b8a3c" colorLight="#8cb868" now={stamina} max={100} readout={`${stamina}%`} />
        </div>
      </div>
      <span className={styles.floatSep} aria-hidden="true" />
      <div className={styles.floatStreak}>
        <svg width="22" height="22" aria-hidden="true" className={styles.flameIcon}>
          <use href="#i-flame" />
        </svg>
        <span className={styles.floatStreakNum}>{state.streak}</span>
        <span className={styles.flasks} aria-label={`${state.flasks} of 3 Ember Flasks remain`}>
          {[0, 1, 2].map((i) => (
            <svg key={i} width="14" height="14" aria-hidden="true" style={{ color: i < state.flasks ? "var(--ember)" : "#3a322a" }}>
              <use href="#i-flask" />
            </svg>
          ))}
        </span>
      </div>
      <span className={styles.floatSep} aria-hidden="true" />
      <div className={styles.floatRunes}>
        <div style={{ textAlign: "right" }}>
          <div className={styles.floatRunesValue}>{state.displayRunes.toLocaleString()}</div>
          <div className={styles.floatRunesLabel}>Runes</div>
        </div>
        <div className={styles.levelRing} style={{ width: 44, height: 44, background: `conic-gradient(var(--gold) ${ringPct}%, var(--raised) 0)` }}>
          <div className={styles.levelRingInner} style={{ width: 35, height: 35, fontSize: 14 }}>
            {level}
          </div>
        </div>
        <div className={styles.ravenWrap}>
          <button type="button" className={styles.floatRavenBtn} aria-label="Ravens, 3 unread" onClick={onToggleRavens}>
            <svg width="18" height="18" aria-hidden="true">
              <use href="#i-bell" />
            </svg>
          </button>
          {ravensOpen && <RavenPanel onDismissAll={onToggleRavens} />}
        </div>
      </div>
    </div>
  );
}
