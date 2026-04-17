# IPAS AI應用規劃師 中級 — Lesson Dependencies & Recommended Order

> **Purpose:** Sequence lessons for the two track-based SKUs the platform will ship.
>
> **Track rule:** 科目一 L21 必考 + (科目二 L22 或 科目三 L23) 擇一.
>
> - **資料分析組** = L21 + L22 (22 items, priority 1, founder sits 2026-05-23)
> - **機器學習組** = L21 + L23 (21 items, priority 2, later expansion)

---

## 1. Cross-level Prerequisites Back to 初級

Items in 中級 that assume a 初級 topic is already understood. 中級 content must not re-explain the 初級 concept; it should jump straight to the technical/operational depth per `boundary-map.md`.

| 中級 Item | Prereq from 初級 | Strength |
|---|---|---|
| L21101 自然語言處理技術與應用 | L11401 鑑別式AI與生成式AI的基本原理; L11402 鑑別式AI與生成式AI的整合應用 | Hard |
| L21102 電腦視覺技術與應用 | L11402 鑑別式AI與生成式AI的整合應用 | Hard |
| L21103 生成式AI技術與應用 | L12201 生成式AI應用領域與常見工具; L12202 如何善用生成式AI工具; L11401 鑑別式AI與生成式AI的基本原理 | Hard |
| L21104 多模態人工智慧應用 | L11402 鑑別式AI與生成式AI的整合應用; L12201 生成式AI應用領域與常見工具 | Hard |
| L21201 AI導入評估 | L12301 生成式AI導入評估 | Hard |
| L21202 AI導入規劃 | L12302 生成式AI導入規劃 | Hard |
| L21203 AI風險管理 | L12303 生成式AI風險管理; L11102 AI治理概念 | Hard |
| L21301 數據準備與模型選擇 | L11202 資料整理與分析流程; L11302 常見的機器學習模型 | Hard |
| L21302 AI技術系統集成與部署 | L11401 鑑別式AI與生成式AI的基本原理 (deployment-as-concept section) | Soft |
| L22101 敘述性統計與資料摘要技術 | L11201 資料基本概念與來源; L11202 資料整理與分析流程 | Hard |
| L22102 機率分佈與資料分佈模型 | L11201 資料基本概念與來源 | Soft |
| L22103 假設檢定與統計推論 | L11202 資料整理與分析流程 | Soft |
| L22201 數據收集與清理 | L11202 資料整理與分析流程 | Hard |
| L22202 數據儲存與管理 | L11201 資料基本概念與來源 | Hard |
| L22203 數據處理技術與工具 | L11202 資料整理與分析流程 | Soft |
| L22301 統計學在大數據中的應用 | L11202 資料整理與分析流程 | Soft |
| L22302 常見的大數據分析方法 | L11302 常見的機器學習模型 | Soft |
| L22303 數據可視化工具 | L11202 資料整理與分析流程 | Soft |
| L22401 大數據與機器學習 | L11301 機器學習基本原理; L11302 常見的機器學習模型 | Hard |
| L22402 大數據應用於鑑別式AI中的應用 | L11401 鑑別式AI與生成式AI的基本原理; L11302 常見的機器學習模型 | Hard |
| L22403 大數據在生成式AI中的應用 | L12201 生成式AI應用領域與常見工具; L11401 鑑別式AI與生成式AI的基本原理 | Hard |
| L22404 大數據隱私保護、安全與合規 | L11203 資料隱私與安全; L11102 AI治理概念 | Hard |
| L23101 機率/統計之機器學習基礎應用 | L11301 機器學習基本原理; L11202 資料整理與分析流程 | Hard |
| L23102 線性代數之機器學習基礎應用 | L11301 機器學習基本原理 | Soft |
| L23103 數值優化技術與方法 | L11301 機器學習基本原理 | Soft |
| L23201 機器學習原理與技術 | L11301 機器學習基本原理; L11302 常見的機器學習模型 | Hard |
| L23202 常見機器學習演算法 | L11302 常見的機器學習模型 | Hard |
| L23203 深度學習原理與框架 | L11302 常見的機器學習模型 | Hard |
| L23301 數據準備與特徵工程 | L11202 資料整理與分析流程 | Hard |
| L23302 模型選擇與架構設計 | L11302 常見的機器學習模型 | Hard |
| L23303 模型訓練、評估與驗證 | L11301 機器學習基本原理 | Hard |
| L23304 模型調整與優化 | L11301 機器學習基本原理 | Soft |
| L23401 數據隱私、安全與合規 | L11203 資料隱私與安全; L11102 AI治理概念 | Hard |
| L23402 演算法偏見與公平性 | L11102 AI治理概念; L12303 生成式AI風險管理 | Hard |

---

## 2. Dependency Graph — within 中級

### 2.1 科目一 L21 人工智慧技術應用與規劃

