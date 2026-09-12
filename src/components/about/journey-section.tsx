import { Reveal } from "@/components/reveal";
import styles from "./about.module.css";

export function JourneySection() {
  return (
    <section aria-labelledby="ab-journey" className={styles.journey}>
      <h2 id="ab-journey" className={styles.sectionTitle} style={{ marginBottom: 10, fontSize: 26, color: "var(--gold)" }}>
        How the Journey Works
      </h2>
      <div className="icon-sigil-divider" aria-hidden="true" style={{ maxWidth: 300, marginBottom: 52 }}>
        <span />
        <svg width="10" height="10">
          <use href="#i-sigil" />
        </svg>
        <span />
      </div>
      <Reveal
        as="div"
        animation="em-path 1.2s cubic-bezier(.2,.7,.3,1) both"
        className={styles.journeyPath}
        aria-hidden="true"
      />

      <div className={styles.journeyGrid}>
        <Reveal as="div" delay={120} className={styles.journeyCard}>
          <span className={styles.journeyNum}>I</span>
          <div className={styles.journeyVignette} aria-hidden="true">
            <Reveal as="span" delay={260} animation="em-unroll .7s cubic-bezier(.2,.7,.3,1) both" className={styles.scroll} />
            <Reveal as="span" delay={520} animation="em-path .9s ease both" className={styles.scrollLine1} />
            <Reveal as="span" delay={700} animation="em-path .7s ease both" className={styles.scrollLine2} />
          </div>
          <h3 className={styles.journeyTitle}>Swear Your Oaths</h3>
          <p className={styles.journeyBody}>Turn habits, daily routines, and one-off tasks into Oaths, Vigils, and Bounties.</p>
        </Reveal>

        <Reveal as="div" delay={220} className={styles.journeyCard}>
          <span className={styles.journeyNum}>II</span>
          <div className={styles.journeyVignette} aria-hidden="true">
            <svg width="88" height="88" viewBox="0 0 60 60" className={styles.ringWrap}>
              <circle cx="30" cy="30" r="24" fill="none" stroke="var(--border)" strokeWidth="3" />
              <Reveal
                as="circle"
                delay={340}
                animation="em-ring 1s cubic-bezier(.2,.7,.3,1) both"
                cx={30}
                cy={30}
                r={24}
                fill="none"
                stroke="var(--gold)"
                strokeWidth={3}
                strokeLinecap="round"
                strokeDasharray={151}
                strokeDashoffset={151}
                transform="rotate(-90 30 30)"
              />
            </svg>
            <Reveal as="span" delay={900} animation="em-stamp .5s cubic-bezier(.2,.9,.3,1) both" className={styles.ringStamp}>
              LV 2
            </Reveal>
          </div>
          <h3 className={styles.journeyTitle}>Conquer the Day</h3>
          <p className={styles.journeyBody}>
            Complete quests to earn Runes, raise your attributes, and ascend to new levels. Each level demands more
            than the last.
          </p>
        </Reveal>

        <Reveal as="div" delay={320} className={styles.journeyCard}>
          <span className={styles.journeyNum}>III</span>
          <div className={`${styles.journeyVignette} ${styles.flameFlask}`} aria-hidden="true">
            <Reveal as="span" delay={440} animation="em-grow 1.4s cubic-bezier(.2,.7,.3,1) both" className={styles.growFlame}>
              <svg width="52" height="52">
                <use href="#i-flame" />
              </svg>
            </Reveal>
            <span className={styles.flaskWrap}>
              <Reveal as="span" delay={900} animation="em-drain 1.6s ease-in-out both" className={styles.flaskDrain} />
              <svg width="34" height="34" style={{ position: "relative" }}>
                <use href="#i-flask" />
              </svg>
            </span>
          </div>
          <h3 className={styles.journeyTitle}>Keep the Bonfire Lit</h3>
          <p className={styles.journeyBody}>
            Show up every day to grow your bonfire and earn titles. Miss a day and an Ember Flask drains to protect
            you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
