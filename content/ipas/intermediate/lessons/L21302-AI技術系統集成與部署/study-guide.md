# L21302 AI技術系統集成與部署 — 學習指南
## Section 1: Exam Item Mapping
> 對應評鑑範圍：**L21302 AI技術系統集成與部署**

本課是中級科目一 L21 的部署 capstone，承接 **L21301 數據準備與模型選擇**，把「模型怎麼選」往後推進到「模型怎麼上線、維運、更新、回滾、監控與擴展」。考題不是實作題，而是情境判斷題，所以你要會在長題幹裡辨認：這是架構題、部署題、監控題、發布題、測試題、可用性題，還是雲平台選型題。

本課直接對應 syllabus 關鍵字如下：

| syllabus keyword | 你在考場上要會判斷什麼 |
|---|---|
| AI技術系統架構設計 | 看懂 `train → registry → serving → monitor → retrain`，知道每站責任 |
| 模型部署技術 | 區分 **批次推論（Batch Inference）**、**即時推論（Real-time Inference）**、**容器化（Containerisation）**、**API 服務（API Serving）** |
| 模型效能監控 | 區分 **系統監控（System Monitoring）** 與 **模型監控（Model Monitoring）**，辨識 **資料漂移（Data Drift）**、**概念漂移（Concept Drift）** |
| 模型更新管理 | 區分 **版本管理（Versioning）**、**回滾（Rollback）**、**A/B 測試（A/B Testing）**、**金絲雀部署（Canary Deployment）** |
| 系統測試與驗證 | 判斷 **單元測試（Unit Testing）**、**整合測試（Integration Testing）**、**影子測試（Shadow Testing）**、**負載測試（Load Testing）** |
| 系統穩定性與可用性 | 區分 **服務等級協議（Service Level Agreement, SLA）**、**服務等級目標（Service Level Objective, SLO）**，理解備援與擴展 |
| 雲端環境建置 | 用考場等級比較 **Amazon SageMaker AI**、**Google Cloud Vertex AI**、**Azure Machine Learning（Azure ML）** |

與相鄰單元的邊界先切清楚：

| 單元 | 在回答什麼 | 與本課的邊界 |
|---|---|---|
| **L11401** | deployment 是什麼概念 | 初級只到概念；本課才教部署 mechanics 與雲平台 |
| **L21301** | 資料怎麼準備、模型怎麼選 | 本課不重講模型優缺點，直接接上線與維運 |
| **L21203** | 風險、治理、法遵怎麼看 | 本課談部署與運維；不延伸治理、法遵、責任框架 |

🗣️ **白話說明**：如果 L21301 像你在蝦皮挑好一台適合工作的筆電，L21302 就是把它真的帶進公司、裝環境、接系統、設備援、出包能回復。考試不是問你哪台筆電理論最強，而是問你今天公司流量暴增時，哪種做法最合理。

---
## Section 2: 關鍵概念總覽圖 (Knowledge Tree)

```text
🤖 L21302 AI技術系統集成與部署
│
├── 📖 系統架構設計（System Architecture Design）🔥🔥
│   ├── MLOps pipeline
│   │   ├── 訓練（Training）
│   │   ├── 模型登錄（Model Registry）
│   │   ├── 服務提供（Serving）
│   │   ├── 監控（Monitoring）
│   │   └── 再訓練（Retraining）
│   ├── artifact / metadata / version / approval
│   └── 陷阱：監控是維運機制，不是治理框架
│
├── 🔧 模型部署技術（Model Deployment Techniques）🔥🔥
│   ├── 批次推論（Batch Inference）
│   │   └── 非同步、大量資料；陷阱：不追求毫秒回應
│   ├── 即時推論（Real-time Inference）
│   │   └── API endpoint、低延遲；陷阱：常要 autoscaling（流量高時自動增減實例）
│   ├── 容器化（Containerisation）
│   │   └── image 打包環境；陷阱：容器化不等於高可用
│   └── API 服務（API Serving）
│       └── 上層系統共用模型能力；陷阱：能呼叫不等於有版本管理
│
├── 📊 模型效能監控（Model Performance Monitoring）🔥🔥
│   ├── 系統健康（System Health）
│   │   ├── latency / throughput / error rate
│   │   └── CPU / memory / availability
│   ├── 模型健康（Model Health）
│   │   ├── accuracy / precision / recall
│   │   ├── confidence shift / PSI
│   │   ├── 資料漂移（Data Drift）
│   │   └── 概念漂移（Concept Drift）
│   └── 陷阱：CPU 高不等於模型失效；準確率掉也不一定是 infra 壞掉
│
├── 🔄 模型更新管理（Model Update Management）🔥🔥
│   ├── 版本管理（Versioning）
│   ├── 回滾（Rollback）
│   ├── A/B 測試（A/B Testing）
│   ├── 金絲雀部署（Canary Deployment）
│   ├── 影子部署（Shadow Deployment）
│   └── 藍綠部署（Blue-green Deployment）
│       └── 陷阱：Canary 是發布策略；A/B 是效果比較
│
├── ✅ 系統測試與驗證（Testing and Validation）🔥
│   ├── 單元測試（Unit Testing）
│   ├── 整合測試（Integration Testing）
│   ├── 影子測試（Shadow Testing）
│   └── 負載測試（Load Testing）
│       └── 陷阱：shadow 用真流量比對，但不改正式輸出
│
├── 🛡️ 系統穩定性與可用性（Stability and Availability）🔥🔥
│   ├── 服務等級指標（Service Level Indicator, SLI）
│   ├── 服務等級目標（SLO）
│   ├── 服務等級協議（SLA）
│   ├── 備援（Redundancy）
│   └── 自動擴展（Autoscaling）
│       └── 陷阱：SLA 對外、SLO 對內
│
└── ☁️ 雲端環境建置（Cloud Environment Setup）🔥
    ├── Amazon SageMaker AI：real-time endpoint / batch transform / model registry
    ├── Google Cloud Vertex AI：endpoint / traffic split / model monitoring
    ├── Azure Machine Learning（Azure ML）：online endpoint / batch endpoint
    └── 陷阱：平台名稱可變，但 endpoint、batch、registry、monitoring 這四塊不變
```

