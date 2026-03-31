"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Trophy, Shield, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadarChart } from "@/components/rpg/radar-chart";
import { sampleExam, sampleDashboard } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

interface StoredResult {
  slug: string;
  answers: (number | null)[];
  timeSpent: number;
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    category?: string;
  }[];
}

// Score ring SVG component
function ScoreRing({
  percentage,
  pass,
}: {
  percentage: number;
  pass: boolean;
}) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const strokeColor = pass ? "#34D399" : "#F87171";

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg
        className="w-28 h-28 -rotate-90"
        viewBox="0 0 100 100"
        role="img"
        aria-label={`分數: ${percentage}%`}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#1E293B"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="motion-safe:transition-all motion-safe:duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-3xl font-heading font-bold">{percentage}%</span>
      </div>
    </div>
  );
}

export default function ExamResultPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [storedResult, setStoredResult] = useState<StoredResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Try to load from sessionStorage
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("examResult");
      if (raw) {
        const parsed = JSON.parse(raw) as StoredResult;
        if (parsed.slug === slug) {
          setStoredResult(parsed);
        }
      }
    } catch {
      // sessionStorage not available
    }
    setLoaded(true);
  }, [slug]);

  // Build result data from sessionStorage or fallback to sample
  const resultData = useMemo(() => {
    if (storedResult) {
      const { questions, answers, timeSpent } = storedResult;
      const total = questions.length;
      const correctCount = answers.reduce(
        (count: number, answer: number | null, idx: number) =>
          answer !== null && answer === questions[idx].correctIndex
            ? count + 1
            : count,
        0
      );
      const percentage = Math.round((correctCount / total) * 100);

      // Compute category breakdown
      const categoryMap = new Map<
        string,
        { correct: number; total: number }
      >();
      questions.forEach((q, idx) => {
        const cat = q.category ?? "其他";
        if (!categoryMap.has(cat)) {
          categoryMap.set(cat, { correct: 0, total: 0 });
        }
        const entry = categoryMap.get(cat)!;
        entry.total++;
        if (answers[idx] === q.correctIndex) {
          entry.correct++;
        }
      });

      const categories = Array.from(categoryMap.entries()).map(
        ([name, data]) => ({
          name,
          correct: data.correct,
          total: data.total,
          percentage: Math.round((data.correct / data.total) * 100),
        })
      );

      // Wrong answers
      const wrongAnswers = questions
        .map((q, idx) => ({
          index: idx,
          question: q.question,
          options: q.options,
          userAnswer: answers[idx],
          correctIndex: q.correctIndex,
          explanation: q.explanation,
          category: q.category,
        }))
        .filter(
          (item) =>
            item.userAnswer !== null &&
            item.userAnswer !== item.correctIndex
        );

      return {
        total,
        correctCount,
        percentage,
        pass: percentage >= 70,
        timeSpent,
        categories,
        wrongAnswers,
        radarScores: categories.map((c) => ({
          category: c.name,
          score: c.percentage,
        })),
      };
    }

    // Fallback sample data: simulate 7/10 correct (70%)
    const total = sampleExam.questions.length;
    const correctCount = 7;
    const percentage = 70;

    const categoryMap = new Map<string, { correct: number; total: number }>();
    sampleExam.questions.forEach((q) => {
      const cat = q.category ?? "其他";
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, { correct: 0, total: 0 });
      }
      categoryMap.get(cat)!.total++;
    });
    // Distribute correct answers
    let remaining = correctCount;
    for (const [, data] of categoryMap) {
      const give = Math.min(remaining, Math.ceil(data.total * 0.7));
      data.correct = give;
      remaining -= give;
    }

    const categories = Array.from(categoryMap.entries()).map(
      ([name, data]) => ({
        name,
        correct: data.correct,
        total: data.total,
        percentage:
          data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      })
    );

    // Sample wrong answers
    const wrongAnswers = sampleExam.questions.slice(0, 3).map((q, idx) => ({
      index: idx,
      question: q.question,
      options: [...q.options],
      userAnswer: q.correctIndex === 0 ? 1 : 0,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
      category: q.category,
    }));

    return {
      total,
      correctCount,
      percentage,
      pass: percentage >= 70,
      timeSpent: 2250,
      categories,
      wrongAnswers,
      radarScores:
        categories.length >= 3
          ? categories.map((c) => ({ category: c.name, score: c.percentage }))
          : sampleDashboard.radarScores,
    };
  }, [storedResult]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 80)
      return { label: "強", variant: "emerald" as const };
    if (percentage >= 60)
      return { label: "待加強", variant: "amber" as const };
    return { label: "弱", variant: "red" as const };
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">載入中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Simple top bar */}
      <nav className="bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
          <Link
            href="/"
            className="text-xl font-heading font-bold tracking-tight"
          >
            Level<span className="text-emerald-500">Cert</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer min-h-[44px] flex items-center"
          >
            回到儀表板
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-10">
        {/* Result Header */}
        <div className="text-center mb-12">
          <div
            className={cn(
              "inline-flex items-center justify-center size-20 rounded-full mb-4",
              resultData.pass ? "bg-emerald-500/20" : "bg-slate-700/50"
            )}
          >
            {resultData.pass ? (
              <Trophy className="size-10 text-emerald-400" />
            ) : (
              <Shield className="size-10 text-slate-400" />
            )}
          </div>
          <h1
            className={cn(
              "text-3xl md:text-4xl font-heading font-bold mb-4",
              resultData.pass ? "text-emerald-400" : "text-muted-foreground"
            )}
          >
            {resultData.pass ? "勝利！" : "挑戰失敗...但還沒結束。"}
          </h1>

          <ScoreRing
            percentage={resultData.percentage}
            pass={resultData.pass}
          />

          <p className="text-muted-foreground mt-4">
            {resultData.correctCount}/{resultData.total} 正確 | 時間:{" "}
            {formatTime(resultData.timeSpent)}
          </p>
        </div>

        {/* Category Breakdown */}
        <div className="mb-10">
          <h2 className="text-xl font-heading font-semibold mb-6">
            戰鬥報告 — 分類分析
          </h2>

          {/* Radar chart (hidden on small screens, shown md+) */}
          {resultData.radarScores.length >= 3 && (
            <div className="hidden md:block mb-8">
              <RadarChart
                categories={resultData.radarScores}
                size={280}
                className="mx-auto"
              />
            </div>
          )}

          {/* Category cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {resultData.categories.map((cat) => {
              const status = getStatusBadge(cat.percentage);
              const barColor =
                status.variant === "emerald"
                  ? "bg-emerald-400"
                  : status.variant === "amber"
                  ? "bg-amber-400"
                  : "bg-red-400";
              const badgeColor =
                status.variant === "emerald"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : status.variant === "amber"
                  ? "bg-amber-400/20 text-amber-400"
                  : "bg-red-400/20 text-red-400";

              return (
                <div
                  key={cat.name}
                  className="bg-card rounded-xl p-5 border border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold">{cat.name}</span>
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded text-xs font-semibold",
                        badgeColor
                      )}
                    >
                      {status.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-2 rounded-full motion-safe:transition-all motion-safe:duration-500",
                          barColor
                        )}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {cat.correct}/{cat.total}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile category bars (replaces radar on small screens) */}
          {resultData.radarScores.length >= 3 && (
            <div className="md:hidden mt-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                能力雷達
              </h3>
              <div className="space-y-3">
                {resultData.radarScores.map((score) => (
                  <div key={score.category} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-20 shrink-0 truncate">
                      {score.category}
                    </span>
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-2 bg-indigo-400 rounded-full motion-safe:transition-all motion-safe:duration-500"
                        style={{ width: `${score.score}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">
                      {score.score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Badge Unlock */}
        {resultData.pass && (
          <div className="mb-10">
            <div className="bg-card rounded-xl p-6 border border-violet-500/30 text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-violet-500/20 mb-3 ring-2 ring-violet-400/30 motion-safe:animate-pulse">
                <Trophy className="size-8 text-violet-400" />
              </div>
              <h3 className="font-heading font-semibold text-violet-400 mb-1">
                解鎖徽章！
              </h3>
              <p className="text-sm text-muted-foreground">
                合格勇者 — 模擬考試達到 70% 以上
              </p>
            </div>
          </div>
        )}

        {/* Wrong Answer Review */}
        {resultData.wrongAnswers.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-heading font-semibold mb-6">
              錯題回顧
            </h2>
            <Accordion multiple className="space-y-3">
              {resultData.wrongAnswers.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`wrong-${i}`}
                  className="bg-card rounded-xl border border-border overflow-hidden"
                >
                  <AccordionTrigger className="p-5 hover:no-underline cursor-pointer">
                    <div className="flex items-center gap-3 text-left">
                      <div className="size-6 rounded-full bg-red-400/20 flex items-center justify-center shrink-0">
                        <XCircle className="size-3 text-red-400" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-semibold line-clamp-2">
                          Q{item.index + 1}: {item.question}
                        </span>
                        {item.category && (
                          <span className="ml-2 text-xs text-muted-foreground bg-slate-800 rounded px-1.5 py-0.5">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 space-y-3">
                    {/* User answer (wrong) */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-400/10 border border-red-400/20">
                      <span className="text-xs text-red-400 shrink-0 mt-0.5">
                        你的答案：
                      </span>
                      <span className="text-sm text-red-300">
                        {item.userAnswer !== null
                          ? item.options[item.userAnswer]
                          : "未作答"}
                      </span>
                    </div>
                    {/* Correct answer */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-xs text-emerald-400 shrink-0 mt-0.5">
                        正確答案：
                      </span>
                      <span className="text-sm text-emerald-300">
                        {item.options[item.correctIndex]}
                      </span>
                    </div>
                    {/* AI Explanation */}
                    <div className="bg-slate-800 rounded-lg p-4">
                      <div className="text-xs font-semibold text-muted-foreground mb-2">
                        AI 解析
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {item.explanation}
                      </p>
                      <Link
                        href={`/learn/${slug}/1-1-intro`}
                        className="inline-flex items-center gap-1 text-xs text-indigo-400 mt-3 hover:underline cursor-pointer"
                      >
                        複習相關課程 →
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6 border-t border-border">
          {resultData.pass ? (
            <>
              <Link href={`/learn/${slug}/1-1-intro`}>
                <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer min-h-[44px] px-6 font-semibold">
                  複習弱點
                </Button>
              </Link>
              <Link href={`/exam/${slug}`}>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto cursor-pointer min-h-[44px] px-6 font-semibold"
                >
                  再次挑戰
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/exam/${slug}`}>
                <Button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer min-h-[44px] px-6 font-semibold">
                  重新挑戰
                </Button>
              </Link>
              <Link href={`/learn/${slug}/1-1-intro`}>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto cursor-pointer min-h-[44px] px-6 font-semibold"
                >
                  先複習弱點
                </Button>
              </Link>
            </>
          )}
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="w-full sm:w-auto text-muted-foreground cursor-pointer min-h-[44px] px-6"
            >
              回到儀表板
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
