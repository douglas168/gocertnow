# L11301 機器學習基本原理 — Research Notes

> **Scope boundary:** iPAS AI應用規劃師 **初級 (beginner)** level only.
> Depth cap: "model training uses data to learn patterns; generalization means the model works on unseen data."
> **Excluded:** formulas, loss functions, gradient descent, code, specific algorithm internals, metric calculations, bias-variance math.
> All notes below are at the conceptual level only.

---

## Taiwan Standard Terminology (Glossary)

This glossary captures the preferred Traditional Chinese terms used in Taiwan technical writing and in iPAS-adjacent material. When multiple variants exist, the **preferred** term is marked.

| English | Preferred (Taiwan) | Accepted variants | Notes |
|---|---|---|---|
| Machine Learning | **機器學習** | — | Universally used |
| Model | **模型** | — | |
| Training | **訓練** | — | |
| Model Training | **模型訓練** | — | |
| Inference | **推論** | 推理 (less preferred in TW) | iPAS & Taiwan industry use 推論 |
| Parameter (learned) | **參數** | 模型參數 | Weights/biases are examples, but at beginner level just say "模型在訓練中學到的內部數值" |
| Hyperparameter | **超參數** | — | Standard |
| Training set | **訓練集** | 訓練資料集 | |
| Validation set | **驗證集** | — | |
| Test set | **測試集** | — | |
| Generalization | **泛化** | 一般化 (rare in TW ML) | **泛化** dominates Taiwan ML writing. 泛化能力 = generalization ability |
| Overfitting | **過度擬合** | 過擬合、過度配適 | Taiwan material uses 過度擬合 most often; 過擬合 is also common; 過度配適 appears in some statistics-leaning textbooks. iPAS material uses **過度擬合**. |
| Underfitting | **擬合不足** | 欠擬合、配適不足 | Taiwan material mostly uses **擬合不足** or **欠擬合**. iPAS seen uses 欠擬合. |
| Pattern | **模式** / **規律** | — | Both are fine; 規律 reads more naturally in exam prose |
| Pattern Recognition | **模式識別** | 圖型識別 (older) | |
| Data-driven | **資料驅動** | 數據驅動 (Mainland) | Use **資料驅動** in Taiwan writing |
| Deployment | **部署** | 佈署 | **部署** is the iPAS/industry standard |
| Workflow | **工作流程** | 流程 | |
| Data Collection | **資料收集** | 數據收集 (Mainland) | |
| Data Preparation | **資料準備** | 資料整理 | |
| Model Evaluation | **模型評估** | — | |

**Terminology trap for exam:** Test-writers sometimes use 過擬合 in one question and 過度擬合 in another — they mean the same thing. Students should recognize both.

---

## 1. 機器學習 vs. 傳統程式設計 (Paradigm Shift)

### The standard framing used in Taiwan material

This is the canonical diagram found in virtually every Taiwan ML introduction:

- **傳統程式設計 (Rule-based):**
  - 輸入 = 規則 (rules) + 資料 (data)
  - 輸出 = 答案 (answers)
  - 人類手動撰寫規則 → 電腦依規則執行
- **機器學習 (Data-driven):**
  - 輸入 = 資料 (data) + 答案/標籤 (answers)
  - 輸出 = 規則 (a trained model that encodes the rules)
  - 電腦從資料中自行歸納規則

This "rules+data→answers" vs. "data+answers→rules" flip is THE standard exam-ready framing. It appears in Taiwan beginner textbooks, Medium articles, iThome rotations, and is essentially universal.

### Key conceptual contrasts

| Dimension | 傳統程式設計 | 機器學習 |
|---|---|---|
| Who writes the rules | 人類工程師 | 電腦從資料中自行學到 |
| Input | 規則 + 資料 | 資料 + (標準答案) |
| Output | 答案 | 模型 (內含規則) |
| Best when | 規則明確、邏輯清楚 | 規則複雜或難以明確定義 |
| Explainability | 高（規則可讀） | 較低（黑箱問題） |
| Data requirement | 少 | 大量資料 |
| Adaptability | 規則變更需人工改寫 | 可用新資料重新訓練 |

### Classic example used in Taiwan material

