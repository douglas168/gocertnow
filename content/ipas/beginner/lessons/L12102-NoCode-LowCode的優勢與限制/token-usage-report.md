# Token Usage Report: L12102 No Code / Low Code的優勢與限制

> **Date:** 2026-04-16
> **Purpose:** First medium-depth measurement. Apples-to-apples comparison against L11402 baseline (~370K). Also compared to L12101 shallow (~216K) to isolate depth scaling.
> **Outcome:** No rate limit hit. But 31% over baseline — self-review subagent and Question Generator thrashing identified as root causes. Three optimizations applied post-run.

---

## Summary

| Metric | Value |
|---|---|
| Total estimated Claude tokens | ~483K |
| Agents dispatched | 10 |
| Total agent tool calls | ~131 |
| Rate limit hit? | No |
| Wall-clock time | ~45 minutes (agent time only) |
| Topic depth | Medium (30 questions generated → 38 after coverage gap additions, 534-line guide) |

---

## Per-Stage Breakdown

| # | Stage | Agent | Tokens | Tool Calls | Duration | % of Total |
|---|---|---|---|---|---|---|
| 1 | Brief (main context) | — | ~10K | 9 reads | — | 2% |
| 2 | Research | Agent A | 32,831 | 14 | 2m 34s | 7% |
| 3 | Study Guide Writer | Agent B | 40,438 | 7 | 4m 16s | 8% |
| 3 | Question Generator | Agent C | 81,159 | 33 | 11m 13s | 17% |
| 4 | Self-Review | Subagent | 48,635 | 9 | 2m 29s | 10% |
| 5 | Fact & Scope Checker | Agent D | 31,867 | 2 | 0m 47s | 7% |
| 5 | Gemini Adversarial | Agent F | 21,707 | 3 | 3m 17s | 4% |
| 5 | Codex Pedagogy | Agent G | 77,038 | 7 | 7m 20s | 16% |
| 6 | Fix — Study Guide | Fix A | 35,385 | 15 | 2m 06s | 7% |
| 6 | Fix — Questions | Fix B | 67,845 | 26 | 9m 20s | 14% |
| 7 | Diagram Generation | Agent I | 32,618 | 7 | 1m 22s | 7% |
| 8 | TODO sync + commit | — | ~3K | 4 edits + 2 bash | — | 1% |

**Note:** Agents F (Gemini) and G (Codex) are orchestration agents — their Claude token counts reflect the subagent wrapper, not the external model's usage. Gemini and Codex tokens are free / separate billing.

---

## Top Token Consumers (Pareto)

### 1. Question Generator — 81K (17%)

**Why expensive:**
- 33 tool calls — 8× more than L12101's 4 tool calls for the same type of work
- Generated 30 questions but used heavy read-back/edit/rewrite cycles instead of a single Write
- Answer distribution rebalancing and YAML validation consumed additional rounds

**Root cause:** No tool-call budget in the prompt. The agent wrote a draft, read it back, found issues, edited, re-verified — a loop that compounded tokens.

**Fix applied:** Added "Maximum 6 tool calls" constraint and self-review checklist to `prompts/question-generator.md`. Agent must plan the complete YAML mentally before writing.

### 2. Codex Pedagogy Orchestrator — 77K (16%)

**Why expensive:**
- Reviewed 30 questions, producing 25 detailed findings across 5 categories
- More questions and more complex topic than L12101 (25 questions, 15 findings)
- Orchestration overhead is fixed (~5K for prompt write + CLI invocation)

**Compared to L12101:** 77K vs 41K (+88%). Scales with question count and finding density. Not easily optimizable — this is genuine review work.

### 3. Fix Agent B (Questions) — 68K (14%)

**Why expensive:**
- Applied 20+ fixes from all 3 reviewers (distractor rewrites, difficulty recalibrations, explanation enhancements)
- Added 8 new questions (Q31–Q38) to fill coverage gaps flagged by Codex
- Answer distribution rebalancing across all 38 questions
- 26 tool calls — heavy edit workload

**Root cause:** Coverage gaps that should have been caught at generation time. The 8 post-hoc questions cost ~20K+ in fix-agent context.

**Fix applied:** Bumped medium pool from 30→35, added coverage-area hints to Question Generator prompt, so gaps are filled on first pass.

### 4. Self-Review Subagent — 49K (10%)

**Why expensive:**
- Read both the study guide (534 lines) and questions YAML (878 lines) in full
- The "don't bloat main context" rationale was sound in theory but cost 16× more than L12101's in-context review (3K)
- By Stage 4, only ~5 turns remain — compounding cost of main-context bloat is low

**Fix applied:** Eliminated self-review as a separate stage. Inlined the checklist into Agent B and Agent C prompts ("verify before writing"). Cost: ~0 marginal tokens.

