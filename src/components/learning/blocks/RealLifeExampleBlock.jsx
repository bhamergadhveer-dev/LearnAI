import BlockShell from "./BlockShell";

/** Real-life analogy — subtly distinct surface, no heavy decoration. */
export default function RealLifeExampleBlock({ section }) {
  return (
    <BlockShell kind="Real life" heading={section.heading}>
      <div className="rounded-sm border-l-2 border-primary/50 bg-card/60 px-5 py-4">
        <p className="text-[15px] leading-relaxed text-foreground/90">
          {section.body}
        </p>
      </div>
    </BlockShell>
  );
}
