You are running a deep design brainstorming session for a GoCertNow milestone.

The milestone ID is: $ARGUMENTS

**Step 1 — Load context:**
1. Read `milestones/$ARGUMENTS/STATUS.md` — understand the goal, scope, constraints, and integrations
2. Read `CLAUDE.md` — understand the overall project architecture and tech stack
3. Check `milestones/$ARGUMENTS/specs/` — if a design spec already exists, read it and ask the user if they want to iterate on it or start fresh

**Step 2 — Brainstorm:**
Think deeply about the milestone. Cover:
- **Architecture** — how does this fit into the existing Next.js / Supabase / Clerk / Stripe stack?
- **Data model** — any Supabase schema changes needed? Tables, columns, RLS policies?
- **User flows** — step-by-step user experience from entry to completion
- **Edge cases** — what could go wrong? Auth states, empty states, error states
- **Open questions** — anything that needs a decision before implementation can start

Present your analysis to the user. Discuss and iterate until alignment is reached.

**Step 3 — Write the design spec:**
Once the user is happy with the design, write a spec file to:
`milestones/$ARGUMENTS/specs/YYYY-MM-DD-design.md`

Use today's date for YYYY-MM-DD.

The spec should include:
- Summary (1 paragraph)
- Architecture decisions
- Data model changes (if any)
- User flows
- API / Edge Function contracts (if any)
- Edge cases and how to handle them
- Open questions resolved

**Step 4 — Update STATUS.md:**
Update the Superpowers Artifacts section in `milestones/$ARGUMENTS/STATUS.md` to link to the new spec file.

Tell the user: "Design spec saved. Run `/plan $ARGUMENTS` when you're ready to create the implementation plan."
