# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/levelcert/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** LevelCert
**Generated:** 2026-03-31
**Category:** EdTech / Cert Prep SaaS with RPG-Lite Gamification
**Stack:** Next.js 14+ (App Router) + Tailwind CSS + shadcn/ui
**RPG Scope:** See `docs/product-development/RPG-LITE-SCOPE.md` for feature details

---

## Design Philosophy

LevelCert is a **professional cert prep platform** that uses RPG game mechanics as an engagement layer. The design must:

1. **Lead with credibility and outcomes** — Trust-first visual tone. Students are investing money and time to pass a real exam.
2. **RPG is a layer, not the identity** — Game elements enhance the experience but never overshadow the learning content.
3. **Traditional Chinese only (Phase 1)** — All UI, content, and marketing in 繁體中文 for Taiwan IPAS pilot. No i18n library, no language toggle. English support added in Phase 2+ when expanding to international certs (e.g., AI-900).
4. **Dark mode only (Phase 1)** — Single dark theme. No light mode toggle. Matches the gaming platforms (Discord, Twitch, Line) the 20-35 target audience uses daily. RPG accent colors pop naturally on dark. Light mode may be added in Phase 2 if user feedback requests it.
5. **Mobile-first study behavior** — Students study on commute and lunch breaks. Touch targets, readable text, and fast load times are non-negotiable.

---

## Global Rules

### Color Palette — Dark Mode Only

Single dark theme for Phase 1. No light mode toggle.

| Role | Hex | Tailwind | CSS Variable | Usage |
|------|-----|----------|--------------|-------|
| Primary | `#4F46E5` | `indigo-600` | `--color-primary` | Headings, links, nav active state, trust signals |
| Secondary | `#818CF8` | `indigo-400` | `--color-secondary` | Secondary buttons, hover states, info badges |
| CTA / Accent | `#10B981` | `emerald-500` | `--color-cta` | Primary buttons, purchase CTA, start exam, "go" actions |
| Background | `#0F172A` | `slate-900` | `--color-background` | Page background |
| Surface | `#1E293B` | `slate-800` | `--color-surface` | Cards, modals, input backgrounds |
| Text | `#F1F5F9` | `slate-100` | `--color-text` | Body text |
| Text Muted | `#94A3B8` | `slate-400` | `--color-text-muted` | Secondary text, captions, timestamps |
| Border | `#334155` | `slate-700` | `--color-border` | Card borders, dividers, input borders |

**Color Notes:** Indigo conveys modern tech competence — same family as Discord, Linear, Vercel. Emerald CTA signals growth and achievement, more aligned with cert progress than generic orange urgency. Dark base makes RPG accent colors pop naturally.

### RPG Accent Colors

These colors are used for gamification elements. On the dark background, they pop naturally without needing extra emphasis.

| Role | Hex | Tailwind | CSS Variable | Usage |
|------|-----|----------|--------------|-------|
| XP Gold | `#FBBF24` | `amber-400` | `--color-xp` | XP numbers, progress bar fill, XP toast |
| Streak Fire | `#F87171` | `red-400` | `--color-streak` | Streak flame icon, streak counter |
| Success | `#34D399` | `emerald-400` | `--color-success` | Correct answers, passed quiz, positive radar growth |
| Danger / HP Loss | `#F87171` | `red-400` | `--color-danger` | Wrong answers, HP bar drain, failing score |
| Badge Purple | `#A78BFA` | `violet-400` | `--color-badge` | Badge unlock animation, achievement highlights |
| Radar Axes | `#818CF8` | `indigo-400` | `--color-radar` | Radar chart fill and axes (matches secondary) |

**Note:** RPG accents use the `-400` weight (lighter) to maintain vibrancy on dark backgrounds.

### Exam Page — Boss Battle Intensity

The exam page uses the same dark theme but with increased contrast and minimal UI to maximize focus.

| Role | Hex | CSS Variable | Usage |
|------|-----|--------------|-------|
| Background | `#020617` | `--color-exam-bg` | Deeper black for arena intensity (slate-950) |
| Surface | `#0F172A` | `--color-exam-surface` | Question cards (one level up from bg) |
| HP Bar | `#34D399` → `#F87171` | — | Gradient from emerald to red as HP drains |

