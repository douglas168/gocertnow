"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  BookX,
  Clock,
  UserX,
  Zap,
  Radar,
  Swords,
  Trophy,
  BookOpen,
  Shield,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SyllabusAccordion } from "@/components/course/syllabus-accordion";
import { sampleCourses, sampleTestimonials } from "@/lib/sample-data";

export default function LandingPage() {
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile CTA after scrolling past hero (~500px)
      setShowMobileCta(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const firstCourse = sampleCourses[0];

  return (
    <div className="overflow-x-hidden">
      {/* ── Section 1: Hero ── */}
      <section className="relative bg-gradient-to-b from-slate-900 to-slate-950 px-4 pb-24 pt-20 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
            IPAS AI 應用規劃師 — 現正開放
          </div>
          <h1 className="mb-5 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            考取證照，
            <br />
            <span className="text-cta">開啟未來。</span>
          </h1>
          <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
            專為幫你通過考試而生的證照備考平台。AI
            模擬考試、RPG 式學習體驗，以及通過保證。
          </p>
          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/courses">
              <Button className="min-h-[44px] cursor-pointer bg-cta px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-cta/80">
                瀏覽課程
              </Button>
            </Link>
            <Link href="/courses/ipas-ai-beginner">
              <Button
                variant="outline"
                className="min-h-[44px] cursor-pointer border-primary px-8 py-3 text-lg font-semibold text-secondary transition-colors duration-200 hover:bg-primary/10"
              >
                查看詳情
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 2: Problem ── */}
      <section className="border-t border-slate-800 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            傳統備考方式已經過時了
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
            冗長的影片課程、沒有模擬考試、缺乏即時回饋。你花了好幾個月準備，卻還是不知道自己準備好了沒。
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: BookX,
                title: "學習進度不透明",
                desc: "讀了 200 頁講義，卻不知道哪些主題已經掌握、哪些還需要加強。",
              },
              {
                icon: Clock,
                title: "內容枯燥無聊",
                desc: "動輒一小時的影片讓人昏昏欲睡，缺乏互動與動力來維持學習。",
              },
              {
                icon: UserX,
                title: "沒有模擬考試",
                desc: "直接走進考場，卻從未在限時條件下練習過，完全不知道考試感覺。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <div className="mb-3 flex justify-center">
                  <item.icon className="size-8 text-streak" />
                </div>
                <h3 className="mb-2 font-heading font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Solution ── */}
      <section className="border-t border-slate-800 bg-slate-950 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            像遊戲一樣學習，像專家一樣通過
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-muted-foreground">
            每個功能都為幫你通過考試而設計，用 RPG
            遊戲機制讓學習變得停不下來。
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "經驗值與進度追蹤",
                desc: "每完成一堂課就獲得 XP，即時看見你的考試準備度成長。",
                color: "text-xp",
                bg: "bg-amber-400/10",
              },
              {
                icon: Swords,
                title: "小怪戰鬥測驗",
                desc: "每章結束後的小測驗，AI 即時解析每一道錯題。",
                color: "text-success",
                bg: "bg-emerald-400/10",
              },
              {
                icon: Trophy,
                title: "魔王戰模擬考",
                desc: "完整限時模擬考，附 HP 血條顯示。成績報告揭露所有弱點。",
                color: "text-primary",
                bg: "bg-indigo-400/10",
              },
              {
                icon: Radar,
                title: "弱點雷達圖",
                desc: "清楚看到每個考試領域的掌握程度，精準找到需要加強的主題。",
                color: "text-badge",
                bg: "bg-violet-400/10",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="cursor-pointer rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mx-auto mb-4 flex size-12 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <item.icon className={`size-6 ${item.color}`} />
                </div>
                <h3 className="mb-2 font-heading font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: How It Works ── */}
      <section className="border-t border-slate-800 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-12 font-heading text-3xl font-bold">
            三步驟通過認證
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                num: "1",
                label: "學習",
                desc: "每堂 5-9 分鐘的微課程，一個可測驗的概念。通勤、午休都能學。",
                numColor: "text-secondary",
                bgColor: "bg-indigo-500/20",
              },
              {
                num: "2",
                label: "挑戰",
                desc: "章節小測驗與模擬考試，即時獲得 AI 回饋，持續提升實力。",
                numColor: "text-xp",
                bgColor: "bg-amber-400/20",
              },
              {
                num: "3",
                label: "通過",
                desc: "充滿信心地走進考場。如果沒通過，我們免費延長你的存取權限。",
                numColor: "text-cta",
                bgColor: "bg-emerald-400/20",
              },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center">
                <div
                  className={`mb-4 flex size-16 items-center justify-center rounded-full ${step.bgColor}`}
                >
                  <span
                    className={`font-heading text-2xl font-bold ${step.numColor}`}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold">
                  {step.label}
                </h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Social Proof ── */}
      <section className="border-t border-slate-800 bg-slate-950 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            通過認證的冒險者們
          </h2>
          <p className="mb-4 text-muted-foreground">
            真實學員，真實認證，真實通過。
          </p>
          <div className="mb-12 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-400">
            <Shield className="size-4" />
            92% 通過率
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {sampleTestimonials.slice(0, 3).map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-border bg-card p-6 text-left"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} &mdash; {t.cert}
                    </div>
                  </div>
                </div>
                <p className="text-sm italic leading-relaxed text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Course Preview ── */}
      <section className="border-t border-slate-800 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold">
              課程內容預覽
            </h2>
            <p className="text-muted-foreground">
              結構化的學習路徑，幫你高效備考。
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <div className="mb-4 flex items-center gap-2">
              <BookOpen className="size-5 text-secondary" />
              <h3 className="font-heading font-semibold">
                {firstCourse.title}
              </h3>
            </div>
            <SyllabusAccordion sections={firstCourse.sections} />
          </div>
        </div>
      </section>

      {/* ── Section 7: Pricing ── */}
      <section className="border-t border-slate-800 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            簡單透明的定價
          </h2>
          <p className="mb-12 text-muted-foreground">
            一門課程，一個價格。沒有訂閱制，沒有隱藏費用。
          </p>
          <div className="mx-auto max-w-md rounded-2xl border border-indigo-500/20 bg-card p-8 shadow-xl">
            <div className="mb-2 text-sm font-semibold text-secondary">
              {firstCourse.certName} — 初級
            </div>
            <div className="mb-1 font-heading text-5xl font-bold">
              NT${firstCourse.price.toLocaleString()}
            </div>
            <div className="mb-6 text-sm text-muted-foreground">
              3 個月存取權限
            </div>
            <ul className="mb-8 space-y-3 text-left">
              {[
                "所有微課程內容",
                "章節小測驗 + AI 智慧解析",
                "模擬考試無限次挑戰",
                "弱點雷達圖 + XP 進度追蹤",
                "通過保證 — 未通過免費延長 3 個月",
              ].map((feat) => (
                <li
                  key={feat}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">
                    <Check className="size-3" />
                  </span>
                  {feat}
                </li>
              ))}
            </ul>
            <Link href="/courses">
              <Button className="min-h-[44px] w-full cursor-pointer bg-cta text-lg font-semibold text-white transition-colors duration-200 hover:bg-cta/80">
                開始學習
              </Button>
            </Link>
            <p className="mt-3 text-xs text-muted-foreground">
              考試沒通過？寄送成績通知信，免費延長 3 個月。
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 8: FAQ ── */}
      <section className="border-t border-slate-800 bg-slate-950 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold">
            常見問題
          </h2>
          <Accordion>
            {[
              {
                q: "課程存取時間有多長？",
                a: "購買後享有 3 個月的完整存取權限。如果你參加真實考試後未通過，寄送官方成績通知信即可免費延長 3 個月。",
              },
              {
                q: "什麼是「通過保證」？",
                a: "完成課程後參加真實 IPAS 考試，若未通過，從你的註冊信箱寄送官方未通過通知信，我們將免費延長你的存取權限 3 個月。每次購買享有一次延長機會。",
              },
              {
                q: "模擬考試和真實考試相似嗎？",
                a: "是的。相同的題型格式、相同的時間限制、相同的考試範圍分佈。我們的題庫根據 IPAS 官方大綱編製。",
              },
              {
                q: "可以用手機學習嗎？",
                a: "當然可以。每堂課 5-9 分鐘，專為通勤和午休時間設計。完整支援所有裝置的響應式介面。",
              },
              {
                q: "我沒有技術背景，可以學習初級課程嗎？",
                a: "初級課程專為非技術背景的學習者設計，從最基礎的 AI 概念開始教起。不需要程式設計經驗，只需要學習的熱情。",
              },
              {
                q: "課程內容包含什麼？",
                a: "包含結構化微課程、章節小測驗（小怪戰鬥）、完整模擬考試（魔王戰）、AI 智慧錯題解析、能力雷達圖、以及學習進度追蹤系統。",
              },
              {
                q: "如何付款？",
                a: "目前支援信用卡付款（透過 Stripe 安全處理）。付款完成後立即開通課程存取權限。",
              },
            ].map((item, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="cursor-pointer py-4 text-left text-sm font-semibold hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pb-2 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── Section 9: Footer CTA ── */}
      <section className="border-t border-slate-800 px-4 py-16 text-center sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 font-heading text-3xl font-bold">
            開始你的冒險
          </h2>
          <p className="mb-8 text-muted-foreground">
            加入已經在備考路上的冒險者，一起通過認證。
          </p>
          <Link href="/courses">
            <Button className="min-h-[44px] cursor-pointer bg-cta px-8 py-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-cta/80">
              立即開始
              <ChevronRight className="ml-1 size-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Mobile sticky bottom CTA ── */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 p-4 backdrop-blur-sm transition-transform duration-300 md:hidden ${
          showMobileCta ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <Link href="/courses" className="block">
          <Button className="min-h-[44px] w-full cursor-pointer bg-cta text-base font-semibold text-white transition-colors duration-200 hover:bg-cta/80">
            瀏覽課程
          </Button>
        </Link>
      </div>
    </div>
  );
}
