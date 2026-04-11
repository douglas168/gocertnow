# LevelCert Launch Roadmap

**Created:** 2026-04-10
**Founder exam date (hard deadline):** 2026-05-23 (IPAS AI 中級)
**Strategy:** Validate demand with 初級 pre-orders while dogfooding 中級 content build as personal exam prep, turning the whole journey into public marketing.

---

## The one metric that matters

**Paying pre-orders per week.** Not traffic, not followers, not waitlist emails, not Reels views. Every Sunday night, count paying pre-orders. If the number is going up, the plan is working. If flat, change channels or messaging.

---

## 90-Day Phased Plan

### Phase 0 — Validation Sprint (Weeks 1–2: Apr 10 – Apr 24)

**Goal:** 5 paying pre-orders from the LINE group, landing page live, 10 real customer quotes.

| Milestone | Target date | Success metric |
|---|---|---|
| Landing page live (Carrd/Framer) | Apr 14 | URL shareable |
| LINE group pre-sell posted | Apr 15 | Post sent |
| First 5 founding seats sold | Apr 21 | 5 × NT$1,980 = NT$9,900 |
| 10 customer quotes collected | Apr 24 | `docs/customer-quotes.md` exists |
| Competitor research sheet filled | Apr 24 | 10 competitors × 12 fields |

**What gets BUILT in Phase 0:**
- ONE landing page (Traditional Chinese)
- Nothing else

**What gets CUT in Phase 0:**
- Next.js web build
- Dashboard, auth, payments integration (use a Google Form + manual LINE follow-up for first 5 pre-orders)
- Content generation for new lessons
- RPG mechanics

**Rationale:** Stop building product until 5 strangers have paid. The hardest problem in Phase 0 is not code, it's proving anyone will pay an unknown brand. Manual is fine. Friction is fine. Learning is everything.

---

### Phase 1 — Build + Ship 初級 + Dogfood 中級 (Weeks 3–6: Apr 25 – May 23)

> **Source of truth for exam dates:** [ipas-exam-calendar-2026.md](./ipas-exam-calendar-2026.md). 初級 runs 4× in 2026 (3/21, **5/16**, **8/15**, 11/7); 中級 runs 2× (**5/23**, 11/14).

**Goal:** 40 total paying pre-orders, 初級 course playable, founder passes 中級 exam.

| Milestone | Target date | Success metric |
|---|---|---|
| 初級 lesson content locked | Apr 30 | All L1xxxx lessons done |
| Mock exam engine playable | May 7 | Can take a 40Q exam, get score |
| Public pre-orders open (beyond LINE group) | May 8 | 1st post on Threads/Dcard |
| 20 founding seats filled (NT$1,980) | May 15 | 20 × NT$1,980 = NT$39,600 |
| **Founder passes 中級 exam** | **May 23** | Pass/fail result documented publicly |
| 40 total pre-orders by exam day | May 23 | 20 founding + 20 early bird ≈ NT$99,000 |

