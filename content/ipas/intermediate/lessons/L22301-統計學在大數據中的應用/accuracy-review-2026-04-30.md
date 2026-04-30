# Accuracy Review — L22301: 統計學在大數據中的應用
Date: 2026-04-30

## Summary

Gemini adversarial review ran successfully; Codex CLI unavailable (model version error). Review based on Gemini + independent analysis.

The guide's technical claims about sklearn.preprocessing APIs (MinMaxScaler, StandardScaler, RobustScaler, PowerTransformer, QuantileTransformer) are largely accurate for exam purposes. However, there are two categories of issues: (1) minor precision errors in formulas and API defaults, and (2) a serious scope mismatch — a lesson titled "統計學在大數據中的應用" covers almost exclusively preprocessing transforms, omitting the statistical concepts that make the title accurate.

## Critical Errors (must fix before publishing)

- **Scope mismatch — lesson title vs. content**: The lesson is titled "統計學在大數據中的應用" but covers only preprocessing scalers and transforms. If the IPAS 中級 syllabus for this topic includes sampling theory, distributed statistics, CLT applications in big data, or Poisson distribution interpretation (all confirmed in Gemini's research-notes reference), these are missing entirely. If the syllabus is actually narrow (sklearn preprocessing only), the lesson title is misleading to students. → **Action required**: Verify the official IPAS syllabus scope for L22301. If sampling/CLT/Poisson are in scope, add a section. If the syllabus truly is limited to preprocessing, add a scope note at the top explaining this.

- **"標準差約為 1" (approximately) for StandardScaler on training data**: The word "約" (approximately) is used throughout. On the training data that was `fit`, StandardScaler produces **exactly** mean=0 and std=1 (to machine precision). The word "約" is only correct for the test set (which uses training-set parameters). Using "約" for the training set description could confuse students into thinking StandardScaler is a heuristic. → Fix: Distinguish "訓練集轉換後 mean=0, std=1 (精確)" from "測試集套用同一組參數，近似 mean=0, std=1".

## Minor Issues

- **RobustScaler `quantile_range` parameter not mentioned**: The guide presents `x' = (x - median) / IQR` as the complete formula. sklearn's `RobustScaler` defaults to `quantile_range=(25.0, 75.0)` which produces IQR (Q3-Q1). However, `quantile_range` is customizable. If an exam question mentions a different quantile range, the denominator changes. Low risk for current IPAS exam, but worth a footnote.

- **PowerTransformer default is `method='yeo-johnson'` — confirmed correct**: Gemini confirms this is accurate for current sklearn. The guide correctly warns students that Box-Cox requires explicit `method="box-cox"`. No fix needed.

- **Box-Cox formula `(x^λ - 1)/λ` for λ≠0 and `ln(x)` for λ=0**: This is the standard Box-Cox (1964) formulation. Technically accurate. However, the guide could clarify that sklearn's implementation applies an additional standardization step by default (`standardize=True`), meaning the output is not purely the Box-Cox value but also shifted/scaled to mean=0, std=1. Minor issue for exam prep — unlikely to be tested at this level.

- **Box-Cox `x > 0` requirement**: The guide states "x > 0" correctly. However, it doesn't explain WHY — which is that the log transform at λ=0 requires strict positivity. The strict positivity (not ≥0) should be emphasized more clearly since students may think x=0 is borderline acceptable.

- **QuantileTransformer non-linearity statement understated**: The guide correctly states it "may distort linear relationships." The deeper issue (not mentioned) is computational cost for very large datasets and sensitivity to tied values in big data contexts. For IPAS 中級 exam, the current phrasing is exam-sufficient.

- **Yeo-Johnson handles 0 and negative values — confirmed correct**: Verified accurate.

## Missing Key Concepts

The following concepts are relevant to "統計學在大數據中的應用" at 中級 level and are absent:

1. **Sampling theory for big data**: Simple random sampling vs. stratified sampling; reservoir sampling for streaming data — standard methods when data is too large to process fully.
2. **Distributed/incremental statistics**: `StandardScaler.partial_fit()` for online/streaming big data scenarios; concept of computing statistics across distributed nodes (Spark, etc.).
3. **Central Limit Theorem in big data context**: Why normality matters for large-sample inference; how CLT enables parametric statistical tests even on non-normal populations at scale.
4. **Poisson distribution interpretation** (flagged by Gemini as appearing in 114-year exam questions): `poisson.pmf/cdf` interpretation for event-count data in big data contexts.

## Terminology Notes

- "正規化" vs "標準化" distinction is correctly handled and clearly explained — good.
- "冪次轉換 (Power Transform)" correctly used as parent category containing Box-Cox and Yeo-Johnson — accurate.
- The guide's use of "約" (approximately) for StandardScaler training output needs correction (see Critical Errors).

## Convergence Notes

- Gemini and independent analysis agree: sklearn API descriptions are largely correct; the scope gap (no sampling, no CLT, no distributed statistics) is the primary concern.
- Codex unavailable due to model version mismatch — no second machine review obtained.
- Gemini flagged Poisson distribution as confirmed exam content (research-notes.md reference) that is completely absent from this guide.

## Verdict

**Grade: B**

Core sklearn preprocessing content is technically accurate and well-structured for exam decision trees. The critical gap is scope: the lesson title promises "statistics in big data" but delivers only "sklearn preprocessing for big data." If the IPAS syllabus confirms this narrow scope, the guide needs a disclaimer. If Poisson and sampling concepts appear on the actual exam, this guide will leave students unprepared for those questions. Fix the "約" precision issue and verify syllabus scope before publishing.