---
## Section 3: Core Concepts

### 3.1 AI技術系統架構設計（System Architecture Design）🔥🔥
**AI 技術系統架構設計（System Architecture Design）** 的核心，不是把雲端服務名稱背下來，而是能用 **機器學習維運（Machine Learning Operations, MLOps）** 的眼光看完整生命週期：模型訓練出來後，不是直接丟上線，而是要經過版本控管、部署、監控，再回到更新循環。中級最重要的主線就是 `train → registry → serving → monitor → retrain`。

| 階段 | 正式定義 | 你在考場要抓的核心問題 |
|---|---|---|
| **訓練（Training）** | 用資料產出模型 artifact 與評估結果 | 這裡產生的是候選模型 |
| **模型登錄（Model Registry）** | 統一管理模型版本、metadata、核准資訊 | 哪一版可以上線？哪一版可回滾？ |
| **服務提供（Serving）** | 把模型變成可被呼叫的服務 | 模型怎麼被系統使用？ |
| **監控（Monitoring）** | 觀察上線後服務與模型是否退化 | 有沒有變慢、變差、變偏？ |
| **再訓練（Retraining）** | 依監控訊號更新模型與資料 | 退化後怎麼恢復？ |

```text
資料完成 → Training → Model Registry → Serving → Monitoring → Retraining
                                      ↑                          ↓
                                      └──────── version / rollback ┘
```

🔥🔥 **高頻考點**：題目若問「哪個元件最適合保存多個模型版本並支援回滾」，答案通常是 **模型登錄（Model Registry）**，不是 endpoint，也不是 training job。

🗣️ **白話說明**：像你經營 YouTube 頻道，剪片是 **訓練（Training）**，上傳並填標題標籤是 **模型登錄（Model Registry）**，讓觀眾真的看到是 **服務提供（Serving）**，看觀看數和留言是 **監控（Monitoring）**，發現表現不好再重剪就是 **再訓練（Retraining）**。影片不是上架就結束，模型也不是。

> 📖 **視覺化：** MLOps 完整生命週期閉環圖
> → 詳見 [diagrams/01-mlops-pipeline.md](diagrams/01-mlops-pipeline.md)

#### 3.1.1 為什麼 Model Registry 是部署樞紐
**模型登錄（Model Registry）** 不只是「放模型檔案的地方」，它是版本事實來源。通常至少要能記錄 model name、version、training metadata、evaluation metrics、approval status、目前部署位置。沒有 registry，團隊很容易發生「不知道正式環境到底跑哪版」的情況。

```text
Training output
   ↓
[Registry]
   ├── v1 approved
   ├── v2 testing
   └── v0 rollback candidate
   ↓
Deploy to batch job / online endpoint
```

🔥 **考點提醒**：看到「多人協作」「版本追蹤」「核准後部署」「出事能退回」這些詞，優先想到 **模型登錄（Model Registry）**。

#### 3.1.2 傳統 stages 與現行實務
有些教材會講 `None`、`Staging`、`Production`、`Archived` 這類 **階段（Stages）**。其中 `None` 是新註冊模型版本在尚未進行任何 lifecycle transition 前的預設初始狀態。考試看得懂即可；現行實務更常用 **別名（Aliases）** 與 **標籤（Tags）** 管理版本，而且這四個傳統 stages 自 MLflow 2.9.0 起已標示為 deprecated。這一點知道概念即可，不必深入平台實作。（此為更高層次內容，考試只需了解概念）

### 3.2 模型部署技術（Model Deployment Techniques）🔥🔥
部署技術最常考的不是框架名稱，而是「哪種服務模式適合哪種業務情境」。這一段必背四個核心：**批次推論（Batch Inference）**、**即時推論（Real-time Inference）**、**容器化（Containerisation）**、**API 服務（API Serving）**。

