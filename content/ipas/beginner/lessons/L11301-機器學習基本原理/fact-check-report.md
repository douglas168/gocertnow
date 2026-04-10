# Fact Check Report — L11301 機器學習基本原理
Generated: 2026-04-10

## Summary

**Overall: PASS** — The study guide is factually accurate, terminologically aligned with iPAS/Taiwan conventions, and stays cleanly within the 初級 boundary. Every high-priority check passes. Only a few very minor observations are listed under "Minor Issues" — none of them block publishing.

The guide faithfully reproduces every core framing from `research-notes.md`: the paradigm flip (rules+data→answers vs data+answers→rules), the overfitting/underfitting symptom table, the training/validation/test purposes, the generalization goal, the parameters vs hyperparameters distinction, the training vs inference distinction, and the 5-step workflow. Taiwan terminology is correct throughout (過度擬合, 擬合不足, 泛化, 推論, 部署, 資料驅動).

---

## Critical Issues (must fix before publishing)

**None.** No critical factual errors found.

---

## Minor Issues (recommended fixes)

### 1. §3.3 "訓練 vs 推論" — 「推理 (reasoning) 是另一個概念（比較偏哲學與邏輯）」
- **Location:** Section 3.3, paragraph explaining terminology choice for 推論.
- **Issue:** The parenthetical claims that 推理 is "more philosophy/logic". This is a reasonable gloss but slightly oversimplified — in modern AI usage (e.g., LLM "reasoning models", chain-of-thought), 推理 is also used. The research notes simply say "推理 (less preferred in TW) — iPAS & Taiwan industry use 推論" without making a semantic claim.
- **Suggested correction:** Soften to something like "iPAS 和台灣業界一律用『推論』指『用訓練好的模型做預測』這個動作；『推理』在其他脈絡（例如邏輯學、部分 LLM 討論）也會出現，但在 iPAS 考試答案中請一律寫『推論』。"
- **Severity:** MINOR (tone/precision nuance, not a factual error for 初級 scope)

### 2. §3.4 U-shape error-rate diagram axis label
- **Location:** Section 3.6, ASCII diagram showing model complexity vs error.
- **Issue:** The diagram draws only ONE curve (labeled "error rate"). The classic pedagogical U-shape is actually *test* error (training error keeps dropping as complexity rises). The guide's single-curve "U" is a fair simplification and the surrounding prose ("越簡單的模型越容易擬合不足；越複雜的模型越容易過度擬合") is correct, but a reader might think "training error is also U-shaped". Research notes say this area is "not math-required at 初級", so it's within scope — just slightly imprecise.
- **Suggested correction:** Either (a) label the curve more explicitly as "整體在新資料上的錯誤率" or "測試集錯誤率", or (b) add one sentence: "這張圖畫的是模型在新資料（測試集）上的錯誤率——訓練集錯誤率則會隨複雜度一路往下掉。"
- **Severity:** MINOR (conceptual precision, not a factual error)

### 3. §6 Trap 4 one-liner "more data usually reduces overfitting"
- **Location:** Section 6, 陷阱 4 ("更多資料 ≠ 一定更好").
- **Issue:** The trap correctly emphasizes "quality over quantity", which is supported by the research notes. However, the research notes *also* say (in §10 common traps): "Thinking more data always = overfitting — 反了，more data usually *reduces* overfitting". The study guide's trap framing is correct but could add the clarifying point that "更多**有品質、有代表性的**資料通常反而可以**降低**過度擬合" so students don't walk away with the opposite misconception.
- **Suggested correction:** Add one sentence at the end of trap 4: "補充：更多**有代表性、有品質**的資料通常反而可以**降低**過度擬合；真正危險的是『量大但雜/偏/重複』的資料。"
- **Severity:** MINOR (completeness — the existing text is not wrong, just incomplete)

### 4. §3.7 Terminology — "model drift / 模型漂移"
- **Location:** Section 3.7, step 5 (部署與監控).
- **Issue:** The guide introduces "model drift, 模型漂移" as a new term. Research notes do mention model drift in §7 but don't explicitly endorse a Traditional Chinese translation. 模型漂移 is a defensible translation but 概念漂移 (concept drift) and 資料漂移 (data drift) are the more commonly seen TW terms; "model drift" as a single umbrella term is less standardized. This is not wrong, but students may not see "模型漂移" verbatim in iPAS exam choices.
- **Suggested correction:** Keep the concept but make it clearly parenthetical/optional: "（業界有時稱為 model drift，模型漂移）". Optionally clarify it is not a named exam term for 初級.
- **Severity:** MINOR (terminology hygiene; not a 初級 tested term anyway)

### 5. §5 口訣 "練模擬正" labeling
- **Location:** Section 5, first mnemonic.
- **Issue:** The mnemonic labels "模" and "擬" as belonging to 驗證集 (Validation Set / 模擬考). That's fine, but the breakdown line "擬 = （接上一個字）" is slightly awkward — it reads as if "擬" has no independent mapping. Not a factual error, but a minor clarity issue.
- **Suggested correction:** Restate as "**模擬** = 驗證集 (Validation Set) → 模擬考" with both characters grouped to one set.
- **Severity:** MINOR (pedagogical clarity)

### 6. §3.6 "正則化 (Regularization) — 僅需認名，不需要會公式"
- **Location:** Section 3.6, "常見預防做法" list.
- **Issue:** Correctly flagged as name-only, which respects the boundary. No issue. Just flagging that the guide correctly stops before explaining L1/L2, consistent with research notes §6.
- **Severity:** NONE (verified compliant)

