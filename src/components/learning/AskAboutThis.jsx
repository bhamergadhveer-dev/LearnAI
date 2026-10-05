import { useState } from "react";
import { MessageCircleQuestion, ArrowUp } from "lucide-react";
import { followUpAnswers } from "@/data/mockData";

/**
 * Contextual follow-up questions about the current lesson.
 * Intentionally quiet: chat supports the lesson, it does not replace it.
 */
export default function AskAboutThis() {
  const [question, setQuestion] = useState("");
  const [thread, setThread] = useState([]);

  const ask = () => {
    const q = question.trim();
    if (!q) return;
    setQuestion("");
    setThread((t) => [...t, { role: "student", text: q }]);
    // Mocked AI answer
    setTimeout(
      () => setThread((t) => [...t, { role: "ai", text: followUpAnswers.default }]),
      600,
    );
  };

  return (
    <section className="border-t border-border pt-6">
      <p className="flex items-center gap-2 text-xs tracking-wide text-muted-foreground uppercase">
        <MessageCircleQuestion className="h-3.5 w-3.5" />
        Ask about this
      </p>

      {thread.length > 0 && (
        <div className="mt-4 space-y-3">
          {thread.map((m, i) => (
            <p
              key={i}
              className={
                m.role === "student"
                  ? "fade-up text-sm font-medium"
                  : "fade-up text-sm leading-relaxed text-muted-foreground"
              }
            >
              {m.text}
            </p>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 focus-within:border-primary/40">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Why does the base case matter?"
          className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={ask}
          aria-label="Ask"
          disabled={!question.trim()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-secondary text-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
