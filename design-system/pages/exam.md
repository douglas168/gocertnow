# Page Override: Mock Exam (`/exam/[slug]`)

> Rules in this file **override** `design-system/MASTER.md`. For anything not specified here, follow MASTER.md.

---

**Route:** `/exam/[slug]`
**Purpose:** Timed 60-question mock exam — boss battle experience
**RPG elements:** Full battle UI — HP bar, battle clock, arena framing

---

## Design Principle

**Maximum focus. Boss battle intensity.** This is the most visually distinct page. Deeper dark background, minimal UI chrome, no sidebar, no navigation distractions. The student is in the arena.

## Color Override

| Role | Hex | CSS Variable | Override Reason |
|------|-----|--------------|-----------------|
| Background | `#020617` (slate-950) | `--color-exam-bg` | Deeper than default `slate-900` for arena intensity |
| Surface | `#0F172A` (slate-900) | `--color-exam-surface` | Question cards one level up from bg |
| Border | `#1E293B` (slate-800) | `--color-exam-border` | Subtler borders in focused mode |

## Layout Override

- **Max width:** `max-w-3xl` (focused, centered)
- **No sidebar, no main navigation** — only exam UI
- **No footer** — clean arena
- Top bar only: HP bar + timer + question counter + "Exit Exam" (with confirmation dialog)

## Exam UI Components

### Top Bar (Fixed)

```
[HP Bar ██████████░░░░ 67%]  [Timer 42:15]  [Q 23/60]  [Exit]
```

| Element | Spec |
|---------|------|
| **HP Bar** | `rounded-full`, gradient `emerald-400` → `red-400` (drains left-to-right as wrong answers accumulate). Width = (correct / total answered). |
| **Timer** | `font-mono`, `text-lg`, `text-muted`. Turns `red-400` at < 5 minutes. No animation — just color change. |
| **Question Counter** | "23 / 60" — `text-muted` |
| **Exit button** | Ghost button, `text-muted`. Opens confirmation: "Leave the arena? Your progress will be saved." |

### Question Card

| Element | Spec |
|---------|------|
| Card | `bg-exam-surface`, `rounded-xl`, `p-8`, no shadow (flat in dark mode) |
| Question text | `text-lg`, `text-text-dark`, `font-body` |
| Answer options | 4 radio cards: `bg-slate-800`, `rounded-lg`, `p-4`, hover: `border-indigo-500/50` |
| Selected | `border-indigo-500`, `bg-indigo-500/10` |
| Category tag | Small pill above question: exam category (e.g., "Machine Learning") — `text-xs`, `text-muted` |

### Navigation

- "Next" button (emerald) — moves to next question
- "Previous" button (ghost) — go back to review
- Question grid: clickable grid showing answered (filled) vs unanswered (outline) vs flagged (amber)
- "Flag for review" toggle on each question

### Submit

- After question 60 or manual submit: confirmation dialog
- "Submit Exam — Face Your Score" (emerald CTA)
- Show count of unanswered + flagged questions before confirming

## Transitions

- Question transitions: subtle `opacity` fade (150ms) — no slide, no bounce
- HP bar: smooth width transition (300ms)
- Timer: no animation, just ticks

## Anti-Patterns

- No sound effects or vibrations
- No "wrong answer" indicators during the exam — feedback comes in the result page
- No decorative elements — pure focus
- No chat, help, or AI during the exam
- No ability to see correct answers during the exam
