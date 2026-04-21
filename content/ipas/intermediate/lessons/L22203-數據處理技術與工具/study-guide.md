# L22203 數據處理技術與工具 學習指南
## 1. Exam Item Mapping
> 對應評鑑範圍：**L22203 數據處理技術與工具** ＋ **L22 大數據處理分析與應用**
這一課的命題核心，是從**資料管線（Data Pipeline）**與**大數據處理框架（Big Data Processing Framework）**角度，看懂工具角色、流程方向、SQL 語意與情境判斷。
考試主軸可濃縮成 4 條：
1. **Hadoop（Hadoop）**：知道 **Hadoop 分散式檔案系統（Hadoop Distributed File System, HDFS）**、**MapReduce（MapReduce）**、**YARN（Yet Another Resource Negotiator, YARN）** 的分工。
2. **Apache Spark（Apache Spark）**：知道 **批次處理（Batch Processing）**、**串流處理（Stream Processing）**、**DataFrame（資料框）**、**彈性分散式資料集（Resilient Distributed Dataset, RDD）**、**延遲求值（Lazy Evaluation）**、**有向無環圖（Directed Acyclic Graph, DAG）**、**Catalyst 最佳化器（Catalyst Optimizer）**。
3. **抽取轉換載入（Extract, Transform, Load, ETL）** vs **抽取載入轉換（Extract, Load, Transform, ELT）**：方向、平台、適用情境。
4. **SQL 視窗函數（Window Function）**：`GROUP BY`、`JOIN`、`PARTITION BY`、`ROW_NUMBER()`、`RANK()`、`DENSE_RANK()`、`LAG()`、`LEAD()`、聚合視窗函數。
命題方式通常不是問底層調參，而是問：
- 某個情境該選批次還是串流
- 某段 PySpark / SQL pseudocode 在做什麼
- 某個框架的核心優勢或限制
- 哪種 SQL 語法會保留原列、哪種會縮列

## 2. 關鍵概念總覽圖 (Knowledge Tree)
```text
🔧 L22203 數據處理技術與工具
│
├── 🏗️ Hadoop 生態系（Hadoop Ecosystem）
│   ├── 📖 HDFS（Hadoop Distributed File System, HDFS）
│   │   ├── NameNode：管 metadata，不直接存每個 block 內容
│   │   ├── DataNode：實際存資料 block
│   │   ├── Block 預設 128 MB 🔥🔥
│   │   ├── Replication factor 預設 3 🔥🔥
│   │   └── 陷阱：128 MB 是 block 大小，不是檔案上限
│   ├── ⚙️ YARN（Yet Another Resource Negotiator）
│   │   ├── ResourceManager：全域資源管理
│   │   ├── NodeManager：節點資源管理
│   │   ├── ApplicationMaster：單一應用協調
│   │   └── 陷阱：YARN 管排程與資源，不是儲存
│   └── ⚡ MapReduce（MapReduce）🔥🔥
│       ├── Map phase：先局部轉換成 key-value
│       ├── Shuffle and Sort：同 key 重分配、彙整、排序
│       ├── Reduce phase：同 key 聚合輸出
│       └── 陷阱：shuffle 在 Map 與 Reduce 中間
│
├── ⚡ Apache Spark（Apache Spark）
│   ├── 📦 資料抽象
│   │   ├── RDD：低階、彈性高、schema 弱
│   │   ├── DataFrame：有 schema、較易寫、可被 Catalyst 優化
│   │   └── Dataset：DataFrame 的強型別版本，Scala/Java 常見
│   ├── 🧠 執行心智
│   │   ├── Lazy evaluation：action 前先記計畫 🔥🔥
│   │   ├── DAG：轉換步驟形成圖
│   │   └── Catalyst optimizer：最佳化 DataFrame / SQL 🔥🔥
│   ├── 🗂️ Batch processing：每日報表、月結、歷史資料
│   └── 🌊 Structured Streaming
│       ├── 統一 DataFrame / SQL API
│       ├── 預設 micro-batch 🔥🔥
│       └── 陷阱：不是預設 true streaming
│
├── 🔄 ETL 與 ELT
│   ├── ETL：先轉換（Transform）再 Load，典型資料倉儲
│   ├── ELT：先 Load 再轉換（Transform），典型資料湖 / 雲端倉儲
│   ├── dbt：常位在轉換（Transform）層
│   └── 陷阱：現代主流偏 ELT，但 ETL 沒有消失
│
└── 🧮 SQL 分析語意
    ├── 🔗 JOIN：決定哪些列能接上
    ├── 📚 GROUP BY：每組彙總，列數通常變少
    └── 🪟 視窗函數（Window Function）🔥🔥
        ├── OVER(...)
        ├── PARTITION BY：分群但不縮列
        ├── ORDER BY：定順序
        ├── frame clause：定視窗範圍
        ├── ROW_NUMBER：唯一序號
        ├── RANK：並列同名次，會跳號
        ├── DENSE_RANK：並列同名次，不跳號
        ├── LAG / LEAD：前一筆 / 下一筆
        └── SUM / AVG OVER(...)：保留原列的跨列聚合
```

