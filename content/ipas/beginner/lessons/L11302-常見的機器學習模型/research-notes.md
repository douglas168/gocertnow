# Research Notes — L11302 常見的機器學習模型

**Lesson scope:** ML taxonomy and conceptual understanding for IPAS AI應用規劃師 初級.
**Depth ceiling:** Recognize and classify — given a scenario, identify which type of learning applies. NO formulas, NO algorithm internals, NO code, NO metric math.
**Estimated exam weight:** 8–12 questions (heaviest topic in L11 subject).

---

## 0. Taiwan Standard Terminology Glossary

Traditional Chinese has multiple variants for many ML terms. The column marked "PREFER" is the Taiwan standard used in IPAS materials and mainstream Taiwan tech blogs (iKala, iThome 鐵人賽, Vocus, NCCU, NVIDIA TW).

| Concept (EN) | PREFER (zh-TW) | Also seen (avoid) |
|---|---|---|
| Artificial Intelligence | 人工智慧 (AI) | 人工智能 (CN-style) |
| Machine Learning | 機器學習 (ML) | — |
| Deep Learning | 深度學習 (DL) | — |
| Generative AI | 生成式 AI (GenAI) | 產生式 AI |
| Supervised Learning | 監督式學習 | 有監督學習 (CN-style) |
| Unsupervised Learning | 非監督式學習 | 無監督學習 / 無監督式學習 |
| Semi-supervised Learning | 半監督式學習 | 半監督學習 |
| Reinforcement Learning | 強化式學習 / 強化學習 | 增強式學習 (older) |
| Self-supervised Learning | 自監督式學習 | 自我監督學習 |
| Multimodal Learning | 多模態學習 | 多模態 AI (colloquial) |
| Classification | 分類 | — |
| Regression | 迴歸 | 回歸 (CN-style) |
| Clustering | 分群 | 聚類 (CN-style) |
| Dimensionality Reduction | 降維 | — |
| Labeled data | 有標籤資料 / 已標記資料 | 有標註資料 |
| Feature | 特徵 | — |
| Decision Tree | 決策樹 | — |
| Random Forest | 隨機森林 | — |
| Support Vector Machine | 支援向量機 (SVM) | 支持向量機 (CN-style) |
| K-Nearest Neighbors | K近鄰 (KNN) | K最近鄰 |
| Naive Bayes | 單純貝氏 / 樸素貝氏 | 樸素貝葉斯 (CN-style) |
| Linear Regression | 線性迴歸 | — |
| Logistic Regression | 邏輯迴歸 / 羅吉斯迴歸 | — |
| Neural Network | 神經網路 / 類神經網路 | 神經網絡 (CN-style) |
| K-means | K-means / K均值 | — |
| Hierarchical Clustering | 階層式分群 | 層次聚類 (CN-style) |
| PCA | 主成分分析 (PCA) | — |
| Autoencoder | 自動編碼器 | — |
| CNN | 卷積神經網路 (CNN) | 卷積神經網絡 |
| RNN | 循環神經網路 / 遞迴神經網路 (RNN) | — |
| LSTM | 長短期記憶 (LSTM) | — |
| Transformer | Transformer（不翻譯） | — |
| Agent | 智能體 / 代理人 | — |
| Environment | 環境 | — |
| State | 狀態 | — |
| Action | 動作 | — |
| Reward | 獎勵 | 回饋 |
| Confusion Matrix | 混淆矩陣 | — |
| Accuracy | 準確率 | 正確率 |
| Precision | 精確率 | 精準率 |
| Recall | 召回率 | 查全率 / 敏感度 (Sensitivity) |
| F1 Score | F1 分數 | — |
| MAE | 平均絕對誤差 (MAE) | — |
| RMSE | 均方根誤差 (RMSE) | — |
| R² | 決定係數 (R²) | — |

---

## A. Hierarchy & Foundation

### A1. AI ⊃ ML ⊃ DL Hierarchy (three-nested-circles model)

**Standard Taiwan framing:**

```
┌──────────────────── 人工智慧 AI ────────────────────┐
│                                                    │
│   ┌────────────── 機器學習 ML ──────────────┐     │
│   │                                          │     │
│   │      ┌────── 深度學習 DL ─────┐         │     │
│   │      │                         │         │     │
│   │      │     生成式 AI 的核心    │         │     │
│   │      └─────────────────────────┘         │     │
│   │                                          │     │
│   └──────────────────────────────────────────┘     │
│                                                    │
│   （符號式 AI、規則系統等非 ML 的 AI 也住在這裡） │
│                                                    │
└────────────────────────────────────────────────────┘
```

- **人工智慧（AI）** — 最外層、最廣義的概念：讓機器展現「智慧」行為（推理、學習、感知、理解語言等）。包含 ML，也包含不學習的規則式系統 / 專家系統 / 符號式 AI。
- **機器學習（ML）** — AI 的一個子領域：不直接寫死規則，而是讓機器從資料中學出規則。
- **深度學習（DL）** — ML 的一種方法，使用多層神經網路（多個隱藏層）。DL 是 ML 的子集，不是 ML 的「平行兄弟」。
- **生成式 AI（GenAI）** — 建立在 DL 之上、以 Transformer 為代表的大型神經網路，能「生成」新的內容（文字、圖像、音訊、程式碼等）。所以 GenAI 也住在最裡面那個 DL 圈。

