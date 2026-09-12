// Original icon artwork lifted verbatim from the design handoff
// (docs/design-handoff/Emberwake.dc.html). Rendered once in the root
// layout, referenced everywhere with <svg><use href="#i-name" /></svg>.
export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="i-vigor" viewBox="0 0 24 24">
          <path
            d="M12 20.4s-7.2-4.6-7.2-9.8A4.2 4.2 0 0 1 12 7.7a4.2 4.2 0 0 1 7.2 2.9c0 5.2-7.2 9.8-7.2 9.8z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-mind" viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="8.4" ry="5.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </symbol>
        <symbol id="i-endurance" viewBox="0 0 24 24">
          <path
            d="M7 3.4h10M7 20.6h10M8.4 3.4v2.4l3.6 4.4 3.6-4.4V3.4M8.4 20.6v-2.4l3.6-4.4 3.6 4.4v2.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-strength" viewBox="0 0 24 24">
          <path
            d="M6.4 11V7.6a1.5 1.5 0 0 1 3 0V11M9.4 11V6.2a1.5 1.5 0 0 1 3 0V11M12.4 11V7a1.5 1.5 0 0 1 3 0v4M15.4 11V9.6a1.5 1.5 0 0 1 3 0v5A6 6 0 0 1 12.4 20.6h-1a5 5 0 0 1-5-5V11"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-dexterity" viewBox="0 0 24 24">
          <path
            d="M6 3.4l9.6 13M18 3.4L8.4 16.4M3.6 20.6l3.6-3.6M20.4 20.6l-3.6-3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </symbol>
        <symbol id="i-flask" viewBox="0 0 24 24">
          <path
            d="M9.4 3.4h5.2M10.4 3.4v4.2l-3.6 7.6a3.8 3.8 0 0 0 3.4 5.4h3.6a3.8 3.8 0 0 0 3.4-5.4l-3.6-7.6V3.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-sword" viewBox="0 0 24 24">
          <path
            d="M20.4 3.6l-9 9M14.6 3.6h5.8v5.8M4.6 19.4l3.6-3.6M2.8 21.2l3-.8-2.2-2.2-.8 3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-shield" viewBox="0 0 24 24">
          <path
            d="M12 3.2l8 3v6c0 5-4.4 7.8-8 8.6-3.6-.8-8-3.6-8-8.6v-6l8-3z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-ring" viewBox="0 0 24 24">
          <circle cx="12" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 3l2.4 2.6L12 8.2 9.6 5.6 12 3z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </symbol>
        <symbol id="i-scroll" viewBox="0 0 24 24">
          <path
            d="M5.6 4.6h12.8v14.8H5.6zM8.4 8.6h7.2M8.4 12h7.2M8.4 15.4h4.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-skull" viewBox="0 0 24 24">
          <path
            d="M12 3.2a7 7 0 0 1 7 7v3.2l-1.6 1.6v2.4h-2.2v2.4H8.8v-2.4H6.6v-2.4L5 13.4v-3.2a7 7 0 0 1 7-7z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="9.4" cy="11" r="1.5" fill="currentColor" />
          <circle cx="14.6" cy="11" r="1.5" fill="currentColor" />
        </symbol>
        <symbol id="i-chalice" viewBox="0 0 24 24">
          <path
            d="M6.6 4h10.8l-1 5.4a4.4 4.4 0 0 1-8.8 0L6.6 4zM12 13.8v5.6M8.2 20.4h7.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </symbol>
        <symbol id="i-seal" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 9.2l2.8 2.8L12 14.8 9.2 12 12 9.2z" fill="currentColor" />
        </symbol>
        <symbol id="i-sigil" viewBox="0 0 24 24">
          <path d="M12 2.6L21.4 12 12 21.4 2.6 12 12 2.6z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7.6L16.4 12 12 16.4 7.6 12 12 7.6z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </symbol>
        <symbol id="i-bell" viewBox="0 0 24 24">
          <path
            d="M9 18.2a3 3 0 0 0 6 0M12 3.2a5.2 5.2 0 0 0-5.2 5.2v4.2L4.8 16h14.4l-2-3.4V8.4A5.2 5.2 0 0 0 12 3.2z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
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
        <symbol id="i-search" viewBox="0 0 24 24">
          <circle cx="10.6" cy="10.6" r="6.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M15.4 15.4l4.4 4.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </symbol>
        <symbol id="i-kebab" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.6" fill="currentColor" />
          <circle cx="12" cy="12" r="1.6" fill="currentColor" />
          <circle cx="12" cy="19" r="1.6" fill="currentColor" />
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
      </defs>
    </svg>
  );
}
