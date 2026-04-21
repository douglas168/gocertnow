# L22302 常見的大數據分析方法 學習指南
## Section 1: Exam Item Mapping
> 對應評鑑範圍：**L22302 常見的大數據分析方法** ＋ **L223 大數據分析方法與工具**
這一課考的不是背一串模型名稱，而是把題目情境翻譯成正確的分析方法。
L22302 在中級的核心就是三條線：
- `數據分析演算法`：高頻代表是 `k-means 分群（k-means clustering）` 與 `決策樹（Decision Tree）`
- `模式識別（Pattern Recognition）`：要會分辨題目是在找「相似群體」還是「判斷規則」
- `資料不平衡處理策略（Imbalanced Data Handling Strategies）`：要會比較 `SMOTE`、`欠採樣（Undersampling）`、`類別權重（Class Weight）` 與評估指標
你在考場常遇到的其實是這些判斷：
- 沒有標籤、想分群找輪廓 → 為什麼想到 `k-means 分群（k-means clustering）`
- 有標籤、想依條件做判斷 → 為什麼想到 `決策樹（Decision Tree）`
- 正類只有 1% → 為什麼不能只看 `準確率（Accuracy）`
- 題目提 `SMOTE` → 為什麼重點是插值生成，不是複製貼上
- 題目提「先 resample 再切 train/test」 → 為什麼這是 `資料洩漏（Data Leakage）`（定義與陷阱見 §3.6）
本課邊界要守住：
- 教的是分析方法與選用，不重講 `Spark`、`ETL`、`streaming pipeline`
- 教的是 `k-means`、`決策樹`、`模式識別`、`資料不平衡處理`
- 可以談 `Precision`、`Recall`、`F1-score`、`ROC AUC`，因為它們直接屬於不平衡資料判讀
- 不展開 `PCA（Principal Component Analysis）`、特徵值分解、進階數學推導
---
## Section 2: 關鍵概念總覽圖 (Knowledge Tree)
```text
🤖 L22302 常見的大數據分析方法
│
├── 📖 一、數據分析演算法（Analytics Algorithms）
│   ├── 📊 k-means 分群（k-means clustering）🔥🔥
│   │   ├── 無標籤資料（Unlabeled Data）
│   │   ├── 目標：最小化群內平方和（Sum of Squared Errors, SSE / inertia）
│   │   ├── 流程：初始化中心 → 指派最近中心 → 更新中心
│   │   ├── 收斂（Convergence）：會停，但可能停在局部最佳
│   │   ├── 初始化：random / k-means++ 🔥
│   │   ├── 選 k：手肘法（Elbow Method）🔥
│   │   └── 陷阱：分群不是預測數值
│   └── 🌳 決策樹（Decision Tree）🔥🔥
│       ├── 有標籤資料（Labeled Data）
│       ├── 核心：依條件逐層切分
│       ├── 分裂準則：吉尼不純度（Gini Impurity）、熵（Entropy）
│       │   └── 資訊增益（Information Gain）：Entropy 的衍生量
│       ├── 特性：可解釋、可轉 if-then 規則
│       ├── 貪婪式分裂（Greedy Split）
│       ├── 風險：過擬合（Overfitting）
│       └── 解法：剪枝（Pruning）🔥
│
├── 🔍 二、模式識別（Pattern Recognition）
│   ├── 分群式模式識別（Cluster-based Pattern Recognition）🔥
│   │   ├── 看相似性
│   │   ├── 代表：k-means
│   │   └── 陷阱：群編號不等於真實標籤
│   ├── 規則式模式識別（Rule-based Pattern Recognition）🔥
│   │   ├── 看條件規則
│   │   ├── 代表：決策樹
│   │   └── 陷阱：規則清楚不代表一定泛化最好
│   └── 陷阱：模式識別不是只在影像辨識出現
│
├── ⚖️ 三、資料不平衡處理策略（Imbalanced Data Handling Strategies）
│   ├── 不平衡資料（Imbalanced Data）🔥🔥
│   │   ├── 多數類（Majority Class）
│   │   └── 少數類（Minority Class）
│   ├── 過採樣（Oversampling）
│   │   ├── 隨機過採樣（Random Oversampling）
│   │   └── SMOTE（Synthetic Minority Over-sampling Technique）🔥🔥
│   ├── 欠採樣（Undersampling）🔥
│   ├── 類別權重（Class Weight）🔥
│   └── 資料洩漏（Data Leakage）🔥🔥
│       └── 規則：resample 只能在 training split / fold 內做
│
├── 📏 四、評估指標（Evaluation Metrics）
│   ├── 準確率（Accuracy）→ 類別失衡時可能誤導
│   ├── 精確率（Precision）🔥
│   ├── 召回率（Recall）🔥
│   ├── F1 分數（F1-score）🔥🔥
│   ├── ROC 曲線（Receiver Operating Characteristic Curve, ROC Curve）🔥
│   ├── AUC（Area Under the Curve, AUC）🔥
│   └── PR 曲線（Precision-Recall Curve）🔥
│
└── 🚨 五、高頻混淆
    ├── k-means = 分群，不是監督式預測
    ├── 決策樹 = 監督式切分，不是分群
    ├── SMOTE = 插值，不是複製
    ├── class_weight = 改權重，不是改資料筆數
    ├── accuracy 高，不一定模型好
    └── elbow method 是 heuristic，不是保證唯一正解
```
---
## Section 3: Core Concepts
### 3.1 主題全貌：這一課到底在考什麼？
`常見的大數據分析方法` 這一課，本質上在考你能不能從資料情境推回方法選用。
可以先用三問法理解整章：
1. 資料有沒有標籤？沒有標籤常走 `分群（Clustering）`
2. 有標籤而且要能解釋條件？常走 `決策樹（Decision Tree）`
3. 標籤分布差很多？要處理 `資料不平衡（Imbalanced Data）`
```text
資料情境
  │
  ├── 沒標籤、找相似群體
  │     └── k-means 分群（k-means clustering）
  ├── 有標籤、依條件判斷
  │     └── 決策樹（Decision Tree）
  └── 正負樣本差很多
        ├── SMOTE
        ├── 欠採樣
        ├── 類別權重
        └── 改看 Precision / Recall / F1 / AUC
```
🗣️ 白話說明：像你在公司接到三種任務。老闆說「把會員分成幾類看看」是分群；主管說「判斷誰會續約，而且要講得出原因」像決策樹；HR 說「離職的人很少，但我要優先抓出來」就是不平衡資料。
🔥🔥 中級最常考的不是公式硬算，而是「情境對方法」與「方法的限制」。
（各指標定義詳見 §3.7）
### 3.2 k-means 分群（k-means clustering）
#### 3.2.1 定義與用途
`k-means 分群（k-means clustering）` 是一種 `非監督式學習（Unsupervised Learning）` 方法，用來把沒有標籤的資料依相似性分成 `k` 群。
它的目標很直白：
- 同一群內的資料彼此接近
- 不同群之間盡量分開
🗣️ 白話說明：像你在看蝦皮會員資料，但沒有「高價值客戶」標籤，只能看下單頻率、客單價、回購週期，把相似的人自然湊成幾群。這就是 `k-means 分群（k-means clustering）` 的典型工作。
#### 3.2.2 目標函數：群內平方和（Sum of Squared Errors, SSE）
`k-means 分群（k-means clustering）` 想最小化的是 `群內平方和（Sum of Squared Errors, SSE）`，也常寫成 `inertia`。
概念是：
- 每個資料點都找最近的群中心
- 算到中心的距離平方
- 全部加總
```text
在固定 k 的條件下，SSE / inertia 越小
→ 每群裡面的點越集中
→ 分群結果越緊密

跨不同 k 時，SSE / inertia 幾乎一定會隨 k 增加而下降
→ 仍需搭配手肘法（Elbow Method）判讀最佳 k 值
```
ASCII 示意：
```text
群 A:   • • •
         • X
群 B:           • •
               X • •
X = 群中心（Centroid）
所有 • 到最近 X 的平方距離加總 = SSE
```
🗣️ 白話說明：你可以把群中心想成每組的「平均代表」，每個人離自己組代表越近，代表這組越像真的同一群。
🔥🔥 考試常把 `SSE`、`within-cluster sum of squares`、`inertia` 換字問，其實在考同一件事。
#### 3.2.3 演算法流程

