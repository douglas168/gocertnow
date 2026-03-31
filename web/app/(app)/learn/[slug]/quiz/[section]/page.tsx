"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Swords, ArrowLeft, RotateCcw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/quiz/question-card";
import { AnswerFeedback } from "@/components/quiz/answer-feedback";
import { sampleQuiz, sampleCourses } from "@/lib/sample-data";

interface AnswerRecord {
  selected: number;
  correct: boolean;
}

export default function SectionQuizPage() {
  const params = useParams();
  const slug = params.slug as string;
  const sectionParam = params.section as string;

  // Resolve section name from sample data
  const course = sampleCourses.find((c) => c.slug === slug) ?? sampleCourses[0];
  // Support both "section-1" (1-indexed) and plain number formats
  const sectionNumber = sectionParam.startsWith("section-")
    ? parseInt(sectionParam.replace("section-", ""), 10)
    : parseInt(sectionParam, 10);
  const sectionIndex = (isNaN(sectionNumber) ? 1 : sectionNumber) - 1;
  const section = course.sections[sectionIndex >= 0 ? sectionIndex : 0] ?? course.sections[0];

  const questions = sampleQuiz;
  const totalQuestions = questions.length;

  // State
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const correctCount = answers.filter((a) => a.correct).length;
  const xpEarned = correctCount * 10;
  const perfectScore = correctCount === totalQuestions;

  function handleSelect(index: number) {
    if (!showFeedback) {
      setSelectedAnswer(index);
    }
  }

  function handleConfirm() {
    if (selectedAnswer === null) return;
    setShowFeedback(true);
    setAnswers((prev) => [
      ...prev,
      {
        selected: selectedAnswer,
        correct: selectedAnswer === questions[currentQuestion].correctIndex,
      },
    ]);
  }

  function handleNext() {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizComplete(true);
    }
  }

  function handleRetry() {
    setStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setAnswers([]);
    setQuizComplete(false);
  }

  // Intro screen
  if (!started) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 rounded-full px-4 py-1.5 mb-4">
            <Swords className="size-4" />
            <span>小怪戰鬥</span>
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold mb-3">
            小怪戰鬥: {section.title}
          </h1>
          <p className="text-muted-foreground mb-8">
            {totalQuestions} 題, 無時間限制, 可重複挑戰
          </p>
          <Button
            onClick={() => setStarted(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer px-8 py-3 text-base font-semibold min-h-[44px]"
          >
            開始挑戰
          </Button>
        </div>
      </div>
    );
  }

  // Completion screen
  if (quizComplete) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <div className="font-heading text-4xl font-bold mb-2">
              {correctCount}/{totalQuestions}
            </div>
            <div className="text-muted-foreground mb-4">答對題數</div>
            <div className="text-amber-400 font-heading font-bold text-xl mb-2">
              +{xpEarned} XP
            </div>
            {perfectScore && (
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-violet-400 bg-violet-400/10 rounded-full px-4 py-1.5 mb-4 motion-safe:animate-pulse">
                <Swords className="size-4" />
                解鎖徽章：小怪殺手
              </div>
            )}
            {correctCount < Math.ceil(totalQuestions * 0.7) && (
              <p className="text-sm text-muted-foreground mb-4">
                建議：在進入下一章節前，重新挑戰本測驗
              </p>
            )}
            <div className="flex gap-3 justify-center mt-6">
              <Button
                variant="outline"
                onClick={handleRetry}
                className="cursor-pointer min-h-[44px] gap-2"
              >
                <RotateCcw className="size-4" />
                重新挑戰
              </Button>
              <Link
                href={`/learn/${slug}/${course.sections[sectionIndex + 1]?.lessons[0]?.slug ?? course.sections[0].lessons[0].slug}`}
              >
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer min-h-[44px] gap-2">
                  繼續下一章
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Question screen
  const q = questions[currentQuestion];

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Top bar with back link and question counter */}
      <div className="border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 md:px-6 py-4">
          <Link
            href={`/learn/${slug}/${section.lessons[section.lessons.length - 1]?.slug ?? "1-1-intro"}`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer min-h-[44px]"
          >
            <ArrowLeft className="size-4" />
            返回課程
          </Link>
          <div className="text-sm text-muted-foreground">
            第 <span className="text-foreground font-semibold">{currentQuestion + 1}</span> 題，共 {totalQuestions} 題
          </div>
        </div>
      </div>

      {/* Progress dots */}
      <div className="max-w-2xl mx-auto w-full px-4 md:px-6 pt-6">
        <div className="flex gap-2 justify-center">
          {questions.map((_, i) => {
            let dotClass = "bg-slate-700";
            if (i < answers.length) {
              dotClass = answers[i].correct ? "bg-emerald-400" : "bg-red-400";
            } else if (i === currentQuestion) {
              dotClass = "bg-indigo-500 ring-2 ring-indigo-400/50";
            }
            return (
              <div
                key={i}
                className={`size-3 rounded-full transition-all duration-200 ${dotClass}`}
              />
            );
          })}
        </div>
      </div>

      {/* Quiz content */}
      <div className="max-w-2xl mx-auto w-full px-4 md:px-6 py-8">
        {/* Section label */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 bg-indigo-500/10 rounded-full px-4 py-1.5">
            <Swords className="size-4" />
            小怪戰鬥: {section.title}
          </div>
        </div>

        {/* Question card */}
        <div className="bg-card rounded-xl shadow-lg p-6 md:p-8 border border-border mb-6">
          {q.category && (
            <div className="text-xs text-muted-foreground mb-4">
              分類：{q.category}
            </div>
          )}
          <QuestionCard
            question={q.question}
            options={[...q.options]}
            selectedIndex={selectedAnswer}
            correctIndex={q.correctIndex}
            showFeedback={showFeedback}
            onSelect={handleSelect}
          />
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className="mb-6 motion-safe:animate-[fadeIn_150ms_ease-in]">
            <AnswerFeedback
              isCorrect={selectedAnswer === q.correctIndex}
              correctAnswer={q.options[q.correctIndex]}
              explanation={q.explanation}
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex justify-end">
          {!showFeedback ? (
            <Button
              onClick={handleConfirm}
              disabled={selectedAnswer === null}
              className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer min-h-[44px] px-8 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              確認答案
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer min-h-[44px] px-8 font-semibold gap-2"
            >
              {currentQuestion < totalQuestions - 1 ? "下一題" : "查看結果"}
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
