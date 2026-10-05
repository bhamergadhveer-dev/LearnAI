import { useMemo, useState } from "react";
import { Search, X, Clock } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { allSessions, recentSearches } from "@/data/mockData";

/**
 * Search overlay for finding previous learning sessions.
 * Filtering runs against mock data; shows recents when the query is empty
 * and an explicit empty state when nothing matches.
 */
export default function SearchModal({ open, onClose, onSelect }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allSessions.filter((s) => s.title.toLowerCase().includes(q));
  }, [query]);

  const handleSelect = (id) => {
    setQuery("");
    onSelect(id);
  };

  return (
    <Modal open={open} onClose={onClose} showClose={false} className="max-w-3xl">
      {/* Search input row */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search topics, chats..."
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="rounded-sm p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="thin-scroll max-h-[55vh] overflow-y-auto p-2">
        {!query && (
          <>
            <p className="px-3 pt-2 pb-1 text-[11px] tracking-wide text-muted-foreground/70 uppercase">
              Recent
            </p>
            {recentSearches.map((r) => (
              <button
                key={r}
                onClick={() => setQuery(r)}
                className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Clock className="h-3.5 w-3.5" />
                {r}
              </button>
            ))}
          </>
        )}

        {query && results.length === 0 && (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">
            No learning sessions match “{query}”.
          </p>
        )}

        {results.map((r) => (
          <button
            key={r.id}
            onClick={() => handleSelect(r.id)}
            className="flex w-full items-center justify-between gap-3 rounded-sm px-3 py-2 text-left transition-colors hover:bg-accent"
          >
            <span className="truncate text-sm">{r.title}</span>
            <span className="shrink-0 text-[11px] text-muted-foreground">{r.group}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
}
