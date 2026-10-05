import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import ProfileModal from "./ProfileModal";
import SearchModal from "@/components/chat/SearchModal";
import { ProfileProvider } from "@/context/ProfileContext";

/**
 * Application shell.
 *
 * Owns the navigation-level UI state:
 * - `expanded`   : sidebar expanded (overlay) vs collapsed icon rail
 * - `panel`      : which list the expanded sidebar shows (chats | history)
 * - `searchOpen` / `profileOpen` : overlays
 *
 * The main region has a fixed left padding equal to the COLLAPSED rail width,
 * so expanding the sidebar never resizes or moves the learning workspace.
 */
export default function AppLayout({ children, activeId }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [panel, setPanel] = useState("chats");
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const openPanel = (name) => {
    setPanel(name);
    setExpanded(true);
  };

  const goToSession = (id) => {
    setExpanded(false);
    setSearchOpen(false);
    navigate({ to: "/app/learn/$id", params: { id } });
  };

  const newLearn = () => {
    setExpanded(false);
    navigate({ to: "/app" });
  };

  return (
    <ProfileProvider>
      {/* Lock the shell to the viewport and make the main region the only
          scrollable surface. This keeps the sidebar fixed while the content
          scrolls, and lets us hide the mobile scrollbar on the chat page. */}
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        {/* Click-outside layer: closes the expanded sidebar without moving content */}
        {expanded && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:bg-black/20"
            onClick={() => setExpanded(false)}
            aria-hidden="true"
          />
        )}

        <Sidebar
          expanded={expanded}
          onToggle={() => setExpanded((v) => !v)}
          panel={panel}
          onPanel={openPanel}
          onSearch={() => setSearchOpen(true)}
          onNewLearn={newLearn}
          onProfile={() => setProfileOpen(true)}
          activeId={activeId}
          onSelectChat={goToSession}
        />

        {/* Mobile: floating button opens the sidebar drawer */}
        <button
          onClick={() => setExpanded(true)}
          aria-label="Open menu"
          className="float-panel fixed top-3 left-3 z-20 flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-card text-muted-foreground md:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Learning workspace — never shifts when the sidebar expands.
            Scrollbar is hidden on mobile; a subtle thin scrollbar appears on md+. */}
        <main className="thin-scroll max-md:no-scrollbar min-h-0 flex-1 overflow-y-auto pt-14 pl-0 md:pt-0 md:pl-[78px]">
          {children}
        </main>

        <SearchModal
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          onSelect={goToSession}
        />
        <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
      </div>
    </ProfileProvider>
  );
}
