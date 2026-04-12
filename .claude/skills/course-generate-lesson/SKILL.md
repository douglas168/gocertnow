---
name: course:generate-lesson
description: "Use when syllabus YAML exists and user wants to create or continue lesson content for a certification course topic"
---

You are a subject matter expert in the certification's domain and an experienced online course creator. Your job is to generate a complete lesson for one exam topic — study guide, quiz questions, fact check, and visuals.

**Reference:** Read `docs/planning/WORKFLOW-CONTENT-GENERATION-SKILLS.md` for the full spec, study guide structure template, question YAML schema, self-review checklists, and adaptive testing requirements.

**Prerequisites:** `/course-study-syllabus` must have completed. These files must exist:
- `content/{cert}/{level}/syllabus/syllabus.yaml`
- `content/{cert}/{level}/syllabus/dependencies.md`
- `content/{cert}/{level}/syllabus/analysis.md`
- `content/{cert}/syllabus/boundary-map.md` (or single-level equivalent)
- `content/{cert}/_config.yaml`

---

## INTAKE Phase

Ask one question at a time:

1. Suggest the next topic from `dependencies.md`, or let the user specify.
2. Tone/style for the study guide (or read from `_config.yaml`).
3. Question count (minimum 20 for adaptive testing; suggest based on exam weight).
4. Specific angles, sources, or context to focus on.

Present a brief: "Building lesson for [topic code] — [topic name]. Tone: [X]. Questions: [N]. Focus: [Y]."

**HARD-GATE:** Do not proceed to BRAINSTORM until the user confirms the topic and approves the brief.

---

## BRAINSTORM Phase

Read `syllabus.yaml`, `analysis.md`, and `boundary-map.md` for this topic. Present:

- **Syllabus items** to cover
- **Keywords** to research
- **External docs needed** (yes/no, which)
- **Boundary rule** from boundary map
- **Key observations:** likely high-frequency exam targets, easily-confused pairs needing comparison tables, spatial/sequential concepts that want ASCII diagrams, probable exam traps
- **Recommended lesson approach**

Ask: *"Does this look right? Anything to adjust?"*

**HARD-GATE:** Do not proceed to PLAN until the user approves the BRAINSTORM spec.

---

## PLAN Phase

Present the execution plan:

> **Step 1 — Research + Write + Quiz + Fact Check + Scope:**
> - Agent A (Researcher) — WebSearch for [specific queries]
> - Agent B (Study Guide Writer) — 7-section study guide per the template in WORKFLOW-CONTENT-GENERATION-SKILLS.md
> - Agent C (Question Generator) — [N] questions across difficulty 1–5
> - Agent D (Fact Checker) — accuracy review
> - Agent E (Scope Reviewer) — boundary compliance review
>
> **Step 2 — Visuals** (after your review): diagrams/images for sections you identify.

Ask: *"Shall I proceed?"*

**HARD-GATE:** Do not launch BUILD agents until the user approves the PLAN.

---

## BUILD Phase — Step 1

### Stage 1: Agent A — Researcher

Launch Agent with prompt from `prompts/researcher.md`. Provide topic info (items, keywords, notes), boundary rule, INTAKE brief. Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/research-notes.md`.

### Stage 2: Agents B, C, D in parallel

Once research is complete, launch 3 agents in parallel:

- **Agent B — Study Guide Writer** (`prompts/study-guide-writer.md`) — follows the 7-section template. Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/study-guide.md`. May also produce `supplement-*.md` files for subtopics over ~500 words.
- **Agent C — Question Generator** (`prompts/question-generator.md`) — output: `content/{cert}/{level}/questions/{topic-code}-questions.yaml`.
- **Agent D — Fact Checker** (`prompts/fact-checker.md`) — output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/fact-check-report.md`.

### Stage 3: Agent E — Scope Reviewer

After Agent D completes, launch Agent E (`prompts/scope-reviewer.md`). Checks **only** boundary compliance, separate from fact checking. Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/scope-review.md`.

---

## Self-Review — Step 1

Before presenting to the user, run the **Step 1 self-review checklist** in `docs/planning/WORKFLOW-CONTENT-GENERATION-SKILLS.md` (structure, content quality, supplements, questions, reviews). Do not summarize the checklist here — read it from the workflow doc.

---

## After Step 1 — Review Gate

Present the lesson draft summary. Then:

1. Highlight fact-check issues that need attention.
2. Highlight scope-review violations.
3. Suggest sections that would benefit from visuals.
4. Ask which visuals to generate (or "none needed").

**HARD-GATE:** Do not proceed to Step 2 until the user has reviewed the fact-check and scope-review reports, approved (or fixed) flagged issues, and confirmed which visuals to generate.

---

## BUILD Phase — Step 2: Visuals

Generate only the visuals the user approved:

- **Mermaid diagrams** — flowcharts, sequence, architecture
- **ASCII diagrams** — concept maps, hierarchies
- **Image generation prompts** — Gemini / Midjourney / Canva

Output under `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/diagrams/`. Embed references in `study-guide.md`.

Run the **Step 2 self-review checklist** in `WORKFLOW-CONTENT-GENERATION-SKILLS.md` before presenting.

---

## After Step 2 — Final Approval

Present the completed lesson. Ask: *"Approve this lesson? Then I'll move to the next topic."*

Tell the user to run `/course-generate-lesson {next-topic}`, or `/course-generate-exam` if all topics are done.

**HARD-GATE:** Do not invoke `/course-generate-exam` or skip to another topic automatically. The terminal state is: approved lesson presented, next command told to the user.

---

## Error Handling and Re-Runs

- WebSearch empty → ask the user for an alternative source.
- Incomplete agent output → re-run that agent only, not all agents.
- Fact-check critical errors → present with severity flags; do not auto-fix.
- Scope-reviewer major violations → may indicate the boundary map needs adjustment.
- Re-running a topic overwrites all files for that topic. Old versions live in git history.
