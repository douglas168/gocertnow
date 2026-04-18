# L21202 AI導入規劃 — 學習指南

> 對應評鑑範圍：**L212 AI導入評估規劃** > **L21202 AI導入規劃**
>
> 關鍵字：需求分析（Requirements Analysis）、技術應用方案設計（Technical Solution Design）、目標設置（Goal Setting：SMART / OKR / North Star + 3+2+1 KPI）、資源分配（Resource Allocation：錢人算料時）、5 階段導入路線圖（5-Phase Adoption Roadmap）、RACI、Microsoft CAF、Google Cloud AI Adoption Framework、IBM AI Ladder、Gartner AI Maturity、CRISP-DM、PoC vs MVP vs Pilot。

### 視覺化圖示（mermaid）
- [01 · 5 階段 Roadmap + Pilot Gate](diagrams/01-5phase-roadmap.md)
- [02 · 五向量資源分配（錢人算料時）](diagrams/02-five-vectors.md)
- [03 · Microsoft CAF 6 方法論 + Secure 貫穿](diagrams/03-microsoft-caf.md)
- [04 · RACI vs DACI A 意義對比](diagrams/04-raci-vs-daci.md)
- [05 · 三層目標架構 North Star → SMART → 3+2+1](diagrams/05-three-layer-goals.md)

---

## Section 1 · 本課要你答對的事

L21201 你已經學完「**選工具**」——加權評分矩陣、TCO、ROI、雙約束過濾、Go/No-Go gate。這一課**不再討論選哪一家 LLM**，而是回答老闆的下一題：

> 「方案選好了，**接下來怎麼做？誰負責？多少人、多少錢、多少時間、多少資料、多少算力？怎麼保證團隊不會做到一半翻盤？**」

### 對應評鑑範圍

> **L212 AI導入評估規劃** > **L21202 AI導入規劃**
>
> iPAS 115 簡章列舉的四大關鍵字：
> - **需求分析**（Requirements Analysis）：business goal → process → decision → data → technique 五層對應
> - **技術應用方案設計**（Technical Solution Design）：功能 / 資料 / 模型 / 整合 四面向
> - **目標設置**（Goal Setting）：SMART / OKR、North Star Metric、3+2+1 KPI
> - **資源分配**（Resource Allocation）：預算 / 人力 / 算力 / 資料 / 時間（口訣「錢人算料時」）

### 與相鄰單元的邊界（記熟，避免越界答錯）

| 單元 | 在做什麼 | 與 L21202 的關係 |
|---|---|---|
| **L21201**（評估） | 評分矩陣 / TCO / ROI / 雙約束 → **選出方案 X** | L21202 的**輸入**（不重教算術） |
| **L21202**（本課） | 需求分析 → 方案設計 → 目標 → 資源 → 路線圖 | **本節所涵蓋** |
| **L21203**（風險） | EU AI Act / NIST RMF / ISO 42001 / 風險登記冊 | L21202 只把風險當**規劃輸入**（保留 governance budget），不教風險框架 |
| **L21302**（部署） | MLOps / CI/CD / 監控 / 容器化 / 漂移偵測 | L21202 只畫「部署階段」是 roadmap 的一環，不教落地工具鏈 |
| **初級 L12302**（GenAI 導入） | 單一 GenAI 工具導入檢核（非技術 PM 視角） | L21202 升級為**組織層級、跨 AI 類型**的正式規劃，含 discriminative / generative / 傳統 ML |

🗣️ **白話說明**：L21201 像是你在 momo 比價**選出**要買的筆電，L21202 則是**買回來之後**的事——誰來安裝、誰教同事用、多少預算給訓練、多少時間上線、資料庫要怎麼搬。本課關心的是**專案能不能落地、誰要簽名、時間表長什麼樣**；不是工具選型（L21201），也不是「萬一電池燒掉誰賠」（L21203 風險），更不是「雲端主機怎麼開」（L21302 部署）。

---

## Section 2 · 關鍵概念總覽圖（Knowledge Tree）