#### 3.2.1 批次推論（Batch Inference）
**批次推論（Batch Inference）** 是一次對大量資料做非同步推論，不要求使用者立刻拿到結果。它重點是吞吐量與成本效率，常見於夜間跑批、會員分群、每週重算推薦名單、月結風險評分。

#### 3.2.2 即時推論（Real-time Inference）
**即時推論（Real-time Inference）** 是透過 **端點（Endpoint）** 或 **應用程式介面（Application Programming Interface, API）** 直接回傳預測，重點是低延遲與穩定服務，常見於聊天機器人、線上推薦、交易審核、即時客服。

```text
Batch Inference: data file/table → scheduled job → output file/table
Real-time Inference: app/user → API request → endpoint → immediate response
```

| 面向 | 批次推論（Batch Inference） | 即時推論（Real-time Inference） |
|---|---|---|
| 觸發方式 | 排程或手動 job | request 即時觸發 |
| 回應時間 | 分鐘到小時 | 毫秒到秒 |
| 優先目標 | 吞吐量（Throughput） | 延遲（Latency） |
| 常見場景 | 每天凌晨重算、全量名單更新 | 聊天、推薦、即時審核 |
| 架構特性 | 非同步、可離峰 | endpoint、監控、autoscaling |

🔥🔥 **高頻考點**：看到「每天凌晨」「整批資料」「不需要立刻回應」就偏向 **批次推論（Batch Inference）**；看到「使用者一點就要回」「對話」「線上審核」就偏向 **即時推論（Real-time Inference）**。

🗣️ **白話說明**：批次推論像 7-11 店長打烊後一次做整天盤點；即時推論像 Uber Eats 你一下單，系統要立刻告訴你餐廳接不接、多久送到。一個重「整批處理」，一個重「現在就回」。

#### 3.2.3 容器化（Containerisation）
**容器化（Containerisation）** 是把模型執行環境、依賴套件、推論程式、設定一起打包成可攜執行單位，最常見是 **容器映像檔（Container Image）**。它解決的核心問題是環境一致性與可移植性，不是直接等於高可用或 autoscaling。

```text
Without container: 開發機能跑，正式機不一定能跑
With container: code + model + runtime + dependencies 一起打包
```

🔥 **考點提醒**：容器化主要對應 **環境一致性（Environment Consistency）** 與 **可移植性（Portability）**，不是直接對應 A/B testing 或 SLA。

🗣️ **白話說明**：像你把簡報、字型、影片、音效全部裝進同一個資料夾，不管是在自己電腦、公司會議室、學校教室打開，畫面都盡量一致。沒有 container，就很容易發生「我這台可以，換一台就壞」。

#### 3.2.4 API 服務（API Serving）
**API 服務（API Serving）** 是把模型包成上層系統可呼叫的標準接口。考場不會考 REST 細節，但會考你知道：上層 App 通常不是直接讀模型檔，而是打 endpoint；endpoint 背後可以換模型版本；endpoint 也是監控與告警的重要觀測點。

```text
Client App → API Gateway / Endpoint → Model Server → Prediction Response
```

🔥 **考點提醒**：如果題目說「前端、CRM、APP 都要共用同一個模型能力」，答案多半是 **API 服務（API Serving）**。

### 3.3 模型效能監控（Model Performance Monitoring）🔥🔥
**模型效能監控（Model Performance Monitoring）** 不是只看準確率，也不是只看 CPU。最重要的觀念是把 **系統監控（System Monitoring）** 與 **模型監控（Model Monitoring）** 分開，因為它們回答的是兩個不同問題：系統有沒有穩定跑？模型還有沒有準確工作？

#### 3.3.1 系統監控（System Monitoring）
系統監控看的是服務層是否穩定，常見指標包括 **延遲（Latency）**、**吞吐量（Throughput）**、**錯誤率（Error Rate）**、CPU、memory、availability。這些指標偏向「服務跑不跑得動」。

#### 3.3.2 模型監控（Model Monitoring）
模型監控看的是預測品質與資料狀態，常見指標包括 accuracy、precision、recall、**信心分布（Confidence Distribution）**、特徵分布、人工覆核率、**人口穩定性指標（Population Stability Index, PSI）**。這些指標偏向「模型判得準不準、輸入有沒有變」。

```text
Monitoring
├── System Health: latency / throughput / error rate / CPU
└── Model Health: quality / confidence shift / drift / PSI
```

🔥🔥 **高頻考點**：題目若出現「timeout 變多」「CPU 爆高」「TPS 降低」，偏向 **系統監控（System Monitoring）**；若出現「PSI 上升」「資料分布改變」「準確率持續下滑」，偏向 **模型監控（Model Monitoring）**。

🗣️ **白話說明**：像你經營 Instagram，手機很燙、App 卡住是系統問題；但貼文還是正常發，觸及卻一直掉，那比較像內容效果出問題。AI 服務也是同一套邏輯。

#### 3.3.3 資料漂移（Data Drift） vs 概念漂移（Concept Drift）
**資料漂移（Data Drift）** 是上線輸入資料分布與訓練資料分布不同；**概念漂移（Concept Drift）** 是輸入到輸出的規則關係變了，也就是同樣的特徵，真實標籤含義已經改變。