## 3. Core Concepts
### 3.1 Hadoop 生態系與 HDFS
**Hadoop（Hadoop）** 在本課不是考生態系大全，而是考你能不能把儲存、資源管理、批次運算拆乾淨。
三個核心角色：
- **HDFS（Hadoop Distributed File System, HDFS）**：分散式儲存
- **MapReduce（MapReduce）**：批次運算模型
- **YARN（Yet Another Resource Negotiator, YARN）**：資源管理與作業協調
🗣️ 白話說明：像大學分組報告，`HDFS` 是共享雲端資料夾，`MapReduce` 是分工流程，`YARN` 是安排誰用哪台電腦、誰先跑哪個工作的人。

#### 3.1.1 HDFS（Hadoop Distributed File System, HDFS）
**HDFS（HDFS）** 的設計哲學，是把大檔案切成較大的**區塊（Block）**後，分散到多台機器儲存，並用副本確保容錯。
你至少要背這 2 個數字：
- **Block 預設大小（Default Block Size）**：`128 MB` 🔥🔥
- **複寫因子（Replication Factor）**：`3` 🔥🔥
核心元件：
- **名稱節點（NameNode）**：管理 metadata，例如檔案有哪些 block、block 在哪裡
- **資料節點（DataNode）**：實際存放 block 內容
ASCII 架構圖：
```text
             ┌─────────────────┐
             │ NameNode        │
             │ 管 metadata     │
             └──────┬──────────┘
                    │
      ┌─────────────┼─────────────┐
      │             │             │
┌─────▼────┐  ┌─────▼────┐  ┌─────▼────┐
│DataNode A│  │DataNode B│  │DataNode C│
│ block 1  │  │ block 2  │  │ block 3  │
│ replica  │  │ replica  │  │ replica  │
└──────────┘  └──────────┘  └──────────┘
```
🗣️ 白話說明：像你把大型影片拆成很多段，分別放在不同硬碟，還額外備份。某一顆硬碟壞了，影片仍能湊回來。
題目常問：
- `128 MB` 是 block 大小，不是單一檔案只能 128 MB
- replication factor `3` 是一個 block 通常保留三份副本，不是三台機器一定同時運算

#### 3.1.2 為什麼要 Block 與 Replication
HDFS 的核心不是「像一般硬碟那樣直接存整個檔」，而是：
```text
大檔案
  ↓ 切分
多個 blocks
  ↓ 分散
多台 DataNodes
  ↓ 複寫
節點故障仍能讀取
```
設計意義：
- block 讓大檔能跨機器存放與處理
- replication 提供**容錯能力（Fault Tolerance）**
🗣️ 白話說明：像你把社團企劃書同時備份在筆電、雲端、同組同學電腦。有人電腦壞了，不會整組重做。

#### 3.1.3 YARN（Yet Another Resource Negotiator, YARN）
**YARN（YARN）** 是 Hadoop 的資源管理層，不是資料儲存層。
核心角色：
- **資源管理員（ResourceManager）**：整體資源分配
- **節點管理員（NodeManager）**：單一節點資源管理
- **應用程式主管（ApplicationMaster）**：特定作業的協調者
ASCII 分工圖：
```text
使用者提交工作
      │
      ▼
ResourceManager
      │
      ▼
ApplicationMaster
      │
      ├── NodeManager A
      ├── NodeManager B
      └── NodeManager C
```
🗣️ 白話說明：像公司總務分配會議室與設備，專案 PM 協調每位成員做哪一段工作。總務不是資料庫本身，但決定資源怎麼用。
🔥 重要：考場若問「誰負責儲存 block」不是 YARN，而是 HDFS / DataNode。

#### 3.1.4 MapReduce（MapReduce）三階段心智模型
**MapReduce（MapReduce）** 的高頻考點，不是 API 細節，而是三階段：
1. **Map 階段（Map Phase）**
2. **洗牌與排序階段（Shuffle and Sort Phase）**
3. **Reduce 階段（Reduce Phase）**
ASCII 流程：
```text
輸入資料
   │
   ▼
Map
把資料轉成 key-value
   │
   ▼
Shuffle and Sort
同 key 重新分組、搬移、排序
   │
   ▼
Reduce
對每組 key 聚合輸出
```
字數統計例：
```text
輸入:
"AI 很紅"
"AI 很重要"

Map:
(AI,1) (很紅,1)
(AI,1) (很重要,1)

Shuffle and Sort:
AI -> [1,1]
很紅 -> [1]
很重要 -> [1]

Reduce:
(AI,2)
(很紅,1)
(很重要,1)
```
補充：Apache Hadoop 官方常把這個中間階段寫成 **Shuffle and Sort**。`Shuffle` 是把 Map 輸出依 key 傳送到對應 Reducer，`Sort` 則是在傳送與分組過程中依 key 排序。本講義口訣與流程圖常簡稱 `Shuffle`，但如果選項寫 `Shuffle and Sort`，指的是同一階段。
🗣️ 白話說明：像系學會收活動投票。每個人先各自填單是 `Map`，把相同選項疊一起並排序是 `Shuffle and Sort`，最後一疊一疊點票是 `Reduce`。
🔥🔥 必背：`Shuffle and Sort` 在 `Map` 和 `Reduce` 之間，不是最後才做。

