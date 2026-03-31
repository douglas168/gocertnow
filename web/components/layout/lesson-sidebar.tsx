"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, ChevronRight, Menu, Swords, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Section } from "@/lib/sample-data";

interface LessonSidebarProps {
  courseSlug: string;
  sections: Section[];
  currentLesson: string;
  completedLessons: string[];
}

export function LessonSidebar({
  courseSlug,
  sections,
  currentLesson,
  completedLessons,
}: LessonSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    () => {
      // Auto-expand section containing current lesson
      const idx = sections.findIndex((s) =>
        s.lessons.some((l) => l.slug === currentLesson)
      );
      return new Set(idx >= 0 ? [idx] : [0]);
    }
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const sidebarContent = (
    <nav className="flex flex-col gap-1 py-4" aria-label="課程章節導覽">
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx}>
          {/* Section header */}
          <button
            className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-foreground transition-colors duration-200 hover:bg-muted min-h-[44px]"
            onClick={() => toggleSection(sectionIdx)}
            aria-expanded={expandedSections.has(sectionIdx)}
          >
            {expandedSections.has(sectionIdx) ? (
              <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            )}
            <span className="truncate">{section.title}</span>
          </button>

          {/* Lessons */}
          {expandedSections.has(sectionIdx) && (
            <div className="ml-3 flex flex-col gap-0.5 border-l border-border pl-3">
              {section.lessons.map((lesson) => {
                const isActive = lesson.slug === currentLesson;
                const isCompleted = completedLessons.includes(lesson.slug);

                return (
                  <Link
                    key={lesson.slug}
                    href={`/learn/${courseSlug}/${lesson.slug}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors duration-200 min-h-[44px]",
                      isActive
                        ? "border-l-2 border-indigo-500 bg-indigo-500/20 text-foreground font-medium -ml-[calc(0.75rem+1px)]  pl-[calc(0.75rem+0.75rem-1px)]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {isCompleted && (
                      <Check className="size-4 shrink-0 text-emerald-400" />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </Link>
                );
              })}

              {/* Section quiz */}
              {section.hasQuiz && (
                <Link
                  href={`/learn/${courseSlug}/quiz/section-${sectionIdx + 1}`}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground min-h-[44px]"
                  onClick={() => setMobileOpen(false)}
                >
                  <Swords className="size-4 shrink-0 text-amber-400" />
                  <span>小怪戰鬥</span>
                </Link>
              )}
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        className="fixed bottom-4 left-4 z-40 flex cursor-pointer items-center justify-center rounded-full bg-primary p-3 text-white shadow-lg transition-transform duration-200 hover:scale-105 md:hidden min-h-[44px] min-w-[44px]"
        onClick={() => setMobileOpen(true)}
        aria-label="開啟課程導覽"
      >
        <Menu className="size-5" />
      </button>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-surface shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-heading text-sm font-semibold">
                課程目錄
              </span>
              <button
                className="cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setMobileOpen(false)}
                aria-label="關閉課程導覽"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="px-2">{sidebarContent}</div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-border bg-surface md:block">
        <div className="px-2">{sidebarContent}</div>
      </aside>
    </>
  );
}
