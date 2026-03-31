# Page Override: Dashboard (`/dashboard`)

> Rules in this file **override** `design-system/MASTER.md`. For anything not specified here, follow MASTER.md.

---

**Route:** `/dashboard`
**Purpose:** Student home — view courses, track progress, see RPG stats
**RPG elements:** ALL — XP + progress bars, streak counter + calendar, weakness radar, badge showcase

---

## Design Principle

**This is the RPG "home screen."** Most gamification elements are concentrated here. Balance data density with game elements without feeling cluttered. Think RPG character stats page meets learning dashboard.

## Layout

- **Max width:** `max-w-6xl`
- **Grid:** 2-column on desktop (main content left, stats sidebar right), 1-column stacked on mobile

### Desktop Layout

```
+---------------------------+----------------+
| Course Cards (2-col grid) | RPG Stats      |
|                           | - XP Total     |
| [Course 1] [Course 2]    | - Streak       |
|                           | - Radar Chart  |
| Recent Activity           | - Badges       |
+---------------------------+----------------+
```

### Mobile Layout (stacked)

```
RPG Stats (horizontal scroll cards)
Course Cards (1-col)
Recent Activity
```

## RPG Stats Sidebar

| Element | Spec |
|---------|------|
| **XP Total** | Large amber-400 number, `font-heading` weight 700, label "Total XP" below |
| **Streak Counter** | Lucide `Flame` icon (red-400) + day count + "day streak" label. Subtle pulse animation on active streak. |
| **Streak Calendar** | Heatmap grid (last 30 days) — `bg-emerald-500/20` for active days, `bg-slate-700` for missed |
| **Weakness Radar** | Spider chart — `indigo-400` fill at 20% opacity, `indigo-500` stroke, clean axis labels (exam categories) |
| **Badge Showcase** | Grid of earned badges (violet-400 accent), unearned shown as `slate-700` silhouettes |

## Course Cards

| Element | Spec |
|---------|------|
| Card | `rounded-xl`, `bg-surface`, `shadow-md`, hover: `shadow-lg` |
| Progress bar | `amber-400` fill on `slate-700` track, `rounded-full`, percentage label |
| XP earned | Small amber text below progress: "+340 XP earned" |
| Status | Active: emerald dot + "In Progress" / Completed: emerald checkmark |
| Access expiry | `text-muted`, show days remaining. Red if < 7 days. |
| CTA | "Continue Learning" (emerald) or "Start Exam" (indigo) if course complete |

## Daily Quest Section (Phase 1)

- Appears when student has completed at least one section quiz
- "Daily Quest: Answer 5 questions" — shows progress (3/5 today)
- Questions drawn from completed section quizzes (shuffled)
- Compact inline quiz or link to dedicated daily quest page

## Empty States

- **No courses:** "Your adventure begins here" + CTA to course listing
- **No streak:** "Start your first daily quest to build a streak"
- **No badges:** Show all badges as locked silhouettes with names — motivates pursuit

## Anti-Patterns

- No overwhelming stats dump — progressive disclosure (collapsed sections)
- No auto-playing animations — only animate on user interaction or milestone
- No notifications/alerts competing for attention — this is a home base, not a feed
