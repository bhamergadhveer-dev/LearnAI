import { useState } from "react";
import { Check, X, Clock } from "lucide-react";
import BlockShell from "./BlockShell";
import Button from "@/components/ui/Button";
import { practiceQuestions } from "@/data/mockData";
import { cn } from "@/lib/utils";

/**
 * Final practice/review section.
 * `started` reveals the question set; `answers` maps question index -> chosen index.
 */
export default function ReviewBlock({ section }) {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [saved, setSaved] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const score = practiceQuestions.filter(
    (q, i) => answers[i] === q.correctIndex,
  ).length;

  return (
    <BlockShell kind="Practice" heading={section.heading}>
      <div className="rounded-sm border border-border bg-card p-5">
        {!started && (
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" onClick={() => setStarted(true)}>
              Start practice
            </Button>
            <button
              onClick={() => setSaved(true)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Clock className="h-3.5 w-3.5" />
              {saved ? "Saved to review" : "Review later"}
            </button>
          </div>
        )}

        {started && (
          <div className="space-y-5">
            {practiceQuestions.map((q, qi) => (
              <div key={q.q}>
                <p className="text-sm font-medium">
                  {qi + 1}. {q.q}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {q.options.map((opt, oi) => {
                    const chosen = answers[qi] === oi;
                    const done = answers[qi] !== undefined;
                    const correct = oi === q.correctIndex;
                    return (
                      <button
                        key={opt}
                        disabled={done}
                        onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        className={cn(
                          "flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-xs transition-colors",
                          done && correct && "border-primary/60 text-primary",
                          done && chosen && !correct && "border-destructive/60 text-destructive",
                          !done && "border-border hover:border-primary/40",
                          done && !correct && !chosen && "border-border opacity-50",
                        )}
                      >
                        {opt}
                        {done && correct && <Check className="h-3 w-3" />}
                        {done && chosen && !correct && <X className="h-3 w-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {answeredCount === practiceQuestions.length && (
              <p className="fade-up border-t border-border pt-4 text-sm">
                You scored{" "}
                <span className="text-primary">
                  {score}/{practiceQuestions.length}
                </span>
                . This topic has been added to your history.
              </p>
            )}
          </div>
        )}
      </div>
    </BlockShell>
  );
}
