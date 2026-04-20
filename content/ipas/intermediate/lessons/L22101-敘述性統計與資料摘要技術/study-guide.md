# L22101 敘述性統計與資料摘要技術 — 學習指南

## Section 1: Exam Item Mapping
> 對應評鑑範圍：**L22101 敘述性統計與資料摘要技術** (大數據處理分析與應用 → 機率統計基礎)

這一課是 iPAS AI 應用規劃師中級「資料分析組」的統計基礎題。
考法不是推導長證明，而是：
- 給你 5 到 8 筆數字，叫你算平均數、標準差、IQR。
- 給你 `pandas.describe()` 表格，叫你判斷哪個敘述正確。
- 給你 `NumPy` / `pandas` / `SciPy` 程式片段，問輸出或問哪個函式用法正確。

你要會的核心能力：
1. 看到小資料集，能快速排序、定位中位數、Q1、Q3。
2. 分清楚母體（population）和樣本（sample）的變異數、標準差公式。
3. 看到偏度、峰度、盒鬚圖（boxplot）時，能正確解讀方向與意義。
4. 看到缺失值、離群值、重複值情境，知道對應 API 與判斷原則。
5. 看到 `describe()` / `value_counts()` / `nunique()` / `dtypes` / `info()`，能直接判讀。

邊界也要很清楚：
- 本課不展開機率分配（probability distribution）、機率質量函數（PMF）、累積分配函數（CDF）。
- 本課不展開假說檢定（hypothesis testing）、`p-value`、虛無假設（H0）、對立假設（H1）。
- 本課不展開模型特徵工程（feature engineering）與建模選型。

---

## Section 2: 關鍵概念總覽圖 (Knowledge Tree)
```text
📖 L22101 敘述性統計與資料摘要技術
│
├── 🎯 考試定位
│   ├── 小型資料集直接計算
│   ├── Python / pandas / NumPy / SciPy 輸出判讀
│   └── ⚠️ 陷阱：考的是公式應用，不是推導證明
│
├── 📊 數據集中趨勢（Measures of Central Tendency）🔥🔥
│   ├── 算術平均數（Mean）
│   │   ├── 公式：μ = Σxᵢ / N
│   │   └── ⚠️ 易受離群值影響
│   ├── 中位數（Median）
│   │   ├── 先排序再找中間
│   │   ├── 奇數筆：正中間
│   │   └── 偶數筆：中間兩個平均
│   ├── 眾數（Mode）
│   │   ├── 最常出現的值
│   │   ├── 可多個眾數
│   │   └── ⚠️ 也可能沒有明確眾數
│   └── 使用時機
│       ├── 有離群值 → Median
│       ├── 比率尺度 / 一般平均表現 → Mean
│       └── 類別資料 / 最常見選項 → Mode
│
├── 📏 離散程度（Measures of Dispersion）🔥🔥
│   ├── 全距（Range）
│   │   ├── max - min
│   │   └── ⚠️ 簡單但很怕極端值
│   ├── 變異數（Variance）
│   │   ├── 母體變異數（Population Variance, σ²）→ 分母 N
│   │   ├── 樣本變異數（Sample Variance, s²）→ 分母 N-1
│   │   └── ⚠️ `ddof=0` vs `ddof=1`
│   ├── 標準差（Standard Deviation, SD）🔥🔥
│   │   ├── 母體標準差（Population SD, σ）
│   │   ├── 樣本標準差（Sample SD, s）
│   │   └── 與原資料同單位
│   ├── 四分位距（Interquartile Range, IQR）🔥🔥
│   │   ├── IQR = Q3 - Q1
│   │   ├── IQR fence 下界：Q1 - 1.5×IQR
│   │   ├── IQR fence 上界：Q3 + 1.5×IQR
│   │   └── ⚠️ 盒鬚圖鬚端不是直接畫到 fence 數值
│   └── 變異係數（Coefficient of Variation, CV）
│       ├── CV = σ / μ × 100%
│       └── 適合比較不同單位或不同尺度資料
│
├── 📈 分佈型態（Distribution Shape）🔥
│   ├── 偏度（Skewness）
│   │   ├── 正偏 / 右偏（Positive Skew）
│   │   │   ├── 右尾長
│   │   │   └── mean > median > mode
│   │   ├── 負偏 / 左偏（Negative Skew）
│   │   │   ├── 左尾長
│   │   │   └── mean < median < mode
│   │   └── 對稱（Symmetric）
│   │       └── mean ≈ median ≈ mode
│   ├── 峰度（Kurtosis）
│   │   ├── Fisher 過峰度（Excess Kurtosis）
│   │   │   ├── > 0 尖峰（Leptokurtic）
│   │   │   ├── = 0 常峰（Mesokurtic）
│   │   │   └── < 0 平峰（Platykurtic）
│   │   ├── Pearson 峰度（Pearson Kurtosis）
│   │   │   └── 常態分布 = 3
│   │   └── ⚠️ `scipy.stats.kurtosis()` 預設是 Fisher
│   └── Q-Q 圖（Quantile-Quantile Plot, Q-Q Plot）
│       ├── 點貼近對角線 → 接近目標分布
│       └── 系統性彎曲 → 非常態 / 偏態 / 尾部異常
│
├── 🔧 數據清理（Data Cleaning）🔥🔥
│   ├── 缺失值（Missing Values）
│   │   ├── `dropna()`
│   │   ├── `fillna(mean)`
│   │   ├── `fillna(median)`
│   │   └── `fillna(mode)`
│   ├── 離群值偵測（Outlier Detection）
│   │   ├── IQR 方法（IQR Method）🔥🔥
│   │   └── Z 分數（Z-score）→ |z| > 3
│   └── 去重複（Deduplication）
│       └── `drop_duplicates()`
│
├── 🧾 數據剖析（Data Profiling）🔥🔥
│   ├── `pandas.describe()`
│   │   ├── count
│   │   ├── mean
│   │   ├── std → 預設 ddof=1
│   │   ├── min
│   │   ├── 25%
│   │   ├── 50%
│   │   ├── 75%
│   │   └── max
│   ├── `value_counts()`
│   ├── `nunique()`
│   ├── `df.dtypes`
│   ├── `df.info()`
│   ├── `scipy.stats.skew()`
│   └── `scipy.stats.kurtosis()`
│
└── 🚨 高頻陷阱
    ├── `ddof=0` 是母體，`ddof=1` 是樣本
    ├── `describe().std` 預設是樣本標準差
    ├── IQR = Q3 - Q1，不是 Q3 - Q2
    ├── 正偏 = 右尾長 = 平均數最大
    ├── 眾數可能多個，也可能沒有
    ├── `kurtosis()` 預設 normal = 0，不是 3
    └── boxplot 鬚端延伸到 fence 內最後一筆資料
```