```
L211 AI相關技術應用 (modality foundations)
  L21101 自然語言處理技術與應用  ─┐
  L21102 電腦視覺技術與應用     ─┼──► L21104 多模態人工智慧應用
  L21103 生成式AI技術與應用     ─┘

L212 AI導入評估規劃 (sequential)
  L21201 AI導入評估 → L21202 AI導入規劃 → L21203 AI風險管理 (capstone)

L213 AI技術應用與系統部署 (sequential)
  L21301 數據準備與模型選擇 → L21302 AI技術系統集成與部署 (capstone)

Cross-topic: L211 (know the tech) feeds L212 (plan adoption) feeds L213 (deploy).
```

- **Standalone starters:** L21101, L21102, L21103 (each can be taught independently; order among the three is pedagogical, not logical).
- **Prereq nodes:** L21201 (for L21202/L21203); L21301 (for L21302).
- **Subject capstones:** L21203 AI風險管理; L21302 AI技術系統集成與部署.

### 2.2 科目二 L22 大數據處理分析與應用

```
L221 機率統計基礎 (sequential)
  L22101 敘述性統計與資料摘要技術 → L22102 機率分佈與資料分佈模型 → L22103 假設檢定與統計推論

L222 大數據處理技術 (sequential)
  L22201 數據收集與清理 → L22202 數據儲存與管理 → L22203 數據處理技術與工具

L223 大數據分析方法與工具
  L22301 統計學在大數據中的應用 → L22302 常見的大數據分析方法 → L22303 數據可視化工具
  (L22301 needs L221 statistics; L22302 needs L22301 + L222 pipeline)

L224 大數據在人工智慧之應用 (AI-facing, requires L221–L223)
  L22401 大數據與機器學習
  L22402 大數據應用於鑑別式AI中的應用
  L22403 大數據在生成式AI中的應用
  L22404 大數據隱私保護、安全與合規 (capstone / governance)
```

- **Standalone starter:** L22101 (the only zero-prereq node within L22).
- **Prereq chain:** L221 statistics → L223 analysis methods → L224 AI applications.
- **Subject capstone:** L22404 (governance wraps the whole big-data stack).

### 2.3 科目三 L23 機器學習技術與應用

```
L231 機器學習基礎數學 (math, MUST go first)
  L23101 機率/統計之機器學習基礎應用
  L23102 線性代數之機器學習基礎應用
  L23103 數值優化技術與方法
  (three parallel foundations; suggested order above)

L232 機器學習與深度學習 (sequential, requires L231)
  L23201 機器學習原理與技術 → L23202 常見機器學習演算法 → L23203 深度學習原理與框架

L233 建模與參數調校 (sequential pipeline, requires L232)
  L23301 數據準備與特徵工程 → L23302 模型選擇與架構設計 →
  L23303 模型訓練、評估與驗證 → L23304 模型調整與優化

L234 機器學習治理 (capstone, requires everything above)
  L23401 數據隱私、安全與合規 → L23402 演算法偏見與公平性
```

- **Standalone starters:** L23101 (math foundations; no in-level prereq beyond 初級 L113).
- **Prereq chain:** L231 math → L232 algorithms → L233 training pipeline → L234 governance.
- **Subject capstone:** L234 機器學習治理 (L23401 + L23402) — governance of everything learned.

---

## 3. Recommended Lesson Order — 資料分析組 (L21 + L22, 22 items)

L21 first (required core, shared by both SKUs), then L22. Within L21, modalities before planning before deployment. Within L22, statistics → pipeline → analysis → AI applications → governance capstone.

| # | Code | Name (from syllabus.yaml) | Rationale |
|---|---|---|---|
| 1 | L21101 | 自然語言處理技術與應用 | (Most familiar modality for founder; bridges 初級 L114 → tech depth) |
| 2 | L21102 | 電腦視覺技術與應用 | (Second modality; parallel to NLP, different architecture family) |
| 3 | L21103 | 生成式AI技術與應用 | (Builds directly on 初級 L12201/L12202 prompt-engineering base) |
| 4 | L21104 | 多模態人工智慧應用 | (Fuses NLP + CV + GenAI; sits after the three single-modality lessons) |
| 5 | L21201 | AI導入評估 | (Starts the planning arc; needs L211 tech vocabulary to evaluate options) |
| 6 | L21202 | AI導入規劃 | (Extends evaluation into full requirements + resource plan) |
| 7 | L21203 | AI風險管理 | (L21 capstone — risk wraps eval + plan; external docs needed) |
| 8 | L21301 | 數據準備與模型選擇 | (Deployment arc start; hands off naturally into L22 data work) |
| 9 | L21302 | AI技術系統集成與部署 | (L21 deployment capstone; architecture + cloud + monitoring) |
| 10 | L22101 | 敘述性統計與資料摘要技術 | (L22 foundation — mean/median/variance before anything else) |
| 11 | L22102 | 機率分佈與資料分佈模型 | (Distributions before inference) |
| 12 | L22103 | 假設檢定與統計推論 | (Completes L221 statistics stack) |
| 13 | L22201 | 數據收集與清理 | (Pipeline stage 1; leverages L22101 summary stats for QA) |
| 14 | L22202 | 數據儲存與管理 | (Pipeline stage 2; lake/warehouse/NoSQL) |
| 15 | L22203 | 數據處理技術與工具 | (Pipeline stage 3; Spark/Hadoop/ETL/SQL) |
| 16 | L22301 | 統計學在大數據中的應用 | (Applies L221 stats to big-data scale; feature scaling) |
| 17 | L22302 | 常見的大數據分析方法 | (Analytics algorithms + imbalanced-data strategies) |
| 18 | L22303 | 數據可視化工具 | (Closes L223; visualization is the last analytical step) |
| 19 | L22401 | 大數據與機器學習 | (Bridges L22 into AI — how scale changes ML algorithms) |
| 20 | L22402 | 大數據應用於鑑別式AI中的應用 | (Discriminative use cases — prediction/classification at scale) |
| 21 | L22403 | 大數據在生成式AI中的應用 | (Generative use cases — corpora-scale pretraining needs) |
| 22 | L22404 | 大數據隱私保護、安全與合規 | (資料組 capstone — governance/compliance across the stack) |

