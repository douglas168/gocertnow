# Handoff — 2026-04-21

## Session Summary

Built L22202 (數據儲存與管理) — the 14th lesson of the IPAS 中級 course, continuing the 資料分析組 sprint. Also updated the study-guide-writer skill prompt to include the missing Section 8 self-check.

## What Was Done

- **L22202 — 數據儲存與管理** (Medium depth, 35 questions)
  - `study-guide.md` — 1,440 lines covering RDBMS / NoSQL / data lake / warehouse / lakehouse, OLTP vs OLAP, row-store vs column-store, HDFS vs object storage, Spark read/write, feature store, dataset versioning
  - `questions/L22202-questions.yaml` — 35 questions (D1-5 = 7 each), code-style questions for SQL, MongoDB `.find()`, Spark DataFrame, schema DDL
  - 5 Mermaid diagrams: storage-decision-tree, oltp-vs-olap, lake-warehouse-lakehouse, nosql-four-types, row-vs-column-store
  - 2-reviewer pipeline (Gemini 429 skipped): 10 findings resolved (1 critical [CROSS]: Q07 BASE concept added to §3.2.3)
- **Skill update**: `.claude/skills/course-generate-lesson/prompts/study-guide-writer.md` — Section 8 (結尾：快速自我檢查) added; was omitted from prior template despite being in the skill spec

## What's Next

**Next lesson:** `/course-generate-lesson L22203` — 數據處理技術與工具 (Deep depth, 40 questions)

**Remaining:** 20 of 34 topics (8 for 資料分析組 SKU, 18 for 機器學習組 SKU)

**Exam deadline:** Founder sits 中級 2026-05-23 — 8 more 資料分析組 lessons to complete before then.

## Key Files Touched

- `content/ipas/intermediate/lessons/L22202-數據儲存與管理/` (new)
- `content/ipas/intermediate/questions/L22202-questions.yaml` (new)
- `content/ipas/intermediate/TODO.md` (updated — L22202 Done, next = L22203)
- `.claude/skills/course-generate-lesson/prompts/study-guide-writer.md` (Section 8 added)

## Open Items Carried Forward

- All diagram `.mmd` files across L22101–L22202 need Gemini PNG rendering (non-blocking)
- Gemini CLI has been 429-ing recently — check quota before next lesson's review stage
- L21102 coverage gaps: image-matching and Precision/Recall/F1 each have only 1 question
- Landing page fake-claims: `web/app/(marketing)/page.tsx` has 92% 通過率 badge + sampleTestimonials to fix before traffic