```text
Data Drift:    P(X)_train ≠ P(X)_serve
Concept Drift: P(Y|X)_train ≠ P(Y|X)_serve
```

| 類型 | 變動焦點 | 常見訊號 |
|---|---|---|
| 資料漂移（Data Drift） | 輸入分布變了 | 年齡、地區、裝置分布變；PSI 上升 |
| 概念漂移（Concept Drift） | 輸入與標籤關係變了 | 特徵看似差不多，但準確率下降、錯誤模式改變 |

🔥🔥 **高頻考點**：雙 11 檔期、開學季、活動流量導致受眾組成改變，常先想到 **資料漂移（Data Drift）**；政策、業務規則、外部環境改變，原本規律失靈，比較像 **概念漂移（Concept Drift）**。

🗣️ **白話說明**：資料漂移像你平常租屋，來看房的大多是學生和上班族，但開學季突然幾乎都是新生，族群組成變了；概念漂移則像市場規則改了，原本「離捷運近就最好租」這個規律突然沒那麼準。

#### 3.3.4 告警（Alerting）
**告警（Alerting）** 是把監控數字變成可執行動作。好的 alert 不只是亮紅燈，而是能對應「誰處理、何時處理、要做什麼」。例如 latency 超標可以觸發擴容與排查下游，error rate 飆高可以觸發回滾，PSI 超標可以啟動資料檢查與 baseline（拿來比較線上資料的基準分布）更新，準確率連續下滑可以啟動 retraining 或增加人工覆核。

🔥 **考點提醒**：看到「監控到異常後自動通知並啟動處理流程」，就是 **告警（Alerting）** 的題型，不是單純 dashboard 題。

> 📖 **視覺化：** 兩層監控架構 + 數據漂移 vs. 概念漂移圖解
> → 詳見 [diagrams/03-monitoring-layers.md](diagrams/03-monitoring-layers.md)

### 3.4 模型更新管理（Model Update Management）🔥🔥
模型一旦上線，就一定會面對更新。**模型更新管理（Model Update Management）** 的核心不是「怎麼做新模型」，而是「怎麼安全地把新模型送進正式流量」。這一段最常考：**版本管理（Versioning）**、**回滾（Rollback）**、**A/B 測試（A/B Testing）**、**金絲雀部署（Canary Deployment）**，以及容易混淆的 **影子部署（Shadow Deployment）**、**藍綠部署（Blue-green Deployment）**。

#### 3.4.1 版本管理（Versioning）
**版本管理（Versioning）** 是用可追蹤編號管理模型生命周期。團隊至少要知道正式環境跑哪版、上一版是哪版、這版由哪次訓練產出、若出事要退回哪版。這通常和 **模型登錄（Model Registry）** 一起出現。

#### 3.4.2 回滾（Rollback）
**回滾（Rollback）** 是新版本出問題時，快速切回既有穩定版本。它的前提就是版本要記得清楚、部署紀錄要完整、舊版還能被重新切回。

🔥🔥 **高頻考點**：題目若強調「快速恢復服務」「新版本異常」「立即切回穩定版本」，答案通常是 **回滾（Rollback）**。

🗣️ **白話說明**：像你手機 App 更新後狂閃退，第一時間不是討論新 UI 漂不漂亮，而是先裝回上一版能用的版本。這就是 rollback。

#### 3.4.3 A/B 測試（A/B Testing）
**A/B 測試（A/B Testing）** 是把流量分給兩個方案，比較哪個在業務或體驗指標上表現較好。重點是「比較效果」，不是主要為了降低部署風險。

#### 3.4.4 金絲雀部署（Canary Deployment）
**金絲雀部署（Canary Deployment）** 是先把少量正式流量導到新版本，確認穩定後再逐步放大比例。重點是「降低發布風險」，不是做實驗設計。

```text
v1 stable 90% + v2 canary 10%
觀察 latency / error / KPI 正常
→ 30% → 50% → 100%
```

#### 3.4.5 影子部署（Shadow Deployment）
**影子部署（Shadow Deployment）** 是正式流量仍由舊版回應，但同一份 request 旁路送到新版做比對。使用者不會真的吃到新模型結果，適合高風險情境先觀察新版本。

#### 3.4.6 藍綠部署（Blue-green Deployment）
**藍綠部署（Blue-green Deployment）** 是同時維持兩套完整環境，切流量時整批切換；若異常可整批切回。優點是切換快、回退快，缺點是資源成本較高。

```text
要比較效果      → A/B Testing
要小流量試發    → Canary Deployment
要偷看真流量表現 → Shadow Deployment
要整套快速切換  → Blue-green Deployment
```

🗣️ **白話說明**：像餐廳改菜單。A/B 是兩種套餐都真的賣，看誰賣得好；Canary 是新菜先只給少數客人；Shadow 是廚房照新菜單做一份，但客人真正拿到的還是舊菜；Blue-green 是兩間廚房都準備好，某個時間點整批切過去。

