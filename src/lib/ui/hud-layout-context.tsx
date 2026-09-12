"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type HudLayout = "top" | "rail" | "float";

const HudLayoutContext = createContext<{
  hud: HudLayout;
  setHud: (h: HudLayout) => void;
} | null>(null);

/**
 * Which of the Camp's three HUD arrangements (top bar / left rail /
 * floating pill) is active. Lives above the nav so the nav's toggle
 * (shown only on /camp) and the Camp screen itself share one value.
 */
export function HudLayoutProvider({ children }: { children: ReactNode }) {
  const [hud, setHud] = useState<HudLayout>("top");
  return <HudLayoutContext.Provider value={{ hud, setHud }}>{children}</HudLayoutContext.Provider>;
}

export function useHudLayout() {
  const ctx = useContext(HudLayoutContext);
  if (!ctx) throw new Error("useHudLayout must be used within HudLayoutProvider");
  return ctx;
}
