# L22402 大數據應用於鑑別式AI中的應用 學習指南
## 1. Exam Item Mapping
> 對應評鑑範圍：**L22402 大數據應用於鑑別式AI中的應用** ＋ **L224 大數據在人工智慧之應用**
這一課不是重講 `鑑別式人工智慧（Discriminative AI）` 與 `生成式人工智慧（Generative AI）` 的概念差異，也不是拆模型數學推導；它考的是：**大數據（Big Data）如何支撐分類/預測型工作負載，且部署後要怎麼評估、怎麼判讀、怎麼調整。**
你在考場要會三件事：
- 看懂大數據如何讓 `分類任務（Classification Task）` 與 `預測任務（Prediction Task）` 變得可行，也變得更需要監控
- 用 `混淆矩陣（Confusion Matrix）`、`準確率（Accuracy）`、`精確率（Precision）`、`召回率（Recall）`、`F1 分數（F1 Score）`、`AUC-ROC` 判讀部署後表現
- 讀懂 `scikit-learn（sklearn）` 風格 `偽程式碼（Pseudocode）`：`.fit()`、`.predict()`、`.predict_proba()`
本課邊界要守住：
- 不重講 `鑑別式 AI vs 生成式 AI`
- 不展開 `邏輯斯迴歸（Logistic Regression）`、`決策樹（Decision Tree）`、`支援向量機（Support Vector Machine, SVM）` 的內部推導
- 指標雖和 L23303 有重疊，但這裡重點是**已部署分類工作負載的判讀**
## 2. 關鍵概念總覽圖 (Knowledge Tree)
```text
🤖 L22402 大數據應用於鑑別式AI中的應用
│
├── 📖 一、主題定位
│   ├── 大數據讓分類/預測更可落地
│   ├── 大數據也讓監控更重要
│   └── 陷阱：不是演算法推導課
│
├── 🧭 二、主要應用場景（Use-case Catalogue）🔥🔥
│   ├── 📩 垃圾郵件過濾（Spam Filtering）
│   │   └── 陷阱：正常信被誤殺 = FP
│   ├── 💳 詐欺偵測（Fraud Detection）
│   │   └── 陷阱：類別不平衡，不能只看 Accuracy
│   ├── 📉 顧客流失預測（Churn Prediction）
│   │   └── 陷阱：prediction 不一定是回歸
│   ├── 🏥 醫療診斷（Medical Diagnosis）
│   │   └── 陷阱：漏判通常比誤判更痛
│   └── 🖼️ 大規模影像辨識（Image Recognition at Scale）
│       └── 陷阱：總平均可能掩蓋子群失準
│
├── 📊 三、混淆矩陣（Confusion Matrix）🔥🔥
│   ├── TP（True Positive）
│   ├── FP（False Positive）
│   ├── TN（True Negative）
│   └── FN（False Negative）
│
├── 📏 四、評估指標（Evaluation Metrics）🔥🔥
│   ├── Accuracy：看整體
│   ├── Precision：看判正類有多準
│   ├── Recall：看真正正類抓到多少
│   ├── F1 Score：看 Precision/Recall 平衡
│   └── 陷阱：Accuracy 在不平衡資料時可能誤導
│
├── ⚖️ 五、AUC-ROC 與 Threshold
│   ├── ROC Curve：不同門檻下 TPR/FPR
│   ├── AUC：排序能力摘要
│   ├── threshold 降低 → Recall 常升
│   ├── threshold 提高 → Precision 常升
│   └── 陷阱：AUC 常用 y_prob，不是 y_pred
│
├── 🔧 六、sklearn 推論流程（Inference Pattern）🔥🔥
│   ├── model.fit(X_train, y_train)
│   ├── y_pred = model.predict(X_test)
│   ├── y_prob = model.predict_proba(X_test)
│   ├── score() 常是 Accuracy
│   └── 陷阱：predict_proba 不是最終類別
│
├── 🚨 七、常見考題陷阱
│   ├── Accuracy 高 ≠ 模型好
│   ├── 分類指標不能和回歸指標混用
│   ├── prediction 不一定是連續值
│   ├── 0.5 不是永遠最佳 threshold
│   └── 看場景要先看錯誤代價
│
└── ✅ 八、考場任務
    ├── 先判斷場景
    ├── 再判斷 FP/FN 哪個更痛
    ├── 再選指標
    └── 最後讀 pseudocode
```
## 3. Core Concepts
### 3.1 主題定位：大數據如何改變鑑別式工作負載
`大數據（Big Data）` 對 `鑑別式人工智慧（Discriminative AI）` 的影響，不只是「資料變多」，而是：
- 可用樣本變多，分類模型更有機會看見真實世界的多樣性
- 流量變大，`部署後監控（Post-deployment Monitoring）` 更重要
- `資料不平衡（Class Imbalance）`、`延遲（Latency）`、`門檻設定（Threshold Setting）` 會直接影響業務結果
在本課脈絡中，`預測任務（Prediction Task）` 常指**預測類別結果**，例如是否流失、是否詐欺、是否為垃圾郵件，而不是只指連續數值預測。
🗣️ 白話說明：像 7-11 店員以前一天只看 100 筆交易，現在要看全台上百萬筆。資料更多，判斷可以更準；但如果每天都有新交易、新客群、新異常，你就不能只看一個總平均分數。
```text
大數據進來
   |
   v
[更多樣本] ---> [更完整的分類/預測情境]
   |
   +---------> [更多錯誤型態要監控]
   |
   +---------> [更需要指標判讀]
```
🔥 重要：L22402 考的是**資料側應用與評估**。若題目開始問梯度、分裂細節，通常已超出本課。
### 3.2 主要應用場景（Use-case Catalogue）

