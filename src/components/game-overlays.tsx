"use client";

import { AscensionModal } from "@/components/ascension-modal";
import { FallenModal } from "@/components/fallen-modal";
import { useGameActions, useGameState } from "@/lib/game/game-context";

/**
 * Ascension / Fallen are global takeovers in the design handoff — they
 * can interrupt any screen, The Gate included — so they're mounted
 * once at the root rather than inside a single route.
 */
export function GameOverlays() {
  const state = useGameState();
  const { dismissAscend, riseAgain } = useGameActions();

  return (
    <>
      {state.ascendLevel > 0 && <AscensionModal level={state.ascendLevel} onDismiss={dismissAscend} />}
      {state.fallen && <FallenModal onRiseAgain={riseAgain} />}
      <div aria-live="polite" aria-atomic="true" className="visually-hidden">
        {state.announce}
      </div>
    </>
  );
}
