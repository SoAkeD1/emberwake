"use client";

import { useRouter } from "next/navigation";
import { levelFor } from "@/lib/game/constants";
import { useGameActions, useGameState } from "@/lib/game/game-context";
import styles from "./moments.module.css";

export function MomentsClient() {
  const router = useRouter();
  const state = useGameState();
  const { previewAscension, previewFallen, complete } = useGameActions();
  const level = levelFor(state.lifetime).level;

  const moments = [
    {
      name: "Ascension",
      cta: "Play Ascension",
      body: "Crossing a rune threshold stops the world. One stat point, health restored, a flask refilled — then straight back to the log.",
      stageBg: "radial-gradient(60% 100% at 50% 50%, rgba(232,211,160,.16), #141110 72%)",
      stageText: "Level " + (level + 1),
      stageFg: "#f6ecd2",
      stageSize: "40px",
      stageTrack: ".3em",
      beats: [
        { t: "0ms", what: "World dims, golden rays bloom from centre" },
        { t: "200ms", what: "Blackletter “Ascension” fades up" },
        { t: "300ms", what: "Level numeral unblurs, letter-spacing expands to .34em" },
        { t: "1.1s", what: "Stat-point prompt; Esc or click dismisses" },
      ],
      play: () => previewAscension(level + 1),
    },
    {
      name: "Fallen",
      cta: "Play Fallen",
      body: "Health at zero. Half of your held runes drop into a cache that decays in a day. Level, items and lifetime runes are never touched.",
      stageBg: "radial-gradient(60% 100% at 50% 50%, rgba(158,42,43,.2), #0d0b0a 74%)",
      stageText: "Fallen",
      stageFg: "#9e2a2b",
      stageSize: "40px",
      stageTrack: ".34em",
      beats: [
        { t: "0ms", what: "Slow desaturation and fade to black over 1.1s" },
        { t: "600ms", what: "Ember-red title resolves" },
        { t: "1.1s", what: "“Rise Again” — health full, cache marker enters the HUD" },
      ],
      play: () => previewFallen(),
    },
    {
      name: "The Clash",
      cta: "Play in the Camp",
      body: "The one you feel a hundred times a day. A completion has to read as a won fight in about half a second.",
      stageBg: "linear-gradient(115deg, #241e19 0%, #3a3026 48%, #241e19 100%)",
      stageText: "+27 Runes",
      stageFg: "#e8d3a0",
      stageSize: "28px",
      stageTrack: ".2em",
      beats: [
        { t: "0ms", what: "Card compresses to 0.98, gold slash sweeps the diagonal" },
        { t: "120ms", what: "Glint flash, six to ten sparks, 2px screen shake" },
        { t: "520ms", what: "Card settles engraved and dimmed; rune counter rolls up" },
      ],
      play: () => {
        router.push("/camp");
        setTimeout(() => complete("q2"), 260);
      },
    },
    {
      name: "Relic Unlocked",
      cta: "Open the Hall",
      body: "A medallion flips from cold stone to struck gold and keeps a slow shimmer for as long as it sits in the Hall.",
      stageBg: "radial-gradient(60% 100% at 50% 50%, rgba(201,170,113,.14), #171310 74%)",
      stageText: "Seven Flames",
      stageFg: "#c9aa71",
      stageSize: "24px",
      stageTrack: ".18em",
      beats: [
        { t: "0ms", what: "Medallion rotates on Y, stone face to gold" },
        { t: "340ms", what: "Shimmer sweep crosses the disc" },
        { t: "400ms", what: "Raven toast slides in, name in blackletter" },
      ],
      play: () => router.push("/relics"),
    },
  ];

  return (
    <main className={`${styles.main} fx-fadein`}>
      <h1 className="page-heading">Moments</h1>
      <p className="page-lede">The four beats the whole app is built to earn. Press one to watch it play.</p>

      <div className={styles.grid}>
        {moments.map((m) => (
          <section className={styles.card} key={m.name}>
            <div className={styles.stage} aria-hidden="true" style={{ background: m.stageBg }}>
              <span
                className={styles.stageText}
                style={{ fontSize: m.stageSize, letterSpacing: m.stageTrack, color: m.stageFg, textShadow: `0 0 40px ${m.stageFg}66` }}
              >
                {m.stageText}
              </span>
            </div>
            <div className={styles.body}>
              <h2 className={styles.name}>{m.name}</h2>
              <p className={styles.desc}>{m.body}</p>
              <div className={styles.beats}>
                {m.beats.map((b, i) => (
                  <div className={styles.beat} key={i}>
                    <span className={styles.beatTime}>{b.t}</span>
                    <span className={styles.beatWhat}>{b.what}</span>
                  </div>
                ))}
              </div>
              <button type="button" className={styles.playBtn} onClick={m.play}>
                {m.cta}
              </button>
            </div>
          </section>
        ))}
      </div>

      <p className={styles.footnote}>
        Under <em>prefers-reduced-motion</em> — or the Sanctuary override — every beat above collapses to a plain
        opacity fade: no shake, no particles, no letter-spacing crawl.
      </p>
    </main>
  );
}
