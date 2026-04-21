# L22201 數據收集與清理 學習指南

> 對應評鑑範圍：**L222 大數據處理技術** ＞ **L22201 數據收集與清理**

---

## Section 1：考試對應範圍

| 科目 | 章節 | 對應項目 |
|------|------|---------|
| 科目二：大數據處理分析與應用 | L222 大數據處理技術 | L22201 數據收集與清理 |

**高頻考點（依出現頻率排序）：**

1. 缺值處理（dropna / fillna / ffill / bfill）
2. 異常值修正（IQR fence / z-score clip）
3. ETL vs ELT 策略選擇
4. Spark Structured Streaming 去重複與 Watermark
5. 欄位格式標準化（型別強制轉換、regex 抽取）
6. 資料品質 6 維度
7. Schema drift 偵測與處理
8. PII 遮蔽 / 假名化 / 匿名化

---

## Section 2：關鍵概念總覽圖（知識樹）

```
🗃️ L22201 數據收集與清理
│
├── 📥 數據收集方法（Data Collection）
│   ├── API 輪詢（API Polling）
│   ├── IoT 感測器串流（IoT Ingestion）
│   ├── CSV / JSON 批次匯入（Batch Import）
│   ├── 網路爬蟲概念（Web Scraping）
│   └── 陷阱：收集端格式不一 → Schema Drift 根源
│
├── 🧹 資料清理策略（Data Cleaning）
│   ├── 缺值處理（Missing Value）🔥🔥
│   │   ├── dropna(how='any'/'all', subset=, thresh=)
│   │   ├── fillna(value / dict / 統計量)
│   │   ├── df.ffill() / df.bfill()
│   │   └── 陷阱：fillna(method='ffill') 在 pandas 3.0 已移除 ❌
│   │
│   ├── 去重複（Deduplication）🔥🔥
│   │   ├── pandas: drop_duplicates(subset=, keep=)
│   │   ├── Spark 批次: dropDuplicates([col_list])
│   │   ├── Spark 串流: withWatermark().dropDuplicatesWithinWatermark()
│   │   └── 陷阱：串流無 watermark → 無界狀態爆記憶體 ❌
│   │
│   ├── 異常值處理（Outlier Removal）🔥
│   │   ├── IQR fence（四分位距截斷）
│   │   └── Z-score clipping（標準分數截斷）
│   │
│   ├── 型別強制轉換（Type Coercion）
│   │   └── astype() / cast() / to_datetime()
│   │
│   └── 正規表達式抽取（Regex Extraction）
│       └── re.findall / str.extract / str.split
│
├── 🔍 特徵提取（Field Extraction from Raw Text）
│   └── 注意：此處指從原始文字/日誌抽取結構欄位
│       NOT sklearn 特徵工程（L23301 範圍）
│
├── 📊 資料品質 6 維度（Data Quality Dimensions）🔥🔥
│   ├── Completeness（完整性）
│   ├── Accuracy（準確性）
│   ├── Consistency（一致性）
│   ├── Timeliness（及時性）
│   ├── Uniqueness（唯一性）
│   └── Validity（有效性）
│
├── ⚠️ Schema Drift 偵測與處理
│   ├── 原因：上游欄位新增/改名/刪除
│   ├── 偵測：Schema Registry / CDC / dbt tests
│   └── 30-40% 管線中斷來自 Schema Drift
│
├── 🔒 PII 遮蔽 / 假名化 / 匿名化
│   ├── Redaction（遮蔽）：直接刪除或遮蔽（Redaction）
│   ├── Pseudonymization（假名化）：可逆替換 🔥
│   └── Anonymization（匿名化）：不可逆 🔥
│
├── 🔄 ETL vs ELT / Lakehouse 架構 🔥🔥
│   ├── ETL：先清理再載入（法規合規、地端）
│   ├── ELT：先載入再清理（雲端原生）
│   └── Bronze（原始）→ Silver（清理）→ Gold（聚合）
│
└── 🌊 Late-Arriving Records & Watermark Policy 🔥
    ├── withWatermark("event_time", "2 hours")
    ├── dropDuplicatesWithinWatermark(["id"])
    └── 限制：僅支援 append / update 輸出模式
```

---

## Section 3：核心概念教學

> 📊 **架構總覽圖：** 資料從來源 → Bronze → Silver → Gold 的完整清理流程
> → 詳見 [diagrams/data-collection-cleaning-pipeline.mmd](diagrams/data-collection-cleaning-pipeline.mmd)

