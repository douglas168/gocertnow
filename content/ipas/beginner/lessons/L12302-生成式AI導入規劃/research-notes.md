# Research Notes: L12302 生成式AI導入規劃

> Scope: planning stage AFTER adoption decision. Keywords: 目標設置 / 資源分配 / 導入策略 / 因應措施 / 測試。
> Cross-ref: L12301 already covered 經濟部《AI導入指引》evaluation sections, Build/Buy/SaaS, cost-benefit, AI導入指引總覽. Do NOT repeat here.

---

## Official Sources

- **iPAS AI應用規劃師 考試官方資源** (ipas.org.tw) — 115年度簡章確認 L123 群組子項：L12301 導入評估 / **L12302 導入規劃** / L12303 風險管理，同屬科目二「生成式AI應用與規劃」。初級每科 NT$400，2026 四次考試（3/21、5/16、8/15、11/7）。
- **114 年第四梯次初級 科目二【公告試題】** (ipas.org.tw PDF, 2025-12) — 本梯試題直接包含「導入規劃」題型，為最接近 2026 考試的官方題本。
- **114 年版 考試樣題(1月版)** (ipas.org.tw PDF) — 官方樣題範例，含 L123 群組選擇題題型示範。
- **經濟部產業發展署 新聞發布** (udn 2026-03) — 截至 2026-03，產業競爭力輔導團已輔導 **2,058 家企業導入 AI**（中小企業占 91%），可作為「台灣企業仍普遍處於 POC/Pilot 階段」的統計佐證。
- **經濟部《AI導入指引》** — 已於 L12301 覆蓋評估章節；本課只引用「導入後的規劃與測試」對應段落（公文檢索問答 POC 案例）作為本土化範例。
- **行政院《行政院及所屬機關（構）使用生成式AI參考指引》** (NSTC, 2023-10-03 函頒) — 公部門使用 GenAI 的因應措施標竿：保密分級、產出須人工覆核、標示 AI 生成內容。屬「因應措施」國家級範本。

## Community Insights (exam patterns)

來源：vocus.cc CCChen 四場實戰心得（0322 第一、0503 第二、0816 第三、2026-03-21 考前總整理）。

- **HITL 題必考**：多次出現「高風險決策（勞動權益、醫療、金融）嚴禁完全自動化，必須保留 Human-in-the-Loop 最終覆核與問責」類題型。
- **醫療/法律案例 = 測試題主力**：0503 場出現「醫療機構導入 GenAI 撰寫病歷摘要，在技術測試階段最應優先關注什麼？」答案指向「醫療準確性與臨床一致性，避免幻覺／錯誤資訊」— 即 **測試重點 = 領域正確性 + 幻覺偵測**，不是單純效能。
- **POC → Pilot → Production 階段題**：考生回報多題考「概念驗證階段主要目的為何」、「導入初期最常見失敗原因為何」。標準答案偏向「期待落差 / 資料基礎設施不完善 / 未先做小範圍驗證」。
- **陷阱題警告**：「PoC 成功=可直接全面上線」為錯誤選項；「導入 AI 只需 IT 部門負責」為錯誤選項（跨部門協作為正解）。
- **2025-04-30 iPAS 更新**：官方已新增「技術測試與驗證」主題於 L114、以及 L12301「導入評估」主題 — L12302 命題密度預期會同步提升。
- **常考名詞**：SMART 目標、KPI、PoC、Pilot、試點、灰度發布/並行運行（parallel run）、UAT、A/B 測試、紅隊測試（red team）、回溯機制（rollback）、降級（fallback）。

## Current State (2025-2026 GenAI planning best practices)

- **Gartner 2025 核心洞察**：GenAI 專案失敗主因**是 change management 而非技術**。45% 高成熟度組織能讓 AI 專案運行至少 3 年；多數採「set it, forget it」心態導致失敗 — 強化本課「測試 + 持續監控 + 因應措施」的必要性。
- **信任是成敗分水嶺**：Gartner 將「trust, empathy, purpose」列為 2025 AI 採用核心；台灣題目常以「為何需要人工覆核」間接測此概念。
- **SMART for AI**：業界主流仍使用 SMART 框架，但強調 **Measurable 必須可量化**（e.g. 「客服回覆時間下降 30%」而非「提升客戶滿意度」）。初級考試多以選擇題型問「下列哪個 AI 專案目標符合 SMART」。
- **POC → Pilot → Scale 三階段成為業界共識** (資策會、數位時代、恩梯科技、AIWorks 2025 多方來源一致)：
  1. **POC（概念驗證）**：小範圍、短時間、驗證技術可行性，不追求 UI/規模。
  2. **Pilot（試點）**：選 1–2 個單位實際導入，收集使用者回饋，驗證商業價值。
  3. **Scale（擴大/正式上線）**：跨部門推廣，建立 SOP、訓練、監控機制。
