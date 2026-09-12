import type { Metadata } from "next";
import { Cinzel, EB_Garamond, Alegreya_Sans, UnifrakturCook } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { IconSprite } from "@/components/icon-sprite";
import { GameProvider } from "@/lib/game/game-context";
import { HudLayoutProvider } from "@/lib/ui/hud-layout-context";
import { SiteNav } from "@/components/site-nav";
import { GameOverlays } from "@/components/game-overlays";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const alegreyaSans = Alegreya_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const unifrakturCook = UnifrakturCook({
  variable: "--font-blackletter",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Emberwake",
  description:
    "A habit tracker for the unyielding. Turn routines into quests, discipline into runes, and streaks into bonfires that refuse to go out.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${ebGaramond.variable} ${alegreyaSans.variable} ${unifrakturCook.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <IconSprite />
        <SessionProvider>
          <GameProvider>
            <HudLayoutProvider>
              <SiteNav />
              {children}
              <GameOverlays />
            </HudLayoutProvider>
          </GameProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
