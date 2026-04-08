---
name: course:generate-exam
description: "Use when all lesson topics are complete and user wants to assemble mock exams from the question bank"
---

You are assembling adaptive mock exams from the accumulated question bank. Your job is to create realistic exam simulations that match the real exam format and use computer adaptive testing.

**Reference:** Read `docs/planning/WORKFLOW-CONTENT-GENERATION-SKILLS.md` for the full spec — adaptive testing algorithm, difficulty calibration, exam configuration format.

**Prerequisites:** All (or most) topics must have completed `/course:generate-lesson`. Question files must exist in `content/{cert}/{level}/questions/`.

---

## INTAKE Phase

Ask **one question at a time**:

1. **"How many mock exams should I generate?"** — suggest 3. More = better variety for students retaking.
2. **"Should the mock exams use adaptive testing?"** — suggest yes, explain: "Adaptive testing adjusts question difficulty based on performance — stronger students get harder questions, struggling students get easier ones. More accurate assessment with fewer questions."
3. **"Any specific exam format requirements beyond what's in the syllabus?"** — e.g., section-based timing, question type mix

Present a brief summarizing preferences.

<HARD-GATE>
Do NOT proceed to BRAINSTORM until the user has approved the INTAKE brief.
</HARD-GATE>

---

## BRAINSTORM Phase

Scan the `questions/` folder. Read all `{topic-code}-questions.yaml` files. Read `syllabus.yaml` for exam format and topic weights. Analyze the question bank:

Present:
> **Bank status**: [N] questions across [M] topics
> - [Topic]: [N] questions (Level 1: X, Level 2: X, Level 3: X, Level 4: X, Level 5: X)
> - ...
>
> **Missing topics**: [any without questions]
> **Exam format from syllabus**: [N] questions, [M] minutes, passing score [P]%
>
> **Key observations:**
> - [Difficulty distribution gaps]
> - [Topics needing more questions for adaptive coverage]
> - [Overall bank health]
>
> **Recommended approach**: [adaptive vs fixed, exam count, any gaps to address]

<HARD-GATE>
Do NOT run /course:generate-exam if any topics in dependencies.md are missing
from the questions/ folder. Present the gap and ask the user to complete
missing topics first, or explicitly confirm they want to proceed with
an incomplete bank.
</HARD-GATE>

Ask: **"Does this look right?"**

<HARD-GATE>
Do NOT proceed to PLAN until the user has approved the BRAINSTORM analysis.
</HARD-GATE>

---

## PLAN Phase

Present the execution plan:

> **Agent A — Exam Assembler**: Build [N] adaptive mock exams, [M] questions each.
>   Topic coverage weighted by exam weights. Difficulty: start at 3, step ±1.
> **Agent B — Distractor Checker**: Review all [total] wrong-answer options for quality.
> **Agent C — Explanation Enhancer**: Add "why students pick this" + "how to remember" to every question.
>
> All 3 agents run in parallel.
> Self-review: [checklist items]

Ask: **"Shall I proceed?"**

<HARD-GATE>
Do NOT launch BUILD agents until the user has approved the PLAN.
</HARD-GATE>

---

## BUILD Phase

Launch **3 agents in parallel** using prompt templates from `prompts/`:

**Agent A — Exam Assembler** (prompt: `prompts/exam-assembler.md`)
- Builds `mock-exam-config.yaml` with adaptive testing parameters
- Builds `mock-exam-{NN}.yaml` files — each is a question pool with topic coverage and difficulty distribution
- Output: `content/{cert}/{level}/exams/`

**Agent B — Distractor Quality Checker** (prompt: `prompts/distractor-checker.md`)
- Reviews every wrong-answer option across the entire bank
- Flags: obviously wrong distractors, duplicate distractors, distractors that don't test real misconceptions
- Output: `content/{cert}/{level}/questions/distractor-review.md`

**Agent C — AI Explanation Enhancer** (prompt: `prompts/explanation-enhancer.md`)
- For each question, enhances wrong-answer explanations
- Adds: "why students commonly pick this wrong answer" + "how to remember the right answer"
- Output: updated `{topic-code}-questions.yaml` files

---

## Self-Review (before presenting to user)

- [ ] Question bank has sufficient depth at each difficulty level for adaptive algorithm
- [ ] Every topic is represented proportionally in each mock exam
- [ ] Mock exam config matches real exam format (question count, time limit)
- [ ] Distractor review completed — no flagged issues left unresolved
- [ ] All wrong-answer explanations are present and non-empty

---

## After BUILD

Present summary. Tell user:
> "Review `distractor-review.md` for any remaining issues.
> Review `mock-exam-config.yaml` for adaptive testing settings.
>
> Course content pipeline complete."

---

## Error Handling

- If question bank is too thin for adaptive testing: flag specific gaps, suggest generating more questions for those topics
- If Agent B and C both modify the same question file: Agent B flags issues, Agent C enhances explanations — different fields, minimal conflict risk. If conflict occurs, Agent B's fixes take priority (correctness > enhancement).
- Never silently swallow errors.

## Re-Run Policy

Overwrite mock exam files and distractor review. Does NOT touch per-topic question files (those are owned by `/course:generate-lesson`).
