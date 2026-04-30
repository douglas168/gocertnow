# L22302 常見的大數據分析方法 — Study Guide v2

## 0. How to Use This Guide

這份指南的讀法很簡單：先看第 1 節的全貌，再逐一讀 `k-means`、`決策樹`、`模式識別`、`資料不平衡`、`評估指標`。最後用第 8 到第 10 節練情境判斷。

考試時不要只背名詞。這一課最常考的是：題目給一個資料情境，你能不能判斷該用哪個方法、哪個指標、哪個處理策略。

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

建議順序：

```text
第 1 節全貌
→ 第 2-7 節核心概念
→ 第 8 節決策樹
→ 第 9 節陷阱
→ 第 10 節練題
→ Final Oral Recall
```

本課邊界也要記住：重點是 `k-means`、`決策樹`、`模式識別`、`資料不平衡處理` 與不平衡資料的評估指標。不需要展開 `Spark`、`ETL`、`streaming pipeline`、`PCA`、特徵值分解或進階數學推導。

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

L22302 考的是「資料情境 → 分析方法」的判斷。你要先看資料有沒有標籤，再看任務是找相似群體、依規則判斷，還是處理少數類太少的問題。

### Everyday Analogy

像主管丟給你三種任務：把會員自然分群、判斷誰會流失、抓出很少見的詐欺交易。三個任務聽起來都叫分析，但要用的方法完全不同。

### 在整體流程中的位置

```text
資料情境
→ 判斷有沒有標籤
→ 選 k-means / 決策樹 / 不平衡處理策略
→ 選合適評估指標
→ 解讀結果與避開陷阱
```

### Key Concepts

先用三問法看整章：

```text
1. 沒有標籤，想找自然群體？
   → k-means 分群（k-means clustering）

2. 有標籤，想依條件做判斷，而且要能解釋？
   → 決策樹（Decision Tree）

3. 正類很少，類別比例差很多？
   → 資料不平衡處理 + Precision / Recall / F1 / AUC
```

| 題目問的是 | 想到 |
|---|---|
| 沒有標籤、客群切分、找相似群體 | `k-means 分群` |
| 有標籤、if-then、條件切分、可解釋規則 | `決策樹` |
| 找相似性或資料輪廓 | `分群式模式識別` |
| 用條件規則做判斷 | `規則式模式識別` |
| 正類只有 1%、少數類抓不到 | `資料不平衡` |
| Accuracy 很高但少數類沒抓到 | 改看 `Precision / Recall / F1` |

### Exam Rule

```text
沒有標籤 / 自然群體 / cluster / centroid → k-means
if-then / root / leaf / gini / entropy / pruning → 決策樹
正類稀少 / 類別比例差很多 → 不平衡資料處理
先 resample 再切 train/test → 資料洩漏
```

### Quick Check

公司有會員交易資料，但沒有任何「高價值會員」標籤，只想先把相似消費型態的人分成幾群。應優先想到哪個方法？

答案：`k-means 分群`。因為題目沒有標籤，而且任務是找自然形成的相似群體。

## 2. k-means 分群（k-means clustering）🔥🔥🔥

### 先懂一句話

`k-means 分群` 是一種 `非監督式學習（Unsupervised Learning）` 方法，用來把沒有標籤的資料依相似性分成 `k` 群。它不是預測數值，也不是用已知答案訓練分類器。

### Everyday Analogy

像老師要把學生分成幾組，但沒有先給「文組、理組、商管組」標籤，只能看興趣、成績、活動紀錄，把相似的人自然放在一起。

### 在整體流程中的位置

```text
無標籤資料
→ 選定 k
→ 初始化群中心
→ 指派資料點到最近中心
→ 更新群中心
→ 收斂後得到群編號與群輪廓
```

### Key Concepts

`k-means` 的標準流程可以背成：**先放中心，再分配，再更新**。

1. 初始化 `k` 個群中心（centroid）
2. 每個資料點指派到最近的中心
3. 對每群重新計算平均值，作為新中心
4. 重複指派與更新，直到中心幾乎不再移動