The single most common example is **垃圾郵件過濾 (spam filter)**:
- 傳統: 工程師手寫規則 — "若主旨含有『免費』『中獎』就標為垃圾郵件"。問題：規則無限多、垃圾郵件會演化、維護成本爆炸。
- 機器學習: 給模型「一大堆郵件 + 每封是否為垃圾郵件的標籤」，讓模型自己學出「什麼樣的郵件像是垃圾郵件」。

Other frequently cited examples in Taiwan material:
- **傳統適合:** 計算機四則運算、ATM PIN 驗證、網站按鈕邏輯、CAPTCHA 驗證 — 規則明確
- **ML 適合:** 圖像辨識、語音助理、Netflix 推薦、自駕車、詐騙偵測 — 規則難以手寫

### Paradigm shift framing

- 典範轉移 (paradigm shift): 軟體開發從「規則驅動」轉向「資料驅動 (data-driven)」。
- Good one-liner: 「機器學習讓電腦從『被告知該怎麼做』進化為『從範例中學會該怎麼做』。」

**Sources:**
- [2/100 傳統程式設計 vs 機器學習 (vocus)](https://vocus.cc/article/683165c8fd89780001033332)
- [機器學習模型是什麼？(Nextlink)](https://www.nextlink.cloud/news/different-machine-learning-deep-learning/)
- [為何各行各業都在夯機器學習？(iThome)](https://www.ithome.com.tw/article/126408)

---

## 2. 機器學習的定義與目的

### Standard Traditional Chinese definition

- **機器學習 (Machine Learning, ML)** 是人工智慧 (AI) 的一個子領域，研究如何讓電腦程式從資料或經驗中自動「學習」，並利用學到的規律對新資料做出預測或決策，而不需要人類逐條明確撰寫規則。
- 核心概念：**從資料中自動抽取模式 (pattern)，並用這些模式來處理未來的新資料。**

### Tom Mitchell 的經典定義 (often cited in Taiwan)

Tom Mitchell 在其 1997 年教科書 *Machine Learning* 中給出的定義，iPAS 及大部分台灣教科書都會引用：

> 「一個電腦程式被說成從經驗 E 中針對某類任務 T、以效能度量 P 進行學習，當它在 T 這類任務上的表現（以 P 衡量）會隨著經驗 E 累積而改善。」
> *(A computer program is said to learn from experience E with respect to some class of tasks T and performance measure P, if its performance at tasks in T, as measured by P, improves with experience E.)*

The **T/E/P framing** is exam-friendly:
- **T (Task):** 要解決的任務 (e.g., 分類郵件)
- **E (Experience):** 資料/經驗 (e.g., 標註過的郵件樣本)
- **P (Performance):** 效能衡量方式 (e.g., 正確率)

### Why ML matters — where traditional programming fails

- 規則太複雜、太多、或不斷變動 → 手寫不完 (spam, fraud detection)
- 規則人類自己說不清 → 難以轉成 if/else (image recognition, natural language)
- 環境會變 → 需要能用新資料持續改善的系統
- 有大量歷史資料可用 → 適合讓電腦自己歸納

**Sources:**
- [機器學習 — 維基百科 (zh-tw)](https://zh.wikipedia.org/zh-tw/%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0)
- [什麼是機器學習 (SAP Taiwan)](https://www.sap.com/taiwan/products/artificial-intelligence/what-is-machine-learning.html)
- [Jake's Blog - 機器學習是什麼？](https://jake.tw/machine-learning-fundamentals/)

---

## 3. 模型訓練 (Model Training) — Concept Only

### What a "trained model" means, conceptually

- A **模型 (model)** 可以想成一個「會做某件事的函式或規則系統」，裡面有很多可以調整的**內部設定值（參數）**。
- 未訓練的模型像一個「空白的決策系統」 — 規則尚未被調好，隨便問它什麼都答不準。
- **訓練 (training)** 的過程就是：給模型看一大堆「範例 (資料) + 正確答案」，讓模型**慢慢調整自己的內部設定值**，使得它回答得越來越接近正確答案。
- 完成訓練後的模型 = **「一套已經從資料中歸納好的規則」**，可以拿來處理新資料。

### Beginner-safe analogy

Think of training like a student studying past exam papers:
- 沒訓練的模型 = 剛入學、什麼都不會的學生
- 訓練資料 = 練習題 + 標準答案
- 訓練過程 = 反覆練習、對答案、修正自己的判斷
- 訓練完的模型 = 已經學會該科的學生，可以應付新題目

### Role of data in training

- 資料是機器學習的「教材」。沒有資料就沒有訓練。
- 資料的**品質與數量**直接決定模型學到的東西好不好（呼應 L11202: garbage in, garbage out）。
- 越多「有代表性」的資料 → 模型越有機會學到真實世界的規律。

### What to avoid at this level

Do **NOT** mention at 初級 level:
- Loss functions by formula
- Gradient descent steps / learning rate numbers
- Specific optimizers (Adam, SGD)
- Backpropagation mechanics
- Iterations / batch size numbers

At beginner level, "訓練 = 讓模型從範例中慢慢把內部設定值調好" is enough.

**Sources:**
- [ML 學習筆記 — 基本概念、Model Training (Medium)](https://medium.com/@karary/machine-learning-%E5%AD%B8%E7%BF%92%E7%AD%86%E8%A8%98-1-%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5-model-training-%E5%B8%B8%E8%A6%8B%E5%95%8F%E9%A1%8C%E8%88%87%E8%A7%A3%E6%B3%95-b09a7318b2d3)
- [Solwen AI - 機器學習入門](https://solwen.ai/posts/machine-learning)
- [Microsoft Learn — 建立機器學習模型](https://learn.microsoft.com/zh-tw/training/paths/create-machine-learn-models/)

---

## 4. 訓練集 / 驗證集 / 測試集

### Standard analogy (this is the one Taiwan material keeps reusing)

Think of a student:
- **訓練集 (Training Set) = 平常上課 + 練習題** → 模型從這裡「學東西」
- **驗證集 (Validation Set) = 模擬考** → 老師用來判斷「學習方法/參數」要不要調整，但不會拿來打最終成績
- **測試集 (Test Set) = 學測/正式考試** → 只用一次，衡量最終真實能力，**不能**拿來回頭調整學習方式

### Purpose of each set

| Set | Purpose | Conceptual role |
|---|---|---|
| **訓練集** | 讓模型實際學習、調整內部參數 | 直接參與訓練 |
| **驗證集** | 在訓練過程中評估模型，用來調整超參數、判斷是否過度擬合 | 輔助調整，不直接訓練 |
| **測試集** | 訓練完全結束後，評估模型在「完全沒看過的資料」上的真實表現 (即泛化能力) | 只用來打最終分數 |

### Why we hold out data

如果用「看過的資料」來評估模型，模型可能只是把答案背下來而已，看起來很準，但一遇到新資料就失靈。**唯一能驗證「學到真本事」的辦法，就是用模型從沒看過的資料來考它。** 這就是為什麼訓練集、驗證集、測試集必須是**完全不重疊**的三份資料。

### Common exam trap: Validation vs. Test

This is a **high-probability confusion area** for iPAS 初級. The exam trap:
- 驗證集是「訓練過程中」評估用 → 可以**反覆使用**、可以回去調整模型
- 測試集是「訓練完成後」評估用 → 理想上**只用一次**，且**絕對不能**拿來再調整模型，否則就等於「作弊」（資料洩漏, data leakage）
- 一句話：**驗證集幫你調模型；測試集只給你最後的成績單。**

### Typical splits — mention as examples, NOT as rules

- 常見切分比例例子：70/15/15、80/10/10、60/20/20
- **不要寫「一定是 70/15/15」** — 比例會依資料量與問題調整
- 當資料量非常大時，驗證/測試集的絕對數量比比例更重要

### Data leakage (hint only, don't go deep)

- 若驗證集或測試集的資料「偷跑到」訓練集中，模型會在評估時看起來異常完美，但上線後崩盤。
- Beginner mention only: **三個集合必須彼此獨立、不可以重疊**。

**Sources:**
- [訓練集、驗證集、測試集的定義 (Cynthia Chuang)](https://cynthiachuang.github.io/What-is-the-Difference-between-Training-Validation-and-Test-Dataset/)
- [機器學習怎麼切分資料 (Medium / Chen Tsu Pei)](https://medium.com/nlp-tsupei/%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%80%8E%E9%BA%BC%E5%88%87%E5%88%86%E8%B3%87%E6%96%99-%E8%A8%93%E7%B7%B4-%E9%A9%97%E8%AD%89-%E6%B8%AC%E8%A9%A6%E9%9B%86-f5a92576d1aa)
- [Google ML Crash Course — Dividing datasets](https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets)

---

## 5. 泛化 (Generalization)

### Taiwan-standard definition

**泛化 (generalization)** 指「模型在沒看過的新資料上仍然能做出正確預測的能力」。
**泛化能力 (generalization ability)** = 模型把從訓練資料中學到的規律，成功套用到新資料上的能力。

### Why generalization is the GOAL of ML

- 機器學習的真正目的**不是**在訓練資料上拿滿分，而是在「未來會遇到的新資料」上表現好。
- 如果模型只會在訓練資料上表現好，那它等同於「把答案背下來的學生」，遇到新題目就掛掉。
- **訓練資料上的分數只是過程指標；真正重要的是它在未見過資料上的表現。**

### Memorization vs. understanding (the exam-friendly analogy)

- **背答案 (memorize)** — 只記得訓練資料的表面特徵，遇到新資料就失靈 → 泛化能力差 → 過度擬合
- **理解規律 (understand / generalize)** — 從訓練資料中抽取出「真正的規律」，新資料也能處理 → 泛化能力好

### Good one-liners for the lesson

- 「機器學習的目標是學到『規律』，不是『背答案』。」
- 「模型能不能在沒看過的資料上表現好，就叫做泛化能力。」
- 「訓練表現好 ≠ 真的學會；在新資料上也能做對，才是真的學會。」

**Sources:**
- [Day12 泛化 Generalization (iThome 鐵人賽)](https://ithelp.ithome.com.tw/articles/10221782)
- [泛化能力 generalization ability (vocus)](https://vocus.cc/article/683122b7fd89780001f312b5)
- [Google ML — Generalization](https://developers.google.com/machine-learning/crash-course/overfitting/generalization)

---

## 6. 過度擬合 (Overfitting) vs. 擬合不足 (Underfitting)

### Terminology (Taiwan)

- **過度擬合 (Overfitting)** — 台灣 iPAS & 技術文章最常見用法。過擬合亦可。過度配適是統計學圈用語。
- **擬合不足 (Underfitting)** — 亦稱 欠擬合 / 配適不足。
- Exam students should recognize **all** variants but write **過度擬合 / 擬合不足 (or 欠擬合)**.

### Core definitions — conceptual only

**過度擬合 (Overfitting):**
- 模型「學過頭」了，不只學到真正的規律，還把訓練資料中的**雜訊、異常值、偶然細節**一併記住。
- 結果：在**訓練集上表現超好**，但在**測試集（沒看過的資料）上表現變差**。
- 本質：模型在「背答案」而不是「學規律」。
- Analogy: 學生把歷屆考古題的每道題答案死背下來，遇到題目稍微變化就不會做。

**擬合不足 (Underfitting):**
- 模型「學得太少」 — 還沒把訓練資料中的規律抓到。
- 結果：**訓練集上就表現不好**，測試集上當然也不好。兩邊都差。
- 本質：模型能力不足以捕捉資料的規律，或訓練不夠久。
- Analogy: 學生還沒讀書就去考試，哪一科都考不好。

### Symptom table (this is what iPAS likes to test)

| 狀況 | 訓練集表現 | 測試集表現 | 代表什麼 |
|---|---|---|---|
| **剛好 (Good fit)** | 好 | 好 | 泛化良好 |
| **過度擬合 (Overfitting)** | **非常好** (幾乎完美) | **差** (掉很多) | 學過頭、背答案 |
| **擬合不足 (Underfitting)** | **差** | **差** | 學太少、能力不足 |

**This table is the single most exam-testable concept in L11301.**

### Causes (conceptual, no math)

**過度擬合的常見原因:**
- 模型「太複雜」（能力太強）相對於資料的真實規律
- 訓練資料太少，模型把少量資料中的偶然雜訊當成規律
- 訓練太久（模型一直修、修到開始背雜訊）
- 訓練資料不具代表性、偏頗

**擬合不足的常見原因:**
- 模型「太簡單」，表達能力不夠
- 訓練時間不足、訓練次數不夠
- 特徵 (features) 選得太差、資訊量不足

### How to recognize in exam scenarios

iPAS past-exam pattern: a scenario describes training/test performance numbers, and asks which phenomenon it represents.
- 「訓練準確率 99%，測試準確率 60%」 → **過度擬合**
- 「訓練準確率 55%，測試準確率 54%」 → **擬合不足** (兩邊都差)
- 「訓練 92%，測試 90%」 → 泛化良好

### Solutions (name only, no math, concept mention)

At 初級 level you can mention these by name without going into mechanism:
- 收集更多資料
- 降低模型複雜度
- 提前停止 (Early Stopping) — 在驗證集表現開始變差前停止訓練
- 資料擴增 (Data Augmentation)
- 正則化 (Regularization) — just mention the name, no math
- 交叉驗證 (Cross-validation) — just mention the name

**IMPORTANT boundary:** At 初級, do NOT explain Bias-Variance tradeoff as a technical decomposition. 中級 territory. However, the **concept** that "simpler models tend to underfit, more complex models tend to overfit, we want a balance" is fair game as a plain-language observation.

**Sources:**
- [Overfitting (Wikipedia EN)](https://en.wikipedia.org/wiki/Overfitting)
- [What is Overfitting (IBM)](https://www.ibm.com/think/topics/overfitting-vs-underfitting)
- [Google ML — Overfitting](https://developers.google.com/machine-learning/crash-course/overfitting/overfitting)
- [Underfitting and Overfitting (GeeksforGeeks)](https://www.geeksforgeeks.org/machine-learning/underfitting-and-overfitting-in-machine-learning/)

---

## 7. 機器學習工作流程 (ML Workflow)

### The standard Taiwan 5-step framing

This is the most common framing in Taiwan beginner material:

1. **定義問題 (Define the Problem)** — 釐清要解決什麼問題、什麼才算成功
2. **資料收集與準備 (Data Collection & Preparation)** — 收集資料、清理、整理、切分（呼應 L11202）
3. **模型訓練 (Model Training)** — 選擇模型、用訓練資料調整模型內部參數
4. **模型評估 (Model Evaluation)** — 用驗證/測試資料檢查模型表現與泛化能力
5. **部署與監控 (Deployment & Monitoring)** — 把訓練好的模型放上線使用，並持續觀察它在實際資料上的表現

Some sources expand to 6 steps by splitting "資料收集" and "資料準備". Either is acceptable for beginner level.

### Connection to the data pipeline from L11202

L11202 的資料整理流程（收集 → 清理 → 轉換 → 分析）對應 ML workflow 的前半段（步驟 1-2）。換言之：**機器學習的第一步不是寫程式，而是整理好資料**。這延續了 L11202 的「資料品質決定模型品質」主張。

### CRISP-DM (mention as "another industry standard")

**CRISP-DM** (Cross-Industry Standard Process for Data Mining) 是資料探勘/機器學習專案廣泛使用的業界標準流程，共六階段：
1. 業務理解 (Business Understanding)
2. 資料理解 (Data Understanding)
3. 資料準備 (Data Preparation)
4. 建模 (Modeling)
5. 評估 (Evaluation)
6. 部署 (Deployment)

**重點**：階段之間**可以來回迭代**，不是線性一次走完。台灣 iPAS 材料會提到 CRISP-DM 作為另一種標準流程框架，學生應能辨識這個名稱，但不需要背熟六階段的細節。

### Iterative nature (the key point)

- 機器學習工作流程**不是一次走完的直線**，而是一個**循環 (loop)**。
- 評估結果可能導致回到「重新收集資料」、「重新調整模型」、「重新定義問題」。
- 部署之後還要**持續監控**（model drift — 模型在現實資料上的表現會隨時間下降）。
- 這個「循環」的觀念是 iPAS 初級喜歡考的重點。

**Sources:**
- [5/100 機器學習的基本流程 (vocus)](https://vocus.cc/article/683168b5fd8978000103d654)
- [政大數據分析社 — 機器學習方法與流程入門 (Medium)](https://medium.com/datamixcontent-lab/%E6%95%99%E5%AD%B8%E9%87%8D%E9%BB%9E-%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%96%B9%E6%B3%95%E8%88%87%E6%B5%81%E7%A8%8B%E5%85%A5%E9%96%80-machine-learning-intro-%E6%94%BF%E5%A4%A7%E6%95%B8%E6%93%9A%E5%88%86%E6%9E%90%E7%A4%BE-110-2-%E7%A4%BE%E8%AA%B2-lesson-6-e94d002d52b8)
- [IBM SPSS Modeler CRISP-DM 指南](https://www.ibm.com/docs/zh-cn/SS3RA7_18.5.0/nl/zh/CN/pdf/ModelerCRISPDM.pdf)
- [CRISP-DM Framework (Kevin Luo / Medium)](https://kilong31442.medium.com/what-is-crisp-dm-framework-on-data-science-94e42a0777ec)

---

## 8. When to Use ML vs. Traditional Programming

### Characteristics of a good ML problem

- **存在規律，但規律複雜或難以明確寫出來** — 例：辨認貓 vs. 狗，要寫出「貓的規則」幾乎不可能
- **有大量歷史資料可用**（含正確答案或可觀察的結果）
- **問題允許某種程度的「預測」而非完全正確**（ML 不保證 100% 對）
- **環境會變、需要持續更新** — ML 可以用新資料重新訓練

### When traditional programming is better

- **規則清楚、邏輯明確** — 計算機、稅額計算、帳務系統
- **需要 100% 可預測與可解釋** — 法規、會計、航太安全系統
- **資料量很少** — 沒有足夠資料訓練 ML
- **錯誤代價極高、無法接受機率性結果**

### One-liner decision rule

- **能用 if/else 寫清楚的事 → 用傳統程式**
- **要從大量例子中學出模式的事 → 用機器學習**

### Taiwan-relevant examples

| 問題 | 合適方法 | 原因 |
|---|---|---|
| 發票加總稅額 | 傳統程式 | 規則明確、不能錯 |
| 辨識便利商店貨架商品 | 機器學習 | 影像多變、規則難寫 |
| 台灣股市買賣點預測 | 機器學習（謹慎） | 有歷史資料、但不保證準 |
| 健保費計算 | 傳統程式 | 法規規則明確 |
| 推薦 Netflix 節目 | 機器學習 | 使用者偏好多樣、需從行為資料學 |
| 自動過濾垃圾郵件 | 機器學習 | 規則多、會演化 |

**Sources:**
- [AI60問 Q31 機器學習有哪些演算法 (Tibame)](https://blog.tibame.com/?p=18419)
- [機器學習模型是什麼 (Nextlink)](https://www.nextlink.cloud/news/different-machine-learning-deep-learning/)
- [Day 6 機器學習模型-學習的種類 (iThome)](https://ithelp.ithome.com.tw/articles/10295354)

---

## 9. 參數 (Parameters) vs. 超參數 (Hyperparameters) — Conceptual

### The concept-level distinction

- **參數 (Parameters)** = 模型「在訓練過程中自己學到的內部數值」。人類不手動設定。
  - 例：神經網路的權重 (weights) 與偏差值 (biases) — **只提名詞，不解釋數學**
- **超參數 (Hyperparameters)** = 「人類在訓練開始之前先決定好」的設定。模型自己不會改。
  - 例：要訓練幾次、學習速率多少、決策樹要多深 — **只提「這些是人類設的設定」，不解釋數值**

### Analogy (exam-friendly)

- 想像烤蛋糕：
  - **超參數** = 烤箱溫度、烤多久、要加多少糖 — **廚師（人類）在開始前決定**
  - **參數** = 蛋糕烤好後的口感、顏色、結構 — 這是**烤的過程自己形成**的結果
- 或者更像 ML 的講法：
  - **超參數** = 你教小孩寫字時給的「學習方法」（練幾遍、每次練多久）
  - **參數** = 小孩練完字後，手上學到的「筆劃力道、筆順習慣」

### Quick rule-of-thumb

「如果一個設定值是你（人類）**必須手動決定的**，它通常就是**超參數**。」
「如果一個設定值是模型**訓練時自己調出來的**，它就是**參數**。」

### Is this term in iPAS 初級 exam?

Based on search of past exam material and study guides:
- **「參數」與「超參數」的概念性區分** — 屬於 iPAS 初級合理範圍，但**深度僅止於概念層次**。
- 學生應能在選擇題中辨認出「人類設定 = 超參數、模型學到 = 參數」的區別。
- **不會考**：具體學習率數值、網格搜尋、貝氏超參數優化等 — 這些是中級/進階。
- Safe beginner framing: 「參數是模型訓練過程中自己學出來的；超參數是人類在訓練前先決定的設定。」

**Sources:**
- [超參數 (維基百科 zh-tw)](https://zh.wikipedia.org/zh-tw/%E8%B6%85%E5%8F%82%E6%95%B0_(%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0))
- [超參數與參數的差別 (Cupoy QA)](https://www.cupoy.com/qa/club/ai_tw/0000016D6BA22D97000000016375706F795F72656C656173654B5741535354434C5542/0000017B7B636BB1000000266375706F795F72656C656173655155455354)
- [AI入門 19 模型參數與超參數 (Pershing)](https://www.pershing.com.tw/ai-%E5%85%A5%E9%96%80%EF%BC%9A19-%E6%A8%A1%E5%9E%8B%E5%8F%83%E6%95%B8%E8%88%87%E8%B6%85%E5%8F%83%E6%95%B8/)

---

## 10. iPAS AI 初級 Past Exam Questions on L11301 Topics

### Depth tested at 初級 level (based on published past exams and study guides)

Per the iPAS 114 年度 學習指引 — 科目一 人工智慧基礎概論 and observed published questions (114 年第一至第四梯次), the ML fundamentals section tests:

- **辨識題 (Recognition)**: 給定情境，識別是過度擬合還是擬合不足
- **定義題 (Definition)**: 從選項選出正確的定義（訓練集/驗證集/測試集的用途）
- **流程題 (Workflow)**: 判斷機器學習工作流程的步驟順序
- **比較題 (Comparison)**: 傳統程式 vs. ML 的差異
- **目的題 (Purpose)**: 為什麼要做驗證、為什麼要切分資料

### Observed question patterns (from study guide & review articles)

1. **Scenario → diagnosis** — 「某模型訓練集準確率 98%，但測試集只有 55%，這是什麼現象？」答案：過度擬合
2. **Purpose of validation** — 「下列何者是驗證集的主要用途？」答案通常：用於調整超參數/檢查訓練狀況
3. **Data split independence** — 「為什麼訓練集、驗證集、測試集必須分開且不能重疊？」答案：避免資料洩漏、確保能真實評估泛化能力
4. **Workflow ordering** — 「下列機器學習步驟的正確順序為？」答案：定義問題 → 資料收集與準備 → 模型訓練 → 模型評估 → 部署
5. **Paradigm difference** — 「傳統程式設計與機器學習的最主要差別為？」答案：傳統是人寫規則、ML 是從資料學規則
6. **Overfitting remedies** — 「下列何者不是預防過度擬合的方法？」

### Key observations about test depth

- **Recall & recognition heavy** — 初級 exam does not ask students to apply formulas or compute metrics
- **Scenario-based framing** — questions describe a situation and ask students to label the phenomenon
- **Definitions matter** — students must know the precise Chinese term for each concept
- **Both 過擬合 and 過度擬合 variants appear** — recognize both
- **No math expected** — anything requiring calculation is 中級/進階 territory
- Some questions push toward 偏差-變異 (bias-variance) territory but iPAS frames it at the "conceptual balance" level for 初級 — students should know "simpler → underfit, complex → overfit, need balance" but not the decomposition

### Common traps

1. **Confusing validation set and test set** — 最常見的選擇題陷阱
2. **Thinking overfitting = model is broken** — 其實是「學太多」，訓練表現反而好
3. **Thinking more data always = overfitting** — 反了，more data usually *reduces* overfitting
4. **Forgetting the workflow is iterative** — exam may ask "ML 流程是否為一次性線性流程？" 答案：否
5. **Confusing 參數 vs. 超參數** — 常見「下列何者是超參數？」題

**Sources:**
- [114 年第四次 iPAS AI 初級 第一科 人工智慧基礎概論 公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%B8%80%E7%A7%91%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E5%9F%BA%E7%A4%8E%E6%A6%82%E8%AB%96(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000442.pdf)
- [AI應用規劃師(初級) 學習指引 科目1 人工智慧基礎概論](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB(%E5%88%9D%E7%B4%9A)-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE1_%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E5%9F%BA%E7%A4%8E%E6%A6%82%E8%AB%961141203_20251222172144.pdf)
- [iPAS AI 初級 考試心得與考古題分享 (CCChen / vocus)](https://vocus.cc/article/68a2c94afd897800015778df)
- [2026/03/21 iPAS AI 初級考前總整理 (CCChen / vocus)](https://vocus.cc/article/69bba7b6fd89780001b3df00)
- [iPAS AI 初級 05/03 第二場 考試心得 (CCChen / vocus)](https://vocus.cc/article/6815f36afd8978000136ffeb)
- [yamol iPAS AI 應用規劃師 初級 試卷列表](https://yamol.tw/cat-iPAS%E2%97%86AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E2%97%86%E5%88%9D%E7%B4%9A-6731.htm)

---

## 11. 模型訓練 vs. 模型推論 (Training vs. Inference)

### The core distinction

- **模型訓練 (Training)**: 用資料「教」模型。發生在上線之前。是「學習階段」。耗時、耗資源，通常只做一次（或定期重做）。
- **模型推論 (Inference)**: 模型上線後，用它對新資料「做預測」。是「使用階段」。每次使用者查詢都會發生，必須快、穩、便宜。

### Analogy

- **訓練** = 學生在學校讀書、練習、考試 → 耗時、需要老師、需要很多材料
- **推論** = 學生畢業後開始工作，用學到的知識處理每天遇到的新問題 → 快速、每天都在發生

### Why this distinction matters (for deployment)

- 訓練的計算需求和推論的計算需求**完全不同**。訓練需要大量資料與算力；推論只需要跑已經訓練好的模型一次。
- 上線後，**絕大多數的運算都花在推論**上，而不是訓練。
- 所以部署時，工程師關心的是：「這個模型推論夠不夠快？每次預測成本多少？」
- Terminology for beginner: 推論 = 把已訓練的模型拿來對新資料做預測。

### One-liner for the lesson

「訓練是讓模型學會；推論是讓模型實際做事。」

**Sources:**
- [AI inference vs. training (Cloudflare)](https://www.cloudflare.com/learning/ai/inference-vs-training/)
- [AI的「訓練」與「推論」會往哪個方向發展？(EE Times Taiwan)](https://www.eettaiwan.com/20201204nt61-where-will-ai-traning-inference-go/)
- [機器學習的模型、訓練與推論 (Johnny Wu / Medium)](https://johnny-notes.medium.com/%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E7%9A%84%E6%A8%A1%E5%9E%8B-%E8%A8%93%E7%B7%B4%E8%88%87%E6%8E%A8%E8%AB%96-bbd8d3faeead)
- [What Is Model Training (IBM)](https://www.ibm.com/think/topics/model-training)

---

## Summary of Boundary Decisions for the Study Guide Writer

**Include at 初級 level:**
- Rules+data→answers vs. data+answers→rules framing (★ core)
- Tom Mitchell T/E/P definition (optional, as historical context)
- Training as "model learns from examples by adjusting internal values"
- Train/validation/test split purposes and the student-exam analogy (★ core)
- Generalization as "working on unseen data" (★ core)
- Overfitting vs underfitting symptom table (★ core — highest exam value)
- 5-step ML workflow + iterative nature (★ core)
- CRISP-DM as "another standard" (name-only)
- When to use ML vs traditional programming
- Parameters vs. hyperparameters concept-level
- Training vs. inference distinction

**Exclude at 初級 level:**
- Any formulas (loss function, gradient descent, regularization math)
- Specific algorithm internals (linear regression math, decision tree splits, neural net backprop)
- Bias-variance decomposition as math
- Specific learning rates, batch sizes, epoch numbers
- Metric calculation (precision/recall/F1 formulas)
- Code examples in any language
- Cross-validation mechanism details (name only is OK)
- Regularization math (L1/L2) — name only, concept only

**If in doubt:** if explaining the concept requires writing a formula or a calculation, leave it out entirely. Stay at the "what it is and why it matters" layer.
