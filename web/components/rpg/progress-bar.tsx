import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  showLabel = true,
  className,
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-300"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={`${percentage}% 完成`}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground tabular-nums min-w-[2.5rem] text-right">
          {percentage}%
        </span>
      )}
    </div>
  );
}
