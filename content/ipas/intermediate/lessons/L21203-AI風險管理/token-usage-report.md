# Token Usage Report: L21203 AI風險管理

> **Date:** 2026-04-18
> **Purpose:** First **codex-mode** run on a 中級-deep topic — directly comparable to L21202 (last claude-mode baseline). Validates or falsifies the projected ~55% reduction from the L21202 report.
> **Outcome:** ~205K total (~52% reduction vs L21202). Single-pass `codex exec` fix call handled all 15 fixes across 3 files without falling back. The cross-reviewer pipeline caught a cascading 法律 status error that single-reviewer claude-mode would have missed.

---

## Summary

| Metric | Value |
|---|---|
| Total estimated Claude tokens | **~205K** (range: 180K–230K) |
| Compaction-adjusted (steady-state) | **~180K** |
| Reduction vs L21202 (claude-mode) | **–52%** raw / **–58%** compaction-adjusted |
| Pipeline mode | **codex-mode** (default) |
| Agents dispatched | 7, all completed; zero rate limits, zero retries |
| Wall-clock time | ~50 min active |
| Topic depth | Deep — 919-line guide, 40 Q, 5 diagrams |
| Fixes applied | 15 (5 critical + 9 important + 1 optional) across 3 files in one `codex exec` pass |
| Compaction during run | Yes, between Stage 3 and Stage 4 |

---

## Per-Stage Breakdown

| # | Stage | Agent | Est. Tokens | % | Confidence | Notes |
|---|---|---|---|---|---|---|
| 1 | Brief (pre-compaction) | main | ~10K | 5% | high | Auto-derived; one approval gate |
| 2 | Researcher | Claude subagent | ~35K | 17% | high | Same as L21202; researcher stays on Claude |
| 3 | Study Guide Writer | codex exec wrapper | ~10K | 5% | medium | Wrapper carries prompt + codex stdout; **919-line guide never enters Claude context** |
| 3 | Question Generator | codex exec wrapper | ~10K | 5% | medium | Same shape; **879-line YAML never enters Claude context** |
| 4 | Claude Adversarial (技術) | Claude subagent | ~65K | 32% | medium | Reads all 3 artifacts (~50K input) + web verification + 84-line output. **Now the dominant stage.** |
| 4 | Gemini Adversarial (cross-check) | gemini CLI wrapper | ~7K | 3% | high | Wrapper-only; gemini compute is free |
| 4 | Codex Auditor (一致性/教學) | codex exec wrapper | ~7K | 3% | high | Wrapper-only; codex compute is free |
| 5 | Fix brief construction | main | ~4K | 2% | high | 150-line brief written to `/tmp` |
| 5 | Fix application | codex exec wrapper | ~10K | 5% | medium | One pass across 3 files; verification greps |
| 6 | Diagrams | main | ~10K | 5% | high | 5 Mermaid files + §8 index edit |
| 7 | Compaction overhead | main | ~25K | 12% | low | Summary load + re-reading 3 review files post-compaction |
| 8 | Final + TODO + commit | main | ~7K | 3% | high | TODO.md edits + commit |

**Methodology:** Wall-clock-derived estimates calibrated against L11402/L12202/L21202 baselines. CLI wrapper agents (codex, gemini) accounted at the orchestration layer only — external CLI compute is free for this analysis. Per-agent error margin ±20%; total error margin ±15%.

---

## Where the savings came from

| Stage cluster | L21202 | L21203 | Δ |
|---|---|---|---|
| Authoring (Writer + Generator) | ~110K | ~20K | **–90K** |
| Review (Fact-Scope + Pedagogy + Adversarial) | ~150K | ~79K | **–71K** |
| Fix application (Fix-A + Fix-B) | ~100K | ~14K | **–86K** |
| Researcher + diagrams + main + commit | ~70K | ~67K | ~0 |
| Compaction (run-specific) | 0 | ~25K | +25K |
| **Total** | **~430K** | **~205K** | **–225K (–52%)** |

The savings concentrate exactly where projected: **anywhere full file contents previously flowed through Claude**. Researcher, diagrams, and main-context work are unchanged.

---

## Pipeline Shape

```
Brief (main)
  ↓
Researcher [Claude]
  ↓
Study Guide Writer [codex exec]    ┐ parallel
Question Generator [codex exec]    ┘
  ↓
Claude Adversarial (技術)          ┐
Gemini Adversarial (cross-check)   │ parallel
Codex Auditor (一致性/教學)         ┘
  ↓
Fix brief (main) → Fix [codex exec single pass]
  ↓
Diagrams (main) → Approval → TODO sync → commit
```

---

## Projected vs Actual

