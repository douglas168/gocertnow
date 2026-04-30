# Accuracy Review — L22102: 機率分佈與資料分佈模型
Date: 2026-04-30

## Summary
Core formulas (PMF, PDF, CDF, distribution parameters) are all correct. However, the guide has three substantive gaps that can produce wrong answers: missing continuity correction for Binomial-Normal approximation, vague approximation thresholds (no n≥30 for CLT, no n≥100 for Poisson approximation), and the complete omission of the Exponential distribution which is almost always paired with Poisson in IPAS intermediate exams.

## Critical Errors (must fix before publishing)

- **Continuity Correction completely absent**: The guide teaches Binomial → Normal approximation (when np≥5 and n(1-p)≥5) but never mentions the continuity correction (+0.5/-0.5). Without it, P(X≤k) calculated via the Normal will be materially wrong. This is a known IPAS exam trap. At minimum, a note is needed: "用 Normal 近似 Binomial 時，`P(X ≤ k)` 對應 `P(Y < k + 0.5)`（連續性修正）。"

- **CLT "樣本數夠大" has no threshold**: The document says "只要樣本數夠大" without specifying the standard threshold. The conventional rule of thumb used in Taiwan introductory and intermediate statistics is **n ≥ 30**. Without this number, candidates cannot apply CLT in calculation questions. Add: "一般以 n ≥ 30 為實務門檻。"

- **Binomial → Poisson approximation conditions are vague**: "n 很大、p 很小" is non-actionable on an exam. Standard conditions are **n ≥ 100 且 np ≤ 10** (or equivalently λ = np is small, typically ≤ 7). The document must provide concrete thresholds.

## Minor Issues

- **np ≥ 5 condition for Binomial → Normal**: The document uses the lenient threshold (np ≥ 5 and n(1-p) ≥ 5). Some Taiwan university textbooks and stricter IPAS question writers use **np ≥ 10 and n(1-p) ≥ 10**. The document should note: "部分教材要求 np ≥ 10；此處採用最小門檻 np ≥ 5。"

- **Continuous vs. Discrete Uniform not distinguished**: The guide's Uniform distribution section only covers the continuous case. The variance formula `(b-a)²/12` is for continuous Uniform only. Discrete Uniform (e.g., rolling a fair die) has variance `(n²-1)/12`. The guide should note: "本課以連續型均勻分佈為主；離散均勻分佈公式不同。"

- **Standard Normal Distribution (標準常態分佈) never named**: The document describes z-score standardization but never explicitly names the resulting distribution as 標準常態分佈 N(0,1), which is a frequent term in IPAS questions.

## Missing Key Concepts

- **Exponential Distribution (指數分佈)**: This is a critical gap. Poisson (count of events in fixed time) and Exponential (time between events) are almost always tested together in IPAS intermediate exams. Key facts: `X ~ Exp(λ)`, `E[X] = 1/λ`, Var = `1/λ²`, and the memoryless property (無記憶性). Its complete absence is the single biggest risk for an intermediate candidate using only this guide.

- **Standard Error vs. Standard Deviation**: CLT says the sampling distribution of the sample mean has variance σ²/n, so standard deviation (standard error) = σ/√n. The document uses "變異" loosely without distinguishing variance (σ²/n) from standard error (σ/√n). Exam questions routinely test this distinction.

- **Bernoulli Distribution (白努利分佈)**: The special case Binomial(1, p) is a conceptual building block and appears in questions about binary outcomes.

- **i.i.d. assumption for CLT**: CLT requires observations to be independent and identically distributed. The document omits independence as a prerequisite for the σ²/n formula.

## Terminology Notes

- "累積分配函數" — acceptable; "累積分布函數" is the more modern form in AI/Data Science contexts in Taiwan, but both are correct.
- "平均率" for Poisson λ → more precise: **平均發生率** or **平均次數（每單位時間或空間）**
- The guide does not use "標準常態分佈" — should be added where z-score is introduced.

## Convergence Notes

Both Gemini and my own review independently identified the missing continuity correction as the most dangerous omission — an intermediate candidate who applies Normal approximation without it will compute wrong probabilities. Both also flagged the vague approximation thresholds (CLT n≥30, Binomial-Poisson specific conditions). Gemini additionally raised the Exponential distribution gap as the most significant missing concept; this review fully corroborates that finding. Gemini raised the discrete Uniform variance formula as a distinct trap; this review agrees.

Codex CLI was unavailable due to a model version error and did not produce a review.

## Verdict
The distribution formulas are technically correct but the guide has a dangerous gap in CLT/approximation conditions and a critical missing distribution (Exponential). These gaps make it incomplete for IPAS intermediate level. Grade: **B−** — requires fixes for the continuity correction, CLT threshold, and Exponential distribution before publishing.
