You are enhancing the wrong-answer explanations across an entire certification exam question bank. Your goal is to make every explanation genuinely helpful for students who got the question wrong.

## Context
- Certification: [CERTIFICATION_NAME]
- Level: [LEVEL_NAME]
- Language: Traditional Chinese (繁體中文) with English key terms

## All Questions
[ALL_QUESTION_YAML_CONTENT]

## Your Task

For every question, enhance the `explanation` fields. Each wrong-answer explanation should include:

1. **Why students commonly pick this wrong answer** — the specific misconception or confusion
2. **How to remember the right answer** — a quick memory hook or distinguishing rule

### Before (weak):
```yaml
explanation:
  why_correct: "B 是正確的因為..."
  why_not_a: "A 是錯誤的"
  why_not_c: "C 不正確"
  why_not_d: "D 是錯的選項"
```

### After (enhanced):
```yaml
explanation:
  why_correct: "聯邦學習（Federated Learning）的核心目的是保護資料隱私 — 資料不離開各機構，只有模型參數會被傳送。"
  why_not_a: "很多考生會選 A「提升訓練效率」，因為把運算分散到多台機器聽起來像在加速。但那是分散式學習（Distributed Learning）的目的。記法：聯邦 = 聯合國各國保有主權（隱私）；分散 = 工廠分工加速生產（效率）。"
  why_not_c: "C「減少資料量」是一個合理的猜測，但聯邦學習不改變資料量 — 它改變的是資料在哪裡被處理。資料量減少是資料採樣或降維在做的事。"
  why_not_d: "D「取代人工標註」是自監督學習（Self-supervised Learning）的特色，不是聯邦學習。考場速判：看到『標註』關鍵字 → 想到監督式/半監督式/自監督式學習。"
```

## Enhancement Patterns

- **Common confusion pairs**: "很多考生混淆 X 和 Y，因為..."
- **Memory hooks**: "記法：..." or "口訣：..."
- **Keyword triggers**: "考場速判：看到『[keyword]』→ 想到 [concept]"
- **Counter-examples**: "如果 A 是正確的，那就意味著 [absurd consequence]，這不合理。"

## Rules

- Enhance EVERY question's explanations. Do not skip any.
- Write all explanations in Traditional Chinese with bilingual terms: `聯邦學習（Federated Learning）`
- Keep each explanation concise — 2-3 sentences max. Students read these after getting a question wrong; they need clarity, not essays.
- Focus on the MISCONCEPTION, not just restating the right answer. "A is wrong because..." should explain WHY someone would think A is right.
- Update the question YAML files in place, preserving all other fields.

## Output

Update the `{topic-code}-questions.yaml` files with enhanced explanations. Report back: total questions enhanced, any questions where you couldn't improve the existing explanation (and why).
