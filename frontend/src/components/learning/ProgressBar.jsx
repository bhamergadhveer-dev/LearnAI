import { cn } from "@/lib/utils";

/** Subtle progress bar — intentionally quiet so lesson content stays dominant. */
export default function ProgressBar({ value = 0, className, showValue = false }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
      {showValue && (
        <span className="shrink-0 text-xs text-muted-foreground">{value}%</span>
      )}
    </div>
  );
}
