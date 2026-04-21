# L22403 大數據在生成式AI中的應用 Study Guide

## Section 1: Exam Item Mapping

> 對應評鑑範圍：**L22403 大數據在生成式AI中的應用**（科目二 L22 擇一 — 資料分析組）

- 本主題從「資料面」理解生成式 AI，不是從模型數學推導切入。
- 命題焦點通常落在 4 類：
  - 大規模預訓練語料庫（Pretraining Corpus）的規模、來源、品質與授權。
  - 語料處理流程：清理、去重、品質過濾、分詞（Tokenization）。
  - 三種資料典範比較：預訓練（Pretraining）vs 微調（Fine-tuning）vs 檢索增強生成（Retrieval-Augmented Generation, RAG）。
  - 資源配置與 API 辨識：分散式訓練（Distributed Training）與 Hugging Face `pipeline` / `tokenizer` / `model.generate()`。
- 這一課最容易跟其他章節混淆的地方：
  - 不講 Transformer 權重細節，那是 L21103。
  - 不講梯度下降、損失函數數學，那是 L23 系列。
  - tokenizer 在本課是「資料處理管線最後一步」。
  - `model.generate()` 在本課是「API 介面辨識」。
  - RAG 的向量索引只講資料流，不展開向量庫內部索引結構。
- 應試思維要先分清楚：
  - 題目在問「拿什麼資料」？
  - 題目在問「資料如何處理」？
  - 題目在問「哪一種典範最適合」？

---

## Section 2: 關鍵概念總覽圖 (Knowledge Tree)

```text
🤖 L22403 大數據在生成式AI中的應用
│
├── 一、大規模語料庫 Pretraining Corpus
│   ├── 📖 規模 / 品質 / 多樣性 / 授權合規
│   ├── 📚 Common Crawl / C4 / The Pile / ROOTS
│   ├── 📚 RedPajama / Dolma
│   ├── 🔧 語料清理：quality filter / dedup / perplexity filter
│   └── ⚠️ 陷阱：資料越大不等於越乾淨；可用不等於可商用
│
├── 二、三大典範資料需求 Data Paradigm Comparison
│   ├── 🏗️ 預訓練 Pretraining：TB-scale corpus / 兆 token
│   ├── 🛠️ 微調 Fine-tuning：K–M 指令資料 / 偏好資料
│   ├── 🪶 PEFT / LoRA：少量資料 + 少量可訓參數
│   ├── 🔎 RAG：文件分塊 + embedding + 向量資料庫（Vector Store）
│   └── ⚠️ 陷阱：RAG 不是再訓練；LoRA 不是低品質版微調
│
├── 三、分詞技術 Tokenization
│   ├── 🔡 BPE / WordPiece / SentencePiece / tiktoken
│   ├── 🔄 清理後 → tokenizer → model input
│   ├── 🧰 API 視角：tokenizer("prompt", return_tensors="pt")
│   └── ⚠️ 陷阱：vocabulary size ≠ corpus size
│
├── 四、分散式訓練 Distributed Training
│   ├── 🧱 Data Parallelism (DDP)：模型複製，多卡分批
│   ├── 🧩 Tensor Parallelism：單層切到多 GPU
│   ├── 🚚 Pipeline Parallelism：模型分段接力
│   └── ⚠️ 陷阱：切資料、切 layer、切 stage 不能混
│
└── 五、HF Transformers API
    ├── 🧪 pipeline task names
    │   ├── text-generation / summarization
    │   ├── question-answering / translation
    │   ├── text2text-generation / feature-extraction
    │   └── fill-mask
    ├── 🔄 tokenizer → model.generate()
    └── ⚠️ 陷阱：看到 max_new_tokens 是生成參數，不是訓練超參數
```

---

## Section 3: Core Concepts

### 3.1 大規模預訓練語料庫（Pretraining Corpus）

- 生成式模型（Generative Model）在預訓練（Pretraining）階段，吃的是超大規模語料，不是幾千筆標註資料。
- 這些語料通常來自：
  - 開放網頁抓取（Web Crawl）
  - 論文與技術文件
  - 程式碼與論壇
  - 書籍、百科、問答站
  - 多語資料集

🔥 高頻觀念：
- 預訓練看的是「量級 + 品質 + 多樣性 + 合規」。
- 不是只要資料夠大，模型就一定更好。

#### 3.1.1 規模（Scale）

- Common Crawl 是最常見的大型網頁語料來源之一。
- 考試常用的教學記法：
  - Common Crawl 原始 HTML 約 `~100TB` 等級。
  - 經過品質過濾後形成 C4（Colossal Clean Crawled Corpus），可縮到 `~15TB tokens` 等級的可訓練語料。
- 研究筆記也提醒：單次官方 crawl 在 2025-03 已達 `455 TiB uncompressed`、`2.74B web pages`，代表原始網頁規模極大，但不能直接拿去訓練。