> 📖 **視覺化：** 四大部署策略流量分配圖 + 快速對照表
> → 詳見 [diagrams/02-deployment-strategies.md](diagrams/02-deployment-strategies.md)

### 3.5 系統測試與驗證（Testing and Validation）🔥
中級不考你寫測試碼，但會考你在情境中選對測試類型。核心四個：**單元測試（Unit Testing）**、**整合測試（Integration Testing）**、**影子測試（Shadow Testing）**、**負載測試（Load Testing）**。

| 測試類型 | 正在驗證什麼 | 最適合抓什麼 |
|---|---|---|
| 單元測試（Unit Testing） | 單一函式、前處理、特徵轉換、欄位映射 | 邏輯 bug、型別錯誤 |
| 整合測試（Integration Testing） | API、資料庫、model server、queue 串接 | 接口對不上、授權錯誤 |
| 影子測試（Shadow Testing） | 真流量下新系統輸出，但不影響正式回應 | 新舊輸出差異 |
| 負載測試（Load Testing） | 壓力下 latency、throughput、error rate | 高併發瓶頸、資源不足 |

```text
Before go-live:
常見驗證組合之一：unit test → integration test → shadow test → load test → rollout
```

（實際順序可依環境調整；核心原則是先驗證正確性，再驗證真實流量風險與容量邊界）

🔥 **考點提醒**：shadow testing 和 canary deployment 都可能碰到真流量，但前者不影響正式輸出，後者會讓部分正式使用者真的吃到新版本。

🗣️ **白話說明**：像大學成果發表前，你自己先在電腦上點投影片是單元測試；接投影機、音響、直播設備一起試是整合測試；找學長姐坐台下看彩排、但正式流程還沒換掉，很像影子測試；模擬 300 人同時進直播間，就是負載測試。

### 3.6 系統穩定性與可用性（Stability and Availability）🔥🔥
部署題很常往 **穩定性（Stability）** 與 **可用性（Availability）** 延伸。你至少要分清 **服務等級指標（Service Level Indicator, SLI）**、**服務等級目標（SLO）**、**服務等級協議（SLA）**，以及知道 **備援（Redundancy）**、**自動擴展（Autoscaling）** 的作用。

#### 3.6.1 SLI / SLO / SLA
**服務等級指標（SLI）** 是量測值，例如 p95 latency、availability、success rate。  
**服務等級目標（SLO）** 是內部目標，例如「p95 latency < 300ms」或「月可用性 99.9%」。  
**服務等級協議（SLA）** 是對外承諾，通常會寫違約責任或補償條款。

```text
SLI = 測量什麼
SLO = 目標要達多少
SLA = 對外承諾多少，沒達到怎麼辦
```

🔥🔥 **高頻考點**：SLO 是內部營運目標；SLA 是對客戶或合約對象的承諾。很多人會反過來。

🗣️ **白話說明**：像你跟自己說「這學期每次報告都要提早一天交」比較像 SLO；你跟組員說「我週三一定交，不然我請飲料」就很像 SLA。

> 📖 **視覺化：** SLI → SLO → SLA 巢狀關係圖 + 可用性換算表
> → 詳見 [diagrams/05-sla-slo-relationship.md](diagrams/05-sla-slo-relationship.md)

#### 3.6.2 備援（Redundancy）
**備援（Redundancy）** 是避免單點故障（Single Point of Failure）的方法，例如多實例、多節點、多可用區。目的不是讓系統更快，而是讓某一台或某一區掛掉時，服務還能繼續。

#### 3.6.3 自動擴展（Autoscaling）
**自動擴展（Autoscaling）** 是依流量、CPU、併發量等指標，自動增加或減少實例。它處理的是波峰波谷與成本平衡，不是所有效能問題的萬靈丹。

```text
Traffic up → autoscaling triggered → instances 2 → 4 → 8 → latency maintained
```

🔥 **考點提醒**：如果瓶頸在模型太重、下游資料庫太慢、或 code 有 bug，光加機器不一定有效。考題會用這點誤導你。

### 3.7 雲端環境建置（Cloud Environment Setup）🔥
中級不考 CLI 與 YAML，而是考你知道三大 **超大規模雲端服務商（Hyperscaler）** 的 MLOps 原語。名字不同，但觀察點其實很穩定：online endpoint、batch job、model registry、monitoring。

#### 3.7.1 Amazon SageMaker AI
**Amazon SageMaker AI** 在本課最重要的是：**即時端點（Real-time Endpoint）**、**批次轉換（Batch Transform）**、**模型登錄（Model Registry）**，以及端點可搭配 autoscaling。看到 `batch transform` 幾乎就是 AWS 的辨識詞。

#### 3.7.2 Google Cloud Vertex AI
**Google Cloud Vertex AI** 在本課最重要的是：部署到 **端點（Endpoint）**、做 **流量分配（Traffic Split）**、有 **模型監控（Model Monitoring）**，以及明確區分 online prediction 與 batch prediction。看到 `traffic split` 通常就想到 Vertex AI。

