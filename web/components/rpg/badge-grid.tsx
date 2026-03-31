import { Award, Shield, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BadgeData } from "@/lib/sample-data";

interface BadgeGridProps {
  badges: BadgeData[];
  className?: string;
}

const iconMap = {
  award: Award,
  shield: Shield,
  trophy: Trophy,
} as const;

export function BadgeGrid({ badges, className }: BadgeGridProps) {
  return (
    <div className={cn("grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3", className)}>
      {badges.map((badge) => {
        const Icon = iconMap[badge.icon];
        return (
          <div
            key={badge.id}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all duration-200",
              badge.unlocked
                ? "bg-violet-400/10 border border-violet-400/20"
                : "bg-slate-700/50 border border-slate-700 opacity-50"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full p-2",
                badge.unlocked
                  ? "bg-violet-400/20 text-violet-400"
                  : "bg-slate-700 text-slate-500"
              )}
            >
              <Icon className="size-5" />
            </div>
            <span
              className={cn(
                "text-xs font-medium leading-tight",
                badge.unlocked
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {badge.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