🗣️ 白話說明：
這像你在蝦皮搜尋「筆電桌」，全站商品很多，但真正能下單的，是經過你篩選價格、評價、出貨地、尺寸後留下來的那些。原始網頁量很大，不等於可直接餵模型的乾淨資料量也同樣大。

#### 3.1.2 品質（Quality）

- 高品質語料要避免：
  - 廣告頁、導航頁、錯碼頁
  - 短到幾乎沒內容的頁面
  - 重複內容農場
  - 被截斷（Truncated）的頁面
  - 語法混亂或極度低資訊密度的文本
- 品質差的資料會讓模型學到雜訊、重複句、模板化內容，甚至增加 memorization 風險。

#### 3.1.3 多樣性（Diversity）

- 大語料不是只追求英文網頁量，還要看來源與語言分布是否多樣。
- 代表性資料集：
  - The Pile：`825GB`，來自 `22` 種來源，如 GitHub、arXiv、PubMed 等。
  - ROOTS：`1.6TB`，多語料；研究筆記採官方 paper page 為 `59 languages`。
  - RedPajama：`1.2T tokens`，主打 fully-open pretraining dataset。
  - Dolma：研究筆記採官方 dataset card 約 `1.715T tokens`；課堂常見口訣可記成 `3T` 等級的大型開放語料代表。

ASCII 比例感：

```text
資料量級感（概念圖）

微調資料         : 10K ─────────────── 100K ─────────────── 1M examples
RAG 文件索引     : 10^3 ────────────── 10^6 chunks
預訓練語料       : 100GB ───────────── 1TB ─────────────── 1T+ tokens
```

🗣️ 白話說明：
如果把預訓練想成一個台灣大學生在準備國考，預訓練像是把圖書館、新聞、論文、論壇、程式碼庫都大量讀過；微調比較像補一套特定題庫；RAG 則像考場旁邊開書查你公司的 SOP。

#### 3.1.4 授權合規（Licensing and Compliance）

- 大規模語料處理不能只看「抓得到」，還要看：
  - 授權是否允許訓練使用
  - 是否含個資（PII）
  - 是否有版權風險
  - 是否有爭議來源或不當內容
- ROOTS、RedPajama、Dolma 之所以常被拿來教學，不只是因為大，也因為比完全野生抓網頁更強調治理（Governance）與資料責任。

🔥 高頻觀念：
- 「Open on the internet」不等於「Free for commercial model training」。

#### 3.1.5 常見預訓練語料庫速記

| 資料集 | 常見記憶點 | 考試上怎麼判斷 |
| --- | --- | --- |
| Common Crawl | 超大型原始網頁抓取 | 看到 crawl、HTML、巨大 web corpus，先想到預訓練原料 |
| C4 | Common Crawl 經清理過的版本 | 看到 clean crawled corpus、quality filter，想到 C4 |
| The Pile | 825GB、22 sources | 看到 curated mixture、論文/程式碼/論壇混合 |
| ROOTS | 1.6TB、多語言 | 看到多語、資料治理、BigScience 脈絡 |
| RedPajama | 1.2T tokens | 看到 fully-open、再現 LLaMA-style pretraining data |
| Dolma | 大型開放預訓練語料 | 看到 open corpus、AllenAI、大規模 tokens |

---

### 3.2 語料清理與去重（Corpus Cleaning and Deduplication）

> 📊 **圖表：** 語料清理管線 → 詳見 [diagrams/02-corpus-cleaning-pipeline.mmd](diagrams/02-corpus-cleaning-pipeline.mmd)

- 語料進模型前，不會直接原封不動丟進去。
- 典型前處理流程：

```text
Raw Data
  ↓
Format normalization
  ↓
Language / length filtering
  ↓
Quality filtering
  ↓
Deduplication
  ↓
Perplexity / heuristic filtering
  ↓
Tokenizer
```

#### 3.2.1 去重（Deduplication）

- 去重（Deduplication）是為了減少重複樣本、降低 memorization、避免 train-test overlap。
- 三層最常考：
  - exact-match deduplication：完全相同文件或完全相同字串。
  - exact-substring deduplication：長段完全重複片段。
  - near-deduplication：近似重複，不完全一樣但高度相似。

#### 3.2.2 MinHash（Min-wise Hashing）

- MinHash 常搭配局部敏感雜湊（Locality-Sensitive Hashing, LSH）做 near-duplicate detection。
- 核心想法：
  - 不用逐字比對全部文件。
  - 先把文件轉成 shingles / n-grams。
  - 再用 hash 簽名估計相似度。
  - 相似度夠高，就當作近似重複。
- 教學上可記：
  - MinHash 適合大規模資料集做近似去重。
  - 常能把訓練資料縮減 `~20%–30%`，這是常見實務量級，不代表資料浪費，而是把重複噪音拿掉。