**Common student misconception trap:** 很多人以為 ML 和 DL 是兩個「並列」的方法。錯！DL 是 ML 的一種方法。考試可能出題：「下列敘述何者正確？A. 機器學習與深度學習是兩個獨立且不相關的 AI 技術 / B. 深度學習是機器學習的一種方法……」正解是 B。

### A2. 機器學習的分類方式

Taiwan-standard classification is **by data labeling / feedback signal**, not by algorithm family:

1. **監督式學習 (Supervised Learning)** — 資料全部有標籤
2. **非監督式學習 (Unsupervised Learning)** — 資料沒有標籤
3. **半監督式學習 (Semi-supervised Learning)** — 少量有標籤 + 大量無標籤
4. **強化式學習 (Reinforcement Learning)** — 沒有標籤，但有獎勵訊號
5.（進階）**自監督式學習 (Self-supervised Learning)** — 從資料本身產生標籤（現代 LLM 的訓練基礎）

這五個叫做「學習典範（paradigm）」。Taiwan 教材最常見的是「三大類 + 半監督 + 強化」的切法：三大類 = 監督、非監督、強化，半監督是中間過渡。

⚠️ **不要把「按資料標籤分類」和「按演算法類型分類（決策樹、神經網路、支援向量機…）」混為一談。** 這是兩個不同的分類維度。一個演算法（例：神經網路）可以用在監督、非監督、強化任何一個典範裡。

---

## B. The Four Classical Paradigms

### B1. 監督式學習 Supervised Learning

**定義：** 使用「已標記（labeled）」的訓練資料，學習「輸入 → 正確輸出」的對應關係。像有老師在旁邊告訴你每題的正確答案。

**兩大子任務：**

| 子任務 | 輸出型態 | 例子 |
|---|---|---|
| **分類 (Classification)** | 離散類別 | 垃圾郵件 / 非垃圾郵件；貓 / 狗 / 鳥；良性 / 惡性腫瘤 |
| **迴歸 (Regression)** | 連續數值 | 房價預測、氣溫預測、銷售額預測 |

口訣：**離散→分類，連續→迴歸。**

**常見演算法（名字而已，不解釋內部機制）：**

- 線性迴歸 (Linear Regression)
- 邏輯迴歸 (Logistic Regression) — 名字有「迴歸」，但其實是分類演算法（陷阱！）
- 決策樹 (Decision Tree)
- 隨機森林 (Random Forest) — 多棵決策樹的集成
- 支援向量機 (SVM, Support Vector Machine)
- K近鄰 (KNN, K-Nearest Neighbors)
- 單純貝氏 (Naive Bayes)
- 神經網路 (Neural Network) — 可以是監督式任務的 backbone
- 梯度提升決策樹 (Gradient Boosting, XGBoost 這類)

**Taiwan-relevant 監督式例子：**

- 垃圾郵件偵測（Gmail 把信件分成「垃圾」/「非垃圾」——二元分類）
- 信用卡詐騙偵測（交易是否為詐騙——二元分類）
- 房價預測（根據坪數、地段、屋齡預測成交價——迴歸）
- 醫療影像診斷（X 光片分類良性/惡性——分類）
- 銷售預測（根據歷史資料預測下一季銷售量——迴歸）
- 客戶流失預測（會 / 不會流失——分類）
- 手寫數字辨識 (MNIST)

### B2. 非監督式學習 Unsupervised Learning

**定義：** 訓練資料**沒有標籤**，模型要自己從資料中找出結構、規律、群組。像沒有老師，學生要自己把一堆東西分成有意義的堆。

**兩大子任務（加一個次要）：**

| 子任務 | 在做什麼 | 例子 |
|---|---|---|
| **分群 (Clustering)** | 把相似資料點歸到同一群 | 顧客分群、新聞分類 |
| **降維 (Dimensionality Reduction)** | 把高維資料壓縮到低維，保留主要資訊 | 資料視覺化、去除雜訊、壓縮 |
| **關聯規則 (Association Rules)** | 找出物品之間的關聯 | 購物籃分析 |

**常見演算法（名字而已）：**

分群類：
- K-means（K均值分群）
- 階層式分群 (Hierarchical Clustering)
- DBSCAN

降維類：
- 主成分分析 (PCA)
- t-SNE
- 自動編碼器 (Autoencoder)

關聯規則：
- Apriori 演算法

**Taiwan-relevant 非監督式例子：**

