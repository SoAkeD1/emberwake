// Original icon artwork lifted verbatim from the design handoff
// (docs/design-handoff/Emberwake.dc.html). Rendered once, referenced
// everywhere else with <svg><use href="#i-name" /></svg>.
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="i-sigil" viewBox="0 0 24 24">
          <path d="M12 2.6L21.4 12 12 21.4 2.6 12 12 2.6z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7.6L16.4 12 12 16.4 7.6 12 12 7.6z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </symbol>
        <symbol id="i-fil" viewBox="0 0 40 40">
          <path
            d="M0 14C0 6 6 0 14 0M0 20C0 9 9 0 20 0M6 6l4 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M13 5l2.2 2.2L13 9.4 10.8 7.2 13 5z" fill="currentColor" opacity=".8" />
        </symbol>
        <symbol id="i-flame" viewBox="0 0 24 24">
          <path
            d="M12 2.6s5.4 5 5.4 9.6a5.4 5.4 0 0 1-10.8 0c0-2.2 1.2-3.4 2.4-4.4 0 2.2 1 3.2 2 3.2 0-3.4 1-6.4 1-8.4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </symbol>
      </defs>
    </svg>
  );
}