---

## Section 3: Core Concepts

### 3.1 先抓主軸：本課在考什麼
`敘述性統計（Descriptive Statistics）` 是用數字、表格、圖形，把一組資料的「中心在哪裡、分散多大、形狀如何、資料有沒有髒掉」快速摘要出來。

🗣️ 白話說明：像你看 104 人力銀行一批薪資資料，不可能一筆一筆慢慢講，你會想先知道平均薪資、中位數薪資、差距大不大、是不是被幾個超高薪職缺拉高。這就是敘述性統計在做的事。

中級考法通常長這樣：
- 給定陣列，算平均數（mean）、中位數（median）、標準差（standard deviation）。
- 已知 `Q1`、`Q3`，判斷離群值（outlier）。
- 看 `pandas.describe()` 輸出，找出 `50%` 代表什麼。
- 看 `SciPy` 程式，判斷偏度（skewness）和峰度（kurtosis）定義。

🔥🔥 先記一句：
本課是「公式應用 + 輸出判讀」，不是「統計推論」。

### 3.2 數據集中趨勢（Measures of Central Tendency）
`數據集中趨勢（Measures of Central Tendency）` 是描述資料大致集中在哪裡的指標。
最常考三個：
- 算術平均數（Mean）
- 中位數（Median）
- 眾數（Mode）

#### 3.2.1 算術平均數（Mean）🔥🔥
`算術平均數（Mean）` 是把所有數值加總，再除以資料筆數。

公式：
```text
母體平均數（Population Mean）:
μ = Σxᵢ / N

樣本平均數（Sample Mean）:
x̄ = Σxᵢ / n
```

其中：
- `Σxᵢ` 是全部數值總和
- `N` 是母體總數
- `n` 是樣本筆數

🗣️ 白話說明：像部門 5 個人點 Uber Eats，大家平均花多少錢，就是總金額除以人數。

例題：
資料為 `[2, 4, 4, 4, 5, 5, 7, 9]`

步驟 1：先加總
```text
2 + 4 + 4 + 4 + 5 + 5 + 7 + 9 = 40
```

步驟 2：除以筆數 `8`
```text
μ = 40 / 8 = 5
```

所以平均數是 `5`。

特性：
- 會用到每一筆資料。
- 對離群值（outlier）很敏感。

例子：
`[50, 52, 53, 55, 300]`

```text
mean = (50 + 52 + 53 + 55 + 300) / 5 = 510 / 5 = 102
```

這個 `102` 明顯不代表大多數人的典型水準，因為被 `300` 拉高。

🗣️ 白話說明：像台北租屋如果大多是 1.8 萬到 2.2 萬，但混進一間月租 12 萬豪宅，平均房租會被拉爆，根本不適合拿來描述一般上班族租屋行情。

使用時機：
- 資料是數值型。
- 沒有明顯極端值。
- 想表達整體平均表現。

#### 3.2.2 中位數（Median）🔥🔥
`中位數（Median）` 是把資料由小到大排序後，位在正中間的數值。

規則：
- 若資料筆數是奇數，直接取中間那一筆。
- 若資料筆數是偶數，取中間兩筆的平均。

公式概念：
```text
先排序
奇數筆 → 第 (n+1)/2 個值
偶數筆 → 第 n/2 與第 (n/2 + 1) 個值的平均
```

🗣️ 白話說明：中位數像 LINE 群組投票時，把大家從最早回覆排到最晚回覆，站在中間那個人就是「典型位置」。它不管兩端有多極端，只看中間。

例題 1：奇數筆
資料 `[3, 8, 9, 15, 20]`

已排序，總共有 5 筆。
中間位置：
```text
(5 + 1) / 2 = 3
```

第 3 筆是 `9`，所以中位數是 `9`。

例題 2：偶數筆
資料 `[2, 4, 4, 4, 5, 5, 7, 9]`

共有 8 筆，中間兩個位置是第 4 和第 5 筆：
```text
第 4 筆 = 4
第 5 筆 = 5
median = (4 + 5) / 2 = 4.5
```

所以中位數是 `4.5`。

特性：
- 對離群值較穩健（robust）。
- 適合偏態資料或有極端值情境。

例子：
`[50, 52, 53, 55, 300]`

排序後中間值是 `53`，所以中位數是 `53`。
這比平均數 `102` 更能代表多數人的實際情況。

🗣️ 白話說明：像看新鮮人薪資，少數年薪百萬的人不該決定整體印象。這時候中位數比平均數可靠。

使用時機：
- 有離群值。
- 分布偏斜（skewed）。
- 想看典型中間位置。