#### 3.1.5 批次處理（Batch Processing）
**批次處理（Batch Processing）** 是把資料先累積起來，再整批運算。
典型場景：
- 每晚訂單彙總
- 每月薪資與點數結算
- 歷史資料報表產出
🗣️ 白話說明：像 7-11 不會每賣一瓶飲料就重做整月報表，而是累積一整天或一整月後再算。

> 📊 **批次 vs 串流處理比較圖**
> → 詳見 [diagrams/batch-vs-stream.mmd](diagrams/batch-vs-stream.mmd)

> 📊 **MapReduce 三階段執行流程圖**
> → 詳見 [diagrams/mapreduce-flow.mmd](diagrams/mapreduce-flow.mmd)

### 3.2 Apache Spark
**Apache Spark（Apache Spark）** 是常見的大數據運算引擎，考綱重點在：
- 批次與串流都能處理
- DataFrame 比 RDD 更常出現在 pseudocode 題
- 延遲求值（Lazy Evaluation）、DAG、Catalyst Optimizer 是高頻關鍵字
🗣️ 白話說明：如果 Hadoop MapReduce 像傳統手工分工表，Spark 比較像現代化協作平台，很多處理方式更一致、也更容易寫。

#### 3.2.1 RDD（Resilient Distributed Dataset）
**彈性分散式資料集（Resilient Distributed Dataset, RDD）** 是 Spark 的低階核心抽象。
特徵：
- 分散式
- 可容錯
- 控制力高
- 常不強調表格式 schema
適合記成：`RDD = 底層、彈性高、手動感較重`
🗣️ 白話說明：像你直接拿原料自己煮，步驟自由，但很多細節要自己顧。

#### 3.2.2 DataFrame（DataFrame）
**DataFrame（資料框）** 是具有**結構描述（Schema）**的分散式資料集合，欄位名稱與型別較清楚，操作方式接近資料表。
特徵：
- 有 schema
- 語意清楚
- 可搭配 SQL 思維
- 可被 **Catalyst 最佳化器（Catalyst Optimizer）** 最佳化
🗣️ 白話說明：像 Excel 表格或公司的 BI 報表表格，欄位一目了然，主管也比較容易看懂。
🔥🔥 iPAS 常見 pseudocode 幾乎都偏 DataFrame 鏈式操作。

#### 3.2.3 Dataset（Dataset）
**Dataset（Dataset）** 是 DataFrame 的強型別（Type-Safe）版本，常見於 Scala / Java。
考試你要抓住：
- 在 Scala / Java 中，DataFrame 本質上就是 `Dataset[Row]`
- DataFrame 與 Dataset 同屬 Spark 結構化 API 層，不是上下層關係
- Dataset 強調型別安全
- PySpark 題目通常仍以 DataFrame 為主
🗣️ 白話說明：像同一套表格式工具的強型別版本，尤其在 Scala / Java 世界比較常見。

#### 3.2.4 RDD vs DataFrame vs Dataset 心智線
```text
RDD（低階 / 無 schema）
        |
        v
DataFrame（結構化 / 無型別）
        <---------------------------->
Dataset（結構化 / 強型別，Scala/Java）
```
重點：
- `RDD` 是較低階、偏函數式的資料抽象
- `DataFrame` 與 `Dataset` 都屬結構化 API；兩者是平行選項，不是上下游
- 可把 `Dataset` 想成 `DataFrame` 的強型別版本
快速記憶：
- 想到底層控制：`RDD`
- 想到表格式與最佳化：`DataFrame`
- 想到型別安全：`Dataset`

#### 3.2.5 Lazy Evaluation（Lazy Evaluation）
**延遲求值（Lazy Evaluation）** 是 Spark 核心觀念：先記錄轉換，遇到 **動作（Action）** 才真正執行。
常見 **轉換（Transformation）**：
- `.filter()`
- `.select()`
- `.groupBy()`
- `.join()`
常見 **動作（Action）**：
- `.show()`
- `.count()`
- `.collect()`
- 寫出資料
ASCII 圖：
```text
df
 ├─ filter(...)
 ├─ groupBy(...)
 ├─ agg(...)
 └─ select(...)
     │
     └── 先記錄，不一定立刻跑
              │
              ▼
            show()
              │
              ▼
            才執行
```
🗣️ 白話說明：像 Uber Eats 先加購物車、改備註、套優惠碼，都還不是真的出餐；按下送出訂單才開始做。
🔥🔥 考點：Spark 預設不是 eager execution，而是延遲求值。

#### 3.2.6 DAG（Directed Acyclic Graph, DAG）
**有向無環圖（Directed Acyclic Graph, DAG）** 是 Spark 表示轉換步驟相依關係的方法。
因為 transformation 會先被收集，Spark 會先形成計畫圖，再決定如何執行。
ASCII 圖：
```text
read orders
   │
   ├── filter(status='paid')
   │          │
   │          └── groupBy(customer_id)
   │                      │
   │                      └── agg(sum(amount))
   │                                   │
   └───────────────────────────────────┘
                       ▼
                     show()
```
🗣️ 白話說明：像你做報告先列工作流程圖，再安排蒐集、整理、合併與交件。