```
AI 導入規劃 L21202
│
├─ 📖 規劃四大產出物（依 L21201 選定方案後展開）
│   ├─ 1. 需求說明書（Requirements doc）← 需求分析
│   ├─ 2. 解決方案藍圖（Solution blueprint）← 技術應用方案設計
│   ├─ 3. OKR / SMART 目標書（Objectives doc）← 目標設置
│   └─ 4. 資源配置表 + 專案章程（Charter）← 資源分配
│       ⚠️ 產出物是「計畫書」而不是「評分矩陣（L21201）」或「風險登記冊（L21203）」🔥🔥
│
├─ 🔧 需求分析 Requirements Analysis（五層對應）🔥🔥
│   ├─ L1 Business Goal（營運目標：降成本 / 增收 / 改體驗 / 守法）
│   ├─ L2 Process（業務流程：哪一段流程會被 AI 改）
│   ├─ L3 Decision（決策點：AI 做什麼判斷、回答什麼問題）
│   ├─ L4 Data（資料流：輸入什麼、輸出什麼、標註誰做）
│   └─ L5 Technique（AI 技術：分類 / 檢索 / 生成 / 預測…）
│       ⚠️ 從 L1 → L5 逐層對應，跳層（L1 直接跳 L5）是最常見錯誤 🔥
│
├─ 📖 技術應用方案設計 Solution Design（4 面向）🔥
│   ├─ 功能設計（User flow、UI/UX、fallback 機制）
│   ├─ 資料設計（來源、清洗、標註、版本、隱私）
│   ├─ 模型設計（Prompt / RAG / Fine-tune 分層，引用 L21201）
│   └─ 整合設計（與 CRM / ERP / LINE OA 的 API 串接）
│       ⚠️ 方案設計 ≠ 系統部署架構（那是 L21302）；只畫邏輯架構，不畫 k8s 拓撲 🔥
│
├─ 📊 目標設置 Goal Setting（三層金字塔）🔥🔥
│   ├─ North Star Metric（北極星指標，**一個**專案只能有一個）🔥
│   ├─ OKR / SMART（季/年度可衡量目標）
│   │   └─ SMART = Specific / Measurable / Achievable / Relevant / Time-bound
│   ├─ 3+2+1 KPI（3 營運 + 2 業務 + 1 風險指標）🔥
│   └─ 反模式：vanity metrics（看得爽但不可行動的虛榮指標）
│       ⚠️ 「客戶滿意度 +10%」沒有基線、沒有期限 = 不是 SMART 🔥
│
├─ ⚖️ 資源分配 Resource Allocation（錢人算料時）🔥🔥
│   ├─ 錢（Budget）：五年 TCO，AI 專案建議初期 × 2 預留 overrun
│   ├─ 人（Headcount）：PM / DS / MLE / DE / 業務 SME / QA
│   ├─ 算（Compute）：GPU 類型、雲端 vs 地端、峰值 vs 常態
│   ├─ 料（Data）：量、品質、標註成本、合規成本（清洗 2-8 週）
│   └─ 時（Timeline）：至少 6 個月落地週期；含 pilot gate
│       ⚠️ 70/20/10 heuristic：70% 基礎設施 + 20% 模型 + 10% 維運 🔥
│
├─ 🔧 5 階段導入路線圖（5-Phase Adoption Roadmap）🔥🔥
│   ├─ P1 需求分析（Requirements）──  gate: 問題書、利害關係人簽核
│   ├─ P2 方案設計（Solution Design）──  gate: 藍圖、預算核准
│   ├─ P3 資源規劃（Resource Plan）──  gate: RACI、排程、合約
│   ├─ P4 試點（Pilot）──  gate: 成功指標 pre-defined 達成
│   └─ P5 擴展（Rollout / Scale）──  gate: 全量部署 → 移交 L21302
│       ⚠️ pilot gate 未過不進 rollout；規劃階段不教 MLOps（L21302）🔥
│
├─ 📖 角色協作 RACI（負·當·諮·告）
│   ├─ R = Responsible 實際執行
│   ├─ A = Accountable 當責簽核（**每列只能一個 A**）🔥
│   ├─ C = Consulted 事前諮詢（雙向）
│   └─ I = Informed 事後告知（單向）
│       ⚠️ R 和 A 混用是最常考的陷阱 🔥🔥
│
├─ ⚖️ 產業參考框架（知道即可、不背細節）
│   ├─ Microsoft Cloud Adoption Framework (AI): 6 方法論（Strategy/Plan/Ready/Adopt/Govern/Manage）+ Secure cross-cutting
│   ├─ Google Cloud AI Adoption Framework: 4 themes × 6 pillars（跨 3 maturity 階段）
│   ├─ IBM AI Ladder: Collect → Organize → Analyze → Infuse
│   ├─ Gartner AI Maturity: 5 級（Awareness → Transformational）
│   └─ CRISP-DM: 六階段（資料科學專案通用，仍是最廣用方法論）
│
└─ 📖 AI 規劃的特殊性（vs 傳統 PMP）🔥
    ├─ 資料不確定性（清洗 2-8 週，常超出原估）
    ├─ 模型不確定性（需 PoC/MVP gate 驗證，不是 PMP 式 waterfall）
    ├─ 持續再訓練成本（非一次性 CAPEX，要列入 OpEx）
    ├─ 人才稀缺（DS/MLE 薪資高、難招，HR 計畫要提前啟動）
    └─ Feedback loop（上線後會改變使用者行為，回頭影響模型）
        ⚠️ 只做 PMP WBS / Gantt / Critical Path 而沒寫以上 5 點 = 失分 🔥🔥
```

---

## Section 3 · 核心概念（Core Concepts）

### 3.1 從評估到規劃：L21201 → L21202 的銜接

一句話帶過：**L21201 的 Go/No-Go gate 通過後，規劃階段接手**。你帶著「我們選 GPT-4o-mini + RAG」這個決定進入 L21202，不再辯論該不該用、該選哪一家——接下來要回答的是**「誰做、多少錢、多少時間、多少資料、上線後誰顧」**。

🗣️ **白話**：像你在 momo 結完帳（L21201）領到包裹（方案 X），現在要把筆電**真的裝進辦公室**——OS 灌哪版、誰教同事用、資料如何搬、保固誰接。這就是規劃。

---

### 3.2 需求分析（Requirements Analysis）🔥🔥

#### 3.2.1 五層對應法（**business → process → decision → data → technique**）

```
L1  Business Goal  ── 為什麼做？成功長什麼樣？
         │
         ↓ 落到哪個業務流程？
L2  Process        ── 客服 / 理賠 / 採購 / 行銷哪一段？
         │
         ↓ 流程中的哪個決策點？
L3  Decision       ── 人現在在做什麼判斷？AI 替代或輔助哪個？
         │
         ↓ 這個決策要哪些資料？
L4  Data           ── 輸入、輸出、歷史樣本、標註策略
         │
         ↓ 用哪種 AI 技術最合適？
L5  Technique      ── 分類 / 回歸 / 檢索 / 生成 / 多模態…
```

**範例：蝦皮客服導入 AI**

| 層 | 內容 |
|---|---|
| L1 Business Goal | 客服首回時間從 5 分鐘 → 30 秒；月支出 NT$150 萬 → NT$60 萬 |
| L2 Process | 消費者傳訊 → 客服讀訊 → 查訂單 → 回覆 |
| L3 Decision | 「這是物流問題、退款問題、還是商品問題？」分類 + 草擬回覆 |
| L4 Data | 過去 12 個月 50 萬筆客服對話（已脫敏）、訂單 API、退款政策文件 |
| L5 Technique | 意圖分類（discriminative）+ RAG（retrieval）+ 草擬（generative） |

🗣️ **白話**：「我們想做 AI」是 L1，「我們想用 ChatGPT 做客服」是直接跳到 L5——**跳層是最常見的錯誤**。中間的 process / decision / data 三層沒填，上線後一定會出現「AI 回得又快又爽，但客戶抱怨回答沒對準實際訂單」——因為 L4 資料沒設計。

#### 3.2.2 利害關係人（Stakeholder）盤點

| 類型 | 範例 | 為什麼要訪談 |
|---|---|---|
| **業務 SME** | 客服主管、理賠主任 | 他們最清楚 decision 的邏輯與例外 |
| **IT / Data** | DBA、資料工程師 | 知道 data 能不能拿、合規限制 |
| **法遵 / 個資** | 法務、資安 | 早一點知道合規線在哪（L21203 的 input） |
| **最終使用者** | 一線客服 / 申訴專員 | 他們才是被 AI「輔助」的人——設計 fallback 和 override |
| **高管 sponsor** | VP / 部門總 | 給預算、擋跨部門阻力 |

> 🔥 考題若問「規劃階段第一步要做什麼」→ 正解是**利害關係人盤點 + 需求訪談**，不是「寫程式」也不是「選 GPU」。

---

### 3.3 技術應用方案設計（Technical Solution Design）🔥

