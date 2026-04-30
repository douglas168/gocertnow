# L21302 AI技術系統集成與部署 — Study Guide v2

## 0. How to Use This Guide

本課是 L21 的部署與維運整合單元。讀的時候不要只背雲端平台名稱，要先看懂整個 AI 系統上線後會經過哪些站：訓練、登錄、部署、監控、更新、回滾與擴展。

建議讀法：

1. 先讀第 1 節，把整體流程背起來。
2. 第 2 到第 7 節逐段建立概念，每段都先看「先懂一句話」。
3. 第 8 節用決策樹練情境判斷。
4. 第 9、10 節練常見陷阱與選擇題。
5. 考前最後讀「Final Oral Recall」。

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

與相鄰單元的邊界：

| 單元 | 在回答什麼 | 與本課的邊界 |
|---|---|---|
| L11401 | deployment 是什麼概念 | 初級只到概念；本課要會部署 mechanics 與雲平台能力 |
| L21301 | 資料怎麼準備、模型怎麼選 | 本課接在模型選好之後，重點是上線與維運 |
| L21203 | 風險、治理、法遵怎麼看 | 本課談系統怎麼跑，不延伸治理與責任框架 |

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

AI 系統部署不是「模型訓練完就上線」。考試要你看懂模型從產生、核准、服務化、監控，到需要時更新或回滾的完整生命週期。

### Everyday Analogy

像餐廳推出新菜：先研發菜色，再放進菜單，接著正式供餐，營業中看客訴與銷量，表現不好就調整配方或換回舊菜。模型上線也是這種循環。

### 在整體流程中的位置

```text
資料完成
→ Training
→ Model Registry
→ Serving
→ Monitoring
→ Update / Rollback / Retraining
```

這條線就是本課主軸。任何題目先問：它是在問哪一站？

### Key Concepts

| 題目問的是 | 想到 |
|---|---|
| 哪一版模型可以上線、哪一版可回滾 | Model Registry |
| 使用者馬上要拿到預測 | Real-time Inference / API Serving |
| 每晚重算整批名單 | Batch Inference |
| 上線後變慢、錯誤率升高 | System Monitoring |
| 輸入資料分布改變、模型準確率退化 | Model Monitoring / Drift |
| 新版本出問題要快速恢復 | Rollback |
| 少量流量先試新版本 | Canary Deployment |
| 對外承諾可用性與補償 | SLA |

### Exam Rule

```text
train → registry → serving → monitor → retrain → MLOps pipeline
保存模型版本、metadata、approval、rollback target → Model Registry
考題問上線後怎麼穩定服務 → monitoring + rollback + autoscaling + redundancy
題目談治理、法遵、責任歸屬 → 偏 L21203，不是本課主軸
```

### Quick Check

如果題目問：「團隊需要保存多個模型版本、核准狀態，並在新模型出錯時退回舊版」，最適合的元件是什麼？

答案：Model Registry。因為它是管理模型版本、metadata、核准與回滾目標的事實來源。

## 2. AI 系統架構設計與 MLOps Pipeline 🔥🔥

### 先懂一句話

AI 系統架構設計是在安排模型生命週期每一站的責任。中級考試最重要的是知道 `Training → Registry → Serving → Monitoring → Retraining` 各自負責什麼。

### Everyday Analogy

像 YouTube 影片流程：剪片是 training，上傳並設定版本資訊像 registry，觀眾能觀看是 serving，看觀看數與留言是 monitoring，表現不好再重剪是 retraining。

### 在整體流程中的位置

```text
Training output
→ Model Registry
→ Batch job / Online endpoint
→ Monitoring dashboard and alerts
→ Retraining or rollback
```

### Key Concepts

| 階段 | 白話意思 | 考場要抓的問題 |
|---|---|---|
| Training | 用資料產出候選模型 | 模型從哪裡來？ |
| Model Registry | 集中管理模型版本與狀態 | 哪版能上線？哪版能回滾？ |
| Serving | 讓系統可以使用模型 | 模型怎麼被呼叫？ |
| Monitoring | 觀察服務與模型是否退化 | 有沒有變慢、變差、變偏？ |
| Retraining | 用新資料或新設定更新模型 | 退化後怎麼恢復？ |

