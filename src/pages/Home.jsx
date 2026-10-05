import { useState } from "react";
import { Sparkles } from "lucide-react";
import LearningInput from "@/components/learning/LearningInput";
import GeneratingState from "@/components/learning/GeneratingState";
import LessonWorkspace from "@/components/learning/LessonWorkspace";
import { useProfile } from "@/context/ProfileContext";
import { recursionLesson } from "@/data/mockData";


/** Time-aware greeting for the empty state. */
function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

/**
 * Main workspace home.
 *
 * State machine: "empty" -> "generating" -> "lesson".
 * Submitting the learning input mocks generation, then renders the lesson
 * in place (no navigation, so the workspace never jumps).
 */
export default function Home() {
  const { profile } = useProfile();

  const [status, setStatus] = useState("empty");
  const [topic, setTopic] = useState("");

  const startLearning = ({ topic: t, goal, materials }) => {
    // Personalization payload shape for the future backend call:
    // { topic, goal, materials, profile }
    void { topic: t, goal, materials, profile };
    setTopic(t);
    setStatus("generating");
    setTimeout(() => setStatus("lesson"), 1800);
  };

  if (status === "generating") return <GeneratingState topic={topic} />;

  if (status === "lesson") {
    return (
      <LessonWorkspace
        lesson={{ ...recursionLesson, title: topic, subtitle: "Understanding the concept" }}
      />
    );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col justify-center px-4 py-16 sm:px-8 lg:px-12">
      {/* Centered, minimal empty state — the input gets all the visual weight */}
      <div className="text-center">
        <Sparkles className="mx-auto h-5 w-5 text-primary" />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-[28px]">
          {greeting()}, {profile.name}
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          What do you want to learn?
        </p>
      </div>

      {/* Wider input for better text visibility */}
      <div className="mx-auto mt-8 w-full max-w-[1040px]">
        <LearningInput onSubmit={startLearning} autoFocus />
      </div>
    </div>
  );
}