```text
開始
 │
 ├─ 初始化 k 個中心
 ├─ 指派每個點到最近中心
 ├─ 更新群中心 = 群內平均值
 └─ 中心還有明顯移動嗎？
       ├─ 是 → 回去重新指派
       └─ 否 → 結束
```

`k-means` 的目標是最小化 `群內平方和（Sum of Squared Errors, SSE）`，也常叫 `inertia`。

```text
固定 k 時：
SSE / inertia 越小
→ 每群裡面的點越靠近自己的群中心
→ 群內越緊密
```

但跨不同 `k` 比較時要小心：`k` 越大，SSE 通常越容易下降，所以不能只說「SSE 最小就最好」。選 `k` 常用 `手肘法（Elbow Method）`。

```text
SSE
│\
│ \
│  \
│   \__
│      \__
└────────── k
      ^
    手肘點
```

| 概念 | 考試要懂的意思 |
|---|---|
| `centroid` | 群中心，每群的平均代表 |
| `SSE / inertia` | 群內點到群中心的平方距離總和 |
| `convergence` | 中心變化很小，演算法停下來 |
| `local minimum` | 停下來不代表全域最佳 |
| `k-means++` | 改善初始化，讓起始中心較不會太集中 |
| `Elbow Method` | 選 `k` 的常用啟發式方法，不保證唯一正解 |

`k-means++` 的重點是改善初始中心選法。它會用與距離平方相關的方式選下一個中心，讓中心比較分散，通常比純隨機更穩定。但它沒有改變 `k-means` 的核心目標，也不保證一定得到全域最佳。

常見限制：

| 限制 | 白話理解 |
|---|---|
| 要先決定 `k` | 題目沒有直接告訴你分幾群時要用方法輔助判斷 |
| 對初始中心敏感 | 起點不同，結果可能不同 |
| 對異常值敏感 | 極端點會拉動群中心 |
| 偏好球狀、大小相近的群 | 形狀很怪的資料未必適合 |

### Exam Rule

```text
unlabeled / cluster / segmentation / centroid → k-means
SSE / within-cluster sum of squares / inertia → k-means 目標函數
選 k / 折線圖轉折 / elbow → 手肘法
會收斂但不一定全域最佳 → local minimum
k-means++ → 改善初始化，不是改目標函數
```

### Quick Check

題目說：某分群演算法會反覆「指派最近中心」與「更新中心」，目標是最小化 inertia。這是在描述什麼？

答案：`k-means 分群`。因為 inertia / SSE、群中心與反覆更新都是 k-means 的關鍵字。

## 3. 決策樹（Decision Tree）🔥🔥🔥

### 先懂一句話

`決策樹` 是一種 `監督式學習（Supervised Learning）` 方法，會根據特徵逐層切分資料，最後在葉節點輸出類別或數值。本課最常考它的可解釋性、分裂準則、過擬合與剪枝。

### Everyday Analogy

像店長判斷要不要發優惠券：先問「最近 30 天有消費嗎？」再問「客單價是否超過 500？」一路照條件往下走，最後得到一個決策。

### 在整體流程中的位置

```text
有標籤資料
→ 根據特徵找最佳切分
→ 形成 root / internal node / leaf
→ 輸出分類或預測值
→ 用剪枝降低過擬合
```

### Key Concepts

基本結構：

```text
根節點（Root）
   │
   ├─ 條件成立
   │    └─ 內部節點（Internal Node）
   │          ├─ 條件成立 → 葉節點（Leaf Node）
   │          └─ 條件不成立 → 葉節點（Leaf Node）
   │
   └─ 條件不成立
        └─ 葉節點（Leaf Node）
```

| 名詞 | 意思 |
|---|---|
| `Root Node` | 第一個分裂點 |
| `Internal Node` | 中間判斷節點 |
| `Leaf Node` | 最終輸出結果的位置 |
| `if-then rule` | 決策路徑可以轉成條件規則 |

決策樹每次切分都在問：哪個切法能讓切完後的節點更純？

| 概念 | 考試重點 |
|---|---|
| `吉尼不純度（Gini Impurity）` | 衡量節點混雜程度，越低越純 |
| `熵（Entropy）` | 衡量不確定性，越低越純 |
| `資訊增益（Information Gain）` | 切分前後不確定性下降多少，常和 Entropy 一起出現 |

