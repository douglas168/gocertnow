"use client";

import { useState } from "react";
import { CourseCard } from "@/components/course/course-card";
import { sampleCourses } from "@/lib/sample-data";
import { cn } from "@/lib/utils";

const filters = [
  { label: "全部", value: "all" },
  { label: "初級", value: "beginner" },
  { label: "中級", value: "intermediate" },
];

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCourses =
    activeFilter === "all"
      ? sampleCourses
      : sampleCourses.filter((c) => c.level === activeFilter);

  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 font-heading text-3xl font-bold">課程總覽</h1>
        <p className="mb-8 text-muted-foreground">
          選擇你的認證冒險旅程。
        </p>

        {/* Filter bar */}
        <div className="mb-8 flex gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "cursor-pointer rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-200 min-h-[44px]",
                activeFilter === f.value
                  ? "border-indigo-500/30 bg-indigo-500/20 text-indigo-400"
                  : "border-border bg-card text-muted-foreground hover:border-slate-600"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Course cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              progress={
                course.slug === "ipas-ai-beginner"
                  ? { completed: 8, total: 12, xpEarned: 340 }
                  : undefined
              }
              continueHref={
                course.slug === "ipas-ai-beginner"
                  ? "/learn/ipas-ai-beginner/2-3-evaluation"
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
