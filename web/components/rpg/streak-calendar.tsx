import { cn } from "@/lib/utils";

interface StreakCalendarProps {
  calendar: boolean[];
  className?: string;
}

const dayLabels = ["日", "一", "二", "三", "四", "五", "六"];

export function StreakCalendar({ calendar, className }: StreakCalendarProps) {
  // Ensure we have exactly 30 days, padded if needed
  const days = calendar.slice(0, 30);
  while (days.length < 30) {
    days.push(false);
  }

  // Calculate starting day offset (we'll start the calendar on a Monday-like grid)
  // For display, use a simple 7-column grid with day labels
  const rows: boolean[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  return (
    <div className={cn("space-y-2", className)}>
      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((label) => (
          <div
            key={label}
            className="text-center text-[10px] font-medium text-muted-foreground"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((active, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square rounded-sm transition-colors duration-200",
              active ? "bg-emerald-500/20" : "bg-slate-700"
            )}
            aria-label={active ? `第 ${i + 1} 天：已學習` : `第 ${i + 1} 天：未學習`}
          />
        ))}
      </div>
    </div>
  );
}
