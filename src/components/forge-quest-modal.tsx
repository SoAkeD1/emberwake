"use client";

import { useEffect, useState } from "react";
import { ATTRIBUTES, BASE_RUNES } from "@/lib/game/constants";
import { useGameActions } from "@/lib/game/game-context";
import type { Attribute, Difficulty, QuestType } from "@/lib/game/types";

const KINDS: { value: QuestType; label: string }[] = [
  { value: "vigil", label: "Vigil" },
  { value: "oath", label: "Oath" },
  { value: "bounty", label: "Bounty" },
];
const DIFFS: Difficulty[] = ["Trivial", "Standard", "Hard", "Legendary"];
const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];
const WEEKDAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function ForgeQuestModal({ onClose }: { onClose: () => void }) {
  const { forgeQuest } = useGameActions();
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [kind, setKind] = useState<QuestType>("vigil");
  const [attr, setAttr] = useState<Attribute>("Vigor");
  const [diff, setDiff] = useState<Difficulty>("Standard");
  const [days, setDays] = useState<boolean[]>([true, true, true, true, true, false, false]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function submit() {
    if (!title.trim()) {
      setError(true);
      return;
    }
    forgeQuest({
      type: kind,
      title: title.trim(),
      notes: notes.trim(),
      attr,
      diff,
    });
    onClose();
  }

  return (
    <div className="modal-scrim">
      <div role="dialog" aria-modal="true" aria-label="Forge Quest" className="modal-panel ornate ornate--deep">
        <svg className="modal-panel__filigree" width="34" height="34" aria-hidden="true">
          <use href="#i-fil" />
        </svg>
        <h2 className="modal-title">Forge Quest</h2>
        <p className="modal-sub">Name the thing you mean to conquer.</p>

        <label htmlFor="fq-title" className="form-label">
          Title
        </label>
        <input
          id="fq-title"
          type="text"
          aria-describedby={error ? "fq-err" : undefined}
          placeholder="Rise before the sun"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(false);
          }}
          className="field-input"
          style={{ marginBottom: error ? 8 : 20, borderColor: error ? "var(--health)" : undefined }}
        />
        {error && (
          <p id="fq-err" style={{ margin: "0 0 20px", fontSize: 15, fontStyle: "italic", color: "#c4676a" }}>
            A quest must bear a name.
          </p>
        )}

        <label htmlFor="fq-notes" className="form-label">
          Notes
        </label>
        <textarea
          id="fq-notes"
          rows={2}
          placeholder="Boots by the door the night before."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="field-textarea"
          style={{ marginBottom: 22 }}
        />

        <div className="form-row">
          <div>
            <span className="form-label">Kind</span>
            <div role="group" aria-label="Quest kind" className="segmented">
              {KINDS.map((k) => (
                <button
                  key={k.value}
                  type="button"
                  aria-pressed={kind === k.value}
                  onClick={() => setKind(k.value)}
                >
                  {k.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="form-label">Path</span>
            <div role="group" aria-label="Attribute" className="attr-picker">
              {(Object.keys(ATTRIBUTES) as Attribute[]).map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-label={name}
                  aria-pressed={attr === name}
                  onClick={() => setAttr(name)}
                >
                  <svg width="19" height="19" aria-hidden="true">
                    <use href={`#${ATTRIBUTES[name].icon}`} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        <span className="form-label">Difficulty</span>
        <div role="group" aria-label="Difficulty" className="diff-picker">
          {DIFFS.map((d) => (
            <button key={d} type="button" aria-pressed={diff === d} onClick={() => setDiff(d)}>
              <span>{d}</span>
              <span>{BASE_RUNES[d]} runes</span>
            </button>
          ))}
        </div>

        {kind === "vigil" && (
          <>
            <span className="form-label">Vigil schedule</span>
            <div className="weekday-picker">
              {WEEKDAYS.map((label, i) => (
                <button
                  key={i}
                  type="button"
                  aria-pressed={days[i]}
                  aria-label={WEEKDAY_NAMES[i]}
                  onClick={() => setDays((d) => d.map((v, idx) => (idx === i ? !v : v)))}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="modal-footer" />
        <div className="modal-actions">
          <button type="button" className="modal-cancel" onClick={onClose}>
            Abandon
          </button>
          <button type="button" className="modal-submit" onClick={submit}>
            Forge
          </button>
        </div>
      </div>
    </div>
  );
}
