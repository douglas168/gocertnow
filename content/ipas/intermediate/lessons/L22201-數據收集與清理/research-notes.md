# Research Notes: L22201 數據收集與清理

## Official Sources

- [pandas 3.0.2 — DataFrame.fillna](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.fillna.html): `method=` param fully removed in pandas 3.0; use `df.ffill()` / `df.bfill()` directly.
- [pandas What's New 2.1.0 (Aug 2023)](https://pandas.pydata.org/docs/whatsnew/v2.1.0.html): `downcast=` deprecated in `fillna()`, `ffill()`, `bfill()`, `interpolate()`.
- [pandas What's New 2.2.0 (Jan 2024)](https://pandas.pydata.org/docs/whatsnew/v2.2.0.html): `ffill()`/`bfill()` gain `limit_area=` arg; GroupBy.fillna() deprecated → use GroupBy.ffill()/bfill().
- [pandas What's New 3.0.0 (Jan 2026)](https://pandas.pydata.org/docs/whatsnew/v3.0.0.html): Copy-on-Write becomes the default; any slice is always a copy and never modifies the original.
- [pandas 3.0.2 — DataFrame.drop_duplicates](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html): Parameters `subset=` (column list) and `keep={'first','last',False}` unchanged through 3.x.
- [PySpark 4.1.1 — dropDuplicates](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.dropDuplicates.html): Accepts optional column list; without args deduplicates on all columns.
- [PySpark 4.1.1 — dropDuplicatesWithinWatermark](https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/api/pyspark.sql.DataFrame.dropDuplicatesWithinWatermark.html): Streaming-only; requires prior `withWatermark()` call; evicts state once watermark advances past event_time.
- [Spark 3.5.7 Structured Streaming Guide](https://spark.apache.org/docs/3.5.7/structured-streaming-programming-guide.html): Watermark guarantees data delayed < threshold is always aggregated; data > threshold may be dropped. Works with `append` and `update` output modes only.
- [Databricks — Upsert with MERGE INTO (AWS)](https://docs.databricks.com/aws/en/delta/merge): `MERGE INTO target USING source ON condition WHEN MATCHED THEN UPDATE ... WHEN NOT MATCHED THEN INSERT ...`; ACID via optimistic concurrency; pre-deduplicate source before merge to avoid duplicate inserts.
- [delta.io — Delta Lake Upsert](https://delta.io/blog/delta-lake-upsert/): MERGE INTO is the canonical upsert/deduplication pattern; Delta Log provides ACID snapshot isolation.
- [Databricks — Watermarks](https://docs.databricks.com/aws/en/structured-streaming/watermarks): Global watermark policy (since Spark 2.4) defaults to `min` across sources, retaining more state for consistency.
- [Microsoft Fabric — PII Detection with PySpark](https://blog.fabric.microsoft.com/en-us/blog/privacy-by-design-pii-detection-and-anonymization-with-pyspark-on-microsoft-fabric): Presidio + PySpark for pipeline-scale PII redaction; 50+ built-in recognizers; GPU acceleration in recent releases (4–10× speedup).
- [Google Cloud — De-identification with Cloud DLP](https://cloud.google.com/architecture/de-identification-re-identification-pii-using-cloud-dlp): Pattern: ingest → detect → redact/mask → verify → release; tokenization preserves joinability.
- [Airbyte — Schema Drift in ETL Pipelines](https://airbyte.com/data-engineering-resources/schema-drift-in-etl-pipelines): 30–40% of pipeline outages caused by schema drift; strategies: schema-on-read, versioned schemas, schema registry + validation.
- [Azure Data Factory — Schema Drift](https://learn.microsoft.com/en-us/azure/data-factory/concepts-data-flow-schema-drift): Native schema-drift handling allows optional/unknown fields without breaking pipelines.
- [Soda.io — Data Quality Dimensions](https://soda.io/blog/guide-to-data-quality-dimensions): 6 dimensions: Completeness, Accuracy, Consistency, Timeliness, Uniqueness, Validity.
- [ISO 8000 / arc42](https://quality.arc42.org/standards/iso-8000): ISO 8000 formalises timeliness, completeness, accessibility, accuracy, credibility with measurable metrics.
- [Databricks Blog — ETL vs ELT / Lakehouse](https://www.chapter247.com/blog/etl-is-dead-the-rise-of-elt-and-data-lake-house-architectures/): Raw → Bronze (land as-is) → Silver (clean/deduplicate/cast) → Gold (aggregate/serve); cleaning belongs in Silver zone under ELT.

## Community Insights (exam patterns)

- IPAS 中級 科目二 covers: 數據收集、清理、儲存、管理工具; 統計在大數據中的應用; ETL操作 (缺值處理、異常值修正、欄位格式標準化).
  Source: [CCChen — 中級考試資料整理(一)](https://vocus.cc/article/67ffaf2cfd89780001b0bdfb); [CCChen — 科目二考試整理](https://vocus.cc/article/6806082efd89780001e59aeb)
- Exam frequently tests: choosing between `dropna(how='any')` vs `how='all'`; choosing `fillna(0)` vs `ffill()` for time-series gaps.
- Trap: `fillna(method='ffill')` raises `FutureWarning` in pandas 2.x and is **removed** in 3.0 — exam may test whether candidates know to use `df.ffill()` instead.
- Trap: `dropDuplicates()` on unbounded streaming without a watermark → memory explosion; exam tests understanding of why `withWatermark()` is required.
- ETL vs ELT distinction is explicitly in scope: ETL cleans before load (regulated pipelines, on-prem); ELT loads raw first then cleans in Silver layer (cloud lakehouse default).
- 資料品質 questions tend to use the 5–6 dimension model (Completeness, Accuracy, Consistency, Timeliness, Uniqueness, ±Validity).
- 備考速查表 (CCChen, 2025) confirms Spark, PCA, Z-score, ETL appear in 科目二 multiple times.
  Source: [CCChen — 科目一二三備考速查表](https://vocus.cc/article/68b1692ffd89780001ffcc86)

## Current State (technology)

- **pandas**: stable is **3.0.2** (released Jan 2026). Key 2.x→3.0 breaks: `method=` in `fillna()` removed; Copy-on-Write now default (chained assignment silently does nothing, then raises). `dropna(how=, subset=, thresh=)` parameters unchanged.
- **PySpark**: latest stable **4.1.1**. `dropDuplicatesWithinWatermark()` is the preferred streaming dedup API over `dropDuplicates()` + `withWatermark()` manual pattern.
- **Delta Lake**: open-source **3.x** (delta-spark 3.2+). `MERGE INTO` syntax stable; `whenNotMatchedBySource` clause added in Delta 2.4 for delete-on-no-match.
- **Deprecated (exam trap)**: `fillna(method='ffill'/'bfill')` — deprecated 2.1, removed 3.0. Use `df.ffill()` / `df.bfill()`.
- **Deprecated**: `DataFrameGroupBy.fillna()` — use `GroupBy.ffill()` / `GroupBy.bfill()` instead.
- **Deprecated**: `downcast=` parameter in `fillna()`, `ffill()`, `bfill()`, `interpolate()`.

## External Documents Found

- [115年度 IPAS 中級簡章 PDF](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf): Confirms 科目二 = 大數據處理分析與應用; L22201 is explicitly listed.
- [Spark 3.5.7 Structured Streaming Guide](https://spark.apache.org/docs/3.5.7/structured-streaming-programming-guide.html): Watermark semantics, output modes, deduplication patterns — primary reference.
- [CCChen Vocus articles (multiple)](https://vocus.cc/article/67ffaf2cfd89780001b0bdfb): Community exam recap; confirmed ETL, Spark, 缺值處理, 異常值 appear in 科目二.
- ISO 8000-2:2022 vocabulary — paywalled; arc42 summary sufficient for exam level.

## Key Findings Summary

- **pandas 3.0 is the current stable**: `fillna(method=)` is gone — always write `df.ffill()` or `df.bfill()`. `drop_duplicates(subset=, keep=)` API is unchanged.
- **PySpark streaming dedup**: use `withWatermark("event_time", "2 hours").dropDuplicatesWithinWatermark(["id"])` — this bounds state size. Plain `dropDuplicates()` without watermark causes unbounded state growth.
- **Delta Lake MERGE INTO** is the production upsert/dedup pattern: pre-deduplicate the source DataFrame first, then merge; ACID guarantees snapshot isolation.
- **Schema drift** is a top cause of pipeline failures (30–40% of outages); detection strategies: schema registry, CDC, schema-on-read in data lake zones.
- **ELT / Lakehouse default**: cleaning (dedup, type coercion, PII redaction) happens in the Silver layer after raw landing; ETL (clean before load) is used for regulated or bandwidth-constrained pipelines.

## Scope Notes

- "特徵提取" in L22201 = regex/parsing extraction of structured fields from raw logs/text — NOT sklearn feature extraction or SelectKBest. Keep examples to `re.findall`, `str.extract`, JSON path parsing.
- IQR and Z-score outlier detection are in scope as pipeline cleaning steps (flag-and-remove or clip). Do NOT extend into SMOTE, StandardScaler, or train/val/test split — those belong to L23301.
- PII redaction (Presidio, tokenization, pseudonymization) is in scope; anonymization k-anonymity / differential privacy are borderline — mention as concepts only, not exam mechanics.
- Late-arriving records and watermark policy are in scope for streaming pipeline context; do not extend into Spark MLlib or model training pipelines.
