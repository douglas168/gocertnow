import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle, Info, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonSidebar } from "@/components/layout/lesson-sidebar";
import { XpToast } from "@/components/rpg/xp-toast";
import { sampleCourses, sampleLessons } from "@/lib/sample-data";
import type { Course, LessonContent, Section } from "@/lib/sample-data";

// Completed lessons for demo
const completedLessons = ["1-1-intro", "1-2-history"];

export default async function LessonPlayerPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson: lessonSlug } = await params;

  // Find the course
  const course: Course | undefined = sampleCourses.find(
    (c) => c.slug === slug
  );
  if (!course) {
    notFound();
  }

  // Find lesson content
  const lessonContent: LessonContent | undefined = sampleLessons.find(
    (l) => l.slug === lessonSlug
  );

  // Find lesson meta in course structure
  let currentSection: Section | undefined;
  let lessonIndexInSection = -1;
  let flatLessonIndex = -1;
  let flatIndex = 0;

  for (const section of course.sections) {
    for (let i = 0; i < section.lessons.length; i++) {
      if (section.lessons[i].slug === lessonSlug) {
        currentSection = section;
        lessonIndexInSection = i;
        flatLessonIndex = flatIndex;
      }
      flatIndex++;
    }
  }

  // If lesson not found in course, use first lesson data as fallback
  const displayContent: LessonContent = lessonContent ?? sampleLessons[0];
  const displaySection: Section = currentSection ?? course.sections[0];
  const displayLessonTitle =
    currentSection
      ? currentSection.lessons[lessonIndexInSection]?.title
      : displayContent.title;

  // Calculate progress
  const totalLessons = course.totalLessons;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Find prev/next
  const allLessons = course.sections.flatMap((s) => s.lessons);
  const currentFlatIndex =
    flatLessonIndex >= 0 ? flatLessonIndex : 0;
  const prevLesson = currentFlatIndex > 0 ? allLessons[currentFlatIndex - 1] : null;
  const nextLesson =
    currentFlatIndex < allLessons.length - 1
      ? allLessons[currentFlatIndex + 1]
      : null;

  // Determine if next is a quiz (last lesson in section and section has quiz)
  const isLastInSection =
    currentSection &&
    lessonIndexInSection === currentSection.lessons.length - 1;
  const nextIsQuiz = isLastInSection && displaySection.hasQuiz;

  // Section index for quiz link
  const sectionIdx = course.sections.indexOf(displaySection);

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Thin progress bar at very top */}
      <div className="fixed left-0 right-0 top-0 z-[60] h-1 bg-slate-800">
        <div
          className="h-1 bg-amber-400 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={completedCount}
          aria-valuemin={0}
          aria-valuemax={totalLessons}
          aria-label={`${progressPercent}% 完成`}
        />
      </div>

      {/* Sidebar */}
      <LessonSidebar
        courseSlug={course.slug}
        sections={course.sections}
        currentLesson={lessonSlug}
        completedLessons={completedLessons}
      />

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav
            className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link
              href={`/courses/${course.slug}`}
              className="cursor-pointer transition-colors duration-200 hover:text-foreground"
            >
              {course.title}
            </Link>
            <ChevronRight className="size-3" />
            <span>{displayContent.sectionTitle}</span>
            <ChevronRight className="size-3" />
            <span className="text-foreground">{displayLessonTitle}</span>
          </nav>

          {/* Lesson title */}
          <h2 className="mb-8 font-heading text-xl font-bold leading-snug">
            {displayLessonTitle}
          </h2>

          {/* Lesson body */}
          <article className="space-y-6" style={{ lineHeight: 1.85 }}>
            {displayContent.body.map((paragraph, i) => (
              <p key={i} className="text-base text-slate-300">
                {paragraph}
              </p>
            ))}

            {/* Callout boxes */}
            {displayContent.callouts.map((callout, i) => (
              <CalloutBox key={i} type={callout.type} text={callout.text} />
            ))}
          </article>

          {/* Complete button */}
          <div className="mt-12 border-t border-border pt-8">
            <Button
              className="w-full cursor-pointer bg-cta text-white hover:bg-cta/80 min-h-[44px] font-semibold"
              size="lg"
            >
              <CheckCircle className="mr-2 size-5" />
              完成課程
            </Button>
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-6 flex items-center justify-between">
            {prevLesson ? (
              <Link
                href={`/learn/${course.slug}/${prevLesson.slug}`}
                className="flex cursor-pointer items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground min-h-[44px]"
              >
                <ChevronLeft className="size-4" />
                <span className="hidden sm:inline">上一課：</span>
                <span className="truncate max-w-[150px] sm:max-w-none">
                  {prevLesson.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextIsQuiz ? (
              <Link
                href={`/learn/${course.slug}/quiz/section-${sectionIdx + 1}`}
                className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-indigo-400 transition-colors duration-200 hover:text-indigo-300 min-h-[44px]"
              >
                <span>小怪戰鬥</span>
                <ChevronRight className="size-4" />
              </Link>
            ) : nextLesson ? (
              <Link
                href={`/learn/${course.slug}/${nextLesson.slug}`}
                className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors duration-200 hover:text-emerald-300 min-h-[44px]"
              >
                <span className="hidden sm:inline">下一課：</span>
                <span className="truncate max-w-[150px] sm:max-w-none">
                  {nextLesson.title}
                </span>
                <ChevronRight className="size-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>

      {/* XP Toast placeholder */}
      <XpToast amount={15} visible />
    </div>
  );
}

// ── Callout box component ──

const calloutConfig = {
  info: {
    borderColor: "border-indigo-500",
    bgColor: "bg-indigo-500/10",
    label: "考試重點",
    labelColor: "text-indigo-400",
    Icon: Info,
  },
  warning: {
    borderColor: "border-amber-500",
    bgColor: "bg-amber-500/10",
    label: "注意",
    labelColor: "text-amber-400",
    Icon: AlertTriangle,
  },
  tip: {
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-500/10",
    label: "學習建議",
    labelColor: "text-emerald-400",
    Icon: Lightbulb,
  },
} as const;

function CalloutBox({
  type,
  text,
}: {
  type: "info" | "warning" | "tip";
  text: string;
}) {
  const config = calloutConfig[type];
  const { Icon } = config;

  return (
    <div
      className={`rounded-r-lg border-l-4 ${config.borderColor} ${config.bgColor} p-4 my-6`}
    >
      <div className="mb-1 flex items-center gap-1.5">
        <Icon className={`size-4 ${config.labelColor}`} />
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${config.labelColor}`}
        >
          {config.label}
        </span>
      </div>
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}
