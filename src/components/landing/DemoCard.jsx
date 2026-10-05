import { cn } from "@/lib/utils";

/**
 * Shared frame for every landing demo tile so the showcase stays uniform:
 * quiet label, heading, and a card surface that works in both themes.
 */
export default function DemoCard({ label, title, className, children }) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-sm border border-border bg-card p-5 transition-colors hover:border-primary/30",
        className,
      )}
    >
      <p className="text-[10px] tracking-[0.14em] text-muted-foreground/70 uppercase">
        {label}
      </p>
      <h3 className="mt-1 text-sm font-semibold tracking-tight">{title}</h3>
      <div className="mt-3 flex-1">{children}</div>
    </div>
  );
}