> 📊 見圖：[K-Means 收斂流程](diagrams/kmeans-convergence.md)

`k-means 分群（k-means clustering）` 的標準流程可以背成：**先放中心，再分配，再更新**。
1. 初始化 `k` 個中心
2. 每個資料點指派到最近中心
3. 對每群重新計算平均值，作為新中心
4. 重複 2、3，直到中心幾乎不再移動
流程圖：
```text
開始
 │
 ├── 初始化 k 個中心
 ├── 指派每個點到最近中心
 ├── 更新各群中心 = 群內平均值
 └── 中心還有明顯移動嗎？
         ├── 是 → 回去重新指派
         └── 否 → 結束
```
🗣️ 白話說明：像分組報告一開始先選幾個組長，大家先站到最接近自己主題的組長旁；站完後，每組再重選一個更像「組內平均風格」的人當新組長，再重分一次。來回幾輪後隊形就穩了。
#### 3.2.4 收斂（Convergence）與局部最佳（Local Minimum）
`收斂（Convergence）` 是指重複更新後，中心點變化越來越小，最後停下來。
中級一定要記住兩句：
- `k-means 分群（k-means clustering）` 會收斂
- 但通常只保證收斂到 `局部最佳（Local Minimum）`，不保證 `全域最佳（Global Optimum）`
```text
會停下來 ≠ 一定是全世界最好的分群
收斂     ≠ 最佳答案唯一
```
🗣️ 白話說明：像你和朋友在台北找租屋，最後一定會定下一間，但那只是你們在目前搜尋路徑上找到的穩定解，不保證是整個台北最好的房。
🔥🔥 高頻考點：`k-means` 會收斂，但結果可能受初始中心影響。
#### 3.2.5 初始化（Initialization）與 k-means++
因為初始中心很重要，所以常見初始化方式有：
- `random`：隨機選起始中心
- `k-means++`：以與距離平方成比例的機率分佈（`D(x)^2`）逐步選取初始中心，確保中心不會過度集中，降低收斂到局部最優的風險
`k-means++` 的好處：
- 通常更快收斂
- 較不容易落在很差的起點
- 常被視為比純隨機更穩定的選擇
```text
不好初始化：X X      • • •       • • •
較好初始化：X   X    • • •       • • •
```
🗣️ 白話說明：如果一開始兩個中心都選在同一團人旁邊，等於一開始就偏科；`k-means++` 是讓起跑位置更合理。
🔥 常考觀念：`k-means++` 是改善初始化，不是改變核心目標。
#### 3.2.6 怎麼選 k？手肘法（Elbow Method）
`手肘法（Elbow Method）` 是選 `k` 的常見 `啟發式方法（Heuristic）`。
做法：
- 嘗試不同的 `k`
- 分別計算 `SSE`
- 畫出 `k` 對 `SSE` 的圖
- 找斜率明顯轉折的位置
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
🗣️ 白話說明：像把 Instagram 使用者分 2 群太粗、分 30 群又細到沒商業意義，`手肘法（Elbow Method）` 就是在找「夠細但還有意義」的折衷點。
🔥🔥 考試陷阱：`手肘法` 是常用方法，不是保證唯一正解。
#### 3.2.7 適用情境與限制
適用時機：
- 沒有標籤
- 想找客群、行為輪廓、相似群組
- 用距離衡量相似性是合理的
限制：
- 需要先決定 `k`
- 對初始化敏感
- 對異常值敏感
- 偏好球狀、大小相近的群
```text
看到這些線索，優先想到 k-means：
沒標籤 / 分群 / 客群切分 / cluster / centroid / inertia / elbow
```
❗ 邊界提醒：這裡只需懂 `k-means` 的分析邏輯，不需要展開 `PCA（Principal Component Analysis）` 或高維降維數學。
### 3.3 決策樹（Decision Tree）
#### 3.3.1 定義與用途
`決策樹（Decision Tree）` 是一種 `監督式學習（Supervised Learning）` 方法，會根據資料特徵逐層切分，最後把樣本導向某個葉節點，再輸出類別或數值。
在本課最重要的是把它理解成：
- 一種會依條件切分的分析方法
- 一種能轉成 `if-then` 規則的模式識別方法
🗣️ 白話說明：像便利商店店長在排促銷名單。先問「最近 30 天有沒有消費？」再問「單筆金額有沒有超過 500？」一路往下判斷，最後決定要不要推播優惠券。這條條件路徑就是 `決策樹（Decision Tree）` 的味道。
#### 3.3.2 基本結構
```text
根節點（Root）
   │
   ├── 條件成立
   │      └── 內部節點（Internal Node）
   │              ├── 條件成立 → 葉節點（Leaf Node）
   │              └── 條件不成立 → 葉節點（Leaf Node）
   │
   └── 條件不成立
          └── 葉節點（Leaf Node）
```
基本名詞：
- `根節點（Root Node）`：第一個分裂點
- `內部節點（Internal Node）`：中間判斷節點
- `葉節點（Leaf Node）`：最終輸出結果
#### 3.3.3 分裂準則：吉尼不純度（Gini Impurity）與熵（Entropy）

