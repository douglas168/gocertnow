# L22401 大數據與機器學習 Study Guide
## 1. Exam Item Mapping
> 對應評鑑範圍：**L22401 大數據與機器學習** ＋ **L224 大數據在人工智慧之應用**
這一課的核心不是問你某個模型怎麼推導， 而是問你： 當資料變大、變快、變雜、變髒、變貴時， 機器學習（Machine Learning, ML）的方法選擇、訓練模式與系統架構要怎麼跟著改。
從考科定位來看， 這是 **資料分析組** 很典型的橋接章節。 上游是大數據（Big Data）處理特性， 下游是機器學習（Machine Learning, ML）能不能真的跑得動、撐得住、產生值得的商業效果。
你在這裡要會的，不是演算法內部原理， 而是 **「資料條件改變時，訓練方式與架構如何調整」**。
---
## 2. 關鍵概念總覽圖 (Knowledge Tree)
```text
🤖 L22401 大數據與機器學習
│
├── 📖 一、主軸定位：從資料面看機器學習
│   ├── 不是問演算法怎麼算
│   ├── 是問資料規模/型態/速度如何改變方法選擇
│   └── 陷阱：別滑去 loss、backprop、模型推導（屬 L23202 / L23303）
│
├── 📊 二、大數據特性（5V）
│   ├── 📦 Volume（量）
│   │   ├── 資料大到 RAM 放不下
│   │   ├── 需要 mini-batch / out-of-core
│   │   └── 陷阱：Volume ≠ 一定要分散式
│   ├── ⚡ Velocity（速）
│   │   ├── 流式資料（streaming data）
│   │   ├── 即時更新需求
│   │   ├── concept drift（概念漂移）
│   │   └── 觸發 online / incremental learning
│   ├── 🧩 Variety（多樣）
│   │   ├── 結構化 + 半結構化 + 非結構化
│   │   ├── heterogeneous features（異質特徵）
│   │   ├── schema-on-read
│   │   └── 陷阱：資料多樣 ≠ 模型一定更強
│   ├── ✅ Veracity（真實性）
│   │   ├── 噪音、缺漏、標註錯誤
│   │   ├── robust to noise（抗噪性）
│   │   └── 影響 generalization（泛化）
│   └── 💰 Value（價值）
│       ├── 資料蒐集成本 vs 模型提升幅度
│       ├── cost-benefit tradeoff（成本效益取捨）
│       └── 陷阱：資料越多不一定越值得
│
├── 🔧 三、資料餵入方式與訓練模式
│   ├── 🧱 Full-batch training（全批次訓練）
│   │   ├── 一次看全部資料
│   │   ├── 更新慢、記憶體吃重
│   │   └── 適合小而靜態資料
│   ├── 📦 Mini-batch Training（小批次訓練）
│   │   ├── 固定大小批次
│   │   ├── 記憶體與穩定度折衷
│   │   └── 🔥🔥 最常考：大資料但非純串流
│   └── 🌊 Online / Incremental learning（線上/增量學習）
│       ├── 一筆或小段資料就更新
│       ├── 適合 streaming / high velocity
│       ├── 可應對 concept drift
│       └── 陷阱：online ≠ 線上服務
│
├── 🖥️ 四、訓練部署架構
│   ├── 🧍 Centralized training（集中式訓練）
│   │   ├── 單機、單節點
│   │   ├── 架構簡單
│   │   └── 瓶頸：RAM / I/O / compute
│   ├── 🧑‍🤝‍🧑 Distributed training（分散式訓練）
│   │   ├── 多機協作
│   │   ├── 目標：擴展資料或模型規模
│   │   └── 陷阱：不是所有問題都值得分散式
│   ├── 📤 Data parallelism（資料並行）
│   │   ├── 每個 worker 同一模型、不同資料切片
│   │   ├── Parameter Server
│   │   ├── AllReduce / Ring-AllReduce
│   │   └── 🔥🔥 高頻比較題
│   └── 🧠 Model parallelism（模型並行）
│       ├── 模型本體太大，切到多裝置
│       ├── 適合大模型，不是單純資料多
│       └── 陷阱：不是 big data 就先選它
│
├── 🏗️ 五、常見分散式資料/訓練工具脈絡
│   ├── Spark MLlib（分散式機器學習框架）
│   ├── Data Lake（資料湖）搭配 distributed preprocessing
│   └── 重點：考概念與選型，不考版本號
│
├── ⚖️ 六、演算法/方法選擇的底層判斷
│   ├── 可否放進記憶體？
│   ├── 資料是靜態還是持續流入？
│   ├── 特徵是否高維、稀疏、異質？
│   ├── 資料是否噪音高、標註不穩？
│   └── 值不值得為這些資料付更高系統成本？
│
├── 🧪 七、常考 code item
│   ├── batch vs online training loop 判讀
│   ├── mini-batch sampling trace
│   └── 陷阱：看更新頻率，不要只看 for 迴圈長相
│
├── 🚨 八、易錯陷阱
│   ├── 分散式訓練 ≠ 聯邦學習
│   ├── online learning ≠ online serving
│   ├── big data ≠ 一律 distributed
│   └── model parallelism ≠ 一定比較高級
│
└── ✅ 九、考場任務
    ├── 看資料特性，先判斷 5V 中哪個最痛
    ├── 再選訓練模式：full-batch / mini-batch / online
    ├── 再選架構：centralized / distributed
    └── 最後排除 out-of-scope 選項
```
---
## 3. Core Concepts
### 3.1 本章定位：為什麼這一課是「資料側橋接題」
**大數據（Big Data）** 的重點， 不是只有「資料很多」。 它真正會改變的是： 資料如何被儲存、 如何被讀取、 如何被切批次、 如何被送進模型、 以及系統需不需要從單機變成多機。
**機器學習（Machine Learning, ML）** 在這一課的角色， 不是被拆開講內部運算， 而是被當成一個需要吃資料、耗資源、追求可擴展性（Scalability）的系統。
🗣️ 白話說明： 你可以把這章想成在帶一個大學分組專題。 老師沒有要你推導演算法公式， 而是問你： 「你們資料爆量、檔案格式又亂、每天還一直長， 你是要一台筆電硬跑， 還是拆給多人分工， 還是乾脆改成一批一批慢慢吃？」 考點就在這裡。
🔥 重要觀念： 如果題目在問 **怎麼 scale**， 多半是 L22401。 如果題目在問 **模型內部怎麼更新權重、損失函數怎麼算**， 那通常屬於 L23202 / L23303。
---
### 3.2 大數據特性（Big Data Characteristics, 5V）對機器學習的影響

