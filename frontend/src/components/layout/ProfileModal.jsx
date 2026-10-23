import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plus, X, Check } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useProfile } from "@/context/ProfileContext";
import {
  educationLevels,
  subjectLevels,
  explanationStyles,
  exampleStyles,
  visualPreferences,
  languages,
  learningGoals,
} from "@/data/mockData";
import { cn } from "@/lib/utils";

/** Shared input styling so every field looks identical. */
const fieldClass =
  "w-full rounded-sm border border-border bg-secondary/40 px-3 py-2 text-sm outline-none transition-colors focus:border-primary/50";

/** Labelled form row. */
function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-muted-foreground/70">{hint}</span>}
    </label>
  );
}

/** Small section heading inside the scrollable form. */
function Section({ title, children }) {
  return (
    <section className="border-t border-border pt-4">
      <p className="mb-3 text-[11px] tracking-[0.12em] text-muted-foreground/70 uppercase">
        {title}
      </p>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

/**
 * Profile modal — the only place profile/account controls live
 * (there is no settings page by design).
 *
 * It collects ONLY information that helps the AI personalise teaching:
 * education context, subjects + current level, goals and explanation
 * preferences. The form is editable, scrollable and saves to profile state.
 */
export default function ProfileModal({ open, onClose }) {
  const navigate = useNavigate();
  const { profile, saveProfile, initials } = useProfile();

  // Local draft so edits can be cancelled by simply closing the modal.
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);

  // Latest profile without making it an effect dependency.
  const profileRef = useRef(profile);
  profileRef.current = profile;

  // Re-sync the draft each time the modal is opened.
  // `profile` is intentionally NOT a dependency: saving updates the profile and
  // must not wipe the "Saved" confirmation or the in-progress draft.
  useEffect(() => {
    if (open) {
      setDraft(profileRef.current);
      setSaved(false);
    }
  }, [open]);

  const set = (key, value) => setDraft((d) => ({ ...d, [key]: value }));

  const toggleGoal = (goal) =>
    setDraft((d) => ({
      ...d,
      learningGoals: d.learningGoals.includes(goal)
        ? d.learningGoals.filter((g) => g !== goal)
        : [...d.learningGoals, goal],
    }));

  const setSubject = (id, patch) =>
    setDraft((d) => ({
      ...d,
      subjects: d.subjects.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));

  const addSubject = () =>
    setDraft((d) => ({
      ...d,
      subjects: [...d.subjects, { id: Date.now(), name: "", level: "Beginner" }],
    }));

  const removeSubject = (id) =>
    setDraft((d) => ({ ...d, subjects: d.subjects.filter((s) => s.id !== id) }));

  const onSave = () => {
    saveProfile({
      ...draft,
      // Drop empty subject rows before saving.
      subjects: draft.subjects.filter((s) => s.name.trim()),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <Modal open={open} onClose={onClose} title="Profile" className="max-w-4xl">
      {/* Scrollable body so the form works on small screens */}
      <div className="thin-scroll max-h-[70vh] overflow-y-auto px-5 py-4">
        {/* Identity */}
        <div className="flex items-center gap-3 pb-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{profile.name}</p>
            <p className="text-xs text-muted-foreground">
              {profile.educationLevel} · {profile.fieldOfStudy}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <Section title="Basics">
            <Field label="Name">
              <input
                className={fieldClass}
                value={draft.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                className={fieldClass}
                value={draft.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
          </Section>

          <Section title="Education">
            <Field label="Education level">
              <Select
                value={draft.educationLevel}
                onChange={(v) => set("educationLevel", v)}
                options={educationLevels}
              />
            </Field>
            <Field label="Institution">
              <input
                className={fieldClass}
                value={draft.institution}
                onChange={(e) => set("institution", e.target.value)}
              />
            </Field>
            <Field label="Degree / program">
              <input
                className={fieldClass}
                value={draft.program}
                onChange={(e) => set("program", e.target.value)}
              />
            </Field>
            <Field label="Field of study">
              <input
                className={fieldClass}
                value={draft.fieldOfStudy}
                onChange={(e) => set("fieldOfStudy", e.target.value)}
              />
            </Field>
            <Field label="Current year / semester">
              <input
                className={fieldClass}
                value={draft.yearSemester}
                onChange={(e) => set("yearSemester", e.target.value)}
              />
            </Field>
          </Section>

          {/* Subjects + current level: drives how deep explanations start */}
          <section className="border-t border-border pt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] tracking-[0.12em] text-muted-foreground/70 uppercase">
                Subjects & current level
              </p>
              <button
                onClick={addSubject}
                className="flex items-center gap-1 rounded-sm px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Plus className="h-3.5 w-3.5" /> Add subject
              </button>
            </div>
            <div className="space-y-2">
              {draft.subjects.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <input
                    placeholder="Subject"
                    className={fieldClass}
                    value={s.name}
                    onChange={(e) => setSubject(s.id, { name: e.target.value })}
                  />
                  <div className="w-36 shrink-0">
                    <Select
                      value={s.level}
                      onChange={(v) => setSubject(s.id, { level: v })}
                      options={subjectLevels}
                    />
                  </div>
                  <button
                    onClick={() => removeSubject(s.id)}
                    aria-label={`Remove ${s.name || "subject"}`}
                    className="shrink-0 rounded-sm p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {draft.subjects.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No subjects yet — add one to personalise lessons.
                </p>
              )}
            </div>
          </section>

          {/* Learning goals: multi-select chips */}
          <section className="border-t border-border pt-4">
            <p className="mb-3 text-[11px] tracking-[0.12em] text-muted-foreground/70 uppercase">
              Learning goals
            </p>
            <div className="flex flex-wrap gap-2">
              {learningGoals.map((g) => {
                const active = draft.learningGoals.includes(g);
                return (
                  <button
                    key={g}
                    onClick={() => toggleGoal(g)}
                    className={cn(
                      "rounded-sm border px-3 py-1.5 text-xs transition-colors",
                      active
                        ? "border-primary/50 bg-primary/15 text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          </section>

          <Section title="Teaching preferences">
            <Field label="Preferred explanation style">
              <Select
                value={draft.explanationStyle}
                onChange={(v) => set("explanationStyle", v)}
                options={explanationStyles}
              />
            </Field>
            <Field label="Preferred examples">
              <Select
                value={draft.exampleStyle}
                onChange={(v) => set("exampleStyle", v)}
                options={exampleStyles}
              />
            </Field>
            <Field label="Visual learning preference">
              <Select
                value={draft.visualPreference}
                onChange={(v) => set("visualPreference", v)}
                options={visualPreferences}
              />
            </Field>
            <Field label="Preferred language">
              <Select
                value={draft.language}
                onChange={(v) => set("language", v)}
                options={languages}
              />
            </Field>
          </Section>
          {/* Appearance — theme applies to the whole application */}
          <section className="border-t border-border pt-4">
            <p className="mb-3 text-[11px] tracking-[0.12em] text-muted-foreground/70 uppercase">
              Appearance
            </p>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">Theme</span>
              <ThemeToggle variant="tabs" className="w-64 max-w-full" />
            </div>
          </section>
        </div>
      </div>

      {/* Sticky-feeling action bar */}
      <div className="flex flex-wrap items-center gap-2 border-t border-border px-5 py-3">
        <Button size="sm" onClick={onSave}>
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Saved
            </>
          ) : (
            "Save changes"
          )}
        </Button>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => {
            onClose();
            navigate({ to: "/login" });
          }}
        >
          Log out
        </Button>
      </div>
    </Modal>
  );
}
