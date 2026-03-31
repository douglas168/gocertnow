"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/rpg/progress-bar";
import type { Course } from "@/lib/sample-data";

interface CourseCardProps {
  course: Course;
  progress?: { completed: number; total: number; xpEarned?: number };
  continueHref?: string;
  examHref?: string;
  className?: string;
}

export function CourseCard({ course, progress, continueHref, examHref, className }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className={cn(
        "group block cursor-pointer rounded-xl bg-card p-6 ring-1 ring-foreground/10 shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      {/* Level badge */}
      <div className="mb-3">
        <Badge
          className={cn(
            "text-xs font-medium",
            course.level === "beginner"
              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              : "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
          )}
        >
          {course.level === "beginner" ? "初級" : "中級"}
        </Badge>
      </div>

      {/* Title */}
      <h3 className="font-heading text-lg font-semibold leading-snug mb-2 group-hover:text-foreground transition-colors duration-200">
        {course.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {course.description}
      </p>

      {/* Lesson count */}
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
        <BookOpen className="size-4" />
        <span>{course.totalLessons} 堂課</span>
        <span className="text-border">|</span>
        <span>約 {course.estimatedHours} 小時</span>
      </div>

      {/* Progress bar (if enrolled) */}
      {progress && (
        <div className="mb-4 space-y-1.5">
          <ProgressBar
            value={progress.completed}
            max={progress.total}
            showLabel
          />
          {progress.xpEarned !== undefined && (
            <p className="text-xs text-xp">+{progress.xpEarned} XP</p>
          )}
        </div>
      )}

      {/* Price or CTA */}
      <div className="flex items-center justify-between gap-2">
        {progress ? (
          <div className="flex items-center gap-2">
            {continueHref ? (
              <Link
                href={continueHref}
                onClick={(e) => e.stopPropagation()}
                className="inline-block"
              >
                <Button
                  className="cursor-pointer bg-cta text-white hover:bg-cta/80 min-h-[44px] px-4"
                >
                  繼續學習
                </Button>
              </Link>
            ) : (
              <Button
                className="cursor-pointer bg-cta text-white hover:bg-cta/80 min-h-[44px] px-4"
                onClick={(e) => e.preventDefault()}
              >
                繼續學習
              </Button>
            )}
            {examHref && (
              <Link
                href={examHref}
                onClick={(e) => e.stopPropagation()}
                className="inline-block"
              >
                <Button
                  variant="outline"
                  className="cursor-pointer min-h-[44px] px-4 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
                >
                  開始考試
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <>
            <span className="font-heading text-xl font-bold">
              NT${course.price.toLocaleString()}
            </span>
            <Button
              variant="secondary"
              className="cursor-pointer min-h-[44px] px-4"
            >
              查看課程
            </Button>
          </>
        )}
      </div>
    </Link>
  );
}