> 📊 見圖：[決策樹分裂準則比較](diagrams/decision-tree-split.md)

決策樹每次切分，都在找「切完之後更純」的方式。
最常見的兩個準則是：
- `吉尼不純度（Gini Impurity，criterion='gini'）`
- `熵（Entropy，criterion='entropy'）`
使用 `Entropy` 時，演算法最大化的量稱為 `資訊增益（Information Gain）`，它是 `Entropy` 的衍生量，而不是第三種獨立準則。
共同目標都是：
- 讓同一節點內的資料盡量屬於同一類
- 讓切分後的混亂程度下降
```text
節點很混亂 → 不純
節點幾乎都同類 → 純
好的切分 = 讓子節點更純
```
🗣️ 白話說明：很像你在分面試履歷，如果一切下去其中一邊幾乎都是工程職，代表這個條件切得很有效，因為純度提高了。
#### 3.3.4 資訊增益（Information Gain）
`資訊增益（Information Gain）` 可以理解成：
- 切分前有多亂
- 切分後還剩多少亂
- 中間減少的那一段，就是這次切分帶來的資訊價值
```text
資訊增益 = 切分前的不確定性 - 切分後各子節點不確定性的加權平均
```
如果題目問：
- 哪個特徵最能把資料分開
- 哪個切法讓分類更乾淨
通常就是在考 `資訊增益（Information Gain）` 或同類觀念。
🔥🔥 中級常見觀念題：決策樹不是亂切，而是每一步都選當下最有效的切分。
#### 3.3.5 貪婪式分裂（Greedy Split）
`決策樹（Decision Tree）` 多半採用 `貪婪式分裂（Greedy Split）`：
- 每一層都選當下看起來最好的切分
- 不會先把整棵樹所有可能組合全部算完
所以要記住：
- 它很實用、很快、很好解釋
- 但不是在保證全域最優樹結構
🗣️ 白話說明：像你在分組做簡報，先照眼前最合理的方式拆工作，而不是把未來 20 種分工組合全部列完才開始做。這就是 greedy。
#### 3.3.6 過擬合（Overfitting）與剪枝（Pruning）
如果樹一直往下切，可能把訓練資料記得太細，造成 `過擬合（Overfitting）`。
典型現象：
- 訓練資料表現很好
- 新資料表現反而下降
為了避免這件事，會做 `剪枝（Pruning）`。
概念上可分兩種理解：
- 先限制生長，例如限制深度或最小樣本數
- 先長出較大樹，再刪掉貢獻不大的分支
```text
過深的樹：
根
└─A
  └─B
    └─C
      └─D
剪枝後：
根
└─A
  ├─B
  └─C
```
🗣️ 白話說明：像你寫簡報時塞了太多枝節案例，結果主軸反而糊掉。剪枝就是把那些看似聰明、但泛化價值不高的分支刪掉。
🔥🔥 高頻考點：`剪枝（Pruning）` 的目的是降低過擬合，不是為了讓樹長得比較漂亮。
#### 3.3.7 優點與限制
優點：
- 可解釋性高
- 可以視覺化
- 容易轉成商業規則
限制：
- 樹太深容易過擬合
- 單棵樹對資料變動可能敏感
- 每一步是局部最佳，不保證全域最佳
```text
看到這些線索，優先想到決策樹：
if-then / 條件切分 / root / leaf / impurity / entropy / gini / pruning
```
### 3.4 模式識別（Pattern Recognition）
#### 3.4.1 核心意思
`模式識別（Pattern Recognition）` 指的是從資料中辨認出規律、結構或分類方式（此處依應用導向分類；學術慣例以監督式 vs 非監督式區分）。
在 L22302 的資料分析脈絡中，最值得掌握的是兩種：
- `分群式模式識別（Cluster-based Pattern Recognition）`
- `規則式模式識別（Rule-based Pattern Recognition）`
```text
模式識別
   │
   ├── 看相似性 → 分群式
   │             └── 代表：k-means
   └── 看條件規則 → 規則式
                 └── 代表：決策樹
```
🗣️ 白話說明：你可以把它想成兩副眼鏡。一副在看「誰跟誰像」；另一副在看「什麼條件會把人分開」。
#### 3.4.2 分群式模式識別（Cluster-based Pattern Recognition）
當題目特徵是：
- 沒有標籤
- 想找資料自然形成的群
- 想描述不同群的輪廓
這類就是 `分群式模式識別（Cluster-based Pattern Recognition）`。
常見輸出像：
- 客群 A：高頻低客單
- 客群 B：低頻高客單
- 客群 C：新客但回購快
🗣️ 白話說明：這像營運同事不是要你直接預測誰會買，而是先把會員分成幾種典型輪廓，方便後續策略分眾。
🔥 重點不是猜對真實答案，而是用資料自然結構找出有意義的群。
#### 3.4.3 規則式模式識別（Rule-based Pattern Recognition）
當題目特徵是：
- 要做判斷
- 要能說出「因為符合哪些條件」
- 希望規則能被人閱讀或實作成流程
這類就是 `規則式模式識別（Rule-based Pattern Recognition）`。
代表方法就是 `決策樹（Decision Tree）`。
例子：
```text
若 30 天內消費次數 > 3 且客單價 > 800
→ 高價值會員
若 30 天內無登入且客服抱怨次數 > 1
→ 流失風險較高
```
🗣️ 白話說明：很像公司在做名單分層，不只要分對，還要能跟行銷同事說明「為什麼這些人被歸成這群」。
#### 3.4.4 常見考法
高頻考法通常不是問抽象定義，而是給情境讓你選方法：
```text
想找自然分群 → 分群式模式識別
想要 if-then 規則 → 規則式模式識別
```
❗ 邊界提醒：本課的 `模式識別（Pattern Recognition）` 以資料分析應用為主，不需要展開影像辨識或深度學習架構。
### 3.5 資料不平衡（Imbalanced Data）與處理策略
#### 3.5.1 什麼是不平衡資料？
`不平衡資料（Imbalanced Data）` 指的是各類別樣本數差很多。
例如：
- 99% 是正常交易，1% 是詐欺交易
- 95% 是未離職，5% 是離職
- 98% 是不點擊，2% 是點擊
這時如果模型只會猜多數類，看起來也可能有很高的 `準確率（Accuracy）`，但少數類會被直接忽略。
🗣️ 白話說明：像公司 100 個員工裡只有 3 個要離職。如果你每次都猜「不會離職」，準確率還是很高，但你最想抓的人一個都沒抓到。
🔥🔥 高頻考點：不平衡問題的重點，不是總正確率，而是少數類有沒有被看見。
#### 3.5.2 隨機過採樣（Random Oversampling）
`隨機過採樣（Random Oversampling）` 是把少數類樣本重複抽出來，增加它的數量。
優點：
- 概念簡單
- 不會刪掉原有多數類資料
缺點：
- 可能讓模型太熟某些少數類樣本
- 容易增加重複資訊
```text
少數類原本：A A
過採樣後： A A A A A
```
🗣️ 白話說明：這像把同一份少數類案例影印很多份交給模型看，模型會覺得這些案例很重要，但資訊其實沒變多。
#### 3.5.3 SMOTE（Synthetic Minority Over-sampling Technique）

