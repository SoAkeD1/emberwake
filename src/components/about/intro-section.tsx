import { Reveal } from "@/components/reveal";
import styles from "./about.module.css";

const EMBERS = [
  { left: "9%", bottom: "8%", size: 3, color: "var(--ember)", dur: "8s", delay: "0s" },
  { left: "22%", bottom: "2%", size: 2, color: "var(--gold)", dur: "11s", delay: "1.4s" },
  { left: "48%", bottom: "6%", size: 2, color: "var(--ember)", dur: "9.5s", delay: "3.1s" },
  { left: "71%", bottom: "0", size: 3, color: "var(--gold)", dur: "12s", delay: "2.2s" },
  { left: "88%", bottom: "10%", size: 2, color: "var(--ember)", dur: "10s", delay: "5s" },
];

export function IntroSection() {
  return (
    <section aria-labelledby="ab-intro" className={styles.intro}>
      <div className={styles.introEmbers} aria-hidden="true">
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className={styles.ember}
            style={{
              left: e.left,
              bottom: e.bottom,
              width: e.size,
              height: e.size,
              background: e.color,
              animationDuration: e.dur,
              animationDelay: e.delay,
            }}
          />
        ))}
      </div>

      <Reveal as="p" className="eyebrow" style={{ margin: "0 0 20px" }}>
        The Chronicle Begins
      </Reveal>
      <Reveal as="h2" delay={90} id="ab-intro" className={styles.introHeading}>
        Your Life Is the Hardest Game You&apos;ll Ever Play
      </Reveal>
      <Reveal
        as="div"
        delay={200}
        animation="em-path .8s cubic-bezier(.2,.7,.3,1) both"
        className={styles.introDivider}
        aria-hidden="true"
      >
        <span />
        <svg width="12" height="12">
          <use href="#i-sigil" />
        </svg>
        <span />
      </Reveal>
      <Reveal as="p" delay={300} className={styles.introLore}>
        Real progress is slow. A book, a workout, a lesson — the reward arrives months later, if at all. Emberwake
        gives you the victory now. Every habit becomes a quest, every day a battle, every streak a bonfire against
        the dark.
      </Reveal>
    </section>
  );
}