#### 3.2.7 Catalyst Optimizer（Catalyst Optimizer）
**Catalyst 最佳化器（Catalyst Optimizer）** 是 Spark SQL / DataFrame / Dataset 背後的重要最佳化機制。
你不用背內部規則，但要知道：
- 它利用 schema 與查詢邏輯做最佳化
- 因此 DataFrame / SQL 通常比 RDD 更容易被高階最佳化
🗣️ 白話說明：像你把需求整理成欄位清楚的表格交給很會排流程的主管，主管比較能幫你找到有效率的執行順序。
🔥🔥 常見陷阱：Catalyst 不是 RDD 的主要優化來源。

#### 3.2.8 PySpark DataFrame 高頻 pseudocode
範例一：
```python
from pyspark.sql import functions as F

result = (
    orders_df
    .filter(F.col("status") == "paid")
    .groupBy("customer_id")
    .agg(F.sum("amount").alias("total_amount"))
    .filter(F.col("total_amount") >= 1000)
)

result.show()
```
判讀：
1. 先留下已付款訂單
2. 依 `customer_id` 分組
3. 算每位顧客總消費
4. 再篩總消費至少 1000
5. `show()` 觸發執行
ASCII 資料流：
```text
orders_df
  │
  ├── filter(status='paid')
  ├── groupBy(customer_id)
  ├── agg(sum(amount) as total_amount)
  ├── filter(total_amount >= 1000)
  └── show()
```
🗣️ 白話說明：像蝦皮賣家想抓出「已付款客戶中，總消費超過 1000 的人」。
範例二：
```python
from pyspark.sql import functions as F

result = (
    orders_df
    .filter(F.col("status") == "paid")
    .join(customers_df, on="customer_id", how="inner")
    .groupBy("city")
    .agg(F.avg("amount").alias("avg_amount"))
)

result.show()
```
這題常考你：
- `inner` 只保留兩表都有的 `customer_id`
- `groupBy("city")` 後輸出是每城市一列
- `avg_amount` 是城市平均，不是每筆訂單平均欄位加回原列

#### 3.2.9 Batch Processing vs Stream Processing
**批次處理（Batch Processing）**：先累積一批資料後再處理。  
**串流處理（Stream Processing）**：資料持續進來時持續處理與更新。
ASCII 對照：
```text
Batch:
[資料][資料][資料] -> 一次運算 -> 輸出

Stream:
資料 -> 處理 -> 更新
資料 -> 處理 -> 更新
資料 -> 處理 -> 更新
```
🗣️ 白話說明：Batch 像月底一次算薪水；Stream 像 LINE 訊息一來就跳通知。

#### 3.2.10 Structured Streaming（Structured Streaming）
**結構化串流（Structured Streaming）** 是 Spark 的串流處理模型，重點不是 API 細節，而是兩件事：
- 與 DataFrame / SQL 開發體驗相近
- **預設心智通常是 micro-batch**，不是嚴格 true streaming 🔥🔥
ASCII 流程：
```text
持續進來事件資料
      │
      ▼
切成一小批一小批
      │
      ▼
套用 DataFrame / SQL 邏輯
      │
      ▼
持續更新結果
```
🗣️ 白話說明：像 Instagram 限動觀看數不是每 0.0001 秒都刷新，而是很快地一小批一小批更新，看起來接近即時。
概念範例：
```python
stream_df = (
    spark.readStream
    .format("json")
    .load("/data/events")
)

result = stream_df.groupBy("event_type").count()

query = (
    result.writeStream
    .outputMode("complete")
    .format("console")
    .start()
)
```
判讀重點：
- `readStream` / `writeStream` 表示串流情境
- 邏輯仍像 DataFrame
- 預設多半以 micro-batch 理解

> 📊 **Spark 架構與 DAG 執行流程圖**
> → 詳見 [diagrams/spark-architecture.mmd](diagrams/spark-architecture.mmd)

### 3.3 ETL vs ELT
#### 3.3.1 ETL（Extract, Transform, Load）
**抽取轉換載入（Extract, Transform, Load, ETL）** 是：
1. 先抽資料
2. 先轉換
3. 再載入目標系統
ASCII 流程：
```text
Source
  │
  ├── Extract
  ├── 轉換（Transform）
  └── Load
       │
       ▼
  Data Warehouse
```
典型情境：
- 先整理乾淨再進目標端
- 常見於**資料倉儲（Data Warehouse）**
🗣️ 白話說明：像你要把履歷丟到 104 前，會先排版、修錯字、補齊欄位，再上傳正式版。

#### 3.3.2 ELT（Extract, Load, Transform）
**抽取載入轉換（Extract, Load, Transform, ELT）** 是：
1. 先抽資料
2. 先載入目標平台
3. 再於平台內轉換
ASCII 流程：
```text
Source
  │
  ├── Extract
  ├── Load
  └── 轉換（Transform）
       │
       ▼
Data Lake / Cloud Warehouse
```
典型情境：
- 想先保留 raw data
- 目標平台計算能力強
- 常見於**資料湖（Data Lake）**、雲端倉儲、lakehouse
🗣️ 白話說明：像公司先把表單、交易、聊天紀錄原封不動收進資料平台，之後再依報表需求慢慢清理。
🔥🔥 關鍵不是背名詞，而是背**轉換何時發生、在哪裡發生**。