Model Registry 不是單純放檔案的資料夾。它通常會記錄 model name、version、training metadata、evaluation metrics、approval status，讓團隊知道哪個版本經過核准、可以部署或回滾。

> 注意：Model Registry **不**儲存「目前部署在哪個 endpoint」的動態狀態——那是 serving 基礎設施（如 SageMaker Endpoint、K8s Service）的責任。Registry 管的是 artifact、lineage 與核准狀態，不管 active endpoint 位置。

```text
Training output
   ↓
[Model Registry]
   ├─ v1 approved / production
   ├─ v2 testing
   └─ v0 rollback candidate
   ↓
Deploy to endpoint or batch job
```

有些工具會提到 `None`、`Staging`、`Production`、`Archived` 這類模型階段。考試看懂概念即可：它們都是在描述模型版本的生命週期狀態，不需要背平台實作細節。

### Feature Store 補充 🔥

**Feature Store（特徵倉庫）** 是 MLOps 中防止 **training-serving skew（訓練與服務特徵不一致）** 的關鍵元件。它提供一個集中、版本化的特徵儲存庫，訓練管線與推論管線共用同一套特徵，確保兩邊計算邏輯一致。

常見工具：SageMaker Feature Store、Feast、Tecton。

> 考試記法：「訓練時和上線時特徵計算不一致 / training-serving skew」→ Feature Store。

### Exam Rule

```text
多人協作、模型版本追蹤、核准後部署 → Model Registry
正式環境不知道跑哪版 → 缺少 versioning / registry
模型上線後仍要觀察與再訓練 → MLOps closed loop
訓練與推論特徵不一致、training-serving skew → Feature Store
```

### Quick Check

Model Registry 和 endpoint 最大差別是什麼？

答案：Model Registry 管模型版本與狀態；endpoint 負責讓外部系統呼叫模型取得預測。

## 3. 模型部署技術 🔥🔥🔥

### 先懂一句話

部署技術的考點不是哪個框架最流行，而是「這個業務場景要批次處理、即時回應、打包環境，還是提供 API」。

### Everyday Analogy

像處理訂單：月底一次結算是批次；客人下單馬上確認是即時；把所有工具裝進同一個工作箱是容器化；開一個櫃台讓各部門都能來問是 API 服務。

### 在整體流程中的位置

```text
Model Registry
→ choose deployment mode
   ├─ Batch Inference
   ├─ Real-time Inference
   ├─ Containerisation
   └─ API Serving
→ Monitoring
```

### Key Concepts

| 概念 | 解決什麼問題 | 常見場景 | 容易誤會 |
|---|---|---|---|
| Batch Inference | 大量資料非同步推論 | 每晚重算、會員分群、月結風險分數 | 不是追求毫秒回應 |
| Real-time Inference | request 來就立刻回 | 聊天、即時推薦、線上審核 | 需要監控與擴展 |
| Containerisation | 打包模型、程式、依賴、runtime | 開發與正式環境要一致 | 不等於高可用 |
| API Serving | 讓上層系統用標準接口呼叫模型 | App、CRM、前端共用模型能力 | 能呼叫不等於有版本治理 |

批次推論和即時推論最常一起考：

| 面向 | Batch Inference | Real-time Inference |
|---|---|---|
| 觸發方式 | 排程或手動 job | 使用者 request 觸發 |
| 回應時間 | 分鐘到小時 | 毫秒到秒 |
| 優先目標 | 吞吐量、成本效率 | 低延遲、互動性 |
| 架構特性 | 非同步、可離峰 | endpoint、API、autoscaling |
| 例子 | 每天凌晨更新推薦名單 | 使用者點擊後立刻推薦 |

```text
Batch: data table/file → scheduled job → prediction table/file
Real-time: app/user → API request → endpoint → immediate response
```

Containerisation 的關鍵是環境一致性：

```text
code + model + runtime + dependencies + config → container image
```

### 模型量化補充 🔥

