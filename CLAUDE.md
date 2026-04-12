# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**LevelCert.com** — A platform helping young professionals and career-switchers earn beginner-to-intermediate certifications. Combines video courses, a mock exam system with AI-explained answers, and social media content automation.

**Starting vertical:** IPAS AI應用規劃師 (初級 + 中級) — used as the pilot to build and validate the content generation workflow and website before expanding to other cert verticals.

**Long-term vision:** B2C → Marketplace → SaaS layer.
1. Prove the model with IPAS (B2C, Taiwan)
2. Expand to more cert verticals using the AI workflow
3. Open the platform — invite other cert instructors and training companies to create and sell on LevelCert (take a 20–30% platform cut)
4. Package the AI cert-content generation workflow as a paid creator tool (SaaS subscription for platform creators)

**Defensible moat:** Cert prep is outcome-binary (pass or fail). LevelCert owns that outcome — AI-generated content + mock exam system + pass guarantee. This survives AI commoditization because the passing score can't be faked.

**Business model:** Pay-per-course. Access policy differs by tier (see table below) because the 2026 exam calendar creates a pre-order access problem — students who buy in Apr–May on a standard 3-month clock would see their access expire before the first sittable exam (Aug 15).

- **Failed exam (1st time):** 1 free **6-month** extension — student forwards official IPAS failure email (from registered email) to trigger n8n automation that verifies and extends `access_expires_at` in Supabase. Rationale: **中級 runs only 2× per year** (~6 months apart — in 2026, May 23 and Nov 14), so any extension shorter than 6 months would guarantee a failed 中級 student cannot reach the next exam. 初級 runs 4× per year (Mar/May/Aug/Nov) so it is not the binding constraint. Sizing the extension for 中級 keeps the policy simple (one number for both levels) and always leaves at least one retry window. See [docs/launch/ipas-exam-calendar-2026.md](docs/launch/ipas-exam-calendar-2026.md) for the full schedule.
- **Failed exam (2nd time / after extension used):** 50% discount code to repurchase the course.
- **Maximum free access:** Through 2026-12-31 for pre-launch cohorts (founding, early-bird, student, club). Post-launch (正價) is 9 months (3 initial + 6 extension). No further free extensions beyond that.

**Pricing ladder (IPAS AI 初級 pilot, decided 2026-04-10):**
| Tier | Price (NTD) | Eligibility | Access policy |
|---|---|---|---|
| 社團團購 | 1,200/seat | Verified university club/student org, 20+ seats | Through **2026-12-31** (per-deal override OK) |
| 學生價 | 1,480 | Verified .edu.tw email OR student ID — 大學+研究所 only | Through **2026-12-31** |
| 創始會員 | 1,980 | First 20 seats (LINE group pre-sell) | Through **2026-12-31** (founding perk) |
| 早鳥價 | 2,980 | Seats 21–70 | Through **2026-12-31** (early-bird perk) |
| 正式價 | 3,980 | Seat 71+ | 3 months initial + 6-month extension on fail |

