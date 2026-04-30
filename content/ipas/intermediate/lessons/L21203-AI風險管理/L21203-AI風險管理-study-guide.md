# L21203 AI風險管理 — Study Guide v2

> 對應評鑑範圍：L212 AI導入評估規劃 ＋ L21203 AI風險管理

---

## 0. How to Use This Guide

**建議讀法：**

1. 先讀 Section 1 大圖，建立整體印象。
2. 依序讀 Sections 2–7，每節讀完做 Quick Check 再往下。
3. Section 8 考前看 ASCII 決策樹，練習用關鍵字快速跳答案。
4. Section 9 Trap Clinic 重點看標紅的陷阱，這些考試最愛。
5. Section 10 練習題照概念群分批做，做完立刻看答案理由。
6. 考前 3 分鐘唸 Final Oral Recall 5–7 句。

**火焰標記意義：**

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

---

## 1. Big Picture — AI 風險管理核心流程

### 先懂一句話

本課的核心任務是：把「大家都覺得 AI 可能出事」升級成「已有人負責、有分數、有控制、有人追」的文件與流程。

### 整體流程管線

```text
選好 AI 方案（L21201）＋排好資源計畫（L21202）
        ↓
【L21203 AI 風險管理】
        ↓
Step 1：風險識別（Risk Identification）
        → 列出技術 / 法遵 / 倫理 / 營運 / 資安 / 聲譽 / 基本權風險
        ↓
Step 2：風險量化（Risk Quantification）
        → 5×5 可能性衝擊矩陣（Likelihood-Impact Matrix）
        → 至少看 7 個 impact 面向，取最大值
        ↓
Step 3：法規分級與合規（Compliance Mapping）
        → EU AI Act 四級分類（禁高透小）
        → 台灣 AI 基本法 + FSC 指引
        ↓
Step 4：框架映射（Framework Mapping）
        → NIST AI RMF：Govern / Map / Measure / Manage
        → ISO/IEC 42001 / 23894 / 27001 對應
        ↓
Step 5：控制項選擇與 FRIA
        → 預防 / 偵測 / 矯正 / 治理控制
        → 高風險使用情境：基本權影響評估（FRIA）
        ↓
Step 6：Risk Register 更新 + 殘餘風險決策
        → Residual Risk vs. Risk Appetite
        → mitigate / transfer / accept / avoid
        ↓
持續監控與回顧（Review / Monitor）
```

### 題目關鍵字速查表

| 題目問的是 | 想到 |
|---|---|
| 持續追蹤 owner / score / treatment | 風險登記簿（Risk Register） |
| residual risk 跟誰比，才能決定接不接受？ | 風險胃納（Risk Appetite） |
| 給情境，問 EU AI Act 幾級？ | 禁高透小流程 |
| 政策、治理委員會、問責 | NIST AI RMF — Govern |
| 場景盤點、利害關係人 | NIST AI RMF — Map |
| 指標、測試、驗證 | NIST AI RMF — Measure |
| 緩解、優先排序、rollback | NIST AI RMF — Manage |
| AI 管理系統、可認證 | ISO/IEC 42001:2023 |
| 基本權、public service、上線前 | FRIA（基本權影響評估） |
| 誰發出 7 trustworthy AI requirements？ | HLEG |
| 倫理風險 vs 技術風險 | 對特定族群較差結果→倫理；模型失準→技術 |

---

## 2. 風險識別與分類 🔥🔥🔥

### 先懂一句話

風險識別（Risk Identification）是把 AI 系統在整個生命週期中可能造成的 harm 系統性列出來。重點不只是「模型會不會壞掉」，而是對人、流程、法規、基本權、聲譽的全面影響。

### Everyday Analogy

你搬進一間新房子前，不是只問「水電通不通」，還要問：「這棟房子在地震帶嗎？樓下有沒有飲食業氣味？鄰居吵不吵？有沒有壁癌？房東半夜會不會突然進來？」AI 風險識別也一樣，不能只問「準確率有多高」。

### 在整體流程中的位置

```text
Use Case 描述
   → 列利害關係人（Stakeholders）
   → 列可能 harm
   → 按類型分群
   → 寫入 Risk Register
   → 評估 Likelihood / Impact
```

### Key Concepts — AI 風險七大類型

| 類型 | 典型問題 | 常見考試情境 |
|---|---|---|
| 技術風險（Technical Risk） | 模型不穩、輸出錯誤、資料漂移 | 招募模型把某群履歷評低；客服引用錯誤 SOP |
| 法遵風險（Compliance Risk） | 違反法令、監理要求 | 聊天機器人未揭露是 AI；信用評分缺文件 |
| 倫理風險（Ethical Risk） | 不公平、操控、歧視、侵害自主 | 對弱勢族群給出較差條件；過度 nudging |
| 營運風險（Operational Risk） | 流程失靈、角色不清、供應商問題 | 第三方 API 掛掉；無人工覆核接手 |
| 資安風險（Security Risk） | 模型與資料被攻擊或濫用 | prompt injection、資料外洩、模型盜用 |
| 聲譽風險（Reputational Risk） | 社會信任下降 | AI 產生歧視文案被貼網路炎上 |
| 基本權風險（Fundamental Rights Risk） | 侵害隱私、平等、正當程序 | 公部門用 AI 排福利資格但無申訴機制 |

> 考點提醒：題目常把「儲存成本上升」和「對特定族群產生歧視結果」放一起問，哪個是倫理風險？答案是後者。

### Exam Rule

```text
對特定族群造成較差結果         → 倫理風險（Ethical Risk）
模型突然失準 / 資料分布改變    → 技術風險（Technical Risk）
未揭露、缺文件、違反監理要求  → 法遵風險（Compliance Risk）
第三方 API 掛掉 / 流程整段停  → 營運風險（Operational Risk）
prompt injection / 資料外洩  → 資安風險（Security Risk）
社群炎上 / 品牌受損           → 聲譽風險（Reputational Risk）
申訴困難 / 基本權受侵害        → 基本權風險（Fundamental Rights Risk）
```

