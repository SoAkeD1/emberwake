import { segments } from "@/lib/game/constants";

export function StatBar({
  label,
  icon,
  color,
  colorLight,
  now,
  max,
  readout,
  hit,
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
}) {
  const segs = segments(now, max);
  return (
    <div className="stat-bar">
      <div className="stat-bar__head">
        <span className="stat-bar__label">
          <svg width="12" height="12" aria-hidden="true" style={{ color }}>
            <use href={`#${icon}`} />
          </svg>
          {label}
        </span>
        <span className="stat-bar__readout">{readout}</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={now}
        aria-valuemin={0}
        aria-valuemax={max}
        className={`stat-bar__track${hit ? " stat-bar__track--hit" : ""}`}
      >
        {segs.map((fill, i) => (
          <span className="stat-bar__seg" key={i}>
            <span
              className="stat-bar__fill"
              style={{ width: `${fill * 100}%`, background: `linear-gradient(180deg, ${colorLight}, ${color})` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
