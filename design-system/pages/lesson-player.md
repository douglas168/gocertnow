# Page Override: Lesson Player (`/learn/[slug]/[lesson]`)

> Rules in this file **override** `design-system/MASTER.md`. For anything not specified here, follow MASTER.md.

---

**Route:** `/learn/[slug]/[lesson]`
**Purpose:** Read/study lesson content — this is where learning happens
**RPG elements:** MINIMAL — XP toast on completion, progress bar in header only

---

## Design Principle

**This is the least gamified page.** Students are reading and studying here. Every pixel should serve comprehension. No distractions.

## Layout Override

- **Max width:** `max-w-3xl` (narrower than default — optimized for reading)
- **Sidebar:** Left sidebar with section/lesson navigation (collapsible on mobile)
- **Content area:** Centered, generous padding, optimized line length (65-75 characters)

### Content Typography Override

| Element | Override | Why |
|---------|---------|-----|
| Body text | `text-base` (16px), line-height `1.85` | Extended reading comfort — slightly more than MASTER's 1.75 |
| Headings | `text-xl` / `text-lg` — smaller than landing page | Content headings, not marketing headings |
| Code blocks | `bg-slate-950`, `rounded-lg`, `font-mono` | If technical content appears |
| Callout boxes | `bg-indigo-500/10`, `border-l-4 border-indigo-500` | Key concept summaries for pre-exam review |

## Sidebar Navigation

- Shows all sections + lessons in current course
- Current lesson highlighted with `bg-indigo-500/20` + `border-l-2 border-indigo-500`
- Completed lessons show emerald checkmark icon
- Section quiz shows Lucide `Swords` icon
- Collapsible on mobile — hamburger trigger

## RPG Elements (Subtle Only)

| Element | Behavior |
|---------|----------|
| **Progress bar** | Thin bar at very top of page (full width), amber-400 fill — shows course progress |
| **XP toast** | On lesson completion: small toast bottom-right "+15 XP", fades after 2s |
| **Lesson complete** | Mark complete button at bottom — triggers XP, updates sidebar checkmark |

## Navigation

- **Previous / Next** buttons at bottom of content
- Next button: emerald if next is a lesson, indigo if next is a section quiz
- Breadcrumb: Course > Section > Lesson

## Anti-Patterns

- No floating elements overlapping content
- No animations while reading (only on completion)
- No sidebar badges, streaks, or radar on this page
- No auto-advance — student controls when they're done