ASCII 概念圖：

```text
Doc A: [租屋 押金 一個月 可養貓 近捷運]
Doc B: [租屋 押金1個月 可養貓 靠近捷運]

字面不完全相同
        ↓
shingle / hash
        ↓
MinHash signature 相近
        ↓
判定 near-duplicate
```

🗣️ 白話說明：
像你在 104 或租屋社團看到兩則貼文，一則寫「近台大捷運站，可養貓」，另一則寫「靠近捷運，可養寵物」，乍看不同，其實本質幾乎同一則廣告。MinHash 就像幫你快速抓出「換句話說的重複貼文」。

#### 3.2.3 品質過濾（Quality Filtering）

- quality filtering 會依規則移除低品質樣本，例如：
  - 過短或過長文本
  - HTML 殘留太多
  - 字元重複過高
  - 幾乎沒有自然語言內容
  - 黑名單來源
- 常見是 heuristic rules 加上統計特徵。

#### 3.2.4 困惑度過濾（Perplexity Filtering）

- 困惑度（Perplexity）在本課只當成資料篩選指標，不講數學推導。
- 用法是：
  - 先用一個語言模型估計文本自然度。
  - 極高 perplexity 可能代表文本很怪、亂碼、低品質、語言混亂。
  - 極低 perplexity 有時也可能代表模板化重複內容。
- 所以 perplexity filtering 是用來補強 quality filtering，不是單獨萬能指標。

🔥 高頻觀念：
- 去重不是可有可無。
- 大型資料集去重後明顯縮水是正常現象。

---

### 3.3 分詞技術（Tokenization）

> 📊 **圖表：** 分詞器技術比較 → 詳見 [diagrams/05-tokenizer-comparison.mmd](diagrams/05-tokenizer-comparison.mmd)

- 分詞（Tokenization）是把文字切成模型能吃的 token。
- 在本課位置是：
  - 清理後的最後一步
  - 模型輸入前的轉換
  - API 使用時的 `tokenizer(...)`

ASCII 流程：

```text
文字 Text
  ↓
Tokenizer
  ↓
Token IDs
  ↓
Model Input
```

#### 3.3.1 子詞分割（Subword Tokenization）為何重要

- 如果只用 word-level：
  - 詞彙表會爆大。
  - 遇到新字或罕見詞很難處理。
- 如果只用 character-level：
  - 序列太長。
  - 計算成本高。
- 所以主流做法是 subword tokenization，在詞與字之間取平衡。

#### 3.3.2 位元組對編碼（Byte-Pair Encoding, BPE）

- BPE 的核心是：
  - 從較小單位開始。
  - 反覆合併語料中最常一起出現的 byte pair / symbol pair。
  - 逐步形成常見子詞。
- GPT-2、GPT-4 常被歸在 BPE 路線；LLaMA 1/2 使用 SentencePiece-BPE，LLaMA 3 則改為 tiktoken。

簡化示意：

```text
l o w
l o w e r
n e w e s t

最常見 pair:
"e" + "s" -> "es"
"l" + "o" -> "lo"
"lo" + "w" -> "low"
...
```

🗣️ 白話說明：
像 LINE 常打「等等」「晚點」「先吃」這種固定片語，BPE 就像手機鍵盤發現你常把某些字組一起打，乾脆把它當一個更好用的片段來記。

#### 3.3.3 詞片段（WordPiece）

- WordPiece 跟 BPE 很像，都是子詞分割。
- 差別在於：
  - BPE 比較強調「頻率最高就合併」。
  - WordPiece 比較強調「哪個 merge 能讓訓練語料 likelihood 更好」。
- BERT 使用的是 WordPiece。
- DistilBERT 為 BERT 的蒸餾版本，同樣使用 WordPiece tokenizer。

🔥 高頻記憶：
- BERT → WordPiece

#### 3.3.4 SentencePiece（分詞框架）

- SentencePiece 是語言無關（Language-agnostic）的 tokenizer framework。
- 重點：
  - 可直接對 raw text 操作。
  - 不一定先依空格做 pre-tokenization。
  - 特別適合中文、日文等空格不明顯語言，或多語模型。
- T5、mT5 常用 SentencePiece。

注意：
- SentencePiece 是一個框架。
- 它內部可支援 BPE 或 Unigram 等子詞模型。
- 所以「SentencePiece」不等於「SentencePiece Unigram」。

🗣️ 白話說明：
如果你用英語系方法硬要求每種語言先用空格切詞，中文就很尷尬。SentencePiece 像是直接看整段文字自己學切法，不先假設每種語言都有空格。

#### 3.3.5 tiktoken

