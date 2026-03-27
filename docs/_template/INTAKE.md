# Milestone Intake — Interactive Questionnaire

> **For AI assistants:** Read this file, then ask the user the questions below **one at a time**.
> After all questions are answered, generate a filled `STATUS.md` using the template in this same directory.

## Instructions

You are helping a solo founder plan a new milestone for **GoCertNow** — a SaaS platform helping young professionals earn certifications via video courses, mock exams, and AI-explained answers.

**Rules:**
1. Ask ONE question at a time. Wait for the answer before asking the next.
2. Use the user's language preference (Traditional Chinese or English — match what they use).
3. For multiple-choice questions, present the options clearly. Accept free-form answers too.
4. If an answer is unclear, ask a follow-up before moving on.
5. Skip questions that don't apply (e.g., skip Stripe/Clerk questions for db-only work).
6. After all questions, generate the filled STATUS.md and present it for review.

**Context about the project:**
- **Website:** Next.js 14 (App Router) deployed on Vercel — `gocertnow.com`
- **Backend:** Supabase (PostgreSQL + RLS + Edge Functions) — all business logic lives here
- **Auth:** Clerk | **Payments:** Stripe | **Video:** Bunny.net | **Automation:** n8n
- **Milestone types:** `web` (Next.js features/pages), `content` (course content pipeline), `db` (Supabase schema/migrations), `social` (social media automation), `infra` (deployment, integrations, CI/CD)
- **Naming convention:** `M{NNNN}-{YYYYMMDD}-{type}-{short-name}` — e.g., `M0001-20260101-web-landing`
- **Milestone folder:** `milestones/{milestone-id}/` — all specs, plans, and notes live inside this folder
- **Build phases:** P1=IPAS B2C Pilot, P2=Mock Exam System, P3=Scale Verticals, P4=Open Platform, P5=SaaS Layer
- The filled STATUS.md will be used as input for a detailed design + implementation session (superpowers)

---

## Questions

Ask these in order. Adapt based on answers — skip what doesn't apply.

### 1. Milestone Identity

**"What are we building? Give me a short name and one-sentence description."**

From the answer, determine:
- Milestone number (check existing milestones in `milestones/` — use next available NNNN)
- Type: `web`, `content`, `db`, `social`, or `infra`
- Creation date: today's date in YYYYMMDD format
- Full ID: `M{NNNN}-{YYYYMMDD}-{type}-{short-name}`

### 2. Build Phase

**"Which build phase does this belong to?"**

- P1 — IPAS B2C Pilot (current)
- P2 — Mock Exam System
- P3 — Scale Verticals
- P4 — Open Platform
- P5 — SaaS Layer

### 3. Problem & Motivation

**"What problem does this solve? What's the pain point or opportunity?"**

### 4. Success Criteria

**"When this is done, what can users (or you) do that isn't possible now? Describe the end result."**

### 6. Scope — What's IN

**"What specific features or capabilities should this include? List them."**

Ask follow-ups if the list is vague. Push for concrete items.

### 7. Scope — What's OUT

**"What are we explicitly NOT building in this milestone? What's deferred to later?"**

This prevents scope creep. If the user says "everything", push back — there's always something to defer.

### 8. Dependencies

**"Does this depend on any other milestone or integration being complete first?"**

Examples: Clerk auth setup, Stripe integration, a specific Supabase migration, another milestone ID.

### 9. Constraints & Risks

**"Any known constraints or risks?"**

Prompt with examples if needed:
- Supabase RLS complexity? Stripe webhook timing? Clerk session handling?
- SEO requirements? Mobile responsiveness? i18n (zh/en)?
- Performance requirements? Data volume?

### 10. Web Routes / UI (skip for db-only or infra-only work)

Only ask if this involves `web`, `content`, or `social`:

**"What routes or UI surfaces does this touch?"**

