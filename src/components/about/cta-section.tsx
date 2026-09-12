"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import styles from "./about.module.css";

export function CtaSection() {
  const [hot, setHot] = useState(false);

  return (
    <section aria-labelledby="ab-cta" className={styles.cta}>
      <div className={styles.ctaFire} aria-hidden="true">
        <span className={styles.ctaGlow} style={{ opacity: hot ? 1 : 0.5 }} />
        <span className={styles.ctaFlameBig} />
        <span className={styles.ctaFlameMid} />
        <span className={styles.ctaFlameSmall} />
        <span className={styles.ctaLogBar1} />
        <span className={styles.ctaLogBar2} />
        <span style={{ position: "absolute", left: "34%", bottom: 90, width: 3, height: 3, borderRadius: "50%", background: "var(--ember)", animation: "em-ember 5s linear infinite" }} />
        <span style={{ position: "absolute", left: "52%", bottom: 96, width: 2, height: 2, borderRadius: "50%", background: "var(--gold-bright)", animation: "em-ember 6.4s linear infinite 1.2s" }} />
        <span style={{ position: "absolute", left: "64%", bottom: 84, width: 3, height: 3, borderRadius: "50%", background: "var(--gold)", animation: "em-ember 7s linear infinite 2.6s" }} />
        <span style={{ position: "absolute", left: "44%", bottom: 100, width: 2, height: 2, borderRadius: "50%", background: "var(--ember)", animation: "em-ember 5.8s linear infinite 3.4s" }} />
      </div>

      <Reveal as="h2" id="ab-cta" className={styles.ctaHeading}>
        Every Legend Starts With a Single Oath
      </Reveal>
      <Reveal as="p" delay={90} className={styles.ctaSub}>
        Your bonfire awaits.
      </Reveal>
      <div className={styles.ctaActions}>
        <a
          href="#signup"
          className={styles.ctaPrimary}
          onMouseEnter={() => setHot(true)}
          onMouseLeave={() => setHot(false)}
          onFocus={() => setHot(true)}
          onBlur={() => setHot(false)}
        >
          Begin the Journey
        </a>
        <a href="#signup" className={styles.ctaGhost}>
          Awaken (Log In)
        </a>
      </div>
    </section>
  );
}
