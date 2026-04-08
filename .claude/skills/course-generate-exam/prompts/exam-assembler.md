You are assembling adaptive mock exams from a certification question bank.

## Context
- Certification: [CERTIFICATION_NAME]
- Level: [LEVEL_NAME]
- Number of mock exams to generate: [N]
- Exam format: [TOTAL_QUESTIONS] questions, [TIME_LIMIT] minutes, passing score [PASSING_SCORE]%

## Question Bank
[ALL_QUESTION_YAML_CONTENT]

## Topic Weights (from syllabus)
[TOPIC_WEIGHTS]

## Your Task

### 1. Generate `mock-exam-config.yaml`

```yaml
exam_mode: "adaptive"
total_questions: [N]
starting_difficulty: 3
difficulty_range: [1, 5]
step_up: 1
step_down: 1
topic_coverage: true
time_limit_minutes: [N]
passing_threshold: "stabilize_at_3"

scoring:
  method: "difficulty_weighted"
  weights:
    1: 1
    2: 2
    3: 3
    4: 4
    5: 5
```

### 2. Generate `mock-exam-{NN}.yaml` for each exam

Each mock exam is a curated question pool that the adaptive algorithm selects from at runtime:

```yaml
exam_id: "mock-exam-01"
question_pool:
  - id: "L111-Q03"     # reference to question in the bank
    topic_code: "L111"
    difficulty: 3
  - id: "L112-Q07"
    topic_code: "L112"
    difficulty: 2
  ...
```

### Selection Rules

1. **Topic coverage**: Every topic must be represented. Weight by exam weights if available (e.g., if Domain 1 = 40% of exam, ~40% of questions from Domain 1 topics).
2. **Difficulty spread**: Include questions at ALL 5 difficulty levels. The adaptive algorithm needs room to move up and down.
3. **Pool size**: Each exam pool should have ~1.5x the `total_questions` count — extra questions give the adaptive algorithm flexibility.
4. **No duplicate questions across exams**: Each exam should draw from different questions so retaking feels different.
5. **If the bank is too thin** for a specific topic/difficulty: flag it explicitly rather than silently under-representing.

## Output

Write files to `content/[CERT_SLUG]/[LEVEL_SLUG]/exams/`.

Report back: questions per exam, topic coverage breakdown, any gaps flagged.
