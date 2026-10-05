import LessonSection from "./blocks";
import AskAboutThis from "./AskAboutThis";
import ProgressBar from "./ProgressBar";

/**
 * Renders a lesson: a title, a very subtle progress indicator, then the
 * ordered list of typed sections. The switch lives in the block registry,
 * so this component never needs to change when new block types are added.
 */
export default function LessonWorkspace({ lesson }) {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pt-10 pb-24 sm:px-8 lg:px-12">
      {/* Lesson header — quiet, no dashboard chrome */}
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">{lesson.title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{lesson.subtitle}</p>
        <ProgressBar value={lesson.progress} showValue className="mt-5" />
      </header>

      <div className="space-y-12">
        {lesson.sections.map((section, i) => (
          <LessonSection key={`${section.type}-${i}`} section={section} />
        ))}
      </div>

      <div className="mt-14">
        <AskAboutThis />
      </div>
    </div>
  );
}
