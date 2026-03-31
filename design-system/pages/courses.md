# Page Override: Courses (`/courses` + `/courses/[slug]`)

> Rules in this file **override** `design-system/MASTER.md`. For anything not specified here, follow MASTER.md.

---

**Routes:** `/courses` (listing), `/courses/[slug]` (detail)
**Purpose:** Browse available courses, view details, purchase
**RPG elements:** Progress bar for enrolled users on course cards

---

## Course Listing (`/courses`)

### Layout

- Course cards in 2-column grid (desktop), 1-column (mobile)
- Filter bar: cert level (beginner / intermediate), cert type
- Each card shows: course title, cert name, lesson count, price, progress bar (if enrolled)

### Card Design

| Element | Spec |
|---------|------|
| Card | `rounded-xl`, `bg-surface`, `shadow-md`, hover: `shadow-lg` + `translateY(-2px)` |
| Cert badge | Small pill tag — level indicator (beginner = emerald, intermediate = indigo) |
| Progress bar | Only visible for enrolled users — amber-400 fill, `rounded-full`, percentage label |
| Price | Large, bold, `text-text` |
| CTA button | "View Course" — secondary button style |

## Course Detail (`/courses/[slug]`)

### Layout

- Split layout (desktop): Left = course info + syllabus, Right = sticky purchase card
- Single column (mobile): info first, purchase card sticks to bottom

### Sections

| # | Section | Content |
|---|---------|---------|
| 1 | **Header** | Course title, cert name, level badge, lesson count, estimated time |
| 2 | **Description** | What you'll learn, target audience, prerequisites |
| 3 | **Syllabus** | Expandable section list — each section shows lesson titles + "(Quiz)" marker |
| 4 | **Instructor** | Brief about section (can be minimal for Phase 1) |
| 5 | **Purchase Card** | Price, "3-month access", pass guarantee note, emerald CTA button |

### Purchase Card Override

- **Sticky** on desktop (right column)
- Background: `slate-750` (slightly lighter than main surface for emphasis)
- Border: `border-indigo-500/20` subtle glow
- CTA: Full-width emerald button "Start Learning"
- Below CTA: "Pass guarantee — fail once, get 3 months free"

## Anti-Patterns

- No "Add to Cart" language — this is direct purchase, not e-commerce
- No overwhelming feature comparison tables — one course, one price