#### 3.3.3 ETL vs ELT 的題目判斷
看到以下敘述，通常可直接對應：
- 「進倉前先清理與標準化」→ `ETL`
- 「先把原始資料載進平台，再用 SQL 轉換」→ `ELT`
- 「平台很強，先保留 raw data」→ `ELT`
- 「目標端只想接收整理好的結構資料」→ `ETL`

#### 3.3.4 dbt（data build tool, dbt）定位
**dbt（data build tool, dbt）** 常被定位在轉換（Transform）層，尤其是 ELT 架構中的 `T`。
你應記住：
- dbt 主要處理資料模型轉換
- 不等於所有抽取工作
- 常與資料倉儲 SQL transformation 綁在一起
🗣️ 白話說明：像資料先都進公司平台了，dbt 再把原始資料整理成主管看的月報表、部門分析表、會員分群表。
🔥 題目若問 dbt 最接近哪一段，多半是 `轉換（Transform）`。

#### 3.3.5 Data Warehouse vs Data Lake 脈絡
本課不深談架構，只抓典型搭配：
- **資料倉儲（Data Warehouse）**：常聯想到 `ETL`
- **資料湖（Data Lake）**：常聯想到 `ELT`
但要小心，這是**常見搭配**，不是唯一合法答案。
🗣️ 白話說明：資料倉儲像整理好的便利商店貨架；資料湖像先把貨全部搬進大倉庫，再慢慢分類。

> 📊 **ETL vs ELT 管線流程比較圖**
> → 詳見 [diagrams/etl-vs-elt.mmd](diagrams/etl-vs-elt.mmd)

### 3.4 SQL 視窗函數
#### 3.4.1 GROUP BY vs 視窗函數（Window Function）
**`GROUP BY`** 會把多列折疊成每組一列或較少列。  
**視窗函數（Window Function）** 會保留原列，再額外算排名、累積值、前一筆、下一筆。
ASCII 對照：
```text
原始資料：6 列

GROUP BY 後：
每組變 1 列
=> 列數變少

WINDOW FUNCTION 後：
原本 6 列都在
每列多出分析欄位
=> 列數通常不變
```
🗣️ 白話說明：`GROUP BY` 像每組交一張總結表；視窗函數像每個人都保留自己的成績單，但多了組內排名。
🔥🔥 這是 SQL 題的第一個必判斷點。

#### 3.4.2 OVER(...)、PARTITION BY、ORDER BY、frame clause
視窗函數常見骨架：
```sql
函數() OVER (
    PARTITION BY ...
    ORDER BY ...
    frame clause
)
```
重點：
- **`PARTITION BY`**：分群，但不縮列
- **`ORDER BY`**：決定群內順序
- **frame clause**：決定要看哪些前後列
例子：
```sql
SUM(amount) OVER (
    PARTITION BY customer_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)
```
這表示：
- 每位顧客各自計算
- 依日期排序
- 計算從第一筆到當前筆的累積總額
🗣️ 白話說明：像你看自己的消費紀錄，按日期排列後，順便在每一筆旁邊顯示「截至今天總共花了多少」。

#### 3.4.3 ROW_NUMBER（ROW_NUMBER）
**列號函數（ROW_NUMBER）** 會在每個 partition 中依排序規則給唯一編號。
特徵：
- 遇到同分仍會強制分配唯一序號
- 不會保留並列名次
- 實際先後順序由 DBMS 決定，結果不保證穩定
```sql
ROW_NUMBER() OVER (
    PARTITION BY department
    ORDER BY salary DESC
)
```
🗣️ 白話說明：像抽票系統即使兩人分數相同，還是會硬排出 1 號和 2 號；只是誰先誰後可能取決於資料庫實際排序方式。

#### 3.4.4 RANK（RANK）與 DENSE_RANK（DENSE_RANK）
**排名函數（RANK）**：並列同名次，下一名跳號。  
**緊密排名（DENSE_RANK）**：並列同名次，下一名不跳號。
例子：分數 `100, 100, 90`
- `ROW_NUMBER()` → `1, 2, 3`
- `RANK()` → `1, 1, 3`
- `DENSE_RANK()` → `1, 1, 2`
🗣️ 白話說明：像簡報比賽兩人並列第一，`RANK` 會直接跳到第三名，`DENSE_RANK` 則是下一位第二名。
🔥🔥 超高頻，常直接出單選。

#### 3.4.5 LAG（LAG）與 LEAD（LEAD）
**前一筆函數（LAG）**：抓前一列值。  
**下一筆函數（LEAD）**：抓下一列值。
```sql
SELECT
    customer_id,
    order_date,
    amount,
    LAG(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS prev_amount,
    LEAD(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS next_amount
FROM orders;
```
🗣️ 白話說明：像你在記帳 App 看某筆外送訂單時，想知道上一筆花多少、下一筆又是多少。

