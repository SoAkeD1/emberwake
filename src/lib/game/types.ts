export type Attribute = "Vigor" | "Mind" | "Endurance" | "Strength" | "Dexterity";

export type QuestType = "vigil" | "oath" | "bounty";
export type Difficulty = "Trivial" | "Standard" | "Hard" | "Legendary";
export type OathStrength = "weak" | "mid" | "strong";

export interface Quest {
  id: string;
  type: QuestType;
  title: string;
  notes: string;
  attr: Attribute;
  diff: Difficulty;
  streak: number;
  meta: string;
  done: boolean;
  strength?: OathStrength;
  vice?: boolean;
}

export interface AttributeState {
  lvl: number;
  pct: number;
}

export interface FloatText {
  text: string;
  color: string;
}

/** The whole game — everything a signed-in player's Character carries. */
export interface GameState {
  held: number;
  lifetime: number;
  displayRunes: number;
  health: number;
  focus: number;
  flasks: number;
  streak: number;
  points: number;
  cache: number;
  ascendLevel: number;
  fallen: boolean;
  hit: number;
  shake: number;
  announce: string;
  attrs: Record<Attribute, AttributeState>;
  quests: Quest[];
  fx: Record<string, boolean>;
  floats: Record<string, FloatText | null>;
}

export interface Ware {
  name: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  slot: string;
  bonus: string;
  price: number;
  icon: string;
  req: number;
}

export interface RelicDef {
  group: "First Steps" | "Bonfires" | "Mastery" | "Treasures" | "Secrets";
  name: string;
  criteria: string;
  icon: string;
  unlockedOn?: string;
  progress: number;
}