> 🗺️ **視覺化：** 六大領域全景圖 → [`diagrams/04-use-case-catalogue.md`](diagrams/04-use-case-catalogue.md)

#### 3.2.1 垃圾郵件過濾（Spam Filtering）🔥🔥
`垃圾郵件過濾（Spam Filtering）` 是典型 `二元分類（Binary Classification）`：每封郵件判定為 `垃圾郵件（Spam）` 或 `正常郵件（Ham / Not Spam）`。
大數據角色：
- 郵件量大，模型能看見更多垃圾型態
- 攻擊手法會變，部署後要持續監控
- 不能只看抓到多少，也要看誤殺多少正常信
🗣️ 白話說明：像 LINE 群組管理員抓廣告訊息。抓太嚴，連同學問報告都被刪；抓太鬆，廣告洗版。這就是 `Precision` 與 `Recall` 的取捨。
```text
Email -> [特徵] -> [Classifier] -> Spam / Not Spam
```
重點：
- `假陽性（False Positive, FP）`：正常信被誤判成垃圾信
- `假陰性（False Negative, FN）`：垃圾信被放過
> FP、FN 與 Precision、Recall 的完整定義見 §3.3–§3.4。

#### 3.2.2 詐欺偵測（Fraud Detection）🔥🔥
`詐欺偵測（Fraud Detection）` 通常也是二元分類：交易是否為詐欺。
大數據特徵：
- 交易量大
- 即時性高
- `少數類別（Minority Class）` 極少，嚴重不平衡
- 漏掉真正詐欺的代價很高
🗣️ 白話說明：像銀行一天看幾百萬筆交易，真正有問題的可能只占極少數。如果只看 `Accuracy`，模型全部猜正常也能高分，但銀行根本不能用。
```text
100000 筆交易
├── 99900 正常
└──   100 詐欺

全部猜正常
Accuracy = 99.9%
實務價值 ≈ 0
```
🔥🔥 高頻考點：看到 `fraud`、`rare event`、`high imbalance`，優先想到不能只看 `Accuracy`。

#### 3.2.3 顧客流失預測（Churn Prediction）
`顧客流失預測（Churn Prediction）` 常把客戶分成 `會流失（Churn）` 與 `不會流失（Non-churn）`。
大數據讓這件事可行，因為企業可彙整：
- 登入紀錄
- 消費紀錄
- 客服互動
- App 事件（Event）資料
🗣️ 白話說明：像訂閱平台想知道誰快退租，不是在算房租多少，而是在判斷「這個人會不會走」。
考點提醒：
- `流失預測` 常是分類題
- 看到 `prediction` 不要自動以為是回歸

#### 3.2.4 醫療診斷（Medical Diagnosis）
`醫療診斷（Medical Diagnosis）` 可能是判斷病患是否有疾病，也可能是醫療影像分類。
大數據的重要性：
- 病例數越多，越能涵蓋真實變異
- 影像量大，適合建立大規模分類工作負載
- 常需看不同醫院、族群、時段的表現
🗣️ 白話說明：像醫院看胸腔 X 光，關鍵不是「平均看起來不錯」，而是會不會把真的有病的人漏掉。
```text
漏判有病（FN） -> 風險通常高
誤判有病（FP） -> 可能增加複檢成本
```
🔥 重要：醫療情境常偏重 `召回率（Recall）`。

