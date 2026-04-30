# Accuracy Review — L22103: 假設檢定與統計推論
Date: 2026-04-30

## Summary
The hypothesis testing framework, p-value decision rules, and test selection logic are all correct and well-structured. However, the guide has a significant gap: it never states the assumptions for t-tests and ANOVA (normality, homogeneity of variance), and it does not mention the expected-count requirement for chi-square tests. The CI-hypothesis duality is taught only for two-tailed tests without noting it breaks down for one-tailed tests or non-t-test procedures.

## Critical Errors (must fix before publishing)

- **t-test and ANOVA assumptions are completely absent**: The guide teaches one-sample, two-sample, and paired t-tests with no mention of their assumptions: (1) normality within each group, or large sample size (n ≥ 30 by CLT), (2) independence of observations. For independent two-sample t-test, equal variance is assumed (equal_var=True) unless Welch's is used, but the document describes this without telling the candidate *when* to choose each. IPAS intermediate questions routinely present a scenario and ask "which test is appropriate given these conditions?" — a candidate who cannot recognize assumption violations will fail those questions.

- **Chi-square expected-count assumption missing**: `chi2_contingency` requires that all expected cell counts be ≥ 5 (strict: all cells; practical: at least 80% of cells ≥ 5, none < 1). The guide only says "input must be observed counts, not percentages" but omits this critical validity condition. When expected counts are too small, chi-square approximation is invalid and Fisher's Exact Test should be used instead.

- **95% CI → reject H0 duality is only valid for two-tailed tests**: The document teaches "95% CI 不包含假設值 → 拒絕 H0 (α=0.05)" as a general rule but never states it is only valid for two-tailed tests at the matching confidence level. For a one-tailed test at α=0.05, the equivalent CI is a 90% two-tailed CI (or a one-sided 95% CI). If a candidate applies the two-tailed 95% CI to a one-tailed test conclusion, they will get the wrong answer.

## Minor Issues

- **When to use Welch's t-test not stated**: The document notes `equal_var=False → Welch's t-test` but does not tell the candidate when to choose it. Standard guidance: use Welch's when you cannot assume equal variances between groups (e.g., when sample sizes differ substantially, or when Levene's test is significant). Without this guidance, the distinction is cosmetic.

- **F ≈ 組間差異/組內波動 is imprecise**: Technically F = MS_between / MS_within where MS = sum of squares / degrees of freedom. The "波動" phrasing conflates with standard deviation. Recommend: "F ≈ 組間均方（MS_between）/ 組內均方（MS_within）".

- **One-way ANOVA assumptions not stated**: Requires (1) normality within each group or large samples, (2) homogeneity of variance (Levene's test), (3) independence. Omitting these means candidates cannot evaluate whether ANOVA is appropriate for a given scenario.

- **Post-hoc logic not described**: The guide correctly states ANOVA cannot identify *which* groups differ, but should note the concept of post-hoc tests (e.g., Tukey HSD) by name even if calculation is out of scope. Knowing the term is needed for multiple-choice recognition.

- **Degrees of freedom (自由度) not explained**: The chi-square dof = (r-1)(c-1) is not stated, though SciPy returns it as the third output of `chi2_contingency`. Candidates may see dof in exam questions without knowing how to calculate it.

## Missing Key Concepts

- **Test assumptions as a decision layer**: The decision tree in Section 8 goes directly from "question type" to "test choice" without an intermediate step for checking assumptions. A proper flow should be: identify question type → check assumptions → select test → interpret result.

- **Effect size vs. statistical significance**: Even a brief note that "統計顯著不等於實務顯著" (statistical significance ≠ practical significance) would protect candidates from the p-value interpretation trap. Very large samples can produce p < 0.05 for trivially small effects.

- **Levene's test / F-test for variance equality**: Needed to decide between pooled and Welch's t-test. Should at least be named.

## Terminology Notes

- "組內波動" → should be **組內均方 (MSW / MS_within)** for precision
- "計數表" → prefer the standard term **列聯表 (contingency table)**
- "雙尾/左尾/右尾" → academically also written as **雙邊/單邊檢定**; both forms acceptable but candidates should recognize both
- Type I/II labeled as "false positive / false negative" — this is correct and matches modern ML-adjacent usage; acceptable for IPAS context

## Convergence Notes

Both Gemini and my own review independently and strongly flagged the missing test assumptions (normality, homogeneity of variance for t-test and ANOVA; expected counts for chi-square) as the most critical gap. Gemini specifically noted this is a "必考點" for IPAS intermediate level scenario questions. Both reviewers also independently identified the CI-two-tailed-only limitation. Gemini raised the degrees of freedom omission; this review corroborates it. The F-statistic imprecision ("波動" vs. "均方") was flagged by both independently.

Codex CLI was unavailable due to a model version error and did not produce a review.

## Verdict
The hypothesis testing logic and decision framework are correct and well-explained. The guide's primary failure is omitting statistical assumptions — without them, candidates cannot answer "which test is appropriate here?" scenario questions. Grade: **B** — requires additions for test assumptions and chi-square expected-count rule before publishing.