#### 3.7.3 Azure Machine Learning（Azure ML）
**Azure Machine Learning（Azure ML）** 在本課最重要的是：**線上端點（Online Endpoint）**、**批次端點（Batch Endpoint）**、**受管線上端點（Managed Online Endpoint）**。看到 `online endpoint / batch endpoint` 這組名詞，就很像 Azure。

```text
SageMaker AI: real-time endpoint / batch transform / model registry
Vertex AI: endpoint / traffic split / model monitoring / batch prediction
Azure ML: online endpoint / batch endpoint / managed online endpoint
```

🗣️ **白話說明**：你可以把三個平台想成三間大型連鎖便利商店。店名不同、動線不同，但你還是會找固定區域：咖啡、微波、繳費、取貨。雲端平台也是一樣，品牌不同，但考題要你辨認的是哪一塊負責 endpoint、哪一塊做 batch、哪一塊做 version、哪一塊做 monitoring。

#### 3.7.4 本課到這裡就夠
你只要會比較平台能力，不需要背 SDK、CLI、YAML、計價與網路細節。這些都超出本課重點。（此為更高層次內容，考試只需了解概念）

> 📖 **視覺化：** 三大雲端 MLOps 平台功能對照 + MLflow 四階段圖
> → 詳見 [diagrams/04-cloud-mlops-comparison.md](diagrams/04-cloud-mlops-comparison.md)

### 3.8 用一張圖串起整課 🔥🔥
```text
Train
  ↓
Registry
  ↓
Serving
  ├── Batch Inference
  └── Real-time Inference / API
  ↓
Monitoring
  ├── system metrics
  ├── model metrics
  └── drift detection
  ↓
Update
  ├── versioning / rollback
  ├── A/B / canary / shadow / blue-green
  └── retrain if needed
```

這張圖就是本課主軸。遇到任何題目，先問自己它落在哪一站，通常就能先排除一半選項。

---
## Section 4: Comparison Tables (易混淆概念)

### 4.1 批次推論（Batch Inference） vs 即時推論（Real-time Inference）
| 概念 | 批次推論（Batch Inference） | 即時推論（Real-time Inference） |
|---|---|---|
| 定義 | 對大量資料做非同步推論 | 對單次 request 即時回傳結果 |
| 核心目標 | 吞吐量、成本效率 | 低延遲、互動性 |
| 呼叫方式 | 排程 job / 檔案輸入 | API / endpoint |
| 回應時間 | 分鐘到小時 | 毫秒到秒 |
| 適用 | 每日重算名單、夜間跑批 | 聊天機器人、線上推薦、審核 |
| 常見陷阱 | 以為 AI 都要即時 | 以為即時就不用擴展與監控 |

### 4.2 資料漂移（Data Drift） vs 概念漂移（Concept Drift）
| 概念 | 資料漂移（Data Drift） | 概念漂移（Concept Drift） |
|---|---|---|
| 定義 | 輸入資料分布改變 | 輸入與標籤關係改變 |
| 變動焦點 | `P(X)` 變 | `P(Y|X)` 變 |
| 常見訊號 | PSI 上升、特徵分布變 | 準確率下降、錯誤模式改變 |
| 適用判斷 | 先看資料長相有沒有變 | 資料看似差不多但規律失靈 |
| 常見陷阱 | 看到準確率掉就直接說 concept drift | 以為 concept drift 一定能只靠分布比對抓到 |

### 4.3 A/B 測試（A/B Testing） vs 金絲雀部署（Canary Deployment） vs 影子部署（Shadow Deployment） vs 藍綠部署（Blue-green Deployment）
| 概念 | A/B 測試（A/B Testing） | 金絲雀部署（Canary Deployment） | 影子部署（Shadow Deployment） | 藍綠部署（Blue-green Deployment） |
|---|---|---|---|---|
| 核心目的 | 比較哪個方案效果較好 | 降低新版本發布風險 | 在真流量下觀察新版本 | 快速整批切換環境 |
| 使用者是否吃到新版本 | 是 | 是，少量正式流量 | 否 | 切換後是 |
| 常看指標 | 轉換率、業務 KPI | error rate、latency、穩定性 | 新舊輸出差異 | 切換成功率、回退速度 |
| 風險控制能力 | 中 | 高 | 高 | 高 |
| 適用情境 | 比較推薦策略、排序、UI | 新模型怕出事 | 高風險場景先旁路驗證 | 有完整雙環境資源 |
| 最常見誤解 | 被誤當發布策略 | 被誤當實驗比較 | 被誤當 canary | 被誤當只是換顏色 |

### 4.4 服務等級協議（SLA） vs 服務等級目標（SLO）
| 概念 | 服務等級協議（SLA） | 服務等級目標（SLO） |
|---|---|---|
| 定義 | 對外承諾的服務水準 | 內部設定的服務目標 |
| 對象 | 客戶、合約對象 | 內部維運團隊 |
| 是否常帶責任條款 | 是 | 否 |
| 例子 | 月可用性 99.9%，未達補償 | p95 latency < 300ms |
| 常見陷阱 | 誤認為只是 dashboard 數字 | 誤認為是對外合約 |

