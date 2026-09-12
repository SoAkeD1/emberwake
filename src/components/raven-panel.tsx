"use client";

import { RAVENS } from "@/lib/game/sample-data";

export function RavenPanel({ onDismissAll }: { onDismissAll: () => void }) {
  return (
    <div className="ravens" role="region" aria-label="Ravens">
      <div className="ravens__head">
        <span className="ravens__title">Ravens</span>
        <button type="button" className="ravens__dismiss" onClick={onDismissAll}>
          Dismiss all
        </button>
      </div>
      {RAVENS.map((r, i) => (
        <div className="ravens__row" key={i}>
          <svg width="16" height="16" aria-hidden="true" style={{ color: r.color }}>
            <use href={`#${r.icon}`} />
          </svg>
          <div>
            <div className="ravens__text">{r.text}</div>
            <div className="ravens__when">{r.when}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
