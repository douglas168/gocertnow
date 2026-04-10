# Session Handoff — 2026-04-10 (launch sprint setup)

## Summary

Built the full Phase 0 launch-sprint artifact set in `docs/launch/` (roadmap, TODO, weekly operating card, landing-page copy, LINE pre-sell, club outreach, competitor template, 45-day build-in-public calendar). Decided the 6-month extension policy (tied to IPAS's ~3x/year exam schedule) and the full pricing ladder (社團 1,200 / 學生 1,480 / 創始 1,980 / 早鳥 2,980 / 正價 3,980) and baked both into [CLAUDE.md](CLAUDE.md).

Then discovered the old `CLAUDE.md` "scaffolding phase, no application code written yet" wording was wrong — `web/` is a real Next.js 16.2 + React 19 + Tailwind 4 app already deployed to levelcert.com via Vercel, with a 429-line marketing landing page at [web/app/(marketing)/page.tsx](web/app/(marketing)/page.tsx). That page has 6 known issues (two are legal risk under Taiwan 公平交易法) that must be fixed before sending any traffic. Updated `CLAUDE.md`, `START-HERE.md`, and `TODO.md` Week 1 to reflect reality — Week 1 is now "fix the existing page surgically + ship a Stripe Payment Link," not "pick Carrd or Framer."

> Note: this replaces the previous HANDOFF.md (which covered the L11203 lesson content session on the same date).

## What was done this session

- **Business decisions finalized:**
  - Extension on exam fail = **6 months** (not 3) because IPAS runs ~3x/year.
  - Full pricing ladder with student tier (NT$1,480, cohort-locked first 30 days, 大學+研究所 only).
- **[CLAUDE.md](CLAUDE.md)** — Updated business-model section (6-month extension + rationale), added pricing ladder table, replaced "scaffolding phase" current-state with actual Phase 0 launch-sprint state, corrected tech stack to Next 16.2 + React 19 + Tailwind 4 with Next-16-breaking-changes warning.
- **[docs/launch/ROADMAP.md](docs/launch/ROADMAP.md)** — 90-day phased plan (Phase 0 validation, Phase 1 build+ship+dogfood, Phase 2 alumni+clubs, Phase 3 scale), revenue projections, kill criteria.
- **[docs/launch/TODO.md](docs/launch/TODO.md)** — Week 1–13 checklist. Week 1 now says "fix existing Next.js landing page," not "ship Carrd." Removed stale "Cleaned-up Next.js site replaces Carrd" item from Weeks 11–13.
- **[docs/launch/START-HERE.md](docs/launch/START-HERE.md)** — Weekly operating card: 5-minute Monday ritual, Sunday night ritual, 3 honest warnings, anti-distractions list, commitment section. Warning 1 rewritten to reflect that landing page already exists and the first job is removing fake claims.
- **[docs/launch/landing-page-copy.md](docs/launch/landing-page-copy.md)** — V1 Traditional Chinese copy: hero, 3 pain points, 4 moats, founder section, pricing ladder, 8 FAQs. Reference voice for porting into the real Next.js page.
- **[docs/launch/line-group-presell.md](docs/launch/line-group-presell.md)** — 3 LINE message versions (main, 2-day follow-up, last call) + response handling protocols.
- **[docs/launch/university-club-outreach.md](docs/launch/university-club-outreach.md)** — 10 target TW universities, cold email template + 2 follow-ups, close playbook, tracker template. **Do not send before Phase 2 (earliest 2026-06-01).**
- **[docs/launch/competitor-research.md](docs/launch/competitor-research.md)** — Template for 10 competitors including HR Only One 職心所 (the actual closest format-match, not Tiandiren).
- **[docs/launch/build-in-public-calendar.md](docs/launch/build-in-public-calendar.md)** — 45-day daily content calendar (Apr 10 – May 25) aligned to founder's 中級 study sprint, weekly themes, 50-hook library, pass/fail exam-day post templates.
- **Memory saved** (in `~/.claude/projects/-Users-douglaskuo-Projects-70-Saas-LevelCert/memory/`):
  - `project_founder_exam_and_build_timeline.md`
  - `project_pricing_ladder_and_guarantee.md`
  - `project_positioning_and_rpg.md`
  - `project_web_app_state.md` (the web/ reality + 6 landing-page fix list + Next 16 caveat)

## What's next (resume here)

**Priority 1 — surgically fix [web/app/(marketing)/page.tsx](web/app/(marketing)/page.tsx) before any traffic.** Two items are legal risk. Needs inputs from user before touching code:

1. **URGENT (legal):** Remove fake "92% 通過率" badge (~line 244). Replace with 「創始會員招募中 · 前 20 位 NT$1,980」scarcity badge.
2. **URGENT (legal):** Remove fake testimonials (Section 5 uses `sampleTestimonials.slice(0, 3)`). Replace with founder-self-intro block.
3. Update "免費延長 **3** 個月" → "**6** 個月" at ~line 319 and ~line 358; add 「因為 iPAS 一年只考 2–3 次」one-liner.
4. Add founder story section — needs name, photo, real 初級 pass month, 中級 exam-date public commitment.
5. Replace flat `sampleCourses` price with full ladder + "剩 X 位" counter.
6. Tone down RPG language in hero + Section 3 (replace 冒險者們/小怪戰鬥測驗/魔王戰模擬考/HP 血條/"RPG 式學習體驗" with outcome language). See `project_positioning_and_rpg.md`.

**Before editing:** read `web/AGENTS.md` and relevant files in `web/node_modules/next/dist/docs/` — Next 16 has breaking changes vs. training data.

**Priority 2 — ship pre-order path:** Create Stripe Payment Link for 創始會員 NT$1,980, wire it to the CTAs, build a simple `/thank-you` page. Manual provisioning via spreadsheet until Week 4. Do NOT build Supabase/Clerk/Stripe webhook flows yet.

**Priority 3 — customer discovery in parallel:** Read 30 Dcard posts + 10 PTT posts + join 5 FB 社團, capture 10 verbatim quotes in `docs/customer-quotes.md` (new file, not yet created). Rewrite landing-page headline from the #1 most common complaint by Apr 24.

**Priority 4 — Week 2:** Post LINE group pre-sell (see [docs/launch/line-group-presell.md](docs/launch/line-group-presell.md)) → target 5 paying founding seats by Apr 21.

## Key files touched this session

- [CLAUDE.md](CLAUDE.md) (modified)
- [docs/launch/ROADMAP.md](docs/launch/ROADMAP.md) (new)
- [docs/launch/TODO.md](docs/launch/TODO.md) (new)
- [docs/launch/START-HERE.md](docs/launch/START-HERE.md) (new)
- [docs/launch/landing-page-copy.md](docs/launch/landing-page-copy.md) (new)
- [docs/launch/line-group-presell.md](docs/launch/line-group-presell.md) (new)
- [docs/launch/university-club-outreach.md](docs/launch/university-club-outreach.md) (new)
- [docs/launch/competitor-research.md](docs/launch/competitor-research.md) (new)
- [docs/launch/build-in-public-calendar.md](docs/launch/build-in-public-calendar.md) (new)

## Hard dates burned in

- **2026-04-21** — 5 paying founding seats
- **2026-05-25** — Founder sits IPAS AI 中級 exam (public forcing function)
- **2026-05-25** — 40 paying students cumulative
- **2026-07-10** — 100 paying students cumulative + next-cert decision gate