- `tiktoken` 是 OpenAI 使用的 fast BPE tokenizer 實作。
- 課堂常見記法：
  - GPT-4 / GPT-3.5 常見 `cl100k_base`（GPT-4o 起改為 `o200k_base`，詞彙量約 `200k`）
  - vocabulary size 約 `100,277`
- 本課重點不是背實作細節，而是知道：
  - `tiktoken` 屬 tokenizer。
  - 它決定文字如何轉成 token。
  - token 長度會影響上下文長度、切塊策略與成本估算。

🔥🔥 高頻陷阱：
- vocabulary size（詞彙表大小）≠ corpus size（語料量）。
- `100,277` 是 vocabulary 的概念，不是代表模型只看過十萬個 token。

#### 3.3.6 tokenizer API 視角

- 在 Hugging Face 裡，tokenizer 常見用法：

```python
inputs = tokenizer("prompt", return_tensors="pt")
```

- 這一步做的事是：
  - 把字串轉成 token ids
  - 包成 PyTorch tensor
  - 讓後面的 model 可以直接吃

---

### 3.4 三大資料典範比較（Pretraining vs Fine-tuning vs RAG）

> 📊 **圖表：** 三大典範資料需求金字塔 → 詳見 [diagrams/01-data-paradigm-pyramid.mmd](diagrams/01-data-paradigm-pyramid.mmd)

- 這是 L22403 最重要的主軸。
- 你一定要能分清楚三種典範在「資料來源、資料量、更新方式、成本」上的差異。

ASCII 概念圖：

```text
預訓練 Pretraining
  大量通用語料 → 學通用語言能力

微調 Fine-tuning
  任務/領域資料 → 調整模型行為

RAG
  外部文件庫 → 查資料後再生成
```

#### 3.4.1 預訓練（Pretraining）

- 用海量通用語料建立基礎能力。
- 常見量級：
  - TB-scale corpus
  - 兆 token（Trillion-token）等級
- 目標：
  - 學語言規律
  - 學一般知識分布
  - 建立通用生成能力

#### 3.4.2 微調（Fine-tuning）

- 微調是用較小但更有任務針對性的資料，讓模型更符合目標場景。
- 最常見資料類型：
  - 監督式微調（Supervised Fine-Tuning, SFT）資料
  - 偏好資料（Preference Data），常用於 RLHF 流程
- 常見量級：
  - SFT：`10K–100K` instruction-response pairs 很常見
  - 也可能到數十萬筆，例如 OpenHermes 約 `242K`
  - Alpaca 是 `52K`
  - FLAN 是多任務 instruction tuning 代表，規模可到 `1.8K tasks`

#### 3.4.3 RAG

- 檢索增強生成（Retrieval-Augmented Generation, RAG）不是把新知識硬塞進權重。
- 它做的是：
  - 先把文件切塊
  - 轉成 embedding
  - 放入向量資料庫（Vector Store）
  - 問問題時先檢索，再把相關內容帶進 prompt

🔥🔥 高頻觀念：
- 預訓練是「先大量讀」。
- 微調是「重新調教回答方式」。
- RAG 是「考試時開書查」。

🗣️ 白話說明：
如果你要做一個台灣租屋客服助理：
- 預訓練像它先讀過整個網路世界。
- 微調像你再拿房東客服對話資料，教它怎麼回更符合品牌口吻。
- RAG 像你把最新租約條款、房源列表、押金政策接到知識庫，回答時先查再說。

#### 3.4.4 為什麼三者資料量差這麼大

- 預訓練要學一般語言分布，所以需要極大量、多來源資料。
- 微調只是在已經有基礎能力的模型上做行為調整，所以通常只需 K 到 M 等級樣本。
- RAG 根本不重新訓練核心權重，所以重點不在樣本筆數，而在文件品質、切塊與檢索準確性。

---

### 3.5 微調資料（SFT、RLHF、PEFT / LoRA）

#### 3.5.1 監督式微調（Supervised Fine-Tuning, SFT）

- SFT 是拿「指令 → 回答」配對資料，直接教模型怎麼回答。
- 常見資料集：
  - Alpaca：`52K` 指令資料
  - FLAN：多任務 instruction tuning
  - OpenHermes：約 `242K entries`
- 典型格式：

```text
Instruction: 幫我總結這篇會議記錄
Input: ...
Response: ...
```

🔥 高頻考法：
- 看到 instruction-response pairs，先想到 SFT。

#### 3.5.2 人類回饋強化學習資料（Reinforcement Learning from Human Feedback, RLHF）

- RLHF 在資料面最常看到的是偏好資料（Preference Data）。
- 結構常是：

```text
prompt
chosen response
rejected response
```

- 這類資料不是一般單一標準答案，而是比較「哪個回答更好」。
- 題目若提到 `chosen/rejected pairs`，多半是在考偏好資料或 reward modeling。

#### 3.5.3 參數高效微調（Parameter-Efficient Fine-Tuning, PEFT）