| Stage | claude-mode (L21202) | projected codex-mode | actual (this run) | variance |
|---|---|---|---|---|
| Brief | ~12K | ~12K | ~10K | within margin |
| Researcher | ~35K | ~35K | ~35K | 0 |
| Writer | ~55K | ~5K | ~10K | +5K |
| Generator | ~55K | ~5K | ~10K | +5K |
| Fact-Scope (replaced) | ~55K | — | — | as projected |
| Claude Adversarial | — | ~45K | **~65K** | **+20K** ⚠️ |
| Gemini wrapper | ~25K | ~25K | ~7K | **–18K** ⭐ |
| Codex Pedagogy (replaced) | ~70K | — | — | as projected |
| Codex Auditor | — | ~25K | ~7K | **–18K** ⭐ |
| Fix Study Guide (replaced) | ~55K | — | — | as projected |
| Fix Questions (replaced) | ~45K | — | — | as projected |
| Fix single pass | — | ~15K | ~14K | within margin |
| Diagrams | ~15K | ~15K | ~10K | within margin |
| Compaction (unforeseen) | — | — | ~25K | **+25K** ⚠️ |
| Final + commit | ~8K | ~8K | ~7K | within margin |
| **Total** | **~430K** | **~195K** | **~205K** | **+10K (within ±10%)** |

**Two corrections to the L21202 report's projections:**
1. **Claude adversarial reviewer was underestimated by ~20K.** It carries every file the codex authors produced — guide + questions + research notes — plus web verification. With authoring offloaded to codex, this stage becomes the new ceiling.
2. **CLI wrapper agents (Gemini, Codex auditor) were overestimated by ~18K each.** Once the prompt is on disk and the CLI does the heavy lifting, the wrapper agent really is just `cat | cli 2>&1` plus a short report. The L21202 report assumed wrappers would be larger; they were not.

Net: the over- and under-estimates roughly cancel. The bottom line lands within the projected band.

---

## What changed quality-wise (not just cost)

The codex author **independently web-checked** the 臺灣 AI 基本法 status, found the prompt-supplied research notes were outdated (「待公布施行」 → actually 公布 2026-01-14), and wrote the study guide using the verified date. The reviewer pipeline then propagated that correction down to research-notes.md and three questions (Q02 / Q37 / Q38) that were generated from the stale premise.

This is a property of the codex author having web access and exercising judgment, not a property of codex-mode per se. But it's worth noting: codex-mode produced a **more accurate** first draft than the prompt asked for.

The flip side: the orchestrator (this run) had to detect the deviation and reconcile across files. The fix-brief had to explicitly call out the cascade. A future codex-mode run on a legal-status topic should expect this and pre-instruct the author to flag deviations in its return summary.

---

## Comparison vs Previous Deep Runs

| Metric | L11402 (初級) | L12202 (初級) | L21202 (中級) | **L21203 (中級)** |
|---|---|---|---|---|
| Mode | claude | claude | claude | **codex** |
| Total tokens | ~370K | ~488K (~390K*) | ~430K | **~205K** |
| Compaction-adjusted | ~370K | ~390K* | ~430K | **~180K** |
| Wall-clock | ~4.5h | ~45m | ~55m | **~50m** |
| Rate limits | yes | yes | no | **no** |
| Study guide lines | 638 | 518 | 800 | **919** |
| Questions | 30 | 40 | 40 | **40** |
| Fixes applied | ~10 | 7 | 27 | **15** |
| Cost vs L21202 | — | — | 1.0× | **0.48×** |

*hypothetical without rate-limit waste.

The fix count dropped (27 → 15) because the codex author got more right on the first pass — not because review coverage was weaker. All 3 reviewers landed substantive findings; the consolidated set was just smaller.

---

## Honest caveats

- **All per-stage figures are estimated, not measured.** The transcript doesn't store per-agent token counts. Wall-clock-and-baseline estimation has a ±20% margin per agent.
- **The ~25K compaction overhead is the lowest-confidence number in this report.** The auto-summary load is server-side and partially hidden; the visible cost is the post-compaction re-orientation (re-reading 3 review files, re-grounding in task list). Could be 15K–35K.
- **Gemini and Codex CLI compute is free for this analysis.** The wrapper figures are Claude orchestration only.
- **The Claude adversarial reviewer (~65K, 32%) is now the single largest stage.** Further token reduction would require either (a) replacing it with a second `codex exec` reviewer — sacrifices the cross-model property — or (b) accepting it as the cost of multi-model adversarial coverage. The 法律 status cascade caught here justifies (b) for now.
- **Steady-state codex-mode deep cost is ~180K**, not ~205K. Use the lower number when projecting future runs that don't compact.
- **This delta is for deep topics.** Shallow / medium topics will see smaller absolute savings because their authoring + fix surface area is smaller (proportional savings should be similar).