#### 3.2.5 大規模影像辨識（Image Recognition at Scale）
`大規模影像辨識（Image Recognition at Scale）` 在本課可理解為大量圖片的分類或異常辨識，例如工廠瑕疵檢測、醫療影像分類、平台內容審查。
大數據帶來的重點不是網路架構，而是：
- 圖片量大
- 來源多元
- 必須監控不同來源與不同批次的表現
🗣️ 白話說明：像電商平台圖片審查，若總體準確率很高，但某一類商品一直誤判，客服還是會被投訴到爆。

### 3.3 混淆矩陣（Confusion Matrix）詳解 🔥🔥

> 📊 **視覺化：** 混淆矩陣 → 指標推導流程圖 → [`diagrams/01-confusion-matrix-metrics.md`](diagrams/01-confusion-matrix-metrics.md)

`混淆矩陣（Confusion Matrix）` 是分類工作負載的核心判讀表，把模型預測與真實答案拆成四格：
- `真陽性（True Positive, TP）`：真的為正類，模型也判正類
- `假陽性（False Positive, FP）`：真的為負類，模型卻判正類
- `真陰性（True Negative, TN）`：真的為負類，模型也判負類
- `假陰性（False Negative, FN）`：真的為正類，模型卻判負類
🗣️ 白話說明：像 HR 篩履歷。真正適合的人有些被選進面試，有些被錯殺；真正不適合的人有些被擋掉，有些卻混進來。四種情況都要看。
```text
                    真實類別（Actual）
                 正類（Positive）  負類（Negative）
預測為正類           TP               FP
預測為負類           FN               TN
```
不同教材列欄方向可能不同，讀題時請先看軸標示。

#### 3.3.1 2×2 worked example
假設某個詐欺偵測系統今天處理 1000 筆交易：
- TP = 60
- FP = 30
- TN = 880
- FN = 30
```text
                    Actual Fraud   Actual Normal
Pred Fraud               60              30
Pred Normal              30             880
```
這張表能立刻回答：
- 抓到多少真正詐欺？看 TP
- 多抓多少正常交易？看 FP
- 漏掉多少詐欺？看 FN
- 正常交易判對多少？看 TN

#### 3.3.2 為什麼大數據更需要混淆矩陣
在大數據部署情境，`混淆矩陣` 不只是算一次分數，而是營運儀表板骨架。你常要拆看：
- 整體 TP/FP/TN/FN
- 某地區 TP/FP/TN/FN
- 某時段 TP/FP/TN/FN
- 某客群 TP/FP/TN/FN
🗣️ 白話說明：像看 YouTube 推播分類，不只要知道「總體 92 分」，更要知道「新用戶是不是一直被誤判」。

### 3.4 評估指標（Evaluation Metrics）全攻略
以下全部從 `混淆矩陣` 出發。

#### 3.4.1 準確率（Accuracy）🔥
`準確率（Accuracy）` 是全部預測中，猜對的比例。
```text
Accuracy = (TP + TN) / (TP + FP + TN + FN)
```
代入上例：
```text
Accuracy = (60 + 880) / 1000
         = 940 / 1000
         = 94%
```
🗣️ 白話說明：像考 100 題答對 94 題，表面很好看；但如果錯的都是最重要的大題，實務上未必夠好。
🔥 常考提醒：`Accuracy` 在 `類別不平衡` 時很容易誤導。

#### 3.4.2 精確率（Precision）🔥🔥
`精確率（Precision）` 是模型判成正類的資料裡，真正為正類的比例。
```text
Precision = TP / (TP + FP)
```
代入上例：
```text
Precision = 60 / (60 + 30)
          = 60 / 90
          = 66.7%
```
🗣️ 白話說明：像主管叫你列出「最可能會離職的人」。如果名單上 10 人有 7 人真的快走，`Precision` 算不錯；如果只有 2 人是真的，主管很快就不信你。
適合優先看 `Precision` 的場景：
- 誤報成本高
- 正類一旦判錯，人工複查代價大
- 例如垃圾郵件誤殺、內容審查誤封

#### 3.4.3 召回率（Recall）🔥🔥
`召回率（Recall）` 是所有真正正類裡，被模型成功抓到的比例。
```text
Recall = TP / (TP + FN)
```
代入上例：
```text
Recall = 60 / (60 + 30)   （其中 30 為 FN，非 FP，分母為漏報數）
       = 60 / 90
       = 66.7%
```
🗣️ 白話說明：像店長叫你找出快過期商品。`Recall` 高，代表大多數真的快過期的都被你找到了；`Recall` 低，代表還有很多漏網之魚。
適合優先看 `Recall` 的場景：
- 漏判成本高
- 例如醫療診斷、詐欺偵測、安全告警