#### 3.4.6 聚合視窗函數
高頻聚合視窗函數包括：
- `SUM(...) OVER(...)`
- `AVG(...) OVER(...)`
- `COUNT(...) OVER(...)`
它們的共同特徵：
- 保留原列
- 但在每列加上跨列計算結果
範例：
```sql
SELECT
    customer_id,
    order_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders;
```
🗣️ 白話說明：像你每新增一筆消費，App 立即在旁邊顯示「本月累積支出」。

#### 3.4.7 SQL 實例：實際欄位與輸出追蹤
原始資料 `orders`：
```text
customer_id | order_date  | amount
------------+-------------+-------
A001        | 2026-04-01  | 300
A001        | 2026-04-03  | 500
A001        | 2026-04-05  | 200
B002        | 2026-04-02  | 700
B002        | 2026-04-06  | 100
```
查詢：
```sql
SELECT
    customer_id,
    order_date,
    amount,
    ROW_NUMBER() OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS rn,
    LAG(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
    ) AS prev_amount,
    SUM(amount) OVER (
        PARTITION BY customer_id
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders
ORDER BY customer_id, order_date;
```
輸出：
```text
customer_id | order_date  | amount | rn | prev_amount | running_total
------------+-------------+--------+----+-------------+--------------
A001        | 2026-04-01  | 300    | 1  | NULL        | 300
A001        | 2026-04-03  | 500    | 2  | 300         | 800
A001        | 2026-04-05  | 200    | 3  | 500         | 1000
B002        | 2026-04-02  | 700    | 1  | NULL        | 700
B002        | 2026-04-06  | 100    | 2  | 700         | 800
```
你要看懂：
- `PARTITION BY customer_id`：每位顧客分開算
- `ROW_NUMBER()`：各自從 1 開始
- `LAG(amount)`：看前一筆
- `SUM(...) OVER(...)`：列數不變，但多了累積值

#### 3.4.8 JOIN、GROUP BY、WINDOW 的拆題法
情境題常把三者混在一起，你要拆成 3 問：
1. 有沒有接表？如果有，是哪一種 `JOIN`
2. 結果會不會縮成每組一列？如果會，常是 `GROUP BY`
3. 列數保留但多分析欄位？通常是 `視窗函數（Window Function）`
快速心智：
```text
先看接表 → JOIN
再看列數是否縮減 → GROUP BY
最後看是否保留原列加分析值 → WINDOW
```
🗣️ 白話說明：像你先把履歷表與面試結果表接起來，再決定是做每部門一列總結，還是每位求職者保留一列但加上部門內排名。

> 📊 **SQL 視窗函數解剖圖**
> → 詳見 [diagrams/sql-window-functions.mmd](diagrams/sql-window-functions.mmd)

## 4. Comparison Tables (易混淆概念)
### 4.1 Hadoop MapReduce vs Apache Spark
| 比較面向 | Hadoop MapReduce | Apache Spark |
|---|---|---|
| 速度 | 較慢，常見磁碟 I/O 較重 | 通常較快，記憶體運算較強 |
| 易用性 | 模型較傳統、程式較繁瑣 | API 較高階，DataFrame / SQL 較易寫 |
| 資料儲存 | 常與 HDFS 緊密搭配 | 可讀多種來源，本身不是儲存系統 |
| 運算模型 | Map → Shuffle → Reduce | 一般化 DAG 執行模型 |
| 適用場景 | 傳統大規模批次 | 批次、互動分析、Structured Streaming |

### 4.2 RDD vs DataFrame vs Dataset
| 比較面向 | RDD | DataFrame | Dataset |
|---|---|---|---|
| 抽象定位 | 低階、偏函數式 | 結構化、無型別 | 結構化、強型別（Scala/Java） |
| Schema | 弱 | 明確 | 明確 |
| 型別安全 | 較弱 | `Dataset[Row]` 形式 | 較強 |
| 最佳化 | 不靠 Catalyst 為主 | 可被 Catalyst 最佳化 | 可被 Catalyst 最佳化 |
| API 風格 | 函數式、較底層 | 類表格 / SQL | 強型別物件風格 |
| 與 DataFrame 關係 | 不同層級 | Scala/Java 中本質上是 `Dataset[Row]` | DataFrame 的強型別版本 |
| 常見考試語境 | 底層控制 | PySpark 主角 | Scala/Java 常提 |

### 4.3 ETL vs ELT
| 比較面向 | ETL | ELT |
|---|---|---|
| 完整名稱 | Extract, Transform, Load | Extract, Load, Transform |
| 轉換時機 | 載入前 | 載入後 |
| 轉換位置 | 目標平台外或前置層 | 目標平台內 |
| 常見儲存脈絡 | Data Warehouse | Data Lake / Cloud Warehouse |
| 代表工具定位 | 傳統 ETL 工具 | dbt 常被視為 ELT 的 T |

