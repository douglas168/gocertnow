# Scope Review — L11301 機器學習基本原理
Generated: 2026-04-10

## Summary
**PASS** — The study guide stays firmly within 初級 boundary. It covers ML taxonomy and conceptual understanding only: what ML is, how it differs from rule-based programming, training vs inference as concepts, data splits as a concept, generalization, overfitting/underfitting as symptoms (not math), the 5-step workflow, and when to use ML. Zero mathematical formulas, zero code, zero pseudocode, zero algorithm internals. The author repeatedly self-enforces the boundary with explicit "初級 範圍到這裡就停" / "僅認名，不需要會細節" disclaimers. No L11302 leakage.

## Boundary Violations Found
**None.**

No major or minor violations were identified. The author is unusually disciplined about flagging 中級 territory whenever a topic brushes against it:

- §3.3 參數 vs 超參數 ends with "⚠️ 初級範圍到這裡就停。不用記具體的學習率數字、epoch 數、batch size 這些——那是中級領域。" (line 241)
- §3.6 U-shape diagram ends with "⚠️ 初級範圍不用講到 Bias-Variance Tradeoff 的數學分解——那是中級內容。" (line 467)
- §3.6 prevention techniques list marks 正則化 and 交叉驗證 as "僅需認名，不需要會細節" (lines 483–490)
- §3.7 CRISP-DM marked "只要認得這個名字就好⋯⋯不用背熟 6 個階段" (line 555)
- Table 五 ends with "⚠️ 初級只考「誰設定」這個概念差別，不考具體數值或調校方法。" (line 667)

## Scope-Compliant (verified in-boundary)

1. **§3.1 ML definition** — Defined conceptually ("從資料或經驗中自動學習"), Tom Mitchell T/E/P cited as definition framework, no math. ✓
2. **§3.2 Traditional programming vs ML** — ASCII concept diagram showing input/output role swap. Pure paradigm-level comparison, no code. ✓
3. **§3.3 Model training as concept** — "慢慢調整內部設定值"; no gradient descent, no loss function, no optimizer names with mechanics. ✓
4. **§3.3 Training vs Inference** — Treated as two lifecycle phases with student analogy; no latency/throughput numbers, no GPU specifics. ✓
5. **§3.3 Parameters vs Hyperparameters** — Taught as "who sets it" concept only. Examples (權重, 學習率, 決策樹深度) named but never explained mechanically or given numeric values. ✓ (per boundary spec: "naming 'learning rate' as a concept is fine")
6. **§3.4 Train/Validation/Test split** — Taught via student-exam analogy; split ratios (70/15/15) explicitly labeled "僅為例示" and the guide warns against memorizing them. No leakage statistics, no stratification math. ✓
7. **§3.5 Generalization** — Defined as concept ("在沒看過的新資料上仍然能做出正確預測的能力"); no generalization bound math, no VC dimension, no PAC learning. ✓
8. **§3.6 Overfitting vs Underfitting** — Taught purely via symptom table (train-high/test-low etc.) and student analogy. U-shape diagram is explicitly labeled "不是數學曲線，只是觀念示意" (line 439). ✓
9. **§3.7 5-step ML workflow** — Describes each step at concept level; CRISP-DM mentioned by name only with explicit "不用背熟" disclaimer. ✓
10. **§3.8 When to use ML** — Decision framing table with Taiwan daily-life scenarios. Pure judgment-level content. ✓
11. **Comparison tables (§4)** — All six tables compare concepts, not math. Table 五 row "舉例" names items without explaining mechanics. ✓
12. **Exam traps (§6)** — Eight conceptual traps, all at recognize-and-distinguish depth. ✓

## Overlap Risk

Areas that come close to 中級/L11302 territory but do not cross the line — flagged for awareness only, not as violations:

1. **Line 665 — hyperparameter examples ("訓練輪數、決策樹深度、學習率")**
   Status: Compliant. Each item is named without explanation of what it does internally or any numeric value. If a future edit added "e.g., learning rate = 0.001" or "max_depth controls tree pruning", it would cross into 中級.

2. **Line 665 — parameter examples ("模型內部的權重、偏差值")**
   Status: Compliant. "權重" and "偏差值" are named as examples of what kinds of things count as parameters. No weight update rule, no bias gradient. Safe.

3. **§3.6 prevention list (lines 483–490)**
   Status: Compliant. Names Early Stopping, Data Augmentation, Regularization, Cross-validation but explicitly flags "僅需認名，不需要會公式". If a future edit added "L2 regularization adds λ‖w‖² to the loss", it would cross into 中級.

4. **§3.7 Step 5 mentions "model drift / 模型漂移"**
   Status: Compliant. Named as a concept only; no drift detection metric, no KL divergence, no retraining trigger thresholds. Safe at beginner depth.

5. **§3.6 "overfitting 99%/55%" scenario numbers**
   Status: Compliant. These are illustrative accuracy numbers in a worked-example sense, not formulas. The guide never computes precision/recall/F1/AUC. Safe.

6. **§3.4 split ratio 70/15/15**
   Status: Compliant. Explicitly labeled "僅為例示" and the guide warns students NOT to memorize the ratio. If a future edit added stratified sampling formulas or k-fold split logic, it would cross.

## L11302 Content Leakage Check

**No leakage detected.**

L11302 is the sibling lesson covering ML taxonomy (supervised / unsupervised / semi-supervised / reinforcement / deep learning). L11301's job is the foundations *before* the taxonomy — training, generalization, data splits, workflow. The reviewed guide correctly stays in its lane:

- The term "監督式學習 / 非監督式學習 / 強化學習 / 深度學習" appears **only once**, in the closing paragraph (line 894), where the author says L11302 will introduce these — a forward-reference, not teaching. ✓
- There is **no** explanation of what supervised learning is, no labeled-vs-unlabeled distinction, no reward/policy/agent terminology, no neural-network layers, no CNN/RNN/Transformer naming.
- Specific algorithms are **not** named (no kNN, no SVM, no random forest, no k-means, no linear regression) inside the teaching body. The only algorithm-family reference is "決策樹深度" as a hyperparameter example — which names a structure without teaching how it splits, so it does not trespass into L11302.
- The workflow section (§3.7) stays generic ("選擇適合的模型") and never enumerates which models to pick for which task — that is L11302 territory.

**Conclusion:** L11301 is a clean foundations lesson. L11302 will have room to introduce the taxonomy from scratch without any overlap to remove.