**Gini 不純度公式**（考試可能要求手算）：

```text
Gini = 1 − Σ pᵢ²
pᵢ 為各類別在該節點中的比例

範例：某節點有 60% A 類、40% B 類
Gini = 1 − (0.6² + 0.4²) = 1 − (0.36 + 0.16) = 0.48
純節點（全部同類）Gini = 0
```

**資訊熵（Entropy）公式**（考試可能要求手算）：

```text
H = −Σ pᵢ log₂(pᵢ)
pᵢ 為各類別在該節點中的比例

範例：某節點有 60% A 類、40% B 類
H = −(0.6 × log₂(0.6) + 0.4 × log₂(0.4))
  ≈ −(0.6 × (−0.737) + 0.4 × (−1.322))
  ≈ 0.971
純節點（全部同類）Entropy = 0
```

> sklearn 中 `DecisionTreeClassifier` 預設使用 `criterion='gini'`；若題目出現 `criterion='entropy'` 則使用資訊熵。

```text
節點很混亂 → 不純
節點幾乎都同一類 → 純
好的切分 → 讓子節點更純
```

決策樹多半採用 `貪婪式分裂（Greedy Split）`。意思是每一層都選當下看起來最好的切分，不會把所有可能的整棵樹都算完再選。因此它實用、好解釋，但不保證找到全域最佳樹結構。

如果樹一直往下切，會產生 `過擬合（Overfitting）`：

```text
訓練資料表現很好
→ 新資料表現變差
→ 可能是樹太深、記住太多細節
```

解法是 `剪枝（Pruning）`，目的不是讓圖變漂亮，而是降低過擬合，讓模型對新資料更穩定。

### Exam Rule

```text
有標籤 / if-then / 條件切分 / 可解釋規則 → 決策樹
gini / entropy / information gain → 決策樹分裂準則
每次選當下最佳切分 → greedy split
訓練好、測試差、樹太深 → overfitting
刪掉不重要分支、降低過擬合 → pruning
```

### Quick Check

題目說模型可以轉成 if-then 規則，而且每次分裂都想讓子節點更純。這最可能是哪個方法？

答案：`決策樹`。因為 if-then 規則、節點純度、Gini / Entropy 都是決策樹線索。

## 4. 模式識別（Pattern Recognition）🔥🔥

### 先懂一句話

`模式識別` 是從資料中找出規律、結構或分類方式。在本課資料分析脈絡中，最重要的是分清楚「看相似性」和「看條件規則」。

### Everyday Analogy

像你看一群學生，可以用兩種方式整理：一種是看誰跟誰興趣相似，把他們分群；另一種是訂出規則，例如「數學高且程式經驗多 → 適合資料組」。

### 在整體流程中的位置

```text
資料
→ 想辨認規律
→ 看相似性或條件規則
→ 選分群式或規則式模式識別
```

### Key Concepts

```text
模式識別
│
├─ 看相似性
│  └─ 分群式模式識別（Cluster-based Pattern Recognition）
│     └─ 代表：k-means
│
└─ 看條件規則
   └─ 規則式模式識別（Rule-based Pattern Recognition）
      └─ 代表：決策樹
```

| 類型 | 題目線索 | 代表方法 | 輸出 |
|---|---|---|---|
| 分群式模式識別 | 找自然群、看相似性、描述輪廓 | `k-means` | 群編號、群中心、群輪廓 |
| 規則式模式識別 | 看條件、要可解釋、能轉規則 | `決策樹` | if-then 規則、葉節點判斷 |

分群式例子：

```text
客群 A：高頻低客單
客群 B：低頻高客單
客群 C：新客但回購快
```

規則式例子：

```text
若 30 天內消費次數 > 3 且客單價 > 800
→ 高價值會員
```

### Exam Rule

```text
想找相似群體 / 自然輪廓 → 分群式模式識別
想要條件規則 / if-then 判斷 → 規則式模式識別
模式識別只出現在影像辨識 → 錯，本課是資料分析脈絡
群編號不等於真實標籤 → k-means 常見陷阱
```

