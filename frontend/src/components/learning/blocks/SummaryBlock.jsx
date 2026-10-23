import BlockShell from "./BlockShell";

/** Closing takeaways for the lesson. */
export default function SummaryBlock({ section }) {
  return (
    <BlockShell kind="Summary" heading={section.heading}>
      <ul className="space-y-2 rounded-sm border border-border bg-card px-5 py-4">
        {section.points.map((p) => (
          <li key={p} className="flex gap-2.5 text-sm leading-relaxed">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm bg-primary" />
            {p}
          </li>
        ))}
      </ul>
    </BlockShell>
  );
}