### 4.5 Amazon SageMaker AI vs Google Cloud Vertex AI vs Azure Machine Learning（Azure ML）
| 概念 | Amazon SageMaker AI | Google Cloud Vertex AI | Azure Machine Learning（Azure ML） |
|---|---|---|---|
| 即時推論 | Real-time Endpoint | Endpoint / Online Prediction | Online Endpoint |
| 批次推論 | Batch Transform | Batch Prediction | Batch Endpoint |
| 模型版本/註冊 | Model Registry | Model Registry / model resource | Registry / deployment 管理 |
| 監控特色 | Model Monitor、data quality | Model Monitoring、traffic split | endpoint 管理與部署整合 |
| 考場辨識詞 | batch transform、endpoint autoscaling | traffic split、endpoint | managed online endpoint、batch endpoint |
| 最佳記法 | AWS 看 transform | GCP 看 split | Azure 看 online/batch endpoint |

---
## Section 5: 口訣 / Mnemonics

### 5.1 MLOps pipeline stages
**「訓登服監再」**

| 字 | 代表什麼 |
|---|---|
| 訓 | **訓練（Training）** |
| 登 | **模型登錄（Model Registry）** |
| 服 | **服務提供（Serving）** |
| 監 | **監控（Monitoring）** |
| 再 | **再訓練（Retraining）** |

### 5.2 Deployment strategies
**「A 比較、C 試放、S 偷看、B 整切」**

| 縮寫 | 代表什麼 | 一句話記法 |
|---|---|---|
| A | **A/B 測試（A/B Testing）** | 比哪個方案比較好 |
| C | **金絲雀部署（Canary Deployment）** | 小流量試放 |
| S | **影子部署（Shadow Deployment）** | 偷看真流量表現 |
| B | **藍綠部署（Blue-green Deployment）** | 整套切換 |

### 5.3 Monitoring layers
**「系統看跑不跑，模型看準不準」**

| 層次 | 代表指標 |
|---|---|
| 系統監控 | latency、throughput、error rate、CPU |
| 模型監控 | accuracy、confidence shift、PSI、drift |

### 5.4 Drift types
**「X 變是 data，關係變是 concept」**

| 口訣部分 | 對應概念 |
|---|---|
| X 變 | **資料漂移（Data Drift）** |
| 關係變 | **概念漂移（Concept Drift）** |

### 5.5 Testing flow
**「先小後大，先假後真，先穩後上」**

| 順序 | 代表什麼 |
|---|---|
| 先小 | 先做 **單元測試（Unit Testing）** |
| 後大 | 再做 **整合測試（Integration Testing）** |
| 先假後真 | 先模擬、再用 **影子測試（Shadow Testing）** 接近真流量 |
| 先穩後上 | 做完 **負載測試（Load Testing）** 再 rollout |

### 5.6 Reliability metrics
**「指標看 SLI，內控看 SLO，對客看 SLA」**

| 名詞 | 意義 |
|---|---|
| SLI | 量測什麼 |
| SLO | 內部目標多少 |
| SLA | 對外承諾多少 |

### 5.7 Cloud comparison
**「AWS 看 transform，GCP 看 split，Azure 看 endpoint 雙生」**

| 平台 | 關鍵辨識詞 |
|---|---|
| Amazon SageMaker AI | `batch transform` |
| Google Cloud Vertex AI | `traffic split` |
| Azure ML | `online endpoint / batch endpoint` |

---
## Section 6: 考試陷阱 (Exam Traps)

❌ 陷阱：只要監控 CPU、memory、error rate，就算完成模型監控。  
✅ 正解：那比較偏 **系統監控（System Monitoring）**。模型是否退化還要看 **模型監控（Model Monitoring）**，例如 accuracy、PSI、confidence shift、人工覆核率。會混淆是因為兩者常出現在同一個 dashboard。

❌ 陷阱：只要模型準確率下降，就一定是 **概念漂移（Concept Drift）**。  
✅ 正解：不一定，也可能先是 **資料漂移（Data Drift）**。兩者都會造成準確率下滑，但一個是輸入分布變了，一個是規律變了。

❌ 陷阱：**金絲雀部署（Canary Deployment）** 就是 **A/B 測試（A/B Testing）**。  
✅ 正解：不是。Canary 主要目的是降低發布風險；A/B testing 主要目的是比較方案效果。因為兩者都會分流量，所以很容易被誤認為一樣。

❌ 陷阱：只要是 AI，就應該做 **即時推論（Real-time Inference）** 才比較先進。  
✅ 正解：很多情境更適合 **批次推論（Batch Inference）**，例如夜間重算、月結打分、大量名單更新。考題很常利用大家對聊天機器人的直覺來誤導。

❌ 陷阱：有做 **容器化（Containerisation）** 就等於有高可用與自動擴展。  
✅ 正解：容器化主要解決環境一致性與可移植性；高可用還需要備援、autoscaling、監控與流量管理。它們常一起出現，但不是同一層概念。

