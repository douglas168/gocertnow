# L22301 統計學在大數據中的應用 — 學習指南
## Section 1: Exam Item Mapping
> 對應評鑑範圍：**L22301 統計學在大數據中的應用** ＋ **L223 大數據分析方法與工具**
這一課在考的，不是你會不會推複雜統計證明，而是你能不能把原始資料整理成「可分析、可比較、可進模型」的形狀。
你要能從資料特徵出發，快速回答：
- 這個欄位需要做`縮放（Scaling）`嗎？
- 這個欄位的分佈偏了嗎？要不要做`分佈轉換（Distribution Transform）`？
- 面對`右偏（Right Skew）`、`異常值（Outliers）`、`量級差異（Scale Difference）`，該選`標準化（Standardization）`、`最小最大正規化（Min-Max Normalization）`、`穩健縮放（Robust Scaling）`、`對數轉換（Log Transform）`、`Box-Cox 轉換（Box-Cox Transform）`，還是`分位數轉換（Quantile Transform）`？
- `scikit-learn` 的 `StandardScaler`、`MinMaxScaler`、`RobustScaler`、`QuantileTransformer`、`PowerTransformer` 要怎麼用？`fit_transform()` 與 `transform()` 差在哪？
本課範圍要守住這些邊界：
- 教的是資料前處理，不是特定機器學習模型的分佈假設。
- 教的是轉換與縮放怎麼選，不是`主成分分析（Principal Component Analysis, PCA）`、`奇異值分解（Singular Value Decomposition, SVD）`的數學推導。
- 教的是讓資料更適合分析，不是`SMOTE`、特徵選擇、資料切分策略。
- 可以提到「PCA 前常需標準化」，但只限資料前處理觀點。
這一課最常見命題形式：
- 給你一組資料描述，問你哪個轉換最合適。
- 給你一段 `sklearn.preprocessing` 程式碼，問輸出效果或 API 意義。
- 給你一個錯誤觀念，問哪個敘述才正確。
（以下各節將逐一說明概念、公式、及 sklearn API）
---
## Section 2: 關鍵概念總覽圖 (Knowledge Tree)
```text
🤖 L22301 統計學在大數據中的應用
│
├── 📖 為什麼要做資料轉換
│   ├── 讓不同量級可比較
│   ├── 讓偏斜分佈更容易分析
│   ├── 降低異常值對縮放的破壞
│   ├── 讓特徵更適合距離或梯度敏感方法
│   └── ⚠️ 不是所有資料都要一律轉換
│
├── 📊 縮放（Scaling）
│   ├── 📏 最小最大正規化（Min-Max Normalization, MinMaxScaler）🔥🔥
│   │   ├── 公式：x' = (x - x_min) / (x_max - x_min)
│   │   ├── 輸出：常見為 [0,1]
│   │   ├── 適用：需要固定範圍、已知上下界
│   │   └── ⚠️ 異常值會直接拉壞 min / max
│   ├── 📐 標準化（Standardization, z-score, StandardScaler）🔥🔥
│   │   ├── 公式：z = (x - μ) / σ
│   │   ├── 輸出：平均 0、標準差 1
│   │   ├── 適用：量級差很多、距離敏感分析
│   │   └── ⚠️ 不是 [0,1]；也不是「正規化」同義詞
│   └── 🛡️ 穩健縮放（Robust Scaling, RobustScaler）🔥🔥
│       ├── 公式：x' = (x - median) / IQR
│       ├── IQR（四分位距）= Q3（第75百分位）− Q1（第25百分位）
│       ├── 適用：異常值多、尾巴重
│       └── ⚠️ 中心是 median，不是 mean
│
├── 🔧 分佈轉換（Distribution Transforms）
│   ├── 🌲 對數轉換（Log Transform）🔥🔥
│   │   ├── 公式：x' = ln(x)
│   │   ├── 含 0：log1p(x) = ln(x+1)
│   │   ├── 適用：右偏、跨度很大、正值資料
│   │   └── ⚠️ x ≤ 0 時不能直接 ln(x)
│   ├── 🔋 冪次轉換（Power Transforms）
│   │   ├── Box-Cox Transform 🔥🔥
│   │   │   ├── 公式：(x^λ - 1)/λ；λ=0 時為 ln(x)
│   │   │   ├── 條件：x > 0
│   │   │   ├── 觀念：右偏正值資料常用選項
│   │   │   └── ⚠️ λ 通常由資料估計，不是固定亂猜
│   │   └── Yeo-Johnson Transform
│   │       ├── sklearn `PowerTransformer` 另一選項
│   │       ├── 可處理 0 與負值
│   │       └── ⚠️ 本課重點仍以 Box-Cox 為主
│   └── 🧭 分位數轉換（Quantile Transform, QuantileTransformer）🔥
│       ├── 先用經驗 CDF 排序
│       ├── 再映到 uniform 或 normal
│       ├── 適用：分佈很怪、離群多、想壓平長尾
│       └── ⚠️ 非線性，可能扭曲原本線性關係
│
├── ⚖️ 分佈診斷與選法
│   ├── 偏態（Skewness）
│   │   ├── 接近 0：較對稱
│   │   ├── > 0：右偏
│   │   └── < 0：左偏
│   ├── 異常值（Outliers）
│   │   ├── 少：StandardScaler 可考慮
│   │   └── 多：RobustScaler 優先
│   ├── 範圍需求
│   │   ├── 一定要 [0,1]：MinMaxScaler
│   │   └── 不要求固定範圍：Standard / Robust
│   └── ⚠️ 先看資料特徵，再選轉換，不要背單一萬用答案
│
├── 🧪 sklearn.preprocessing API
│   ├── `StandardScaler`
│   ├── `MinMaxScaler`
│   ├── `RobustScaler`
│   ├── `QuantileTransformer`
│   ├── `PowerTransformer`
│   ├── `fit()`：學參數
│   ├── `transform()`：套參數
│   └── `fit_transform()`：先學再套🔥🔥
│
└── 🚨 高頻陷阱
    ├── Normalization ≠ Standardization
    ├── 有異常值不是先選 MinMaxScaler
    ├── Box-Cox 不是萬用答案
    ├── log transform ≠ 一定等於 Box-Cox
    └── 訓練集 fit、測試集 transform 才對
```
---
## Section 3: Core Concepts
### 3.1 為什麼需要資料轉換？（Motivation + Overview）
在大數據分析裡，原始資料常常有三種問題：
1. 不同欄位量級差太大。
2. 分佈太偏，右尾很長。
3. 異常值太明顯，平均數與標準差被拖走。
如果不先做處理，你後面的分析可能會出現這些狀況：
- 某個金額欄位因為數字超大，直接壓過其他特徵。
- 距離型方法看到的是「數值大小」，不是你真正想比較的資訊。
- 偏態太重時，圖表、統計摘要、分群解讀都不直觀。
`資料轉換（Data Transformation）`的核心目標，就是把資料變成更容易比較、觀察、分析或建模前處理的形式。
🗣️ 白話說明：想像你在看 104 人力銀行的薪資資料，一欄是「年薪（新台幣）」，一欄是「面試次數」，一欄是「是否準時回覆 email」。如果不先整理，薪資欄位的數字大到像在搶版面，其他欄位很容易被蓋掉。資料轉換就像先把大家拉回同一個討論桌，不然群組報告永遠只有一個人講話。
先把本課拆成兩大塊：
- `縮放（Scaling）`：重點是把量級拉到可比較。
- `分佈轉換（Distribution Transform）`：重點是調整偏態、長尾、非對稱分佈。
ASCII 全貌圖：
```text
原始資料
   │
   ├── 量級差太大？──────────────→ 做縮放（Scaling）
   │                               ├── Min-Max
   │                               ├── z-score
   │                               └── RobustScaler
   │
   └── 分佈太偏或尾巴太長？────→ 做分佈轉換（Distribution Transform）
                                   ├── log
                                   ├── Box-Cox / Power Transform
                                   └── Quantile Transform
```
🔥🔥 考試重點不是「背所有名字」，而是「看到資料特徵，能對應到正確方法」。
---
### 3.2 縮放（Scaling）：Min-Max、z-score、RobustScaler
### 3.2.1 最小最大正規化（Min-Max Normalization, Min-Max）
`最小最大正規化（Min-Max Normalization）`是把數值線性壓到固定區間，最常見是 `[0,1]`。
公式：
```text
x' = (x - x_min) / (x_max - x_min)
```
如果想映到其他範圍，例如 `[a,b]`，可以再做一次線性映射，但 iPAS 常考的是 `[0,1]` 版本。
#### Worked Example
假設某欄位是一天點 Uber Eats 的次數：`[2, 5, 8]`
- `x_min = 2`
- `x_max = 8`
對 `x = 5` 做`最小最大正規化（Min-Max Normalization）`：
```text
x' = (5 - 2) / (8 - 2)
   = 3 / 6
   = 0.5
```
對 `x = 8`：
```text
x' = (8 - 2) / (8 - 2)
   = 6 / 6
   = 1
```
所以轉換後會是：
```text
[0, 0.5, 1]
```
🗣️ 白話說明：這很像把班上所有人的通勤時間壓成一條 0 到 1 的刻度。最短通勤的人就是 0，最久的人就是 1，其他人站在中間某個位置。看起來很整齊，但如果有人住桃園、每天超遠通勤，他就會把整條刻度拉得很開。
#### 什麼時候用？
- 需要固定輸出範圍，例如 `[0,1]`。
- 資料本身有明確上下界。
- 想保留原始大小順序與相對距離比例。
#### 什麼時候不要先選？
- 異常值很多時。
- `min` 與 `max` 很不穩定時。
異常值影響示意：
```text
原始資料：2, 5, 8
Min-Max ：0, 0.5, 1
若多一個異常值 100：
原始資料：2, 5, 8, 100
Min-Max ：0, 0.03, 0.06, 1
中間正常資料全被擠在 0 附近
```
🔥🔥 常考句型：題目出現「需要映到 `[0,1]`」時，優先想到`最小最大正規化（Min-Max Normalization）`。
#### sklearn API
```python
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler(feature_range=(0, 1))
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```
重點：
- `fit_transform()`：先學 `min`、`max`，再轉換訓練資料。
- `transform()`：對測試資料套用同一組 `min`、`max`。
---
### 3.2.2 標準化（Standardization, z-score, StandardScaler）
`標準化（Standardization）`會把資料轉成「平均數約為 0、標準差約為 1」的尺度。
公式：
```text
z = (x - μ) / σ
```
其中：
- `μ` 是`平均數（Mean）`
- `σ` 是`標準差（Standard Deviation, SD）`
#### Worked Example
假設某欄位是 YouTube 每日觀看分鐘數：`[20, 30, 40]`
先算平均數：
```text
μ = (20 + 30 + 40) / 3
  = 30
```
這裡為了教學直觀，直接使用此資料的母體標準差：
```text
σ = sqrt(((20-30)^2 + (30-30)^2 + (40-30)^2) / 3)
  = sqrt((100 + 0 + 100) / 3)
  = sqrt(200 / 3)
  ≈ 8.165
```
對 `x = 40`：
```text
z = (40 - 30) / 8.165
  ≈ 1.225
```
對 `x = 20`：
```text
z = (20 - 30) / 8.165
  ≈ -1.225
```
轉換後大致是：
```text
[-1.225, 0, 1.225]
```
🗣️ 白話說明：這就像把每個人的表現轉成「比平均高多少個標準差」。例如同事群組裡大家平均 30 分鐘內回訊息，你 10 分鐘回，就代表你比平均快一段；你 2 小時才回，就可能遠高於平均。`z-score` 不是在看你絕對多少，而是在看你偏離團體中心多遠。
#### 什麼時候用？
- 欄位量級差異很大。
- 你要比較「偏離平均多少」。
- 資料大致對稱，或你想先統一尺度。
- 距離型分析或量級敏感分析前處理常用。
#### 注意事項
- 輸出沒有固定範圍，不是 `[0,1]`。
- `z-score` 是`標準化（Standardization）`，不是`正規化（Normalization）`。
- 異常值會影響平均數與標準差，所以異常值多時要小心。
ASCII 直觀圖：
```text
原始尺度：  1000   1200   1500
標準化後： -0.98   -0.39   1.37
重點不再是金額本身，而是離平均多遠
```
🔥🔥 常考句型：題目若提「平均為 0、標準差為 1」或「PCA 前先處理尺度」，優先想到`標準化（Standardization）`。
#### sklearn API
```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```
補充：
- `StandardScaler` 會從訓練資料學到 `mean_`、`var_`、`scale_`。
- 題目若問 `scale_`，通常是和標準差尺度有關。
---
### 3.2.3 穩健縮放（Robust Scaling, RobustScaler）
`穩健縮放（Robust Scaling）`使用`中位數（Median）`和`四分位距（Interquartile Range, IQR）`，因此比平均數與標準差更不怕異常值。
公式：
```text
x' = (x - median) / IQR
```
其中：
```text
IQR = Q3 - Q1
```
- `Q1`：第 25 百分位數
- `Q3`：第 75 百分位數
#### Worked Example
假設外送金額資料是：
```text
[80, 90, 100, 110, 500]
```
這組資料明顯有一個異常值 `500`。
先找：
- `median = 100`
- `Q1 = 90`
- `Q3 = 110`
- `IQR = 110 - 90 = 20`
對 `x = 110`：
```text
x' = (110 - 100) / 20
   = 10 / 20
   = 0.5
```
對異常值 `x = 500`：
```text
x' = (500 - 100) / 20
   = 400 / 20
   = 20
```
🗣️ 白話說明：想像你在看大家的午餐花費，多數同事都吃 80 到 110 元，結果某天主管請客點了 500 元高級便當。這筆資料若拿去算平均，整體會被拉高很多；但用中位數和 IQR，就比較能守住大多數人的真實區間。
#### 什麼時候用？
- 異常值多。
- 長尾分佈明顯。
- 不希望被少數極端值拖著跑。
#### 與 StandardScaler 的差別
- `StandardScaler`：用平均數與標準差。
- `RobustScaler`：用中位數與 IQR。
- 有異常值時，`RobustScaler` 更穩。
ASCII 比較：
```text
資料：10, 11, 12, 13, 1000
StandardScaler：
平均與標準差被 1000 拉走
正常值彼此差異變得不明顯
RobustScaler：
中心看 median，尺度看 IQR
正常值區間較能保住
```
🔥🔥 正式題風格很愛考這一題：只要看到 `outliers`、`異常值很多`、`robust`，就要想到`穩健縮放（Robust Scaling）`。
#### sklearn API
```python
from sklearn.preprocessing import RobustScaler
scaler = RobustScaler(quantile_range=(25, 75))
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```
重點：
- 預設 `quantile_range=(25, 75)`，也就是用 IQR。
- 中心是 `median`，不是 `mean`。
---
### 3.2.4 三種縮放的快速比較
```text
有固定範圍需求？          ── 是 → Min-Max
沒有固定範圍，但量級差大？ ── 是 → StandardScaler
異常值很多？              ── 是 → RobustScaler
```
🗣️ 白話說明：就像租房比價：
- 你只想把所有房租壓成 0 到 1 的分數表，看相對位置，用 `Min-Max`。
- 你想知道「這間房租比平均台北租金高多少」，用 `z-score`。
- 你知道豪宅和地下室雅房混在一起，怕極端值把市場行情扭曲，就用 `RobustScaler`。