- 顧客分群（把電商顧客依購買行為分成「高價值」/「潛在」/「流失中」等群——分群）
- 購物籃分析（買了 A 的人也常買 B——關聯規則，超市、電商常用）
- 異常偵測 (Anomaly Detection)（銀行偵測異常交易、工廠偵測設備異常——不知道異常長怎樣，但知道正常長怎樣）
- 主題探索（把一大堆新聞或客訴自動分群找出主題）
- 資料視覺化（把高維基因表達資料壓到 2D 畫散佈圖——降維）

### B3. 半監督式學習 Semi-supervised Learning

**定義：** **少量有標籤資料 + 大量無標籤資料**一起訓練。介於監督和非監督之間。

**為什麼需要它？** 因為實務上，**標記資料非常貴**——通常需要專家（醫生、律師、翻譯者）人工標註。而未標記資料到處都是、近乎免費。半監督式學習能用一小撮標籤「點燃」大量無標籤資料的學習。

**典型 Taiwan 相關應用：**

- 醫療影像診斷（只有少量由醫師標註的 X 光片，但有海量未標註影像。Google Health 的肺結核、肺炎 X 光偵測就是經典半監督案例。）
- 語音識別（少量人工轉錄 + 大量未轉錄音訊）
- 文件分類（少量人工分類的法律文件 + 大量未分類文件）
- 網頁分類（少量人工標的網頁 + 全網海量網頁）

### B4. 強化式學習 Reinforcement Learning (RL)

**定義：** 沒有事先準備好的「正確答案」資料，而是讓一個**智能體 (Agent)** 在**環境 (Environment)** 中嘗試各種**動作 (Action)**，根據結果拿到**獎勵 (Reward)** 或懲罰，慢慢學出一套能讓長期累積獎勵最大化的「策略」。

**五元素（考試重點！）：**

| 英文 | 中文 | 白話 |
|---|---|---|
| Agent | 智能體 / 代理人 | 做決策的那個「玩家」 |
| Environment | 環境 | Agent 所處的世界 |
| State | 狀態 | Agent 當下看到的情境 |
| Action | 動作 | Agent 決定做的事 |
| Reward | 獎勵 | 做完這個動作後環境給的回饋（可正可負）|

口訣：**Agent 在 Environment 看到 State、做出 Action、拿到 Reward。**

**經典 Taiwan 考試會提到的例子：**

- **AlphaGo**（下圍棋擊敗世界冠軍李世乭——RL 的里程碑）
- **自駕車**（環境 = 馬路；動作 = 加速/煞車/轉向；獎勵 = 安全到達）
- **遊戲 AI**（Atari、StarCraft、Dota——DeepMind 和 OpenAI 的知名案例）
- **機器人學習走路 / 抓取物體**
- **廣告推薦系統**（顯示廣告 → 看使用者有沒有點 → 獎勵）
- **大型語言模型的 RLHF**（用人類回饋做強化學習微調）

**演算法名字（不解釋機制）：**

- Q-learning
- Deep Q-Network (DQN)
- Policy Gradient
- Actor-Critic
- PPO (Proximal Policy Optimization)

📌 **初級考試重點：識別「這個情境需要用強化式學習」。判別線索 = 有 agent / 有環境 / 需要在試錯中學出策略 / 有長期獎勵目標。**

---

## C. Additional Paradigms

### C1. 多模態學習 Multimodal Learning

**定義：** 能同時處理**多種不同型態的資料（模態）**——文字、圖像、音訊、影片——並把它們整合成一個共同的理解。

**為什麼重要？** 現代 GenAI（GPT-4V、Gemini、Claude）都是多模態的。這是「圖文並茂的 AI」時代的核心技術。

**代表模型：**

- **GPT-4V / GPT-4o**（OpenAI，o 代表 "omni" 全能；可同時處理文字、圖像、音訊）
- **Gemini**（Google，從一開始就設計為原生多模態）
- **Claude 3+**（Anthropic，支援圖文輸入）
- **DALL·E / Midjourney / Stable Diffusion**（文字 → 圖像生成）
- **CLIP**（OpenAI，把圖像和文字投射到同一語意空間，是很多圖文生成系統的基石）
- **Flamingo**（DeepMind，視覺 + 語言）
- **Whisper**（OpenAI，語音 → 文字）

**多模態 ≠ 多工 (Multitask)：**
- 多模態 = 輸入有多種資料型態
- 多工 = 同一個模型同時學會做多個任務（例：同一個模型同時做翻譯和摘要）
- 一個模型可以同時是多模態 + 多工。

### C2. 自監督式學習 Self-supervised Learning（陷阱題重點）

**定義：** 不需要任何人工標註，而是**從資料本身的結構自動產生「假標籤」**來訓練。

**經典做法：**
- 文字：把句子中的某個字遮掉，讓模型猜被遮掉的是什麼（BERT 的 MLM 任務）
- 文字：給前面的字，讓模型猜下一個字（GPT 系列的 next-token prediction）
- 影像：把圖片切塊打亂，讓模型重組；或遮住一部分讓模型補上

**為什麼重要？** **現代所有大型語言模型 (LLM) 的預訓練階段都是自監督式學習。** ChatGPT、Claude、Gemini 的基礎能力都是這樣來的。

