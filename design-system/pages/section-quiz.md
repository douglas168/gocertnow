# Page Override: Section Quiz (`/learn/[slug]/quiz/[section]`)

> Rules in this file **override** `design-system/MASTER.md`. For anything not specified here, follow MASTER.md.

---

**Route:** `/learn/[slug]/quiz/[section]`
**Purpose:** Test comprehension after completing a section's lessons (mob battle)
**RPG elements:** Mob battle framing (subtle copy), XP gain, immediate feedback, badge unlock

---

## Design Principle

**Calm learning UI, not battle UI.** The mob battle framing is in the copy and subtle visuals — no HP bar, no timer, no battle arena. This is a knowledge check, not a stressful exam.

## Layout Override

- **Max width:** `max-w-2xl` (focused, centered)
- One question visible at a time (card-based, not scrolling list)

## Quiz Flow

| Step | UI |
|------|-----|
| **Intro** | "Mob Battle: [Section Name]" — 3-5 questions, no timer, retry unlimited |
| **Question** | Question card with 4 answer options (radio buttons) |
| **Submit** | "Attack!" button (emerald) — or neutral "Submit Answer" if RPG copy feels forced |
| **Feedback** | Immediate — correct (emerald flash + checkmark) or wrong (red flash + correct answer + AI explanation) |
| **Next** | "Next Question" button after feedback |
| **Complete** | Summary: X/Y correct, XP earned, badge unlocked (if any), "Continue to next section" or "Retry" |

## Visual Overrides

| Element | Spec |
|---------|------|
| Question card | `bg-surface`, `rounded-xl`, `shadow-lg`, `p-8` — elevated feel |
| Answer options | Radio-style cards: `bg-slate-800/50`, `rounded-lg`, `p-4`, hover: `border-indigo-500` |
| Selected answer | `border-indigo-500`, `bg-indigo-500/10` |
| Correct feedback | `border-emerald-500`, `bg-emerald-500/10`, Lucide `CheckCircle` |
| Wrong feedback | `border-red-400`, `bg-red-400/10`, Lucide `XCircle`, show correct + AI explanation below |
| AI explanation | `bg-slate-800`, `rounded-lg`, `p-4`, `text-sm`, `text-muted` — collapsible |

## Progress

- Question counter: "Question 2 of 5" — no timer
- Small progress dots at top (filled = answered)

## Completion Screen

- Score: "4/5 Correct" — large text
- XP earned: "+50 XP" amber toast
- Badge unlock: If first quiz 100% → "Mob Slayer" badge with violet animation
- If < 70%: "Recommended: retry this quiz before moving on" (soft suggestion, not a gate)
- Buttons: "Retry Quiz" (outline) | "Continue to Next Section" (emerald)

## Anti-Patterns

- No timer — save that for boss battle (mock exam)
- No HP bar — save that for boss battle
- No leaderboard or comparison with other students
- No penalty for wrong answers — this is for learning, not ranking
