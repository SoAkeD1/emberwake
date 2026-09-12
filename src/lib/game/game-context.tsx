"use client";

import { createContext, useCallback, useContext, useMemo, useReducer, useRef } from "react";
import type { Attribute, GameState, Quest } from "./types";
import { BASE_RUNES, levelFor } from "./constants";
import { SAMPLE_QUESTS } from "./sample-data";

/**
 * Client-side game state — stands in for the real backend until auth,
 * the quest API, and the day-rollover job exist (see docs/design-spec.md
 * section 3 and 9). Every rule here (rune math, leveling, streak
 * multiplier, Fallen) matches that spec and the design handoff exactly,
 * so swapping this provider for real API calls later shouldn't change
 * how anything feels — only where the numbers come from.
 */

const INITIAL_STATE: GameState = {
  held: 1284,
  lifetime: 4200,
  displayRunes: 1284,
  health: 41,
  focus: 18,
  flasks: 2,
  streak: 12,
  points: 1,
  cache: 0,
  ascendLevel: 0,
  fallen: false,
  hit: 0,
  shake: 0,
  announce: "",
  attrs: {
    Vigor: { lvl: 7, pct: 62 },
    Mind: { lvl: 9, pct: 38 },
    Endurance: { lvl: 5, pct: 74 },
    Strength: { lvl: 6, pct: 21 },
    Dexterity: { lvl: 4, pct: 55 },
  },
  quests: SAMPLE_QUESTS,
  fx: {},
  floats: {},
};

type Action =
  | { type: "START_COMPLETE"; id: string; runes: number; attr: Attribute }
  | { type: "FINISH_COMPLETE"; id: string }
  | { type: "MARK_STRONG"; id: string }
  | { type: "CLEAR_FLOAT"; id: string }
  | { type: "ASCEND"; level: number }
  | { type: "DISMISS_ASCEND" }
  | { type: "VICE"; id: string; dmg: number }
  | { type: "FALLEN" }
  | { type: "RISE_AGAIN" }
  | { type: "SPEND"; amount: number; label: string }
  | { type: "ALLOCATE" }
  | { type: "SET_DISPLAY_RUNES"; value: number }
  | { type: "FORGE_QUEST"; quest: Quest };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START_COMPLETE": {
      const a = state.attrs[action.attr];
      let pct = a.pct + 14;
      let lvl = a.lvl;
      if (pct >= 100) {
        pct -= 100;
        lvl += 1;
      }
      return {
        ...state,
        fx: { ...state.fx, [action.id]: true },
        floats: { ...state.floats, [action.id]: { text: `+${action.runes} RUNES`, color: "#e8d3a0" } },
        shake: state.shake + 1,
        held: state.held + action.runes,
        lifetime: state.lifetime + action.runes,
        attrs: { ...state.attrs, [action.attr]: { lvl, pct } },
        cache: 0,
        health: Math.min(50, state.health + 1),
        focus: Math.min(30, state.focus + 2),
        announce: `Quest complete. ${action.runes} runes earned. ${action.attr} increased.`,
      };
    }
    case "FINISH_COMPLETE":
      return {
        ...state,
        fx: { ...state.fx, [action.id]: false },
        quests: state.quests.map((q) =>
          q.id === action.id ? { ...q, done: true, streak: q.streak + 1, meta: "Conquered" } : q
        ),
      };
    case "MARK_STRONG":
      return {
        ...state,
        quests: state.quests.map((q) =>
          q.id === action.id ? { ...q, streak: q.streak + 1, strength: "strong", meta: "Strong" } : q
        ),
      };
    case "CLEAR_FLOAT":
      return { ...state, floats: { ...state.floats, [action.id]: null } };
    case "ASCEND":
      return {
        ...state,
        ascendLevel: action.level,
        health: 50,
        flasks: Math.min(3, state.flasks + 1),
        points: state.points + 1,
      };
    case "DISMISS_ASCEND":
      return { ...state, ascendLevel: 0 };
    case "VICE":
      return {
        ...state,
        health: Math.max(0, state.health - action.dmg),
        hit: state.hit + 1,
        shake: state.shake + 1,
        floats: { ...state.floats, [action.id]: { text: `−${action.dmg} HEALTH`, color: "#c4676a" } },
        announce: `Vice recorded. ${action.dmg} health lost.`,
      };
    case "FALLEN":
      return { ...state, fallen: true };
    case "RISE_AGAIN": {
      const cache = Math.floor(state.held / 2);
      const held = state.held - cache;
      return { ...state, fallen: false, health: 50, cache, held, displayRunes: held, announce: "Risen. Half your runes lie in a cache." };
    }
    case "SPEND":
      return { ...state, held: state.held - action.amount, announce: `${action.label} purchased for ${action.amount} runes.` };
    case "ALLOCATE":
      return state.points > 0 ? { ...state, points: state.points - 1, announce: "Stat point allocated." } : state;
    case "SET_DISPLAY_RUNES":
      return { ...state, displayRunes: action.value };
    case "FORGE_QUEST":
      return { ...state, quests: [action.quest, ...state.quests], announce: "Quest forged." };
    default:
      return state;
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface GameActions {
  complete: (id: string) => void;
  virtue: (id: string) => void;
  vice: (id: string) => void;
  spend: (amount: number, label: string) => boolean;
  allocate: () => void;
  dismissAscend: () => void;
  riseAgain: () => void;
  forgeQuest: (quest: Omit<Quest, "id" | "streak" | "done" | "meta">) => void;
}