#### 3.2.3 眾數（Mode）🔥
`眾數（Mode）` 是出現次數最多的值。

🗣️ 白話說明：像 7-11 飲料銷售，如果「無糖綠茶」賣最多，那它就是最常見選擇，也就是眾數。

例題 1：單一眾數
資料 `[1, 2, 2, 3, 4]`

出現次數：
```text
1 → 1 次
2 → 2 次
3 → 1 次
4 → 1 次
```

眾數是 `2`。

例題 2：雙眾數（bimodal）
資料 `[1, 1, 2, 2, 3]`

`1` 和 `2` 都出現 2 次，所以有兩個眾數。

例題 3：沒有明確眾數
資料 `[1, 2, 3, 4, 5]`

每個值都只出現 1 次，因此沒有明確眾數。

🔥 必記：
- 眾數可以有多個。
- 也可能沒有明確眾數。

使用時機：
- 類別資料（categorical data）很常用。
- 想知道最常見選項。

#### 3.2.4 什麼時候選 Mean / Median / Mode
快速原則：
- 有離群值 → 優先用中位數（median）
- 純數值、分布大致平均 → 用平均數（mean）
- 類別資料或最常見值 → 用眾數（mode）

ASCII 比較：
```text
資料: [50, 52, 53, 55, 300]

mean   = 102   ← 被 300 拉高
median = 53    ← 比較像大多數情況
mode   = 無    ← 沒有重複值
```

🗣️ 白話說明：如果是在看 Instagram 貼文按讚數，某一篇爆紅 10 萬讚會把平均值拉很高。要描述大多數貼文表現，中位數更合理。

### 3.3 離散程度（Measures of Dispersion）
`離散程度（Measures of Dispersion）` 是描述資料彼此差多遠、散得多開的指標。
常考五個：
- 全距（Range）
- 變異數（Variance）
- 標準差（Standard Deviation, SD）
- 四分位距（Interquartile Range, IQR）
- 變異係數（Coefficient of Variation, CV）

#### 3.3.1 全距（Range）
`全距（Range）` 是最大值減最小值。

公式：
```text
Range = max - min
```

例題：
資料 `[2, 4, 4, 4, 5, 5, 7, 9]`

```text
max = 9
min = 2
range = 9 - 2 = 7
```

所以全距是 `7`。

🗣️ 白話說明：像一群同事午餐花費最便宜 60 元、最貴 180 元，那價格跨度就是 120 元。

缺點：
- 只看兩端。
- 極端值一來，馬上失真。

#### 3.3.2 變異數（Variance）🔥🔥
`變異數（Variance）` 是用來衡量資料偏離平均數的平方距離平均。

為什麼要平方？
- 避免正負偏差互相抵消。
- 讓離平均更遠的點被更明顯放大。

公式：
```text
母體變異數（Population Variance）:
σ² = Σ(xᵢ - μ)² / N

樣本變異數（Sample Variance）:
s² = Σ(xᵢ - x̄)² / (n - 1)
```

🔥🔥 必考差異：
- 母體變異數分母是 `N`
- 樣本變異數分母是 `n - 1`

🗣️ 白話說明：像看團隊交件天數，每個人和平均交件天數差多少。如果大家都差不多，變異數小；有人超快有人超慢，變異數就大。

例題：
資料 `[2, 4, 4, 4, 5, 5, 7, 9]`

先求平均數：
```text
μ = 5
```

接著算每筆與平均數差，再平方：
```text
(2 - 5)² = 9
(4 - 5)² = 1
(4 - 5)² = 1
(4 - 5)² = 1
(5 - 5)² = 0
(5 - 5)² = 0
(7 - 5)² = 4
(9 - 5)² = 16
```

平方和：
```text
9 + 1 + 1 + 1 + 0 + 0 + 4 + 16 = 32
```

母體變異數：
```text
σ² = 32 / 8 = 4
```

樣本變異數：
```text
s² = 32 / 7 ≈ 4.5714
```

所以：
- 母體變異數 = `4`
- 樣本變異數 ≈ `4.5714`

#### 3.3.3 標準差（Standard Deviation, SD）🔥🔥
`標準差（Standard Deviation, SD）` 是變異數開根號後的結果。
它的單位和原資料相同，所以通常比變異數更直覺。

公式：
```text
母體標準差（Population SD）:
σ = √σ²

樣本標準差（Sample SD）:
s = √s²
```

沿用上一題：
```text
σ² = 4      → σ = √4 = 2
s² = 4.5714 → s = √4.5714 ≈ 2.138
```

所以：
- 母體標準差 = `2`
- 樣本標準差 ≈ `2.138`

🗣️ 白話說明：如果平均薪資是 4 萬，標準差 3 千，代表大家多半離平均不算太遠；如果標準差 2 萬，代表薪資高低差很多。

🔥🔥 API 高頻考點：
`NumPy` 預設 `ddof=0`，也就是母體標準差語意。

偽程式碼：
```python
import numpy as np

x = np.array([2, 4, 4, 4, 5, 5, 7, 9])

pop_std = np.std(x, ddof=0)   # 母體標準差，分母 N
sample_std = np.std(x, ddof=1)  # 樣本標準差，分母 N-1

print(pop_std)      # 2.0
print(sample_std)   # 約 2.138
```

對照：
```text
ddof = 0 → denominator = N
ddof = 1 → denominator = N - 1
```

🔥🔥 `pandas.describe()` 的 `std` 預設是樣本標準差，也就是 `ddof=1`。

#### 3.3.4 四分位距（Interquartile Range, IQR）🔥🔥
`四分位距（Interquartile Range, IQR）` 是第三四分位數（Q3）減第一四分位數（Q1）。
它描述中間 50% 資料的分散程度。

