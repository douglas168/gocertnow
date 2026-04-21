# L22202 數據儲存與管理 — 學習指南

## Section 1: Exam Item Mapping

> 對應評鑑範圍：**L22202 數據儲存與管理**

這一課是中級資料分析組在「大數據處理分析與應用」裡的儲存核心。

考題真正想確認的，不是你會不會背產品名稱而已。

而是你能不能看到資料型態、查詢需求、規模與治理要求後，
快速判斷該用哪一類資料庫（Database）、
哪一種儲存機制（Storage Mechanism）、
以及哪一種訓練資料管理方式。

本課對應三個大考點：

1. 資料庫架構（Database Architecture）
2. 儲存機制（Storage Mechanisms）
3. 模型訓練資料儲存（Storage for Model Training Pipelines）

對應到本 lesson 的必讀能力如下：

- 看懂`關聯式資料庫（Relational Database Management System, RDBMS）`與`非關聯式資料庫（Not Only SQL, NoSQL）`的使用場景
- 分清楚`文件型（Document）`、`鍵值型（Key-Value）`、`寬欄型（Wide-Column）`、`圖形型（Graph）`NoSQL
- 理解`線上交易處理（Online Transaction Processing, OLTP）`與`線上分析處理（Online Analytical Processing, OLAP）`差異
- 理解`列式儲存（Row-Store）`與`欄式儲存（Column-Store）`差異
- 理解`Hadoop 分散式檔案系統（Hadoop Distributed File System, HDFS）`與`物件儲存（Object Storage）`差異
- 分辨`資料湖（Data Lake）`、`資料倉儲（Data Warehouse）`、`資料湖倉（Data Lakehouse）`
- 看懂 `Parquet`、`CSV`、`JSON` 等儲存格式的特性
- 看懂 Spark 對儲存格式的基本讀寫語法
- 理解`特徵儲存庫（Feature Store）`與`資料集版本控管（Dataset Versioning）`
- 理解`時間旅行（Time Travel，又稱時間回溯）`在訓練資料追溯上的意義

本課邊界也要守住：

- 本課談的是「資料怎麼存、存在哪、如何回溯」
- 不展開 ETL/ELT 轉換流程細節，那是 `L22203`
- 不展開統計分析方法，那是 `L22301`
- 不展開特徵工程演算法，那是 `L23301`
- 不展開模型訓練演算法，本課的`模型訓練`只指訓練資料儲存與版本管理

如果你把本課記成一句話：

`L22202 = 看到資料場景，就能選對儲存架構、儲存格式、查詢方向與訓練資料管理方式。`

---

## Section 2: 關鍵概念總覽圖 (Knowledge Tree)

```text
🌳 L22202 數據儲存與管理
│
├── 🎯 考試定位
│   ├── 🔥 資料該放哪種系統？
│   ├── 🔥 查詢型態對應哪種儲存？
│   ├── 🔥 原始資料、分析資料、訓練資料如何分流？
│   └── 🔥 能否從情境反推架構選型？
│
├── 🗃️ 資料庫架構（Database Architecture）
│   ├── 📘 關聯式資料庫（RDBMS）
│   │   ├── Schema / DDL
│   │   ├── SQL SELECT
│   │   ├── ACID
│   │   └── OLTP
│   ├── 📗 NoSQL
│   │   ├── 📄 文件型（Document）→ MongoDB
│   │   ├── 🔑 鍵值型（Key-Value）→ Redis
│   │   ├── 🧱 寬欄型（Wide-Column）→ HBase / Cassandra
│   │   └── 🕸️ 圖形型（Graph）→ Neo4j
│   └── 🌐 分散式儲存（Distributed Storage）
│       ├── 多節點
│       ├── 擴充性
│       └── 容錯性
│
├── ⚙️ 工作負載（Workload）
│   ├── 💳 OLTP
│   │   ├── 小量高頻讀寫
│   │   ├── 一筆一筆更新
│   │   └── 一致性高
│   └── 📊 OLAP
│       ├── 大量掃描
│       ├── 聚合分析
│       └── 報表與 BI
│
├── 💾 儲存機制（Storage Mechanisms）
│   ├── 🪑 列式儲存（Row-Store）
│   ├── 🧾 欄式儲存（Column-Store）
│   ├── 🏢 HDFS
│   ├── 🪣 物件儲存（Object Storage）
│   │   ├── S3
│   │   ├── Azure Blob
│   │   └── GCS
│   └── 📦 儲存格式
│       ├── CSV
│       ├── JSON
│       └── Parquet
│
├── 🏞️ 數據平台型態
│   ├── 🌊 資料湖（Data Lake）
│   ├── 🏛️ 資料倉儲（Data Warehouse）
│   └── 🏗️ 資料湖倉（Data Lakehouse）
│       ├── Delta Lake
│       └── Apache Iceberg
│
├── ⚡ Spark 儲存讀寫
│   ├── spark.read.parquet()
│   ├── spark.read.format("delta")
│   ├── df.write.format("delta").save()
│   └── createOrReplaceTempView()
│
└── 🤖 模型訓練資料管理
    ├── 🧠 特徵儲存庫（Feature Store）
    │   ├── Offline Store
    │   └── Online Store
    ├── 🗂️ 資料集版本控管（Dataset Versioning）
    │   └── DVC / lakeFS 概念
    └── ⏳ 時間旅行（Time Travel）
        ├── Delta Lake
        └── Iceberg
```

---

## Section 3: Core Concepts (the teaching content)

### 3.1 資料庫架構先看「資料長相」與「工作負載」

資料庫架構（Database Architecture）不是先問哪個名字最紅。

正確順序是：

1. 資料長什麼樣
2. 讀寫模式是什麼
3. 要不要強一致性
4. 要不要水平擴充（Horizontal Scaling）
5. 後續主要做交易，還是做分析