### Quick Check

題目說要從會員資料中找出自然形成的消費輪廓，但沒有既有標籤。這比較像哪一種模式識別？

答案：`分群式模式識別`。因為題目是在看相似性與自然群體，不是在用條件規則做分類。

## 5. 資料不平衡處理策略（Imbalanced Data Handling Strategies）🔥🔥🔥

### 先懂一句話

`資料不平衡` 是指各類別樣本數差很多，例如詐欺交易只有 1%。這時模型可能只猜多數類也有高準確率，但真正重要的少數類完全抓不到。

### Everyday Analogy

像 100 個員工裡只有 3 個會離職。如果你每次都猜「不會離職」，準確率很高，但對 HR 來說完全沒用，因為真正想找的人一個都沒找到。

### 在整體流程中的位置

```text
有標籤分類資料
→ 發現類別比例差很多
→ 選 SMOTE / 欠採樣 / 類別權重
→ 只在 training split 或 training fold 內處理
→ 用 Precision / Recall / F1 / AUC 評估
```

### Key Concepts

常見不平衡例子：

| 場景 | 多數類 | 少數類 |
|---|---|---|
| 詐欺偵測 | 正常交易 | 詐欺交易 |
| 離職預測 | 未離職 | 離職 |
| 點擊預測 | 不點擊 | 點擊 |

三種處理策略要分清楚：

| 策略 | 做法 | 是否改資料筆數 | 主要風險 |
|---|---|---|---|
| `隨機過採樣（Random Oversampling）` | 重複抽少數類樣本 | 會增加 | 重複資訊太多，可能過擬合 |
| `SMOTE` | 在少數類鄰近樣本之間插值，合成新樣本 | 會增加 | 可能生成不理想樣本 |
| `欠採樣（Undersampling）` | 刪掉部分多數類樣本 | 會減少 | 可能丟掉重要資訊 |
| `類別權重（Class Weight）` | 提高少數類錯分代價 | 通常不改 | 效果依模型而定 |

`SMOTE（Synthetic Minority Over-sampling Technique）` 是高頻考點。它不是把少數類複製貼上，而是在少數類樣本和鄰近少數類樣本之間做插值，產生新的合成樣本。

```text
少數類點： a -------- b
              \ 新點 *

新點不是複製 a 或 b
而是落在 a 和 b 之間
```

公式概念：

```text
x_new = x_i + r × (x_zi - x_i)
其中 r ∈ [0, 1]，從均勻分佈 U(0,1) 隨機取樣
x_zi 是從 x_i 的 k 個最近少數類鄰居中隨機選取的一個
```

> 符號說明：SMOTE 插值係數使用 **r**（而非 λ，避免與 Box-Cox 的冪次參數 λ 混淆）。

這個公式適用於數值型特徵。若有類別型特徵，需考慮 `SMOTE-NC` 等變體。

最重要的資料洩漏規則：

```text
錯誤：
全資料 → SMOTE / 欠採樣 → train/test split

正確：
全資料 → train/test split → 只對 training split 做 SMOTE / 欠採樣
```

如果是交叉驗證，也是同一個原則：

```text
每個 training fold 內各自 resample
不能整份資料先一起 resample
```

實作 API 補充：`imbalanced-learn` 目前常用 `fit_resample(X, y)`；舊版 `fit_sample` 已移除。搭配 `imblearn.pipeline.Pipeline` 時，通常呼叫 `pipeline.fit(X_train, y_train)`，讓 Pipeline 在訓練 fold 內部處理重採樣。

### Exam Rule

```text
增加少數類、不是複製、插值生成 → SMOTE
直接重複少數類 → Random Oversampling
減少多數類 → Undersampling
不改資料筆數、改錯分代價 → Class Weight
先 resample 再切資料 → Data Leakage
resampling 只能在 training split / training fold 內做
```

### Quick Check

題目說某方法會提高少數類被錯分時的懲罰，但不直接增加或刪除資料筆數。這是哪一種策略？

答案：`類別權重（Class Weight）`。因為它改的是訓練時的錯誤代價，不是改資料數量。

## 6. 評估指標與任務情境選擇 🔥🔥🔥