### 3-1 數據收集方法（Data Collection Methods）

**🗣️ 白話說明：** 想像你在幫 Uber Eats 後台收資料：用 API 定期拉外送員位置（輪詢）、IoT 感測器即時上傳廚房溫度、每天從 CSV 批次匯入門市訂單——這三種就是資料管線的三大入口。

```
資料收集管線示意
─────────────────────────────────────────────────
  📡 API Polling        ──┐
  🌡️ IoT Sensor Stream  ──┼──► 原始資料暫存區（Landing Zone）
  📂 CSV/JSON Batch     ──┤                │
  🕷️ Web Scraping       ──┘                ▼
                                    清理 / 轉換層
                                          │
                                          ▼
                                     資料倉儲 / 湖
─────────────────────────────────────────────────
```

| 收集方式 | 特性 | 典型場景 |
|---------|------|---------|
| API 輪詢（API Polling） | 定期拉取，有延遲 | 天氣、匯率、社群貼文 |
| IoT 串流（IoT Ingestion） | 即時、高頻率 | 感測器、智慧工廠 |
| 批次匯入（Batch Import） | 週期性、量大 | 月底報表、門市訂單 |
| 網路爬蟲（Web Scraping） | 非結構化、格式多變 | 電商價格、新聞文章 |
| Webhook（事件推送） | 事件發生時由來源系統主動推送 HTTP 請求，無需輪詢；與 API Polling（主動拉取）相對。 | GitHub 事件通知、金流回調（Callback） |

---

### 3-2 缺值處理（Missing Value Handling）🔥🔥

> 🌲 **決策樹：** 缺值比例 → 有無時間順序 → 分區 vs 全域補值流程圖
> → 詳見 [diagrams/missing-value-decision-tree.mmd](diagrams/missing-value-decision-tree.mmd)

**🗣️ 白話說明：** 就像大學分組報告的問卷，有人沒填某格——你要決定是直接刪掉那份（dropna），還是填 0 或平均值（fillna），或者時間序列就沿用前一筆（ffill）。

#### 策略一：dropna（刪除含缺值的列）

```python
# 刪除「任何欄位有缺值」的列
df.dropna(how='any')

# 刪除「所有欄位都是缺值」的列（較保守）
df.dropna(how='all')

# 只看特定欄位有沒有缺值
df.dropna(subset=['price', 'category'])

# 保留至少有 N 個非空值的列
df.dropna(thresh=3)
```

#### 策略二：fillna（填補缺值）

```python
# 填固定值
df['score'].fillna(0)

# 填統計量
df['age'].fillna(df['age'].mean())

# 多欄位分別填不同值（用字典）
df.fillna({'age': 0, 'city': '未知'})
```

#### 策略三：ffill / bfill（前向/後向填補） 🔥🔥

```python
# ✅ pandas 3.0 正確寫法
df.ffill()                  # 用前一筆填補（適合時間序列）
df.bfill()                  # 用後一筆填補

# ✅ 分群後填補（GroupBy）
df.groupby('station')['temp'].ffill()

# ❌ pandas 3.0 已移除，會報錯！
df.fillna(method='ffill')   # TypeError in pandas 3.0
```

> 🔥🔥 **考試必記：** pandas 3.0（2026年1月正式版）已完全移除 `fillna(method=)` 參數。正確用法是直接呼叫 `df.ffill()` / `df.bfill()`。

---

### 3-3 去重複（Deduplication）🔥🔥

> ⏱️ **時序圖：** Spark Streaming watermark + dropDuplicatesWithinWatermark 完整流程
> → 詳見 [diagrams/streaming-dedup-watermark.mmd](diagrams/streaming-dedup-watermark.mmd)

**🗣️ 白話說明：** 蝦皮後台同一筆訂單因為網路重傳被記錄了兩次——你需要去掉重複。批次資料用 pandas，串流資料用 Spark，方法不一樣。

#### pandas 批次去重

```python
# 全欄位去重，保留第一筆
df.drop_duplicates()

# 依特定欄位去重，保留最後一筆
df.drop_duplicates(subset=['order_id'], keep='last')

# keep=False：把所有重複都刪掉（一筆都不留）
df.drop_duplicates(subset=['order_id'], keep=False)
```

`keep` 參數選項：`'first'`（預設）、`'last'`、`False`（全刪）

