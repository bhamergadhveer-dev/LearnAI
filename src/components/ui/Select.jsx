import { Check, ChevronDown } from "lucide-react";
import Dropdown, { DropdownItem } from "./Dropdown";
import { cn } from "@/lib/utils";

/**
 * Custom select built on <Dropdown> — replaces every native HTML <select>
 * so all menus share the LearnAI look in both light and dark themes.
 *
 * Props:
 * - value / onChange(value)
 * - options: array of strings (or { value, label, icon })
 */
export default function Select({
  value,
  onChange,
  options = [],
  placeholder = "Select…",
  icon: Icon,
  className,
  menuClassName,
  align = "left",
  placement = "bottom",
}) {
  const items = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  const current = items.find((o) => o.value === value);

  return (
    <Dropdown
      align={align}
      placement={placement}
      className={cn("max-h-64 w-full overflow-y-auto thin-scroll", menuClassName)}
      trigger={({ open, toggle }) => (
        <button
          type="button"
          onClick={toggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            "flex w-full items-center gap-2 rounded-sm border border-border bg-secondary/40 px-2.5 py-1.5 text-left text-[13px] transition-colors hover:border-primary/30",
            open && "border-primary/50",
            className,
          )}
        >
          {Icon && <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
          <span className={cn("min-w-0 flex-1 truncate", !current && "text-muted-foreground")}>
            {current?.label ?? placeholder}
          </span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      )}
    >
      {items.map((o) => (
        <DropdownItem
          key={o.value}
          active={o.value === value}
          onClick={() => onChange?.(o.value)}
        >
          {o.icon && <o.icon className="h-3.5 w-3.5" />}
          <span className="min-w-0 flex-1 truncate">{o.label}</span>
          {o.value === value && <Check className="h-3.5 w-3.5 shrink-0" />}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}