### Quick Check

某家公司部署一套招募篩選模型，測試後發現模型對女性求職者的通過率系統性偏低。這屬於哪種 AI 風險？

答案：倫理風險（Ethical Risk）。
理由：核心問題是「對特定族群產生不公平結果」，不是模型技術精度問題，不是資料庫外洩，而是對基本平等的侵害，歸類為倫理 / 公平風險。

---

## 3. 風險登記簿與量化工具 🔥🔥🔥

### 先懂一句話

風險登記簿（Risk Register）是本課最重要的 practitioner 產出物。它是一份 living document，不是一次性報告，必須有 owner、分數、控制、殘餘風險與回顧日期。

### Everyday Analogy

就像租房前自己列的一張比較表：租金、管理費、離捷運幾分鐘、有沒有漏水、採光、房東反應速度。AI 團隊的 risk register 也是這種表，只是欄位更嚴肅，因為出事不是「住得不舒服」，而是可能被主管機關追責。

### 在整體流程中的位置

```text
列出 Harm Scenarios
   → 填入 Risk Register（每一列 = 一個風險）
   → 量 Inherent Risk Score（尚未控管前）
   → 加 Controls（預防 / 偵測 / 矯正 / 治理）
   → 量 Residual Risk Score（控管後剩餘）
   → 與 Risk Appetite 比較 → 決定 Treatment
```

### Key Concepts

**Risk Register 必備欄位：**

| 欄位 | 作用 |
|---|---|
| 風險 ID（例如 AI-R-001） | 方便追蹤 |
| 系統名稱 / use case | 哪個 AI 系統的風險 |
| 生命週期階段 | 設計 / 訓練 / 部署 / 運行 / 退場 |
| 風險描述（若…則…） | 一句完整句說清楚 |
| owner | 誰負責追 |
| likelihood（1–5） | 發生可能性 |
| impact（1–5） | 影響程度 |
| inherent risk score | likelihood × impact（控管前） |
| current controls | 已有什麼控制 |
| residual risk score | 控管後剩餘 |
| treatment | mitigate / transfer / accept / avoid |
| review date | 何時回頭檢查 |

**5×5 可能性衝擊矩陣（Likelihood-Impact Matrix）：**

```text
Impact
  5 |  5 10 15 20 25
  4 |  4  8 12 16 20
  3 |  3  6  9 12 15
  2 |  2  4  6  8 10
  1 |  1  2  3  4  5
      1  2  3  4  5  → Likelihood

Band 設計：
  1–4   Low      → owner 自行追蹤
  5–9   Medium   → 主管核准 + 例行 review
 10–14  High     → 要求緩解計畫與時限
 15–25  Critical → 高層審查，不可直接上線
```

**為什麼 impact 要取最大值而非平均？**

AI 風險常出現「財務損失不大，但法律與基本權後果極重」的狀況。取平均會把真正危險的情境稀釋掉。

Impact 至少看 7 個面向（取最大值）：
1. 財務衝擊（Financial）
2. 營運衝擊（Operational）
3. 法律衝擊（Legal）
4. 聲譽衝擊（Reputational）
5. 安全衝擊（Safety）
6. 倫理衝擊（Ethical）
7. 基本權衝擊（Fundamental Rights）

**風險胃納（Risk Appetite）：**

組織願意接受多少 residual risk 的上限，由董事會或高層設定。

| 風險類別 | 典型胃納 |
|---|---|
| 財務 / 成本超支 | 可接受中度波動 |
| 隱私 / 個資 | 低胃納 |
| 公平 / 歧視 | 極低胃納 |
| 基本權 / 公部門裁決 | 極低胃納 |

**四種 Treatment 選項（口訣：降轉收避）：**

| 選項 | 意思 | 適用時機 |
|---|---|---|
| mitigate（降） | 降低風險 | 加控制可壓低分數 |
| transfer（轉） | 移轉，例如保險、契約 | 無法完全自行控管 |
| accept（收） | 接受，但 residual ≤ appetite | 已在可接受範圍 |
| avoid（避） | 不做、停用、改流程 | 無法控管或觸碰禁止線 |

### Exam Rule

```text
持續追蹤 owner / 分數 / 控制 / treatment → Risk Register
把風險依分數排序               → 5×5 矩陣
residual risk 跟什麼比？       → Risk Appetite
誰設定 Risk Appetite？         → 董事會 / 高層
impact 看幾個面向？            → 7個（取最大值，不取平均）
```

### Quick Check

題目問：「哪個文件最適合持續記錄 AI 專案風險、控制項與負責人？」選項有：project charter、model card、risk register、技術規格書。

答案：風險登記簿（Risk Register）。
理由：project charter 是啟動文件，model card 是模型說明，技術規格書是工程文件。只有 risk register 設計來持續追蹤風險、owner、控制項、殘餘風險與回顧日期。

---

## 4. 歐盟人工智慧法（EU AI Act）四級分類 🔥🔥🔥

### 先懂一句話

EU AI Act 不是背條號，而是給你一個情境，你要能判斷它落在哪一級，然後知道對應義務是什麼。口訣：**禁高透小**。

### Everyday Analogy

就像 Uber Eats 訂餐，先看「這家餐廳今天有沒有開」（能不能做？），再看「要排多久隊」（需不需要重管），最後看「有沒有加購提示」（要不要揭露）。EU AI Act 也是先問能不能做，不是一開始就討論怎麼控管。

### 在整體流程中的位置

```text
拿到一個 AI use case
   → Step 1：是否踩 Art.5？ → 是 → 不可接受風險（禁止）
   → Step 2：是否屬 Art.6 + Annex I / III？ → 是 → 高風險
   → Step 3：是否屬 Art.50 透明義務？ → 是 → 限制風險
   → 否則 → 最小風險
```

