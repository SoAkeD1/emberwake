import { Reveal } from "@/components/reveal";
import styles from "./about.module.css";

export function StakesSection() {
  return (
    <section aria-labelledby="ab-stakes" className={styles.stakes}>
      <Reveal as="div" className={styles.stakesBanner}>
        <div className={styles.stakesGlow} aria-hidden="true" />
        <div className={styles.stakesBody}>
          <h2 id="ab-stakes" className={styles.stakesTitle}>
            The World Pushes Back
          </h2>
          <p className={styles.stakesText}>
            Neglect your Vigils and your health falls. Fall completely and half your held Runes are lost — until you
            rise and reclaim them.
          </p>
        </div>
        <div className={styles.stakesHealth}>
          <Reveal as="div" delay={200} animation="em-shake-a .5s ease-in-out 3" className={styles.stakesHealthTrack}>
            <span
              className={styles.stakesHealthFill}
              style={{ animation: "em-health 2.6s cubic-bezier(.3,.8,.2,1) both", animationDelay: "200ms" }}
            />
          </Reveal>
          <Reveal as="div" delay={1900} className={styles.stakesRise}>
            <svg width="14" height="14" aria-hidden="true">
              <use href="#i-flame" />
            </svg>
            Rise Again
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
