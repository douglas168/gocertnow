# Research Notes: L12101 No Code / Low Code的基本概念

## Official Sources

- **iPAS 官方樣題 (114年4月版)**: 官方考試樣題 PDF 包含 No Code/Low Code 相關題目，考法以「辨認平台類型」和「區分概念」為主。[iPAS 官方樣題下載](https://www.ipas.org.tw/DownloadFile.ashx?filename=9ed0b84a-d789-459b-92f8-be566d22b821_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E5%88%9D%E7%B4%9A%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A-%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B44%E6%9C%88%E7%89%88).pdf)
- **iPAS 官方學習資源頁**: [ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources)
- **CCChen L12101 學習筆記 (vocus)**: 完整整理核心定義、差異表、市場數據。[vocus.cc/article/67fcb85a](https://vocus.cc/article/67fcb85afd897800015c2973)

## Community Insights (exam patterns)

- **考題佔比**: 第二科（生成式AI應用與規劃）中 No Code/Low Code 約出 5 題（含應用情境題 3 題），佔該科約 10%。
- **題型趨勢**: 初期考「是什麼」定義題，後期梯次轉向情境題（scenario-based），例如「某補習班要用 AI 生成學生評語，應選什麼工具組合？」。
- **常見陷阱**: 考生報告需區分 No Code/Low Code 與 AutoML（自動化機器學習）——AutoML 是 ML pipeline 自動化，不屬於 NC/LC。
- **重複率低**: 每次考試約 90% 新題目，不能只靠背考古題。
- **區分重點**: 考題會要求辨認「哪個不是 No Code/Low Code 平台」，需熟記代表性平台。
- Source: [CCChen 05/03 考試心得](https://vocus.cc/article/6815f36afd8978000136ffeb), [CCChen 08/16 考試心得](https://vocus.cc/article/68a2c94afd897800015778df)

## Core Definitions (exam-critical)

### No Code（無程式碼）
- 完全不需要撰寫程式碼，透過拖放（drag-and-drop）與視覺化配置建構應用
- 目標用戶：非技術背景的業務人員
- 適合：簡單戰術型應用（表單、報表、日曆、流程自動化）
- 代表平台：**Bubble, Airtable, Zapier, AppSheet**

### Low Code（低程式碼）
- 視覺化開發為主，但可加入少量手動程式碼處理複雜邏輯
- 目標用戶：具備一定技術知識的開發者或公民開發者
- 適合：企業級應用、複雜整合需求
- 代表平台：**Power Platform (Power Apps), OutSystems, Mendix**

### 關鍵差異表（高機率考點）

| 面向 | No Code | Low Code |
|------|---------|----------|
| 編碼需求 | 零 | 少量（可選） |
| 目標用戶 | 非技術業務人員 | 開發者 / 技術業務 |
| 應用複雜度 | 簡單 | 中高複雜度 |
| 客製化程度 | 低（受限於平台模板） | 高（可寫 code 擴展） |
| 治理風險 | 影子 IT 風險較高 | 在 IT 監督下使用 |

### 公民開發者（Citizen Developer）
- Gartner 定義：在 IT 部門以外，使用組織核可的 NC/LC 工具建構應用的非專業開發人員
- Gartner 預測：公民開發者數量為專業工程師的 4 倍
- 2026 年預測：80% 的低代碼工具用戶來自正式 IT 部門以外

### 視覺化開發（Visual Development）
- NC/LC 的核心範式：以圖形介面（拖放元件、流程圖、表單設計器）取代傳統程式碼撰寫
- 自動產生底層程式碼（No Code 背後仍有隱藏代碼運行）

## Current State (market data — likely tested)

- **Gartner**: 2026 年低代碼市場達 $44.5B USD，CAGR 19%
- **Gartner**: 2026 年 75% 新應用開發將使用低代碼
- **Forrester**: LC/NC + DPA 市場 2028 年可達 $50B（AI 驅動加速）
- **Forrester**: 87% 企業開發者已在部分工作中使用低代碼平台
- **效率數據**: 開發時間可縮短至傳統方式的 10%（縮短 90%）
- **人才缺口**: 美國缺少 140 萬軟體開發者，NC/LC 是解方之一
- Sources: [Gartner forecast via Kissflow](https://kissflow.com/low-code/gartner-forecasts-on-low-code-development-market/), [Forrester market](https://www.forrester.com/blogs/the-low-code-market-could-approach-50-billion-by-2028/), [NC statistics 2026](https://kissflow.com/no-code/no-code-statistics-2026/)

## Platform Quick Reference (for identification questions)

| 平台 | 類型 | 核心用途 |
|------|------|---------|
| Bubble | No Code | 全功能 Web App 開發（MVP、SaaS） |
| Airtable | No Code | 試算表式關聯資料庫 + 內部工具 |
| Zapier | No Code | 跨應用流程自動化（workflow automation） |
| AppSheet (Google) | No Code | 從試算表轉換為行動/網頁 App |
| Power Apps (Microsoft) | Low Code | 企業應用，深度整合 M365/Azure/Dynamics |
| OutSystems | Low Code | 企業級應用，強調安全性、擴展性、治理 |
| Mendix (Siemens) | Low Code | 企業級應用開發與部署 |

## External Documents Found

- 官方樣題 PDF（114年4月版）: 可下載但 404 on redirect，需直接從 iPAS 官網取得
- 官方學習指引: 存在於 iPAS 網站，定期更新

## Key Findings Summary

1. **定義區分是必考**: No Code = 零代碼 + 非技術用戶；Low Code = 少量代碼 + 開發者/公民開發者。考題會考「辨認哪個是/不是 NC/LC 平台」。
2. **情境題比重上升**: 後期梯次考法從定義題轉向「給一個業務場景，選正確的工具組合」，需理解平台適用場景。
3. **AutoML 是高頻陷阱**: 考題會混入 AutoML 選項，需清楚 AutoML ≠ No Code/Low Code（AutoML 是 ML pipeline 自動化）。
4. **公民開發者 + 市場數據**: Gartner 的數據（75% 新應用、$44.5B 市場、公民開發者 4:1 比例）是常見考點。
5. **影子 IT 風險**: No Code 的治理風險（員工自建未經 IT 部門核可的應用）是 L12102 的重點，但 L12101 也可能觸及基本概念。

## Scope Notes

- **L12102（優勢與限制）** 的內容（vendor lock-in、安全隱憂、性能限制、影子 IT）已蒐集但歸屬下一課。本課 L12101 聚焦「是什麼」而非「好不好」。
- **避免越界**: 不涉及系統架構設計（L213）、ML 模型建構/調參（L232/L233）、統計方法（L221）。平台介紹保持概念層級，不深入技術實作。
- 部分平台（如 OutSystems）的企業級架構、部署策略屬中級範疇，初級只需知道「它是什麼類型、給誰用」。
