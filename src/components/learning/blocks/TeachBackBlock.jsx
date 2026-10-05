import { useState } from "react";
import { Check, AlertTriangle } from "lucide-react";
import BlockShell from "./BlockShell";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/learning/ProgressBar";
import { teachBackEvaluation } from "@/data/mockData";

/**
 * Teach-it-back: the student explains the concept, then receives a mocked
 * AI evaluation with an understanding score and review points.
 */
export default function TeachBackBlock({ section }) {
  const [answer, setAnswer] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);

  const check = () => {
    setChecking(true);
    // Simulated evaluation latency
    setTimeout(() => {
      setResult(teachBackEvaluation);
      setChecking(false);
    }, 900);
  };

  return (
    <BlockShell kind="Teach back" heading={section.heading}>
      <div className="rounded-sm border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">{section.prompt}</p>

        <textarea
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Recursion is when..."
          className="thin-scroll mt-3 w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none focus:border-primary/40"
        />

        <Button
          className="mt-3"
          size="sm"
          disabled={!answer.trim() || checking}
          onClick={check}
        >
          {checking ? "Checking..." : "Check my understanding"}
        </Button>

        {result && (
          <div className="fade-up mt-5 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Understanding</span>
              <span className="text-primary">{result.score}%</span>
            </div>
            <ProgressBar value={result.score} className="mt-2" />

            <ul className="mt-4 space-y-1.5">
              {result.correct.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs tracking-wide text-muted-foreground/70 uppercase">
              Needs review
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {result.review.map((r) => (
                <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-chart-4" />
                  {r}
                </li>
              ))}
            </ul>

            <Button variant="outline" size="sm" className="mt-4">
              Review this part
            </Button>
          </div>
        )}
      </div>
    </BlockShell>
  );
}
