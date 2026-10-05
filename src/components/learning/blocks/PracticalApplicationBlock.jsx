import BlockShell from "./BlockShell";

/** Where the concept is used in practice — a short, scannable list. */
export default function PracticalApplicationBlock({ section }) {
  return (
    <BlockShell kind="In practice" heading={section.heading}>
      <div className="grid gap-2 sm:grid-cols-2">
        {section.items.map((item) => (
          <div
            key={item}
            className="rounded-sm border border-border bg-card px-4 py-3 text-sm text-foreground/90"
          >
            {item}
          </div>
        ))}
      </div>
    </BlockShell>
  );
}
