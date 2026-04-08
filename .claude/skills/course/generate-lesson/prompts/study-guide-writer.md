You are a subject matter expert in [CERTIFICATION_NAME] writing a study guide for the topic: [TOPIC_NAME] ([TOPIC_CODE]).

## Context
- Certification: [CERTIFICATION_NAME]
- Level: [LEVEL_NAME]
- Target audience: [TARGET_AUDIENCE]
- Language: Traditional Chinese (繁體中文) with English key terms
- Tone: [TONE]

## Scope Boundary
[BOUNDARY_RULE]

## Research Notes
[RESEARCH_NOTES_CONTENT]

## Syllabus Items to Cover
[SYLLABUS_ITEMS]

## Study Guide Structure

Produce the study guide with ALL 7 sections in this exact order. The flow is: **Orient → Learn → Compare → Memorize → Avoid traps → Exam strategy**.

### Section 1: Exam Item Mapping
Map the lesson to specific syllabus codes:
```
> 對應評鑑範圍：**[CODE] [NAME]** ＋ **[CODE] [NAME]**
```

### Section 2: 關鍵概念總覽圖 (Knowledge Tree)
Create an ASCII tree diagram mapping the entire topic's knowledge hierarchy. Use:
- Emoji markers for categories (📖, 📊, 🔧, ⚖️, etc.)
- Indentation levels showing parent-child relationships
- Inline notes and trap warnings at leaf nodes
- The tree should cover EVERY concept in this topic — it's the bird's eye view

Example format:
```
🤖 [TOPIC_CODE] [TOPIC_NAME]
│
├── [ITEM_CODE] [ITEM_NAME]
│   ├── 📖 [Sub-concept]
│   │   ├── [Detail]
│   │   └── [Detail]
│   └── 陷阱：[Common misconception]
```

### Section 3: Core Concepts (the teaching content)
For each concept, follow this pattern:

**Inline elements — weave these throughout Section 3:**

1. **Bilingual terminology** — EVERY technical term, EVERY time on first use:
   `中文名稱（English Name, Abbreviation）`
   Example: `聯邦學習（Federated Learning）`

2. **白話說明** — After each formal definition, add a 🗣️ conversational analogy:
   - MUST resonate with **18–35 year old Taiwanese**
   - USE: LINE, Instagram, Uber Eats, 7-11/全家, YouTube, 蝦皮, 104人力銀行, university group projects, first-job workplace scenarios, rent in Taipei
   - DO NOT USE: Silicon Valley references, US-centric scenarios

3. **ASCII visual diagrams** — Wherever a concept is spatial, sequential, or comparative:
   - Flowcharts for processes
   - Curves for relationships (sigmoid, gradient)
   - Architecture diagrams for systems
   - All inside code blocks

4. **🔥 Importance markers** — On high-frequency exam points:
   - 🔥 = important
   - 🔥🔥 = very frequently tested

### Section 4: Comparison Tables (易混淆概念)
Side-by-side tables for easily confused concepts in THIS topic.
Format:
```
| 概念 | [Concept A] | [Concept B] |
|------|------------|------------|
| 定義 | ... | ... |
| 差異 | ... | ... |
| 適用 | ... | ... |
```

### Section 5: 口訣 / Mnemonics
Memory hooks for key concept groups. Examples:
- Acronym tricks: 「量·速·多·真·值」for Big Data 5V
- Rhyming patterns
- Association tricks
At least one mnemonic per major concept group.

### Section 6: 考試陷阱 (Exam Traps)
Format for EVERY trap:
```
❌ 陷阱：[Wrong belief / common mistake]
✅ 正解：[Correct understanding + why the wrong belief exists]
```

### Section 7: 情境題快速判斷 (Scenario Quick-Judge)
Keyword-to-answer lookup tables for rapid exam-day decisions:
```
🔑 看到關鍵字 → 選這個答案
- [keyword/scenario] → [answer/concept]
- [keyword/scenario] → [answer/concept]
```

## Deep-Dive Supplement Files

If any subtopic would exceed ~500 words inline and break the reading flow, create a separate `supplement-[topic-name-zh].md` file. Link from the study guide:
```
> 📖 **延伸閱讀：** [Supplement title]
> → 詳見 [supplement filename](supplement-[name].md)
```

Supplement files follow the same inline element rules (bilingual terms, 白話說明, 🔥 markers).

## Output
Write the study guide to: `content/[CERT_SLUG]/[LEVEL_SLUG]/lessons/[TOPIC_CODE]-[TOPIC_NAME_ZH]/study-guide.md`

## Rules
- Cover EVERY content item from the syllabus YAML for this topic. Do not skip any.
- Do NOT exceed the boundary rule. If a concept naturally leads deeper, stop and note: "（此為中級內容，初級只需了解概念）"
- All content in Traditional Chinese. Every technical term bilingual on first use.
- No placeholder text. Every section must have real content.
