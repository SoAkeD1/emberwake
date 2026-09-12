import { Reveal } from "@/components/reveal";
import styles from "./about.module.css";

export function SpoilsSection() {
  return (
    <section aria-labelledby="ab-spoils" className={styles.spoils}>
      <h2 id="ab-spoils" className={styles.sectionTitle}>
        Spoils of the Journey
      </h2>
      <div className={styles.spoilsGrid}>
        <Reveal as="div" delay={60} className={styles.spoilCard}>
          <div className={styles.spoilVignette} aria-hidden="true">
            <span className={styles.trickleDot} style={{ left: 33, width: 4, height: 4, background: "var(--gold)" }} />
            <span className={styles.trickleDot} style={{ left: 24, width: 3, height: 3, background: "var(--gold-bright)", animationDelay: "0.7s" }} />
            <span className={styles.trickleDot} style={{ left: 44, width: 3, height: 3, background: "var(--gold)", animationDelay: "1.4s" }} />
            <span className={styles.runeChip}>
              <svg width="12" height="12">
                <use href="#i-sigil" />
              </svg>
              1,240
            </span>
          </div>
          <div>
            <h3 className={styles.spoilTitle}>Runes &amp; Ascension</h3>
            <p className={styles.spoilBody}>Earn Runes for every victory. Rise through levels that grow harder to reach.</p>
          </div>
        </Reveal>

        <Reveal as="div" delay={140} className={styles.spoilCard}>
          <div className={styles.flipOuter} aria-hidden="true">
            <span className={styles.flipCard}>
              <span className={styles.flipFace}>
                <svg width="26" height="26">
                  <use href="#i-sword" />
                </svg>
              </span>
              <span className={styles.flipFaceBack}>
                <svg width="26" height="26">
                  <use href="#i-sword" />
                </svg>
              </span>
            </span>
          </div>
          <div>
            <h3 className={styles.spoilTitle}>The Wandering Merchant</h3>
            <p className={styles.spoilBody}>Spend Runes on weapons, armor, realm themes, and titles — or on real rewards you set yourself.</p>
          </div>
        </Reveal>

        <Reveal as="div" delay={220} className={styles.spoilCard}>
          <div className={styles.flipOuter} aria-hidden="true">
            <span className={`${styles.flipCard} ${styles.flipCardRound}`}>
              <span className={`${styles.flipFace} ${styles.flipFaceRound}`}>
                <svg width="28" height="28">
                  <use href="#i-seal" />
                </svg>
              </span>
              <span className={`${styles.flipFaceBack} ${styles.flipFaceRound} ${styles.flipFaceBackRound}`} style={{ position: "relative", overflow: "hidden" }}>
                <svg width="28" height="28">
                  <use href="#i-seal" />
                </svg>
                <span className="shimmer-sweep" />
              </span>
            </span>
          </div>
          <div>
            <h3 className={styles.spoilTitle}>The Hall of Relics</h3>
            <p className={styles.spoilBody}>Unlock rare medallions for streaks, mastery, and secrets.</p>
          </div>
        </Reveal>

        <Reveal as="div" delay={300} className={styles.spoilCard}>
          <div className={styles.bonfireVignette} aria-hidden="true">
            <span className={styles.bonfireGlow} />
            <span className={styles.flameBig} />
            <span className={styles.flameSmall} />
            <span className={styles.logBar} />
            <span
              style={{ position: "absolute", left: 22, bottom: 30, width: 3, height: 3, borderRadius: "50%", background: "var(--ember)", animation: "em-ember 4s linear infinite" }}
            />
            <span
              style={{ position: "absolute", left: 46, bottom: 34, width: 2, height: 2, borderRadius: "50%", background: "var(--gold-bright)", animation: "em-ember 5.2s linear infinite 1.6s" }}
            />
          </div>
          <div>
            <h3 className={styles.spoilTitle}>Bonfires &amp; Flasks</h3>
            <p className={styles.spoilBody}>Your streak is a living flame. Guard it well.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
