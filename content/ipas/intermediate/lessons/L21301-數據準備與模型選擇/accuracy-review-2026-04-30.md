# Accuracy Review — L21301: 數據準備與模型選擇
Date: 2026-04-30
Reviewers: Claude (independent pass) + Gemini (adversarial pass)
File reviewed: `L21301-數據準備與模型選擇-study-guide.md`

---

## Summary

The study guide is technically sound on its core claims (data leakage rules, scaling rationale, encoding logic, train/val/test roles). The dominant IPAS exam pattern — situation-based judgment, not formula recall — is correctly served. However, the guide has **3 real errors or misleading claims**, **2 significant content gaps for 中級 depth**, and several minor issues. The guide is ready to publish with targeted fixes.

---

## Critical Errors (must fix before publishing)

### Error 1: Q24 One-Hot "no statistics" claim is misleading
- **Claim (line 914):** "One-Hot 本身不涉及統計量，切分前後做都行"
- **Problem:** This is technically inaccurate and contradicts the guide's own data leakage doctrine. The **vocabulary (complete set of categories)** is implicitly learned from whichever data it sees. Encoding before splitting means test-set categories are visible during feature construction — the model can "see" the full category space of the test set, which masks unseen-category production errors and constitutes information leakage in spirit. More critically, teaching students "this one is OK to do before splitting" creates a mental exception that will be applied incorrectly in exam scenarios.
- **Correction:** Remove the exception clause entirely. Replace with: "養成習慣：先切分，再做所有前處理（包括 One-Hot），是最安全的作法。One-Hot 雖然不涉及數值統計量，但切分前做仍可能讓模型看到完整類別空間，不如統一規則：先切分再轉換。"
- **Convergence:** Both Claude and Gemini flagged this.

### Error 2: RobustScaler is completely absent
- **Claim (Section 4, line 230–235):** Only StandardScaler and MinMaxScaler are presented as the complete set of scaling options.
- **Problem:** The guide explicitly teaches (correctly) that median is more robust than mean in the presence of outliers. Yet it never applies the same logic to scaling: RobustScaler uses median and IQR, is specifically designed for data with outliers, and is the correct answer when a student sees "data with extreme outliers AND needs scaling (e.g., for SVM/k-NN)." Without RobustScaler, a student using this guide who encounters such a scenario will be unable to reason correctly. The guide actively warns about outliers in Section 3 but provides no outlier-robust scaler option in Section 4 — this is an internal logical gap.
- **Correction:** Add RobustScaler as a third option in the scaling comparison table:

  | | RobustScaler |
  |---|---|
  | 結果 | 用中位數和四分位距縮放，不受極端值影響 |
  | 適用 | 資料有明顯極端值，但仍需縮放（如 SVM/k-NN + 含 outlier 資料） |

  Add to Exam Rule: "有極端值 + 需要縮放 → RobustScaler（比標準化更穩健）"
- **Convergence:** Claude flagged as critical; Gemini called it "a critical failure."

### Error 3: SMOTE is absent from the main study guide despite being exam-relevant at 中級 level
- **Claim (Section 7, line 466–468):** Class imbalance strategies listed as: Resampling, Class Weight, and switching metrics. SMOTE is not mentioned in the main guide text.
- **Context:** The diagrams (diagram 05) cover SMOTE in detail with an exam trap warning ("SMOTE 只能在 Training Set 切分之後才能過採樣"). The research notes intentionally scoped SMOTE to "進階內容" for L21301. However, diagram 03 already includes "SMOTE 洩漏警告" as a core diagram topic. The inconsistency — present in diagrams, absent in the main text — means students who only read the study guide body miss a named technique that appears in the course diagrams and is standard 中級 content.
- **Correction:** Add SMOTE by name to Section 7 with a single exam-rule sentence. Minimal addition needed — the diagram already has the full treatment:

  Under "重抽樣（Resampling）" in the strategies table, add a note: "常見方法：過採樣（Oversampling，例如 SMOTE 合成少數類別樣本）或欠採樣（Undersampling，減少多數類別）。注意：SMOTE 必須在切分後，只套用於訓練集，否則驗證集被污染。"
- **Convergence:** Both Claude and Gemini flagged this; diagrams already contain the correct content.

---

## Minor Issues

