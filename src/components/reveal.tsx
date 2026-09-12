"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface RevealProps {
  children?: ReactNode;
  delay?: number;
  animation?: string;
  as?: string;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}

/**
 * Scroll-reveal wrapper: fades/rises children in once, the first time
 * they cross ~20% into the viewport (matching the design handoff's
 * IntersectionObserver recipe). Reveals instantly if already on
 * screen at mount, and a passive scroll/resize sweep catches anything
 * a fast scroll skipped past the observer. Never replays.
 *
 * `as` is a fully polymorphic tag name (div, h2, p, circle, ...);
 * TypeScript's JSX prop-union resolution for that shape blows up
 * ("union type too complex"), so the tag is cast to a loose
 * `ElementType` right before use — that keeps this a normal JSX
 * element (real `ref` semantics, not a raw createElement call) while
 * skipping the combinatorial prop-type check.
 */
export function Reveal({ children, delay = 0, animation, as = "div", className, style, ...rest }: RevealProps) {
  const [revealed, setRevealed] = useState(false);
  const elRef = useRef<Element | null>(null);
  const Tag = as as ElementType;

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      const id = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(id);
    }

    const vh = () => window.innerHeight || 800;
    const rect = el.getBoundingClientRect();
    if (rect.top < vh() * 0.92 && rect.bottom > 0) {
      const id = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(id);
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setRevealed(true);
      io.disconnect();
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.intersectionRatio >= 0.2 && reveal()),
      { threshold: [0, 0.2, 0.5] }
    );
    const sweep = () => {
      if (el.getBoundingClientRect().top < vh() * 0.92) reveal();
    };
    io.observe(el);
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("resize", sweep, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", sweep);
      window.removeEventListener("resize", sweep);
    };
  }, []);

  return (
    <Tag
      ref={elRef}
      className={className}
      {...rest}
      style={{
        ...style,
        opacity: revealed ? style?.opacity : 0,
        animation: revealed ? animation || "em-rise .7s cubic-bezier(.2,.7,.3,1) both" : undefined,
        animationDelay: revealed ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </Tag>
  );
}