#### 3.4.4 F1 分數（F1 Score）🔥🔥
`F1 分數（F1 Score）` 是 `Precision` 與 `Recall` 的 `調和平均（Harmonic Mean）`。
```text
F1 = 2 * Precision * Recall / (Precision + Recall)
```
若用上例：
```text
F1 = 2 * 0.667 * 0.667 / (0.667 + 0.667)
   ≈ 66.7%
```
🗣️ 白話說明：像分組報告，只有準時但內容差，或只有內容好但老是遲交，都拿不到高分。`F1` 要的是兩邊都不要太差。
🔥🔥 高頻考法：`F1` 常拿來考你是否知道不平衡分類不能只看 `Accuracy`。

#### 3.4.5 同一例子總整理
```text
TP = 60, FP = 30, TN = 880, FN = 30

Accuracy  = 94%
Precision = 66.7%
Recall    = 66.7%
F1 Score  = 66.7%
```
這個例子故意讓你看到：**Accuracy 高，不代表正類抓得好。**

#### 3.4.6 為什麼部署後不能只看 Accuracy
假設醫療篩檢模型在 10000 人中，100 人真的生病。模型若全部預測「沒病」：
```text
TP = 0
FP = 0
TN = 9900
FN = 100

Accuracy = 99%
Recall = 0
```
🗣️ 白話說明：這像你考試把最難的大題全部空白，但選擇題拿很高分。成績看起來不差，關鍵能力卻完全沒展現。
🔥🔥 必記：只要看到 `rare positive`、`minority class`、`high imbalance`，就要警覺別被 `Accuracy` 騙走。

### 3.5 AUC-ROC 曲線（ROC Curve and AUC）🔥🔥

> 📈 **視覺化：** ROC 曲線與 AUC 解讀 → [`diagrams/02-roc-auc-curve.md`](diagrams/02-roc-auc-curve.md)

`受試者操作特徵曲線（Receiver Operating Characteristic Curve, ROC Curve）` 是在不同 `決策閾值（Decision Threshold）` 下，比較：
- `真陽性率（True Positive Rate, TPR）`
- `假陽性率（False Positive Rate, FPR）`
其中：
```text
TPR = Recall = TP / (TP + FN)
FPR = FP / (FP + TN)
```
`曲線下面積（Area Under the Curve, AUC）` 是把整條 ROC 曲線壓成一個數字，介於 0 到 1。越接近 1，通常代表排序能力越好。
🗣️ 白話說明：把 ROC 想成在調飲料甜度。門檻改變，抓到的正類與誤抓的負類都會一起變。`ROC Curve` 就是在看這種變化。
```text
TPR
1.0 |                        ● Perfect
    |                    .
    |                .
    |            .
    |        .
    |    .
    | .
0.0 +----------------------------- FPR
    0.0          0.5           1.0

對角線：接近隨機（Random Baseline）
越靠左上角：通常越好
```

#### 3.5.1 AUC 怎麼解讀
- `AUC = 0.5`：接近隨機
- `AUC` 越接近 `1.0`：模型越能把正類排在負類前面
- 若明顯低於 `0.5`：通常方向反了或模型有問題
🗣️ 白話說明：像你在 104 排履歷，前面幾份如果真的比較多好人選，`AUC` 就不會低。

#### 3.5.2 為什麼 AUC-ROC 適合部署後工作負載
因為上線後常要問：
- 人力變少，門檻要不要調高？
- 風險變高，門檻要不要調低？
- 某一客群誤判多，策略要不要改？
`ROC AUC` 的價值在於：先看模型整體排序能力，再決定門檻怎麼切。

#### 3.5.3 AUC-ROC 的高頻陷阱
❗ `ROC AUC` 通常不是拿最終類別標籤算，而是拿 `預測分數（Prediction Scores）` 或 `機率（Probabilities）` 算。
```python
model.fit(X_train, y_train)
y_prob = model.predict_proba(X_test)[:, 1]
auc = roc_auc_score(y_test, y_prob)
```
不是這樣：
```python
y_pred = model.predict(X_test)
auc = roc_auc_score(y_test, y_pred)
```
🗣️ 白話說明：`AUC` 比較像看「排序能力」，不是只看最後有沒有畫線切進名單。