**模型量化（Model Quantization）** 是降低模型推論成本的關鍵技術：

| 精度 | 說明 | 常見場景 |
|---|---|---|
| FP32 | 原始浮點數精度 | 訓練階段 |
| FP16 | 半精度浮點數 | 雲端推論加速，精度損失小 |
| INT8 | 8 位元整數量化 | 邊緣裝置、資源受限環境，模型變小、推論更快 |

> 考試記法：「部署到邊緣裝置 / 資源受限環境 / 降低推論延遲與模型大小」→ 模型量化（INT8/FP16）。

### Exam Rule

```text
每天凌晨、整批資料、非同步、大量名單 → Batch Inference
使用者立刻要回應、聊天、即時推薦、線上審核 → Real-time Inference
開發機能跑但正式機常壞、依賴要一致 → Containerisation
多個系統共用模型能力、透過 endpoint 呼叫 → API Serving
邊緣裝置 / 資源受限 / 縮小模型大小 / 降低推論延遲 → 模型量化（INT8/FP16）
```

### Quick Check

一家電商每天凌晨重算所有會員的隔日推薦清單，使用者不需要立刻看到結果。應選哪種推論方式？

答案：Batch Inference。因為它適合大量資料、排程處理、不要求即時回應的場景。

## 4. 模型效能監控與 Drift 🔥🔥🔥

### 先懂一句話

監控要分兩層：系統有沒有穩定跑，模型還有沒有準確判斷。CPU 爆高是系統問題；資料分布變了或準確率退化是模型問題。

### Everyday Analogy

像開直播課：網路斷線、聲音卡住是系統健康問題；直播很順但學生聽不懂、答題率下降，是內容效果問題。

### 在整體流程中的位置

```text
Serving
→ Monitoring
   ├─ System Monitoring
   └─ Model Monitoring
→ Alerting
→ Rollback / Retraining / Scaling
```

### Key Concepts

| 監控層次 | 在問什麼 | 常見指標 |
|---|---|---|
| System Monitoring | 服務跑不跑得動？ | latency、throughput、error rate、CPU、memory、availability |
| Model Monitoring | 模型判得還準不準？ | accuracy、precision、recall、confidence shift、PSI、feature distribution |

Drift 是模型監控的高頻考點：

| 類型 | 白話意思 | 公式記法 | 常見訊號 |
|---|---|---|---|
| Data Drift | 輸入資料長相變了 | `P(X)` 變 | 特徵分布改變、PSI 上升、族群組成變 |
| Concept Drift | 輸入和答案的關係變了 | `P(Y|X)` 變 | 資料看似差不多，但準確率下降、錯誤模式改變 |

告警（Alerting）是把監控數字變成行動。例如 error rate 飆高可以通知值班人員並觸發 rollback；PSI 超標可以啟動資料檢查；準確率持續下滑可以安排 retraining 或增加人工覆核。

### Exam Rule

```text
timeout 變多、CPU 爆高、TPS 降低、error rate 上升 → System Monitoring
PSI 上升、特徵分布改變、confidence shift → Model Monitoring / Data Drift
同樣特徵下真實規則改變、準確率持續下滑 → Concept Drift
監控到異常後通知並啟動處理流程 → Alerting
```

### Quick Check

雙 11 活動期間，網站使用者年齡與地區分布和訓練資料明顯不同，模型表現開始變差。這比較像哪種 drift？

答案：Data Drift。因為題目強調輸入資料分布和訓練時不同。

## 5. 模型更新管理與發布策略 🔥🔥🔥

### 先懂一句話

模型更新管理是在問：新版本要怎麼安全進正式流量？考試最愛混淆 A/B testing、canary、shadow、blue-green、rollback。

### Everyday Analogy

像餐廳換菜單：A/B 是兩種套餐都賣來比較；canary 是新菜先賣給少量客人；shadow 是廚房試做新菜但客人仍拿舊菜；blue-green 是兩套廚房都準備好後整批切換。

### 在整體流程中的位置

```text
New model approved
→ choose rollout strategy
→ observe metrics
→ expand traffic / rollback / keep testing
```