> 📊 **視覺化總覽：** 5V 特性與 ML 挑戰的對應關係
> → 詳見 [diagrams/01-5v-impact-map.md](diagrams/01-5v-impact-map.md)

#### 3.2.1 Volume（量）🔥🔥
**Volume（量）** 指的是資料量大到超過單機舒適處理範圍， 尤其是超過記憶體（Memory / RAM）容量、 本機儲存 I/O 吞吐、 或單機可接受的訓練時間。
對機器學習（Machine Learning, ML）的底層影響有三個：
1. 不能假設所有資料都能一次載入記憶體。
2. 不能假設每次更新都能掃完整份資料。
3. 需要考慮 **小批次訓練（Mini-batch Training）** 或 **磁碟外學習（Out-of-core Learning）**。
**磁碟外學習（Out-of-core Learning）** 是指： 資料太大，無法完整放進 RAM， 因此系統必須邊讀磁碟、邊切批次、邊更新模型。
🗣️ 白話說明： 像你在 104 人力銀行抓了幾百萬筆職缺紀錄， 再加上履歷關鍵字、公司描述、技能標籤， 你的 MacBook 不可能一次全吞。 這時不是模型突然變笨， 而是你 **餵資料的方法** 一定要改。
ASCII 圖：
```text
小資料情境
[All Data in RAM] --> [Train on single machine]
大資料情境
[Disk / Data Lake]
       |
       v
[Read chunk 1] -> [Update]
[Read chunk 2] -> [Update]
[Read chunk 3] -> [Update]
```
🔥🔥 考試常問： 當題目強調「資料裝不進記憶體」， 第一反應不是某個神祕模型， 而是： `mini-batch`、 `out-of-core`、 或必要時 `distributed training`。
**注意：** Volume（量）很大， **不代表一定要分散式訓練（Distributed Training）**。 如果資料可以切批次並在合理時間內於單機完成， 仍可能使用集中式訓練（Centralized Training）。
#### 3.2.2 Velocity（速）🔥🔥
**Velocity（速）** 指資料產生、到達、變動的速度很快。 這類資料通常不是一次交給你一個完整靜態資料集， 而是以 **流式資料（Streaming Data）** 或持續追加的形式出現。
它對機器學習的底層影響是：
1. 模型不能只在很久以前訓練一次。
2. 更新頻率需要提高。
3. 可能需要 **線上學習（Online Learning）** 或 **增量學習（Incremental Learning）**。
4. 需要面對 **概念漂移（Concept Drift）**。
**概念漂移（Concept Drift）** 是指： 資料的統計分布或規律會隨時間改變， 導致舊模型逐漸失準。 狹義上， Concept Drift 特指輸入與輸出的映射關係 `P(Y|X)` 改變； 若只是輸入分布 `P(X)` 改變， 則更接近 **資料漂移（Data Drift）** 或 **共變量偏移（Covariate Shift）**。 IPAS 考題通常以廣義方式使用，但若出現對比選項需注意此區分。
🗣️ 白話說明： 像 Uber Eats 晚上 6 點到 8 點的訂單型態， 跟凌晨 1 點的訂單型態根本不同。 如果你的模型永遠只吃上個月資料， 它就很像還活在舊台北， 不知道新的消費模式已經變了。
ASCII 圖：
```text
時間 t1      時間 t2      時間 t3
資料分布 A -> 資料分布 B -> 資料分布 C
     |             |             |
     v             v             v
 舊模型準確      開始偏移      若不更新就失準
```
🔥🔥 高頻判斷： 看到「即時」、「連續流入」、「每日每分鐘更新」、「感測器」、「交易串流」， 優先想到 `online / incremental learning`， 而不是只想 `full-batch training`。
#### 3.2.3 Variety（多樣）
**Variety（多樣）** 指資料來源、格式、欄位型態很多樣， 例如結構化資料（Structured Data）、 半結構化資料（Semi-structured Data）、 非結構化資料（Unstructured Data）同時存在。
它對機器學習的影響包括：
1. 特徵型態變得異質（Heterogeneous Features）。
2. 前處理（Preprocessing）成本上升。
3. 需要考慮 **讀時定義結構（Schema-on-read）**。
4. 單一簡單欄位表格假設可能失效。
**讀時定義結構（Schema-on-read）** 是指： 先把資料收進較彈性的儲存環境， 等分析或訓練時再決定怎麼解析欄位結構。
🗣️ 白話說明： 你在做蝦皮商品分析時， 手上同時有訂單表、商品文字描述、客服對話、商品圖片， 這就不是「多一點欄位」而已， 而是資料長相根本不同。 這時真正的難點常常不是模型名字， 而是資料怎麼整進同一條 pipeline。
ASCII 圖：
```text
[交易表 CSV] ----\
[商品描述 JSON] ---+--> [Feature Pipeline] --> [ML Training]
[圖片檔案] ------/
[客服文字紀錄] --/
```
考場上， 如果題目同時提到 **Data Lake（資料湖）**、 **Spark（Apache Spark）**、 **Ray**、 或分散式前處理， 通常就在考 Variety（多樣）加上規模處理能力。 Spark MLlib / Data Lake 等工具的完整說明詳見 3.8.3。
#### 3.2.4 Veracity（真實性）
**Veracity（真實性）** 指資料可信度與品質問題， 包括噪音（Noise）、 缺漏值（Missing Values）、 異常值（Outliers）、 標註錯誤（Label Errors）、 以及來源不一致。
它對機器學習的底層影響是：
1. 模型更容易學到錯誤規律。
2. 泛化能力（Generalization）下降。
3. 訓練穩定性與實務可用性下降。
4. 需要選擇較有 **抗噪性（Robustness to Noise）** 的方法與流程。
部分影響可透過 **正規化（Regularization）** 或 robust 方法緩解。
🗣️ 白話說明： 像你在整理 LINE 官方帳號互動資料時， 如果一堆使用者訊息被錯分、欄位漏值很多， 模型就像被餵到錯誤八卦。 牠不是不努力， 是資訊本身就不可靠。
ASCII 圖：
```text
真實規律 ----> 可學到有用模式 ----> 泛化較穩
雜訊過多 ----> 學到錯誤模式 ----> 上線表現不穩
```
🔥 重要觀念： 大數據不代表高品質資料。 資料更多， 如果噪音也更多， 模型不一定更好。
#### 3.2.5 Value（價值）
**Value（價值）** 指的是資料帶來的實際商業效益， 是否足以支撐蒐集、清理、儲存、運算與維運成本。
它對機器學習的影響不是技術不可不可行， 而是 **值不值得做那麼重的系統設計**。
你要思考：
1. 多收 10 倍資料，模型真的提升很多嗎？
2. 多建一套分散式叢集（Distributed Cluster），ROI 合理嗎？
3. 某些資料蒐集成本高，是否值得納入？
🗣️ 白話說明： 就像你租台北房子。 不是看到空間更大就一定搬， 而是要看租金增加多少、通勤有沒有變方便、生活品質有沒有真的更好。 資料也是一樣， **不是越多越神，重點是值不值得。**
ASCII 圖：
```text
更多資料 --> 更高蒐集/儲存/算力成本 --> ? --> 更高商業價值
                          |
                          +--> 若提升有限，可能不划算
```
🔥 常見考法： 題目描述新資料來源蒐集昂貴， 但模型改善有限， 你要想到的是 `cost-benefit tradeoff`， 不是盲目追求 data maximalism。
---
### 3.3 5V 如何直接影響訓練模式選擇

