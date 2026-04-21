# Research Notes: L22202 數據儲存與管理

Research conducted 2026-04-21 for iPAS AI 應用規劃師中級（以 iPAS 114.04/115.02 評鑑內容範圍、115 年簡章、最近公告試題與官方技術文件為主）。

## Official Sources
- [AI 應用規劃師能力鑑定_評鑑內容範圍參考（114.04）](https://www.ipas.org.tw/DownloadFile.ashx?filename=14ae134c-fb2f-4741-9f6d-062c02bdbc94_AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11404.pdf&type=10): 官方明列 L22202 為中級科目二「大數據處理技術」下的獨立主題；但 PDF 未再細分子點，表示本 lesson 需靠官方考綱邊界 + 技術官方文件補足教學深度。
- [AI 應用規劃師能力鑑定_評鑑內容範圍參考（115.02）](https://www.ipas.org.tw/api/proxy/uploads/certification_news/05a129ac3ddb4b3da23fef4abecfa0e3/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11502_20260226174411.pdf): 2026 最新版仍保留 L22202，顯示「數據儲存與管理」是現行考綱的穩定考點，不是過渡性內容。
- [115 年度 AI 應用規劃師能力鑑定簡章（2026-04-10）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 中級科目二仍為「大數據處理分析與應用」；可作為本 topic 與資料分析組定位的正式依據。
- [iPAS 官方公告：初級與中級考試樣題更新及新增中級題型說明](https://www.ipas.org.tw/AIAP/): 官方已新增中級題型說明；配合近次公告試題，可推定中級不只背名詞，也會考情境判斷與程式/SQL/偽碼閱讀。
- [114 年第二次中級 AI 應用規劃師第二科公告試題（2025-11-20 公告）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 已直接出現程式片段與資料欄位型別判讀題，支持 L22202 應準備 DDL/schema、欄位型別、儲存格式與 SQL 讀題能力。公開題中未直接找到「Data Lakehouse / Feature Store」字樣，這點需明確註記。
- [PostgreSQL 18 `CREATE TABLE`](https://www.postgresql.org/docs/current/sql-createtable.html): RDBMS 官方 DDL 代表文件；可支撐 schema、constraint、partitioned table 等考點，不必延伸到交易隔離或查詢優化。
- [PostgreSQL 18 `SELECT`](https://www.postgresql.org/docs/current/sql-select.html): RDBMS 官方查詢語法代表文件；適合支撐 `SELECT ... FROM ... WHERE ...` 與 SQL 語法閱讀題。
- [MongoDB Manual: Query Documents](https://www.mongodb.com/docs/manual/tutorial/query-documents/): 官方明示 `collection.find()` / driver `find()` 是文件型 NoSQL 的基本查詢接口；足以支撐 `MongoDB .find()` 出題。
- [Apache Hadoop 3.5.0 Documentation](https://hadoop.apache.org/docs/current/): 官方直接描述 HDFS 是 distributed filesystem，支撐「分散式儲存」核心定義。
- [Amazon S3 User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html): 官方明示 S3 是 object storage，典型用途含 data lakes、archive、big data analytics。
- [Azure Blob Storage Introduction](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction): 官方明示 Blob Storage 是 object storage；Azure Data Lake Storage Gen2 在 Blob 之上提供 hierarchical file system。
- [Spark 4.1.1 Parquet Files](https://spark.apache.org/docs/latest/sql-data-sources-parquet.html): 官方示範 DataFrame `read().parquet(...)` / `write().parquet(...)`，且可建立 temp view 後用 SQL `SELECT`；這是「大數據儲存讀寫」最直接的官方範例。
- [AWS: Data warehouse vs data lake vs data mart](https://aws.amazon.com/compare/the-difference-between-a-data-warehouse-data-lake-and-data-mart/): 官方對 warehouse 與 lake 的區分很適合考試化簡：warehouse = structured/preprocessed/fast SQL；lake = raw + any type + any scale。
- [AWS: What is a Data Lakehouse?](https://aws.amazon.com/what-is/data-lakehouse/): 官方明示 lakehouse 結合 warehouse 與 lake 優勢，使用 shared metadata layer，支援 AI/ML、報表與治理。
- [Delta Lake Documentation](https://docs.delta.io/): 官方把 Delta Lake 定位為 open-source lakehouse format，重點是 ACID、batch/stream unification、跨引擎讀寫。
- [Apache Iceberg Documentation](https://iceberg.apache.org/docs/1.9.2/docs/): 官方把 Iceberg 定位為 huge analytic datasets 的 open table format，強調 schema evolution、time travel、serializable isolation、optimistic concurrency。
- [Apache Iceberg Spark Getting Started](https://iceberg.apache.org/docs/nightly/spark-getting-started/): 官方最新頁面顯示 Iceberg 最新版為 `1.10.1`，並示範 `CREATE TABLE ... USING iceberg`。
- [Apache Hudi](https://hudi.apache.org/): 官方把 Hudi 定位為 open data lakehouse platform，重點是 bringing database functionality to data lakes 與 incremental processing。
- [Feast Feature View](https://docs.feast.dev/getting-started/concepts/feature-view): 官方明示 feature view 同時對 offline training 與 online serving 生效，並用於 historical features / training datasets / online schema。
- [lakeFS Documentation](https://docs.lakefs.io/v1.60/): 官方明示 lakeFS 是 data lake version control，提供 branching / committing / merging 的 Git-like semantics，適合支撐 dataset versioning。

## Community Insights (exam patterns)
- [Dcard：#分享 ipas AI 應用規劃師中級｜準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 考生回報以官方教材、例題為主；正式考題比官方例題更偏情境判斷。對 L22202 的意義是不要只背名詞，要能「看到場景就選對儲存架構」。
- [Vocus：iPAS AI應用規畫師-中級~~科目一二三備考速查表整理](https://vocus.cc/article/68b1692ffd89780001ffcc86): 民間整理明確把 NoSQL（MongoDB、Cassandra、Redis）列為中級高頻詞，但這不是官方題庫，只能當旁證。
- [Vocus：iPAS AI應用規劃師中級考試~科目二 不同難度模擬題目](https://vocus.cc/article/68b948cbfd897800019ee2a3): 模擬題把 SQL 資料庫、NoSQL 文件型資料庫、非結構化資料場景放在同一組判斷題，與官方「情境式單選」風格一致。
- 綜合官方公告試題與社群回報，可合理推定常見考法是：
- 給場景選架構：交易系統選 RDBMS/OLTP；報表分析選 OLAP/columnar/warehouse；多樣原始資料與 AI 訓練資料保留選 data lake 或 object storage。
- 給資料型態選 NoSQL：JSON/半結構化偏 document；快取/工作階段偏 key-value；超大規模稀疏欄位偏 wide-column；關係查詢偏 graph。
- 給程式片段判讀：`CREATE TABLE`、`SELECT`、`find()`、Spark `read/write parquet` 比純理論更可能出成讀碼題。
- 常見陷阱：
- 把 data lake 誤當成 data warehouse。前者保留原始資料，後者強調結構化與快速 SQL。
- 把 column-store 誤認為適合高頻交易寫入。考試通常要答「分析查詢/OLAP 更適合」。
- 把 feature store 講成「特徵工程演算法」。在本 topic 應只答資料管理、離線/線上一致性、訓練資料回溯。
- 直接證據不足：目前公開官方樣題/公告題目中，尚未找到直接點名 Delta Lake、Iceberg、Hudi、Feast、lakeFS 的題目；若 lesson 納入，應標成「現行業界主流、用來補足 lakehouse/訓練資料管理概念」。

## Current State (technology topic)
- `PostgreSQL` 官方文件目前是 18.x 線，搜尋結果顯示 2026-02-26 已發布 `18.3`；對考試最 relevant 的不是版本差異，而是 RDBMS 核心概念未變：schema 先定義，查詢以 SQL 為主。來源：[PostgreSQL docs index](https://www.postgresql.org/docs/), [CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html), [SELECT](https://www.postgresql.org/docs/current/sql-select.html)
- `Spark` 官方最新文件頁顯示 `4.1.1`；`DataFrameReader/Writer` 對 Parquet 的 read/write 範式仍穩定，適合考 `spark.read.parquet(...)`、`df.write.parquet(...)`、temp view + SQL。來源：[Spark Parquet Files](https://spark.apache.org/docs/latest/sql-data-sources-parquet.html)
- `Hadoop` 官方 current docs 為 `3.5.0`；HDFS 定義仍是 distributed filesystem。概念穩定，考試重點應放在「跨節點分散儲存」而非安裝指令。來源：[Hadoop current docs](https://hadoop.apache.org/docs/current/)
- `S3` 與 `Azure Blob Storage` 仍是主流 object storage；Azure 另以 ADLS Gen2 補上 hierarchical file system。這正好對比 HDFS 的檔案系統導向與 object storage 的 bucket/container/blob 導向。來源：[Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html), [Azure Blob Storage](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)
- `Iceberg` 官方最新 Spark getting started 頁面顯示最新版為 `1.10.1`；核心價值仍是 schema evolution、time travel、serializable isolation。來源：[Iceberg docs](https://iceberg.apache.org/docs/1.9.2/docs/), [Spark getting started](https://iceberg.apache.org/docs/nightly/spark-getting-started/)
- `Delta Lake` 官方首頁持續把 ACID、batch/stream unification、cross-engine read/write 當成核心賣點；概念未變，適合拿來說明「為何 lakehouse 不只是 object storage + parquet」。來源：[Delta Lake docs](https://docs.delta.io/)
- `Hudi` 官方目前以 open data lakehouse platform 定位自己，強調 incremental processing 與 database functionality on data lakes。來源：[Apache Hudi](https://hudi.apache.org/)
- `Feast` 與 `lakeFS` 代表的「模型訓練資料儲存管理」現況很清楚：
- feature store 不是演算法，而是管理 offline/online features、historical features、training dataset generation 的資料層。來源：[Feast Feature View](https://docs.feast.dev/getting-started/concepts/feature-view)
- dataset versioning 的主流做法是對 data lake/lakehouse 做版本控制、time travel、branch/merge，而非只靠手工改檔名。來源：[lakeFS docs](https://docs.lakefs.io/v1.60/)
- 未找到需要特別提醒的「近期淘汰語法」：本 topic 的 exam-level 關鍵詞如 `SELECT`、`CREATE TABLE`、`find()`、HDFS、S3、Blob、Parquet read/write、Iceberg/Delta/Hudi/feature store 的基本定位，目前都屬穩定概念。

## Key Findings Summary
- L22202 的官方邊界很清楚：重點是「資料如何存、存在哪、何時用哪種架構」，不是 ETL 細節，也不是 ML 訓練演算法。
- 最該背熟的對照表是 `OLTP ↔ row-store ↔ RDBMS`、`OLAP ↔ column-store ↔ warehouse/analytic engine`、`raw/multi-format/AI data retention ↔ data lake/object storage`、`governed open-table analytics ↔ lakehouse`。
- NoSQL 不要只背名稱，要能從場景反推：document = JSON/半結構化；key-value = 快速鍵值查找；wide-column = 大規模稀疏欄位；graph = 關係/路徑分析。
- Spark 在本章最可能的考法是「讀寫儲存格式」而不是轉換邏輯：`read/write parquet`、建 temp view、再用 SQL 查詢。
- 「模型訓練」在本章只應解釋成訓練資料管理：feature store、historical features、dataset versioning、time travel；不要寫成模型訓練流程或特徵工程技巧。

## Scope Notes
- 可納入：RDBMS vs NoSQL vs distributed storage、row vs column、HDFS vs object storage、data lake vs warehouse vs lakehouse、Spark read/write、feature store、dataset versioning。
- 只宜點到為止：ETL/ELT 細節、Spark 轉換 API、資料清理策略、統計分析、特徵工程演算法、模型訓練/調參。
- 明確超出 boundary rule：
- Spark transformation、join、window、聚合最佳化等屬 L22203。
- 統計檢定、相關係數、分布推論屬 L221/L223。
- 特徵選取、編碼、標準化、模型訓練流程屬 L23301 之後。
- 若 lesson 想放 Delta Lake / Iceberg / Hudi / Feast / lakeFS，應標示為「用來解釋 lakehouse 與訓練資料管理的現行業界標準例子」；目前未找到 iPAS 公開官方試題直接點名這些產品。