Reference the site routes:
- `/` — Landing page
- `/courses` — Course listing
- `/courses/[slug]` — Course detail + purchase
- `/learn/[slug]/[lesson]` — Lesson player (auth-gated)
- `/exam/[slug]` — Mock exam (auth-gated)
- `/exam/[slug]/result` — Score report + AI explanations
- `/dashboard` — User courses, progress, access expiry

New route? Existing route enhancement? API route?

### 11. Integrations Touched (skip if not applicable)

**"Which integrations does this milestone involve?"**

- Clerk (auth, session, webhooks)
- Stripe (checkout, webhooks, access control)
- Supabase (schema changes, RLS, Edge Functions)
- Bunny.net (video upload, streaming)
- n8n (workflow triggers, automation)
- Gemini API (content generation, AI explanations)

### 12. Reference & Inspiration

**"Any reference material? Existing POC code, competitor examples, design mockups, external docs?"**

Check if there are related docs in `docs/` or prior milestones in `milestones/`.

### 13. Exit Criteria

**"Beyond the standard checks for this type, are there specific criteria that must be met for this to be considered done?"**

Standard checks will be included automatically based on milestone type.

---

## Output

After all questions are answered, generate the filled `STATUS.md` using the template below.
Present it to the user in a code block for review.

Tell the user:
> "Here's the filled STATUS.md. Review it and let me know if anything needs to change.
> Once you're happy with it, save it to `milestones/{milestone-id}/STATUS.md`
> and start a new session to run superpowers with this as context."

---

## STATUS.md Template

Use this exact structure. Fill in `[brackets]` with the user's answers.
Remove checklist sections that don't apply to the milestone type.

```markdown
# [{milestone-id}] — STATUS

**Status**: ⏳ Planned
**Phase**: [P1–P5 from Q2]
**Goal**: [One sentence from Q1]
**Depends on**: [From Q8, or "None"]
**Requested by**: self

---

## Problem & Motivation

[From Q3 — what pain point or opportunity this addresses]

## Success Criteria

[From Q5 — what becomes possible when this is done]

## Scope

### What's IN
- [Items from Q6]

### What's explicitly OUT (for now)
- [Items from Q7]

## Constraints & Risks
- [From Q9]

## Routes / UI Surfaces
- [From Q10 — routes touched or created, or "N/A"]

## Integrations
- [From Q11 — integrations involved, or "None"]

## Reference / Inspiration
- [From Q12]

---

## Checklist

### Web (`web` milestones only)
- [ ] Vercel preview deploy works
- [ ] Vercel production deploy works
- [ ] Clerk auth gating works (if applicable)
- [ ] Stripe integrated (if applicable)
- [ ] i18n strings added to `shared/locales/zh.json` + `en.json`
- [ ] Mobile responsive
- [ ] No console errors on prod

### Database (`db` milestones only)
- [ ] Migration written and tested locally
- [ ] Migration applied to prod Supabase
- [ ] RLS policies written and tested
- [ ] Existing features unbroken after migration

### Content (`content` milestones only)
- [ ] Scripts run without errors
- [ ] Output reviewed for quality
- [ ] Content pushed to Supabase
- [ ] [To be refined after first content milestone]

### Social (`social` milestones only)
- [ ] n8n workflow tested end-to-end
- [ ] n8n workflow JSON exported and saved
- [ ] [To be refined after first social milestone]

### Infra (`infra` milestones only)
- [ ] Env vars set in Vercel
- [ ] CI/CD pipeline passes
- [ ] Changes documented

## Exit Criteria

- [ ] [Feature-specific criteria from Q13]
- [ ] [Standard criteria for type — see checklist above]

---

## Superpowers Artifacts

- **Design spec**: [specs/YYYY-MM-DD-design.md]()
- **Implementation plan**: [plans/YYYY-MM-DD-plan.md]()
- **Notes**: [notes/]()

---

## Reference

- Milestone folder: `milestones/{milestone-id}/`
- Supabase schema: `supabase/migrations/`
- Web routes: `web/app/`
- Shared i18n: `shared/locales/`
```
