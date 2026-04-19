# LevelCert Launch TODO

**Current phase:** Phase 0 — Validation Sprint
**Founder 中級 exam:** 2026-05-23 (Sat) — 43 days from 2026-04-10. See [ipas-exam-calendar-2026.md](./ipas-exam-calendar-2026.md) for full 2026 IPAS schedule.
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
- [ ] **Issue #3:** Update "免費延長 **3** 個月" → "免費延長 **6** 個月" in pricing section (~line 319) AND FAQ (~line 358). Add one sentence: 「因為 iPAS AI 中級一年只考 2 次（5 月 + 11 月），6 個月保證你至少趕得上下一場。」
- [ ] **Issue #4:** Add a founder story section (hero or just above pricing). Include: name (郭呈祥), the specific 初級 pressure-pass story (credential 115-01-Z01, avg 73, one subject 66 — "壓線通過" narrative), why you're building this, and visible course construction as the accountability mechanism. This is your biggest asset — currently completely absent. Do NOT frame the 2026-05-23 中級 exam as public accountability; it is a private operational deadline, not a marketing vehicle. The 2026-06-12 result becomes one honest evidence post afterward (not the hero marketing line).
- [ ] **Issue #5:** Replace the flat `sampleCourses` price with the full ladder — 創始會員 NT$1,980 (前 20 位) / 早鳥 NT$2,980 (21–70 位) / 正價 NT$3,980 — with a visible "剩 X 位" counter. Student price NT$1,480 as a small callout below. **Add the access-window line on every tier card**: 「創始 / 早鳥 / 學生 / 社團方案：完整課程存取至 2026/12/31，保證參加 8/15 + 11/7 兩次考試」. 正價 (seat 71+) shows the standard "3 個月初始 + 6 個月考不過延長".
- [ ] **Issue #6:** Tone down RPG language in the hero and Section 3. "RPG 式學習體驗", "冒險者們", "小怪戰鬥測驗", "魔王戰模擬考", "HP 血條" → replace with outcome language: 「自學通過 iPAS AI 初級」, 「章節練習」, 「模擬考」, 「弱點雷達」. RPG stays in the product, not the marketing copy. (See memory: `project_positioning_and_rpg.md`.)

