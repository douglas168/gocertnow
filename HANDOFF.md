# Session Handoff — 2026-04-15 (multi-model review workflow)

## Summary

Studied the dotLLM development methodology (kokosa.dev/blog/2026/dotllm) and applied its key insight — "the AI that writes should not be the only AI that reviews" — to the LevelCert lesson-building workflow. Built a new `/course-multi-review` skill that dispatches Claude + Gemini CLI + Codex CLI as parallel, independent reviewers with different focus areas.

## What was done this session

- **Analyzed the dotLLM workflow** against the existing INTAKE → BRAINSTORM → PLAN → BUILD lesson pipeline. Identified the gap: no multi-model review step.
- **Created `/course-multi-review` skill** (`.claude/skills/course-multi-review/`) — orchestrates 4 parallel reviewers:
  - Claude subagent: fact-check (existing prompt)
  - Claude subagent: scope-review (existing prompt)
  - Gemini CLI (`gemini -p --approval-mode plan`): adversarial review — weak explanations, misleading simplifications, Taiwan cultural errors, missing edge cases
  - Codex CLI (`codex exec`): pedagogy review — distractor quality, Bloom's difficulty calibration, explanation depth, coverage gaps
- **Created reviewer prompt templates:**
  - `prompts/adversarial-reviewer.md` — Gemini's review persona and output format
  - `prompts/pedagogy-reviewer.md` — Codex's assessment quality review persona
- **Updated `/course-generate-lesson`** — Added Step 1.5 (multi-model review) between content generation and the review gate. User chooses multi-model (recommended) or Claude-only fallback.
- **Saved `dotLLM-workflow.md`** — Reference summary of the methodology

## Files touched

- `.claude/skills/course-multi-review/SKILL.md` (new)
- `.claude/skills/course-multi-review/prompts/adversarial-reviewer.md` (new)
- `.claude/skills/course-multi-review/prompts/pedagogy-reviewer.md` (new)
- `.claude/skills/course-generate-lesson/SKILL.md` (modified — Step 1.5 wired in)
- `dotLLM-workflow.md` (new — reference doc)

## What's next (resume here)

1. **Test `/course-multi-review` on L11101** — validate Gemini/Codex CLI integration works end-to-end
2. **Consider `/course-quality-wave` skill** — cross-lesson consistency sweeps (terminology drift, difficulty calibration across all topics)
3. **Consider `lesson/{topic-code}` branch convention** — lightweight git isolation per lesson (no PRs, just branches)
4. **Resume Priority 1 from previous handoff** — fix landing page legal issues before sending traffic