### Key Concepts

**四級風險架構：**

| 等級 | 核心意思 | 典型考題情境 |
|---|---|---|
| 不可接受風險（Unacceptable Risk） | Art.5 直接禁止 | 這個用途能不能做？ |
| 高風險（High Risk） | 可做，但要重度控管 | 是否屬 Annex III？需要哪些義務？ |
| 限制風險（Limited / Transparency Risk） | 主要是透明揭露義務 | chatbot / deepfake 要做什麼？ |
| 最小風險（Minimal Risk） | 幾乎無特定 AI Act 義務 | 是否需要額外法定控制？ |

**Art.5 八類禁止實務（必背）：**

1. 社會評分（Social Scoring）
2. 潛意識操控（Subliminal Manipulation）
3. 利用弱勢脆弱性（Exploitation of Vulnerabilities）
4. 無差別蒐刮人臉影像建資料庫（Untargeted Facial-Image Scraping）
5. 職場或學校情緒辨識（Emotion Recognition at Work / School）
6. 按敏感屬性做生物特徵分類（Biometric Categorisation by Sensitive Attributes）
7. 僅依 profiling 做 predictive policing
8. 執法於公共場所即時遠端生物辨識（Real-Time Remote Biometric ID for Law Enforcement）

> 超高頻陷阱：不是所有 biometric system 都被禁。很多 biometric use case 是高風險，不是禁止。要看用途、場景、主體。

**Annex III 八類高風險場景（口訣：生基教工基執移司）：**

| 類型 | 考試描述 |
|---|---|
| 生物辨識（Biometrics） | 臉辨識（注意：職場情緒辨識是禁止，不是高風險） |
| 關鍵基礎設施（Critical Infrastructure） | 水電交通調度、安全控制 |
| 教育（Education） | 入學評分、學習路徑決策 |
| 就業（Employment） | 履歷篩選、升遷、績效考核 |
| 基本服務（Essential Services） | 信用評分、保險定價、社福福利 |
| 執法（Law Enforcement） | 風險預測、偵查支援 |
| 移民邊境（Migration / Border） | 簽證、邊境審查 |
| 司法民主（Justice / Democracy） | 法律研究支援、投票流程 |

**常見情境判斷：**

| 情境 | 判斷 |
|---|---|
| 客服 chatbot 回答營業時間 | 限制風險（需透明揭露是 AI） |
| 銀行用 AI 做信用評分 | 高風險（essential services） |
| 公司看員工臉部情緒判定表現 | 禁止實務（職場情緒辨識） |
| 企業內部 AI 寫會議摘要 | 最小或限制風險（視是否需揭露） |
| deepfake / AI 生成內容 | 限制風險（Art.50 標示義務） |

### Exam Rule

```text
social scoring / 職場情緒辨識 / 即時公共空間人臉辨識  → 禁止（Art.5）
信用評分 / 保險 / 招募 / 教育評分              → 高風險（Annex III）
chatbot 未揭露 / deepfake / AI 生成內容         → 限制風險（Art.50）
垃圾郵件過濾 / 內部輔助 / 推薦排序              → 最小風險
high-risk ≠ 不能做                             → 高風險是可以做，但要重度控管
禁止 ≠ 只要加控制就能上線                       → 禁止實務原則上不能做
```

### Quick Check

某公司在辦公室部署一套 AI 系統，即時分析員工開會時的臉部表情，判定情緒狀態。這屬於 EU AI Act 哪一級？

答案：不可接受風險（Unacceptable Risk）—— 禁止實務。
理由：職場情緒辨識（Emotion Recognition at Work）屬 Art.5 八類禁止實務之一，不是高風險，而是直接禁止。

---

### GPAI（General Purpose AI，通用目的 AI）條款 🔥🔥

EU AI Act 對**基礎模型 / 通用目的 AI 模型**有專章規範（2024 年新增）：

| 類型 | 義務 |
|---|---|
| 一般 GPAI 模型 | 技術文件、著作權遵循、訓練資料摘要 |
| 高能力 GPAI 模型（>10²⁵ FLOPs） | 上述 + 對抗性測試、重大事故通報、網路安全措施 |

**考試判斷**：題目提到「大型語言模型提供者的 EU AI Act 義務」→ GPAI 條款（不是高風險條款）。

---

## 5. 基本權影響評估（FRIA）與 NIST AI RMF 🔥🔥🔥

### 先懂一句話（FRIA）

基本權影響評估（Fundamental Rights Impact Assessment, FRIA）是 EU AI Act Article 27 規定的：**deployer**（使用者組織）在特定高風險 AI 系統**上線前**必須做的評估，範圍比 DPIA 更廣。

### 先懂一句話（NIST AI RMF）

NIST AI 風險管理框架（AI Risk Management Framework）是美國跨產業、志願性的 AI 風險治理基線，四大 function 是 Govern / Map / Measure / Manage，口訣：**治盤量管**。

### Everyday Analogy（FRIA）

公司把門禁改成臉辨識前，不只是問「辨識快不快」，而是要問：員工能不能拒絕？誤判怎麼辦？夜班清潔員算不算受影響的人？誰可以申訴？這已經不是工程問題，而是基本權問題。

### Everyday Analogy（NIST AI RMF）

辦大型活動：Govern 是總召與規矩，Map 是先看場地、來賓、動線，Measure 是彩排與壓力測試，Manage 是活動當天麥克風壞掉時怎麼處理。很多人只做彩排（Measure），沒做總召制度（Govern），所以一出事就互相看對方。

### 在整體流程中的位置

```text
FRIA 流程：
High-Risk Use Case 確認
   → 確認是否為 Art.27 適用 deployer
   → 上線前做 FRIA
       ├─ 使用情境與頻率
       ├─ 受影響族群
       ├─ 具體權利損害
       ├─ 人類監督機制
       ├─ 申訴 / 救濟
       └─ 緩解措施
   → 存檔 / 通知主管機關（依情境）

NIST AI RMF 結構：
        [ Govern ] ← cross-cutting，貫穿全程
             │
   Map → Measure → Manage
 盤點     驗證      緩解
```

