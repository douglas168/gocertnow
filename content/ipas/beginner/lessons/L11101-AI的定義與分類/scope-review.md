# Scope Review: L11101 AI的定義與分類

## Boundary Rule

L11101 is unique to 初級 -- no 中級 overlap. Covers definitions and conceptual classification only. No math, no code, no algorithm internals. The AI ⊃ ML ⊃ DL hierarchy should explain WHAT each is, not HOW they work. ML algorithm details, neural network architecture, backpropagation are OUT OF SCOPE (中級 L23). AI ethics/governance framework details are OUT OF SCOPE (L11102). Prompt engineering, RAG, AI Agent are OUT OF SCOPE (L12). Mathematical foundations are OUT OF SCOPE (中級).

## Summary

- Sections within boundary: 13
- Scope violations: 3 (1 exceeds level, 2 borderline)
- Below level: 0

## Within Boundary

- [OK] Section 1 (lines 5-14): "考試對應範圍" -- appropriate framing of exam scope
- [OK] Section 2 (lines 17-67): "關鍵概念總覽圖（Knowledge Tree）" -- pure taxonomy overview, appropriate depth
- [OK] Section 3-1 (lines 73-112): "AI 的演進（Brief History）" -- historical milestones with conceptual explanations, appropriate depth
- [OK] Section 3-2-1 (lines 120-127): "圖靈測試（Turing Test）" -- defines what the test is, no internals
- [OK] Section 3-2-2 (lines 130-157): "Russell & Norvig 四大取向" -- conceptual definitions of four approaches, appropriate depth
- [OK] Section 3-2-3 (lines 161-178): "台灣《人工智慧基本法》第三條" -- defines legal AI definition with four elements, appropriate depth
- [OK] Section 3-3-1 (lines 186-212): "按能力分類（Classification by Capability）" -- ANI/AGI/ASI definitions, appropriate depth
- [OK] Section 3-3-2 (lines 215-228): "按功能分類（Hintze 框架）" -- four types defined conceptually, appropriate depth
- [OK] Section 3-3-3 (lines 232-243): "按哲學立場分類（Searle）" -- strong vs weak AI as philosophical concepts, appropriate depth
- [OK] Section 3-4 (lines 247-282): "AI 子領域層級（AI ⊃ ML ⊃ DL）" -- explains WHAT each is, mostly appropriate (see borderline flag below)
- [OK] Section 4 tables 4-1 through 4-3 (lines 301-334): "易混淆概念比較表" -- comparison tables at conceptual level, appropriate
- [OK] Section 5 (lines 349-396): "口訣 / Mnemonics" -- study aids, all conceptual
- [OK] Section 6 (lines 400-446): "考試陷阱（Exam Traps）" -- conceptual clarifications, appropriate depth
- [OK] Section 7 (lines 450-493): "情境題快速判斷" -- lookup tables mapping keywords to classification frameworks, appropriate depth

## Scope Violations

### Exceeds Level

- [SCOPE] Line 344: "代表技術" row lists "決策樹、SVM、隨機森林..." for ML and "CNN、RNN、Transformer..." for DL
  - **Why it exceeds**: The boundary map explicitly states that naming specific neural network layers/architectures belongs to 中級 (L232). The quick-reference table says "Uses the phrase 'the transformer architecture uses...'" is 中級. While the study guide does not explain how these work, listing CNN, RNN, Transformer, SVM, and decision trees as "representative technologies" introduces algorithm-level vocabulary that belongs to 中級 L232 (機器學習與深度學習). Students at 初級 are not expected to know these names.
  - **Suggested fix**: Replace the "代表技術" row entries with conceptual descriptions. For ML: "分類、預測、推薦等任務的各種演算法" (various algorithms for classification, prediction, recommendation). For DL: "以多層神經網路為基礎的技術" (techniques based on multi-layer neural networks). Keep AI row as-is since "專家系統、ML、DL、NLP..." are conceptual categories, not algorithm names -- though NLP should arguably be listed with a note that details are in L114.

### Borderline

- [BORDERLINE] Line 278: "使用多層神經網路（Neural Network）來學習更複雜的模式"
  - **Why it's borderline**: Mentioning "neural network" by name is at the edge. The boundary map says 初級 should explain WHAT DL is, and this sentence does exactly that -- "DL uses multi-layer neural networks" is a definitional statement. However, the boundary also says "never name specific neural network layers." The term "神經網路" (neural network) is a general concept, not a specific layer or architecture.
  - **Assessment**: Acceptable. This is a definitional "what" statement. The study guide correctly adds "(此為中級內容，初級只需了解概念)" on lines 264-265 to self-limit. No fix needed, but do not go any deeper (e.g., do not explain what neurons, layers, or activation functions are).

- [BORDERLINE] Line 406: "本質上只做一件事——根據前文預測下一個字"
  - **Why it's borderline**: Describing ChatGPT as "predicting the next token based on preceding text" edges toward explaining HOW an LLM works internally (next-token prediction), which touches 中級 territory (model internals, L232). However, this appears in an "exam trap" section to justify WHY ChatGPT is ANI not AGI, which is squarely L11101 material.
  - **Assessment**: Acceptable in context -- it serves the classification argument ("it only does one thing"), not as a technical explanation of transformer architecture. No fix strictly needed, but consider softening to "本質上只做一種任務——文字接龍" to stay further from model internals.

### Below Level

(None identified. The study guide covers all three sub-topics -- evolution, definition, and classification -- at appropriate depth for a 1-2 question foundational topic.)
