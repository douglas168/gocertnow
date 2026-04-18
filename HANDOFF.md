# Session Handoff — 2026-04-18 (course-generate-lesson token-reduction overhaul)

## Session Summary

Completed L21203 (AI風險管理) intermediate lesson via codex-mode pipeline (~205K tokens, –52% vs L21202 claude-mode baseline). Wrote a token usage report documenting where savings came from and where the new ceiling sits (Claude adversarial reviewer at ~65K, 32%). User asked how to lower it further; I produced a prioritized 8-recommendation analysis. User accepted all 8 with one override: **Researcher should use codex, not gemini**. I then rewrote `course-generate-lesson` SKILL.md to implement all 8.

## What was done

1. **L21203 lesson shipped** (commit `18df864`) — study-guide.md (919 lines), questions.yaml (879 lines, 40 Q), 5 Mermaid diagrams, research-notes.md.
2. **L21203 token-usage-report.md** written, calibrated against L21202 baseline.
3. **`course-generate-lesson/SKILL.md` overhauled** (commit `c6799c4`) implementing all 8 token-reduction recommendations:
   - Stage 1 — Researcher migrated to `codex exec` wrapper
   - Stage 3a — Fact-list pre-pass (codex extracts dates/numbers/frameworks/citations into ~120-line checklist)
   - Stage 4a — Fix-brief consolidator subagent (review files never enter main context)
   - Canonical `/tmp/review-*-{topic}.md` paths for all reviewers
   - Per-stage state file at `/tmp/lesson-{topic}-state.json` for compaction recovery
   - Trimmed author wrapper verification (trust codex return summaries)
   - Reviewer outputs hard-capped at ~120 lines, no preamble
   - New Token-budget rules section makes the 5 invariants explicit
   - Error-handling expanded for new stages + compaction recovery
4. **Token-usage reports** for L12102/L12202/L21202/L21203 committed (`65cf36d`).

## What's next

**Validate the SKILL.md changes on the next deep-topic run.** Projected: ~205K → ~100K (~77% reduction vs L21202 ~430K). Next topic is **L21301** per `content/ipas/intermediate/TODO.md`. Run `/course-generate-lesson L21301` to test the new pipeline end-to-end.

Watch for:
- Whether the fact-list pre-pass actually drops Claude adversarial reviewer cost (~65K → ~25K target)
- Whether the consolidator subagent return summary is rich enough for main to make decisions without re-reading review files
- Whether the state file survives mid-run compaction cleanly

If the new pipeline lands within ±15% of ~100K projection, codify the pattern. If it overruns, the most likely culprit is the consolidator return summary being too thin (forcing main to re-read).

## Uncommitted state to triage next session

The working tree has files modified or created in earlier sessions that I did NOT touch and chose not to bundle into this handoff's commits. Triage in next session:

**Modified (likely from other sessions):**
- `content/ipas/_config.yaml`
- `content/ipas/syllabus/boundary-map.md`
- `content/ipas/intermediate/lessons/L21101-自然語言處理技術與應用/study-guide.md`
- `content/ipas/intermediate/lessons/L21102-電腦視覺技術與應用/study-guide.md`

**Untracked:**
- `content/ipas/beginner/lessons/L11401-鑑別式AI與生成式AI的基本原理/` (new lesson directory)
- `content/ipas/beginner/questions/L11401-questions.yaml`
- `docs/content-strategy/` (new docs directory)

These may be in-progress work the user wants to continue. Do NOT auto-commit — ask first.

## Key file paths touched

- `.claude/skills/course-generate-lesson/SKILL.md` — token-reduction overhaul
- `.claude/skills/course-generate-lesson/prompts/claude-adversarial-reviewer.md` — new (created earlier session)
- `.claude/skills/course-generate-lesson/prompts/codex-auditor.md` — new (created earlier session)
- `content/ipas/intermediate/lessons/L21203-AI風險管理/token-usage-report.md` — new
- `content/ipas/intermediate/lessons/L21202-AI導入規劃/token-usage-report.md` — committed in this handoff
- `content/ipas/beginner/lessons/L12102-NoCode-LowCode的優勢與限制/token-usage-report.md` — committed in this handoff
- `content/ipas/beginner/lessons/L12202-如何善用生成式AI工具/token-usage-report.md` — committed in this handoff

## Commits this session

- `18df864` — feat(content): complete L21203 lesson, 40-question practice pool (earlier in session, before compaction)
- `c6799c4` — feat(skill): codex-mode pipeline + token-reduction overhaul
- `65cf36d` — docs(content): add token-usage reports for L12102/L12202/L21202/L21203
- (next commit) — docs: handoff