---

### Typography

**Font Stack (Traditional Chinese primary):**

| Role | Latin Font | CJK Font | Fallback |
|------|-----------|----------|----------|
| Heading | Poppins (600, 700) | Noto Sans TC (700) | system-ui, sans-serif |
| Body | Open Sans (400, 500, 600) | Noto Sans TC (400, 500) | system-ui, sans-serif |

**Why this pairing:**
- **Poppins** — Geometric, modern, confident. Gives headings visual authority. Works for both professional and gamified contexts.
- **Open Sans** — Humanist, highly readable at body sizes. Proven in edtech (Google's go-to for readability).
- **Noto Sans TC** — Google's purpose-built Traditional Chinese font. Excellent CJK glyph coverage, harmonizes with Latin sans-serif fonts.

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Open+Sans:wght@400;500;600&family=Poppins:wght@600;700&display=swap');
```

**Tailwind Config:**
```js
fontFamily: {
  heading: ['Poppins', 'Noto Sans TC', 'system-ui', 'sans-serif'],
  body: ['Open Sans', 'Noto Sans TC', 'system-ui', 'sans-serif'],
}
```

**Typography Scale:**

| Element | Size | Weight | Line Height | Notes |
|---------|------|--------|-------------|-------|
| H1 | 36px / 2.25rem | 700 | 1.2 | Landing hero, page titles |
| H2 | 30px / 1.875rem | 700 | 1.3 | Section headings |
| H3 | 24px / 1.5rem | 600 | 1.4 | Card titles, subsections |
| H4 | 20px / 1.25rem | 600 | 1.5 | Lesson titles |
| Body | 16px / 1rem | 400 | 1.75 | Lesson content, descriptions |
| Body Small | 14px / 0.875rem | 400 | 1.6 | Captions, metadata, timestamps |
| Label | 12px / 0.75rem | 500 | 1.5 | Badges, tags, XP labels |

**Traditional Chinese Rules:**
- Body line height must be >= 1.7 for readability (1.75 recommended)
- Never truncate Chinese text mid-character — use `overflow-wrap: break-word`
- Minimum body font size: 16px (especially important for CJK on mobile)
- All UI copy in 繁體中文 — no English UI strings in Phase 1

---

### Spacing

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--space-xs` | 4px | `p-1` | Tight gaps, inline icon spacing |
| `--space-sm` | 8px | `p-2` | Icon gaps, badge padding |
| `--space-md` | 16px | `p-4` | Standard padding, card internal |
| `--space-lg` | 24px | `p-6` | Section padding, card gaps |
| `--space-xl` | 32px | `p-8` | Large section gaps |
| `--space-2xl` | 48px | `p-12` | Section margins |
| `--space-3xl` | 64px | `p-16` | Hero padding, page section breaks |

### Shadow Depths

| Level | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-sm` | Subtle lift, input default |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | `shadow-md` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | `shadow-lg` | Modals, dropdowns, hover cards |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | `shadow-xl` | Hero images, featured course cards |

### Border Radius

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--radius-sm` | 6px | `rounded-md` | Buttons, inputs, badges |
| `--radius-md` | 8px | `rounded-lg` | Small cards, tags |
| `--radius-lg` | 12px | `rounded-xl` | Cards, modals |
| `--radius-xl` | 16px | `rounded-2xl` | Featured cards, hero elements |

---

## Component Specs (shadcn/ui)

### Theming Approach

Use CSS variables in `:root` — never hardcode hex values in components. Dark mode only, no `.light` class needed.

```css
/* globals.css — dark mode only */
:root {
  --primary: 239 84% 67%;       /* #4F46E5 indigo-600 */
  --secondary: 232 92% 75%;     /* #818CF8 indigo-400 */
  --accent: 160 84% 39%;        /* #10B981 emerald-500 */
  --background: 222 47% 11%;    /* #0F172A slate-900 */
  --foreground: 210 40% 96%;    /* #F1F5F9 slate-100 */
  --muted-foreground: 215 20% 65%; /* #94A3B8 slate-400 */
  --border: 217 19% 27%;        /* #334155 slate-700 */
  --card: 217 33% 17%;          /* #1E293B slate-800 */
}
```

**Component classes use semantic tokens:**
```jsx
// Do: use shadcn semantic classes
<Button className="bg-primary text-primary-foreground" />

// Don't: hardcode colors
<Button className="bg-indigo-600 text-white" />
```

### Buttons

| Variant | Background | Text | Border | Usage |
|---------|-----------|------|--------|-------|
| Primary (CTA) | `bg-accent` (#10B981) | white | none | Purchase, start exam, main actions |
| Secondary | `bg-primary` (#4F46E5) | white | none | Navigation actions, secondary CTA |
| Outline | transparent | `text-primary` | `border-primary` | Cancel, back, tertiary actions |
| Ghost | transparent | `text-muted-foreground` | none | Nav items, subtle actions |

All buttons: `rounded-md`, `font-semibold`, `transition-colors duration-200`, `cursor-pointer`, min height 44px (touch target).

### Cards

```
rounded-xl, shadow-md, bg-surface, p-6
hover: shadow-lg, translateY(-2px), transition 200ms
cursor-pointer on clickable cards
```

### Forms (React Hook Form + shadcn)

```jsx
// Always use shadcn Form + React Hook Form Controller pattern
<FormField control={form.control} name="email" render={({field}) => (
  <FormItem>
    <FormLabel>Email</FormLabel>
    <FormControl><Input {...field} /></FormControl>
    <FormMessage />
  </FormItem>
)} />
```

Input styling: `rounded-lg`, `border-border`, `focus:border-primary`, `focus:ring-3 focus:ring-primary/20`, min height 44px, font-size 16px (prevents iOS zoom).

---

## Landing Page Pattern

**Pattern:** Hero + Problem + Solution + Social Proof + Pricing + CTA

| Section | Content | Notes |
|---------|---------|-------|
| 1. Hero | Headline + subtitle + primary CTA + course preview screenshot | Show gamified dashboard screenshot for differentiation |
| 2. Problem Statement | "Cert prep is boring and overwhelming" | Empathize with target audience pain |
| 3. Solution Overview | 3-4 feature cards (micro-lessons, mob battles, boss battle exam, weakness radar) | RPG elements as selling points |
| 4. Social Proof | 3-5 testimonials with photo + name + cert achieved | Include pass rate stat if available |
| 5. Course Preview | Module/section outline with lesson count | Shows content depth |
| 6. Pricing | Single tier, clear price, 3-month access, pass guarantee callout | Emerald CTA button |
| 7. FAQ | 5-7 common questions | Accordion pattern |

**CTA Placement:** Hero (primary) + Post-social-proof (secondary) + Pricing (primary) + Sticky mobile bottom bar

---

## Next.js Implementation Rules

1. **Fonts:** Apply font in root `layout.tsx` via `className` on `<body>` — never import fonts per page
2. **Images:** Use `<Image fill className="object-cover" />` with relative parent for responsive images
3. **Skeleton loaders:** Reserve space for async content with `<Skeleton className="h-48" />` — no content jumping
4. **Lazy loading:** Load below-fold content lazily; eager load hero and above-fold only
5. **shadcn forms:** Always use React Hook Form + shadcn `<FormField>` Controller pattern
6. **shadcn Dialog:** Use `<Dialog>` for modals — never style `<Alert>` as a modal

---

## RPG Element Visual Guidelines

These rules ensure gamification elements feel professional, not childish.

| Element | Visual Treatment | Don't |
|---------|-----------------|-------|
| **XP Numbers** | Amber-500 text, `font-heading` weight 700, small "+XP" toast that fades after 2s | Bouncing animations, particle effects, cartoon explosions |
| **Progress Bar** | Rounded-full, amber-500 fill on slate-200 track, percentage label | Rainbow gradients, animated stripes |
| **Streak Counter** | Red-500 Lucide `Flame` icon + number, subtle pulse on increment | Animated GIFs, emoji flames |
| **Badges** | Violet-500 accent, Lucide `Award`/`Shield`/`Trophy` icons, clean circle container | Cartoon badges, complex illustrations, 3D effects |
| **Radar Chart** | Blue-500 fill at 20% opacity, blue-600 stroke, clean axis labels | Neon glow, animated spin, overloaded labels |
| **HP Bar** | Green-to-red gradient (left to right), rounded-full, no label during exam | Skull icons, blood effects, flashing on low HP |
| **Battle Report** | Clean data table layout with color-coded categories, same patterns as dashboard | Full-screen animations, victory/defeat splash screens |

**Icon Library:** Lucide React (bundled with shadcn/ui). Never use emojis as UI icons.

---

## Accessibility & Performance

### Accessibility (WCAG AA Minimum)

- Color contrast: >= 4.5:1 for normal text, >= 3:1 for large text
- All images: descriptive `alt` text
- All form inputs: associated `<label>` elements
- Focus states: visible focus rings on all interactive elements
- Keyboard navigation: tab order matches visual order
- `prefers-reduced-motion`: respect and disable animations
- Touch targets: minimum 44x44px
- ARIA labels: on all icon-only buttons

### Traditional Chinese Typography

- Line height >= 1.7 for Traditional Chinese body text
- CJK font renders correctly (Noto Sans TC loaded)
- No text truncation mid-character
- All UI strings in 繁體中文

### Performance

- Skeleton loaders for all async content — no blank screens
- Lazy load below-fold images and content
- No continuous decorative animations — only loading indicators
- `loading="lazy"` on all non-hero images
- Transitions: 150-300ms for micro-interactions, never > 500ms

---

## Responsive Breakpoints

| Breakpoint | Width | Tailwind | Target |
|-----------|-------|----------|--------|
| Mobile | 375px | default | Phone (primary study device) |
| Tablet | 768px | `md:` | iPad, landscape phone |
| Desktop | 1024px | `lg:` | Laptop |
| Wide | 1440px | `xl:` | Desktop monitor |

**Layout constraints:**
- Max content width: `max-w-6xl` (1152px) for content pages, `max-w-7xl` (1280px) for landing page
- No horizontal scroll on any breakpoint
- No content hidden behind fixed navbars — account for navbar height in page padding
- Consistent container widths — never mix `max-w-6xl` and `max-w-7xl` on the same page

---

## Anti-Patterns (Do NOT Use)

- **Emojis as icons** — Use Lucide SVG icons only
- **Hardcoded color values** — Use CSS variables / shadcn semantic tokens
- **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- **Layout-shifting hovers** — No scale transforms that shift surrounding content
- **Low contrast text** — Minimum 4.5:1 contrast ratio
- **Instant state changes** — Always use transitions (150-300ms)
- **Invisible focus states** — Focus rings must be visible for keyboard nav
- **Cartoon/childish gamification** — RPG elements must feel polished and professional
- **Font per page** — Apply fonts in root layout.tsx only
- **Custom form state** — Use React Hook Form + shadcn, never manual useState for forms

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

### Visual
- [ ] No emojis used as icons — Lucide SVG only
- [ ] All colors from design system palette (not arbitrary hex)
- [ ] Font pairing matches this file (Poppins headings, Open Sans body, Noto Sans TC for CJK)
- [ ] Hover states don't cause layout shift

### Interaction
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover states provide visual feedback (color/shadow, no layout shift)
- [ ] Transitions 150-300ms
- [ ] Focus states visible for keyboard navigation

### Dark Mode
- [ ] Text contrast >= 4.5:1
- [ ] Borders visible on dark background
- [ ] RPG accents use `-400` weight for vibrancy on dark

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
- [ ] Touch targets >= 44x44px

### Traditional Chinese (LevelCert-specific)
- [ ] Noto Sans TC loaded and rendering correctly
- [ ] Line height >= 1.7 for CJK body text
- [ ] No text truncation mid-character
- [ ] All UI copy in 繁體中文

### RPG Elements
- [ ] Gamification uses RPG accent colors only (not main palette)
- [ ] No cartoon/childish visual treatments
- [ ] XP/badge/streak elements use Lucide icons, not emojis
- [ ] Animations are subtle (fade, slide) — no bouncing, particle effects, or explosions
