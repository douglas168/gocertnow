---
name: course:generate-lesson
description: "Use when syllabus YAML exists and user wants to create or continue lesson content for a certification course topic"
---

You are a subject matter expert in the certification's domain and an experienced online course creator. Your job is to generate a complete lesson for one exam topic — study guide, quiz questions, fact check, and visuals.

**Prerequisites:** `/course-study-syllabus` must have completed. These files must exist:
- `content/{cert}/{level}/syllabus/syllabus.yaml`
- `content/{cert}/{level}/syllabus/dependencies.md`
- `content/{cert}/{level}/syllabus/analysis.md`
- `content/{cert}/syllabus/boundary-map.md` (or single-level equivalent)
- `content/{cert}/_config.yaml`

---

## Arguments

```
/course-generate-lesson <topic-code> [--mode=codex|claude]
```

- **`<topic-code>`** (optional): e.g. `L21203`. If omitted, read `dependencies.md` + `TODO.md` to pick the next topic.
- **`--mode=codex`** (default): researcher + authors + auditor + fix-apply all run via `codex exec`. Claude runs only the adversarial reviewer (cross-model coverage) and the small orchestration tasks. Minimizes Claude token usage.
- **`--mode=claude`**: legacy pipeline. Author via Claude subagents, review via `/course-multi-review`, apply fixes via Strategy A/B.

Parse the `--mode` flag from arguments. Default to `codex` when absent. Announce the selected mode in the Phase 1 brief.

---

## Token-budget rules (apply to every stage)

These rules govern every stage in this skill. Violating them is the primary cause of token bloat.

1. **Never read large artifacts into main context.** Study guide, questions YAML, research notes, review reports, fact-list — all are read by subagents only. Main context handles paths and short summaries.
2. **Reviewers write to canonical paths.** Each reviewer (Claude adversarial, Gemini adversarial, Codex auditor) writes its report to a fixed path under `/tmp/`. Main never reads them — a downstream consolidator subagent does.
3. **Persist orchestration state to disk.** Write the Phase 1 brief and per-stage status to `/tmp/lesson-{topic-code}-state.json` so a compaction or restart does not force re-derivation. Read it back only when needed.
4. **Trust subagent return summaries.** If a wrapper says "wrote N lines to X", do not re-read X to verify. Only re-verify on suspicious output (empty stdout, error markers, or wrong path).
5. **Cap reviewer outputs.** Wrapper instructs each reviewer to cap its report at ~120 lines of machine-parseable findings (no preamble, no closing summary). Long reports get truncated by the wrapper before return.

---

## Phase 1 — Combined Brief (INTAKE + BRAINSTORM + PLAN)

**Auto-derive everything. Do not ask the user individual questions.**

**⚠️ PROMPT TEMPLATE PATH:** All prompt templates live in `.claude/skills/course-generate-lesson/prompts/` (NOT `content/{cert}/{level}/prompts/`). Do NOT search for them — use this path directly.

1. Read `dependencies.md` and `TODO.md` to identify the next topic (or use the user-specified topic).
2. Read `_config.yaml` for tone and pool sizes. Read the **depth tag** from the priority table in `TODO.md` to determine question count:
   - Shallow → `pool_size.shallow` (25)
   - Medium → `pool_size.medium` (35) — overshoot to avoid expensive post-hoc additions from coverage gaps
   - Deep → `pool_size.deep` (40) — same rationale
3. Read `syllabus.yaml`, `analysis.md`, and `boundary-map.md` — extract ONLY the items for this topic. Do not read the full files if they are large.
4. **Persist brief to disk.** Write the brief plus derived paths to `/tmp/lesson-{topic-code}-state.json`:

   ```json
   {
     "topic_code": "L21203",
     "topic_name": "AI風險管理",
     "cert": "ipas",
     "level": "intermediate",
     "mode": "codex",
     "depth": "deep",
     "question_count": 40,
     "tone": "...",
     "paths": {
       "lesson_dir": "content/ipas/intermediate/lessons/L21203-AI風險管理",
       "study_guide": "content/ipas/intermediate/lessons/L21203-AI風險管理/study-guide.md",
       "questions": "content/ipas/intermediate/questions/L21203-questions.yaml",
       "research_notes": "content/ipas/intermediate/lessons/L21203-AI風險管理/research-notes.md",
       "fact_list": "/tmp/lesson-L21203-facts.md",
       "review_claude": "/tmp/review-claude-L21203.md",
       "review_gemini": "/tmp/review-gemini-L21203.md",
       "review_codex": "/tmp/review-codex-L21203.md",
       "fix_brief": "/tmp/codex-fix-L21203.md"
     },
     "stages_completed": []
   }
   ```

   After each stage completes, the orchestration appends to `stages_completed` so a compaction or restart can resume without re-deriving.

