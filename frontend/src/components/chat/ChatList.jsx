import { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { api } from "@/lib/api";

/** Grouped list of saved lessons (Today / Yesterday / Previous). */
export default function ChatList({ activeId, onSelect }) {
  const [groups, setGroups] = useState(null);

  // Refetch when the active lesson changes so new lessons appear
  useEffect(() => {
    api("/api/sessions")
      .then((d) => setGroups(d.groups))
      .catch(() => setGroups([]));
  }, [activeId]);

  if (groups === null) return <p className="px-3 text-xs text-muted-foreground">Loading...</p>;
  if (groups.length === 0)
    return (
      <p className="px-3 text-xs text-muted-foreground">
        No lessons yet. Start one with “New Learn”.
      </p>
    );

  return (
    <div className="space-y-4">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 pb-1 text-[11px] tracking-wide text-muted-foreground/70 uppercase whitespace-nowrap">
            {group.label}
          </p>
          <div className="space-y-0.5">
            {group.items.map((item) => (
              <ChatItem
                key={item.id}
                title={item.title}
                time={item.time}
                active={activeId === item.id}
                onClick={() => onSelect(item.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
