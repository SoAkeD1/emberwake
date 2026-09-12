import type { Metadata } from "next";
import { RELIC_DEFS, RELIC_GROUPS } from "@/lib/game/sample-data";
import styles from "./relics.module.css";

export const metadata: Metadata = {
  title: "Hall of Relics — Emberwake",
  description: "Seven of twenty-eight claimed. The rest wait in the dark.",
};

const unlockedCount = RELIC_DEFS.filter((r) => r.unlockedOn).length;

export default function RelicsPage() {
  return (
    <div className={styles.wrap}>
      {/* eslint-disable-next-line @next/next/no-img-element -- needs true `position: fixed`, which next/image's `fill` mode can't produce (it forces inline position:absolute) */}
      <img src="/relics-bg.png" alt="" aria-hidden="true" className={styles.bgPhoto} />
      <div className={styles.bgScrim} aria-hidden="true" />

      <main className={`${styles.main} fx-fadein`}>
        <h1 className="page-heading">Hall of Relics</h1>
        <p className="page-lede">
          {unlockedCount} of {RELIC_DEFS.length} claimed. The rest wait in the dark.
        </p>
        <div className="icon-sigil-divider" aria-hidden="true">
          <span />
          <svg width="11" height="11">
            <use href="#i-sigil" />
          </svg>
          <span />
        </div>

        {RELIC_GROUPS.map((group) => (
          <section className={styles.groupSection} key={group}>
            <h2 className={styles.groupTitle}>{group}</h2>
            <div className={styles.grid}>
              {RELIC_DEFS.filter((r) => r.group === group).map((r, i) => {
                const unlocked = !!r.unlockedOn;
                return (
                  <div
                    key={`${group}-${i}`}
                    className={`${styles.card}${unlocked ? ` ${styles.cardUnlocked}` : ""}`}
                  >
                    <span className={`${styles.disc}${unlocked ? ` ${styles.discUnlocked}` : ""}`}>
                      <svg width="32" height="32" aria-hidden="true" style={{ color: unlocked ? "var(--gold-bright)" : "var(--border-mid)" }}>
                        <use href={`#${r.icon}`} />
                      </svg>
                    </span>
                    <div className={`${styles.name}${unlocked ? ` ${styles.nameUnlocked}` : ""}`}>{r.name}</div>
                    <div className={styles.criteria}>{r.criteria}</div>
                    {unlocked ? (
                      <>
                        <div className={styles.claimed}>Claimed {r.unlockedOn}</div>
                        <span className="shimmer-sweep" aria-hidden="true" />
                      </>
                    ) : (
                      <span
                        className={styles.progressTrack}
                        role="progressbar"
                        aria-label={`${r.name} progress`}
                        aria-valuenow={r.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <span className={styles.progressFill} style={{ width: `${r.progress}%` }} />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
