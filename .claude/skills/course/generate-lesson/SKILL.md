---
name: course:generate-lesson
description: "Use when syllabus YAML exists and user wants to create or continue lesson content for a certification course topic"
---

You are a subject matter expert in the certification's domain and an experienced online course creator. Your job is to generate a complete lesson for one exam topic — study guide, quiz questions, fact check, and visuals.

**Reference:** Read `docs/planning/WORKFLOW-CONTENT-GENERATION-SKILLS.md` for the full spec, study guide structure template, question YAML schema, and adaptive testing requirements.

**Prerequisites:** `/course:study-syllabus` must have completed. The following files must exist:
- `content/{cert}/{level}/syllabus/syllabus.yaml`
- `content/{cert}/{level}/syllabus/dependencies.md`
- `content/{cert}/{level}/syllabus/analysis.md`
- `content/{cert}/syllabus/boundary-map.md` (or single-level equivalent)
- `content/{cert}/_config.yaml`

---

## INTAKE Phase

Quick interview to confirm what we're building. Ask **one question at a time**:

1. Suggest the next topic from the dependency order in `dependencies.md`, or let user specify:
   > "Next topic based on the lesson order: **[topic code] — [topic name]**.
   > Shall I proceed with this one, or do you want a different topic?"

2. **"What tone/style should the study guide use?"** — or read from `_config.yaml` if already set
3. **"How many questions should I generate for this topic?"** — suggest based on exam weight (minimum 20 for adaptive testing)
4. **"Any specific angles, sources, or context you want me to focus on?"**

Present a brief: "Building lesson for [topic code] — [topic name]. Tone: [X]. Questions: [N]. Focus: [Y]."

<HARD-GATE>
Do NOT proceed to BRAINSTORM until the user has confirmed the topic
and approved the INTAKE brief.
</HARD-GATE>

---

## BRAINSTORM Phase

Read `syllabus.yaml`, `analysis.md`, and `boundary-map.md` for this topic. Perform deep analysis:

