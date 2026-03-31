# [M0001-20260331-web-rpg-lms-shell] — STATUS

**Status**: ⏳ Planned
**Phase**: P1 — IPAS B2C Pilot
**Goal**: Set up Next.js shell with RPG-lite design system and build all 7 page layouts with interactive placeholders and sample TC data
**Depends on**: None — first milestone
**Requested by**: self

---

## Problem & Motivation

No code implementation exists yet. The design system (Indigo + Emerald dark theme, typography, RPG element guidelines) is fully documented in `design-system/MASTER.md` and 7 page-specific overrides, plus validated via HTML mockups — but none of it is built in Next.js. Need the visual foundation and page structures in place before any real features (auth, payments, data) can be built.

## Success Criteria

- All 7 pages render in the browser with correct dark theme, fonts, and RPG elements
- Pages match the HTML mockups in `docs/mockups/*.html`
- Navigation works between all pages
- Responsive at 375px, 768px, 1024px, 1440px
- Noto Sans TC renders correctly for all Traditional Chinese placeholder text
- Design system tokens (colors, spacing, shadows) are implemented as CSS variables / Tailwind config

## Scope

### What's IN
- Next.js 14 App Router shell with Tailwind CSS + shadcn/ui
- Global CSS with design system tokens from MASTER.md (Indigo + Emerald, dark mode only)
- Font setup: Poppins + Open Sans + Noto Sans TC via Google Fonts
- Shared layout.tsx with navbar, footer
- 7 page layouts with interactive placeholders + sample TC data:
  1. `/` — Landing page (hero, problem, solution features, how-it-works, social proof, pricing, FAQ)
  2. `/courses` — Course listing (filter bar, course cards with progress bars)
  3. `/courses/[slug]` — Course detail (syllabus accordion, sticky purchase card)
  4. `/learn/[slug]/[lesson]` — Lesson player (sidebar nav, content area, callout boxes, prev/next)
  5. `/learn/[slug]/quiz/[section]` — Section quiz / mob battle (question cards, answer options, feedback states)
  6. `/exam/[slug]` — Mock exam / boss battle (HP bar, timer, question grid, deep dark theme)
  7. `/exam/[slug]/result` — Exam result / battle report (score ring, category breakdown, wrong answer accordion)
- Dashboard page at `/dashboard` (XP total, streak calendar, skill radar bars, badge grid, course cards)
- RPG visual elements: XP numbers, progress bars, streak counter, badge icons, radar chart (all with placeholder data)
- Permanent interactive elements: working nav, hover states, accordion open/close, responsive collapse
- Sample data in Traditional Chinese (fake IPAS course titles, placeholder quiz questions, sample testimonials)

### What's explicitly OUT (for now)
- No real authentication (Clerk) — pages are all publicly accessible
- No Stripe / payment integration
- No Supabase connection — all data is hardcoded placeholder
- No API routes
- No real course content or question bank
- No i18n / English language support
- No light mode toggle
- No real XP/streak/badge logic — just visual placeholders
- No deployment config changes (current Vercel setup is sufficient)

## Constraints & Risks
- Must follow `design-system/MASTER.md` exactly — no inventing colors, fonts, or styles
- Traditional Chinese only — all UI copy in 繁體中文
- Dark mode only — no light mode
- shadcn/ui components only — no custom component libraries
- Lucide icons only — no emojis as UI icons
- All pages must pass the pre-delivery checklist in MASTER.md

## Routes / UI Surfaces
- `/` — Landing page (new)
- `/courses` — Course listing (new)
- `/courses/[slug]` — Course detail (new)
- `/learn/[slug]/[lesson]` — Lesson player (new)
- `/learn/[slug]/quiz/[section]` — Section quiz (new)
- `/exam/[slug]` — Mock exam (new)
- `/exam/[slug]/result` — Exam result (new)
- `/dashboard` — User dashboard (new)

## Integrations
- None in this milestone

## Reference / Inspiration
- `design-system/MASTER.md` — Global design system (colors, fonts, spacing, components)
- `design-system/pages/*.md` — Page-specific overrides (7 files)
- `docs/mockups/*.html` — Visual reference mockups (7 files)
- `docs/planning/RPG-LITE-SCOPE.md` — RPG element specifications
- `docs/planning/WEBSITE-BUILD-PLAN.md` — Overall build plan and site structure

---

## Checklist

### Web
- [ ] Vercel preview deploy works
- [ ] Vercel production deploy works
- [ ] Mobile responsive (375px, 768px, 1024px, 1440px)
- [ ] No console errors on prod
- [ ] All 7 pages render correctly
- [ ] Design system tokens match MASTER.md
- [ ] Noto Sans TC renders Traditional Chinese correctly
- [ ] All pages pass MASTER.md pre-delivery checklist

## Exit Criteria

- [ ] All 7 pages visually match the HTML mockups in `docs/mockups/`
- [ ] Navigation between all pages works
- [ ] RPG elements (XP, progress bars, streak, badges, radar, HP bar) render with placeholder data
- [ ] Responsive — no horizontal scroll, no content hidden behind navbar
- [ ] Traditional Chinese placeholder text displays correctly
- [ ] shadcn/ui components used consistently (no custom alternatives)

---

## Superpowers Artifacts

- **Design spec**: [specs/2026-03-31-design.md]()
- **Implementation plan**: [plans/2026-03-31-plan.md]()
- **Notes**: [notes/]()

---

## Reference

- Milestone folder: `milestones/M0001-20260331-web-rpg-lms-shell/`
- Supabase schema: `supabase/migrations/`
- Web routes: `web/app/`