> 📊 **三種縮放方法在異常值下的表現比較圖**
> → 詳見 [diagrams/scaling-methods-comparison.mmd](diagrams/scaling-methods-comparison.mmd)

---
### 3.3 分佈轉換（Distribution Transforms）：log、Box-Cox、QuantileTransformer
### 3.3.1 對數轉換（Log Transform）
`對數轉換（Log Transform）`常用來處理右偏資料，讓非常大的值被壓縮、非常小的值被拉近。
常見公式：
```text
x' = ln(x)
```
如果資料包含 0，常用：
```text
log1p(x) = ln(x + 1)
```
#### Worked Example 1：純正值
假設商品銷量為：
```text
[1, 10, 100, 1000]
```
做 `ln(x)` 後約為：
```text
ln(1)    = 0
ln(10)   ≈ 2.303
ln(100)  ≈ 4.605
ln(1000) ≈ 6.908
```
原本每次差 10 倍，做完後差距被大幅壓縮。
#### Worked Example 2：資料包含 0
假設某賣家一天收到的負評數：
```text
[0, 1, 3, 10]
```
若直接做 `ln(x)`，`ln(0)` 不存在。
所以改用：
```text
log1p(0)  = ln(1)  = 0
log1p(1)  = ln(2)  ≈ 0.693
log1p(3)  = ln(4)  ≈ 1.386
log1p(10) = ln(11) ≈ 2.398
```
🗣️ 白話說明：這很像 Instagram 粉絲數。1,000 和 10,000 看起來差超大，但你做對數後，重點會變成「成長級距」而不是原始數字爆炸。對數轉換很適合那種少數超大、多數很小的資料。
#### 什麼時候用？
- 右偏資料。
- 正值資料。
- 跨度差很多，例如金額、次數、流量。
#### 什麼時候要小心？
- 有 0 或負值時不能直接用 `ln(x)`。
- `log1p(x)` 是 `ln(x+1)`，不是 `ln(x) + 1`。
ASCII 圖：
```text
右偏分佈（原始）              對數轉換後（較壓縮）
頻數                           頻數
 ^                              ^
 | ***                          |   ***
 | **                           |  ****
 | **                           | *****
 | *                            |  ****
 | *                            |   ***
 +-------------> x              +-------------> x
  小值多，右尾長                 大值被壓縮，尾巴縮短
```
🔥🔥 考試一看到「右偏」「大值少但超大」「倍率差距很大」，先想到`對數轉換（Log Transform）`。