### Key Concepts

| 概念 | 核心目的 | 使用者是否吃到新版本 | 常看指標 |
|---|---|---|---|
| Versioning | 追蹤每個模型版本 | 視部署而定 | 版本、來源、指標、狀態 |
| Rollback | 出事時快速切回穩定版 | 切回後否 | error rate、latency、業務異常 |
| A/B Testing | 比較哪個方案效果好 | 是 | conversion、CTR、業務 KPI |
| Canary Deployment | 小流量試發降低風險 | 是，少量 | error rate、latency、穩定性 |
| Shadow Deployment / Testing | 真流量旁路觀察新版 | 否 | 新舊輸出差異 |
| Blue-green Deployment | 兩套環境快速整批切換 | 切換後是 | 切換成功率、回退速度 |

```text
要比較效果          → A/B Testing
要少量正式流量試發  → Canary Deployment
要用真流量但不影響使用者 → Shadow
要兩套環境快速切換  → Blue-green Deployment
新版本出問題要恢復  → Rollback
```

### Exam Rule

```text
新版本異常、立即切回穩定版 → Rollback
比較兩個模型哪個轉換率更好 → A/B Testing
先讓 5% 使用者吃到新版 → Canary Deployment
真實 request 送新版觀察，但正式回應仍由舊版提供 → Shadow Testing / Shadow Deployment
藍綠兩套完整環境，切流量時整批切換 → Blue-green Deployment
```

### Quick Check

公司想觀察新模型在真實流量下的輸出，但不能讓使用者真的收到新模型結果。應選什麼？

答案：Shadow Testing 或 Shadow Deployment。因為它會旁路接收真流量，但正式輸出仍由舊版提供。

## 6. 系統測試與驗證 🔥🔥

### 先懂一句話

測試題是在問「現在要驗證哪一層」。單一函式是 unit，系統串接是 integration，真流量旁路是 shadow，高併發容量是 load。

### Everyday Analogy

像成果發表前排練：自己逐頁檢查投影片是 unit；接投影機、音響、直播一起測是 integration；找人彩排但正式流程不變像 shadow；模擬很多人同時進直播間是 load。

### 在整體流程中的位置

```text
Before rollout
→ Unit Test
→ Integration Test
→ Shadow Test
→ Load Test
→ Rollout
```

實務順序可依環境調整；考試重點是知道每種測試在驗證什麼。

### Key Concepts

| 測試類型 | 正在驗證什麼 | 最適合抓什麼 |
|---|---|---|
| Unit Testing | 單一函式、前處理、特徵轉換、欄位映射 | 邏輯 bug、型別錯誤 |
| Integration Testing | API、資料庫、model server、queue 是否串得起來 | 接口不合、授權錯誤、資料格式不合 |
| Shadow Testing | 新系統吃真流量但不影響正式回應 | 新舊輸出差異、高風險上線前觀察 |
| Load Testing | 高壓力下的 latency、throughput、error rate | 高併發瓶頸、資源不足 |

Shadow testing 和 canary deployment 最容易混：

| 概念 | 真流量？ | 影響正式使用者？ | 主要目的 |
|---|---|---|---|
| Shadow Testing | 是 | 否 | 旁路比對新版 |
| Canary Deployment | 是 | 是，少量 | 小流量降低發布風險 |

### Exam Rule

```text
驗證單一前處理函式、欄位映射 → Unit Testing
驗證 API、DB、model server 串接 → Integration Testing
用真流量比較新舊輸出但不改正式回應 → Shadow Testing
高峰流量、併發、p95 latency 是否撐得住 → Load Testing
```

### Quick Check

題目說：「要確認模型 API、資料庫、訊息佇列和前端服務是否能正確串接。」這是哪種測試？

答案：Integration Testing。因為它驗證多個系統元件之間的接口與資料流。

## 7. 穩定性、可用性與雲端環境建置 🔥🔥

### 先懂一句話

部署後要能穩定服務。考試會問 SLI/SLO/SLA 的角色，也會問 redundancy、autoscaling，以及三大雲端平台常見的 MLOps 能力。