### 3.6 Precision vs Recall 的取捨（Tradeoff）🔥🔥

> ⚖️ **視覺化：** 門檻值效應 + 情境選題口訣 → [`diagrams/03-precision-recall-tradeoff.md`](diagrams/03-precision-recall-tradeoff.md)

`Precision vs Recall Tradeoff` 的意思是：同一個模型，在不同 `Decision Threshold` 下，通常不能同時把 `Precision` 與 `Recall` 都拉到最好。
直觀上：
- 門檻調低，模型更容易判成正類，`Recall` 常上升，`Precision` 常下降
- 門檻調高，模型更保守，`Precision` 常上升，`Recall` 常下降
```text
threshold 降低
  -> 判正類變多
  -> Recall 常升
  -> FP 也可能增加
  -> Precision 常降

threshold 提高
  -> 判正類變少
  -> FP 常減少
  -> FN 可能增加
  -> Precision 常升、Recall 常降
```
🗣️ 白話說明：像 Instagram 私訊垃圾訊息過濾，抓太嚴會連正常合作邀約也丟掉；抓太鬆又讓廣告跑進來。沒有免費午餐，只有取捨。

#### 3.6.1 各場景通常偏重哪一邊
```text
垃圾郵件過濾 -> Precision 偏高
  理由：不想誤殺正常信

詐欺偵測 -> Recall 常偏高
  理由：不想漏掉真正詐欺

醫療診斷 -> Recall 常偏高
  理由：漏判代價高

行銷名單篩選 -> Precision 常偏高
  理由：不想浪費資源在錯的人身上
```
🔥🔥 高頻判斷：題目若寫「寧可多抓一些疑似個案，也不要漏掉真正風險」，答案通常偏向提高 `Recall`。

### 3.7 sklearn 推論流程（Inference Pattern）與 pseudocode 判讀 🔥🔥

> 🔧 **視覺化：** sklearn 完整推論管線 → [`diagrams/05-sklearn-inference-pipeline.md`](diagrams/05-sklearn-inference-pipeline.md)

中級考題常不要求你完整寫程式，但會要你看懂 `scikit-learn（sklearn）` 的標準流程。

#### 3.7.1 三段式主線
```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]
```
這段的意思：
- `fit(X_train, y_train)`：用訓練資料學出模型
- `predict(X_test)`：輸出最終類別標籤
- `predict_proba(X_test)`：輸出類別機率
🗣️ 白話說明：像你先用舊履歷教會助理怎麼篩人，之後丟新履歷給他。他可以直接說「要不要面試」，也可以先說「我有 82% 把握」。

#### 3.7.2 `predict()` 與 `predict_proba()` 差在哪
```text
predict()
  -> 類別標籤
  -> 例如 [0, 1, 0, 0, 1]

predict_proba()
  -> 各類別機率
  -> 例如 [[0.92, 0.08], [0.21, 0.79], ...]
```
若是二元分類，`predict_proba(X)[:, 1]` 常表示「屬於正類的機率」。
🗣️ 白話說明：`predict()` 像直接告訴你「要不要買」；`predict_proba()` 像先告訴你「我有多大把握」。

#### 3.7.3 `score()` 的陷阱
很多 `Classifier` 的 `.score(X, y)` 預設回傳的是 `Accuracy`。
```python
acc = model.score(X_test, y_test)
```
這通常等價於快速看準確率，但不代表完整評估。
🗣️ 白話說明：像主管只問你這週總分，沒有問你哪個客群一直出錯。總分有用，但不夠。
🔥 重要：看到 `.score()` 不要自動以為它等於 `Precision`、`Recall` 或 `AUC`。

#### 3.7.4 常見指標 pseudocode
```python
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score, roc_auc_score

cm = confusion_matrix(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_prob)
```
讀題時抓兩件事：
- `y_pred` 常拿來算 `Confusion Matrix`、`Precision`、`Recall`、`F1`
- `y_prob` 常拿來算 `ROC AUC`

#### 3.7.5 大數據部署視角下的流程
本課不是要你做完整訓練實驗，而是理解：
```text
[歷史資料]
    |
    v
 model.fit()
    |
    v
[新資料流入]
    |
    +--> predict()       -> 看最終分類結果
    |
    +--> predict_proba() -> 看機率、調 threshold、算 AUC
```
🗣️ 白話說明：像客服系統先拿舊工單訓練，之後每天進新工單。重點不是每天重發明模型，而是持續看今天判得準不準。

### 3.8 大數據部署後的評估思維：不是只做一次考卷
L22402 的實務感，來自「**分類工作負載是持續上線的**」。