---

## 4. Recommended Lesson Order — 機器學習組 (L21 + L23, 21 items)

L21 first (same shared core), then L23. Within L23, math (L231) must precede algorithms (L232), which must precede pipelines (L233), which must precede governance (L234 capstone).

| # | Code | Name (from syllabus.yaml) | Rationale |
|---|---|---|---|
| 1 | L21101 | 自然語言處理技術與應用 | (Shared L21 modality opener; same as 資料組) |
| 2 | L21102 | 電腦視覺技術與應用 | (Shared L21 modality) |
| 3 | L21103 | 生成式AI技術與應用 | (Shared L21 modality) |
| 4 | L21104 | 多模態人工智慧應用 | (Integrates the three modalities) |
| 5 | L21201 | AI導入評估 | (Start of planning arc) |
| 6 | L21202 | AI導入規劃 | (Extends to full program plan) |
| 7 | L21203 | AI風險管理 | (L21 capstone — risk frameworks) |
| 8 | L21301 | 數據準備與模型選擇 | (Deployment arc start; hands off naturally into L23 training work) |
| 9 | L21302 | AI技術系統集成與部署 | (L21 deployment capstone) |
| 10 | L23101 | 機率/統計之機器學習基礎應用 | (L23 math foundation — probability drives nearly every ML concept) |
| 11 | L23102 | 線性代數之機器學習基礎應用 | (Vectors/matrices for feature spaces, PCA, embeddings) |
| 12 | L23103 | 數值優化技術與方法 | (Gradient descent + convergence — closes L231 math base) |
| 13 | L23201 | 機器學習原理與技術 | (Algorithm theory layer one; requires L231 math) |
| 14 | L23202 | 常見機器學習演算法 | (Specific algorithms — trees, SVMs, ensembles) |
| 15 | L23203 | 深度學習原理與框架 | (Neural nets; closes L232 algorithm stack) |
| 16 | L23301 | 數據準備與特徵工程 | (Pipeline stage 1 — SMOTE, normalization, feature selection) |
| 17 | L23302 | 模型選擇與架構設計 | (Pipeline stage 2 — pre-training configuration) |
| 18 | L23303 | 模型訓練、評估與驗證 | (Pipeline stage 3 — generalization + stability metrics) |
| 19 | L23304 | 模型調整與優化 | (Pipeline stage 4 — hyperparameter tuning, optimization controls) |
| 20 | L23401 | 數據隱私、安全與合規 | (Governance layer 1 — privacy/compliance for trained models) |
| 21 | L23402 | 演算法偏見與公平性 | (ML組 capstone — fairness audit as final governance step) |

---

## 5. Rationale

Both orders start with L21 because every 中級 learner, regardless of elective, must pass 科目一 — and within L21 the modality trio (L21101–L21103) uses the lightest math while leveraging the most 初級 recall, making them the highest-ROI openers (critical for the founder's 2026-05-23 sprint on the 資料分析組 SKU). The two tracks diverge at item 10: 資料組 pivots into L221 descriptive statistics (the textual-statistical path the founder's accounting background supports), while ML組 pivots into L231 machine-learning math (probability, linear algebra, optimization — the gate to all L232/L233 content per the hard ordering rule). Inside each elective I kept subjects contiguous rather than interleaving, because L22 and L23 each have strong internal prerequisite chains (stats → pipeline → analysis → AI apps for L22; math → algorithms → training → governance for L23) and interleaving would force students to context-switch mid-chain. L21203 AI風險管理 and L21302 AI技術系統集成與部署 are placed late within L21 (items 7 and 9) as the two subject capstones, and each elective ends on its own governance capstone (L22404 for 資料組, L23402 closing L234 for ML組) so the last lesson in every SKU is the compliance/ethics wrap — matching the exam's late-block emphasis on responsible-AI questions.