**⚠️ 與半監督式學習的常見混淆（考試陷阱）：**

| 項目 | 半監督式 | 自監督式 |
|---|---|---|
| 有人工標籤嗎？ | 有，但很少 | 完全沒有 |
| 標籤從哪來？ | 人工標註 | 從資料本身的結構自動產生 |
| 代表應用 | 醫療影像分類 | LLM 預訓練、BERT、GPT |
| 訓練流程 | 用少量標籤 + 大量無標籤 | 用資料自己當答案 |

口訣：**半監督「有少量人給的標籤」；自監督「完全不用人給標籤，自己從資料變出標籤」。**

---

## D. Deep Learning (separate from paradigms, is a METHOD)

### D1. 深度學習 Deep Learning

**定義：** 使用**多層神經網路（Deep Neural Network, DNN）**的機器學習方法。「深」指的是神經網路有很多層（隱藏層），讓網路能學到資料的階層式特徵（從低階的邊線、顏色，一路組合到高階的物體概念）。

**與機器學習的關係（重要！）：**
- DL **是 ML 的一種方法**（a subset of ML）。
- DL **不是** ML 的平行分類。
- DL 可以用在監督、非監督、半監督、強化任一個學習典範裡。

**主要架構（名字為主，不解釋內部機制）：**

| 架構 | 中文 | 擅長 |
|---|---|---|
| **CNN** | 卷積神經網路 | 圖像、影像處理（人臉辨識、醫療影像、物體偵測）|
| **RNN** | 循環 / 遞迴神經網路 | 序列資料（文字、語音、時間序列）|
| **LSTM** | 長短期記憶網路 | RNN 的進階版，解決長序列記憶問題 |
| **GAN** | 生成對抗網路 | 生成逼真圖像（早期 deepfake）|
| **Transformer** | （不翻譯） | 序列資料、現代 LLM / GenAI 的基礎架構 |
| **Autoencoder** | 自動編碼器 | 降維、異常偵測、特徵學習 |

**DL vs 傳統 ML 的差異（概念層次）：**

| 項目 | 傳統 ML | 深度學習 |
|---|---|---|
| 資料量需求 | 少到中等 | 通常需要**非常大量**資料 |
| 運算資源需求 | CPU 就夠 | 通常需要 GPU/TPU |
| 特徵工程 | 通常要人工設計特徵 | 能自動從原始資料學出特徵 |
| 可解釋性 | 較高（尤其決策樹）| 較低（黑盒子）|
| 小資料表現 | 較穩定 | 容易過擬合 |
| 擅長資料型態 | 結構化表格資料 | 非結構化（影像、語音、文字）|

**DL 何時過頭 (overkill) vs 何時閃耀：**
- 過頭：小資料量、結構化表格資料、需要可解釋性的情境（金融信用評分、醫療決策）
- 閃耀：影像、語音、文字、超大規模資料、追求最強效能的競賽型應用

---

## E. Model Evaluation (concept level only)

### E1. 為什麼要評估模型？

訓練完一個模型之後，必須**用沒看過的資料**（驗證集 / 測試集，連結回 L11301 train/val/test split 概念）來檢查它「真的有學到東西」，還是只是「背答案」。不同任務（分類 vs 迴歸）要用不同指標。

### E2. 分類指標 Classification Metrics

**混淆矩陣 (Confusion Matrix)** — 二元分類最基本的評估結構，是一個 2x2 表格：

```
                    實際為正        實際為負
預測為正            TP（真陽性）    FP（假陽性）
預測為負            FN（假陰性）    TN（真陰性）
```

- **TP (True Positive)** — 模型說「正」，實際也是正（對）
- **TN (True Negative)** — 模型說「負」，實際也是負（對）
- **FP (False Positive)** — 模型說「正」，實際是負（「誤報」、「狼來了」）
- **FN (False Negative)** — 模型說「負」，實際是正（「漏報」、「漏網之魚」）

從混淆矩陣衍生出四個核心指標（**只要知道直覺意義、不需要公式**）：

| 指標 | 中文 | 白話意義 |
|---|---|---|
| **Accuracy** | 準確率 | 在所有預測中，模型答對幾成？（總體正確率）|
| **Precision** | 精確率 | 在所有「模型說是正」的案例中，真的是正的有幾成？（「誤報有多嚴重」）|
| **Recall** | 召回率 | 在所有「實際為正」的案例中，模型成功抓到幾成？（「漏報有多嚴重」）|
| **F1 Score** | F1 分數 | Precision 和 Recall 的平衡平均；兩者都好 F1 才會高 |

### E3. 準確率陷阱 Accuracy Paradox（高頻考點）

**問題：** 當資料**類別極度不平衡**時，準確率會騙人。

