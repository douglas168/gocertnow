# Code Review Prompt

> Point Gemini (or any AI reviewer) to this file after completing a milestone.
> It has full workspace access — no need to paste files.

## Instructions for Reviewer

You are reviewing recent work on **LevelCert** — a Next.js certification prep platform (IPAS pilot, Taiwan market). Your job is to catch bugs, inconsistencies, and deviations from project conventions before the changes deploy to Vercel.

### Step 1 — Understand the project

Read these files to understand the codebase and conventions:

- `CLAUDE.md` — project overview, tech stack, directory structure, build phases, site routes
- `docs/planning/ARCHITECTURE.md` — architecture decisions, data flow, Supabase RLS, content protection strategy
- `design-system/MASTER.md` — design tokens (colors, fonts, spacing), dark-mode-only constraint

### Step 2 — Identify what changed

Run `git log --oneline -20` to see recent commits. Identify the milestone that was just completed.

Then read the milestone's key files (if they exist):

1. **Milestone plan** — in `docs/planning/` (e.g., `WEBSITE-BUILD-PLAN.md` or milestone-specific files)
2. **Design specs** — in `design-system/pages/` for page-specific overrides

### Step 3 — Review the changes

Run `git diff <before-commit>..HEAD` to see all changes in the milestone. Or use `git log --oneline` to identify the range.

Review against these criteria:

#### Correctness
- [ ] Do file paths in docs match actual file locations on disk?
- [ ] Do route paths in code match the route table in `CLAUDE.md`?
- [ ] Do component imports resolve correctly (no broken imports)?
- [ ] Are Supabase table/column names consistent between migrations, RLS policies, and client code?
- [ ] Do Stripe webhook handlers set `access_expires_at` correctly (3-month window)?
- [ ] Does Clerk middleware protect the correct routes (`/learn/*`, `/exam/*`, `/dashboard`)?

#### Convention compliance
- [ ] Traditional Chinese for all user-facing content (UI labels, headings, CTAs, error messages)?
- [ ] Dark mode only — no light-mode styles or theme toggles (Phase 1)?
- [ ] Colors, fonts, and spacing match `design-system/MASTER.md` tokens (Indigo + Emerald palette)?
- [ ] Page-specific overrides match `design-system/pages/<page>.md` if it exists?
- [ ] No emojis used as UI icons (use Lucide React icons instead)?
- [ ] shadcn/ui components used where applicable (no custom components that duplicate shadcn)?
- [ ] Business logic lives in Supabase (RLS + Edge Functions), NOT in Next.js server code?
- [ ] Protected page content loaded client-side after auth (not server-rendered into HTML)?
- [ ] Commit messages follow Conventional Commits (`feat`, `fix`, `docs`, `chore`)?

#### Cross-document consistency
- [ ] `CLAUDE.md` directory structure matches actual repo layout?
- [ ] `docs/planning/ARCHITECTURE.md` tech stack and decisions are up to date?
- [ ] Route table in `CLAUDE.md` matches actual `web/app/` directory structure?
- [ ] Design system tokens in code match `design-system/MASTER.md`?
- [ ] Supabase RLS rules in `ARCHITECTURE.md` match actual migration files?

#### Security
- [ ] No credentials committed (Clerk keys, Stripe keys, Supabase service role key, Bunny.net tokens)?
- [ ] No secrets in `NEXT_PUBLIC_*` env vars (only public-safe values like Clerk publishable key)?
- [ ] Protected routes have both Clerk middleware AND Supabase RLS (defense in depth)?
- [ ] `robots.txt` disallows `/learn/`, `/exam/`, `/dashboard/`?
- [ ] Protected pages include `<meta name="robots" content="noindex, nofollow">`?
- [ ] No SQL injection vectors in Supabase queries (use parameterized queries)?
- [ ] Bunny.net video URLs use signed/token-authenticated URLs (not public)?

#### Content protection (critical for paid content)
- [ ] Lesson text, quiz questions, exam questions, and AI explanations are loaded client-side only?
- [ ] Page shell (SSR) contains layout/nav but zero lesson content in the HTML source?
- [ ] Supabase RLS checks: authenticated + purchased + `access_expires_at > now()`?
- [ ] No lesson content leaked into static props, server components, or API route responses?

#### Performance & deployment
- [ ] Public pages (`/`, `/courses`, `/courses/[slug]`) use SSG or ISR (not SSR)?
- [ ] No unnecessary `"use client"` directives on components that could be server components?
- [ ] Images use `next/image` with proper sizing?
- [ ] No hardcoded localhost URLs or development-only config in committed code?

### Step 4 — Report findings

Organize your review as:

```
## Summary
One paragraph: what was built, overall assessment.

## Issues Found

### Critical (blocks deployment)
- [file:line] Description of issue

### Important (should fix before next milestone)
- [file:line] Description of issue

### Minor (nice to have)
- [file:line] Description of issue

## What Looks Good
Highlight things done well — reinforces good patterns.
```

If no issues found, say so explicitly. Don't invent problems.
