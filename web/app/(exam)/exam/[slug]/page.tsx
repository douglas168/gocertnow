"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, ChevronLeft, ChevronRight, Flag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { HpBar } from "@/components/rpg/hp-bar";
import { sampleExam } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

export default function MockExamPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { questions, timeLimit } = sampleExam;
  const totalQuestions = questions.length;

  // State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  );
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  // Computed
  const answeredCount = answers.filter((a) => a !== null).length;
  const correctCount = answers.reduce<number>(
    (count, answer, idx) =>
      answer !== null && answer === questions[idx].correctIndex
        ? count + 1
        : count,
    0
  );
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = flagged.size;

  // Timer
  useEffect(() => {
    if (examSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examSubmitted]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === 0 && !examSubmitted) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, examSubmitted]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQuestion] = optionIndex;
      return next;
    });
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion)) {
        next.delete(currentQuestion);
      } else {
        next.add(currentQuestion);
      }
      return next;
    });
  };

  const handleSubmit = useCallback(() => {
    setExamSubmitted(true);
    // Save answers and time to sessionStorage for result page
    const examResult = {
      slug,
      answers: answers,
      timeSpent: timeLimit - timeRemaining,
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options,
        correctIndex: q.correctIndex,
        explanation: q.explanation,
        category: q.category,
      })),
    };
    try {
      sessionStorage.setItem("examResult", JSON.stringify(examResult));
    } catch {
      // sessionStorage not available
    }
    router.push(`/exam/${slug}/result`);
  }, [slug, answers, timeLimit, timeRemaining, questions, router]);

  const q = questions[currentQuestion];
  const isTimeLow = timeRemaining < 300; // less than 5 minutes

  return (
    <div className="min-h-screen flex flex-col text-slate-100">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur border-b border-slate-800 px-4 md:px-6 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
          {/* HP Bar */}
          <div className="flex items-center gap-2 flex-1 min-w-0 mr-2">
            <span className="text-xs text-slate-500 shrink-0">HP</span>
            <HpBar
              current={correctCount}
              max={answeredCount || 1}
              className="h-3"
            />
          </div>

          {/* Timer */}
          <div className="flex items-center gap-1.5 shrink-0 mx-2">
            <Clock className="size-4 text-slate-500" />
            <span
              className={cn(
                "font-mono text-lg tabular-nums transition-colors duration-200",
                isTimeLow ? "text-red-400" : "text-slate-200"
              )}
            >
              {formatTime(timeRemaining)}
            </span>
          </div>

          {/* Question counter */}
          <div className="text-sm text-slate-400 shrink-0 mx-2">
            <span className="text-slate-200 font-semibold">
              {currentQuestion + 1}
            </span>{" "}
            / {totalQuestions}
          </div>

          {/* Exit button */}
          <AlertDialog>
            <AlertDialogTrigger
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 cursor-pointer shrink-0 min-h-[44px] px-3 rounded-md border border-slate-700 hover:border-red-400/50 transition-colors duration-200"
              aria-label="離開考試"
            >
              <LogOut className="size-4" />
              離開考試
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-900 border-slate-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading">
                  確定要離開考試嗎？
                </AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  離開競技場後，你的作答進度將不會被保存。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer min-h-[44px]">
                  繼續考試
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => router.push("/dashboard")}
                  className="bg-red-500 hover:bg-red-600 text-white cursor-pointer min-h-[44px]"
                >
                  離開考試
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Question Grid */}
      <div className="border-b border-slate-800 px-4 md:px-6 py-3">
        <div className="max-w-3xl mx-auto overflow-x-auto">
          <div className="flex flex-wrap gap-1.5 justify-center min-w-0">
            {questions.map((_, i) => {
              const isAnswered = answers[i] !== null;
              const isCurrent = i === currentQuestion;
              const isFlagged = flagged.has(i);

              let btnClass =
                "bg-slate-800 text-slate-500 border border-slate-700";
              if (isFlagged) {
                btnClass = "bg-amber-400/30 text-amber-300";
              } else if (isAnswered) {
                btnClass = "bg-indigo-500/30 text-indigo-300";
              }
              if (isCurrent) {
                btnClass += " ring-2 ring-indigo-400";
              }

              return (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={cn(
                    "size-7 rounded text-[10px] font-semibold cursor-pointer transition-all duration-150",
                    btnClass
                  )}
                  aria-label={`第 ${i + 1} 題`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Question area */}
      <main className="flex-1 flex items-start justify-center px-4 md:px-6 py-8 md:py-10">
        <div className="max-w-3xl w-full">
          {/* Category tag */}
          {q.category && (
            <div className="mb-4">
              <span className="text-xs text-slate-500 bg-slate-800 rounded px-2 py-1">
                {q.category}
              </span>
            </div>
          )}

          {/* Question card */}
          <div
            className="bg-[#0F172A] rounded-xl p-6 md:p-8 border border-slate-800 mb-6 motion-safe:transition-opacity motion-safe:duration-150"
            key={currentQuestion}
          >
            <h2 className="text-lg font-semibold mb-6 leading-relaxed">
              {q.question}
            </h2>

            <div className="space-y-3">
              {q.options.map((option, idx) => {
                const isSelected = answers[currentQuestion] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-lg border p-4 text-left text-sm transition-all duration-200 min-h-[44px] cursor-pointer",
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-slate-700 bg-slate-800 hover:border-indigo-500/50"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                        isSelected
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-slate-600 text-slate-500"
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

          {/* Bottom actions */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() =>
                  setCurrentQuestion((prev) => Math.max(0, prev - 1))
                }
                disabled={currentQuestion === 0}
                className="text-slate-400 hover:text-slate-200 cursor-pointer min-h-[44px] gap-1 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="size-4" />
                上一題
              </Button>
              <button
                onClick={handleToggleFlag}
                className={cn(
                  "flex items-center gap-1.5 text-sm cursor-pointer transition-colors duration-200 min-h-[44px] px-2",
                  flagged.has(currentQuestion)
                    ? "text-amber-400"
                    : "text-amber-400/50 hover:text-amber-400"
                )}
                aria-pressed={flagged.has(currentQuestion)}
              >
                <Flag
                  className="size-4"
                  fill={flagged.has(currentQuestion) ? "currentColor" : "none"}
                />
                標記複查
              </button>
            </div>

            <div className="flex items-center gap-3">
              {currentQuestion === totalQuestions - 1 ? (
                <AlertDialog
                  open={showSubmitDialog}
                  onOpenChange={setShowSubmitDialog}
                >
                  <AlertDialogTrigger
                    className="inline-flex items-center justify-center rounded-md bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer min-h-[44px] px-8 font-semibold text-sm transition-colors duration-200"
                  >
                    提交考試
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-slate-900 border-slate-700">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-heading">
                        確定要提交考試嗎？
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-400 space-y-2">
                        <span className="block">
                          未作答題數：
                          <span className="text-foreground font-semibold">
                            {unansweredCount}
                          </span>
                        </span>
                        <span className="block">
                          標記複查題數：
                          <span className="text-amber-400 font-semibold">
                            {flaggedCount}
                          </span>
                        </span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer min-h-[44px]">
                        返回檢查
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleSubmit}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer min-h-[44px]"
                      >
                        提交考試
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <Button
                  onClick={() =>
                    setCurrentQuestion((prev) =>
                      Math.min(totalQuestions - 1, prev + 1)
                    )
                  }
                  className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer min-h-[44px] px-8 font-semibold gap-1"
                >
                  下一題
                  <ChevronRight className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
