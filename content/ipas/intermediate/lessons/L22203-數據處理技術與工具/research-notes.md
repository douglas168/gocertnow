# Research Notes: L22203 數據處理技術與工具

Research conducted 2026-04-21 for iPAS AI應用規劃師中級（以 iPAS 115 年度簡章、114.04 評鑑內容範圍、114 年第二次公告試題、Apache Spark / Hadoop / PostgreSQL / dbt Labs 官方文件為主）。

## Official Sources
- [iPAS 115 年度 AI應用規劃師能力鑑定簡章（2026-04-10）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 確認中級科目二是「大數據處理分析與應用」，L22203 屬資料分析組範圍；中級採單選題，重點應放在概念辨識與情境判斷。
- [AI 應用規劃師能力鑑定評鑑內容範圍參考（114.04）](https://ipd.nat.gov.tw/ipas/DownloadFile.ashx?filename=14ae134c-fb2f-4741-9f6d-062c02bdbc94_AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11404.pdf&type=10): 官方只明列 L22203 為「數據處理技術與工具」；教學應以資料管線與處理框架為主，不要延伸到 L23301 的特徵工程。
- [AI應用規劃師專區最新消息](https://ipd.nat.gov.tw/ipas/AIAP/): 官方專區已公告中級學習指引上線、樣題更新與中級題型說明；代表考點會持續滾動調整，不能只依最早版簡章備考。
- [AI應用規劃師樣題更新與新增中級題型說明公告](https://www.ipas.org.tw/MoreBussinessNews.aspx?mnuno=dc7bcf58-2958-476b-9833-fcb34505327b&type=+8): 可確認官方在 2025-09-20 公告中級題型調整；科目二已不是只考死背名詞。
- [114 年第二次中級 AI應用規劃師第二科公告試題（2025-11-20 公告）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 正式題已出現「Approximate Quantile」與程式片段判讀，顯示科目二常把資料處理工具概念放進實務情境，而非只問定義。
- [Apache Spark DataFrame API（PySpark 3.5.5）](https://spark.apache.org/docs/3.5.5/api/python/reference/pyspark.sql/dataframe.html): 官方 API 明列 `.filter()`、`.groupBy()`、`.join()`、`.select()`、`.withColumn()`、`.writeStream` 等；足以支撐 PySpark DataFrame 鏈式操作題。
- [Spark SQL, DataFrames and Datasets Guide（3.5.5）](https://spark.apache.org/docs/3.5.5/sql-programming-guide.html): 官方明示 DataFrame 是具名欄位的分散式資料集，Spark SQL 以結構資訊做額外最佳化；適合教 DataFrame 與 RDD 的差異。
- [RDD Programming Guide（3.5.5）](https://spark.apache.org/docs/3.5.5/rdd-programming-guide.html): 官方明示 RDD 是 Spark 的核心抽象，`transformations` 採 lazy evaluation，只有 `actions` 觸發計算；是 lazy evaluation / DAG mental model 的一手來源。
- [Structured Streaming Programming Guide（Spark 3.5.0）](https://spark.apache.org/docs/3.5.0/structured-streaming-programming-guide.html): 官方明示 Structured Streaming 建立在 Spark SQL engine 上，預設以 micro-batch 執行；這正是 batch vs stream 在 Spark 考點中的核心分界。
- [Spark SQL & DataFrames 官網頁](https://spark.apache.org/sql/): 官方頁面直接寫出 Spark SQL 包含 optimizer；可作為 Catalyst optimizer 概念的簡明入口。
- [Apache Hadoop HDFS Architecture（stable 3.3.5）](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html): 官方明示 HDFS 典型 block size 為 128 MB，檔案以 blocks 儲存；client 寫入 replication factor 3 時會走 DataNode pipeline。
- [Apache Hadoop YARN Architecture（stable 3.3.5）](https://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-site/YARN.html): 官方明示 YARN 將 resource management 與 job scheduling/monitoring 分離，核心角色為 ResourceManager、NodeManager、ApplicationMaster。
- [Apache Hadoop MapReduce Tutorial（stable 3.3.5）](https://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html): 官方定義 MapReduce 的 `<k1, v1> -> map -> <k2, v2> -> reduce -> <k3, v3>` mental model，並說明 `InputSplit` 對應 individual mapper。
- [PostgreSQL 16 Window Functions Tutorial](https://www.postgresql.org/docs/16/tutorial-window.html): 官方教學清楚定義 `OVER`、`PARTITION BY`、`ORDER BY`、`rank()` 與 aggregate window 的運作方式，適合對應 pseudocode 題。
- [PostgreSQL 16 Window Functions Reference](https://www.postgresql.org/docs/16/functions-window.html): 官方列出 `row_number`、`rank`、`lag`、`lead` 等函數，適合作為 SQL 視窗函數名詞與語意的準確來源。
- [dbt Labs: ETL vs ELT](https://www.getdbt.com/blog/etl-vs-elt): dbt Labs 官方文章明確區分 ETL 與 ELT 的流程順序、轉換位置與現代資料倉儲脈絡；可支撐 ETL/ELT 比較題。

## Community Insights (exam patterns)
- [Dcard：#分享 iPAS AI應用規劃師中級｜準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 考生回報中級題目偏情境題，常出「某公司有某目標，應採哪種做法」；這與 L22203 很吻合，代表不宜只背框架名詞。
- [iPAS 練功房｜AI應用規劃師考試練習](https://ipas-ai.net/): 民間備考平台主打收錄官方公開題；旁證顯示考生普遍依賴公告試題抓考點，而非只看簡章。
- 目前公開社群對 L22203 的細部回報不多，沒有找到大量 Spark/Hadoop/SQL 視窗函數的考後逐題討論；因此「實際常考什麼」仍應以官方公告試題與官方學習指引優先。
- 可交叉驗證的考試 pattern：
- 常見不是問叢集參數，而是問「哪個框架/模式適合這個資料處理情境」。
- SQL 題較可能考語意判讀：`GROUP BY` 會彙總、window function 不會折疊列、`JOIN` 類型影響保留哪些列。
- Spark 題高機率考 DataFrame vs RDD、lazy evaluation、batch 與 Structured Streaming 的差異，而不是底層調校。
- Hadoop 題高機率考 HDFS / YARN / MapReduce 角色分工，而不是 HA 或 rack-aware placement 細節。

## Current State (technology versions)
- [Spark News](https://spark.apache.org/news/): 截至 2026-04-21，Apache Spark 最新 3.5 maintenance release 為 `3.5.7`（2025-09-24）；若教材以「Spark 3.5」稱呼仍合理，但外部文件可能已是 3.5.5 到 3.5.7 的小版差異。
- [Spark Downloads](https://spark.apache.org/downloads): Spark 主線已進入 4.x，但 syllabus 關鍵字指定 `Apache Spark 3.5`；教材應維持 3.5 系語境，避免混入 Spark 4 新內容。
- [Structured Streaming Programming Guide](https://spark.apache.org/docs/latest/streaming/index.html): 最新官網入口已導向 Spark 4.x 文件；撰寫 study guide 時需刻意引用 3.5.x 文件，避免版本漂移。
- [Hadoop stable docs](https://hadoop.apache.org/docs/stable/): 官方 stable 連到 `3.3.5` / `3.3.6` 系列文件；對考綱中的 `Hadoop 3.x` 仍相容，HDFS 128 MB block 與 replication factor 3 觀念未變。
- [PostgreSQL 16 docs](https://www.postgresql.org/docs/16/): PostgreSQL 現行 current version 已是 18，但 16 文件仍受支援；視窗函數語法在 16 與現行版差異不影響本 topic。
- [dbt ETL vs ELT](https://www.getdbt.com/blog/etl-vs-elt): dbt Labs 在 2025-09-23 更新官方 primer，持續把 ELT 定位為現代 cloud data warehouse 主流；教材可教「ELT 是現代主流」，但不能絕對化成「ETL 已淘汰」。
- [Spark Streaming Programming Guide（3.5.2）](https://spark.apache.org/docs/3.5.2/streaming-programming-guide.html): 官方明示 legacy Spark Streaming 旁邊有「There is a newer and easier to use streaming engine in Spark called Structured Streaming」；教材應以 Structured Streaming 為主，不要把 DStream 當考試重點。

## External Documents Found
- [Apache Spark PySpark DataFrame API](https://spark.apache.org/docs/3.5.5/api/python/reference/pyspark.sql/dataframe.html): 有；適合提 `.filter()`、`.groupBy()`、`.agg()`、`.withColumn()`、`.select()`、`.join()`。
- [RDD Programming Guide](https://spark.apache.org/docs/3.5.5/rdd-programming-guide.html): 有；適合提 RDD、transformation / action、lazy evaluation。
- [Spark Structured Streaming Programming Guide](https://spark.apache.org/docs/3.5.0/structured-streaming-programming-guide.html): 有；適合提 unified batch/stream API 與 micro-batch。
- [HDFS Architecture](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html): 有；適合提 NameNode / DataNode、128 MB blocks、replication。
- [Hadoop MapReduce Tutorial](https://hadoop.apache.org/docs/stable/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html): 有；適合提 key-value mental model 與 map/reduce 流程。
- [Hadoop YARN Architecture](https://hadoop.apache.org/docs/stable/hadoop-yarn/hadoop-yarn-site/YARN.html): 有；適合提 RM / NM / AM 職責分工。
- [PostgreSQL 16 window functions tutorial](https://www.postgresql.org/docs/16/tutorial-window.html): 有；適合提 `PARTITION BY`、`ORDER BY`、`rank()`、running aggregate。
- [PostgreSQL 16 window functions reference](https://www.postgresql.org/docs/16/functions-window.html): 有；適合提 `row_number`、`rank`、`lag`、`lead`。
- [dbt Labs ETL vs ELT primer](https://www.getdbt.com/blog/etl-vs-elt): 有；適合提 pipeline direction、warehouse-side transformation、use cases。
- iPAS 中級科目二學習指引：官方已公告上線，但本次未直接取得可穩定引用的 PDF 內容；若後續需要逐頁比對命題語氣，建議 study guide writer 再補抓官方學習指引原檔。

## Key Findings Summary
- L22203 最應教的是「處理框架選型」：Hadoop / Spark 對應 batch 思維，Spark Structured Streaming 對應 stream processing；考點在概念與情境，不在調參。
- Spark 必考心智模型應包含：RDD 是底層分散式資料抽象、DataFrame 是具 schema 的高階 API、transformations 採 lazy evaluation、執行會形成 DAG，Structured Streaming 預設是 micro-batch。
- Hadoop 必考心智模型應包含：HDFS = NameNode + DataNode + blocks + replication；MapReduce = map / shuffle-sort / reduce；YARN = ResourceManager / NodeManager / ApplicationMaster 分工。
- ETL vs ELT 的高頻分界在「何時轉換、在哪裡轉換」：ETL 先 transform 再 load；ELT 先 load 到 warehouse/lakehouse 再 transform，dbt 站在 ELT transformation layer。
- SQL 在本 topic 應偏 literacy：`GROUP BY` 會聚合成較少列，window function 保留原列、只加上跨列計算；常見函數至少要會 `ROW_NUMBER`、`RANK`、`LAG`、`LEAD`，並看懂 `PARTITION BY` / `ORDER BY`。

## Scope Notes
- 本 topic 應停在資料處理工程觀點，不要展開到 L23301 的特徵工程、資料標準化、模型輸入前處理細節。
- 不要加入 Spark executor sizing、shuffle tuning、partition tuning、YARN queue tuning、HDFS HA 設計等 operator 細節。
- 不要把 Kafka、Flink、Iceberg、Delta Lake 當主體；若提到，只能作為「現代資料工程延伸」點到為止。
- 若寫 PySpark 範例，應聚焦 DataFrame chain 與 API 語意，不要擴成 MLlib 或 feature pipeline。
- 若寫 SQL 題型示例，應聚焦 `JOIN` / `GROUP BY` / window functions；避免延伸到 query optimization、index tuning、execution plan。