### Everyday Analogy

像便利商店營運：收銀速度是量測指標，店長設定排隊不超過 3 分鐘是內部目標，對顧客承諾超時補償是對外協議；多開櫃台與備用設備則是讓服務不中斷。

### 在整體流程中的位置

```text
Serving
→ Reliability design
   ├─ SLI / SLO / SLA
   ├─ Redundancy
   └─ Autoscaling
→ Cloud platform primitives
```

### Key Concepts

| 名詞 | 白話意思 | 例子 |
|---|---|---|
| SLI | 實際量測的指標 | p95 latency、availability、success rate |
| SLO | 內部設定的服務目標 | p95 latency < 300ms |
| SLA | 對外承諾，常含補償 | 月可用性 99.9%，未達補償 |
| Redundancy | 避免單點故障 | 多實例、多節點、多可用區 |
| Autoscaling | 依流量或資源指標自動增減實例 | 流量上升時 2 台變 8 台 |

雲端平台不用背 CLI、YAML 或計價；要背「平台名稱對應的常見辨識詞」：

| 平台 | 即時推論 | 批次推論 | 考場辨識詞 |
|---|---|---|---|
| Amazon SageMaker AI | Real-time Endpoint | Batch Transform | `batch transform`、endpoint autoscaling、model registry |
| Google Cloud Vertex AI | Endpoint / Online Prediction | Batch Prediction Job | 即時：`traffic split`、endpoint、model monitoring；批次：`Batch Prediction Job` |
| Azure Machine Learning | Online Endpoint / Managed Online Endpoint | Batch Endpoint | `online endpoint`、`batch endpoint` |

> 注意：Vertex AI 的 `traffic split`（流量分割）是 **Online Endpoint** 的功能，用於 canary 或 A/B rollout，**不是**批次推論概念。批次推論的關鍵字是 **Batch Prediction Job**。

三個平台名稱不同，但考試觀察點固定：

```text
online endpoint / batch job / model registry / monitoring / traffic management
```

### Exam Rule

```text
量測什麼 → SLI
內部目標多少 → SLO
對外承諾多少、未達可能補償 → SLA
避免單點故障、多區多實例 → Redundancy
流量上升自動加實例、流量下降自動縮回 → Autoscaling
AWS 看到 batch transform → SageMaker AI
GCP 看到 Batch Prediction Job → Vertex AI 批次推論
GCP 看到 traffic split → Vertex AI 即時 endpoint（canary/A-B rollout 功能）
Azure 看到 online endpoint / batch endpoint → Azure ML
```

### Quick Check

「月可用性 99.9%，未達標需提供客戶補償」屬於 SLI、SLO 還是 SLA？

答案：SLA。因為它是對外承諾，而且包含未達標的責任或補償。

## 8. Task / Scenario Selection 🔥🔥🔥

這一節專門練「看到題幹先抓輸出與需求」。部署題通常不是問定義，而是把需求藏在情境裡。

```text
先看 scenario requirement
→ 判斷是在部署、監控、更新、測試、可用性，還是雲平台選型
→ 選對方法、策略或元件
```

| 任務 / 場景 | 輸入 | 輸出 | 常見答案 |
|---|---|---|---|
| 每晚整批重算推薦名單 | 大量資料表 | 預測結果表 | Batch Inference |
| 使用者點擊後立刻預測 | 單次 request | 即時 response | Real-time Inference |
| 前端、CRM、App 共用模型 | API request | prediction response | API Serving |
| 新版依賴在正式環境常壞 | code、model、dependencies | container image | Containerisation |
| 觀察服務是否變慢 | latency、throughput、error rate | 系統健康判斷 | System Monitoring |
| 觀察資料分布與準確率退化 | features、labels、prediction stats | 模型健康判斷 | Model Monitoring |
| 小比例正式流量試新版 | production traffic | 新版穩定性訊號 | Canary Deployment |
| 比較兩個方案哪個效果好 | 分流使用者 | conversion / KPI | A/B Testing |
| 真流量旁路看新版但不影響使用者 | mirrored request | 新舊輸出差異 | Shadow Testing |
| 高併發壓力下是否撐得住 | simulated traffic | latency / throughput / errors | Load Testing |
| 內部服務目標 | SLI measurements | target threshold | SLO |
| 對外合約承諾 | availability / latency terms | promise and penalty | SLA |