**經典例子：**
- 信用卡詐騙資料：99% 是正常交易、1% 是詐騙。一個什麼都不做、永遠預測「正常」的模型可以拿到 **99% 準確率**——但實際上它抓不到任何一筆詐騙，完全沒用。
- 癌症篩檢：絕大多數人沒癌，模型全部預測「沒癌」也會有很高準確率——但錯過所有真正的癌症病患。
- 垃圾郵件：如果只有 2% 的信是垃圾，永遠預測「非垃圾」就有 98% 準確率。

**所以：** 類別不平衡時，應該看 **Precision、Recall、F1** 而不是 Accuracy。

### E4. Precision vs Recall 的取捨（情境題重點）

**何時 Recall 比較重要？（漏掉代價很大的情境）**

- **醫療診斷**：漏診癌症患者（FN）= 人命關天。寧可多幾個虛驚一場，也不能漏掉真病人。Recall 優先。
- **詐騙偵測**：漏掉一筆詐騙 = 損失真金白銀。Recall 優先。
- **災難預警**：漏掉一個真實災難 = 人命損失。Recall 優先。

**何時 Precision 比較重要？（誤報代價很大的情境）**

- **垃圾郵件過濾**：把重要郵件誤判為垃圾（FP）= 使用者可能錯過重要訊息。寧可放過幾封垃圾，也不能誤殺正常信。Precision 優先。
- **推薦系統**：推薦一堆爛東西 = 使用者流失。Precision 優先。
- **司法判決輔助**：冤枉好人（FP）比漏掉壞人成本更高（至少在許多法律體系中）。Precision 優先。

**F1 Score**：當兩種錯誤都很嚴重、或你不想偏頗任一方時，用 F1。

### E5. 迴歸指標 Regression Metrics（名字 + 直覺即可）

| 指標 | 中文 | 直覺意義 |
|---|---|---|
| **MAE** (Mean Absolute Error) | 平均絕對誤差 | 平均來說，預測跟實際值差多少（越小越好）|
| **RMSE** (Root Mean Squared Error) | 均方根誤差 | 跟 MAE 類似，但對「大誤差」懲罰更重（越小越好）|
| **R²** (Coefficient of Determination) | 決定係數 | 模型解釋了資料變異的幾成？介於 0 到 1，越接近 1 越好；可想成「迴歸版的準確率概念」|

⚠️ **初級不需要背公式**，只要知道名字、知道「用在迴歸任務」、知道直覺意義即可。

---

## F. Paradigm Selection & Traps

### F1. 典範選擇決策樹（情境題核心！）

從題目情境找出關鍵線索，對應到學習典範：

```
題目給的情境
    │
    ├─ 資料有標籤嗎？
    │     │
    │     ├─ 有，全部都有 ──► 監督式學習
    │     │                      ├─ 要預測類別 → 分類
    │     │                      └─ 要預測數值 → 迴歸
    │     │
    │     ├─ 一部分有、一部分沒有 ──► 半監督式學習
    │     │
    │     └─ 完全沒有 ──► 非監督式學習
    │                       ├─ 把相似的歸一群 → 分群
    │                       ├─ 把高維資料壓低維 → 降維
    │                       └─ 找物品間的關聯 → 關聯規則
    │
    └─ 不是「從資料預測」，而是
        「在環境中試錯、追求長期獎勵」？
              │
              └─ ── 強化式學習
```

### F2. Quick scenario cheat-sheet（考試必練）

| 情境 | 答案 | 關鍵線索 |
|---|---|---|
| 根據歷史交易預測客戶是否會流失 | 監督式（分類）| 有歷史標籤「流失 / 未流失」|
| 預測下一季銷售額 | 監督式（迴歸）| 連續數值輸出 |
| 把 10 萬個電商顧客分成若干群 | 非監督式（分群）| 沒有「正確的群」標籤 |
| 垃圾郵件偵測 | 監督式（分類）| 有人工標記的垃圾 / 非垃圾 |
| 訓練 AI 下圍棋 | 強化式 | 試錯、有長期獎勵（贏棋）|
| 讓機器人學走路 | 強化式 | Agent 在環境中試錯 |
| 分析超市購物籃找商品關聯 | 非監督式（關聯規則）| 找物品之間的共現關係 |
| 醫療影像：只有少量醫師標註，大量未標註 | 半監督式 | 少量標籤 + 大量無標籤 |
| ChatGPT 預訓練 | 自監督式 | 從文字本身產生標籤（猜下一個字）|
| 銀行偵測異常交易模式 | 非監督式（異常偵測）| 不知道異常長怎樣，但知道正常長怎樣 |
| 自駕車學開車 | 強化式 | Agent + 環境 + 試錯 |
| 根據房子坪數、地段預測成交價 | 監督式（迴歸）| 連續數值輸出 |

### F3. Common ML taxonomy traps（高頻陷阱）

1. **K-means vs KNN**（名字最像、最容易搞混）
   - **K-means**：非監督式、**分群**、K 指「要分成幾群」
   - **KNN**：監督式、**分類**（或迴歸）、K 指「看最近的幾個鄰居」
   - 兩個 K 意思完全不一樣，兩個演算法也完全不一樣。