Present **one combined brief** covering all three former phases:

```
## Lesson Brief: [topic-code] — [topic-name]

**Mode:** [codex | claude]  |  **Tone:** [from _config.yaml]  |  **Questions:** [N] ([depth] depth)

### Syllabus Items
- [items from syllabus.yaml]

### Keywords to Research
- [keywords]

### Boundary Rule
> [rule from boundary-map.md]

### Key Observations
- [high-frequency targets, confused pairs, exam traps, diagram candidates]

### Execution Plan
- Stage 1 — Researcher [codex exec] → research-notes.md
- Stage 2 — Authors (parallel) [codex exec] → study-guide.md + [N]-question pool
- Stage 3a — Fact-list pre-pass [codex exec] → facts.md
- Stage 3b — Reviewers (parallel) → Claude adversarial + Gemini adversarial + Codex auditor
- Stage 4a — Fix-brief consolidator [Claude subagent] → fix brief
- Stage 4b — Fix apply [codex exec single pass]
- Stage 5 — Auto-generate diagrams
```

Ask: *"Approve this brief to start building?"*

**HARD-GATE:** Do not proceed to BUILD until the user approves the combined brief. This is the ONLY pre-build approval gate.

---

## Phase 2 — BUILD (runs uninterrupted after approval)

Everything below runs without asking the user any questions.

### Stage 1: Researcher

#### codex-mode (default)

Launch a Claude subagent (thin wrapper) that:
1. Reads the researcher prompt template from disk (`prompts/researcher.md`)
2. Fills in context vars (cert, level, topic code, topic name, syllabus items, keywords, boundary rule, target audience, language)
3. Writes the filled prompt to `/tmp/codex-researcher-{topic-code}.md`
4. Runs: `cat /tmp/codex-researcher-{topic-code}.md | codex exec 2>&1`
5. Returns ≤3 lines: output path + line count + 1-line "key findings" headline. **Do not echo the file contents.**

