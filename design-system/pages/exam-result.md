# Page Override: Exam Result (`/exam/[slug]/result`)

> Rules in this file **override** `design-system/MASTER.md`. For anything not specified here, follow MASTER.md.

---

**Route:** `/exam/[slug]/result`
**Purpose:** Score report after mock exam — "battle report" with category breakdown and AI explanations
**RPG elements:** Battle report layout, radar chart, badge unlock animation

---

## Design Principle

**Reframe the score report as a battle report.** Whether pass or fail, the framing is "here's what happened and here's your path forward." Failure = "try again," not "you failed."

## Layout Override

- **Max width:** `max-w-4xl` (wider than exam page to accommodate data)
- **Background:** Returns to default `slate-900` (exits the deeper exam arena)

## Page Sections

### 1. Result Header

| Outcome | Visual |
|---------|--------|
| **Pass (>= 70%)** | "Victory!" — large emerald text, Lucide `Trophy` icon, confetti-like subtle particle animation (respect `prefers-reduced-motion`) |
| **Fail (< 70%)** | "Defeated... but not done." — `text-muted`, Lucide `Shield` icon, "Retry" CTA prominent |

- Score: Large number (e.g., "76%") in `font-heading`, weight 700
- Sub-stat: "46/60 correct | Time: 52:30"

### 2. Category Breakdown (Weakness Radar)

- **Radar chart** — same spec as dashboard (indigo-400 fill, indigo-500 stroke)
- Below radar: Category table

| Category | Score | Status |
|----------|-------|--------|
| Machine Learning | 8/10 | Emerald "Strong" badge |
| Data Processing | 5/10 | Amber "Review" badge |
| AI Ethics | 3/5 | Red "Weak" badge |

- Each category links to the relevant section lessons for targeted review

### 3. Wrong Answer Review

- Expandable accordion per wrong question
- Each item shows:
  - Question text
  - Your answer (red highlight) vs correct answer (emerald highlight)
  - AI explanation (collapsible, `bg-slate-800`, `rounded-lg`, `p-4`)
  - Category tag
  - "Review lesson" link → deep link to the specific micro-lesson

### 4. Badge Unlock

- If score triggers a badge (70%+ = "Passing Score", 90%+ = "Exam Slayer"):
  - Badge card with violet-400 glow animation
  - Badge icon + name + "Unlocked!"
  - If no new badge: section is hidden (don't show empty state)

### 5. Action Bar

| Outcome | Primary CTA | Secondary CTA |
|---------|------------|---------------|
| **Pass** | "Review Weak Areas" (indigo) | "Try Again for Higher Score" (outline) |
| **Fail** | "Retry Exam" (emerald) | "Study Weak Areas First" (outline) |

- Both outcomes: "Back to Dashboard" (ghost button)

## Visual Overrides

- **Score ring:** Circular progress indicator around the percentage (emerald fill if pass, red if fail)
- **Category bars:** Horizontal bar chart alternative to radar for mobile (radar can be hard to read on small screens)
- **Wrong answers:** Default collapsed — student expands what they want to review

## Anti-Patterns

- No shaming language — "Defeated" not "Failed"
- No comparison with other students
- No "share your score" in Phase 1 (add in Phase 2 with shareable badges)
- No auto-scroll to wrong answers — let student choose what to review