🗣️ 白話說明：

像你在做一個整合 LINE 官方帳號、蝦皮訂單、7-11 取貨、YouTube 行為資料的 AI 專案。

不是所有資料都該塞同一個地方。

訂單付款紀錄很像帳本，
聊天訊息很像 JSON 文件，
推薦系統的特徵很像高頻查表，
歷史行為資料又很像分析型大表。

以下術語（Document、Key-Value、寬欄型、Graph、OLTP/OLAP、欄式儲存）將在 3.3–3.6 節逐一定義，此處先給出選型結論。

所以考題常不是問「哪個最好」，
而是問「哪個最適合這個場景」。

```text
看到題目先這樣想：

資料有固定欄位？ ------ 是 ------> 先想 RDBMS
        |
        否
        v
資料是 JSON / 半結構化？ ---- 是 ----> 先想 Document NoSQL
        |
        否
        v
主要是用 key 快速查值？ ---- 是 ----> 先想 Key-Value
        |
        否
        v
超大規模稀疏欄位？ ------ 是 ----> 先想 Wide-Column
        |
        否
        v
強調節點關係與路徑？ ---- 是 ----> 先想 Graph
```

🔥🔥 高頻考點：

- 架構選型一定和工作負載綁在一起
- `OLTP` 常配 `RDBMS + Row-Store`
- `OLAP` 常配 `Column-Store + Warehouse / Lakehouse`

### 3.2 關聯式資料庫（Relational Database Management System, RDBMS）

`關聯式資料庫（Relational Database Management System, RDBMS）`的核心是：

- 先定義結構
- 用表格（Table）存資料
- 用 SQL 查詢
- 重視一致性與交易控制

它通常有明確的`結構描述（Schema）`，
會用`資料定義語言（Data Definition Language, DDL）`建表，
再用`結構化查詢語言（Structured Query Language, SQL）`操作資料。

🗣️ 白話說明：

把 RDBMS 想成 7-11 的收銀系統。

每一筆訂單都要清楚知道：

- 訂單編號
- 商品編號
- 數量
- 金額
- 付款狀態
- 建立時間

這些欄位不能今天有、明天沒有。

因為一旦帳對不起來，整個營運就會出事。

所以 RDBMS 適合那種「欄位穩定、規則清楚、不能亂」的資料。

#### 3.2.1 Schema、DDL 與型別

`結構描述（Schema）`是在資料寫入前先定義欄位與型別。

常見型別有：

- `INTEGER`
- `BIGINT`
- `VARCHAR`
- `DATE`
- `TIMESTAMP`
- `BOOLEAN`
- `DECIMAL`

考試很常用 DDL 讀題。

請至少看得懂欄位型別與主鍵。

```sql
CREATE TABLE orders (
    order_id BIGINT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    order_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL
);
```

上面代表：

- `orders` 是資料表
- `order_id` 是主鍵（Primary Key）
- 金額用 `DECIMAL(10,2)` 比較合理
- 訂單日期適合用 `TIMESTAMP`

🔥🔥 高頻考點：

- `CREATE TABLE` 是 DDL，不是查詢語法
- `Schema` 先定義，是 RDBMS 的典型特色
- 金流、訂單、庫存這類交易資料常優先考慮 RDBMS

#### 3.2.2 SQL SELECT 基本讀法

RDBMS 最常見的查詢方式是 `SELECT`。

考試常見的不是要你寫超難 SQL。

而是要你看懂：

- `JOIN`
- `WHERE`
- `GROUP BY`
- 聚合函數

```sql
SELECT
    c.city,
    COUNT(o.order_id) AS order_count,
    SUM(o.total_amount) AS total_sales
FROM customers c
JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.status = 'paid'
GROUP BY c.city;
```

這段查詢的語意是：

- 把顧客表與訂單表連接
- 只看已付款訂單
- 依城市分組
- 算每個城市的訂單數與銷售額

🗣️ 白話說明：

像 104 人力銀行想看不同縣市的履歷投遞量，
你就會把使用者表跟投遞紀錄表接起來，
再按城市做彙總。

這是非常典型的 SQL 場景。

#### 3.2.3 ACID 與 OLTP

`原子性、一致性、隔離性、持久性（Atomicity, Consistency, Isolation, Durability, ACID）`
是 RDBMS 的核心交易特性。

你在考試至少要記住意思：

- `Atomicity`：要嘛整筆成功，要嘛全部失敗
- `Consistency`：資料前後要符合規則
- `Isolation`：多筆交易互不干擾
- `Durability`：提交後不會因當機就消失

🗣️ 白話說明：

像蝦皮下單付款，
不能扣了錢卻沒產生訂單，
也不能訂單建立了但庫存沒扣到。

這就是 ACID 為什麼重要。

**BASE 模型（分散式 NoSQL 常見替代方案）**

BASE 代表 Basically Available（基本可用）、Soft State（軟狀態）、Eventual Consistency（最終一致性），是與 ACID 對照的設計哲學。NoSQL 系統（如 Cassandra、DynamoDB）常採 BASE 模型，犧牲強一致性換取水平擴展能力。

| 面向 | ACID | BASE |
|------|------|------|
| 一致性 | 強一致（立即） | 最終一致 |
| 可用性優先度 | 低 | 高 |
| 典型應用 | 關聯式資料庫 | 分散式 NoSQL |

`線上交易處理（Online Transaction Processing, OLTP）`
指的是高頻、小量、即時、單筆操作為主的工作負載。

典型例子：

- 下單
- 付款
- 登入
- 帳戶餘額更新
- 會員資料修改

🔥🔥 高頻考點：

- `RDBMS` 常對應 `ACID + SQL + OLTP`
- 題目若出現「交易正確性」「帳務一致性」「即時寫入」，優先想到 RDBMS

### 3.3 非關聯式資料庫（Not Only SQL, NoSQL）

