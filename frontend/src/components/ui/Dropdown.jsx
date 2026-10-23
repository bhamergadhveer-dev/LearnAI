import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Reusable custom dropdown (never a native <select>).
 *
 * `trigger` is a render prop receiving { open, toggle }.
 * Features: outside-click + Escape close, smooth open animation,
 * theme-aware surface, subtle border and 10px radius.
 *
 * The menu automatically flips to the opposite side when the preferred
 * side does not have enough room in the viewport (e.g. a "bottom" menu
 * near the bottom of the screen opens upward instead).
 */
export default function Dropdown({
  trigger,
  children,
  align = "left",
  placement = "top", // "top" opens upward, "bottom" opens downward
  className,
  closeOnSelect = true,
}) {
  const [open, setOpen] = useState(false);
  // Resolved side after the space check — starts at the preferred placement.
  const [side, setSide] = useState(placement);
  const ref = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Flip the menu before paint so it never renders off-screen.
  useLayoutEffect(() => {
    if (!open) {
      setSide(placement);
      return;
    }
    const trigRect = ref.current?.getBoundingClientRect();
    const menuH = menuRef.current?.offsetHeight ?? 0;
    if (!trigRect) return;
    const gap = 12;
    const below = window.innerHeight - trigRect.bottom - gap;
    const above = trigRect.top - gap;
    if (placement === "bottom" && below < menuH && above > below) setSide("top");
    else if (placement === "top" && above < menuH && below > above) setSide("bottom");
    else setSide(placement);
  }, [open, placement, children]);

  return (
    <div className="relative" ref={ref}>
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open && (
        <div
          role="menu"
          ref={menuRef}
          className={cn(
            "dropdown-in float-panel absolute z-40 min-w-44 rounded-sm border border-border bg-popover p-1 text-popover-foreground",
            side === "top" ? "bottom-full mb-1.5" : "top-full mt-1.5",
            align === "right" ? "right-0" : "left-0",
            className,
          )}
          onClick={() => closeOnSelect && setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}


/** Single dropdown row with hover / active states. */
export function DropdownItem({ children, active, className, ...props }) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-2.5 py-1.5 text-left text-[13px] transition-colors hover:bg-accent hover:text-accent-foreground",
        active ? "bg-accent/60 text-primary" : "text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** Thin separator between dropdown groups. */
export function DropdownSeparator() {
  return <div className="my-1 h-px bg-border" />;
}