### Exam Rule

```text
輸出是一批預測表 → Batch
輸出是立即回應 → Real-time
輸出是系統健康狀態 → System Monitoring
輸出是模型退化判斷 → Model Monitoring
輸出是新版風險控制 → Canary / Shadow / Rollback
輸出是方案效果比較 → A/B Testing
```

### Quick Check

題目問：「要比較新推薦模型和舊推薦模型哪個帶來更高點擊率。」這題的核心輸出是什麼？答案應選什麼？

答案：核心輸出是業務效果比較，例如點擊率；答案應選 A/B Testing。

## 9. Exam Decision Trees 🔥🔥🔥

### 9.1 先判斷題目落在哪一站

```text
題目在問 AI 系統上線？
│
├─ 還在產生或管理模型版本？
│  └─ Training / Model Registry
│
├─ 在問模型怎麼被使用？
│  ├─ 整批、排程、不即時 → Batch Inference
│  └─ request 來就回 → Real-time Inference / API Serving
│
├─ 在問上線後有沒有壞？
│  ├─ latency / CPU / error rate → System Monitoring
│  └─ accuracy / PSI / drift → Model Monitoring
│
└─ 在問新版怎麼安全上線？
   ├─ 比效果 → A/B Testing
   ├─ 小流量正式試發 → Canary
   ├─ 旁路真流量不影響使用者 → Shadow
   └─ 出事切回舊版 → Rollback
```

### 9.2 Batch vs Real-time

```text
題目問推論方式？
│
├─ 使用者等待答案？
│  └─ 是 → Real-time Inference
│
├─ 每天、每週、月底整批重算？
│  └─ 是 → Batch Inference
│
├─ 重點是低延遲？
│  └─ 是 → Real-time Inference
│
└─ 重點是吞吐量與成本？
   └─ Batch Inference
```

### 9.3 Monitoring and Drift

```text
題目問監控異常？
│
├─ 服務變慢、錯誤變多、CPU 高？
│  └─ System Monitoring
│
├─ 輸入特徵分布和訓練時不同？
│  └─ Data Drift
│
├─ 同樣特徵下真實規則改變？
│  └─ Concept Drift
│
└─ 異常後要通知與處理？
   └─ Alerting
```

### 9.4 Testing and Reliability

```text
題目問測試或可用性？
│
├─ 單一函式或前處理？
│  └─ Unit Testing
│
├─ API / DB / model server 串接？
│  └─ Integration Testing
│
├─ 真流量旁路，不改正式輸出？
│  └─ Shadow Testing
│
├─ 高併發或壓力測試？
│  └─ Load Testing
│
├─ 內部目標？
│  └─ SLO
│
└─ 對外合約承諾？
   └─ SLA
```

## 10. Trap Clinic 🔥🔥🔥

### Trap 1：只要監控 CPU、memory、error rate，就算完成模型監控

錯。這些比較偏 System Monitoring。Model Monitoring 還要看 accuracy、confidence shift、PSI、feature distribution、drift 等模型品質訊號。

Exam fix：

```text
latency / CPU / error rate → System Monitoring
accuracy / PSI / drift → Model Monitoring
```

### Trap 2：準確率下降就一定是 Concept Drift

錯。準確率下降也可能是 Data Drift、資料品質問題，或系統串接錯誤。Concept Drift 強調的是輸入和答案之間的規則改變。

Exam fix：

```text
輸入分布變 → Data Drift
輸入到標籤的關係變 → Concept Drift
```

### Trap 3：Canary Deployment 就是 A/B Testing

錯。Canary 主要是降低發布風險；A/B testing 主要是比較哪個方案效果較好。兩者都可能分流量，但目的不同。

Exam fix：

```text
小流量試發、看穩不穩 → Canary
比較業務效果、轉換率 → A/B Testing
```

