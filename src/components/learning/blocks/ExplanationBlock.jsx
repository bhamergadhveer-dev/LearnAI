import { useState } from "react";
import { Sparkles } from "lucide-react";
import BlockShell from "./BlockShell";

// Alternate explanations the AI could return — mocked for now.
const MODES = {
  Simpler: "Think of it as a task that keeps handing a smaller copy of itself to a helper, until the copy is so small the helper just answers immediately.",
  "Real-life example":
    "Like searching a stack of boxes: open a box, and if it contains another box, repeat the same search inside it until you find the item.",
  "Visual explanation":
    "Picture a staircase going down: each step is one call. You keep stepping down until the ground (base case), then walk back up carrying the answer.",
  "Step-by-step":
    "1. Check the base case. 2. If not met, reduce the problem. 3. Call the function on the smaller problem. 4. Combine the returned value with the current step.",
};

/**
 * Main reading section.
 * "Explain differently" is a signature feature: it swaps the explanation for an
 * alternative rendering of the same idea.
 */
export default function ExplanationBlock({ section }) {
  const [mode, setMode] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BlockShell
      kind="Explanation"
      heading={section.heading}
      actions={
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Explain differently
        </button>
      }
    >
      {menuOpen && (
        <div className="mb-3 flex flex-wrap gap-2">
          {Object.keys(MODES).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setMenuOpen(false);
              }}
              className="rounded-sm border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {m}
            </button>
          ))}
        </div>
      )}

      <p className="text-[15px] leading-relaxed text-foreground/90">
        {mode ? MODES[mode] : section.body}
      </p>

      {mode && (
        <button
          onClick={() => setMode(null)}
          className="mt-2 text-xs text-primary hover:underline"
        >
          Show the original explanation
        </button>
      )}

      {!mode && section.points && (
        <ul className="mt-4 space-y-2">
          {section.points.map((p) => (
            <li
              key={p}
              className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm bg-primary/70" />
              {p}
            </li>
          ))}
        </ul>
      )}
    </BlockShell>
  );
}
