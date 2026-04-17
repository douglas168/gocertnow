# Research Notes: L12303 生成式AI風險管理

> Scope: planner-level GenAI-specific risk — ethical risk, 資料安全隱私, 合規性 (references only), 風險影響 (likelihood × impact).
> Cross-ref: L11102 已覆蓋 AI治理/風險分級法規；L11203 已覆蓋個資法通則；L12301 已覆蓋《AI導入指引》風險章節。本課**只引用、不重寫**。
> Boundary: 初級只問「計畫/評估/緩解什麼」，不問「技術上如何修補 prompt injection」（屬中級 L21203）。

---

## Official Sources

- **iPAS AI應用規劃師 115 簡章** (ipas.org.tw, 2026-01) — 確認 L123 群組子項 L12301/L12302/**L12303**，同屬科目二「生成式AI應用與規劃」，初級每科 NT$400，2026 四梯次（3/21、5/16、8/15、11/7）。
- **114 年第四梯次初級 科目二【公告試題】** (ipas.org.tw PDF, 2025-12) — 最接近 2026 考試的官方題本；含倫理風險、個資、HITL 類題型。
- **114 年版 考試樣題(1月版)** (ipas.org.tw) — 官方樣題：「在生成式AI的風險管理中，下列哪一項屬於倫理風險？」答案：AI生成內容可能帶有偏見或歧視。
- **經濟部《AI導入指引》風險章節** — 已於 L12301 覆蓋，本課只引「風險分類、緩解措施對照表」作為 planner 語境。
- **行政院《行政院及所屬機關（構）使用生成式AI參考指引》** (NSTC, 2023-10-03) — 公部門使用 GenAI 的**風險緩解範本**：保密分級、不得輸入未公開資訊、人工覆核、標示 AI 生成內容。考試常當「下列何者為政府機關使用 GenAI 的正確做法」題幹。
- **經濟部智慧財產局 2023-06 經授智字第11252800520號函** — 單純下指令、AI自主運算產出之內容**不受著作權法保護**；訓練階段輸入他人著作涉及「重製」，除合理使用外須取得授權。planner 必背。

## Community Insights (exam patterns)

來源：vocus.cc CCChen 四場實戰心得（0322 第一、0503 第二、0816 第三、2026-03-21 考前總整理）、TAIA 團報分析、iPAS 學習指引。

- **倫理風險定義題必考**：樣題已出「偏見／歧視 = 倫理風險」；考生回報亦有「幻覺 = 內容準確性風險」、「深偽 = 社會信任 + 法律風險」型對應題。
- **HITL 在 L12303 也要考**：0503 場「醫療機構使用 GenAI 產出病歷摘要」題的「為何必須保留人工覆核」屬本課範圍（HITL 作為倫理+風險控管手段）。
- **資料外洩情境題高頻**：三星案例被多位考生提及為「員工將原始碼貼入 ChatGPT 導致外洩」典型案例；正解指向「禁止輸入機密/個資」「去識別化」「企業版/私有部署」。
- **Prompt Injection 定義題（planner 層）**：以自然語言植入惡意指令繞過系統提示；防禦責任屬於「評估+制定使用規範」而非「寫程式過濾」— 初級只要會辨識名詞與屬於哪類風險（資安）。
- **AI 詐騙/深偽辨識題**：台灣案例（假縣長代言農產品、假 TSMC 高層、假醫師頻道、大選 deepfake）— 考生回報選項常混「著作權風險」「倫理風險」「資安風險」讓考生分類。
- **合規三法辨識題**：人工智慧基本法（風險分類 + 七原則）、個資法（蒐集/處理/利用 + 當事人同意）、著作權法（人類精神創作 + 訓練資料合理使用）— 三者常被放同一題測辨識。
- **陷阱題警告**：
  - 「AI 生成的圖直接享有著作權」= **錯**（需人類精神創作投入）。
  - 「去識別化後的資料完全沒有個資風險」= **錯**（仍可能被重新識別）。
  - 「Prompt Injection 只是使用者輸入錯誤」= **錯**（屬資安攻擊）。
  - 「企業使用 ChatGPT 免費版沒有資料外洩風險」= **錯**。
- **常考名詞**：幻覺 Hallucination、偏見 Bias、深偽 Deepfake、Prompt Injection、Jailbreaking、資料外洩 Data Leakage、PII、去識別化 De-identification、HITL、Guardrails、Red Team、風險矩陣、likelihood × impact。

## Current State (2025–2026 regulatory and industry updates)

- **人工智慧基本法 (台灣)** — **2025-12-24 立法院三讀通過**（moda、TNL、今周刊、法源），為台灣首部 AI 專法。重點條文（planner 需辨識層級）：
  - 中央主管機關：**國科會**；**數位發展部** 負責訂定**風險分類框架**與評估驗證工具（第16條）。
  - 七大原則：永續發展與福祉、人類自主、隱私保護與資料治理、資安與安全、透明與可解釋、公平與不歧視、問責。
  - L11102 已教治理概念；本課**只要求知道風險分類框架由 moda 訂定**，並對應「規劃時要先辨識高風險應用」。
- **經濟部智慧財產局 AI 生成內容解釋**（持續適用）：
  - 純 AI 產出、人類僅下指令 → **不受著作權法保護**。
  - AI 重現訓練資料 → **原著作人保有著作權**。
  - 訓練階段輸入他人著作 = **重製**，須授權或合理使用（§44–§65）。
- **OWASP Top 10 for LLM Applications 2025** (genai.owasp.org, 發佈 2024-11-18) — planner 只需認識 Top 3 名詞：
  1. **LLM01 Prompt Injection**（直接/間接；最常見 LLM 弱點）
  2. **LLM02 Sensitive Information Disclosure**（2024 第6 → 2025 第2，反映真實資料外洩事件激增）
  3. **LLM09 Misinformation**（含幻覺產出的錯假訊息）
  - 其他（LLM03 Supply Chain、LLM04 Data/Model Poisoning、LLM05 Improper Output Handling、LLM06 Excessive Agency、LLM07 System Prompt Leakage、LLM08 Vector/Embedding Weaknesses、LLM10 Unbounded Consumption）初級**只需聽過，不考細節**。
- **NIST AI RMF Generative AI Profile (NIST AI 600-1)** (NIST, 2024-07-26) — AI RMF 1.0 的 GenAI 擴充，列出 **12 項 GenAI 獨有或被放大的風險**，四大核心面向：**Governance / Content Provenance / Pre-deployment Testing / Incident Disclosure**。planner 層級**只認名詞**，12 項細目不考。
- **個資法 + GenAI 交集**（L11203 已教個資法通則；本課只補 GenAI 特有風險）：
  - 使用者將姓名、電話、身分證、病歷、客戶資料輸入 prompt → 可能違反第 27 條（安全維護義務）、第 20 條（特定目的外利用）。
  - **行政院 GenAI 參考指引（2023-10）核心規定**：公務人員不得輸入未公開資訊、不得分享個資、產出須人工覆核、明確標示 AI 生成。
- **風險矩陣（likelihood × impact 4 象限）** — AI 專案通用風險管理工具，但 AI 另有新風險（資料飄移、偏見、可解釋性不足）標準矩陣可能不足（EY、PwC、Microsoft Learn AI 風險評估）：
  - 高發生×高影響 → 最優先緩解
  - 高發生×低影響 → 標準作業程序+快速應對
  - 低發生×高影響 → 密切監控+應變計畫
  - 低發生×低影響 → 僅觀察
- **緩解措施四件套**（業界共識，planner 應能對應到風險類型）：**Guardrails（輸入/輸出過濾）+ HITL（人工覆核）+ Red Team（事前紅隊測試）+ 透明揭露（AI 標示、內容來源 provenance）**。

## Real-World Incidents (one line each, 2024–2026)

- **三星 ChatGPT 原始碼外洩 (2023-03)** — 半導體部門員工將程式碼、會議錄音輸入 ChatGPT 致機敏資料外流，4 月全面禁用 GenAI — 企業資料外洩教科書案。
- **NYT v. OpenAI 著作權訴訟 (2023-12 起訴；2025-04 法院駁回部分動議、主要著作權主張得以續行)** — 訓練資料使用他人著作物的合理使用邊界仍未定，planner 必知 IP 風險。
- **台灣 TSMC 張忠謀/魏哲家 深偽假冒 (2024)** — 詐騙集團以 deepfake 冒名推廣假投資，企業高層**身份盜用 = 倫理+詐騙風險**。
- **台灣假縣長代言農產品 deepfake (2024)** — 兩位縣長被 AI 換臉代言，社會信任+公共治理風險。
- **2024 台灣大選 deepfake 影片** — 候選人被偽造接受採訪讚揚對手，選舉操縱+錯假訊息風險。
- **財政部 100 億免息貸款假訊息 (2024-10 TikTok)** — AI 語音+深偽主播嘴型偽造新聞，AI 詐騙 + 假新聞結合型。
- **AI 假醫師 20 萬粉絲頻道 (2024–2025)** — 全台 GenAI 詐騙月損 60 億元（刑事局/趨勢科技統計），深偽黑產鏈成形。
- **跨國 CFO 深偽視訊詐騙 (2024-02, 香港)** — 假冒 CFO 視訊會議騙走 2,500 萬美元，趨勢科技 2024 年報告列為標竿案例。

## Boundary & Overlap Map

| 主題 | L12303 (本課) | 歸屬其他課 |
|---|---|---|
| 幻覺 / 偏見 / 深偽 | **正題**：GenAI 特有倫理風險辨識 | — |
| Prompt Injection / Jailbreaking | **正題**：planner 層辨識名詞+屬資安類 | 技術防禦細節 → 中級 L21203 |
| Data Leakage via prompts | **正題**：GenAI 特有情境（三星案） | 個資法通則 → L11203 |
| 著作權 (AI 產出 + 訓練資料) | **正題**：planner 需知智財局函釋 | 著作權法全面介紹 → L11203/L11102 |
| 風險矩陣 likelihood × impact | **正題**：四象限 planner 應用 | 通用風險管理深 → 中級 L21203 |
| Guardrails / HITL / Red Team | **名詞+planner 角色**：知道要規劃什麼 | 技術實作 → 中級 L21203 |
| 人工智慧基本法 七原則/風險分級 | **引用、一句帶過**：規劃時要辨識高風險應用 | 法規深論 → **L11102** |
| 個資法條文 (§5/§6/§20/§27) | **引用、不重寫** | 條文逐條 → **L11203** |
| 《AI導入指引》風險章節 | **引用、不重寫** | 評估流程 → **L12301** |
| EU AI Act 四級風險 | **名詞引用** | 原生歸屬 → L11102 |

## Key Findings Summary

1. **GenAI 倫理風險五類 = 幻覺 + 偏見 + 錯假訊息（含深偽）+ 智財/著作權 + 濫用**。樣題已直接考「偏見 = 倫理風險」。
2. **資料安全隱私三情境 = Prompt 輸入機密/個資 + 訓練資料外洩 + Prompt Injection 攻擊**。三星案是最常被引用的教學範例；planner 角色是「制定使用規範」而非「技術修補」。
3. **合規性三法 planner 一句話**：人工智慧基本法（**2025-12-24 三讀通過**，moda 訂風險分級）+ 個資法（輸入 prompt 前先去識別化、不輸入個資）+ 著作權法（純 AI 產出不受保護、訓練資料需合理使用/授權）。
4. **風險矩陣 = likelihood × impact 四象限**；高發生×高影響必須優先緩解；但 AI 另有資料飄移、可解釋性不足等新維度需補強。
5. **緩解措施四件套 = Guardrails + HITL + Red Team + 透明揭露**。planner 職責是「為高風險應用規劃這四層防線」，不是實作細節。

## Scope Notes (超出初級 planner 邊界，僅作學生提醒)

- OWASP LLM Top 10 細節（LLM03–LLM10）、NIST AI 600-1 的 12 項 GenAI 風險全清單、具體 prompt injection attack payload、Red Team 測試方法論 → **屬中級 L21203 practitioner 層**，本課只介紹名詞，不列入題庫。
- 著作權法 §44–§65 合理使用條文逐條、個資法施行細則條文 → L11203 已教，不重複。
- 歐盟 AI Act 四級風險分類細節、各國監理比較 → L11102 已教，本課引用不深入。
- 風險矩陣定量化計算（VaR、ALE）→ 超出初級範圍。

## Sources

- [iPAS 115 年度簡章](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf) (accessed 2026-04-17)
- [114 年第四梯次 科目二 公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E7%94%9F%E6%88%90%E5%BC%8FAI%E6%87%89%E7%94%A8%E8%88%87%E8%A6%8F%E5%8A%83(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000507.pdf) (accessed 2026-04-17)
- [iPAS 114 年版 考試樣題](https://www.ipas.org.tw/DownloadFile.ashx?filename=e8d50f7f-17ce-4057-ad60-f42db15b20cd_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf) (accessed 2026-04-17)
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) (accessed 2026-04-17)
- [NIST AI 600-1 GenAI Profile (2024-07-26)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) (accessed 2026-04-17)
- [人工智慧基本法 三讀通過 (moda 2025-12-24)](https://moda.gov.tw/press/press-releases/18316) (accessed 2026-04-17)
- [人工智慧基本法 重點條文 (TNL 2025-12)](https://www.thenewslens.com/article/262871) (accessed 2026-04-17)
- [經濟部智慧財產局 AI 著作權函釋 (leetsai.com)](https://www.leetsai.com/%E8%87%BA%E7%81%A3%E6%99%BA%E6%85%A7%E8%B2%A1%E7%94%A2%E5%B1%80%E9%A0%92%E5%B8%83%E5%87%BD%E9%87%8B%E8%AA%AA%E6%98%8E%E7%94%9F%E6%88%90%E5%BC%8Fai%E4%B9%8B%E8%91%97%E4%BD%9C%E6%AC%8A%E7%88%AD%E8%AD%B0?lang=zh-TW) (accessed 2026-04-17)
- [行政院使用生成式AI參考指引 (2023-10)](https://www.sme.gov.tw/article-tw-2391-11626) (accessed 2026-04-17)
- [三星 ChatGPT 資料外洩 (TechCrunch 2023-05)](https://techcrunch.com/2023/05/02/samsung-bans-generative-ai-tools-like-chatgpt-after-april-internal-data-leak/) (accessed 2026-04-17)
- [NYT v OpenAI 案 (NPR 2025-03)](https://www.npr.org/2025/03/26/nx-s1-5288157/new-york-times-openai-copyright-case-goes-forward) (accessed 2026-04-17)
- [台灣 deepfake 詐騙案例 (Trend Micro 部落格)](https://blog.trendmicro.com.tw/?p=90497) (accessed 2026-04-17)
- [CFO deepfake 2500 萬美元詐騙 (Trend Micro 2024-02)](https://www.trendmicro.com/zh_tw/research/24/b/deepfake-video-calls.html) (accessed 2026-04-17)
- [生成式AI 個資風險 (法律百科)](https://www.legis-pedia.com/article/government-fundamental-rights/1341) (accessed 2026-04-17)
- [CCChen 0503/0816 iPAS 考試心得 (vocus)](https://vocus.cc/article/6815f36afd8978000136ffeb) (accessed 2026-04-17)
- [CCChen 2026-03-21 考前總整理 (vocus)](https://vocus.cc/article/69bba7b6fd89780001b3df00) (accessed 2026-04-17)
- [Microsoft Learn AI 風險評估](https://learn.microsoft.com/zh-tw/security/ai-red-team/ai-risk-assessment) (accessed 2026-04-17)
- [PwC 實現負責任 AI 洞見](https://www.pwc.tw/zh/publications/global-insights/responsible-ai-insights.html) (accessed 2026-04-17)