### Key Concepts

**FRIA 四大考場關鍵句：**

1. 做的人是 **deployer**（不是 provider / 模型供應商）
2. 時點是 **上線前**
3. 對象是 **特定高風險使用情境**
4. 可以補充 DPIA，但**不等於** DPIA

**FRIA vs DPIA 對照：**

| 面向 | FRIA | DPIA |
|---|---|---|
| 法源 | EU AI Act Art.27 | GDPR |
| 主軸 | 更廣的基本權（公平、申訴、程序正義） | 個人資料處理風險 |
| 做的人 | deployer（high-risk AI 使用方） | 資料控管者 |
| 常見陷阱 | 做了 DPIA 就以為做完 FRIA | 忽略 AI 特有的基本權 harm |

**NIST AI RMF 四大 function 快速對照：**

| Function | 在做什麼 | 常見產出 |
|---|---|---|
| Govern | 建政策、角色、問責、文化 | policy、RACI、risk appetite |
| Map | 盤 use case、stakeholders、harm 假設 | context doc、stakeholder map |
| Measure | 量測、驗證、測試、蒐集證據 | bias check、robustness test、metrics |
| Manage | 排優先、緩解、監控、回應 | treatment plan、rollback、escalation |

> 重要：Govern 不是 waterfall 第一步做完就沒了，而是 cross-cutting，貫穿 Map / Measure / Manage 全程。

**Artefact 對應 function：**

| Artefact | 對應 Function |
|---|---|
| AI policy / governance charter | Govern |
| 風險胃納聲明 | Govern |
| stakeholder mapping | Map |
| use case boundary 文件 | Map |
| fairness test / robustness evidence | Measure |
| 監控指標儀表板 | Measure + Manage |
| risk register 更新與 treatment 決策 | Manage |
| escalation / incident response 流程 | Manage |

### Exam Rule

```text
「指標、量測、驗證、測試」關鍵字     → Measure
「優先順序、緩解、監控、rollback」   → Manage
「政策、文化、問責、治理委員會」      → Govern
「場景盤點、利害關係人、use context」 → Map
「risk appetite 由誰設定？」         → Govern
FRIA 做的是 deployer 還是 provider？ → deployer
FRIA 什麼時候做？                   → 上線前
做了 DPIA = 做了 FRIA？             → 否，兩者不同
```

### Quick Check

公司 IT 部門設定了 AI 偏差監測指標，每月自動產生報表。這屬於 NIST AI RMF 的哪個 function？

答案：Measure。
理由：偏差監測指標的設定與驗證屬於「量測、驗證、蒐集證據」，對應 Measure function。若問的是「根據這份報表決定是否要做 rollback」，則屬於 Manage。

---

## 6. 台灣法規地景 🔥🔥

### 先懂一句話

台灣有自己的 AI 法規基礎：《人工智慧基本法》（主管機關 NSTC，2026-01-14 公布施行）加上金管會《金融業運用 AI 指引》（行政指導，非強制法律）。

### Everyday Analogy

就像台灣有《消保法》（法律）和各行業公會的「自律規範」（非強制），AI 基本法是法律框架，金管會指引是金融業的行業自律 benchmark。

### 在整體流程中的位置

```text
台灣 AI 使用情境
   ├─ 政府機關 / 公部門？
   │     → AI 基本法第 19 條：應進行風險評估並規劃因應措施
   │
   ├─ 金融業（銀行 / 保險 / 證券）？
   │     → FSC 2024-06-20 指引：行政指導，6 核心原則
   │
   └─ 其他產業？
         → AI 基本法 7 原則作為底線
```

### Key Concepts

**人工智慧基本法 重要考點：**

> ⚠️ 注意：本指南所列台灣 AI 基本法相關日期、條文編號（如 Art.19 內容），係依公開資訊整理。此為近期立法，考試前請以**立法院官網**或**總統府公報**確認最新文字，以實際公告版本為準。

| 項目 | 內容 |
|---|---|
| 三讀通過日 | 2025-12-23 |
| 公布施行日 | 2026-01-14（第 20 條：自公布之日起施行） |
| 中央主管機關 | 國家科學及技術委員會（NSTC） |
| 數位發展部（MODA）角色 | 推動風險分類框架、協助風險基礎管理規範 |

**台灣 AI 基本法 7 原則（口訣：永人隱安透公責）：**

| 原則 | 考試關鍵詞 |
|---|---|
| 永續發展與福祉 | 社會公益、環境永續、數位落差 |
| 人類自主 | human oversight、以人為本 |
| 隱私保護與資料治理 | 個資、最小化 |
| 資安與安全 | robustness、攻擊防護 |
| 透明與可解釋 | 揭露、標記、可理解 |
| 公平與不歧視 | bias、平等、差別待遇 |
| 問責 | accountability、責任歸屬 |

**第 19 條對公部門的重要性：**

看到「政府機關」「公部門」「補助資格審查」「社福審查」「行政服務」，就要想到：
- 台灣法下有政府 AI 風險評估要求（Art.19）
- EU 情境下屬 high-risk public service → FRIA 思維特別重要
- 這類題目不只問技術準確率，而是問程序正義、申訴與人類監督

**FSC 金融業 AI 指引 6 原則（口訣：治公隱安透永）：**

| 原則 | 考場關鍵詞 |
|---|---|
| 治理及問責 | governance、責任歸屬 |
| 公平性與以人為本 | fairness、human-centered |
| 隱私及客戶權益 | privacy、customer rights |
| 穩健性與安全 | robustness、security |
| 透明與可解釋 | transparency、explainability |
| 永續發展 | sustainability |

