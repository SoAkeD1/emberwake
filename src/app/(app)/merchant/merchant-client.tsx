"use client";

import { useState } from "react";
import { RARITY_COLOR } from "@/lib/game/constants";
import { levelFor } from "@/lib/game/constants";
import { FEATURED_WARE_NAMES, WARES } from "@/lib/game/sample-data";
import { useGameActions, useGameState } from "@/lib/game/game-context";
import styles from "./merchant.module.css";

const CATEGORIES = ["Weapons", "Armor", "Shields", "Rings", "Consumables", "Realms", "Titles & Frames"];

export function MerchantClient() {
  const state = useGameState();
  const { spend } = useGameActions();
  const [cat, setCat] = useState(0);
  const level = levelFor(state.lifetime).level;

  const featured = WARES.filter((w) => FEATURED_WARE_NAMES.includes(w.name));

  return (
    <main className={`${styles.main} fx-fadein`}>
      <section className={styles.banner}>
        <div className={styles.bannerGlow} aria-hidden="true" />
        <div className={styles.portrait} aria-hidden="true">
          hooded
          <br />
          merchant
        </div>
        <div className={styles.bannerBody}>
          <h1 className={styles.bannerTitle}>The Wandering Merchant</h1>
          <p className={styles.bannerQuote}>“I keep no ledger of where these came from. Only of what they cost.”</p>
        </div>
        <div className={styles.bannerRunes}>
          <div className={styles.bannerRunesValue}>{state.displayRunes.toLocaleString()}</div>
          <div className={styles.bannerRunesLabel}>Runes Held</div>
        </div>
      </section>

      <h2 className={styles.sectionTitle}>Featured Wares · rotates at first light</h2>
      <div className={styles.featuredGrid}>
        {featured.map((w) => {
          const poor = state.held < w.price;
          const color = RARITY_COLOR[w.rarity];
          return (
            <div className={styles.featuredCard} key={w.name} style={{ border: `1px solid ${color}` }}>
              <svg width="34" height="34" aria-hidden="true" style={{ flex: "none", color }}>
                <use href={`#${w.icon}`} />
              </svg>
              <div className={styles.featuredInfo}>
                <div className={styles.featuredName}>{w.name}</div>
                <div className={styles.featuredMeta} style={{ color }}>
                  {w.rarity} · {w.slot}
                </div>
                <div className={styles.featuredBonus}>{w.bonus}</div>
              </div>
              <button type="button" className={styles.buyBtn} disabled={poor} onClick={() => spend(w.price, w.name)}>
                {poor ? "Not enough" : `${w.price.toLocaleString()} runes`}
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.shopGrid}>
        <nav aria-label="Ware categories" className={styles.catNav}>
          <h2 className={styles.catNavTitle}>Stall</h2>
          <div className={styles.catList}>
            {CATEGORIES.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-pressed={cat === i}
                className={`${styles.catItem}${cat === i ? ` ${styles.catItemActive}` : ""}`}
                onClick={() => setCat(i)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className={styles.catFoot}>
            <span>Sort · Rarity ▾</span>
            <span>☐ Hide locked</span>
          </div>
        </nav>

        <div className={styles.waresGrid}>
          {WARES.map((w) => {
            const locked = level < w.req;
            const poor = state.held < w.price;
            const off = locked || poor;
            const color = RARITY_COLOR[w.rarity];
            return (
              <div className={styles.wareCard} key={w.name} style={{ border: `1px solid ${color}`, opacity: locked ? 0.5 : 1 }}>
                <div className={styles.wareTop}>
                  <svg width="30" height="30" aria-hidden="true" style={{ color }}>
                    <use href={`#${w.icon}`} />
                  </svg>
                  <span className={styles.wareRarity} style={{ color, borderColor: color }}>
                    {w.rarity}
                  </span>
                </div>
                <div className={styles.wareName}>{w.name}</div>
                <div className={styles.wareBonus}>{w.bonus}</div>
                <div className={styles.wareReq} style={{ color: locked ? "var(--health)" : "var(--gold-dim)" }}>
                  {locked ? `Requires level ${w.req}` : `Level ${w.req} · ${w.slot}`}
                </div>
                <button type="button" className={styles.wareBuy} disabled={off} onClick={() => spend(w.price, w.name)}>
                  {locked ? "Sealed" : poor ? "Not enough runes" : `${w.price.toLocaleString()} runes`}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