完整方案藍圖要涵蓋**四面向**——不是只寫「用 GPT-4o-mini + RAG」就算完成。

| 面向 | 內容 | 常見產出物 |
|---|---|---|
| **功能設計** | User flow、UI wireframe、fallback（AI 答不出來時轉人工）、信心分數門檻 | User journey map、Figma 線框圖 |
| **資料設計** | 來源、清洗 SOP、標註 rubric、版本控管、PII 處理 | Data dictionary、資料卡 |
| **模型設計** | Prompt template / RAG index 結構 / fine-tune 樣本量（引用 L21201 階梯） | Model card、Prompt spec |
| **整合設計** | 與 CRM（Salesforce）、LINE OA、內部 ticketing 的 API | 系統序列圖（sequence diagram） |

#### 3.3.1 邏輯架構 vs 部署架構的界線

```
┌─────────────────────────────────────────────┐
│  L21202 畫到這：邏輯架構（Logical Architecture）│
│                                              │
│   [使用者] → [Web App] → [API Gateway]        │
│                            ↓                 │
│                      [LLM Service]           │
│                            ↓                 │
│                      [Vector DB] ← [資料源]   │
└─────────────────────────────────────────────┘
              ↓ （交給 L21302）
┌─────────────────────────────────────────────┐
│  L21302 才畫到這：部署架構（Deployment）      │
│                                              │
│   k8s namespace / node pool / autoscaler /   │
│   Istio service mesh / Prometheus / Grafana  │
└─────────────────────────────────────────────┘
```

> 🔥 **陷阱警示**：把 k8s、Istio、Prometheus 寫進 L21202 的方案設計 = **越界**。規劃階段只畫**邏輯流**，不寫容器/監控。

---

### 3.4 目標設置（Goal Setting）🔥🔥

#### 3.4.1 三層金字塔

```
          ┌──────────────────┐
          │  North Star      │  ← 單一、長期、整個專案只有「一個」
          │  Metric 北極星   │
          └──────────────────┘
                    │
          ┌──────────────────┐
          │  OKR / SMART     │  ← 季/年度可衡量目標（2-5 個）
          └──────────────────┘
                    │
          ┌──────────────────┐
          │  3+2+1 KPI       │  ← 營運 3 + 業務 2 + 風險 1（每週/每月追蹤）
          └──────────────────┘
```

#### 3.4.2 北極星指標（North Star Metric, NSM）🔥

- **定義**：一個能**同時反映「使用者價值」與「商業成功」**的單一指標。
- **鐵律**：**一個專案只能有一個 NSM**。太多北極星 = 沒有北極星。

| 專案 | 好的 NSM | 不好的 NSM |
|---|---|---|
| 蝦皮客服 AI | 「每週首回 < 30 秒的訊息占比」 | 「客戶滿意度」（太抽象）、「API 呼叫次數」（虛榮） |
| LINE Bank 反詐 | 「每月可疑交易攔截金額」 | 「模型 accuracy」（內部指標，不反映業務） |
| 104 履歷配對 | 「每週完成面試的配對數」 | 「履歷閱覽次數」（沒有轉換） |

🗣️ **白話**：北極星像**車子的儀表板上那一顆最大的時速錶**。你儀表板上可以有油量、水溫、轉速——但只有一顆主錶告訴你「現在跑得是快還是慢」。

#### 3.4.3 SMART 原則（每個子目標都要過關）

| 字母 | 中文 | 白話檢查 |
|---|---|---|
| **S**pecific | 具體 | 「改善客服」❌ → 「降低首回時間」✅ |
| **M**easurable | 可衡量 | 「大幅改善」❌ → 「從 5 分 → 30 秒」✅ |
| **A**chievable | 可達成 | 「accuracy 99.9%」對客服意圖分類通常 ❌ |
| **R**elevant | 相關 | 要與 North Star 對齊，不要做離題指標 |
| **T**ime-bound | 有期限 | 「長期目標」❌ → 「2026-Q3 達成」✅ |

#### 3.4.4 OKR（Objectives and Key Results）

- **Objective（O）**：一句話的方向感，帶 aspiration。「讓蝦皮客服成為台灣電商最快的回覆體驗。」
- **Key Result（KR）**：3-5 個可量化成果。
  - KR1：每週首回 < 30 秒的訊息占比 ≥ 70%（**現狀 20%**）
  - KR2：每月客服人力成本 ≤ NT$60 萬（現狀 150 萬）
  - KR3：客戶 CSAT ≥ 4.5 / 5（現狀 4.0）

> **OKR vs SMART**：SMART 檢查**單一目標**的品質；OKR 是**一組**（1 個 O + 多個 KR）的結構。兩者並不互斥，常一起用——用 SMART 的規則去寫 KR。

#### 3.4.5 3+2+1 KPI 搭配 🔥

導入規劃完成後，週/月例會要追的 KPI 建議組合：

| 類別 | 數量 | 範例（蝦皮客服 AI） |
|---|---|---|
| **營運 KPI**（Operational） | 3 | (a) p95 latency < 2s、(b) AI 覆蓋率 ≥ 80%、(c) fallback 轉人工率 ≤ 15% |
| **業務 KPI**（Business） | 2 | (a) 首回時間中位數 < 30s、(b) CSAT ≥ 4.5 |
| **風險 KPI**（Risk） | 1 | 幻覺/錯答投訴率 ≤ 0.5%（> 門檻即觸發 L21203 風險流程） |

> **為什麼是 3+2+1**：太多 KPI → 團隊抓不到重點；太少 → 看不到風險訊號。這是**業界參考口訣（industry heuristic）**，不是官方考試標準；實務上是用來提醒自己別漏掉「營運 / 業務 / 風險」三層，不是死背的框架。
>
> 🗣️ **記憶鉤子**：先看系統跑得穩不穩（3 operational），再看業務有沒有賺（2 business），最後看會不會出事（1 risk）。

#### 3.4.6 Vanity Metrics 反模式

| ❌ Vanity | ✅ Actionable |
|---|---|
| Total API call 次數 | 每次呼叫的成功率、單位成本 |
| 「註冊人數」 | 7 日留存率、單人月使用次數 |
| 「模型 accuracy 95%」 | 生產環境 p95 latency + 客戶 CSAT |

> **Vanity** = 看得爽，但無法指引下一步行動。規劃時**先自問「這個指標變差，我明天要做什麼？」**——答不出來就是 vanity。

---

