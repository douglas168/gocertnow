# LevelCert — Website Architecture

**Last updated:** 2026-03-31

This is the single source of truth for technical architecture decisions. If CLAUDE.md or WEBSITE-BUILD-PLAN.md conflict with this file, this file wins.

---

## Tech Stack

### Web (`web/`)

| Layer | Tool | Why |
|---|---|---|
| Framework | Next.js 14+ (App Router) | SSR/SSG for public pages, rendering layer only — no business logic |
| Styling | Tailwind CSS + shadcn/ui | Design system tokens via CSS variables, consistent components |
| Design System | `design-system/MASTER.md` | Indigo + Emerald, dark mode only, Poppins + Open Sans + Noto Sans TC |
| Auth | Clerk (Google + email) | Has React Native SDK for future mobile parity |
| Payments | Stripe | Taiwan + international cards, has `stripe-react-native` for mobile parity |
| Deployment | Vercel | Zero-config for Next.js, deploys from `web/` |
| Icons | Lucide React | Bundled with shadcn/ui, no emojis as UI icons |

### Backend (shared by web + future mobile)

| Layer | Tool | Why |
|---|---|---|
| Database + business logic | Supabase (PostgreSQL + RLS + Edge Functions) | All business logic lives here — never in Next.js server code — so mobile can reuse it |
| Video hosting | Bunny.net | Private CDN streaming, affordable, works on any platform |
| Automation | n8n (self-hosted) | Social media pipeline + exam failure email extension |
| Image generation | Node.js `sharp` + `canvas` | Social media image card generation |
| AI content | Gemini 2.0 Flash | Course content gen, exam explanations, social copy (fallback: Claude Haiku/Sonnet) |

### Not in Phase 1

| Layer | Tool | When |
|---|---|---|
| i18n | `i18next` + `react-i18next` | Phase 2+ (when adding international certs like AI-900) |
| Mobile | React Native + Expo + NativeWind | Phase 3+ |
| Light mode | CSS `.light` class + toggle | Phase 2+ (if user feedback requests it) |

---

## Page Classification — Public vs Protected

This is the core architectural decision for balancing SEO with content protection.

### Public Pages (SSR/SSG — fully crawlable)

These pages are server-rendered for SEO. They contain marketing content, course outlines, and pricing — nothing proprietary.

| Route | Purpose | Rendering |
|---|---|---|
| `/` | Landing page — marketing, features, pricing, FAQ | SSG (static) |
| `/courses` | Course listing — browse available certs | SSG or ISR |
| `/courses/[slug]` | Course detail — syllabus outline, pricing, purchase CTA | SSG or ISR |
| `/login` | Clerk auth | Client-side |

### Protected Pages (Auth-gated — NOT crawlable)

These pages contain the paid content (lessons, questions, AI explanations). They require 3 layers of protection.

| Route | Purpose | Contains |
|---|---|---|
| `/learn/[slug]/[lesson]` | Lesson player | Lesson text, diagrams, audio — the crown jewels |
| `/learn/[slug]/quiz/[section]` | Section quiz (mob battle) | Quiz questions + AI-explained answers |
| `/exam/[slug]` | Mock exam (boss battle) | Full question bank, timed exam |
| `/exam/[slug]/result` | Exam result (battle report) | Score report, AI explanations for wrong answers |
| `/dashboard` | User dashboard | User progress, XP, streak, badges |

---

## Content Protection Strategy (3 Layers)

### Layer 1 — Auth Middleware (Clerk)

Next.js middleware intercepts all protected routes **before** the page renders.

```
/learn/*      → requires auth
/exam/*       → requires auth
/dashboard    → requires auth
```

- No valid Clerk session → redirect to `/login`
- The page HTML **never reaches the browser** without auth
- Implemented in `web/middleware.ts`

### Layer 2 — Client-Side Content Loading

Lesson content is NOT server-rendered into the HTML. This prevents scrapers from getting content even if they somehow bypass auth.

**How it works:**
1. Page shell renders server-side (layout, sidebar nav, progress bar — no lesson text)
2. Client-side React component mounts and calls Supabase with the user's auth token
3. Supabase RLS verifies: (a) user is authenticated, (b) user has purchased this course, (c) access has not expired
4. Only then is lesson content returned and rendered in the browser
5. View source / curl shows the page skeleton but **zero lesson content**

**Applies to:**
- Lesson text (`/learn/[slug]/[lesson]`)
- Quiz questions + explanations (`/learn/[slug]/quiz/[section]`)
- Exam questions (`/exam/[slug]`)
- AI explanations (`/exam/[slug]/result`)

**Does NOT apply to (server-rendered is fine):**
- Dashboard — only shows the user's own data, protected by auth
- Course detail — public info (syllabus outline, pricing), no paid content