> 📊 **三種訓練模式資料流圖：** Full-batch / Mini-batch / Online 比較
> → 詳見 [diagrams/02-training-modes-flow.md](diagrams/02-training-modes-flow.md)

把 5V 與訓練模式連起來， 才是本章最重要的橋接能力。
```text
Volume   --> full-batch 吃不下 --> 先想 mini-batch / out-of-core
         \-> 若單機仍撐不住   --> 再考慮 distributed
Velocity --> 資料一直來     --> online / incremental
Variety  --> 前處理複雜     --> flexible pipeline / distributed preprocessing
Veracity --> 噪音高         --> 強化資料品質與穩健性
Value    --> 成本敏感       --> 選最值得的架構，不一定選最大的
```
🗣️ 白話說明： 考場常不是直接問你定義， 而是丟一個情境： 「資料每秒流入、格式很多、單機快爆 RAM、預算又有限。」 你要能把每個訊號拆回 5V， 再推出適合的訓練與架構選擇。
---
### 3.4 批次式訓練（Batch-based Training）vs 線上學習（Online Learning）
**批次式訓練（Batch-based Training）** 是訓練資料餵入方式的總類， 底下可再分成 **全批次訓練（Full-batch Training）** 與 **小批次訓練（Mini-batch Training）**。 若題目單獨寫 `batch training`， 要先判斷它是泛指這個總類， 還是特定指全批次訓練。
#### 3.4.1 全批次訓練（Full-batch Training）
**全批次訓練（Full-batch Training）** 是指： 每一次參數更新前， 都先看完整個訓練資料集（Entire Training Dataset）。
它的特性是：
1. 一次更新用到全部資料。
2. 更新次數少，但每次更新成本高。
3. 需要資料大致可完整取得，且通常可放進可處理範圍。
ASCII 圖：
```text
[全部資料 N 筆] --> [算一次更新] --> [下一輪再看全部資料]
```
🗣️ 白話說明： 像你們分組報告一定要等所有組員資料都交齊， 才開一次大會做決策。 好處是資訊完整， 壞處是慢，而且有人遲交就整組卡住。
適用情境：
- 資料量不大
- 靜態資料集（Static Dataset）
- 單機記憶體足夠
- 不追求即時更新
🔥 考試判斷句： 如果資料量很大、還持續流入， 通常 **不適合** 純 Full-batch Training。
#### 3.4.2 小批次訓練（Mini-batch Training）🔥🔥
**小批次訓練（Mini-batch Training）** 是指： 把資料切成固定大小的批次（Batch Size, B）， 每次只用其中一小批更新模型。
若題目特別強調優化器， 才會補寫 **Mini-batch SGD**， 也就是「小批次訓練搭配 SGD 優化器」。 本章主名詞以 **小批次訓練（Mini-batch Training）** 為主， 重點不是推導梯度， 而是理解： **它是介於 full-batch 與 online 之間的折衷。**
核心特性：
1. 每次只吃部分資料，降低記憶體壓力。
2. 更新頻率高於 full-batch。
3. 穩定度通常比逐筆更新更好。
4. 很適合大量但非純串流資料。
這是因為逐筆更新時， 單筆梯度估計的方差（Variance）通常較高， 每次更新方向更容易劇烈擺動； 小批次訓練可稍微平均掉這種波動。
ASCII 圖：
```text
N 筆資料
|---- Batch 1 ----|---- Batch 2 ----|---- Batch 3 ----|
       update              update             update
```
🗣️ 白話說明： 像便利商店店員補貨， 不是等整車貨全整理完才上架， 也不是來一瓶飲料就立刻重排整面貨架， 而是每次搬一箱、一箱處理。 這就是 mini-batch 的味道。
🔥🔥 為什麼常考： 因為它剛好是「大數據但還沒大到非得超複雜」的最常見解。 很多實務題都會落在這裡。
#### 3.4.3 線上學習（Online Learning）/ 增量學習（Incremental Learning）🔥🔥
**線上學習（Online Learning）** 或 **增量學習（Incremental Learning）**， 是指資料一筆一筆或一小段一小段到來時， 模型就持續更新， 而不是等整包資料湊齊再一次訓練。
嚴格定義上， **線上學習（Online Learning）** 常指每次處理一個樣本就更新； **增量學習（Incremental Learning）** 可用小批次累積後再更新。 IPAS 考題通常合併使用， 本課題目中也將兩者視為同類。
核心特性：
1. 更新頻率最高。
2. 適合流式資料（Streaming Data）。
3. 可在有限記憶體下持續學習。
4. 對概念漂移（Concept Drift）更有反應能力。
ASCII 圖：
```text
sample 1 -> update
sample 2 -> update
sample 3 -> update
sample 4 -> update
...
```
🗣️ 白話說明： 像 Instagram 推播推薦， 你剛看完一串短影片， 系統不可能等下個月再理解你最近愛看什麼。 資料一來就得慢慢調整。
🔥🔥 命名陷阱： 這裡的 online， 是「資料持續在線進來、模型持續更新」， **不是**「模型部署在線上服務」。
#### 3.4.4 什麼時候用哪一種？
你可以用三個問題快判：
1. 資料能不能一次放進記憶體？
2. 資料是固定一包，還是持續進來？
3. 模型需不需要快速反應最新資料？
快判流程：
```text
資料靜態 + 放得下 RAM
    -> Full-batch 或 Mini-batch
資料靜態 + 放不下 RAM
    -> Mini-batch / Out-of-core
資料持續流入 + 需要持續更新
    -> Online / Incremental
```
🗣️ 白話說明： 如果你每週只收到一次整理好的報表， 跟每天每分鐘都在跳動的訂單流， 當然不能用同一套訓練節奏。
---
### 3.5 Code Item 1：Batch vs Online Training Loop（Python Pseudocode）
下面這段不是在教你演算法公式， 而是在訓練你從 **資料餵入方式** 看出訓練模式。
#### A. 全批次訓練（Full-batch Training）Pseudocode
```python
# 假設 dataset 已經完整載入記憶體
dataset = load_all_data()             # 載入全部資料
model = initialize_model()           # 初始化模型
for epoch in range(num_epochs):      # 進行多輪訓練
    gradients = compute_on(dataset)  # 用整份資料計算本輪更新資訊
    model = update(model, gradients) # 一次更新模型參數
save(model)                          # 儲存模型
```
判讀重點：
- `load_all_data()` 表示預設資料可整包取得。
- `compute_on(dataset)` 表示每次更新都看全部資料。
- 更新頻率低，但每次成本高。
#### B. 線上學習（Online Learning）Pseudocode
```python
# 假設資料是持續流入的串流
stream = read_stream()                   # 開啟資料串流
model = initialize_model()               # 初始化模型
for sample in stream:                    # 每次讀一筆新資料
    features = transform(sample)         # 將新資料轉成可用特徵
    gradients = compute_on(features)     # 只根據這筆資料計算更新資訊
    model = update(model, gradients)     # 立刻更新模型參數
save(model)                              # 在適當時機儲存模型
```
判讀重點：
- `for sample in stream` 是重要訊號。
- 每來一筆就更新，代表 online / incremental 風格。
- 這類題目重點在 **資料到達方式**，不是數學推導。
#### C. 一眼辨識技巧
```text
一次更新前看全部資料 -> Full-batch
一次更新前看固定大小一批 -> Mini-batch
一次更新前看一筆或極小串流 -> Online / Incremental
```
🔥🔥 考場提醒： 看到 `epoch` 不代表就是 full-batch。 有些 mini-batch 也會包在 epoch 裡。 真正要看的是 **每次 update 前吃多少資料**。
---
### 3.6 Code Item 2：Mini-batch Sampling Algorithm Trace
假設總共有 `N = 10` 筆資料， 批次大小（Batch Size, B）為 `4`。
資料編號如下：
```text
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```
若先做隨機打亂（Shuffle）， 得到：
```text
[7, 2, 10, 4, 1, 9, 3, 8, 5, 6]
```
接著切成 mini-batch：
```text
Batch 1 = [7, 2, 10, 4]  -> update 1
Batch 2 = [1, 9, 3, 8]   -> update 2
Batch 3 = [5, 6]         -> update 3
```
ASCII Trace：
```text
Step 1: Shuffle
[7, 2, 10, 4, 1, 9, 3, 8, 5, 6]
Step 2: Slice by B = 4
[7, 2, 10, 4] | [1, 9, 3, 8] | [5, 6]
Step 3: Update per batch
update #1      update #2      update #3
```
對應 pseudocode：
```python
dataset = load_all_data()                    # 載入資料
model = initialize_model()                  # 初始化模型
batch_size = 4                              # 設定小批次大小
for epoch in range(num_epochs):             # 每一輪都重新訓練
    shuffled = shuffle(dataset)             # 先把資料順序打亂
    for batch in make_batches(shuffled, batch_size):  # 切成多個小批次
        gradients = compute_on(batch)       # 只用這一批資料計算更新資訊
        model = update(model, gradients)    # 每一批更新一次模型
```
判讀重點：
- `shuffle()` 常見於 mini-batch。
- `make_batches(..., batch_size)` 是直接證據。
- 每個 batch 都更新一次，不是等整包資料結束才更新。
🗣️ 白話說明： 像你在看 YouTube 留言做情緒分析， 不會把上百萬留言一次塞爆 RAM， 也不會一則留言就重訓整輪。 最合理通常是每次抓固定一批來更新。
---
### 3.7 集中式訓練（Centralized Training）vs 分散式訓練（Distributed Training）