> 📊 **右偏分佈 → Log Transform → 接近對稱**
> → 詳見 [diagrams/distribution-before-after-log.mmd](diagrams/distribution-before-after-log.mmd)

---
### 3.3.2 冪次轉換（Power Transforms）與 Box-Cox 轉換（Box-Cox Transform）
`冪次轉換（Power Transforms）`是一整類用冪次去調整分佈形狀的方法。對 iPAS 這一課，最重要的是`Box-Cox 轉換（Box-Cox Transform）`。
公式：
```text
x'(λ) = (x^λ - 1) / λ,   λ ≠ 0
```
當 `λ = 0` 時：
```text
x'(0) = ln(x)
```
這表示：
- `λ = 0`：會退化成`對數轉換（Log Transform）`
- `λ = 1`：線性偏移（x' = x − 1），分佈形狀不變但數值整體下移 1
#### Worked Example：λ = 0.5
假設右偏正值資料中有一筆 `x = 9`，令 `λ = 0.5`
```text
x'(0.5) = (9^0.5 - 1) / 0.5
        = (3 - 1) / 0.5
        = 2 / 0.5
        = 4
```
若同一筆資料改成 `λ = 0`
```text
x'(0) = ln(9)
      ≈ 2.197
```
#### 核心觀念
- `Box-Cox 轉換（Box-Cox Transform）`要求 `x > 0`。
- `λ` 通常不是手動亂選，而是從資料估計。
- 它是「右偏正值資料」的常見選項，不是萬用最佳答案。
🗣️ 白話說明：你可以把 `Box-Cox` 想成比一般 `log` 更有彈性的調音旋鈕。`log` 比較像一個固定濾鏡；`Box-Cox` 則像你在剪 YouTube 影片聲音時，可以調不同強度，把太尖的地方收回來，但前提是這段音軌要能被這個工具處理，也就是資料必須是正值。
#### 什麼時候用？
- 資料明顯右偏。
- 所有值都大於 0。
- 想用比單純 `log` 更彈性的轉換。
#### 什麼時候不要亂用？
- 含 0 或負值。
- 題目沒有說明分佈偏態，卻把它當唯一標準答案。
#### sklearn API
`PowerTransformer` 是 `sklearn` 用來做冪次轉換的類別。
```python
from sklearn.preprocessing import PowerTransformer
pt = PowerTransformer(method="box-cox", standardize=True)
X_train_bc = pt.fit_transform(X_train_positive)
X_test_bc = pt.transform(X_test_positive)
```
# 注意：PowerTransformer() 預設為 method='yeo-johnson'（sklearn ≥0.23），本例明示 method='box-cox'
重點：
- `method="box-cox"`：使用`Box-Cox 轉換（Box-Cox Transform）`
- `standardize=True`：轉換後還會再做標準化
- `lambdas_`：可查看估計出的 `λ`
> 📊 **Box-Cox λ 值對應效果速查圖**
> → 詳見 [diagrams/boxcox-lambda-guide.mmd](diagrams/boxcox-lambda-guide.mmd)