The researcher prompt template is model-agnostic. WebSearch references in it map to codex's own web tooling.

Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/research-notes.md`.

After return, append `"researcher"` to `stages_completed` in the state file.

#### claude-mode (legacy)

Launch a Claude subagent with the researcher prompt inline (no codex wrapper). Same output path.

### Stage 2: Authors (mode-dependent)

#### codex-mode (default)

Launch **2 Claude subagents in parallel**. Each subagent is a thin wrapper that:
1. Reads the author prompt template from disk (`prompts/study-guide-writer.md` or `prompts/question-generator.md`)
2. Fills in context variables (topic code, level, file paths, research notes path, tone, question count)
3. Writes the filled prompt to `/tmp/codex-{author}-{topic-code}.md`
4. Runs: `cat /tmp/codex-{author}-{topic-code}.md | codex exec 2>&1`
5. **Returns one line: output path + line count.** Do NOT re-read the output file unless codex stdout is empty or contains an error marker. Trust the codex completion.

Agents:
- **Author A (codex) — Study Guide**: writes `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/study-guide.md`. May also produce `supplement-*.md` for subtopics >500 words.
- **Author B (codex) — Questions**: writes `content/{cert}/{level}/questions/{topic-code}-questions.yaml`.

The existing author prompt templates (`study-guide-writer.md`, `question-generator.md`) are model-agnostic — reuse them as-is. Do NOT duplicate them for codex.

#### claude-mode (legacy)

Launch 2 Claude Agents in parallel with the author prompts **inline** (no codex wrapper):
- **Agent B — Study Guide Writer** (`prompts/study-guide-writer.md`)
- **Agent C — Question Generator** (`prompts/question-generator.md`)

Same outputs as codex-mode.

**Both modes:** pass the research-notes.md **file path** to the author. Do not read research notes into main context.

### Stage 3a: Fact-list pre-pass (codex-mode only)

Before dispatching the adversarial reviewers, extract a structured fact-list so the Claude adversarial reviewer does not have to re-derive ground truth from full file contents.

Launch a Claude subagent (thin wrapper) that:
1. Writes a prompt to `/tmp/codex-facts-{topic-code}.md` instructing codex to read the study guide + questions YAML and emit a structured fact-list of:
   - **Dates** (statute publication, framework versions, deprecation cutoffs)
   - **Numbers** (penalty caps, percentages, threshold values, count-of-principles)
   - **Named frameworks / standards** (with version + issuer)
   - **Statute citations** (act name, article number, jurisdiction)
   - **Version numbers** (model versions, spec versions, software versions)
   - **Acronym ↔ full-name pairs** (every acronym used in the lesson)

   Output format: ≤120 lines, machine-parseable bullets, grouped by category. No prose.
2. Runs: `cat /tmp/codex-facts-{topic-code}.md | codex exec 2>&1`
3. Verifies the fact-list file exists at `/tmp/lesson-{topic-code}-facts.md` and returns a 1-line summary (line count + category count).

The Claude adversarial reviewer (Stage 3b) receives this fact-list path and uses it as a checklist — it can verify each fact via web search without re-reading the entire study guide. Net effect: claude reviewer input drops from ~50K (full files) to ~15K (fact-list + targeted file ranges).

### Stage 3b: Multi-Model Review (mode-dependent)

#### codex-mode (default)

Dispatch **3 reviewers in parallel**, inline from this skill (do NOT invoke `/course-multi-review`). Each reviewer wrapper writes its report to a canonical path. Main does NOT read these reports — the Stage 4a consolidator does.

1. **Reviewer 1 — Claude Adversarial (技術準確)**
   Launch a Claude subagent with the prompt from `prompts/claude-adversarial-reviewer.md`. Pass the fact-list path from Stage 3a. The reviewer's job: web-verify each fact in the fact-list, then spot-check the study guide for cause/effect and definition errors. Cap output at ~120 lines of findings, written to `/tmp/review-claude-{topic-code}.md`. Return ≤2 lines: report path + finding count by severity.

2. **Reviewer 2 — Gemini Adversarial (技術準確, cross-check)**
   Launch a Claude subagent that:
   - Reads `prompts/claude-adversarial-reviewer.md` (same template — Gemini runs the same focus as cross-check)
   - Fills context including fact-list path, writes to `/tmp/gemini-prompt-{topic-code}.md`
   - Runs: `cat /tmp/gemini-prompt-{topic-code}.md | gemini -p "Read the prompt from stdin, then read the referenced files and complete the review. Cap output at 120 lines of findings only — no preamble, no closing summary." --approval-mode plan 2>&1 > /tmp/review-gemini-{topic-code}.md`
   - Returns ≤2 lines: report path + finding count.

3. **Reviewer 3 — Codex Auditor (術語一致 / 段落順序 / 口訣對齊 / 教學準確度)**
   Launch a Claude subagent that:
   - Reads `prompts/codex-auditor.md`
   - Fills context, writes to `/tmp/codex-audit-prompt-{topic-code}.md`
   - Runs: `cat /tmp/codex-audit-prompt-{topic-code}.md | codex exec 2>&1 > /tmp/review-codex-{topic-code}.md`
   - Returns ≤2 lines: report path + finding count.

If Gemini or Codex CLI fails (timeout, auth error), continue with remaining reviewers and note the failure in the state file.

#### claude-mode (legacy)

Invoke `/course-multi-review` with the lesson folder path. This dispatches Claude Fact/Scope + Gemini Adversarial + Codex Pedagogy in parallel (the existing workflow).

### Stage 4a: Fix-brief consolidator (codex-mode)

**Do NOT read the 3 review files into main context.** Launch a Claude subagent (consolidator) that:
1. Reads the 3 review files (`/tmp/review-claude-*.md`, `/tmp/review-gemini-*.md`, `/tmp/review-codex-*.md`)
2. Deduplicates findings, groups by severity:
   - **Critical** — flagged by 2+ reviewers, OR any technical error with exam impact
   - **Important** — single reviewer with clear impact
   - **Minor** — suggestions
3. Marks each finding with `[CROSS]` (≥2 reviewers agree) or `[UNIQUE]` (only one reviewer)
4. Writes the consolidated fix brief to `/tmp/codex-fix-{topic-code}.md` with explicit instructions: "Apply every fix listed below to the specified files. Preserve all other content. Report a summary of changes made."
5. Returns one paragraph (≤6 lines) to main: total findings, critical count, important count, top 3 critical issues by one-line title.

Main reads only the return summary. The fix brief itself stays on disk.

### Stage 4b: Apply All Fixes (mode-dependent)

#### codex-mode (default)

Single-pass `codex exec` fix agent. Launch a Claude subagent (thin wrapper) that:
1. Runs: `cat /tmp/codex-fix-{topic-code}.md | codex exec 2>&1`
2. Verifies both files still exist (file existence check only, not content read) and returns a ≤3-line change summary.

If `codex exec` fails for fix apply, fall back to Strategy A (parallel Claude subagents). Do NOT retry codex.

#### claude-mode (legacy)

Use Strategy A (parallel Claude subagents) by default; Strategy B (batched main-context edits) if agents fail.

**Strategy A — Parallel Subagents:** 2 parallel agents, one per file (study-guide.md, questions YAML). Each reads its file, applies fixes, reports summary.

**Strategy B — Batched Main-Context Fixes:** read each file once (offset/limit for needed lines), queue all Edits for file 1, then all Edits for file 2. Never alternate files. Never re-read after editing.

### Stage 5: Auto-Generate Diagrams (both modes)

Decide which diagrams the lesson needs (typically 3–5). Create them all without asking.

- **Mermaid diagrams** — flowcharts, trees, comparisons
- **ASCII diagrams** — concept maps, hierarchies (already in study guide)
- **Image generation prompts** — for Gemini rendering later

Output under `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/diagrams/`. Embed diagram references in `study-guide.md`.

Diagrams stay on Claude in both modes — they're small, authoring benefits from Mermaid fluency, and cost is bounded.

---

## Phase 3 — Final Presentation and Approval

Present the completed lesson with:

1. **Artifact summary table** (files created, line counts — pulled from state file, no re-reads)
2. **Review summary** (issues found per reviewer, fixes applied — pulled from consolidator return summary)
3. **Diagram list** (what was generated)
4. **Mode used** (codex or claude) + rough token-savings estimate if codex-mode
5. **Remaining open items** (if any — e.g., diagram images need Gemini rendering)

Ask: *"Approve this lesson?"*

**HARD-GATE:** Do not proceed to TODO Sync until the user approves.

---

## Phase 4 — TODO Sync + Commit

Once the user approves the lesson:

### 1. Update TODO.md

Read `content/{cert}/{level}/TODO.md`, then:

- **Lesson Progress table:** Set the lesson's row to **Done** with open-item count.
- **Open Items section:** Add heading with unresolved items (diagram rendering, flagged TODOs).
- **What's Next section:** Update next lesson, remaining count, move topic to ~~Done~~ list.

### 2. Auto-commit

Stage all lesson files and commit with a meaningful message:
```
feat(content): complete [topic-code] lesson, [N]-question practice pool
```

### 3. Announce

Tell the user what was updated and committed. Tell them to run `/course-generate-lesson {next-topic}`, or `/course-generate-exam` if all topics are done.

**HARD-GATE:** Do not invoke the next lesson or exam automatically. Terminal state: approved, committed, next command told to the user.

---

## Error Handling

- WebSearch empty → ask the user for an alternative source.
- Incomplete agent output → re-run that agent only, not all agents.
- Fact-check critical errors → apply fixes, flag truly ambiguous items as TODOs.
- Scope-reviewer major violations → may indicate the boundary map needs adjustment.
- **codex-mode researcher failure** → re-run that specific `codex exec` once. If it fails again, fall back to a Claude subagent for that artifact only; continue the rest of the pipeline in codex-mode.
- **codex-mode author failure** (empty output, wrong file, schema invalid) → re-run that specific `codex exec` author once. If it fails again, fall back to the claude-mode author for that artifact only; continue the rest of the pipeline in codex-mode.
- **codex-mode fact-list pre-pass failure** → skip Stage 3a and pass full file paths to Claude adversarial reviewer (legacy behavior). Note the skip in state file.
- **codex-mode fix failure** → fall back to Strategy A (parallel Claude subagents). Do NOT retry codex for fixes.
- **Consolidator subagent failure** → main reads the 3 review files itself (legacy behavior) and builds the fix brief. Note this regression in the state file so it can be diagnosed.
- Gemini/Codex CLI not authenticated → tell the user to run `gemini` interactively once / `codex login`, then retry.
- Gemini/Codex CLI timeout (>5 min) → kill, note in report, continue with remaining reviewers.
- Fix agent rate limit / failure → switch to Strategy B (batched main-context fixes). Do not retry the agents.
- **Compaction mid-run** → before any user-visible action, read `/tmp/lesson-{topic-code}-state.json` to recover paths and `stages_completed`. Resume from the next uncompleted stage. Do not re-derive the brief from syllabus files unless the state file is missing.
- Re-running a topic overwrites all files for that topic. Old versions live in git history.
