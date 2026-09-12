"use client";

import { ATTRIBUTES, BASE_RUNES } from "@/lib/game/constants";
import { useGameActions } from "@/lib/game/game-context";
import type { Quest } from "@/lib/game/types";
import styles from "./camp.module.css";

const DIFF_PIPS: Record<Quest["diff"], number> = { Trivial: 1, Standard: 2, Hard: 3, Legendary: 4 };

const SPARKS = [
  { left: "23%", top: "52%", size: 4, color: "#e8d3a0", dx: 34, dy: -26, dur: 550 },
  { left: "34%", top: "60%", size: 3, color: "#d9772b", dx: -28, dy: -30, dur: 600 },
  { left: "45%", top: "46%", size: 4, color: "#f6ecd2", dx: 18, dy: -40, dur: 500 },
  { left: "56%", top: "56%", size: 3, color: "#d9772b", dx: -40, dy: -14, dur: 620 },
  { left: "66%", top: "44%", size: 4, color: "#e8d3a0", dx: 46, dy: -8, dur: 520 },
  { left: "76%", top: "58%", size: 3, color: "#c9aa71", dx: -10, dy: -44, dur: 580 },
];

export function QuestCard({ quest, fx, float }: { quest: Quest; fx: boolean; float: { text: string; color: string } | null }) {
  const { complete, virtue, vice } = useGameActions();
  const meta = ATTRIBUTES[quest.attr];
  const isOath = quest.type === "oath";
  const pipsOn = DIFF_PIPS[quest.diff];
  const mult = 1 + 0.02 * Math.min(quest.streak, 30);
  const edge = quest.done
    ? "#3a322a"
    : isOath
      ? quest.strength === "strong"
        ? "#c9aa71"
        : quest.strength === "mid"
          ? "#8a6f3f"
          : "#9e2a2b"
      : meta.color;

  return (
    <article
      className={`${styles.card}${quest.done ? ` ${styles.cardDone}` : ""}`}
      style={{ borderLeftColor: edge }}
    >
      <button
        type="button"
        onClick={isOath || quest.done ? undefined : () => complete(quest.id)}
        aria-label={quest.done ? `${quest.title} — conquered` : `Complete ${quest.title}`}
        className={`${styles.cardMark}${quest.done ? ` ${styles.cardMarkDone}` : isOath ? ` ${styles.cardMarkOath}` : ""}`}
      >
        {quest.done ? "✠" : isOath ? "✧" : "◇"}
      </button>

      <div className={styles.cardBody}>
        <div className={styles.cardTop}>
          <svg width="17" height="17" aria-hidden="true" style={{ flex: "none", color: quest.done ? "#4a3d2c" : meta.color }}>
            <use href={`#${meta.icon}`} />
          </svg>
          <h3 className={`${styles.cardTitle}${quest.done ? ` ${styles.cardTitleDone}` : ""}`}>{quest.title}</h3>
          <span className={styles.pips} aria-hidden="true">
            {Array.from({ length: pipsOn }).map((_, i) => (
              <span className={`diamond-pip ${styles.pipOn}`} key={`on${i}`} />
            ))}
            {Array.from({ length: 4 - pipsOn }).map((_, i) => (
              <span className={`diamond-pip ${styles.pipOff}`} key={`off${i}`} />
            ))}
          </span>
          <span className={styles.diffLabel}>{quest.diff}</span>
        </div>
        <p className={styles.cardNotes}>{quest.notes}</p>
        <div className={styles.cardMeta}>
          <span className={styles.cardStreak}>
            <svg width="13" height="13" aria-hidden="true">
              <use href="#i-flame" />
            </svg>
            {quest.type === "bounty" ? "—" : `${quest.streak} lit`}
          </span>
          <span style={{ color: quest.done ? "var(--stamina)" : quest.vice ? "#c4676a" : "var(--text-secondary)" }}>
            {quest.meta}
          </span>
          <span className={styles.cardRunes}>
            <svg width="13" height="13" aria-hidden="true">
              <use href="#i-sigil" />
            </svg>
            {Math.round(BASE_RUNES[quest.diff] * mult)} runes
          </span>
        </div>
      </div>

      {isOath && (
        <div className={styles.oathButtons}>
          <button
            type="button"
            className={styles.virtueBtn}
            aria-label={`Record a Virtue for ${quest.title}`}
            onClick={() => virtue(quest.id)}
          >
            +
          </button>
          <button
            type="button"
            className={styles.viceBtn}
            aria-label={`Record a Vice for ${quest.title}`}
            onClick={() => vice(quest.id)}
          >
            −
          </button>
        </div>
      )}

      <button type="button" aria-label="Quest actions" className={styles.kebabBtn}>
        <svg width="16" height="16" aria-hidden="true">
          <use href="#i-kebab" />
        </svg>
      </button>

      {fx && (
        <span className={styles.cardFx} aria-hidden="true">
          <span className={styles.cardFxGlow} />
          <svg viewBox="0 0 400 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} className={styles.cardFxSlash}>
            <line x1="-20" y1="118" x2="420" y2="-18" stroke="#f6ecd2" strokeWidth="3" strokeDasharray="420" />
          </svg>
          {SPARKS.map((s, i) => {
            const sparkStyle: React.CSSProperties & Record<"--dx" | "--dy", string> = {
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              background: s.color,
              animation: `spark-fly ${s.dur}ms ease-out forwards`,
              "--dx": `${s.dx}px`,
              "--dy": `${s.dy}px`,
            };
            return <span key={i} className={styles.spark} style={sparkStyle} />;
          })}
        </span>
      )}

      {float && (
        <span className={styles.cardFloat} aria-hidden="true" style={{ color: float.color }}>
          {float.text}
        </span>
      )}
    </article>
  );
}
