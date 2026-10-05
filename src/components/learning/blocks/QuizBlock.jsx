import { useState } from "react";
import { Check, X } from "lucide-react";
import BlockShell from "./BlockShell";
import { cn } from "@/lib/utils";

/**
 * Interactive multiple-choice question.
 * `selected` is locked once answered so feedback stays visible; "Try again"
 * resets the state.
 */
export default function QuizBlock({ section }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  const isCorrect = selected === section.correctIndex;

  return (
    <BlockShell kind="Quiz" heading={section.heading}>
      <div className="rounded-sm border border-border bg-card p-5">
        <p className="text-[15px] font-medium">{section.question}</p>

        <div className="mt-4 space-y-2">
          {section.options.map((opt, i) => {
            const isChosen = selected === i;
            const showCorrect = answered && i === section.correctIndex;
            const showWrong = answered && isChosen && !isCorrect;
            return (
              <button
                key={opt}
                disabled={answered}
                onClick={() => setSelected(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-sm border px-4 py-3 text-left text-sm transition-colors",
                  showCorrect && "border-primary/60 bg-primary/10",
                  showWrong && "border-destructive/60 bg-destructive/10",
                  !answered && "border-border hover:border-primary/40",
                  answered && !showCorrect && !showWrong && "border-border opacity-60",
                )}
              >
                <span className="text-xs text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {showCorrect && <Check className="h-4 w-4 text-primary" />}
                {showWrong && <X className="h-4 w-4 text-destructive" />}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="fade-up mt-4 border-t border-border pt-4">
            <p className="text-sm font-medium">
              {isCorrect ? "Correct." : "Not quite."}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {section.explanation}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="mt-3 text-xs text-primary hover:underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </BlockShell>
  );
}
