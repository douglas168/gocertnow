# Research Notes: L11102 AI治理概念

> Research date: 2026-04-08
> Certification: IPAS AI應用規劃師能力鑑定 (初級)
> Boundary: Governance **awareness and risk recognition** only. No bias detection algorithms, fairness metric formulas, or compliance implementation procedures.

---

## Official Sources

### 1. 台灣《人工智慧基本法》

- **Status:** 立法院三讀通過於 2025年12月23日 (民國114年)，2026年1月14日生效
- **全文共 20 條**
- **中央主管機關：** 國家科學及技術委員會（國科會）；地方主管機關為直轄市、各縣市政府
- **AI 定義：** 指具自主運行能力之系統，該系統透過輸入或感測，經由機器學習及演算法，可為明確或隱含之目標實現預測、內容、建議或決策等影響實體或虛擬環境之產出
- **七大治理原則（口訣：永人隱資透公問）：**
  1. 永續發展與福祉
  2. 人類自主（Human-in-the-Loop, HITL）
  3. 隱私保護與資料治理
  4. 資安與安全
  5. 透明與可解釋
  6. 公平與不歧視
  7. 問責
- **國家人工智慧戰略特別委員會：** 行政院長擔任召集人，國科會負責幕僚作業，每年至少召開一次會議
- **風險管理：** 高風險應用須明確標示警語及權責歸屬；數位發展部負責建立與國際接軌之風險分類框架
- **勞工保護：** 政府應運用 AI 保障勞工權益，處理技能落差，協助因自動化而失業者再就業
- **Sources:**
  - [立法院三讀通過《人工智慧基本法》— 數位發展部](https://moda.gov.tw/press/press-releases/18316)
  - [《人工智慧基本法》三讀通過：重點條文一次看 — 關鍵評論網](https://www.thenewslens.com/article/262871)
  - [立院三讀通過 國科會任主管機關 — 資安人科技網](https://www.informationsecurity.com.tw/article/article_detail.aspx?aid=12583)
  - [立院三讀人工智慧基本法 — 中央社](https://www.cna.com.tw/news/aipl/202512230036.aspx)
  - [台灣AI治理新紀元 — 台灣人工智慧學校](https://aiacademy.tw/news-ai-fundamental-act-futurecity/)

### 2. 數位發展部《公部門人工智慧應用參考手冊》

- **發布日期：** 2025年12月17日（正式版）；此前有草案版本自 2025年1月1日 至 12月31日 進行一年期試行
- **最後更新：** 2026年2月3日
- **發布單位：** 數位發展部 數位政府司
- **目的：** 協助各機關善用人工智慧技術解決業務痛點
- **編制方式：** 參酌國際間陸續頒布之 AI 相關指引、指南文件
- **四大評估面向（考試常考情境題）：** 技術面、法律面、組織面、效益面
- **重要提醒：** 實際手冊內容為 PDF 下載，網頁僅提供概述。建議下載完整手冊以取得章節細節。
- **Sources:**
  - [公部門人工智慧應用參考手冊（正式版）— 數位發展部](https://moda.gov.tw/digital-affairs/digital-service/ai-resource/18248)
  - [公部門人工智慧應用參考手冊（草案）— 數位發展部](https://moda.gov.tw/digital-affairs/digital-service/guide/15002)

### 3. 數位發展部《AI產品與系統評測》

- **法規依據：** AI產品與系統評測中心設置要點（數位發展部主管法規共用系統）
- **評測架構：** 參考 ISO/IEC TR-24028 標準
- **語言模型 10 項評測指標：** 安全性、可解釋性、彈性、公平性、準確性、透明性、當責性、可靠性、隱私、資安
- **時程：**
  - 2024年：建立 AI 評測技術
  - 2025年：國內評測技術對接國際標準
  - 2026年：國內產品通過國內外標準評測
- **初期評測目標：** 語言模型為主，影像分類產品為輔
- **運作方式：** 評測中心核准之 AI 測試實驗室進行產品與系統檢驗，出具測試報告，AI 驗證機構審查
- **Sources:**
  - [AI產品與系統評測中心設置要點 — 數位發展部](https://law.moda.gov.tw/LawContent.aspx?id=GL000133)
  - [數位部AI評測中心啟動 語言模型納10項目評分 — 中央社](https://www.cna.com.tw/news/ait/202312060129.aspx)
  - [面向應用場域之可信任AI模型評測技術 — 工研院](https://ictjournal.itri.org.tw/xcdoc/cont?xsmsid=0M236556470056558161&sid=0P295571709282591980)

### 4. 金管會《金融業運用人工智慧（AI）指引》

- **發布日期：** 2024年6月20日（民國113年）
- **定位：** 行政指導性質（非強制性行政規範），提供金融機構參考
- **前置作業：** 2023年10月17日先發布「金融業運用 AI 之核心原則與相關推動政策」
- **結構：** 總則 + 六大章節
  - **總則：** AI 定義、AI 系統生命週期、風險評估考量因素、以風險為基礎落實核心原則的方式、第三方業者的監督管理
  - **六大核心原則：**
    1. 建立治理及問責機制（明確管理 AI 系統的架構及風險管理政策）
    2. 重視公平性及以人為本的價值觀（評估公平性，監控偏見，避免歧視）
    3. 保護隱私及客戶權益（尊重客戶選擇是否使用 AI 服務的權利）
    4. 確保系統穩健性與安全性
    5. 落實透明性與可解釋性（說明 AI 系統運作方式及決策邏輯）
    6. 促進永續發展
- **重要要求：** 人為監督與專業判斷在高風險 AI 應用中不可或缺；第三方合作須有明確監管機制
- **Sources:**
  - [金管會發布「金融業運用人工智慧(AI)指引」— 金管會](https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202406200001&dtable=News)
  - [金融業運用人工智慧（AI）指引 — 金管會法規系統](https://law.fsc.gov.tw/LawContent.aspx?id=GL003920)
  - [金管會發布「金融業運用人工智慧(AI)指引」— 理律法律事務所](https://www.leeandli.com/TW/Newsletters/7287.htm)

---

## EU AI Act (歐盟人工智慧法案)

### 四級風險分類框架

| 風險等級 | 說明 | 具體範例 | 規範要求 |
|---------|------|---------|---------|
| **不可接受風險 (Unacceptable)** | 全面禁止 | 社會信用評分系統、大規模監控、潛意識操縱行為（如暗中影響投票）、利用弱勢族群漏洞（年齡/殘疾/社經地位）、生物特徵分類（種族/宗教/性傾向）、職場/學校情緒辨識、預測性犯罪偵查、大量蒐集網路人臉圖像 | 完全禁止使用 |
| **高風險 (High)** | 嚴格合規要求 | 醫療診斷設備、車輛安全元件、重要基礎設施管理（能源/交通）、教育評分、招聘/員工評估、信用評分/保險風險評估、執法證據評估、邊境管制/庇護決定、司法解釋 | 合規評估、人為監督、資料治理、透明度、向 EU 資料庫註冊 |
| **有限風險 (Limited)** | 透明度義務 | 聊天機器人（須揭露 AI 互動）、深偽內容（須標示）、生成式 AI 內容系統 | 須標示告知使用者正在與 AI 互動 |
| **最小風險 (Minimal)** | 無強制要求 | 垃圾郵件過濾器、一般 AI 應用 | 無限制，僅建議遵循一般原則 |

### 執行時程

| 日期 | 里程碑 |
|------|--------|
| 2024年8月1日 | AI 法正式生效 (entered into force) |
| **2025年2月2日** | 禁止類 AI 應用 (unacceptable risk) 及 AI 素養義務 (AI literacy) 開始適用 |
| **2025年8月2日** | 通用目的 AI 模型 (GPAI) 治理規則及義務開始適用 |
| **2026年8月2日** | Annex III 高風險 AI 系統規則開始適用與執行（就業、信貸等獨立系統） |
| **2027年8月2日** | 嵌入受管制產品之高風險 AI（醫療器材、機械）最終過渡期限 |

- **Sources:**
  - [High-level summary of the AI Act](https://artificialintelligenceact.eu/high-level-summary/)
  - [EU AI Act: Risk-Classifications — trail-ml](https://www.trail-ml.com/blog/eu-ai-act-how-risk-is-classified)
  - [EU AI Act Compliance Timeline — Trilateral Research](https://trilateralresearch.com/responsible-ai/eu-ai-act-implementation-timeline-mapping-your-models-to-the-new-risk-tiers)
  - [EU AI Act Timeline — DataGuard](https://www.dataguard.com/eu-ai-act/timeline)

---

## International Comparison (國際比較)

### 美國 (US)

- **Executive Order 14110 (Biden)：** 2023年10月30日簽署，「Safe, Secure, and Trustworthy Development and Use of AI」，指示 50+ 聯邦機構執行 100+ 具體行動，涵蓋安全、創新、競爭、公民自由等八大政策領域。要求各聯邦機構指定「首席人工智慧官」(Chief AI Officer)。NIST 開發生成式 AI 風險管理框架。
- **被廢止：** 2025年1月20日川普就職後數小時內即廢止 EO 14110
- **取代：Executive Order 14179** (2025年1月23日) —「Removing Barriers to American Leadership in AI」，方向轉向去監管化(deregulation)、促進 AI 創新、維持全球 AI 主導地位。180天內須制定行動計畫。
- **現況：** 美國目前無聯邦層級的全面性 AI 立法，以行政命令和各州立法為主
- **Sources:**
  - [Executive Order 14110 — Wikipedia](https://en.wikipedia.org/wiki/Executive_Order_14110)
  - [Executive Order 14179 — Wikipedia](https://en.wikipedia.org/wiki/Executive_Order_14179)
  - [Removing Barriers to American Leadership in AI — White House](https://www.whitehouse.gov/presidential-actions/2025/01/removing-barriers-to-american-leadership-in-artificial-intelligence/)

### 中國 (China)

- **特色：** 全球首個對生成式 AI 實施具約束力監管的國家，採「分領域監管」模式
- **主要法規：**
  - **《互聯網信息服務算法推薦管理規定》** — 要求演算法透明、安全、可控
  - **《互聯網信息服務深度合成管理規定》(2022年11月)** — 2023年1月生效，針對深偽(deepfake)等深度合成技術
  - **《生成式人工智慧服務管理暫行辦法》(2023年7月10日)** — 2023年8月15日生效，七個中央部門聯合發布，全球首個生成式 AI 具約束力法規
  - **科技倫理審查辦法（暫行）(2023年10月8日)** — 2023年12月1日生效，要求 AI 研發活動進行倫理審查
- **標示要求：** 生成式 AI 內容須加上「由 AI 生成」標籤
- **Sources:**
  - [Global AI Governance Law and Policy: China — IAPP](https://iapp.org/resources/article/global-ai-governance-china)
  - [AI Watch: Global regulatory tracker - China — White & Case](https://www.whitecase.com/insight-our-thinking/ai-watch-global-regulatory-tracker-china)

### 日本 (Japan)

- **特色：** 採「促進式」(promotional) 而非「限制式」(prescriptive) 監管，強調敏捷治理 (agile governance) 與多元互通性 (pluralistic interoperability)
- **三大支柱：**
  1. **AI 推進法 (AI Promotion Act, 2025年5月)：** 非強制性法律，以促進 AI 生態系發展為主
  2. **AI 事業者指引 (AI Business Operator Guidelines, 2024年4月)：** METI + MIC 發布，含十項跨領域原則（公平、隱私、安全等）及檢核表和案例
  3. **既有法律的解釋指引：** 如著作權法、個人資料保護法對生成式 AI 的適用
- **三大基礎價值：** 人類尊嚴、包容性、永續性
- **Sources:**
  - [Japan's Approach to AI Regulation in 2025 — MoFo Tech](https://mofotech.mofo.com/topics/japan-s-approach-to-ai-regulation-in-2025)
  - [Japan's emerging framework for responsible AI — IBA](https://www.ibanet.org/japan-emerging-framework-ai-legislation-guidelines)

### OECD AI 原則 (2019年通過，2024年更新)

- **地位：** 首個政府間 AI 標準 (first intergovernmental standard on AI)
- **五大價值導向原則：**
  1. **包容性成長、永續發展與福祉** — AI 應造福人類和地球
  2. **以人為本的價值觀與公平** — 尊重法治、人權、民主價值與多元
  3. **透明與可解釋** — 確保人們理解 AI 產出並可提出質疑
  4. **穩健性、安全與保障** — AI 系統須在其生命週期內穩健、安全運作
  5. **問責** — AI 行為者應對 AI 系統的正常運作及上述原則負責
- **Sources:**
  - [AI principles — OECD](https://www.oecd.org/en/topics/ai-principles.html)
  - [AI Principles Overview — OECD.AI](https://oecd.ai/en/ai-principles)

### UNESCO《人工智慧倫理建議書》(2021年11月)

- **地位：** 全球首個 AI 倫理綜合框架，193 個會員國一致通過
- **核心基礎：** 保護人權與尊嚴
- **核心原則：** 透明性、問責、法治、公平
- **政策行動領域：** 資料治理、環境與生態系統、性別平等、教育與研究、健康與社會福祉、經濟、勞動市場等
- **Sources:**
  - [Recommendation on the Ethics of AI — UNESCO](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics)
  - [UNESCO's Recommendation on the Ethics of AI: key facts](https://www.unesco.org/en/articles/unescos-recommendation-ethics-artificial-intelligence-key-facts)

---

## Community Insights (考試模式與考點)

### 考試科目與治理出題方向

- **治理題約占第一科「人工智慧基礎概論」的重要比例**，2026年起因《人工智慧基本法》生效，治理題權重預計上升
- **三份必讀文件（2026年版）：**
  1. 《人工智慧基本法》— 2026/1/14 生效，七大原則必背
  2. 《公部門人工智慧應用參考手冊》— 情境題主要素材
  3. 《AI應用規劃師能力鑑定評鑑內容範圍 11502版》— 2026年2月更新
- **Source:** [2026 iPAS AI應用規畫師-初級 三份必讀更新文件 — CCChen](https://vocus.cc/article/69aee22dfd8978000194b35e)

### 治理相關考題實測回報

- **EU AI Act 風險分類為高頻考點：** 實際出現情境題「員工臉部辨識打卡」屬高風險（勞工管理或控制出勤與評估），需判斷正確風險等級
- **金管會 AI 指引出 3-4 題：** 金融業 AI 規範為重要考點
- **人類在迴圈內 (HITL) 為核心概念：** 完全自動化在影響人權的決定中（醫療、金融、人事）是被禁止的
- **七大原則口訣「永人隱資透公問」：** 考生推薦的記憶口訣
- **考試難度逐梯次提升：** 第二場比第一場難，預估通過率 35-40%；專業術語與細節規範逐漸取代基礎題
- **Sources:**
  - [iPAS AI 應用規劃師 初級 05/03 第二場 考試心得與考古題分享 — CCChen](https://vocus.cc/article/6815f36afd8978000136ffeb)
  - [iPAS AI應用規劃師（初級）考前總整理 — CCChen](https://vocus.cc/article/69bba7b6fd89780001b3df00)

### 官方公告試題與樣題

- [114年第四梯次初級公告試題 — iPAS](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%B8%80%E7%A7%91%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E5%9F%BA%E7%A4%8E%E6%A6%82%E8%AB%96(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000442.pdf)
- [114年版考試樣題 — iPAS](https://www.ipas.org.tw/DownloadFile.ashx?filename=e8d50f7f-17ce-4057-ad60-f42db15b20cd_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf&type=10)
- [iPAS AI應用規劃師學習資源頁](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources)

---

## Current State (最新動態)

- **台灣《人工智慧基本法》：** 2026年1月14日正式生效，為 115年度考試的全新核心考點
- **EU AI Act：** 禁止類已於 2025年2月2日開始執行；GPAI 規則已於 2025年8月2日適用；高風險系統規則將於 2026年8月2日全面適用
- **金管會 AI 指引：** 2024年6月已發布，屬行政指導性質
- **數位發展部公部門 AI 手冊：** 已於 2025年12月發布正式版（草案試行一年後定稿）
- **美國 AI 政策：** Biden EO 14110 已於 2025年1月被川普廢止，以去監管化的 EO 14179 取代
- **日本 AI 推進法：** 2025年5月通過，採促進式而非限制式路線
- **考試趨勢：** 115年度起治理題權重上升，考試範圍持續擴大，難度逐梯次提升

---

## External Documents Found

| 文件名稱 | 狀態 | 備註 |
|---------|------|------|
| 台灣《人工智慧基本法》 | **已找到** — 全文20條，七大原則，國科會主管 | 2025/12/23 三讀，2026/1/14 生效 |
| 數位發展部《公部門人工智慧應用參考手冊》 | **已找到概述** — PDF 可下載 | 正式版 2025/12/17 發布；建議下載 PDF 取得完整章節 |
| 數位發展部《AI產品與系統評測》 | **已找到設置要點** — 10項評測指標已整理 | 評測中心設置要點可查；詳細評測方法需參考 ISO/IEC TR-24028 |
| 金管會《金融業運用人工智慧（AI）指引》 | **已找到** — 六大核心原則及結構已整理 | 2024/6/20 發布，行政指導性質 |
| EU AI Act | **已找到** — 四級風險分類、時程已整理 | 多個權威來源交叉驗證 |
| OECD AI Principles | **已找到** — 五大原則已整理 | 2019年通過，2024年更新 |
| UNESCO AI Ethics Recommendation | **已找到** — 核心框架已整理 | 2021年11月，193國通過 |
| IPAS 114年公告試題 PDF | **已找到連結** — 需下載分析治理相關題目 | 建議下載後逐題標記治理考點 |

---

## Key Findings Summary

1. **七大原則是核心考點：** 台灣《人工智慧基本法》七大治理原則（永人隱資透公問）為 2026年起必考內容，需能逐條說明並與實際情境對應。

2. **EU AI Act 四級風險分類是高頻題型：** 考試會以情境題形式出現（如：員工人臉辨識打卡屬於高風險），需熟悉每個等級的範例和義務要求。

3. **金管會 AI 指引出題頻率高：** 六大核心原則及「行政指導」非強制性質為考點。需理解金融業運用 AI 的治理與問責機制。

4. **國際比較需「知道有什麼」即可：** 初級只需知道各國採取什麼路線（EU = 風險分級立法、US = 行政命令/去監管化、中國 = 分領域約束性監管、日本 = 促進式軟法），不需深入合規細節。

5. **Human-in-the-Loop (HITL) 是跨文件共同概念：** 從台灣基本法的「人類自主」、EU AI Act 的高風險人為監督、到金管會指引的「人為監督與專業判斷」，HITL 串連所有治理框架，是高機率考點。

---

## Scope Notes

以下內容超出初級範圍，不應納入教材主體：

- **偏見偵測演算法 (bias detection algorithms)**：如公平性指標 (demographic parity, equalized odds) 的計算公式 — 屬中級
- **合規實施程序 (compliance implementation procedures)**：如如何執行 EU AI Act 合規評估的具體步驟 — 屬中級
- **差分隱私 (differential privacy) 和聯邦學習 (federated learning) 的技術細節**：雖然有考生提到，但初級只需知道「有隱私保護技術存在」，不需理解數學原理
- **監理沙盒 (regulatory sandbox) 的具體運作機制**：初級只需知道「監理沙盒是在受控環境中測試新 AI 應用的機制」
- **NIST AI Risk Management Framework 的詳細架構**：初級只需知道美國 NIST 有制定 AI 風險管理框架
- **ISO/IEC TR-24028 標準的詳細條文**：初級只需知道台灣 AI 評測參考此國際標準

**初級最深允許深度：** 「組織應監控 AI 系統的偏見，並遵守相關法規」— 點到為止，不解釋如何做到。
