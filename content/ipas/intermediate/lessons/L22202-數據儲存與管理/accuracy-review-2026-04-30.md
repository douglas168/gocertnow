# Accuracy Review — L22202: 數據儲存與管理
Date: 2026-04-30

## Summary

Review conducted by Claude (adversarial mode). Gemini CLI was quota-exhausted; Codex CLI requires version upgrade. Single-model adversarial pass.

The guide is well-structured and mostly accurate. One conceptual conflation (Delta Lake as "Lakehouse" vs table format) is worth noting. One missing major concept (Apache Hudi). The Dataset Versioning / Time Travel boundary needs sharpening. Otherwise the storage architecture content holds up well against 2025-2026 standards.

---

## Critical Errors (must fix before publishing)

- **`Delta Lake, Apache Iceberg → Lakehouse 代表概念`** — This conflation is technically imprecise. Delta Lake and Apache Iceberg are **open table formats** (or table format protocols), not complete lakehouse platforms. The Lakehouse *platform* concept (as coined by Databricks) uses Delta Lake as its underlying format. Apache Iceberg is used by Snowflake, AWS Glue, and others. A student could be confused if an exam question distinguishes "table format" from "lakehouse platform." The Exam Rule currently says: "Delta Lake / Apache Iceberg → Lakehouse 代表概念" — this is directionally correct for exam matching purposes, but should be clarified: "Delta Lake / Apache Iceberg 是 Lakehouse 的核心表格格式，不是完整平台。"

- **`Dataset Versioning 代表例子包含 Delta Lake / Iceberg 的表版本能力`** — Delta Lake's Time Travel and Dataset Versioning (DVC, lakeFS) solve adjacent but different problems. Time Travel = query a prior table state; Dataset Versioning = track which exact dataset snapshot was used for a model training run. Conflating them under the same concept risks wrong exam answers. They should be presented as related but distinct: "Time Travel 是查某時間點資料狀態；Dataset Versioning 是追蹤模型訓練使用哪份資料的版本。"

---

## Minor Issues

- **Snowflake / BigQuery 類概念 as Data Warehouse examples** — Both have evolved. Snowflake supports external tables and Iceberg integration (partially lakehouse). BigQuery Omni and BigLake support Data Lake-like access patterns. For exam prep, using them as "Data Warehouse 概念" examples is still acceptable — they primarily serve OLAP/BI use cases — but noting they have "lakehouse-lite" capabilities would reflect 2025 reality. Not a critical error; keep as-is with optional note.

- **Wide-Column vs Column-Store distinction** — The guide correctly separates these (Trap 4). Wide-Column = NoSQL data model (HBase, Cassandra); Column-Store = analytical storage layout (OLAP, Parquet). This is one of the most commonly confused pairs, and the guide handles it well.

- **ACID descriptions** — All four components are correctly defined: Atomicity (all-or-nothing), Consistency (rules maintained), Isolation (concurrent transactions don't interfere), Durability (committed data survives crashes). No errors.

- **Feature Store: Feast + Tecton** — Both are real, current Feature Store tools. Feast is widely used open-source; Tecton is a commercial managed Feature Store. The Online Store / Offline Store distinction is correctly framed: Offline = batch historical features for training; Online = low-latency real-time features for inference. No errors.

- **`createOrReplaceTempView()` is a temporary view, not permanent table** — Correct. It creates a session-scoped view that disappears when the Spark session ends.

---

## Missing Key Concepts

- **Apache Hudi** — The third major open table format alongside Delta Lake and Iceberg is entirely absent. For a 2025-2026 exam on data lakehouse storage, Hudi (Hadoop Upserts, Deletes and Incrementals) is increasingly testable, especially in AWS contexts (used by EMR, Athena). At minimum, a note: "Apache Hudi 是另一種 Lakehouse 表格格式，常見於 AWS 生態（EMR、Athena）。" would cover this.

- **NameNode SPOF (single point of failure)** — For HDFS without HA configuration, NameNode is a single point of failure. This is a classic exam trap. The guide defers HDFS detail to L22203, but the conceptual risk is exam-relevant for storage architecture discussions. Low priority given lesson boundary, but worth noting.

- **NoSQL transactions** — Some modern NoSQL systems (MongoDB 4.0+, CockroachDB) support multi-document ACID transactions. The guide implies NoSQL = BASE only, which is outdated for 2025. For exam purposes this may be acceptable simplification, but a hedge note would improve accuracy.

---

## Terminology Notes

- **資料湖 / 資料倉儲 / 資料湖倉** — These three terms map correctly to Data Lake / Data Warehouse / Data Lakehouse. Standard industry Chinese.

- **寬欄式 (Wide-Column)** — The guide uses "Wide-Column" in English throughout; "寬欄式資料庫" is the Chinese equivalent. Both are acceptable in Taiwan tech context.

- **特徵儲存庫 (Feature Store)** — The guide correctly notes this is a data layer, not an algorithm. Terminology is accurate.

- **時間旅行 (Time Travel)** — Correct Chinese rendering of Delta Lake / Iceberg's version query capability.

---

## Convergence Notes

Both CLI tools failed. Single-reviewer pass. The two issues flagged as critical (Delta Lake as format vs platform, Time Travel vs Dataset Versioning conflation) are architecture-level distinctions that could appear in IPAS中級 exam questions. Hudi's absence is noted by any current data engineering reviewer familiar with the 2024-2025 lakehouse landscape.

---

## Verdict

**Grade: B+**

Strong coverage of storage architecture concepts. The Delta Lake / Iceberg "table format vs platform" conflation and the Dataset Versioning / Time Travel boundary are the two precision fixes most likely to matter on exam day. Apache Hudi's absence is a minor gap. All ACID, NoSQL type, and OLTP/OLAP distinctions are correct.
