---
name: course:multi-review
description: "Use after lesson content is generated (BUILD Step 1 complete) to run Claude + Gemini + Codex reviews in parallel for maximum coverage"
---

You orchestrate a multi-model review of a completed lesson. Four independent reviewers run **in parallel** — two Claude subagents plus Gemini CLI and Codex CLI — each with a different focus. Their reviews are consolidated into a single prioritized action list.

**Inspired by:** The dotLLM dual-review pattern — "the AI that writes the code should not be the only AI that reviews it." Different models have genuinely different blind spots.

---

## When to Use

- After `/course-generate-lesson` BUILD Step 1 completes (study guide + questions + research notes exist)
- As a standalone review of any finished lesson: `/course-multi-review content/ipas/beginner/lessons/L11101-AI的定義與分類`
- Before finalizing a lesson for production use

**Prerequisites:** The lesson folder must contain at minimum:
- `study-guide.md`
- `research-notes.md`
- Corresponding `questions/{topic-code}-questions.yaml`

These must also exist:
- `content/{cert}/{level}/syllabus/syllabus.yaml`
- `content/{cert}/syllabus/boundary-map.md`

---

## Input

User provides a lesson folder path or topic code:
```
/course-multi-review L11101
/course-multi-review content/ipas/beginner/lessons/L11101-AI的定義與分類
```

If only a topic code is given, resolve the full path from the content directory.

---

## Step 1 — Locate and Read Files

Read the following files to prepare context for all reviewers:

1. **Study guide:** `content/{cert}/{level}/lessons/{topic-folder}/study-guide.md`
2. **Research notes:** `content/{cert}/{level}/lessons/{topic-folder}/research-notes.md`
3. **Questions:** `content/{cert}/{level}/questions/{topic-code}-questions.yaml`
4. **Syllabus:** `content/{cert}/{level}/syllabus/syllabus.yaml` (extract this topic's items)
5. **Boundary map:** `content/{cert}/syllabus/boundary-map.md` (extract this topic's boundary rule)
6. **Supplements:** any `supplement-*.md` files in the lesson folder

If any required file is missing, tell the user and stop.

---

## Step 2 — Dispatch 4 Reviewers in Parallel

Launch **all four** agents simultaneously using the Agent tool. Each reviewer is independent — no dependencies between them.

### Agent D — Fact Checker (Claude subagent)

Use the prompt template from `prompts/fact-checker.md` (same as the one in `/course-generate-lesson`). Fill in the context variables. The agent writes its review to stdout (do not save to file yet).

Focus: **Every factual claim verified against sources, syllabus, and current knowledge.**

### Agent E — Scope Reviewer (Claude subagent)

Use the prompt template from `prompts/scope-reviewer.md` (same as the one in `/course-generate-lesson`). Fill in the context variables. The agent writes its review to stdout.

Focus: **Boundary-map compliance. No level drift.**

### Agent F — Adversarial Reviewer (Gemini CLI)

Launch a Claude subagent that:
1. Reads the prompt from `prompts/adversarial-reviewer.md`
2. Fills in the context (topic code, level, lesson content summary, file paths)
3. Writes a temporary prompt file at `/tmp/gemini-review-{topic-code}.md` with the filled prompt
4. Runs: `cat /tmp/gemini-review-{topic-code}.md | gemini -p "Read the prompt from stdin, then read the referenced files and complete the review." --approval-mode plan 2>&1`
5. Captures and returns Gemini's output

Focus: **Devil's advocate — weak explanations, misleading simplifications, missing edge cases, Taiwan-specific cultural errors.**

### Agent G — Pedagogy Reviewer (Codex CLI)

Launch a Claude subagent that:
1. Reads the prompt from `prompts/pedagogy-reviewer.md`
2. Fills in the context (topic code, level, question file path, study guide path)
3. Writes a temporary prompt file at `/tmp/codex-review-{topic-code}.md` with the filled prompt
4. Runs: `cat /tmp/codex-review-{topic-code}.md | codex exec 2>&1`
5. Captures and returns Codex's output

Focus: **Question quality — plausible distractors, real student misconceptions, difficulty calibration, explanation depth.**

---

## Step 3 — Consolidate Reviews

After all 4 agents complete, merge their findings into a unified report. Structure:

```markdown
# Multi-Model Review: [TOPIC_CODE] [TOPIC_NAME]

## Reviewers
| Reviewer | Model | Focus | Issues Found |
|---|---|---|---|
| Fact Checker | Claude | Factual accuracy | [N] |
| Scope Reviewer | Claude | Boundary compliance | [N] |
| Adversarial Reviewer | Gemini | Weak spots & edge cases | [N] |
| Pedagogy Reviewer | Codex | Question & explanation quality | [N] |

## Critical Issues (fix before approval)
_Issues flagged by 2+ reviewers, or any [ERROR] / [SCOPE] violation_

- **[SOURCE: Reviewer]** Line [N]: "[issue]" → Fix: "[suggestion]"
...

## Important Issues (should fix)
_Issues flagged by 1 reviewer with clear impact on student learning_

- **[SOURCE: Reviewer]** "[issue]" → Fix: "[suggestion]"
...

## Minor / Suggestions (nice to have)
_Style improvements, alternative explanations, enhancement ideas_

- **[SOURCE: Reviewer]** "[suggestion]"
...

## Cross-Reviewer Agreement
_Issues flagged by multiple reviewers (strongest signal):_

- "[issue]" — flagged by [Reviewer A] and [Reviewer B]
...

## Reviewer-Unique Finds
_Issues only one reviewer caught (this is why we use multiple models):_

- **Gemini only:** "[issue]"
- **Codex only:** "[issue]"
- **Claude Fact-Check only:** "[issue]"
- **Claude Scope only:** "[issue]"
```

---

## Step 4 — Present and Get Approval

Present the consolidated report to the user. Then ask:

1. "Which critical/important issues should I fix now?"
2. "Any suggestions you want to adopt?"
3. "Should I save this review report to the lesson folder?"

If the user wants fixes applied:
- Apply fixes to `study-guide.md` and/or `{topic-code}-questions.yaml`
- After fixing, **do NOT re-run all 4 reviewers**. Only re-run the specific reviewer(s) whose issues were addressed, if the user wants verification.

If the user wants the report saved:
- Save to `content/{cert}/{level}/lessons/{topic-folder}/multi-review-report.md`

---

## Rules

- **All 4 agents run in parallel.** Do not wait for one to finish before starting another.
- **Do not auto-fix.** Present issues and let the user decide what to fix.
- **Preserve reviewer attribution.** Every issue must say which model found it.
- **Highlight cross-reviewer agreement.** Issues found by 2+ models are highest confidence.
- **Highlight unique finds.** Issues found by only one model justify the multi-model approach.
- If Gemini or Codex CLI fails (timeout, auth error, rate limit), report the failure and present the remaining reviews. Do not block on a single reviewer's failure.
- Gemini CLI must run in `--approval-mode plan` (read-only). Never let it modify files.
- Codex CLI runs via `codex exec` (non-interactive). It reads files but should not modify them.

---

## Error Handling

- **Gemini CLI not authenticated:** Tell the user to run `gemini` interactively once to authenticate, then retry.
- **Codex CLI not authenticated:** Tell the user to run `codex login`, then retry.
- **CLI timeout (>5 minutes):** Kill the process and note the timeout in the report. The other 3 reviews are still valid.
- **Empty CLI output:** Flag as "reviewer returned no findings" — this is informative (no issues found by that model).