### Pre-order path (ship the cheapest possible checkout)
- [ ] Create a Stripe Payment Link for 創始會員 NT$1,980 (no full Stripe integration yet — just the hosted link)
- [ ] Wire the hero + pricing CTA buttons to the Payment Link
- [ ] In Stripe checkout success URL: redirect to a simple `/thank-you` static page that says "我會在 24 小時內用 LINE 聯絡你開通課程"
- [ ] Collect email + LINE ID in Stripe checkout custom fields
- [ ] Manually provision each buyer in a spreadsheet until Week 4 (don't build the Supabase flow yet)

### Archived content
- Old reference: See [docs/_todo/build-in-public-calendar.md](./build-in-public-calendar.md) for daily content calendar

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
- [ ] Post the LINE group pre-sell message from `docs/_todo/line-group-presell.md`
- [ ] Follow up 1:1 with anyone who reacts within 2 hours
- [ ] For each paying pre-order: send a welcome LINE message, add them to a founding-cohort LINE group you create
- [ ] Ask each buyer: *"What ALMOST stopped you from buying?"* Capture verbatim in `docs/customer-quotes.md`
- [ ] **Target: 5 paying pre-orders**

### Competitor research (do in parallel, max 2 hours)
- [ ] Fill in `docs/business-competitors/competitor-research.md` for all 10 competitors
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

## Week 6: May 15 – May 23 — Founder exam week

### Core ship (mostly content, minimal new build)
- [ ] Lock 中級 content for founder's own study by May 15
- [ ] Final 10-day cram: founder uses own platform exclusively
- [ ] Daily *"Final 10 days"* countdown posts on Threads/IG
- [ ] Ask founding cohort for public testimonials (*"Would you write 1 sentence I can share?"*)
- [ ] **May 23 (Sat): Founder sits IPAS AI 中級 exam 第一次** (results 6/12)
- [ ] **Target: 40 cumulative students by exam day**

### The 6/12 evidence post (write in advance, publish once)
- [ ] Draft TWO short versions of a **6/12 result** post (NOT an exam-day 5/23 post — 中級 sitting is private):
  - Pass version: one honest sentence + 初級+中級 both passed → supplementary evidence under the existing 初級 pressure-pass hero
  - Fail version: one honest sentence + "using my own 6-month extension for 11/14 retake" — no drama, no comeback-arc theater
- [ ] Publish once within 24h of the 6/12 result announcement. This is evidence, not a campaign.

### Week 6 success criteria
- [ ] 40 paying students cumulative (~NT$99,000 revenue)
- [ ] Founder exam result documented publicly
- [ ] 5 testimonials collected from founding cohort

---

## Weeks 7–16: May 26 – Aug 15 — Recovery + 初級 第三次 prep sprint

> **There is no June exam.** First real student exam is **2026-08-15**, results **2026-09-02**. Do NOT send club outreach emails in June/July — no alumni testimonials yet, and clubs are on summer break. Club outreach is Phase 3 starting Sep 5.

### Core ship
- [ ] Publish the founder exam-day post within 24h of the 6/12 result announcement (pass OR fail version)
- [ ] Pivot daily content from "my own exam prep" to "coaching my students through 8/15"
- [ ] Run a weekly cohort check-in (LINE group call or async Q&A) starting mid-June
- [ ] 初級 content 100% locked by Jun 30 — no more lesson rewrites
- [ ] Build alumni-testimonial collection flow (private LINE → public screenshot with consent) — ready to use on Sep 2
- [ ] Draft university club pitch deck using placeholder alumni data — ready to swap in real data Sep 2
- [ ] Early-bird CTA stays on landing page throughout; raise CTA only after Aug 1 when seats 21–70 start filling
- [ ] Week before the exam: message every student individually: *"You've got this. One LINE message if you pass — I'll celebrate with you."*
- [ ] **2026-08-15 (Sat):** 初級 students sit 第三次. Post the cohort exam-day thread. Nothing else to ship this day.
- [ ] **Target by Jul 10: 70 paying students cumulative**

### Landing page updates (during Phase 2, not end)
- [ ] Replace founder-story section with student-cohort-progress section by Jul 15
- [ ] Add "founding cohort sitting 8/15 exam" public counter
- [ ] Do NOT add alumni testimonials yet — wait for real Sep 2 data

### Phase 2 success criteria
- [ ] Founder exam result posted publicly within 24h of Jun 12
- [ ] 70 paying students cumulative by Jul 10
- [ ] Alumni testimonial collection flow ready and dry-run tested by Aug 1
- [ ] Club pitch deck drafted (waiting on Sep 2 data)

---

## Weeks 17–24: Aug 16 – Oct 31 — First alumni + university club outreach

### Core ship (waiting on Sep 2 results)
- [ ] **2026-09-02:** iPAS publishes 初級 第三次 results. Message every student that day.
- [ ] Collect alumni testimonials within 48h of results (real names + scores + photos with consent)
- [ ] Add 3 real alumni testimonials to landing page hero by Sep 5
- [ ] Add "已有 X 位學員通過認證" counter — use the real number
- [ ] Raise main CTA from "founding" to "early bird NT$2,980"
- [ ] Publish first public pass-rate post on Dcard / Threads by Sep 8: e.g., *"我的第一屆 10 位學員中，X 位通過"*
- [ ] **Sep 5: Send first batch of 10 university club outreach emails** using [university-club-outreach.md](./university-club-outreach.md)
  - Target 10 clubs in the first week (Sep 5 – Sep 12)
  - Follow up non-responders after 10 days (Sep 15+)
  - Second batch of 10 if first batch doesn't yield 2+ deals (Oct 1)
  - **Target: 2 confirmed bulk deals by Oct 15**
- [ ] Ship dashboard MVP (progress tracking, mock history, weak areas) by Sep 20 — needed as club pitch demo
- [ ] Ship student verification flow (automated .edu.tw email check) by Sep 30 — needed before scaling student-tier sales
- [ ] Minimal RPG layer: XP on lesson complete, level-up toast, daily streak counter (NOT guilds, NOT boss fights) — nice-to-have, cut if it delays club demos
- [ ] **Target: 100 paying students cumulative by Oct 31**

### Phase 3 success criteria
- [ ] 3+ documented alumni passes on landing page
- [ ] Published pass rate visible on hero
- [ ] 100 paying students cumulative
- [ ] 1+ university club deal closed (20+ seats)

---

## Weeks 25–32: Nov 1 – Dec 31 — Q4 exam cohorts + scale decision

### Core ship
- [ ] **2026-11-07 (Sat):** 初級 第四次 exam — second student cohort sits. Student retakes from the Aug 15 failures also sit here.
- [ ] **2026-11-14 (Sat):** 中級 第二次 exam — founder retakes if 5/23 failed. Any 中級 pre-sale students sit here.
- [ ] **2026-11-25:** Results for both exams announced. Second alumni testimonial wave.
- [ ] Publish year-end pass rate by Dec 5: cumulative "X / Y 學員通過" number
- [ ] **2026-12-15: Next cert decision gate**
  - If ≥50 paying students total: green-light next vertical — choose between 中級 full launch, AWS AI Practitioner, Google AI Essentials
  - If <50: do not expand. Spend next 30 days fixing distribution, not supply.
- [ ] **2026-12-31:** Pre-launch cohort access window closes. 正價 (seat 71+) tier becomes the only active tier. Extension policy kicks in normally from 2027 onward.

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
