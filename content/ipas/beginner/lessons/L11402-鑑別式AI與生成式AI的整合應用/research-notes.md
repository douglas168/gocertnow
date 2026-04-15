# Research Notes: L11402 鑑別式AI與生成式AI的整合應用

> Research date: 2026-04-15
> Sources: iPAS official exam papers, vocus exam reviews, government tech portals, AWS/Google documentation, iThome, industry articles

## Official Sources

- [iPAS 114年第四梯次初級公告試題 (科目二)](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E7%94%9F%E6%88%90%E5%BC%8FAI%E6%87%89%E7%94%A8%E8%88%87%E8%A6%8F%E5%8A%83(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000507.pdf): 114年11月考試公告試題
- [iPAS 官方樣題 (114年1月版)](https://www.ipas.org.tw/DownloadFile.ashx?filename=e8d50f7f-17ce-4057-ad60-f42db15b20cd_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf&type=10): 官方樣題範例
- [iPAS 學習資源頁](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方學習指引與培訓資源
- [iPAS AI應用規劃師 科目一學習指引](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB(%E5%88%9D%E7%B4%9A)-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE1_%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E5%9F%BA%E7%A4%8E%E6%A6%82%E8%AB%961141203_20251222172144.pdf): 官方委託專家編寫的學習指引

## Community Insights (exam patterns)

- [CCChen 114年第三場考試心得](https://vocus.cc/article/68a2c94afd897800015778df): 08/16 考題回顧，包含鑑別式/生成式AI應用場景題
- [CCChen 第四場考前整理](https://vocus.cc/article/68f4e6c8fd8978000171c139): 11/01 考前重點整理
- [CCChen 2026年考前三份必讀文件](https://vocus.cc/article/69aee22dfd8978000194b35e): 115年3月考試準備
- [煎餃的調味實驗室 筆記使用指南](https://gyozalab.com/ipas-ai-complete-guide): 完整考試筆記
- [104學習 樣題練習](https://nabi.104.com.tw/ability/10049056/iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A(%E5%88%9D%E7%B4%9A)_%E6%A8%A3%E9%A1%8C(114%E5%B9%B43%E6%9C%88%E7%89%88)): 免費模擬測驗
- [阿摩線上測驗 iPAS AI應用規劃師](https://yamol.tw/cat-iPAS%E2%97%86AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E2%97%86%E5%88%9D%E7%B4%9A-6731.htm): 歷屆題庫與線上測驗

**Exam pattern observations:**
- 科目二 (生成式AI應用與規劃) 是L11402的主要考科
- 考題偏重「應用場景判斷」而非技術細節 — 給一個情境，判斷該用鑑別式還是生成式AI
- 114年第四場開始出現 Agent 系統與搜尋策略相關題目
- 合格率約56.6% (114年首次考試，1,226到考，694通過)
- 非相關背景考生建議60-70%時間放科目一，30-40%放科目二

## Application Domains Deep Dive

### Computer Vision (電腦視覺)

**Discriminative applications (鑑別式):**
- **影像分類 (Image Classification):** 辨識圖片中的物體類別 (貓/狗/車輛)
- **物件偵測 (Object Detection):** 在影像中定位並標記物體位置 (自駕車偵測行人、車輛)
- **人臉辨識 (Facial Recognition):** 身分驗證、門禁系統
- **產品瑕疵檢測 (Defect Detection):** 製造業品管，辨識產品外觀瑕疵
- **醫療影像判讀:** X光、CT、MRI 影像中的病灶辨識
- **車牌辨識:** 停車場、交通監控
- **語義分割 (Semantic Segmentation):** 將影像每個像素分類 (自駕車場景理解)
- **Deepfake偵測:** 辨別影片/照片是否為AI生成的假內容

**Generative applications (生成式):**
- **影像生成 (Image Generation):** 從文字描述生成圖片 (Midjourney, DALL-E, Stable Diffusion)
- **風格轉換 (Style Transfer):** 將照片轉換為不同藝術風格
- **超解析度 (Super-Resolution):** 將低解析度影像提升為高清
- **影像修復 (Image Inpainting):** 修補照片中損壞或缺失的區域
- **影像合成:** 更換髮色、表情、性別等面部特徵
- **合成數據生成:** 為訓練資料不足的情境生成模擬影像

**Integration examples (整合應用):**
- **自駕車:** 鑑別式AI做即時物件偵測 (行人、車輛、號誌) + 生成式AI生成模擬場景供訓練 (如不同天氣、光線條件)。工研院正在開發「高品質合成場景」與「擴增式真實場景」兩種方法
- **製造業品管:** 鑑別式AI做瑕疵分類 + GAN生成罕見瑕疵樣本來增強訓練資料
- **Deepfake攻防:** 生成式AI (GAN) 產生Deepfake + 鑑別式AI偵測Deepfake。趨勢科技的Deepfake Detector即是此例
- **醫療影像:** 鑑別式AI輔助醫師判讀 + GAN生成罕見病例的合成影像擴充訓練集

### Speech & Audio (語音與音訊)

**Discriminative applications (鑑別式):**
- **語音辨識 (ASR / Speech Recognition):** 將語音轉為文字 — Siri、Google Assistant、醫療語音轉錄 (如達宣醫聲通)
- **聲紋辨識 (Speaker Verification):** 確認說話者身分 — 銀行電話客服驗證
- **語音情緒分析:** 判斷說話者的情緒狀態 — 客服品質監控
- **音訊分類:** 環境音辨識、異常聲音偵測 (工廠設備預警)
- **語言偵測:** 判斷語音屬於哪種語言

**Generative applications (生成式):**
- **語音合成 (TTS / Text-to-Speech):** 將文字轉為自然語音 — WaveNet等神經網路語音合成
- **聲音複製 (Voice Cloning):** 用少量語音樣本模擬特定人的聲音
- **音樂生成:** AI作曲與音樂創作
- **語音翻譯:** 將一種語言的語音即時轉換為另一種語言的語音
- **音訊增強:** 降噪、音質提升

**Integration examples (整合應用):**
- **智慧客服系統:** ASR (鑑別式) 將客戶語音轉文字 → NLP理解意圖 → TTS (生成式) 將回覆轉為語音
- **內容審核:** ASR轉錄直播/短影音中的語音 (鑑別式) + 生成式AI摘要分析內容是否違規
- **即時翻譯系統:** 語音辨識 (鑑別式) → 機器翻譯 (生成式) → 語音合成 (生成式)
- **語音防詐:** 聲紋辨識 (鑑別式) 比對真實身分 + Deepfake語音偵測 (鑑別式) 辨別AI合成語音

### Text & NLP (文字與自然語言處理)

**Discriminative applications (鑑別式):**
- **情感分析 (Sentiment Analysis):** 判斷文字正面/負面/中性 — 品牌輿情監控
- **垃圾郵件過濾 (Spam Filtering):** 分類郵件為垃圾/非垃圾
- **文字分類 (Text Classification):** 新聞分類、客訴分類
- **命名實體辨識 (NER):** 從文字中辨識人名、地名、組織名
- **AI生成文字偵測:** 判斷文章是否為AI寫的

**Generative applications (生成式):**
- **文字生成:** ChatGPT、Gemini等LLM產生回覆、文章
- **摘要生成 (Summarization):** 將長文自動摘要
- **機器翻譯 (Machine Translation):** Google翻譯、DeepL
- **程式碼生成:** GitHub Copilot、Cursor
- **文案撰寫:** 行銷文案、社群貼文自動產生

**Integration examples (整合應用):**
- **RAG (檢索增強生成):** 鑑別式AI檢索相關文件 (語義搜尋) + 生成式AI基於檢索結果生成回答。企業應用的最佳實務
- **內容創作+審核:** 生成式AI撰寫文案 → 鑑別式AI做事實查核、品質評分、合規檢查
- **客服自動化:** 意圖分類 (鑑別式) 判斷客戶問題類型 → 生成式AI產生個性化回覆

### Other Domains (其他應用場域)

**Healthcare (醫療):**
- 台大醫院AI胰臟癌輔助偵測系統 (鑑別式) — 獲美國FDA突破性醫材認定
- GAN生成稀缺病患掃描影像，擴充訓練資料多樣性
- 亞東醫院+遠傳導入生成式AI於失智症照護諮詢
- 整合模式: 鑑別式AI輔助診斷 + 生成式AI撰寫報告/提供諮詢建議

**Finance (金融):**
- 鑑別式AI: 信用評分、詐欺偵測、異常交易監控
- 生成式AI: 投資報告撰寫、客戶服務對話
- **GAN防詐欺:** 美國運通利用GAN生成虛假交易資料 (生成式)，幫助訓練詐欺偵測模型 (鑑別式)。SAS揭露用GAN設計金融防詐欺模型的新作法
- 整合模式: GAN生成合成交易資料增強 + 鑑別模型偵測新型詐欺模式

**Manufacturing (製造業):**
- 鑑別式AI: 產品外觀瑕疵檢測、設備異常偵測 (預測性維護)
- 生成式AI: 產品設計自動生成、控制程式自動生成、智慧化人機介面
- 整合模式: 數位孿生 (Digital Twin) 結合生成式AI模擬 + 鑑別式AI品質控制

**Autonomous Driving (自動駕駛):**
- NVIDIA GTC 2026 宣布 Physical AI 結合圖形渲染、模擬與生成式AI打造虛擬世界
- 鑑別式AI: 即時物件偵測、場景理解、行為預測
- 生成式AI: 合成訓練場景、模擬極端工況
- NVIDIA Omniverse: 自駕車感測器模擬平台

**Education (教育):**
- 鑑別式AI: 學習行為分析、知識點掌握度評估
- 生成式AI: 個人化教材生成、自動出題、AI家教

**Entertainment (娛樂):**
- 鑑別式AI: 推薦系統 (Netflix/Spotify)、年齡/內容分級審核
- 生成式AI: 遊戲角色/場景生成、音樂創作、劇本撰寫

## Real-World Integration Patterns

### Pattern 1: 「生—鑑—監」閉環 (Generate-Discriminate-Monitor Loop)
生成式AI提效 → 鑑別式AI創值 → 監管控風險。形成企業AI應用的完整閉環。
- 生成式AI在行政、行銷、知識管理等**容錯高**場景表現突出
- 鑑別式AI負責分類、預測與判斷（品檢、人臉辨識、銷售預測、醫療影像），價值在於**精確與穩定**
- Source: [iT邦幫忙: 生成式 vs. 鑑別式：企業 AI 的雙軌策略](https://ithelp.ithome.com.tw/articles/10398516)

### Pattern 2: GAN 協作模式 (Generator-Discriminator Collaboration)
GAN是鑑別式+生成式AI整合的經典範例:
- 生成器 (Generator) = 生成式AI，目標是生成逼真的樣本
- 鑑別器 (Discriminator) = 鑑別式AI，目標是判斷樣本真偽
- 兩者對抗學習，互相提升能力
- 應用: 圖像生成、數據增強、風格轉換、超解析度
- Source: [旗標: 從理論到實例看GAN訓練](https://flag-editors.medium.com/%E5%BE%9E%E7%90%86%E8%AB%96%E5%88%B0%E5%AF%A6%E4%BE%8B-%E7%9C%8B-gan-%E6%98%AF%E6%80%8E%E9%BA%BC%E8%A8%93%E7%B7%B4%E5%87%BA%E4%BE%86%E7%9A%84-cdeb6e7d3ae3)

### Pattern 3: 合成數據增強 (Synthetic Data Augmentation)
生成式AI產生合成訓練數據 → 鑑別式AI用增強後的數據集訓練:
- 醫療: GAN生成稀缺病例影像
- 金融: GAN生成虛假交易模式訓練防詐模型
- 自駕: 生成式AI模擬罕見路況場景
- 製造: GAN生成罕見瑕疵樣本

### Pattern 4: 管線串接 (Pipeline Integration)
多個AI模型串聯，前段鑑別、後段生成 (或反之):
- ASR → NLP → TTS (語音客服)
- 物件偵測 → 場景描述生成 (視覺輔助)
- 文件檢索 → RAG回答生成 (知識問答)
- 內容生成 → 品質分類/審核 (內容安全)

### Pattern 5: RAG 檢索增強生成
鑑別式AI的語義搜尋 + 生成式AI的回答生成:
- 企業知識庫: 檢索相關文件 + 生成精確回答
- 微調 (Fine-tuning) 固化品牌特性 + RAG檢索最新資訊 = 企業最佳實務
- Source: [AWS RAG說明](https://aws.amazon.com/what-is/retrieval-augmented-generation/)

## Key Findings Summary

1. **考試重點在「場景判斷」:** 給定一個應用情境，考生需判斷應使用鑑別式AI、生成式AI、還是兩者整合。不考技術實作細節。

2. **三大應用領域必考:** 電腦視覺 (CV)、語音/音訊 (Speech)、文字/NLP (Text) 是考綱明確列出的領域。每個領域都有明確的鑑別式 vs 生成式對應。

3. **GAN是整合的經典考點:** GAN的生成器+鑑別器是鑑別式與生成式AI協作的最典型範例，也是唯一在單一模型架構中同時包含兩者的設計。

4. **合成數據增強是高頻整合模式:** 用生成式AI產生訓練數據來提升鑑別式AI效果，在醫療、金融、自駕車領域都有實際案例。

5. **「生—鑑—監」閉環是企業AI雙軌策略的核心:** 生成式AI適合容錯高的場景 (文案、摘要)，鑑別式AI適合需要精確穩定的場景 (品檢、診斷)。兩者互補而非替代。

6. **RAG是2024-2026年最熱門的整合架構:** 結合鑑別式的檢索能力與生成式的回答能力，是企業應用中最常見的整合模式。114年第四場已出現相關考題。

7. **真實台灣案例加分:** 台大醫院AI胰臟癌偵測 (鑑別式)、達宣醫聲通語音辨識 (鑑別式)、遠傳+亞東生成式AI照護諮詢 (生成式) 都是考試可能引用的本土案例。

## Scope Notes

以下內容涉及但**不應在初級課程中深入講解** (屬於中級範疇):
- GAN的內部訓練機制 (loss function、反向傳播、Nash均衡等) — 初級只需知道「生成器產生假數據，鑑別器判斷真偽，兩者互相提升」的概念
- 神經網路架構細節 (CNN層結構、Transformer attention機制) — 初級只需知道「哪些任務用哪類AI」
- 模型微調 (Fine-tuning) 的技術步驟 — 初級只需知道「可以透過微調讓模型適應特定需求」
- RAG的技術實作 (向量資料庫、embedding、chunk策略) — 初級只需知道「RAG結合檢索與生成來回答問題」
- 特定模型的部署與優化 — 初級只需知道「模型需要部署和監控」(L11401已涵蓋)

**Safe for beginner level:**
- 各領域的鑑別式 vs 生成式AI應用分類
- 真實世界整合案例的「是什麼」和「為什麼」
- GAN的概念性運作方式 (不涉及數學)
- 產業應用場景與商業價值
- 合成數據增強的概念與用途