const GameStateContext = createContext<GameState | null>(null);
const GameActionsContext = createContext<GameActions | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  const rollRunesTo = useCallback((from: number, to: number) => {
    if (prefersReducedMotion()) {
      dispatch({ type: "SET_DISPLAY_RUNES", value: to });
      return;
    }
    const t0 = performance.now();
    const dur = 620;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      dispatch({ type: "SET_DISPLAY_RUNES", value: Math.round(from + (to - from) * eased) });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, []);

  const complete = useCallback(
    (id: string) => {
      const quest = state.quests.find((q) => q.id === id);
      if (!quest || quest.done || state.fx[id]) return;
      const calm = prefersReducedMotion();
      const mult = 1 + 0.02 * Math.min(quest.streak, 30);
      const runes = Math.round(BASE_RUNES[quest.diff] * mult * (1 + Math.random() * 0.15));
      const beforeLevel = levelFor(state.lifetime).level;
      const afterLevel = levelFor(state.lifetime + runes).level;
      const heldAfter = state.held + runes;

      dispatch({ type: "START_COMPLETE", id, runes, attr: quest.attr });
      rollRunesTo(state.held, heldAfter);
      later(() => dispatch({ type: "FINISH_COMPLETE", id }), calm ? 160 : 520);
      later(() => dispatch({ type: "CLEAR_FLOAT", id }), 1000);
      if (afterLevel > beforeLevel) {
        later(() => dispatch({ type: "ASCEND", level: afterLevel }), calm ? 220 : 620);
      }
    },
    [state.quests, state.fx, state.lifetime, state.held, later, rollRunesTo]
  );

  const virtue = useCallback(
    (id: string) => {
      dispatch({ type: "MARK_STRONG", id });
      complete(id);
    },
    [complete]
  );

  const vice = useCallback(
    (id: string) => {
      const dmg = 6;
      const nextHealth = Math.max(0, state.health - dmg);
      dispatch({ type: "VICE", id, dmg });
      later(() => dispatch({ type: "CLEAR_FLOAT", id }), 1000);
      if (nextHealth === 0) later(() => dispatch({ type: "FALLEN" }), 700);
    },
    [state.health, later]
  );

  const spend = useCallback(
    (amount: number, label: string) => {
      if (amount > state.held) return false;
      dispatch({ type: "SPEND", amount, label });
      rollRunesTo(state.held, state.held - amount);
      return true;
    },
    [state.held, rollRunesTo]
  );

  const allocate = useCallback(() => dispatch({ type: "ALLOCATE" }), []);
  const dismissAscend = useCallback(() => dispatch({ type: "DISMISS_ASCEND" }), []);
  const riseAgain = useCallback(() => dispatch({ type: "RISE_AGAIN" }), []);
  const forgeQuest = useCallback((quest: Omit<Quest, "id" | "streak" | "done" | "meta">) => {
    dispatch({
      type: "FORGE_QUEST",
      quest: { ...quest, id: `q${Date.now()}`, streak: 0, done: false, meta: quest.type === "bounty" ? "Scheduled" : "Due today" },
    });
  }, []);

  const actions = useMemo<GameActions>(
    () => ({ complete, virtue, vice, spend, allocate, dismissAscend, riseAgain, forgeQuest }),
    [complete, virtue, vice, spend, allocate, dismissAscend, riseAgain, forgeQuest]
  );

  return (
    <GameStateContext.Provider value={state}>
      <GameActionsContext.Provider value={actions}>{children}</GameActionsContext.Provider>
    </GameStateContext.Provider>
  );
}

export function useGameState(): GameState {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState must be used within GameProvider");
  return ctx;
}

export function useGameActions(): GameActions {
  const ctx = useContext(GameActionsContext);
  if (!ctx) throw new Error("useGameActions must be used within GameProvider");
  return ctx;
}