> 📊 見圖：[SMOTE 合成少數類別樣本](diagrams/smote-geometry.md)

`SMOTE（Synthetic Minority Over-sampling Technique）` 是一種 `過採樣（Oversampling）` 方法，但不是直接複製少數類，而是用鄰近少數類樣本之間做插值，合成新的樣本。
核心概念：
- 先找某個少數類樣本的鄰近少數類
- 在兩點之間隨機取一個位置
- 生成新的合成樣本
ASCII 示意：
```text
少數類點：   a -------- b
               \  新點 *
新點不是複製 a 或 b
而是落在 a 和 b 之間
```
公式概念：
```text
x_new = x_i + λ(x_zi - x_i)
其中 0 <= λ <= 1
```
注意：此公式適用於**數值型特徵**（numeric features）。類別型特徵需改用 `SMOTE-NC` 等變體。
🗣️ 白話說明：這不像把同一份履歷影印五份，而是根據兩位相似候選人的特徵，在中間合成一個合理的新樣本。
🔥🔥 高頻考點：
- `SMOTE` 用來增加少數類
- `SMOTE` 是合成，不是拷貝
- `SMOTE` 只能在訓練資料內做
#### 3.5.4 欠採樣（Undersampling）
`欠採樣（Undersampling）` 是從 `多數類（Majority Class）` 中拿掉一部分樣本，讓類別比例比較平衡。常用工具：`RandomUnderSampler`（imbalanced-learn）
優點：
- 資料量可能變小，訓練更快
- 能快速改善極端失衡
缺點：
- 可能丟掉有價值的多數類資訊
- 如果原本資料量就不大，風險更高
```text
多數類：M M M M M M M M
少數類：m m
欠採樣後：
多數類：M M
少數類：m m
```
🗣️ 白話說明：像你整理履歷庫，原本工程履歷 1000 份、設計履歷 50 份。欠採樣就是先減少工程履歷的一部分，讓模型不要被海量資料洗掉。
#### 3.5.5 類別權重（Class Weight）
`類別權重（Class Weight）` 是訓練時提高少數類錯分的代價，不直接改變資料筆數。
理解方式：
- `SMOTE` / `欠採樣（Undersampling）`：改資料分布
- `類別權重（Class Weight）`：改學習時的懲罰權重
🗣️ 白話說明：像主管跟你說 VIP 客戶的客訴漏掉一件，影響比一般客人大很多，你自然會把 VIP 案件看得更重。這就是 class weight 的精神。
🔥 高頻考點：`class_weight='balanced'` 是官方常見支援作法，而且不需要生成新資料。
#### 3.5.6 什麼時候選哪一種？

