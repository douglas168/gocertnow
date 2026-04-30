# Accuracy Review — L22302: 常見的大數據分析方法
Date: 2026-04-30

## Summary

Gemini adversarial review ran successfully; Codex CLI unavailable (model version error). Review based on Gemini + independent analysis.

The guide covers k-means clustering, decision trees, pattern recognition framing, SMOTE/imbalanced data handling, and evaluation metrics. Technical accuracy of covered material is good. The main issues are: (1) a symbol collision (λ for SMOTE conflicts with Box-Cox λ in L22301), (2) a terminology precision issue with SSE vs WCSS, (3) incomplete Gini/Entropy formulas, and (4) a scope question — the IPAS 中級 "常見的大數據分析方法" title may warrant additional methods (association rules, random forests, etc.).

## Critical Errors (must fix before publishing)

- **λ symbol collision between SMOTE formula and Box-Cox**: The SMOTE interpolation formula uses `x_new = x_i + λ(x_zi - x_i)` where λ ∈ [0,1]. However, L22301 uses λ for the Box-Cox power parameter. Students reading both lessons will encounter λ meaning two completely different things. The SMOTE formula should use a different symbol — either `r`, `u`, or `α` — and clarify that this λ is drawn from U(0,1). This is a cross-lesson consistency error that can cause exam confusion. → Fix: Replace λ with `r` (random scalar, drawn uniformly from [0,1]) in the SMOTE formula.

- **Gini Impurity and Entropy formulas absent**: The guide describes Gini and Entropy qualitatively ("越低越純") but never gives the formulas. At 中級 level, manual calculation questions using `Gini = 1 - Σp_i²` or `Entropy = -Σp_i log₂(p_i)` are standard. Students who encounter a numerical calculation question from this guide will be unprepared. → Fix: Add the explicit formulas for both Gini Impurity and Information Entropy in Section 3.

## Minor Issues

- **SSE vs. WCSS terminology**: The guide equates "群內平方和 (Sum of Squared Errors, SSE)" with "inertia." The more precise term for k-means objective is WCSS (Within-Cluster Sum of Squares). SSE as a term is more commonly associated with regression residuals. For the IPAS exam, "inertia" and "SSE" are both acceptable since sklearn uses `inertia_`, but a note clarifying that WCSS is the rigorous academic term would prevent confusion.

- **k-means++ description is slightly imprecise**: The guide states it "lets centers be less concentrated." The actual mechanism is that k-means++ selects the next center with probability proportional to D(x)², the squared distance from the nearest already-selected center. The current description is directionally correct but lacks the probabilistic precision. For exam purposes, "距離平方相關的方式" is sufficient, but the word "確保" (ensures) overstates the guarantee — k-means++ gives better expected outcomes, not a deterministic guarantee of spread.

- **Greedy split claim "多半採用" is correct**: The guide correctly uses "多半" (mostly), not "always." ID3, C4.5, and CART all use greedy splitting. This is accurate.

- **SMOTE formula `x_zi` needs clarification**: The guide uses `x_zi` without explicitly defining it as "a randomly selected neighbor from the k nearest minority-class neighbors of x_i." This should be explicit since exam questions may ask about the neighbor selection step.

- **imbalanced-learn `fit_resample` — confirmed accurate**: Current imbalanced-learn (0.10+) uses `fit_resample(X, y)`. The old `fit_sample` was removed. The guide's claim is correct.

- **Decision tree sklearn default is Gini, not Entropy**: The guide doesn't state a default, but students should know that `sklearn.tree.DecisionTreeClassifier` defaults to `criterion='gini'`. This could appear as a trap question. Consider adding a note.

## Missing Key Concepts

The following are potentially within scope for IPAS 中級 "常見的大數據分析方法":

1. **Association Rule Mining (Apriori / FP-Growth)**: Market basket analysis is a classic "common big data analysis method." If the IPAS syllabus includes it, its complete absence is a critical gap. Flagged by Gemini as a significant missing concept.
2. **Silhouette Score for cluster validation**: The guide only covers the Elbow Method for selecting k. Silhouette analysis (measuring how similar each point is to its own cluster vs. adjacent clusters) is a standard alternative that appears in intermediate-level exams.
3. **DBSCAN**: The guide correctly notes k-means prefers spherical clusters but doesn't introduce DBSCAN as the density-based alternative. For a lesson on "common methods," DBSCAN's ability to find non-spherical clusters and handle noise is relevant.
4. **Random Forest / Ensemble methods**: Decision trees alone are presented; random forests (bagging of decision trees) and gradient boosting are common big data classification methods that may be in scope.

## Terminology Notes

- "分群式模式識別" and "規則式模式識別" are pedagogical constructs not found in standard ML literature. They serve the lesson well for exam navigation but should carry a note that these are lesson-specific framings, not industry-standard terms.
- "inertia" as used in sklearn is the exact term for within-cluster SSE — the guide's use is correct and exam-appropriate.
- SMOTE abbreviation expansion "Synthetic Minority Over-sampling Technique" — correctly stated.

## Convergence Notes

- Gemini and independent analysis converge on: (1) SMOTE λ symbol conflict is real and should be fixed, (2) Gini/Entropy formulas missing is a gap for calculation questions, (3) scope is narrower than the lesson title suggests.
- Gemini specifically flagged Association Rules (Apriori/FP-Growth) and Silhouette Score as missing for 中級 level.
- Codex unavailable — single adversary source.
- Data leakage rule (resample only in training split/fold) is correctly and clearly stated — strong point.

## Verdict

**Grade: B+**

Coverage of k-means, decision trees, SMOTE, and evaluation metrics is technically accurate and exam-well-structured. The λ symbol conflict with L22301 must be fixed before cross-lesson study. The absence of Gini/Entropy formulas is a gap for calculation-type questions. Scope may be too narrow if Association Rules appear on the actual IPAS exam — verify the syllabus boundary map before finalizing.
