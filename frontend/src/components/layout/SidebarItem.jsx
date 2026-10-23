import Tooltip from "@/components/ui/Tooltip";
import { cn } from "@/lib/utils";

/**
 * One sidebar row. Renders icon-only when the sidebar is collapsed
 * (with a hover tooltip) and icon + label when expanded.
 */
export default function SidebarItem({
  icon: Icon,
  label,
  expanded,
  active,
  onClick,
}) {
  const button = (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        "flex h-8 items-center rounded-sm transition-colors",
        expanded ? "w-full gap-2.5 px-2.5" : "w-[42px] justify-center",
        active
          ? "bg-sidebar-accent text-foreground"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {expanded && <span className="truncate text-sm">{label}</span>}
    </button>
  );

  // Tooltips only make sense in the collapsed, icon-only state.
  if (expanded) return button;
  return <Tooltip label={label}>{button}</Tooltip>;
}