> 📊 見圖：[資料不平衡處理策略比較](diagrams/imbalance-strategy-comparison.md)

可以先這樣判斷：
- 少數類太少，但不想刪資料 → `SMOTE`
- 多數類太多，且想快速降量 → `欠採樣（Undersampling）`
- 不想改資料集，只想讓模型更重視少數類 → `類別權重（Class Weight）`
```text
不平衡處理策略
   │
   ├── 改少數類數量 → 過採樣 / SMOTE
   ├── 改多數類數量 → 欠採樣
   └── 不改資料量   → 類別權重
```
題庫若出現工具名稱（如 `RandomUnderSampler`、`SMOTE`）或 API 名稱（如 `fit_resample`），仍是在考這三種策略的實作形式，請對應回 §3.5 的概念架構。
### 3.6 資料洩漏（Data Leakage）與正確流程
#### 3.6.1 最常見錯誤：先 resample 再切資料
處理不平衡資料時，最常見的大雷是：
- 先對整份資料做 `SMOTE` 或 `欠採樣（Undersampling）`
- 再切成訓練集與測試集
若在切分前對完整資料集執行 `SMOTE`，合成樣本的插值鄰居可能來自測試集，造成測試集資訊間接影響訓練資料（真正的資料洩漏）。若在切分前執行 `RandomUnderSampler`，問題在於測試集的分佈遭到破壞，已無法代表真實資料分佈。兩種情況都應在 train/test split **之後**，僅對訓練集執行重採樣。
```text
❌ 錯誤流程
全資料 → SMOTE / 欠採樣 → train/test split
✅ 正確流程
全資料 → train/test split → 只對 training split 做 SMOTE / 欠採樣
```
🗣️ 白話說明：這就像你準備模擬考時，先偷看正式考卷答案，再回頭練習。後面分數看起來很高，但那不是實力。
🔥🔥 這是 L22302 必講陷阱，因為非常容易出判斷題。
**實作 API 補充（imbalanced-learn）**：執行重採樣的方法現在為 `fit_resample(X, y)`（舊版 `fit_sample` 已於 v0.8 移除）。若搭配 `imblearn.pipeline.Pipeline`，呼叫 `pipeline.fit(X_train, y_train)` 即可，Pipeline 內部會在每個 training fold 自動執行 `fit_resample`；使用者不需直接呼叫 `pipeline.fit_resample`。
#### 3.6.2 正確觀念
正確規則只有一句：
- `resampling` 只能在 `training split` 或 `training fold` 內做
如果題目問 `交叉驗證（Cross-validation）`，也是同一件事：
- 每個訓練 fold 內各自 resample
- 不能整份資料先一起 resample
### 3.7 不平衡資料的評估指標（Evaluation Metrics）
#### 3.7.1 準確率（Accuracy）為什麼可能誤導？
`準確率（Accuracy）` 是全部預測中有多少比例答對。
但在極度不平衡時，它常常太樂觀。
例子：
```text
1000 筆資料
990 筆正常
10 筆詐欺
模型全部猜正常
Accuracy = 990 / 1000 = 99%
```
看起來很高，但詐欺一筆都沒抓到。
🗣️ 白話說明：像你每天都猜「今天不會下大雨」，很多時候會答對，但真正暴雨那天你完全沒預警，實務價值很低。
#### 3.7.2 精確率（Precision）
`精確率（Precision）` 看的是：
- 你判成正類的那些裡面
- 真正是正類的比例有多少
直覺上它回答的是：
- 你發警報時，警報準不準？
適合在「誤報成本高」時特別重視。
#### 3.7.3 召回率（Recall）
`召回率（Recall）` 看的是：
- 真正的正類裡面
- 你有抓到多少
直覺上它回答的是：
- 真正重要的目標，你漏掉多少？
適合在「漏報成本高」時特別重視。
🗣️ 白話說明：如果 `Precision` 像「叫錯人機率高不高」，`Recall` 就像「該叫的人你有沒有都叫到」。
#### 3.7.4 F1 分數（F1-score）
`F1 分數（F1-score）` 是 `精確率（Precision）` 與 `召回率（Recall）` 的**調和平均數（Harmonic Mean）**，對兩者中較低的值更敏感。
當你不希望只看其中一邊時，`F1-score` 很常用。
```text
Precision 高、Recall 很低 → 不夠好
Recall 高、Precision 很低 → 也不夠好
兩者都顧到 → F1 較有代表性
```
🔥🔥 高頻考點：不平衡分類題若問「綜合衡量 precision 與 recall」，答案常是 `F1-score`。
#### 3.7.5 ROC 曲線（ROC Curve）與 AUC
`ROC 曲線（Receiver Operating Characteristic Curve, ROC Curve）` 是畫出：
- `真正率（True Positive Rate, TPR）`
- 對上 `假正率（False Positive Rate, FPR）`
在不同門檻下的變化。
`AUC（Area Under the Curve, AUC）` 是這條曲線下面積，越大通常代表模型區分能力越好。
ASCII 示意：
```text
TPR
1.0 |            *
    |         *
    |      *
    |   *
0.0 +---------------- FPR
    0.0             1.0
```
🗣️ 白話說明：門檻一調，抓到正類的比例與誤抓負類的比例會一起變。`ROC/AUC` 就是在看模型整體區分能力夠不夠穩。
🔥 常考觀念：`ROC/AUC` 常出現在題目選項中，用來比較分類器整體表現。
#### 3.7.6 PR 曲線（Precision-Recall Curve）
在 `very imbalanced classes` 的情況下，`PR 曲線（Precision-Recall Curve）` 往往更值得注意。當**正類稀少且為主要關注對象**時，PR 曲線更能反映模型對正類的辨識能力，因為它不計入大量真負例（TN）；`ROC AUC` 在不平衡資料下仍被廣泛報告，兩者可並列參考。
原因：
- 它直接聚焦在少數類抓得好不好
- 正類很稀少時，通常比只看 `Accuracy` 更有意義
```text
少數類很稀少
→ 不要只看 Accuracy
→ 補看 Precision / Recall / F1
→ 很不平衡時再特別留意 PR Curve
```
🗣️ 白話說明：像你在公司抓詐欺、抓流失、抓故障，真正重要的是那一小撮少數事件，`PR 曲線（Precision-Recall Curve）` 比較像直接盯著最關鍵的人看。
---
## Section 4: Comparison Tables (易混淆概念)
### 4.1 k-means 分群 vs 決策樹
| 概念 | k-means 分群（k-means clustering） | 決策樹（Decision Tree） |
|------|------------------------------------|--------------------------|
| 定義 | 依相似性把無標籤資料分成 k 群 | 依特徵條件逐層切分，輸出類別或數值 |
| 學習類型 | 非監督式學習（Unsupervised Learning） | 監督式學習（Supervised Learning） |
| 需要標籤嗎 | 不需要 | 需要 |
| 核心邏輯 | 最小化群內平方和（SSE / inertia） | 讓節點更純，降低不純度 |
| 輸出形式 | 群編號、群中心、群輪廓 | 樹狀規則、葉節點判斷 |
| 適用情境 | 客群分群、探索式分析 | 分類判斷、規則產出 |
| 常見陷阱 | 以為能做數值預測 | 以為它是在找自然群 |
### 4.2 吉尼不純度 vs 熵
| 概念 | 吉尼不純度（Gini Impurity） | 熵（Entropy） |
|------|-----------------------------|---------------|
| 定義 | 衡量節點內樣本混雜程度 | 衡量節點內不確定性 |
| 用途 | 決策樹分裂準則 | 決策樹分裂準則 |
| 共同點 | 都想讓切分後節點更純 | 都想讓切分後節點更純 |
| 差異 | 常被視為較直觀 | 和資訊增益關聯更直接 |
| 考試重點 | 知道它是 impurity 指標即可 | 知道它常和 information gain 一起出現 |
### 4.3 SMOTE vs 隨機過採樣
| 概念 | SMOTE | 隨機過採樣（Random Oversampling） |
|------|-------|----------------------------------|
| 定義 | 以少數類鄰近樣本插值生成新資料 | 直接重複抽樣少數類資料 |
| 是否產生新樣本 | 是，合成新樣本 | 會增加樣本筆數，但不產生新的特徵值組合；本質上是重複既有樣本 |
| 優點 | 比單純複製更有變化 | 簡單、容易理解 |
| 風險 | 可能生成不理想樣本 | 容易過度重複少數類資訊 |
| 考試陷阱 | 不是複製，是插值 | 很多人把它誤以為和 SMOTE 一樣 |
### 4.4 SMOTE vs 欠採樣 vs 類別權重
| 概念 | SMOTE | 欠採樣（Undersampling） | 類別權重（Class Weight） |
|------|-------|-------------------------|--------------------------|
| 主要做法 | 增加少數類 | 減少多數類 | 調整訓練時的錯誤代價 |
| 是否改變資料筆數 | 會增加 | 會減少 | 通常不改 |
| 優點 | 保留多數類資料、強化少數類 | 訓練快、快速平衡 | 不需合成資料 |
| 風險 | 可能引入合成樣本偏差 | 可能丟失重要資訊 | 對不同模型效果不一 |
| 適用 | 少數類太少又不想刪資料 | 多數類太多、資料量大 | 想保留原資料結構 |
### 4.5 Accuracy vs Precision vs Recall vs F1
| 概念 | 準確率（Accuracy） | 精確率（Precision） | 召回率（Recall） | F1 分數（F1-score） |
|------|--------------------|---------------------|------------------|---------------------|
| 在看什麼 | 整體答對比例 | 判成正類的有多準 | 真正正類抓到多少 | Precision 與 Recall 的平衡 |
| 不平衡資料適合嗎 | 可能誤導 | 適合 | 適合 | 很適合 |
| 適合情境 | 類別較平衡 | 誤報成本高 | 漏報成本高 | 兩邊都要顧 |
| 高頻考點 | 不可迷信 | 常和 Recall 對比 | 常和 Precision 對比 | 常作為綜合判斷指標 |
---
## Section 5: 口訣 / Mnemonics
### 5.1 k-means 分群口訣
口訣：**先放心，再分心，再更新**
- `先放心`：先放 `k` 個中心
- `再分心`：把每個點分到最近中心
- `再更新`：用群內平均更新中心
### 5.2 k-means 關鍵考點口訣
口訣：**SSE 看緊密，收斂會停止，k-means++ 不保最美，手肘法選 k**
- `SSE 看緊密`：固定 `k` 時，群內平方和越小代表群內越集中
- `收斂會停止`：演算法會停下來
- `k-means++ 不保最美`：初始化更好，但不保證全域最佳
- `手肘法選 k`：跨不同 `k` 要看折點，不是只看 SSE 大小
### 5.3 決策樹口訣
口訣：**一路切到更純，但別切到太蠢**
- `一路切到更純`：分裂是為了降低不純度
- `但別切到太蠢`：樹太深會過擬合，要記得剪枝
### 5.4 模式識別口訣
口訣：**看相似，用分群；看條件，用規則**
- `看相似` → `分群式模式識別（Cluster-based Pattern Recognition）`
- `看條件` → `規則式模式識別（Rule-based Pattern Recognition）`
### 5.5 不平衡處理策略口訣
口訣：**少的補，多的減，不想動資料就加權**
- `少的補`：`SMOTE` / 過採樣
- `多的減`：`欠採樣（Undersampling）`
- `不想動資料就加權`：`類別權重（Class Weight）`
### 5.6 SMOTE 口訣
口訣：**SMOTE 不複製，只在鄰居中間製**
- 看到 `SMOTE`
- 立刻想到「插值生成」
- 不要想到「重複貼上」
### 5.7 不平衡評估口訣
口訣：**失衡先別看 Acc，改看 PRF 與 AUC**
- `Acc`：`準確率（Accuracy）`
- `PRF`：`Precision`、`Recall`、`F1-score`
- `AUC`：`ROC AUC`
---
## Section 6: 考試陷阱 (Exam Traps)
❌ 陷阱：`k-means 分群（k-means clustering）` 可以拿來做數值預測。  
✅ 正解：`k-means` 是 `非監督式學習（Unsupervised Learning）` 的分群方法，重點是把資料分群，不是輸出連續數值。很多人把「模型」都混成同一類，才會踩這題。
❌ 陷阱：`k-means` 只要會收斂，就代表找到最佳答案。  
✅ 正解：`收斂（Convergence）` 只代表演算法停下來，不代表一定找到 `全域最佳（Global Optimum）`。它可能停在 `局部最佳（Local Minimum）`。
❌ 陷阱：`手肘法（Elbow Method）` 能保證找到唯一正確的 k。  
✅ 正解：`手肘法` 是 `啟發式方法（Heuristic）`，是常用判斷工具，不是數學上保證唯一正解的規則。有時圖形不會出現非常明顯的手肘。
❌ 陷阱：`決策樹（Decision Tree）` 會一次找出整棵樹的全域最佳切法。  
✅ 正解：決策樹多半採 `貪婪式分裂（Greedy Split）`，每次選當下最好的切分。它很實用，但不是把所有樹結構都算完後再選。
❌ 陷阱：`剪枝（Pruning）` 的目的是讓圖比較簡潔。  
✅ 正解：剪枝真正目的是降低 `過擬合（Overfitting）`，讓模型對新資料更穩定。圖變簡潔只是結果，不是核心目的。
❌ 陷阱：`模式識別（Pattern Recognition）` 只會在影像辨識題出現。  
✅ 正解：在 L22302，模式識別是資料分析脈絡，會以 `分群式模式識別（Cluster-based Pattern Recognition）` 與 `規則式模式識別（Rule-based Pattern Recognition）` 出題。
❌ 陷阱：`SMOTE` 就是把少數類資料複製好幾次。  
✅ 正解：`SMOTE` 是利用鄰近少數類樣本做插值，產生新的合成樣本。很多人會搞混，是因為它和 `隨機過採樣（Random Oversampling）` 都屬於增加少數類的方法。
❌ 陷阱：先對整份資料 `SMOTE` 再切訓練測試集比較方便。  
✅ 正解：這會造成 `資料洩漏（Data Leakage）`。正確作法是先切 `train/test`，只在 `training split` 或 `training fold` 內 resample。
❌ 陷阱：資料不平衡時，只要 `準確率（Accuracy）` 高就代表模型好。  
✅ 正解：極度不平衡時，模型只猜多數類也可能有高 accuracy。這時要補看 `精確率（Precision）`、`召回率（Recall）`、`F1 分數（F1-score）`、`ROC AUC`，必要時看 `PR 曲線（Precision-Recall Curve）`。
❌ 陷阱：`類別權重（Class Weight）` 跟 `SMOTE` 一樣，都是在增加少數類樣本。  
✅ 正解：`Class Weight` 是調整訓練時的損失權重，不直接生成新資料；`SMOTE` 才是透過插值新增少數類樣本。
---
## Section 7: 情境題快速判斷 (Scenario Quick-Judge)
🔑 看到關鍵字 → 選這個答案
- `沒有標籤、想找自然群體` → `k-means 分群（k-means clustering）`
- `客群切分、使用者分群、群中心` → `k-means 分群（k-means clustering）`
- `inertia`、`SSE`、`群內平方和` → `k-means` 的目標函數
- `選 k`、`折線圖轉折`、`手肘` → `手肘法（Elbow Method）`
- `會停下來但不一定最好` → `k-means` 收斂到局部最佳
- `if-then`、`條件切分`、`可解釋規則` → `決策樹（Decision Tree）`
- `gini`、`entropy`、`information gain` → `決策樹` 分裂準則
- `樹太深、訓練好測試差` → `過擬合（Overfitting）`
- `刪掉不重要分支、抑制過擬合` → `剪枝（Pruning）`
- `看相似性找輪廓` → `分群式模式識別（Cluster-based Pattern Recognition）`
- `看條件規則做判斷` → `規則式模式識別（Rule-based Pattern Recognition）`
- `正類很少、類別極不平衡` → 先想到 `資料不平衡處理策略（Imbalanced Data Handling Strategies）`
- `增加少數類，但不是單純複製` → `SMOTE`
- `刪除部分多數類樣本` → `欠採樣（Undersampling）`
- `不改資料量，改模型重視程度` → `類別權重（Class Weight）`
- `先 resample 再切 train/test` → `資料洩漏（Data Leakage）`
- `Accuracy 很高但少數類抓不到` → `Accuracy` 不足，改看 `Precision / Recall / F1`
- `誤報成本高` → 重視 `精確率（Precision）`
- `漏報成本高` → 重視 `召回率（Recall）`
- `想綜合衡量 Precision 與 Recall` → `F1 分數（F1-score）`
- `TPR` 對 `FPR` → `ROC 曲線（ROC Curve）`
- `極端不平衡下更看少數類表現` → `PR 曲線（Precision-Recall Curve）`
---
## Section 8: 結尾：快速自我檢查 ✅
用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。
- [ ] 我能在 30 秒內解釋 **`k-means 分群（k-means clustering）` 為什麼屬於非監督式學習，且核心目標是最小化 `SSE / inertia`**
- [ ] 我能說出 **`k-means` 的基本流程：初始化中心、指派最近中心、更新中心、重複直到收斂**
- [ ] 我能看到 **`手肘法（Elbow Method）`** 時，立刻說出它是選 `k` 的常用 heuristic，而不是唯一正解
- [ ] 我能在 30 秒內說清楚 **`決策樹（Decision Tree）` 如何用 `Gini` / `Entropy` 讓節點更純，並知道它是 greedy split**
- [ ] 我能說出 **`剪枝（Pruning）` 的目的不是美化樹，而是降低 `過擬合（Overfitting）`**
- [ ] 我能看到 **「找相似群體」** 與 **「依條件判斷」** 時，立刻區分 `分群式模式識別` 與 `規則式模式識別`
- [ ] 我能在 30 秒內比較 **`SMOTE`、`欠採樣（Undersampling）`、`類別權重（Class Weight）`** 的差異，並知道 `SMOTE` 是插值不是複製
- [ ] 我能看到 **「先 resample 再切資料」** 時，立刻判斷這是 `資料洩漏（Data Leakage）`
- [ ] 我能說出 **為什麼不平衡資料不能只看 `準確率（Accuracy）`，而要補看 `Precision`、`Recall`、`F1-score`、`ROC AUC`，極端失衡時再注意 `PR Curve`**
> 📌 本課中級重點是**方法選用、核心邏輯、常見陷阱、指標判讀**。不需要背 `Spark/ETL` 管線細節，也不需要展開 `PCA`、特徵值分解、或進階數學推導；看到這些延伸內容，知道它們不屬於本課主戰場即可。