#### 補充：Yeo-Johnson Transform
`PowerTransformer` 還支援 `method="yeo-johnson"`，可處理 0 與負值。
```python
pt = PowerTransformer(method="yeo-johnson", standardize=True)
```
本課只要知道：
- 這也屬於`冪次轉換（Power Transforms）`
- `Box-Cox` 更常被拿來當考點
- `Yeo-Johnson` 的存在，提醒你：不是所有冪次轉換都要求正值
🔥🔥 記法：`Box-Cox = right-skewed positive data option`，不是 universal best answer。
---
### 3.3.3 分位數轉換（Quantile Transform, QuantileTransformer）
`分位數轉換（Quantile Transform）`不是用單一代數公式硬算，而是用排序與分位數概念，把資料映到目標分佈。
核心流程：
1. 先估計資料的`經驗累積分配函數（Empirical CDF, ECDF）`
2. 每個值找到自己的分位位置
3. 再映到目標分佈，例如`均勻分佈（Uniform Distribution）`或`常態分佈（Normal Distribution）`
流程圖：
```text
原始資料
   │
   ├── 排序
   │
   ├── 找每個點位在第幾分位
   │
   └── 映到目標分佈
       ├── output_distribution="uniform"
       └── output_distribution="normal"
```
#### Worked Example：映到 Uniform
假設資料為：
```text
[10, 20, 30, 100]
```
排序後，每個點大致可對應到分位位置：
```text
10   → 0.00
20   → 0.33
30   → 0.67
100  → 1.00
```
若目標是`均勻分佈（Uniform Distribution）`，輸出就會更接近平均鋪開的分位值（最小值映射到 0.0，最大值映射到 1.0）。
它不是單純線性壓縮，而是依排序位置重排尺度。
#### 什麼時候用？
- 分佈非常歪。
- 異常值很多。
- 想把資料映成較平滑的 uniform 或 normal 形狀。
#### 代價是什麼？
- 這是`非線性轉換（Non-linear Transform）`。
- 可能扭曲原本的線性關係。
🗣️ 白話說明：這像你把班上考試成績，不看原始分數，而是改看班排名百分位。原本 92 分和 95 分只差 3 分，但如果全班超擠，兩人百分位可能差很多；反過來 60 和 70 分若都落在尾段，轉完後差距也可能被改寫。它很會整理分佈，但不是原汁原味保留線性距離。
#### sklearn API
```python
from sklearn.preprocessing import QuantileTransformer
qt = QuantileTransformer(
    n_quantiles=1000,
    output_distribution="normal",
    random_state=42
)
X_train_qt = qt.fit_transform(X_train)
X_test_qt = qt.transform(X_test)
```
重點：
- `output_distribution="uniform"` 或 `"normal"`
- 超出訓練範圍的新值，會映到輸出分佈邊界附近
- 因為是非線性，題目若提「可能扭曲線性關係」，這句是對的
---
### 3.3.4 分佈轉換三兄弟怎麼選？
```text
右偏、正值、想先簡單壓縮大值？
→ log transform
右偏、正值、想更彈性地估計轉換強度？
→ Box-Cox transform
分佈超怪、異常值多、想直接映成 uniform / normal？
→ QuantileTransformer
```
ASCII 視覺化：
```text
原始右偏                log / Box-Cox 後          Quantile 後（近 uniform）
頻數                    頻數                      頻數
 ^                       ^                         ^
 | ****                  |   ***                   | ***
 | ***                   |  ****                   | ***
 | **                    | ****                    | ***
 | *                     |  ***                    | ***
 | *                     |   **                    | ***
 +------------> x        +------------> x          +------------> x
```
---
### 3.4 特徵工程決策流程：看資料特徵選轉換
本課的`特徵工程（Feature Engineering）`重點，不是做花俏招式，而是根據資料分佈去選正確轉換。
你至少要看三件事：
1. 量級差異大不大？
2. 有沒有異常值？
3. 分佈是否右偏、長尾、怪形狀？
#### Decision Tree
```text
開始
 │
 ├── 需要固定到 [0,1] 嗎？
 │      ├── 是 → MinMaxScaler
 │      └── 否
 │
 ├── 異常值很多嗎？
 │      ├── 是 → RobustScaler
 │      └── 否
 │
 ├── 只是想統一量級、看偏離平均？
 │      ├── 是 → StandardScaler
 │      └── 否
 │
 ├── 分佈明顯右偏且資料都 > 0 嗎？
 │      ├── 是 → log transform 或 Box-Cox
 │      └── 否
 │
 ├── 分佈很怪、離群多、想映到 uniform / normal？
 │      ├── 是 → QuantileTransformer
 │      └── 否 → 保留原尺度或只做必要縮放
 │
 結束
```

