# Scope Review: L11102 AI治理概念

## Boundary Rule
初級 covers governance **awareness and risk recognition** only. Name frameworks, describe risk categories, explain why ethics matters. Never describe bias detection algorithms, fairness metric formulas, or compliance implementation procedures. Deepest allowed: "organizations should monitor AI systems for bias and comply with relevant regulations."

## Summary
- Files reviewed: 4 (study-guide.md, supplement-eu-ai-act.md, supplement-taiwan-ai-basic-law.md, supplement-fsc-ai-guidelines.md)
- Sections within boundary: 30
- Scope violations: 0
- Borderline flags: 3

## Within Boundary

### study-guide.md

- [OK] Section 1 (lines 5-12): "考試對應範圍" -- correctly scopes the topic
- [OK] Section 2 (lines 15-59): "關鍵概念總覽圖 Knowledge Tree" -- taxonomy/overview only, appropriate
- [OK] Section 3-1 (lines 65-78): "為什麼需要 AI 治理" -- motivates governance with real-world examples, names risks without explaining mitigation techniques
- [OK] Section 3-2-1 (lines 84-98): "OECD AI 原則" -- lists five principles with plain-language explanations, no implementation details
- [OK] Section 3-2-2 (lines 102-107): "UNESCO AI 倫理建議書" -- names the framework, explains its significance, appropriate depth
- [OK] Section 3-2-3 (lines 110-155): "EU AI Act" -- describes four risk tiers, lists examples, shows timeline; all conceptual awareness
- [OK] Section 3-2-4 (lines 159-169): "各國 AI 監管比較" -- comparative table of regulatory styles, names key policies without implementation details
- [OK] Section 3-3-1 (lines 175-210): "台灣 AI 基本法" -- lists seven principles with mnemonics, identifies key institutions; conceptual only
- [OK] Section 3-3-2 (lines 214-246): "數位發展部兩大文件" -- names documents, describes purposes and target audiences; no implementation procedures
- [OK] Section 3-3-3 (lines 249-273): "金管會 AI 指引" -- lists six principles, clarifies legal nature as administrative guidance; conceptual only
- [OK] Section 3-4-1 (lines 279-317): "AI 治理 vs AI 監管 vs AI 倫理" -- definitional comparison, appropriate for beginner
- [OK] Section 3-4-2 (lines 321-345): "HITL 概念" -- explains the concept and maps it across frameworks; no implementation details
- [OK] Section 3-4-3 (lines 349-360): "AI 風險評估" -- describes the concept of risk assessment, names responsible bodies; stays at awareness level
- [OK] Section 4 (lines 364-421): "易混淆概念比較表" -- all five comparison tables are conceptual summaries, no formulas or implementation procedures
- [OK] Section 5 (lines 425-481): "口訣 / Mnemonics" -- memory aids for principle names, appropriate study tool
- [OK] Section 6 (lines 485-548): "考試陷阱" -- all eight traps address conceptual misunderstandings, no implementation content
- [OK] Section 7 (lines 551-603): "情境題快速判斷" -- scenario-to-framework mapping tables, tests recognition not implementation

### supplement-eu-ai-act.md

- [OK] Section "不可接受風險" (lines 7-24): Lists all 8 prohibited AI applications with plain-language explanations; appropriate depth
- [OK] Section "高風險" (lines 28-53): Lists 9 high-risk domains with examples; compliance requirements listed as bullet-point concepts only
- [OK] Section "有限風險" (lines 57-67): Transparency obligations with examples; appropriate
- [OK] Section "最小風險" (lines 71-80): Minimal risk examples; appropriate
- [OK] Section "實施時程" (lines 83-93): Timeline table; factual awareness content
- [OK] Section "情境題快速判斷" (lines 97-112): Scenario-to-risk-tier mapping; tests recognition

### supplement-taiwan-ai-basic-law.md

- [OK] Section "基本資訊" (lines 7-16): Factual metadata about the law
- [OK] Section "AI 法定定義" (lines 19-39): Breaks down the legal definition into four elements; conceptual understanding
- [OK] Section "七大治理原則" (lines 43-107): All seven principles explained with plain-language analogies; no implementation procedures
- [OK] Section "治理架構" (lines 111-149): Organizational chart of governance bodies; names roles and responsibilities at awareness level
- [OK] Section "高風險 AI 規範" (lines 153-161): Brief conceptual mention with explicit "(此為中級內容，初級只需了解概念)" disclaimer
- [OK] Section "情境題快速判斷" (lines 164-175): Quick-reference Q&A; appropriate

### supplement-fsc-ai-guidelines.md

- [OK] Section "基本資訊" (lines 7-17): Factual metadata
- [OK] Section "法律性質" (lines 20-30): Comparison table of legal nature across frameworks; conceptual
- [OK] Section "六大核心原則詳解" (lines 34-93): All six principles explained with plain-language scenarios and analogies; no implementation procedures
- [OK] Section "原則對照表" (lines 97-108): Cross-reference between FSC and AI Basic Act principles; appropriate
- [OK] Section "適用範圍限制" (lines 112-123): Scope clarification; appropriate
- [OK] Section "情境題快速判斷" (lines 127-137): Scenario mapping; appropriate

## Scope Violations

### Exceeds Level
(none found)

### Below Level
(none found)

## Borderline Flags

### [BORDERLINE] study-guide.md, line 356
> "組織應監控（Monitor）AI 系統是否產生偏見（Bias），並遵守相關法規"

- **Assessment**: This sentence is exactly at the boundary ceiling defined in the boundary map ("organizations should monitor AI systems for bias and comply with relevant regulations"). It does not describe HOW to monitor or what metrics to use, so it remains within scope.
- **Verdict**: Acceptable -- matches the boundary map's deepest-allowed example language almost verbatim.

### [BORDERLINE] supplement-eu-ai-act.md, lines 47-52
> High-risk compliance requirements listed as bullet points: human oversight, data governance, risk management system, technical documentation

- **Assessment**: These are listed as concept names only (what is required), not as implementation procedures (how to build them). The guide explicitly notes "(此為中級內容，初級只需了解概念)" on line 52, which is good boundary hygiene.
- **Verdict**: Acceptable -- naming compliance categories is awareness-level; the explicit 中級 disclaimer prevents students from expecting deeper coverage.

### [BORDERLINE] supplement-taiwan-ai-basic-law.md, lines 153-161
> High-risk AI provisions: warning labels, accountability assignment, MODA responsible for framework details

- **Assessment**: Lists what high-risk AI must do (label + assign responsibility) without explaining how to implement it. The guide includes "(此為中級內容，初級只需了解概念)" disclaimer.
- **Verdict**: Acceptable -- stays at the "know that requirements exist" level with appropriate disclaimer.

## Overall Assessment

All four files stay firmly within the 初級 boundary. The content consistently:
1. **Names** frameworks and regulations without explaining how to implement compliance programs
2. **Describes** risk categories without providing detection algorithms or fairness metrics
3. **Explains why** governance matters using real-world examples without prescribing mitigation procedures
4. Uses appropriate boundary disclaimers ("此為中級內容，初級只需了解概念") when touching the edge of scope

The three borderline items are all handled correctly -- they name concepts at the awareness level and include explicit disclaimers where needed. No changes required.