### 3.5 資源分配（Resource Allocation）🔥🔥

> **口訣：錢人算料時** — 預算 / 人力 / 算力 / 資料 / 時間。缺一不可。

#### 3.5.1 五向量盤點表

| 向量 | 內容 | AI 專案的獨特坑 |
|---|---|---|
| **錢 Budget** | 五年 TCO；AI 建議**初期估算 × 2** | 資料清洗、再訓練不是一次性 |
| **人 Headcount** | PM / Data Scientist / ML Engineer / Data Engineer / SME / QA | DS/MLE 年薪 NT$120-200 萬、難招 |
| **算 Compute** | GPU 型號、雲或地端、峰值 vs 常態、推論 vs 訓練 | 訓練用 A100/H100、推論 L40S/T4 夠用 |
| **料 Data** | 量、品質、標註、合規（清洗 2-8 週是常態） | 常低估；沒資料就沒模型 |
| **時 Timeline** | AI 落地**至少 6 個月**；含 pilot gate | 比傳統 IT 專案多 30-50% |

> ⚠️ AI 模型與 API 版本生命週期約 6-12 個月，套用傳統 IT 五年硬體折舊表會低估汰換成本；建議把模型層費用按年重估，不當成線性折舊。

#### 3.5.2 70 / 20 / 10 預算分配 heuristic 🔥

```
┌─────────────────────────────────────────────┐
│  70%  基礎設施 Infrastructure                │  算力、資料工程、整合、工具
│  ─────────────                               │
│  20%  模型開發 Model                         │  訓練、微調、prompt、評估
│  ─────────────                               │
│  10%  運維治理 Ops + Governance              │  監控、合規、災難回復
└─────────────────────────────────────────────┘
```

> **為何基礎設施佔 70%**：資料管線、標註平台、與 CRM/ERP 整合、權限管理——這些看起來「不是 AI」的工作，**實際上是 AI 能不能上線的瓶頸**。Google、Microsoft 內部統計也接近這個比例。

> ⚠️ **Build vs Buy 差異**：70/20/10 主要適用於自建 (Build / Self-host) 的 ML 專案。若採用 Managed API（如 OpenAI / Claude / Gemini API）或純 SaaS，基礎設施 CapEx 趨近於 0，主要成本轉為 API 呼叫量的 OpEx，比例會大幅改變。規劃時先確認架構路線，再套公式。

> 🔥 **陷阱**：新手規劃把 60% 丟模型訓練、20% infra、20% 其他——結果上線延宕 3 個月，因為資料管線沒建好。

#### 3.5.3 人力配置模板（中型 AI 專案，5-10 人）

| 角色 | 縮寫 | 人數 | 主要責任 |
|---|---|---|---|
| 專案經理 | PM | 1 | 排程、溝通、風險追蹤 |
| 資料科學家 | DS | 1-2 | 模型選型、評估、實驗設計 |
| 機器學習工程師 | MLE | 1-2 | 訓練、部署（與 L21302 交界） |
| 資料工程師 | DE | 1 | pipeline、清洗、標註平台 |
| 業務 SME | SME | 1（兼） | 需求、rubric、UAT |
| QA / 測試 | QA | 0.5-1 | 離線評估 + 人評 |

> 🔥 **AI 團隊 vs 傳統 IT 團隊最大差異**：多了 **DS 與 DE**，而且 DS 的工作**充滿不確定性**（實驗結果可能全部推翻）——所以規劃要預留 buffer，不能照 PMP 式 critical path 排。

> **台灣 SMB 現實**：97% 台灣企業屬中小企業，不會有完整 5-10 人 AI 團隊。常見模式是「一人兼多角（PM+PO+DS 合一）」或「高度依賴 SI／外包（如趨勢、資策會、雲端大廠 MSP）」。規劃時若團隊只有 1-2 人，優先選 Managed API + 低程式碼工具 + 外包標註，減少自建壓力。

#### 3.5.4 Build vs Buy 的「規劃」視角

> L21201 已經決策「Buy / Build / Hybrid」；L21202 的工作是**把這個決策落成資源配置**。

| 決策 | 對資源分配的影響 |
|---|---|
| **Buy（Managed API）** | 錢：OpEx 為主；人：MLE 少、工程師多；算：0；料：中 |
| **Build（Self-host）** | 錢：CapEx 大；人：MLE 2+、DE 2+；算：GPU；料：量大 |
| **Hybrid** | 錢：CapEx + OpEx；人：全配；算：地端 + 雲端 |

---

### 3.6 5 階段導入路線圖（5-Phase Adoption Roadmap）🔥🔥

```
          ┌───────────────────────────────────────────────────┐
          │  P1 需求分析 Requirements     （2-4 週）            │
          │  gate: 利害關係人簽核、問題書、L1-L5 五層對應表     │
          └───────────────────────────────────────────────────┘
                              ↓
          ┌───────────────────────────────────────────────────┐
          │  P2 方案設計 Solution Design  （3-6 週）            │
          │  gate: 功能/資料/模型/整合 四面向藍圖 + 預算核准    │
          └───────────────────────────────────────────────────┘
                              ↓
          ┌───────────────────────────────────────────────────┐
          │  P3 資源規劃 Resource Plan    （2-3 週）            │
          │  gate: RACI + 排程 + 合約 + 70/20/10 預算表        │
          └───────────────────────────────────────────────────┘
                              ↓
          ┌───────────────────────────────────────────────────┐
          │  P4 試點 Pilot                （6-12 週）           │
          │  gate: pre-defined 成功指標達成（Go/No-Go）         │
          │  ⚠️ 未達標 → 回 P1/P2 修正，不進 rollout            │
          └───────────────────────────────────────────────────┘
                              ↓
          ┌───────────────────────────────────────────────────┐
          │  P5 擴展 Rollout / Scale      （12 週+，逐批放量）  │
          │  gate: 全量部署達成 → 移交 L21302（MLOps）          │
          └───────────────────────────────────────────────────┘
```

#### 3.6.1 Pilot Gate 的關鍵條件（考題常考）🔥

Pilot 結束要通過下列**全部**條件才進 rollout：

1. **成功指標達成**（PoC 開始前已書面化，不可事後修改）
2. **使用者可接受度**（CSAT / NPS 達門檻）
3. **風險紅線無觸發**（錯答率 / 偏見 / 隱私事件在容忍範圍，連動 L21203）
4. **經濟效益確認**（單位成本、實際 TCO 不超預估 20%）
5. **營運 SOP 就緒**（fallback、事故處理、退場機制）