#### Spark 批次去重

```python
# 依特定欄位去重
df.dropDuplicates(['order_id'])

# Delta Lake ACID upsert（先去重 source，再 MERGE）
# Step 1: 先對 source 去重
deduped_source = source_df.dropDuplicates(['order_id'])
# Step 2: MERGE INTO target
spark.sql("""
  MERGE INTO target t
  USING deduped_source s ON t.order_id = s.order_id
  WHEN MATCHED THEN UPDATE SET *
  WHEN NOT MATCHED THEN INSERT *
""")
```

#### Spark Structured Streaming 去重 🔥🔥

```python
# ✅ 正確：有 watermark，狀態有界
(stream_df
  .withWatermark("event_time", "2 hours")
  .dropDuplicatesWithinWatermark(["order_id"])
)

# ❌ 危險：無 watermark，狀態無界 → 記憶體爆炸
stream_df.dropDuplicates(["order_id"])
```

```
Watermark 運作示意
─────────────────────────────────────────────────
  事件時間軸  ──────────────────────────────────►
              [t-2h]    [Watermark]    [t=現在]
                 │           │
                 ▼           │
  watermark 以前的狀態        │  仍保留（等待遲到事件）
  可安全清除 ✓               │
─────────────────────────────────────────────────
```

> 🔥 **輸出模式限制：** Watermark + 聚合只支援 `append` 和 `update` 輸出模式，**不支援** `complete` 模式。

---

### 3-4 異常值處理（Outlier Detection & Removal）🔥

**🗣️ 白話說明：** 104 人力銀行薪資統計，有人填了 100 億月薪——這筆異常值會讓平均數完全失真。用 IQR 或 z-score 把它夾掉。

#### IQR fence（四分位距截斷法）

```python
Q1 = df['salary'].quantile(0.25)
Q3 = df['salary'].quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR   # 下限
upper = Q3 + 1.5 * IQR   # 上限

# 方法A：直接刪除異常值
df_clean = df[(df['salary'] >= lower) & (df['salary'] <= upper)]

# 方法B：Clip（截斷到邊界，不刪列）
df['salary'] = df['salary'].clip(lower=lower, upper=upper)
```

```
IQR fence 示意
 ──────────────────────────────────────────────
  異常值   下限(Q1-1.5*IQR)   Q1   中位數   Q3   上限(Q3+1.5*IQR)   異常值
    ●          |──────────────[==========]─────────────|           ●
  ❌刪除        ✓ 保留範圍                                           ❌刪除
 ──────────────────────────────────────────────
```

#### Z-score clipping（標準分數截斷）

```python
from scipy import stats
import numpy as np

z_scores = np.abs(stats.zscore(df['salary']))

# 方法A：刪除 |z| > 3 的列
df_clean = df[z_scores < 3]

# 方法B：Clip（把極端值夾到 ±3σ）
mean = df['salary'].mean()
std  = df['salary'].std()
df['salary'] = df['salary'].clip(lower=mean - 3*std, upper=mean + 3*std)
```

---

### 3-5 型別強制轉換（Type Coercion）

```python
# pandas
df['age'] = df['age'].astype(int)
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d', errors='coerce')
df['price'] = pd.to_numeric(df['price'], errors='coerce')

# PySpark
from pyspark.sql.functions import col
from pyspark.sql.types import IntegerType
df = df.withColumn("age", col("age").cast(IntegerType()))
```

`errors='coerce'`：無法轉換的值變成 NaN（而非報錯），是管線中常用的防禦寫法。

---

### 3-6 正規表達式抽取（Regex Extraction）與特徵提取

**🗣️ 白話說明：** 伺服器 log 長這樣：`"2026-01-15 ERROR user_id=U12345 msg=login_failed"` ——你要從這串文字抽出日期、user_id、錯誤類型，存成結構化欄位，這就是「特徵提取（Field Extraction）」。

```python
import re
import pandas as pd

log = "2026-01-15 ERROR user_id=U12345 msg=login_failed"

# 方法一：re.findall
user_id = re.findall(r'user_id=(\w+)', log)
# => ['U12345']

# 方法二：pandas str.extract（從整個 DataFrame 欄位抽取）
df['user_id'] = df['log'].str.extract(r'user_id=(\w+)')
df['date']    = df['log'].str.extract(r'(\d{4}-\d{2}-\d{2})')

# 方法三：JSON path 解析
import json
df['field'] = df['raw_json'].apply(lambda x: json.loads(x).get('field'))
```