### 先懂一句話

不平衡資料不能只看 `準確率（Accuracy）`。考試常要你根據「誤報成本高」或「漏報成本高」選 `Precision`、`Recall` 或 `F1-score`。

### Everyday Analogy

像警報系統：警報一響到底準不準，是 `Precision`；真正有危險時有沒有響，是 `Recall`。兩邊都要顧時，就看 `F1-score`。

### 在整體流程中的位置

```text
分類模型輸出
→ 檢查類別是否不平衡
→ 不只看 Accuracy
→ 依成本選 Precision / Recall / F1 / ROC AUC / PR Curve
```

### Key Concepts

| 指標 | 在看什麼 | 何時重視 |
|---|---|---|
| `Accuracy` | 全部預測中答對比例 | 類別較平衡時較有意義 |
| `Precision` | 判成正類的樣本中，有多少真的是正類 | 誤報成本高 |
| `Recall` | 真正正類中，有多少被抓到 | 漏報成本高 |
| `F1-score` | Precision 與 Recall 的調和平均 | 兩邊都要顧 |
| `ROC Curve` | 不同門檻下 TPR 對 FPR | 比較分類器整體區分能力 |
| `AUC` | ROC 曲線下面積 | 越大通常代表區分能力越好 |
| `PR Curve` | Precision 對 Recall | 正類稀少且是主要關注對象時很重要 |

Accuracy 可能誤導的例子：

```text
1000 筆資料
990 筆正常
10 筆詐欺

模型全部猜正常
Accuracy = 990 / 1000 = 99%

看起來很高
但詐欺一筆都沒抓到
```

情境選擇表：

| 任務 / 場景 | 輸入 | 輸出 | 常見答案 |
|---|---|---|---|
| 客群切分 | 無標籤會員資料 | 群編號、群輪廓 | `k-means` |
| 可解釋分類 | 有標籤資料 | if-then 規則、類別 | `決策樹` |
| 詐欺樣本很少 | 不平衡分類資料 | 更重視少數類 | `SMOTE / class_weight / Recall / F1` |
| 誤報成本高 | 分類模型 | 警報要準 | `Precision` |
| 漏報成本高 | 分類模型 | 少數類要抓到 | `Recall` |
| 同時看 Precision 與 Recall | 不平衡分類資料 | 綜合分數 | `F1-score` |

### Exam Rule

```text
Accuracy 很高但少數類抓不到 → Accuracy 可能誤導
誤報成本高 → Precision
漏報成本高 → Recall
綜合衡量 Precision 與 Recall → F1-score
TPR 對 FPR → ROC Curve
ROC 曲線下面積 → AUC
正類很稀少且主要關心正類 → PR Curve
```

### Quick Check

醫療篩檢題目說「漏掉病患的代價很高」，應優先重視哪個指標？

答案：`Recall`。因為 Recall 看真正正類中有多少被抓到，漏報成本高時要優先提高它。

## 7. 高頻比較表與記憶口訣 🔥🔥

### 先懂一句話

這一節是考前整理區。把容易混淆的概念放在同一張表裡，比單獨背定義更適合選擇題。

### Everyday Analogy

像考前把相似題型放在同一頁比較：不是為了背更多，而是為了看到題目關鍵字時不要選錯隔壁概念。

### 在整體流程中的位置

```text
讀完核心概念
→ 比較易混淆概念
→ 用口訣壓縮記憶
→ 進入決策樹與練題
```

### Key Concepts

#### k-means vs 決策樹

| 概念 | k-means 分群 | 決策樹 |
|---|---|---|
| 學習類型 | 非監督式學習 | 監督式學習 |
| 需要標籤嗎 | 不需要 | 需要 |
| 核心邏輯 | 最小化 SSE / inertia | 讓節點更純 |
| 輸出 | 群編號、群中心、群輪廓 | 樹狀規則、分類或數值 |
| 常見題目 | 客群分群、自然群體 | 條件判斷、可解釋規則 |
| 常見陷阱 | 以為能做數值預測 | 以為是在找自然群 |

#### SMOTE vs 欠採樣 vs 類別權重

