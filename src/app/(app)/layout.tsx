"use client";

import { SiteNav } from "@/components/site-nav";
import { AscensionModal } from "@/components/ascension-modal";
import { FallenModal } from "@/components/fallen-modal";
import { useGameActions, useGameState } from "@/lib/game/game-context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const state = useGameState();
  const { dismissAscend, riseAgain } = useGameActions();

  return (
    <>
      <SiteNav />
      {children}
      {state.ascendLevel > 0 && <AscensionModal level={state.ascendLevel} onDismiss={dismissAscend} />}
      {state.fallen && <FallenModal onRiseAgain={riseAgain} />}
      <div aria-live="polite" aria-atomic="true" className="visually-hidden">
        {state.announce}
      </div>
    </>
  );
}