### 4.4 GROUP BY vs 視窗函數
| 比較面向 | GROUP BY | 視窗函數 |
|---|---|---|
| 資料列數 | 通常減少 | 通常維持不變 |
| 分組行為 | 每組彙總 | 每列保留、群內計算 |
| 排名功能 | 不直接做 | 很適合 |
| 前後筆比較 | 不適合 | 可用 LAG / LEAD |
| 適用情境 | 每部門總額、每城市平均 | 組內排名、累積和、前後筆 |

### 4.5 ROW_NUMBER vs RANK vs DENSE_RANK
| 函數 | 並列處理 | 會不會跳號 | 例：100,100,90 |
|---|---|---|---|
| `ROW_NUMBER()` | 同分仍強制給不同序號 | 不適用 | 1,2,3 |
| `RANK()` | 並列同名次 | 會跳號 | 1,1,3 |
| `DENSE_RANK()` | 並列同名次 | 不跳號 | 1,1,2 |

## 5. 口訣 / Mnemonics
### 5.1 HDFS 數字記憶
- 口訣：`一塊二八，備三份才不怕`
- 對應：block `128 MB`、replication `3`

### 5.2 MapReduce 三階段
- 口訣：`先分，再洗，後總結`
- 對應：Map → Shuffle → Reduce
- 備註：`洗` = `Shuffle and Sort`

### 5.3 ETL vs ELT 方向記憶
- 口訣：`ETL 先改再放，ELT 先放再改`
- `ETL`：先轉換再載入
- `ELT`：先載入再轉換

### 5.4 Spark 特性口訣
- 口訣：`先記計畫，動作才跑；表格有 schema，Catalyst 幫優化`
- 對應：延遲求值、action、DataFrame、Catalyst Optimizer

### 5.5 視窗函數三兄弟
- 口訣：`Row 硬排、Rank 會跳、Dense 不跳`
- 對應：
  - `ROW_NUMBER()`：同分也硬排唯一序號
  - `RANK()`：並列跳號
  - `DENSE_RANK()`：並列不跳號

### 5.6 視窗函數（Window Function）判斷口訣
- 口訣：`列還在，就是窗；列變少，多半 Group`

### 5.7 Batch vs Stream 判斷口訣
- 口訣：`先囤一批叫 Batch，邊來邊算叫 Stream`

## 6. 考試陷阱 (Exam Traps)
❌ 陷阱：`RDD` 和 `DataFrame` 只是寫法不同，效能最佳化差不多。  
✅ 正解：`RDD` 使用不透明的 functional 轉換 API，Catalyst 無法檢視其計算邏輯，因此無法進行 logical plan 優化；即使為 `RDD` 補加 schema 也無法改變這個限制。`DataFrame` / `Dataset` 則透過 Spark SQL 引擎建立 logical plan，才能被 **Catalyst 最佳化器（Catalyst Optimizer）** 最佳化。

❌ 陷阱：Spark 每寫一個 transformation 就會立刻執行。  
✅ 正解：Spark 核心觀念是 **延遲求值（Lazy Evaluation）**。`.filter()`、`.groupBy()`、`.select()` 常只是建立計畫，要等 `.show()`、`.count()`、`.collect()` 等 action 才真正執行。

❌ 陷阱：`ETL` 是先載入再轉換，`ELT` 才是先轉換再載入。  
✅ 正解：剛好相反。`ETL = Extract → Transform → Load`，`ELT = Extract → Load → Transform`。很多人搞混，是因為兩者只差中間兩個字母位置。

❌ 陷阱：HDFS block 預設大小是 `64 MB`。  
✅ 正解：本課請記 `128 MB`。把它記成 `64 MB`，通常是混到舊版教材印象。

❌ 陷阱：`ROW_NUMBER()` 跟 `RANK()` 都是排名，遇到並列一樣。  
✅ 正解：`ROW_NUMBER()` 遇到同分仍會強制分配不同序號，不保留並列關係；`RANK()` 並列同名次，下一名會跳號。

❌ 陷阱：Spark Structured Streaming 預設就是真正逐事件的 true streaming。  
✅ 正解：本課心智應記成 **micro-batch**。它對使用者來說很像近即時，但底層常是一小批一小批處理。

❌ 陷阱：`GROUP BY` 跟 `PARTITION BY` 都有分組，所以結果列數都會縮減。  
✅ 正解：`GROUP BY` 通常縮列；`PARTITION BY` 是在視窗函數中分群計算，但保留原列。

❌ 陷阱：YARN 是 Hadoop 的儲存層。  
✅ 正解：HDFS 才是儲存層；YARN 是資源與排程管理層。

❌ 陷阱：`JOIN` 題只要看能不能接欄位，不用看保留哪些列。  
✅ 正解：`JOIN` 題最常考的是保留列邏輯。`INNER JOIN` 只保留兩邊都匹配的列，`LEFT JOIN` 保留左表全部列。

❌ 陷阱：`dbt` 等於完整 ETL 平台。  
✅ 正解：dbt 更常被視為轉換（Transform）層，尤其是 ELT 中的 `T`，不是所有抽取工作的代名詞。

## 7. 情境題快速判斷 (Scenario Quick-Judge)
### 7.1 批次處理 vs 串流處理
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 夜間批次、月結、歷史資料整批處理 | 批次處理（Batch Processing） |
| 即時監控、事件持續流入、近即時更新 | 串流處理（Stream Processing） |
| Spark 中持續接收資料並更新結果 | Structured Streaming |
| 題目強調一小批一小批更新 | micro-batch |