> 🔥 **陷阱警示**：規劃時**不能省略 pilot gate**，直接排到 rollout——AI 專案的模型不確定性意味著「上線後才發現不行」的代價是 PMP 式失敗的 5-10 倍。

#### 3.6.2 3 種驗證活動的差別（PoC / MVP / Pilot）

> 三者在考題常被混用，務必分清楚。

```
PoC                MVP                  Pilot
──────             ──────               ──────
可行性            可交付                 可規模化
Proof of          Minimum Viable        小規模真實
Concept           Product               部署
──────────        ─────────────         ────────────
在 L21201         在 L21202             在 L21202 P4
Go/No-Go          解決方案設計          階段
之前              之中

技術風險高        對客戶驗證            小規模驗證營運
「做得出來嗎？」  「有人要用嗎？」      「一路到底順不順？」
```

---

### 3.7 RACI 範例：蝦皮客服 AI chatbot 導入 🔥🔥

#### 3.7.1 RACI 四字母定義

| 字母 | 中文 | 作用 | 每列可以有幾個？ |
|---|---|---|---|
| **R** Responsible | 負責（執行） | 實際動手做的人 | 可以多個 |
| **A** Accountable | 當責（扛最終成敗責任，通常只有一位） | 扛專案最終成敗的人 | **每列只能 1 個** 🔥 |
| **C** Consulted | 諮詢 | 事前雙向討論 | 可以多個 |
| **I** Informed | 告知 | 事後單向通知 | 可以多個 |

> 🔥 **RACI vs DACI 辨別**：RACI 的 A 扛專案成敗；DACI 的 A 是純簽核拍板，兩者不是同一件事。

#### 3.7.2 完整 RACI 矩陣

| 專案活動 | PM | 產品 Owner（PO） | DS | MLE | DE | 客服主管 | 法務/資安 | 高管 Sponsor |
|---|---|---|---|---|---|---|---|---|
| 利害關係人訪談 | **R** | **A** | C | I | I | C | C | I |
| 需求說明書撰寫 | **R** | **A** | C | I | I | C | C | I |
| 資料可得性評估 | I | C | **R** | I | **A** | I | C | I |
| 模型選型（引用 L21201） | I | C | **R**,**A** | C | I | I | I | I |
| 標註 rubric | C | **A** | **R** | I | C | C | C | I |
| Prompt / RAG 設計 | I | C | **A** | **R** | C | I | I | I |
| Pilot 設計（流量比、期間） | **R** | **A** | C | C | C | C | I | I |
| Pilot 成功指標書面化 | **R** | **A** | C | C | I | C | C | I |
| 上線 Go/No-Go 會議 | **R** | C | C | C | I | C | C | **A** |
| 事故應變 SOP | **R** | C | C | C | C | **A** | C | I |

#### 3.7.3 常見 RACI 錯誤

| ❌ 錯 | ✅ 對 |
|---|---|
| 一列出現 3 個 A | 每列只能 1 個 A（當責要單一歸屬） |
| PM 自己填 RACI 後不讓團隊看 | RACI 是**共識文件**，要公開、簽核 |
| 把 C 填成 I（省事） | C 是雙向、要收到回饋；I 只是通知 |
| 沒有填「事故應變」列 | 事故的 A 通常是 SME 主管，不是 PM |

#### 3.7.4 RACI vs DACI（知道差別即可）

| 框架 | 代表誰 | 差異 |
|---|---|---|
| **RACI** | R / A / C / I | 最常用，A 是「當責簽核」 |
| **DACI** | Driver / Approver / Contributors / Informed | 強調**決策**：Driver 推進、Approver 拍板 |

> DACI 更適合**一次性重大決策**（例：選方案 A 或 B），RACI 更適合**日常協作**。中級考題出現頻率：**RACI >> DACI >> RAPID**。本課 RAPID 不展開。

> （此屬 L21202 的規劃階段產出物；上線後的日常維運 RACI 則屬 L21302 範疇）

---

### 3.8 產業參考框架（Industry Frameworks）⚖️

> 中級考題會問「哪個框架屬於誰」，不會要求背所有步驟。記住**每個框架的代表關鍵字**即可。

#### 3.8.1 Microsoft Cloud Adoption Framework for AI

Microsoft CAF 由 **6 個方法論（methodologies）** 組成，另有 **Secure 作為橫跨全部 6 個方法論的 cross-cutting 面向**（不是一個線性階段）：

- **6 方法論**：Strategy、Plan、Ready、Adopt、Govern、Manage
- **Secure**：橫跨式套用於上述 6 個方法論，不是順序階段

```
Strategy → Plan → Ready → Adopt → Govern → Manage
   ↑         ↑                        ↑
 商業動機   Plan 階段是 L21202 核心    治理由 L21203 接手

   ─────────── Secure（cross-cutting）貫穿全部 ───────────
```

- **Plan 階段重點**：digital estate 評估、skill gap 盤點、30-60-90 day roadmap。
- **記憶鉤子**：微軟強調 **Plan 階段**（對應本課），也是 CAF 中最接近 L21202 定義的部分。

#### 3.8.2 Google Cloud AI Adoption Framework

Google CAF 用「主題（rows）× 支柱（columns）」的矩陣描述組織 AI 成熟度：

```
4 主題（themes，rows）：Learn · Lead · Access · Scale
6 支柱（pillars，columns）：People · Data · Technology · Process · Governance · Culture
3 成熟度階段：Tactical → Strategic → Transformational
```

- **記憶鉤子**：**4 themes × 6 pillars**，跨 3 個成熟度階段逐步進化。
- ⚠️ 常見錯誤：把 Automate / Secure 當成 themes（錯），或把 themes 與 pillars 對調（錯）。

#### 3.8.3 IBM AI Ladder

```
Collect → Organize → Analyze → Infuse
   ↑          ↑          ↑         ↑
 收集資料   整理/治理   分析洞察  嵌入業務
```

- **記憶鉤子**：**先有資料再有 AI**——IBM 強調「資料梯度」是導入前置條件。

#### 3.8.4 Gartner AI Maturity Model（五級）

| 級 | 名稱 | 企業比例 |
|---|---|---|
| L1 | Awareness（認知） | 多數 |
| L2 | Active（主動嘗試） | — |
| L3 | Operational（營運化） | — |
| L4 | Systemic（系統化） | 少數 |
| L5 | Transformational（轉型化） | 僅約 6% |

> 考題若問「企業 AI 成熟度分級」→ 答 **Gartner 五級**。

