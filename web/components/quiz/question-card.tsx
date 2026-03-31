"use client";

import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedIndex: number | null;
  correctIndex: number;
  showFeedback: boolean;
  onSelect: (index: number) => void;
}

export function QuestionCard({
  question,
  options,
  selectedIndex,
  correctIndex,
  showFeedback,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="space-y-6">
      {/* Question text */}
      <h3 className="font-heading text-lg font-semibold leading-relaxed">
        {question}
      </h3>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          const isCorrect = idx === correctIndex;

          let stateClasses = "border-border bg-slate-800/50 hover:border-indigo-500 cursor-pointer";

          if (showFeedback) {
            if (isCorrect) {
              stateClasses =
                "border-emerald-500 bg-emerald-500/10";
            } else if (isSelected && !isCorrect) {
              stateClasses =
                "border-red-400 bg-red-400/10";
            } else {
              stateClasses = "border-border bg-slate-800/50 opacity-60";
            }
          } else if (isSelected) {
            stateClasses =
              "border-indigo-500 bg-indigo-500/10 cursor-pointer";
          }

          return (
            <button
              key={idx}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg border p-4 text-left text-sm transition-all duration-200 min-h-[44px]",
                stateClasses,
                !showFeedback && "cursor-pointer"
              )}
              onClick={() => {
                if (!showFeedback) onSelect(idx);
              }}
              disabled={showFeedback}
              aria-pressed={isSelected}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                  showFeedback && isCorrect
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : showFeedback && isSelected && !isCorrect
                    ? "border-red-400 bg-red-400 text-white"
                    : isSelected
                    ? "border-indigo-500 bg-indigo-500 text-white"
                    : "border-border text-muted-foreground"
                )}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="leading-relaxed">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