### Trap 4：AI 系統越即時越好

錯。很多 AI 場景更適合 Batch Inference，例如夜間重算、月結打分、全量名單更新。考試看的是需求，不是看起來先進。

Exam fix：

```text
不需要馬上回、大量排程 → Batch
互動中立刻要答案 → Real-time
```

### Trap 5：Containerisation 等於高可用

錯。容器化解決環境一致性與可移植性。高可用還需要 redundancy、autoscaling、監控、流量管理與回滾機制。

Exam fix：

```text
依賴打包、環境一致 → Containerisation
避免單點故障 → Redundancy
流量變動自動增減實例 → Autoscaling
```

### Trap 6：Shadow Testing 和 Canary Deployment 沒差

錯。Shadow 不影響正式輸出；Canary 會讓少量正式使用者真的吃到新版本。

Exam fix：

```text
真流量旁路、不改正式答案 → Shadow
少量使用者真的用新版 → Canary
```

### Trap 7：SLO 是對客戶的合約承諾

錯。SLO 是內部目標；SLA 才是對外承諾，通常會有責任或補償條款。

Exam fix：

```text
量測值 → SLI
內部目標 → SLO
對外承諾 → SLA
```

### Trap 8：雲平台題要背完整產品操作

錯。中級考試重點是辨識 MLOps 原語，不是 CLI、SDK、YAML、計價或網路細節。

Exam fix：

```text
SageMaker AI → batch transform / real-time endpoint
Vertex AI 批次 → Batch Prediction Job
Vertex AI 即時 → endpoint / traffic split（canary/A-B rollout）/ model monitoring
Azure ML → online endpoint / batch endpoint
```

## 11. Practice Questions

### 11.1 MLOps Pipeline and Registry

**Q1.** 模型訓練完成後，團隊要保存版本、評估指標與核准狀態，最適合放在哪個元件？

答案：Model Registry。  
理由：Registry 是管理模型版本、metadata、approval status 與回滾目標的地方。

**Q2.** `train → registry → serving → monitor → retrain` 這條線主要在描述什麼？

答案：MLOps pipeline。  
理由：它描述模型從訓練到上線維運，再回到更新的生命週期。

**Q3.** 如果正式環境不知道目前跑哪一版模型，最直接缺少哪種管理能力？

答案：Versioning / Model Registry。  
理由：版本管理與 registry 讓團隊追蹤每個模型版本的狀態與部署位置。

### 11.2 Deployment Modes

**Q4.** 銀行每晚對所有客戶重新計算信用風險分數，適合哪種推論？

答案：Batch Inference。  
理由：它是大量資料、排程處理、不要求即時回應。

**Q5.** 線上客服聊天機器人需要在使用者提問後立刻回答，適合哪種推論？

答案：Real-time Inference。  
理由：聊天互動要求低延遲與立即回應。

**Q6.** 開發機可執行，但正式機常因套件版本不同而失敗，最直接應想到什麼？

答案：Containerisation。  
理由：容器化把程式、模型、runtime 與依賴一起打包，提升環境一致性。

**Q7.** 多個內部系統都要共用同一個模型預測能力，通常會把模型做成什麼？

答案：API Serving / endpoint。  
理由：API 讓不同上層系統用標準接口呼叫模型。

### 11.3 Monitoring and Drift

**Q8.** 上線服務的 p95 latency 突然變高，error rate 也上升，這偏哪一類監控？

答案：System Monitoring。  
理由：latency 和 error rate 是服務健康指標。

**Q9.** 模型輸入使用者的年齡、地區、裝置分布和訓練時明顯不同，這是什麼？

答案：Data Drift。  
理由：題目強調輸入資料分布 `P(X)` 改變。

**Q10.** 資料分布看起來差不多，但市場規則改變，導致原本的預測關係失效，這是什麼？

答案：Concept Drift。  
理由：Concept Drift 是輸入與標籤關係 `P(Y|X)` 改變。

**Q11.** 監控系統發現 PSI 超標後自動通知值班人員並開啟資料檢查流程，這是在描述什麼？

