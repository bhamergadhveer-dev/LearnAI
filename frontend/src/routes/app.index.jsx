import { createFileRoute } from "@tanstack/react-router";
import Home from "@/pages/Home";

const title = "Your learning workspace — LearnAI";
const description =
  "Start a new learning session, continue a topic, or review concepts due today.";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Home,
});
