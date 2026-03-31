"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnswerFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
  className?: string;
}

export function AnswerFeedback({
  isCorrect,
  correctAnswer,
  explanation,
  className,
}: AnswerFeedbackProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-all duration-200",
        isCorrect
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-red-400/30 bg-red-400/10",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        {isCorrect ? (
          <>
            <CheckCircle className="size-5 text-emerald-400" />
            <span className="font-heading text-sm font-semibold text-emerald-400">
              回答正確！
            </span>
          </>
        ) : (
          <>
            <XCircle className="size-5 text-red-400" />
            <span className="font-heading text-sm font-semibold text-red-400">
              回答錯誤
            </span>
          </>
        )}
      </div>

      {/* Correct answer (show when wrong) */}
      {!isCorrect && (
        <p className="text-sm text-foreground mb-3">
          <span className="text-muted-foreground">正確答案：</span>
          <span className="font-medium text-emerald-400">{correctAnswer}</span>
        </p>
      )}

      {/* AI Explanation (collapsible) */}
      <div className="mt-2">
        <button
          className="flex cursor-pointer items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 min-h-[44px]"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
          AI 解析
        </button>

        {expanded && (
          <div className="mt-2 rounded-lg bg-slate-800 p-4 text-sm text-muted-foreground leading-relaxed">
            {explanation}
          </div>
        )}
      </div>
    </div>
  );
}
