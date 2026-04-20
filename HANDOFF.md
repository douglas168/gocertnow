# Session Handoff — 2026-04-20 (L21301 lesson complete)

## Session Summary

Generated the complete L21301 (數據準備與模型選擇) lesson for IPAS 中級 using the codex-mode pipeline. Full 3-reviewer multi-model review (Claude adversarial + Gemini adversarial + Codex auditor) surfaced 28 findings; 5 critical fixes applied including Q18 algorithm mismatch, SMOTE leakage warning, and split-ratio range corrections.

## What was done

1. **L21301 — 數據準備與模型選擇** (IPAS 中級, L21 required, Deep depth)
   - `study-guide.md` — 809 lines covering 數據收集, 數據清洗與預處理, 特徵工程, 模型優缺點
   - `L21301-questions.yaml` — 40 questions, D1-5 = 8/8/8/8/8
   - `research-notes.md` — 57 lines
   - `supplement-常見模型取捨.md` — model tradeoffs reference
   - 5 Mermaid diagrams:
     1. Algorithm-choice flowchart (task × data size → model family)
     2. Dataset-size heuristics quadrant
     3. Train/val/test split with SMOTE leakage guard
     4. Feature encoding decision tree
     5. Class-imbalance strategy matrix

2. **Multi-model review resolved:**
   - Q18: k-NN in clustering scenario → corrected to K-Means
   - Split ratios upper-bound sum >100% → replaced with concrete 70/15/15 + 80/10/10
   - SMOTE leakage warning added to §3 and exam-trap section
   - Terminology normalization (10 inconsistencies across guide + questions)
   - 3 paragraph flow improvements

3. **TODO.md updated** — L21301 set to Done (1 open item: diagram rendering), next lesson updated to L21302

## Commits this session

- `51ee4b5 feat(content): complete L21301 lesson, 40-question practice pool`

**Status:** 2 commits ahead of origin/main — not yet pushed.

## What's next

1. **L21302 — AI技術系統集成與部署** — Medium depth, the L21 capstone topic (train → registry → serve → monitor → retrain). Run: `/course-generate-lesson L21302`
2. After L21302: L22 sprint begins (14 remaining lessons for 資料分析組 SKU)
3. **Landing page fake-claims** still open — `web/app/(marketing)/page.tsx` has 92% 通過率 badge + sampleTestimonials to remove before sending traffic
4. **LINE pre-sell group** — founder asked to open, 5 seats at NT$1,980

## Open items carried forward

- All Mermaid diagrams across 8 completed lessons need PNG rendering via Gemini (not blocking publish)
- L21102 coverage gaps: image-matching and Precision/Recall/F1 each have only 1 question

## Key paths touched

- `content/ipas/intermediate/lessons/L21301-數據準備與模型選擇/` — new (all files)
- `content/ipas/intermediate/questions/L21301-questions.yaml` — new
- `content/ipas/intermediate/TODO.md` — L21301 marked Done, next updated to L21302
