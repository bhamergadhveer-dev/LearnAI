import { useEffect, useState } from "react";
import { Check, ChevronRight, Play, Sparkles, X } from "lucide-react";
import DemoCard from "./DemoCard";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* 1. AI explanation                                                    */
/* ------------------------------------------------------------------ */
export function ExplanationDemo() {
  return (
    <DemoCard label="Explanation" title="Plain-language, level aware">
      <p className="text-[13px] leading-relaxed text-foreground/90">
        Recursion is when a function solves a problem by calling{" "}
        <span className="text-primary">itself</span> on a smaller version of the
        same problem, until it hits a case simple enough to answer directly.
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {["Base case", "Recursive case", "Call stack"].map((t) => (
          <span
            key={t}
            className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </DemoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Real-life analogy                                                 */
/* ------------------------------------------------------------------ */
export function AnalogyDemo() {
  return (
    <DemoCard label="Real life" title="An analogy you already know">
      <div className="rounded-[10px] border-l-2 border-primary/60 bg-secondary/50 px-3.5 py-3">
        <p className="text-[13px] leading-relaxed text-foreground/90">
          You&apos;re in a cinema and want to know your row number. You ask the
          person in front, who asks the person in front of them… until row one
          answers &ldquo;I&apos;m row 1&rdquo;. Each answer travels back, +1 each time.
        </p>
      </div>
    </DemoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Interactive visualization (step through the call stack)           */
/* ------------------------------------------------------------------ */
export function VisualizationDemo() {
  const frames = ["fact(4)", "fact(3)", "fact(2)", "fact(1)"];
  const [step, setStep] = useState(1);

  return (
    <DemoCard label="Visualization" title="Step through the call stack">
      <div className="space-y-1.5">
        {frames.map((f, i) => (
          <div
            key={f}
            className={cn(
              "flex items-center justify-between rounded-[10px] border px-3 py-1.5 text-[12px] transition-all duration-300",
              i < step
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border bg-secondary/40 text-muted-foreground/60",
            )}
            style={{ marginLeft: `${i * 10}px` }}
          >
            <span>{f}</span>
            {i < step && <span className="text-primary">pushed</span>}
          </div>
        ))}
      </div>
      <button
        onClick={() => setStep((s) => (s >= frames.length ? 1 : s + 1))}
        className="mt-3 inline-flex items-center gap-1.5 rounded-[10px] border border-border px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      >
        <ChevronRight className="h-3.5 w-3.5" />
        {step >= frames.length ? "Replay" : "Next step"}
      </button>
    </DemoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Animation demo (looping concept animation)                        */
/* ------------------------------------------------------------------ */
export function AnimationDemo() {
  const [running, setRunning] = useState(true);
  const [tick, setTick] = useState(0);

  // Simple looping "unwind" animation — mocked, no backend needed.
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((t) => (t + 1) % 5), 700);
    return () => clearInterval(id);
  }, [running]);

  return (
    <DemoCard label="Animation" title="Watch the idea move">
      <div className="flex h-24 items-end gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-t-[6px] transition-all duration-500",
              i <= tick ? "bg-primary/80" : "bg-secondary",
            )}
            style={{ height: `${24 + i * 16}px` }}
          />
        ))}
      </div>
      <button
        onClick={() => setRunning((r) => !r)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-[10px] border border-border px-2.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      >
        <Play className="h-3.5 w-3.5" /> {running ? "Pause" : "Play"}
      </button>
    </DemoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Code example                                                      */
/* ------------------------------------------------------------------ */
export function CodeDemo() {
  return (
    <DemoCard label="Code" title="Worked example, line by line">
      <pre className="thin-scroll overflow-x-auto rounded-[10px] bg-secondary/60 p-3 text-[12px] leading-relaxed">
        <code className="text-foreground/90">{`def fact(n):
    if n == 1:      # base case
        return 1
    return n * fact(n - 1)`}</code>
      </pre>
      <p className="mt-2 text-[12px] text-muted-foreground">
        The base case stops the recursion — without it the stack never unwinds.
      </p>
    </DemoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Quiz / practice                                                   */
/* ------------------------------------------------------------------ */
export function QuizDemo() {
  const options = [
    { text: "It stops the recursion", correct: true },
    { text: "It makes the function faster", correct: false },
    { text: "It allocates memory", correct: false },
  ];
  const [picked, setPicked] = useState(null);

  return (
    <DemoCard label="Practice" title="Check yourself instantly">
      <p className="text-[13px]">What is the purpose of a base case?</p>
      <div className="mt-3 space-y-1.5">
        {options.map((o, i) => {
          const chosen = picked === i;
          return (
            <button
              key={o.text}
              onClick={() => setPicked(i)}
              className={cn(
                "flex w-full items-center justify-between rounded-[10px] border px-3 py-1.5 text-left text-[12px] transition-colors",
                chosen && o.correct && "border-primary/60 bg-primary/10",
                chosen && !o.correct && "border-destructive/50 bg-destructive/10",
                !chosen && "border-border hover:border-primary/30",
              )}
            >
              {o.text}
              {chosen && (o.correct ? <Check className="h-3.5 w-3.5 text-primary" /> : <X className="h-3.5 w-3.5 text-destructive" />)}
            </button>
          );
        })}
      </div>
    </DemoCard>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Teach it back                                                     */
/* ------------------------------------------------------------------ */
export function TeachBackDemo() {
  const [sent, setSent] = useState(false);

  return (
    <DemoCard label="Teach it back" title="Prove you actually understood">
      {sent ? (
        <div className="rounded-[10px] border border-primary/40 bg-primary/10 p-3">
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Understanding score 82%
          </p>
          <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
            Great on the base case. Next, mention how each call waits on the
            stack until the smaller call returns.
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-[10px] border border-border bg-secondary/40 px-3 py-2 text-[12px] text-muted-foreground">
            &ldquo;Recursion is a function calling itself until it reaches a
            case it can answer without calling again…&rdquo;
          </div>
          <button
            onClick={() => setSent(true)}
            className="mt-3 rounded-[10px] bg-primary px-3 py-1.5 text-[12px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get feedback
          </button>
        </>
      )}
    </DemoCard>
  );
}