`非關聯式資料庫（Not Only SQL, NoSQL）`不是「不用 SQL」而已。

它更重要的意思是：

- 不一定採傳統表格關聯模式
- 結構通常更彈性
- 常為特定場景最佳化
- 常配合分散式擴充

考試要掌握四大類型。

#### 3.3.1 文件型資料庫（Document Database）

`文件型資料庫（Document Database）`通常以 JSON-like 文件儲存資料。

代表產品：

- MongoDB

典型特徵：

- 適合半結構化資料
- 同一集合中的文件欄位可略有差異
- 常見於 API 回傳、事件資料、內容資料

基本查詢長這樣：

```javascript
db.collection.find({"field": value})
```

例如：

```javascript
db.users.find({"city": "Taipei"})
```

🗣️ 白話說明：

像 LINE 聊天機器人蒐集到的事件資料，
有些事件有 `location`，
有些有 `image_url`，
有些只有 `text`。

這種欄位不一定完全固定的資料，
就很適合文件型資料庫。

🔥 高頻考點：

- 半結構化資料
- JSON 文件
- `find()` 是基本查詢模式

#### 3.3.2 鍵值型資料庫（Key-Value Database）

`鍵值型資料庫（Key-Value Database）`把資料看成：

`key -> value`

代表產品：

- Redis

典型特徵：

- 用 key 極快查值
- 資料模型簡單
- 常做快取（Cache）、Session、排行榜

🗣️ 白話說明：

像你打開某個網站後，
系統要快速知道你是不是已登入，
最直覺就是用 session key 去查值。

這種場景比起複雜關聯查詢，
更在乎「用一個 key 馬上拿到結果」。

🔥 高頻考點：

- 快取、工作階段、熱門名單
- 高速查值
- 不適合複雜多表關聯分析

#### 3.3.3 寬欄型資料庫（Wide-Column Database）

`寬欄型資料庫（Wide-Column Database）`會把資料組織成欄族（Column Family）概念。

代表產品：

- HBase
- Cassandra

典型特徵：

- 適合超大規模資料
- 適合分散式部署
- 適合欄位很多、且每列可能只有部分欄位有值的稀疏資料

🗣️ 白話說明：

像大型 IoT 平台，
每台設備回傳欄位不完全相同，
每天又有超大量紀錄。

如果硬塞進傳統關聯表，
很多欄位會空空的，
而且擴充壓力大。

這時就可能考慮 wide-column。

🔥 高頻考點：

- 大規模、分散式、稀疏欄位
- `HBase / Cassandra` 是代表例子

#### 3.3.4 圖形資料庫（Graph Database）

`圖形資料庫（Graph Database）`強調節點（Node）與邊（Edge）的關係。

代表產品：

- Neo4j

典型特徵：

- 適合社群關係
- 適合推薦關係
- 適合路徑分析
- 適合網路拓樸

🗣️ 白話說明：

像 LinkedIn 的「你可能認識的人」，
或大學課程先修關係圖，
重點不是單一筆資料內容，
而是「誰連到誰」「透過哪些關係連到」。

這就是 graph database 的強項。

🔥 高頻考點：

- 關係密集
- 路徑查詢
- 社群網路與推薦鏈路

### 3.4 分散式儲存（Distributed Storage）

`分散式儲存（Distributed Storage）`是把資料分散到多個節點上儲存與管理。

關鍵目的通常有三個：

- 容量擴充
- 效能擴充
- 容錯（Fault Tolerance）

```text
單機儲存：
[Server A]
  └── 全部資料

分散式儲存：
[Node A] ── 部分資料 / 副本
[Node B] ── 部分資料 / 副本
[Node C] ── 部分資料 / 副本
```

註：分片（Sharding）是將資料水平切分到不同節點；副本（Replication）是複製相同資料到多個節點，兩者可獨立或組合使用。

🗣️ 白話說明：

像 YouTube 不可能把全世界影片都放在一台機器。

資料量太大、流量太高、單點故障風險也太高。

所以會分散到多個節點。

對考試來說，
你只要抓住：

`分散式 = 為了規模與可靠性，不再只靠單機。`

🔥 高頻考點：

- `HDFS` 是分散式檔案系統
- 很多 NoSQL 也有分散式特性
- 分散式不代表一定適合交易型 ACID 場景

### 3.5 線上交易處理（Online Transaction Processing, OLTP）vs 線上分析處理（Online Analytical Processing, OLAP）

這是本課最值得背熟的配對題。

#### 3.5.1 OLTP 是「一筆一筆處理」

`OLTP` 的特徵：

- 高頻小量
- 即時讀寫
- 單筆更新多
- 要求一致性高

常見場景：

- 金流
- 訂單
- 會員資料
- 庫存扣減

#### 3.5.2 OLAP 是「大量資料分析」

`OLAP` 的特徵：

- 大量掃描
- 常做聚合
- 歷史資料分析
- 報表與儀表板

常見場景：

- 銷售報表
- 用戶分群分析
- 趨勢分析
- 特徵資料計算後查詢

🗣️ 白話說明：

OLTP 像便利商店收銀機。

每刷一筆都要準。

OLAP 像總部看月報表。

重點不是一筆交易多快，
而是從大量資料中快速算出答案。

```text
OLTP：一筆訂單、一筆付款、一筆更新
OLAP：掃 3 年訂單，算每月營收、客群、地區排行
```

🔥🔥 高頻考點：

- `OLTP` 不等於大數據分析
- `OLAP` 不等於高頻交易寫入
- 題目只要提「報表」「分析」「聚合」，通常偏 `OLAP`

### 3.6 列式儲存（Row-Store）vs 欄式儲存（Column-Store）

#### 3.6.1 列式儲存（Row-Store）

`列式儲存（Row-Store）`會把同一列的欄位放在一起。