#### 3.8.1 看整體，也看分群
總體 `Accuracy`、`F1` 很漂亮，不代表每個客群都漂亮。
例如可拆看：
- 新客 vs 舊客
- 白天 vs 夜間
- 某地區 vs 全站
- 某型號設備 vs 其他設備
🗣️ 白話說明：像推薦系統如果對老用戶很好、對新用戶很差，總平均可能仍高，但商業上會卡住成長。

#### 3.8.2 看一個數字，也看錯誤代價
同樣是 `FP` 與 `FN`，不同場景代價不同。
```text
Spam Filtering      -> FP 痛，正常信被誤殺
Fraud Detection     -> FN 痛，詐欺被漏掉
Medical Diagnosis   -> FN 常更痛，病患被漏判
Marketing Targeting -> FP 常更痛，資源浪費
```
🔥🔥 高頻觀念：指標不是抽象公式，而是業務代價的壓縮表示。

#### 3.8.3 看固定門檻，也要知道門檻可調
很多考題會把 `0.5` 寫得像標準答案，但真正要記的是：
- `0.5` 常只是預設值
- 不同目標，門檻可以調
- 同一組 `predict_proba()`，換門檻，混淆矩陣就會變
```text
同一筆資料：正類機率 = 0.62

threshold = 0.50 -> 預測為正類
threshold = 0.70 -> 預測為負類
```
🗣️ 白話說明：像公司對履歷的面試門檻，急缺人時可能放寬；缺的是高門檻人才時就拉高。

#### 3.8.4 分類指標與回歸指標要分清楚
本課主線是分類/類別預測，所以高頻指標是：
- `Accuracy`
- `Precision`
- `Recall`
- `F1 Score`
- `ROC AUC`
若選項混入：
- `均方誤差（Mean Squared Error, MSE）`
- `平均絕對誤差（Mean Absolute Error, MAE）`
- `決定係數（R-squared, R²）`
就要提高警覺，這些通常屬於 `回歸（Regression）` 評估。
🗣️ 白話說明：像去全家買咖啡，不能拿量身高的尺來量溫度。工具不是不能用，而是用錯地方。

## 4. Comparison Tables (易混淆概念)
| 概念 | 準確率（Accuracy） | 精確率（Precision） |
|------|-------------------|--------------------|
| 定義 | 全部預測中猜對的比例 | 被判成正類者中，真正正類的比例 |
| 公式 | `(TP + TN) / 全部` | `TP / (TP + FP)` |
| 差異 | 看整體對錯 | 看「判正類」有多準 |
| 適用 | 類別分布較平均時 | 誤報成本高時 |
| 常見陷阱 | 不平衡資料時可能虛高 | 高 Precision 不代表沒漏掉很多正類 |

| 概念 | 精確率（Precision） | 召回率（Recall） |
|------|--------------------|------------------|
| 定義 | 抓到的正類有多準 | 真正的正類抓到多少 |
| 公式 | `TP / (TP + FP)` | `TP / (TP + FN)` |
| 差異 | 在意誤報（FP） | 在意漏報（FN） |
| 適用 | Spam Filtering、精準行銷 | Fraud Detection、Medical Diagnosis |
| 考場判斷 | 「不想亂抓」偏 Precision | 「不想漏抓」偏 Recall |

| 概念 | `predict()` | `predict_proba()` |
|------|-------------|--------------------|
| 輸出 | 類別標籤 | 各類別機率 |
| 典型結果 | `0/1`、`spam/not spam` | `0.82`、`[0.18, 0.82]` |
| 適用 | 最終分類結果 | 門檻調整、AUC 計算 |
| 差異 | 已做完門檻切分 | 還保留連續分數資訊 |
| 常見陷阱 | 拿它直接算 AUC 常是錯誤思路 | 看到機率就以為已完成分類 |

| 概念 | 混淆矩陣（Confusion Matrix） | AUC-ROC |
|------|------------------------------|---------|
| 核心 | 固定一個門檻後的四格結果 | 多個門檻下整體排序能力 |
| 輸入 | 常用 `y_pred` | 常用 `y_prob` 或 score |
| 看到什麼 | TP/FP/TN/FN 的實際錯誤型態 | TPR/FPR 在不同 threshold 的關係 |
| 適用 | 看目前門檻下的錯誤成本 | 看排序能力與可調門檻空間 |
| 常見陷阱 | 只看總體，不看四格 | 拿 hard labels 算 AUC |