**Why the through-2026-12-31 access window for all pre-launch tiers (decided 2026-04-10):** With a vanilla 3-month access clock, a Week 1 founding buyer (~Apr 16) would see access expire ~Jul 16, **30 days before** the first sittable 初級 exam on Aug 15 (because 初級 第二次 registration for May 16 already closed at noon on Apr 10 — every Week 1+ student's first real exam is Aug 15). Locking all pre-launch tiers to 2026-12-31 means every founding/early-bird/student/club buyer gets to attempt **both** the Aug 15 AND Nov 7 exams from a single purchase, with zero extension paperwork. It's also a legitimate founding perk that differentiates pre-launch from 正價. Marketing line: 「創始 / 早鳥會員享完整課程存取至 2026 年底，保證至少兩次正式考試機會。」

Student tier is cohort-locked (first 30 days after launch only) to protect the founding/early-bird anchors. Do not raise above NT$3,980 until 10+ documented alumni passes exist.

## Repository Structure

This repo contains everything about the project — not just website code.

```
levelcert/
├── web/                    # Next.js website (the product)
├── content/                # Course content creation pipeline (internal tool)
│   ├── _templates/         # Reusable prompt + lesson templates
│   ├── _scripts/           # AI generation scripts (Node.js)
│   └── ipas/               # IPAS cert vertical (pilot)
│       ├── beginner/
│       └── intermediate/
├── social/                 # Social media automation (FB, X, IG)
│   ├── n8n/                # n8n workflow JSON exports
│   ├── templates/          # Caption templates per platform
│   ├── assets/             # Brand assets, image base templates
│   └── scripts/            # sharp/canvas image card generation
├── supabase/               # DB schema & migrations (shared across web + scripts)
│   ├── migrations/
│   └── seed/
├── docs/
│   ├── brand/              # Brand reference, domain registration
│   ├── planning/           # Build plans, workflow specs
│   ├── future-courses/     # Research on future cert verticals
│   └── competitors/        # Competitor analysis
└── .github/workflows/      # CI/CD
```

## Tech Stack & Architecture

**Full details:** See `docs/planning/ARCHITECTURE.md` (single source of truth for tech stack, architecture decisions, content protection strategy, data flow, and Supabase RLS).

**Quick reference:**
- **Web:** Next.js 16.2 (App Router) + React 19 + Tailwind CSS 4 + shadcn/ui → Vercel. ⚠️ Next 16 has breaking changes vs. training data — read `web/AGENTS.md` and `web/node_modules/next/dist/docs/` before writing Next.js code.
- **Backend:** Supabase (PostgreSQL + RLS + Edge Functions) — all business logic here, never in Next.js
- **Auth:** Clerk | **Payments:** Stripe | **Video:** Bunny.net | **Automation:** n8n | **AI:** Gemini 2.0 Flash
- **Phase 1:** Traditional Chinese only, dark mode only
- **Content protection:** Auth middleware + client-side content loading + robots.txt (see ARCHITECTURE.md)

## Site Routes (`web/`)

```
/                              — Landing page (public, SSG)
/courses                       — Course listing (public, SSG)
/courses/[slug]                — Course detail + purchase (public, SSG)
/learn/[slug]/[lesson]         — Lesson player (auth-gated)
/learn/[slug]/quiz/[section]   — Section quiz / mob battle (auth-gated)
/exam/[slug]                   — Mock exam / boss battle (auth-gated)
/exam/[slug]/result            — Score report + AI explanations (auth-gated)
/dashboard                     — User courses, progress, RPG stats (auth-gated)
/login                         — Clerk auth
```

## Build Phases

1. **Pilot — IPAS B2C (Now):** Content generation workflow for IPAS 初級/中級, website with landing page, course pages, lesson player, Stripe checkout, Clerk auth, progress tracking
2. **Mock Exam System:** Question bank in Supabase (tagged by topic + level), timed exam simulator, score reports, AI explanations for wrong answers, n8n failure-email extension automation
3. **Scale Verticals (6–18 months):** Add 2–3 more cert verticals (AWS, Google, PMP etc.) using the proven AI content workflow. Each new cert = days of work, not months.
4. **Open the Platform (18+ months):** Invite other cert instructors and training companies to create and sell on LevelCert. Platform takes 20–30% cut. Add creator dashboard, instructor onboarding, revenue sharing.
5. **SaaS Layer:** Package the AI cert-content generation workflow as a paid add-on for platform creators (subscription for AI credits — content gen, exam question gen, explanation gen).

## UI Design System

Before building any UI page or component, read `design-system/MASTER.md` (global source of truth) and `design-system/pages/<page>.md` if it exists (page-specific overrides). Do not invent colors, fonts, or styles not in the design system.

## Current State

**Launch sprint (Phase 0):** Founder sits IPAS AI 中級 exam 2026-05-23 (Sat) as a public forcing function. Target: 5 paying pre-orders by Apr 21, 40 students by May 23, 100 by Jul 10. Daily operating card is [docs/launch/START-HERE.md](docs/launch/START-HERE.md); week-by-week checklist is [docs/launch/TODO.md](docs/launch/TODO.md); 2026 exam calendar source of truth is [docs/launch/ipas-exam-calendar-2026.md](docs/launch/ipas-exam-calendar-2026.md).

**`web/` (the product):** Next.js 16.2 app, Vercel-linked, deployed to levelcert.com. The marketing landing page at `web/app/(marketing)/page.tsx` exists but has known fake-claim issues (92% 通過率 badge, `sampleTestimonials`) that must be fixed before sending traffic — see TODO.md Week 1. Existing components: marketing sections, course/lesson/quiz shells, RPG widgets (xp, hp, radar, streak, badges) under `web/components/rpg/`.

**Content:** IPAS 初級 lessons L11101/L11102/L11201/L11202 are shipped with question pools; remaining 初級 lessons pending per `docs/content-roadmap.md`.

**Not yet built:** Supabase schema/migrations, Clerk auth wiring, Stripe webhook → access provisioning, mock exam engine, n8n extension automation. Week 1 uses a Stripe Payment Link + manual provisioning as the cheapest path to pre-orders.

<!-- VERCEL BEST PRACTICES START -->
## Best practices for developing on Vercel

These defaults are optimized for AI coding agents (and humans) working on apps that deploy to Vercel.

- Treat Vercel Functions as stateless + ephemeral (no durable RAM/FS, no background daemons), use Blob or marketplace integrations for preserving state
- Edge Functions (standalone) are deprecated; prefer Vercel Functions
- Don't start new projects on Vercel KV/Postgres (both discontinued); use Marketplace Redis/Postgres instead
- Store secrets in Vercel Env Variables; not in git or `NEXT_PUBLIC_*`
- Provision Marketplace native integrations with `vercel integration add` (CI/agent-friendly)
- Sync env + project settings with `vercel env pull` / `vercel pull` when you need local/offline parity
- Use `waitUntil` for post-response work; avoid the deprecated Function `context` parameter
- Set Function regions near your primary data source; avoid cross-region DB/service roundtrips
- Tune Fluid Compute knobs (e.g., `maxDuration`, memory/CPU) for long I/O-heavy calls (LLMs, APIs)
- Use Runtime Cache for fast **regional** caching + tag invalidation (don't treat it as global KV)
- Use Cron Jobs for schedules; cron runs in UTC and triggers your production URL via HTTP GET
- Use Vercel Blob for uploads/media; Use Edge Config for small, globally-read config
- If Enable Deployment Protection is enabled, use a bypass secret to directly access them
- Add OpenTelemetry via `@vercel/otel` on Node; don't expect OTEL support on the Edge runtime
- Enable Web Analytics + Speed Insights early
- Use AI Gateway for model routing, set AI_GATEWAY_API_KEY, using a model string (e.g. 'anthropic/claude-sonnet-4.6'), Gateway is already default in AI SDK
  needed. Always curl https://ai-gateway.vercel.sh/v1/models first; never trust model IDs from memory
- For durable agent loops or untrusted code: use Workflow (pause/resume/state) + Sandbox; use Vercel MCP for secure infra access
<!-- VERCEL BEST PRACTICES END -->
