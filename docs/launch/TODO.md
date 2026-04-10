# LevelCert Launch TODO

**Current phase:** Phase 0 — Validation Sprint
**Founder 中級 exam:** 2026-05-25 (45 days)
**North star metric:** Paying pre-orders per week

Work top-to-bottom. Don't skip ahead. If something blocks you for >24h, raise it.

---

## Week 1: Apr 10 – Apr 16 — Fix the existing landing page, open pre-orders

> **Reality check:** You already have a Next.js 16.2 app at `web/` with a 429-line landing page at `web/app/(marketing)/page.tsx` deployed to Vercel. You do NOT need Carrd. You DO need to surgically fix 6 issues before sending anyone to it.

### Pre-flight (before touching code)
- [ ] Read `web/AGENTS.md` and the relevant files in `web/node_modules/next/dist/docs/` — Next 16 has breaking changes vs. training data
- [ ] Confirm `pnpm dev` boots cleanly and the marketing page renders at `http://localhost:3000/`
- [ ] Confirm Vercel deploy works on a preview branch before touching `main`

### Critical fixes to `web/app/(marketing)/page.tsx` (must do — some are legal risk)
- [ ] **URGENT — Issue #1:** Remove the fake "92% 通過率" badge (~line 244). You have no pass rate yet. Replace with 「創始會員招募中 · 前 20 位 NT$1,980」scarcity badge. *(Taiwan 公平交易法 false-advertising risk.)*
- [ ] **URGENT — Issue #2:** Remove fake testimonials (Section 5 uses `sampleTestimonials.slice(0, 3)`). Replace the entire section with a "創辦人自白" block (founder's real 初級 pass story + score). Alumni testimonials come in Phase 2.
- [ ] **Issue #3:** Update "免費延長 **3** 個月" → "免費延長 **6** 個月" in pricing section (~line 319) AND FAQ (~line 358). Add one sentence: 「因為 iPAS 一年只考 2–3 次，6 個月保證你至少趕得上下一場。」
- [ ] **Issue #4:** Add a founder story section (hero or just above pricing). Include: name, the fact you self-studied + passed 初級, why you're building this, your 中級 exam date (2026-05-25) as public accountability. This is your biggest asset — currently completely absent.
- [ ] **Issue #5:** Replace the flat `sampleCourses` price with the full ladder — 創始會員 NT$1,980 (前 20 位) / 早鳥 NT$2,980 (21–70 位) / 正價 NT$3,980 — with a visible "剩 X 位" counter. Student price NT$1,480 as a small callout below.
- [ ] **Issue #6:** Tone down RPG language in the hero and Section 3. "RPG 式學習體驗", "冒險者們", "小怪戰鬥測驗", "魔王戰模擬考", "HP 血條" → replace with outcome language: 「自學通過 iPAS AI 初級」, 「章節練習」, 「模擬考」, 「弱點雷達」. RPG stays in the product, not the marketing copy. (See memory: `project_positioning_and_rpg.md`.)