2. **分類 (Classification) vs 分群 (Clustering)**
   - **分類**：監督式，**已知類別**，把新資料分到這些類別
   - **分群**：非監督式，**未知類別**，模型自己把相似資料歸在一起
   - 中文字面只差一個字，容易混淆。

3. **邏輯迴歸 (Logistic Regression) 是「分類」不是「迴歸」**
   - 名字裡有「迴歸」但做的是二元分類任務。典型陷阱題。

4. **深度學習 vs 機器學習**
   - DL ⊂ ML。DL 是 ML 的一種方法，不是平行分類。

5. **多模態 ≠ 多工**
   - 多模態 = 多種輸入型態；多工 = 同時做多種任務。

6. **半監督 ≠ 自監督**
   - 半監督：少量人工標籤 + 大量無標籤
   - 自監督：完全不用人工標籤，從資料本身生成標籤

7. **迴歸 ≠ 一定是迴歸任務**
   - 「線性迴歸」是迴歸任務，但「邏輯迴歸」是分類任務。

8. **準確率不是萬能指標**
   - 在類別不平衡時會騙人（accuracy paradox）。

9. **強化學習 ≠ 監督學習的子集**
   - 強化學習有自己的框架（Agent/Env/State/Action/Reward），不是「有標籤」的變形。

---

## G. IPAS Past Exam Notes

### G1. Known question patterns

根據 iPAS 官方樣題（114 年版）與考生心得分享（vocus.cc CCChen 系列），L11302 相關題型集中在：

1. **情境對應題（主流題型）**：給一個商業或實務情境，問「應該使用哪一種學習方式？」或「以下何者最適合使用非監督式學習處理？」選項通常是四種典範中挑一個。
2. **演算法歸類題**：「KNN 屬於下列哪一類學習方式？」正解：監督式。「K-means 屬於下列哪一類？」正解：非監督式（分群）。
3. **分類 vs 迴歸區分題**：給一個任務（例：預測下一季銷售量），問是分類還是迴歸。
4. **概念辨析題**：「下列關於深度學習與機器學習關係的敘述何者正確？」
5. **指標情境題**：「醫療診斷情境下應該優先考慮下列哪個指標？」正解：召回率 (Recall)。
6. **RL 五元素辨識題**：給一個強化學習描述，問哪個是 agent / 哪個是 reward 等。

### G2. Observed question depth

- 考**概念理解和情境判斷**，不考公式計算。
- 考**能不能把新情境對應到正確典範**，不考演算法內部機制。
- 會出現**「NOT 題」**：「下列何者「不屬於」監督式學習演算法？」
- 會出現**「組合題」**：「下列配對何者正確？A. K-means — 監督式 B. KNN — 非監督式 …」

### G3. Official IPAS sources

- iPAS AI 應用規劃師能力鑑定 — 考試樣題（114 年 1 月版）：https://www.ipas.org.tw/AIAP/AbilityPageContent.aspx?pgeno=4de5cc7f-a878-43bd-bd6f-ee11ea40be1c
- 114 年第四次 AI 應用規劃師初級能力鑑定公告試題（第一科：人工智慧基礎概論）：官方 PDF 連結可在 iPAS 學習資源頁取得
- AI 應用規劃師（初級）學習指引—科目 1 人工智慧基礎概論：iPAS 官網下載區
- 經濟部 iPAS 學習資源：https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources

### G4. Community past-exam sources (candidate experience blogs)

- iPAS AI 應用規劃師 初級 08/16 第三場 考試心得與考古題 — CCChen：https://vocus.cc/article/68a2c94afd897800015778df
- iPAS AI 應用規劃師 初級 05/03 第二場：https://vocus.cc/article/6815f36afd8978000136ffeb
- iPAS AI 應用規劃師 初級 03/22 第一場：https://vocus.cc/article/67dec965fd89780001ca1be9
- 考試樣題 114 年 9 月版本整理：https://vocus.cc/article/68cfb4f0fd89780001298b53
- iPAS AI 應用規劃師模擬考題 50 題：https://sustainnovation.cc/3-22-ipas-ai%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB-%E8%80%83%E7%A7%911-%E6%A8%A1%E6%93%AC%E8%80%83%E9%A1%8C/
- Yamol iPAS AI 應用規劃師初級試卷列表：https://yamol.tw/cat-iPAS%E2%97%86AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E2%97%86%E5%88%9D%E7%B4%9A-6731.htm

---

## Boundary Reminders — For the Study Guide Writer

### ✅ DO include