---

## Comparison vs L11402 Baseline and L12101

| Metric | L11402 (baseline) | L12101 (shallow) | **L12102 (medium)** | vs baseline | vs L12101 |
|---|---|---|---|---|---|
| Total tokens | ~370K | ~216K | **~483K** | **+31%** | +124% |
| Agents dispatched | 10 | 8 | **10** | 0 | +2 |
| Total tool calls | — | ~66 | **~131** | — | +98% |
| Question Generator | 38K / 30q | 35K / 27q | **81K / 30q** | +113% | +131% |
| Self-Review | — | 3K (main) | **49K (subagent)** | — | +16× |
| Study Guide Writer | — | 30K / 374 lines | **40K / 534 lines** | — | +33% |
| Review agents total | 154K (4 agents) | 94K (3 agents) | **131K (3 agents)** | **-15%** | +39% |
| Fix agents total | 85K (1 agent) | 93K (2 agents) | **103K (2 agents)** | +21% | +11% |
| Diagram Generation | — | 29K | **33K** | — | +14% |
| Main context | ~15K | ~8K | **~13K** | -13% | +63% |
| Rate limit hit? | Yes | No | **No** | Fixed | Same |
| Wall-clock time | ~4.5h | ~22m | **~45m** | **-3.75h** | +23m |
| Study guide lines | ~638 | 374 | **534** | -16% | +43% |
| Final question count | 30 | 27 | **38** | +27% | +41% |

---

## What Went Right

1. **No rate limits** — split fix agents + merged fact/scope checker continue to work
2. **Review quality high** — 3 reviewers found 38 total issues; cross-reviewer agreement on Q10 distractors and difficulty calibration validates the multi-model approach
3. **Wall-clock 45m vs 4.5h baseline** — 6× faster even with 31% more tokens
4. **Main context stayed lean** — ~13K, well below the ~15K baseline

## What Went Wrong

1. **Question Generator thrashing** — 81K / 33 tool calls for 30 questions is absurd. L12101 did 27 questions in 35K / 4 tool calls. The agent entered an edit loop instead of writing once.
2. **Self-review subagent was a net negative** — 49K to do what 3K could do in main context. The "avoid context bloat" rule doesn't apply when you're 70% through the pipeline.
3. **Coverage gaps caused 8 post-hoc questions** — Fix Agent B spent ~20K adding Q31–Q38 that should have been generated upfront.

---

## Optimizations Applied After This Run

| # | Optimization | Files Changed | Predicted Savings |
|---|---|---|---|
| 1 | Eliminate self-review subagent; inline checklist into Agent B/C prompts | `SKILL.md`, `study-guide-writer.md`, `question-generator.md` | ~45K |
| 2 | Bump medium pool 30→35, deep 35→40; add coverage-area hints | `SKILL.md`, `_config.yaml`, `question-generator.md` | ~20K |
| 3 | Cap Question Generator at 6 tool calls; add self-review checklist | `question-generator.md` | ~30K |
| **Total** | | | **~95K** |

**Projected next medium-depth run:** ~388K (vs 483K actual, vs 370K baseline). If the Question Generator cap works as expected, we may beat the baseline despite having more questions.

---

## Comparison Template (for L12201 — deep depth)

After L12201, fill in:

| Metric | L11402 (baseline) | L12101 (shallow) | L12102 (medium) | L12201 (deep) | Delta vs baseline |
|---|---|---|---|---|---|
| Total tokens | ~370K | ~216K | ~483K | | |
| Question Generator | 38K | 35K | 81K | | |
| Self-Review | — | 3K | 49K | 0 (eliminated) | |
| Fix agents total | 85K | 93K | 103K | | |
| Review agents total | 154K | 94K | 131K | | |
| Main context | ~15K | ~8K | ~13K | | |
| Rate limit hit? | Yes | No | No | | |
| Wall-clock time | ~4.5h | ~22m | ~45m | | |
| Topic depth | Medium | Shallow | Medium | Deep | |
| Questions generated | 30 | 27 | 30→38 | | |
| Study guide lines | ~638 | 374 | 534 | | |

---

## Caveats

- **Medium depth but 38 final questions:** L12102 generated 30 initially but ended with 38 after coverage-gap additions. This inflates fix-agent cost vs a clean 30-question run. The new pool_size.medium=35 should prevent this.
- **Question Generator variance is high:** 4 tool calls (L12101) vs 33 (L12102) for similar question counts. The tool-call cap is the highest-leverage optimization — if it works, it saves ~30K and removes the biggest source of run-to-run variance.
- **Codex review scales with findings:** 77K here vs 41K on L12101. Deep-depth topics with 40 questions may push Codex to 90K+. This is not wasted — Codex found 3 coverage gaps and 8 distractor issues that Claude and Gemini missed.