> **注意邊界：** 此處「特徵提取」= 從原始文字/日誌**抽取結構化欄位**，屬於管線工程。NOT sklearn 的 `SelectKBest`、`FeatureUnion`、`StandardScaler`（那是 L23301 模型輸入工程範圍）。

---

### 3-7 資料品質 6 維度（Data Quality Dimensions）🔥🔥

> 🧠 **心智圖：** 6 維度定義、衡量指標一覽
> → 詳見 [diagrams/data-quality-6-dimensions.mmd](diagrams/data-quality-6-dimensions.mmd)

**🗣️ 白話說明：** 就像 LINE 通訊錄，你在乎：聯絡人有沒有填完整（完整性）、電話號碼是否正確（準確性）、同一個人在不同地方格式一致（一致性）、資料是否即時（及時性）、沒有重複聯絡人（唯一性）、格式是否合規（有效性）。

| 維度 | 中文 | 定義 | 違反範例 |
|------|------|------|---------|
| Completeness | 完整性 | 必填欄位無缺值 | `email` 欄有 30% 是 NULL |
| Accuracy | 準確性 | 值與現實相符 | 出生年份填成 `1899` |
| Consistency | 一致性 | 跨系統/欄位值一致 | A表性別 `M`，B表 `Male` |
| Timeliness | 及時性 | 資料在可用期限內 | 昨天的庫存資料今天才到 |
| Uniqueness | 唯一性 | 無重複記錄 | 同一訂單出現兩筆 |
| Validity | 有效性 | 值在合法範圍內 | `month=13`，信用卡格式錯誤 |

---

### 3-8 Schema Drift 偵測與處理

> 🔀 **流程圖：** 新批次到達 → Schema Registry 比對 → 4 種漂移類型處理策略
> → 詳見 [diagrams/schema-drift-handling.mmd](diagrams/schema-drift-handling.mmd)

Schema（綱要）是資料集的欄位名稱、資料型別與結構定義；Schema Drift（綱要漂移）指 schema 在未預期的情況下發生變化（例如欄位改名或新增欄位）。

**🗣️ 白話說明：** 上游工程師把 API 回傳的欄位 `userName` 改名成 `user_name`，下游管線完全不知道，整個管線爆掉。這就是 Schema Drift（綱要漂移），佔所有管線中斷的 30–40%。

```
Schema Drift 防禦流程
────────────────────────────────────────────────
  上游資料源 ──► Schema Registry / CDC
                        │
              偵測到 schema 變動
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
         自動更新          發出警報 + 停止管線
         Flexible Schema    人工介入
         Schema-on-Read
────────────────────────────────────────────────
```

| 策略 | 說明 | 適用場景 |
|------|------|---------|
| Schema Registry | 集中管理 schema 版本，自動比對 | Kafka + Confluent |
| CDC（變更資料捕獲） | 監控資料庫 schema log | 資料庫來源 |
| dbt tests | 每次執行前驗證欄位存在與型別 | ELT / Data Warehouse |
| Schema-on-Read | 讀取時才解析，不強制預定格式 | Data Lake / Parquet |
| Flexible Schema | 允許新增欄位不破壞現有邏輯 | Semi-structured JSON |

---

### 3-9 PII 遮蔽 / 假名化 / 匿名化

**🗣️ 白話說明：** 公司要分析客戶消費行為，但不能洩露個資。根據「要不要能還原回真實身分」，分成三種不同處理方式。

```
PII 處理強度示意（由強到弱）
────────────────────────────────────────────────
  原始 PII: 郭呈祥, 0912-345-678, douglas@mail.com
                  │
   ┌──────────────┼──────────────┐
   ▼              ▼              ▼
 遮蔽         假名化           匿名化
 郭**          UserID_A8x3    [移除/不可逆]
 0912-***-***  Token_7f2k     無法還原
   │              │              │
 無法還原     可逆（有金鑰）    完全不可逆
（不可逆）   （保留分析連結）   （GDPR合規）
────────────────────────────────────────────────
```

**管線工具參考：**
- Microsoft Presidio + PySpark：50+ 個內建 PII 識別器，可大規模平行處理
- Google Cloud DLP：偵測 → 遮蔽 → 驗證 → 釋出

---