1. **Cross-validation framing too narrow.** The guide repeatedly frames cross-validation as "適合資料量不大時" (for small datasets). Cross-validation is the gold standard for hyperparameter tuning and model selection at *any* dataset size. For exam purposes, the framing is not wrong (it's an additional benefit for small data), but it may cause students to eliminate cross-validation as an answer when the scenario involves large data. Add: "也可用於任何資料量的超參數調整（Hyperparameter Tuning）和模型比較，不只限於小資料。"

2. **Gradient boosting (XGBoost/LightGBM) not mentioned in main guide text.** The diagram `01-algorithm-choice-flowchart.md` already includes "隨機森林 / XGBoost" as standard options for medium/large datasets. The main study guide text omits this entirely. For 2026 IPAS 中級 scope, gradient boosting is important context for "表格資料的常見高效模型." The research notes and official scope notes do not explicitly list it as required, so this is a minor gap rather than a critical error. Consider adding a single row to the model trade-off table or a footnote: "梯度提升（Gradient Boosting，如 XGBoost、LightGBM）也是表格資料的高頻選項，通常與隨機森林在同一選擇層次。"

3. **Evaluation metric formulas absent.** Precision, Recall, F1-score, and AUC-ROC are named throughout but no formulas are given. Per the official IPAS 中級 exam patterns (situation-based judgment, not formula recall), this is acceptable for exam prep. However, a confusion matrix (TP/FP/TN/FN) breakdown with the formula derivations would help students who see formula-based questions. This is a minor gap, not an error.

4. **Regression metrics entirely absent.** The guide correctly covers classification evaluation (Accuracy, Precision, Recall, F1) but never mentions MAE, RMSE, or MAPE for regression tasks. The guide does acknowledge regression as a task type (Section 2). For completeness at 中級, a single sentence noting "迴歸任務的評估常用 MAE（平均絕對誤差）或 RMSE（均方根誤差）" is warranted.

5. **Terminology: 正規化 / 規則化 ambiguity.** In Traditional Chinese (Taiwan), "正規化" is used for both Min-Max Normalization AND Regularization (L1/L2). The guide uses "正規化（Normalization, Min-Max Scaling）" which is correct, but a one-sentence disambiguation footnote would prevent exam confusion: "注意：「正規化」在不同語境可指 Normalization（縮放）或 Regularization（正則化）。本課指縮放時，標記為 Normalization；避免與 L1/L2 正則化混淆。"

---

## Missing Key Concepts

1. **SMOTE named technique** (see Critical Error 3 above — addressed there)
2. **RobustScaler** (see Critical Error 2 above — addressed there)
3. **Gradient boosting** (see Minor Issue 2 above)
4. **Regression evaluation metrics** (MAE, RMSE) — minor but clean to add
5. **Confusion matrix** — useful scaffolding for Precision/Recall formulas; diagrams may cover this

---

## Terminology Notes

- **標準化 vs 正規化:** The guide uses these correctly and consistently. The ambiguity risk (正規化 = Normalization vs. Regularization) is real in Taiwan exam contexts — worth a single footnote.
- **重抽樣 vs 過採樣 vs 欠採樣:** The guide uses "重抽樣（Resampling）" as the umbrella term, which is correct. Adding "過採樣（Oversampling）" and "欠採樣（Undersampling）" as sub-terms (with SMOTE under oversampling) would complete the hierarchy.
- **目標編碼 (Target Encoding):** Terminology matches ITRI/industry standard. Also sometimes called "均值編碼" in community usage — the guide's term is correct.
- **泛化能力 (Generalization Ability):** Used correctly throughout.
- **All other key terms** verified against ITRI learning guide standard vocabulary — no issues found.

---

## Convergence Notes

| Issue | Claude | Gemini | Verdict |
|---|---|---|---|
| RobustScaler absent | Critical | Critical | Fix required |
| Q24 One-Hot leakage claim | Critical | Critical | Fix required |
| SMOTE absent from main text | Critical | Critical | Fix required (minimal addition) |
| Cross-validation framing narrow | Minor | Minor | Clarify |
| Gradient boosting absent | Minor | Critical | Minor — add note |
| Metric formulas absent | Minor | Critical | Minor — IPAS exam is judgment-based |
| Regression metrics absent | Minor | Gemini flagged | Minor |
| 正規化 terminology ambiguity | Minor | Gemini flagged | Add footnote |

Gemini rated gradient boosting and metric formulas more severely than warranted given the IPAS official exam scope (situation-based judgment, not formula derivation). The research notes from official IPAS sources confirm "考法偏情境判斷，不偏演算法推導." Gemini's verdict of "FAIL" is too harsh — the core exam judgment patterns are correctly taught.

---

## Verdict

**Grade: B+**

The guide correctly teaches the three highest-frequency IPAS 中級 judgment patterns (data leakage rules, scaling sensitivity, class imbalance + Accuracy trap). The internal logic is consistent and the trap clinic is excellent. Three targeted fixes (RobustScaler, Q24 One-Hot claim, SMOTE by name) plus two minor additions (cross-validation framing, regression metrics) bring this to A-range. Publishable after fixes.

**Critical error count: 3**
**Top 3 issues:**
1. Q24 "One-Hot doesn't involve statistics so pre-split is fine" — actively misleads on leakage doctrine
2. RobustScaler absent — logical gap: guide teaches outlier-robust imputation but not outlier-robust scaling
3. SMOTE unnamed — present in diagrams, absent in main text; inconsistency at 中級 depth
