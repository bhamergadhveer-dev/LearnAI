import { cn } from "@/lib/utils";

/**
 * Minimal button primitive.
 * Variants stay limited on purpose: primary (accent), ghost, outline, subtle.
 */
const VARIANTS = {
  primary: "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-40",
  outline: "border border-border text-foreground hover:bg-accent",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-accent",
  subtle: "bg-secondary text-secondary-foreground hover:bg-accent",
};

const SIZES = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  icon: "h-9 w-9",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed cursor-pointer",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
