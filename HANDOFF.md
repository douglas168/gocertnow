# Session Handoff — 2026-04-19 (docs/ reorganization)

## Session Summary

Reorganized `docs/` from a messy mix of folder names (with spaces, inconsistent prefixes, planning/ grab-bag) into a flat, category-prefixed structure using the convention `<category>-<topicCamelCase>` with a single hyphen. Delegated execution to a Haiku sub-agent for all bulk `git mv` + cross-reference updates, which is the pattern the user wants applied going forward.

## What was done

1. **Folder reorg** — 13 folders in `docs/`, all category-prefixed, flat:
   - `_template/`, `_todo/` (meta, underscore-prefixed, sort first)
   - `business-brand/`, `business-competitors/`, `business-entrepreneurship/`, `business-strategy/`
   - `marketing-contentStrategy/`
   - `product-development/`, `product-futureCourses/`, `product-mockups/`, `product-workflows/`
   - `webDev-architecture/`, `webDev-claude/`

2. **Splits and merges:**
   - `launch/` → `_todo/` (daily operating folder — TODO, ROADMAP, START-HERE, calendars, outreach, founder compass)
   - `claude/` + `web-dev/` → `webDev-claude/` (merged; both are Claude Code tooling)
   - `planning/` split three ways: ARCHITECTURE + VERCEL + WEBSITE-BUILD-PLAN + claude-tools → `webDev-architecture/`; 5× WORKFLOW-*.md + dotLLM-workflow → `product-workflows/`; RPG-LITE-SCOPE → `product-development/`
   - Deleted empty root `market-analysis.md` (real one already in `business-strategy/`)

3. **Cross-references updated** in 19 files (CLAUDE.md, HANDOFF.md, milestones, skills, design-system, TODO, outreach, web-dev prompts, architecture docs). Haiku sub-agent executed this bulk via Grep + Edit.

4. **CLAUDE.md upgrades:**
   - Repository Structure tree rewritten to reflect new scheme + one-line naming rule
   - New "Working style — sub-agent delegation & model routing" section codifying when to delegate and how to pick Haiku / Sonnet / Opus

5. **Memory saved:** `feedback_subagent_delegation.md` — captures the delegation pattern so it persists across sessions.

Commits this session:
- `ec30820 docs: reorganize into flat category-topicCamelCase folders`
- `949e741 docs: update cross-references after reorg + add naming rule`

## What's next (Apr 19–25 — unchanged from prior handoff)

1. **Fix landing-page fake-claims** — remove 92% 通過率 badge + `sampleTestimonials` from `web/app/(marketing)/page.tsx`.
2. **Replace hero** with 初級 115-01-Z01 founder-story block (avg 73, 66 on one subject — 壓線通過). Copy drafted in `docs/_todo/landing-page-copy.md` lines 150–158.
3. **Open LINE pre-sell group** — target 5 founding seats at NT$1,980 by Apr 21.
4. **Post on Threads daily** about building LevelCert. Calendar: `docs/_todo/build-in-public-calendar.md`.

## Naming convention (now locked in CLAUDE.md)

`<category>-<topicCamelCase>`, flat, single hyphen. Categories: `business-*`, `marketing-*`, `product-*`, `webDev-*`. Meta folders use `_` prefix (`_template`, `_todo`). Do not nest. Do not invent new categories without user review.

## Sub-agent pattern (now locked in CLAUDE.md + memory)

Delegate bulk / mechanical / parallelizable work to sub-agents. Route by cost:
- **Haiku** — deterministic: `git mv` batches, sed/grep-and-replace, link updates, simple lint.
- **Sonnet** — bounded judgment: small refactors, single lesson section, diff review.
- **Opus** — main conversation: architecture, multi-file design, synthesis after sub-agents report.
- Parallel dispatch (one message, multiple `Agent` calls) when tasks don't share state.

## Key paths touched this session

- `docs/` — full reorg
- `CLAUDE.md` — Repository Structure tree, naming rule, new Working style section
- 19 files — cross-reference path updates
- `.claude/projects/.../memory/feedback_subagent_delegation.md` — new memory
- `.claude/projects/.../memory/MEMORY.md` — index updated
