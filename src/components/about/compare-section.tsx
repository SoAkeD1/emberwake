"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import styles from "./about.module.css";

type DemoPhase = "idle" | "strike" | "burst" | "done";

const SPARKS = [
  { left: "50%", top: "46%", size: 4, color: "#e8d3a0", dx: 34, dy: -26, dur: 600 },
  { left: "50%", top: "46%", size: 3, color: "#d9772b", dx: -28, dy: -30, dur: 700 },
  { left: "50%", top: "46%", size: 3, color: "#f6ecd2", dx: 18, dy: -40, dur: 650 },
  { left: "50%", top: "46%", size: 4, color: "#c9aa71", dx: -40, dy: -14, dur: 750 },
  { left: "50%", top: "46%", size: 3, color: "#d9772b", dx: 46, dy: -8, dur: 600 },
  { left: "50%", top: "46%", size: 3, color: "#e8d3a0", dx: -10, dy: -44, dur: 800 },
];

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function CompareSection() {
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [runes, setRunes] = useState(1213);
  const [strength, setStrength] = useState(2);
  const [announce, setAnnounce] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function rollRunes(from: number, to: number) {
    if (prefersReducedMotion()) {
      setRunes(to);
      return;
    }
    const t0 = performance.now();
    const dur = 700;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setRunes(Math.round(from + (to - from) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function play() {
    if (phase === "strike" || phase === "burst") return;
    const calm = prefersReducedMotion();
    if (calm) {
      setPhase("done");
      setRunes(1240);
      setStrength(3);
      setAnnounce("Quest complete. 27 runes earned. Strength increased.");
      return;
    }
    setPhase("strike");
    setRunes(1213);
    setStrength(2);
    timers.current.push(
      setTimeout(() => {
        setPhase("burst");
        setStrength(3);
        rollRunes(1213, 1240);
      }, 300)
    );
    timers.current.push(
      setTimeout(() => {
        setPhase("done");
        setAnnounce("Quest complete. 27 runes earned. Strength increased.");
      }, 1250)
    );
  }

  function replay() {
    setPhase("idle");
    setRunes(1213);
    setStrength(2);
    timers.current.push(setTimeout(play, 140));
  }

  // auto-plays once when ~25% visible, matching the handoff's data-em-demo behavior
  useEffect(() => {
    const el = cardRef.current;
    if (!el || played.current) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.25 && !played.current) {
            played.current = true;
            io.disconnect();
            play();
          }
        }),
      { threshold: [0, 0.25] }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const struck = phase === "strike" || phase === "burst";

  return (
    <section aria-labelledby="ab-compare" className={styles.compare}>
      <h2 id="ab-compare" className={styles.sectionTitle}>
        The Problem, and the Quest
      </h2>
      <div className={styles.compareGrid}>
        <Reveal as="div" delay={80} className={styles.oldWay}>
          <span className={styles.oldWayLabel}>The Old Way</span>
          <div className={styles.oldWayRows}>
            <div className={styles.oldWayRow}>
              <span className={styles.oldWayBox} aria-hidden="true" />
              <span className={styles.oldWayText}>Go to the gym</span>
            </div>
            <div className={styles.oldWayRow} style={{ opacity: 0.5 }}>
              <span className={styles.oldWayBox} aria-hidden="true" />
              <span className={styles.oldWayText}>Read 20 pages</span>
            </div>
            <div className={styles.oldWayRow} style={{ opacity: 0.28 }}>
              <span className={styles.oldWayBox} aria-hidden="true" />
              <span className={styles.oldWayText}>Sleep by eleven</span>
            </div>
          </div>
          <p className={styles.oldWayCaption}>A checkbox. Nothing happens.</p>
        </Reveal>

        <div
          ref={cardRef}
          className={`${styles.demoCard}${struck ? ` ${styles.demoCardStruck}` : ""}`}
        >
          <svg className={styles.demoFiligree} width="30" height="30" aria-hidden="true">
            <use href="#i-fil" />
          </svg>
          <div className={styles.demoHead}>
            <span className={styles.demoLabel}>The Emberwake Way</span>
            <span className={styles.demoRunes}>
              <svg width="13" height="13" aria-hidden="true">
                <use href="#i-sigil" />
              </svg>
              {runes.toLocaleString()}
            </span>
          </div>
          <div className={styles.demoBody}>
            <span className={styles.demoIcon}>
              <svg width="24" height="24" aria-hidden="true">
                <use href="#i-strength" />
              </svg>
            </span>
            <div>
              <h3 className={styles.demoTitle}>The Iron Vigil</h3>
              <p className={styles.demoNote}>Go to the gym. Squats, presses, the long carry.</p>
            </div>
          </div>
          <div className={styles.demoMeta}>
            <span className={styles.demoPips} aria-label="Difficulty: hard">
              <span className="diamond-pip" style={{ background: "var(--gold)" }} />
              <span className="diamond-pip" style={{ background: "var(--gold)" }} />
              <span className="diamond-pip" style={{ background: "var(--gold)" }} />
              <span className="diamond-pip" style={{ background: "#3a332a" }} />
            </span>
            <span className={styles.demoDiff}>Hard · Strength</span>
            <span className={styles.demoBonus}>+25 Runes</span>
          </div>
          <div className={styles.demoStrRow}>
            <span className={styles.demoStrLabel}>Strength</span>
            <span className={styles.demoStrTrack}>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={styles.demoStrSeg}
                  style={{ background: i < strength ? (i === 2 && strength === 3 ? "#6ba545" : "var(--stamina)") : "var(--well)" }}
                />
              ))}
            </span>
          </div>
          <div className={styles.demoAction}>
            {phase === "idle" && (
              <button type="button" className={styles.demoBtn} onClick={play}>
                Complete Quest
              </button>
            )}
            {phase === "done" && (
              <div className={styles.demoConquered}>
                <span className={styles.demoConqueredLabel}>
                  <svg width="15" height="15" aria-hidden="true">
                    <use href="#i-seal" />
                  </svg>
                  Conquered
                </span>
                <button type="button" className={styles.demoReplay} onClick={replay}>
                  Replay
                </button>
              </div>
            )}
          </div>

          {struck && (
            <span className={styles.demoFx} aria-hidden="true">
              <span style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 90% at 30% 50%, rgba(232,211,160,.22), transparent 70%)", animation: "em-glint .46s ease-out forwards" }} />
              <svg viewBox="0 0 400 300" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                <path
                  d="M-20 290L420 10"
                  fill="none"
                  stroke="#f6ecd2"
                  strokeWidth="3"
                  strokeDasharray="420"
                  style={{ animation: "em-slash .5s cubic-bezier(.3,.8,.2,1) both" }}
                />
              </svg>
              <svg
                width="54"
                height="54"
                style={{ position: "absolute", left: "50%", top: "44%", margin: "-27px 0 0 -27px", color: "#f6ecd2", animation: "em-glint .55s ease-out both" }}
              >
                <use href="#i-sigil" />
              </svg>
              {SPARKS.map((s, i) => {
                const sparkStyle: React.CSSProperties & Record<"--dx" | "--dy", string> = {
                  position: "absolute",
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  borderRadius: "50%",
                  background: s.color,
                  animation: `spark-fly ${s.dur}ms ease-out both`,
                  "--dx": `${s.dx}px`,
                  "--dy": `${s.dy}px`,
                };
                return <span key={i} style={sparkStyle} />;
              })}
            </span>
          )}
          {phase === "burst" && <span className={styles.demoFloat}>+27 Runes</span>}
        </div>
      </div>
      <Reveal as="p" delay={240} className={styles.caption}>
        Same habit. Entirely different feeling.
      </Reveal>
      <div aria-live="polite" className="visually-hidden">
        {announce}
      </div>
    </section>
  );
}
