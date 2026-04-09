# Research Notes: L11202 資料整理與分析流程

## Official Sources

- [iPAS 官方學習資源](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 經濟部產業人才能力鑑定推動網提供初級 AI 應用規劃師學習指引，包含各科目評鑑內容重點說明與考題解析。評鑑範圍明確列出「資料整理與分析流程」，關鍵字涵蓋資料收集、清理、分析和呈現、特徵工程、資料標準化。

- [115 年度 AI 應用規劃師能力鑑定簡章](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf): 2026 年度正式簡章，確認初級科目一「人工智慧基礎概論」包含資料整理與分析流程。

- [114 年第四次初級公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%B8%80%E7%A7%91%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E5%9F%BA%E7%A4%8E%E6%A6%82%E8%AB%96(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000442.pdf): 實際出題包含特徵標準化情境題（員工離職風險預測模型，特徵數值範圍差異極大時的處理方式）、CSV 格式資料應用、資料集特性（資料大小、多樣性、特徵數量）等。

- [IBM — What is Feature Engineering?](https://www.ibm.com/think/topics/feature-engineering): Feature engineering 定義為將原始資料轉換為更有用的特徵，以提升機器學習模型效能的過程。包含 feature selection、feature extraction、feature transformation 三大類。

- [Microsoft 365 — 資料分析初學者指南](https://www.microsoft.com/zh-hk/microsoft-365/excel/data-analysis): 以初學者角度解說資料分析概念，涵蓋資料清理與視覺化呈現。

## Community Insights (exam patterns)

- [CCChen 2026 考前總整理](https://vocus.cc/article/69bba7b6fd89780001b3df00): 2026 年考試方向從「AI 工具理解」轉向「AI 導入規劃能力」。特徵工程與資料標準化被列為核心考點，包含 Z 分數異常值處理、獨熱編碼（One-Hot Encoding）、特徵交叉、防範資料洩漏等觀念。

- [CCChen 2026 V6 考試筆記](https://vocus.cc/article/69ca1675fd89780001e90073): 最新版考試筆記，強調跨領域混合情境題趨勢，題型不再是單一知識問答，而是給予場景後問應用什麼技術或如何處理。

- [CCChen 08/16 第三場考古題](https://vocus.cc/article/68a2c94afd897800015778df): 實際考題中出現資料類型（CSV 格式）、資料集特性、探索性資料分析（EDA）與異常值處理、特徵標準化等考題。

- [CCChen 05/03 第二場考古題](https://vocus.cc/article/6815f36afd8978000136ffeb): 確認資料前處理相關內容為常態出題範圍。

- [CCChen 115 年評鑑範圍比對分析](https://vocus.cc/article/69b61a7afd89780001b607e1): 2026 年科目一最新評鑑範圍 115-02 版比對，確認資料工程與標準化為重要考點。

- [104 學習 — iPAS 樣題 (114 年 3 月版)](https://nabi.104.com.tw/ability/10049056/iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A(%E5%88%9D%E7%B4%9A)_%E6%A8%A3%E9%A1%8C(114%E5%B9%B43%E6%9C%88%E7%89%88)): 官方樣題集，可參考資料處理相關題型。

- **考題形式觀察**: 資料整理相關題目多為「情境題」——給定一個企業場景（如員工離職預測），問考生應採用何種資料處理方式。非純定義背誦，而是需理解各步驟的目的與適用時機。

## Current State

### 資料分析流程標準四步驟

根據多方來源（[ALPHA Camp](https://tw.alphacamp.co/blog/data-analysis-process)、[帆軟](https://www.fanruan.com/zh-tw/blog/data-analysis-basics-and-applications)、[博弘雲端](https://www.nextlink.cloud/news/%E8%B3%87%E6%96%99%E5%89%8D%E8%99%95%E7%90%86%E5%A6%82%E4%BD%95%E9%81%8B%E4%BD%9C%EF%BC%9F4%E6%AD%A5%E9%A9%9F%E9%81%8B%E7%94%A8%E8%B3%87%E6%96%99%E5%89%8D%E8%99%95%E7%90%86%EF%BC%8C%E6%B4%9E%E5%AF%9F/)），資料分析的標準流程為：

1. **資料收集（Data Collection）**: 按照確定的分析框架，從資料庫、公開出版物、API、網際網路等管道收集相關資料。
2. **資料清理（Data Cleaning）**: 處理缺失值、重複值、異常值、格式不一致等問題，確保資料品質。
3. **資料分析（Data Analysis）**: 運用描述性、診斷性、預測性、指示性等分析方法，從資料中提取有意義的見解。
4. **資料呈現（Data Presentation）**: 透過視覺化圖表（折線圖、長條圖、圓餅圖、散佈圖等）和報告，將分析結果傳達給決策者。

### 資料清理的四大問題類型

根據[高點資訊科際學院](https://master.get.com.tw/it/column/detail.aspx?no=913982)與[博弘雲端](https://www.nextlink.cloud/news/data-cleansing-introduction/)：

1. **缺失值（Missing Values）**: 某些欄位的資料遺漏或為空白。
2. **重複值（Duplicate Values）**: 資料集中存在完全相同或高度相似的記錄。
3. **異常值（Outliers）**: 明顯偏離其他觀測值的極端資料（如年齡 200 歲）。
4. **不一致（Inconsistency）**: 同一筆資料在不同來源或欄位中呈現不同格式或矛盾。

### 四種資料分析類型

根據 [Adobe](https://business.adobe.com/blog/basics/descriptive-predictive-prescriptive-analytics-explained)、[Domo](https://www.domo.com/learn/article/data-analytics-types)：

1. **描述性分析（Descriptive）**: 回答「發生了什麼？」——彙總歷史資料，呈現趨勢與模式。
2. **診斷性分析（Diagnostic）**: 回答「為什麼發生？」——深入挖掘原因，使用鑽取、關聯分析等技巧。
3. **預測性分析（Predictive）**: 回答「未來會發生什麼？」——利用歷史資料與統計模型預測趨勢。
4. **指示性分析（Prescriptive）**: 回答「應該怎麼做？」——基於預測結果建議最佳行動方案。

### 特徵工程三大面向

根據 [IBM](https://www.ibm.com/think/topics/feature-engineering)、[GeeksforGeeks](https://www.geeksforgeeks.org/machine-learning/what-is-feature-engineering/)、[Medium — AI 反斗城](https://medium.com/ai%E5%8F%8D%E6%96%97%E5%9F%8E/%E7%89%B9%E5%BE%B5%E5%B7%A5%E7%A8%8B%E5%88%B0%E5%BA%95%E6%98%AF%E4%BB%80%E9%BA%BC-%E8%BD%89%E9%8C%84-ca9b82b7b646)：

1. **特徵選擇（Feature Selection）**: 從所有特徵中選出與目標最相關的子集，移除不重要或冗餘的特徵，降低模型複雜度。
2. **特徵萃取（Feature Extraction）**: 從原始資料中自動提取或組合出新的有用特徵表示，壓縮資訊量但保留關鍵資訊。
3. **特徵轉換（Feature Transformation）**: 改變特徵的表示方式，包括標準化、正規化、編碼轉換等，使資料更適合模型學習。

### 資料標準化 vs 正規化

根據 [DataCamp](https://www.datacamp.com/tutorial/normalization-vs-standardization)、[KDnuggets](https://www.kdnuggets.com/2020/04/data-transformation-standardization-normalization.html)：

- **標準化（Standardization / Z-Score Scaling）**: 將資料轉換為平均值為 0、標準差為 1 的分布。對異常值較為穩健。
- **正規化（Normalization / Min-Max Scaling）**: 將資料縮放到固定範圍（通常 0 到 1）。對異常值敏感，可能壓縮大部分資料到極小區間。
- **概念性區別**: 標準化關注的是資料的相對位置（離平均值幾個標準差），正規化關注的是資料的絕對範圍（最小到最大之間的比例）。

### 資料視覺化圖表選擇

根據 [Factsviz](https://factsviz.tw/charts_introduction)、[ALPHA Camp](https://tw.alphacamp.co/blog/three-steps-to-select-the-right-chart)：

按呈現目的選擇圖表：
- **比較**: 長條圖、群組長條圖
- **趨勢**: 折線圖、面積圖
- **組成**: 圓餅圖、堆疊長條圖
- **分佈/相關**: 散佈圖、直方圖、盒鬚圖

### 獨熱編碼（One-Hot Encoding）

考試常考概念：將無順序關係的類別型資料（如顏色：紅/藍/綠）轉換為二元矩陣表示，每個類別對應一個新的二元欄位。這是特徵轉換的一種，屬於特徵工程範疇。

## Key Findings Summary

1. **流程四步驟是考試核心框架**: 資料收集 → 清理 → 分析 → 呈現，考生必須理解每個步驟的目的、常見方法、以及步驟之間的邏輯關係。考題多以情境題形式出現，給定場景後問「應先做什麼」或「該用哪種方法」。

2. **資料清理四大問題必考**: 缺失值、重複值、異常值、不一致是固定考點。初級只需知道這四種問題的定義和為什麼要處理，不需要知道具體處理技術的程式碼實作。

3. **特徵工程以概念理解為主**: 選擇、萃取、轉換三大類的定義和目的。重點考點為獨熱編碼（One-Hot Encoding）的概念——什麼情況下使用（無順序的類別型資料）。2026 年考試已將特徵交叉、資料洩漏防範等列入考點。

4. **標準化 vs 正規化概念區分**: 考試會出情境題，問「特徵數值範圍差異極大時應如何處理」。考生需理解兩者的概念差異與適用場景，但不需要背公式。

5. **四種分析類型為基礎知識**: 描述性、診斷性、預測性、指示性分析的定義和各自回答的問題（What/Why/What will/What should），是選擇題的常見出題方向。

## Scope Notes

以下內容超出初級範圍，在課程中僅需提及名詞，不應深入展開：

- **統計公式**: Z 分數公式、標準差計算、Min-Max 公式等。初級只需知道「標準化是讓資料有統一的尺度」，不需計算。
- **程式碼實作**: Python pandas 清理操作、sklearn 的 StandardScaler / MinMaxScaler 等工具使用。完全不出現在初級。
- **進階特徵工程技術**: PCA（主成分分析）、特徵交叉的具體方法、自編碼器等。2026 年考試雖提及特徵交叉，但初級僅需知道概念名稱。
- **資料洩漏（Data Leakage）**: 2026 年新增考點，但屬進階概念。初級可能只考「什麼是資料洩漏」的定義層級。
- **SQL / 資料庫操作**: 資料收集的具體技術實作不在初級範圍。
- **EDA 統計指標**: 全距、標準差、四分位數等變異性指標。考題可能問「哪個是衡量資料分散程度的指標」，但不會要求計算。
- **MLOps / 模型維運**: 2026 年中級考點，初級不涉及。
