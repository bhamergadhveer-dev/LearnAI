import { Search, Plus, MessageSquare, History, GraduationCap } from "lucide-react";
import SidebarItem from "./SidebarItem";
import ChatList from "@/components/chat/ChatList";
import HistoryPanel from "@/components/chat/HistoryPanel";
import Tooltip from "@/components/ui/Tooltip";
import { useProfile } from "@/context/ProfileContext";
import { cn } from "@/lib/utils";

/**
 * Floating sidebar.
 *
 * Behaviour:
 * - Detached from the browser edges (inset margin + rounded corners + shadow).
 * - Collapsed by default (icon rail, ~68px) with hover tooltips.
 * - Expanded (~280px) it OVERLAYS the workspace: it is position:fixed, so the
 *   main content never resizes or shifts.
 * - On mobile it is hidden until opened, then behaves as a floating drawer.
 */
export default function Sidebar({
  expanded,
  onToggle,
  panel,
  onPanel,
  onSearch,
  onNewLearn,
  onProfile,
  activeId,
  onSelectChat,
}) {
  // Avatar + name come from live profile state so profile edits show instantly.
  const { profile, initials } = useProfile();

  const handleAsideClick = (e) => {
    // When the rail is collapsed, expand it if the user taps the sidebar
    // background (not an interactive button/link). Buttons keep their own
    // behaviour (e.g. Search opens the search modal, Chats expands the panel).
    if (!expanded && !e.target.closest("button, a, [role='button']")) {
      onToggle();
    }
  };

  return (
    <aside
      onClick={handleAsideClick}
      className={cn(
        // Floating rail: detached from every edge, subtle radius (10px),
        // overlays the workspace when expanded so content never shifts.
        "float-panel fixed top-3 bottom-3 left-3 z-40 flex flex-col cursor-pointer rounded-sm border border-sidebar-border bg-sidebar/95 transition-[width] duration-300 ease-out",
        expanded ? "w-[260px] max-w-[calc(100vw-24px)]" : "w-[50px]",
        expanded ? "flex" : "hidden md:flex",
      )}
    >
      {/* Brand header — no collapse icon here; collapse is handled by
          clicking the background (when collapsed) or the outside overlay. */}
      <div
        className={cn(
          "flex h-14 items-center",
          expanded ? "px-3" : "px-2",
          expanded ? "justify-between" : "justify-center",
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-primary/15 text-primary">
            <GraduationCap className="h-4 w-4" />
          </div>
          {expanded && (
            <span className="truncate text-sm font-semibold tracking-tight">LearnAI</span>
          )}
        </div>
      </div>

      {/* Primary navigation */}
      <nav className={cn("flex flex-col gap-1 pb-2", expanded ? "px-3" : "items-center px-1.5")}>
        <SidebarItem icon={Search} label="Search" expanded={expanded} onClick={onSearch} />
        <SidebarItem icon={Plus} label="New Learn" expanded={expanded} onClick={onNewLearn} />
        <SidebarItem
          icon={MessageSquare}
          label="Chats"
          expanded={expanded}
          active={expanded && panel === "chats"}
          onClick={() => onPanel("chats")}
        />
        <SidebarItem
          icon={History}
          label="History"
          expanded={expanded}
          active={expanded && panel === "history"}
          onClick={() => onPanel("history")}
        />
      </nav>

      {/* Panel content only exists in the expanded state */}
      {expanded && (
        <div className="thin-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden border-t border-sidebar-border px-2 py-3">
          {panel === "history" ? (
            <HistoryPanel onSelect={onSelectChat} />
          ) : (
            <ChatList activeId={activeId} onSelect={onSelectChat} />
          )}
        </div>
      )}
      <div
        className={cn(
          "mt-auto border-t border-sidebar-border",
          expanded ? "p-3" : "p-2",
          expanded ? "" : "flex justify-center",
        )}
      >
        <Tooltip label="Profile" className={expanded ? "w-full" : ""}>
          <button
            onClick={onProfile}
            aria-label="Profile"
            className={cn(
              "flex items-center rounded-[10px] transition-colors hover:bg-sidebar-accent",
              expanded ? "w-full gap-2.5 p-1.5" : "h-8 w-8 justify-center",
            )}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {initials}
            </span>
            {expanded && (
              <span className="min-w-0 flex-1 truncate text-left text-sm">{profile.name}</span>
            )}
          </button>
        </Tooltip>
      </div>
    </aside>
  );
}
