import Image from "next/image";
import { IntroSection } from "./intro-section";
import { CompareSection } from "./compare-section";
import { JourneySection } from "./journey-section";
import { MasterySection } from "./mastery-section";
import { SpoilsSection } from "./spoils-section";
import { StakesSection } from "./stakes-section";
import { CtaSection } from "./cta-section";
import styles from "./about.module.css";

/** Everything below the Gate's hero — the seven-block marketing story. */
export function AboutSection() {
  return (
    <div className={styles.wrap}>
      <Image src="/about-bg.png" alt="" aria-hidden="true" fill className={styles.bgPhoto} />
      <div className={styles.bgScrim} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      <div style={{ position: "relative" }}>
        <IntroSection />
        <CompareSection />
        <JourneySection />
        <MasterySection />
        <SpoilsSection />
        <StakesSection />
        <CtaSection />
      </div>

      <footer className={styles.footer}>EMBERWAKE · ALL ART ORIGINAL · ICONS UNDER CC-BY WHERE CREDITED</footer>
    </div>
  );
}