答案：Alerting。  
理由：告警是把監控異常轉成通知與後續處理行動。

### 11.4 Update, Testing, and Reliability

**Q12.** 新模型上線後錯誤率暴增，團隊要立即切回上一個穩定版本，這叫什麼？

答案：Rollback。  
理由：Rollback 是新版本異常時快速恢復到舊穩定版本。

**Q13.** 公司想比較兩個推薦模型哪個帶來較高點擊率，適合用什麼？

答案：A/B Testing。  
理由：A/B testing 的核心是比較方案效果與業務指標。

**Q14.** 新模型先接 5% 正式流量，穩定後再逐步擴到 100%，這是什麼？

答案：Canary Deployment。  
理由：Canary 是小流量試發，降低新版本發布風險。

**Q15.** 新模型收到同一份真實 request，但使用者仍收到舊模型答案，這是什麼？

答案：Shadow Testing / Shadow Deployment。  
理由：Shadow 會旁路觀察新版本，但不影響正式輸出。

**Q16.** 要確認前處理函式是否能正確把欄位轉成模型需要的格式，這是哪種測試？

答案：Unit Testing。  
理由：它驗證單一函式或小模組的邏輯正確性。

**Q17.** 要確認 API、資料庫、model server 與 queue 是否能一起運作，這是哪種測試？

答案：Integration Testing。  
理由：它驗證多個元件之間的串接與資料流。

**Q18.** 模擬尖峰時段 5,000 個 request 同時進來，觀察 latency 和 error rate，這是哪種測試？

答案：Load Testing。  
理由：Load testing 驗證高併發或高壓力下的容量與穩定性。

**Q19.** `p95 latency < 300ms` 是內部維運目標，屬於 SLI、SLO 還是 SLA？

答案：SLO。  
理由：SLO 是內部設定的服務目標。

**Q20.** 題目出現 `batch transform`，最可能是在問哪個雲端平台？

答案：Amazon SageMaker AI。  
理由：`batch transform` 是 SageMaker AI 常見辨識詞。

### 11.5 Mixed Traps

**Q21.** 題目說「做了容器化，所以系統自然具備高可用」，這句哪裡錯？

答案：容器化不等於高可用。  
理由：容器化解決環境一致性；高可用還需要 redundancy、autoscaling、監控與回滾。

**Q22.** 題目說「SLO 是對客戶的合約承諾，未達標要補償」，應改成什麼？

答案：SLA。  
理由：對外承諾與補償條款屬於 SLA；SLO 是內部目標。

**Q23.** 題目同時提到真流量與新版模型，怎麼先分 Canary 和 Shadow？

答案：看使用者有沒有真的收到新版結果。  
理由：收到新版是 canary；正式答案仍由舊版提供是 shadow。

**Q24.** 題目說「最新模型準確率下降，所以一定是 concept drift」，為什麼不一定？

答案：也可能是 data drift、資料品質或系統串接問題。  
理由：Concept drift 必須強調輸入與標籤關係改變。

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. 本課主線是 `Training → Model Registry → Serving → Monitoring → Retraining`。
2. Model Registry 管版本、metadata、核准狀態與回滾目標；endpoint 負責讓系統呼叫模型。
3. 整批、排程、不即時是 Batch Inference；互動中立刻回應是 Real-time Inference。
4. 系統監控看 latency、throughput、error rate、CPU；模型監控看 accuracy、PSI、drift、confidence shift。
5. Data Drift 是輸入分布變；Concept Drift 是輸入和答案的關係變。
6. A/B 比效果，Canary 小流量試發，Shadow 旁路真流量不影響使用者，Blue-green 兩套環境整批切換。
7. SLI 是量測值，SLO 是內部目標，SLA 是對外承諾。

## Final Study Advice

不要只背名詞。L21302 的考法通常是給一段部署或維運情境，要求你判斷題目在問哪一站、哪一層、哪一種策略。先抓關鍵字，再用決策樹排除：批次還是即時、系統監控還是模型監控、比較效果還是降低發布風險、內部目標還是對外承諾。