| 概念 | SMOTE | 欠採樣 | 類別權重 |
|---|---|---|---|
| 主要做法 | 增加少數類合成樣本 | 減少多數類樣本 | 調整錯誤代價 |
| 是否改資料筆數 | 會增加 | 會減少 | 通常不改 |
| 優點 | 保留多數類資料 | 資料變少、訓練較快 | 不需合成或刪資料 |
| 風險 | 合成樣本可能不理想 | 可能丟掉重要資訊 | 效果依模型而定 |

#### Accuracy vs Precision vs Recall vs F1

| 概念 | 在看什麼 | 考試線索 |
|---|---|---|
| Accuracy | 整體答對比例 | 類別平衡才比較可靠 |
| Precision | 判成正類的準確度 | 誤報成本高 |
| Recall | 真正正類抓到多少 | 漏報成本高 |
| F1-score | Precision 與 Recall 的平衡 | 兩者都要顧 |

記憶口訣：

```text
k-means：先放中心，再分配，再更新
決策樹：一路切到更純，但別切到太蠢
模式識別：看相似，用分群；看條件，用規則
不平衡：少的補，多的減，不想動資料就加權
SMOTE：不複製，只在鄰居中間製
評估：失衡先別看 Acc，改看 PRF 與 AUC
```

### Exam Rule

```text
無標籤找群 → k-means，不是決策樹
有標籤可解釋規則 → 決策樹，不是 k-means
SMOTE → 插值合成，不是隨機複製
Class Weight → 改權重，不是改資料筆數
Accuracy 高 → 不代表少數類抓得好
```

### Quick Check

題目問：「模型要能產生可讀的 if-then 規則，且資料已有標籤。」應選 k-means 還是決策樹？

答案：`決策樹`。因為資料有標籤，而且題目強調可解釋條件規則。

## 8. Exam Decision Trees 🔥🔥🔥

### 8.1 方法選擇

```text
題目先問資料情境？
│
├─ 沒有標籤？
│  │
│  ├─ 想找相似群體 / 客群輪廓？
│  │  └─ 選 k-means 分群
│  │
│  └─ 問 centroid / inertia / elbow？
│     └─ 仍是 k-means
│
└─ 有標籤？
   │
   ├─ 想要 if-then / 條件切分 / 可解釋？
   │  └─ 選決策樹
   │
   └─ 類別比例差很多？
      └─ 加上不平衡資料處理與合適指標
```

### 8.2 k-means 題目判斷

```text
看到 k-means 題？
│
├─ 問目標函數？
│  └─ SSE / inertia / 群內平方和
│
├─ 問流程？
│  └─ 初始化中心 → 指派最近中心 → 更新中心 → 重複到收斂
│
├─ 問選 k？
│  └─ 手肘法 Elbow Method
│
└─ 問收斂？
   └─ 會收斂，但可能是局部最佳
```

### 8.3 不平衡資料處理

```text
題目說類別不平衡？
│
├─ 想增加少數類？
│  │
│  ├─ 直接複製少數類
│  │  └─ Random Oversampling
│  │
│  └─ 在少數類鄰居間插值
│     └─ SMOTE
│
├─ 想減少多數類？
│  └─ Undersampling
│
├─ 不想改資料筆數？
│  └─ Class Weight
│
└─ 題目說先 resample 再切資料？
   └─ Data Leakage
```

### 8.4 指標選擇

```text
題目問評估指標？
│
├─ 類別很平衡？
│  └─ Accuracy 可參考
│
├─ 類別很不平衡？
│  │
│  ├─ 誤報成本高？
│  │  └─ Precision
│  │
│  ├─ 漏報成本高？
│  │  └─ Recall
│  │
│  ├─ Precision 與 Recall 都要顧？
│  │  └─ F1-score
│  │
│  └─ 正類極稀少且重點是正類？
│     └─ PR Curve
│
└─ 問 TPR 對 FPR 或曲線下面積？
   └─ ROC Curve / AUC
```

## 9. Trap Clinic 🔥🔥🔥

### Trap 1：k-means 可以做數值預測

錯。`k-means` 是非監督式分群方法，重點是把資料分成群，不是輸出連續數值。

Exam fix：

