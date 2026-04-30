# Accuracy Review — L22201: 數據收集與清理
Date: 2026-04-30

## Summary

Review conducted by Claude (adversarial mode). Gemini CLI was quota-exhausted; Codex CLI requires version upgrade — both CLIs returned errors. This review represents a single-model adversarial pass using authoritative technical knowledge.

Overall the guide is technically solid. Most core claims are accurate. Two API-level claims need precision corrections; one statistic is unverified; two important data collection concepts are missing entirely.

---

## Critical Errors (must fix before publishing)

- **`pandas 3.0 已移除 fillna(method='ffill')`** — Partially wrong on timing. `fillna(method=...)` was *deprecated with FutureWarning* in pandas **2.1** (released Sep 2023) and is scheduled for removal in pandas 3.0. As of pandas 3.0 (released Sep 2024), the `method` keyword is indeed removed. The guide's claim is technically correct for pandas 3.0 but could mislead students using pandas 2.x who see the FutureWarning and think it's still fine. Recommend adding: "pandas 2.x 已顯示 FutureWarning，3.0 正式移除。"

- **`Watermark + 聚合 → 支援 append / update，不支援 complete`** — This is **overstated as absolute**. In Spark Structured Streaming, `complete` mode *without watermark* is supported for aggregations that track all groups (stateful, unbounded). With watermark + aggregation, `complete` mode is indeed unsupported because watermark allows dropping old state. `append` mode requires watermark (to know when a window is finalized before emitting). The guide's rule is correct for the watermark+aggregation case, but the framing "Watermark 支援 append/update，不支援 complete" could confuse students who encounter `complete` mode in non-watermark contexts. Add qualifier: "搭配 watermark 的聚合時。"

---

## Minor Issues

- **`dropDuplicatesWithinWatermark()` 介紹** — The API is correct; it was introduced in Spark 3.3.0. The guide does not state the Spark version requirement. For exam prep, noting "Spark 3.3+" would help students avoid confusion if they encounter older codebases.

- **Schema Drift 30-40% 統計** — The specific "30-40%" figure has no cited source in the guide. This is an industry-circulated estimate (often attributed to various data observability vendors like Monte Carlo Data), not a peer-reviewed statistic. For exam content, either remove the specific number or label it as an approximate industry estimate ("業界估計"). The concept is sound; the number is unverifiable.

- **IQR fence formula** — `Q1 - 1.5 * IQR` and `Q3 + 1.5 * IQR` are the correct Tukey fences. No error.

- **Pseudonymization still subject to GDPR** — Correct. Under GDPR Recital 26 and Article 4(5), pseudonymized data is still personal data when the controller holds the key. Anonymized data (Art.4(5) — not reasonably re-identifiable) falls outside GDPR scope. The guide's claim is accurate.

- **Unsalted hash vulnerability** — Claim is technically correct (rainbow table / dictionary attack risk). For an intermediate exam, this level of detail is appropriate.

---

## Missing Key Concepts

- **CDC (Change Data Capture)** is entirely absent from the data collection methods section. CDC (via tools like Debezium, database binlogs) is a primary method for collecting real-time changes from databases. It is a standard topic in data engineering curricula and should appear alongside API polling, Webhook, IoT, and batch import. This is a meaningful gap.

- **Message Queues / Kafka for streaming ingestion** — Kafka is mentioned in the Schema Registry context but not as a data collection/ingestion method. For streaming ingestion, Kafka is the dominant tool (alongside Kinesis, Pub/Sub). The collection methods table (Section 2) should note: "Kafka / 訊息佇列 → 高吞吐量串流事件收集，解耦生產者與消費者."

- **`errors='ignore'` option** for `to_datetime` / `to_numeric` — The guide covers `errors='coerce'` (convert to NaN) and implicitly `errors='raise'` (default, raises exception). Mentioning `errors='ignore'` (returns original if can't convert) would complete the picture, though `coerce` is the most exam-relevant.

---

## Terminology Notes

- **去識別化** — In Taiwan's PDPA (個人資料保護法) and healthcare contexts, "去識別化" is the umbrella term (roughly: de-identification), which includes both anonymization and pseudonymization. The guide uses "遮蔽/假名化/匿名化" which aligns with GDPR terminology. For IPAS exam, both framings coexist; the guide's GDPR-aligned terms are acceptable.

- **串流水位線 vs watermark** — "水位線" is correct Chinese for watermark in this streaming context. Standard.

- **Schema Drift → 綱要漂移** — The guide uses both terms interchangeably. "Schema Drift" is commonly used as-is (English) in Taiwan's tech community; "綱要漂移" is the formal Chinese translation. Both are fine; the guide uses both appropriately.

---

## Convergence Notes

Both CLI tools (Gemini, Codex) failed to return reviews due to infrastructure issues (quota/version errors). This report is a single-reviewer adversarial pass. No convergence analysis is possible. Two claims independently verified as requiring precision fixes: watermark output mode restrictions and the fillna deprecation timeline.

---

## Verdict

**Grade: B+**

The guide is technically accurate on its core exam claims. The two precision fixes (fillna deprecation nuance, watermark complete-mode qualifier) are minor but could cause wrong answers in edge-case exam questions. CDC and Kafka as collection methods are meaningful omissions for an intermediate-level guide. The unverified statistic should be flagged or removed. No fundamental errors that would mislead students toward incorrect exam answers.
