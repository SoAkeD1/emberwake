import Image from "next/image";
import { GateForm } from "@/components/gate-form";
import { AboutSection } from "@/components/about/about-section";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#signup">
        Skip to sign up
      </a>

      <header className="nav">
        <span className="nav__wordmark">Emberwake</span>
        <span className="nav__spacer" />
        <a className="nav__link" href="#signup">
          Awaken
        </a>
        <a className="nav__cta" href="#signup">
          Begin the Journey
        </a>
      </header>

      <main>
        <section className="hero" aria-label="Emberwake">
          <Image
            className="hero__photo"
            src="/hero-bg.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__fog hero__fog--a" aria-hidden="true" />
          <div className="hero__fog hero__fog--b" aria-hidden="true" />
          <div className="hero__scrim-h" aria-hidden="true" />
          <div className="hero__scrim-v" aria-hidden="true" />

          <div className="hero__row">
            <div className="hero__copy">
              <p className="eyebrow">A habit tracker for the unyielding</p>
              <h1 className="hero__title">Emberwake</h1>
              <div className="rule-sigil" aria-hidden="true">
                <span />
                <svg width="11" height="11">
                  <use href="#i-sigil" />
                </svg>
                <span />
              </div>
              <p className="hero__lore">Every habit is a battle. Every day, a bonfire.</p>
              <div className="hero__actions">
                <a className="btn btn--primary" href="#signup">
                  Begin the Journey
                </a>
                <a className="btn btn--ghost" href="#signup">
                  Awaken
                </a>
              </div>
            </div>

            <GateForm />
          </div>
        </section>

        <AboutSection />
      </main>
    </>
  );
}
