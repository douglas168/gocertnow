# UI Design System Workflow (ui-ux-pro-max)

**Goal:** Before building any new page or component, generate a locked-down design system so Claude doesn't make arbitrary design decisions. One consistent visual language across the entire product.

**Skill installed at:** `.claude/skills/ui-ux-pro-max/`
**Stack:** Next.js 14 + Tailwind CSS + shadcn/ui

---

## When to Run This Workflow

| Trigger | Action |
|---|---|
| First time building any UI in this project | Run Phase 1–3 to generate and persist the Master design system |
| Starting a new page (landing, course, exam, dashboard) | Run Phase 4 to generate a page-specific override |
| Changing the overall visual direction | Re-run Phase 1–3, replace `design-system/MASTER.md` |
| Adding a new component with unusual design needs | Run Phase 3 domain searches for that specific need |

---

## Phase 1 — Generate Master Design System (One-Time)

Run this once before any UI code is written. It queries 5 domains in parallel and produces a complete design system.

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "edtech SaaS certification exam bilingual Taiwan professional trust" \
  --design-system --persist -p "GoCertNow" -f markdown
```

**What this outputs:**
- Visual style recommendation (e.g., Glassmorphism + Flat Design)
- Color palette with hex values
- Typography pairing (heading + body fonts)
- Landing page pattern
- Dashboard style
- Anti-patterns to avoid

**Saves to:** `design-system/MASTER.md` — this becomes the **global source of truth** for all UI work in this project.

---

## Phase 2 — Stack-Specific Guidelines

After generating the design system, get Next.js + shadcn-specific implementation rules:

```bash
# Next.js patterns (SSR, images, routing)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "layout responsive performance" --stack nextjs

# shadcn/ui component patterns
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "components theming forms" --stack shadcn
```

Append any relevant outputs as notes in `design-system/MASTER.md`.

---

## Phase 3 — Supplement with Domain Searches (As Needed)

Use these when you need more detail on a specific aspect. Run before building that part of the UI.

```bash
# UX guidelines (accessibility, animation)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "animation accessibility loading" --domain ux

# Typography — bilingual CJK + Latin
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "professional modern bilingual" --domain typography

# Color — trust-building edtech palette
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "saas education trust" --domain color

# Landing page structure
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "hero social-proof pricing CTA" --domain landing
```

---

## Phase 4 — Page-Specific Overrides

Before building each major page, generate a page override. This captures deviations from the Master (e.g., exam page needs max focus/minimal distraction; dashboard needs data density).

```bash
# Landing page
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "landing page certification course hero trust social-proof" \
  --design-system --persist -p "GoCertNow" --page "landing"

# Course listing + detail pages
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "course listing e-learning product card purchase" \
  --design-system --persist -p "GoCertNow" --page "courses"

# Lesson player (text + audio, no video)
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "reading focused content player distraction-free" \
  --design-system --persist -p "GoCertNow" --page "lesson-player"

# Mock exam simulator
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "exam quiz timed focused minimal high-stakes" \
  --design-system --persist -p "GoCertNow" --page "exam"

# Score report + AI explanations
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "results report data breakdown score explanation" \
  --design-system --persist -p "GoCertNow" --page "exam-result"

# User dashboard
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "dashboard progress tracking course access expiry" \
  --design-system --persist -p "GoCertNow" --page "dashboard"
```

**Saves to:** `design-system/pages/<page>.md`

---

## How Claude Uses the Design System

When asking Claude to build a page or component, tell it explicitly:

```
Build the [page name] page. Read design-system/MASTER.md first,
then check design-system/pages/[page].md for any overrides.
Follow the design system exactly — do not invent colors, fonts,
or styles not in the system.
```

**Hierarchy:**
1. `design-system/pages/<page>.md` — page-specific rules (override Master)
2. `design-system/MASTER.md` — global rules (fallback when no page override)

---

## GoCertNow Design Constraints

These are project-specific requirements to add to every design system query and to note in MASTER.md:

| Constraint | Reason |
|---|---|
| Bilingual: Traditional Chinese + English | Taiwan IPAS pilot (zh) + future international certs (en) |
| Trust-first visual tone | Cert prep is outcome-binary — credibility drives purchase |
| Text-heavy lesson content | Students scan/review 5–10× before exam; no video |
| Mobile-responsive required | Exam prep happens on mobile/commute |
| shadcn/ui components only | Avoids component inconsistency; design token integration |
| No emoji as UI icons | Use Lucide (bundled with shadcn/ui) |

---

## Design System File Structure (After Running Phases 1–4)

```
design-system/
├── MASTER.md                  ← Global source of truth (Phase 1 output)
└── pages/
    ├── landing.md             ← Landing page overrides
    ├── courses.md             ← Course listing + detail overrides
    ├── lesson-player.md       ← Lesson player overrides
    ├── exam.md                ← Mock exam overrides
    ├── exam-result.md         ← Score report overrides
    └── dashboard.md           ← User dashboard overrides
```

---

## Pre-Delivery Checklist (Claude must verify before returning UI code)

### Visual
- [ ] No emojis used as icons — Lucide SVG only
- [ ] All colors from design-system palette (not arbitrary hex)
- [ ] Font pairing matches MASTER.md
- [ ] Brand logos verified from Simple Icons

### Interaction
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover states provide visual feedback (color/shadow, no layout shift)
- [ ] Transitions 150–300ms

### Light/Dark Mode
- [ ] Light mode text contrast ≥ 4.5:1
- [ ] Glass/transparent elements visible in light mode
- [ ] Borders visible in both modes

### Layout
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile
- [ ] No content hidden behind fixed navbars
- [ ] Consistent `max-w-6xl` or `max-w-7xl` containers

### Accessibility
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] `prefers-reduced-motion` respected
- [ ] Tab order matches visual order

### Bilingual (GoCertNow-specific)
- [ ] CJK font renders correctly (Traditional Chinese characters)
- [ ] Line height sufficient for CJK text (≥ 1.7 recommended)
- [ ] Layout doesn't break when text length differs between zh/en

---

## Build Order

1. Run Phase 1 → generate and review `design-system/MASTER.md`
2. Run Phase 2 → add stack notes to MASTER.md
3. Run Phase 3 as needed (UX, typography, color deep-dives)
4. Run Phase 4 for each page before building it
5. Start building UI — always reference design system, never invent
