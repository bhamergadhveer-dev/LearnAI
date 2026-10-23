import { AlertTriangle } from "lucide-react";
import BlockShell from "./BlockShell";

/** Frequent misconceptions, each paired with the correction. */
export default function CommonMistakesBlock({ section }) {
  return (
    <BlockShell kind="Watch out" heading={section.heading}>
      <div className="space-y-2">
        {section.items.map((item) => (
          <div
            key={item.wrong}
            className="rounded-sm border border-border bg-card px-4 py-3"
          >
            <p className="flex items-start gap-2 text-sm font-medium">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-chart-4" />
              {item.wrong}
            </p>
            <p className="mt-1.5 pl-6 text-sm leading-relaxed text-muted-foreground">
              {item.right}
            </p>
          </div>
        ))}
      </div>
    </BlockShell>
  );
}
