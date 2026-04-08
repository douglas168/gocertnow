You are parsing an exam syllabus into a structured YAML format for a certification course platform.

## Context
- Certification: [CERTIFICATION_NAME]
- Level: [LEVEL_NAME]
- Source: [SOURCE_TYPE] — [SOURCE_PATH_OR_URL]
- Language: [LANGUAGE]
- Target audience: [TARGET_AUDIENCE]

## Syllabus Content
[SYLLABUS_CONTENT]

## Your Task

Parse the syllabus into two files:

### 1. `syllabus.yaml`

Normalize the syllabus into this exact YAML structure, regardless of the vendor's original format:

```yaml
certification: "[CERTIFICATION_NAME]"
level: "[LEVEL_NAME]"
updated: "[DATE]"
sources:
  - type: "[pdf|url]"
    path: "[path or url]"
    fetched: "[date if url]"

exam_format:
  total_questions: [N]
  time_limit_minutes: [N]
  passing_score: [N]
  question_types:
    - multiple_choice
    # add others if applicable: multiple_select, drag_drop, case_study, etc.
  adaptive: [true|false]

subjects:
  - code: "[CODE]"
    name: "[Subject Name]"
    weight: [N]                    # exam weight %, if provided. null if not.
    topics:
      - code: "[CODE]"
        name: "[Topic Name]"
        items:
          - code: "[CODE]"
            name: "[Item Name]"
            keywords:
              - "[keyword from details/notes]"
            notes: "[observations about scope or ambiguity]"
            external_docs_needed: [true|false]
```

**Vendor format handling:**
- Hierarchical tables (subject → topic → item + notes): Direct mapping
- "Skills measured" bullet sections (Microsoft): Each section = topic, bullets = items
- "Domain" + "Task Statement" with weights (AWS): Domains = subjects, task statements = items, preserve weights
- Numbered objectives (CompTIA 1.1, 1.2): Objective numbers = topic codes
- Flat bullet lists: Infer hierarchy from indentation/grouping

**Rules:**
- Extract EVERY topic and item. Do not drop or summarize anything.
- All topic codes must be unique.
- `keywords` come from supplementary details (notes columns, sub-bullets, examples).
- Set `external_docs_needed: true` if the item references specific external documents (government guidelines, vendor whitepapers, regulatory frameworks).
- If exam format info is not in the syllabus, set fields to `null` and add a note.

### 2. `_config.yaml`

```yaml
certification: "[CERTIFICATION_NAME]"
vendor: "[VENDOR_NAME]"
levels:
  - slug: "[level-slug]"
    name: "[Level Name]"
    exam_code: "[EXAM_CODE]"      # if available
    language: "zh-TW"
    target_audience: "[TARGET_AUDIENCE]"

content:
  questions_per_topic: 20
  mock_exams_to_generate: 3
  tone: "Encouraging mentor"
```

## Output

Write `syllabus.yaml` and `_config.yaml` to the specified paths. Report back: total subjects, topics, and items parsed.
