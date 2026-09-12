"use client";

export function FallenModal({ onRiseAgain }: { onRiseAgain: () => void }) {
  return (
    <div role="dialog" aria-modal="true" aria-label="Fallen" className="takeover takeover--fallen">
      <span className="fallen__title">Fallen</span>
      <span className="takeover__body">
        Half your runes lie scattered where you dropped. Complete one quest within a day to reclaim them.
      </span>
      <button type="button" className="modal-submit" onClick={onRiseAgain}>
        Rise Again
      </button>
    </div>
  );
}
