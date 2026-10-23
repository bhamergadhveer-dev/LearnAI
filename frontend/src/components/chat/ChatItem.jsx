import { cn } from "@/lib/utils";

/** A single previous learning session row in the sidebar. */
export default function ChatItem({ title, time, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left transition-colors",
        active
          ? "bg-sidebar-accent text-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
      )}
    >
      <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm">{title}</span>
      {time && <span className="shrink-0 whitespace-nowrap text-[11px] opacity-60">{time}</span>}
    </button>
  );
}
