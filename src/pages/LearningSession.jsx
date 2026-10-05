import { useEffect, useState } from "react";
import GeneratingState from "@/components/learning/GeneratingState";
import LessonWorkspace from "@/components/learning/LessonWorkspace";
import { getLessonById } from "@/data/mockData";

/**
 * A specific learning session (/app/learn/:id).
 * Shows a brief mocked loading state, then renders the lesson blocks.
 */
export default function LearningSession({ id }) {
  const [loading, setLoading] = useState(true);
  const lesson = getLessonById(id);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, [id]);

  if (loading) return <GeneratingState topic={lesson.title} />;
  return <LessonWorkspace lesson={lesson} />;
}