```text
Row 1: user_id | name | city | age
Row 2: user_id | name | city | age
Row 3: user_id | name | city | age
```

特性：

- 讀一整筆資料很方便
- 更新單筆資料很直覺
- 常見於交易型資料庫

🗣️ 白話說明：

像店員查某一筆會員資料，
需要一次拿到姓名、電話、地址、等級。

這種整筆取出的需求很適合 row-store。

#### 3.6.2 欄式儲存（Column-Store）

`欄式儲存（Column-Store）`會把同一欄的值放在一起。

```text
user_id: 1001, 1002, 1003
name:    Amy,  Ben,  Cindy
city:    TPE,  TPE,  TCH
age:     24,   31,   29
```

特性：

- 只讀少數欄位時效率高
- 常利於壓縮
- 很適合聚合分析

🗣️ 白話說明：

如果你只想算「全台北會員平均年齡」，
根本不需要把每個人的姓名、地址、電話都讀出來。

這種「只讀部分欄位做大量分析」，
就是 column-store 的強項。

#### 3.6.3 什麼情況選哪個

```text
要常常新增 / 更新單筆資料 ------> 先想 Row-Store
要大量掃描少數欄位做分析 ------> 先想 Column-Store
```

🔥🔥 高頻考點：

- `Row-Store` 常搭 `OLTP`
- `Column-Store` 常搭 `OLAP`
- 題目若說「高頻寫入交易系統」，不要選 column-store

### 3.7 Hadoop 分散式檔案系統（Hadoop Distributed File System, HDFS）

`Hadoop 分散式檔案系統（Hadoop Distributed File System, HDFS）`
是一種分散式檔案系統（Distributed File System）。

它的核心概念是：

- 大檔切塊
- 分散儲存在多台節點
- 透過副本提高容錯

```text
大型檔案
   |
切成多個 block
   |
分散到不同 DataNode
```

🗣️ 白話說明：

像學校把整批高畫質監視器影片分散放在多間資料室，
就算其中一間出問題，
其他地方還有副本可救。

這種設計很適合大數據批次處理。

HDFS 的考試理解重點：

- 它像「分散式檔案系統」
- 適合大規模資料
- 常見於 Hadoop / Spark 生態系

不是要你背部署細節。

### 3.8 物件儲存（Object Storage）

`物件儲存（Object Storage）`是以 object 方式管理資料。

代表服務：

- Amazon S3
- Azure Blob Storage
- Google Cloud Storage, GCS

它的特色通常是：

- 高擴充性
- 高耐久性
- 適合大量非結構化與分析資料
- 常作為 data lake 基底儲存

```text
Bucket / Container
   ├── object A
   ├── object B
   └── object C
```

🗣️ 白話說明：

把 object storage 想成超大型雲端倉庫。

你不一定在意它像傳統資料夾那樣運作得多像本機硬碟，
你更在意：

- 能不能放很多東西
- 能不能跨服務讀取
- 能不能便宜又耐放

這就是為什麼 data lake 常建在 object storage 上。

🔥🔥 高頻考點：

- `S3 / Blob / GCS` 都屬 object storage
- data lake 常建在 object storage
- object storage 與 HDFS 都能存大量資料，但抽象方式不同

### 3.9 HDFS vs 物件儲存（Object Storage）怎麼分

這題幾乎一定要會。

你可以先記：

- `HDFS` 偏分散式檔案系統
- `Object Storage` 偏雲端物件儲存服務

```text
HDFS：
像一個分散在多台機器上的檔案系統

Object Storage：
像超大雲端物件倉庫，用 bucket / object 管理
```

考試判斷重點：

- 自建 Hadoop 生態、檔案系統思維強時，常看到 HDFS
- 雲端資料湖、跨服務讀寫、長期儲存時，常想到 object storage

🗣️ 白話說明：

HDFS 比較像校內機房自己搭的分散式圖書館。

S3 比較像你租用的超大型雲端倉庫，
很多服務都能直接來拿資料。

### 3.10 儲存格式（Storage Formats）：CSV、JSON、Parquet

本課不只考系統，
也會考檔案格式。

#### 3.10.1 CSV（Comma-Separated Values）

`逗號分隔值（Comma-Separated Values, CSV）`
是最常見、最容易看懂的表格式文字檔。

特徵：

- 人眼可讀
- 工具相容性高
- 結構簡單
- 不支援巢狀結構
- 對大型分析效率較差

🗣️ 白話說明：

像助教匯出的修課名單。

用 Excel 打得開，
看起來也直觀，
但資料量一大就不太優雅。

#### 3.10.2 JSON（JavaScript Object Notation）

`JavaScript 物件表示法（JavaScript Object Notation, JSON）`
適合半結構化資料。

特徵：

- 可表達巢狀結構
- 常用於 API 與事件資料
- 可讀性不錯
- 分析掃描效率通常不如欄式格式

🗣️ 白話說明：

像前端 App 打 API 回來的資料，
常常就是 JSON。

一個使用者底下還有地址、偏好、裝置資訊，
這種層次化結構用 JSON 很自然。

#### 3.10.3 Parquet

`Parquet` 是欄式儲存格式（Columnar Storage Format）。

特徵：

- 適合分析型查詢
- 只讀需要的欄位
- 壓縮效率通常較好
- 常見於 Spark、Data Lake、Lakehouse

🗣️ 白話說明：

像你只想分析 YouTube 使用者的觀看時長與裝置類型，
不想每次都把所有欄位全部搬出來。

Parquet 在這種情況通常比 CSV 更適合。

🔥🔥 高頻考點：

- `Parquet` 常和大數據分析綁在一起
- `CSV` 好懂但不一定適合大規模分析
- `JSON` 適合半結構化，不代表分析效率最佳

### 3.11 資料湖（Data Lake）vs 資料倉儲（Data Warehouse）vs 資料湖倉（Data Lakehouse）

