import { useState } from "react";
import { Check, AlertTriangle } from "lucide-react";
import BlockShell from "./BlockShell";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/learning/ProgressBar";
import { api } from "@/lib/api";

/**
 * Teach-it-back: the student explains the concept, Flask grades it against
 * the lesson and saves the score to History.
 */
export default function TeachBackBlock({ section, lesson }) {
  const [answer, setAnswer] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const check = async () => {
    setChecking(true);
    setError("");
    try {
      setResult(await api("/api/teachback/evaluate", { lessonId: lesson.id, answer }));
    } catch (e) {
      setError(e.message);
    } finally {
      setChecking(false);
    }
  };

  return (
    <BlockShell kind="Teach back" heading={section.heading}>
      <div className="rounded-sm border border-border bg-card p-5">
        <p className="text-sm text-muted-foreground">{section.prompt}</p>

        <textarea
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Explain it in your own words..."
          className="thin-scroll mt-3 w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none focus:border-primary/40"
        />

        <Button className="mt-3" size="sm" disabled={!answer.trim() || checking} onClick={check}>
          {checking ? "Checking..." : "Check my understanding"}
        </Button>
        {checking && (
          <p className="mt-3 animate-pulse text-sm text-muted-foreground">
            Reading your explanation and comparing it with the lesson…
          </p>
        )}
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        {result && (
          <div className="fade-up mt-5 border-t border-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Understanding</span>
              <span className="text-primary">{result.score}%</span>
            </div>
            <ProgressBar value={result.score} className="mt-2" />

            <ul className="mt-4 space-y-1.5">
              {result.correct.map((c, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {c}
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs tracking-wide text-muted-foreground/70 uppercase">
              Needs review
            </p>
            <ul className="mt-1.5 space-y-1.5">
              {result.review.map((r, i) => (
                <li key={i} className="flex gap-2 text-sm text-muted-foreground">
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
