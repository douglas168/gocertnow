# CLAUDE.md

**LevelCert.com** — cert-prep platform. Pilot vertical: **IPAS AI應用規劃師 (初級 + 中級)**, Taiwan B2C. Pay-per-course; pass guarantee is the defensible moat (outcome-binary, can't be faked). Vision: IPAS → scale verticals → open platform (20–30% cut) → SaaS layer for creators. Full context: `docs/`.

## Pricing (IPAS 初級 pilot, decided 2026-04-10) — do not change without re-reading rationale

| Tier | NTD | Eligibility | Access |
|---|---|---|---|
| 社團團購 | 1,200/seat | Verified club, 20+ seats | Through 2026-12-31 |
| 學生價 | 1,480 | .edu.tw / student ID, 大學+研究所 | Through 2026-12-31 (cohort-locked, first 30 days post-launch) |
| 創始會員 | 1,980 | First 20 seats (LINE pre-sell) | Through 2026-12-31 |
| 早鳥價 | 2,980 | Seats 21–70 | Through 2026-12-31 |
| 正式價 | 3,980 | Seat 71+ | 3 months initial + 6-month extension on fail |

**Pass guarantee:** Fail IPAS → free **6-month** extension (one time). Sized for 中級 (2×/year, ~6 months apart — binding constraint). Second failure → 50% off repurchase. Post-launch max access = 9 months (3 + 6). Do not raise above NT$3,980 until 10+ documented alumni passes exist. Rationale + exam dates: `docs/_todo/ipas-exam-calendar-2026.md`.

## Training-data overrides (load-bearing every turn)

- **Next.js 16.2** has breaking changes vs. training. Read `web/AGENTS.md` and `web/node_modules/next/dist/docs/` before writing Next.js code.
- **Vercel:** standalone Edge Functions deprecated → use Vercel Functions. Vercel KV and Vercel Postgres discontinued for new projects → use Marketplace Redis / Postgres. Full ref: `docs/webDev-architecture/VERCEL-BEST-PRACTICES.md`.

## Known trap

`web/app/(marketing)/page.tsx` has fake-claim landing-page content ("92% 通過率" badge, `sampleTestimonials`) that MUST be fixed before sending traffic. Do not preserve these when editing. See `docs/_todo/TODO.md` Week 1.

## Docs + UI

- Docs naming: `<category>-<topicCamelCase>`, flat in `docs/`, one hyphen. `_template/` and `_todo/` are the only underscore-prefixed folders.
- Architecture + RLS + content protection → `docs/webDev-architecture/ARCHITECTURE.md`.
- UI work → read `design-system/MASTER.md` + `design-system/pages/<page>.md` if present. Do not invent styles.

## Session hygiene

- **`/clear` between distinct tasks** — earlier context pollutes later reasoning.
- **After 2 failed Sonnet attempts on the same task**, reframe or escalate to Opus / `codex exec` — do not retry the same framing.
- **Handoff** ("wrap up" / "save state") → follow the global procedure in `~/.claude/CLAUDE.md`.

## Model routing & delegation

- **Haiku** — deterministic mechanical (git mv batches, sed/grep replace, link updates, single-file fact extraction).
- **Sonnet** — default for coding/debugging and bounded judgment (small refactors, diff review, single lesson section).
- **Opus** — architecture, multi-file design, final synthesis after sub-agents report.

Delegate when: ≥3 similar operations, heavy tool output that would pollute main context, or a long-write task (>500 lines — synthesis, summarisation, extraction, reformatting). Inline single `git mv` / one-line Edit. Parallelise independent sub-tasks in one message with multiple `Agent` calls. Sub-agent prompts: full file paths, exact commands or substitution table, what to report back, ≤250-word reply cap.