這是架構題核心。

#### 3.11.1 資料湖（Data Lake）

`資料湖（Data Lake）`的特徵是：

- 可先保存原始資料
- 可容納結構化、半結構化、非結構化資料
- 常建在 object storage 上
- 彈性高

🗣️ 白話說明：

像學校把歷年上課影片、學生作業、問卷回覆、App log 全部先收進總資料區。

先留著，
之後再依需求分析。

這就是 data lake 的思路。

#### 3.11.2 資料倉儲（Data Warehouse）

`資料倉儲（Data Warehouse）`的特徵是：

- 強調結構化資料
- 資料通常已整理過
- 追求快速 SQL 分析
- 常服務 BI、報表、管理決策

🗣️ 白話說明：

如果 data lake 是原料倉，
data warehouse 就像整理好的超市貨架。

東西已經分類好、標籤好、方便快速查詢。

#### 3.11.3 資料湖倉（Data Lakehouse）

`資料湖倉（Data Lakehouse）`
想同時結合 data lake 與 data warehouse 的優點。

核心想法是：

- 底層常在 object storage
- 上層加上交易、目錄、版本、schema 管理
- 讓資料湖也能更像可治理、可分析的表格系統

代表概念或技術例子：

- Delta Lake
- Apache Iceberg

🗣️ 白話說明：

像你不想放棄 data lake 的彈性與成本優勢，
但又想要 data warehouse 那種可查、可管、可回溯。

lakehouse 就是想把兩邊優點接起來。

```text
Data Lake      = 先收原始資料，格式多元
Data Warehouse = 先整理結構，再高速分析
Data Lakehouse = 在湖上加治理與表格能力
```

🔥🔥 高頻考點：

- `Lakehouse` 不是單純把 Parquet 丟進 object storage 就結束
- 它強調 metadata、schema、ACID、時間旅行（Time Travel，詳見 3.15 節）之類能力

### 3.12 Spark 讀寫儲存格式的基本模式

本課 Spark 只談「讀寫儲存格式」，
不展開轉換流程。

#### 3.12.1 讀 Parquet

```python
df = spark.read.parquet("s3://bucket/sales/")
```

這代表：

- 用 Spark 讀取 Parquet 資料
- 結果是一個 DataFrame

#### 3.12.2 讀 Delta

```python
df = spark.read.format("delta").load("s3://bucket/orders_delta/")
```

這代表：

- 用指定格式 `delta` 讀取 lakehouse table

#### 3.12.3 寫 Delta

```python
df.write.format("delta").save("s3://bucket/orders_delta/")
```

這代表：

- 把 DataFrame 以 delta format 寫出

#### 3.12.4 建暫存檢視（Temp View）

```python
df.createOrReplaceTempView("orders_view")
```

這代表：

- 把 DataFrame 註冊成可用 SQL 查的暫時檢視

之後可以：

```sql
SELECT customer_id, COUNT(*) AS cnt
FROM orders_view
GROUP BY customer_id;
```

🗣️ 白話說明：

像你先把一包資料讀進 Spark，
再暫時命名成一張表，
就能用熟悉的 SQL 方式查它。

這在考題裡很常拿來做讀碼判斷。

🔥🔥 高頻考點：

- `spark.read.parquet()` 是讀 Parquet
- `format("delta")` 常用來讀寫 Delta Lake
- `createOrReplaceTempView()` 是讓 DataFrame 可以被 SQL 查詢

### 3.13 特徵儲存庫（Feature Store）

`特徵儲存庫（Feature Store）`
是管理機器學習特徵資料的資料層，不是特徵工程演算法。

代表例子：

- Feast
- Tecton

它解決的核心問題：

- 訓練時用什麼特徵資料
- 線上推論時用什麼特徵資料
- 如何讓線上與離線特徵定義一致

#### 3.13.1 Offline Store vs Online Store

`離線儲存（Offline Store）`
通常放大量歷史特徵，
用來做訓練資料產生與回溯分析。

`線上儲存（Online Store）`
通常放低延遲查詢用的最新特徵，
用於即時推論。

```text
歷史訓練資料 ------> Offline Store
即時模型查特徵 ----> Online Store
```

🗣️ 白話說明：

像推薦系統要預測「這個人現在會不會點這支影片」。

模型在線上推論時，
要快速拿到最近觀看次數、最近點擊類型等特徵。

但模型訓練時，
又要看過去很長一段時間的歷史特徵。

所以 feature store 會把這兩種需求分開管理。

🔥🔥 高頻考點：

- feature store 管的是「特徵資料儲存與一致性」
- 不是特徵工程演算法
- `offline` 對訓練，`online` 對推論

### 3.14 資料集版本控管（Dataset Versioning）

`資料集版本控管（Dataset Versioning）`
是讓你知道：

- 這次模型訓練到底用了哪一份資料
- 資料內容何時被更新
- 出問題時能不能回到舊版本

代表例子：

- DVC
- lakeFS
- Delta Lake / Iceberg 的表版本能力

🗣️ 白話說明：

像你交作業時如果只存 `final.csv`、`final_v2.csv`、`final_final.csv`，
過兩週一定亂掉。

模型訓練資料如果也這樣管，
之後根本無法重現結果。

所以 dataset versioning 本質上是在管理「資料版號與可追溯性」。

🔥 高頻考點：

- 不是手動改檔名而已
- 是為了重現、稽核、比較、回滾

### 3.15 時間旅行（Time Travel）

`時間旅行（Time Travel）`
是指你可以查到某個時間點或某個版本的資料狀態。

典型出現在：

- Delta Lake
- Apache Iceberg

它的價值在於：

- 重現舊版訓練資料
- 比較版本差異
- 出錯時回查

🗣️ 白話說明：

像老師問你：

「你上週交報告時用的那份資料到底長什麼樣？」

