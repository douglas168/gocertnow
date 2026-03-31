import { BookOpen, Clock, Check, ChevronLeft, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SyllabusAccordion } from "@/components/course/syllabus-accordion";
import { PurchaseCard } from "@/components/course/purchase-card";
import { sampleCourses } from "@/lib/sample-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CourseDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({
  params,
}: CourseDetailPageProps) {
  const { slug } = await params;
  const course =
    sampleCourses.find((c) => c.slug === slug) ?? sampleCourses[0];

  const learningOutcomes = [
    "掌握 AI 核心概念與分類",
    "理解機器學習的基本原理與應用",
    "學會資料前處理與分析技術",
    "了解 AI 倫理原則與相關法規",
    "能夠分析 AI 在不同產業的應用場景",
    "為 IPAS 認證考試做好全面準備",
  ];

  return (
    <section className="px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Back to courses */}
        <div className="mb-6">
          <Link
            href="/courses"
            className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground min-h-[44px]"
          >
            <ChevronLeft className="size-4" />
            課程總覽
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left column: Course info */}
          <div className="space-y-8 lg:col-span-2">
            {/* Header */}
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    course.level === "beginner"
                      ? "border-emerald-500/30 bg-emerald-500/20 text-emerald-400"
                      : "border-indigo-500/30 bg-indigo-500/20 text-indigo-400"
                  )}
                >
                  {course.level === "beginner" ? "初級" : "中級"}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  <BookOpen className="mr-1 inline-block size-3.5" />
                  {course.totalLessons} 堂課
                </span>
                <span className="text-xs text-muted-foreground">
                  <Clock className="mr-1 inline-block size-3.5" />約{" "}
                  {course.estimatedHours} 小時
                </span>
                <span className="text-xs text-muted-foreground">
                  {course.sections.length} 個章節
                </span>
              </div>
              <h1 className="mb-3 font-heading text-2xl font-bold sm:text-3xl">
                {course.title}
              </h1>
              <p className="leading-relaxed text-muted-foreground">
                {course.description}
              </p>
            </div>

            {/* What you'll learn */}
            <div>
              <h2 className="mb-4 font-heading text-lg font-semibold">
                你將學到什麼
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {learningOutcomes.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus */}
            <div>
              <h2 className="mb-4 font-heading text-lg font-semibold">
                課程大綱
              </h2>
              <SyllabusAccordion sections={course.sections} />
            </div>

            {/* Instructor */}
            <div>
              <h2 className="mb-4 font-heading text-lg font-semibold">
                課程講師
              </h2>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary">
                  <User className="size-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">
                    LevelCert 教學團隊
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    由具備 IPAS
                    認證與業界經驗的專業講師團隊編製。結合 AI
                    技術與教育專業，為你打造最有效的備考課程。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Purchase card (sticky on desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <PurchaseCard price={course.price} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile fixed bottom purchase bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-sm lg:hidden"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center justify-between px-4 pt-4">
          <div>
            <p className="font-heading text-xl font-bold">
              NT${course.price.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">3 個月存取權限</p>
          </div>
          <Button className="min-h-[44px] cursor-pointer bg-cta px-6 font-semibold text-white transition-colors duration-200 hover:bg-cta/80">
            開始學習
          </Button>
        </div>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="h-24 lg:hidden" />
    </section>
  );
}
