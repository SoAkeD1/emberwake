"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { ATTRIBUTES } from "@/lib/game/constants";
import type { Attribute } from "@/lib/game/types";
import styles from "./about.module.css";

const PATHS: { attr: Attribute; examples: string; value: number }[] = [
  { attr: "Vigor", examples: "Kindle the Morning · Drink of the Well · Sleep by Eleven", value: 72 },
  { attr: "Mind", examples: "Hour of the Scholar · Letters to the Keep", value: 64 },
  { attr: "Endurance", examples: "Walk the Long Road · Run at Dawn", value: 58 },
  { attr: "Strength", examples: "The Iron Vigil · Carry the Stones", value: 46 },
  { attr: "Dexterity", examples: "Practise the Strings · Mend the Broken Blade", value: 35 },
];

export function MasterySection() {
  const [hot, setHot] = useState(-1);

  return (
    <section aria-labelledby="ab-mastery" className={styles.mastery}>
      <h2 id="ab-mastery" className={styles.sectionTitle}>
        Paths of Mastery
      </h2>
      <div className={styles.masteryGrid}>
        {PATHS.map((p, i) => {
          const meta = ATTRIBUTES[p.attr];
          const active = hot === i;
          return (
            <button
              key={p.attr}
              type="button"
              className={styles.masteryCard}
              onMouseEnter={() => setHot(i)}
              onMouseLeave={() => setHot(-1)}
              onFocus={() => setHot(i)}
              onBlur={() => setHot(-1)}
            >
              <span
                className={styles.masteryDisc}
                style={{ boxShadow: active ? "inset 0 0 0 1px var(--border-mid), 0 0 0 1px var(--bg), 0 0 22px rgba(201,170,113,.34)" : undefined }}
              >
                <svg width="30" height="30" aria-hidden="true">
                  <use href={`#${meta.icon}`} />
                </svg>
              </span>
              <span className={styles.masteryName}>{p.attr}</span>
              <span className={styles.masteryDomain}>{meta.domain}</span>
              <span className={styles.masteryBarTrack}>
                <span className={styles.masteryBarFill} style={{ width: `${active ? p.value : 0}%` }} />
              </span>
              {active && (
                <span className={styles.masteryTooltip} role="tooltip">
                  {p.examples}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <Reveal as="p" delay={120} className={styles.caption}>
        Your real habits shape your character. Train the body, sharpen the mind.
      </Reveal>
    </section>
  );
}