- The three-nested-circles hierarchy AI ⊃ ML ⊃ DL（and where GenAI sits）
- All five learning paradigms: supervised, unsupervised, semi-supervised, reinforcement, self-supervised（self-supervised only as a comparison point with semi-supervised for the trap question）
- Classification vs regression as the two subtypes of supervised
- Clustering vs dimensionality reduction as the two subtypes of unsupervised
- Algorithm **names** per paradigm（決策樹、隨機森林、SVM、KNN、線性迴歸、邏輯迴歸、單純貝氏、K-means、PCA、階層式分群…）
- The 5-element RL vocabulary (Agent/Environment/State/Action/Reward) with canonical examples (AlphaGo、自駕車、遊戲 AI)
- Deep learning architecture **names** (CNN、RNN、LSTM、Transformer) and what each is good for（one sentence each）
- Confusion matrix 2x2 structure (TP/FP/FN/TN) — **structure only**, no formulas
- Intuitive definitions of Accuracy / Precision / Recall / F1 — **no formulas**
- Accuracy paradox with the fraud / spam / cancer examples
- Precision vs recall trade-off with medical (recall) vs spam (precision) examples
- Regression metric **names** (MAE, RMSE, R²) with one-line intuition each
- Scenario-matching table (this is the primary exam format)
- All the trap pairs: K-means vs KNN, 分類 vs 分群, 邏輯迴歸 is classification, DL ⊂ ML, 多模態 ≠ 多工, 半監督 ≠ 自監督
- Taiwan-standard terminology as listed in the glossary
- Multimodal learning (GPT-4V, Gemini, CLIP) — it's increasingly in modern exams

### ❌ DO NOT include

- Any formula (no 1/n Σ, no log, no gradients, no distance formulas, no dot products)
- Any loss function (cross-entropy, MSE, hinge loss, etc.)
- Gradient descent, backpropagation, optimizer mechanics
- Algorithm pseudocode or step-by-step procedures
- Code examples (Python, scikit-learn, TensorFlow, PyTorch)
- How SVM kernels work, how decision trees split, how K-means updates centroids
- How a neural network's activation function works
- How attention in Transformer works
- Hyperparameter tuning details
- Specific F1 / Precision / Recall formulas（只講直覺意義）
- The formula for R² or RMSE
- Bias-variance tradeoff math
- Overfitting detection by numerical means（concept of overfitting belongs to L11301, not here）
- Any calculation questions（初級不考計算）

### 🎯 Study guide tone

- **Scenario-first**：每個典範介紹完就給 2–3 個台灣相關情境例子
- **Trap-aware**：每個容易混淆的地方都要主動對比（特別是 K-means vs KNN、分類 vs 分群）
- **Table-heavy**：用表格做典範比較、指標比較、情境對應
- **Checklist-able**：結尾要有一張「情境 → 典範」速查表讓學生考前複習

---

## Sources