### 3-10 ETL vs ELT / Bronze-Silver-Gold Lakehouse 🔥🔥

**🗣️ 白話說明：** ETL 像洗好菜再放冰箱（先清理），ELT 像先把菜直接放進去，要煮的時候再洗（先存原始，清理在雲端）。

```
ETL（傳統）流程
  資料源 ──► [E抽取] ──► [T轉換/清理] ──► [L載入倉儲]
                              ↑
                         清理在搬運前完成
                     （適合法規合規、頻寬受限）

ELT（雲端原生）流程
  資料源 ──► [E抽取] ──► [L載入] ──► [T轉換/清理]
                            ↑              ↑
                       先存原始          在倉儲內清理
                   Bronze Layer        Silver/Gold Layer
```

| 層次 | 別名 | 內容 | 清理狀態 |
|------|------|------|---------|
| Bronze | Raw / Landing | 原始資料，原封不動 | 未清理 |
| Silver | Cleaned / Curated | 去重、型別轉換、PII 遮蔽 | 已清理 |
| Gold | Aggregated / Serve | 商業指標、摘要表 | 已聚合 |

| 項目 | ETL | ELT |
|------|-----|-----|
| 清理時機 | 載入前 | 載入後 |
| 適合架構 | 地端、法規嚴格 | 雲端 Lakehouse |
| 彈性 | 較低（schema 先定義） | 較高（schema-on-read）|
| 代表工具 | Informatica, SSIS | dbt, Databricks |

---

### 3-11 Late-Arriving Records & Watermark Policy（遲到事件與水位線）🔥

**🗣️ 白話說明：** 手機離線時產生的 IoT 資料，連線後才傳到伺服器——這筆資料「事件時間」是 2 小時前，但「處理時間」是現在。Watermark 告訴 Spark：「最多等遲到 2 小時的資料，超過就放棄。」

```python
(stream_df
  .withWatermark("event_time", "2 hours")  # 最多容忍遲到 2 小時
  .groupBy(
    # window() 為時間窗口聚合函式（滾動窗口），此處示意與 watermark 搭配使用
    window("event_time", "10 minutes"),
    "device_id"
  )
  .count()
  .writeStream
  .outputMode("append")   # ✅ 只支援 append / update
  .start()
)
```

**Watermark 關鍵規則：**
- Watermark = max(event_time seen) − threshold
- 遲到超過 threshold 的事件**可能被丟棄**
- 僅支援 `append` 和 `update` 輸出模式，**不支援** `complete` 🔥

---

## Section 4：易混淆概念對照表

### 表 4-1：缺值處理三策略對比

| 方法 | 何時用 | pandas 3.0 寫法 | 注意事項 |
|------|--------|----------------|---------|
| `dropna()` | 缺值比例低，樣本夠多 | `df.dropna(how='any')` | `how='all'` 較保守 |
| `fillna()` | 用固定值或統計量填補 | `df['col'].fillna(mean)` | 全域補值可能引入偏差 |
| `ffill()` | 時間序列，沿用前值 | `df.ffill()` | ❌ 不可用 `fillna(method='ffill')` |
| `bfill()` | 時間序列，沿用後值 | `df.bfill()` | ❌ 不可用 `fillna(method='bfill')` |

### 表 4-2：匿名化 vs 假名化 vs 遮蔽

| 技術 | 英文 | 可逆性 | 保留分析連結？ | GDPR 地位 |
|------|------|--------|--------------|---------|
| 匿名化 | Anonymization | ❌ 不可逆 | 否 | 不受 GDPR 約束 |
| 假名化 | Pseudonymization | ✅ 有金鑰可逆 | 是（透過 Token） | 仍受 GDPR 約束 |
| 遮蔽 | Redaction / Masking | ❌ 不可逆 | 否（欄位消失）| 視實作而定 |

### 表 4-3：ETL vs ELT

| 維度 | ETL | ELT |
|------|-----|-----|
| 清理發生時機 | 載入**前** | 載入**後** |
| 原始資料保留 | 通常不保留 | Bronze 層保留原始 |
| 適合場景 | 法規合規、地端 | 雲端 Lakehouse |
| 成本考量 | 運算在 ETL 工具 | 運算在雲端倉儲（可彈性擴縮）|
| Schema 彈性 | 低（預定義 schema）| 高（schema-on-read）|

### 表 4-4：Spark dropDuplicates vs dropDuplicatesWithinWatermark

