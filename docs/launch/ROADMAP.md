# LevelCert Launch Roadmap

**Created:** 2026-04-10
**Founder exam date (hard deadline):** 2026-05-25 (IPAS AI 中級)
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

### Phase 1 — Build + Ship 初級 + Dogfood 中級 (Weeks 3–6: Apr 25 – May 25)

**Goal:** 40 total paying pre-orders, 初級 course playable, founder passes 中級 exam.

| Milestone | Target date | Success metric |
|---|---|---|
| 初級 lesson content locked | Apr 30 | All L1xxxx lessons done |
| Mock exam engine playable | May 7 | Can take a 40Q exam, get score |
| Public pre-orders open (beyond LINE group) | May 8 | 1st post on Threads/Dcard |
| 20 founding seats filled (NT$1,980) | May 15 | 20 × NT$1,980 = NT$39,600 |
| **Founder passes 中級 exam** | **May 25** | Pass/fail result documented publicly |
| 40 total pre-orders by exam day | May 25 | 20 founding + 20 early bird ≈ NT$99,000 |

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

**The forcing function:** The May 25 exam is a hard deadline. If 中級 content isn't usable by the founder by May 15, the course isn't good enough to sell.

---

### Phase 2 — Post-Exam Content & First Alumni (Weeks 7–10: May 26 – Jun 22)

**Goal:** Collect first alumni passes from the June IPAS exam, hit 70 total paying students.

| Milestone | Target date | Success metric |
|---|---|---|
| Publicly share 中級 exam result | May 26 | Post within 24h of exam |
| First 初級 students sit June IPAS | ~Jun 7 | (exact date per IPAS schedule) |
| First documented student passes | Jun 14 | At least 1 testimonial with real name + score |
| University club outreach campaign | Jun 1–15 | 10 clubs contacted, 2 confirmed |
| 70 total paying students | Jun 22 | 20 founding + 50 early bird ≈ NT$188,600 |

**Key content pivots:**
- **If founder passed 中級:** lead all marketing with *"我兩張都一次通過"* + walk-through video
- **If founder failed 中級:** lead with *"我考砸了，但我免費延長 6 個月，來看看我怎麼準備第二次"* — use dogfood 6-month policy publicly. This is a stronger story than passing.
- Either way: 初級 alumni testimonials go on landing page hero by Jun 15

**What gets BUILT in Phase 2:**
- Alumni testimonial collection flow (private LINE → public screenshot)
- University club landing page variant (NT$1,200 bulk pricing)
- Content upgrade: first 3 alumni case study posts on Dcard
- IF pass: 中級 early-bird pre-orders open

---

### Phase 3 — Scale Proof & Decide Next Cert (Weeks 11–13: Jun 23 – Jul 10)

**Goal:** 100 paying students, documented pass rate, decision on next cert vertical.

| Milestone | Target date | Success metric |
|---|---|---|
| First university club bulk deal closed | Jun 30 | 1 deal × 20 seats = NT$24,000 |
| 100 paying students milestone | Jul 5 | Mixed tiers ≈ NT$250,000 cumulative |
| First pass rate published | Jul 8 | e.g., "8/10 初級 students passed" |
| Next cert decision | Jul 10 | Decide: 中級 full launch, or AWS AI, or Google AI Essentials |

**What gets BUILT in Phase 3:**
- Cleaned-up Next.js site (replaces Carrd landing page)
- Proper dashboard (progress, mock history, weak areas)
- Basic RPG layer IF still trivial to add (XP, level-up toast, streak — NOT guilds/PvP)
- Student verification flow (automated .edu.tw email check)

**Decision gate:** If <50 paying students by Jul 5 → do not expand verticals, double down on 初級 marketing for another 30 days. If ≥50 paying students → green-light next cert vertical.

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

Conservative scenario (assumes everything works but slower than hoped):

| Date | Cumulative students | Cumulative revenue (NTD) |
|---|---|---|
| Apr 21 | 5 | 9,900 |
| May 15 | 20 | 39,600 |
| May 25 | 40 | 99,000 |
| Jun 22 | 70 | 188,600 |
| Jul 10 | 100 | ~250,000 |

At 100 students with documented pass rate you've validated the wedge. That's the number that changes whether this is a side project or a potential full-time pursuit.

---

## Kill criteria (when to stop and rethink)

- **Apr 24:** If zero paying pre-orders from the LINE group → the product or price is wrong. Stop building. Interview 5 LINE group members directly.
- **May 15:** If fewer than 10 paying pre-orders total → the public-facing funnel is broken. Stop building content, fix the landing page.
- **Jun 22:** If fewer than 40 paying students 6 weeks after public launch → positioning is the problem. Rewrite from the 10 customer quotes.
- **Jul 10:** If fewer than 50 paying students → don't expand verticals. The issue is distribution, not supply.

---

## Current state snapshot (2026-04-10)

- [x] IPAS 初級 content scaffolded — L11101, L11102, L11201, L11202 lesson content complete
- [x] Question bank strategy defined (practice/mock pool split)
- [x] Founder passed IPAS 初級
- [x] LINE group of IPAS candidates available as Phase 0 audience
- [x] CLAUDE.md pricing + pass guarantee updated
- [ ] Everything else in Phase 0

See `TODO.md` for the actionable weekly checklist.
