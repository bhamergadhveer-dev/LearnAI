import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import Select from "@/components/ui/Select";

/**
 * Shared frame for the login and signup pages.
 * `wide` widens the card (used by signup, which lays fields out in two
 * columns on tablet and desktop).
 */
export default function AuthShell({ title, subtitle, children, footer, wide }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10 text-foreground">
      <div
        className={`${
          wide ? "max-w-2xl" : "max-w-md"
        } w-full rounded-xl border border-border bg-background/60 p-8`}
      >
        <div className="flex flex-col items-center text-center">
          <Link
            to="/"
            className="mb-5 flex h-10 w-11 items-center justify-center rounded-sm bg-primary/15 text-primary"
          >
            <GraduationCap className="h-5 w-5" />
          </Link>

          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div className={wide ? "mt-8" : "mt-8 space-y-4"}>{children}</div>

        <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
      </div>
    </div>
  );
}

/** Labelled text input used by both auth forms. */
export function Field({ label, ...props }) {
  return (
    <label className="block text-left">
      <span className="mb-1.5 block text-sm text-muted-foreground">{label}</span>
      <input
        className="w-full rounded-sm border border-transparent bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/40 autofill-fix"
        {...props}
      />
    </label>
  );
}

/**
 * Labelled select used for education level / field of study.
 * Uses the shared custom <Select> (never a native <select>) so the auth
 * pages match the rest of the LearnAI UI in both themes.
 */
export function SelectField({ label, options, value, onChange }) {
  return (
    <div className="block text-left">
      <span className="mb-1.5 block text-sm text-muted-foreground">{label}</span>
      <Select
        value={value}
        onChange={onChange}
        options={options}
        placement="bottom"
        className="rounded-sm border-transparent bg-card px-4 py-3 text-sm"
        menuClassName="min-w-full"
      />
    </div>
  );
}