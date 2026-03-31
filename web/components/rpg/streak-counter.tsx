import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
  streak: number;
  size?: "sm" | "lg";
  className?: string;
}

export function StreakCounter({
  streak,
  size = "lg",
  className,
}: StreakCounterProps) {
  const isActive = streak > 0;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Flame
        className={cn(
          "shrink-0 transition-colors duration-200",
          isActive ? "text-red-400" : "text-slate-600",
          isActive && "motion-safe:animate-[pulse_2s_ease-in-out_infinite]",
          size === "lg" ? "size-6" : "size-4"
        )}
      />
      <span
        className={cn(
          "font-heading font-bold tabular-nums",
          isActive ? "text-foreground" : "text-muted-foreground",
          size === "lg" ? "text-2xl" : "text-sm"
        )}
      >
        {streak}
      </span>
      <span
        className={cn(
          "text-muted-foreground",
          size === "lg" ? "text-sm" : "text-xs"
        )}
      >
        {size === "lg" ? "天連續學習" : "天"}
      </span>
    </div>
  );
}
