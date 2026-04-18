# Research Notes: L21202 AI導入規劃

## Official Sources

- **iPAS 115年度簡章 (2026)** [PDF](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf): 中級科目一必考；L212 明列「需求分析、目標設置、資源分配、技術應用方案設計」四大關鍵字
- **iPAS AIAP 官方專區** [ipas.org.tw/AIAP](https://www.ipas.org.tw/AIAP): 中級要求「依需求選擇合適AI技術、技術可行性評估、設計應用架構、綜合考量資源分配/技術相容性/落地可行性」
- **Microsoft Cloud Adoption Framework (AI)** [learn.microsoft.com](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/scenarios/ai/): Strategy → Plan → Ready → Adopt → Govern → Secure → Manage 七階段；Plan 階段強調 digital estate 評估、skill gap 盤點、30-60-90 day roadmap
- **Google Cloud AI Adoption Framework** [services.google.com PDF](https://services.google.com/fh/files/misc/ai_adoption_framework_whitepaper.pdf): 三階段成熟度 (Tactical / Strategic / Transformational) × 四支柱 (People / Process / Technology / Data) × 六主題 (Lead, Learn, Access, Scale, Automate, Secure)
- **IBM AI Ladder** [medium/Hemanth Manda](https://medium.com/icp-for-data/the-ai-ladder-ibms-perspective-approach-d717028b856b): 四階 Collect → Organize → Analyze → Infuse；強調「資料梯度」是導入規劃前置條件
- **Gartner AI Maturity Model** [gartner.com](https://www.gartner.com/en/chief-information-officer/research/ai-maturity-model-toolkit): 五級 Awareness / Active / Operational / Systemic / Transformational；只有 6% 企業達 L5
- **Spaceo AI Implementation Roadmap 2026** [spaceo.ai](https://www.spaceo.ai/blog/ai-implementation-roadmap/): 6-phase，含 3+2+1 KPI rule (3 operational + 2 business + 1 risk metric)

## Community Insights (exam patterns)

- **CCChen vocus 重點整理** [vocus.cc/68b6df18](https://vocus.cc/article/68b6df18fd897800014a55cd): L212 考題涵蓋「效能評估、成本效益、需求分析、目標設定、資源分配、風險識別、合規、AI倫理」— 風險議題常作為陷阱題交叉考
- **CCChen 學習指引彙整** [vocus.cc/68ecd196](https://vocus.cc/article/68ecd196fd89780001f5c8f1): L21202 常考 ROI/NPV/回收期、數據漂移、團隊構成與技能需求、運算資源與基礎設施規劃
- **中級情境題傾向** [vocus.cc/69c52e61](https://vocus.cc/article/69c52e61fd89780001acc214): 中級出現「給企業營運數據，要求規劃AI導入階段與資源配置」的情境模擬題；15% 題目涉及法規
- **11/08 第二場 & 05/17 第一場心得**: 近期題幹偏長 (「不按牌理出牌」)、貼近實戰；導入規劃與 MLOps / 部署概念會混搭出題 (約 3 題 MLOps)
- **常見陷阱**: (a) 混淆評估 (L21201) vs 規劃 (L21202) vs 風險 (L21203) 三者邊界；(b) 把「資源分配」窄化為預算，忽略算力/資料/時間；(c) 以為導入=技術選型，忽略利害關係人與 change management

## Current State

- Microsoft CAF 2026 新增 **Governance-First AI agents** 強調導入規劃必須內建 governance gate
- Google AI Adoption Framework 仍為 2020 whitepaper，但六主題架構仍是官方主軸
- Gartner 2026 新增 **AI Roadmap Toolkit** (付費) — 五級成熟度不變
- CRISP-DM 仍是最廣用 AI/ML 導入方法論 (六階段)，Andrew Ng《AI Transformation Playbook》常被引用
- Taiwan MODA 數發部 2026 強調「算力、資料、人才、應用、信任」五策略 [iThome 167608](https://www.ithome.com.tw/news/167608)

## External Documents Found

- **Microsoft AI Adoption Framework**: 找到，可公開引用 Plan phase 重點
- **Google Cloud AI Adoption Framework whitepaper**: 找到 PDF 連結，可引用四支柱與六主題
- **IBM AI Ladder**: 找到完整四階說明，可引用
- **Gartner 五級成熟度**: 找到公開摘要，可引用
- **MODA 公部門 AI 參考手冊**: 未於此輪搜尋到直接連結 — 非必要，其他來源已足夠覆蓋考點
- **IPAS 官方樣題集 L21202 實題**: CCChen 的 vocus 文章僅提及主題，未公開完整題目與解答 (付費筆記)

## Key Findings Summary

1. **四大關鍵字即考試骨幹**: 需求分析 → 目標設置 → 技術應用方案設計 → 資源分配，四者是線性且可逆的規劃循環；建議教學以此四象限為核心，每一項對應一個決策產出物 (problem statement, OKR/SMART, solution blueprint, resource plan)
2. **AI 專屬 vs 一般 PM 差異點 (高頻考點)**: 資料可得性評估、模型不確定性 (需 PoC/MVP gate)、人才稀缺 (data scientist / ML engineer)、持續性訓練成本 (不是一次性 CAPEX)、feedback loop — 這些是中級 AI 規劃有別於 PMP 的核心差異
3. **資源分配四面向 (記憶口訣「錢人算料時」)**: 預算 (含五年 TCO，初期 × 2 為基準)、人力 (含跨職能 RACI)、算力 (GPU/雲端 build-vs-buy)、資料 (清洗 2-8 週)、時間 (至少 6 個月落地週期)
4. **目標設置三層金字塔**: North Star Metric (長期願景) → OKR / SMART (季/年度可衡量目標) → 3+2+1 KPI (3 operational + 2 business + 1 risk) — 近年考題偏愛要求區分三者
5. **邊界警示**: 中級 L21202 考題常與 L21201 (評估)、L21203 (風險)、L213 (部署) 混搭；答題關鍵是認清「規劃階段」的產出是『計畫書 / 專案章程 / 資源配置表』，不是評分矩陣 (L21201) 也不是風險登錄冊 (L21203)

## Scope Notes

- **與 L21201 重疊風險**: ROI / NPV / 回收期、build-vs-buy、工具選型矩陣屬 L21201 — L21202 只應「以已評估結果作為輸入」帶過，不再教算法
- **與 L21203 重疊風險**: EU AI Act / NIST AI RMF / ISO 42001 / AI 倫理框架屬 L21203 — L21202 僅能提「將風險作為規劃輸入、在資源分配中保留 governance budget」，不做分類框架教學
- **與 L21302 重疊風險**: MLOps pipeline、CI/CD、監控、容器化部署屬 L21302 — L21202 僅能提「deployment phase 是 5-phase roadmap 的一環」，不教雲端/容器細節
- **與 初級 L12302 重疊風險**: 初級 L12302 聚焦 GenAI 單一工具導入；L21202 必須涵蓋 discriminative + generative + 傳統 ML 全類型 AI，且從組織層級規劃切入
- **避免淪為 PMP 翻版**: WBS / Gantt / Critical Path 是 PM 基礎，中級若只教這些會失分 — 必須強化 AI 特有的資料準備、模型不確定性、pilot gate、持續訓練成本等議題
- **Mermaid 圖建議主題**: (a) 四階段規劃循環, (b) 資源分配五向量, (c) North Star→OKR→KPI 金字塔, (d) 5-phase adoption roadmap 泳道圖, (e) RACI × ML 生命週期矩陣