> 📊 **架構圖：** Centralized / Parameter Server / Ring-AllReduce 三種架構對照
> → 詳見 [diagrams/03-distributed-architecture.md](diagrams/03-distributed-architecture.md)

> 📊 **並行模式圖：** 資料並行 vs 模型並行適用情境
> → 詳見 [diagrams/04-data-vs-model-parallelism.md](diagrams/04-data-vs-model-parallelism.md)

#### 3.7.1 集中式訓練（Centralized Training）
**集中式訓練（Centralized Training）** 是指： 在單一機器或單一節點上完成資料處理與模型訓練。
優點：
1. 架構簡單。
2. 開發與除錯成本低。
3. 資料一致性管理較直觀。
限制：
1. 記憶體容量有限。
2. CPU / GPU 數量有限。
3. 沒有多機通訊同步成本，但單機仍可能受 RAM、CPU / GPU 算力與磁碟 I/O 限制。
ASCII 圖：
```text
[Data] --> [Single Machine] --> [Model Update]
```
🗣️ 白話說明： 像全部工作都丟給一位很強的組員做。 溝通最簡單， 但事情一多，他再強也會爆。
#### 3.7.2 分散式訓練（Distributed Training）🔥🔥
**分散式訓練（Distributed Training）** 是指： 把資料處理或模型訓練拆到多台機器、多個節點或多個裝置共同完成。
它的目的通常是解決：
1. 資料太大，單機吞不下。
2. 訓練太慢，單機跑不完。
3. 模型太大，單一裝置放不下。
ASCII 圖：
```text
             +--> [Worker 1] --\
[Dataset] ---+--> [Worker 2] ----> [Sync / Aggregate] --> [Updated Model]
             +--> [Worker 3] --/
```
🗣️ 白話說明： 像期末專題不是一個人硬幹， 而是多人分工。 但人一多就多出同步、版本、溝通成本。 所以分散式不是免費午餐。
🔥🔥 考點提醒： 分散式訓練的 trigger， 通常是 **記憶體、時間、模型大小、吞吐需求**， 不是因為「看起來比較先進」。
#### 3.7.3 什麼時候需要從集中式切到分散式？
當下列任一情況出現時， 就要考慮分散式訓練（Distributed Training）：
- 單機 RAM 放不下所需資料或中間表示
- 單機訓練時間不符合業務需求
- 前處理管線本身就是大規模分散式資料處理
- 模型大小超過單一裝置容量
反過來說， 如果單機就能在合理成本內完成， 集中式通常更簡潔、更穩。
🗣️ 白話說明： 像你只是做一份部門報表， 硬拉整個公司同事一起協作反而更慢。 系統設計也是同樣道理。
---
### 3.8 分散式訓練切法與代表框架
#### 3.8.1 資料並行（Data Parallelism）🔥🔥
**資料並行（Data Parallelism）** 是指： 每個 worker 都持有同一份模型副本， 但各自處理不同的資料切片（Data Shard）。
流程通常是：
1. 把資料分給多個 worker。
2. 各 worker 各自計算梯度（Gradient）。
3. 再把梯度或參數同步（Synchronization / Aggregation）。
ASCII 圖：
```text
                 [Model Copy]
                /     |      \
[Shard 1] -> Worker1  |       \
[Shard 2] -> Worker2  |--> [Aggregate] --> New Model
[Shard 3] -> Worker3  |       /
                \     |      /
                 [Model Copy]
```
🗣️ 白話說明： 像同一份報告模板發給三個組員， 每人各寫不同資料段落， 最後再合併成同一份定稿。
這是大數據情境最常見的分散式方式， 因為很多時候真正爆的是資料量， 不是模型本體。
##### Parameter Server（參數伺服器）架構
**參數伺服器（Parameter Server）** 架構中， 會有專門節點儲存或管理模型參數。 多個 worker 先計算梯度並 push 給 Parameter Server； Parameter Server 聚合梯度並執行參數更新， 再把新參數 pull 回各 worker。
ASCII 圖：
```text
          +------------------+
          | Parameter Server |
          +------------------+
             ^      ^      ^
             |      |      |
        gradient gradient gradient
             |      |      |
         [W1]     [W2]    [W3]
          |        |       |
       shard1   shard2  shard3
```
特點：
- 適合 data parallelism
- 容易理解角色分工
- 但 central coordinator 可能形成瓶頸
##### AllReduce / Ring-AllReduce 架構
**全歸約（AllReduce）** 或 **環形全歸約（Ring-AllReduce）**， 是不依賴單一 parameter server， 而讓多個 worker 彼此交換與聚合梯度的同步方式。
ASCII 圖：
```text
[W1] <--> [W2] <--> [W3] <--> [W4]
  ^                              |
  |______________________________|
每個 worker:
持有模型副本 + 各自算梯度 + 彼此聚合
```
特點：
- 避免單一參數節點成為明顯瓶頸
- 常用於同步式資料並行
- 重點是「多副本、不同資料、再同步」
🔥🔥 考試只要抓大方向： `Parameter Server` 與 `AllReduce` 都屬於 **資料並行（Data Parallelism）** 常見架構。
#### 3.8.2 模型並行（Model Parallelism）
**模型並行（Model Parallelism）** 是指： 模型太大， 無法完整放在單一裝置或單一節點上， 所以把模型不同部分切到不同裝置執行。
ASCII 圖：
```text
Input --> [Model Part A on Device 1] --> [Model Part B on Device 2] --> Output
```
這種情境的主因通常不是資料很多， 而是 **模型本體太大**。
🗣️ 白話說明： 像你不是把工作量分給不同人， 而是因為報告本身太大， 一個人電腦打不開， 只好把前半、後半章節拆開在不同電腦處理。
🔥 重要界線： 如果題目說的是「資料量爆大」， 但沒說模型大到放不下， 優先想到的是 data parallelism， 不是 model parallelism。
#### 3.8.3 代表框架：Spark MLlib（Apache Spark MLlib）
**Spark MLlib（Apache Spark MLlib）** 可視為 分散式資料處理與分散式機器學習的代表性框架例子。
在考試中， 你通常不用背版本， 但要知道它代表的概念是：
1. 能在叢集（Cluster）上做大規模資料處理
2. 能把資料前處理與 ML pipeline 接在一起
3. 適合大數據情境下的分散式工作流
🗣️ 白話說明： 像你不是只找一個人會寫報告， 而是連資料蒐集、清理、彙整、分析、輸出都放到一套多人協作流程裡。 Spark MLlib 代表的就是那種整體 pipeline 思維。
---
### 3.9 5V 與演算法可擴展性（Scalability）的連結

