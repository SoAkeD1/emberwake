import { segments } from "@/lib/game/constants";

const VARIANTS = {
  top: { icon: 12, labelSize: 10, labelTrack: "0.22em", readoutSize: 12, trackHeight: 9, endCaps: true },
  rail: { icon: 11, labelSize: 9.5, labelTrack: "0.2em", readoutSize: 11, trackHeight: 8, endCaps: false },
  float: { icon: 10, labelSize: 9, labelTrack: "0.18em", readoutSize: 10.5, trackHeight: 7, endCaps: false },
} as const;

export function StatBar({
  label,
  icon,
  color,
  colorLight,
  now,
  max,
  readout,
  hit,
  variant = "top",
}: {
  label: string;
  icon: string;
  color: string;
  colorLight: string;
  now: number;
  max: number;
  readout: string;
  /** true while a hit-flash should play (health damage this render) */
  hit?: boolean;
  /** The three HUD layouts each size this bar a little differently. */
  variant?: keyof typeof VARIANTS;
}) {
  const segs = segments(now, max);
  const v = VARIANTS[variant];
  return (
    <div className="stat-bar">
      <div className="stat-bar__head">
        <span className="stat-bar__label" style={{ fontSize: v.labelSize, letterSpacing: v.labelTrack }}>
          <svg width={v.icon} height={v.icon} aria-hidden="true" style={{ color }}>
            <use href={`#${icon}`} />
          </svg>
          {label}
        </span>
        <span className="stat-bar__readout" style={{ fontSize: v.readoutSize }}>
          {readout}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={now}
        aria-valuemin={0}
        aria-valuemax={max}
        className="stat-bar__row"
      >
        {v.endCaps && (
          <span aria-hidden="true" className="stat-bar__pip stat-bar__pip--left" style={{ background: color }} />
        )}
        <span
          className={`stat-bar__track${hit ? " stat-bar__track--hit" : ""}`}
          style={{ height: v.trackHeight }}
        >
          {segs.map((fill, i) => (
            <span className="stat-bar__seg" key={i}>
              <span
                className="stat-bar__fill"
                style={{ width: `${fill * 100}%`, background: `linear-gradient(180deg, ${colorLight}, ${color})` }}
              />
            </span>
          ))}
        </span>
        {v.endCaps && (
          <span aria-hidden="true" className="stat-bar__pip stat-bar__pip--right" style={{ background: color }} />
        )}
      </div>
    </div>
  );
}