> 超高頻陷阱：FSC AI 指引是**行政指導**，不是強制法令。考題超愛拿這點當選項陷阱。

### Exam Rule

```text
「金管會指引是法律嗎？」          → 否，是行政指導（Administrative Guidance）
「台灣 AI 基本法主管機關？」       → NSTC（國科會）
「政府機關用 AI，哪條規範要求風評？」→ AI 基本法第 19 條
「公布施行日？」                  → 2026-01-14
「金融業信用評分受哪個國際框架影響？」→ FSC 指引 + EU AI Act essential services 類比
```

### Quick Check

題目說：「金管會於 2024 年發布的金融業 AI 指引，對銀行具有強制法律效力。」這句話對嗎？

答案：錯。
理由：金管會金融業 AI 指引是行政指導（Administrative Guidance），不是強制法令。雖然在金融業實務上屬 de facto benchmark，但不能與強制法律畫等號。

---

## 7. ISO 標準體系與原則對照 🔥🔥

### 先懂一句話

ISO/IEC 42001、23894、27001 三個標準各管不同的事。27001 管資安（CIA），不足以涵蓋完整 AI 治理；42001 才是 AI 管理系統的可認證標準。

### Everyday Analogy

如果 27001 像公司規定「門要鎖好、權限要控好、USB 不要亂插」，那 42001 更像是「這個 AI 決策能不能上線、誰審、出事誰負責、供應商怎麼管」。前者像保全，後者像整套 AI 經營管理。

### 在整體流程中的位置

```text
組織想管好 AI 風險
   ├─ 建立 AI 管理系統（AIMS）→ ISO/IEC 42001:2023（可認證）
   ├─ 設計風險管理方法論     → ISO/IEC 23894:2023（方法指引）
   └─ 管資訊安全             → ISO/IEC 27001（CIA，不夠涵蓋 AI）
```

### Key Concepts

**三標準快速對照：**

| 標準 | 性質 | 核心問題 | 常見誤解 |
|---|---|---|---|
| ISO/IEC 42001:2023 | 可認證 AIMS 管理系統標準 | 組織怎麼建 AI 管理系統？ | 被當成單純 risk checklist |
| ISO/IEC 23894:2023 | AI 風險管理方法指引 | AI 風險管理過程怎麼做？ | 被誤以為可取代 42001 |
| ISO/IEC 27001 | 資安管理系統（可認證） | 資訊安全 CIA 怎麼管？ | 被誤以為做完就足夠 AI 治理 |

**27001 管不到的 AI 議題：**
- 模型漂移（Model Drift）
- 幻覺 / confabulation
- 公平性（Fairness）
- 可解釋性（Explainability）
- 人類監督（Human Oversight）
- 基本權衝擊（Fundamental Rights）

**各家 AI 原則 issuer 對照（考試最重要的是記誰發誰的）：**

| 發布方 | 原則數 | 核心關鍵詞 |
|---|---|---|
| Microsoft | 6 | Fairness / Reliability & Safety / Privacy & Security / Inclusiveness / Transparency / Accountability |
| Google | 7 | Socially beneficial / Avoid unfair bias / Built for safety / Accountable / Privacy design / Scientific excellence / Accord with principles |
| HLEG（歐盟高階專家小組） | 7 | Human Agency & Oversight / Technical Robustness & Safety / Privacy & Data Governance / Transparency / Diversity, Non-discrimination and Fairness（多元性、非歧視與公平性） / Societal & Environmental Well-being / Accountability |
| 台灣 AI 基本法 | 7 | 永續福祉 / 人類自主 / 隱私資料治理 / 資安安全 / 透明可解釋 / 公平不歧視 / 問責 |
| FSC（金管會） | 6 | 治理問責 / 公平人本 / 隱私客戶 / 穩健安全 / 透明可解釋 / 永續發展 |

> 高頻題型：不是問你 fairness 重不重要，而是問「哪個組織提出 7 項 trustworthy AI requirements？」答案是 **HLEG**（不是 AI Act 本文條號）。

### Exam Rule

```text
「AI 管理系統、可認證、AIMS」       → ISO/IEC 42001:2023
「AI 風險管理方法指引（非認證）」    → ISO/IEC 23894:2023
「資安管理、CIA」                   → ISO/IEC 27001
「做了 27001 = 完成 AI 治理？」     → 否，27001 不涵蓋 fairness / drift / explainability
「7 trustworthy AI requirements」  → HLEG（不是 EU AI Act 條文）
「Microsoft Responsible AI」       → 6 principles（含 Inclusiveness）
「FSC 6 原則」                     → 行政指導，金融業 benchmark
```

### Quick Check

一家公司已取得 ISO/IEC 27001 認證，IT 主管說「資安已做好，AI 治理不用額外處理」。這個說法有什麼問題？

答案：說法有誤。
理由：ISO/IEC 27001 主要管資訊安全（CIA），不涵蓋 AI 特有的模型漂移、公平性、可解釋性、人類監督、基本權衝擊等議題。完整 AI 治理需要 ISO/IEC 42001（AIMS）或對應框架。

---

## 8. Exam Decision Trees 🔥🔥🔥

### 決策樹 1：EU AI Act 級別判斷

```text
拿到一個 AI use case
│
├─ Art.5 任何一項？
│  （social scoring / 職場情緒辨識 / 即時公共生物辨識 / subliminal manipulation 等）
│  └─ YES → Unacceptable Risk（不能做）
│
├─ Art.6 + Annex III 任何一類？
│  （credit scoring / 招募 / 教育評分 / 公共服務 / 執法 / 邊境 / 醫療）
│  └─ YES → High Risk（可做，但要重度合規）
│
├─ Art.50 透明義務？
│  （chatbot 未揭露 / deepfake / AI 生成內容）
│  └─ YES → Limited / Transparency Risk（揭露義務）
│
└─ 以上皆否
   └─ Minimal Risk（無特定 AI Act 義務，但仍受其他法規約束）
```

