import { cn } from "@/lib/utils";

interface XpDisplayProps {
  xp: number;
  size?: "sm" | "lg";
  className?: string;
}

export function XpDisplay({ xp, size = "lg", className }: XpDisplayProps) {
  const formattedXp = xp.toLocaleString();

  return (
    <div className={cn("flex items-baseline gap-1.5", className)}>
      <span
        className={cn(
          "font-heading font-bold text-xp",
          size === "lg" ? "text-4xl" : "text-base"
        )}
      >
        {formattedXp}
      </span>
      <span
        className={cn(
          "font-heading font-semibold text-xp/70",
          size === "lg" ? "text-lg" : "text-xs"
        )}
      >
        XP
      </span>
    </div>
  );
}
