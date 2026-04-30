# Accuracy Review — L22402: 大數據應用於鑑別式AI中的應用
Date: 2026-04-30
Reviewers: Gemini (succeeded — full output), Codex (broken — model error), Claude Sonnet 4.6 (adversarial analysis)

## Summary
The guide covers discriminative AI applications in big data contexts: classification scenarios (spam, fraud, churn, medical, image), confusion matrix, Precision/Recall/F1/AUC-ROC, threshold adjustment, sklearn pseudocode, and deployment monitoring. Core framing is strong. Two issues were surfaced by Gemini: a sklearn confusion matrix indexing nuance, and oversimplification of the spam-filtering Precision vs Recall tradeoff. Metrics formulas are correct. No critical factual errors.

## Critical Errors (must fix before publishing)

- **sklearn `confusion_matrix()` index orientation (Gemini finding):** The guide presents the confusion matrix with the standard layout (TP at top-left for positive class). However, sklearn's `confusion_matrix()` defaults to `[[TN, FP], [FN, TP]]` — negative class at top-left. A student reading the guide's table and then parsing code output may compute Precision/Recall from the wrong cells. **Fix:** Add a note in Section 3 that sklearn's default layout is `[[TN, FP], [FN, TP]]` and show how to read it. This is a high-probability code-reading exam trap.

## Minor Issues

- **Spam filtering Precision vs Recall framing (Gemini finding):** The guide states "spam filtering → 常重視 Precision." This is defensible for the specific sub-decision of "should this go to Trash vs Block sender" (where false-positives killing legitimate email are more costly), but modern spam systems often tolerate more FP to achieve higher Recall. The guide's framing is standard exam-level guidance, but should note the assumption: "Precision is primary when false-positive cost (legitimate mail deleted) is the dominant concern."

- **AUC < 0.5 interpretation (Gemini finding):** The guide says "明顯低於 0.5 → 方向可能反了或模型有問題." This is correct. However, consistent AUC = 0.1 is actually a perfect model with inverted label encoding — not a fundamentally broken model. For exam purposes the guide's explanation is fine, but a sharper framing would be: "AUC significantly below 0.5 suggests label inversion or a systematic classification error — flipping the labels yields a good model."

- **F1 formula:** The guide shows "2PR / (P + R)". This is the correct harmonic mean formula (P = Precision, R = Recall). No error.

- **TPR and FPR formulas:** TPR = TP/(TP+FN), FPR = FP/(FP+TN) — both correct and standard.

- **Logistic Regression as discriminative AI:** Logistic Regression is a discriminative model (models P(Y|X) directly). Decision Trees and SVMs are also discriminative. The guide's classification is correct. Naive Bayes (generative) is correctly absent from this lesson's scope.

- **`.score()` defaulting to Accuracy:** Correct for sklearn classifiers (`BaseClassifier.score()`). Regressors default to R². The guide's statement is accurate in the classifier context.

## Missing Key Concepts
- **Macro vs Micro/Weighted F1 averaging:** The guide only covers binary classification metrics. In big data multi-class scenarios (e.g., image recognition at scale), macro-F1 vs weighted-F1 distinction is testable. A one-paragraph note would strengthen the guide.
- **Precision-Recall curve (PR Curve):** For highly imbalanced datasets (fraud < 0.1%), ROC/AUC is known to be optimistic. PR curves are more informative. Not covered.
- **Concept Drift / Data Drift in deployment:** Section 7 mentions monitoring by time/region but doesn't name the concept. "Data Drift" and "Concept Drift" should be explicitly named in the deployment monitoring section.

## Terminology Notes
- 鑑別式 AI (Discriminative AI): correct.
- 混淆矩陣 (Confusion Matrix): correct.
- 精確率 (Precision) / 召回率 (Recall): correct pairing. Note: some ITRI materials use 精準率 for Precision — both are acceptable synonyms and students should know both.
- 準確率 (Accuracy): correct. 正確率 also seen in Taiwan industry — synonymous.
- F1 分數 (F1 Score): correct.
- 偽陽性率 (FPR / False Positive Rate): the guide uses FPR as abbreviation; the Chinese term 偽陽性率 or 假正率 should be explicitly stated alongside it.

## Convergence Notes
Gemini independently identified: (1) sklearn confusion matrix indexing trap, (2) spam filtering Precision vs Recall overgeneralization, (3) AUC < 0.5 nuance, (4) missing Macro/Weighted F1 for multi-class. Claude confirmed all four and added PR Curve and Concept Drift gaps. No contradictions between reviewers.

## Verdict
**Grade: B+** — Technically accurate at the formula and framework level. One critical-for-code exam trap (sklearn confusion matrix orientation) should be fixed. Spam filtering Precision framing needs a one-sentence qualifier. Macro/Weighted F1 gap is worth adding before exam if IPAS 中級 tests multi-class scenarios.
