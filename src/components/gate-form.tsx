"use client";

import { useState, type FormEvent } from "react";

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <use href="#i-flame" />
    </svg>
  );
}

/**
 * The Gate's sign-up panel. No backend exists yet, so submitting is
 * validated for real but only ever reports that honestly — it never
 * pretends to create an account.
 */
export function GateForm() {
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setNotice("The Camp is still being built — the road beyond the gate is not yet forged.");
  }

  function handleGoogle() {
    setNotice("Google sign-in is not yet connected — this is a preview of the flow.");
  }

  return (
    <div className="panel" id="signup">
      <svg className="panel__filigree" width="34" height="34" aria-hidden="true">
        <use href="#i-fil" />
      </svg>
      <h2 className="panel__title">Swear the First Oath</h2>
      <p className="panel__sub">No soul is turned from the gate.</p>

      <form id="oath-form" noValidate onSubmit={handleSubmit}>
        <label className="field-label" htmlFor="oath-email">
          Name of record
        </label>
        <input
          className="field-input"
          id="oath-email"
          name="email"
          type="email"
          placeholder="wanderer@keep.realm"
          autoComplete="email"
          required
        />

        <label className="field-label" htmlFor="oath-ward">
          Ward
        </label>
        <input
          className="field-input"
          id="oath-ward"
          name="ward"
          type="password"
          placeholder="••••••••••"
          autoComplete="new-password"
          minLength={8}
          required
        />

        <button className="btn btn--primary btn--block" type="submit">
          Begin the Journey
        </button>
      </form>

      <div className="rule-or" aria-hidden="true">
        <span />
        <span className="rule-or__label">OR</span>
        <span />
      </div>
      <button className="btn--oauth" type="button" onClick={handleGoogle}>
        Continue with Google
      </button>

      <p className="panel__foot">
        Already awake?{" "}
        <a
          href="#oath-ward"
          onClick={(event) => {
            event.preventDefault();
            document.getElementById("oath-ward")?.focus();
          }}
        >
          Awaken
        </a>
      </p>
      <p className="notice" role="status" aria-live="polite">
        {notice && (
          <>
            <FlameIcon />
            {notice}
          </>
        )}
      </p>
    </div>
  );
}