### 決策樹 2：NIST AI RMF Function 對應

```text
控制項描述是什麼？
│
├─ 政策 / 問責 / 治理委員會 / risk appetite / 教育訓練？
│  └─ Govern
│
├─ use case 邊界 / stakeholder mapping / harm 假設 / intended use？
│  └─ Map
│
├─ 指標設定 / 測試 / 偏差驗證 / robustness 測試 / 日誌分析？
│  └─ Measure
│
└─ 緩解計畫 / 優先排序 / rollback / incident response / escalation？
   └─ Manage

⚠️ Govern 是 cross-cutting，不是只在開始做一次就完事
```

### 決策樹 3：Risk Treatment 選擇

```text
Residual Risk 水準如何？
│
├─ 低於 Risk Appetite，有足夠監控？
│  └─ Accept（收）
│
├─ 高於 Appetite，可加控制壓低？
│  └─ Mitigate（降）
│
├─ 無法自行管控，可外包 / 保險？
│  └─ Transfer（轉）
│
└─ 踩到禁止線 / 壓不下來 / 基本權不可接受？
   └─ Avoid（避）—— 不做或停用
```

### 決策樹 4：誰做 FRIA？

```text
這個 AI 系統屬於 EU AI Act 高風險？
│
├─ 是 → 是 deployer（使用方組織）還是 provider（供應商）？
│       ├─ deployer → 上線前做 FRIA（Art.27）
│       └─ provider → 主要義務在技術文件、Conformity Assessment 等
│
└─ 否 → FRIA 沒有強制要求（仍可自願做）

FRIA ≠ DPIA
   FRIA → 基本權（公平、申訴、程序正義）
   DPIA → 個資處理風險（GDPR）
```

### 決策樹 5：看到產業，第一反應

```text
題目說的是哪個產業？
│
├─ 金融（信用 / 保險 / 貸款）
│  └─ FSC 指引（行政指導）+ EU AI Act essential services 類比
│
├─ 醫療（triage / 影像判讀 / 醫囑建議）
│  └─ 病患安全第一 + 健康資料高度敏感 + 醫師不可完全退場
│
└─ 公部門（補助 / 社福 / 行政服務）
   └─ AI 基本法 Art.19 + 基本權 + 申訴救濟機制
```

---

## 9. Trap Clinic 🔥🔥🔥

### Trap 1：chatbot 一定是最小風險

錯。一般互動型 chatbot 多半是**限制風險（Limited / Transparency Risk）**，因為 Art.50 要求揭露正在與 AI 互動。「不是 high-risk」不等於「沒有任何義務」。

Exam fix：

```text
chatbot / 未明示是 AI → 限制風險（需透明揭露），不是最小風險
```

### Trap 2：HLEG 7 要求是 EU AI Act 條文

錯。HLEG（歐盟高階專家小組）7 要求是 **2019 年 HLEG** 提出的，不是 EU AI Act 本文條號。這是超高頻 author-matching 題。

Exam fix：

```text
「7 trustworthy AI requirements」 → HLEG（不是 EU AI Act 條文）
EU AI Act 條文 → 禁止實務 / 高風險義務 / 透明義務
```

### Trap 3：做完 DPIA 就等於做完 FRIA

錯。DPIA 主軸是個資處理風險（GDPR），FRIA 主軸是更廣的基本權（公平、申訴、程序正義、人類監督）。兩者有交集但不相同。

Exam fix：

```text
個資處理風險     → DPIA（GDPR）
AI 基本權評估    → FRIA（EU AI Act Art.27）
做了 DPIA ≠ 做完 FRIA
```

### Trap 4：高風險等於不能做

錯。不能做的是**不可接受風險（Unacceptable Risk）**。高風險（High Risk）是可以做，但要滿足較重的治理、文件、監督與合規要求。

Exam fix：

```text
不能做 → Unacceptable Risk（Art.5 禁止）
可做但要重管 → High Risk（Annex III）
```

### Trap 5：ISO 27001 做完就等於 AI 治理做完

錯。27001 管的是 CIA 資訊安全，不足以處理模型漂移、公平性、可解釋性、人類監督等 AI-specific 議題。

Exam fix：

```text
AI 管理系統（可認證） → ISO/IEC 42001:2023
資安管理（CIA）       → ISO/IEC 27001（不夠涵蓋完整 AI 治理）
```

### Trap 6：金管會 AI 指引是強制法律

錯。金管會金融業 AI 指引是**行政指導**，不是強制法令。雖然金融業實務上是 de facto benchmark，但「不是法律」和「不重要」是兩回事。

Exam fix：

```text
FSC AI 指引 → 行政指導（Administrative Guidance），非強制法令
但金融業實務必須參照，不可忽視
```

### Trap 7：只要涉及臉部辨識就一律禁止

錯。不是所有 biometric system 都被禁。要看用途：
- 職場情緒辨識 → Art.5 禁止
- 以敏感屬性做生物特徵分類 → Art.5 禁止
- 一般臉辨識存取管制 → 很多是高風險，不是禁止

Exam fix：

```text
職場情緒辨識 / 公共場所即時執法辨識 → 禁止
一般 biometric access control       → 高風險（需重度管控，但可做）
```

### Trap 8：Govern 是 NIST AI RMF 第一步，做完就繼續往下

錯。Govern 是 cross-cutting function，貫穿 Map / Measure / Manage 全程，不是 waterfall 的第一步做完就沒了。

Exam fix：

```text
Govern → cross-cutting（全程都在）
Map → Measure → Manage → 依序進行，Govern 全程支撐
```

### Trap 9：Risk Register 就是把模型名稱和準確率列出來

錯。那比較像 model inventory 或 model card。Risk Register 要有 owner、風險敘述（若…則…）、likelihood × impact 分數、控制項、residual risk 與 treatment。

Exam fix：