> 📊 **挑戰分類樹：** 大數據 ML 挑戰全景地圖
> → 詳見 [diagrams/05-bigdata-ml-challenges-tree.md](diagrams/05-bigdata-ml-challenges-tree.md)

這裡不用講演算法怎麼算， 但要知道 **什麼特性會讓某類方法比較難 scale**。
#### 3.9.1 高維（High-dimensional）與稀疏（Sparse）資料
當資料維度很高， 或使用大量 one-hot encoding 造成稀疏向量（Sparse Vectors）時， 會產生：
1. 記憶體占用上升
2. 距離計算失去區辨度的風險
3. 前處理與特徵表示成本上升
🗣️ 白話說明： 像把每個人是否買過某個商品都展成欄位， 蝦皮商品一多， 欄位就跟台北租金一樣越飆越高。 這不只是「資料多」， 而是表示方式也會拖垮計算。
🔥 重要提醒： 高維問題常是在提醒你： **某些方法雖然可擴展到大樣本數，不代表對高維就穩。**
#### 3.9.2 不平衡資料（Imbalanced Data）與批次風險
當資料極度不平衡時， 小批次（Mini-batch）可能經常抽不到少數類別， 導致更新過程偏向多數類別。
這裡的考點不是要你背完整公式， 而是要知道： **資料規模大，不代表資料代表性就自然變好。**
在 **類別不平衡（Class Imbalance）** 情境下， 若把所有樣本都預測成多數類， `accuracy` 仍可能看起來很高， 因此單看 accuracy 容易誤判。 此時 `precision` 與 `recall` 往往更能反映少數類表現， 也可用 **class weighting** 或重採樣（Resampling）來緩解偏差。
🗣️ 白話說明： 像公司問卷 10 萬份裡面， 真正抱怨的人只占極少數。 你如果每次隨機抓一小批， 很可能很多批都幾乎看不到那群人， 模型就容易忽略他們。
#### 3.9.3 Variety + Distributed Preprocessing
資料多樣性高時， 很多瓶頸會先出現在前處理（Preprocessing）， 而不是模型本身。
例如：
- JSON 解析
- 日誌彙整
- 文字清理
- 多來源 join
- 特徵抽取（Feature Extraction）
因此， 題目若提 Data Lake、Spark、Ray、pipeline， 常常是在問你： **前處理與訓練是否都需要可擴展的資料架構。**
---
### 3.10 本章最終判斷框架：先看資料痛點，再選訓練與架構
你可以把這一課濃縮成以下決策順序：
```text
Step 1. 先辨識 5V 中哪個最突出
Step 2. 判斷資料是靜態還是流式
Step 3. 判斷資料/模型是否超出單機能力
Step 4. 選訓練模式：full-batch / mini-batch / online
Step 5. 選架構：centralized / distributed
Step 6. 若分散式，再判斷 data parallelism / model parallelism
Step 7. 最後回看成本與價值是否合理
```
🗣️ 白話說明： 像你找工作不是先看公司名氣， 而是先看薪水、通勤、職務內容、成長性。 同理， 做 ML 選型不是先背一堆名詞， 而是先看資料到底痛在哪裡。
🔥🔥 高頻總結：
- `Volume` 大 -> 先想記憶體、mini-batch、out-of-core； 單機仍撐不住時才再考慮 distributed
- `Velocity` 高 -> 先想 online / incremental
- `Variety` 高 -> 先想 pipeline、schema-on-read、distributed preprocessing
- `Veracity` 差 -> 先想品質、抗噪與泛化風險
- `Value` 不高 -> 先想值不值得上重架構
> 補充界線：
若你開始想問「某演算法內部如何計算 prediction、如何推導 loss」， 那已超出本章重點。 （演算法內部原理屬 L23202/L23303 範圍，此處不深入）
---
## 4. Comparison Tables（易混淆概念）
### 4.1 Full-batch vs Mini-batch vs Online / Incremental
| 概念 | Full-batch Training（全批次訓練） | Mini-batch Training（小批次訓練） | Online / Incremental Learning（線上/增量學習） |
|------|----------------------------------|-----------------------------------|-----------------------------------------------|
| 定義 | 每次更新前看完整份資料 | 每次更新前看固定大小一批資料 | 每次更新前看一筆或極小段新資料 |
| 觸發條件 | 資料量小、靜態、可整包處理 | 資料較大、單機記憶體有限、仍可分批訓練 | 資料持續流入、需即時或持續更新 |
| 記憶體需求 | 最高 | 中等 | 最低 |
| 更新頻率 | 最低 | 中等 | 最高 |
| 對 Velocity 的適應 | 差 | 中 | 最好 |
| 對 Volume 的適應 | 差 | 好 | 好 |
| 適用資料型態 | 靜態資料集 | 大型靜態或分批可讀資料 | Streaming data、事件流、持續追加資料 |
| 典型優點 | 邏輯單純、一次看完整資料 | 記憶體與效率折衷佳 | 可持續吸收新資料、較能應對概念漂移 |
| 典型限制 | 吃 RAM、更新慢 | 仍需設計批次流程 | 單筆梯度估計方差較高、更新噪音較大、流程管理較複雜 |
| 考場快判 | 「整包資料」「全資料更新」 | 「batch size」「切批次」「shuffle」 | 「stream」「逐筆更新」「即時」 |
### 4.2 Centralized vs Distributed Training
| 概念 | Centralized Training（集中式訓練） | Distributed Training（分散式訓練） |
|------|-----------------------------------|------------------------------------|
| 定義 | 單機或單節點完成訓練 | 多機、多節點或多裝置共同訓練 |
| 核心目標 | 簡單完成任務 | 擴展資料規模、訓練速度或模型大小 |
| 架構複雜度 | 低 | 高 |
| 記憶體上限 | 受單機限制 | 可藉多節點擴展 |
| 同步成本 | 低 | 高，需要同步/通訊設計 |
| 開發與除錯 | 較容易 | 較困難 |
| 何時適合 | 資料與模型在單機可接受範圍內 | 單機 RAM、時間或模型容量不足時 |
| 常見範例 | 單機 Python/Notebook 訓練 | Spark cluster、multi-worker training |
| 常見陷阱 | 以為單機一定不夠用 | 以為 big data 一律要分散式 |
### 4.3 Data Parallelism vs Model Parallelism
| 概念 | Data Parallelism（資料並行） | Model Parallelism（模型並行） |
|------|------------------------------|-------------------------------|
| 切分對象 | 資料切片 | 模型切片 |
| 每個 worker 的模型 | 通常有完整模型副本 | 只有模型的一部分 |
| 主要 trigger | 資料很多、想加速處理 | 模型太大、單裝置放不下 |
| 常見架構 | Parameter Server、AllReduce | 不同裝置承接不同模型區塊 |
| 同步重點 | 聚合梯度或參數 | 串接模型區段的計算流程 |
| 適合大數據情境 | 很常見 | 不是所有 big data 情境都需要 |
| 考場快判 | 「同一模型 + 不同資料 shard」 | 「模型太大 + 切到不同裝置」 |
| 常見誤解 | 以為一定要有 central server | 以為只要資料大就該用它 |
---
## 5. 口訣 / Mnemonics
### 5.1 5V 口訣
**「量·速·多·真·值」**
- 量：**Volume（量）** 看記憶體與規模
- 速：**Velocity（速）** 看更新頻率與串流
- 多：**Variety（多樣）** 看資料型態與前處理
- 真：**Veracity（真實性）** 看資料品質與抗噪
- 值：**Value（價值）** 看成本效益值不值得
記憶句： **「量太大、速太快、格式太多、資料未必真、最後還要看值不值。」**
### 5.2 訓練模式口訣
**「全批→記憶爆，小批→剛剛好，逐筆→忘不了」**
- 全批：全資料一起看，最吃 RAM
- 小批：批次折衷，最常用
- 逐筆：資料一來就更新，適合 streaming
### 5.3 架構選型口訣
**「先問單機撐不撐，再問多機值不值」**
- 單機撐得住：先考慮集中式
- 單機撐不住：再考慮分散式
- 多機更複雜：不是先進就一定划算
### 5.4 資料並行 vs 模型並行口訣
**「資料太多切資料，模型太大切模型」**
- Data parallelism：同模型，不同資料
- Model parallelism：同資料流程，不同模型部分
### 5.5 考場快判口訣
**「先看 5V，再看 update，最後看架構。」**
- 先找資料痛點
- 再看每次更新吃多少資料
- 最後決定 centralized / distributed
---
## 6. 考試陷阱 (Exam Traps)
❌ 陷阱：**分散式訓練（Distributed Training） = 聯邦學習（Federated Learning）**
✅ 正解： 不是。 分散式訓練是把計算拆到多節點， 重點在擴展資料處理或訓練能力。 聯邦學習（Federated Learning）則更強調資料不出域、隱私保護、跨端協作。 本章可提分散式訓練架構， 但聯邦學習的隱私機制屬 **L22404** 範圍。 會混淆是因為兩者都看起來像「很多節點一起訓練」。
❌ 陷阱：**Online Learning（線上學習） = 線上服務**
✅ 正解： 不是。 Online Learning 是指模型隨資料流持續更新。 線上服務（online service）則是模型被部署後提供即時預測。 一個系統可以是線上服務，但模型不一定線上更新； 也可以做 online learning，但不一定對外即時服務。 會混淆是因為中文都叫「線上」。
❌ 陷阱：**Big data 一定要用分散式訓練（Distributed Training）**
✅ 正解： 不一定。 真正的 trigger 是： 單機記憶體是否放得下、 單機時間是否跑得完、 或模型是否大到單裝置放不下。 如果資料雖大但能用 mini-batch、out-of-core 在單機合理完成， 仍可能採集中式訓練（Centralized Training）。 會誤解是因為很多教材把「大數據」直接畫成「叢集」。
❌ 陷阱：**模型並行（Model Parallelism）一定比資料並行（Data Parallelism）更適合 big data**
✅ 正解： 不一定，很多 big data 情境反而先考慮 data parallelism。 因為大多數情況先爆的是資料量， 不是模型本體。 只有當模型大到單裝置放不下時， model parallelism 才成為主要選項。 會誤解是因為 model parallelism 聽起來比較「進階」。
❌ 陷阱：**資料越多，模型一定越準**
✅ 正解： 不一定。 如果 Veracity（真實性）差， 資料噪音、標註錯誤、缺漏值很多， 更多資料可能只是把錯誤放大。 此外 Value（價值）也要評估， 因為多收資料不一定值得。
❌ 陷阱：**有 epoch 就一定是 full-batch**
✅ 正解： 不一定。 mini-batch training 也常常以 epoch 作為外層迴圈。 真正關鍵是 **每次 update 前吃多少資料**， 不是變數名字叫什麼。
---
## 7. 情境題快速判斷 (Scenario Quick-Judge)
### 7.1 關鍵字 → 訓練模式
🔑 看到關鍵字 → 選這個答案
- `資料可完整載入`、`靜態資料集`、`一次看全部資料` → **Full-batch Training（全批次訓練）**
- `batch size`、`shuffle`、`切批次`、`RAM 不夠一次吞全部` → **Mini-batch Training（小批次訓練）**
- `stream`、`逐筆到來`、`即時更新`、`概念漂移` → **Online / Incremental Learning（線上/增量學習）**
### 7.2 關鍵字 → 5V 痛點
🔑 看到關鍵字 → 選這個答案
- `裝不進記憶體`、`數十億筆`、`單機太慢` → **Volume（量）**
- `每秒進資料`、`持續追加`、`即時分析` → **Velocity（速）**
- `表格 + JSON + 文字 + 圖片`、`Data Lake` → **Variety（多樣）**
- `缺漏值`、`標註不一致`、`噪音高` → **Veracity（真實性）**
- `蒐集成本高`、`效益有限`、`ROI` → **Value（價值）**
### 7.3 關鍵字 → 架構選擇
🔑 看到關鍵字 → 選這個答案
- `單機可完成`、`架構簡單優先` → **Centralized Training（集中式訓練）**
- `單機 RAM 不足`、`訓練時間太久`、`多節點協作` → **Distributed Training（分散式訓練）**
- `同一模型副本`、`不同資料 shard`、`多 worker 聚合` → **Data Parallelism（資料並行）**
- `模型太大放不下一張卡`、`模型切成不同部分` → **Model Parallelism（模型並行）**
### 7.4 關鍵字 → 分散式細部架構
🔑 看到關鍵字 → 選這個答案
- `parameter server`、`worker push 梯度給中央節點` → **資料並行中的 Parameter Server 架構**
- `allreduce`、`ring-allreduce`、`沒有單一 central server 聚合` → **資料並行中的 AllReduce 架構**
- `Spark MLlib`、`cluster 上做 ML pipeline` → **分散式資料處理與訓練框架**
### 7.5 情境句 → 快判
🔑 看到關鍵字 → 選這個答案
- `每天新增交易紀錄，模型要持續更新` → **Online / Incremental Learning**
- `資料很大但每天只離線重跑一次` → **Mini-batch 或 Out-of-core，未必一定 distributed**
- `多來源資料先做大規模清理後再訓練` → **Variety + Distributed Preprocessing**
- `模型本身超大，單卡放不下` → **Model Parallelism**
- `資料超大，但模型普通，只是想加速` → **Data Parallelism**
- `題目強調隱私、資料不出裝置` → **小心這偏向 Federated Learning，非本章主軸**
### 7.6 排除法提示
🔑 看到關鍵字 → 排除這些答案
- `問 prediction 怎麼算` → 排除 L22401 主軸，這偏演算法內部
- `問 loss function、backprop、驗證指標數學` → 排除，本章不深入
- `問隱私保護與跨端資料不出域` → 排除，本章不是 L22404
---
## 8. 結尾：快速自我檢查 ✅
用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。
- [ ] 我能在 30 秒內解釋 **大數據 5V（Volume, Velocity, Variety, Veracity, Value）** 各自如何影響機器學習的訓練模式與架構選擇。
- [ ] 我能說出 **Volume（量）** 為什麼會引出記憶體限制、mini-batch、out-of-core learning，而不是只會回答「資料很多」。
- [ ] 我能說出 **Velocity（速）** 為什麼會引出 streaming data、concept drift、online / incremental learning。
- [ ] 我能比較 **Full-batch Training、Mini-batch Training、Online / Incremental Learning** 的更新頻率、記憶體需求與適用場景。
- [ ] 我能從一段 pseudocode 判斷它是在做全批次、小批次，還是線上學習，依據是每次 update 前吃多少資料。
- [ ] 我能區分 **Centralized Training（集中式訓練）** 與 **Distributed Training（分散式訓練）**，並說出真正 trigger 是單機資源是否不足。
- [ ] 我能區分 **Data Parallelism（資料並行）** 與 **Model Parallelism（模型並行）**，並知道前者是資料多、後者是模型太大。
- [ ] 我能解釋 **Parameter Server** 與 **AllReduce / Ring-AllReduce** 都屬資料並行常見架構，只是同步方式不同。
- [ ] 我能在情境題裡看出 **Variety（多樣）** 其實常在考資料前處理 pipeline、schema-on-read、Data Lake 與分散式處理。
- [ ] 我能主動排除超出本章的內容，像是 **backpropagation 內部原理、loss function 數學、federated learning 隱私機制**。
> 📌 本章 out-of-scope：**backpropagation 內部原理、loss function 數學推導、模型訓練評估驗證細節、federated learning 隱私保護機制**。這些分別屬 **L23202 / L23303 / L22404** 等範圍，此處不深入。