公式：
```text
IQR = Q3 - Q1
```

🔥 必記：
IQR 不是 `Q3 - Q2`。
其中 `Q2` 是中位數（median）。

🗣️ 白話說明：如果把全班考試分數由低到高排好，Q1 到 Q3 之間就是中間大多數人的範圍。IQR 就是在看「中間這群人差距多大」。

例題：
資料 `[1, 2, 3, 4, 5, 6, 7, 20]`

已排序，共 8 筆。

整體中位數：
```text
median = (4 + 5) / 2 = 4.5
```

下半部：
```text
[1, 2, 3, 4]
Q1 = (2 + 3) / 2 = 2.5
```

上半部：
```text
[5, 6, 7, 20]
Q3 = (6 + 7) / 2 = 6.5
```

所以：
```text
IQR = 6.5 - 2.5 = 4
```

#### 3.3.5 IQR fence 與離群值（Outlier）判斷🔥🔥
`IQR fence` 是用四分位距建立離群值的判斷邊界。

公式：
```text
Lower Fence = Q1 - 1.5 × IQR
Upper Fence = Q3 + 1.5 × IQR
```

沿用上一題：
```text
Q1 = 2.5
Q3 = 6.5
IQR = 4
```

下界：
```text
Lower Fence = 2.5 - 1.5 × 4 = 2.5 - 6 = -3.5
```

上界：
```text
Upper Fence = 6.5 + 1.5 × 4 = 6.5 + 6 = 12.5
```

判斷：
- 小於 `-3.5` 的值是離群值
- 大於 `12.5` 的值是離群值

資料中 `20 > 12.5`，所以 `20` 是離群值。

🗣️ 白話說明：像公司加班時數大多落在 0 到 10 小時，但有一筆 45 小時，IQR 方法就會把它抓出來，提醒你這筆可能很特殊。

#### 3.3.6 盒鬚圖（Boxplot）結構與鬚端計算🔥🔥
`盒鬚圖（Boxplot，又稱箱型圖）` 會把 Q1、Q2、Q3、鬚端（whiskers）、離群值一起畫出來。

ASCII 結構：
```text
最小非離群值      Q1        median(Q2)       Q3      最大非離群值
     |------------[===========|===========]------------|
                      box              box

離群值若超出 fence，會另外畫成點
```

更完整版本：
```text
outlier        lower whisker      box               upper whisker      outlier
   *                 |        [----|----|----]            |               *
                     |         Q1   Q2   Q3               |
              最後一個在下界內資料點                 最後一個在上界內資料點
```

🔥🔥 超高頻陷阱：
盒鬚圖的鬚端不是直接畫到 `Q1 - 1.5×IQR` 或 `Q3 + 1.5×IQR`。
鬚端是延伸到「仍在 fence 內的最後一筆資料」。

例題：
資料 `[1, 2, 3, 4, 5, 6, 7, 20]`

我們已知：
```text
Lower Fence = -3.5
Upper Fence = 12.5
```

所以：
- `1` 到 `7` 都在 fence 內
- `20` 在 fence 外

盒鬚圖鬚端：
- 下鬚端會到 `1`
- 上鬚端會到 `7`
- `20` 會被單獨畫成離群點

不是：
- 下鬚端畫到 `-3.5`
- 上鬚端畫到 `12.5`

🗣️ 白話說明：fence 像捷運閘門邊界，但真正站在線內最後面的人，才是鬚端位置，不是直接站到閘門本身。

#### 3.3.7 變異係數（Coefficient of Variation, CV）
`變異係數（Coefficient of Variation, CV）` 是標準差除以平均數，再乘上 100%。
它常用來比較不同單位或不同量級資料的相對離散程度。

公式：
```text
CV = (σ / μ) × 100%
```

注意：
- 這裡常以母體標準差 `σ`、平均數 `μ` 表示。
- 若題目明確說是樣本，也可用 `s / x̄`。

例題：
資料 A 平均數 `50`，標準差 `5`
```text
CV_A = (5 / 50) × 100% = 10%
```

資料 B 平均數 `200`，標準差 `40`
```text
CV_B = (40 / 200) × 100% = 20%
```

雖然資料 B 的標準差較大，但更重要的是它相對平均的波動也更大，因此 CV 較高。

🗣️ 白話說明：像比較兩家店外送時間，一家平均 20 分鐘、標準差 2 分鐘，另一家平均 60 分鐘、標準差 4 分鐘。不能只看標準差絕對值，因為基準不同，CV 才能看相對穩定度。

### 3.4 分佈型態（Distribution Shape）
`分佈型態（Distribution Shape）` 是在看資料分布是對稱、偏左、偏右，還是尖峰、平峰。

#### 3.4.1 偏度（Skewness）🔥🔥
`偏度（Skewness）` 是描述分布不對稱程度的指標。

三種基本情況：
- 正偏 / 右偏（Positive Skew）
- 負偏 / 左偏（Negative Skew）
- 對稱（Symmetric）

ASCII 圖：
```text
負偏（Negative Skew）        對稱（Symmetric）         正偏（Positive Skew）
左尾長                        左右差不多                 右尾長

███████▆▅▄▃▂                  ▂▄▆████▆▄▂                 ▂▃▄▅▆███████
<----- tail                                               tail ----->
```

位置關係：
```text
正偏（右偏）: mean > median > mode
正偏（右偏）: 通常 mean > median > mode
負偏（左偏）: 通常 mean < median < mode
對稱分布    : mean ≈ median ≈ mode
```

🔥🔥 必記：
正偏 = 右尾長 = 平均數最大。

