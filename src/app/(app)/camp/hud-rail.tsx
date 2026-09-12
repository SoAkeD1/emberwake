import { StatBar } from "@/components/stat-bar";
import { RavenPanel } from "@/components/raven-panel";
import type { GameState } from "@/lib/game/types";
import styles from "./camp.module.css";

export function HudRail({
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
    <aside aria-label="Character status" className={`${styles.hudRail} ornate`}>
      <div className={styles.railPortrait} aria-hidden="true">
        PORTRAIT
      </div>
      <div className={styles.railIdentity}>
        <div className={styles.name}>Halvard</div>
        <div className={styles.charTitle}>{title}</div>
        <div className={styles.classLevel}>Sentinel · Level {level}</div>
      </div>
      <div className={styles.railDivider} aria-hidden="true">
        <span />
        <svg width="9" height="9">
          <use href="#i-sigil" />
        </svg>
        <span />
      </div>
      <div className={styles.railBars}>
        <StatBar variant="rail" label="Health" icon="i-vigor" color="#9e2a2b" colorLight="#c4676a" now={state.health} max={50} readout={`${state.health} / 50`} hit={state.hit > 0} />
        <StatBar variant="rail" label="Focus" icon="i-mind" color="#3a6ea5" colorLight="#6f9fcf" now={state.focus} max={30} readout={`${state.focus} / 30`} />
        <StatBar variant="rail" label="Stamina" icon="i-endurance" color="#5b8a3c" colorLight="#8cb868" now={stamina} max={100} readout={`${stamina}%`} />
      </div>
      <span className={styles.railHairline} aria-hidden="true" />
      <div className={styles.railStreak}>
        <svg width="26" height="26" aria-hidden="true" className={styles.flameIcon}>
          <use href="#i-flame" />
        </svg>
        <span className={styles.railStreakNum}>{state.streak}</span>
        <span className={styles.railStreakLabel}>Bonfires Lit</span>
      </div>
      <div className={styles.flasks} style={{ justifyContent: "center" }} aria-label={`${state.flasks} of 3 Ember Flasks remain`}>
        {[0, 1, 2].map((i) => (
          <svg key={i} width="17" height="17" aria-hidden="true" style={{ color: i < state.flasks ? "var(--ember)" : "#3a322a" }}>
            <use href="#i-flask" />
          </svg>
        ))}
      </div>
      <span className={styles.railHairline} aria-hidden="true" />
      <div className={styles.railRunes}>
        <div className={styles.levelRing} style={{ width: 52, height: 52, background: `conic-gradient(var(--gold) ${ringPct}%, var(--raised) 0)` }}>
          <div className={styles.levelRingInner} style={{ width: 42, height: 42, fontSize: 16 }}>
            {level}
          </div>
        </div>
        <div>
          <div className={styles.railRunesValue}>{state.displayRunes.toLocaleString()}</div>
          <div className={styles.runesLabel}>Runes Held</div>
        </div>
      </div>
      <div className={styles.ravenWrap} style={{ width: "100%" }}>
        <button type="button" className={styles.railRavenBtn} onClick={onToggleRavens}>
          <svg width="16" height="16" aria-hidden="true">
            <use href="#i-bell" />
          </svg>
          Ravens · 3
        </button>
        {ravensOpen && <RavenPanel onDismissAll={onToggleRavens} />}
      </div>
    </aside>
  );
}