```text
模型用途與限制說明  → Model Card
持續追蹤 owner / 分數 / treatment → Risk Register
```

### Trap 10：風險胃納越低越好

錯。風險胃納要和業務性質、法規、社會可接受度一致。對基本權與公平可以極低胃納，但對一般營運波動（例如輕微效能波動）設定極低胃納會造成管理癱瘓。

Exam fix：

```text
基本權 / 公平 / 個資  → 極低胃納（保守）
一般效能 / 成本波動  → 視業務性質設定適當胃納
```

### Trap 11：AI 風險管理只是在管 GenAI 幻覺

錯。L21203 是 all-AI risk management，涵蓋招募、信用評分、保險定價、教育決策、公部門社福審查、傳統 ML、非 GenAI 系統。

Exam fix：

```text
AI 風險管理涵蓋範圍 → 所有 AI 系統（不限 GenAI）
幻覺 / confabulation → GenAI-specific，但只是 AI 風險的一小部分
```

### Trap 12：FRIA 是 provider 的責任

錯。EU AI Act Art.27 的 FRIA 核心責任在 **deployer**（使用方），不是 provider（供應商 / 開發商）。

Exam fix：

```text
FRIA → deployer（使用方，高風險情境，上線前）
技術文件 / Conformity Assessment → provider（開發商）
```

---

## 10. Practice Questions

### 10.1 AI 風險類型

**Q1.** 某銀行的 AI 貸款審核系統，因訓練資料以過去核准案件為主，導致對低收入族群核貸率系統性偏低。這屬於哪種 AI 風險？

答案：倫理風險（Ethical Risk）/ 基本權風險（Fundamental Rights Risk）。
理由：核心問題是對特定族群產生不公平且可能侵害平等取得基本服務的結果，不只是模型技術失準。

**Q2.** AI 系統的第三方 API 突然失效，導致整條審核流程停擺。這屬於哪種 AI 風險？

答案：營運風險（Operational Risk）。
理由：第三方供應商依賴與流程中斷是營運風險的典型情境，不是技術風險（模型本身沒有失準）。

**Q3.** 一個招募 AI 的 prompt injection 攻擊導致履歷評分被操縱。這屬於哪種 AI 風險？

答案：資安風險（Security Risk）。
理由：prompt injection 是攻擊型手法，屬於模型被惡意操縱的資安威脅。

---

### 10.2 Risk Register 與量化工具

**Q4.** 風險登記簿（Risk Register）最重要的三個與持續治理相關的欄位是哪些？

答案：owner（負責人）、residual risk score（殘餘風險分數）、review date（回顧日期）。
理由：這三個欄位直接讓風險成為「有人追、有量化、有時間點回頭看」的 living document。

**Q5.** 某 AI 系統的財務衝擊只有 2 分，但其基本權衝擊評估為 5 分。按照 AI 風險最佳實務，這個系統的 impact 應該填幾分？

答案：5 分。
理由：AI 風險的 impact 建議取多面向評估中的最大值，不取平均，避免把真正嚴重的風險稀釋掉。

**Q6.** 哪個概念決定 residual risk 低到什麼程度才可以接受上線？

答案：風險胃納（Risk Appetite）。
理由：Risk Appetite 是組織設定的 residual risk 上限，殘餘風險必須低於胃納才能 accept。

---

### 10.3 EU AI Act

**Q7.** 某大型零售商部署 AI 系統，根據顧客的購買記錄、社群行為、地理位置給予不同等級的服務待遇（如特定促銷資格）。這最有可能落在 EU AI Act 哪一級？

答案：不可接受風險（Unacceptable Risk）—— 社會評分（Social Scoring）。
理由：根據多維個人資料給予不同社會服務待遇，符合 Art.5 social scoring 禁止情境。

**Q8.** 某公司在辦公室部署 AI 即時分析員工情緒。屬於哪一級？

答案：不可接受風險（禁止實務）。
理由：職場情緒辨識（Emotion Recognition at Work）是 Art.5 八類禁止實務之一。

**Q9.** 某銀行用 AI 模型自動給出信用評分，直接影響貸款核准與利率。屬於哪一級？

答案：高風險（High Risk）。
理由：信用評分屬 Annex III 基本服務（Essential Services）類別，是高風險使用情境，可做但要重度合規。

**Q10.** 某電商網站使用 AI 聊天客服，但在介面上完全不說明正在與 AI 互動。屬於哪一級，需要做什麼？

答案：限制風險（Limited / Transparency Risk），需符合 Art.50 透明揭露義務。
理由：與自然人互動但未明示是 AI，屬 Art.50 透明義務場景，需告知使用者正在與 AI 互動。

**Q11.** 高風險與不可接受風險的最大差異是什麼？

答案：高風險可以做，但要滿足重度治理 / 文件 / 監督要求；不可接受風險原則上不能做。
理由：Art.5 是禁止，Annex III 是可做但受監管，兩者性質完全不同。

---

### 10.4 FRIA 與 NIST AI RMF

**Q12.** 某公家機關計畫部署 AI 系統自動篩選補助申請資格，在上線前需要做哪種評估文件？

答案：基本權影響評估（FRIA）。
理由：公部門高風險 AI 使用情境，deployer 在上線前需依 EU AI Act Art.27 精神做 FRIA，評估對申請人基本權的潛在影響。

**Q13.** FRIA 的主要責任方是誰？

答案：Deployer（使用方 / 部署方）。
理由：Art.27 明定 FRIA 是 deployer 的義務，不是 provider（模型供應商）。

**Q14.** 「設立 AI 治理委員會、訂定 AI 使用政策、設定 risk appetite」，屬於 NIST AI RMF 哪個 function？

答案：Govern。
理由：政策建立、問責機制、risk appetite 設定都是 Govern function 的核心產出。

**Q15.** 「執行 fairness test、分析 robustness 測試報告、蒐集偏差監測日誌」，屬於哪個 function？

