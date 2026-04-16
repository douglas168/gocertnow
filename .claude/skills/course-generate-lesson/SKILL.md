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

## Phase 1 — Combined Brief (INTAKE + BRAINSTORM + PLAN)

**Auto-derive everything. Do not ask the user individual questions.**

**⚠️ TOKEN BUDGET RULE:** Do NOT read research notes, prompt templates, workflow spec, or full study guide / questions YAML into the main conversation context. Pass file paths to agents — they read what they need. Main context compounds across every turn (~10 turns × N tokens = 10N effective).

**⚠️ PROMPT TEMPLATE PATH:** All prompt templates live in `.claude/skills/course-generate-lesson/prompts/` (NOT `content/{cert}/{level}/prompts/`). Do NOT search for them — use this path directly.

1. Read `dependencies.md` and `TODO.md` to identify the next topic (or use the user-specified topic).
2. Read `_config.yaml` for tone and pool sizes. Read the **depth tag** from the priority table in `TODO.md` to determine question count:
   - Shallow → `pool_size.shallow` (25)
   - Medium → `pool_size.medium` (30)
   - Deep → `pool_size.deep` (35)
3. Read `syllabus.yaml`, `analysis.md`, and `boundary-map.md` — extract ONLY the items for this topic. Do not read the full files if they are large.

Present **one combined brief** covering all three former phases:

```
## Lesson Brief: [topic-code] — [topic-name]

**Tone:** [from _config.yaml]  |  **Questions:** [N] ([depth] depth)

### Syllabus Items
- [items from syllabus.yaml]

### Keywords to Research
- [keywords]

### Boundary Rule
> [rule from boundary-map.md]

### Key Observations
- [high-frequency targets, confused pairs, exam traps, diagram candidates]

### Execution Plan
- Agent A (Researcher) → research-notes.md
- Agent B (Study Guide Writer) → study-guide.md (7-section template)
- Agent C (Question Generator) → [N] questions across difficulty 1–5
- Multi-model review (4 reviewers in parallel)
- Auto-fix all review findings
- Auto-generate diagrams
```

Ask: *"Approve this brief to start building?"*

**HARD-GATE:** Do not proceed to BUILD until the user approves the combined brief. This is the ONLY pre-build approval gate.

---

## Phase 2 — BUILD (runs uninterrupted after approval)

Everything below runs without asking the user any questions.

### Stage 1: Agent A — Researcher

Launch Agent with the researcher prompt (`prompts/researcher.md`). Include topic info (items, keywords), boundary rule, and brief **inline in the agent prompt** — do NOT tell it to read the prompt template file. Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/research-notes.md`.

### Stage 2: Agents B, C in parallel

Once research is complete, launch 2 agents in parallel. For each agent, include the prompt template content **inline in the agent prompt** — do NOT tell agents to read prompt files or research notes from main context. Pass the **file path** to `research-notes.md` so agents read it themselves.

- **Agent B — Study Guide Writer** (`prompts/study-guide-writer.md`) — follows the 7-section template. Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/study-guide.md`. May also produce `supplement-*.md` files for subtopics over ~500 words.
- **Agent C — Question Generator** (`prompts/question-generator.md`) — output: `content/{cert}/{level}/questions/{topic-code}-questions.yaml`.

### Stage 3: Self-Review

**Delegate to a subagent.** Do NOT read the study guide or questions YAML into main context for self-review. Launch an Agent with the checklist below inline and the file paths — let it read, verify, and report back.

Self-review checklist (include this in the agent prompt):
- All 7 study guide sections present in order: exam mapping → knowledge tree → core concepts → comparison tables → mnemonics → exam traps → scenario quick-judge
- Section 1 references correct syllabus codes
- Section 3 has bilingual terminology, 白話說明, ASCII diagrams, 🔥 markers
- Section 4 covers confused concept pairs; Section 5 has mnemonics; Section 6 uses ❌→✅; Section 7 has keyword→answer lookups
- Study guide covers every syllabus item, doesn't exceed boundary rule, no placeholder text
- Questions: count meets minimum (20+), distributed across 5 difficulty levels, tagged with valid item codes
- If supplements exist, they're linked from study guide with 📖 延伸閱讀 format

Do not present to user — fix issues inline and proceed.

### Stage 4: Multi-Model Review

**Always run all 3 reviewers. Never ask the user to choose.** Never offer Claude-only as an option.

Invoke `/course-multi-review` with the lesson folder path. This dispatches 3 reviewers in parallel:
- **Agent D — Fact & Scope Checker** (Claude subagent — combined fact-check + scope review, reads study guide once)
- **Agent F — Adversarial Reviewer** (Gemini CLI)
- **Agent G — Pedagogy Reviewer** (Codex CLI)

If Gemini or Codex CLI fails, continue with the remaining reviews.

### Stage 5: Apply All Fixes via 2 Parallel Subagents

After consolidating review findings, **delegate fix application to 2 parallel subagents**. Do NOT read the full study guide or questions YAML into the main conversation context.

Launch 2 Agents in parallel:
- **Fix Agent A — Study Guide Fixes**: file path to study-guide.md + the study-guide-specific fixes from the review
- **Fix Agent B — Questions Fixes**: file path to questions YAML + the questions-specific fixes from the review

Each agent reads only the file it needs, applies fixes, and reports a summary of changes. This halves the peak context vs. a single fix agent reading both files (~1300+ lines).

### Stage 6: Auto-Generate Diagrams

Decide which diagrams the lesson needs (typically 3–5). Create them all without asking.

- **Mermaid diagrams** — flowcharts, trees, comparisons
- **ASCII diagrams** — concept maps, hierarchies (already in study guide)
- **Image generation prompts** — for Gemini rendering later

Output under `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/diagrams/`. Embed diagram references in `study-guide.md`.

---

## Phase 3 — Final Presentation and Approval

Present the completed lesson with:

1. **Artifact summary table** (files created, line counts)
2. **Review summary** (issues found per reviewer, fixes applied)
3. **Diagram list** (what was generated)
4. **Remaining open items** (if any — e.g., diagram images need Gemini rendering)

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
- Gemini/Codex CLI failure → report failure, continue with remaining reviewers.
- Re-running a topic overwrites all files for that topic. Old versions live in git history.
