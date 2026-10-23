import { useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import BlockShell from "./BlockShell";

/**
 * Placeholder animation component: cycles through pre-defined frames on a timer.
 * Designed to be replaced later by a real interactive visualization engine
 * while keeping the same props shape ({ frames, caption }).
 */
export default function AnimationBlock({ section }) {
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(
      () => setFrame((f) => (f + 1) % section.frames.length),
      700,
    );
    return () => clearInterval(t);
  }, [playing, section.frames.length]);

  const stack = section.frames[frame];

  return (
    <BlockShell
      kind="Animation"
      heading={section.heading}
      actions={
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {playing ? "Pause" : "Play"}
        </button>
      }
    >
      <div className="rounded-sm border border-border bg-card p-5">
        <div className="flex min-h-40 flex-col-reverse items-center justify-start gap-1.5">
          {stack.length === 0 && (
            <p className="text-xs text-muted-foreground">Stack empty</p>
          )}
          {stack.map((label, i) => (
            <div
              key={`${label}-${i}`}
              className="fade-up w-full max-w-xs rounded-sm border border-border bg-secondary px-3 py-2 text-center font-mono text-xs"
            >
              {label}
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">{section.caption}</p>
      </div>
    </BlockShell>
  );
}
