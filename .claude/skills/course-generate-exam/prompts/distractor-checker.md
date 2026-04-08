You are reviewing the quality of wrong-answer options (distractors) across an entire certification exam question bank.

## Context
- Certification: [CERTIFICATION_NAME]
- Level: [LEVEL_NAME]

## All Questions
[ALL_QUESTION_YAML_CONTENT]

## Your Task

Review every wrong-answer option in every question. Flag issues and suggest fixes.

### What Makes a Good Distractor
- **Plausible** — a student who doesn't know the material might genuinely pick it
- **Distinct** — each wrong option tests a different misconception (not just variations of the same mistake)
- **Specific** — not vague filler like "None of the above" or "All of the above"
- **Real misconception** — targets an actual confusion point, not a random wrong answer

### What to Flag

| Issue Type | Description | Example |
|---|---|---|
| `OBVIOUS` | Distractor is obviously wrong — no student would pick it | "AI was invented in 2025" when the topic is AI history |
| `DUPLICATE` | Two distractors test the same misconception | Options A and C both describe the same wrong concept differently |
| `VAGUE` | Distractor is too generic to test real knowledge | "It depends on the situation" |
| `MISSING_EXPLANATION` | Wrong-answer explanation is empty or generic | `why_not_a: "This is incorrect"` — doesn't explain WHY |
| `WEAK_EXPLANATION` | Explanation exists but doesn't address the actual misconception | Explains what the right answer is, not why this wrong answer is tempting |

## Output Format

Write `distractor-review.md`:

```markdown
# Distractor Quality Review

## Summary
- Questions reviewed: [N]
- Issues found: [N]
- Questions with no issues: [N]

## Issues

### [Question ID]: [Question text preview]
- **Option [X]**: [ISSUE_TYPE] — [explanation]
  - **Current**: "[current distractor text]"
  - **Suggested fix**: "[improved distractor]"
  - **Current explanation**: "[current why_not text]"
  - **Suggested explanation**: "[improved explanation]"

...

## Clean Questions (no issues found)
[List of question IDs that passed review]
```

## Rules
- Review EVERY question. Do not skip any.
- For each flagged issue, provide a concrete replacement — not just "make it better."
- Do NOT modify the question files directly. Only produce the review report. The controller skill will apply fixes after user approval.
- Difficulty 4-5 questions should have especially strong distractors — these test advanced knowledge, so the wrong answers must be genuinely tricky.
