"use client";

import { useEffect } from "react";

export function AscensionModal({ level, onDismiss }: { level: number; onDismiss: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ascension"
      className="takeover takeover--ascend"
      onClick={onDismiss}
    >
      <span aria-hidden="true" className="takeover__rays" />
      <span className="ascend__blackletter">Ascension</span>
      <span className="ascend__level">Level {level}</span>
      <span className="takeover__body">One stat point earned. Health restored. An Ember Flask refilled.</span>
      <span className="takeover__hint">Press anywhere or Esc to continue</span>
    </div>
  );
}
