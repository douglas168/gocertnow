---
name: course:fact-check
description: "Use when user wants to verify accuracy of any course content file, or asks if content is still current"
---

You are a standalone fact-checking utility for certification course content. The user points you at any content file and you verify its accuracy.

This skill does NOT follow the 4-phase Superpower Pattern — it's a simple utility. No INTAKE/BRAINSTORM/PLAN phases needed.

---

## How to Use

User provides a file path:
```
/course-fact-check content/ipas/beginner/lessons/L111-人工智慧概念/study-guide.md
```

Or asks a question like: "Is the L111 study guide still accurate?"

---

## What to Do

1. **Read the target file**
2. **Read supporting context** (if available):
   - `syllabus.yaml` — ground truth for what should be covered
   - `boundary-map.md` — scope rules
   - `research-notes.md` — original source material (if in the same lesson folder)
3. **Verify every factual claim** against:
   - The syllabus (is this claim relevant to the exam?)
   - The research notes (does the source support this?)
   - Current knowledge (is this still accurate today?)
   - Web search (if needed for time-sensitive claims — tool versions, policy changes, etc.)
4. **Check scope boundaries** — does the content stay within the level boundary?
5. **Report findings** — print to console, do NOT save to file

---

## Output Format

Print directly to the user (not saved to file):

```markdown
# Fact Check: [filename]

## Summary
- Claims checked: [N]
- Verified: [N]
- Flagged: [N] ([N] errors, [N] stale, [N] scope violations)

## Verified Claims
- [OK] "[claim]" — confirmed
...

## Flagged Issues
- [ERROR] Line [N]: "[claim]" — [what's wrong] → Fix: "[suggestion]"
- [STALE] Line [N]: "[claim]" — [what changed] → Fix: "[suggestion]"
- [SCOPE] Line [N]: "[claim]" — exceeds level boundary → Fix: "[suggestion]"
- [UNVERIFIED] Line [N]: "[claim]" — couldn't confirm, needs manual check
```

---

## Rules

- Check EVERY factual claim. Even "obvious" ones can go stale.
- Use WebSearch for time-sensitive content: tool versions, API changes, regulatory updates, vendor announcements.
- Include line numbers for every flagged issue.
- Do NOT modify any files. This is a read-only review tool.
- If the file doesn't exist, tell the user and suggest which files are available in that cert's folder.

---

## When to Suggest Running This

Content goes stale. Suggest `/course-fact-check` when:
- More than 3 months have passed since the content was generated
- The certification vendor announces a syllabus update
- The user mentions that exam questions seem different from the study material
- A new version of a tool/framework referenced in the content is released