#### 3.8.5 CRISP-DM（六階段，資料科學專案通用）

```
Business Understanding
      ↓
Data Understanding
      ↓
Data Preparation
      ↓
Modeling
      ↓
Evaluation
      ↓
Deployment
```

- **記憶鉤子**：**業·資·備·模·評·部** — 最老但最廣用的 DM / ML 流程，L21202 可以把 5-phase roadmap 對應回 CRISP-DM 的前 4-5 階段。

---

### 3.9 AI 規劃的特殊性（vs 傳統 PMP）🔥🔥

考題最愛問的差異點。若你只寫 WBS / Gantt / Critical Path，**中級一定失分**。

| AI 特殊議題 | 對規劃的影響 | PMP 翻版為何不夠 |
|---|---|---|
| **資料不確定性** | 清洗 2-8 週是常態，要預留 buffer | PMP 假設需求穩定，AI 需求常隨資料發現而變 |
| **模型不確定性** | 需 PoC / MVP / Pilot 三重 gate | PMP 的 waterfall 假設「設計完就能做」 |
| **持續再訓練** | 是 OpEx 而非一次性 CapEx | PMP 把「專案結束」當終點，AI 沒有 |
| **人才稀缺** | DS/MLE 招聘 3-6 個月、年薪高 | PMP 假設人力可調度，AI 常卡在「找不到人」 |
| **Feedback loop** | 上線會改變使用者行為，模型衰退 | PMP 沒有「上線後持續再進化」的概念 |
| **合規介面** | 早期就要把 L21203 風險納入預算 | PMP 把合規當末端檢查 |

> 🗣️ **白話**：PMP 管「蓋房子」——藍圖畫好、建材叫好、工期固定。AI 專案比較像**種田**——土壤（資料）沒試過怎麼種；種子（模型）發不發芽要看天氣；就算收成了，下個季節還要再種。所以 L21202 的規劃**一定要有 pilot gate、持續再訓練預算、模型衰退 KPI**，不只有 WBS。

---

## Section 4 · 易混淆概念對照表（Comparison Tables）

### 4.1 L21201 / L21202 / L21203 / L21302 邊界（最重要的一張表）🔥🔥

| 單元 | 核心動詞 | 主要產出物 | 典型題幹關鍵字 | 不屬於本單元 |
|---|---|---|---|---|
| **L21201 評估** | 選 | 加權評分矩陣、TCO / ROI、Go/No-Go | 「評分」「TCO」「ROI」「雙約束」「比較方案」 | RACI、roadmap、風險框架、MLOps |
| **L21202 規劃**（本課）| 規劃、配置 | 需求書、方案藍圖、OKR、資源表、RACI、5-phase roadmap | 「需求分析」「資源分配」「RACI」「SMART/OKR」「pilot gate」 | 工具評分矩陣、EU AI Act、k8s |
| **L21203 風險** | 管風險、守法 | 風險登記冊、EU AI Act 分級、NIST RMF | 「風險識別」「分級」「監理」「AI Act」「ISO 42001」 | 需求書、資源表、MLOps 管線 |
| **L21302 部署** | 上線、維運 | CI/CD、model registry、監控 dashboard、漂移偵測 | 「MLOps」「監控」「漂移」「容器化」「Canary」 | 需求分析、TCO 算術、風險分級 |

> 🔥🔥 **考試速判**：看到「選工具」→ L21201；看到「規劃、配置、RACI」→ L21202；看到「風險分級、合規」→ L21203；看到「部署、監控、漂移」→ L21302。

### 4.2 SMART vs OKR vs KPI

| 維度 | SMART | OKR | KPI |
|---|---|---|---|
| 本質 | 一個**目標**的品質檢查表 | 一組（O + 多個 KR）目標結構 | 長期追蹤的衡量指標 |
| 數量 | 單一目標檢查 | 1 個 O + 3-5 個 KR | 5-15 個跨層級 |
| 時限 | 有期限（T） | 季/年為主 | 持續追蹤（週/月） |
| 重點 | 寫得好不好 | 方向 + 成果 | 看指標本身 |
| 何時用 | 寫任何目標時檢查 | 季度 planning | 週/月會追蹤 |

> **關係**：用 SMART 寫 OKR 的 KR，用 KPI 追蹤 OKR 的達成度。

### 4.3 RACI vs DACI

| 框架 | 縮寫展開 | 強調 | 何時用 |
|---|---|---|---|
| **RACI** | Responsible / Accountable / Consulted / Informed | 日常**協作分工** | 每週例行任務、常態流程 |
| **DACI** | Driver / Approver / Contributors / Informed | 重大**決策** | 一次性大決定（選方案、定路線） |

### 4.4 Microsoft CAF / Google CAF / IBM AI Ladder / CRISP-DM

| 框架 | 階段數 | 關鍵字 | 記憶鉤子 |
|---|---|---|---|
| **Microsoft CAF for AI** | 6 方法論 + Secure 橫跨（Strategy / Plan / Ready / Adopt / Govern / Manage，Secure 為 cross-cutting） | Plan 階段 = 本課範圍 | 微軟 = **Plan 最完整** |
| **Google CAF** | 4 themes × 6 pillars（跨 3 成熟度） | Themes: Learn/Lead/Access/Scale；Pillars: People/Data/Technology/Process/Governance/Culture | **4 themes × 6 pillars** |
| **IBM AI Ladder** | 4（Collect → Organize → Analyze → Infuse） | 資料梯度 | **先有資料才有 AI** |
| **CRISP-DM** | 6（業務 → 資料理解 → 準備 → 建模 → 評估 → 部署） | DM / ML 最廣用 | **業·資·備·模·評·部** |

### 4.5 Waterfall 導入 vs Agile 導入（for AI）

| 維度 | Waterfall | Agile（for AI） |
|---|---|---|
| 需求 | 一次定死 | 滾動調整 |
| 產出 | 大版本，數月才一交付 | 2-4 週 sprint 持續交付 |
| AI 適用性 | ❌ 差（模型不確定性） | ✅ 好（可 pilot → 調 → 再 pilot） |
| 例外情境 | 嚴格法遵 / 主權 AI 極少見情境 | 多數商業 AI 專案 |

> 🔥 **考題常考**：「AI 專案適合 waterfall 還是 agile？」→ **多數 agile**（因為模型不確定性），但要補 pilot gate。

### 4.6 PoC vs MVP vs Pilot

