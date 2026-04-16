# Research Notes: L12102 No Code / Low Code的優勢與限制

## Official Sources

### iPAS 官方考試資源
- [iPAS 114年版考試樣題](https://www.ipas.org.tw/DownloadFile.ashx?filename=9ed0b84a-d789-459b-92f8-be566d22b821_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E5%88%9D%E7%B4%9A%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A-%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B44%E6%9C%88%E7%89%88).pdf): 官方樣題中含 NC/LC 相關題目
- [114年第四次初級公告試題（科目二）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/): 含 Low Code 平台「模型（Model）」概念題 — 模型用來抽象描述資料結構、業務流程與介面邏輯
- [iPAS 學習資源頁](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方列出 L121 涵蓋「No code / Low code 概念」

### Gartner 市場預測
- [Gartner 2026 Low-Code Forecast (via Kissflow)](https://kissflow.com/low-code/gartner-forecasts-on-low-code-development-market/): 全球低代碼市場 2026 年達 **$44.5B**，CAGR 19%
- [Gartner: 75% of new apps via LCNC by 2026](https://www.thenoah.ai/resources/blogs/why-zero-code-ai-hits-75-of-new-enterprise-apps-by-2026-gartner-forecast): 2026 年 75% 新應用程式將透過 LCNC 建置
- [Gartner: 80% of LC users will be non-IT by 2026](https://virtualassistantva.com/news/low-code-no-code-platforms-80-percent-non-it-users-2026-business-automation): 正式 IT 部門以外的開發者將佔 80%

### 平台廠商文件
- [SAP — 低程式碼/無程式碼：開發的未來](https://www.sap.com/taiwan/products/technology-platform/build/what-is-low-code-no-code.html): 繁中定義與優勢說明
- [IBM — Low-Code vs. No-Code: What's the Difference?](https://www.ibm.com/think/topics/low-code-vs-no-code): 權威定義對比

## Community Insights (exam patterns)

### 已確認出現的考題型態
- **工具應用限制題**: 「No Code工具如Zapier的應用限制為？」正答：複雜邏輯有限制（非不支援API）— 來源：[CCChen 重點整理(三)](https://vocus.cc/article/67fd08b9fd8978000171f756)
- **場景推薦題**: 「若需快速開發聊天機器人，推薦使用？」正答：Low Code 工具（適合輕量開發、快速原型）— 同上
- **Low Code 模型概念**: 114年第四次考題出現「模型（Model）」定義 — 抽象描述資料結構、業務流程與介面邏輯
- **情境整合題**: 設計團隊需結合 NC/LC 平台與生成式 AI 達成快速介面生成 + 行銷內容自動產出

### 考生回報重點
- [CCChen 2026/03/21 考前總整理](https://vocus.cc/article/69bba7b6fd89780001b3df00): NC/LC 在科目二佔比不高但穩定出題，常與 AI 應用場景結合
- [CCChen 考試心得](https://vocus.cc/article/6815f36afd8978000136ffeb): 90% 為新題，考古題重複率低；需理解概念而非死記
- 考試偏重「判斷力」— 選擇正確工具搭配場景，而非平台操作細節

### 高頻考點關鍵字
1. **No Code vs Low Code 定義差異** — 無碼 vs 少量程式碼
2. **工具選擇原則** — 依使用者技術背景與場域需求
3. **API 串接能力與限制** — Zapier 等工具的邊界
4. **公民開發者 (Citizen Developer)** — 非 IT 人員自建應用
5. **AI 民主化** — LCNC 降低 AI 使用與開發門檻

## Current State

### 全球市場趨勢
- 2026 年全球 LCNC 市場預估 **$44.5B**（Gartner），2029 年達 $58.2B
- 2026 年 **75%** 新應用透過 LCNC 建置（Gartner）
- 2026 年 LCNC 使用者中 **80%** 來自非 IT 部門（Gartner）
- 採用最快產業：金融保險、醫療、零售電商、教育、製造業 — [Integrate.io 統計](https://www.integrate.io/blog/no-code-transformations-usage-trends/)
- 開發速度：Forrester 研究顯示比傳統開發快 **20 倍**；95% 領導者認為更快

### 台灣企業現況
- [數位時代](https://www.bnext.com.tw/article/65335/many-companies-need-low-code-no-code): **43% 企業領導者**認為數位轉型最大障礙是技術人才不足 → 推動 LCNC 採用
- [數位時代 — 無程式碼時代](https://www.bnext.com.tw/article/65287/no-code-generation-is-coming): 工程師不足 + 數位轉型需求加劇，企業尋求 NC 快解方
- [TechOrange](https://buzzorange.com/techorange/2021/11/29/nocode-lowcode): 台灣製造業（蘋概股）用 LCNC + 大數據讓產線人員匯入機台數據、監控良率
- [簡立峰專欄](https://www.bnext.com.tw/article/64982/low-code-and-no-code): Low-Code 時代來臨，寫程式是否仍是人才標配？（AI 民主化角度）

### 主要風險（考試常考）
- **Vendor Lock-in（供應商鎖定）**: 無法匯出原始碼，遷移等於重寫 — [AppBuilder.dev](https://www.appbuilder.dev/blog/vendor-lock-in), [OutSystems](https://www.outsystems.com/blog/posts/vendor-lock-in/)
- **Shadow IT（影子 IT）**: 非 IT 部門自建系統缺乏監管 → 安全與合規風險 — [SC Media](https://www.scworld.com/perspective/four-risks-of-low-code-no-code-in-cloud-security-and-how-to-manage-them)
- **擴展性瓶頸**: 複雜邏輯、高併發場景力不從心 — [Apptension](https://www.apptension.com/blog-posts/no-code-and-low-code-limitations)
- **技術債**: MVP 快速上線後若無重構，債務累積 — [Stepsize](https://www.stepsize.com/blog/can-low-code-really-solve-the-problem-of-technical-debt)

## Key Findings Summary

1. **考試出題模式**: NC/LC 在科目二穩定出 2-3 題，偏重「場景判斷」（選哪個工具）和「限制認知」（什麼做不到），而非平台操作。需掌握 No Code vs Low Code 的定義差異。
2. **核心優勢三角**: 開發速度（快 20 倍）、成本節省（減少專業開發者依賴）、公民開發者賦能（80% 使用者非 IT）。這三點是考題最常涉及的優勢面向。
3. **核心限制四大風險**: Vendor Lock-in、Shadow IT、擴展性瓶頸、技術債。考題常以情境題呈現（例：某企業大量使用 NC 工具後遇到的問題最可能是？）。
4. **AI 民主化連結**: LCNC 是 AI 民主化的關鍵推手 — 讓非技術人員也能建置 AI 應用（如 Google AutoML、Azure ML Studio）。此概念與 L121 其他子題有交叉，考試可能合併出題。
5. **台灣在地脈絡**: 43% 企業領導者指出人才不足是轉型障礙 → LCNC 作為解方；製造業已有實際案例。考題可能以台灣產業情境出現。

## Scope Notes

- 本課題為初級專屬（L121），無中級對應，內容應維持概念層次。
- 避免深入特定平台架構（如 OutSystems 內部運作原理）— 考試只測「知道有這些工具、知道優缺點、能判斷場景」。
- Low Code 平台中的「模型（Model）」概念已在正式考題出現，需涵蓋但不必深入 MVC 架構。
- LCNC + 生成式 AI 整合是新趨勢考點（114年第四次已出現），課程應包含此交叉主題。
- Shadow IT 和 Vendor Lock-in 是限制面最重要的兩個概念，比技術債更常被考。
