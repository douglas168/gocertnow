# Content Generation Skills — Multi-Agent Claude Code Pipeline

**Purpose:** A set of Claude Code skills (slash commands) that use parallel subagents to generate certification course content end-to-end. Each skill adopts the persona: *"You are a subject matter expert in [course material] and an experienced online course creator. You are building an exam-prep course for [certification name]."* The user tells the skill which certification to build a course for — the skill takes it from there: finds the syllabus, studies the exam scope, generates study guides, writes quizzes, creates video scripts, and assembles mock exams. Skills ask the user clarifying questions one at a time when they need input, rather than assuming or guessing.

**Inspiration:** Obo AI's multi-agent architecture — one AI writes content, another fact-checks it, a third creates quizzes, all working simultaneously. We apply the same pattern using Claude Code's native Agent tool. Enhanced with patterns from [obra/superpowers](https://github.com/obra/superpowers) — hard gates, anti-rationalization rules, skill chaining with terminal states, two-stage review, and CSO-optimized skill descriptions.

**Skill persona pattern:** Every skill starts by assuming the role of an expert in the certification's subject matter. The user does NOT need to be a domain expert — the skill is the expert. The user says "build me a course for [cert name]" and the skill does the rest: locates the official syllabus, researches the material, generates all content artifacts, and presents them for review. The user's role is to answer clarifying questions when asked and approve/reject generated content.

---

## The Superpower Pattern

Every content generation skill follows the same 4-phase flow, modeled after the existing `/intake` → `/brainstorm` → `/plan` → build workflow:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   INTAKE     │────▶│  BRAINSTORM  │────▶│    PLAN      │────▶│    BUILD     │
│ (interview)  │     │  (design)    │     │ (task list)  │     │  (execute)   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       │                   │                    │                    │
       ▼                   ▼                    ▼                    ▼
  Ask questions       Explore approaches   Present execution   Self-review output
  one at a time       present design spec  plan for approval   then present to user
  using template      for approval                                  │
       │                   │                    │                    ▼
       ▼                   ▼                    ▼               User approves
  Produce structured  User approves        User approves       or requests changes
  brief/spec          or redirects         or adjusts
```

### How each phase maps to the existing superpowers workflow

| Phase | Content Generation | Existing Superpowers Equivalent |
|---|---|---|
| **INTAKE** | Interview the user about the cert, source materials, audience, language. Produce a structured brief. | `/intake` — template-driven questionnaire, one question at a time, produces `STATUS.md` |
| **BRAINSTORM** | Deep analysis of the syllabus/topic. Explore approaches, identify challenges, present a design spec with trade-offs and recommendations. | `/brainstorm` — explore architecture, data model, user flows, edge cases. Write design spec. |
| **PLAN** | Create a concrete execution plan: which agents run, what they produce, in what order. Present the task breakdown for approval. | `/plan` — ordered task list with file paths, phases, dependencies, testing checklist. |
| **BUILD** | Launch agents, generate content, self-review, present output. Test and verify against the plan. | Superpowers build — subagent-driven execution with two-stage review. |

### Rules

1. **Never skip phases.** Every skill runs all 4 phases in order: Intake → Brainstorm → Plan → Build.
2. **Ask one question at a time.** During INTAKE, never dump a list of 5 questions. Wait for each answer before asking the next. Adapt follow-up questions based on answers — skip what doesn't apply. Prefer multiple-choice questions when possible.
3. **Present and wait.** After each phase, present the output and explicitly ask for approval before proceeding. The user may say "looks good, proceed" or "change X first."
4. **Remember context.** Each phase builds on the previous. The BUILD phase uses the approved PLAN, which uses the approved BRAINSTORM spec, which uses the INTAKE brief. No phase starts from scratch.
5. **Self-review before every gate.** Before presenting output to the user, the skill runs its own quality checklist (see [Self-Review Checklists](#self-review-checklists)). Catch obvious issues before the user has to.
6. **Fresh subagent per task.** Each topic gets fresh agents — never carry over context from a previous topic. Prevents context pollution and stale assumptions.

### Hard Gates

Borrowed from obra/superpowers. Hard gates are absolute blocks — the skill must NOT proceed past them without explicit user approval.

```
<HARD-GATE>
Do NOT proceed to BRAINSTORM until the user has answered all INTAKE
questions and explicitly approved the structured brief.
</HARD-GATE>

<HARD-GATE>
Do NOT proceed to PLAN until the user has reviewed and approved
the BRAINSTORM design spec. "Looks good" counts. Silence does not.
</HARD-GATE>

<HARD-GATE>
Do NOT launch BUILD agents until the user has reviewed and approved
the PLAN. "Looks reasonable" counts. Silence does not.
</HARD-GATE>

<HARD-GATE>
Do NOT move to the next topic until the user has approved the
current lesson's study guide, questions, and visuals.
</HARD-GATE>
```

### Anti-Rationalization Rules

LLMs are susceptible to rationalizing shortcuts. These rules close the most common loopholes:

| Red Flag | What You're Tempted To Do | Why It's Wrong | What To Do Instead |
|---|---|---|---|
| "The user probably wants me to skip ahead" | Jump to BUILD without INTAKE/BRAINSTORM/PLAN | You don't know what the user wants — ask | Follow all 4 phases. Every time. |
| "This topic is simple, I don't need research" | Skip Agent A (Researcher) | Even simple topics have exam-specific angles you'll miss | Run research. Let the user decide what's enough. |
| "The boundary map says X, but this content would be better if..." | Exceed the level boundary | Boundaries exist for business reasons, not just pedagogy | Respect the boundary. Flag it for the user if you disagree. |
| "I'll just generate 10 questions instead of 20" | Under-produce for adaptive testing | Adaptive testing breaks with thin question banks | Hit the minimum. Ask the user if they want fewer. |
| "The fact check found issues but they're minor" | Skip presenting the fact check report | "Minor" issues in exam content can cause students to fail | Always present the full report. Let the user decide what's minor. |
| "I already know what visuals this needs" | Generate diagrams without asking | The user may have specific visual preferences or brand guidelines | Always ask first, suggest second. |

### Common Rationalizations (Do NOT Follow These)

- "The user said 'looks good' for the last topic, so I can skip the review gate for this one." — **No. Every topic gets its own review gate.**
- "This cert only has one level, so I can skip boundary mapping." — **No. Define depth boundaries against free alternatives.**
- "The research didn't find much, so the study guide will be short." — **No. Flag the gap to the user and ask if they want additional sources.**
- "The user seems busy/impatient, I should combine steps." — **No. The phases exist to catch errors early. Rushing creates rework.**

---

## Design Principles

1. **Syllabus is ground truth.** Every skill reads from structured syllabus data. No content is generated without a clear mapping to an exam topic. The syllabus source can be anything — a PDF, a URL, multiple URLs, or a combination — but `/course:study-syllabus` always normalizes it into a structured YAML before downstream skills run.
2. **Source-agnostic ingestion.** Every certification vendor publishes their exam scope differently. Some provide a downloadable PDF, others a web page, others spread it across multiple URLs. Some only give you a bullet-point list on a registration page. `/course:study-syllabus` handles all of these and produces the same structured YAML output regardless of input format.
3. **Boundary-aware.** Many certifications have tiered levels (e.g., Fundamentals → Associate → Professional, or Beginner → Intermediate → Expert). When a student buys Level 1, the content must not bleed into Level 2 — and Level 2 must not repeat Level 1. Explicit boundary rules enforce clean separation so each course delivers distinct value.
4. **Parallel by default.** Each skill launches multiple agents simultaneously during the BUILD phase. Sequential steps only where one agent's output feeds another.
5. **Human-in-the-loop.** Skills generate drafts. Between every phase, the skill pauses and asks for approval. When a skill needs clarification (e.g., target audience, preferred tone, how deep to go on a subtopic), it asks one question at a time rather than guessing.
6. **Reusable across verticals.** Skills are cert-agnostic. The syllabus YAML is the only cert-specific input. Adding a new certification means running `/course:study-syllabus` on a new source — not building new skills.
7. **Adaptive testing.** All questions are tagged with a 1–5 difficulty level based on Bloom's Taxonomy. The mock exam and quiz systems use computer adaptive testing (CAT) — question difficulty adjusts based on the student's performance in real time.
8. **Traditional Chinese + English key terms.** All course content is written in Traditional Chinese (繁體中文) by default. Every technical term includes the English name and abbreviation on first use: `聯邦學習（Federated Learning）`. This is non-negotiable for exam prep — the real exams mix Chinese and English terminology, and students must recognize both.

---

## Skill Overview

```
/course:study-syllabus → produces course outline + exam format metadata + _config.yaml
       │
       ▼
/course:generate-lesson {topic} → one topic at a time, sequential
       │
       ├─ Step 1: Research + study guide + questions + fact check
       ├─ Step 2: User reviews, identifies where images/diagrams needed
       ├─ Step 3: Generate images/diagrams for approved spots
       ├─ User approves lesson → next topic
       │
       ▼ (repeat for all topics)
       │
/course:generate-exam → assembles adaptive mock exam(s) from question bank
```

| # | Skill | Purpose | Depends On |
|---|---|---|---|
| 0 | `/course:study-syllabus` | Parse exam syllabus, map dependencies, define scope boundaries, capture exam format | Syllabus source (PDF, URL, or both) |
| 1 | `/course:generate-lesson` | Research + study guide + questions + fact check + images/diagrams for one topic | Skill 0 outputs |
| 2 | `/course:generate-exam` | Build adaptive mock exam(s) from accumulated question bank | Skill 1 outputs (all topics completed) |

**Supporting utility:**

| Skill | Purpose |
|---|---|
| `/course:fact-check` | Standalone verification of any content file, anytime |

### Skill Chaining & Terminal States

Each skill declares its **only** valid next step. This prevents skipping steps in the pipeline:

| Skill | Terminal State | Valid Next Step |
|---|---|---|
| `/course:study-syllabus` | Syllabus YAML + boundary map generated and approved | `/course:generate-lesson {first-topic}` |
| `/course:generate-lesson` | Current topic approved | `/course:generate-lesson {next-topic}` OR `/course:generate-exam` (if all topics done) |
| `/course:generate-exam` | Mock exams generated and approved | Pipeline complete |

```
<HARD-GATE>
/course:study-syllabus MUST NOT invoke /course:generate-lesson. It presents the syllabus
outputs and tells the user to run /course:generate-lesson when ready.
/course:generate-lesson MUST NOT invoke /course:generate-exam. It tells the user to run
/course:generate-exam when all topics are complete.
Each skill is a standalone session. The user initiates the next step.
</HARD-GATE>
```

### CSO — Skill Description Optimization

Skill descriptions in YAML frontmatter must describe **WHEN to trigger**, never WHAT the skill does. If the description summarizes the workflow, the AI follows the summary instead of reading the full skill definition.

```yaml
# WRONG — summarizes what the skill does (AI will follow this instead of reading SKILL.md)
description: "Parses exam syllabus, maps dependencies, defines boundaries, and generates YAML"

# RIGHT — describes when to trigger (AI reads the full SKILL.md for instructions)
description: "Use when the user wants to start building a course for a new certification, provides an exam syllabus PDF or URL, or asks about exam scope"
```

---

## Skill File Structure

Skills are grouped by domain under `.claude/skills/`. The `course/` group contains all content generation skills. Future groups (`social/`, `ops/`) follow the same pattern.

```
.claude/
├── skills/
│   ├── ui-ux-pro-max/                             # existing — standalone
│   │   ├── SKILL.md
│   │   ├── data/
│   │   └── scripts/
│   ├── course/                                    # ← content generation group
│   │   ├── study-syllabus/
│   │   │   ├── SKILL.md                           # Invoked as /course:study-syllabus
│   │   │   └── prompts/
│   │   │       ├── structure-extractor.md         # Agent A prompt template
│   │   │       ├── dependency-mapper.md           # Agent B prompt template
│   │   │       ├── depth-analyzer.md              # Agent C prompt template
│   │   │       └── boundary-definer.md            # Agent D prompt template
│   │   ├── generate-lesson/
│   │   │   ├── SKILL.md                           # Invoked as /course:generate-lesson
│   │   │   └── prompts/
│   │   │       ├── researcher.md                  # Agent A prompt template
│   │   │       ├── study-guide-writer.md          # Agent B prompt template
│   │   │       ├── question-generator.md          # Agent C prompt template
│   │   │       ├── fact-checker.md                # Agent D (accuracy)
│   │   │       └── scope-reviewer.md              # Agent E (boundary compliance)
│   │   ├── generate-exam/
│   │   │   ├── SKILL.md                           # Invoked as /course:generate-exam
│   │   │   └── prompts/
│   │   │       ├── exam-assembler.md
│   │   │       ├── distractor-checker.md
│   │   │       └── explanation-enhancer.md
│   │   └── fact-check/
│   │       └── SKILL.md                           # Invoked as /course:fact-check
│   ├── social/                                    # ← future: social media marketing
│   │   ├── generate-post/
│   │   ├── generate-caption/
│   │   └── generate-image-card/
│   └── ops/                                       # ← future: operations/automation
│       ├── exam-failure-extension/
│       └── content-refresh/
├── commands/
│   ├── intake.md                                  # existing — /intake
│   ├── brainstorm.md                              # existing — /brainstorm
│   └── plan.md                                    # existing — /plan
└── hooks/
    └── session-start.md                           # Injects meta-skill awareness
```

### Skill Grouping Convention

Skills are grouped by domain using directory nesting. The invocation uses colon syntax:

| Group | Skill | Invocation |
|---|---|---|
| `course/` | `study-syllabus` | `/course:study-syllabus` |
| `course/` | `generate-lesson` | `/course:generate-lesson` |
| `course/` | `generate-exam` | `/course:generate-exam` |
| `course/` | `fact-check` | `/course:fact-check` |
| `social/` | `generate-post` | `/social:generate-post` *(future)* |
| `social/` | `generate-caption` | `/social:generate-caption` *(future)* |
| `ops/` | `content-refresh` | `/ops:content-refresh` *(future)* |

### Subagent Prompt Templates

Each agent gets a dedicated prompt template file with placeholder markers that the controller skill fills in at dispatch time:

```markdown
# content of .claude/skills/course/generate-lesson/prompts/study-guide-writer.md

You are a subject matter expert in [CERTIFICATION_NAME] writing a study guide
for the topic: [TOPIC_NAME] ([TOPIC_CODE]).

## Context
- Certification: [CERTIFICATION_NAME]
- Level: [LEVEL_NAME]
- Target audience: [TARGET_AUDIENCE]
- Language: [LANGUAGE]
- Tone: [TONE]

## Scope Boundary
[BOUNDARY_RULE]

## Research Notes
[RESEARCH_NOTES_CONTENT]

## Syllabus Items to Cover
[SYLLABUS_ITEMS]

## Instructions
[...detailed writing instructions...]

## Study Guide Structure
Follow the Study Guide Structure Template exactly. Produce all 7 sections in order:
1. Exam item mapping (syllabus codes)
2. 關鍵概念總覽圖 (ASCII knowledge tree)
3. Core concepts (with inline bilingual terms, 白話說明, ASCII diagrams, 🔥 markers)
4. Comparison tables (易混淆概念)
5. 口訣 / Mnemonics
6. 考試陷阱 (Exam Traps) — ❌→✅ format
7. 情境題快速判斷 (Scenario Quick-Judge) — keyword→answer lookup

## Output
Write the study guide to: content/[CERT_SLUG]/[LEVEL_SLUG]/lessons/[TOPIC_CODE]/study-guide.md
```

**Why separate files:** Prompt templates are the most frequently iterated artifact. Storing them as separate files means you can refine a prompt without touching the skill logic.

### Session-Start Hook

A hook injects awareness of the content generation skills at the start of every session:

```yaml
# .claude/hooks/session-start.md
# Injected as additionalContext at session start

You have access to grouped superpowers for building certification courses:

Course content generation (course/):
- /course:study-syllabus — Use when the user mentions a certification, exam, or course to build
- /course:generate-lesson — Use when syllabus YAML exists and user wants to create lesson content
- /course:generate-exam — Use when all lessons are complete and user wants mock exams
- /course:fact-check — Use when user wants to verify any content file

If the user mentions building a course or a certification name, invoke /course:study-syllabus.
If there is even a 1% chance a skill applies, invoke it rather than doing the work manually.
```

---

## Self-Review Checklists

Before presenting output to the user at any gate, the skill runs a self-review. This catches obvious issues before the user has to.

### After `/course:study-syllabus` BUILD

- [ ] `_config.yaml` is generated with cert name, vendor, levels, exam format, and content defaults
- [ ] Every topic in the source syllabus appears in `syllabus.yaml` — nothing dropped
- [ ] All topic codes are unique — no duplicates
- [ ] `exam_format` fields are populated (question count, time, passing score)
- [ ] `dependencies.md` covers every topic — no orphans
- [ ] `boundary-map.md` addresses every overlapping topic between levels
- [ ] No placeholder text ("TBD", "TODO", "to be determined") in any output file

### After `/course:generate-lesson` Step 1

**Study guide structure:**
- [ ] All 7 sections present in correct order: exam mapping → knowledge tree → core concepts → comparison tables → mnemonics → exam traps → scenario quick-judge
- [ ] Section 1 (exam mapping) references correct syllabus codes from `syllabus.yaml`
- [ ] Section 2 (knowledge tree) is an ASCII tree covering the full topic hierarchy
- [ ] Section 3 (core concepts) includes inline bilingual terminology for every technical term — format: `中文名稱（English Name, 縮寫）` on first use
- [ ] Section 3 includes 白話說明 (conversational analogy) after each formal definition — analogies use scenarios familiar to 18–35 year old Taiwanese (LINE, Instagram, Uber Eats, convenience stores, workplace life, university experience, popular apps)
- [ ] Section 3 includes ASCII diagrams where concepts are spatial/sequential
- [ ] Section 3 includes 🔥 importance markers on high-frequency exam points
- [ ] Section 4 (comparison tables) covers all easily confused concept pairs for this topic
- [ ] Section 5 (mnemonics) has at least one memory hook per major concept group
- [ ] Section 6 (exam traps) uses ❌→✅ format for each trap
- [ ] Section 7 (scenario quick-judge) has keyword→answer lookup entries

**Content quality:**
- [ ] Study guide covers every content item listed in `syllabus.yaml` for this topic
- [ ] Study guide does NOT exceed the boundary rule for this level
- [ ] No placeholder text in any output file

**Questions:**
- [ ] Question count meets the minimum (20 per topic for adaptive testing)
- [ ] Questions are distributed across all 5 difficulty levels (at least 3 per level)
- [ ] Every question is tagged with a valid content item code from `syllabus.yaml`

**Supplements:**
- [ ] If any subtopic exceeds ~500 words inline, a `supplement-*.md` file has been created
- [ ] All supplement files are linked from the study guide with 📖 延伸閱讀 format
- [ ] Supplement files follow the same inline element rules (bilingual terms, 白話說明, 🔥 markers)

**Reviews:**
- [ ] Fact check report has been generated — no silent failures
- [ ] Scope review has been generated — no silent failures

### After `/course:generate-lesson` Step 2

- [ ] Every diagram/image the user approved has been generated
- [ ] Mermaid diagrams render without syntax errors
- [ ] Diagram references are embedded in `study-guide.md`
- [ ] Image prompts are detailed enough to produce useful results

### After `/course:generate-exam` BUILD

- [ ] Question bank has sufficient depth at each difficulty level for adaptive algorithm
- [ ] Every topic is represented proportionally in each mock exam
- [ ] Mock exam config matches the real exam format (question count, time limit)
- [ ] Distractor review has been completed — no flagged issues left unresolved
- [ ] All wrong-answer explanations are present and non-empty

---

## Study Guide Structure Template

Every study guide generated by `/course:generate-lesson` follows this structure. The flow is designed as: **Orient → Learn → Compare → Memorize → Avoid traps → Exam strategy**.

### Section-Level Elements (standalone blocks, in this order)

| # | Section | Purpose | Description |
|---|---|---|---|
| **1** | **Exam Item Mapping** | Set expectations | Map the lesson to specific syllabus codes. "This lesson covers D1.1.1 + D1.1.2." Students know exactly what exam topics this prepares them for. |
| **2** | **關鍵概念總覽圖 (Knowledge Tree)** | Bird's eye view | ASCII tree diagram mapping the entire topic's knowledge hierarchy. Uses emoji markers, indentation levels, and inline notes. Students see how everything connects before diving into details. |
| **3** | **Core Concepts (the teaching content)** | The actual learning | Each concept taught with formal definition → conversational analogy → visual diagram (where applicable). This is the longest section. Inline elements (see below) are woven throughout. |
| **4** | **Comparison Tables (易混淆概念)** | Distinguish similar concepts | Side-by-side tables for easily confused concepts. Only after students have learned each concept individually — now sharpen the distinctions. |
| **5** | **口訣 / Mnemonics** | Lock in knowledge | Memory hooks, acronym tricks, rhyming patterns. E.g., 「量·速·多·真·值」for Big Data 5V. Short, sticky, exam-day recall aids. |
| **6** | **考試陷阱 (Exam Traps)** | Prevent common mistakes | ❌ wrong belief → ✅ correct understanding format. Now that students know the right answer, here's where people go wrong and why. |
| **7** | **情境題快速判斷 (Scenario Quick-Judge)** | Exam strategy capstone | "See keyword X → pick answer Y" lookup tables. Keyword-to-answer mapping for rapid exam-day decision making. |

### Inline Elements (woven into Section 3 throughout)

| Element | Where It Appears | Format |
|---|---|---|
| **Bilingual terminology** | Every technical term, every time | `聯邦學習（Federated Learning）` — Chinese name + English + abbreviation spelled out |
| **白話說明 (Conversational analogies)** | After each formal definition | 🗣️ marker. Analogies must resonate with **18–35 year old Taiwanese**: LINE, Instagram, Uber Eats, 7-11/全家, YouTube, 蝦皮, 104人力銀行, university group projects, first-job workplace scenarios, military service, rent in Taipei — not Silicon Valley or US-centric references |
| **ASCII visual diagrams** | Wherever a concept is spatial, sequential, or comparative | Flowcharts, curves, architecture diagrams, box plots — drawn in ASCII art within code blocks |
| **🔥 Importance markers** | On high-frequency exam points | 🔥 = important, 🔥🔥 = very frequently tested. Helps students prioritize study time. |

### Deep-Dive Supplement Files

When a subtopic is too complex for inline treatment within the study guide, `/course:generate-lesson` generates a standalone supplement file in the lesson's folder (e.g., a detailed box plot explainer, model evaluation metrics deep-dive). These are linked from the study guide.

### Example: How Section 3 Flows (Core Concepts)

```markdown
### 1-1 核心概念名稱

**正式定義：** 聯邦學習（Federated Learning）是一種...

> 🗣️ **白話說明：** 想像你和朋友各自有一本食譜，你們想合作
> 做出更好的菜，但都不想把食譜給對方看。聯邦學習就是...

｜ 概念 ｜ 說明 ｜ 例子 ｜
｜---｜---｜---｜
｜ ... ｜ ... ｜ ... ｜

```
[ASCII diagram if concept is spatial/sequential]
```

🔥🔥 高頻考點：聯邦學習的核心目的是「隱私保護」，不是提升運算效率。
```

---

## Skill 0: `/course:study-syllabus`

**SKILL.md frontmatter:**
```yaml
---
name: course:study-syllabus
description: "Use when the user wants to build a course for a new certification, provides an exam syllabus PDF or URL, or mentions an exam name"
---
```

**When to run:** Once per certification vertical, before any content generation. Re-run when the official syllabus is updated.

**Terminal state:** Present approved syllabus outputs. Tell user to run `/course:generate-lesson {first-topic}`.

```
<HARD-GATE>
Do NOT invoke /course:generate-lesson or any other content generation skill.
The terminal state of /course:study-syllabus is presenting the approved outputs
and telling the user what to run next.
</HARD-GATE>
```

**Why this comes first:** The #1 mistake in course creation is starting to write content before fully understanding what the exam actually tests. This skill studies the exam scope deeply — what's tested, what's not, where the boundaries are — before a single word of content is written. If anything is unclear, the skill asks the user before proceeding.

### INTAKE Phase

Template-driven interview. The skill asks the user questions **one at a time**, adapting based on answers:

1. **"What certification do you want to build a course for?"** — e.g., "Microsoft AI-900", "AWS Cloud Practitioner", "CompTIA Security+"
2. **"Do you have the exam syllabus or study guide? If so, provide a file path or URL."** — user may provide a PDF, a URL, or say "no, go find it"
   - If user says "no": the skill uses WebSearch to locate the official exam page and study guide, then confirms with the user: "I found this — is this the right one?"
3. **"Does this certification have multiple levels?"** — e.g., "Yes, beginner and intermediate" or "No, just one exam"
   - If yes: **"Do you have the syllabus for the other level(s) too?"** — needed for boundary mapping
   - If no: skip boundary mapping, or ask: **"Are there related certifications we should define boundaries against?"**
4. **"Who is the target student?"** — e.g., "Career switchers in Taiwan, ages 20-35" or "IT pros with 1-2 years experience"
5. **"Course content will be in Traditional Chinese with English key terms (繁體中文 + English terminology). Is that correct, or do you need a different language?"** — default is TC + English; only ask if the user indicates otherwise

After gathering answers, present a **structured brief** and ask: **"Does this look right? Anything to add or change?"**

```
<HARD-GATE>
Do NOT proceed to BRAINSTORM until the user has approved the INTAKE brief.
</HARD-GATE>
```

### BRAINSTORM Phase

The skill reads the syllabus source(s) and performs deep analysis. This is where the real expertise kicks in — the skill acts as a subject matter expert studying the exam scope:

- **Explore the syllabus structure**: How is it organized? What vendor style? How many subjects/topics/items?
- **Identify the exam format**: Question count, time limit, question types, passing score, whether the real exam is adaptive
- **Spot challenges**: Ambiguous items, external documents needed, topics that overlap between levels
- **Propose 2–3 approaches** for how to structure the course (if there are meaningful alternatives), with trade-offs and a recommendation

Present the design spec:

> "Here's what I found after studying the syllabus:
>
> **Exam structure**: [N] questions, [M] minutes, [types], passing score [P]%
> **Content scope**: [X] subjects, [Y] topics, [Z] content items across [level(s)]
>
> **Key observations:**
> - [Observation about scope, gaps, or challenges]
> - [Which topics are heaviest / most exam-weighted]
> - [External docs that need to be sourced]
> - [Cross-level overlaps that need boundary rules]
>
> **Recommended course structure**: [approach and rationale]
>
> **Outputs I'll produce:**
> 1. `_config.yaml` — cert settings (name, vendor, levels, exam format, content defaults)
> 2. `syllabus.yaml` — structured topic tree per level
> 3. `dependencies.md` — recommended lesson order
> 4. `analysis.md` — depth estimation + gaps that need research
> 5. `boundary-map.md` — scope rules between levels *(if multi-level)*
>
> Does this analysis look right? Any adjustments before I create the execution plan?"

```
<HARD-GATE>
Do NOT proceed to PLAN until the user has approved the BRAINSTORM design spec.
</HARD-GATE>
```

### PLAN Phase

Create a concrete execution plan — what agents will run, what they produce, in what order:

> "Here's my execution plan:
>
> **Stage 1**: Agent A (Structure Extractor) — parse syllabus into YAML. Format: [vendor style detected].
> **Stage 2** (after A completes): 3 agents in parallel:
>   - Agent B (Dependency Mapper) — analyze topic relationships, produce lesson order
>   - Agent C (Depth Analyzer) — evaluate each item's clarity and research needs
>   - Agent D (Boundary Definer) — define cross-level scope rules *(if multi-level)*
>
> Estimated outputs: [file list with paths].
>
> **Self-review after build**: [checklist items I'll verify before presenting to you]
>
> Shall I proceed?"

```
<HARD-GATE>
Do NOT launch BUILD agents until the user has approved the PLAN.
</HARD-GATE>
```

### BUILD Phase

Once approved, the skill runs in **2 stages** using dedicated prompt templates from `.claude/skills/course/study-syllabus/prompts/`:

**Stage 1:** Launch Agent A first — Agents B, C, D need its structured YAML output.
**Stage 2:** Once Agent A completes, launch Agents B, C, D in parallel.

#### Agent A — Structure Extractor

Prompt template: `prompts/structure-extractor.md`

Ingests the syllabus source(s) — PDF via Read, URLs via WebFetch — and normalizes into machine-readable YAML, one file per level. Different certification vendors organize their exam scope differently:

| Vendor Style | What Agent A Does |
|---|---|
| **Hierarchical table** (subject → topic → content item + notes) | Direct mapping to subjects → topics → items |
| **"Skills measured" sections** with bullet points (e.g., Microsoft) | Each section becomes a topic, bullets become items |
| **"Domain" + "Task Statement"** format with percentage weights (e.g., AWS) | Domains become subjects, task statements become items, weights preserved |
| **Numbered objectives** (e.g., CompTIA 1.1, 1.2, etc.) | Objective numbers become topic codes |
| **Flat bullet list** (minimal exam pages) | Agent infers hierarchy from indentation/grouping |

**Output:** `content/{cert}/{level}/syllabus/syllabus.yaml`

```yaml
certification: "Certification Name"
level: "Level Name"
updated: "2026-04"
sources:
  - type: pdf
    path: "exam-guide.pdf"
  - type: url
    url: "https://vendor.com/exam-page"
    fetched: "2026-04-07"

exam_format:
  total_questions: 60
  time_limit_minutes: 85
  passing_score: 70
  question_types:
    - multiple_choice
    - multiple_select         # if applicable
  adaptive: false             # whether the real exam is adaptive

subjects:
  - code: "D1"
    name: "Domain or Subject Name"
    weight: 25                          # exam weight %, if provided by vendor
    topics:
      - code: "D1.1"
        name: "Topic Name"
        items:
          - code: "D1.1.1"
            name: "Specific skill or knowledge area"
            keywords:
              - "keyword from exam guide details"
            notes: ""
            external_docs_needed: false
```

**Key fields:**
- `exam_format` — captures the real exam's structure. Used by `/course:generate-exam` to build realistic mock exams.
- `weight` — exam weight percentage if provided by the vendor. Helps prioritize content depth and question count.
- `keywords` — extracted from supplementary details in the exam guide. Becomes the research scope for `/course:generate-lesson`.
- `external_docs_needed` — flags items that reference specific documents (vendor whitepapers, regulatory frameworks) that must be sourced first.

#### Agent B — Dependency Mapper

Prompt template: `prompts/dependency-mapper.md`

Analyzes within-level topic relationships to determine optimal lesson order. Students absorb material better when concepts build on each other logically. This agent applies pedagogical expertise to codify that sequencing.

**Output:** `content/{cert}/{level}/syllabus/dependencies.md`

#### Agent C — Depth & Gap Analyzer

Prompt template: `prompts/depth-analyzer.md`

Evaluates each content item for clarity, scope, and research needs. Exam guides vary wildly in specificity — this agent identifies the gaps so the user knows what needs extra research.

**Output:** `content/{cert}/{level}/syllabus/analysis.md`

#### Agent D — Cross-Level Boundary Definer

Prompt template: `prompts/boundary-definer.md`

Compares all levels side-by-side and defines explicit scope rules. Prevents two costly mistakes: Level 1 going too deep, and Level 2 repeating Level 1.

**Output:** `content/{cert}/syllabus/boundary-map.md` (shared across levels)

**For single-level certs:** Agent D defines depth boundaries against free alternatives (YouTube, blog posts) to answer: "What depth do paying students expect?"

### Self-Review (before presenting to user)

Run the [self-review checklist](#after-coursestudy-syllabus-build).

### After BUILD — Present and Confirm

> "Here's what I generated:
> - **_config.yaml**: Cert settings — [level count], exam format, content defaults
> - **syllabus.yaml**: X subjects, Y topics, Z items. Exam: [N] questions, [M] minutes.
> - **dependencies.md**: Recommended lesson order (starting with [first topic])
> - **analysis.md**: N items need external research, M items are ambiguous
> - **boundary-map.md**: N overlapping topic areas with scope rules
>
> Review the files. When you're ready, run `/course:generate-lesson {first-topic-code}` to start building the first lesson."

---

## Skill 1: `/course:generate-lesson`

**SKILL.md frontmatter:**
```yaml
---
name: course:generate-lesson
description: "Use when syllabus YAML exists and user wants to create or continue lesson content for a certification course topic"
---
```

**When to run:** Once per topic, sequentially. Follow the lesson order from `dependencies.md`. Use TodoWrite to track which topics are complete and which are pending.

**Terminal state:** Present approved lesson. Tell user to run `/course:generate-lesson {next-topic}` or `/course:generate-exam` if all topics done.

```
<HARD-GATE>
Do NOT invoke /course:generate-exam or skip to another topic. The terminal state
is presenting the approved lesson and telling the user what to run next.
</HARD-GATE>
```

This is the workhorse skill. It runs through **3 steps** per topic, with a review gate between each:

```
Step 1: RESEARCH + WRITE + QUIZ + FACT CHECK
  ↓ self-review → present to user
Step 2: REVIEW — user marks where visuals are needed
  ↓ user approves visual plan
Step 3: GENERATE IMAGES/DIAGRAMS
  ↓ self-review → present to user → user approves lesson
```

### INTAKE Phase

Quick interview to confirm what we're building:

1. The skill suggests the next topic from the dependency order, or the user specifies one:
   > "Next topic based on the lesson order: **[topic code] — [topic name]**.
   > Shall I proceed with this one, or do you want a different topic?"

2. **"What tone/style should the study guide use?"** — or reads from `_config.yaml` if already set for this cert
3. **"How many questions should I generate for this topic?"** — suggests based on exam weight and adaptive testing needs (minimum 20–25 per topic for adaptive)
4. **"Any specific angles, sources, or context you want me to focus on for this topic?"**

Present a brief: "Building lesson for [topic code] — [topic name]. Tone: [X]. Questions: [N]. Focus: [Y]."

```
<HARD-GATE>
Do NOT proceed to BRAINSTORM until the user has confirmed the topic
and approved the INTAKE brief.
</HARD-GATE>
```

### BRAINSTORM Phase

The skill reads `syllabus.yaml`, `analysis.md`, and `boundary-map.md` for this topic and performs deep analysis:

> "Here's what I found after studying this topic:
>
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
> **Recommended lesson approach**: [how to structure the teaching flow for this specific topic]
>
> Does this look right? Anything to adjust?"

```
<HARD-GATE>
Do NOT proceed to PLAN until the user has approved the BRAINSTORM design spec.
</HARD-GATE>
```

### PLAN Phase

Create the concrete execution plan:

> "Here's my execution plan:
>
> **Step 1 — Research + Write + Quiz + Fact Check:**
> - Agent A (Researcher): Web search for [specific queries]
> - Agent B (Study Guide Writer): 7-section study guide:
>   1. Exam item mapping → [syllabus codes]
>   2. Knowledge tree → full topic hierarchy as ASCII tree
>   3. Core concepts → [N] concepts with bilingual terms, analogies, ASCII diagrams
>   4. Comparison tables → [N] easily confused concept pairs identified
>   5. Mnemonics → memory hooks for key concept groups
>   6. Exam traps → ❌→✅ format for common mistakes
>   7. Scenario quick-judge → keyword→answer lookup table
> - Agent C (Question Generator): [N] questions at difficulty levels 1–5
> - Agent D (Fact Checker): Accuracy review
> - Agent E (Scope Reviewer): Boundary compliance review
>
> **Step 2 — Visuals** (after your review):
> - Generate diagrams/images for sections you identify
>
> **Self-review checklist**: [items I'll verify before presenting]
>
> Shall I proceed?"

```
<HARD-GATE>
Do NOT launch BUILD agents until the user has approved the PLAN.
</HARD-GATE>
```

### BUILD Phase — Step 1: Research + Write + Quiz + Fact Check

**Stage 1:** Launch **Agent A (Researcher)** first — other agents need its output.

Prompt template: `prompts/researcher.md`

- Uses WebSearch to find current, authoritative sources for the topic
- Searches for official vendor docs, exam prep communities, current industry standards, regulatory documents
- Output: `content/{cert}/{level}/lessons/{topic-code}/research-notes.md`

**Stage 2:** Once research is complete, launch **3 agents in parallel:**

- **Agent B — Study Guide Writer** (prompt: `prompts/study-guide-writer.md`): Generates the study guide from research following the [Study Guide Structure Template](#study-guide-structure-template). Produces all 7 sections in order: exam item mapping → knowledge tree → core concepts (with inline bilingual terms, analogies, ASCII diagrams, 🔥 markers) → comparison tables → mnemonics → exam traps → scenario quick-judge. Respects boundary rules. Writes in the course's target language and tone.
- **Agent C — Question Generator** (prompt: `prompts/question-generator.md`): Creates questions tagged by content item and difficulty level (1–5). See [Adaptive Testing & Difficulty Levels](#adaptive-testing--difficulty-levels).
- **Agent D — Fact Checker (Accuracy)** (prompt: `prompts/fact-checker.md`): Cross-references the study guide against research and current knowledge. Flags factual errors and stale info.

**Stage 3:** After Agent D completes, launch **Agent E — Scope Reviewer:**

Prompt template: `prompts/scope-reviewer.md`

- Separate from the fact checker — checks ONLY boundary compliance
- Verifies the study guide does not exceed the level boundary
- Flags any content that belongs in a different level
- This two-stage review (accuracy THEN scope) prevents a single reviewer from deprioritizing either concern

**Output:**
- `content/{cert}/{level}/lessons/{topic-code}/research-notes.md`
- `content/{cert}/{level}/lessons/{topic-code}/study-guide.md`
- `content/{cert}/{level}/questions/{topic-code}-questions.yaml`
- `content/{cert}/{level}/lessons/{topic-code}/fact-check-report.md`
- `content/{cert}/{level}/lessons/{topic-code}/scope-review.md`

### Self-Review (before presenting to user)

Run the [self-review checklist](#after-coursegenerate-lesson-step-1).

### After Step 1 — Review Gate

> "Lesson draft for [topic]:
> - **Study guide**: [summary of what's covered]
> - **Questions**: [N] total — Level 1: X, Level 2: X, Level 3: X, Level 4: X, Level 5: X
> - **Fact check**: [N] verified, [N] flagged
> - **Scope review**: [N] items within boundary, [N] flagged as out of scope
>
> Please review:
> 1. **Fact check report** — [N] issues need your attention
> 2. **Scope review** — [N] boundary violations to resolve
> 3. **Study guide** — which sections need images or diagrams?
>    (I'll suggest some, but you may have specific visual needs)"

The skill suggests sections that would benefit from visuals:

> "I recommend visuals for these sections:
> - Section 2.1: Comparison table → could be a **visual comparison diagram**
> - Section 3.3: Process flow → could be a **flowchart**
> - Section 4.1: Architecture overview → could be a **system diagram**
>
> Want me to generate these? Add or remove any?"

```
<HARD-GATE>
Do NOT proceed to Step 2 until the user has:
1. Reviewed the fact check and scope review reports
2. Approved (or fixed) any flagged issues
3. Confirmed which visuals to generate (or said "none needed")
</HARD-GATE>
```

### BUILD Phase — Step 2: Generate Images/Diagrams

Once the user approves which sections need visuals, the skill generates them:

- **Mermaid diagrams** — flowcharts, sequence diagrams, architecture diagrams (rendered natively in markdown)
- **Comparison tables** — formatted for visual clarity
- **ASCII diagrams** — for simple concept maps or hierarchies
- **Image generation prompts** — detailed prompts the user can feed into Gemini, Midjourney, or Canva for custom illustrations

**Output:**
- `content/{cert}/{level}/lessons/{topic-code}/diagrams/` — Mermaid files, image prompts
- Updated `study-guide.md` with diagram references embedded

### Self-Review (before presenting to user)

Run the [self-review checklist](#after-coursegenerate-lesson-step-2).

### After Step 2 — Final Approval

> "Lesson complete for [topic]:
> - Study guide with [N] embedded diagrams/visuals
> - [N] questions (difficulty 1–5)
> - All fact check and scope issues resolved
>
> Approve this lesson? Then I'll move to the next topic: **[next topic code] — [next topic name]**."

User approves → update TodoWrite progress → skill tells user to run `/course:generate-lesson {next-topic}`.

When all topics are done:

> "All [N] lessons complete. Question bank has [total] questions across [M] topics.
> Run `/course:generate-exam` to assemble adaptive mock exams."

---

## Skill 2: `/course:generate-exam`

**SKILL.md frontmatter:**
```yaml
---
name: course:generate-exam
description: "Use when all lesson topics are complete and user wants to assemble mock exams from the question bank"
---
```

**When to run:** After all topics have completed `/course:generate-lesson`.

**Terminal state:** Present approved mock exams. Pipeline complete.

```
<HARD-GATE>
Do NOT run /course:generate-exam if any topics in dependencies.md are missing
from the questions/ folder. Present the gap and ask the user to complete
missing topics first, or explicitly confirm they want to proceed with
an incomplete bank.
</HARD-GATE>
```

### INTAKE Phase

1. **"How many mock exams should I generate?"** — more = better variety for students retaking
2. **"Should the mock exams use adaptive testing?"** — suggests yes, explains the benefit
3. **"Any specific exam format requirements beyond what's in the syllabus?"** — e.g., section-based timing, question type mix

Present a brief summarizing exam configuration preferences.

```
<HARD-GATE>
Do NOT proceed to BRAINSTORM until the user has approved the INTAKE brief.
</HARD-GATE>
```

### BRAINSTORM Phase

The skill scans the `questions/` folder and performs a deep analysis of the question bank:

> "Here's what I found after analyzing the question bank:
>
> **Bank status**: [N] questions across [M] topics
> - [Topic]: [N] questions (Level 1: X, Level 2: X, Level 3: X, Level 4: X, Level 5: X)
> - [Topic]: [N] questions (...)
> - ...
>
> **Missing topics**: [any topics without questions yet]
> **Exam format from syllabus**: [N] questions, [M] minutes, passing score [P]%
>
> **Key observations:**
> - [Difficulty distribution gaps — any level under-represented?]
> - [Topics that need more questions for adaptive coverage]
> - [Overall bank health for adaptive testing]
>
> **Recommended approach**: [adaptive vs fixed, how many exams, any bank gaps to address]
>
> Does this look right?"

```
<HARD-GATE>
Do NOT proceed to PLAN until the user has approved the BRAINSTORM analysis.
</HARD-GATE>
```

### PLAN Phase

> "Here's my execution plan:
>
> **Agent A — Exam Assembler**: Build [N] adaptive mock exams, [M] questions each.
>   Topic coverage weighted by exam weights. Difficulty: start at 3, step ±1.
> **Agent B — Distractor Checker**: Review all [total] wrong-answer options for quality.
> **Agent C — Explanation Enhancer**: Add "why students pick this" + "how to remember" to every question.
>
> All 3 agents run in parallel.
>
> **Self-review checklist**: [items I'll verify before presenting]
>
> Shall I proceed?"

```
<HARD-GATE>
Do NOT launch BUILD agents until the user has approved the PLAN.
</HARD-GATE>
```

### BUILD Phase

Launches **3 agents in parallel** using dedicated prompt templates:

- **Agent A — Exam Assembler** (prompt: `prompts/exam-assembler.md`): Builds mock exam configuration files with adaptive testing rules. Ensures the question bank has sufficient depth at each difficulty level.
- **Agent B — Distractor Quality Checker** (prompt: `prompts/distractor-checker.md`): Reviews every wrong answer option across the entire bank. Ensures they're plausible, distinct, and test real misconceptions.
- **Agent C — AI Explanation Enhancer** (prompt: `prompts/explanation-enhancer.md`): For each question, enhances wrong-answer explanations. Adds "why students commonly pick this wrong answer" + "how to remember the right answer."

**Output:**
- `content/{cert}/{level}/exams/mock-exam-config.yaml` — adaptive testing configuration
- `content/{cert}/{level}/exams/mock-exam-01.yaml` (and -02, -03, etc.) — question pools per exam
- `content/{cert}/{level}/questions/distractor-review.md`
- Updated `{topic-code}-questions.yaml` files with enhanced explanations

### Self-Review (before presenting to user)

Run the [self-review checklist](#after-coursegenerate-exam-build).

### After BUILD

> "Mock exams generated:
> - [N] adaptive exams, [M] questions each
> - Distractor review: [N] weak options flagged and fixed
> - Explanations enhanced for all [total] questions
>
> Review `distractor-review.md` for any remaining issues.
> Review `mock-exam-config.yaml` for adaptive testing settings.
>
> Course content pipeline complete."

---

## Adaptive Testing & Difficulty Levels

### The 1–5 Difficulty Scale (Bloom's Taxonomy)

Every question generated by `/course:generate-lesson` is tagged with a difficulty level:

| Level | Bloom's Category | What It Tests | Question Pattern |
|---|---|---|---|
| 1 | **Remember** | Direct recall — definitions, facts | "What is X?" / "Which term describes X?" |
| 2 | **Understand** | Comprehension — explain, interpret | "Which statement about X is correct?" |
| 3 | **Apply** | Application — use concept in a scenario | "In this situation, which approach is best?" |
| 4 | **Analyze** | Analysis — compare, distinguish, evaluate | "What is the key difference between X and Y in context Z?" |
| 5 | **Evaluate/Create** | Synthesis — multi-concept, tricky distractors, judgment calls | "Given constraints A, B, and C, which solution addresses all three?" |

### Adaptive Testing Algorithm

The platform uses computer adaptive testing (CAT) — the same approach used by GRE, GMAT, and many modern certification exams:

```
Start at difficulty 3 (medium)
  │
  ├─ Correct answer → next question difficulty + 1 (cap at 5)
  ├─ Wrong answer   → next question difficulty - 1 (floor at 1)
  │
  ├─ Select next question at target difficulty
  │  Prefer a topic not yet covered (ensure coverage)
  │  If no question available at exact difficulty, pick closest
  │
  └─ After all questions: final score = f(difficulty level where student stabilizes)
```

**Why adaptive is better:**
- Strong students aren't bored by easy questions — the test ramps up fast
- Struggling students aren't demoralized by a wall of hard questions — the test adapts down
- More accurate assessment with fewer questions (a 30-question adaptive test ≈ 60-question fixed test)
- Every question feels like a challenge — more engaging experience

### Question Bank Requirements for Adaptive Testing

| Requirement | Fixed Exam | Adaptive Exam |
|---|---|---|
| Questions per topic | 10–15 sufficient | **20–25 minimum** |
| Difficulty distribution | Can cluster in medium | **Must be even across 1–5** |
| Minimum per difficulty per topic | No minimum | **At least 3–4 questions per level** |

Target distribution per topic (20 questions):

```yaml
difficulty_distribution:
  1: 4    # Remember
  2: 4    # Understand
  3: 4    # Apply
  4: 4    # Analyze
  5: 4    # Evaluate/Create
```

### Difficulty Calibration

AI-generated difficulty ratings are estimates. After launch, real student data calibrates them:

**Auto-calibration formula (post-launch, via scheduled n8n job):**

```
For each question, after N student attempts (minimum 20):
  actual_pass_rate = correct_answers / total_attempts

  If actual_pass_rate > 80% → difficulty is overrated → lower by 1
  If actual_pass_rate < 30% → difficulty is underrated → raise by 1
  If 30% ≤ actual_pass_rate ≤ 80% → difficulty is calibrated → no change

  Apply change, reset counter, recalibrate again after next 20 attempts
```

**Target pass rates by difficulty level:**

| Level | Target Pass Rate | Meaning |
|---|---|---|
| 1 | 85–95% | Most students get this right |
| 2 | 70–85% | Majority correct, some confusion |
| 3 | 50–70% | Coin flip for average student |
| 4 | 30–50% | Only well-prepared students get this |
| 5 | 15–30% | Expert-level, most students miss |

This creates a virtuous cycle: AI generates initial ratings → students take exams → data recalibrates → ratings become more accurate → adaptive algorithm becomes more precise.

### Exam Configuration

```yaml
# content/{cert}/{level}/exams/mock-exam-config.yaml
exam_mode: "adaptive"
total_questions: 30                  # fewer needed with adaptive
starting_difficulty: 3
difficulty_range: [1, 5]
step_up: 1                          # difficulty increase on correct answer
step_down: 1                        # difficulty decrease on wrong answer
topic_coverage: true                # ensure all topics are tested
time_limit_minutes: 85              # from exam_format in syllabus.yaml
passing_threshold: "stabilize_at_3" # pass = student stabilizes at difficulty 3+

scoring:
  method: "difficulty_weighted"      # higher difficulty correct = more points
  weights:
    1: 1
    2: 2
    3: 3
    4: 4
    5: 5
```

---

## Question YAML Schema

Every question generated by `/course:generate-lesson` follows this schema:

```yaml
- id: "L111-Q01"                         # {topic-code}-Q{NN}
  topic_code: "L111"                     # syllabus topic code
  item_code: "L11101"                    # syllabus content item code
  difficulty: 3                          # 1–5 (Bloom's Taxonomy)
  question: "問題文字（繁體中文）"
  options:
    a: "選項 A"
    b: "選項 B"
    c: "選項 C"
    d: "選項 D"
  correct: "b"
  explanation:
    why_correct: "為什麼 B 是正確的..."
    why_not_a: "為什麼 A 是錯的 — 常見混淆原因"
    why_not_c: "為什麼 C 是錯的..."
    why_not_d: "為什麼 D 是錯的..."
  keywords:                              # for search/filtering
    - "關鍵字1"
    - "keyword-en"
  exam_trap: false                       # true if this tests a common misconception
```

**Required fields:** `id`, `topic_code`, `item_code`, `difficulty`, `question`, `options`, `correct`, `explanation`
**Optional fields:** `keywords`, `exam_trap`

---

## Error Handling

### When an agent fails

| Failure | What Happens | Recovery |
|---|---|---|
| **WebSearch returns nothing** (Agent A Researcher) | Present to user: "I couldn't find sources for [topic]. Can you provide a URL or file?" | User provides source, re-run research only |
| **PDF/URL can't be parsed** (Agent A Extractor) | Present error details to user: "I couldn't parse [source]. Format: [what was found]" | User provides alternative source or pastes content directly |
| **Agent produces incomplete output** | Self-review catches it: "Study guide missing Section 6 (Exam Traps). Re-generating." | Skill re-runs the failed agent only, not all agents |
| **Fact check finds critical errors** | Present to user with severity flags — do NOT auto-fix | User decides: fix manually, re-run with guidance, or accept |
| **Scope reviewer flags major violations** | Present to user — may indicate the boundary map needs adjustment | User may update boundary-map.md, then re-run lesson |

**General rule:** Never silently swallow errors. Always present failures to the user with enough context to decide next steps.

### When a skill is interrupted mid-BUILD

All state is in the files. Partially generated files will exist on disk. When the user re-runs the skill for the same topic, the skill checks for existing files:
- If partial files exist: ask the user "I found existing files for [topic]. Overwrite and regenerate, or resume from where I left off?"
- The user decides. Default recommendation: overwrite (clean slate is simpler than merging).

---

## Re-Run & Update Policy

**Overwrite by default.** When a skill is re-run for a topic/cert that already has generated content:

| Scenario | Behavior |
|---|---|
| Re-run `/course:study-syllabus` on same cert | Overwrites `syllabus.yaml`, `dependencies.md`, `analysis.md`, `boundary-map.md`, `_config.yaml`. Old versions are in git history. |
| Re-run `/course:generate-lesson` on same topic | Overwrites all files in the lesson folder + question file. |
| Re-run `/course:generate-exam` | Overwrites mock exam files + distractor review. Does NOT touch per-topic question files. |
| Syllabus updated by vendor | Re-run `/course:study-syllabus`. Then diff the new YAML against the old (git diff). Re-run `/course:generate-lesson` only for topics that changed. |

**Git is the version control system.** Commit generated content before re-running. The diff shows exactly what changed.

---

## Content-to-Website Mapping

The generated content files are the **source of truth** for the Next.js website. This section describes how content flows from the `content/` folder into the product.

### How generated files map to website routes

| Generated File | Website Route | How It Gets There |
|---|---|---|
| `study-guide.md` | `/learn/[slug]/[lesson]` — Lesson player | Parsed at build time or loaded via Supabase. The 7-section structure maps directly to the lesson page layout. |
| `{topic-code}-questions.yaml` | `/learn/[slug]/quiz/[section]` — Section quiz | Questions imported into Supabase `questions` table. Quiz page queries by `topic_code`. |
| `mock-exam-config.yaml` + `mock-exam-*.yaml` | `/exam/[slug]` — Mock exam | Config + question pool loaded into Supabase. Adaptive algorithm runs in Edge Function. |
| `syllabus.yaml` | `/courses/[slug]` — Course detail page | Parsed to generate course outline, topic list, and lesson count on the sales page. |
| `_config.yaml` | `/courses/[slug]` — Course detail page | Exam format info (question count, time limit, passing score) displayed to prospective students. |
| `diagrams/*.mermaid` | `/learn/[slug]/[lesson]` — Lesson player | Rendered inline in the study guide. Mermaid.js renders client-side. |

### Import pipeline (future milestone)

The content-to-website pipeline is a **separate milestone** — not part of the content generation skills. But the content skills must produce files in formats that the import pipeline can consume:

1. **Study guides** → Markdown with predictable section headings (the 7-section template ensures this)
2. **Questions** → YAML following the Question YAML Schema (parseable, importable to Supabase)
3. **Exam config** → YAML with adaptive testing parameters (consumed by Edge Function)
4. **Diagrams** → Mermaid format (rendered by Mermaid.js on the frontend)

The import pipeline will read from `content/{cert}/{level}/` and push to Supabase. This is documented separately when that milestone is built.

---

## Deep-Dive Supplement Files

When a subtopic is too complex for inline treatment within the study guide (e.g., a detailed box plot explainer, model evaluation metrics deep-dive, statistical concept walkthrough), `/course:generate-lesson` generates a standalone supplement file.

### When to create a supplement

Agent B (Study Guide Writer) creates a supplement when:
- A subtopic would exceed ~500 words if covered inline — it would break the study guide's reading flow
- The subtopic is referenced by multiple lessons (e.g., "confusion matrix" appears in both L112 and L113)
- The subtopic requires extensive ASCII diagrams or worked examples that would overwhelm the main guide

### File location and naming

Supplement files live inside the lesson folder that first introduces the concept:

```
content/{cert}/{level}/lessons/L112-資料處理與分析概念/
├── study-guide.md                          ← main guide, links to supplement
├── supplement-盒鬚圖詳解.md                ← deep-dive on box plots
├── supplement-模型評估指標詳解.md           ← deep-dive on evaluation metrics
└── diagrams/
```

**Naming convention:** `supplement-{topic-name-zh}.md`

### How the study guide references supplements

In the study guide, a brief inline summary with a link:

```markdown
> 📖 **延伸閱讀：** 盒鬚圖的完整解構（五個關鍵數字、偏態判斷、考試陷阱）
> → 詳見 [盒鬚圖詳解](supplement-盒鬚圖詳解.md)
```

### Self-review addition

The `/course:generate-lesson` Step 1 checklist should verify:
- If any supplement files were generated, they are linked from the study guide
- Supplement files follow the same inline element rules (bilingual terms, 白話說明, 🔥 markers)

---

## `/course:fact-check` — Standalone Utility

**SKILL.md frontmatter:**
```yaml
---
name: course:fact-check
description: "Use when user wants to verify accuracy of any course content file, or asks if content is still current"
---
```

**When to run:** Anytime, on any content file. No phases needed.

Content goes stale. Exam syllabi get updated. Tools get deprecated. This skill lets you point at any file and ask "is this still accurate?"

**Input:** File path to check (any `.md` or `.yaml` content file)

**What it does:**
- Reads the file
- Reads `syllabus.yaml` and `boundary-map.md` for context
- Verifies factual claims against syllabus, research, and current knowledge
- Uses web search if needed to verify current accuracy
- Reports: verified claims, flagged errors, scope violations, suggestions
- Output: printed to console (review tool, not saved to file)

---

## File Structure After Full Pipeline

Lesson folders use the naming convention `{topic-code}-{topic-name-zh}` — machine-readable code prefix for natural sorting + human-readable Chinese name.

```
content/{cert}/
├── _config.yaml                                         ← cert-specific settings
├── syllabus/
│   └── boundary-map.md                                  ← /course:study-syllabus, Agent D
├── {level}/                                             # e.g., "beginner", "intermediate"
│   ├── syllabus/
│   │   ├── syllabus.yaml                                ← /course:study-syllabus, Agent A
│   │   ├── dependencies.md                              ← /course:study-syllabus, Agent B
│   │   └── analysis.md                                  ← /course:study-syllabus, Agent C
│   ├── lessons/
│   │   ├── L111-人工智慧概念/                            # folder per topic, sorted by code
│   │   │   ├── study-guide.md                           ← 7-section study guide
│   │   │   ├── supplement-*.md                          ← deep-dive files (if needed)
│   │   │   ├── research-notes.md                        ← web research output
│   │   │   ├── fact-check-report.md                     ← accuracy review
│   │   │   ├── scope-review.md                          ← boundary compliance
│   │   │   └── diagrams/
│   │   │       ├── concept-map.mermaid
│   │   │       ├── process-flow.mermaid
│   │   │       └── image-prompts.md
│   │   ├── L112-資料處理與分析概念/
│   │   │   └── ... (same structure)
│   │   ├── L113-機器學習概念/
│   │   ├── L114-鑑別式AI與生成式AI概念/
│   │   ├── L121-No-Code-Low-Code概念/
│   │   ├── L122-生成式AI應用領域與工具使用/
│   │   └── L123-生成式AI導入評估規劃/
│   ├── questions/                                       # separate — exam assembler scans here
│   │   ├── L111-questions.yaml                          ← per-topic question bank
│   │   ├── L112-questions.yaml
│   │   ├── ...
│   │   └── distractor-review.md                         ← /course:generate-exam, Agent B
│   └── exams/                                           # assembled from full question bank
│       ├── mock-exam-config.yaml                        ← adaptive testing settings
│       ├── mock-exam-01.yaml
│       └── mock-exam-02.yaml
└── {level-2}/
    └── ... (same structure)
```

### Folder Naming Convention

| Component | Format | Example |
|---|---|---|
| Cert slug | lowercase, hyphenated | `ipas`, `aws-ccp`, `ms-ai-900` |
| Level slug | lowercase | `beginner`, `intermediate`, `fundamentals` |
| Lesson folder | `{topic-code}-{name-zh}` | `L111-人工智慧概念` |
| Question file | `{topic-code}-questions.yaml` | `L111-questions.yaml` |
| Mock exam file | `mock-exam-{NN}.yaml` | `mock-exam-01.yaml` |

### Cert Config File

```yaml
# content/{cert}/_config.yaml
certification: "Full Certification Name"
vendor: "Vendor Name"
levels:
  - slug: "fundamentals"
    name: "Fundamentals"
    exam_code: "AI-900"
    language: "zh-TW"                               # Traditional Chinese + English key terms (default)
    target_audience: "Career switchers and beginners"
  - slug: "associate"
    name: "Associate"
    exam_code: "AI-102"
    language: "zh-TW"                               # Traditional Chinese + English key terms (default)
    target_audience: "Practitioners with 6-12 months experience"

content:
  questions_per_topic: 20           # minimum for adaptive testing
  mock_exams_to_generate: 3
  tone: "Encouraging mentor"        # default voice for study guides
```

---

## Skill Chaining — The Full Flow

```
User: /course:study-syllabus
  ↓ INTAKE: asks about cert, source, levels, audience, language (one at a time)
  ↓ <HARD-GATE> user approves structured brief
  ↓ BRAINSTORM: deep syllabus analysis, observations, recommended approach
  ↓ <HARD-GATE> user approves design spec
  ↓ PLAN: concrete agent execution plan + self-review checklist
  ↓ <HARD-GATE> user approves plan
  ↓ BUILD: launches 4 agents → YAML + dependencies + analysis + boundaries
  ↓ Self-review checklist
  ↓ Present to user → user reviews and approves
  ↓ Terminal: "Run /course:generate-lesson {first-topic} when ready"

User: /course:generate-lesson D1.1       (or skill suggests next topic)
  ↓ INTAKE: confirm topic, tone, question count, focus areas
  ↓ <HARD-GATE> user approves brief
  ↓ BRAINSTORM: deep topic analysis, observations, lesson approach
  ↓ <HARD-GATE> user approves design spec
  ↓ PLAN: agent execution plan (5 agents) + 7-section study guide structure
  ↓ <HARD-GATE> user approves plan
  ↓ BUILD Step 1: research → study guide + questions + fact check + scope review
  ↓ Self-review checklist
  ↓ Present to user → user reviews fact check + scope, picks visuals
  ↓ <HARD-GATE> user approves + confirms visual plan
  ↓ BUILD Step 2: generates diagrams + image prompts
  ↓ Self-review checklist
  ↓ Present to user → user approves lesson
  ↓ Update TodoWrite progress
  ↓ Terminal: "Run /course:generate-lesson {next-topic}"

... repeat for all topics ...

User: /course:generate-exam
  ↓ INTAKE: exam count, adaptive preference, format requirements
  ↓ <HARD-GATE> user approves brief
  ↓ BRAINSTORM: question bank analysis, gap identification, approach
  ↓ <HARD-GATE> user approves analysis
  ↓ PLAN: agent execution plan (3 agents) + exam configuration
  ↓ <HARD-GATE> user approves plan
  ↓ BUILD: assemble exams + distractor review + explanation enhancement
  ↓ Self-review checklist
  ↓ Present to user → user reviews mock exams
  ↓ Terminal: "Course content pipeline complete"
```

Each skill is a standalone session. The user can stop at any point and resume later — all state is in the files.

---

## Implementation Plan

### Phase 1: Build `/course:study-syllabus`
- Create `.claude/skills/course/study-syllabus/SKILL.md` and prompt templates
- Create session-start hook for skill awareness
- Test with the first certification's syllabus
- Iterate on brainstorm questions, YAML structure, and self-review quality
- This blocks all other skills

### Phase 2: Build `/course:generate-lesson`
- Create `.claude/skills/course/generate-lesson/SKILL.md` and prompt templates
- Create shared prompt templates in `content/_templates/`
- Test on the first topic from the dependency order
- Iterate on study guide quality, question difficulty calibration, two-stage review, and diagram generation

### Phase 3: Build `/course:generate-exam`
- Create `.claude/skills/course/generate-exam/SKILL.md` and prompt templates
- Needs accumulated questions from multiple `/course:generate-lesson` runs
- Implement adaptive testing configuration
- Test with the full question bank

### Phase 4: Build `/course:fact-check`
- Create `.claude/skills/course/fact-check/SKILL.md`
- Standalone, can be built anytime
- Most useful after initial content exists

---

## Relationship to n8n Pipeline

| | Claude Code Skills | n8n Pipeline |
|---|---|---|
| **Best for** | First-time content creation, interactive quality iteration | Batch production, automated publishing |
| **Interaction** | Intake → Brainstorm → Plan → Build with hard gates | Fire-and-forget, review async |
| **When to use** | Building the first course in a new cert vertical | Scaling production after quality is proven |

**Recommended workflow:**
1. Use Claude Code skills to create and perfect the first certification's content
2. Extract the proven prompt templates into `content/_templates/`
3. Wire those templates into the n8n pipeline for batch production

The skills are the R&D lab. n8n is the factory.

---

## Open Questions

1. **Past exam data:** For each certification, are past exam papers or official practice tests available? Past exam patterns significantly improve question quality and difficulty calibration.
2. **External documents:** Some exam topics reference specific external publications. Should skills attempt to fetch these via web search, or will they be provided as files?
3. **Question bank size:** Current default is 20 questions per topic (minimum for adaptive testing). Should this be higher for certs with more exam questions?
4. **Language support:** Should skills support generating the same content in multiple languages for the same cert?
5. **Adaptive scoring model:** The current proposal uses difficulty-weighted scoring. Should we also support IRT (Item Response Theory) scoring for more statistical precision, or is weighted scoring sufficient for launch?