- PEFT 是只調一小部分參數，不做 full fine-tuning。
- 優點：
  - 記憶體成本較低
  - 訓練成本較低
  - 資料需求通常也較保守

#### 3.5.4 低秩自適應（Low-Rank Adaptation, LoRA）

- LoRA 是 PEFT 裡最常見的方法之一。
- 核心記法：
  - 不直接更新全部原始權重
  - 加上低秩（Low-Rank）adapter matrices
  - 常見 rank `r = 4–64`
  - 官方常見預設可記 `r=8`
- 實務上，LoRA 常用於：
  - 僅有 `~1K–10K` 指令資料也想做特定任務適配
  - GPU 預算有限
  - 想快速迭代多個領域版本

🔥🔥 高頻陷阱：
- 低秩（Low-Rank）是參數化方式，不是品質比較低。

🗣️ 白話說明：
LoRA 像你不把整本教科書重寫，只在旁邊貼一層可替換重點貼紙。原書大部分不動，但你能針對「法律客服版」「電商客服版」各貼一組不同註解。

---

### 3.6 RAG 資料管線（RAG Data Pipeline）

> 📊 **圖表：** RAG 資料管線架構 → 詳見 [diagrams/03-rag-pipeline.mmd](diagrams/03-rag-pipeline.mmd)

- RAG 的重點不是再訓練，而是把外部知識整理成可檢索格式。

ASCII 流程：

```text
Documents
  ↓
Chunking
  ↓
Embedding
  ↓
向量資料庫（Vector Store）
  ↓
Retrieval
  ↓
Prompt Augmentation
  ↓
Generation
```

#### 3.6.1 文件分塊（Chunking）

- 切塊（Chunking）是把長文件切成較小片段，便於 embedding 與檢索。
- 常見策略：
  - fixed-size chunking：固定長度切塊，常見 `512 tokens`。
  - semantic chunking：依句子、段落、語意邊界切。
  - recursive chunking：先大後小遞迴切，LangChain splitter 常見。
  - recursive character chunking：recursive chunking 的常見實作型態，依字元與分隔符逐層回退切分。
- 研究筆記也提供實務參考：
  - OpenAI Retrieval 預設 `800 tokens` + `400 overlap`
  - Weaviate baseline 常見 `100–200 words` + overlap

🔥 高頻觀念：
- chunk 太大：噪音多、檢索不準。
- chunk 太小：上下文破碎、語意不足。

#### 3.6.2 嵌入（Embedding）

- embedding 是把文字轉成向量表示。
- 目的不是直接生成文字，而是讓語意相近的片段在向量空間中彼此接近。

#### 3.6.3 向量資料庫（Vector Store）

- 常見工具：
  - FAISS
  - Chroma
  - Weaviate
- 在本課只要記：
  - 它負責存放與索引 embeddings
  - 它支撐 similarity search / semantic retrieval
  - 它是 RAG 的檢索基礎設施，不是訓練模型本身

#### 3.6.4 檢索（Retrieval）與生成（Generation）

- 查詢時流程通常是：
  - 問題先做 embedding
  - 到向量資料庫找相近 chunks
  - 把檢索結果塞回 prompt
  - 再由生成模型回答

🗣️ 白話說明：
像 Uber Eats 客服機器人被問「今天會員折價券能不能跟店家優惠併用」，它不一定早就把最新活動規則記在權重裡，而是先去查最新活動文件，再根據查到的段落回答。

---

### 3.7 分散式訓練資料策略（Distributed Training Strategy）

> 📊 **圖表：** 分散式訓練三大策略比較 → 詳見 [diagrams/04-distributed-training-strategies.mmd](diagrams/04-distributed-training-strategies.mmd)

- 當模型或資料大到單卡放不下，就要分散式訓練。
- L22403 只需看「切分對象」與「適用情境」，不展開通訊數學。

#### 3.7.1 資料平行（Data Parallelism, DDP）

- 每張 GPU 都放一份相同模型。
- 每張 GPU 吃不同 mini-batch。
- 反向傳播後再平均梯度（Gradient Averaging）。

ASCII 圖：

```text
GPU1: Model A + Batch 1
GPU2: Model A + Batch 2
GPU3: Model A + Batch 3
GPU4: Model A + Batch 4
          ↓
   gradients averaged
```

🔥🔥 高頻記憶：
- 同一模型複製多份
- 不同卡看不同資料

#### 3.7.2 張量平行（Tensor Parallelism）

- 單一大型 layer 或大型 tensor 切到多張 GPU 上算。
- 適合：
  - 單層太大
  - 單卡放不下
- Megatron-LM 是經典代表。

ASCII 圖：

```text
Layer W
  ├─ part 1 → GPU1
  ├─ part 2 → GPU2
  ├─ part 3 → GPU3
  └─ part 4 → GPU4
```

