# Research Notes: L11201 資料基本概念與來源

> Research date: 2026-04-08
> Certification: iPAS AI應用規劃師能力鑑定 (初級)
> Topic code: L11201

---

## Official Sources

### iPAS 官方學習指引
- **Source**: [AI應用規劃師(初級)-學習指引-科目1](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB(%E5%88%9D%E7%B4%9A)-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE1_%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E5%9F%BA%E7%A4%8E%E6%A6%82%E8%AB%961141203_20251222172144.pdf) (PDF, 114年12月版)
- L11201 falls under L112「資料處理與分析概念」, the second topic in Subject 1
- Syllabus keywords: 大數據、資料型態與結構、數值型資料、文字資料、圖像資料

### iPAS 考試樣題 (114年版)
- **Source**: [iPAS AI應用規劃師考試樣題](https://www.ipas.org.tw/DownloadFile.ashx?filename=e8d50f7f-17ce-4057-ad60-f42db15b20cd_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf) (PDF)
- Sample questions cover data concepts at a definitional level

### 115年度考試簡章
- **Source**: [115年度AI應用規劃師能力鑑定簡章](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf) (PDF)

### iPAS 官方學習資源頁
- **Source**: [AI應用規劃師-學習資源](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources)

---

## Community Insights (Exam Patterns)

### Confirmed Exam Questions on Data Concepts (from CCChen community posts)

**第二場 (2025/05/03) 實際考題**:
- **Source**: [iPAS AI 應用規劃師 初級 05/03 第二場考試心得](https://vocus.cc/article/6815f36afd8978000136ffeb)
- **CSV格式應用 (1題)**: 考CSV是「純文字檔案格式，使用逗號來分隔資料欄位，每一行代表一筆資料」
- **資料型態綜合題**: 情境題涉及姓名/住址/生日/血型/國籍/是否有工作經驗，要求分辨文字型、數字型、日期型、布林值 — 此題答案有爭議，考生回報選項都包含多種型態
- **半結構化數據**: 出現相關考題（具體內容未完整記載）
- **何者不是資料清理?**: 反向題型，測試對資料清理定義的理解
- **資料集特性判斷**: 「何者不是資料集的屬性？」選項包含資料大小、資料的多樣性、資料的收集時間、資料的特徵數量 — 正確答案為「資料的收集時間」（代表來源背景/時間資訊，非資料集本身的固有屬性）

**第三場 (2025/08/16) 趨勢**:
- **Source**: [iPAS AI 應用規劃師 初級 08/16 第三場考試心得](https://vocus.cc/article/68a2c94afd897800015778df)
- 難度與專業度明顯提升
- 資料概念題持續出現，但題目更偏向情境應用而非純粹記憶

### Exam Pattern Analysis
- L11201 typically generates **2-3 questions** per exam (slightly higher weight than L11101)
- Question types: (1) 定義辨別 (definition matching), (2) 情境分類 (scenario-based classification), (3) 反向選擇 (what is NOT an example of X)
- **Data type classification is a favorite exam topic** — students must know how to categorize real-world data examples
- **CSV/JSON/XML format recognition** — know which is structured, semi-structured, unstructured

### Community Study Resources
- **Source**: [104學習考古題](https://nabi.104.com.tw/ability/10049056/), [yamol試卷](https://yamol.tw/cat-iPAS%E2%97%86AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E2%97%86%E5%88%9D%E7%B4%9A-6731.htm)
- Commercial: Shopee 1600題考題集含資料概念相關題目

---

## Current State

### 1. Big Data 大數據 — 5V 特性

**來源與歷史**: Gartner 分析師 Doug Laney 於 2001 年首先提出 3V（Volume, Velocity, Variety），後續擴展為 4V（加 Veracity）和 5V（加 Value）。

| 特性 | 英文 | 繁體中文 | 定義 | 台灣相關案例 |
|------|------|----------|------|-------------|
| **Volume** | 巨量性 | 資料量 | 數據規模龐大，達 TB、PB、EB 級別，傳統資料庫系統無法在合理時間內處理 | 台灣健保資料庫：20多年來系統性記錄2,300萬人就診資料 |
| **Velocity** | 時效性 | 速度 | 數據流動連續且迅速，需要即時或近即時處理才能發揮最大價值 | 臺北市大數據中心：COVID-19跨年實聯制儀表板即時監控進場人數 |
| **Variety** | 多樣性 | 類型 | 數據來源種類繁多，包含結構化與非結構化資料（文字、影像、音訊、網頁、社群媒體等） | 零售業整合 POS 交易紀錄 + 社群評論 + 監視影像 |
| **Veracity** | 真實性 | 品質 | 數據須具備真實性，需過濾偏差、偽造或異常的「髒數據」。GIGO 原則（Garbage In, Garbage Out） | 開放資料品質檢核：data.gov.tw 資料集有品質評分機制 |
| **Value** | 價值性 | 價值 | 大數據分析須投入大量成本，必須評估數據是否能轉換為實際商業價值。單條數據價值低，總體價值高 | EASY SHOP 透過 AI 推薦轉換成長 390%，Pop-up 推薦轉換率提升 5.2 倍 |

**四字箴言**: 「大、快、雜、疑」分別對應 Volume、Velocity、Variety、Veracity（台灣常用的記憶口訣）。

**Sources**:
- [INSIDE — 巨量資料的時代，用「大、快、雜、疑」帶你認識大數據](https://www.inside.com.tw/article/4356-big-data-1-origin-and-4vs)
- [三民輔考 — 大數據之特性](https://www.3people.com.tw/%E7%9F%A5%E8%AD%98/%E5%A4%A7%E6%95%B8%E6%93%9A%E4%B9%8B%E7%89%B9%E6%80%A7/%E5%9C%8B%E7%87%9F%E4%BA%8B%E6%A5%AD-%E4%B8%AD%E8%8F%AF%E9%83%B5%E6%94%BF/4381ff96-6557-4259-aa91-afc74b36d69e)
- [Medium IT公社 — 企業大數據到底是什麼](https://communeit.medium.com/%E4%BC%81%E6%A5%AD%E5%A4%A7%E6%95%B8%E6%93%9A%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E9%BA%BC-%E8%AE%80%E5%AE%8C%E6%9C%AC%E6%96%87%E4%BD%A0%E5%B0%B1%E6%87%82%E4%BA%86-21c305de5b0)
- [Twilio — Big Data Characteristics: Recognize the 5 V's](https://www.twilio.com/en-us/resource-center/big-data-characteristics)
- [臺北市大數據應用實例 — iThome](https://www.ithome.com.tw/news/143186)

### 2. 資料型態分類 — AI/ML 領域

#### A. 依數據性質分類（Data by Nature）

| 型態 | 英文 | 說明 | AI 應用場景 |
|------|------|------|------------|
| **數值型資料** | Numerical Data | 可測量、排序、比較的量化數值。細分為離散型（discrete，可數，如學生人數）和連續型（continuous，可測量，如溫度、股價） | 迴歸分析、股價預測、感測器監控 |
| **文字資料** | Text Data | 非結構化語言內容，來自對話、郵件、社群媒體、書籍等。需要前處理（斷詞、去除停用詞等）才能被模型使用 | NLP、情感分析、文本分類、機器翻譯 |
| **圖像資料** | Image Data | 視覺資訊，以像素矩陣表示。需要調整大小、正規化、數據增強等前處理 | 電腦視覺、物件偵測、人臉辨識 |
| **音訊資料** | Audio Data | 聲音信號，涉及頻率、音高、音量隨時間的變化。常轉換為頻譜圖（spectrogram）供模型處理 | 語音辨識、音樂分析、語言翻譯 |
| **影片資料** | Video Data | 連續影像序列加上音訊，是圖像和音訊的組合 | 動作辨識、自駕車視覺、監控分析 |
| **類別型資料** | Categorical Data | 將資訊分為不同群組或類別（如性別、產品類型、地區）。需轉為數值表示（one-hot encoding 等）才能用於模型 | 分類問題、推薦系統 |

**Sources**:
- [KodeKloud — Data Types in AI Models](https://notes.kodekloud.com/docs/AWS-Certified-AI-Practitioner/Fundamentals-of-AI-and-ML/Data-Types-in-AI-Models)
- [Anolytics — 8 Data Types That Major AI Models Feed on](https://www.anolytics.ai/blog/8-data-types-that-major-ai-models-feed-on-to-function/)
- [GeeksforGeeks — Introduction to Data in Machine Learning](https://www.geeksforgeeks.org/machine-learning/ml-introduction-data-machine-learning/)
- [Applied AI Course — Types of Data in Machine Learning](https://www.appliedaicourse.com/blog/types-of-data-in-machine-learning/)

#### B. 依結構化程度分類（Data by Structure）

| 類型 | 英文 | 定義 | 格式範例 | 生活案例 |
|------|------|------|----------|----------|
| **結構化資料** | Structured Data | 事先定義好欄位格式，以行和列（row & column）的表格形式儲存。有固定欄位、固定格式與順序 | 關聯式資料庫（MySQL, PostgreSQL）、CSV、Excel 試算表 | 企業銷售資料庫（會員編號、購買日期、品項、金額）、健保就診紀錄 |
| **半結構化資料** | Semi-structured Data | 沒有嚴格的表格 schema，但透過標籤（tags）、元資料（metadata）或鍵值對（key-value pairs）提供部分組織結構。介於結構化與非結構化之間 | JSON、XML、YAML、HTML、電子郵件（有寄件人/主旨等欄位，但內文是自由文字） | API 回傳的 JSON 資料、網頁 HTML、log 檔案、IoT 設備回報資料 |
| **非結構化資料** | Unstructured Data | 未經整理的原始資料，沒有預定義的格式或組織方式。需要進階技術（NLP、CV）才能分析 | 文字檔、PDF、Word 文件、圖片（JPEG, PNG）、音訊（MP3）、影片（MP4）、社群媒體貼文 | 客戶評論、監視器影片、客服錄音、醫療影像（X光片）、新聞報導 |

**關鍵數據**: 結構化及半結構化資料僅佔總體數據約 20%，剩餘 80% 為非結構化資料。

**常見考試陷阱**:
- **JSON 是半結構化資料，不是非結構化資料** — JSON 有鍵值對結構，但沒有固定 schema
- **電子郵件是半結構化資料** — 有結構化欄位（寄件人、收件人、主旨、日期）但內文是自由文字
- **CSV 是結構化資料的常見儲存格式** — 雖然是純文字檔，但有固定的欄位分隔規則

**Sources**:
- [Pure Storage — 結構化資料 vs. 非結構化資料](https://www.purestorage.com/tw/knowledge/big-data/structured-vs-unstructured-data.html)
- [iT邦幫忙 — 瞭解資料特徵：結構化與非結構化資料](https://ithelp.ithome.com.tw/articles/10200157)
- [Kiro — 數據分析第一課：搞懂結構化、半結構化與非結構化資料](https://www.kirolife.com/data-structures-explained/)
- [vocus — 認識「結構化/半結構化/非結構化」資料](https://vocus.cc/article/5f7e816afd897800016c0a68)
- [Medium — 淺談資料格式：結構化與非結構化資料](https://medium.com/marketingdatascience/%E6%B7%BA%E8%AB%87%E8%B3%87%E6%96%99%E6%A0%BC%E5%BC%8F-%E7%B5%90%E6%A7%8B%E5%8C%96%E8%88%87%E9%9D%9E%E7%B5%90%E6%A7%8B%E5%8C%96%E8%B3%87%E6%96%99-50c89a4b15e0)
- [Wikipedia — Semi-structured data](https://en.wikipedia.org/wiki/Semi-structured_data)
- [AltexSoft — What is Semi-Structured Data?](https://www.altexsoft.com/blog/semi-structured-data/)

### 3. 資料來源分類 — 內部 vs 外部

#### 內部資料來源（Internal Data Sources）
| 來源 | 說明 | 範例 |
|------|------|------|
| 企業資料庫 | 關聯式資料庫儲存的營運數據 | 客戶資料、訂單紀錄、庫存量 |
| CRM 系統 | 客戶關係管理系統中的互動紀錄 | 客戶聯絡歷史、購買偏好、服務案件 |
| ERP 系統 | 企業資源規劃系統中的流程數據 | 財務報表、供應鏈資料、人力資源 |
| 應用程式日誌 | 系統運行中自動記錄的操作紀錄 | 伺服器 log、使用者行為 log、錯誤日誌 |
| IoT 感測器 | 企業內部部署的物聯網設備收集的數據 | 工廠溫度/濕度感測、設備運轉數據、能源消耗監測 |

#### 外部資料來源（External Data Sources）
| 來源 | 說明 | 範例 |
|------|------|------|
| 政府開放資料 | 政府依開放資料精神公開的資料集 | data.gov.tw、data.taipei、各部會開放資料平台 |
| API 服務 | 第三方系統提供的程式化資料存取介面 | 氣象 API、金融行情 API、地圖服務 API |
| 網路資料 | 從公開網站取得的資料 | 新聞網站、社群媒體公開貼文、論壇 |
| 學術/研究資料集 | 學術機構公開的標準資料集 | ImageNet（圖像）、Wikipedia corpus（文字）、UCI ML Repository |
| 商業資料提供者 | 專門販售或授權資料的商業機構 | 市場調查報告、信用評分資料、消費者行為資料 |

### 4. 台灣特定資料來源

#### 政府資料開放平臺（data.gov.tw）
- **Source**: [政府資料開放平臺](https://data.gov.tw/), [關於平臺](https://data.gov.tw/about), [Wikipedia — 政府資料開放平臺](https://zh.wikipedia.org/zh-tw/%E6%94%BF%E5%BA%9C%E8%B3%87%E6%96%99%E9%96%8B%E6%94%BE%E5%B9%B3%E8%87%BA)
- 依據《政府資訊公開法》建立的跨部門開放資料平台
- 提供 CSV、XML、JSON、OLAP、TXT 等多種格式
- 任何人在使用規範內可自由運用
- 2023 年起推動「高應用價值」主題資料，優先聚焦九大領域：農業永續、空間資訊、氣候環境、災害防救、交通運輸、健康醫療、能源管理、社會救助、企業永續（領域持續擴充中）
- 已介接 TAIDE 服務（Beta 版）提供 AI 輔助查詢

#### 其他台灣開放資料平台
- **臺北市資料大平臺**: [data.taipei](https://data.taipei/)
- **臺中市政府資料開放平臺**: [opendata.taichung.gov.tw](https://opendata.taichung.gov.tw/)
- **內政部資料開放平臺**: [data.moi.gov.tw](https://data.moi.gov.tw/)
- **經濟部資料開放**: [moea.gov.tw 資料開放](https://www.moea.gov.tw/Mns/populace/content/Content.aspx?menu_id=7770)
- **數位發展部**: [moda.gov.tw — 政府資料開放](https://moda.gov.tw/digital-affairs/plural-innovation/operations/244)

#### 台灣大數據應用案例
- **醫療**: 健保資料庫 2,300 萬人就診紀錄 → 台灣研究團隊利用健保大數據建立肝癌預測模型，準確率達 80%
- **交通**: 臺北市大數據中心即時監控系統（COVID-19 跨年活動實聯制儀表板）
- **零售**: EASY SHOP AI 推薦系統轉換率成長 390%
- **智慧製造**: 2025 全國智慧製造大數據分析競賽

**Sources**:
- [iThome — 臺北市大數據應用實例大公開](https://www.ithome.com.tw/news/143186)
- [ALPHA Camp — Big Data 大數據：從醫療大數據案例看AI數據問題](https://tw.alphacamp.co/blog/big-data-and-healthcare-example)

### 5. 資料與 AI/ML 的關係

**「Data is the fuel for AI」** — 資料是 AI 的燃料。沒有資料，AI 模型無法學習和做出預測。

核心概念：
- **AI 模型的品質取決於訓練資料的品質**（GIGO 原則）
- **資料量越大、越多元，模型通常越準確**（但需要適當清理與前處理）
- **不同資料型態對應不同 AI 技術**：
  - 數值型資料 → 傳統機器學習、迴歸分析
  - 文字資料 → NLP（自然語言處理）
  - 圖像資料 → CV（電腦視覺）、CNN
  - 音訊資料 → 語音辨識、音訊分析
  - 多模態資料 → 多模態學習（結合文字+圖像+音訊等）

---

## External Documents Found

1. **iPAS 官方學習指引 PDF** — 內容為圖檔格式，無法直接提取文字。建議手動查閱 L112 章節確認細部考試重點。
2. **iPAS 考試樣題 PDF** — 可下載查看資料概念相關樣題。
3. **iPAS 115年度考試簡章 PDF** — 確認 2026 年度考試範圍。
4. **114年第四次公告試題 PDF** — [下載連結](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%B8%80%E7%A7%91%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E5%9F%BA%E7%A4%8E%E6%A6%82%E8%AB%96(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000442.pdf)

---

## Key Findings Summary

1. **L11201 generates approximately 2-3 questions per exam**, making it a moderately weighted topic. Questions focus on definitional recognition and scenario-based classification rather than technical depth.

2. **Big Data 5Vs are highly testable**: Volume (巨量), Velocity (時效), Variety (多樣), Veracity (真實), Value (價值). The mnemonic "大快雜疑" covers the first 4Vs. Students must match English terms to Chinese definitions and recognize real-world examples.

3. **Structured vs semi-structured vs unstructured is a core exam distinction**:
   - Structured = 固定表格 schema（CSV, 關聯式資料庫）
   - Semi-structured = 有標籤/鍵值對但無固定 schema（JSON, XML, Email）
   - Unstructured = 無預定義格式（圖片、影片、自由文字）
   - **Key trap**: JSON is semi-structured (NOT unstructured); Email is semi-structured (NOT structured)

4. **Data type classification maps directly to AI application domains**: The exam tests whether students can match data types to their corresponding AI techniques (text→NLP, image→CV, numerical→regression/ML). This is vocabulary-level knowledge, not technical implementation.

5. **Taiwan-specific data sources are exam-relevant**: Students should know data.gov.tw exists, what formats it provides (CSV, JSON, XML), and the concept of government open data. The eight priority themes (農業、空間資訊、氣候、災防、交通、醫療、能源、社會救助) may appear as examples.

6. **The "80/20 rule" of data structure** is a useful exam fact: approximately 80% of the world's data is unstructured, only 20% is structured or semi-structured. This highlights why AI techniques for unstructured data (NLP, CV) are so important.

7. **Exam difficulty is increasing**: Questions are shifting from pure memorization toward scenario-based judgment. Students should practice classifying real-world data examples rather than just memorizing definitions.

---

## Scope Notes (Boundary Warnings)

- **Data cleaning, feature engineering, standardization**: These belong to L11202 (資料整理與分析流程), the next topic. L11201 only introduces what data IS and where it comes from, not how to process it.
- **SQL queries, Python pandas, data manipulation code**: Entirely out of scope for 初級. Never show code or tool-specific commands.
- **Statistical formulas (mean, standard deviation, normalization formulas)**: Out of scope. Mention concepts like "data needs preprocessing" but never show the math.
- **Database design, schema normalization, ER diagrams**: Out of scope. Only need to know that structured data lives in tables with fixed schemas.
- **Web scraping techniques, API authentication**: Out of scope. Only need to know that APIs and web data are external data sources.
- **Data privacy and security**: Belongs to L11203 (資料隱私與安全). L11201 may mention data sources but should not discuss privacy regulations.
- **Machine learning model training details**: Belongs to L113 (機器學習概念). L11201 only establishes that different data types feed different AI approaches.
- **MapReduce, Hadoop, Spark**: These are big data processing frameworks. 初級 only needs to know big data 5V characteristics, not the technology stack used to process it.