❌ 陷阱：**影子測試（Shadow Testing）** 和 **金絲雀部署（Canary Deployment）** 沒差，反正都是真流量。  
✅ 正解：shadow testing 不改正式回應，只做旁路比對；canary deployment 會讓部分使用者真的吃到新版本。兩者都碰真流量，所以最容易混。

❌ 陷阱：**服務等級目標（SLO）** 就是合約裡承諾給客戶的數字。  
✅ 正解：對外承諾的是 **服務等級協議（SLA）**；SLO 是內部營運目標。因為兩者常用同一組指標，所以很容易記反。

❌ 陷阱：L21302 講監控，所以一定會延伸到 AI 治理、法遵、責任歸屬。  
✅ 正解：本課只談部署 mechanics 與維運操作，例如 drift、rollback、autoscaling、SLO。治理、法遵、風險分級屬 **L21203 AI風險管理**。關鍵在「HOW 系統跑」而不是「WHY 要治理」。

---
## Section 7: 情境題快速判斷 (Scenario Quick-Judge)

🔑 看到關鍵字 → 選這個答案

- 每晚重算、每日批次、全量名單更新、非同步 job → **批次推論（Batch Inference）**
- request 一來就要回、聊天機器人、即時推薦、線上審核 → **即時推論（Real-time Inference）**
- 環境一致、打包依賴、開發機和正式機要一致 → **容器化（Containerisation）**
- 多個系統共用模型能力、走 endpoint 呼叫 → **API 服務（API Serving）**
- 多版本管理、核准後部署、需要可回滾 → **模型登錄（Model Registry）**
- timeout 變多、CPU 爆高、TPS 降低 → **系統監控（System Monitoring）**
- PSI 上升、資料分布改變、特徵長相變了 → **資料漂移（Data Drift）**
- 資料看似差不多，但準確率與規則一起失靈 → **概念漂移（Concept Drift）**
- 新版本先導 5% 流量試跑 → **金絲雀部署（Canary Deployment）**
- 比較哪個模型或策略轉換率更好 → **A/B 測試（A/B Testing）**
- 要用真流量觀察新模型，但不能影響正式輸出 → **影子部署（Shadow Deployment）**
- 兩套環境切換、快速整批回退 → **藍綠部署（Blue-green Deployment）**
- 驗證單一前處理函式或欄位映射 → **單元測試（Unit Testing）**
- 驗證 API、DB、model server 是否串得起來 → **整合測試（Integration Testing）**
- 壓力高峰是否守得住 300ms → **負載測試（Load Testing）**
- 內部目標寫 p95 latency < 300ms → **服務等級目標（SLO）**
- 對外承諾月可用性 99.9%，未達補償 → **服務等級協議（SLA）**
- 多區域、多實例、避免單點故障 → **備援（Redundancy）**
- 流量高時自動加實例、低時自動縮回 → **自動擴展（Autoscaling）**
- AWS 題幹看到 `batch transform` → **Amazon SageMaker AI**
- GCP 題幹看到 `traffic split`、`endpoint` → **Google Cloud Vertex AI**
- Azure 題幹看到 `online endpoint`、`batch endpoint` → **Azure Machine Learning（Azure ML）**
- 題目開始談合規、法遵、責任歸屬、治理框架 → **不是本課主軸，偏 L21203**

---
## Section 8: 結尾：快速自我檢查 ✅

用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。

- [ ] 我能在 30 秒內解釋 **MLOps pipeline** 五個階段各自的功能，並說出 **模型登錄（Model Registry）** 為什麼是部署樞紐
- [ ] 我能說出 **批次推論（Batch Inference）** 與 **即時推論（Real-time Inference）** 的核心差異，並各舉一個考場常見情境
- [ ] 我能看到「資料分布變了」與「規則失靈了」時，立刻區分 **資料漂移（Data Drift）** 與 **概念漂移（Concept Drift）**
- [ ] 我能用一句話分清 **系統監控（System Monitoring）** 與 **模型監控（Model Monitoring）**，並各說出 2 個代表指標
- [ ] 我能看到新版本上線情境時，快速判斷該用 **A/B 測試（A/B Testing）**、**金絲雀部署（Canary Deployment）**、**影子部署（Shadow Deployment）** 還是 **藍綠部署（Blue-green Deployment）**
- [ ] 我能說出 **單元測試（Unit Testing）**、**整合測試（Integration Testing）**、**影子測試（Shadow Testing）**、**負載測試（Load Testing）** 分別在驗證什麼
- [ ] 我能分清 **服務等級指標（SLI）**、**服務等級目標（SLO）**、**服務等級協議（SLA）** 的角色，並解釋 autoscaling 與 redundancy 的用途
- [ ] 我能看到 AWS / GCP / Azure 的題幹關鍵字時，快速對應到 **Amazon SageMaker AI**、**Google Cloud Vertex AI**、**Azure Machine Learning（Azure ML）** 的核心部署能力

> 📌 本課不需要讀到程式實作、Kubernetes YAML 設定、Terraform、各雲平台計價、drift detection 演算法數學推導、完整 SRE 組織治理流程。中級考試重點是「看情境選對機制」，不是手刻雲端部署腳本。