#### 3.7.3 流水線平行（Pipeline Parallelism）

- 把模型層切成多個 stage，分散到不同 GPU。
- micro-batch 像接力一樣往後傳。
- 常見代表：
  - GPipe
  - PipeDream
- 缺點：
  - 會有 bubble overhead，代表某些 stage 某些時間可能在等。

ASCII 圖：

```text
Stage 1 (GPU1) -> Stage 2 (GPU2) -> Stage 3 (GPU3) -> Stage 4 (GPU4)
   mb1              mb1              mb1              mb1
   mb2              mb2              mb2
   mb3              mb3
```

🗣️ 白話說明：
Data parallelism 像 4 家分店各自煮一樣的便當，但服務不同客人。
Tensor parallelism 像一份超大訂單切給 4 個廚師同時處理同一道菜的不同部分。
Pipeline parallelism 像中央廚房分成洗菜、切菜、炒菜、裝盒四段接力。

---

### 3.8 Hugging Face Transformers API 與 tokenizer → model.generate() 流程

#### 3.8.1 `pipeline(...)` 高階介面

- `pipeline(...)` 是 Hugging Face 的高階 API。
- 本課常見 task names：
  - `"text-generation"`
  - `"summarization"`
  - `"translation_en_to_fr"`
  - `"question-answering"`
  - `"text2text-generation"`
  - `"feature-extraction"`
  - `"fill-mask"`

🔥 高頻考法：
- 題目會給 task name，問它對應什麼任務。
- 或給你應用情境，問該用哪個 pipeline。

#### 3.8.2 手動流程：tokenizer → model.generate()

- 比起 `pipeline(...)`，手動流程更清楚顯示資料經過什麼步驟。

```python
inputs = tokenizer("prompt", return_tensors="pt")
output = model.generate(
    inputs["input_ids"],
    max_new_tokens=100,
    do_sample=True,
    temperature=0.7
)
```

- 這段程式在本課要會辨識：
  - `tokenizer(...)`：把文字變成模型輸入格式
  - `return_tensors="pt"`：輸出 PyTorch tensor
  - `model.generate(...)`：叫模型生成結果
  - `max_new_tokens`：最多生成多少新 token
  - `do_sample=True`：啟用 sampling
  - `temperature=0.7`：調整輸出隨機性

#### 3.8.3 為什麼這在 L22403 也會考

- 因為它是資料流觀點：
  - 原始文字先被 tokenizer 編碼
  - 再進模型
  - 生成結果再 decode 回文字
- 考的是你能不能辨認資料處理管線，不是要你推導解碼數學。

ASCII 流程：

```text
Prompt
  ↓ tokenizer(...)
input_ids / attention_mask
  ↓ model.generate(...)
generated ids
  ↓ tokenizer.decode(...)
Answer text
```

🗣️ 白話說明：
像你在 LINE 丟一句「幫我整理會議重點」，tokenizer 像翻譯成機器看得懂的編號；`model.generate()` 才是根據這些編號吐出新內容。

---

## Section 4: Comparison Tables (易混淆概念)

### 4.1 BPE vs WordPiece vs SentencePiece vs tiktoken

| 方法 | 演算法核心 | 訓練語料處理方式 | 代表模型 | 特性 |
| --- | --- | --- | --- | --- |
| BPE | 反覆合併最常見 byte/symbol pairs | 通常先有清理後語料，再學 merge 規則 | GPT-2、GPT-4、LLaMA 3 | 經典 subword；常被大語言模型採用 |
| WordPiece | 類似 BPE，但 merge 選擇偏向 likelihood 最大化 | 依語料統計學得子詞 | BERT、DistilBERT | 常見於 encoder 路線；考試常跟 BERT 綁定 |
| SentencePiece | framework，可在 raw text 上跑 BPE 或 Unigram | 不一定先依空格分詞 | T5、mT5、多語模型、LLaMA 1/2 | 語言無關；適合中文/日文/多語 |
| tiktoken | OpenAI 的 fast BPE implementation | 對應 OpenAI 模型編碼規則 | GPT-4 / GPT-3.5 常見 `cl100k_base`（GPT-4o 起改為 `o200k_base`） | API 與成本估算常見；不是新的語言學派 |

### 4.2 預訓練 vs 全量微調（Full Fine-tuning）vs PEFT/LoRA vs RAG

| 項目 | 預訓練 | 全量微調 | PEFT / LoRA | RAG |
| --- | --- | --- | --- | --- |
| 資料量 | TB-scale / 兆 token | 常見 10K–100K，亦可更高 | 常見 1K–10K 起步，也可數萬 | 文件切塊後索引，重點不在訓練樣本數 |
| 訓練成本 | 最高 | 高 | 低到中 | 不需重新訓練基礎模型 |
| 修改模型權重 | 是 | 是 | 是，但只改少量參數 | 否 |
| 知識更新方式 | 重跑大規模訓練 | 重訓特定任務版本 | 換 adapter 或再訓少量參數 | 更新文件庫即可 |
| 適用場景 | 建立基礎能力 | 深度改變行為與領域能力 | 預算有限、快速客製 | 知識常更新、需可追溯回答 |

