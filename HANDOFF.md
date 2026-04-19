# Session Handoff — 2026-04-19 (adversarial review + strip 中級-in-public framing)

## Session Summary

Ran adversarial multi-model review (gemini + codex CLIs vs. Perplexity baselines, Claude synthesized) on 5 LevelCert brand/product questions. User then dropped a major framing change mid-session: **"I am not doing 'in public' for this ipas intermediate exam. maybe for my next AI 900 exam."** Traced the 中級-in-public drift across docs/launch/ and rewrote 7 files to anchor the public narrative on the 初級 pressure-pass (credential 115-01-Z01, avg 73, one subject 66 — 壓線通過) + visibly building LevelCert in public. 2026-05-23 中級 sitting is now a private operational deadline; 2026-06-12 result becomes one honest evidence post, not a campaign.

Created `docs/launch/notes-to-founder.md` (renamed from `note-` to `notes-` at user request) as a one-page compass to re-read before strategic decisions.

## What was done

1. **Adversarial-research-review skill** (`.claude/skills/adversarial-research-review/SKILL.md`) codified — dotLLM dual-review pattern using gemini + codex CLIs in parallel against a baseline answer, then Claude synthesizes against hard constraints. Reusable for future high-stakes questions.
2. **5-question synthesis** (`docs/product development/SYNTHESIS-2026-04-19.md`) — pricing (focused premium, keep 1,200–3,980 ladder, no freemium), moats (founder proof + building-in-public + Taiwan voice; NOT partnerships/question-bank/pass-rate), RPG (progress bar + 弱點雷達 + section quizzes + streak; cut guilds/PvP/boss-fight copy), platform (web only, no PWA/native), workflow-as-product (park as Phase 4 vision, not Day-1 wedge).
3. **中級-in-public drift removed** from 7 docs/launch/ files:
   - `ROADMAP.md` — 中級 reframed as private operational deadline
   - `START-HERE.md` — pass-or-fail-in-public commitment replaced with building-LevelCert-in-public
   - `TODO.md` — Issue #4 rewritten; "pivotal post" section → single 6/12 evidence post
   - `build-in-public-calendar.md` — new hook「43 天公開建構 LevelCert」with 40/40/20 split (building / 初級 teaching / solo-founder journey)
   - `landing-page-copy.md` — new section「我不是專家。我只是先你一步通過的上班族」anchored on 115-01-Z01 / 80+66 / avg 73
   - `ipas-exam-calendar-2026.md` — residual "Public forcing function" + "pivotal post" wording fixed
   - `university-club-outreach.md` — dropped stale "準備 5/25 中級" line, anchored on 115-01-Z01 credential
4. **`docs/launch/notes-to-founder.md`** created — final say paragraph + 5 verdicts + this-week actions (Apr 19–25) + NOT-to-do list + kill criterion (2026-12-15 / <10 alumni passes / <100 paying students → don't expand verticals) + expansion-path note (Traditional-Chinese international certs, NOT English-global).

Commit: `f6d83b2 docs(launch): strip 中級-in-public framing; add notes-to-founder + adversarial-review artifacts`

## What's next (Apr 19–25 — per notes-to-founder.md)

1. **Fix landing-page fake-claims** — remove 92% 通過率 badge and `sampleTestimonials` from `web/app/(marketing)/page.tsx`.
2. **Replace hero** with 初級 115-01-Z01 founder-story block (avg 73, 66 on one subject — 壓線通過 narrative). Copy is already drafted in `docs/launch/landing-page-copy.md` lines 150–158.
3. **Open LINE pre-sell group.** Target: **5 founding seats at NT$1,980 by Apr 21.**
4. **Post on Threads daily** — about building LevelCert and 初級 learnings. NOT about 中級 exam pressure. Calendar is in `docs/launch/build-in-public-calendar.md`.

## Key decisions frozen this session (do not reopen without evidence)

- **Expansion path when it's time (Phase 4+):** Traditional-Chinese international certs (Microsoft AI-900, Azure, Google Cloud, AWS, CompTIA all have 繁中 exam versions), NOT English-global. Native-voice moat is preserved this way; destroyed going English.
- **AI-900 may become the first "build-in-public" exam** — Phase 4+ decision, not now.
- **Workflow-as-product parked as Phase 4 vision** — every survivor case study had paying customers + data BEFORE workflow became the asset.
- **Four-moat verdict:** founder proof (初級 credential + building-in-public + Taiwan voice) is Day-1. Pass rate, 認同, question bank are Phase-3+ consequences, not wedges.

## Uncommitted state to triage next session

Carrying forward from prior handoff + this session (none of which I touched this session):

**Modified (prior sessions):**
- `content/ipas/_config.yaml`
- `content/ipas/syllabus/boundary-map.md`
- `content/ipas/intermediate/lessons/L21101-.../study-guide.md`
- `content/ipas/intermediate/lessons/L21102-.../study-guide.md`

**Deleted (prior session cleanup):**
- `docs/study-guide-claude/` directory (14 files)

**Untracked (prior sessions):**
- `content/ipas/beginner/lessons/L11401-鑑別式AI與生成式AI的基本原理/`
- `content/ipas/beginner/questions/L11401-questions.yaml`
- `docs/content-strategy/`

Triage: confirm origin, decide whether to commit, delete, or stash. None of this was part of today's 中級-in-public cleanup session.

## Related artifacts

- Full synthesis: `docs/product development/SYNTHESIS-2026-04-19.md`
- Adversarial-review skill: `.claude/skills/adversarial-research-review/SKILL.md`
- Founder compass: `docs/launch/notes-to-founder.md`
- Raw Perplexity baselines: `docs/product development/perplexity-Q{1..5}.md`
- Raw adversary reviews (ephemeral): `/tmp/review-Q{1..5}-{gemini,codex}.md`
