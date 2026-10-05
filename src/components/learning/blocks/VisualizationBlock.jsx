import { useState } from "react";
import { ArrowDown, ChevronRight, RotateCcw } from "lucide-react";
import BlockShell from "./BlockShell";
import { cn } from "@/lib/utils";

/**
 * Step-through visualization.
 * `step` controls how many nodes are revealed; the diagram scrolls horizontally
 * on small screens instead of overflowing the page.
 */
export default function VisualizationBlock({ section }) {
  const [step, setStep] = useState(1);
  const total = section.steps.length;

  return (
    <BlockShell kind="Visual" heading={section.heading}>
      <div className="rounded-sm border border-border bg-card p-5">
        <div className="thin-scroll overflow-x-auto">
          <div className="flex min-w-max flex-col items-center gap-1">
            {section.steps.map((s, i) => (
              <div
                key={s}
                className={cn(
                  "flex flex-col items-center gap-1 transition-all duration-300",
                  i < step ? "opacity-100" : "opacity-20",
                )}
              >
                <div
                  className={cn(
                    "rounded-sm border px-4 py-2 font-mono text-sm",
                    i === total - 1
                      ? "border-primary/50 text-primary"
                      : "border-border text-foreground/90",
                  )}
                >
                  {s}
                </div>
                {i < total - 1 && (
                  <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">{section.caption}</p>
          <div className="flex shrink-0 gap-1">
            <button
              onClick={() => setStep(1)}
              aria-label="Reset"
              className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setStep((s) => Math.min(s + 1, total))}
              disabled={step === total}
              className="flex h-8 items-center gap-1 rounded-sm bg-secondary px-3 text-xs transition-colors hover:bg-accent disabled:opacity-40"
            >
              Next step <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </BlockShell>
  );
}
