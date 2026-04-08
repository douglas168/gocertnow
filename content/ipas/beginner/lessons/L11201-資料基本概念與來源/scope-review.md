# Scope Review: L11201 資料基本概念與來源

## Boundary Rule

初級 teaches data pipeline **vocabulary and awareness** only. Explain what each data type/concept is and why it matters. Never show statistical formulas, SQL, Python, or tool-specific commands. Feature engineering and standardization are defined conceptually only. L11201 is listed as **unique to 初級** (no overlap), meaning content generators have creative freedom — but must still avoid drifting into 中級-only topics (L221–L233, L213).

## Summary

The study guide is a well-structured vocabulary-and-awareness piece covering Big Data 5Vs, data types (numerical, text, image, audio, video, categorical), data structures (structured, semi-structured, unstructured), data sources (internal vs external), and data-to-AI mappings. It stays firmly at the definitional and classification level throughout. **No formulas, no code, no SQL, no Python, no tool-specific commands appear.** The guide is overwhelmingly within scope.

Two minor borderline items were found. No hard scope violations were detected.

## Within Boundary

The following sections correctly stay at the 初級 vocabulary/awareness level:

- **Section 2 (lines 14–57):** Knowledge tree listing terms and categories only — no algorithm internals or formulas.
- **Section 3-1 (lines 63–76):** Daily data explosion — relatable scenarios mapping everyday actions to data types. Pure awareness.
- **Section 3-2 (lines 79–122):** Big Data 5Vs defined with plain-language explanations, analogies, and examples. GIGO principle explained conceptually. No statistical formulas.
- **Sections 3-3-1 through 3-3-6 (lines 125–223):** Each data type defined with examples and mapped to AI application areas. Definitions only — no algorithm mechanics, no code, no formulas.
- **Section 3-3-7 (lines 227–249):** Data type → AI technique mapping diagram. Conceptual only.
- **Section 3-4 (lines 253–351):** Structured / semi-structured / unstructured data — definitions, examples, comparison. The JSON example (lines 296–305) shows a JSON snippet to illustrate what semi-structured data *looks like* — this is appropriate since it defines a data format, not a programming command.
- **Section 3-5 (lines 355–389):** Internal vs external data sources — vocabulary and examples. Mentions CRM, ERP, IoT, data.gov.tw as source names without teaching how to use them.
- **Section 3-6 (lines 393–406):** Data → AI technique → application mapping table. Stays at the "what goes with what" level.
- **Section 4 (lines 409–451):** Comparison tables — all definitional.
- **Section 5 (lines 455–499):** Mnemonics — memory aids for vocabulary. No technical depth.
- **Section 6 (lines 502–548):** Exam traps — clarifies common misconceptions about data classification. Stays at the vocabulary level.
- **Section 7 (lines 552–616):** Scenario quick-judge tables — pattern matching for exam questions. All classification/vocabulary level.

## Scope Violations

### Exceeds Level

**None found.** The guide contains:
- No statistical formulas
- No SQL queries
- No Python code
- No tool-specific commands (Spark, Hadoop, etc.)
- No algorithm internals
- No feature engineering execution
- No data cleaning procedures (correctly left for L11202)
- No privacy regulation details (correctly left for L11203)
- No ML model internals (correctly left for L113)

### Below Level

**None found.** The guide covers all expected sub-topics for L11201 at appropriate depth.

## Borderline Flags

### [BORDERLINE] Line 140 — Regression/prediction parenthetical

> **對應 AI 應用：** 數值型資料最常用於迴歸分析（Regression）和預測（Prediction）。例如：用歷史銷售數據預測下個月營收。**（此為中級內容，初級只需了解概念）**

The guide itself flags this as 中級 content, which is good self-awareness. However, the sentence is purely definitional — it names "regression" and "prediction" as AI technique labels mapped to numerical data, without explaining how regression works. This is consistent with the rest of the data-type-to-AI-technique mapping pattern used throughout the guide (lines 157, 174, 191, 204, 221). The parenthetical disclaimer is actually unnecessary and slightly confusing — naming the technique is fine at 初級; explaining the math behind it would not be.

**Recommendation:** Remove the parenthetical "（此為中級內容，初級只需了解概念）" to avoid implying that naming regression is out of scope. The same mapping appears without disclaimers elsewhere in the guide (e.g., line 157 mentions NLP, line 174 mentions Computer Vision). Treat all of these consistently.

### [BORDERLINE] Lines 165, 182 — Technical vocabulary (Pixel, Matrix, Frequency, Pitch)

> Line 165: 每張圖片其實是一堆像素（Pixel）組成的矩陣（Matrix）
> Line 182: 包含頻率（Frequency）、音高（Pitch）、音量（Volume）等特徵

These mention low-level technical terms (pixel, matrix, frequency, pitch) that describe how data is represented internally. This is slightly deeper than pure vocabulary — it touches on data representation mechanics. However, no formulas or code are shown, and these terms help students understand *why* images and audio require special AI techniques. This sits right on the boundary.

**Recommendation:** Acceptable as-is. These are common-knowledge terms that aid conceptual understanding without crossing into algorithm internals or data engineering. No action needed.

## Overall Assessment

**PASS — Within Boundary.**

The study guide is an exemplary 初級 vocabulary-and-awareness piece. It defines terms, classifies data types and structures, maps data to AI applications at a conceptual level, and provides exam-oriented quick-reference tables. It correctly avoids all 中級 territory: no formulas, no code, no tool commands, no algorithm internals. The two borderline items are minor and do not constitute scope violations.

One small editorial fix is recommended: remove the unnecessary 中級 disclaimer on line 140 for consistency with the rest of the guide.
