import ExplanationBlock from "./ExplanationBlock";
import RealLifeExampleBlock from "./RealLifeExampleBlock";
import StoryBlock from "./StoryBlock";
import VisualizationBlock from "./VisualizationBlock";
import AnimationBlock from "./AnimationBlock";
import CodeBlock from "./CodeBlock";
import InteractiveExampleBlock from "./InteractiveExampleBlock";
import PracticalApplicationBlock from "./PracticalApplicationBlock";
import CommonMistakesBlock from "./CommonMistakesBlock";
import QuizBlock from "./QuizBlock";
import TeachBackBlock from "./TeachBackBlock";
import SummaryBlock from "./SummaryBlock";
import ReviewBlock from "./ReviewBlock";
import { Component } from "react";

/**
 * Block registry: maps a section `type` from the (future) AI response to the
 * component that renders it. Adding a new lesson block = one entry here.
 */
export const BLOCKS = {
  explanation: ExplanationBlock,
  example: RealLifeExampleBlock,
  story: StoryBlock,
  visualization: VisualizationBlock,
  animation: AnimationBlock,
  code: CodeBlock,
  interactive: InteractiveExampleBlock,
  practical: PracticalApplicationBlock,
  mistakes: CommonMistakesBlock,
  quiz: QuizBlock,
  teachback: TeachBackBlock,
  summary: SummaryBlock,
  review: ReviewBlock,
};

/** Catches a render crash in one block so the rest of the lesson still shows. */
class BlockBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.error("Lesson block failed:", err);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Renders a single section, ignoring unknown types safely. */
export default function LessonSection({ section, lesson }) {
  const Component = BLOCKS[section.type];
  if (!Component) return null;
  return (
    <BlockBoundary>
      <Component section={section} lesson={lesson} />
    </BlockBoundary>
  );
}
