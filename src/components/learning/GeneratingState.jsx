/**
 * Loading state shown while the lesson is "generated".
 * Skeleton lines mimic the shape of the real lesson so the transition is calm.
 */
export default function GeneratingState({ topic }) {
  const steps = [
    "Understanding the topic",
    "Choosing the best teaching method",
    "Building explanations and examples",
  ];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-24 sm:px-6">
      <p className="text-sm text-muted-foreground">Preparing your lesson</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight">{topic}</h1>

      <ul className="mt-6 space-y-2">
        {steps.map((s, i) => (
          <li
            key={s}
            className="fade-up flex items-center gap-2 text-sm text-muted-foreground"
            style={{ animationDelay: `${i * 250}ms` }}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-sm bg-primary" />
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-10 space-y-3">
        {[100, 92, 80, 60].map((w) => (
          <div
            key={w}
            className="h-3 animate-pulse rounded-sm bg-secondary"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  );
}