🗣️ 白話說明：像 YouTube 影片觀看數，大多數普通影片不高，但少數爆款影片超高，右邊就拖出一條長尾，這就是正偏。

例子：
資料 `[2, 2, 3, 3, 4, 5, 20]`

大多數數值集中在小範圍，但有一個大值 `20` 拉出右尾。
因此這組資料傾向正偏。

Python：
```python
from scipy import stats

x = [2, 2, 3, 3, 4, 5, 20]
sk = stats.skew(x)
print(sk)   # 正值，表示右偏
```

如果：
- `skewness > 0` → 正偏
- `skewness < 0` → 負偏
- `skewness ≈ 0` → 接近對稱

#### 3.4.2 峰度（Kurtosis）🔥
`峰度（Kurtosis）` 是描述分布尾部厚重程度與峰形特徵的指標。

本課最重要不是推公式，而是分清楚：
- Fisher 過峰度（Excess Kurtosis）
- Pearson 峰度（Pearson Kurtosis）

`SciPy` 預設：
```python
from scipy import stats

x = [2, 4, 4, 4, 5, 5, 7, 9]
stats.kurtosis(x)                 # fisher=True 預設
stats.kurtosis(x, fisher=False)   # Pearson 定義
```

🔥🔥 高頻規則：
- `fisher=True` 時，常態分布（normal distribution）峰度 = `0`
- `fisher=False` 時，常態分布峰度 = `3`

Fisher 過峰度分類：
```text
> 0  → 尖峰（Leptokurtic）
= 0  → 常峰（Mesokurtic）
< 0  → 平峰（Platykurtic）
```

🗣️ 白話說明：把班上考試分數畫出來，如果大多數人都擠在中間、少數極端值很多，尾巴會比較重，看起來比較尖。這就是峰度在描述的感覺。

ASCII 概念圖：
```text
平峰（<0）        常峰（=0）       尖峰（>0）
                                    ^
  ____            /\              / | \
 /    \          /  \            /  |  \
/      \        /    \          /   |   \
（寬扁尾薄）   （標準常態）    （窄高尾厚）
```

#### 3.4.3 Q-Q 圖（Quantile-Quantile Plot, Q-Q Plot）
`Q-Q 圖（Quantile-Quantile Plot, Q-Q Plot）` 是把樣本分位數和理論分位數做比較的圖。

判讀原則：
- 點大致貼近對角線 → 樣本分布接近理論分布
- 出現系統性彎曲 → 樣本與理論分布不同

ASCII 示意：
```text
接近常態
y
^
|        *
|      *
|    *
|  *
|*
+---------------> x

明顯偏離
y
^
|        *
|      *
|   *
| *
|*
+---------------> x
```

更精準的理解：
- 上尾往上翹，可能表示右尾較重。
- 下尾往下彎，可能表示左尾較重。

🗣️ 白話說明：像把你們部門的薪資排序，拿去和「理想常態分布」比。如果大家真的差不多，就會貼近斜線；如果少數高薪很多，就會在尾端明顯偏掉。

### 3.5 數據清理（Data Cleaning）
`數據清理（Data Cleaning）` 是讓資料更乾淨、可分析的步驟。
本課重點有三個：
- 缺失值（missing values）
- 離群值（outliers）
- 重複值（duplicates）

#### 3.5.1 缺失值（Missing Values）🔥
缺失值常見處理：
- 刪除：`dropna()`
- 補值：`fillna()`

範例資料：
```python
import pandas as pd

df = pd.DataFrame({
    "score": [80, 85, None, 90, 88]
})
```

刪除缺失值：
```python
df2 = df.dropna()
```

補平均數：
```python
df["score"] = df["score"].fillna(df["score"].mean())
```

補中位數：
```python
df["score"] = df["score"].fillna(df["score"].median())
```

補眾數：
```python
df["score"] = df["score"].fillna(df["score"].mode()[0])
```

選擇原則：
- 缺失很少、刪了不痛 → `dropna()`
- 數值資料且分布對稱 → 可考慮平均數補值
- 有離群值或偏態 → 中位數補值更穩
- 類別資料 → 眾數補值常見

🗣️ 白話說明：像表單調查少數人沒填年齡，可以刪；但如果很多人沒填，直接刪掉就像把一大票人從群組踢掉，資料代表性可能壞掉。

#### 3.5.2 IQR 法偵測離群值（IQR Method）🔥🔥
步驟：
1. 排序資料
2. 求 `Q1`、`Q3`
3. 計算 `IQR = Q3 - Q1`
4. 求 fence
5. 判斷哪些值在 fence 外

完整範例：
資料 `[5, 6, 7, 8, 9, 10, 11, 30]`

已排序。

中位數：
```text
(8 + 9) / 2 = 8.5
```

下半部 `[5, 6, 7, 8]`
```text
Q1 = (6 + 7) / 2 = 6.5
```

上半部 `[9, 10, 11, 30]`
```text
Q3 = (10 + 11) / 2 = 10.5
```

IQR：
```text
IQR = 10.5 - 6.5 = 4
```

Fence：
```text
Lower = 6.5 - 1.5×4 = 0.5
Upper = 10.5 + 1.5×4 = 16.5
```

判斷：
- `30 > 16.5`，所以 `30` 是離群值

#### 3.5.3 Z 分數（Z-score）偵測離群值
`Z 分數（Z-score）` 是某個值距離平均數多少個標準差。

公式：
```text
z = (x - μ) / σ
```

常見規則：
```text
|z| > 3 → 可視為離群值
```

例題：
假設平均數 `μ = 50`，標準差 `σ = 5`，某筆資料 `x = 68`

```text
z = (68 - 50) / 5 = 18 / 5 = 3.6
```

