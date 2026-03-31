import { XpDisplay } from "@/components/rpg/xp-display";
import { StreakCounter } from "@/components/rpg/streak-counter";
import { StreakCalendar } from "@/components/rpg/streak-calendar";
import { RadarChart } from "@/components/rpg/radar-chart";
import { BadgeGrid } from "@/components/rpg/badge-grid";
import { CourseCard } from "@/components/course/course-card";
import {
  sampleDashboard,
  sampleCourses,
} from "@/lib/sample-data";

export const metadata = {
  title: "學習儀表板 — LevelCert",
  description: "追蹤你的學習進度、經驗值與成就徽章。",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-bold">學習儀表板</h1>
        <p className="text-sm text-muted-foreground">你的冒險仍在繼續。</p>
      </div>

      {/* Mobile RPG stats — horizontal scroll */}
      <div className="mb-8 lg:hidden">
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {/* XP card */}
          <div className="flex-none snap-start rounded-xl bg-card p-4 ring-1 ring-foreground/10 min-w-[140px]">
            <p className="mb-1 text-xs text-muted-foreground">總經驗值</p>
            <XpDisplay xp={sampleDashboard.xp} size="sm" />
          </div>

          {/* Streak card */}
          <div className="flex-none snap-start rounded-xl bg-card p-4 ring-1 ring-foreground/10 min-w-[140px]">
            <p className="mb-1 text-xs text-muted-foreground">連續學習</p>
            <StreakCounter streak={sampleDashboard.streak} size="sm" />
          </div>

          {/* Radar mini card */}
          <div className="flex-none snap-start rounded-xl bg-card p-4 ring-1 ring-foreground/10 min-w-[200px]">
            <p className="mb-1 text-xs text-muted-foreground">能力雷達</p>
            <RadarChart categories={sampleDashboard.radarScores} size={160} />
          </div>
        </div>
      </div>

      {/* Desktop 2-column layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content — left (2 cols) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Course cards heading */}
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold">
              我的課程
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Course 1 — in progress */}
              <CourseCard
                course={sampleCourses[0]}
                progress={{
                  completed: 8,
                  total: sampleCourses[0].totalLessons,
                  xpEarned: 340,
                }}
                continueHref="/learn/ipas-ai-beginner/2-3-evaluation"
                examHref="/exam/ipas-ai-beginner"
              />

              {/* Course 2 — not enrolled (show price) */}
              <CourseCard course={sampleCourses[1]} />
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold">
              最近動態
            </h2>
            <div className="space-y-3">
              <ActivityItem
                icon="check"
                iconBg="bg-emerald-500/20"
                iconColor="text-emerald-400"
                title="完成「AI 發展歷史與里程碑」"
                time="2 小時前"
                xp={15}
              />
              <ActivityItem
                icon="shield"
                iconBg="bg-indigo-500/20"
                iconColor="text-indigo-400"
                title="通過第一章小考 — 4/4 正確"
                time="昨天"
                xp={50}
              />
              <ActivityItem
                icon="sparkle"
                iconBg="bg-violet-500/20"
                iconColor="text-violet-400"
                title={
                  <>
                    解鎖徽章：
                    <span className="text-violet-400">小怪殺手</span>
                  </>
                }
                time="昨天"
              />
            </div>
          </div>
        </div>

        {/* Sidebar — right (1 col), hidden on mobile (shown as scroll cards above) */}
        <div className="hidden space-y-6 lg:block">
          {/* XP Total */}
          <SidebarCard title="總經驗值">
            <div className="text-center">
              <XpDisplay xp={sampleDashboard.xp} size="lg" className="justify-center" />
            </div>
          </SidebarCard>

          {/* Streak */}
          <SidebarCard title="連續學習">
            <div className="mb-4 flex items-center justify-between">
              <StreakCounter streak={sampleDashboard.streak} size="lg" />
            </div>
            <StreakCalendar calendar={sampleDashboard.streakCalendar} />
          </SidebarCard>

          {/* Radar chart */}
          <SidebarCard title="能力雷達">
            <RadarChart categories={sampleDashboard.radarScores} size={240} />
          </SidebarCard>

          {/* Badges */}
          <SidebarCard title="成就徽章">
            <BadgeGrid badges={sampleDashboard.badges} />
          </SidebarCard>
        </div>
      </div>
    </div>
  );
}

// ── Helper components ──

function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-card p-6 ring-1 ring-foreground/10">
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

import { Check, Shield, Sparkles } from "lucide-react";

const activityIcons = {
  check: Check,
  shield: Shield,
  sparkle: Sparkles,
} as const;

function ActivityItem({
  icon,
  iconBg,
  iconColor,
  title,
  time,
  xp,
}: {
  icon: keyof typeof activityIcons;
  iconBg: string;
  iconColor: string;
  title: React.ReactNode;
  time: string;
  xp?: number;
}) {
  const Icon = activityIcons[icon];
  return (
    <div className="flex items-center gap-4 rounded-lg bg-card p-4 ring-1 ring-foreground/5">
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${iconBg}`}
      >
        <Icon className={`size-4 ${iconColor}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm">{title}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
      {xp !== undefined && (
        <span className="text-sm font-semibold text-xp">+{xp} XP</span>
      )}
    </div>
  );
}
