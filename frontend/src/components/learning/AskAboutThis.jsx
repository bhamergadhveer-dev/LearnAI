import { useEffect, useRef, useState } from "react";
import { MessageCircleQuestion, ArrowUp, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { useProfile } from "@/context/ProfileContext";

const STEPS = ["Reading the lesson…", "Thinking…", "Writing a simple answer…"];

/** Animated "AI is working" row; the status text advances every 1.5s. */
function Thinking() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => Math.min(n + 1, STEPS.length - 1)), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fade-up flex items-center gap-2.5 text-sm text-muted-foreground">
      <span className="flex gap-1">
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: `${d * 150}ms` }}
          />
        ))}
      </span>
      {STEPS[i]}
    </div>
  );
}

/**
 * Contextual follow-up questions about the current lesson.
 * Intentionally quiet: chat supports the lesson, it does not replace it.
 */
export default function AskAboutThis({ lesson }) {
  const { profile } = useProfile();
  const [question, setQuestion] = useState("");
  const [thread, setThread] = useState([]);
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  // Keep the newest message (or the thinking row) in view
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [thread, thinking]);

  const ask = async () => {
    const q = question.trim();
    if (!q || thinking) return;
    const history = thread.slice(-6); // earlier messages, for follow-up questions
    setQuestion("");
    setThread((t) => [...t, { role: "student", text: q }]);
    setThinking(true);
    try {
      const { answer } = await api("/api/ask", {
        lessonId: lesson.id,
        question: q,
        history,
        name: profile?.name,
      });
      setThread((t) => [...t, { role: "ai", text: answer }]);
    } catch (e) {
      setThread((t) => [...t, { role: "ai", text: e.message }]);
    } finally {
      setThinking(false);
    }
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
                  : "fade-up whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground"
              }
            >
              {m.text}
            </p>
          ))}
          {thinking && <Thinking />}
          <div ref={endRef} />
        </div>
      )}

      <div className="mt-3 flex items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 focus-within:border-primary/40">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask anything about this lesson..."
          className="min-w-0 flex-1 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={ask}
          aria-label="Ask"
          disabled={!question.trim() || thinking}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-secondary text-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          {thinking ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </button>
      </div>
    </section>
  );
}