### Pre-order path (ship the cheapest possible checkout)
- [ ] Create a Stripe Payment Link for 創始會員 NT$1,980 (no full Stripe integration yet — just the hosted link)
- [ ] Wire the hero + pricing CTA buttons to the Payment Link
- [ ] In Stripe checkout success URL: redirect to a simple `/thank-you` static page that says "我會在 24 小時內用 LINE 聯絡你開通課程"
- [ ] Collect email + LINE ID in Stripe checkout custom fields
- [ ] Manually provision each buyer in a spreadsheet until Week 4 (don't build the Supabase flow yet)

### Ship + verify
- [ ] Run `pnpm build` and fix any errors before pushing
- [ ] Merge to `main`, confirm Vercel production deploy is green at `levelcert.com`
- [ ] Test the full mobile flow end-to-end on a real phone (iOS Safari + Android Chrome)
- [ ] Send the URL to 3 trusted friends, ask: *"Would you pay NT$1,980 for this?"* — not what they think, what they'd DO

### Customer discovery (do in parallel)
- [ ] Read 30 posts on Dcard 工作板 / 研究所板 / 考試板: search *"iPAS AI"*, *"AI應用規劃師"*, *"AI證照"*
- [ ] Read 10 PTT posts in Tech_Job, Soft_Job, Examination boards
- [ ] Join 5 FB groups: *"iPAS AI應用規劃師考試交流"*, *"AI證照讀書會"*, *"青年轉職"*, etc.
- [ ] Create `docs/customer-quotes.md` — paste 10 verbatim quotes with source + date
- [ ] Identify the #1 most common complaint — rewrite landing page headline from it

### Week 1 success criteria
- [ ] Landing page live and mobile-tested
- [ ] 10 customer quotes in `docs/customer-quotes.md`
- [ ] 3 friends have reacted to the page

---

## Week 2: Apr 17 – Apr 23 — Sell the first 5 founding seats

### Core ship
- [ ] Post the LINE group pre-sell message from `docs/launch/line-group-presell.md`
- [ ] Follow up 1:1 with anyone who reacts within 2 hours
- [ ] For each paying pre-order: send a welcome LINE message, add them to a founding-cohort LINE group you create
- [ ] Ask each buyer: *"What ALMOST stopped you from buying?"* Capture verbatim in `docs/customer-quotes.md`
- [ ] **Target: 5 paying pre-orders**

### Competitor research (do in parallel, max 2 hours)
- [ ] Fill in `docs/launch/competitor-research.md` for all 10 competitors
- [ ] Write a 5-bullet summary at the bottom: what each does better than you, what you do better than each

### Content engine prep
- [ ] Create a Threads account (if not already) with founder name
- [ ] Create an IG Reels account (if not already) — can be same handle as Threads
- [ ] Pin the landing page URL in IG bio + Threads bio
- [ ] Record 3 anchor short-form videos (60s each) using Week 1 post themes from `build-in-public-calendar.md`

### Week 2 success criteria
- [ ] 5 paying founding seats (NT$9,900 revenue)
- [ ] Competitor sheet filled
- [ ] Content accounts ready to post

---

## Week 3: Apr 24 – Apr 30 — Lock 初級 content, start public content

### Core ship
- [ ] Finish all remaining 初級 lesson content (aim for content freeze by Apr 30)
- [ ] Start daily Threads posts using `build-in-public-calendar.md` Week 1 posts
- [ ] Start daily IG Reels — cross-post from Threads content
- [ ] Post weekly long-form on Dcard 工作板 (first post: *"我如何一次通過 iPAS AI 初級"*)

### Background
- [ ] Start reading 中級 syllabus — this is your own exam prep starting now
- [ ] Pick ONE FB社團 to actively participate in — answer 3 questions per week in that group (no selling)

### Week 3 success criteria
- [ ] 初級 content frozen (no more lesson writing)
- [ ] 7 Threads posts live
- [ ] 1 Dcard long-form post live
- [ ] First 中級 study session completed

---

## Week 4: May 1 – May 7 — Ship mock exam engine

### Core ship
- [ ] Build mock exam engine MVP in Next.js:
  - Load 40 questions from Supabase (from existing question banks)
  - 60-minute timer
  - Score on submit
  - Weak-area breakdown by topic
  - Save result to user account
- [ ] Ship free diagnostic mock (20 Q subset, no auth required)
- [ ] Add "試試免費診斷" CTA to landing page hero
- [ ] **Target: 10 total pre-orders cumulative**

### Week 4 success criteria
- [ ] Mock exam engine playable
- [ ] Free diagnostic live on landing page
- [ ] 10 paying students cumulative (founding tier)

---

## Week 5: May 8 – May 14 — Public pre-orders open

### Core ship
- [ ] Publish public launch announcement on Threads + IG + Dcard
- [ ] Post in all 5 joined FB社團 (value-first, not salesy — share a free diagnostic link)
- [ ] Move payment flow from Google Form to Stripe checkout
- [ ] Set up Stripe webhook → Supabase for `access_expires_at` = now + 90 days
- [ ] Open early-bird tier at NT$2,980 once 20 founding seats are filled
- [ ] **Target: 20 founding seats filled + 5 early bird = 25 cumulative**

### 中級 dogfood
- [ ] Complete 中級 Chapter 1-2 while using the 初級 platform to refresh basics
- [ ] Post daily *"Day X of 中級 prep with my own platform"* — show real screenshots

### Week 5 success criteria
- [ ] Stripe live
- [ ] 25 paying students cumulative
- [ ] 7 days of public build-in-public content shipped

---

## Week 6: May 15 – May 25 — Founder exam week

### Core ship (mostly content, minimal new build)
- [ ] Lock 中級 content for founder's own study by May 15
- [ ] Final 10-day cram: founder uses own platform exclusively
- [ ] Daily *"Final 10 days"* countdown posts on Threads/IG
- [ ] Ask founding cohort for public testimonials (*"Would you write 1 sentence I can share?"*)
- [ ] **May 25: Founder sits IPAS AI 中級 exam**
- [ ] **Target: 40 cumulative students by exam day**

### The pivotal post (write in advance)
- [ ] Draft TWO versions of "exam day" post:
  - Pass version: celebration + lessons learned + "兩張都通過"
  - Fail version: honesty + "using my own 6-month extension" + comeback narrative
- [ ] Whichever one applies, post within 24h of exam result

### Week 6 success criteria
- [ ] 40 paying students cumulative (~NT$99,000 revenue)
- [ ] Founder exam result documented publicly
- [ ] 5 testimonials collected from founding cohort

---

## Weeks 7–10: May 26 – Jun 22 — First alumni passes + university clubs

### Core ship
- [ ] Watch for June IPAS exam (exact date per official schedule)
- [ ] Message each 初級 student 24h before their exam: *"You've got this. One message if you pass."*
- [ ] Collect first alumni testimonials within 48h of each pass
- [ ] Send university club outreach emails (use `docs/launch/university-club-outreach.md`)
  - Target 10 clubs in Week 7
  - Follow up non-responders in Week 9
  - **Target: 2 confirmed bulk deals by end of Week 10**
- [ ] **Target: 70 paying students cumulative**

### Landing page updates
- [ ] Add first 3 alumni testimonials to hero (names, scores, photos if consent)
- [ ] Add "已有 XX 位通過認證" counter
- [ ] Raise main CTA from "founding" to "early bird NT$2,980"

### Weeks 7–10 success criteria
- [ ] 3+ documented alumni passes
- [ ] 70 paying students
- [ ] 1+ university club deal closed (20+ seats each)

---

## Weeks 11–13: Jun 23 – Jul 10 — Scale proof

### Core ship
- [ ] Dashboard MVP: progress tracking, mock history, weak areas
- [ ] Minimal RPG layer: XP on lesson complete, level-up toast, daily streak counter (NOT guilds, NOT boss fights)
- [ ] Student verification flow (automated .edu.tw email check)
- [ ] Publish first pass rate publicly (e.g., "8/10 初級 students passed")
- [ ] **Target: 100 paying students cumulative**

### Decision gate (Jul 10)
- [ ] Count total paying students
- [ ] If ≥50: green-light next vertical — choose between 中級 full launch, AWS AI Practitioner, Google AI Essentials
- [ ] If <50: do not expand. Spend next 30 days fixing distribution, not supply.

---

## Daily habits (every day from Week 3 onwards)

- [ ] 1 Threads post (60-120 seconds to compose)
- [ ] 1 IG Reel (cut from Threads content, ~15 min production)
- [ ] 30 min customer discovery reading (Dcard/PTT/FB)
- [ ] Answer any LINE messages from students within 6 hours
- [ ] End-of-day: write down 1 thing that surprised you today

## Weekly rituals (every Sunday night)

- [ ] Count paying students vs last Sunday
- [ ] Update `docs/launch/TODO.md` — check off completed, add new
- [ ] Read `docs/customer-quotes.md`, add any new quotes
- [ ] Check: is the landing page headline still matching the #1 customer complaint?
- [ ] Decide next week's ONE most important thing

---

## Anti-distractions list (things you will be tempted by, DO NOT do)

- ❌ Redesigning the landing page
- ❌ Building a second cert course before 初級 has 50+ students
- ❌ Reading more business books / strategy docs
- ❌ Opening a FB Page
- ❌ Starting a LinkedIn company page
- ❌ Trying to get press / blog features
- ❌ Running paid ads before 20 founding seats are filled
- ❌ Building a guild/PvP/boss-fight RPG system
- ❌ Localizing to English
- ❌ Adding a third product tier "Elite" or "Lifetime" before you have alumni
