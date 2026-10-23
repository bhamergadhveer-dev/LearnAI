import { cn } from "@/lib/utils";

/**
 * CSS-only tooltip used by the collapsed sidebar icons.
 * Hidden on small screens where hovering is not available.
 */
export default function Tooltip({ label, side = "right", children, className }) {
  return (
    <div className={cn("group/tt relative flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute top-1/2 z-40 -translate-y-1/2 rounded-sm border border-border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground opacity-0 transition-opacity group-hover/tt:opacity-100 max-md:hidden",
          side === "right" ? "left-full ml-3" : "right-full mr-3",
        )}
      >
        {label}
      </span>
    </div>
  );
}