**Taiwan tech blog & educational sources:**
- [什麼是人工智慧、機器學習和深度學習? — Tommy Huang / Medium](https://chih-sheng-huang821.medium.com/%E4%BB%80%E9%BA%BC%E6%98%AF%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7-%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E5%92%8C%E6%B7%B1%E5%BA%A6%E5%AD%B8%E7%BF%92-587e6a0dc72a)
- [人工智慧、機器學習與深度學習間有什麼區別? — NVIDIA 台灣官方部落格](https://blogs.nvidia.com.tw/blog/whats-difference-artificial-intelligence-machine-learning-deep-learning-ai/)
- [人工智慧、機器學習、深度學習是什麼？ — iKala Cloud](https://ikala.cloud/blog/ai-learing/ml-1-ai-ml-deep-learning-intro)
- [三大類機器學習：監督式、強化式、非監督式 — 工程師。日常](https://ai4dt.wordpress.com/2018/05/25/%E4%B8%89%E5%A4%A7%E9%A1%9E%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92/)
- [監督式學習：「分類」和「迴歸」比較 — iKala Cloud](https://ikala.cloud/blog/ai-learing/supervised-learning-classification-regression)
- [[懶人包] 常見監督式機器學習演算法 — iKala Cloud](https://ikala.cloud/blog/ai-learing/supervised-learning-classification-regression-algorithms)
- [監督式學習是什麼？一文看懂監督式學習、非監督式學習差異 — solwen.ai](https://solwen.ai/posts/supervised-learning)
- [非監督式學習的應用情境與演算法分類 — 資料探員 Data Agent / Medium](https://medium.com/datamixcontent-lab/%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E7%9F%A5%E8%AD%98%E9%BB%9E-%E9%9D%9E%E7%9B%A3%E7%9D%A3%E5%BC%8F%E5%AD%B8%E7%BF%92%E7%9A%84%E6%87%89%E7%94%A8%E6%83%85%E5%A2%83%E8%88%87%E6%BC%94%E7%AE%97%E6%B3%95%E5%88%86%E9%A1%9E-c3af292be5cc)
- [半監督式學習（Semi-Supervised Learning）介紹 — 國立政治大學人工智慧跨域研究中心](https://iaic.nccu.edu.tw/column-articles/5)
- [Semi-supervised Learning — Wenwu's blog](https://wenwu53.com/semi-supervised-learning/)
- [強化學習 — 維基百科](https://zh.wikipedia.org/zh-tw/%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0)
- [強化學習的關鍵五大元素：Agent, Environment, State, Action, Reward](https://tw.xglamdring.com/key-elements-of-reinforcement-learning/)
- [多模態學習 — 維基百科](https://zh.wikipedia.org/zh-tw/%E5%A4%9A%E6%A8%A1%E6%80%81%E5%AD%A6%E4%B9%A0)
- [多模態預訓練 CLIP 和 Flamingo — vocus](https://vocus.cc/article/68d0bb42fd8978000163438e)
- [多模態 AI 時代來襲 — BlendVision](https://blendvision.com/zh-tw/blog-zh/beyond-large-language-models-multimodal-ai-applications-will-be-everywhere)
- [自監督式學習 — Medium 謦伊的閱讀筆記](https://medium.com/ching-i/%E8%87%AA%E7%9B%A3%E7%9D%A3%E5%BC%8F%E5%AD%B8%E7%BF%92-self-supervised-learning-for-computer-vision-%E4%B9%8B%E6%A6%82%E8%BF%B0-b0decf770abf)
- [深度學習 DNN、CNN、RNN 概述 — vocus](https://vocus.cc/article/678c898cfd897800012d7158)
- [深度學習演算法：CNN、RNN、GAN、Transformer — vocus](https://vocus.cc/article/6890b339fd89780001443a78)
- [卷積神經網路 — 維基百科](https://zh.wikipedia.org/zh-tw/%E5%8D%B7%E7%A7%AF%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C)
- [看了就被混淆的混淆矩陣及相關效能衡量指標 — 史戴拉寫扣](https://estellacoding.github.io/blog/confusion-matrix-acc-ppv-tpr-f1-auc/)
- [什麼是混淆矩陣(Confusion Matrix) — tako-analytics](https://tako-analytics.com/2024-03-21-data-science-what-is-confusion-matrix-model-evaluation-metric/)
- [機器學習 — 常見的評估指標 — MaDi's Blog](https://dysonma.github.io/2020/12/05/%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92-%E5%B8%B8%E8%A6%8B%E7%9A%84%E8%A9%95%E4%BC%B0%E6%8C%87%E6%A8%99/)
- [機器學習中迴歸模型的效能衡量指標 — 史戴拉寫扣](https://estellacoding.github.io/blog/regression-metrics-mse-rmse-mae-r2/)
- [ML 入門：KNN 與 K-Means 差異 — Chung-Yi / Medium](https://medium.com/chung-yi/ml%E5%85%A5%E9%96%80-%E4%BA%8C%E5%8D%81%E4%B8%80-knn%E8%88%87k-means%E5%B7%AE%E7%95%B0-7dc6ad0227fc)
- [機器學習易混淆名詞/演算法比較 — HackMD](https://hackmd.io/@ritatang242/HJBneZORE)
- [機器學習任務：分類！迴歸！分群！ — Medium](https://medium.com/%E8%AA%AA%E8%AA%AA5%E5%88%86%E9%90%98/%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E4%BB%BB%E5%8B%99-%E5%88%86%E9%A1%9E-%E8%BF%B4%E6%AD%B8-%E5%88%86%E7%BE%A4-ad1a3b56660b)
- [機器學習（下集）非監督式學習筆記 — vocus](https://vocus.cc/article/678f87eefd89780001ab0a49)
- [Day 7 非監督式學習-降維 — 全民瘋 AI](https://andy6804tw.github.io/crazyai-ml/7.%E9%9D%9E%E7%9B%A3%E7%9D%A3%E5%BC%8F%E5%AD%B8%E7%BF%92-%E9%99%8D%E7%B6%AD/)
- [監督式學習與非監督式學習的差異、應用、以及案例 — OOSGA](https://zh.oosga.com/briefings/difference-between-supervised-learning-and-unsupervised-learning/)
- [機器學習是什麼、有何應用？和深度學習、強化學習的差異 — ALPHA Camp](https://tw.alphacamp.co/blog/machine-learning-and-deep-learning-intro)
- [生成式 AI 是什麼？ — SAP Taiwan](https://www.sap.com/taiwan/products/artificial-intelligence/what-is-generative-ai.html)

**International / English reference sources:**
- [Accuracy paradox — Wikipedia](https://en.wikipedia.org/wiki/Accuracy_paradox)
- [Classification: Accuracy, recall, precision — Google ML Crash Course](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall)
- [Accuracy vs. precision vs. recall — Evidently AI](https://www.evidentlyai.com/classification-metrics/accuracy-precision-recall)
- [Deep learning vs machine learning vs AI — Google Cloud](https://cloud.google.com/discover/deep-learning-vs-machine-learning)

**IPAS official & exam resources:**
- [iPAS AI 應用規劃師官方網站](https://www.ipas.org.tw/AIAP)
- [AI 應用規劃師學習資源 — 經濟部 iPAS](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources)
- [iPAS AI 應用規劃師初級 試卷列表 — Yamol](https://yamol.tw/cat-iPAS%E2%97%86AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E2%97%86%E5%88%9D%E7%B4%9A-6731.htm)
- [iPAS AI 應用規劃師 初級 考試心得與考古題分享 — CCChen (vocus)](https://vocus.cc/article/68a2c94afd897800015778df)