```text
沒有標籤 / 找群 → k-means
預測數值 → 不是 k-means 的主要考點
```

### Trap 2：k-means 收斂就代表找到全域最佳

錯。收斂只代表演算法停下來，可能只是停在 `局部最佳（Local Minimum）`。

Exam fix：

```text
convergence → 會停
global optimum → 不保證
```

### Trap 3：手肘法能保證唯一正確的 k

錯。`手肘法` 是常用 `啟發式方法（Heuristic）`，不是保證唯一答案的數學規則。

Exam fix：

```text
elbow method → 選 k 的常用參考
不是保證唯一正解
```

### Trap 4：決策樹一次找出整棵樹的全域最佳切法

錯。決策樹多半是 `貪婪式分裂（Greedy Split）`，每次選當下最好的切分。

Exam fix：

```text
greedy split → 當下最佳
不是全域搜尋所有樹
```

### Trap 5：剪枝只是讓樹比較簡潔

錯。`剪枝（Pruning）` 的真正目的是降低 `過擬合（Overfitting）`，讓模型對新資料更穩定。

Exam fix：

```text
樹太深 / 訓練好測試差 → overfitting
降低 overfitting → pruning
```

### Trap 6：模式識別只會在影像辨識出現

錯。本課的模式識別是在資料分析脈絡中，重點是分群式與規則式。

Exam fix：

```text
看相似性 → 分群式模式識別
看條件規則 → 規則式模式識別
```

### Trap 7：SMOTE 就是複製少數類樣本

錯。`SMOTE` 是在少數類鄰近樣本之間插值，生成新的合成樣本。直接複製比較接近 `Random Oversampling`。

Exam fix：

```text
SMOTE → 插值合成
Random Oversampling → 重複抽樣
```

### Trap 8：先對整份資料 SMOTE 再切 train/test 比較方便

錯。這會造成 `資料洩漏（Data Leakage）`，測試資料資訊可能間接進入訓練過程。

Exam fix：

```text
正確流程 → 先 train/test split，再只對 training split resample
cross-validation → 只在每個 training fold 內 resample
```

### Trap 9：Accuracy 高就代表不平衡分類模型好

錯。極度不平衡時，模型只猜多數類也可能有很高 Accuracy，但少數類完全抓不到。

Exam fix：

```text
類別不平衡 → 不只看 Accuracy
補看 Precision / Recall / F1 / AUC / PR Curve
```

### Trap 10：Class Weight 和 SMOTE 都是在增加少數類樣本

錯。`Class Weight` 是改訓練時的錯誤代價，不直接生成新資料；`SMOTE` 才會新增合成樣本。

Exam fix：

```text
改權重、不改筆數 → Class Weight
插值新增少數類 → SMOTE
```

## 10. Practice Questions

### 10.1 k-means

**Q1.** 題目說資料沒有標籤，希望依相似性將會員分成幾群，最適合想到哪個方法？

答案：`k-means 分群`  
理由：無標籤且要找自然群體，是 k-means 的典型情境。

**Q2.** `k-means` 的目標函數常被稱為什麼？

答案：`群內平方和（SSE）` 或 `inertia`  
理由：k-means 想讓資料點離自己的群中心越近越好。

**Q3.** `k-means++` 的主要作用是什麼？

答案：改善初始中心選擇。  
理由：它讓起始中心較不會過度集中，但不改變 k-means 的核心目標。

**Q4.** 手肘法用來處理哪個問題？

答案：選擇合適的 `k`。  
理由：它看 `k` 與 SSE 的折線圖轉折點，是常用 heuristic。

**Q5.** `k-means` 收斂後一定得到全域最佳嗎？

答案：不一定。  
理由：它會收斂，但可能停在局部最佳。

### 10.2 決策樹與模式識別

**Q6.** 題目強調模型可轉成 if-then 規則，且資料有標籤，最可能是哪個方法？

答案：`決策樹`  
理由：決策樹會依條件切分，輸出可解釋規則。

**Q7.** `Gini Impurity` 與 `Entropy` 在決策樹中主要用來做什麼？

答案：作為分裂準則。  
理由：它們衡量節點混雜或不確定程度，幫助選擇更好的切分。

