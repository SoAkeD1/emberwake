import { ATTRIBUTES } from "@/lib/game/constants";
import type { Attribute } from "@/lib/game/types";

type ClassName = "Knight" | "Scholar" | "Ranger" | "Pilgrim" | "Sentinel";
type Frame = "shield" | "circle" | "diamond" | "oval" | "hexagon";

const CLASS_EMBLEMS: Record<ClassName, { attr: Attribute; icon: string; frame: Frame }> = {
  Knight: { attr: "Strength", icon: "i-sword", frame: "shield" },
  Scholar: { attr: "Mind", icon: "i-candle", frame: "circle" },
  Ranger: { attr: "Dexterity", icon: "i-bow", frame: "diamond" },
  Pilgrim: { attr: "Vigor", icon: "i-staff", frame: "oval" },
  Sentinel: { attr: "Endurance", icon: "i-shield", frame: "hexagon" },
};

const EMBERS = [
  { left: "22%", bottom: "6%", size: 2, delay: "0s", dur: "7s" },
  { left: "72%", bottom: "10%", size: 2, delay: "2.4s", dur: "8.5s" },
  { left: "50%", bottom: "2%", size: 1.6, delay: "4.5s", dur: "6.5s" },
];

/**
 * Original heraldic-crest artwork standing in for a character portrait —
 * a glowing frame (shaped per class) around that class's signature item,
 * in its governing attribute's colour. No photographic art, no
 * resemblance to any existing game's character designs.
 */
export function ClassEmblem({ name, selected }: { name: ClassName; selected?: boolean }) {
  const def = CLASS_EMBLEMS[name];
  const color = ATTRIBUTES[def.attr].color;
  const gradId = `emblem-glow-${name}`;
  const ringColor = selected ? "var(--gold-bright)" : "var(--gold-dim)";

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id={gradId} cx="50%" cy="40%" r="62%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="55%" stopColor={color} stopOpacity="0.14" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>

      {EMBERS.map((e, i) => (
        <circle
          key={i}
          cx={e.left}
          cy={e.bottom}
          r={e.size}
          fill={color}
          opacity="0.7"
          style={{ transformOrigin: "center", animation: `em-ember ${e.dur} linear infinite`, animationDelay: e.delay }}
        />
      ))}

      <Frame shape={def.frame} gradId={gradId} ringColor={ringColor} />

      <g transform="translate(50 50) scale(1.7)" fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
        <use href={`#${def.icon}`} x={-12} y={-12} width={24} height={24} />
      </g>
    </svg>
  );
}

function Frame({ shape, gradId, ringColor }: { shape: Frame; gradId: string; ringColor: string }) {
  const common = { fill: `url(#${gradId})`, stroke: ringColor, strokeWidth: 1.3 };
  switch (shape) {
    case "shield":
      return <path d="M50 5 L91 21 V52 C91 77 70 90 50 98 C30 90 9 77 9 52 V21 Z" {...common} />;
    case "diamond":
      return <path d="M50 3 L95 50 L50 97 L5 50 Z" {...common} />;
    case "hexagon":
      return <path d="M50 3 L88 24 V72 L50 97 L12 72 V24 Z" {...common} />;
    case "oval":
      return <ellipse cx={50} cy={50} rx={33} ry={46} {...common} />;
    case "circle":
    default:
      return <circle cx={50} cy={50} r={43} {...common} />;
  }
}
