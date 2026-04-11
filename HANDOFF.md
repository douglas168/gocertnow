# Session Handoff — 2026-04-10/11 (launch sprint setup + calendar correction)

## Summary

This session ran long and produced three major pieces of work:

1. **Built the full Phase 0 launch-sprint artifact set** in `docs/launch/` (roadmap, TODO, weekly operating card, landing-page copy, LINE pre-sell, club outreach, competitor template, 43-day build-in-public calendar). Decided the 6-month extension policy (sized for **中級's 2×/year** cadence) and the full pricing ladder. Baked both into [CLAUDE.md](CLAUDE.md).

2. **Discovered the old "scaffolding phase" claim was wrong.** The `web/` directory is a real Next.js 16.2 + React 19 + Tailwind 4 app already deployed to levelcert.com via Vercel, with a 429-line marketing landing page at [web/app/(marketing)/page.tsx](web/app/(marketing)/page.tsx). That page has 6 known issues (two are legal risk under Taiwan 公平交易法) that must be fixed before sending traffic. `CLAUDE.md`, `START-HERE.md`, and `TODO.md` Week 1 all updated to reflect reality.

3. **Corrected the entire plan against the real 2026 IPAS calendar** after the founder surfaced official screenshots showing exam dates. Three things moved: (a) founder's own exam is **2026-05-23 (Sat)**, not 5/25; (b) the "~3×/year" rationale was wrong — 初級 runs **4×/year**, 中級 runs **2×/year**, and the 6-month extension is sized for 中級; (c) there IS no June IPAS exam, so "first alumni testimonials in June → club outreach in June" was impossible. Club outreach moved to **Sep 5** (after 初級 第三次 results on 9/2). Phase 2 renamed to "Recovery + Prep Sprint" (May 26 – Aug 15), Phase 3 is now "First Alumni + Club Outreach" (Aug 16 – Oct 31), Phase 4 is "Q4 Exams + Scale Decision" (Nov 1 – Dec 31). Created [docs/launch/ipas-exam-calendar-2026.md](docs/launch/ipas-exam-calendar-2026.md) as the permanent source of truth.

Also created a new skill, [.claude/skills/saas-entrepreneur-expert/SKILL.md](.claude/skills/saas-entrepreneur-expert/SKILL.md), so the founder can invoke `saas-entrepreneur-expert` in any future session to get strategic advice with the full LevelCert context pre-loaded.

> Note: this replaces the previous HANDOFF.md (which covered the L11203 lesson content session on the same date).

## Decisions made this session

- **Extension on exam fail = 6 months** because 中級 runs only 2×/year (in 2026: 5/23, 11/14). 初級 is 4×/year and not the binding constraint. 6 months is sized for 中級 and inherited by 初級 for policy simplicity.
- **Full pricing ladder:** 社團 1,200 / 學生 1,480 / 創始 1,980 (first 20) / 早鳥 2,980 (seats 21–70) / 正價 3,980 (seat 71+). Student tier cohort-locked first 30 days. 大學+研究所 only — no high school.
- **Access policy split by tier:** Pre-launch tiers (社團/學生/創始/早鳥) get access **through 2026-12-31** regardless of purchase date, guaranteeing every pre-launch buyer can attempt **both** the 8/15 and 11/7 exams from one purchase. 正價 (seat 71+) reverts to standard 3-month initial + 6-month-on-fail. Driven by the fact that 初級 第二次 registration closed noon 2026-04-10, so every Week 1+ buyer's first sittable exam is Aug 15, and a 3-month clock would expire before that.
- **Club outreach moves from June to September.** Earliest send date is **2026-09-05**. Before that: no real alumni testimonials AND universities are on summer break.
- **Founder's 中級 exam date is confirmed 2026-05-23 (Sat).** Already registered. Results 6/12.

## What was done this session

- **Business decisions finalized and documented** in CLAUDE.md + memory (6-month extension rationale, pricing ladder with access policy, exam calendar link).
- **[CLAUDE.md](CLAUDE.md)** — Updated business-model section, added pricing ladder with per-tier access policy, replaced "scaffolding phase" with Phase 0 current-state, corrected tech stack to Next 16.2 + React 19 + Tailwind 4 + Next-16-breaking-changes warning, linked to the 2026 exam calendar.
- **[docs/launch/ipas-exam-calendar-2026.md](docs/launch/ipas-exam-calendar-2026.md)** — New source of truth for every 2026 IPAS date. 初級 4 sessions (3/21, 5/16, 8/15, 11/7), 中級 2 sessions (5/23, 11/14), all registration windows, results dates, strategic implications, the decided through-2026-12-31 access policy.
- **[docs/launch/ROADMAP.md](docs/launch/ROADMAP.md)** — 90+ day phased plan. Phase 0 (Apr 10–24 Validation), Phase 1 (Apr 25 – May 23 Build+Ship+Dogfood), Phase 2 (May 26 – Aug 15 Recovery + Prep Sprint), Phase 3 (Aug 16 – Oct 31 First Alumni + Club Outreach), Phase 4 (Nov 1 – Dec 31 Q4 Exams + Scale Decision). Retimed revenue projections and kill criteria.
- **[docs/launch/TODO.md](docs/launch/TODO.md)** — Full checklist through Dec 31. Week 1 says "fix existing Next.js landing page + Stripe Payment Link," not "ship Carrd." Weeks 7–16 is Phase 2 prep sprint, Weeks 17–24 is Phase 3 club outreach starting 9/5, Weeks 25–32 is Phase 4 Q4 cohorts + decision gate.
- **[docs/launch/START-HERE.md](docs/launch/START-HERE.md)** — Weekly operating card. 5-minute Monday ritual, Sunday night ritual, 3 honest warnings (Warning 1: landing page has fake claims; Warning 2: calendar is a scaffold not a script; Warning 3: club outreach is Phase 3 not Phase 2, earliest 9/5), anti-distractions list, commitment section. Phase table updated to 4 phases.
- **[docs/launch/landing-page-copy.md](docs/launch/landing-page-copy.md)** — V1 Traditional Chinese copy. Updated to say "存取至 2026 年底" in 4 places, updated founder section exam date, updated FAQ Q2 with full access-policy explanation.
- **[docs/launch/line-group-presell.md](docs/launch/line-group-presell.md)** — 3 LINE message versions. Updated with access-through-2026-12-31 perk, corrected 中級 cadence line, fixed exam date to 5/23.
- **[docs/launch/university-club-outreach.md](docs/launch/university-club-outreach.md)** — 10 target universities, cold email template. Header updated: "Earliest send date is 2026-09-05" with hard warning not to send before Sep 5.
- **[docs/launch/competitor-research.md](docs/launch/competitor-research.md)** — Template for 10 competitors including HR Only One 職心所 (real closest format-match, not Tiandiren).
- **[docs/launch/build-in-public-calendar.md](docs/launch/build-in-public-calendar.md)** — 43-day daily content calendar (Apr 10 → May 23). Header updated with the 43-vs-45 caveat. Exam-day section retitled.
- **[docs/brand/prelaunch-mockup.html](docs/brand/prelaunch-mockup.html)** — Countdown target, EN + zh badge text, EN + zh "延長 3/6 個月" feature bullet all updated.
- **[.claude/skills/saas-entrepreneur-expert/SKILL.md](.claude/skills/saas-entrepreneur-expert/SKILL.md)** — New skill. Pre-loads all LevelCert context, phase-matched advice, anti-distraction defense, forbidden behaviors, structured response format. Invoke via `saas-entrepreneur-expert` to get a founder-advisor who already knows the plan.
- **Memory updated** in `~/.claude/projects/-Users-douglaskuo-Projects-70-Saas-LevelCert/memory/`:
  - `project_founder_exam_and_build_timeline.md` — 5/23 corrected, retake window 11/14 added
  - `project_pricing_ladder_and_guarantee.md` — access policy split, rationale reworked for 中級 cadence
  - `project_web_app_state.md` — web/ reality + 6 landing-page fix list
  - `project_ipas_2026_exam_calendar.md` — new, calendar facts + access-policy decision
  - `MEMORY.md` — index updated

## What's next (resume here)

**Priority 1 — surgically fix [web/app/(marketing)/page.tsx](web/app/(marketing)/page.tsx) before any traffic.** Two items are legal risk. Needs inputs from founder before touching code (name, photo, real 初級 pass month, etc.):

1. **URGENT (legal):** Remove fake "92% 通過率" badge (~line 244). Replace with 「創始會員招募中 · 前 20 位 NT$1,980」scarcity badge.
2. **URGENT (legal):** Remove fake testimonials (Section 5 uses `sampleTestimonials.slice(0, 3)`). Replace with founder-self-intro block.
3. Update "免費延長 **3** 個月" → "**6** 個月" at ~line 319 and ~line 358. Add one sentence: 「因為 iPAS AI 中級一年只考 2 次（5 月 + 11 月），6 個月保證你至少趕得上下一場。」
4. Add founder story section — needs name, photo, real 初級 pass month, 5/23 中級 exam public commitment.
5. Replace flat `sampleCourses` price with full ladder + "剩 X 位" counter. Every pre-launch tier card must include: 「完整課程存取至 2026/12/31，保證參加 8/15 + 11/7 兩次考試」. 正價 shows standard 3+6 policy.
6. Tone down RPG language in hero + Section 3 (replace 冒險者們/小怪戰鬥測驗/魔王戰模擬考/HP 血條/"RPG 式學習體驗" with outcome language). See `project_positioning_and_rpg.md`.

**Before editing:** read `web/AGENTS.md` and relevant files in `web/node_modules/next/dist/docs/` — Next 16 has breaking changes vs. training data.

**Priority 2 — ship pre-order path:** Create Stripe Payment Link for 創始會員 NT$1,980, wire to CTAs, build a simple `/thank-you` static page. Manual provisioning via spreadsheet until Week 4. Do NOT build Supabase/Clerk/Stripe webhook flows yet.

**Priority 3 — customer discovery in parallel:** Read 30 Dcard posts + 10 PTT posts + join 5 FB 社團. Capture 10 verbatim quotes in `docs/customer-quotes.md` (new file, not yet created). Rewrite landing-page headline from the #1 most common complaint by Apr 24.

**Priority 4 — Week 2:** Post LINE group pre-sell (see [docs/launch/line-group-presell.md](docs/launch/line-group-presell.md)) → target 5 paying founding seats by Apr 21.

## Key files touched this session

- [CLAUDE.md](CLAUDE.md) (modified)
- [HANDOFF.md](HANDOFF.md) (this file)
- [docs/launch/ROADMAP.md](docs/launch/ROADMAP.md) (new)
- [docs/launch/TODO.md](docs/launch/TODO.md) (new)
- [docs/launch/START-HERE.md](docs/launch/START-HERE.md) (new)
- [docs/launch/ipas-exam-calendar-2026.md](docs/launch/ipas-exam-calendar-2026.md) (new)
- [docs/launch/landing-page-copy.md](docs/launch/landing-page-copy.md) (new)
- [docs/launch/line-group-presell.md](docs/launch/line-group-presell.md) (new)
- [docs/launch/university-club-outreach.md](docs/launch/university-club-outreach.md) (new)
- [docs/launch/competitor-research.md](docs/launch/competitor-research.md) (new)
- [docs/launch/build-in-public-calendar.md](docs/launch/build-in-public-calendar.md) (new)
- [docs/brand/prelaunch-mockup.html](docs/brand/prelaunch-mockup.html) (modified — date + extension copy)
- [.claude/skills/saas-entrepreneur-expert/SKILL.md](.claude/skills/saas-entrepreneur-expert/SKILL.md) (new)

## Hard dates burned in

| Date | What happens |
|---|---|
| **2026-04-21** | Target: 5 paying founding seats |
| **2026-05-16** | Unreachable 初級 第二次 (registration closed 4/10 noon — skip it) |
| **2026-05-23 (Sat)** | Founder sits IPAS AI 中級 第一次 |
| **2026-06-12** | Founder exam result announced — the pivotal post lands within 24h |
| **2026-07-10** | Target: 70 paying students cumulative |
| **2026-08-15 (Sat)** | Student cohort sits 初級 第三次 (first real student exam) |
| **2026-09-02** | Student exam results — first real alumni testimonials |
| **2026-09-05** | Earliest club outreach send date |
| **2026-10-31** | Target: 100 paying students cumulative |
| **2026-11-07 (Sat)** | 初級 第四次 — Q4 student cohort |
| **2026-11-14 (Sat)** | 中級 第二次 — founder's retake window if 5/23 failed |
| **2026-11-25** | Q4 results batch announced |
| **2026-12-15** | Next cert decision gate |
| **2026-12-31** | Pre-launch cohort access window closes |