- **資料準備現狀（台灣）**：AIF 2025 調查指出僅 5–10% 企業具備可用資料 — 呼應「資源分配」中「資料」為最常被低估的資源維度。
- **HITL 已從「選項」變成「高風險場景的法遵要求」**：EU AI Act、NIST AI RMF、台灣行政院指引三方一致 — 高風險決策必須保留人工覆核。
- **因應措施四件套**（業界共識）：(1) HITL 人工覆核；(2) Fallback 降級到規則引擎或人工；(3) Rollback 版本回溯；(4) 幻覺偵測 + 內容標示。
- **測試類型對照**（概念層）：
  - **UAT**：由實際使用者在接近正式環境驗收，確認流程可用。
  - **A/B 測試**：兩版本並行比較，量化效果差異。
  - **Beta 測試**：小範圍真實用戶提前試用。
  - **紅隊測試**：模擬攻擊者，找 Prompt Injection / 偏誤 / 資安漏洞。
  - **並行運行（parallel run）**：新舊系統同時跑，比對結果再切換。

## External Documents Found

- **經濟部《AI導入指引》** — L12301 已涵蓋，本課只引其中「公文檢索問答 POC → 公務機關擴散」作為台灣 POC 案例。
- **行政院《使用生成式AI參考指引》(2023-10)** — 公部門「因應措施」範本，適合當「保密分級 + 人工覆核 + AI 標示」教材案例。
- **AIF《2025 台灣產業 AI 化大調查暨 AI 落地指引》** — 國內統計佐證（資料準備、產業 AI 化階段分布），可用於學生辨識「台灣企業大多仍在 POC/Pilot 階段」。
- **資策會 2025 十大 AI 關鍵技術趨勢** — 導入趨勢背景資料。
- **Gartner 2025 Hype Cycle for GenAI / Top Predictions 2026** — 國際趨勢引用，不深入細節。

## Key Findings Summary

1. **目標設置 = SMART + 可量化 KPI**。避免「提升滿意度」這類模糊目標；正確寫法：「3 個月內將客服首次回應時間從 5 分鐘降至 2 分鐘」。常考辨識題。
2. **資源分配四維度 = 人力 / 預算 / 資料 / 時間**。台灣現狀 95% 企業「資料」不足，是最常被低估的維度；「人力」不只 IT，需跨部門（業務/法遵/資安）。
3. **導入策略 = POC → Pilot → Scale 三階段**。PoC 失敗率高、Pilot 是商業價值驗證、Scale 才是全面上線。「PoC 成功即可全面推廣」為**錯誤選項**。
4. **因應措施四件套 = HITL + Fallback + Rollback + 幻覺偵測**。高風險場景（醫療/金融/勞權）**必須 HITL**，這是法遵不是選項。
5. **測試類型 = UAT / A/B / Beta / 紅隊 / 並行運行**。考題常給情境問「最適合的測試方法」— 需能區分「驗收 vs 比較效果 vs 找攻擊漏洞」。
6. **跨部門協作是必考觀念**：AI 導入不是 IT 單一部門的事，需業務提需求、法遵看風險、資安看資料、HR 做訓練。
7. **「持續監控」不是導入結束**：Gartner 指出多數失敗來自「set it, forget it」，導入後的 drift 監控與迭代同樣重要。

## Scope Notes

以下屬於 **中級** 範圍，**僅列出供邊界檢查使用，不寫入正式 study guide**：

- MLOps / CI-CD pipeline 細節（model versioning, feature store, canary deployment 實作層）
- PMBOK、Scrum ceremonies、Kotter 8-step change management 等正式方法論
- ROI 公式、TCO 計算、NPV/IRR 財務模型（初級僅到「需評估成本效益」概念）
- 偏誤偵測算法、fairness metric 公式（demographic parity、equalized odds 等）
- 多系統架構設計、API gateway、向量資料庫選型、model routing
- Guardrails 實作程式碼、Prompt Injection 防禦技術細節、LLM evaluation harness 程式
- Agentic AI 多代理協作架構、MCP 通訊協定（114 第四梯次已出現但屬中級題風格，初級僅需識別名詞）
- 具體雲端基礎設施設計（VPC、IAM、serverless 架構）
- 生成式 AI 模型 fine-tuning、RLHF、RAG 進階優化實作

**初級深度界線**：「非技術主管如何規劃一個 GenAI 試點」— 用檢查清單和概念說明，不觸及實作、公式、架構圖。
