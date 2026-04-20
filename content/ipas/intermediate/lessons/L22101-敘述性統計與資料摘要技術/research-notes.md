# Research Notes: L22101 敘述性統計與資料摘要技術

Research conducted 2026-04-20 for iPAS AI 應用規劃師中級（以 115 年度簡章、114 年公告試題、NumPy/pandas/SciPy 官方文件為主）。

## Official Sources
- [iPAS 115 年度 AI 應用規劃師能力鑑定簡章（2026-04-10）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 中級為科目 1 加上科目 2 或 3 擇一；科目 2「大數據處理分析與應用」通過後取得「AI 應用規劃師（數據分析）」證書。可作為 L22 題目定位的官方依據。
- [iPAS 公告：評鑑內容範圍更新（114.04 版）](https://www.ipas.org.tw/AIAP/AbilityNewsData.aspx?nwsno=2b55e430-c19f-4299-a981-ae0906a8a60f): 官方明示評鑑內容範圍有更新；寫作時應以 114.04 版之後的用語與範圍為準。
- [iPAS 公告：AI 應用規劃師 11 月份初級與中級試題公告](https://www.ipas.org.tw/AIAP/AbilityNewsData.aspx?nwsno=719deab8-a361-40c6-8536-aa0290d78948): 官方確認 114 年第二次中級當次試題已公開，可直接觀察實際命題風格。
- [114 年第二次 AI 應用規劃師中級 第二科公告試題（2025-11-20 公告）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 已出現「散佈圖後判斷用 Pearson correlation coefficient」「資料非對稱且有極端值時改用 quantile regression」「依 pseudocode 辨識 K-means」等題型。雖非全部都屬 L22101，但證明科目 2 確實偏向情境式單選與 pseudocode 判讀。
- [NumPy statistics overview](https://numpy.org/doc/stable/reference/routines.statistics.html): 官方列出 `mean`、`median`、`std`、`var`、`percentile`、`ptp` 等核心函式，與 L22101 的計算題完全對應。
- [numpy.std 官方文件](https://numpy.org/devdocs/reference/generated/numpy.std.html): `ddof=0` 預設為以 `N` 為分母；`ddof=1` 對應常見樣本標準差/變異數情境。這是考試最容易混淆的公式/API 對照點。
- [numpy.percentile 官方文件](https://numpy.org/doc/stable/reference/generated/numpy.percentile.html): `numpy.percentile(a, q)` 用百分位數 `q`（0 到 100）計算分位點；可直接支援 Q1、Q3、IQR 題型。
- [pandas.DataFrame.describe 官方文件](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.describe.html): 數值欄預設摘要含 `count, mean, std, min, 25%, 50%, 75%, max`；非常貼近考題會出的表格判讀題。
- [pandas.Series.value_counts 官方文件](https://pandas.pydata.org/docs/reference/api/pandas.Series.value_counts.html): 回傳各唯一值的次數，預設遞減排序，且預設排除 NA；可作為眾數/類別分布題依據。
- [pandas.DataFrame.nunique 官方文件](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.nunique.html): 可做 cardinality check；`dropna=True` 預設不把 NaN 計入 distinct count。
- [pandas.DataFrame.dtypes 官方文件](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.dtypes.html): 可直接審核欄位型別；混合型別欄位通常會變成 `object`，是資料剖析常考陷阱。
- [pandas.DataFrame.fillna](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.fillna.html) / [pandas.DataFrame.dropna](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.dropna.html) / [pandas.DataFrame.drop_duplicates](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html): 分別對應缺失值補值、刪除缺失值、去重複資料的標準 API。
- [scipy.stats.skew 官方文件](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.skew.html): `skewness > 0` 代表右尾較重（正偏），接近 0 代表較對稱。
- [scipy.stats.kurtosis 官方文件](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.kurtosis.html): `fisher=True` 時常態分布峰度為 0；`fisher=False` 時常態分布為 3。若教材要教「尖峰/平峰/常峰」，必須先講清楚用的是哪一種定義。
- [NIST: Measures of Skewness and Kurtosis](https://itl.nist.gov/div898/handbook/eda/section3/eda35b.htm): 權威定義偏度是對稱性的缺乏，峰度與 heavy tails/outliers 有關；適合拿來校正中文解釋方向。
- [PSU STAT 200: Identifying Outliers - IQR Method](https://online.stat.psu.edu/stat200/book/export/html/63): 明確給出 IQR fence：下界 `Q1 - 1.5*IQR`、上界 `Q3 + 1.5*IQR`。
- [NIST: Normal Probability Plot](https://www.itl.nist.gov/div898/handbook/eda/section3/normprpl.htm): Q-Q / normal probability plot 可用來看資料是否偏離常態；點越貼近直線越接近目標分布，彎曲則表示偏態或尾部偏離。

## Community Insights (exam patterns)
- [Vocus：iPAS_AI 應用規劃師_中級（統計方法）筆記分享](https://vocus.cc/article/690427a1fd89780001b3009a): 備考者把「描述性統計」列為 L22 五大主題之一，且特別強調平均數受極端值影響、中位數較抗極端值、IQR/箱型圖與標準差是高頻觀念。
- [Vocus：iPAS AI 應用規劃師中級考試 科目二不同難度模擬題目](https://vocus.cc/article/68b948cbfd897800019ee2a3): 民間模擬題反覆出現「盒鬚圖同時看集中趨勢與離群值」「Q-Q 圖判讀」「變異數 vs 標準差」等題型，與官方科目 2 的情境式單選風格相符。
- 社群可交叉驗證的共同訊號：
  - 統計題不是深推導，而是小資料集計算、圖表判讀、API/函式選擇。
  - 常見陷阱是把 `mean`、`median`、`mode` 的適用場景混淆，或忘記極端值會拉動平均數。
  - `std/var` 的母體 vs 樣本分母、`ddof=0` vs `ddof=1`、IQR fence、Q-Q 圖方向，都是很像考題的易錯點。
- 保留態度：目前能直接驗證的 iPAS 中級社群貼文仍有限，真正最可靠的命題證據仍是官方公告試題與官方簡章。

## Current State
- NumPy 目前正式文件仍把 `mean`、`median`、`std`、`var`、`percentile`、`ptp` 列為標準統計 API；沒有看到這些函式在 2026-04-20 前有被淘汰或不建議使用的訊號。
- `numpy.std` 的最新文件仍清楚保留 `ddof`；預設 `ddof=0` 是母體標準差語意，`ddof=1` 是常見樣本估計語意。這點和考試公式題應一致。
- `numpy.percentile` 自 1.22 起把參數名稱從 `interpolation` 改為 `method`；若題目考新版 API 名稱，應以 `method` 為準。
- pandas `describe()` 的數值欄輸出仍是 `count, mean, std, min, 25%, 50%, 75%, max`；`50%` 就是 median，`25%` / `75%` 可直接推 Q1 / Q3 與 IQR。
- pandas `value_counts()` 仍預設排除 NA，且按頻率遞減排序；pandas `nunique()` 仍預設 `dropna=True`。
- SciPy `skew` 與 `kurtosis` 目前仍是描述偏態與峰態的標準函式；`kurtosis` 是否以常態為 0 或 3，取決於 `fisher` 參數，教材不能省略。

## External Documents Found
- None required for this topic.
- 補充性權威來源已找到：
  - NIST：偏度、峰度、normal probability plot 的解釋。
  - Penn State：IQR fence 與箱型圖離群值規則。

## Key Findings Summary
- L22101 最像的出題方式是「5 到 8 筆數字直接計算」或「給你 `describe()` / Python snippet 問輸出與解讀」。
- 平均數、變異數、標準差、IQR、CV 的公式要能直接套；尤其要分清母體 `N` 與樣本 `N-1`，以及 `np.std(ddof=0/1)`。
- 箱型圖與 IQR fence 是高價值考點：`IQR = Q3 - Q1`，下界 `Q1 - 1.5*IQR`，上界 `Q3 + 1.5*IQR`。
- 偏度方向要固定：正偏 = 右尾較長，負偏 = 左尾較長；Q-Q plot 重點是「是否貼近直線」與「尾端怎麼偏」。
- pandas 資料剖析重點應放在 `describe()`、`value_counts()`、`nunique()`、`dtypes`、`fillna/dropna/drop_duplicates()` 的輸入輸出與預設行為。

## Scope Notes
- 以下內容超出 L22101，若需要提到只可在此標註，不應展開教學：
  - PMF/CDF、常態/二項/卜瓦松等機率分布細節。
  - 假說檢定、p-value、H0/H1、顯著性檢定。
  - 模型特徵工程、降維、回歸/分類建模技巧。
- `scipy.stats.probplot` 可作為 Q-Q plot 的 Python 補充，但若 lesson 只需考試深度，重點應放在圖形判讀，不必展開常態性檢定流程。
