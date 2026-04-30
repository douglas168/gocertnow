# Accuracy Review — L22101: 敘述性統計與資料摘要技術
Date: 2026-04-30

## Summary
The guide is structurally sound and covers the core descriptive statistics concepts correctly. Most formulas and API facts are accurate, but three claims are oversimplifications that can produce wrong answers on an exam: the mean/median/mode ordering rule for skewed distributions, the quartile calculation method mismatch with numpy/pandas defaults, and the presentation of |z|>3 as a universal outlier rule.

## Critical Errors (must fix before publishing)

- **Skewness ordering rule stated as "Exam Rule"**: The claim `positive skew → mean > median > mode` is a heuristic for smooth unimodal distributions, not a mathematical law. It fails for multimodal, discrete, or heavy-tailed distributions. The document should qualify this as "common pattern for unimodal distributions" rather than presenting it as an absolute exam rule. Gemini flagged this as the top structural risk.

- **Quartile calculation mismatch (numpy/pandas vs. manual)**: For `[1,2,3,4,5,6,7,20]`, the document claims Q1=2.5 and Q3=6.5. This is correct using Tukey hinges (the standard for manual calculation and `describe()`-style boxplots). However, `numpy.percentile` / `numpy.quantile` default to linear interpolation, giving Q1=2.75 and Q3=6.25. An intermediate candidate who uses `np.quantile()` to verify will get a different answer. The document does not warn about this discrepancy. Should add a note: "手算用 Tukey hinges；numpy.percentile 預設線性內插，結果可能略不同。"

## Minor Issues

- **|z| > 3 presented without qualifier**: This threshold assumes approximately normal data. For right-skewed distributions (income, sales), a z-score of 3 may be a valid data point. Should add: "適用前提是資料大致常態。"

- **CV denominator assumption unstated**: CV = SD/mean × 100% is only meaningful for ratio-scale data with a true zero. Applying CV to Celsius temperature or net profit/loss (negative mean possible) is statistically invalid. The document does not mention this limitation.

- **"Fisher 過峰度" is non-standard terminology**: The academically standard Chinese term is **超額峰度 (excess kurtosis)**. "Fisher 過峰度" may confuse candidates reading standard textbooks. Recommend changing to "超額峰度（Fisher 定義，excess kurtosis）".

- **`nunique()` NaN handling note is correct but incomplete**: The claim "預設不算 NaN" is correct. However, the parameter `dropna=False` that changes this behavior is not mentioned. Not a critical error but worth a footnote.

## Missing Key Concepts

- **Trimmed mean (截尾平均數)**: Intermediate-level candidates may see this term. When outliers are present, a 5% or 10% trimmed mean is a robust alternative to median that retains more information.

- **Geometric mean and harmonic mean**: Some IPAS intermediate questions test these for growth rates and speed averaging. Brief mention warranted.

- **Bimodal / multimodal distributions**: The skewness ordering rule (mean/median/mode) completely breaks down for multimodal data. The document assumes all distributions are unimodal without stating this.

## Terminology Notes

- "Fisher 過峰度" → should be **超額峰度** or **超峰度（excess kurtosis）**
- "Pearson 峰度" → acceptable but should add clarification: "Pearson 定義，以常態分佈為基準 3"
- "cardinality" in `nunique()` note → should include Chinese term **基數** or **相異值數量**

## Convergence Notes

Both Gemini and my own review independently identified the skewness mean/median/mode ordering as the top structural issue: it is a heuristic presented as an absolute rule. Both also flagged the quartile method mismatch (manual Tukey hinges vs. numpy interpolation) as a trap point for intermediate candidates. Gemini additionally raised CV limitations and terminology concerns which this review corroborates.

Codex CLI was unavailable due to a model version error and did not produce a review.

## Verdict
The guide is technically accurate for most claims and safe for the majority of exam questions. The skewness ordering "rule" and the undisclosed quartile method gap are the two most likely sources of wrong answers. Grade: **B+** — publish with the two critical fixes applied.
