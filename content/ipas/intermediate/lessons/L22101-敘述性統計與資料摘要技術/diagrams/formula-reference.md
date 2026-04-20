# 公式速查表 (Formula Reference Sheet)

## 集中趨勢（Central Tendency）

| 指標 | 公式 | Python | 何時用 |
|------|------|--------|--------|
| 平均數（Mean） | μ = Σxᵢ / N | `np.mean(x)` | 無離群值、常態分佈 |
| 中位數（Median） | 排序後中間值 | `np.median(x)` | 有離群值、偏態分佈 🔥 |
| 眾數（Mode） | 最高頻值 | `scipy.stats.mode(x).mode` | 類別型、找最常見值 |

## 離散程度（Dispersion）

| 指標 | 公式 | Python | 備註 |
|------|------|--------|------|
| 全距（Range） | max − min | `np.ptp(x)` | 最簡單，極不穩健 |
| 母體變異數（σ²） | Σ(xᵢ−μ)² / **N** | `np.var(x, ddof=0)` | 🔥 ddof=0 |
| 樣本變異數（s²） | Σ(xᵢ−x̄)² / **(N−1)** | `np.var(x, ddof=1)` | 🔥 ddof=1 |
| 母體標準差（σ） | √(Σ(xᵢ−μ)²/N) | `np.std(x, ddof=0)` | np.std **預設 ddof=0** |
| 樣本標準差（s） | √(Σ(xᵢ−x̄)²/(N−1)) | `np.std(x, ddof=1)` | pd.describe **預設 ddof=1** |
| 四分位距（IQR） | Q3 − Q1 | `np.percentile(x,75)−np.percentile(x,25)` | 🔥🔥 穩健性指標 |
| 變異係數（CV） | (σ / μ) × 100% | 手動計算 | 跨資料集比較用 |

## IQR 圍欄（Tukey Fence）

```
下圍欄（Lower Fence）= Q1 − 1.5 × IQR
上圍欄（Upper Fence）= Q3 + 1.5 × IQR
離群值（Outlier）：x < 下圍欄  OR  x > 上圍欄
鬚（Whisker）：延伸到圍欄內的最後一個資料點（非圍欄值本身）🔥🔥
```

## 分佈型態（Shape）

| 指標 | 公式概念 | Python | 正常值 |
|------|----------|--------|--------|
| 偏度（Skewness） | 三階矩 | `scipy.stats.skew(x)` | 0 = 對稱 |
| 峰度—Fisher（excess） | 四階矩−3 | `scipy.stats.kurtosis(x)` | 0 = 常態 🔥 |
| 峰度—Pearson | 四階矩 | `scipy.stats.kurtosis(x, fisher=False)` | 3 = 常態 🔥 |

## pandas.describe() 輸出解析

```python
df['col'].describe()
# 輸出：
count    N          ← 非缺失值筆數
mean     μ          ← 算術平均數
std      s          ← 樣本標準差 (ddof=1) 🔥🔥
min      最小值
25%      Q1 (第一四分位數)
50%      Q2 / 中位數 🔥
75%      Q3 (第三四分位數)
max      最大值
```

> 🔥🔥 記憶：`pd.describe()` 的 std 是**樣本**標準差（ddof=1），不是 `np.std()` 預設的母體標準差（ddof=0）。

## Z-score 離群值偵測

```
z = (x − μ) / σ
規則：|z| > 3 → 離群值（覆蓋 99.7% 常態資料）
Python：scipy.stats.zscore(x)
適用：資料接近常態分佈時
不適用：偏態分佈（改用 IQR fence）🔥
```

## Gemini 圖像生成提示（供後續渲染）

```
Generate a statistics formula reference card with clean layout:
- Title: "L22101 敘述性統計公式速查" 
- Language: Traditional Chinese + English
- Include: central tendency (mean/median/mode), dispersion (variance/std/IQR), IQR fence formula, skewness/kurtosis comparison table
- Style: textbook-clean, white background, blue headers
- Format: A4 landscape, suitable for printing
```
