"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS: { href: string; label: string }[] = [
  { href: "/onboarding", label: "First Steps" },
  { href: "/camp", label: "The Camp" },
  { href: "/chronicle", label: "Chronicle" },
  { href: "/merchant", label: "Merchant" },
  { href: "/relics", label: "Relics" },
  { href: "/moments", label: "Moments" },
];

/** The sticky top bar every screen shares: wordmark + screen nav. */
export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="nav">
      <Link href="/" className="nav__wordmark">
        Emberwake
      </Link>
      <span className="nav__sep" aria-hidden="true" />
      <nav aria-label="Screens" className="nav__links">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`nav__link${active ? " nav__link--active" : ""}`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <span className="nav__spacer" />
    </header>
  );
}
