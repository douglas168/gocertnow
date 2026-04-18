# L21203 AI風險管理 — 學習指南
> 對應評鑑範圍：**L212 AI導入評估規劃** ＋ **L21203 AI風險管理**
>
> 關鍵字：風險識別（Risk Identification）、安全與合規性（Safety and Compliance）、AI倫理（AI Ethics）、負責任AI（Responsible AI）、風險登記簿（Risk Register）、5x5 可能性衝擊矩陣（Likelihood-Impact Matrix）、基本權影響評估（Fundamental Rights Impact Assessment, FRIA）、NIST AI風險管理框架（NIST AI Risk Management Framework, AI RMF）、歐盟人工智慧法（EU AI Act）、人工智慧管理系統（Artificial Intelligence Management System, AIMS）。
---
## Section 1 · Exam Item Mapping
> 對應評鑑範圍：**L212 AI導入評估規劃** ＋ **L21203 AI風險管理**
本課是 L21 規劃線的 capstone。L21201 教你「選方案」、L21202 教你「排計畫」，L21203 則是把前兩課的方案與計畫拉回現實世界，回答下面四件事：
1. 這個 AI 系統屬於哪一類風險？要不要升級管控？
2. 這個情境落在 **歐盟人工智慧法（EU AI Act）** 哪一級？是否可能是禁止或高風險？
3. 這個控制項應該對應到 **NIST AI風險管理框架（NIST AI RMF）** 的哪一個 function？
4. 這家公司應該產出什麼實務 artefact，例如 **風險登記簿（Risk Register）**、**基本權影響評估（FRIA）**、**風險胃納（Risk Appetite）**、**部門控制表（Control Mapping）**？
以下名詞先做地圖式預告，正式定義見 §3.3–§3.10；初學者可先讀後再回頭看本節。
### 本課直接對應 syllabus 關鍵字
| syllabus keyword | 本課要會做到什麼 |
|---|---|
| **風險識別** | 寫得出風險登記簿、知道怎麼分 inherent / residual risk、會用 5x5 矩陣排序 |
| **安全與合規性** | 會做 EU AI Act 分級、知道台灣 / 金融 / 公部門要看哪些規範 |
| **AI倫理** | 分得出倫理風險、技術風險、法遵風險、營運風險，不混為一談 |
| **負責任AI** | 會辨認原則清單屬於哪個組織，並能把原則映射到控制項 |
### 與相鄰單元的邊界
| 單元 | 主要問題 | 本課與它的邊界 |
|---|---|---|
| **L21201 AI導入評估** | 值不值得做？哪個方案較好？ | L21203 不重算 ROI / TCO；直接接手「選好後的風險與監理」 |
| **L21202 AI導入規劃** | 怎麼排資源、時程、角色？ | L21203 不重畫 roadmap；直接把 roadmap 變成風險控制點 |
| **L21302 AI技術系統集成與部署** | 怎麼部署、監控、更新模型？ | L21203 只要求知道哪些風險要監控，不教 MLOps 工具鏈 |
| **L22404 資料隱私與安全管理** | 差分隱私、聯邦學習、匿名化技術怎麼做？ | 本課只把 PETs 當控制類別，不講機制細節 |
| **L23401 AI模型透明度與可解釋性** | model card、審計、GDPR Article 22 怎麼落地？ | 本課只要求知道它們是控制項，不講 schema 與法律細節 |
| **L23402 演算法偏見與公平性** | 偏見緩解演算法與公平指標怎麼算？ | 本課只做偏見風險識別與治理，不講 debiasing 算法 |
🗣️ **白話說明**：如果 L21201 像你在蝦皮選手機，L21202 像你排分期、買保護殼、找誰幫你轉資料，那 L21203 就是「這支手機能不能帶進公司機密會議、會不會錄到不該錄的東西、出事誰負責」。
---
## Section 2 · 關鍵概念總覽圖（Knowledge Tree）
```text
🤖 L21203 AI風險管理
│
├── 📖 [L212] AI導入評估規劃
│   └── [L21203] AI風險管理
│
├── 📊 風險識別（Risk Identification）🔥🔥
│   ├── 風險來源分類
│   │   ├── 技術風險：錯誤輸出、漂移、穩健性不足
│   │   ├── 法遵風險：違反產業規範、通知義務缺漏
│   │   ├── 倫理風險：偏見、不公平、侵害自主
│   │   ├── 營運風險：流程失靈、責任不清、第三方依賴
│   │   └── 聲譽風險：公關事件、社群炎上、品牌受損
│   ├── 風險登記簿（Risk Register）
│   │   ├── ID / 風險敘述 / owner / stage
│   │   ├── likelihood / impact / inherent score
│   │   ├── current controls / residual score
│   │   ├── treatment：mitigate / transfer / accept / avoid
│   │   └── review date
│   ├── 5x5 可能性衝擊矩陣（Likelihood-Impact Matrix）
│   │   ├── 分數 1–25
│   │   ├── Low / Medium / High / Critical band
│   │   └── AI impact 要看至少 7 維度
│   ├── 風險胃納（Risk Appetite）
│   │   ├── 董事會或高層設定 residual risk ceiling
│   │   └── 公平 / 基本權 通常比財務更保守
│   └── 陷阱：只看損失金額，不看基本權與法律衝擊
│
├── ⚖️ 安全與合規性（Safety and Compliance）🔥🔥
│   ├── 歐盟人工智慧法（EU AI Act）
│   │   ├── 不可接受風險（Unacceptable Risk）→ Art.5 禁止
│   │   ├── 高風險（High Risk）→ Art.6 + Annex I / III
│   │   ├── 限制風險（Limited / Transparency Risk）→ Art.50
│   │   └── 最小風險（Minimal Risk）→ 無特定義務
│   ├── 8 類禁止實務
│   │   ├── social scoring
│   │   ├── subliminal manipulation
│   │   ├── exploitation of vulnerabilities
│   │   ├── untargeted facial-image scraping
│   │   ├── emotion recognition at work/school
│   │   ├── biometric categorisation by sensitive attributes
│   │   ├── predictive policing based solely on profiling
│   │   └── public-space real-time remote biometric identification for law enforcement
│   ├── Annex III 高風險場景
│   │   ├── biometrics
│   │   ├── critical infrastructure
│   │   ├── education
│   │   ├── employment
│   │   ├── essential services（信用、保險、社福等）
│   │   ├── law enforcement
│   │   ├── migration / asylum / border
│   │   └── justice / democracy
│   ├── 基本權影響評估（FRIA）
│   │   ├── deployer 做，不是 provider 做
│   │   ├── 上線前做
│   │   └── 可補充 GDPR DPIA，但不是同一件事
│   └── 陷阱：限制風險 ≠ 最小風險；HLEG 7 原則 ≠ AI Act 本文
│
├── 🧭 NIST AI風險管理框架（NIST AI RMF）🔥🔥
│   ├── Govern（治理）
│   │   └── 政策、角色、問責、文化、資源
│   ├── Map（脈絡盤點）
│   │   └── use case、stakeholders、context、harm
│   ├── Measure（衡量）
│   │   └── 指標、測試、驗證、證據
│   ├── Manage（處置）
│   │   └── 排序、緩解、監控、回報
│   ├── Playbook / Profile
│   └── 陷阱：Govern 不是第一階段做完就沒了，它是 cross-cutting
│
├── 🏛️ 台灣法規地景（Taiwan Regulatory Landscape）🔥🔥
│   ├── 人工智慧基本法
│   │   ├── 官方最新狀態：2025-12-23 三讀通過；NSTC 法規網載明 2026-01-14 公布
│   │   ├── 中央主管機關：國科會（NSTC）
│   │   ├── 數發部（MODA）：推動風險分類框架
│   │   ├── 7 原則
│   │   ├── 第 19 條：政府使用 AI 應做風險評估
│   │   └── 第 20 條：自公布日起施行
│   ├── 金管會金融業運用 AI 指引（2024-06-20）
│   │   ├── 行政指導
│   │   ├── 6 核心原則
│   │   └── 金融業 de facto benchmark
│   └── 產業映射
│       ├── 金融：FSC 指引 + AI Act essential services 類比
│       ├── 醫療：病人安全、隱私、醫材 / 醫療責任
│       └── 公部門：Art.19 政府風險評估 + FRIA 思維
│
├── 🧱 標準體系（Standards）🔥
│   ├── ISO/IEC 42001:2023
│   │   ├── certifiable
│   │   ├── AIMS 管理系統
│   │   └── PDCA / integrated management system
│   ├── ISO/IEC 23894:2023
│   │   ├── risk-management guidance
│   │   └── 非可驗證、偏方法論
│   ├── ISO/IEC 27001
│   │   ├── 資訊安全管理
│   │   └── 不足以涵蓋 fairness / drift / explainability
│   └── 陷阱：27001 做完，不代表 AI governance 做完
│
├── 🧠 AI倫理（AI Ethics）與負責任AI（Responsible AI）🔥🔥
│   ├── Microsoft 6 原則
│   ├── Google 7 原則
│   ├── HLEG 7 要求
│   ├── FSC 6 原則
│   ├── 台灣 AI 基本法 7 原則
│   └── 陷阱：考題常考「誰提出哪一組」
│
├── 🔧 practitioner 產出物（Artifacts）🔥🔥
│   ├── risk register
│   ├── 5x5 matrix
│   ├── FRIA / AIIA
│   ├── control mapping 表
│   ├── risk appetite statement
│   └── sector compliance checklist
│
└── 🚨 高頻錯誤
    ├── 把 EU AI Act 的 transparency risk 當 minimal risk
    ├── 把 FRIA 當 GDPR DPIA
    ├── 把 金管會指引 當強制法律
    ├── 把 HLEG 7 當 AI Act 條文
    ├── 把 ISO 42001 / 23894 / 27001 混成同一種標準
    └── 把 AI 風險管理只理解成 GenAI hallucination
```
---
## Section 3 · Core Concepts
### 3.1 Practitioner 視角：這課不是背名詞，是要產出 artefact
中級的 **AI風險管理（AI Risk Management）** 不是再講「AI 可能有偏見、可能會外洩資料」這種初級提醒，而是要把風險轉成能管理、能審核、能交付的文件與流程。
最核心的 practitioner 問題只有四個：
1. 風險是什麼？
2. 風險有多大？
3. 風險屬於哪種監理類型？
4. 我們要用什麼控制把 residual risk 壓到可接受範圍？
🗣️ **白話說明**：你在大學分組報告最怕的不是「某個同學可能會拖延」，而是沒人把這件事寫進共編文件、沒人設 deadline、出事也沒人補位。AI 風險管理就是把「大家都知道可能出事」升級成「已經有人負責、有人追、有人簽」。不然專案很像 LINE 群組裡大家一直說「這禮拜要交喔」，最後一樣是凌晨爆炸。
### 3.2 風險識別（Risk Identification）🔥🔥
**風險識別（Risk Identification）** 是把 AI 系統在生命週期中可能造成的 harm 系統化列出來。這裡的 harm 不是只看系統有沒有掛掉，而是看它對人、流程、法規、權利、品牌、財務造成什麼後果。
實務上常見的 AI 風險分類至少包含：
| 類型 | 典型問題 | 常見例子 |
|---|---|---|
| **技術風險（Technical Risk）** | 模型不穩、輸出錯誤、資料偏移 | 招募模型把工程師履歷評低；客服模型引用錯誤 SOP |
| **法遵風險（Compliance Risk）** | 違反法令或監理期待 | 聊天機器人未揭露是 AI；信用評分模型缺文檔 |
| **倫理風險（Ethical Risk）** | 不公平、操控、侵害自主 | 對弱勢族群給出較差條件；過度 nudging |
| **營運風險（Operational Risk）** | 流程、角色、供應商失誤 | 第三方 API 掛掉；人工覆核沒接上 |
| **資訊安全風險（Security Risk）** | 模型與資料被濫用或攻擊 | prompt injection、資料外洩、模型盜用 |
| **聲譽風險（Reputational Risk）** | 社會信任下降、媒體負評 | AI 產生歧視文案，被貼到 IG 炎上 |
| **基本權風險（Fundamental Rights Risk）** | 侵害隱私、平等、正當程序 | 公部門用 AI 排福利資格卻沒申訴機制 |
🔥 **考點提醒**：考題很愛把「儲存成本上升」和「對特定族群產生歧視結果」放在一起，問你哪個是倫理風險。答案通常是後者。
#### 風險識別的實務順序
```text
Use Case 描述
   ↓
列出利害關係人（stakeholders）
   ↓
列出可能 harm
   ↓
按類型分群（技術 / 法遵 / 倫理 / 營運 / 資安 / 聲譽）
   ↓
寫入 risk register
   ↓
評估 likelihood / impact
```
本流程是 §3.13 六步驟建置流程的精簡版本；口訣「定列量控治追」（§5.7）為實務記憶版，三者為同一過程的不同抽象層次。
🗣️ **白話說明**：像你在 104 找工作，不是只看薪水，還會看公司地點、工時、主管風格、試用期條件。AI 風險識別也一樣，不能只看「準不準」，還要看「這個系統碰到誰、誰會受傷、受傷後誰扛」。
### 3.3 風險登記簿（Risk Register）🔥🔥
**風險登記簿（Risk Register）** 是本課最重要的 practitioner artefact。它是一份 living document，不是一次性報告。
一列至少應包含以下欄位：
| 欄位 | 作用 |
|---|---|
| 風險 ID | 方便追蹤，例如 `AI-R-001` |
| use case / 系統名稱 | 風險屬於哪個 AI 系統 |
| 生命週期階段 | 設計、訓練、部署、運行、退場 |
| 風險描述 | 用一句完整句子說明「若…則…」 |
| owner | 誰負責追這個風險 |
| likelihood | 發生可能性 |
| impact | 影響程度 |
| inherent risk score | 尚未控管前分數 |
| current controls | 已有控制項 |
| residual risk score | 控制後剩餘風險 |
| treatment | mitigate / transfer / accept / avoid |
| due date / review date | 何時回頭檢查 |
#### 一個可考、可實務使用的風險敘述模板
```text
若 [trigger / 條件] 發生，
則 [AI system] 可能導致 [harm]，
影響 [對象 / stakeholder]，
造成 [財務 / 法律 / 基本權 / 營運] 後果。
```
#### 範例：招募履歷篩選系統
| 欄位 | 範例 |
|---|---|
| 風險 ID | AI-R-007 |
| 系統 | 履歷篩選模型 |
| 階段 | 部署前驗證 / 上線後月檢 |
| 風險描述 | 若訓練資料過度偏向既有錄取者輪廓，模型可能對特定科系、性別或年齡群產生不公平篩除結果 |
| owner | HR 主管 + AI 產品經理 |
| likelihood | 4 |
| impact | 5 |
| inherent | 20 |
| current controls | 特徵檢視、抽樣人工覆核、申訴機制 |
| residual | 10 |
| treatment | mitigate |
| review | 每月 |
🔥 **考點提醒**：題目若問「哪個文件最適合持續記錄 AI 專案風險、控制項與 owner？」答案通常是 **風險登記簿（Risk Register）**，不是 project charter，也不是 model card。
🗣️ **白話說明**：這就像租台北房子時你會自己列一張表：租金、管理費、離捷運距離、漏水、採光、房東回訊速度。AI 團隊的 risk register 也是這種表，只是欄位更嚴肅，因為出事不是「住得不舒服」，而是可能被主管機關或客戶追責。
### 3.4 5x5 可能性衝擊矩陣（Likelihood-Impact Matrix）與風險胃納（Risk Appetite）🔥🔥
**可能性（Likelihood）** 與 **衝擊（Impact）** 是風險排序的最基本工具。常見做法是 5x5 matrix，分數 = likelihood × impact。
#### 典型 5x5 矩陣
```text
Impact
  5 |  5 10 15 20 25
  4 |  4  8 12 16 20
  3 |  3  6  9 12 15
  2 |  2  4  6  8 10
  1 |  1  2  3  4  5
      1  2  3  4  5  → Likelihood
```
#### 常見 band 設計
| 分數 | band | 常見治理動作 |
|---|---|---|
| 1–4 | Low | owner 可自行追蹤 |
| 5–9 | Medium | 主管核准 + 例行 review |
| 10–14 | High | 要求緩解計畫與時限 |
| 15–25 | Critical | 高層審查，不可直接上線或需升級控制 |
#### AI 情境下 impact 不能只看錢
AI 的 impact 建議至少看 7 個面向，再取 **最大值（max impact）**：
1. 財務衝擊（Financial Impact）
2. 營運衝擊（Operational Impact）
3. 法律衝擊（Legal Impact）
4. 聲譽衝擊（Reputational Impact）
5. 安全衝擊（Safety Impact）
6. 倫理衝擊（Ethical Impact）
7. 基本權衝擊（Fundamental Rights Impact）
#### 為什麼取最大值，不取平均？
因為 AI 風險常出現「財務損失看起來不大，但法律與基本權後果極重」的狀況。若取平均，容易把真正危險的情境稀釋掉。
🗣️ **白話說明**：像你把限動設公開，表面上只是多幾個陌生人看到，好像沒什麼；但如果限動裡有住家附近資訊、公司門禁照、主管名字，實際風險完全不是平均一下就能算。AI 風險也一樣，不能因為短期沒少賺錢，就說沒事。
#### 風險胃納（Risk Appetite）
**風險胃納（Risk Appetite）** 是組織願意接受多少 residual risk 的上限。
AI 專案常見的 risk appetite 設定方式：
| 風險類別 | 典型胃納 |
|---|---|
| 財務 / 成本超支 | 可接受中度波動 |
| 效能 / SLA | 可接受小幅波動，但要補救 |
| 隱私 / 個資 | 低胃納 |
| 公平 / 歧視 | 極低胃納 |
| 基本權 / 公部門裁決 | 極低胃納 |
| 生成式內容錯誤 | 視 use case 而定；內部輔助可較寬，對外決策需嚴 |
```text
Inherent Risk
    ↓
加控制項（controls）
    ↓
Residual Risk
    ↓
跟 Risk Appetite 比較
    ↓
Accept / Escalate / Stop
```
🔥 **高頻題型**：題目問「哪個概念決定 residual risk 低到什麼程度才可以接受？」答案是 **風險胃納（Risk Appetite）**。
### 3.5 歐盟人工智慧法（EU AI Act）4 級分類流程🔥🔥
中級最常出的不是「EU AI Act 存不存在」，而是「給你一段情境，你會把它分到哪一級」。
#### 四級風險架構
| 等級 | 核心意思 | 典型考法 |
|---|---|---|
| **不可接受風險（Unacceptable Risk）** | 法律直接禁止 | 問你某用途能不能做 |
| **高風險（High Risk）** | 可以做，但要重度控管 | 問你是否屬 Annex III / Art.6 |
| **限制風險（Limited / Transparency Risk）** | 主要是透明義務 | 問你 chatbot / deepfake 要做什麼 |
| **最小風險（Minimal Risk）** | 幾乎無特定義務 | 問你是否需額外法定控制 |
#### 最實用的判斷流程
```text
Step 1: 先看是不是 Art.5 禁止實務
        └─ 是 → Unacceptable Risk（不能做）
        └─ 否 → 往下
Step 2: 看是否屬 Art.6 + Annex I / Annex III
        └─ 是 → High Risk
        └─ 否 → 往下
Step 3: 看是否屬 Art.50 透明義務
        └─ 是 → Limited / Transparency Risk
        └─ 否 → Minimal Risk
```
🗣️ **白話說明**：很像 Uber Eats 選外送時先看「這家今天有沒有開」，再看「是不是要排隊很久」，最後才看「有沒有加購提醒」。EU AI Act 也是先看「能不能做」，不是一開始就急著討論怎麼控管。
#### Art.5 8 類禁止實務
以下情境要優先記熟：
1. **社會評分（Social Scoring）**
2. **潛意識操控（Subliminal Manipulation）**
3. **利用弱勢脆弱性（Exploitation of Vulnerabilities）**
4. **無差別蒐刮人臉影像建立資料庫（Untargeted Facial-Image Scraping）**
5. **在職場或學校做情緒辨識（Emotion Recognition at Work/School）**
6. **按敏感屬性做生物特徵分類（Biometric Categorisation by Sensitive Attributes）**
7. **僅依 profiling 做 predictive policing**
8. **執法於公共場所即時遠端生物辨識（Real-Time Remote Biometric Identification for Law Enforcement）**
🔥🔥 **超高頻陷阱**：不是所有 biometric system 都被禁。很多 biometric system 是高風險，不是禁止；考題故意混這個。
#### Art.6 + Annex III 高風險分類
看到下列情境，先想到 high-risk：
| Annex III 類型 | 常見題目描述 |
|---|---|
| **生物辨識（Biometrics）** | 臉辨識等；⚠️ 本列「生物辨識」屬高風險用途；惟「職場/學校情緒辨識」與「以敏感屬性（種族、宗教、性傾向等）做生物特徵分類」屬 Art.5 禁止實務，不再進入高風險評估流程，請見 §3.5.1。 |
| **關鍵基礎設施（Critical Infrastructure）** | 水電交通調度、安全控制 |
| **教育（Education）** | 入學、測驗評分、學習路徑決策 |
| **就業（Employment）** | 履歷篩選、升遷、績效考核 |
| **基本服務（Essential Services）** | 信用評分、保險定價、社福福利 |
| **執法（Law Enforcement）** | 風險預測、偵查支援 |
| **移民邊境（Migration / Border）** | 簽證、邊境審查 |
| **司法民主（Justice / Democracy）** | 法律研究支援、投票流程相關 |
#### 題目怎麼判斷？
不是看到「銀行」就一定 high-risk，也不是看到「聊天機器人」就一定 limited risk。要看 **use case**。
| 情境 | 判斷 |
|---|---|
| 客服 chatbot 回答營業時間 | 多半是 limited risk，重點是透明揭露 |
| 銀行用 AI 做信用評分 | 高風險，因為 essential services |
| 公司用 AI 看員工臉部表情判定情緒 | 禁止實務 |
| 企業內部用 AI 寫會議摘要 | 多半 minimal 或 limited，視是否需揭露 |
#### Art.50 透明義務
看到這類關鍵字，就想到 **限制風險（Limited / Transparency Risk）**：
1. chatbot / AI companion
2. deepfake
3. AI-generated content
4. 與自然人互動但未明示是 AI
這一級重點不是全面禁止，而是「你要告訴人」。
#### 最小風險（Minimal Risk）
像垃圾郵件過濾、一般推薦排序、內部文書輔助，多數落在 minimal risk，但仍可能受其他法律、契約、產業規範影響。**Minimal risk 不是 zero governance。**
### 3.6 基本權影響評估（Fundamental Rights Impact Assessment, FRIA）🔥🔥
**AI 影響評估（AI Impact Assessment, AIIA）**：泛指針對 AI 系統對基本權、社會、環境影響的整體評估方法，FRIA 為其中專門面向基本權的具體實作之一。
**基本權影響評估（Fundamental Rights Impact Assessment, FRIA）** 是 EU AI Act Article 27 的重點。它是 deployer 在 certain high-risk use case 上線前要做的評估。
#### FRIA 的考場關鍵句
1. 做的人是 **deployer**
2. 時點是 **上線前**
3. 對象是 **特定 high-risk 使用情境**
4. 可以補充 **資料保護影響評估（Data Protection Impact Assessment, DPIA）**，但不等於 DPIA
#### FRIA 內容骨架
| 項目 | 問題 |
|---|---|
| intended use | 這套系統要被用在哪個流程 |
| frequency / duration | 多常用、會用多久 |
| affected groups | 受影響的人是誰 |
| harm risks | 可能造成什麼具體權利損害 |
| human oversight | 人怎麼監督、何時介入 |
| mitigation / response | 風險發生時如何處置 |
| governance / complaint | 誰負責、如何申訴 |
```text
High-Risk Use Case
      ↓
是否屬 Art.27 適用 deployer
      ↓
FRIA
  ├─ use context
  ├─ affected groups
  ├─ harms
  ├─ human oversight
  ├─ complaint / remedy
  └─ mitigation
      ↓
通知主管機關 / 存檔備查（依情境）
```
🗣️ **白話說明**：FRIA 很像你們公司要把門禁改成臉辨識前，不只是問「辨識快不快」，而是要先問「員工能不能拒絕？誤判怎麼辦？夜班外包清潔員算不算受影響的人？誰能申訴？」這已經不是工程 issue，而是 rights issue（此例用以說明「權利審查」思維；實際 FRIA 適用對象為 EU AI Act 高風險清單中的 deployer，並非任何企業臉部辨識專案都自動觸發 FRIA。）。
🔥🔥 **超高頻陷阱**：FRIA 和 DPIA 常被混淆。DPIA 主軸是個資風險；FRIA 主軸是更廣的基本權風險。
### 3.7 NIST AI風險管理框架（NIST AI RMF）4 Functions🔥🔥
**NIST AI風險管理框架（NIST AI Risk Management Framework, AI RMF）** 是美國常用、跨產業、志願性（voluntary）的 AI 風險治理基線。考試重點在四個 function，不是細節條號。
⚠️ 注意區分：NIST 另有 Cybersecurity Framework（CSF），聚焦資安治理（Identify/Protect/Detect/Respond/Recover），與 AI RMF（治理 AI 風險）為不同框架，考題常拿來互換誘答。
#### 四大 functions
| function | 在做什麼 | 常見產出 |
|---|---|---|
| **Govern** | 建治理、政策、角色、文化、問責 | policy、RACI、training、risk appetite |
| **Map** | 盤 use case、stakeholders、情境、風險假設 | context doc、stakeholder map、harm scenarios |
| **Measure** | 做量測、驗證、測試、證據蒐集 | bias check、robustness test、metrics、logs |
| **Manage** | 排優先順序、做處置、持續監控 | treatment plan、exception handling、monitoring |
#### 最實用的記法：Govern 橫跨全部
```text
                [ Govern ]
                    │
Map ──────────→ Measure ──────────→ Manage
  盤點            驗證/量測            緩解/監控
```
Govern 不是 waterfall 的第一步，而是整個流程都在。
#### 什麼 artefact 對應哪個 function？
| artefact | 對應 function |
|---|---|
| AI policy / governance charter | Govern |
| 風險胃納聲明 | Govern |
| stakeholder mapping | Map |
| use case boundary / intended use 文件 | Map |
| fairness test / robustness evidence | Measure |
| 監控指標儀表板 | Measure + Manage |
| risk register 更新與 treatment 決策 | Manage |
| escalation / incident response 流程 | Manage |
🗣️ **白話說明**：你可以把 NIST AI RMF 想成公司辦大型活動。Govern 是總召與規矩，Map 是先看場地、來賓、動線，Measure 是彩排與壓力測試，Manage 是活動當天真的有人跌倒、麥克風壞掉時怎麼處理。很多人只做彩排（Measure），沒做總召制度（Govern），所以一出事就互相看對方。
#### 與 GenAI Profile 的關係
**NIST AI 600-1 生成式人工智慧剖面（Generative AI Profile）** 是 AI RMF 的補充，但本課不做 GenAI-only 深講。你只要知道：
1. 它是 RMF 的延伸，不是另一套完全無關的框架
2. 它補足 GenAI-specific risk，例如 confabulation、IP、info integrity、component integration
3. 本課只會把這些風險放進 register，不重講初級的風險定義
### 3.8 把控制項映射到 NIST AI RMF function
考場很愛出「以下哪個控制較屬於 Govern / Map / Measure / Manage？」這種 mapping 題。
#### 快速映射表
| 控制項 | 最主要對應 |
|---|---|
| 設立 AI 治理委員會 | Govern |
| 訂定供應商評估標準 | Govern |
| 定義 intended use / out-of-scope use | Map |
| 利害關係人分析 | Map |
| 偏差監測指標 | Measure |
| red teaming 結果 | Measure |
| 上線前 go/no-go 審查 | Manage |
| incident escalation | Manage |
| 下架 / rollback 機制 | Manage |
#### 一個完整例子：銀行 AI 信用評分
```text
Govern  → 董事會定義公平與合規底線、設 owner、供應商要求
Map     → 盤點 use case、受影響族群、拒貸後果、申訴流程
Measure → 驗證誤差、偏差、穩健性、資料品質、抽樣複核
Manage  → 對高殘餘風險採人工覆核、限縮適用範圍、定期回顧
```
🔥 **考點提醒**：如果題目提到「指標、量測、驗證、測試」，多半偏向 **Measure**；如果提到「優先順序、緩解、監控、回應」，多半偏向 **Manage**。
### 3.9 台灣法規地景（Taiwan Regulatory Landscape）🔥🔥
#### 3.9.1 人工智慧基本法
依 **國科會法規網（NSTC law site）** 截至 **2026-04-18** 的官方頁面，**《人工智慧基本法》於 2025-12-23 三讀通過，並載明公發布日為 2026-01-14（總統令 華總一義字第11500001671號），且第 20 條規定「自公布之日起施行」**。這點和 2024 舊 syllabus / 早期草案認知不同，考前要更新。
#### 核心考點
| 項目 | 內容 |
|---|---|
| 中央主管機關 | **國家科學及技術委員會（National Science and Technology Council, NSTC）** |
| 地方主管機關 | 直轄市、縣（市）政府 |
| 數位發展部角色 | 推動風險分類框架、協助風險基礎管理規範 |
| 7 原則 | 永續發展與福祉、人類自主、隱私保護與資料治理、資安與安全、透明與可解釋、公平與不歧視、問責 |
| 第 19 條 | 政府使用 AI 執行業務或提供服務，應進行風險評估並規劃風險因應措施 |
| 第 20 條 | 自公布之日起施行 |
#### 7 原則拆解
| 原則 | 你在考場看到的關鍵詞 |
|---|---|
| 永續發展與福祉 | 社會公益、環境永續、數位落差 |
| 人類自主 | human oversight、以人為本、尊重人格 |
| 隱私保護與資料治理 | 個資、最小化、營業秘密 |
| 資安與安全 | robustness、security、攻擊防護 |
| 透明與可解釋 | 揭露、標記、可理解 |
| 公平與不歧視 | bias、平等、避免差別待遇 |
| 問責 | accountability、責任歸屬 |
🗣️ **白話說明**：你可以把這部法想成台灣版「先把原則和責任架起來」。不像考數學公式，而比較像公司新訂一套內規：先把底線講清楚，接著各產業自己再往下長出細規則。
#### 3.9.2 第 19 條對公部門的重要性
看到「政府機關」「公部門」「行政服務」「補助資格」「社福審查」這些字眼，就要想到：
1. 台灣法下有政府 AI 風險評估要求
2. EU AI Act 下若屬 high-risk public service / public body，FRIA 思維特別重要
3. 這類題目通常不只問技術準確率，而是問程序正義、申訴與人類監督
#### 3.9.3 金管會「金融業運用人工智慧（AI）指引」🔥🔥
**金融業運用人工智慧（AI）指引** 由 **金融監督管理委員會（Financial Supervisory Commission, FSC）** 於 **2024-06-20** 發布。
最重要的考點有三個：
1. 它是 **行政指導（Administrative Guidance）**
2. 它不是強制法律，但在金融業屬 de facto benchmark
3. 它有 **6 核心原則**
| FSC 6 原則 | 考場關鍵詞 |
|---|---|
| 建立治理及問責機制 | governance、責任歸屬 |
| 重視公平性及以人為本的價值觀 | fairness、human-centered |
| 保護隱私及客戶權益 | privacy、customer rights |
| 確保系統穩健性與安全性 | robustness、security |
| 落實透明性與可解釋性 | transparency、explainability |
| 促進永續發展 | sustainability |
🔥🔥 **超高頻陷阱**：它是 **行政指導**，不是強制法令。考題超愛拿這點當選項陷阱。
### 3.10 ISO/IEC 42001:2023 vs 23894:2023 vs 27001🔥🔥
#### 三者定位
| 標準 | 性質 | 你要怎麼記 |
|---|---|---|
| **ISO/IEC 42001:2023** | 可驗證 / 可認證的 **AI Management System** 標準 | 管理系統本體 |
| **ISO/IEC 23894:2023** | AI risk management guidance | 風險管理方法指引 |
| **ISO/IEC 27001** | Information Security Management System | 資安管理系統 |
#### 最常考的差異
1. **42001**：回答「組織怎麼建立 AI 管理系統」
2. **23894**：回答「AI 風險管理過程怎麼做」
3. **27001**：回答「資訊安全怎麼管」
#### 為什麼 27001 不夠？
因為 **資訊安全管理系統（Information Security Management System, ISMS）** 重點在 confidentiality / integrity / availability，也就是 CIA；但 AI 風險還有：
1. 模型漂移（Model Drift）
2. 幻覺 / confabulation
3. 不公平（Fairness）
4. 可解釋性（Explainability）
5. 人類監督（Human Oversight）
6. 基本權衝擊（Fundamental Rights）
```text
27001 主要管：
  Data / Systems / Access / Security incidents
42001 還會管：
  AI policy / impact assessment / lifecycle / supplier / accountability
23894 補的是：
  如何做 AI-specific risk process
```
🗣️ **白話說明**：如果 27001 像公司規定「門要鎖好、權限要控好、USB 不要亂插」，42001 更像是「這個 AI 決策到底能不能上線、誰審、出事誰負責、供應商怎麼管」。前者像保全，後者像整套經營管理。
### 3.11 AI倫理（AI Ethics）與負責任AI（Responsible AI）原則群🔥🔥
#### 為什麼這裡常考？
⚠️ 學習本節時請同步記住「誰發布哪一組原則」──考題重點不在原則內容本身，而在 issuer 對應（詳見 §3.11 對照表）。
因為原則內容其實彼此很像，考題真正想測的是：**誰提出哪一組原則**。
#### Microsoft 6 principles
**Microsoft 負責任AI原則（Responsible AI Principles）** 常見 6 項：
1. Fairness
2. Reliability and Safety
3. Privacy and Security
4. Inclusiveness
5. Transparency
6. Accountability
#### Google 7 principles
考題提到 **Google 7 原則** 時，通常預設是 2018 開發側原則，而不是 2024 regulation policy advice。
典型關鍵詞：
1. socially beneficial
2. avoid unfair bias
3. built and tested for safety
4. accountable to people
5. privacy design principles
6. uphold scientific excellence
7. available for uses that accord with these principles
#### HLEG 7 requirements
**歐盟高階專家小組（High-Level Expert Group on AI, HLEG）** 的 trustworthy AI 7 要求：
1. Human Agency & Oversight
2. Technical Robustness & Safety
3. Privacy & Data Governance
4. Transparency
5. Diversity, Non-discrimination & Fairness
6. Societal & Environmental Well-being
7. Accountability
#### 台灣 AI 基本法 7 原則
1. 永續發展與福祉
2. 人類自主
3. 隱私保護與資料治理
4. 資安與安全
5. 透明與可解釋
6. 公平與不歧視
7. 問責
#### FSC 6 原則
1. 治理與問責
2. 公平性與以人為本
3. 隱私與客戶權益
4. 穩健性與安全
5. 透明與可解釋
6. 永續發展
#### 原則其實高度收斂
| 概念群 | 幾乎每套都會出現嗎？ |
|---|---|
| 公平（Fairness） | 幾乎一定有 |
| 透明（Transparency） | 幾乎一定有 |
| 問責（Accountability） | 幾乎一定有 |
| 隱私 / 資料治理 | 很常見 |
| 安全 / 穩健性 | 很常見 |
| 人類監督 / 人類自主 | 常見 |
| 福祉 / 永續 | 依框架而異，但近年越來越常見 |
🔥🔥 **高頻題型**：不是問你 fairness 重不重要，而是問「哪一個組織提出 7 項 trustworthy AI requirements？」答案是 **HLEG**。
🗣️ **白話說明**：這有點像不同超商都在賣拿鐵，成分都差不多，但品牌不同。考試不是在考你拿鐵裡有沒有奶，而是在考「這杯是哪一家出的」。
### 3.12 sector compliance mapping：金融 / 醫療 / 公部門
#### 金融業（Financial Sector）
看到這些關鍵字，多半往高治理強度思考：
1. 信用評分
2. 保險定價
3. 詐欺偵測
4. 理專建議
5. 客戶權益
對應重點：
| 面向 | 金融業重點 |
|---|---|
| 法規 / 指引 | FSC AI 指引、個資、內控、模型治理 |
| EU AI Act 類比 | essential services 可能 high-risk |
| 治理重點 | fairness、explainability、human review、第三方監督 |
| artefact | model inventory、risk register、override log |
#### 醫療（Healthcare）
看到：
1. 病人安全
2. triage
3. 影像輔助判讀
4. 醫囑建議
5. 敏感個資
就要想到：
| 面向 | 醫療重點 |
|---|---|
| 安全 | 錯誤建議可能直接傷害病人 |
| 隱私 | 健康資料高度敏感 |
| 監督 | 醫療專業人員不可完全退場 |
| 文件 | intended use、禁用範圍、人工覆核 |
#### 公部門（Public Sector）
看到：
1. 補助資格審查
2. 福利核配
3. 交通執法
4. 教育行政
5. 公共服務排序
就要想到：
| 面向 | 公部門重點 |
|---|---|
| 台灣 | AI 基本法第 19 條風險評估 |
| EU | 若落 high-risk 且為 public service，FRIA 思維重要 |
| 核心風險 | 基本權、程序正義、申訴救濟 |
| 控制 | 人類監督、理由說明、例外處理、異議流程 |
🗣️ **白話說明**：AI 幫你推薦 YouTube 影片，跟 AI 幫你決定能不能領補助，兩件事的嚴重程度完全不同。前者推錯最多就是浪費你 10 分鐘；後者推錯，可能是下個月房租都出問題。
### 3.13 如何實際建一張 risk register
#### Step 1：定 use case 邊界
先寫清楚：
1. 系統做什麼
2. 不做什麼
3. 誰用
4. 影響誰
5. 輸入 / 輸出是什麼
#### Step 2：列 harm scenario
從以下題目出發：
1. 如果輸出錯了，誰受影響？
2. 如果輸入資料偏掉，誰被誤傷？
3. 如果第三方 API 掛了，流程怎麼退回人工？
4. 如果使用者誤信 AI，是否會產生 adverse effect？
#### Step 3：量 likelihood / impact
impact 請不要只看錢，至少做多維度評估。
#### Step 4：填 current controls
控制類型可分為：
| 類型 | 例子 |
|---|---|
| 預防控制（Preventive Control） | 權限、資料篩選、用途限制、訓練規範 |
| 偵測控制（Detective Control） | log、監測、抽樣稽核、漂移檢測 |
| 矯正控制（Corrective Control） | rollback、人工介入、事故回應 |
| 治理控制（Governance Control） | 政策、簽核、教育訓練、供應商條款 |
#### Step 5：決定 treatment
| treatment | 意思 |
|---|---|
| **mitigate** | 降低風險 |
| **transfer** | 移轉風險，例如保險 / 契約 |
| **accept** | 在胃納內接受 |
| **avoid** | 不做、停用、改流程 |
#### Step 6：設 review cadence
AI 專案不要寫完 register 就放著。至少要跟著這些事件回顧：
1. 模型版本更新
2. 資料來源改變
3. use case 擴張
4. 法規更新
5. incident 發生
```text
Use Case
  ↓
Harm Scenarios
  ↓
Risk Register
  ↓
Controls
  ↓
Residual Risk
  ↓
Review / Monitor / Update
```
### 3.14 風險處理（Risk Treatment）與 escalation 邏輯
很多人會填 register，卻不會處理。考題也常從這裡出。
#### 什麼時候接受（accept）？
1. residual risk 已低於風險胃納
2. 有足夠監控與 rollback
3. 不屬禁止 / 不屬不可承受 rights risk
#### 什麼時候避免（avoid）？
1. 直接踩到 Art.5 禁止
2. residual risk 壓不下來
3. 對基本權或病人安全衝擊不可接受
4. 合法性與社會接受度都太差
#### 什麼時候升級（escalate）？
1. 分數進入 critical band
2. 涉及公部門 / 基本權 / 弱勢族群
3. 有重大 reputational risk
4. 需要高層改變 risk appetite
🗣️ **白話說明**：像你跟室友合租，瓦斯味很重的時候不是「先觀察一週」，而是立刻停用、通報、處理。AI 也是，有些風險不是靠「再看一下數據」就能拖過去。
---
## Section 4 · Comparison Tables（易混淆概念）
### 4.1 EU AI Act：限制風險 vs 最小風險
| 概念 | 限制風險（Limited / Transparency Risk） | 最小風險（Minimal Risk） |
|------|------------|------------|
| 定義 | 不是 high-risk，但有透明揭露義務 | 原則上無特定 AI Act 義務 |
| 差異 | 需要告知使用者正在與 AI 互動、內容由 AI 生成等 | 不需特定透明義務，但仍可能受其他法規約束 |
| 適用 | chatbot、deepfake、生成內容標示 | 一般推薦、內部輔助、低影響工具 |
| 常見陷阱 | 被誤以為「低風險就沒事」 | 被誤以為等於「完全不用治理」 |
### 4.2 FRIA vs DPIA
| 概念 | 基本權影響評估（FRIA） | 資料保護影響評估（DPIA） |
|------|------------|------------|
| 定義 | 評估 AI 對基本權的影響 | 評估個人資料處理對隱私的影響 |
| 差異 | 範圍較廣，含公平、申訴、程序正義、人類監督 | 主軸聚焦個資處理風險 |
| 適用 | EU AI Act Art.27 特定 high-risk deployer | GDPR / 個資風險情境 |
| 常見陷阱 | 以為做了 DPIA 就等於 FRIA | 忽略 AI 特有的基本權 harm |
### 4.3 ISO/IEC 42001 vs 23894 vs 27001
| 概念 | ISO/IEC 42001:2023 | ISO/IEC 23894:2023 | ISO/IEC 27001 |
|------|------------|------------|------------|
| 定義 | AI 管理系統標準 | AI 風險管理指引 | 資訊安全管理系統標準 |
| 差異 | 可認證、管整個 AIMS | 不以認證為核心、偏方法 | 管 CIA，不涵蓋完整 AI 治理 |
| 適用 | 組織層級 AI governance | 風險方法設計 | 資安治理 |
| 常見陷阱 | 被當成單純 risk checklist | 被誤以為可取代 42001 | 被誤以為足以代表 AI 治理 |
### 4.4 NIST AI RMF：Measure vs Manage
| 概念 | Measure | Manage |
|------|------------|------------|
| 定義 | 量測、驗證、蒐證 | 決策、緩解、監控、回應 |
| 差異 | 問「證據是什麼」 | 問「接下來怎麼做」 |
| 適用 | robustness 測試、偏差檢查、log analysis | treatment plan、exception handling、rollback |
| 常見陷阱 | 把監控 action 當成單純量測 | 把量測指標當成已完成治理 |
### 4.5 倫理風險 vs 技術風險
| 概念 | 倫理風險（Ethical Risk） | 技術風險（Technical Risk） |
|------|------------|------------|
| 定義 | 不公平、侵害自主、歧視、不可接受的社會後果 | 效能差、錯誤率高、漂移、穩健性差 |
| 差異 | 核心是「該不該這樣做」 | 核心是「做得穩不穩、準不準」 |
| 適用 | 招募歧視、福利審查不透明 | 模型失準、資料漂移、API 失效 |
| 常見陷阱 | 看到 bias 就說只是模型誤差 | 把所有 harm 都歸成單純技術問題 |
### 4.6 高風險 vs 禁止實務
| 概念 | 高風險（High Risk） | 禁止實務（Prohibited / Unacceptable Risk） |
|------|------------|------------|
| 定義 | 可用，但要滿足重度要求 | 原則上不能用 |
| 差異 | 重點是控管 | 重點是禁止 |
| 適用 | 信用評分、招募、教育評分等 | social scoring、職場情緒辨識等 |
| 常見陷阱 | 以為 high-risk 就是不能做 | 以為禁止實務只要加控制就能上線 |
### 4.7 Risk Register vs Model Card
| 概念 | 風險登記簿（Risk Register） | 模型卡（Model Card） |
|------|------------|------------|
| 定義 | 管所有專案 / 系統風險的治理文件 | 描述模型特性、用途、限制的文件 |
| 差異 | 偏治理與持續追蹤 | 偏模型說明與透明化 |
| 適用 | owner、分數、treatment、review | model intent、performance、limitations |
| 常見陷阱 | 被誤當成模型文件 | 被誤當成完整風險治理文件 |
---
## Section 5 · 口訣 / Mnemonics
### 5.1 NIST AI RMF 四大 functions
口訣：**「治盤量管」**
- **治**：Govern，先把治理架起來
- **盤**：Map，盤清 use case、人、情境
- **量**：Measure，量證據、量風險
- **管**：Manage，管處置、管監控
記憶聯想：
> 公司要導 AI，不是先「量」，而是先「治」；不是只「盤」資料，而是要一路「管」到上線後。
### 5.2 EU AI Act 四級風險
口訣：**「禁高透小」**
- **禁**：禁止實務
- **高**：高風險
- **透**：透明義務
- **小**：最小風險
快判句：
> 先問能不能做，再問要不要重管，再問要不要揭露，剩下才是最小風險。
### 5.3 風險處理四招
口訣：**「降轉收避」**
- **降**：mitigate，降低
- **轉**：transfer，移轉
- **收**：accept，收下但要在胃納內
- **避**：avoid，不做
記憶聯想：
> 像你面對台北租屋風險，不是砍價（降）、找保險（轉）、接受缺點（收）、就是直接換間（避）。
### 5.4 台灣 AI 基本法 7 原則
口訣：**「永人隱安透公平責」**
- 永：永續發展與福祉
- 人：人類自主
- 隱：隱私保護與資料治理
- 安：資安與安全
- 透：透明與可解釋
- 公：公平與不歧視
- 責：問責
### 5.5 FSC 6 原則
口訣：**「治公平、隱安透永」**
- 治：治理及問責
- 公平：公平性與以人為本
- 隱：隱私及客戶權益
- 安：穩健性與安全
- 透：透明與可解釋
- 永：永續發展
### 5.6 HLEG 7 要求
口訣：**「人安隱透公社責」**
- 人：Human Agency & Oversight
- 安：Technical Robustness & Safety
- 隱：Privacy & Data Governance
- 透：Transparency
- 公：Fairness / Non-discrimination
- 社：Societal & Environmental Well-being
- 責：Accountability
### 5.7 建 risk register 的六步
口訣：**「定列量控治追」**
- 定：定邊界
- 列：列 harm
- 量：量 likelihood / impact
- 控：寫 controls
- 治：選 treatment
- 追：追 review
### 5.8 高風險常見場景
口訣：**「生基教工基執移司」**
- 生：生物辨識
- 基：基礎設施
- 教：教育
- 工：就業
- 基：基本服務
- 執：執法
- 移：移民邊境
- 司：司法民主
---
## Section 6 · 考試陷阱（Exam Traps）
❌ 陷阱：只要是 AI chatbot，就一定屬於最小風險。  
✅ 正解：不一定。若只是一般互動型 chatbot，常見是 **限制風險（Limited / Transparency Risk）**，因為重點在透明揭露。很多人把「不是 high-risk」誤聽成「沒義務」。
❌ 陷阱：EU AI Act 的 7 個 trustworthy AI requirements 是法案本文列的。  
✅ 正解：那組 7 要求是 **HLEG 2019** 提的，不是 AI Act 條文本身。這是超高頻 author-matching 題。
❌ 陷阱：做了 GDPR 的 **資料保護影響評估（DPIA）**，就等於做完 **基本權影響評估（FRIA）**。  
✅ 正解：FRIA 與 DPIA 有交集，但不相同。FRIA 看的是更廣的基本權與使用情境，DPIA 主軸是個資風險。
❌ 陷阱：高風險（High Risk）等於不能做。  
✅ 正解：不能做的是 **不可接受風險（Unacceptable Risk）**。高風險是可以做，但要滿足較重的治理、文檔、監督與合規要求。
❌ 陷阱：ISO/IEC 27001 已經夠了，所以公司不需要再談 AI 治理。  
✅ 正解：27001 管的是資訊安全，不足以處理 fairness、explainability、model drift、human oversight 等 AI-specific 議題。
❌ 陷阱：金管會「金融業運用 AI 指引」是法律。  
✅ 正解：它是 **行政指導（Administrative Guidance）**，不是強制法令；但在金融業實務上很重要，所以考題常把「不是法律」與「不重要」故意混在一起。
❌ 陷阱：風險分數只要看金額。  
✅ 正解：AI 風險至少要看財務、營運、法律、聲譽、安全、倫理、基本權等多面向，實務上常取最大 impact，避免低估。
❌ 陷阱：Govern 是 NIST AI RMF 的第一步，做完就可以往下。  
✅ 正解：Govern 是 cross-cutting function，會一路貫穿 Map、Measure、Manage。
❌ 陷阱：Risk Register 就是把模型名稱和準確率列出來。  
✅ 正解：那比較像 model inventory 或 model card。Risk Register 要有 owner、風險敘述、分數、控制、殘餘風險與 treatment。
❌ 陷阱：Bias 一定是 L23402 才會談，所以本課不用理會。  
✅ 正解：本課當然要管 bias，但重點是 **識別與治理**，不是演算法緩解數學。
❌ 陷阱：台灣《人工智慧基本法》截至 2026-04 仍只是三讀待公布。  
✅ 正解：舊教材可能還停在三讀資訊，但截至 **2026-04-18**，**NSTC 法規網已載明公發布日 2026-01-14，且第 20 條明定自公布日起施行**。如果考題引用舊資料，要看題目時間點；若問「目前狀態」，以最新官方資訊為準。
❌ 陷阱：Google 7 原則只有一種版本，不用看題目語境。  
✅ 正解：Google 有不同情境的 7 principles 表述。考試若寫「Google AI Principles」通常預設 2018 開發側原則，要看題幹。
❌ 陷阱：只要涉及臉部辨識，一律禁止。  
✅ 正解：不是。某些 biometric use cases 是禁止，很多則是高風險。要看用途、場景、主體、是否為執法公共空間即時辨識等條件。
❌ 陷阱：內部工具就完全不用風險管理。  
✅ 正解：內部工具可能不是 high-risk，但仍可能有機密外洩、錯誤決策、供應商依賴與聲譽風險，仍要做 proportional governance。
❌ 陷阱：負責任 AI 各家原則差很多，要整套重背內容。  
✅ 正解：它們在概念群上高度收斂。考試真正容易錯的是 issuer 與名稱，不是內容本質。
❌ 陷阱：風險胃納越低越好。  
✅ 正解：風險胃納不是越低越厲害，而是要和業務性質、法規、社會可接受度一致。對基本權與公平可極低，對一般營運波動未必如此。
❌ 陷阱：red teaming 是 GenAI 專用，所以 L21203 不用管。  
✅ 正解：red teaming 是實證型風險識別方法，可把發現回填至 risk register，不限 GenAI。
❌ 陷阱：FRIA 是 provider 的責任。  
✅ 正解：Article 27 的 FRIA 核心上是 **deployer** 在特定情境下上線前要做。
❌ 陷阱：如果系統屬 minimal risk，就完全沒有任何外部規範。  
✅ 正解：AI Act 可能沒有特定義務，但還是可能受到個資、消保、契約、產業自律與公司內規約束。
❌ 陷阱：AI 風險管理只是在管 GenAI hallucination。  
✅ 正解：L21203 是 all-AI risk management，涵蓋招募、信用、保險、教育、公部門決策、傳統 ML 與非 GenAI 場景。
## Section 7 · 情境題快速判斷（Scenario Quick-Judge）
🔑 看到關鍵字 → 選這個答案
- **「聊天機器人、要告知使用者不是人」** → **限制風險（Limited / Transparency Risk）**
- **「deepfake、AI 生成內容標示」** → **Article 50 透明義務**
- **「信用評分、保險定價、貸款核准」** → **EU AI Act 高風險（essential services）**
- **「履歷篩選、錄用、升遷」** → **高風險（employment）**
- **「學校情緒辨識、公司監看員工情緒」** → **禁止實務（Art.5）**
- **「政府機關用 AI 審服務 / 補助」** → **台灣 AI 基本法第 19 條風險評估；EU 情境下要想到 FRIA**
- **「public body、private entity providing public services」** → **FRIA**
- **「deployer 上線前評估 rights impact」** → **FRIA，不是 DPIA**
- **「透明、揭露、標示、讓人知道是 AI」** → **Limited / Transparency Risk**
- **「禁止、banned、cannot be used」** → **Unacceptable Risk**
- **「Annex III」** → **High Risk**
- **「Annex I regulated products safety component」** → **High Risk，但適用時程注意 2027-08-02**
- **「GPAI obligations」** → **自 2025-08-02 起適用**
- **「Annex III obligations / transparency requirements / enforcement start」** → **2026-08-02**
- **「high-risk embedded in regulated products under Annex I」** → **2027-08-02**
🔑 看到關鍵字 → 選這個 NIST AI RMF function
- **「政策、文化、責任、教育訓練、治理委員會」** → **Govern**
- **「場景盤點、利害關係人、use context、intended use」** → **Map**
- **「指標、測試、驗證、證據、評估」** → **Measure**
- **「緩解、處置、優先順序、rollback、incident response」** → **Manage**
- **「risk appetite」** → **Govern**
- **「harm scenario」** → **Map**
- **「bias test / robustness test」** → **Measure**
- **「residual risk 決定是否可上線」** → **Manage**
🔑 看到關鍵字 → 選這個標準 / 文件
- **「AI 管理系統、可認證、AIMS」** → **ISO/IEC 42001:2023**
- **「AI 風險管理方法指引」** → **ISO/IEC 23894:2023**
- **「資安管理系統、CIA」** → **ISO/IEC 27001**
- **「持續追蹤 owner / score / treatment」** → **Risk Register**
- **「模型用途與限制說明」** → **Model Card**（本課點到為止）
- **「基本權風險、public service、上線前評估」** → **FRIA**
- **「個資處理風險」** → **DPIA**
🔑 看到關鍵字 → 選這個 issuer
- **「7 trustworthy AI requirements」** → **HLEG**
- **「6 Responsible AI principles：Fairness / Reliability / Privacy / Inclusiveness / Transparency / Accountability」** → **Microsoft**
- **「金融業運用 AI 指引 6 原則」** → **FSC**
- **「永續、人類自主、隱私資料治理、資安、透明、公平、問責」** → **台灣 AI 基本法**
🔑 看到關鍵字 → 風險類型快速歸類
- **「對特定族群造成較差結果」** → **倫理 / 公平風險**
- **「模型突然失準、資料分布變了」** → **技術風險**
- **「主管機關要求揭露或文件不全」** → **法遵風險**
- **「第三方 API 掛掉，流程整段停住」** → **營運風險**
- **「資料外洩、prompt injection」** → **資安風險**
- **「社群炎上、品牌受損」** → **聲譽風險**
- **「申訴困難、程序不透明、侵害權利」** → **基本權風險**
🔑 看到情境 → 優先 artefact
- **「想先列完整風險、owner、控制項」** → **Risk Register**
- **「想把風險依分數排序」** → **5x5 Likelihood-Impact Matrix**
- **「想知道 residual risk 可不可接受」** → **Risk Appetite**
- **「公部門 / 公共服務高風險上線前 rights review」** → **FRIA**
- **「想把控制分類到治理 / 脈絡 / 衡量 / 管理」** → **NIST AI RMF mapping**
🔑 看到產業 → 第一反應
- **金融** → **FSC 指引 + fairness / explainability / customer rights**
- **醫療** → **safety + privacy + clinician oversight**
- **公部門** → **Art.19 + basic rights + complaint / remedy**

---

## Section 8 · 視覺化圖解（Diagrams）

本課所有 Mermaid 圖在 `diagrams/` 子目錄；複習時建議搭配內文閱讀。

| # | 圖名 | 對應 §段落 | 用途 |
|---|---|---|---|
| 01 | [EU AI Act 四層風險金字塔](diagrams/01-eu-ai-act-risk-tiers.md) | §3.5 | 區分禁止 / 高風險 / GPAI / 最小四層 + 生效時程 |
| 02 | [NIST AI RMF 四功能循環](diagrams/02-nist-ai-rmf-cycle.md) | §3.7、§5.3 | Govern 為 cross-cutting + Map/Measure/Manage 循環 |
| 03 | [AI 風險管理閉環（定列量控治追）](diagrams/03-risk-management-loop.md) | §3.13、§5.7 | 六步驟與工具、與 NIST 對齊 |
| 04 | [負責任 AI 五支柱與各組原則對照](diagrams/04-responsible-ai-mindmap.md) | §3.11、§5.4 | issuer matching 視覺化 |
| 05 | [跨法域 / 跨框架對照](diagrams/05-cross-jurisdiction-comparison.md) | §3.11、§3.12 | EU AI Act / 臺灣基本法 / FSC / NIST / ISO 對照 |
