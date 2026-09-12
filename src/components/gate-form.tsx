"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <use href="#i-flame" />
    </svg>
  );
}

type Mode = "signup" | "login";

const COPY: Record<Mode, { title: string; sub: string; cta: string; foot: string; footLink: string }> = {
  signup: {
    title: "Swear the First Oath",
    sub: "No soul is turned from the gate.",
    cta: "Begin the Journey",
    foot: "Already awake?",
    footLink: "Awaken",
  },
  login: {
    title: "Awaken",
    sub: "Return to a name already sworn.",
    cta: "Awaken",
    foot: "New to the gate?",
    footLink: "Begin the Journey",
  },
};

/** The Gate's sign-up / log-in panel — real accounts now, via Auth.js + Prisma. */
export function GateForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signup");
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const copy = COPY[mode];

  // Read ?next=/camp (set by the proxy when it redirects a signed-out
  // visitor here) without useSearchParams, which would force this whole
  // page out of static rendering.
  const [nextPath, setNextPath] = useState<string | null>(null);
  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get("next");
    if (!next) return;
    const id = requestAnimationFrame(() => {
      setNextPath(next);
      setMode("login");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("ward") as HTMLInputElement).value;

    setPending(true);
    setNotice(null);
    try {
      if (mode === "signup") {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          setNotice(body?.error ?? "The gate would not have you. Try again.");
          setPending(false);
          return;
        }
      }

      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setNotice(mode === "login" ? "That name and ward don't match any record." : "Sworn, but the gate would not open. Try Awaken instead.");
        setPending(false);
        return;
      }

      router.push(nextPath && nextPath.startsWith("/") ? nextPath : mode === "signup" ? "/onboarding" : "/camp");
      router.refresh();
    } catch {
      setNotice("The gate is unreachable just now. Try again shortly.");
      setPending(false);
    }
  }

  function handleGoogle() {
    setNotice("Google sign-in is not yet connected — this is a preview of the flow.");
  }

  return (
    <div className="panel" id="signup">
      <svg className="panel__filigree" width="34" height="34" aria-hidden="true">
        <use href="#i-fil" />
      </svg>
      <h2 className="panel__title">{copy.title}</h2>
      <p className="panel__sub">{copy.sub}</p>

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
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          minLength={8}
          required
        />

        <button className="btn btn--primary btn--block" type="submit" disabled={pending}>
          {pending ? "…" : copy.cta}
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
        {copy.foot}{" "}
        <a
          href="#signup"
          onClick={(event) => {
            event.preventDefault();
            setNotice(null);
            setMode((m) => (m === "signup" ? "login" : "signup"));
          }}
        >
          {copy.footLink}
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
