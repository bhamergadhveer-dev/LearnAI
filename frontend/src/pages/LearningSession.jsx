import { useEffect, useState } from "react";
import GeneratingState from "@/components/learning/GeneratingState";
import LessonWorkspace from "@/components/learning/LessonWorkspace";
import { api } from "@/lib/api";

/** Loads a saved lesson from Flask (/app/learn/:id). */
export default function LearningSession({ id }) {
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLesson(null);
    setError("");
    api(`/api/sessions/${id}`)
      .then((d) => !cancelled && setLesson(d))
      .catch((e) => !cancelled && setError(e.message));
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) return <p className="p-10 text-sm text-muted-foreground">{error}</p>;
  if (!lesson) return <GeneratingState topic="…" />;
  return <LessonWorkspace lesson={lesson} />;
}