| 維度 | PoC | MVP | Pilot |
|---|---|---|---|
| 目的 | 可行性證明 | 最小可交付驗證 | 小規模真實部署 |
| 受眾 | 內部技術團隊 | 早期客戶 | 真實使用者子集 |
| 規模 | 1-10 筆樣本 | 最少功能集 | 5-20% 正式流量 |
| 所在階段 | L21201 的 Go/No-Go 之前 | L21202 方案設計 | L21202 P4 |
| 典型問題 | 「**做得出來嗎？**」 | 「**有人要用嗎？**」 | 「**一路到底順不順？**」 |

---

## Section 5 · 口訣（Mnemonics）

### 5.1 資源分配五要素：「**錢·人·算·料·時**」🔥🔥
- **錢** Budget：五年 TCO、AI 專案預算初期 × 2
- **人** Headcount：PM / DS / MLE / DE / SME / QA
- **算** Compute：GPU 類型、雲地端、峰值/常態
- **料** Data：量、品質、標註、合規（清洗 2-8 週）
- **時** Timeline：至少 6 個月；含 pilot gate

### 5.2 5 階段導入路線圖：「**需·方·資·試·擴**」🔥
- **需**求分析（Requirements）
- **方**案設計（Solution Design）
- **資**源規劃（Resource Plan）
- **試**點（Pilot）
- **擴**展（Rollout / Scale）

### 5.3 需求分析五層對應：「**業·流·決·資·技**」🔥
- **業**務目標（Business Goal）
- **流**程（Process）
- **決**策（Decision）
- **資**料（Data）
- **技**術（Technique）

### 5.4 SMART 五字元
- **S**pecific 具體
- **M**easurable 可衡量
- **A**chievable 可達成
- **R**elevant 相關
- **T**ime-bound 有期限

### 5.5 RACI 四字元：「**負·當·諮·告**」🔥
- **負** Responsible 負責（執行）—— 可多個
- **當** Accountable 當責（簽核）—— **每列只能 1 個** 🔥
- **諮** Consulted 諮詢（雙向）
- **告** Informed 告知（單向）

### 5.6 3 + 2 + 1 KPI 組合
- **3** 營運 KPI（Operational：latency / 覆蓋率 / fallback）
- **2** 業務 KPI（Business：時間 / CSAT）
- **1** 風險 KPI（Risk：錯答率 / 投訴率）

### 5.7 預算 70/20/10 heuristic
- **70%** Infrastructure 基礎設施
- **20%** Model 模型開發
- **10%** Ops + Governance 運維治理

### 5.8 CRISP-DM 六階段：「**業·資·備·模·評·部**」
- 業務理解 → 資料理解 → 資料準備 → 建模 → 評估 → 部署

---

## Section 6 · 考試陷阱（Exam Traps）

### 陷阱 1：把 L21202 當成 L21201（評估 → 選工具）
- ❌ 看到題幹「要做 AI 導入規劃」就畫加權評分矩陣、算 ROI。
- ✅ 規劃階段的**輸入**是 L21201 選出的方案，**產出**是需求書 / 方案藍圖 / OKR / RACI / 路線圖。**不再重評分**。🔥🔥

### 陷阱 2：把 L21202 當成 L21203（風險識別）
- ❌ 在規劃書裡寫 EU AI Act 分級、NIST RMF 對映、ISO 42001 條文。
- ✅ L21202 只把風險當**規劃輸入**（例：保留 10% 預算給 governance），不教風險框架。**EU AI Act / NIST / ISO 42001 是 L21203 的事**。🔥🔥

### 陷阱 3：把 L21202 當成 L21302（技術方案設計 vs 部署架構）
- ❌ 在方案設計階段畫 k8s pod、Istio service mesh、Prometheus dashboard。
- ✅ L21202 只畫**邏輯架構**（誰呼叫誰、資料流、整合點）；k8s / CI/CD / 監控 / 漂移偵測**一律留給 L21302**。🔥🔥

### 陷阱 4：RACI 的 R 與 A 搞混
- ❌ 一列裡 R 和 A 都是同一個人就不標。
- ✅ R = **負責執行**（動手的人），A = **當責簽核**（出事要扛的人）。**每列的 A 有且只有一個**。可能同人同時擔任 R + A，但仍要標出。🔥🔥

### 陷阱 5：把 KPI 當成北極星指標
- ❌ 「我們有 10 個北極星指標。」
- ✅ **一個專案只能有一個北極星**。其他 5-15 個是 KPI。北極星 = **同時反映使用者價值與商業成功**的單一指標，要能被團隊每週辯論。🔥

### 陷阱 6：一個專案宣稱多個北極星指標
- ❌ 「北極星 1：accuracy；北極星 2：收入；北極星 3：滿意度。」
- ✅ **只能有一個**。三個北極星 = 沒有北極星。請從三個裡挑一個，其餘兩個降格為 KR 或 KPI。🔥

### 陷阱 7：把 PoC、MVP、Pilot 混用
- ❌ 「我們要做一個 PoC，先部署 20% 流量……」
- ✅ **PoC** 在 L21201 Go/No-Go 之前（可行性證明，1-10 筆樣本）；**MVP** 在方案設計階段（最小可交付給客戶）；**Pilot** 在 L21202 P4（真實流量 5-20%）。三者不能互換。🔥

### 陷阱 8：以為 AI 導入規劃等同 PMP
- ❌ 只寫 WBS / Gantt / Critical Path，套用傳統 PM 模板。
- ✅ AI 規劃**必須**包含：資料不確定性 buffer、模型不確定性 pilot gate、持續再訓練預算、人才稀缺 HR 計畫、feedback loop 監測。只有 PMP 模板**會失分**。🔥🔥

### 陷阱 9：目標在規劃初期就全部定死
- ❌ 「我們規劃時就把所有 KR 寫死，pilot 不可修改。」
- ✅ 模型不確定性意味著 pilot 結果可能翻盤。**Pilot gate 的 Go/No-Go 允許回到 P1/P2 修正目標**（但**不允許**事後降低成功門檻 post-hoc rationalization）。🔥

### 陷阱 10：資源分配只算預算（忽略算力/資料/時間）
- ❌ 「我們的資源配置表只有一個預算欄位。」
- ✅ **錢·人·算·料·時** 缺一不可。只寫預算 = 失分。特別是**資料準備**與**算力**在 AI 專案常被低估。🔥🔥

