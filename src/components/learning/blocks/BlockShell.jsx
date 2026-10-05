import { cn } from "@/lib/utils";

/**
 * Shared wrapper for every lesson block: consistent spacing, heading style and
 * an optional quiet "kind" label so blocks stay visually uniform and calm.
 */
export default function BlockShell({ kind, heading, children, className, actions }) {
  return (
    <section className={cn("fade-up scroll-mt-8", className)}>
      {(kind || heading) && (
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <div>
            {kind && (
              <p className="mb-1 text-[11px] tracking-[0.12em] text-muted-foreground/70 uppercase">
                {kind}
              </p>
            )}
            {heading && (
              <h2 className="text-lg font-semibold tracking-tight">{heading}</h2>
            )}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}
