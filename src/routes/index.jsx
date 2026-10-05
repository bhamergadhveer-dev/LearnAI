import { createFileRoute } from "@tanstack/react-router";
import Landing from "@/pages/Landing";

const title = "LearnAI — One topic, one complete learning experience";
const description =
  "Ask for any concept and get explanations, analogies, visualizations, quizzes and teach-it-back checks built for students.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Landing,
});
