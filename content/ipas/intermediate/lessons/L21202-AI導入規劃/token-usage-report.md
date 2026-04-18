# Token Usage Report: L21202 AI導入規劃

> **Date:** 2026-04-18
> **Purpose:** Baseline for **claude-mode** (legacy pipeline) on a 中級-level, deep-depth topic — to compare against the first **codex-mode** run (L21203 or later) after the `--mode=codex|claude` flag was added to `course-generate-lesson`.
> **Outcome:** Full pipeline completed without rate limits. Parallel fix subagents succeeded (Strategy A). Establishes the "claude-mode deep" cost line against which codex-mode savings will be measured.

---

## Summary

| Metric | Value |
|---|---|
| Total estimated Claude tokens | **~430K** |
| Pipeline mode | **claude-mode** (pre-codex-flag) — authors on Claude, reviewers via `/course-multi-review`, fixes via parallel Claude subagents |
| Agents dispatched | 8 (all completed) |
| Rate limit hit? | **No** |
| Wall-clock time (active, excluding approval gates) | ~55 minutes |
| Topic depth | Deep (40 questions, 800-line guide, 5 diagrams) |
| Total fixes applied | 27 (9 study-guide + 18 question) |

---

## Per-Stage Breakdown

| # | Stage | Agent | Est. Tokens | % of Total | Notes |
|---|---|---|---|---|---|
| 1 | Brief (main context) | — | ~12K | 3% | Resume after compaction + 6 small reads |
| 2 | Research | Agent A | ~35K | 8% | 中級 governance + framework density (CAF/CRISP-DM/RACI/3+2+1) |
| 3 | Study Guide Writer | Agent B | ~55K | 13% | 800-line guide, no supplements, 7-section template |
| 3 | Question Generator | Agent C | ~55K | 13% | 40 Q deep pool, tool-call cap active |
| 4 | Fact & Scope Checker | Agent D | ~55K | 13% | Combined fact + scope check, 800+875 lines of input |
| 4 | Gemini Adversarial | Agent F | ~25K | 6% | Orchestration wrapper only (external Gemini tokens free) |
| 4 | Codex Pedagogy | Agent G | ~70K | 16% | 40 Q reviewed; false-positive on `correct:` vs `correct_answer:` schema |
| 5 | Fix — Study Guide | Fix A | ~55K | 13% | 9 fixes: RACI, Microsoft CAF, Google CAF, 70/20/10, TCO, SMB, 3+2+1, checklist, diagrams |
| 5 | Fix — Questions | Fix B | ~45K | 10% | 18 Q fixes: Q07/11/12/14/15/19/20/22/26/27/28/29/33/34/35/36/39/40 |
| 6 | Diagrams (main) | — | ~15K | 3% | 5 Mermaid files (roadmap, 5-vectors, CAF, RACI vs DACI, 3-layer goals) |
| 7 | Final presentation + TODO sync + commit | — | ~8K | 2% | Edits to TODO.md, stage + commit |

