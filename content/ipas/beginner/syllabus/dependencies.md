# Topic Dependencies & Lesson Sequence

## Dependency Graph

```
L111 (人工智慧概念) — foundational, no prerequisites
  └→ L112 (資料處理與分析概念)
  └→ L113 (機器學習概念)
  └→ L114 (鑑別式AI與生成式AI概念)

L112 (資料處理與分析概念) → prerequisite for L113
L113 (機器學習概念) → prerequisite for L114
L114 (鑑別式AI與生成式AI概念) → prerequisite for L122, L123

L121 (No code / Low code 概念) — standalone, no prerequisites

L122 (生成式AI應用領域與工具使用) → depends on L114; prerequisite for L123
L123 (生成式AI導入評估規劃) → depends on L114, L122; capstone topic
```

### Arrow Summary

```
L111 → L112 → L113 → L114 → L122 → L123
                                ↑
L121 (standalone) ─────────────┘ (soft: L121 before L122 for context)
```

## Recommended Lesson Order

1. **L111** — 人工智慧概念 (foundational definitions and governance; everything else builds on knowing what AI is and its regulatory landscape)
2. **L112** — 資料處理與分析概念 (data is the fuel for ML; students need data literacy before learning how models consume it)
3. **L113** — 機器學習概念 (builds directly on data concepts; introduces model training, learning paradigms, and evaluation)
4. **L114** — 鑑別式AI與生成式AI概念 (distinguishes the two major model families; bridges Subject 1 theory into Subject 2 applications)
5. **L121** — No code / Low code 概念 (standalone palate cleanser; lighter conceptual topic that resets cognitive load before the tool-heavy topics ahead)
6. **L122** — 生成式AI應用領域與工具使用 (applies GenAI knowledge from L114 to concrete tools and prompt engineering; requires understanding of generative models)
7. **L123** — 生成式AI導入評估規劃 (capstone/integrative topic; synthesizes everything — AI fundamentals, data, models, tools — into real-world deployment planning and risk management)

## Rationale

The sequence follows a strict prerequisite chain within Subject 1 (L11): AI definitions ground all later concepts, data literacy feeds into machine learning, and ML understanding is required to differentiate discriminative from generative models. L114 serves as the natural bridge to Subject 2 (L12) because GenAI application topics assume students already understand what generative models are. L121 (No/Low Code) is standalone and is placed between the two subjects as a cognitive palate cleanser — it introduces a lighter, more practical concept after four theory-heavy topics, giving students a mental reset before diving into the tool-intensive L122 and the integrative capstone L123. This ordering also respects exam structure: students complete all of Subject 1 before moving to Subject 2, which simplifies study planning for students who want to tackle one exam subject at a time.