答案：Measure。
理由：量測、驗證、測試、蒐集證據都是 Measure 的職責。

---

### 10.5 台灣法規與標準

**Q16.** 台灣《人工智慧基本法》的中央主管機關是哪個部會？

答案：國家科學及技術委員會（NSTC，國科會）。
理由：AI 基本法明定中央主管機關為 NSTC。

**Q17.** 金管會 2024 年發布的《金融業運用 AI 指引》，在法律性質上屬於？

答案：行政指導（Administrative Guidance），非強制法令。
理由：這是金管會發布的行政指導，不是具有直接法律拘束力的法令，但在金融業實務上為 de facto benchmark。

**Q18.** 某公司已通過 ISO/IEC 27001 認證，想用這個資安認證來證明自家 AI 系統的治理完整性。這樣做有什麼不足？

答案：27001 主要管資訊安全 CIA，不涵蓋 AI 特有的模型漂移、公平性、可解釋性、人類監督、基本權等議題。需要 ISO/IEC 42001（AI 管理系統）才能涵蓋完整 AI 治理。

**Q19.** 下列哪一個標準是可以申請認證的 AI 管理系統標準？
（A）ISO/IEC 23894:2023　（B）ISO/IEC 42001:2023　（C）ISO/IEC 27001　（D）NIST AI RMF

答案：（B）ISO/IEC 42001:2023。
理由：42001 是可認證的 AI Management System（AIMS）標準；23894 是方法指引（非認證）；27001 是資安標準；NIST AI RMF 是志願性框架，不是認證標準。

---

### 10.6 原則 Issuer 對照

**Q20.** 「7 trustworthy AI requirements 包含 Human Agency & Oversight、Diversity, Non-discrimination and Fairness、Societal & Environmental Well-being」，這是哪個組織提出的？

答案：HLEG（歐盟高階專家小組，High-Level Expert Group on AI）。
理由：這組 7 要求是 HLEG 2019 提出，不是 EU AI Act 條文本身。

**Q21.** Microsoft 負責任 AI 6 原則中，哪一項是其他框架（如 HLEG / FSC）通常沒有明確列出的？

答案：Inclusiveness（包容性）。
理由：Microsoft 6 原則的 Inclusiveness 是較少見於其他框架的原則，其他框架多用 non-discrimination / fairness，Inclusiveness 是 Microsoft 的特色項目。

---

### 10.7 綜合情境判斷

**Q22.** 某 AI 系統 inherent risk score 為 18（Critical），加入人工覆核與偏差監測後，residual risk 降至 8（Medium），而組織的 risk appetite ceiling 為 10。應採取哪種 treatment？

答案：Accept（接受）。
理由：residual risk（8）低於 risk appetite ceiling（10），可以接受上線，並持續監控。

**Q23.** 某系統無論加入多少控制，殘餘基本權風險仍屬不可接受，且使用場景落在 EU AI Act Art.5 禁止清單。應採取哪種 treatment？

答案：Avoid（避免）—— 停止這個使用場景或改用其他方案。
理由：踩到 Art.5 禁止線，且 residual risk 壓不下來，唯一選項是不做或根本改變 use case。

**Q24.** 一家新創公司導入 AI 系統前，顧問建議：「先盤清楚誰是 stakeholder、這個系統用在哪個情境、可能影響哪些人」。這對應到 NIST AI RMF 的哪個 function？

答案：Map。
理由：盤點 use case、stakeholders、使用情境、可能 harm 都是 Map function 的工作。

**Q25.** 某公司的公部門客戶問：「台灣政府機關使用 AI 輔助社福審查，有沒有法規要求要做風險評估？」答案是？

答案：有。台灣《人工智慧基本法》第 19 條規定，政府使用 AI 執行業務或提供服務，應進行風險評估並規劃風險因應措施。
理由：Art.19 明確要求公部門 AI 使用需做風險評估，是本課台灣法規的核心考點。

---

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. **AI 風險有七大類型**：技術、法遵、倫理、營運、資安、聲譽、基本權。Impact 看多面向、取最大值，不取平均。

2. **EU AI Act 口訣「禁高透小」**：先問能不能做（Art.5 禁止），再看是否 Annex III 高風險，再看 Art.50 透明義務，剩下才是最小風險。高風險可做，禁止不行。

3. **FRIA 是 deployer 的責任，上線前做**。FRIA 範圍比 DPIA 廣，做了 DPIA 不等於做了 FRIA。

4. **NIST AI RMF 口訣「治盤量管」**：Govern（cross-cutting，全程）→ Map（盤情境）→ Measure（量驗證）→ Manage（管處置）。Govern 不是第一步做完就沒了。

5. **ISO/IEC 42001 是可認證的 AI 管理系統標準；27001 管資安 CIA，不足以涵蓋完整 AI 治理。**

6. **HLEG 提出 7 trustworthy AI requirements；金管會 AI 指引是行政指導，不是強制法令；台灣 AI 基本法 2026-01-14 公布施行，主管機關是 NSTC。**

7. **Risk Register 的核心欄位**：owner、inherent score、controls、residual score、treatment（降轉收避）、review date。治理文件與模型卡（Model Card）不同。

---

## Final Study Advice

本課不是背名詞表，而是要從題目情境判斷：「這個 AI 系統屬於哪一類風險？」「這個情境落在 EU AI Act 哪一級？」「這個控制項對應 NIST AI RMF 哪個 function？」「這家公司應該產出什麼文件？」

每個問題背後都有一條判斷邏輯，練習的目標是讓這條邏輯在 30 秒內自動跑出來。陷阱題幾乎都在：把限制風險當最小風險、把 DPIA 當 FRIA、把高風險當禁止、把 27001 當全套 AI 治理、把 HLEG 原則當 EU AI Act 條文、把金管會指引當強制法律。這六個混淆點反覆練到不會錯，本課就穩了。
