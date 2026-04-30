# Accuracy Review — L22401: 大數據與機器學習
Date: 2026-04-30
Reviewers: Gemini (rate-limited, no output), Codex (broken — gpt-5.5 version mismatch), Claude Sonnet 4.6 (primary adversarial reviewer)

## Summary
The guide covers 5V, training modes (full-batch/mini-batch/online), centralized vs distributed training, data vs model parallelism, Parameter Server, AllReduce/Ring-AllReduce, and Spark MLlib. Core pedagogy is sound — the situational judgment framing is appropriate for an IPAS intermediate exam. No critical factual errors were found that would mislead students. Several nuance issues and one missing concept warrant attention before publishing.

## Critical Errors (must fix before publishing)
None identified that would cause exam failure. No outright false claims.

## Minor Issues

- **AllReduce vs Ring-AllReduce conflation:** The guide presents AllReduce and Ring-AllReduce as nearly synonymous ("Ring-AllReduce 則以環狀方式傳遞與聚合"). Technically: AllReduce is the abstract operation; Ring-AllReduce is one specific algorithm implementing it. Tree-AllReduce is another. For an intermediate exam, this simplification is acceptable, but the guide should note "Ring-AllReduce is the most common concrete implementation of AllReduce, used by NCCL/Horovod."

- **5V vs 6V/7V scope:** The guide uses 5V (Volume, Velocity, Variety, Veracity, Value). Some ITRI/IBM materials use 6V (adding Variability) or 7V (adding Visualization). The guide does not acknowledge this variation. For IPAS specifically, 5V is the most commonly tested framework, but a one-sentence footnote noting "some sources list 6V or 7V" would prevent confusion if exam options include Variability.

- **Concept Drift vs Covariate Shift distinction:** The guide says "若只是輸入分布改變，較接近 Data Drift / Covariate Shift." This is technically correct: Concept Drift = P(Y|X) changes; Covariate Shift = P(X) changes while P(Y|X) stays the same. The guide's framing is accurate for exam purposes.

- **Out-of-core learning Chinese term:** "磁碟外學習" is a reasonable translation but not universally standardized in Taiwan. The English "Out-of-core Learning" is the more stable anchor. No correction needed but students should know the English term is primary.

- **Spark MLlib currency:** Spark MLlib is correctly characterized, but the guide should note that for deep learning workloads, PyTorch/Lightning with Horovod or DeepSpeed has largely supplanted Spark MLlib. For traditional ML at scale (Gradient Boosted Trees, Logistic Regression on large tables), Spark MLlib remains relevant. The guide's framing covers the exam-relevant use case.

## Missing Key Concepts
- **Pipeline Parallelism** is not mentioned. L22403 covers it in the context of generative AI distributed training, but for completeness in L22401's distributed training section, a brief note would strengthen coverage.
- **ZeRO (Zero Redundancy Optimizer)** from DeepSpeed is a third major approach to distributed training (beyond data/model parallelism) relevant for 2024-2026. Not exam-critical at intermediate level, but worth a footnote.

## Terminology Notes
- 分散式訓練 (Distributed Training): correct and standard.
- 資料並行 (Data Parallelism) / 模型並行 (Model Parallelism): correct.
- 概念漂移 (Concept Drift): correct and matches industry usage.
- 批次訓練 (Batch Training) vs 小批次訓練 (Mini-batch Training): correct.
- 線上學習 / 增量學習 (Online / Incremental Learning): correct pairing.

## Convergence Notes
Gemini: rate-limited, no output. Codex: broken (version mismatch). Claude adversarial analysis was sole technical reviewer for this lesson.

## Verdict
**Grade: A−** — Technically accurate, well-structured, appropriate for IPAS intermediate exam. Minor gaps: AllReduce/Ring-AllReduce distinction should be one sentence cleaner; a footnote on 6V variants would prevent surprise on exam day. No changes required before publishing, but the 2 minor issues above are worth a quick polish pass.