---

## Verified Correct (spot checks passed)

1. **Paradigm flip framing** — §3.2: "傳統程式：規則 + 資料 → 答案 / 機器學習：資料 + 答案 → 規則（模型）" matches research notes §1 exactly. ✓
2. **Overfitting symptoms** — §3.6 symptom table: high train / low test = 過度擬合. Matches research notes §6 symptom table. ✓
3. **Underfitting symptoms** — §3.6: low train AND low test = 擬合不足. Matches research notes §6 ("訓練集上就表現不好，測試集上當然也不好. 兩邊都差"). ✓
4. **Training set purpose** — §3.4: "讓模型實際學習、調整內部參數". Matches research notes §4 table. ✓
5. **Validation set purpose** — §3.4: "訓練過程中評估模型，用來調整超參數、比較不同模型、判斷是否開始過度擬合"; "可反覆使用". Matches research notes §4 exactly. ✓
6. **Test set purpose** — §3.4: "模型訓練全部結束後的最終評估"; "原則上只能用一次"; "絕對不能拿測試集的結果回頭調整模型". Matches research notes §4 and §10 traps. ✓
7. **Generalization definition** — §3.5: "模型在沒看過的新資料上仍然能做出正確預測的能力". Verbatim from research notes §5. ✓
8. **Taiwan term choice 泛化** — §3.5 explicitly warns against 一般化, matching research notes §5 preferred term. ✓
9. **Parameters vs hyperparameters** — §3.3: "參數 = 模型自己學, 超參數 = 人類事先決定". Matches research notes §9 rule-of-thumb. ✓
10. **Training vs inference** — §3.3: training = learning phase pre-deployment; inference = usage phase post-deployment. Matches research notes §11 exactly. Uses 推論 (not 推理). ✓
11. **5-step workflow order** — §3.7: 定義問題 → 資料收集與準備 → 模型訓練 → 模型評估 → 部署與監控. Matches research notes §7 verbatim. ✓
12. **Iterative (loop) nature of workflow** — §3.7 explicitly states "循環，不是一次性直線". Matches research notes §7 key point. ✓
13. **CRISP-DM — name-only, 6 phases listed briefly** — §3.7: the guide correctly identifies the 6 phases and explicitly tells students "不用背熟 6 個階段". Matches research notes §7 guidance. ✓
14. **ML = pattern matching, not thinking** — §6 Trap 3: "從資料中抽取模式 (pattern matching)，不是真正的『思考』或『理解』". Matches research notes §2 and implicit boundary. ✓
15. **Term variants recognition** — §3.6 correctly notes that 過度擬合 / 過擬合 / 過度配適 are all acceptable and students should recognize all three. Matches research notes §6 terminology. ✓
16. **Split ratios presented as examples, not rules** — §3.4: "常見切分比例（只是例子，不是規定！）", "不要背成『一定是 70/15/15』". Matches research notes §4 guidance. ✓
17. **Tom Mitchell T/E/P definition** — §3.1: correctly attributed to 1997 textbook with accurate T/E/P framing. Matches research notes §2. ✓
18. **Data leakage mentioned (beginner depth)** — §3.4 mentions "資料洩漏" only as the reason test set can't be reused — appropriate beginner depth. ✓
19. **Spam filter classic example** — §3.2 uses spam filter as the paradigm-shift illustration. Matches research notes §1 classic example. ✓
20. **When-to-use-ML criteria** — §3.8: the "適合" / "不適合" lists match research notes §8 one-for-one. ✓

---

## Boundary Violations

**None found.**

The guide carefully stays at the conceptual level throughout. Specifically verified:

- **No formulas** — no loss functions, gradient descent math, L1/L2 formulas. ✓
- **No specific algorithm internals** — decision tree depth is mentioned only as an *example of a hyperparameter*, not explained. Linear regression, neural network internals, etc., are absent. ✓
- **No code** — zero code blocks in any language. ✓
- **No specific hyperparameter numbers** — §3.3 explicitly says "⚠️ 初級範圍到這裡就停。不用記具體的學習率數字、epoch 數、batch size 這些——那是中級領域." ✓
- **No Bias-Variance math** — §3.6 explicitly says "初級範圍不用講到 Bias-Variance Tradeoff 的數學分解——那是中級內容." ✓
- **Regularization / Cross-validation / Early Stopping** — name-only, mechanism not explained. ✓
- **L11302 content leak check** — the final paragraph forward-references L11302 ("下一課 L11302 會介紹各種常見的機器學習模型（監督式、非監督式、強化式、深度學習等）"). This is a headline-level mention of *topic names* only, not an explanation of any model. Acceptable preview, no leak. ✓
- **Weights/biases** — mentioned once in Table 5 as examples of parameters ("模型內部的權重、偏差值"). Research notes §9 explicitly says "只提名詞，不解釋數學" and uses the same examples. ✓

---

## Notes for the lesson author

- The guide's analogies (學生準備考試, 烤蛋糕, 珍珠奶茶) are all drawn from or compatible with the research notes and are not misleading.
- The "高低差看擬合" mnemonic (§5) is clever and accurate.
- The guide does a particularly good job on the validation-vs-test trap, which research notes §10 identifies as "the most common confusion in 初級".
- All cross-references to L11202 (garbage in/garbage out, data pipeline) are accurate and appropriately positioned.
- Overall quality: publish-ready with optional polish on the minor items above.
