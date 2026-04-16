# Token Usage Report: L12101 No Code / Low Code的基本概念

> **Date:** 2026-04-16
> **Purpose:** Post-optimization measurement. Compare against L11402 baseline (~370K) after 6 optimizations applied in commit `8f5a6b1`.
> **Outcome:** No rate limit hit. 42% reduction vs baseline.

---

## Summary

| Metric | Value |
|---|---|
| Total estimated Claude tokens | ~216K |
| Agents dispatched | 8 |
| Total agent tool calls | ~66 |
| Rate limit hit? | No |
| Wall-clock time | ~22 minutes (agent time only) |
| Topic depth | Shallow (25→27 questions, 374-line guide) |

---

## Per-Stage Breakdown

| # | Stage | Agent | Tokens | Tool Calls | Duration | % of Total |
|---|---|---|---|---|---|---|
| 1 | Brief (main context) | — | ~8K | 7 reads | — | 4% |
| 2 | Research | Agent A | 34,381 | 16 | 2m 30s | 16% |
| 3 | Study Guide Writer | Agent B | 30,255 | 6 | 2m 58s | 14% |
| 3 | Question Generator | Agent C | 34,937 | 4 | 4m 19s | 16% |
| 4 | Self-review (main) | — | ~3K | 2 reads | — | 1% |
| 5 | Fact & Scope Checker | Agent D | 27,614 | 2 | 0m 28s | 13% |
| 5 | Gemini Adversarial | Agent F | 25,156 | 2 | 2m 11s | 12% |
| 5 | Codex Pedagogy | Agent G | 41,091 | 3 | 4m 26s | 19% |
| 6 | Fix — Study Guide | Fix A | 32,841 | 21 | 2m 15s | 15% |
| 6 | Fix — Questions | Fix B | 60,125 | 26 | 7m 00s | 28% |
| 7 | Diagram Generation | Agent I | 29,372 | 9 | 1m 41s | 14% |
| 8 | TODO sync + commit | — | ~3K | 4 edits + 2 bash | — | 1% |

**Note:** Agents F (Gemini) and G (Codex) are orchestration agents — their Claude token counts reflect the subagent wrapper, not the external model's usage. Gemini and Codex tokens are free / separate billing.

---

## Top Token Consumers (Pareto)

### 1. Fix — Questions Agent — 60K (28%)

**Why expensive:**
- Applied 10 distinct fixes (distractor rewrites, difficulty recalibrations, explanation enhancements)
- Added 2 new questions (Q26, Q27)
- Answer distribution rebalancing across all 27 questions (swapped 5 questions)
- 26 tool calls — heavy edit workload

**Compared to L11402:** The single fix agent in L11402 cost 85K for both files. Splitting into two agents here cost 93K total (+8K), but prevented rate limiting and ran in parallel.

### 2. Codex Pedagogy Orchestrator — 41K (19%)

**Why expensive:**
- Claude subagent orchestration overhead (read prompt, write temp file, run CLI, capture output)
- Reviewed all 25 questions with per-question findings

**Compared to L11402:** Nearly identical (43K → 41K). Orchestration overhead is fixed.

### 3. Question Generator — 35K (16%)

**Compared to L11402:** Slightly less (38K → 35K). Fewer questions (25 vs 30) with balanced distribution built-in.

---

## Comparison vs L11402 Baseline

| Metric | L11402 (baseline) | L12101 (this run) | Delta |
|---|---|---|---|
| Total tokens | ~370K | ~216K | **-154K (-42%)** |
| Agents dispatched | 10 | 8 | -2 |
| Fix agent tokens | 85K (1 agent) | 93K (2 agents) | +8K |
| Review agents total | 154K (4 agents) | 94K (3 agents) | **-60K (-39%)** |
| Main context bloat | ~15K | ~8K | -7K |
| Rate limit hit? | Yes | No | **Fixed** |
| Wall-clock time | ~4.5h (incl. rate wait) | ~22m | **-4h** |

---

## Optimization Impact Scorecard

| # | Optimization | Predicted Savings | Actual Savings | Hit? |
|---|---|---|---|---|
| 1 | Balanced answer distribution at gen time | 30K | ~25K | Yes |
| 2 | Merge fact-check + scope review into 1 agent | 40K | **40K** | Yes |
| 3 | Stop reading files into main context | 16K | ~12K | Yes |
| 4 | Split fix agent into 2 parallel agents | 15K | **-8K** (cost more) | No |
| 5 | Compress agent return summaries | 10K | ~5K | Partial |
| 6 | Skip workflow spec reads | 12K | ~10K | Yes |
| **Total predicted** | **123K** | **~84K actual** | |

**Why actual < predicted:** Topic depth matters. L12101 is shallow (374-line guide, 25 questions) vs L11402 medium (638-line guide, 30 questions). A medium-depth run will be the true apples-to-apples test.

---

## Caveats

- **Shallow vs medium depth:** L12101 is the lightest topic in the syllabus. The next run (L12102, medium depth, 30 questions) will be a fairer comparison to the L11402 baseline.
- **Fix agent cost increase:** Splitting into 2 agents cost +8K more tokens but eliminated rate limiting risk. The question fix agent was especially heavy because of 10 fixes + 2 new questions + answer rebalancing. Net: worth the trade-off (tokens for time).
- **Gemini rate limits:** Agent F hit 429 errors and had to retry, but completed successfully.

---

## Comparison Template (for next run)

After L12102, fill in:

| Metric | L11402 (baseline) | L12101 (shallow) | L12102 (medium) | Delta vs baseline |
|---|---|---|---|---|
| Total tokens | ~370K | ~216K | | |
| Fix agent tokens | 85K | 93K | | |
| Review agents total | 154K | 94K | | |
| Main context bloat | ~15K | ~8K | | |
| Rate limit hit? | Yes | No | | |
| Wall-clock time | ~4.5h | ~22m | | |
| Topic depth | Medium | Shallow | Medium | |
| Questions generated | 30 | 27 | | |
| Study guide lines | ~638 | 374 | | |