> 📊 **特徵工程轉換選擇決策流程圖**
> → 詳見 [diagrams/transform-decision-tree.mmd](diagrams/transform-decision-tree.mmd)

#### 情境判斷 1：薪資欄位
- 特徵：正值、右偏、少數超高薪
- 可選：`對數轉換（Log Transform）`或`Box-Cox 轉換（Box-Cox Transform）`
🗣️ 白話說明：台北房租或薪資很常長這樣。大多數人集中在一段區間，少數值衝很高。這種資料直接畫圖常常右尾超長，看起來像一條拖尾巴的魚，先做 log 會比較好讀。
#### 情境判斷 2：感測器欄位要壓到 [0,1]
- 特徵：後續系統只收 `[0,1]`
- 可選：`最小最大正規化（Min-Max Normalization）`
#### 情境判斷 3：消費資料混了豪客異常值
- 特徵：正常消費 100 到 300，偶爾跳出 20,000
- 可選：`穩健縮放（Robust Scaling）`
#### 情境判斷 4：多欄位量級差異很大
- 特徵：年收入、登入次數、停留秒數一起分析
- 可選：`標準化（Standardization）`
#### 情境判斷 5：分佈非常扭曲
- 特徵：多峰、長尾、離群明顯，想映到常態型分佈
- 可選：`分位數轉換（Quantile Transform）`
🔥🔥 高頻判斷心法：
- 「範圍」問題 → 先想 Min-Max
- 「尺度」問題 → 先想 StandardScaler
- 「異常值」問題 → 先想 RobustScaler
- 「右偏」問題 → 先想 log / Box-Cox
- 「分佈很醜」問題 → 先想 QuantileTransformer
---
### 3.5 sklearn.preprocessing 程式碼範例
這裡不是要你背完整語法，而是要你看得懂每段程式碼在做什麼。
#### 範例 1：StandardScaler
```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
# 訓練集：學 mean / std 並轉換
X_train_scaled = scaler.fit_transform(X_train)
# 測試集：只套用同一組參數
X_test_scaled = scaler.transform(X_test)
```
重點解讀：
- `fit_transform(X_train)` = 先算訓練集的平均數、標準差，再轉換
- `transform(X_test)` = 只套用訓練集學到的參數
#### 範例 2：MinMaxScaler
```python
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler(feature_range=(0, 1))
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```
重點解讀：
- 會用訓練集學到的 `min`、`max`
- 測試集不能重新 `fit`
#### 範例 3：RobustScaler
```python
from sklearn.preprocessing import RobustScaler
scaler = RobustScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```
重點解讀：
- 用的是 `median` 和 `IQR`
- 異常值多時常比 `StandardScaler` 穩
#### 範例 4：QuantileTransformer
```python
from sklearn.preprocessing import QuantileTransformer
qt = QuantileTransformer(output_distribution="normal", random_state=42)
X_train_qt = qt.fit_transform(X_train)
X_test_qt = qt.transform(X_test)
```
重點解讀：
- 目標是映到類常態分佈
- 屬於非線性轉換
#### 範例 5：PowerTransformer
```python
from sklearn.preprocessing import PowerTransformer
pt = PowerTransformer(method="box-cox", standardize=True)
X_train_pt = pt.fit_transform(X_train_positive)
X_test_pt = pt.transform(X_test_positive)
```
重點解讀：
- `method="box-cox"` 代表使用`Box-Cox 轉換（Box-Cox Transform）`
- 需要正值資料
- 預設還會再做標準化
#### fit、transform、fit_transform 三者關係圖
```text
fit(X_train)
  └── 從訓練資料學參數
      ├── mean / std
      ├── min / max
      ├── median / IQR
      └── quantiles / lambda
transform(X)
  └── 套用已學到的參數
fit_transform(X_train)
  └── fit + transform
```
🗣️ 白話說明：這就像你先看公司去年薪資資料，定出「高、中、低」標準，再拿今年新人去套同一把尺。你不能看一批人就重算一次標準，不然每一屆都用不同規則，最後根本比不出來。
🔥🔥 考點：訓練集 `fit`，測試集 `transform`。把測試集拿去 `fit`，會造成資料洩漏風險觀念上的錯誤。

