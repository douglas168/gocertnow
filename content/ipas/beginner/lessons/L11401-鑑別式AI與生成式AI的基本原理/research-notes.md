# Research Notes: L11401 鑑別式AI與生成式AI的基本原理

> Research date: 2026-04-15
> Certification: iPAS AI應用規劃師 初級
> Boundary: conceptual level only (what & why); no internal architectures or training procedures

---

## Official Sources

### iPAS 官方考試資源
- **官方樣題 (114年1月版 & 114年3月版):** iPAS 官方釋出初級考試樣題，涵蓋鑑別式AI與生成式AI的基本概念區分。114年9月版更新納入非生成式模型（如SVM）與生成式模型（如VAE、Diffusion Model）的區分考題。
  - [iPAS 考試樣題 (114年1月版)](https://www.ipas.org.tw/DownloadFile.ashx?filename=e8d50f7f-17ce-4057-ad60-f42db15b20cd_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf&type=10)
  - [104學習 樣題 (114年3月版)](https://nabi.104.com.tw/ability/10049056/iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A(%E5%88%9D%E7%B4%9A)_%E6%A8%A3%E9%A1%8C(114%E5%B9%B43%E6%9C%88%E7%89%88))

- **114年第四梯次公告試題:** 第一科（人工智慧基礎概論）和第二科（生成式AI應用與規劃）已公開。
  - [第一科公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%B8%80%E7%A7%91%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E5%9F%BA%E7%A4%8E%E6%A6%82%E8%AB%96(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000442.pdf)
  - [第二科公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E7%94%9F%E6%88%90%E5%BC%8FAI%E6%87%89%E7%94%A8%E8%88%87%E8%A6%8F%E5%8A%83(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000507.pdf)

- **115年度考試簡章:** [iPAS 115年簡章 (初/中級)](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf)

- **官方學習資源頁:** [iPAS AI應用規劃師 學習資源](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources)

### 經濟部產業技術司
- **科技新知:** 經濟部產業技術司提供鑑別式AI與生成式AI的基本概念說明，強調鑑別式AI透過有標註資料進行辨識分類（人臉辨識、車牌辨識、瑕疵檢測），生成式AI透過大量資料學習後自主產生新內容（文字、語音、圖像、影像、程式碼、3D模型）。
  - [經濟部產業技術司 科技新知](https://www.moea.gov.tw/MNS/doit/industrytech/IndustryTech.aspx?menu_id=13545&it_id=490)

### 科技大觀園 (科技部)
- **生成式AI和分辨式AI比較:** 從官方科普角度說明兩者差異。
  - [科技大觀園文章](https://scitechvista.nat.gov.tw/Article/C000003/detail?ID=c746ecd6-5e7d-4fc1-afe3-d91f2c06b992)

---

## Community Insights (exam patterns)

### CCChen Vocus 系列 (最重要的考試社群資源)
CCChen 是 iPAS AI應用規劃師考試社群中最活躍的內容創作者，撰寫了大量考試心得和重點整理：

1. **L11401 專題文章:** 直接對應本課題，涵蓋鑑別式AI vs 生成式AI 的基本原理。
   - [L11401：鑑別式AI與生成式AI的基本原理](https://vocus.cc/article/67fcad07fd8978000158a066)

2. **2026/03/21 考前總整理:** 包含最新考試趨勢、模型部署考點。
   - [iPAS AI應用規劃師（初級）考前總整理](https://vocus.cc/article/69bba7b6fd89780001b3df00)

3. **2026年考前三份必讀更新文件:** 考試範圍重大變化的解析。
   - [2026 iPAS AI應用規劃師-初級 考前必讀更新文件](https://vocus.cc/article/69aee22dfd8978000194b35e)

4. **114年第三場 (08/16) 考試心得與考古題:** 包含實際考題方向。
   - [第三場考試心得與考古題](https://vocus.cc/article/68a2c94afd897800015778df)

5. **114年第二場 (05/03) 考試心得與考古題:** 早期考題趨勢。
   - [第二場考試心得與考古題](https://vocus.cc/article/6815f36afd8978000136ffeb)

6. **114年9月版樣題更新分析:** 納入SVM vs VAE/Diffusion Model的區分，難度提升。
   - [考試樣題更新114年9月版本整理](https://vocus.cc/article/68cfb4f0fd89780001298b53)

### 考題趨勢 (根據社群回報)
- **114年第一場 (03/22):** 1,226人到考 (出席率91%)，694人通過 (通過率56.6%)
- **考題難度趨勢:** 「數量增加、難度提升、實務應用及合規細節深化」
- **本主題常見考題類型:**
  - 鑑別式 vs 生成式的「目的」區分 (分類/預測 vs 生成新內容)
  - 給一個應用場景，判斷該用鑑別式還是生成式
  - 非生成式模型 (如SVM) vs 生成式模型 (如VAE、Diffusion Model) 的辨識
  - 模型評估指標選擇 (如極端不平衡資料用 Recall)

### 其他社群資源
- [yamol 試卷列表](https://yamol.tw/cat-iPAS%E2%97%86AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E2%97%86%E5%88%9D%E7%B4%9A-6731.htm) — 線上模擬題庫
- [darkthread GitHub 考古題整理](https://darkthread.github.io/ipas-exam/114-%E5%88%9D%E7%B4%9A-2-%E7%94%9F%E6%88%90%E5%BC%8FAI%E6%87%89%E7%94%A8%E8%88%87%E8%A6%8F%E5%8A%83/) — 114年初級第二科試題
- [S測驗 iPAS AI應用規劃師](https://sustainnovation.cc/?cat=13) — 線上練習平台
- [東東 GCP 教學 — iPAS 人工智慧概論重點整理](https://dongdonggcp.com/2025/09/10/ipas-ai-planner-exam-ai-introduction/)

---

## Current State

### 鑑別式AI（Discriminative AI）核心概念

**定義與目的:**
- 直接學習條件概率 P(y|x)：給定輸入 x，輸出 y 的概率
- 重點在找到最佳的「決策邊界」(decision boundary)，用於區分不同類別
- 目的是分類 (classification) 和預測 (prediction/regression)

**典型應用場景 (初級考試常考):**
- 垃圾郵件偵測 (spam detection)
- 圖像辨識 (image classification) — 人臉、車牌
- 產品瑕疵檢測 (defect detection)
- 醫療診斷 (medical diagnosis)
- 情感分析 (sentiment analysis)
- 命名實體辨識 (named-entity recognition)
- 光學字元辨識 (OCR)

**常見鑑別式模型名稱 (考生需能辨認):**
- 邏輯回歸 (Logistic Regression)
- 支援向量機 (SVM)
- 決策樹 / 隨機森林 (Decision Tree / Random Forest)
- 梯度提升機 (Gradient Boosting)
- 神經網路用於分類 (Neural Networks for classification)

**學習方式:** 監督式學習 (supervised learning)，需要有標註的資料 (labeled data)

### 生成式AI（Generative AI）核心概念

**定義與目的:**
- 學習資料的聯合概率分布 P(x,y) 或數據分布
- 對已有資料進行總結歸納，在此基礎上創作新的內容
- 目的是生成 (generation) 新數據

**典型應用場景 (初級考試常考):**
- 文本生成 (text generation) — ChatGPT, Claude
- 圖像生成 (image generation) — DALL-E, Midjourney, Stable Diffusion
- 程式碼生成 (code generation) — GitHub Copilot
- 音頻/音樂生成 (audio/music generation)
- 影片生成 (video generation) — Sora
- 3D模型生成

**常見生成式模型名稱 (考生需能辨認):**
- 生成對抗網路 GAN (Generative Adversarial Network)
- 變分自動編碼器 VAE (Variational Autoencoder)
- 自回歸模型 (Autoregressive Models) — GPT 系列
- 擴散模型 (Diffusion Models) — Stable Diffusion

**學習方式:** 可使用非監督式學習 (unsupervised learning)，能利用未標註資料 (unlabeled data)

### 鑑別式 vs 生成式 關鍵比較表

| 面向 | 鑑別式AI | 生成式AI |
|------|---------|---------|
| 核心任務 | 分類、預測 | 生成新內容 |
| 學習目標 | 條件概率 P(y\|x) | 聯合概率 P(x,y) 或數據分布 |
| 資料需求 | 需有標註資料 (labeled) | 可用未標註資料 (unlabeled) |
| 輸出 | 類別標籤或數值預測 | 新的文字/圖像/音頻/影片 |
| 決策方式 | 學習決策邊界 | 學習數據分布 |

### 技術測試與驗證 (conceptual level)

- **概念驗證 (PoC, Proof of Concept):** 導入AI前先小規模測試，確認可達預期效果
- **偏差與變異權衡 (Bias-Variance Tradeoff):** 模型不能太簡單 (underfitting) 也不能太複雜 (overfitting)
- **學習曲線監控:** 訓練準確率持續上升但驗證準確率下降 = 過擬合
- **評估指標選擇:** 極端不平衡資料 (如醫療漏診、防詐欺) 應優先使用召回率 (Recall)
- **監理沙盒 (Regulatory Sandbox):** 對具潛在風險的創新AI應用提供安全實驗環境

### 模型部署 (conceptual level)

| 部署方式 | 特點 | 適用場景 |
|---------|------|---------|
| **雲端 (Cloud)** | 強大計算力、高可擴展性；延遲較高、數據離場 | 大型模型訓練、NLP應用、計算密集任務 |
| **邊緣 (Edge)** | 低延遲、資料不離場、即時決策；計算力有限 | IoT設備、智慧手機、即時推理、隱私敏感場景 |
| **內部部署 (On-Premise)** | 數據完全本地化、低延遲；初期投資高、擴展受限 | 高安全需求、合規要求、企業內部系統 |
| **混合架構 (Hybrid)** | 結合雲端+邊緣優勢 | 用雲端訓練、邊緣推理的組合 |

**2026年考試新增部署考點:**
- 邊緣運算 (Edge Computing) vs 批次/即時推論的適用場景
- LoRA微調、知識蒸餾、負載平衡等落地工程「概念」
- 數據漂移 (Data Drift) 監控的概念

### 效能管理 (conceptual level)

- **延遲 (Latency):** 從輸入到模型開始回應的時間。含首token時延 (Time to First Token) 和每token時延。
- **吞吐量 (Throughput):** 單位時間內模型輸出的token量 (token/秒)。吞吐量越高 = 基礎架構回報越高。
- **有效吞吐量 (Goodput):** 在維持目標延遲水準下，系統實際達成的有效吞吐量。比單純吞吐量更全面。
- **成本 (Cost):** 預訓練是單次成本；推理時每個token都產生成本。推理成本隨使用量持續增長。
- **模型監控:** 設定效能/成本異常告警 (如延遲變高、資源使用率過低)，及時響應。

### 2026年考試新增法規考點 (與本主題相關)
- **台灣人工智慧基本法 (2026-01-14生效):** 七大原則
- **歐盟AI法案 (EU AI Act):** 四級風險框架
- 高風險應用必須具備 Human-in-the-Loop (HITL) 的最終裁量權
- SynthID、C2PA 標準等AI安全合規議題

---

## Key Findings Summary

1. **鑑別式 vs 生成式是 L11401 核心:** 考試要求能根據應用場景判斷該用哪種AI，並能辨認常見模型屬於哪一類 (如 SVM = 鑑別式，VAE = 生成式)。這是最高頻考點。

2. **模型部署以概念層為主:** 初級考試要求了解 Cloud/Edge/On-Prem 三種部署方式的特點和適用場景，以及混合架構的概念。2026年新增邊緣運算 vs 即時推論場景的辨別。

3. **效能管理聚焦基本指標:** 延遲、吞吐量、成本三個維度是核心。初級不需深入計算，但需理解概念和其對部署決策的影響。

4. **考試趨勢朝實務與合規深化:** 2026年起因台灣AI基本法生效，考題開始納入治理、法規、風險框架。雖不是 L11401 主要範圍，但模型部署時的合規考量可能作為情境題出現。

5. **通過率約56-57%:** 考試有一定難度，考生應特別注意「陷阱選項」——例如把鑑別式模型誤歸為生成式，或混淆部署方式的適用場景。

---

## Scope Notes

### 超出初級範圍的內容 (標記為中級)
以下在研究中出現但屬於中級範圍，**不應納入本課內容**：

- **LoRA微調的技術細節** — 初級只需知道「存在微調技術讓模型適應特定任務」，不需解釋 Low-Rank Adaptation 的原理
- **知識蒸餾的實作** — 初級只需知道「可以把大模型壓縮成小模型」的概念
- **GAN/VAE/Diffusion Model 的內部架構** — 初級只需能辨認這些名稱屬於生成式模型，不需解釋 Generator/Discriminator 結構
- **P(y|x) vs P(x,y) 的數學推導** — 初級用自然語言說明即可：「鑑別式學分類邊界，生成式學資料分布」
- **CNN/RNN/LSTM/Transformer 架構細節** — 考試簡章提到這些屬於深度學習架構考點，但初級只需知道名稱和用途 (CNN=電腦視覺, RNN/LSTM=時序資料, Transformer=LLM基礎)，不需講內部結構
- **MLOps 完整流程** — 初級只需知道「模型部署後需要持續監控和管理」
- **同態加密 (Homomorphic Encryption)** — 屬於進階安全議題，初級不需涵蓋
- **負載平衡的技術實作** — 初級只需知道「分散工作量以維持效能」的概念

### 邊界模糊的內容 (謹慎處理)
- **偏差-變異權衡 (Bias-Variance Tradeoff):** 雖然是技術概念，但在考試中以概念題出現。建議用類比說明，不用數學。
- **召回率 (Recall) 等評估指標:** 初級考過相關題目。建議以場景題方式帶入（醫療漏診要用 Recall），不深入 confusion matrix 計算。
- **數據漂移 (Data Drift):** 2026年新增考點。初級層級只需知道「模型部署後，真實世界資料可能和訓練資料不同，需要監控」。

---

## Source Bibliography

### Official / Government
- [iPAS AI應用規劃師 官方網站](https://www.ipas.org.tw/AIAP)
- [iPAS 學習資源](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources)
- [經濟部產業技術司 科技新知](https://www.moea.gov.tw/MNS/doit/industrytech/IndustryTech.aspx?menu_id=13545&it_id=490)
- [科技大觀園 — 生成式AI和分辨式AI差異](https://scitechvista.nat.gov.tw/Article/C000003/detail?ID=c746ecd6-5e7d-4fc1-afe3-d91f2c06b992)

### Exam Community (Chinese)
- [CCChen L11401 專題](https://vocus.cc/article/67fcad07fd8978000158a066)
- [CCChen 2026考前總整理](https://vocus.cc/article/69bba7b6fd89780001b3df00)
- [CCChen 2026考前必讀更新](https://vocus.cc/article/69aee22dfd8978000194b35e)
- [CCChen 114年第三場考古題](https://vocus.cc/article/68a2c94afd897800015778df)
- [CCChen 114年第二場考古題](https://vocus.cc/article/6815f36afd8978000136ffeb)
- [CCChen 樣題114年9月版分析](https://vocus.cc/article/68cfb4f0fd89780001298b53)
- [CCChen 初級基本重點整理](https://vocus.cc/article/67fbbd48fd897800011d4267)
- [TN科技筆記 生成式AI導入評估](https://vocus.cc/article/67d822b7fd897800012b4067)
- [鑑別式AI與生成式AI 30個關鍵知識點](https://vocus.cc/article/67a2d997fd89780001452aa5)
- [darkthread 考古題 GitHub](https://darkthread.github.io/ipas-exam/)
- [yamol 線上試卷](https://yamol.tw/cat-iPAS%E2%97%86AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E2%97%86%E5%88%9D%E7%B4%9A-6731.htm)
- [東東 GCP 教學 iPAS 重點整理](https://dongdonggcp.com/2025/09/10/ipas-ai-planner-exam-ai-introduction/)

### Industry / Educational (English)
- [Coursera — Discriminative vs Generative Models](https://www.coursera.org/articles/discriminative-vs-generative-models)
- [GeeksforGeeks — Generative AI vs Discriminative AI](https://www.geeksforgeeks.org/artificial-intelligence/generative-ai-vs-discriminative-ai/)
- [DataCamp — Generative vs Discriminative Models](https://www.datacamp.com/blog/generative-vs-discriminative-models)
- [IBM — Edge AI vs Cloud AI](https://www.ibm.com/think/topics/edge-vs-cloud-ai)
- [Coursera — Edge AI vs Cloud AI](https://www.coursera.org/articles/edge-ai-vs-cloud-ai)
- [Google Developers — What is a Generative Model](https://developers.google.com/machine-learning/gan/generative)
- [Plain Concepts — Discriminative vs Generative AI](https://www.plainconcepts.com/discriminative-ai-vs-generative-ai/)

### Industry (Chinese)
- [工商時報 — 判別式AI和生成式AI差異](https://www.ctee.com.tw/news/20231028700002-431001)
- [天下雜誌 — 生成式AI是什麼](https://www.cw.com.tw/article/5135365)
- [Kdan — 生成式AI與分辨式AI](https://www.kdan.com/zh-tw/blog/about/generative-ai/)
- [2beasy — 生成式AI和分辨式AI差別](https://2beasy.com.tw/ai-%E6%87%89%E7%94%A8/the-difference-between-generative-ai-and-discriminative-ai/)
- [NVIDIA 博客 — 推理經濟學](https://blogs.nvidia.cn/blog/ai-inference-economics/)
