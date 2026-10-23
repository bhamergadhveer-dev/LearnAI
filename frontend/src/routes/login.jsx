import { createFileRoute } from "@tanstack/react-router";
import Login from "@/pages/Login";

const title = "Log in — LearnAI";
const description = "Log in to continue your LearnAI learning sessions.";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Login,
});
