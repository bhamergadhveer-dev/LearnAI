import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import LearningInput from "@/components/learning/LearningInput";
import { useProfile } from "@/context/ProfileContext";
import { useNavigate } from "@tanstack/react-router";
import { api } from "@/lib/api";

/** Time-aware greeting for the empty state. */
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

/** Three bouncing dots while the AI is working. */
function Dots() {
  return (
    <span className="flex gap-1 pt-2.5">
      {[0, 1, 2].map((d) => (
        <span
          key={d}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
          style={{ animationDelay: `${d * 150}ms` }}
        />
      ))}
    </span>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [chat, setChat] = useState([]); // [{ role: "student" | "ai", text }]
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat, generating]);

  const startLearning = async ({ topic: t, goal }) => {
    setError("");
    setChat((c) => [...c, { role: "student", text: t }]);
    setGenerating(true);
    try {
      const res = await api("/api/lessons/generate", {
        topic: t,
        goal,
        profile,
        name: profile.name,
      });
      if (res.greeting) {
        setChat((c) => [...c, { role: "ai", text: res.greeting }]);
        return;
      }
      navigate({ to: "/app/learn/$id", params: { id: res.id } });
    } catch (e) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  };

  const input = (
    <div className="mx-auto w-full max-w-[760px]">
      <LearningInput onSubmit={startLearning} autoFocus />
      {error && <p className="mt-2 text-center text-sm text-destructive">{error}</p>}
    </div>
  );

  // Empty state: heading + centered input
  if (chat.length === 0) {
    return (
      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col justify-center px-4 py-16 sm:px-8 lg:px-12">
        <div className="text-center">
          <Sparkles className="mx-auto h-5 w-5 text-primary" />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-[28px]">
            {greeting()}, {profile.name}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">What do you want to learn?</p>
        </div>
        <div className="mt-8">{input}</div>
      </div>
    );
  }

  // Chat state: messages scroll above, input pinned to the bottom
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-4 sm:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-[760px] flex-1 space-y-5 pt-10 pb-6">
        {chat.map((m, i) =>
          m.role === "student" ? (
            <div key={i} className="fade-up flex justify-end">
              <p className="max-w-[80%] rounded-2xl bg-secondary px-4 py-2.5 text-sm">{m.text}</p>
            </div>
          ) : (
            <div key={i} className="fade-up flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <p className="max-w-[80%] pt-1 text-sm leading-relaxed whitespace-pre-wrap">
                {m.text}
              </p>
            </div>
          ),
        )}
        {generating && (
          <div className="fade-up flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <Dots />
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="sticky bottom-0 bg-background pt-2 pb-5">{input}</div>
    </div>
  );
}