**Q8.** `Information Gain` 可以白話理解成什麼？

答案：切分後不確定性減少的量。  
理由：資訊增益越大，代表這次切分越能讓分類變清楚。

**Q9.** 決策樹太深，訓練表現很好但測試表現差，這叫什麼？

答案：`過擬合（Overfitting）`  
理由：模型記住訓練資料細節，對新資料泛化變差。

**Q10.** `Pruning` 的主要目的為何？

答案：降低過擬合。  
理由：剪枝刪掉貢獻不大的分支，使模型更穩定。

**Q11.** 題目說「看相似性找自然輪廓」，比較像哪種模式識別？

答案：`分群式模式識別`  
理由：它是用資料相似性找群體，代表方法是 k-means。

**Q12.** 題目說「看條件規則做判斷」，比較像哪種模式識別？

答案：`規則式模式識別`  
理由：它重視條件與可解釋規則，代表方法是決策樹。

### 10.3 資料不平衡與評估指標

**Q13.** 正類只有 1%，模型全部猜負類卻有高 Accuracy。這代表模型一定很好嗎？

答案：不一定。  
理由：類別不平衡時 Accuracy 可能誤導，少數類可能完全沒被抓到。

**Q14.** `SMOTE` 和隨機過採樣最大的差異是什麼？

答案：SMOTE 是插值合成新樣本，隨機過採樣是重複抽既有少數類樣本。  
理由：兩者都增加少數類，但產生資料的方式不同。

**Q15.** 想減少多數類資料量，應想到哪個策略？

答案：`欠採樣（Undersampling）`  
理由：欠採樣是從多數類中移除部分樣本。

**Q16.** 不想改變資料筆數，只想讓模型更重視少數類，應想到哪個策略？

答案：`類別權重（Class Weight）`  
理由：它調整錯分代價，不直接新增或刪除資料。

**Q17.** 為什麼不能先對整份資料做 SMOTE 再切 train/test？

答案：會造成 `資料洩漏（Data Leakage）`。  
理由：測試資料資訊可能間接影響訓練資料或破壞測試分布。

**Q18.** 誤報成本高時，應優先看哪個指標？

答案：`Precision`  
理由：Precision 看被判成正類的樣本有多少是真的正類。

**Q19.** 漏報成本高時，應優先看哪個指標？

答案：`Recall`  
理由：Recall 看真正正類中有多少被抓到。

**Q20.** 想綜合衡量 Precision 與 Recall，常用哪個指標？

答案：`F1-score`  
理由：F1 是 Precision 與 Recall 的調和平均。

**Q21.** `ROC Curve` 是畫哪兩個量的關係？

答案：`TPR` 對 `FPR`。  
理由：ROC 曲線觀察不同門檻下真正率與假正率的變化。

**Q22.** 正類極少且主要關心正類辨識表現時，除了 ROC AUC 還應特別注意哪條曲線？

答案：`PR 曲線（Precision-Recall Curve）`  
理由：PR 曲線直接聚焦 Precision 與 Recall，較能反映少數正類表現。

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. `k-means` 是非監督式分群：沒有標籤、找相似群體、最小化 `SSE / inertia`。
2. `k-means` 流程是初始化中心、指派最近中心、更新中心、重複到收斂；收斂不保證全域最佳。
3. `手肘法` 用來選 `k`，是 heuristic，不是唯一正解保證。
4. `決策樹` 是監督式方法：用 `Gini`、`Entropy` 或 `Information Gain` 讓節點更純，能轉成 if-then 規則。
5. 決策樹太深會過擬合，`Pruning` 的目的就是降低過擬合。
6. 模式識別要分清楚：看相似性用分群式，看條件規則用規則式。
7. 不平衡資料不要只看 Accuracy；少的可用 SMOTE 補，多的可欠採樣，不想改資料量就用 class weight，評估改看 Precision、Recall、F1、AUC 與 PR Curve。

## Final Study Advice

這一課不要用「背模型名」的方式準備。考試真正想測的是：你能不能先看題目描述的資料型態、標籤有無、輸出需求與錯誤成本，再選出正確方法、處理策略與評估指標。