> 📊 **sklearn.preprocessing API 全覽圖**
> → 詳見 [diagrams/sklearn-preprocessing-api.mmd](diagrams/sklearn-preprocessing-api.mmd)

---
## Section 4: Comparison Tables (易混淆概念)
### 4.1 標準化 vs 正規化（Standardization vs Normalization）
| 概念 | 標準化（Standardization, z-score） | 正規化（Normalization, Min-Max 常見） |
|------|------------------------------------|----------------------------------------|
| 核心目的 | 讓資料以平均數 0、標準差 1 為尺度 | 把資料壓到固定範圍，常見為 `[0,1]` |
| 常見公式 | `z = (x − μ) / σ` | `x' = (x − x_min) / (x_max − x_min)` |
| 輸出範圍 | 無固定範圍 | 常見固定為 `[0,1]` |
| 中心概念 | 看偏離平均多少 | 看相對最小值與最大值的位置 |
| 對異常值敏感度 | 高 | 很高 |
| 適用情境 | 量級差很大、距離敏感分析、PCA 前常見 | 需要固定範圍、已有明確上下界 |
| 常見誤解 | 被誤叫成 normalizing | 容易被誤當成 z-score |
### 4.2 StandardScaler vs MinMaxScaler vs RobustScaler
| 概念 | StandardScaler（z-score） | MinMaxScaler（min-max） | RobustScaler（IQR） |
|------|--------------------------|------------------------|---------------------|
| 公式 | `(x−μ)/σ` | `(x−min)/(max−min)` | `(x−median)/IQR` |
| 輸出範圍 | 無固定範圍；是否多落在幾個 σ 內取決於資料分佈 | `[0, 1]` 或指定範圍 | 無固定範圍 |
| 中心與尺度 | mean / std | min / max | median / IQR |
| 異常值影響 | 高 | 極高 | 低 |
| 適用場景 | 量級差異大、距離型或梯度型模型前常用 | 需要固定範圍 | 資料含異常值 |
| 最大風險 | 被異常值拉歪 | min/max 被異常值破壞 | 不保證固定範圍 |
| sklearn 類別 | `StandardScaler` | `MinMaxScaler` | `RobustScaler` |
### 4.3 log transform vs Box-Cox vs QuantileTransformer
| 概念 | 對數轉換（Log Transform） | Box-Cox 轉換（Box-Cox Transform） | 分位數轉換（QuantileTransformer） |
|------|---------------------------|-----------------------------------|-----------------------------------|
| 類型 | 非線性分佈壓縮 | 冪次轉換 | 分位數映射 |
| 核心想法 | 壓縮大值、縮短右尾 | 用 `λ` 彈性調整右偏正值分佈 | 依排序把資料映到 uniform 或 normal |
| 公式 / 流程 | `ln(x)` 或 `ln(x+1)` | `(x^λ−1)/λ`，`λ=0` 為 `ln(x)` | 先 ECDF，再映到目標分佈 |
| 資料條件 | `ln(x)` 需 `x>0`；有 0 時用 `log1p` | 需 `x>0` | 幾乎任何數值資料都可，但屬非線性 |
| 適用場景 | 右偏、倍率差距大 | 右偏且正值、想比 log 更彈性 | 分佈很怪、長尾重、想映到指定分佈 |
| 優點 | 簡單、直觀、常見 | 可由資料估計 `λ` | 能強力調整分佈形狀 |
| 代價 / 風險 | 負值無法直接用 | 不是萬用；需正值 | 可能扭曲線性關係 |
| sklearn 關聯 | 可搭配 `numpy.log` / `numpy.log1p` | `PowerTransformer(method="box-cox")` | `QuantileTransformer` |
---
## Section 5: 口訣 / Mnemonics
### 5.1 標準化 vs 正規化
口訣：**「標準看平均，正規看區間」**
- `標準化（Standardization）`：看你離平均多遠。
- `正規化（Normalization）`：看你在最小到最大之間站哪裡。
延伸記法：
- **標**準化 → 有「標」尺 → 先找平均與標準差
- **正**規化 → 排成「正」常範圍 → 常見壓到 `[0,1]`
### 5.2 哪種轉換修哪種分佈問題
口訣：**「右偏用 log，正值可 Box，怪形用 Quantile」**
- `右偏（Right Skew）`又明顯正值 → `log transform`
- `右偏（Right Skew）`而且想更彈性 → `Box-Cox transform`
- 分佈真的很怪、不只偏一點點 → `QuantileTransformer`
### 5.3 sklearn API 記法
口訣：**「Standard 看 z，MinMax 看 0 到 1，Robust 看 IQR」**
- `StandardScaler` → `z-score`
- `MinMaxScaler` → `0~1`
- `RobustScaler` → `median / IQR`
### 5.4 fit / transform 記法
口訣：**「fit 是學規則，transform 是套規則」**
- `fit()`：學資料參數
- `transform()`：用已學參數轉換
- `fit_transform()`：先學再轉
### 5.5 Box-Cox 特例記法
口訣：**「Box-Cox，零變 log；一變偏移」**
- `λ = 0` → `log`
- `λ = 1` → 線性偏移，形狀不變
---
## Section 6: 考試陷阱 (Exam Traps)
❌ 陷阱：`正規化（Normalization）就是 z-score`
✅ 正解：`z-score` 是`標準化（Standardization）`，公式是 `z = (x − μ) / σ`。很多人會混淆，是因為中文口語常把各種 scale 都叫「正規化」，但在考題裡要分清楚：`Min-Max` 才是常見的`正規化（Normalization）`。
❌ 陷阱：`資料有異常值，用 MinMaxScaler 最安全`
✅ 正解：有異常值時，`MinMaxScaler` 通常不是最安全，因為 `min` 與 `max` 會直接被極端值拉偏。這時更應優先考慮`穩健縮放（Robust Scaling, RobustScaler）`，因為它使用 `median` 與 `IQR`。
❌ 陷阱：`Box-Cox 對所有資料都適用`
✅ 正解：`Box-Cox 轉換（Box-Cox Transform）`要求 `x > 0`，而且 `λ` 通常要從資料估計。它是「右偏正值資料」的選項，不是萬用萬靈丹。很多人誤會，是因為它常出現在分佈修正題裡，但不是每題都該選它。
❌ 陷阱：`fit_transform 和 transform 一樣，只是寫法不同`
✅ 正解：`fit_transform()` = 先計算參數再轉換；`transform()` = 只套用已計算好的參數，不重新計算。這個差別非常重要，因為訓練集應 `fit`，測試集應 `transform`。
❌ 陷阱：`log transform 和 Box-Cox 是一樣的`
✅ 正解：`對數轉換（Log Transform）`是`Box-Cox 轉換（Box-Cox Transform）`在 `λ = 0` 的特例。也就是說，log 是 Box-Cox 的其中一個特殊情況，但兩者不完全相同。
❌ 陷阱：`log1p(x) = log(x) + 1`
✅ 正解：`log1p(x)` 是 `ln(x+1)`，不是 `ln(x) + 1`。這是很常見的公式陷阱，尤其在資料包含 0 時特別重要。
❌ 陷阱：`StandardScaler 會把資料壓到 0 到 1`
✅ 正解：`StandardScaler` 會讓資料以平均數 0、標準差 1 為尺度，但輸出沒有固定上下界。若題目強調 `[0,1]`，那應該想到的是 `MinMaxScaler`。
❌ 陷阱：`QuantileTransformer 只是另一種線性縮放`
✅ 正解：`QuantileTransformer` 是非線性轉換。它依據排序與分位數做映射，因此可能改變原本的線性關係。它不是把資料等比例壓縮而已。
---
## Section 7: 情境題快速判斷 (Scenario Quick-Judge)
### 7.1 關鍵字對答案
🔑 看到關鍵字 → 選這個答案
- 「資料右偏、正值」→ `對數轉換（Log Transform）` 或 `Box-Cox 轉換（Box-Cox Transform）`
- 「資料右偏、全部大於 0、想更彈性調整」→ `Box-Cox transform`
- 「資料含 0，但仍想做類 log 壓縮」→ `log1p(x) = ln(x+1)`
- 「異常值多」→ `RobustScaler`
- 「需要 `[0,1]` 輸出範圍」→ `MinMaxScaler`
- 「想統一量級、平均 0 標準差 1」→ `StandardScaler`
- 「PCA 前常需先做前處理」→ `StandardScaler`
- 「分佈很怪、想映到 uniform 或 normal」→ `QuantileTransformer`
- 「sklearn 訓練集 fit，測試集 transform」→ 避免重新估參數的正確流程
### 7.2 題型快判表
| 題目線索 | 快速判斷 |
|----------|----------|
| 「輸出落在 0 到 1」 | `MinMaxScaler` |
| 「離平均值多遠」 | `z-score / StandardScaler` |
| 「有很多極端大值」 | `RobustScaler` 或先考慮分佈轉換 |
| 「右偏、金額、流量、次數跨度大」 | `log transform` |
| 「右偏且正值，題目特別提 power transform」 | `Box-Cox transform` |
| 「想把資料映成常態型」 | `QuantileTransformer(output_distribution="normal")` |
| 「fit_transform vs transform」 | 前者先學參數，後者只套用 |
### 7.3 30 秒考場流程
```text
先看題目在問什麼
   │
   ├── 問範圍？ → MinMax
   ├── 問平均 0 / 標準差 1？ → StandardScaler
   ├── 問異常值？ → RobustScaler
   ├── 問右偏正值？ → log / Box-Cox
   ├── 問映到 uniform / normal？ → QuantileTransformer
   └── 問 API：train fit、test transform
```
🗣️ 白話說明：考場上不要一看到 transformation 就腦中自動跳 `Box-Cox`。先像在滑蝦皮篩選商品一樣，先看關鍵條件：要不要固定範圍？有沒有異常值？是不是右偏？資料有沒有 0？這樣選才快。
---
## Section 8: 結尾：快速自我檢查 ✅
用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。
- [ ] 我能在 30 秒內默寫出 **z-score 標準化（Standardization）** 公式 `z = (x − μ) / σ`，並說出它輸出無固定範圍。
- [ ] 我能在 30 秒內默寫出 **Min-Max 正規化（Min-Max Normalization）** 公式 `x' = (x − x_min) / (x_max − x_min)`，並說出它常把資料壓到 `[0,1]`。
- [ ] 我能在 30 秒內說出 **RobustScaler** 的核心是 `median` 與 `IQR`，公式是 `x' = (x − median) / IQR`。
- [ ] 我能在 30 秒內說出 **log transform** 適合右偏資料，且資料含 0 時可改用 `log1p(x) = ln(x+1)`。
- [ ] 我能在 30 秒內說出 **Box-Cox transform** 的公式、`λ=0` 會退化成 log、而且它要求 `x > 0`。
- [ ] 我能在 30 秒內說出 **QuantileTransformer** 是依分位數把資料映到 `uniform` 或 `normal`，且它是非線性轉換。
- [ ] 我能在 30 秒內根據「需要 `[0,1]` / 異常值多 / 量級差大 / 右偏正值」判斷該選哪一種轉換。
- [ ] 我能在 30 秒內解釋 **fit / transform / fit_transform** 的差異，並知道訓練集要 `fit`、測試集只 `transform`。
- [ ] 我能在 30 秒內分清楚 **標準化（Standardization）** 與 **正規化（Normalization）** 不是同義詞。
> 📌 本題範圍不包括：SMOTE / 特徵選擇（屬 `L23301`）；PCA / SVD 推導（屬 `L23102`）；特定 ML 演算法的分佈假設（屬 `L23101`）。