因為 `|3.6| > 3`，可視為離群值。

🗣️ 白話說明：像公司月加班時數平均 10 小時，標準差 3 小時，如果有人加班 22 小時，他就比平均高出 4 個標準差左右，很可能是離群值（outlier）案例。

#### 3.5.4 去重複（Deduplication）
`去重複（Deduplication）` 是避免同一筆資料被重複計算。

Python：
```python
df = df.drop_duplicates()
```

🗣️ 白話說明：像蝦皮訂單匯入兩次，如果不去重複，銷售額和訂單數都會被灌水。

### 3.6 數據剖析（Data Profiling）🔥🔥
`數據剖析（Data Profiling）` 是快速檢查資料內容、型別、缺值、分布概況的步驟。

#### 3.6.1 `pandas.describe()` 輸出 anatomy 🔥🔥
對數值欄位來說，`pandas.describe()` 預設會輸出：
```text
count, mean, std, min, 25%, 50%, 75%, max
```

範例：
```python
import pandas as pd

s = pd.Series([2, 4, 4, 4, 5, 5, 7, 9])
print(s.describe())
```

可能看到：
```text
count    8.000000
mean     5.000000
std      2.138090
min      2.000000
25%      4.000000
50%      4.500000
75%      5.500000
max      9.000000
dtype: float64
```

每一列代表什麼：
- `count`：非缺失值筆數
- `mean`：平均數
- `std`：標準差，預設是樣本標準差，`ddof=1`
- `min`：最小值
- `25%`：第一四分位數 `Q1`
- `50%`：中位數 `Q2`
- `75%`：第三四分位數 `Q3`
- `max`：最大值

🔥🔥 必記：
`describe().std` 不是母體標準差，而是樣本標準差。

🗣️ 白話說明：這像你開會前先看一張超濃縮報表，一眼就知道有幾筆資料、平均多少、中間值多少、上下四分位在哪裡，效率很高。

`describe()` 可直接推 IQR：
```text
IQR = 75% - 25%
```

以上例來看：
```text
IQR = 5.5 - 4.0 = 1.5
```

#### 3.6.2 `value_counts()`
`value_counts()` 會統計每個唯一值出現的次數。

例子：
```python
s = pd.Series(["A", "B", "A", "C", "A", "B"])
print(s.value_counts())
```

輸出概念：
```text
A    3
B    2
C    1
```

用途：
- 找最常見類別
- 看類別分布是否失衡
- 輔助判斷眾數

#### 3.6.3 `nunique()`
`nunique()` 會計算唯一值個數，也就是基數（cardinality）。

例子：
```python
s = pd.Series(["A", "B", "A", "C"])
print(s.nunique())   # 3
```

用途：
- 看欄位不同值有多少種
- 檢查 ID 欄位是否接近唯一

注意：
- 預設 `dropna=True`
- 也就是 `NaN` 不會算進去

#### 3.6.4 `df.dtypes` 與 `df.info()`
`df.dtypes` 會顯示每欄資料型別。
`df.info()` 會顯示欄位型別、非空值數量、記憶體使用概況。

範例：
```python
print(df.dtypes)
df.info()
```

常見用途：
- 看哪欄是 `int64`、`float64`、`object`
- 看是否有欄位缺值很多
- 先做資料型別稽核（data type audit）

🗣️ 白話說明：像你接手前同事的 Excel，第一件事常不是分析，而是先看哪一欄是日期、哪一欄是假裝數字的字串，不然後面會一直報錯。

#### 3.6.5 `scipy.stats.skew()` 與 `scipy.stats.kurtosis()`
程式片段：
```python
from scipy import stats

x = [2, 4, 4, 4, 5, 5, 7, 9]

print(stats.skew(x))
print(stats.kurtosis(x))
print(stats.kurtosis(x, fisher=False))
```

解讀：
- `stats.skew(x)`：偏度
- `stats.kurtosis(x)`：Fisher 過峰度，常態 = 0
- `stats.kurtosis(x, fisher=False)`：Pearson 峰度，常態 = 3

### 3.7 一次整合：從資料摘要到離群值判讀
看這組資料：
```text
[1, 2, 2, 3, 4, 4, 5, 20]
```

你在考場可這樣走：
1. 先排序。
2. 找平均數、中位數、眾數。
3. 判斷是否受離群值影響。
4. 找 Q1、Q3、IQR。
5. 算 fence。
6. 判斷 20 是否離群。

快速算：
```text
sum = 41
mean = 41 / 8 = 5.125
median = (3 + 4) / 2 = 3.5
mode = 2, 4
```

平均數比中位數大不少，表示右邊可能有長尾。

Q1、Q3：
```text
下半部 [1, 2, 2, 3] → Q1 = (2 + 2) / 2 = 2
上半部 [4, 4, 5, 20] → Q3 = (4 + 5) / 2 = 4.5
IQR = 4.5 - 2 = 2.5
```

Fence：
```text
Lower = 2 - 1.5×2.5 = -1.75
Upper = 4.5 + 1.5×2.5 = 8.25
```

`20 > 8.25`，所以 `20` 是離群值。

結論：
- 這組資料受右側離群值影響
- 描述中心時，中位數比平均數穩
- 眾數有兩個，不是只能有一個

🗣️ 白話說明：這很像團隊每月加班時數，大多數人 1 到 5 小時，只有某個專案月有人 20 小時。平均值會被拉高，但中位數更接近日常狀態。

---

## Section 4: Comparison Tables (易混淆概念)

