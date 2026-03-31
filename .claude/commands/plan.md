You are creating a detailed implementation plan for a LevelCert milestone.

The milestone ID is: $ARGUMENTS

**Step 1 — Load context:**
1. Read `milestones/$ARGUMENTS/STATUS.md` — understand the goal, scope, and exit criteria
2. Read all files in `milestones/$ARGUMENTS/specs/` — understand the design decisions
3. Read `CLAUDE.md` — understand the tech stack and architecture constraints
4. Scan relevant source files (e.g., `web/app/`, `supabase/migrations/`) to understand the current state of the codebase before planning changes

**Step 2 — Draft the implementation plan:**
Break down the work into concrete, ordered tasks. For each task include:
- What to build / change
- Which file(s) to create or modify
- Any gotchas or dependencies within the task

Group tasks into logical phases if the milestone is large (e.g., Phase 1: DB schema → Phase 2: API → Phase 3: UI).

Present the plan to the user. Discuss and adjust until alignment is reached.

**Step 3 — Write the plan file:**
Once approved, write the plan to:
`milestones/$ARGUMENTS/plans/YYYY-MM-DD-plan.md`

Use today's date for YYYY-MM-DD.

The plan file should include:
- Overview (1 paragraph)
- Pre-requisites (what must be true before starting)
- Ordered task list with file paths and notes
- Testing checklist (how to verify each phase works)
- Rollback notes (if anything is risky to reverse)

**Step 4 — Update STATUS.md:**
Update the Superpowers Artifacts section in `milestones/$ARGUMENTS/STATUS.md` to link to the new plan file.

Tell the user: "Implementation plan saved. You're ready to start building — open a new session and reference `milestones/$ARGUMENTS/` as context."