### Layer 3 — Crawl Prevention

```
# public/robots.txt
User-agent: *
Disallow: /learn/
Disallow: /exam/
Disallow: /dashboard/
Allow: /
Allow: /courses/
```

Plus on all protected pages:
```html
<meta name="robots" content="noindex, nofollow">
```

This tells search engines to not index protected pages. Combined with Layer 1 (auth middleware), crawlers get a redirect, not content.

---

## Data Flow Architecture

```
┌─────────────┐     ┌───────────┐     ┌──────────────┐
│  Next.js    │────>│  Clerk    │     │  Supabase    │
│  (Vercel)   │     │  (Auth)   │     │  (DB + RLS)  │
│             │     └───────────┘     │              │
│ Public pages│                       │ - users      │
│ (SSR/SSG)   │  auth token           │ - courses    │
│             │──────────────────────>│ - lessons    │
│ Protected   │  RLS-verified data    │ - progress   │
│ pages       │<──────────────────────│ - exam_q     │
│ (client)    │                       │ - answers    │
└─────────────┘                       └──────────────┘
       │                                     │
       │ purchase                             │
       v                                     │
┌─────────────┐    webhook                   │
│  Stripe     │─────────────────────────────>│
│  (Payments) │  set access_expires_at       │
└─────────────┘                              │
                                             │
┌─────────────┐    failure email             │
│  n8n        │─────────────────────────────>│
│  (Automation)│  extend access_expires_at   │
└─────────────┘                              │

┌─────────────┐
│  Bunny.net  │  Module intro videos (private CDN)
│  (Video)    │  Embedded in lesson player via signed URLs
└─────────────┘

┌─────────────┐
│  Gemini API │  Content generation (internal tool)
│  (AI)       │  Exam explanations (runtime, via Supabase Edge Function)
└─────────────┘
```

---

## Supabase RLS Strategy

All business logic lives in Supabase, not in Next.js. This ensures future mobile app can reuse the same rules.

| Table | RLS Rule | Purpose |
|---|---|---|
| `courses` | Public read | Course listing and detail pages are public |
| `lessons` | Authenticated + purchased + not expired | Only paying users with active access can read lesson content |
| `exam_questions` | Authenticated + purchased + not expired | Protect the question bank |
| `exam_answers` | Authenticated + own data only | Users can only read/write their own answers |
| `user_progress` | Authenticated + own data only | XP, lesson completion — own data only |
| `user_streaks` | Authenticated + own data only | Streak data — own data only |
| `user_badges` | Authenticated + own data only | Badge unlocks — own data only |

**Access check pattern:**
```sql
-- Example: lessons table RLS
auth.uid() = user_id
AND EXISTS (
  SELECT 1 FROM user_courses
  WHERE user_courses.user_id = auth.uid()
  AND user_courses.course_id = lessons.course_id
  AND user_courses.access_expires_at > now()
)
```

---

## Key Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Business logic location | Supabase (RLS + Edge Functions) | Mobile reuse — never in Next.js server code |
| Content rendering (protected) | Client-side fetch after auth | Prevents scraping — page shell has no lesson content |
| Content rendering (public) | SSR/SSG | SEO for landing, course listing, course detail |
| Auth | Clerk middleware | Blocks protected routes before HTML renders |
| Payments | Stripe one-time payment | Sets `access_expires_at` in Supabase via webhook |
| Access model | Time-gated (3 months) | `access_expires_at` column, checked by RLS |
| Pass guarantee | n8n automation | Student emails failure proof → n8n verifies → extends access |
| Language (Phase 1) | Traditional Chinese only | IPAS is Taiwan-only; no i18n overhead |
| Theme (Phase 1) | Dark mode only | Matches target audience (20-35, gamers) platform preferences |
| Content format | Text + diagrams + audio (not video-first) | Scannable, reviewable 5-10x before exam, AI-workflow-native |
| Micro-lessons | One testable concept per lesson, 5-9 min | Cognitive load theory, mobile study sessions, exam traceability |
| Gamification | RPG-lite (6 elements) | See `docs/planning/RPG-LITE-SCOPE.md` |
| Design system | Indigo + Emerald dark theme | See `design-system/MASTER.md` |

---

## Infrastructure

| Service | Plan | Monthly Cost |
|---|---|---|
| Vercel | Free (Hobby) | $0 |
| Supabase | Free tier | $0 |
| Clerk | Free tier (10K MAU) | $0 |
| Stripe | Pay-per-transaction (2.9% + 30¢) | Variable |
| Bunny.net | Pay-as-you-go | ~$1-5 |
| n8n | Self-hosted (or cloud starter) | $0-20 |
| Domain (levelcert.com) | Cloudflare | ~$10/year |
| **Total at launch** | | **~$5-15/mo** |
