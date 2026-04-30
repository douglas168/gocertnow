# Accuracy Review — L22203: 數據處理技術與工具
Date: 2026-04-30

## Summary

Review conducted by Claude (adversarial mode). Gemini CLI was quota-exhausted; Codex CLI requires version upgrade. Single-model adversarial pass.

This is the strongest of the three guides in terms of technical accuracy. HDFS numbers are correct; MapReduce flow is correctly described; Spark abstractions are precisely differentiated; SQL window function examples are accurate. Two meaningful gaps: NameNode SPOF is absent; Apache Flink is not mentioned. The Structured Streaming micro-batch characterization is defensible but needs a hedge for Spark 3.4+ Continuous Processing.

---

## Critical Errors (must fix before publishing)

No critical factual errors found.

---

## Minor Issues

- **HDFS block 預設大小 128 MB** — Correct for Hadoop 2.x and later. Hadoop 1.x defaulted to 64 MB. The guide correctly frames 64 MB as the "trap" (old version impression). This is accurate for any Hadoop installation in use as of 2025.

- **Structured Streaming "micro-batch 心智"** — Spark 3.4+ added Continuous Processing mode (low-latency, ~1ms) as an experimental/production feature alongside the default micro-batch mode. The guide tells students to "記成 micro-batch，不是嚴格逐事件 true streaming." This is still the correct default mental model — Continuous Processing requires `trigger(continuous=...)` and has limitations (no aggregations, limited sink support). The guide's recommendation is safe for exam purposes. Recommend adding one sentence: "Spark 3.4+ 有 Continuous Processing 模式，但預設仍是 micro-batch；考試未特別說明時選 micro-batch。"

- **`Dataset[Row]` = DataFrame in Scala/Java** — Correct. In Spark's Scala/Java API, `DataFrame` is a type alias for `Dataset[Row]`. The guide states "DataFrame 在 Scala/Java 可視為 Dataset[Row]" — accurate. PySpark uses `DataFrame` natively; the `Dataset` type is not available in Python.

- **MapReduce: Combiner not mentioned** — The Combiner (mini-reducer that runs locally on the mapper node to pre-aggregate before shuffle) is omitted. It is an optional optimization step that reduces network traffic during Shuffle and Sort. For an intermediate exam, Combiner could appear as a distractor or correct answer when the question asks about MapReduce optimization. Recommend adding one line in Section 2: "Combiner（選用）：在 Map 節點本地先合併，降低 Shuffle 網路傳輸量。"

- **`Dataset` type safety claim** — "Dataset 強調 Scala/Java 型別安全" — Correct. The `Dataset[T]` API (where T is a case class/Java bean) provides compile-time type checking unavailable in Python/R where only DataFrame exists. No error.

- **Catalyst Optimizer scope** — "DataFrame / Dataset 有 schema 與 logical plan，較能被 Catalyst Optimizer 最佳化；RDD 較低階，不是 Catalyst 主要優化對象" — Correct. RDD operations bypass the Catalyst planner entirely. The guide accurately characterizes this.

- **DENSE_RANK() 100,100,90 → 1,1,2** — Correct SQL behavior. `ROW_NUMBER` → 1,2,3; `RANK` → 1,1,3; `DENSE_RANK` → 1,1,2. No errors.

- **dbt as Transform layer** — Correct. dbt is a transformation framework; it has no extraction capability. The guide says "dbt 最接近 Transform 層，不等於所有抽取工作，也不等於完整 ETL 平台" — precisely right.

---

## Missing Key Concepts

- **NameNode SPOF (single point of failure)** — This is the most important architectural weakness of HDFS and a classic exam trap. Without High Availability (HA) configuration (Active/Standby NameNode with ZooKeeper), the NameNode is a single point of failure for the entire HDFS cluster. The guide covers block replication for DataNode fault tolerance but says nothing about NameNode failure risk. For IPAS中級 exam, this omission is significant. Recommended addition to Section 2: "NameNode 單點故障（SPOF）：無 HA 配置時，NameNode 失效整個 HDFS 不可用。生產環境需設定 Active/Standby NameNode。"

- **Apache Flink** — Completely absent from the stream processing section. Flink is the dominant true-streaming (event-by-event) engine in production as of 2025, used by Alibaba, Uber, LinkedIn. For an intermediate data engineering exam, Flink vs Spark Structured Streaming is a standard comparison question. The guide's stream processing section only mentions Spark. Recommend adding to Section 4: "Apache Flink 是另一常見串流處理引擎，以逐事件（event-by-event）真正串流著稱，不是 micro-batch。Spark Structured Streaming vs Flink：前者 DataFrame/SQL API + micro-batch；後者真正串流 + 複雜事件處理。"

- **Kafka as data processing context** — Kafka is mentioned in L22201 for Schema Registry. In L22203's processing pipeline section, Kafka as a streaming source/sink for Spark Structured Streaming is not mentioned. The `readStream.format("kafka")` pattern is fundamental to production Spark streaming pipelines.

---

## Terminology Notes

- **有向無環圖 (DAG)** — The guide uses "DAG" in English throughout. "有向無環圖" is the correct Chinese. Both are acceptable; the English abbreviation is standard in Taiwan tech context.

- **延遲求值 (Lazy Evaluation)** — The guide uses "Lazy Evaluation" with Chinese explanation. "延遲求值" or "惰性求值" are both acceptable Chinese renderings. No issue.

- **Catalyst Optimizer** — Used as-is (English). No established Chinese equivalent in common use. Correct to use English term.

- **視窗函數 (Window Function)** — The guide uses both "Window Function" and "視窗函數." Both are standard. The SQL `OVER(...)` syntax examples are all correct.

- **水平切分 (Sharding) / 副本 (Replication)** — Both terms correctly introduced and distinguished in HDFS context.

---

## Convergence Notes

Both CLI tools failed. Single-reviewer adversarial pass. The two missing concepts (NameNode SPOF, Apache Flink) are independently high-priority: NameNode SPOF is a classic exam trap that could generate wrong answers; Flink's absence leaves a gap in the standard Spark vs Flink comparison that appears in intermediate data engineering exams. The Combiner omission is a minor optimization detail but could appear as a distractor.

---

## Verdict

**Grade: A-**

The most accurate of the three guides. No critical errors in the core claims. SQL window function examples are flawless. Spark abstraction hierarchy (RDD/DataFrame/Dataset) and Lazy Evaluation are correctly described. The two missing concepts (NameNode SPOF, Apache Flink) are the primary gaps — one is an exam trap (SPOF), one is a standard comparison topic (Flink). The Combiner addition would be a nice-to-have. Micro-batch hedge for Spark 3.4+ is a minor precision improvement.