### 4.1 Mean vs Median vs Mode
| 指標 | 中文 | 怎麼算 | 適合情境 | 優點 | 常見陷阱 |
|---|---|---|---|---|---|
| Mean | 平均數 | 全部加總除以筆數 | 數值型、分布較平均 | 用到每筆資料 | 易受離群值影響 |
| Median | 中位數 | 排序後取中間值 | 有離群值、偏態資料 | 穩健、抗極端值 | 忘記偶數筆要平均中間兩個 |
| Mode | 眾數 | 出現次數最多的值 | 類別資料、最常見選項 | 直觀 | 可能多個，也可能沒有 |

### 4.2 Population Variance vs Sample Variance
| 比較項 | 母體變異數（Population Variance, σ²） | 樣本變異數（Sample Variance, s²） |
|---|---|---|
| 公式 | `Σ(xᵢ-μ)² / N` | `Σ(xᵢ-x̄)² / (n-1)` |
| 分母 | `N` | `n-1` |
| 對應 `ddof` | `ddof=0` | `ddof=1` |
| 使用情境 | 已有完整母體資料 | 從樣本估計母體變異 |
| 常見 API | `np.var(x, ddof=0)` | `np.var(x, ddof=1)` |
| 常見陷阱 | 把它誤用在樣本估計 | 忘記 `pandas.describe().std` 走這邏輯 |

### 4.3 IQR Outlier Detection vs Z-score Outlier Detection
| 比較項 | IQR 方法（IQR Method） | Z 分數方法（Z-score Method） |
|---|---|---|
| 核心指標 | `Q1`、`Q3`、`IQR` | 平均數 `μ`、標準差 `σ` |
| 判斷規則 | 小於 `Q1-1.5×IQR` 或大於 `Q3+1.5×IQR` | `|z| > 3` |
| 優勢 | 對偏態與離群值較穩健 | 直觀，可看偏離幾個標準差 |
| 較適合 | 非常態、已有極端值 | 分布較接近對稱且已知平均與標準差 |
| 常見考法 | 算 fence、找 outlier | 套公式算 z 值 |
| 常見陷阱 | 忘記 IQR = Q3-Q1 | 用錯公式或把 3 當成絕對規則 |

### 4.4 `scipy.stats.kurtosis()` Fisher=True vs Fisher=False
| 參數 | 定義 | 常態分布基準 | 解讀 |
|---|---|---|---|
| `fisher=True` 預設 | Fisher 過峰度（Excess Kurtosis） | `0` | >0 尖峰，=0 常峰，<0 平峰 |
| `fisher=False` | Pearson 峰度（Pearson Kurtosis） | `3` | >3 較尖，=3 常態基準，<3 較平 |

### 4.5 `dropna()` vs `fillna()`
| 方法 | 做什麼 | 適合情境 | 優點 | 風險 |
|---|---|---|---|---|
| `dropna()` | 刪掉缺失值列或欄 | 缺值很少、刪除影響小 | 簡單直接 | 可能損失太多資料 |
| `fillna()` | 用指定值補缺失 | 資料珍貴、缺值不宜直接刪 | 保留樣本數 | 補值方式可能引入偏差 |

---

## Section 5: 口訣 / Mnemonics

### 5.1 中心趨勢口訣
口訣：
**「平均看整體，中位擋極端，眾數看最多。」**

拆解：
- 平均數（mean）適合整體平均表現
- 中位數（median）適合有離群值
- 眾數（mode）適合最常見類別

### 5.2 IQR fence 口訣
口訣：
**「一五倍四分位，左減右加抓離群。」**

拆解：
- 先算 `IQR = Q3 - Q1`
- 下界：`Q1 - 1.5×IQR`
- 上界：`Q3 + 1.5×IQR`

### 5.3 偏度方向口訣
口訣：
**「偏右右尾長，平均排最前；偏左左尾長，平均排最後。」**

拆解：
- 正偏（右偏）→ 通常 `mean > median > mode`
- 負偏（左偏）→ 通常 `mean < median < mode`

### 5.4 `pandas.describe()` 順序口訣
口訣：
**「筆數平均標準差，最小二五五十七五最大。」**

對應：
```text
count → mean → std → min → 25% → 50% → 75% → max
```

### 5.5 `ddof` 口訣
口訣：
**「零給母體，一給樣本。」**

對應：
- `ddof=0` → 分母 `N`
- `ddof=1` → 分母 `N-1`

### 5.6 峰度定義口訣
口訣：
**「SciPy 預設看 Fisher，常態零；改成 Pearson，常態三。」**

---

## Section 6: 考試陷阱 (Exam Traps)

❌ 陷阱：`ddof=0` 和 `ddof=1` 只是寫法不同，結果差不多所以不用分。
✅ 正解：`ddof=0` 對應母體（population），分母是 `N`；`ddof=1` 對應樣本（sample），分母是 `N-1`。`pandas.describe()` 的 `std` 預設就是 `ddof=1`，這是高頻陷阱。

❌ 陷阱：`scipy.stats.kurtosis()` 算出來的 3 代表常態，所以預設應該是 Pearson。
✅ 正解：`scipy.stats.kurtosis()` 預設 `fisher=True`，採用 Fisher 過峰度，常態分布基準是 `0`，不是 `3`。只有 `fisher=False` 時才是 Pearson，常態 = `3`。

❌ 陷阱：盒鬚圖的 whisker 一定畫到 `Q1−1.5×IQR` 和 `Q3+1.5×IQR`。
✅ 正解：那兩個值是 fence，不是實際鬚端。盒鬚圖的 whisker 會延伸到 fence 範圍內的最後一筆資料點，超出 fence 的資料會另外標成離群點。這個陷阱常因為大家把邊界線和圖上位置混為一談。

❌ 陷阱：正偏（positive skew）表示平均數比較小，所以 `mean < median`。
✅ 正解：正偏是右尾長，通常由右邊的大值把平均數往右拉，因此 `mean > median > mode`。很多人會搞反，是因為把「尾巴往右」錯誤理解成「主體往左」。