**What gets BUILT in Phase 1:**
- Remaining 初級 lesson content (currently L11101/L11102/L11201/L11202 done per git log)
- Mock exam engine (minimum: 40 questions, scoring, weak-area breakdown by topic)
- Free diagnostic mock (20 Q subset of mock engine, no auth, email capture on result)
- 中級 content (this IS the founder's own study — doubles as dogfood)
- Simple Next.js course player (auth-gated, video + text + mock engine)
- Stripe checkout for pre-orders (upgrade from Google Form)

**What runs in PARALLEL in Phase 1:**
- Daily build-in-public content on Threads/IG (see `build-in-public-calendar.md`)
- Weekly long-form Dcard post (Sundays)
- Join 5 FB社團, post weekly value in each
- Customer discovery ongoing: 5 more quotes per week

**The forcing function:** The May 23 exam is a hard deadline. If 中級 content isn't usable by the founder by May 15, the course isn't good enough to sell.

---

### Phase 2 — Recovery + 初級 第三次 Prep Sprint (Weeks 7–16: May 26 – Aug 15)

**Goal:** Carry 初級 cohort through the first real student exam on **Aug 15** (results Sep 2), build to 70 total paying students in the process.

> **Reality check from the 2026 IPAS calendar** (see [ipas-exam-calendar-2026.md](./ipas-exam-calendar-2026.md)): there is **no June IPAS exam**. 初級 第二次 on 5/16 is effectively unreachable for every founding buyer (registration closed 4/10 noon). The next sittable 初級 exam is **2026-08-15** with results **2026-09-02**. Phase 2 was originally scoped as "collect June alumni → pitch clubs in June"; both premises were wrong. New plan below.

| Milestone | Target date | Success metric |
|---|---|---|
| Publicly share 中級 exam result | Jun 13 | Post within 24h of 6/12 result announcement |
| 初級 content 100% locked + student-tested | Jun 30 | No further lesson rewrites |
| 70 total paying students | Jul 10 | 20 founding + 50 early bird ≈ NT$188,600 |
| Founding cohort ready for 8/15 exam | Aug 5 | Full mock completion rate ≥ 80% in-cohort |
| **First 初級 students sit 8/15** | Aug 15 | (student cohort sits, nothing to ship on exam day) |

**Key content pivots:**
- **If founder passed 中級:** lead all marketing with *"我兩張都一次通過"* + walk-through video
- **If founder failed 中級:** lead with *"我考砸了，但我還有 6 個月到 11/14 再戰一次。來看看我怎麼準備第二次"* — use own 6-month extension publicly. This is a stronger story than passing.
- Either way: the pivot from **founder-story marketing** to **student-cohort marketing** happens here. Daily content becomes "Day X of coaching my students through the Aug 15 exam" instead of "Day X of my own exam prep".

**What gets BUILT in Phase 2:**
- Alumni testimonial collection flow (private LINE → public screenshot) — *ready for Sep 2*
- University club landing page variant (NT$1,200 bulk pricing) — *built in July, used in Phase 3*
- IF founder passed 中級: 中級 early-bird pre-orders open (separate product, don't distract from 初級 cohort)

---

### Phase 3 — First Alumni + University Club Outreach (Weeks 17–24: Aug 16 – Oct 31)

**Goal:** Land first real alumni passes, convert them into testimonials + landing-page hero, open the university club outreach channel now that you actually have proof.

| Milestone | Target date | Success metric |
|---|---|---|
| 初級 第三次 results announced | **Sep 2** | Student pass/fail visible |
| First documented alumni testimonials on landing page | Sep 5 | ≥ 3 real names + scores on hero |
| First public pass rate posted | Sep 8 | e.g., "我的第一屆 10 位學員中，X 位通過" |
| **University club outreach campaign starts** | **Sep 5** | Use [university-club-outreach.md](./university-club-outreach.md) — 10 clubs contacted by Sep 15 |
| First university club bulk deal closed | Oct 15 | 1 deal × 20 seats = NT$24,000 |
| 100 paying students milestone | Oct 31 | Mixed tiers ≈ NT$250,000 cumulative |

**Why September, not June:** University clubs are on summer break in June and July. Fall semester planning kicks off in early September. You also finally have real alumni testimonials from the Sep 2 results — before that, the pitch to clubs is just founder anecdotes, which is not enough to swing a 20-seat deal.

**What gets BUILT in Phase 3:**
- Proper dashboard (progress, mock history, weak areas) — used as club-pitch demo
- Basic RPG layer IF still trivial to add (XP, level-up toast, streak — NOT guilds/PvP)
- Student verification flow (automated .edu.tw email check) — needed before scaling student-tier sales
- Club pitch deck using 9/2 alumni data

---

### Phase 4 — Q4 Exam Cohorts + Scale Decision (Weeks 25–32: Nov 1 – Dec 31)

**Goal:** Run the second student cohort through **2026-11-07 (初級 第四次)** and **2026-11-14 (中級 第二次)**, publish full pass-rate data, decide next vertical.

| Milestone | Target date | Success metric |
|---|---|---|
| Founding cohort retake window (if any failed 8/15) | Nov 7 | Students sit again |
| Founder's 中級 retake (if needed) | Nov 14 | 第二次 attempt |
| Q4 exam results batch | **Nov 25** | Second alumni testimonial wave |
| Published year-end pass rate | Dec 5 | Cumulative "X/Y 學員通過" number |
| Next cert decision | Dec 15 | Decide: 中級 full launch, AWS AI, Google AI Essentials |
| Founding-cohort access sunset | Dec 31 | Pre-launch cohorts' courses lock |

**Decision gate:** If <50 paying students by Oct 31 → do not expand verticals, double down on 初級 marketing for another 30 days. If ≥50 paying students → green-light next cert vertical.

---

## What's NOT on this roadmap (hard cuts)

- ❌ Multi-cert catalogue (Phase 3+ in CLAUDE.md — stays there)
- ❌ Creator platform / marketplace layer (Phase 4)
- ❌ SaaS content-gen tool for creators (Phase 5)
- ❌ English localization
- ❌ Guild/PvP/boss battle RPG mechanics
- ❌ LinkedIn as a channel
- ❌ FB Page (join 社團 instead)
- ❌ Paid ads until after 20 founding seats filled
- ❌ Any strategy-doc rewrites (`docs/business-strategy/` is frozen)

---

## Revenue projection

Conservative scenario, retimed to the real 2026 IPAS calendar:

| Date | Cumulative students | Cumulative revenue (NTD) | Anchor event |
|---|---|---|---|
| Apr 21 | 5 | 9,900 | LINE group pre-sell closes |
| May 15 | 20 | 39,600 | Founding cohort full |
| May 23 | 40 | 99,000 | Founder sits 中級 第一次 |
| Jul 10 | 70 | 188,600 | Early-bird cohort near full |
| Sep 2 | 85 | ~220,000 | First alumni results → public proof |
| Oct 31 | 100 | ~250,000 | End of university club outreach window |

At 100 students with a published pass rate you've validated the wedge. That's the number that changes whether this is a side project or a potential full-time pursuit.

---

## Kill criteria (when to stop and rethink)

- **Apr 24:** If zero paying pre-orders from the LINE group → the product or price is wrong. Stop building. Interview 5 LINE group members directly.
- **May 15:** If fewer than 10 paying pre-orders total → the public-facing funnel is broken. Stop building content, fix the landing page.
- **Jul 10:** If fewer than 40 paying students 7 weeks after the founder's exam → positioning is the problem. Rewrite from the 10 customer quotes before Aug 1.
- **Sep 5:** If the 9/2 results show <50% alumni pass rate → the course content is the problem, not distribution. Stop club outreach, fix the weak lessons, wait for the 11/7 cohort.
- **Oct 31:** If fewer than 50 paying students → don't expand verticals. The issue is distribution, not supply.

---

## Current state snapshot (2026-04-10)

- [x] IPAS 初級 content scaffolded — L11101, L11102, L11201, L11202 lesson content complete
- [x] Question bank strategy defined (practice/mock pool split)
- [x] Founder passed IPAS 初級
- [x] LINE group of IPAS candidates available as Phase 0 audience
- [x] CLAUDE.md pricing + pass guarantee updated
- [ ] Everything else in Phase 0

See `TODO.md` for the actionable weekly checklist.