### 陷阱 11：70/20/10 倒過來算（把 70% 丟給模型）
- ❌ 「70% 預算用在模型訓練、20% 在基礎設施、10% 在其他。」
- ✅ 正解是 **70% 基礎設施 + 20% 模型 + 10% 運維治理**。基礎設施（資料管線、整合）是 AI 能不能上線的瓶頸，不是模型本身。🔥

### 陷阱 12：需求分析跳層（L1 直接跳 L5）
- ❌ 「我們要做 AI」→「我們用 ChatGPT」（跳過 process / decision / data）。
- ✅ **L1 → L2 → L3 → L4 → L5** 五層要逐層對應。跳層 = 需求書不完整，上線一定出問題。🔥

---

## Section 7 · 情境題快速判斷（Scenario Quick-Judge）

🔑 **看到關鍵字 → 答這個**

| 關鍵字 / 情境 | 答案 |
|---|---|
| 「業務流程對映 AI 技術」 | **需求分析（L1-L5 五層對應）** |
| 「跨部門角色協作、誰負責誰簽核」 | **RACI**（R 執行、A 簽核、C 諮詢、I 告知） |
| 「第一次小規模真實驗證」 | **Pilot**（在 L21202 P4 階段） |
| 「可行性驗證、技術風險高」 | **PoC**（在 L21201 Go/No-Go 之前） |
| 「最小可交付、對客戶驗證」 | **MVP**（在 L21202 方案設計階段） |
| 「選工具、評估 ROI、TCO 算術」 | **這是 L21201**，不是 L21202 |
| 「EU AI Act、風險分級、NIST RMF、ISO 42001」 | **這是 L21203**，不是 L21202 |
| 「MLOps、模型部署、監控、漂移」 | **這是 L21302**，不是 L21202 |
| 「每週可衡量的單一指標」 | **北極星指標 North Star Metric**（**只能有一個**）|
| 「3 營運 + 2 業務 + 1 風險」 | **3+2+1 KPI 組合** |
| 「具體、可衡量、可達成、相關、有期限」 | **SMART 原則** |
| 「O + KR」「目標 + 關鍵成果」 | **OKR** |
| 「看了儀表板但不知道下一步要做什麼」 | **Vanity metric 反模式** |
| 「要一次算錢、人、算力、資料、時間」 | **錢人算料時（五向量資源分配）** |
| 「70% 基礎設施 + 20% 模型 + 10% 運維」 | **70/20/10 AI 預算 heuristic** |
| 「有沒有一個框架談完 AI 導入」 | **Microsoft CAF for AI**（6 方法論：Strategy / Plan / Ready / Adopt / Govern / Manage + Secure cross-cutting）|
| 「4 themes × 6 pillars（Learn/Lead/Access/Scale × People/Data/Technology/Process/Governance/Culture）」 | **Google Cloud AI Adoption Framework** |
| 「Collect / Organize / Analyze / Infuse 四階」 | **IBM AI Ladder**（資料梯度）|
| 「五級成熟度，只有 6% 到最高級」 | **Gartner AI Maturity Model** |
| 「業務理解 → 資料理解 → 準備 → 建模 → 評估 → 部署」 | **CRISP-DM**（六階段） |
| 「不想走 Waterfall，要邊做邊調」 | **Agile**（for AI，加 pilot gate） |
| 「5 階段導入路線圖順序」 | 需求 → 方案 → 資源 → **試點** → 擴展（需·方·資·試·擴） |
| 「Pilot 結束要滿足什麼才能 rollout」 | 指標達成 + 可接受度 + 風險無紅線 + 經濟效益 + SOP 就緒 |
| 「規劃時 AI 人才招不到怎麼辦」 | 預留 3-6 個月 HR buffer；評估 Buy 而非 Build 減少 MLE 需求 |
| 「AI 專案資料清洗要多久」 | 通常 **2-8 週**（比傳統 IT 專案長） |
| 「AI 落地週期至少多久」 | **6 個月起跳**（含 pilot gate） |
| 「把 A 簽核權下放給 3 個人」 | ❌ 違反 RACI，每列只能 1 個 A |
| 「規劃書只寫 WBS + Gantt」 | ❌ 失分，要補資料 / 模型不確定性 + 再訓練 + feedback loop |

---

### 最後複習清單

考前闔上講義，用這份清單自測——答得出來才算讀懂 L21202：

- [ ] 可以說出**四大產出物**：需求書、方案設計書、資源配置表、Pilot 計畫
- [ ] 可以說出**五層需求分析**：business → process → decision → data → technique
- [ ] 可以說出**四面向方案設計**：功能、資料、模型、整合（不越界到 k8s / MLOps）
- [ ] 可以說出**三層目標架構**：North Star（一個）+ SMART + OKR（Objective + 3-5 KR）
- [ ] 可以說出**五向量資源分配**：錢、人、算、料、時（缺一不可）
- [ ] 可以說出 **Pilot Gate 五條件**（沿用 Section 5 既有內容）：成功指標達成、使用者可接受度、風險紅線無觸發、經濟效益確認、營運 SOP 就緒
- [ ] 可以說出 **RACI 每列只能 1 個 A**、A 扛最終成敗，不等於 DACI 的 A
- [ ] 可以說出 **70/20/10 是 Build 路線的預算 heuristic**，採 Managed API 比例會改變
- [ ] 可以區分 **L21201（選工具）/ L21202（規劃）/ L21203（風險）/ L21302（部署）** 的邊界

---

### 結尾小提醒

L21202 真正要你會的只有四件事：

1. **需求分析五層對應（業·流·決·資·技）**——不跳層
2. **技術應用方案設計四面向（功能/資料/模型/整合）**——不寫 k8s
3. **目標設置三層金字塔**：North Star（**一個**）→ OKR/SMART → 3+2+1 KPI
4. **資源分配錢人算料時 + 70/20/10 預算 heuristic + 5 階段 roadmap + RACI**

考試時的決策路徑：

```
看到題目 → Section 7 keyword 表 →（找不到再）Section 4 邊界對照表 →（再找不到）Section 3 內文
```

L21202 沒講的、不要寫進答案：
- 「加權評分矩陣 / TCO / ROI / Payback Period」→ 那是 **L21201 評估**
- 「EU AI Act 分級 / NIST RMF / ISO 42001 / 風險登記冊」→ 那是 **L21203 風險**
- 「k8s / Istio / CI/CD / 監控 / 模型漂移」→ 那是 **L21302 部署**

本課只到「**我們規劃好怎麼做、交給誰、花多少、什麼時候上**」為止。穩住這條線，分就拿得到。
