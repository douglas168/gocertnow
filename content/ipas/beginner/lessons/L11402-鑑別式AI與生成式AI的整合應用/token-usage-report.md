# Token Usage Report: L11402 鑑別式AI與生成式AI的整合應用

> **Date:** 2026-04-15
> **Purpose:** Baseline measurement for optimizing `/course-generate-lesson` token efficiency.
> **Outcome:** Hit 5-hour Opus rate limit during the fix-application stage.

---

## Summary

| Metric | Value |
|---|---|
| Total estimated Claude tokens | ~370K |
| Agents dispatched | 10 |
| Total agent tool calls | ~130 |
| Rate limit hit? | Yes — during fix agent (Stage 5) |
| Wall-clock time | ~4.5 hours (includes rate-limit wait) |

---

## Per-Stage Breakdown

| # | Stage | Agent | Tokens | Tool Calls | Duration | % of Total |
|---|---|---|---|---|---|---|
| 1 | Brief (main context) | — | ~15K | 9 reads | — | 4% |
| 2 | Research | Agent A | 40,827 | 15 | 4m 39s | 11% |
| 3 | Study Guide Writer | Agent B | 39,391 | 8 | 5m 13s | 11% |
| 3 | Question Generator | Agent C | 37,960 | 8 | 5m 8s | 10% |
| 4 | Self-review (main) | — | ~3K | 2 reads | — | 1% |
| 5a | Fact Checker | Agent D | 46,804 | 8 | 1m 51s | 13% |
| 5b | Scope Reviewer | Agent E | 39,583 | 7 | 1m 15s | 11% |
| 5c | Gemini Adversarial | Agent F | 25,100 | 4 | 2m 26s | 7% |
| 5d | Codex Pedagogy | Agent G | 43,006 | 7 | 4m 2s | 12% |
| 6 | **Fix Application** | **Agent H** | **85,042** | **26** | **8m 58s** | **23%** |
| 7 | Diagram Generation | Agent I | 27,538 | 11 | 1m 51s | 7% |
| 8 | TODO sync + commit | — | ~5K | 5 edits + 2 bash | — | 1% |

**Note:** Agents F (Gemini) and G (Codex) are orchestration agents — their Claude token counts reflect the subagent wrapper, not the external model's usage. Gemini and Codex tokens are free / separate billing.

---

## Top Token Consumers (Pareto)

### 1. Fix Application Agent — 85K (23%)

**Why so expensive:**
- Read full study guide (638 lines) + full questions YAML (704 lines) into context
- Applied 20 distinct fixes
- Answer redistribution (fix #13) alone required reading/modifying 14 questions, swapping option content, and updating all `why_not_*` / `why_correct` fields
- Verification pass after all fixes

**Optimization:** Split into 2 parallel agents (study guide fixes vs. questions fixes). Fix answer distribution at generation time to eliminate the most expensive single fix.

### 2. Fact Checker — 47K (13%)

**Why expensive:**
- Read full study guide (638 lines) + research notes (200 lines) + syllabus YAML
- Line-by-line verification of 89 claims

**Optimization:** Merge with scope reviewer (Agent E) — both read the same study guide. One agent, one read, two checklists. Saves ~40K.

### 3. Codex Pedagogy Orchestrator — 43K (12%)

**Why expensive:**
- Claude subagent reads prompt template, writes temp file, runs Codex CLI, captures output
- Codex itself consumed 56K tokens (separate billing) reviewing all 30 questions

**Optimization:** Minimal — orchestration overhead is relatively fixed. Could compress the prompt slightly.

### 4. Main Context Bloat — ~15K (4%, but compounds)

**Files read into main context unnecessarily:**
- `research-notes.md` (200 lines) — passed inline to Agents B/C instead of by path
- 4 reviewer prompt templates (~100 lines each) — read to understand before dispatching
- `WORKFLOW-CONTENT-GENERATION-SKILLS.md` (400 lines across 3 reads)
- `L11401 study-guide.md` header (50 lines)

**Why it matters:** Main context is re-sent every turn. These 15K tokens compound across all subsequent turns (brief → build → review → fix → diagrams → commit = ~10 turns × 15K = 150K effective).

**Optimization:** Don't read any of these into main context. Give agents file paths; they read what they need.

---

## Redundant Work

| Issue | Tokens Wasted | Fix |
|---|---|---|
| Study guide read by Agents D AND E separately | ~40K | Merge into one agent |
| Answer redistribution after generation | ~30K (within fix agent) | Generate balanced answers from start |
| Prompt templates read into main context | ~16K (4 templates × 4K effective) | Agents read their own prompts |
| Research notes in main context + Agent B/C | ~8K | Only pass file path |
| Workflow spec reads (already in SKILL.md) | ~12K | Skip entirely |

**Total recoverable:** ~106K tokens (~29% of current total)

---

## Proposed Optimizations

| # | Change | Est. Savings | Complexity |
|---|---|---|---|
| 1 | Fix answer distribution at generation time | 30K | Low — add rule to prompt |
| 2 | Merge fact-check + scope review into 1 agent | 40K | Medium — combine prompts |
| 3 | Stop reading files into main context | 16K+ | Low — change SKILL.md |
| 4 | Split fix agent into 2 parallel agents | 15K | Medium — split prompt |
| 5 | Compress agent return summaries | 10K | Low — add output rules |
| 6 | Skip workflow spec reads | 12K | Low — remove from SKILL.md |
| **Total** | | **~123K (33% reduction)** | |

**Target for next run:** ~250K tokens (down from ~370K), comfortably within 5-hour rate limit.

---

## Comparison Template

After the next lesson run, fill in:

| Metric | L11402 (baseline) | Next lesson | Delta |
|---|---|---|---|
| Total tokens | ~370K | | |
| Fix agent tokens | 85K | | |
| Review agents total | 154K | | |
| Main context bloat | ~15K | | |
| Rate limit hit? | Yes | | |
| Wall-clock time | ~4.5h | | |
