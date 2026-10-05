import ChatItem from "./ChatItem";
import { chatGroups } from "@/data/mockData";

/** Grouped list of previous learning sessions (Today / Yesterday / Previous). */
export default function ChatList({ activeId, onSelect }) {
  return (
    <div className="space-y-4">
      {chatGroups.map((group) => (
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