如果你有時間旅行，
就能回到當時版本直接查。

如果沒有，
你只能憑印象猜。

這對 AI 專案是很危險的。

```text
Version 1 ----> Version 2 ----> Version 3
     ^               ^
     |               |
   可回查          可回查
```

🔥🔥 高頻考點：

- 時間旅行是訓練資料追溯能力
- 它和本課的「模型訓練」關聯在資料管理，不在演算法

### 3.16 把整課串起來的決策地圖

```text
交易資料、欄位固定、要 ACID
    -> RDBMS + OLTP + Row-Store

JSON / 半結構化事件資料
    -> Document NoSQL

快取 / Session / 快速 key 查值
    -> Key-Value

超大規模稀疏資料
    -> Wide-Column

社群關係 / 路徑分析
    -> Graph

大量原始資料先保留
    -> Data Lake + Object Storage

整理後高速報表分析
    -> Data Warehouse + OLAP + Column-Store

想兼顧湖的彈性與倉的治理
    -> Data Lakehouse

訓練資料一致性與回溯
    -> Feature Store + Dataset Versioning + Time Travel
```

---

## Section 4: Comparison Tables (易混淆概念)

### 4.1 RDBMS vs NoSQL（4 types）

| 類型 | 核心結構 | 代表例子 | 適合場景 | 不要誤會 |
|---|---|---|---|---|
| RDBMS | 表格、Schema 固定、SQL | PostgreSQL、MySQL | 訂單、金流、會員、庫存 | 不是所有資料都該進 RDBMS |
| Document NoSQL | JSON 文件 | MongoDB | 半結構化資料、內容資料、事件資料 | 不是最強交易系統 |
| Key-Value NoSQL | key -> value | Redis | 快取、Session、排行榜 | 不適合複雜關聯查詢 |
| Wide-Column NoSQL | 欄族、分散式 | HBase、Cassandra | 超大規模、稀疏欄位、分散式資料 | 不等於一般 column-store 分析庫 |
| Graph NoSQL | Node / Edge | Neo4j | 社群關係、路徑分析、推薦關係 | 重點在關係，不在大表聚合 |

### 4.2 Data Lake vs Data Warehouse vs Data Lakehouse

| 比較面向 | Data Lake | Data Warehouse | Data Lakehouse |
|---|---|---|---|
| 主要資料型態 | 結構化 + 半結構化 + 非結構化 | 以結構化為主 | 多元資料型態，但具表格治理能力 |
| 資料狀態 | 常保留原始資料 | 常為整理後資料 | 保留彈性，同時強化治理 |
| 底層常見儲存 | Object Storage | 專用分析資料庫 / 倉儲系統 | Object Storage + Table Format |
| 查詢特性 | 彈性高，但治理未必完整 | SQL 分析強 | SQL 分析與治理能力較強 |
| 典型用途 | 原始資料保存、資料科學探索 | BI、報表、管理分析 | AI/分析/治理整合平台 |
| 代表例子 | S3-based Lake | Snowflake / BigQuery 類概念 | Delta Lake、Apache Iceberg |

### 4.3 OLTP vs OLAP

| 比較面向 | OLTP | OLAP |
|---|---|---|
| 全名 | Online Transaction Processing | Online Analytical Processing |
| 主要目標 | 正確處理單筆交易 | 快速做大量分析 |
| 讀寫型態 | 高頻小量讀寫 | 大量讀取與聚合 |
| 資料更新 | 即時更新多 | 批次或分析查詢多 |
| 常見場景 | 下單、付款、登入、庫存 | 報表、趨勢分析、用戶分析 |
| 常見搭配 | RDBMS + Row-Store | Warehouse/Lakehouse + Column-Store |

### 4.4 Row-Store vs Column-Store

| 比較面向 | Row-Store | Column-Store |
|---|---|---|
| 儲存方式 | 同一列資料放一起 | 同一欄資料放一起 |
| 強項 | 單筆查詢、單筆更新 | 聚合查詢、只讀部分欄位 |
| 常見工作負載 | OLTP | OLAP |
| 例子理解 | 查某一張訂單完整內容 | 算所有訂單的平均金額 |
| 考試判斷 | 交易系統常見 | 分析系統常見 |

### 4.5 HDFS vs Object Storage

| 比較面向 | HDFS | Object Storage |
|---|---|---|
| 類型 | 分散式檔案系統 | 雲端物件儲存 |
| 抽象方式 | 檔案系統思維 | Bucket / Object 思維 |
| 部署方式 | 常見於 Hadoop 生態 / 自建叢集 | 常見於雲端服務 |
| 擴充與耐久 | 透過分散節點與副本 | 雲端高耐久高擴充 |
| 典型用途 | 大數據叢集儲存 | Data Lake、備存、分析資料 |
| 代表例子 | Hadoop HDFS | S3、Azure Blob、GCS |

---

## Section 5: 口訣 / Mnemonics

### 5.1 RDBMS vs NoSQL 口訣

`表格講規矩，用 RDBMS；資料很彈性，看 NoSQL。`

補強記憶：

- `文件像文件，Mongo 找 find`
- `鍵值像字典，Redis 查最快`
- `寬欄撐大表，Cassandra 扛規模`
- `圖形看關係，Neo4j 走路徑`

### 5.2 OLTP vs OLAP 口訣

`T 是 Transaction，單筆要正確；A 是 Analysis，大量要看快。`

再簡化成一句：

`交易看 T，分析看 A。`

### 5.3 Row-Store vs Column-Store 口訣

`查整筆，用列；算整欄，用欄。`

如果你只記得一句話，
就記這句。

### 5.4 Data Lake / Warehouse / Lakehouse 口訣

`湖先收，倉先整，湖倉兩邊都想要。`

對應意思：

- Data Lake：先收原始資料
- Data Warehouse：先整理再分析
- Data Lakehouse：想同時要彈性與治理

