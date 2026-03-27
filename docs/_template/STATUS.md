# [M{NNNN}-{YYYYMMDD}-{type}-{name}] — STATUS

**Status**: ⏳ Planned
**Phase**: [P1 | P2 | P3 | P4 | P5]
**Goal**: [One sentence: what does "done" look like?]
**Depends on**: [e.g., M0001 Clerk setup — or "None"]
**Requested by**: self

---

## Problem & Motivation

[Who needs this? What pain point or opportunity does it address?]

## Success Criteria

[What can users (or you) do after this is built that isn't possible now?]

## Scope

### What's IN
- [Feature/capability 1]
- [Feature/capability 2]

### What's explicitly OUT (for now)
- [Deferred item 1]
- [Deferred item 2]

## Constraints & Risks
- [e.g., Supabase RLS complexity, Stripe webhook timing, i18n required, mobile responsive]

## Routes / UI Surfaces
- [e.g., new route `/courses/[slug]`, enhancement to `/dashboard` — or "N/A"]

## Integrations
- [e.g., Clerk, Stripe, Supabase, Bunny.net, n8n, Gemini API — or "None"]

## Reference / Inspiration
- [Links to similar tools, competitor examples, prior milestones, external docs]

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

- [ ] [Feature-specific criterion 1]
- [ ] [Feature-specific criterion 2]

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