### 4.3 Data Parallelism vs Tensor Parallelism vs Pipeline Parallelism

| 方法 | 分割方式 | 適用場景 | 常見工具/代表 | 溝通開銷 |
| --- | --- | --- | --- | --- |
| Data Parallelism | 切 mini-batch，模型複製到每卡 | 模型放得下單卡，但想加速訓練 | DDP | 梯度同步開銷 |
| Tensor Parallelism | 單層 tensor 切到多卡 | 單層太大，單卡放不下 | Megatron-LM | 層內通訊高 |
| Pipeline Parallelism | 模型層分 stage | 模型整體太深太大 | GPipe、PipeDream | stage 等待與 bubble overhead |

### 4.4 RAG vs 微調（外掛知識 vs 烙入權重）

| 比較面向 | RAG | 微調 |
| --- | --- | --- |
| 核心方法 | 外部檢索後再生成 | 把新行為/知識調進權重 |
| 是否改模型權重 | 否 | 是 |
| 更新速度 | 快，更新文件即可 | 慢，要重訓 |
| 可追溯性 | 高，可回看檢索文件 | 低，知識埋在參數裡 |
| 適合情境 | FAQ、知識庫、政策文件常更新 | 風格、格式、固定任務行為調整 |

---

## Section 5: 口訣 / Mnemonics

### 5.1 三大典範助記

- `預先讀、微調答、RAG 先查再回答`
- 進一步展開：
  - 預訓練：先大量讀世界
  - 微調：再把回答習慣調整好
  - RAG：回答前先翻公司文件

### 5.2 分詞器對應模型速記

- `BPE 抓 GPT，WP 抓 BERT，SP 抓 T5，TK 接 OpenAI`
- 拆解：
  - BPE → GPT-2 / GPT-4 / LLaMA 3
  - WordPiece → BERT / DistilBERT
  - SentencePiece → T5 / mT5 / LLaMA 1/2 / 多語言
  - tiktoken → OpenAI 模型編碼

### 5.3 分散式訓練三策略

- `資料分批、張量分層、流水分段`
- 拆解：
  - Data parallelism：切資料批次
  - Tensor parallelism：切單層張量
  - Pipeline parallelism：切模型階段

### 5.4 RAG 管線步驟助記

- `切、嵌、存、找、補、答`
- 對應：
  - 切：chunking
  - 嵌：embedding
  - 存：向量資料庫（Vector Store）
  - 找：retrieval
  - 補：prompt augmentation
  - 答：generation

### 5.5 去重流程助記

- `先清、再重、再怪、最後切`
- 對應：
  - 先清：quality filtering
  - 再重：deduplication
  - 再怪：perplexity filtering
  - 最後切：tokenization

---

## Section 6: 考試陷阱 (Exam Traps)

### 6.1 vocabulary size ≠ corpus size

- ❌ `cl100k_base` 大約 100,277，就代表模型只用十萬多 token 訓練
- ✅ 100,277 指的是 vocabulary size；預訓練 corpus 可能是數千億到數兆 token

### 6.2 LoRA「低秩」≠「低品質」

- ❌ LoRA 是簡化版，所以效果一定比較差
- ✅ LoRA 的「低秩」是在說參數更新形式；它通常更省資源，不等於一定低品質

### 6.3 RAG 不修改模型權重 vs 微調修改模型權重

- ❌ 把公司文件丟進向量資料庫，就等於模型學會新知識了
- ✅ RAG 是檢索外部知識再回答；微調才是把知識或行為調進權重

### 6.4 Data parallelism vs model parallelism 使用場景對調

- ❌ Data parallelism 是把大型 layer 切開給多卡算
- ✅ 那是 tensor/model parallelism；Data parallelism 是同一模型複製多份，各卡看不同 batch

### 6.5 SentencePiece ≠ SentencePiece Unigram

- ❌ SentencePiece 就是一種單一演算法
- ✅ SentencePiece 是 tokenizer framework，可支援 BPE 或 Unigram 等子詞模型

### 6.6 pretraining corpus 去重後大幅縮小是正常的

- ❌ Common Crawl 100TB 經清理後只剩約 15TB，代表資料不夠
- ✅ 大幅縮小通常表示把重複、低品質、不可用內容濾掉，這反而是正常的資料治理結果

### 6.7 向量資料庫不是模型本身

- ❌ FAISS / Chroma / Weaviate 是用來訓練語言模型的核心神經網路
- ✅ 它們是 RAG 檢索基礎設施，用來存 embeddings 與做 similarity search