### 5.5 HDFS vs Object Storage 口訣

`HDFS 像分散式檔案櫃；Object Storage 像雲端大倉庫。`

### 5.6 CSV / JSON / Parquet 口訣

`CSV 好看、JSON 好裝、Parquet 好分析。`

### 5.7 Feature Store / Versioning / Time Travel 口訣

`特徵要一致，資料要有版，出事能回看。`

對應：

- 一致：Feature Store
- 有版：Dataset Versioning
- 回看：Time Travel

---

## Section 6: 考試陷阱 (Exam Traps)

❌ 把 `RDBMS` 理解成「所有資料庫最通用，所以一律選它」  
✅ 正解：RDBMS 最適合欄位穩定、交易一致性高的場景，不是所有資料都該硬塞進去。

❌ 把 `NoSQL` 理解成「完全不能用 SQL」  
✅ 正解：NoSQL 重點是資料模型與擴充方式不同，不是單純禁止 SQL。

❌ 題目看到 JSON，就直接選 key-value  
✅ 正解：若資料是文件、欄位彈性、結構接近 JSON，通常先想 document database。

❌ 把 `Redis` 當作複雜多表查詢主力資料庫  
✅ 正解：Redis 典型場景是快取、Session、排行榜、快速 key 查值。

❌ 把 `Wide-Column` 與一般 `Column-Store` 當成完全相同概念  
✅ 正解：Wide-Column 是 NoSQL 資料模型；Column-Store 是分析型儲存方式，兩者不是同一件事。

❌ 題目提到「大量關係連結」，卻選 document database  
✅ 正解：若重點是節點關係與路徑查詢，優先考慮 graph database。

❌ 把 `OLTP` 當成報表分析系統  
✅ 正解：OLTP 是高頻小量交易；報表分析通常偏 OLAP。

❌ 題目出現「月營收彙總、各城市訂單排名」，卻選 OLTP  
✅ 正解：聚合、彙總、長期歷史分析都偏 OLAP。

❌ 把 `Column-Store` 當成高頻更新訂單最適合的選擇  
✅ 正解：Column-Store 強在分析查詢，不是高頻單筆交易更新。

❌ 把 `Row-Store` 當成大規模分析最優解  
✅ 正解：若常大量掃描少數欄位做聚合，通常 column-store 更合理。

❌ 把 `Data Lake` 認成「整理好的高品質報表倉庫」  
✅ 正解：Data Lake 重點是保留原始、多格式資料，不等於已整理完成。

❌ 把 `Data Warehouse` 認成「任何原始檔案直接丟進去的地方」  
✅ 正解：Data Warehouse 通常偏整理過、結構化、可高效 SQL 分析。

❌ 以為 `Data Lakehouse` 只是「把 Parquet 放在 S3」  
✅ 正解：Lakehouse 還強調 metadata、schema 管理、ACID、時間旅行等表格能力。

❌ 把 `HDFS` 與 `Object Storage` 當成完全一樣  
✅ 正解：HDFS 是分散式檔案系統；Object Storage 是以 object/bucket 為核心的儲存服務。

❌ 看到 `S3`、`Azure Blob`、`GCS`，卻回答成資料庫  
✅ 正解：它們是 object storage，不是 RDBMS 或 NoSQL database。

❌ 以為 `CSV` 一定比 `Parquet` 更適合分析  
✅ 正解：CSV 易讀易交換，但大型分析通常 Parquet 更有優勢。

❌ 以為 `JSON` 因為可讀，所以分析速度也一定最好  
✅ 正解：JSON 適合半結構化，但分析效率常不如 Parquet 這類欄式格式。

❌ 把 Spark 本課重點寫成 transformation API 細節  
✅ 正解：L22202 重點是 Spark 對儲存格式的 read/write，不是 ETL 邏輯。

❌ 看見 `createOrReplaceTempView()` 就以為是在建立永久資料表  
✅ 正解：它建立的是暫時檢視，方便 DataFrame 被 SQL 查詢。

❌ 把 `Feature Store` 寫成「做特徵工程演算法的平台」  
✅ 正解：Feature Store 在本課是管理訓練與推論特徵資料的一致性與存取。

❌ 把 `Offline Store` 與 `Online Store` 混為一談  
✅ 正解：Offline Store 偏歷史訓練資料；Online Store 偏低延遲即時推論查詢。

❌ 把 `Dataset Versioning` 理解成「檔名加 v2、v3」  
✅ 正解：版本控管重點是可追溯、可比較、可回復、可重現。

❌ 把 `Time Travel` 當成模型訓練技巧  
✅ 正解：Time Travel 是資料版本回查能力，用來重現訓練資料狀態。

❌ 本課寫太多模型訓練演算法  
✅ 正解：本課的模型訓練只談資料儲存與版本管理，不談演算法。

---

## Section 7: 情境題快速判斷 (Scenario Quick-Judge)

### 7.1 看到關鍵字 → 選資料庫架構

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 訂單、付款、庫存、交易一致性 | RDBMS |
| schema 固定、SQL JOIN、ACID | RDBMS |
| JSON、半結構化、欄位彈性 | Document NoSQL |
| session、cache、排行榜、快速查值 | Key-Value |
| 超大規模、稀疏欄位、分散式寫入 | Wide-Column |
| 社群關係、路徑、推薦鏈路 | Graph Database |

### 7.2 看到關鍵字 → 選工作負載

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 即時下單、單筆更新、交易正確性 | OLTP |
| 月報表、聚合分析、歷史趨勢 | OLAP |
| 每次查一筆完整紀錄 | Row-Store |
| 只讀幾個欄位做大量統計 | Column-Store |

### 7.3 看到關鍵字 → 選平台型態

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 原始資料先保留、多格式都收 | Data Lake |
| 整理後提供 BI / SQL 分析 | Data Warehouse |
| 想保留湖的彈性，又要治理與版本 | Data Lakehouse |
| object storage 上做可治理表格 | Lakehouse |

