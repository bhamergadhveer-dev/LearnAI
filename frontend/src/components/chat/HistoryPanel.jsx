import ProgressBar from "@/components/learning/ProgressBar";
// import { history } from "@/data/mockData";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

/**
 * Compact history panel: recently studied topics with understanding scores.
 * Deliberately not a dashboard — one row per topic.
 */
export default function HistoryPanel({ onSelect }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    api("/api/history")
      .then((d) => setItems(d.items))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-1">
      <p className="px-3 pb-1 text-[11px] tracking-wide text-muted-foreground/70 uppercase whitespace-nowrap">
        Recently learned
      </p>
      {history.map((h) => (
        <button
          key={h.id}
          onClick={() => onSelect(h.id)}
          className="w-full rounded-sm px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent"
        >
          <div className="flex items-baseline justify-between gap-2 whitespace-nowrap">
            <span className="truncate text-sm text-foreground whitespace-nowrap">{h.topic}</span>
            <span className="shrink-0 text-[11px] text-muted-foreground whitespace-nowrap">
              {h.date}
            </span>
          </div>
          <ProgressBar value={h.understanding} className="mt-2" />
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-muted-foreground whitespace-nowrap">
            <span className="whitespace-nowrap">{h.understanding}% understanding</span>
            <span className="whitespace-nowrap">{h.review}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
