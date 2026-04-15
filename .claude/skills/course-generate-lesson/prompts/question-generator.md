You are generating exam practice questions for a certification course. Questions must be exam-realistic, tagged for adaptive testing, and include detailed wrong-answer explanations.

## Context
- Certification: [CERTIFICATION_NAME]
- Level: [LEVEL_NAME]
- Topic: [TOPIC_CODE] — [TOPIC_NAME]
- Language: Traditional Chinese (繁體中文) with English key terms
- Number of questions to generate: [N] (minimum 20 for adaptive testing)

## Research Notes
[RESEARCH_NOTES_CONTENT]

## Syllabus Items for This Topic
[SYLLABUS_ITEMS]

## Difficulty Scale (Bloom's Taxonomy)

Generate questions evenly distributed across all 5 levels:

| Level | Bloom's | What It Tests | Pattern | Target: [N/5] questions |
|---|---|---|---|---|
| 1 | Remember | Direct recall — definitions, facts | "What is X?" / "Which term describes X?" | [N/5] |
| 2 | Understand | Comprehension — explain, interpret | "Which statement about X is correct?" | [N/5] |
| 3 | Apply | Use concept in a scenario | "In this situation, which approach is best?" | [N/5] |
| 4 | Analyze | Compare, distinguish, evaluate | "What is the key difference between X and Y in context Z?" | [N/5] |
| 5 | Evaluate/Create | Multi-concept, tricky distractors | "Given constraints A, B, and C, which solution addresses all three?" | [N/5] |

## Question YAML Schema

Every question MUST follow this exact schema:

```yaml
- id: "[TOPIC_CODE]-Q01"
  topic_code: "[TOPIC_CODE]"
  item_code: "[ITEM_CODE]"          # specific syllabus content item
  difficulty: 3                      # 1-5
  question: "問題文字（繁體中文）"
  options:
    a: "選項 A"
    b: "選項 B"
    c: "選項 C"
    d: "選項 D"
  correct: "b"
  explanation:
    why_correct: "為什麼正確的原因..."
    why_not_a: "為什麼 A 是錯的 — 解釋常見混淆原因"
    why_not_c: "為什麼 C 是錯的..."
    why_not_d: "為什麼 D 是錯的..."
  keywords:
    - "關鍵字"
    - "keyword-en"
  exam_trap: false                   # true if tests a common misconception
```

## Rules for Quality Questions

1. **Every syllabus item must have at least 2 questions** covering it.
2. **Wrong answer options (distractors) must be plausible** — not obviously wrong. Each should represent a real misconception or common confusion.
3. **Wrong-answer explanations must explain WHY students commonly pick this wrong answer**, not just say "this is incorrect."
4. **Questions at difficulty 4-5 should combine multiple concepts** or require judgment between similar options. Difficulty 5 MUST require evaluation or trade-off judgment (e.g., "which approach is BEST given constraints X, Y, Z"), not just pattern matching or recall.
5. **Set `exam_trap: true`** for questions that specifically test a common misconception identified in the research.
6. **Technical terms must be bilingual** in the question text: `聯邦學習（Federated Learning）`.
7. **Scenario questions (difficulty 3+)** should use realistic workplace/student scenarios relevant to the target audience.
8. **Do NOT write trick questions** that depend on ambiguous wording. Test knowledge, not reading comprehension.
9. **CRITICAL — Balanced answer distribution:** Distribute correct answers evenly across a/b/c/d. For N questions, each letter should be correct approximately N/4 times (±1). NEVER have more than 3 consecutive questions with the same correct letter. Verify distribution before outputting.

## Output

Write the questions to: `content/[CERT_SLUG]/[LEVEL_SLUG]/questions/[TOPIC_CODE]-questions.yaml`

Report back a brief summary (under 20 lines): total questions, breakdown by difficulty level, breakdown by syllabus item, answer distribution (a/b/c/d counts).