### 6.8 `model.generate()` 參數不是訓練超參數

- ❌ `temperature=0.7`、`max_new_tokens=100` 是訓練階段的學習率設定
- ✅ 它們是推論/生成階段常見參數

---

## Section 7: 情境題快速判斷 (Scenario Quick-Judge)

- 看到 `Common Crawl` / `The Pile` / `ROOTS` → 選「預訓練語料庫（Pretraining Corpus）」
- 看到 `C4` / clean crawled corpus / quality-filtered crawl → 選「清理後可用預訓練語料」
- 看到 `MinHash` / `LSH` / near-duplicate → 選「近似去重（Near-deduplication）」
- 看到 `exact-match` / identical document → 選「完全去重」
- 看到 `perplexity filtering` → 選「資料品質篩選，不是模型架構」
- 看到 `BPE` → 優先聯想 GPT / LLaMA 路線
- 看到 `WordPiece` → 選 BERT 使用的分詞
- 看到 `SentencePiece` / raw text / 不需空格前處理 → 選多語或 T5 路線 tokenizer
- 看到 `tiktoken` / `cl100k_base` → 選 OpenAI tokenizer / fast BPE implementation
- 看到 `vocabulary size` → 想詞彙表大小，不要誤當 corpus 規模
- 看到 `SFT` / instruction-response pairs → 選監督式微調資料
- 看到 `chosen` / `rejected` → 選 RLHF 偏好資料
- 看到 `LoRA` / `adapter` / `rank r` → 選 PEFT / 少量可訓參數
- 看到「訓練成本低、少量資料」→ 優先想 LoRA / PEFT
- 看到「知識庫即時更新、不改模型」→ 選 RAG
- 看到 `chunking -> embedding -> index` → 選 RAG 資料管線
- 看到 `FAISS` / `Chroma` / `Weaviate` → 選向量資料庫（Vector Store）
- 看到 `fixed-size 512 tokens` → 選固定長度分塊策略
- 看到「依句子/段落邊界切」→ 選 semantic chunking
- 看到 `recursive splitter` / LangChain splitter → 選 recursive chunking
- 看到 `return_tensors="pt"` → 選 tokenizer 輸出格式為 PyTorch tensor
- 看到 `max_new_tokens` / `do_sample` / `temperature` → 選 `model.generate()` 參數
- 看到 `pipeline("summarization")` → 選摘要任務
- 看到 `pipeline("question-answering")` → 選問答任務
- 看到 `pipeline("feature-extraction")` → 選特徵/向量抽取
- 看到「同一模型複製多 GPU、梯度平均」→ 選 Data Parallelism（DDP）
- 看到「單一大型 layer 切分多 GPU」→ 選 Tensor Parallelism
- 看到「模型分層切分、流水線」→ 選 Pipeline Parallelism

快速二分判斷：

```text
要不要改權重？
  ├─ 要 → 微調 / LoRA
  └─ 不要 → RAG

切的是什麼？
  ├─ 切 batch → Data Parallelism
  ├─ 切單層 tensor → Tensor Parallelism
  └─ 切模型 stage → Pipeline Parallelism
```

---

## Section 8: 結尾：快速自我檢查 ✅

- [ ] 我能在 30 秒內說出預訓練語料看的是「規模、品質、多樣性、授權合規」四件事。
- [ ] 我能在 30 秒內舉出至少 3 個大型預訓練語料庫，並知道它們屬於預訓練不是微調。
- [ ] 我能在 30 秒內分清楚 exact-match、near-dedup、MinHash、perplexity filtering 的角色。
- [ ] 我能在 30 秒內說出 BPE、WordPiece、SentencePiece、tiktoken 的對應模型與差異。
- [ ] 我能在 30 秒內解釋為什麼 vocabulary size 不等於 corpus size。
- [ ] 我能在 30 秒內比較預訓練、SFT、RLHF、LoRA、RAG 的資料量級差異。
- [ ] 我能在 30 秒內畫出 RAG 的 `chunking -> embedding -> 向量資料庫（Vector Store） -> retrieval -> prompt augmentation -> generation` 流程。
- [ ] 我能在 30 秒內分辨 Data Parallelism、Tensor Parallelism、Pipeline Parallelism 分別切的是什麼。
- [ ] 我能在 30 秒內看懂 `tokenizer("prompt", return_tensors="pt")` 與 `model.generate(...)` 在資料流程中的位置。
- [ ] 我能在 30 秒內判斷什麼情境該用 RAG、什麼情境該用 LoRA / 微調。

📌 Out-of-scope note：
- 本課到 tokenizer、語料、分塊、向量索引、資料量級差異為止。
- 不展開 Transformer 權重計算、attention 數學、loss function 推導、beam search 數學，也不深入向量資料庫內部索引結構。
