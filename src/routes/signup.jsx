import { createFileRoute } from "@tanstack/react-router";
import Signup from "@/pages/Signup";

const title = "Create your account — LearnAI";
const description =
  "Create a LearnAI account and get lessons matched to your education level and field of study.";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Signup,
});