### 7.2 Hadoop 生態系元件
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 分散式儲存、block、metadata | HDFS |
| 管 block 位置與檔案 metadata | NameNode |
| 實際存 block | DataNode |
| 資源協調、排程、叢集管理 | YARN |
| Map → Shuffle → Reduce | MapReduce |

### 7.3 HDFS 記憶題
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| HDFS block 預設大小 | 128 MB |
| replication factor 常見預設 | 3 |
| 題目說副本與容錯 | replication |

### 7.4 Spark 抽象與執行心智
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 低階分散式資料抽象、彈性高 | RDD |
| 有 schema、表格式、較易優化 | DataFrame |
| Scala / Java 型別安全常見 | Dataset |
| 轉換先記錄、action 才執行 | 延遲求值 |
| 執行步驟關係圖 | DAG |
| Spark SQL / DataFrame 最佳化 | Catalyst Optimizer |

### 7.5 PySpark pseudocode 快速判讀
| 程式片段關鍵字 | 快速判斷答案 |
|---|---|
| `.filter()` | 篩選列 |
| `.groupBy()` | 依欄位分組 |
| `.agg()` | 聚合計算 |
| `.join(..., how=\"inner\")` | 只留兩表匹配列 |
| `.show()` / `.count()` | action，觸發執行 |
| `readStream` / `writeStream` | 串流情境 |

### 7.6 ETL vs ELT
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 先轉換再載入 | ETL |
| 先載入再轉換 | ELT |
| 資料倉儲導向 | ETL |
| 資料湖、雲端倉儲、保留 raw data | ELT |
| dbt 做模型轉換 | 多半是 ELT 中的 T |

### 7.7 SQL 語意判斷
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 每組一列、列數變少 | GROUP BY |
| 保留原列又要排名 | 視窗函數 |
| 分群但列數不減 | PARTITION BY |
| 組內排序 | ORDER BY in OVER(...) |
| 前一筆 / 下一筆 | LAG / LEAD |
| 並列會跳號 | RANK |
| 並列不跳號 | DENSE_RANK |
| 同分也給不同序號、每列唯一序號 | ROW_NUMBER |

### 7.8 SQL JOIN 判斷
| 題目關鍵字 | 快速判斷答案 |
|---|---|
| 只保留兩邊都有 | INNER JOIN |
| 左表全留，右表可 NULL | LEFT JOIN |
| 題目問列數改變原因 | 先看 JOIN 類型 |

### 7.9 考場 10 秒判斷流程
```text
看到題目
  │
  ├── 問 block / replication / metadata？→ HDFS
  ├── 問 Map → Shuffle / Shuffle and Sort → Reduce？→ MapReduce
  ├── 問 DataFrame / 延遲求值 / Catalyst？→ Spark
  ├── 問先轉再載或先載再轉？→ ETL / ELT
  └── 問排名 / 前一筆 / 保留原列？→ 視窗函數
```

## 8. 結尾：快速自我檢查 ✅
- [ ] 我能說出 **HDFS（Hadoop Distributed File System, HDFS）** 的核心角色，並記得 `block = 128 MB`、`replication factor = 3`。
- [ ] 我能解釋 **MapReduce（MapReduce）** 的三階段：`Map → Shuffle → Reduce`，並知道官方也常寫成 `Shuffle and Sort`。
- [ ] 我能分清楚 **YARN（YARN）** 是資源管理，不是儲存系統。
- [ ] 我能比較 **RDD（RDD）**、**DataFrame（DataFrame）**、**Dataset（Dataset）** 的結構化程度、型別差異與最佳化差異，並知道 DataFrame 與 Dataset 不是上下層關係。
- [ ] 我知道 Spark 的 **延遲求值（Lazy Evaluation）** 是先建計畫、遇到 action 才執行，並理解 **DAG（DAG）** 與 **Catalyst Optimizer（Catalyst Optimizer）** 的基本角色。
- [ ] 我能分辨 **批次處理（Batch Processing）** 與 **串流處理（Stream Processing）**，並知道 **Structured Streaming（Structured Streaming）** 的預設心智是 micro-batch。
- [ ] 我能正確判斷 **ETL（ETL）** 與 **ELT（ELT）** 的流程方向，並知道 `dbt` 常位在 ELT 的轉換（Transform）層。
- [ ] 我能區分 `GROUP BY` 與 **視窗函數（Window Function）**：前者通常縮列，後者通常保留原列。
- [ ] 我能判讀 `PARTITION BY`、`ORDER BY`、`ROW_NUMBER()`、`RANK()`、`DENSE_RANK()`、`LAG()`、`LEAD()` 的語意。
- [ ] 我看到 PySpark 題目中的 `.filter().groupBy().agg()`，可以快速說出每一步在做什麼。
📌 Out-of-scope：本課**不展開**叢集 sizing、Spark/YARN 調參、HDFS 高可用設計，也**不延伸**到 ML 特徵工程、資料標準化或模型輸入前處理；那些屬其他主題範圍。