| 概念 | 分類評估（Classification Metrics） | 回歸評估（Regression Metrics） |
|------|------------------------------------|--------------------------------|
| 常見指標 | Accuracy、Precision、Recall、F1、AUC | MSE、MAE、RMSE、R² |
| 預測目標 | 類別或標籤 | 連續數值 |
| 本課定位 | L22402 高相關 | 僅作排除陷阱用 |
| 常見陷阱 | 認為 prediction 一定是連續值 | 把 MSE 拿去評估 spam filtering |

## 5. 口訣 / Mnemonics
### 5.1 應用場景口訣：**「垃詐流醫影」**
- 垃：`垃圾郵件過濾（Spam Filtering）`
- 詐：`詐欺偵測（Fraud Detection）`
- 流：`顧客流失預測（Churn Prediction）`
- 醫：`醫療診斷（Medical Diagnosis）`
- 影：`大規模影像辨識（Image Recognition at Scale）`
記法：**「垃詐流醫影，看到分類就先想這五型。」**

### 5.2 混淆矩陣口訣：**「真真對，假假錯；陽陰看預測」**
- `TP`：真的是正，預測也正
- `FP`：真的是負，預測卻正
- `FN`：真的是正，預測卻負
- `TN`：真的是負，預測也負
記法：
- 第一個字 `True/False` 看有沒有判對
- 第二個字 `Positive/Negative` 看模型判成什麼

### 5.3 指標口訣：**「準看全部、精看判正有多準、召看正類抓到多少、F1 看平衡」**
- `Accuracy`：看全部答對多少（分母 = 全部樣本）
- `Precision`：判為正類者中有多少真的是正類（分母 = 預測正類）
- `Recall`：所有真正正類中有多少被抓到（分母 = 實際正類）
- `F1`：看 `Precision` 與 `Recall` 是否平衡

### 5.4 AUC-ROC 口訣：**「ROC 看曲線，AUC 看面積；不是看切線，是看排序力」**
- `ROC Curve`：多門檻下的 `TPR/FPR`
- `AUC`：整體排序能力
- 重點：通常用機率或分數，不是直接用最終標籤

### 5.5 Threshold 口訣：**「門檻低，召回高；門檻高，精確高」**
- `threshold` 降低：通常更敢抓，`Recall` 常升
- `threshold` 提高：通常更保守，`Precision` 常升

### 5.6 sklearn 口訣：**「先 fit，再 predict；要算 AUC，記得拿 proba」**
- `fit()`：訓練
- `predict()`：出類別
- `predict_proba()`：出機率

## 6. 考試陷阱 (Exam Traps)
❌ 陷阱：`Accuracy` 很高，所以模型一定很好。  
✅ 正解：`Accuracy` 只看整體對錯。在 `類別不平衡（Class Imbalance）` 情境下，即使模型抓不到少數正類，也可能有超高 `Accuracy`。

❌ 陷阱：`prediction` 就是在預測連續數值，所以不屬於分類。  
✅ 正解：在本課裡，`prediction` 常是預測類別結果，例如 `churn / non-churn`。先看目標是類別還是數值。

❌ 陷阱：`Precision` 高，代表模型幾乎沒漏掉正類。  
✅ 正解：`Precision` 高只代表判成正類的那些比較準；要看漏掉多少，還要看 `Recall`。

❌ 陷阱：`Recall` 高，代表模型很精準。  
✅ 正解：`Recall` 高只代表抓到更多真正正類，但可能也多抓了很多負類。是否精準仍要看 `Precision`。

❌ 陷阱：`F1 Score` 就是 `Accuracy` 的另一種寫法。  
✅ 正解：`F1` 是 `Precision` 與 `Recall` 的調和平均，特別常用在不平衡分類。它和 `Accuracy` 看的是不同面向。

❌ 陷阱：`ROC AUC` 可以直接用 `predict()` 的類別結果來算。  
✅ 正解：`ROC AUC` 通常應使用 `prediction scores` 或 `predict_proba()` 的輸出。

❌ 陷阱：`threshold = 0.5` 永遠是最佳做法。  
✅ 正解：`0.5` 常只是預設值。若業務目標不同，門檻可以調整。

❌ 陷阱：`spam filtering`、`fraud detection`、`medical diagnosis` 都應看同一個指標。  
✅ 正解：不同場景的錯誤代價不同，所以指標重點不同。

❌ 陷阱：`score()` 顯示 0.95，就代表所有指標都很好。  
✅ 正解：很多 `sklearn classifier` 的 `.score()` 預設是 `Accuracy`，不是完整評估報告。

