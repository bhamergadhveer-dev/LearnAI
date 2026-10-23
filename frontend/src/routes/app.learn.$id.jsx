import { createFileRoute } from "@tanstack/react-router";
import LearningSession from "@/pages/LearningSession";

const title = "Learning session — LearnAI";
const description =
  "An interactive lesson with explanations, visualizations, code, quizzes and a teach-it-back check.";

export const Route = createFileRoute("/app/learn/$id")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SessionRoute,
});

function SessionRoute() {
  const { id } = Route.useParams();
  // `key` remounts the page when switching sessions so lesson state resets.
  return <LearningSession key={id} id={id} />;
}
