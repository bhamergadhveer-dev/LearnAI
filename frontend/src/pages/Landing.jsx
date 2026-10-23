import { Link } from "@tanstack/react-router";
import {
  GraduationCap,
  ArrowRight,
  Search,
  Sparkles,
  BookOpen,
  Brain,
} from "lucide-react";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {
  ExplanationDemo,
  AnalogyDemo,
  VisualizationDemo,
  AnimationDemo,
  CodeDemo,
  QuizDemo,
  TeachBackDemo,
} from "@/components/landing/demos";

/** Wide page section with consistent horizontal rhythm. */
function Section({ children, className = "" }) {
  return (
    <section className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </section>
  );
}

/** Public landing page — shows the learning experience instead of describing it. */
export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Brand row */}
      <Section className="flex items-center justify-between py-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary/15 text-primary">
            <GraduationCap className="h-4 w-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight">LearnAI</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ThemeToggle placement="bottom" align="right" />
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </Section>

      {/* Hero — wide two-column layout */}
      <Section className="grid items-center gap-10 pt-10 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight sm:text-5xl">
            One topic.
            <br />
            <span className="text-muted-foreground">
              One complete learning experience.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Instead of searching through tutorials, videos and documentation,
            LearnAI turns a single topic into an explanation, a real-life
            analogy, a visualization, a worked example, practice questions and a
            teach-it-back check — personalised to your level.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link to="/signup">
              <Button>
                Start learning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/app">
              <Button variant="outline">Try the demo</Button>
            </Link>
          </div>

          {/* The old way vs LearnAI */}
          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[12px] border border-border bg-card/60 p-4">
              <p className="flex items-center gap-1.5 text-[11px] tracking-[0.12em] text-muted-foreground/70 uppercase">
                <Search className="h-3.5 w-3.5" /> The old way
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                12 browser tabs, three half-watched videos, a PDF you never
                finished — and still no clear picture.
              </p>
            </div>
            <div className="rounded-[12px] border border-primary/40 bg-primary/5 p-4">
              <p className="flex items-center gap-1.5 text-[11px] tracking-[0.12em] text-primary uppercase">
                <Sparkles className="h-3.5 w-3.5" /> With LearnAI
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-foreground/90">
                One prompt, one structured lesson that explains, shows,
                practises and tests until the concept sticks.
              </p>
            </div>
          </div>
        </div>

        {/* Mocked product surface */}
        <div className="float-panel rounded-[14px] border border-border bg-card p-5">
          <p className="text-[10px] tracking-[0.14em] text-muted-foreground/70 uppercase">
            Your workspace
          </p>
          <div className="mt-3 rounded-[12px] border border-border bg-secondary/40 px-4 py-3">
            <p className="text-[13px] text-muted-foreground">
              What do you want to learn?
            </p>
            <p className="mt-1.5 text-sm">
              Teach me recursion from the basics with a real-life example.
            </p>
          </div>
          <div className="mt-4 space-y-2">
            {[
              { icon: BookOpen, label: "Explanation generated" },
              { icon: Sparkles, label: "Real-life analogy added" },
              { icon: Brain, label: "Visualization + quiz ready" },
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-2.5 rounded-[10px] border border-border px-3 py-2 text-[12px] text-muted-foreground"
              >
                <r.icon className="h-3.5 w-3.5 text-primary" />
                {r.label}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Product demonstration — the core of the page */}
      <Section className="border-t border-border py-16">
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.14em] text-muted-foreground/70 uppercase">
            What one topic becomes
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Every lesson is built from the same seven parts.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            These are live, interactive examples — click through them.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          <ExplanationDemo />
          <AnalogyDemo />
          <VisualizationDemo />
          <AnimationDemo />
          <CodeDemo />
          <QuizDemo />
          <TeachBackDemo />

          {/* Closing CTA tile keeps the grid balanced */}
          <div className="flex flex-col justify-between rounded-[14px] border border-primary/40 bg-primary/5 p-5 lg:col-span-2">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                Learn one topic completely, tonight.
              </h3>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                Built for school, college and university students — lessons
                adapt to your education level, subjects and preferred way of
                being taught.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link to="/signup">
                <Button>
                  Start learning <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/app">
                <Button variant="outline">Try the demo</Button>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border py-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} LearnAI
      </Section>
    </div>
  );
}
