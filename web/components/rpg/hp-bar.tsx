import { cn } from "@/lib/utils";

interface HpBarProps {
  current: number;
  max: number;
  className?: string;
}

export function HpBar({ current, max, className }: HpBarProps) {
  const percentage = max > 0 ? Math.round((current / max) * 100) : 0;

  return (
    <div
      className={cn("relative h-4 w-full overflow-hidden rounded-full bg-slate-700", className)}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={`HP: ${current}/${max}`}
    >
      {/* Fixed-width gradient inner that gets revealed by the overflow-hidden wrapper */}
      <div
        className="h-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(to right, #34D399, #FBBF24, #F87171)",
            /* The gradient spans the full bar width so color shifts as HP drains */
            width: max > 0 ? `${(100 / percentage) * 100}%` : "100%",
            minWidth: "100%",
          }}
        />
      </div>
    </div>
  );
}
