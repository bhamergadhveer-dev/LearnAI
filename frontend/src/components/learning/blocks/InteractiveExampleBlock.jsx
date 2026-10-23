import { useState } from "react";
import BlockShell from "./BlockShell";

/**
 * Interactive example: the student changes an input and immediately sees the
 * resulting recursive calls. Pure frontend computation, no API.
 */
export default function InteractiveExampleBlock({ section }) {
  const [n, setN] = useState(4);

  // Build the chain of calls for the chosen n
  const calls = Array.from({ length: n }, (_, i) => `factorial(${n - i})`);
  const result = Array.from({ length: n }, (_, i) => i + 1).reduce(
    (a, b) => a * b,
    1,
  );

  return (
    <BlockShell kind="Interactive" heading={section.heading}>
      <div className="rounded-sm border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">{section.body}</p>

        <div className="mt-4 flex items-center gap-3">
          <label htmlFor="n-input" className="text-xs text-muted-foreground">
            n = {n}
          </label>
          <input
            id="n-input"
            type="range"
            min="1"
            max="8"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="h-1 flex-1 cursor-pointer appearance-none rounded-sm bg-secondary accent-primary"
          />
        </div>

        <div className="thin-scroll mt-4 overflow-x-auto">
          <div className="flex min-w-max items-center gap-2">
            {calls.map((c) => (
              <span
                key={c}
                className="rounded-sm border border-border px-2.5 py-1 font-mono text-xs text-foreground/90"
              >
                {c}
              </span>
            ))}
            <span className="rounded-sm border border-primary/50 px-2.5 py-1 font-mono text-xs text-primary">
              = {result}
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {n} recursive calls before the base case is reached.
        </p>
      </div>
    </BlockShell>
  );
}