❌ 陷阱：眾數（mode）只能有一個。
✅ 正解：眾數可以有一個、兩個、很多個，也可能沒有明確眾數。只要有多個值並列最高次數，就會出現多眾數。

❌ 陷阱：IQR 是 `Q3 - Q2`，因為 Q2 是中位數。
✅ 正解：IQR 定義是 `Q3 - Q1`，看的是中間 50% 範圍，不是第三四分位數和中位數之差。這個錯誤常來自把「四分位」想成相鄰相減。

❌ 陷阱：`describe()` 裡的 `50%` 是平均數。
✅ 正解：`50%` 是第二四分位數，也就是中位數（median）。平均數在 `mean` 那一列。

❌ 陷阱：有離群值時，平均數仍然是最好的代表值，因為它用到所有資料。
✅ 正解：正因為平均數會用到所有資料，它也最容易被極端值拉動。若題幹強調有極端值或偏態，通常中位數更合適。

❌ 陷阱：`value_counts()` 是算唯一值數量，所以和 `nunique()` 一樣。
✅ 正解：`value_counts()` 是算每個值出現幾次；`nunique()` 才是算不同值有幾種。兩者題目常放在一起混淆。

❌ 陷阱：`dropna()` 一定比 `fillna()` 好，因為資料比較乾淨。
✅ 正解：`dropna()` 雖然乾淨，但可能造成資料流失與偏差；`fillna()` 則保留樣本數，但補值方式要合理。考題重點是看情境，不是背固定答案。

---

## Section 7: 情境題快速判斷 (Scenario Quick-Judge)

- 看到「有離群值 / extreme outliers / 極端值」→ 選中位數（median）比平均數（mean）穩。
- 看到「最常見類別 / most frequent / 最多人選」→ 想眾數（mode）或 `value_counts()`。
- 看到「小資料集要算整體平均」→ 想平均數（mean）。
- 看到「max - min」→ 就是全距（range）。
- 看到「平方偏差平均」→ 想變異數（variance）。
- 看到「與原單位相同的離散程度」→ 想標準差（standard deviation）。
- 看到 `np.std(x)` 沒特別寫參數 → 預設 `ddof=0`，是母體標準差語意。
- 看到 `pd.describe()` → `std` 用 `ddof=1`，也就是樣本標準差。
- 看到 `25%`、`50%`、`75%` → 分別是 `Q1`、中位數、`Q3`。
- 看到「IQR」→ 立刻寫 `Q3 - Q1`，不是 `Q3 - Q2`。
- 看到「IQR fence」→ 立刻想到 `Q1−1.5×IQR` 到 `Q3+1.5×IQR`。
- 看到「boxplot whisker」→ 想到鬚端是 fence 內最後一筆資料，不是畫到 fence 數值本身。
- 看到「|z| > 3」→ 想 Z-score 離群值判斷。
- 看到「positive skew / 右偏 / 右尾長」→ 通常 `mean > median > mode`。
- 看到「negative skew / 左偏 / 左尾長」→ 通常 `mean < median < mode`。
- 看到 `scipy.stats.skew()` → 正值右偏，負值左偏。
- 看到 `scipy.stats.kurtosis()` 沒寫參數 → 預設 Fisher，常態 = `0`。
- 看到 `scipy.stats.kurtosis(x, fisher=False)` → Pearson，常態 = `3`。
- 看到「點落在 Q-Q 圖對角線附近」→ 表示分布接近理論分布，常見是接近常態。
- 看到「大量缺值但樣本珍貴」→ 優先考慮 `fillna()`。
- 看到「缺值很少且刪除影響低」→ 可考慮 `dropna()`。
- 看到「重複訂單 / 重複會員紀錄」→ 用 `drop_duplicates()`。
- 看到「欄位型別檢查」→ 想 `df.dtypes` 或 `df.info()`。
- 看到「唯一值個數 / cardinality」→ 想 `nunique()`。

---

## Section 8: 結尾：快速自我檢查 ✅

- [ ] 我能在 30 秒內分辨平均數（mean）、中位數（median）、眾數（mode）的適用情境。
- [ ] 我能對一組 5 到 8 筆資料正確算出平均數、中位數、眾數。
- [ ] 我能分清楚母體變異數 / 標準差和樣本變異數 / 標準差，並記得 `ddof=0` 與 `ddof=1`。
- [ ] 我能從排序後資料正確找出 `Q1`、`Q3`，並算出 `IQR = Q3 - Q1`。
- [ ] 我能用 `Q1−1.5×IQR` 與 `Q3+1.5×IQR` 判斷離群值。
- [ ] 我能解釋盒鬚圖中 box、median、whisker、outlier 各代表什麼。
- [ ] 我能看到「正偏 / 負偏」就立刻判斷尾巴方向與 `mean`、`median`、`mode` 大小順序。
- [ ] 我能分辨 `scipy.stats.kurtosis()` 的 Fisher 預設與 `fisher=False` 的 Pearson 定義。
- [ ] 我能讀懂 `pandas.describe()` 每一列代表什麼，尤其知道 `std` 預設是 `ddof=1`。
- [ ] 我能在題目出現 `dropna()`、`fillna()`、`value_counts()`、`nunique()`、`df.dtypes`、`df.info()` 時快速對應用途。

📌 超出本課範圍提醒：
- 機率分布（PMF / CDF / 常態分布推導）
- 假說檢定（H0 / H1 / p-value）
- 模型特徵工程與建模技巧

把這一課練到「看到小資料集就能直接下手算」，L22101 的分數會很穩。