**Methodology note:** Agent tokens are estimated from wall-clock duration and the L12202/L11402 baselines (transcripts don't store per-agent token counts). Main-context tokens are closer to measured. Error margin: ±20% per agent, ±10% on total.

---

## Top Token Consumers (Pareto)

### 1. Codex Pedagogy Wrapper — ~70K (16%)

**Why expensive:**
- 40 Q × full-length explanations to review
- Codex ran `codex exec` end-to-end and returned a long report
- Orchestration wrapper reads both files + boundary map + consolidates findings

**Observation for codex-mode:** In the new codex-mode pipeline, the pedagogy slot is **replaced by the Codex Auditor** (術語/段落/口訣/教學準確度, not question-correctness). If the auditor is shorter and more focused, this stage may drop meaningfully.

### 2. Study Guide Writer / Question Generator / Fact-Scope Checker — ~55K each (13% each)

**Why each is this size:**
- Writer: 800-line guide with dense frameworks and 5-section pedagogy scaffolding
- Generator: 40 Q deep pool; tool-call cap keeps it from ballooning
- Fact-Scope: reads both full artifacts to verify every factual claim + boundary compliance

**Observation for codex-mode:** Writer + Generator move to `codex exec` — Claude orchestration cost per author drops to the wrapper (~3–5K). This is the single biggest projected saving: ~**100K → ~10K** combined across both authors.

### 3. Fix — Study Guide — ~55K (13%)

**Why expensive:**
- 9 substantive fixes across §3.2/§3.3/§3.5/§4.2/§5.2/§6.1 + diagram index
- Agent read the full 800-line guide before applying fixes
- Several fixes were multi-paragraph rewrites (Microsoft CAF, Google CAF)

**Observation for codex-mode:** Replaced by a single `codex exec` fix pass across both files. Projected drop: ~**100K → ~15K** combined for fix A + fix B.

---

## Pipeline Shape (claude-mode, this run)

```
Brief (main)
  ↓
Agent A: Researcher [Claude]
  ↓
Agent B: Study Guide Writer [Claude]   ┐
Agent C: Question Generator [Claude]   ┘ parallel
  ↓
Agent D: Fact & Scope Checker [Claude]        ┐
Agent F: Adversarial [Gemini via Claude]      │ parallel (via /course-multi-review)
Agent G: Pedagogy [Codex via Claude]          ┘
  ↓
Consolidate review → main context
  ↓
Fix A: Study Guide [Claude]  ┐
Fix B: Questions  [Claude]   ┘ parallel (Strategy A)
  ↓
Diagrams (main)
  ↓
Approval → TODO sync → commit
```

---

## Projected codex-mode Delta (hypothesis for L21203+)

> These are **projections** to be verified against the actual L21203 codex-mode run. Not measured results.

| Stage | claude-mode (this run) | codex-mode (projected) | Projected Δ |
|---|---|---|---|
| Brief | ~12K | ~12K | 0 |
| Researcher | ~35K | ~35K | 0 (stays on Claude) |
| Study Guide Writer | ~55K | ~5K (codex exec wrapper) | **-50K** |
| Question Generator | ~55K | ~5K (codex exec wrapper) | **-50K** |
| Fact & Scope Checker | ~55K | — | **-55K** (replaced) |
| Claude Adversarial (tech) | — | ~45K | +45K (new) |
| Gemini Adversarial (tech) | ~25K | ~25K | 0 |
| Codex Pedagogy | ~70K | — | **-70K** (replaced) |
| Codex Auditor (術語/段落/口訣) | — | ~25K (codex exec wrapper) | +25K (new) |
| Fix Study Guide | ~55K | — | **-55K** (replaced) |
| Fix Questions | ~45K | — | **-45K** (replaced) |
| Fix single `codex exec` | — | ~15K (wrapper) | +15K (new) |
| Diagrams | ~15K | ~15K | 0 |
| Final + commit | ~8K | ~8K | 0 |
| **Total** | **~430K** | **~195K** | **-235K (~55% reduction)** |

**Key assumptions to verify:**
1. `codex exec` author wrappers truly stay ~5K each (prompt + file verification, no authored content in context).
2. Codex Auditor report is short (~120 lines max per template).
3. The single `codex exec` fix pass handles both files in one call without re-reads ballooning the wrapper.
4. No fallback to Strategy A (claude subagents) required.
5. Codex authors produce acceptable-quality study guide + questions on first pass (no re-run needed).

Any of these failing shifts the actual savings. A realistic band: **~180K–260K total** for L21203 codex-mode on a comparable deep topic.

---

## What Went Right

1. **Zero rate-limit waste** — unlike L12202, all fix agents succeeded on first attempt
2. **Parallel fix subagents (Strategy A) handled 27 fixes cleanly** — 9 SG + 18 Q
3. **Review consolidation caught real errors** — Microsoft CAF structure, Google CAF themes/pillars, 70/20/10 self-contradiction, Q34 Taiwan 法遵
4. **No post-hoc question additions** — Q pool landed at 40 on first pass
5. **5 diagrams generated cleanly in one stage** — up from 3 in L12202

## What Went Wrong (minor)

1. **Codex false-positive on `correct_answer:` schema** — Codex reported all 40 Q had empty correct field; verified as schema misread (actual field is `correct:`). Did not block, but cost reviewer clarity. Consider adding schema note to `pedagogy-reviewer.md` / `codex-auditor.md` template.
2. **800-line study guide is on the higher end** — 中級 topics have more governance + framework surface area, which inflates writer + fact-check + fix costs proportionally. Expected for this cert level.

---

## Comparison vs Previous Deep Runs

| Metric | L11402 (初級 deep) | L12202 (初級 deep) | **L21202 (中級 deep, this run)** | L21203+ (codex target) |
|---|---|---|---|---|
| Pipeline mode | claude | claude + manual recovery | **claude** | **codex** |
| Total tokens | ~370K | ~488K (~390K*) | **~430K** | **~195K (projected)** |
| Agents dispatched | 10 | 8 | **8** | 7 (–1 fact-scope) |
| Rate limit hit? | Yes | Yes | **No** | TBD |
| Wall-clock (active) | ~4.5h | ~45m | **~55m** | TBD |
| Study guide lines | 638 | 518 | **800** | TBD |
| Final question count | 30 | 40 | **40** | TBD |
| Fixes applied | ~10 | 7 | **27** | TBD |

*L12202 hypothetical without rate limit.

---

## Caveats

- **All agent figures are estimated, not measured.** Derived from wall-clock and L12202/L11402 baselines. Error margin ±20% per agent.
- **Gemini / Codex external tokens are free.** The ~25K (Gemini) and ~70K (Codex Pedagogy) figures are Claude orchestration wrappers only.
- **Projected codex-mode numbers are hypotheses.** The first real codex-mode run (L21203) will validate or falsify them. Recommend running L21203 on the same depth tier to keep the comparison clean.
- **中級 content has more framework surface area** than 初級. A fairer cross-cert comparison would be L11402 (初級 deep) → L21202 (中級 deep) → L21203 (中級 deep codex-mode). The +16% vs L11402 is expected from cert-level density, not workflow regression.
- **This is the last claude-mode baseline.** From L21203 onward the default is codex-mode unless `--mode=claude` is passed.
