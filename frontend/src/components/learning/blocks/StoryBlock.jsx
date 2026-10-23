import BlockShell from "./BlockShell";

/** Story / narrative analogy used when a concept benefits from a scenario. */
export default function StoryBlock({ section }) {
  return (
    <BlockShell kind="Story" heading={section.heading}>
      <p className="text-[15px] leading-relaxed text-muted-foreground italic">
        {section.body}
      </p>
    </BlockShell>
  );
}