### 7.4 看到關鍵字 → 選底層儲存

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| Hadoop、生態系、自建叢集、分散式檔案系統 | HDFS |
| S3、Blob、GCS、雲端儲存、bucket | Object Storage |
| 原始大檔、資料湖、長期保存 | Object Storage |

### 7.5 看到關鍵字 → 選檔案格式

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 文字表格、交換方便、Excel 易開 | CSV |
| 巢狀結構、API 回傳、事件資料 | JSON |
| 分析查詢、欄式格式、Spark 常見 | Parquet |

### 7.6 看到程式片段 → 快速翻譯

| 🔑 程式片段 | 代表意思 |
|---|---|
| `CREATE TABLE ...` | 在定義 schema，屬 DDL |
| `SELECT ... JOIN ... WHERE ... GROUP BY ...` | 關聯式查詢與聚合 |
| `db.collection.find({...})` | MongoDB 文件查詢 |
| `spark.read.parquet("path")` | 讀取 Parquet |
| `spark.read.format("delta").load("path")` | 讀取 Delta 格式 |
| `df.write.format("delta").save("path")` | 以 Delta 格式寫出 |
| `df.createOrReplaceTempView("name")` | 把 DataFrame 註冊成暫時 SQL 檢視 |

### 7.7 看到關鍵字 → 選訓練資料管理概念

| 🔑 看到關鍵字 | 優先想到 |
|---|---|
| 線上與離線特徵一致 | Feature Store |
| 即時推論要快速拿特徵 | Online Store |
| 產生歷史訓練資料 | Offline Store |
| 重現上次訓練資料 | Dataset Versioning |
| 回到某個時間點資料狀態 | Time Travel |
| 資料版控像 Git 概念 | DVC / lakeFS 類概念 |

### 7.8 一眼判斷流程表

| 🔑 題目描述 | 最可能答案 |
|---|---|
| 電商結帳資料必須正確入帳 | RDBMS + OLTP |
| App 事件資料是多種 JSON 格式 | Document NoSQL 或 Data Lake |
| 分析三年銷售資料只看少數欄位 | Column-Store / OLAP |
| 全公司原始 log 先集中保存 | Data Lake + Object Storage |
| 想在資料湖上支援版本與時間旅行 | Data Lakehouse |
| 要管理模型訓練與線上推論特徵一致性 | Feature Store |

---

## Section 8: 結尾：快速自我檢查 ✅

請在考前確認自己能不能在 30 秒內回答下列問題：

- [ ] 我可以說出 `RDBMS` 為什麼適合訂單、金流、庫存這類交易資料。
- [ ] 我可以分辨 `Document`、`Key-Value`、`Wide-Column`、`Graph` 四種 NoSQL 的典型場景。
- [ ] 我可以看到題目中的「交易」或「報表分析」關鍵字，快速區分 `OLTP` 與 `OLAP`。
- [ ] 我可以用一句話說清楚 `Row-Store` 與 `Column-Store` 的差異。
- [ ] 我可以分辨 `HDFS` 與 `Object Storage` 的核心差異。
- [ ] 我可以比較 `Data Lake`、`Data Warehouse`、`Data Lakehouse` 的用途與強項。
- [ ] 我可以看懂 `CREATE TABLE`、`SELECT ... JOIN ... GROUP BY ...`、`db.collection.find(...)` 這些基本程式片段。
- [ ] 我可以看懂 `spark.read.parquet()`、`spark.read.format("delta")`、`df.write.format("delta").save()`、`createOrReplaceTempView()` 的用途。
- [ ] 我可以解釋 `Feature Store` 的 `Offline Store` 與 `Online Store` 分工。
- [ ] 我可以解釋 `Dataset Versioning` 與 `Time Travel` 為什麼對訓練資料重現很重要。

📌 超出本課範圍提醒：

- 不需要在這一課展開 ETL/ELT 轉換流程細節
- 不需要在這一課展開統計分析方法
- 不需要在這一課展開特徵工程演算法
- 不需要在這一課展開模型訓練演算法

如果你已經能做到上面 10 點，
代表你對 `L22202 數據儲存與管理` 的考試核心已經掌握住了。

下一步複習建議：

1. 先背熟比較表
2. 再練情境題反推架構
3. 最後用程式片段題檢查自己有沒有把 SQL、MongoDB、Spark 讀寫看懂

---

## 📊 視覺化圖表 (Diagrams)

> 以下 Mermaid 圖表原始碼存於 `diagrams/` 目錄，可用 Mermaid Live Editor 或 Gemini 渲染為 PNG。

| 圖表 | 說明 | 檔案 |
|------|------|------|
| 儲存系統選型決策樹 | 依資料結構 + 工作負載選擇 RDBMS / NoSQL / Lake / Warehouse / Lakehouse | [storage-decision-tree.mmd](diagrams/storage-decision-tree.mmd) |
| OLTP vs OLAP 工作負載對照 | 兩種工作負載的操作模式、延遲、格式對比 | [oltp-vs-olap.mmd](diagrams/oltp-vs-olap.mmd) |
| Data Lake / Warehouse / Lakehouse 三層架構 | 資料從原始層到分析層到統一層的流向 | [lake-warehouse-lakehouse.mmd](diagrams/lake-warehouse-lakehouse.mmd) |
| NoSQL 四大類型使用場景 | Document / Key-Value / Wide-Column / Graph 各自適用情境 | [nosql-four-types.mmd](diagrams/nosql-four-types.mmd) |
| Row-Store vs Column-Store 存取模式對比 | 同一張表格在兩種儲存格式下的磁碟排列方式 | [row-vs-column-store.mmd](diagrams/row-vs-column-store.mmd) |