| 方法 | 適用場景 | 狀態大小 | 需要 withWatermark？ |
|------|---------|---------|-------------------|
| `dropDuplicates()` | 批次 DataFrame | 無界（串流用時爆記憶體）| 否（但串流必須加）|
| `dropDuplicatesWithinWatermark()` | 僅限 Structured Streaming | 有界（watermark 推進後清除）| 是 ✅ |

---

## Section 5：口訣與記憶法

### 5-1 資料品質 6 維度口訣

**「完準一時唯有效」**

```
完 → Completeness（完整性）
準 → Accuracy（準確性）
一 → Consistency（一致性）
時 → Timeliness（及時性）
唯 → Uniqueness（唯一性）
有效 → Validity（有效性）
```

記法：「我的資料**完準一時唯有效**」——像在說「完全準時，唯一有效」。

---

### 5-2 清理策略記憶法「刪補推挫正」

```
刪 → dropna（刪掉缺值列）
補 → fillna（補固定值/統計量）
推 → ffill / bfill（往前/後推填）
挫 → clip / IQR（截挫異常值）
正 → astype / regex（正規化格式）
```

（此口訣涵蓋缺值、異常值、型別轉換的操作步驟；去重複（§3-3）為獨立步驟，不含於口訣中，但同樣重要。）

---

### 5-3 ETL vs ELT 記憶法

```
ETL = 先洗再入庫（廚師洗菜再放冰箱）
ELT = 先入庫再洗（食材直接進冷藏，要煮時再處理）
```

或記：**E 之後字母順序決定**：
- ETL → T 在 L 前 → 轉換在載入前
- ELT → L 在 T 前 → 載入在轉換前

---

### 5-4 Watermark 輸出模式口訣

**「append 加 update 可以，complete 不行」**

記法：Watermark 管線不 complete（不完整）——因為它隨時可能丟棄遲到事件，無法保證輸出完整。

---

## Section 6：考試陷阱

❌ **陷阱 1：** 認為 `fillna(method='ffill')` 在新版 pandas 仍然可用
✅ **正解：** pandas 3.0（2026年1月）已完全移除 `fillna(method=)` 參數。程式碼 `df.fillna(method='ffill')` 會拋出 `TypeError`。正確寫法是 `df.ffill()`。考試出現 `fillna(method=)` 選項時，視為錯誤選項。

---

❌ **陷阱 2：** 在 Spark Structured Streaming 直接用 `dropDuplicates()` 不加 watermark
✅ **正解：** 串流資料中，`dropDuplicates()` 需要記憶所有見過的 ID；沒有 watermark 導致狀態無界成長，最終 OOM（記憶體溢出）。必須先 `withWatermark("event_time", "2 hours")` 再使用 `dropDuplicatesWithinWatermark(["id"])`。

---

❌ **陷阱 3：** 認為 Watermark 支援所有輸出模式
✅ **正解：** Watermark + 聚合操作僅支援 `append` 和 `update` 輸出模式。`complete` 模式要求輸出完整結果集，與 watermark 丟棄遲到事件的機制衝突，**不支援**。

---

❌ **陷阱 4：** 全域補值 vs 分區補值混淆（Global vs Partition-wise Imputation）
✅ **正解：** 用全體資料的平均補值（全域）會在不同子群體中引入偏差。例如男女生平均身高不同，若用全體平均補值，會讓男生資料偏低、女生偏高。應按 `groupby` 分組後再補值：`df.groupby('gender')['height'].transform(lambda x: x.fillna(x.mean()))`。

---

❌ **陷阱 5：** 認為假名化（Pseudonymization）和匿名化（Anonymization）都不可逆
✅ **正解：** 假名化**可逆**——用 Token 或加密金鑰替換，持有金鑰者可以還原。匿名化**不可逆**——無論持有什麼金鑰都無法還原身分。GDPR 下假名化資料仍是個人資料，匿名化後才脫離 GDPR 管轄。無鹽值雜湊是一種不足的遮蔽手段，存在彩虹表還原風險，不符合 GDPR 真正匿名化的標準。

---

❌ **陷阱 6：** 認為 L22201 的「特徵提取」是機器學習特徵工程
✅ **正解：** L22201 的「特徵提取」= 從原始文字/日誌中用 regex 或解析器**抽取結構化欄位**（如從 log 字串中取出 user_id、timestamp）。SMOTE、SelectKBest、StandardScaler、train/val/test split 屬於 L23301 模型輸入工程，本課不涵蓋。