Present:
> **Syllabus items**: [list of content items to cover]
> **Keywords to research**: [list from syllabus YAML]
> **External docs needed**: [yes/no — which ones]
> **Boundary rule**: [scope limit from boundary map]
>
> **Key observations:**
> - [Which subtopics are likely high-frequency exam targets]
> - [Concepts that will need comparison tables (easily confused pairs)]
> - [Areas where ASCII diagrams or visuals will help comprehension]
> - [Potential exam traps based on the topic's nature]
>
> **Recommended lesson approach**: [how to structure the teaching flow]

Ask: **"Does this look right? Anything to adjust?"**

<HARD-GATE>
Do NOT proceed to PLAN until the user has approved the BRAINSTORM design spec.
</HARD-GATE>

---

## PLAN Phase

Present the execution plan:

> **Step 1 — Research + Write + Quiz + Fact Check:**
> - Agent A (Researcher): Web search for [specific queries]
> - Agent B (Study Guide Writer): 7-section study guide:
>   1. Exam item mapping → [syllabus codes]
>   2. Knowledge tree → full topic hierarchy as ASCII tree
>   3. Core concepts → [N] concepts with bilingual terms, analogies, ASCII diagrams
>   4. Comparison tables → [N] easily confused concept pairs
>   5. Mnemonics → memory hooks for key concept groups
>   6. Exam traps → ❌→✅ format
>   7. Scenario quick-judge → keyword→answer lookup table
> - Agent C (Question Generator): [N] questions at difficulty 1–5
> - Agent D (Fact Checker): Accuracy review
> - Agent E (Scope Reviewer): Boundary compliance review
>
> **Step 2 — Visuals** (after your review):
> - Generate diagrams/images for sections you identify

Ask: **"Shall I proceed?"**

<HARD-GATE>
Do NOT launch BUILD agents until the user has approved the PLAN.
</HARD-GATE>

---

## BUILD Phase — Step 1

### Stage 1: Agent A — Researcher

Launch Agent with prompt from `prompts/researcher.md`.

- Provide: topic info from syllabus YAML (items, keywords, notes), boundary rule, INTAKE brief
- Agent uses WebSearch to find current, authoritative sources
- Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/research-notes.md`

### Stage 2: Agents B, C, D in parallel

Once research is complete, launch 3 Agents in parallel:

**Agent B — Study Guide Writer** (prompt: `prompts/study-guide-writer.md`)
- Provide: research notes, syllabus items, boundary rule, tone, language
- Follows the Study Guide Structure Template (7 sections + inline elements)
- Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/study-guide.md`
- May also produce `supplement-*.md` files for complex subtopics

**Agent C — Question Generator** (prompt: `prompts/question-generator.md`)
- Provide: research notes, syllabus items, question count, difficulty distribution
- Output: `content/{cert}/{level}/questions/{topic-code}-questions.yaml`

**Agent D — Fact Checker** (prompt: `prompts/fact-checker.md`)
- Provide: the study guide from Agent B, research notes, syllabus YAML
- Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/fact-check-report.md`

### Stage 3: Agent E — Scope Reviewer

After Agent D completes, launch Agent E (prompt: `prompts/scope-reviewer.md`):
- Provide: the study guide from Agent B, boundary rule from boundary-map.md
- Checks ONLY boundary compliance — separate from fact checking
- Output: `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/scope-review.md`

---

## Self-Review — Step 1 (before presenting to user)

**Study guide structure:**
- [ ] All 7 sections present in correct order
- [ ] Section 1 references correct syllabus codes
- [ ] Section 2 is an ASCII tree covering the full topic hierarchy
- [ ] Section 3 includes bilingual terminology for every technical term — format: `中文名稱（English Name, 縮寫）`
- [ ] Section 3 includes 白話說明 after each definition — analogies for 18–35 year old Taiwanese
- [ ] Section 3 includes ASCII diagrams where concepts are spatial/sequential
- [ ] Section 3 includes 🔥 markers on high-frequency exam points
- [ ] Section 4 covers all easily confused concept pairs
- [ ] Section 5 has at least one mnemonic per major concept group
- [ ] Section 6 uses ❌→✅ format for each trap
- [ ] Section 7 has keyword→answer lookup entries

**Content quality:**
- [ ] Study guide covers every content item in `syllabus.yaml` for this topic
- [ ] Study guide does NOT exceed the boundary rule
- [ ] No placeholder text in any output file

**Supplements:**
- [ ] If any subtopic exceeds ~500 words inline, a `supplement-*.md` file exists
- [ ] All supplement files linked from study guide with 📖 延伸閱讀 format

**Questions:**
- [ ] Question count meets minimum (20 per topic for adaptive testing)
- [ ] Questions distributed across difficulty levels 1–5 (at least 3 per level)
- [ ] Every question tagged with valid content item code

**Reviews:**
- [ ] Fact check report generated — no silent failures
- [ ] Scope review generated — no silent failures

---

## After Step 1 — Review Gate

Present the lesson draft summary. Then:

1. Highlight fact check issues that need attention
2. Highlight scope review violations
3. Suggest sections that would benefit from visuals
4. Ask the user which visuals to generate (or "none needed")

<HARD-GATE>
Do NOT proceed to Step 2 until the user has:
1. Reviewed the fact check and scope review reports
2. Approved (or fixed) any flagged issues
3. Confirmed which visuals to generate (or said "none needed")
</HARD-GATE>

---

## BUILD Phase — Step 2: Generate Images/Diagrams

Generate the visuals the user approved:

- **Mermaid diagrams** — flowcharts, sequence diagrams, architecture diagrams
- **ASCII diagrams** — concept maps, hierarchies
- **Image generation prompts** — for Gemini, Midjourney, or Canva

Output:
- `content/{cert}/{level}/lessons/{topic-code}-{topic-name-zh}/diagrams/`
- Updated `study-guide.md` with diagram references embedded

## Self-Review — Step 2

- [ ] Every diagram the user approved has been generated
- [ ] Mermaid diagrams render without syntax errors
- [ ] Diagram references embedded in `study-guide.md`
- [ ] Image prompts are detailed enough to produce useful results

---

## After Step 2 — Final Approval

Present the completed lesson. Ask: **"Approve this lesson? Then I'll move to the next topic."**

Tell the user to run `/course:generate-lesson {next-topic}` or `/course:generate-exam` if all topics are done.

<HARD-GATE>
Do NOT invoke /course:generate-exam or skip to another topic.
The terminal state is presenting the approved lesson and telling the user what to run next.
</HARD-GATE>

---

## Error Handling

- If WebSearch returns nothing: present to user, ask for alternative source
- If agent produces incomplete output: re-run that agent only, not all agents
- If fact check finds critical errors: present with severity flags, do NOT auto-fix
- If scope reviewer flags major violations: may indicate boundary map needs adjustment
- Never silently swallow errors.

## Re-Run Policy

Overwrite all files for this topic. Old versions are in git history.
