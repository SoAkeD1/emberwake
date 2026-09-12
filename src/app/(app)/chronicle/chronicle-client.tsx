"use client";

import { useMemo, useState } from "react";
import { ATTRIBUTES } from "@/lib/game/constants";
import { buildHeatmap, CHRONICLE_LOG, CHRONICLE_STATS, HEAT_COLORS, RUNE_WEEKS } from "@/lib/game/sample-data";
import styles from "./chronicle.module.css";

const LOG_FILTERS = ["All", "Virtues", "Vices"];

export function ChronicleClient() {
  const [filter, setFilter] = useState(0);
  const heat = useMemo(() => buildHeatmap(), []);
  const rwMax = Math.max(...RUNE_WEEKS);

  const rows = CHRONICLE_LOG.filter((r) => filter === 0 || (filter === 1 ? r.good : !r.good));

  return (
    <main className={`${styles.main} fx-fadein`}>
      <h1 className="page-heading">The Chronicle</h1>
      <p className="page-lede">Every fire you have lit, and every night you let one die.</p>

      <div className={styles.statGrid}>
        {CHRONICLE_STATS.map((s) => (
          <div className={styles.statTile} key={s.label}>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <section className={styles.heatSection}>
        <div className={styles.heatHead}>
          <h2 className={styles.panelTitle} style={{ margin: 0 }}>
            Bonfires · Last Half-Year
          </h2>
          <div className={styles.legend}>
            <span>Cold</span>
            {HEAT_COLORS.map((c) => (
              <span className={styles.legendSwatch} style={{ background: c }} key={c} />
            ))}
            <span>Blazing</span>
          </div>
        </div>
        <div role="img" aria-label="Bonfire calendar heatmap for the last twenty-six weeks" className={styles.heatmap}>
          {heat.map((week, wi) => (
            <span className={styles.heatWeek} key={wi}>
              {week.map((cell, ci) => (
                <span className={styles.heatCell} style={{ background: HEAT_COLORS[cell] }} key={ci} />
              ))}
            </span>
          ))}
        </div>
      </section>

      <div className={styles.twoCol}>
        <section className={styles.panel}>
          <h2 className={styles.panelTitle}>Runes Earned · By Week</h2>
          <div role="img" aria-label="Runes earned per week, last twelve weeks" className={styles.chart}>
            {RUNE_WEEKS.map((value, i) => {
              const h = Math.round((value / rwMax) * 82);
              const top = value === rwMax ? "#e89a3c" : "#c9aa71";
              const bottom = value === rwMax ? "#b8691f" : "#6b5836";
              return (
                <span className={styles.chartBar} key={i}>
                  <span className={styles.chartValue}>{value}</span>
                  <span className={styles.chartFill} style={{ height: `${h}%`, background: `linear-gradient(180deg, ${top}, ${bottom})` }} />
                  <span className={styles.chartWeek}>W{i + 1}</span>
                </span>
              );
            })}
          </div>
        </section>

        <section className={styles.panel}>
          <div className={styles.logHead}>
            <h2 className={styles.panelTitle} style={{ margin: 0 }}>
              The Log
            </h2>
            <div className={styles.logFilters}>
              {LOG_FILTERS.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  aria-pressed={filter === i}
                  className={`${styles.logFilter}${filter === i ? ` ${styles.logFilterActive}` : ""}`}
                  onClick={() => setFilter(i)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.logRows}>
            {rows.map((r, i) => {
              const meta = ATTRIBUTES[r.attr as keyof typeof ATTRIBUTES];
              return (
                <div className={styles.logRow} key={i}>
                  <svg width="17" height="17" aria-hidden="true" style={{ flex: "none", color: meta.color }}>
                    <use href={`#${meta.icon}`} />
                  </svg>
                  <span className={styles.logTitle}>{r.title}</span>
                  <span className={styles.logWhen}>{r.when}</span>
                  <span className={styles.logAmount} style={{ color: r.good ? "var(--gold)" : "#c4676a" }}>
                    {r.amount}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