❌ 陷阱：本課要把 `邏輯斯迴歸`、`決策樹`、`SVM` 內部怎麼算全部背熟。  
✅ 正解：L22402 重點是大數據分類工作負載的應用與評估，不是演算法推導。

❌ 陷阱：看到大數據就只看總平均指標。  
✅ 正解：大數據部署後更要看不同客群、時段、來源的表現，否則平均值可能掩蓋局部失準。

❌ 陷阱：`MSE`、`MAE`、`R²` 也是分類題常用指標。  
✅ 正解：這些多半屬於 `回歸（Regression）`。若題目在考 spam、fraud、churn、diagnosis，通常應先想到分類指標。

## 7. 情境題快速判斷 (Scenario Quick-Judge)
🔑 看到關鍵字 → 選這個答案
- `少數類很少`、`正類不到 1%` → 不要只看 `Accuracy`
- `不想漏掉真正陽性`、`寧可多抓` → 優先看 `Recall`
- `不想誤殺正常個案`、`人工複查很貴` → 優先看 `Precision`
- `Precision 與 Recall 都要顧` → 看 `F1 Score`
- `比較不同 threshold 下表現` → 想 `ROC Curve`
- `要把 ROC 壓成一個數字` → 想 `AUC`
- `題目給 predict_proba` → 多半跟 `AUC` 或 `threshold` 有關
- `題目給 predict` → 多半跟 `Confusion Matrix`、`Precision`、`Recall`、`F1` 有關
- `score()` 出現在 classifier pseudocode → 先警覺它常是 `Accuracy`
- `spam filtering` → 常怕 `FP`，正常信被誤殺
- `fraud detection` → 常怕 `FN`，真正詐欺漏掉
- `medical diagnosis` → 常怕 `FN`，病患漏判
- `churn prediction` → 先判斷它是分類，不是自動等於回歸
- `ROC AUC` + `y_pred` 出現在選項中 → 常是陷阱，應改看 `y_prob`
- `部署後每日監控`、`看不同時段客群表現` → 這是本課的大數據工作負載視角

🔑 看到場景描述 → 快速反推
- `銀行一天數百萬筆交易，真正詐欺極少` → `類別不平衡` + `Recall / AUC` 高相關
- `郵件系統常把正常通知信丟進垃圾桶` → `Precision` 高相關
- `醫療影像模型平均很高，但某院區誤判多` → 不能只看整體平均，要分群監控
- `模型輸出 0.83、0.41、0.67` → 這是機率/分數，不是最終類別
- `同一組機率，換門檻後分類結果變了` → 在考 `threshold effect`

## 8. 結尾：快速自我檢查 ✅
用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。
- [ ] 我能在 30 秒內解釋 **大數據（Big Data）** 為什麼會讓 `分類任務（Classification Task）` 的部署後評估比小資料更重要。
- [ ] 我能看到 `spam filtering`、`fraud detection`、`churn prediction`、`medical diagnosis`、`image recognition` 時，立刻說出它們各自比較怕 `FP` 還是 `FN`。
- [ ] 我能不看筆記就寫出 `混淆矩陣（Confusion Matrix）` 的四格：`TP`、`FP`、`TN`、`FN`。
- [ ] 我能用一組數字在 30 秒內算出 `Accuracy`、`Precision`、`Recall`、`F1 Score`，並說出哪個最可能誤導。
- [ ] 我能看到「少數類很少」或「正類不到 1%」時，立刻判斷 **不能只看 Accuracy**。
- [ ] 我能在 30 秒內解釋 `AUC-ROC` 在看什麼，並說出它通常要配 `predict_proba()` 或分數，不是 `predict()`。
- [ ] 我能看到「寧可多抓不要漏掉」時，立刻判斷應優先提高 **召回率（Recall）**。
- [ ] 我能看到 `model.fit()`、`model.predict()`、`model.predict_proba()` 的 pseudocode 時，立刻說出哪一行是在訓練、哪一行在出類別、哪一行在出機率。
- [ ] 我能說出 `.score()` 在很多 `sklearn classifier` 中常代表 `Accuracy`，所以不能當成完整評估報告。
> 📌 本課不用背 `邏輯斯迴歸（Logistic Regression）` 的梯度推導、`決策樹（Decision Tree）` 的分裂數學細節，也不用深入多分類 averaging 細節或進階閾值最佳化演算法。中級重點是**場景判讀、指標計算、錯誤代價與 pseudocode 理解**。