---

❌ **陷阱 7：** 認為 Delta Lake MERGE INTO 可以直接合併含重複資料的 source
✅ **正解：** MERGE INTO 的 source 若含重複 key，會造成非確定性更新（同一 target 列被多筆 source 列匹配）。必須**先對 source 去重**（`source_df.dropDuplicates(['key'])`），再執行 MERGE。

---

## Section 7：情境題快速判斷

| 題目關鍵字 | 快速判斷 | 答案方向 |
|-----------|---------|---------|
| 「時間序列缺值」 | 前向填補最合適 | `df.ffill()` |
| 「大量缺值（>50%）」 | 刪除欄位或列比填補好 | `df.dropna()` 或刪欄 |
| 「串流去重 + 記憶體爆炸」 | 缺少 watermark | 加 `withWatermark()` |
| 「串流輸出模式錯誤」 | 用了 complete + watermark | 改 `append` 或 `update` |
| 「上游改了欄位名稱導致管線中斷」 | Schema Drift | Schema Registry / dbt tests |
| 「個資可以還原身分」 | 假名化（非匿名化） | Pseudonymization |
| 「個資完全無法還原」 | 匿名化 | Anonymization |
| 「GDPR 合規，資料仍可連結分析」 | 假名化 + Token | Pseudonymization |
| 「先存原始再清理，雲端架構」 | ELT / Lakehouse | Bronze→Silver→Gold |
| 「法規要求清理後才能存儲」 | ETL | 先轉換再載入 |
| 「薪資有人填 1 億，影響平均」 | 異常值 | IQR fence 或 z-score clip |
| 「drop_duplicates 保留最後一筆」 | keep 參數 | `keep='last'` |
| 「drop_duplicates 全部重複都刪」 | keep=False | `keep=False` |
| 「資料品質：值不在合法範圍」 | Validity（有效性）| 6 維度第 6 項 |
| 「資料品質：A/B 系統值不一致」 | Consistency（一致性）| 6 維度第 3 項 |
| 「從 log 字串抽取 user_id」 | Regex 特徵提取 | `str.extract(r'user_id=(\w+)')` |
| 「pandas 3.0 fillna 方法移除」 | API 版本陷阱 | 改用 `df.ffill()` |

---

## Section 8：快速自我檢查 ✅

完成本課後，你應該能在 30 秒內回答以下問題：

- [ ] **缺值處理：** 說出 `dropna(how='any')` vs `how='all'` 的差異，以及 pandas 3.0 正確的 ffill 寫法
- [ ] **去重複：** 說明 `drop_duplicates(keep=False)` 的行為，以及 Spark 串流去重為何需要 watermark
- [ ] **異常值：** 寫出 IQR fence 的下限公式（Q1 - 1.5 × IQR）並解釋 clip 與 drop 的差異
- [ ] **特徵提取：** 用一句話說明 L22201 的「特徵提取」指的是什麼（不是 ML 特徵工程）
- [ ] **資料品質 6 維度：** 背出「完準一時唯有效」並對應英文名稱
- [ ] **Schema Drift：** 說明 30-40% 管線中斷的根因，以及至少兩種偵測策略
- [ ] **PII：** 區分假名化（可逆）vs 匿名化（不可逆），說明 GDPR 下的差異
- [ ] **ETL vs ELT：** 說出 Bronze / Silver / Gold 各層的資料狀態，以及各自適用場景
- [ ] **Watermark 輸出模式：** 立刻回答 Watermark 支援哪兩種輸出模式（append、update），哪種不支援（complete）
- [ ] **Delta Lake MERGE：** 說明為什麼 source 在 MERGE 前必須先去重

---

📌 **本課範圍外（Out of Scope — 屬於 L23301）：**

以下內容不在 L22201 範圍內，考題出現這些詞彙代表考的是 L23301：

- SMOTE（類別不平衡過採樣）
- StandardScaler / MinMaxScaler（模型輸入特徵縮放）
- SelectKBest / FeatureUnion（sklearn 特徵選擇）
- Train / Validation / Test split 劃分策略
- sklearn Pipeline（機器學習管線）

---

*本指南對應 IPAS AI應用規劃師能力鑑定（中級）115年度版本，技術版本基準：pandas 3.0.2、PySpark 4.1.1、Delta Lake 3.x。*
