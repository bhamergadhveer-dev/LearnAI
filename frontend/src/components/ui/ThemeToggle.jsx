import { Monitor, Moon, Sun } from "lucide-react";
import Dropdown, { DropdownItem } from "./Dropdown";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

/** Icon shown for each theme mode. */
const MODES = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

/**
 * Light / Dark / System switcher.
 * Used in the sidebar, the landing header and the profile modal.
 */
export default function ThemeToggle({
  placement = "top",
  align = "left",
  className,
  showLabel = false,
  variant = "dropdown",
}) {
  const { theme, setTheme } = useTheme();
  const active = MODES.find((m) => m.value === theme) ?? MODES[2];
  const Icon = active.icon;

  if (variant === "tabs") {
    return (
      <div
        role="group"
        aria-label="Theme"
        className={cn("flex items-center gap-1 rounded-sm border border-border bg-secondary/40 p-1", className)}
      >
        {MODES.map((mode) => (
          <button
            key={mode.value}
            type="button"
            aria-pressed={theme === mode.value}
            onClick={() => setTheme(mode.value)}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-sm px-2 py-1.5 text-xs transition-colors",
              theme === mode.value
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <mode.icon className="h-3.5 w-3.5" />
            {mode.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <Dropdown
      placement={placement}
      align={align}
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-label="Change theme"
          title="Theme"
          className={cn(
            "flex items-center gap-2 rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            showLabel ? "w-full px-2 py-1.5 text-[13px]" : "h-8 w-8 justify-center",
            open && "text-foreground",
            className,
          )}
        >
          <Icon className="h-4 w-4 shrink-0" />
          {showLabel && <span className="truncate">{active.label}</span>}
        </button>
      )}
    >
      {MODES.map((m) => (
        <DropdownItem key={m.value} active={m.value === theme} onClick={() => setTheme(m.value)}>
          <m.icon className="h-3.5 w-3.5" /> {m.label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
