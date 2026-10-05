import { useState } from "react";
import { Plus, ArrowUp, FileText, Image, NotebookPen, Target, X } from "lucide-react";
import Dropdown, { DropdownItem } from "@/components/ui/Dropdown";
import { learningGoals } from "@/data/mockData";

/**
 * The primary input of the product.
 *
 * State:
 * - `value`      : the topic the student wants to learn
 * - `goal`       : learning goal selector (defaults to "Understand deeply")
 * - `materials`  : mocked attachments added through the + menu
 */
export default function LearningInput({ onSubmit, autoFocus = false, compact = false }) {
  const [value, setValue] = useState("");
  const [goal, setGoal] = useState(learningGoals[0]);
  const [materials, setMaterials] = useState([]);

  const addMaterial = (label) =>
    setMaterials((m) => [...m, { id: Date.now(), label }]);

  const submit = () => {
    if (!value.trim()) return;
    onSubmit?.({ topic: value.trim(), goal, materials });
    setValue("");
    setMaterials([]);
  };

  return (
    <div className="w-full rounded-md border border-border bg-card px-4 py-3 transition-colors focus-within:border-primary/40">
      {/* Mocked attachments */}
      {materials.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2 px-1">
          {materials.map((m) => (
            <span
              key={m.id}
              className="flex items-center gap-1.5 rounded-sm bg-secondary px-2 py-1 text-xs text-muted-foreground"
            >
              {m.label}
              <button
                aria-label={`Remove ${m.label}`}
                onClick={() =>
                  setMaterials((list) => list.filter((x) => x.id !== m.id))
                }
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <textarea
        autoFocus={autoFocus}
        rows={compact ? 1 : 2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          // Enter submits, Shift+Enter adds a newline
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="What do you want to learn?"
        className="thin-scroll max-h-40 w-full resize-none bg-transparent px-3 py-2 text-[15px] leading-relaxed outline-none placeholder:text-muted-foreground"
      />

      <div className="flex items-center gap-2 px-1 pt-1">
        {/* Add material menu — wider so file labels stay readable */}
        <Dropdown
          className="min-w-56"
          trigger={({ toggle }) => (
            <button
              onClick={toggle}
              aria-label="Add material"
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        >
          <DropdownItem onClick={() => addMaterial("lecture.pdf")}>
            <FileText className="h-4 w-4" /> Upload PDF
          </DropdownItem>
          <DropdownItem onClick={() => addMaterial("screenshot.png")}>
            <Image className="h-4 w-4" /> Upload Image
          </DropdownItem>
          <DropdownItem onClick={() => addMaterial("Class notes")}>
            <NotebookPen className="h-4 w-4" /> Upload Notes / Text
          </DropdownItem>
        </Dropdown>

        {/* Learning goal — wider menu so full goal names are visible */}
        <Dropdown
          className="min-w-64"
          trigger={({ toggle }) => (
            <button
              onClick={toggle}
              className="flex h-9 max-w-[240px] items-center gap-1.5 rounded-sm px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Target className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{goal}</span>
            </button>
          )}
        >
          {learningGoals.map((g) => (
            <DropdownItem key={g} active={g === goal} onClick={() => setGoal(g)}>
              <span className="whitespace-nowrap">{g}</span>
            </DropdownItem>
          ))}
        </Dropdown>

        <button
          onClick={submit}
          disabled={!value.trim()}
          aria-label="Start learning"
          className="ml-auto flex h-9 w-9 items-center justify-center rounded-sm bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-30 cursor-pointer"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
