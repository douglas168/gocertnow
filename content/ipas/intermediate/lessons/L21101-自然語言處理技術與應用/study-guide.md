# L21101 自然語言處理技術與應用 — Study Guide

> 對應評鑑範圍：**L21101 自然語言處理技術與應用**

本科屬 iPAS AI 應用規劃師中級「科目一：人工智慧技術應用與規劃」。中級起點就在**架構層級**，所以這份指南不會再重講「鑑別式 vs 生成式」（那是初級 L11401 的事），也不會教你怎麼下 prompt（那是初級 L12202）。我們直接進入 NLP 的三大架構家族、tokenization、詞嵌入、Transformer self-attention、以及「任務→架構」的選型判斷。

---

## Section 1. 考試導覽（Exam Mapping）

### How to Study This Chapter

這份指南建議照這個順序讀：

1. 先讀 **Section 3**，用「流程位置 → 白話例子 → 考試重點」建立理解。
2. 再看 **Section 4**，把容易混淆的概念放在一起比較。
3. 接著背 **Section 5** 的口訣，口訣要拿來壓縮理解，不要一開始就硬背。
4. 最後用 **Section 6 / 7** 練考題判斷：看到題目關鍵字，能不能立刻選出架構或方法。
5. 如果練習題答錯，回到 Section 3 找原理，不要只背答案。

### 標記說明

| 標記 | 意思 | 讀法 |
|---|---|---|
| 🔥 | 需要知道 | 能認出名詞與基本用途 |
| 🔥🔥 | 常考 | 要能解釋差異與選擇理由 |
| 🔥🔥🔥 | 高頻必背 | 要能在情境題中快速判斷 |

### 學習目標

讀完本章你應該能：
1. 說出 NLP 三大架構家族（encoder-only / decoder-only / encoder-decoder）的差異與代表模型。
2. 解釋 tokenization 三大演算法（BPE / WordPiece / Unigram）以及為何要用 subword。
3. 區分靜態（word2vec / GloVe）與語境化（ELMo / BERT）詞嵌入，並說明一詞多義為何必須用語境化。
4. 畫出 self-attention 的 Q/K/V 公式與軟性加權流程，並解釋為何除以 √d_k。
5. 看到任務描述（情感分析、NER、翻譯、摘要、對話、QA/RAG）時能直接對應到正確的架構家族。

### 考點權重

| 考點 | 權重 | 出處 |
|---|---|---|
| 三大架構家族 & 任務選型 | 🔥🔥🔥 | 樣題 Q3 / 歷年高頻 |
| Self-attention Q/K/V + Transformer 架構 | 🔥🔥🔥 | 中級科目一必考 |
| 靜態 vs 語境化詞嵌入（一詞多義） | 🔥🔥 | 114.09 樣題標註 |
| Subword tokenization（BPE / WordPiece / Unigram） | 🔥🔥 | 干擾題常見 |
| 訓練目標（MLM / Causal LM / Span corruption） | 🔥 | 與架構綁定出題 |
| QA / RAG 概念 | 🔥 | 新興考點，與 L21103 連動 |

### 先備知識

- **L11401 鑑別式 vs 生成式 AI 基本原理**：本科不再重講，但讀者應已能區分分類/生成任務。
- **L12202 生成式 AI 工具操作**：本科假設你看過 GPT/BERT 的 API，會出現「把任務對應到模型」的題目。
- **基本線性代數（向量、矩陣乘法、softmax）**：self-attention 的 QKᵀ / √d_k · V 需要這個背景，但本科**不考公式推導**。

---

## 📊 視覺化圖表（Visual Diagrams）

| # | 圖表 | 用途 |
|---|---|---|
| 1 | [NLP 處理流程總覽](diagrams/01-nlp-pipeline.md) | Tokenization → Embedding → Transformer → Task Head 全貌 |
| 2 | [Self-Attention Q/K/V 運算流程](diagrams/02-self-attention-qkv.md) | Q/K/V 矩陣乘法、√d_k 縮放、softmax、加權混合 |
| 3 | [三大架構家族比較](diagrams/03-architecture-families.md) | Encoder-only / Decoder-only / Encoder-Decoder + tokenizer 對應 |
| 4 | [任務 → 架構選型決策樹](diagrams/04-task-architecture-decision-tree.md) | 依任務特性快速判斷應選哪種架構 |
| 5 | [word2vec vs BERT：靜態 vs 情境化](diagrams/05-word2vec-vs-bert.md) | 多義詞處理、CBOW vs Skip-gram |

---

## Section 2. 關鍵概念總覽圖（Knowledge Tree）

這張圖不是要一次背完。先抓四層就好：

1. 文字先被切成 `token`。
2. `token` 變成 embedding 向量。
3. Transformer 用 attention 理解上下文。
4. 最後根據任務選 `BERT / GPT / T5/BART / RAG`。

讀下面的樹狀圖時，先看每一層在 NLP 流程中的位置，再看代表方法與考試陷阱。

```
🤖 L21101 自然語言處理技術與應用
│
├── 📖 文字前處理 Text Preprocessing
│   ├── Tokenization 斷詞
│   │   ├── Word-level（早期、詞彙量爆炸、OOV 問題）
│   │   ├── Subword 🔥🔥🔥
│   │   │   ├── BPE — Byte Pair Encoding（GPT / Llama / Qwen；GPT-2+ 用 byte-level BPE）
│   │   │   ├── WordPiece（BERT 家族）
│   │   │   └── Unigram (via SentencePiece)（T5 / XLNet / ALBERT / 多語模型）
│   │   └── Character-level（罕見、序列過長）
│   └── ⚠️ 陷阱：BERT 用 WordPiece、GPT 用 BPE、T5 用 Unigram（實作 SentencePiece），混搭選項是常見干擾題
│
├── 📊 詞嵌入 Word Embeddings
│   ├── 靜態 Static（單一向量）
│   │   ├── word2vec — 預測型（Skip-gram / CBOW）🔥🔥
│   │   └── GloVe — 共現統計型（count-based）🔥
│   ├── 語境化 Contextualized（依上下文變化）
│   │   ├── ELMo — LSTM-based（歷史背景）
│   │   └── BERT — Transformer-based 🔥🔥🔥
│   └── ⚠️ 陷阱：word2vec 不能處理一詞多義（"bank" 只有一個向量）
│
├── 🔧 Transformer 架構
│   ├── Self-Attention（Q/K/V 查詢-鍵-值）🔥🔥🔥
│   ├── Multi-Head Attention 多頭注意力
│   ├── Positional Encoding 位置編碼（Transformer 沒有 RNN 的順序性，需另加）
│   ├── Layer Normalization + Residual Add & Norm
│   ├── Feed-Forward Block（Position-wise FFN）
│   └── ⚠️ 陷阱：Transformer 是「架構」，BERT/GPT 才是「模型」，別講反了
│
├── ⚖️ 三大架構家族 🔥🔥🔥（整份考試最核心）
│   ├── Encoder-only — BERT / RoBERTa
│   │   ├── 雙向 bidirectional
│   │   ├── 訓練目標：MLM（Masked Language Modeling）
│   │   └── 擅長：理解類任務（分類、情感、NER、抽取式 QA）
│   ├── Decoder-only — GPT / Llama / Qwen
│   │   ├── 單向 causal / autoregressive
│   │   ├── 訓練目標：下一個詞預測（next-token prediction）
│   │   └── 擅長：生成、對話、續寫、few-shot prompting
│   └── Encoder-decoder — T5 / BART / mT5
│       ├── 雙向 encoder + 單向 decoder
│       ├── 訓練目標：span corruption（T5）/ denoising（BART）
│       └── 擅長：seq2seq（翻譯、摘要、生成式 QA）
│
└── 🎯 NLP 任務家族 → 架構選型
    ├── 文本分類 / 情感分析 / NER / 抽取式 QA  → Encoder-only（BERT）🔥🔥
    ├── 摘要（abstractive）/ 翻譯 / 生成式 QA  → Encoder-decoder（T5/BART）🔥🔥
    └── 對話 / 續寫 / few-shot / 通用 LLM      → Decoder-only（GPT/Llama）🔥🔥
```

---

## Section 3. Core Concepts（核心概念）

先把整個 NLP 流程抓起來，後面每個名詞都會比較好懂：

```text
原始文字
→ Tokenization：切成 token
→ Embedding：把 token 變成向量
→ Transformer：理解 token 之間的關係
→ 任務輸出：分類 / 摘要 / 翻譯 / 問答 / 生成
```

考試看到名詞時，先問自己：「它在這條流程的哪一段？」

---

### 3.1 Tokenization 斷詞 🔥🔥

**先懂一句話**：
Tokenization 就是把文字切成模型可以處理的小單位，這些小單位叫做 `token`。

模型不是直接吃完整句子。它會先把句子切開：

```text
I am playing basketball
→ I / am / play / ##ing / basketball
```

`##ing` 裡的 `##` 表示：這不是一個新詞的開頭，而是接在前面 token 後面的片段。

**它在流程中的位置**：

```text
原始文字 → Tokenization → Embedding → Transformer
```

所以 tokenization 負責「切材料」，還沒有把文字變成數字。

**三種切法怎麼分**：

| 切法 | 白話理解 | 優點 / 問題 |
|---|---|---|
| Word-level | 一個完整詞一個 token | 簡單，但遇到字典沒有的詞會 OOV；中文沒有空格，不能只靠空白切 |
| **Subword** 🔥🔥 | 把詞切成有意義的小片段 | 現代 NLP 主流；能處理新詞、罕見詞，又不會像字元級那麼長 |
| Character-level | 一個字元一個 token | 幾乎不會 OOV，但序列太長、效率較差 |

> **考試重點**：Subword tokenization 是 word-level 與 character-level 之間的折衷；它能減少 OOV 問題，同時避免序列長度變得太長。

**Subword 三巨頭怎麼背**：

| 方法 | 常見模型 | 考試記法 |
|---|---|---|
| BPE | GPT / Llama / Qwen / Gemma | 合併常一起出現的字元或子字元 pair |
| WordPiece | BERT / DistilBERT / RoBERTa | BERT 常見；會出現 `##ing` 這種非詞首標記 |
| Unigram LM | T5 / XLNet / ALBERT / mT5 | 常透過 SentencePiece 實作；對中文等無空白語言較穩健 |

> **口訣**：GPT 吃 BPE，BERT 切 WordPiece，T5 拿 Unigram（實作常走 SentencePiece）。

**容易混淆的三層關係**：

| 層級 | 例子 | 問的是什麼 |
|---|---|---|
| 模型 | T5 / BERT / GPT | 誰在用？ |
| 切詞方法 | BPE / WordPiece / Unigram | 怎麼切？ |
| 工具 | SentencePiece | 用什麼工具實作？ |

**中文場景要特別記**：
中文沒有天然空白，所以考試若問中文 NLP，不要直覺選「用空格分詞」。常見方向是字元級、BPE、Unigram，或使用適合中文的分詞器。

**Quick check**：
如果題目說「模型要處理大量新品牌名、專有名詞，並減少 OOV」，優先想到哪個答案？

---

### 3.2 詞嵌入 Word Embeddings 🔥🔥

**先懂一句話**：
Word embedding 就是把 token 轉成數字向量，因為模型只能計算數字，不能直接理解文字。

例如：

```text
cat → [0.2, 0.8, -0.1, 0.5]
dog → [0.3, 0.7, -0.2, 0.4]
car → [-0.6, 0.1, 0.9, -0.3]
```

意思接近的詞，向量距離通常也比較近。`cat` 和 `dog` 會比 `cat` 和 `car` 更接近。

**它在流程中的位置**：

```text
Tokenization → Embedding → Transformer
```

Tokenization 是「切成 token」，embedding 是「把 token 變成可計算的向量」。

**最大考點：靜態 vs 語境化**：

| 類型 | 核心概念 | 代表方法 | 最大差別 |
|---|---|---|---|
| 靜態詞嵌入 Static embedding | 同一個詞永遠同一個向量 | word2vec / GloVe | 無法處理一詞多義 |
| 語境化詞嵌入 Contextualized embedding | 同一個詞會根據上下文產生不同向量 | ELMo / BERT | 可以處理一詞多義 |

用 `bank` 來看最清楚：

```text
靜態 embedding：
"river bank" 的 bank = "money bank" 的 bank
→ 分不出河岸與銀行

語境化 embedding：
"river bank" 的 bank ≠ "money bank" 的 bank
→ 會根據上下文改變向量
```

**四個代表方法怎麼分**：

| 方法 | 類型 | 考試關鍵字 |
|---|---|---|
| word2vec | 靜態 | 預測型；根據附近詞學向量 |
| GloVe | 靜態 | 共現統計型；看整體語料中詞與詞一起出現的情況 |
| ELMo | 語境化 | 雙向 LSTM |
| BERT | 語境化 | Transformer encoder + MLM |

**word2vec 內部兩種訓練法**：

| 方法 | 白話 | 考試記法 |
|---|---|---|
| Skip-gram | 給中心詞，預測周圍詞 | 中心猜旁邊；適合小資料與冷門詞 |
| CBOW | 給周圍詞，預測中心詞 | 旁邊猜中心；訓練較快 |

> **考試重點**：看到「一詞多義、上下文、同一個詞不同意思」→ 選語境化 embedding，例如 `BERT` 或 `ELMo`。

**Quick check**：
如果題目問「哪種 embedding 可以分辨 `bank` 在銀行和河岸中的不同意思？」你會選靜態還是語境化？

---

### 3.3 Transformer 架構 🔥🔥🔥

**先懂一句話**：
Transformer 是用 attention 讓模型判斷「每個 token 應該注意句子裡哪些其他 token」的架構。

RNN/LSTM 像是一個字一個字照順序讀；Transformer 可以讓整句話的 token 彼此同時參考，所以比較能平行運算，也比較擅長長距離關係。

**它在流程中的位置**：

```text
文字 → Tokenization → Embedding → Transformer → 任務輸出
```

Transformer 不負責切詞，也不負責把文字變數字；它負責讓 token 向量吸收上下文資訊。

**先分清楚三個 attention 名詞**：

| 名稱 | 問題 | 白話理解 |
|---|---|---|
| Soft attention | 怎麼加權？ | 不是只看一個 token，而是全部都看，只是權重不同 |
| Self-attention | 看誰？ | 同一句話裡的 token 彼此互看 |
| Multi-head attention | 看幾種角度？ | 同時用多組 attention 看不同關係 |

所以 Transformer 常見核心是：

```text
multi-head self-attention
```

也就是：同一句話裡的 token 彼此互看，而且用多個 head 從不同角度看。

**Q / K / V 用人話理解**：

每個 token 都會產生三個向量：

| 名稱 | 白話問題 |
|---|---|
| Query (Q) | 我現在想找什麼資訊？ |
| Key (K) | 我身上有哪些可被比對的特徵？ |
| Value (V) | 如果你關注我，我實際提供什麼內容？ |

Attention 的流程可以先用這句記：

```text
Q 和 K 算相關性 → softmax 變權重 → 用權重加總 V
```

公式長這樣，考試通常不需要推導：

```text
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) · V
```

`/ sqrt(d_k)` 是縮放，避免分數太大讓 softmax 太極端，導致訓練不穩。

**為什麼需要 Positional Encoding**：
Self-attention 本身不自帶順序感。如果只看詞集合，「我打你」和「你打我」會很像，但意思完全不同。因此 Transformer 要加入位置資訊，告訴模型 token 的前後順序。

**其他零件考到會認即可**：

| 零件 | 功能 |
|---|---|
| Add & Norm | Residual connection + Layer normalization，讓深層網路訓練更穩定 |
| FFN | Attention 後，對每個位置再做非線性特徵轉換 |

**Transformer 為什麼取代 RNN/LSTM**：

| 面向 | RNN/LSTM | Transformer |
|---|---|---|
| 處理方式 | 循序 sequential | 平行 parallel |
| 長距依賴 | 較難保留很遠的資訊 | self-attention 可直接建立遠距關係 |
| 訓練速度 | 較慢 | 較快 |
| GPU 利用率 | 較低 | 較高 |

**完整資料流先有概念就好**：

```text
輸入文字
→ Tokenizer
→ Token Embedding + Positional Encoding
→ Multi-Head Self-Attention
→ Add & Norm
→ Feed-Forward Network
→ Add & Norm
→ 輸出向量給分類頭 / 解碼器 / 任務頭
```

> **考試重點**：Transformer 的核心是 self-attention；優勢是平行運算與長距依賴；位置順序要靠 positional encoding 補上。

**Quick check**：
如果題目問「Transformer 為什麼比 RNN 更適合長文本？」你會回答 self-attention、平行運算，還是 word-level tokenization？

---

### 3.4 三大架構家族 🔥🔥🔥

**先懂一句話**：
Transformer 可以分成三大家族：`encoder-only`、`decoder-only`、`encoder-decoder`。考試常要你根據任務選家族。

| 架構 | 代表模型 | 看文字的方式 | 擅長任務 |
|---|---|---|---|
| Encoder-only | BERT / RoBERTa | 雙向理解，可以同時看前後文 | 分類、情感分析、NER、抽取式 QA |
| Decoder-only | GPT / Llama | 單向生成，只根據前文預測下一個 token | 對話、續寫、few-shot、通用生成 |
| Encoder-decoder | T5 / BART | encoder 先理解輸入，decoder 再生成輸出 | 翻譯、摘要、生成式 QA |

**用一句話分辨**：

```text
BERT = 看懂整句，適合理解類任務
GPT = 往後接著寫，適合生成類任務
T5/BART = 先讀懂再改寫，適合輸入輸出都可變長的 seq2seq 任務
```

**三大訓練目標必背**：

| 訓練目標 | 白話 | 對應架構 |
|---|---|---|
| MLM（Masked Language Modeling） | 把部分 token 遮住，讓模型猜回來 | Encoder-only（BERT） |
| Causal / Next-token LM | 給前面的 token，猜下一個 token | Decoder-only（GPT） |
| Span corruption / Denoising | 把一段文字遮住或打亂，讓模型還原 | Encoder-decoder（T5/BART） |

> **考試重點**：理解類任務優先想 BERT；生成續寫優先想 GPT；翻譯、摘要這種 seq2seq 優先想 T5/BART。

**Quick check**：
如果題目說「輸入一篇英文新聞，輸出三句中文摘要」，你會選 encoder-only、decoder-only，還是 encoder-decoder？

---

### 3.5 NLP 任務家族

**先懂一句話**：
NLP 任務就是「輸入文字後，你希望模型產生什麼輸出」。輸出是類別、標記、答案、翻譯，會決定適合的模型架構。

| 任務 | 輸入 | 輸出 | 常見架構 |
|---|---|---|---|
| 文本分類 Text Classification | 一段文字 | 一個類別 | Encoder-only（BERT） |
| 情感分析 Sentiment Analysis 🔥🔥 | 評論、留言 | 正面 / 負面 / 中性 | Encoder-only（BERT） |
| NER | 一段文字 | 人名、地名、組織、時間、金額等標記 | Encoder-only（BERT + token classification） |
| 抽取式摘要 Extractive Summarization | 長文章 | 原文中的重要句子 | 可用 encoder-only |
| 生成式摘要 Abstractive Summarization 🔥 | 長文章 | 用自己的話生成摘要 | Encoder-decoder（T5/BART） |
| 機器翻譯 Machine Translation 🔥 | 一種語言文字 | 另一種語言文字 | Encoder-decoder（T5/BART） |
| 抽取式 QA | 問題 + 文章 | 原文中的一段答案 | Encoder-only |
| 生成式 QA | 問題 | 模型生成答案 | Encoder-decoder 或 decoder-only |

**RAG 也要知道**：
RAG（Retrieval-Augmented Generation，檢索增強生成）是現代 QA 常見做法：

```text
檢索 relevant documents → 把文件放進 prompt 增強上下文 → 生成答案
```

它比純 LLM 直接回答更適合需要最新資料、公司內部文件、可追溯來源的場景，也比較能降低幻覺。

**用日常 app 記任務**：

```text
情感分析 → 蝦皮評論分好評 / 負評
NER → 104 職缺抽公司、薪水、地點
分類 → Gmail 分主要 / 促銷 / 社交
翻譯 → Google 翻譯
摘要 → 新聞 App 壓成短摘要
對話 → ChatGPT bot
續寫 → 鍵盤自動建議下一個字
RAG QA → 先查文件再回答公司政策
```

> **考試重點**：先看輸出形式。輸出是類別，多半是分類；輸出是原文片段，是抽取式；輸出是新文字，是生成式。

**Quick check**：
如果題目說「從履歷中找出姓名、學校、技能」，這比較像文本分類、NER，還是翻譯？

---

### 3.6 任務 → 架構選型（Dual-constraint 題必考）🔥🔥🔥

**先懂一句話**：
iPAS 中級常給你兩個條件，要你選模型或架構。不要只看單一關鍵字，要同時看「任務類型」和「輸出形式」。

| 題目關鍵字 / 場景 | 判斷邏輯 | 答案 |
|---|---|---|
| 雙向 + 情感分類 | 要看完整句子後判斷類別 | Encoder-only（BERT） |
| 雙向 + NER / 抽取式 QA | 要理解整段文字並標出原文片段 | Encoder-only（BERT） |
| autoregressive + next-token | 根據前文一個 token 一個 token 生成 | Decoder-only（GPT/Llama） |
| 對話 + 續寫 + few-shot | 典型生成式 LLM 場景 | Decoder-only（GPT/Llama） |
| 可變長輸入 + 可變長輸出 | 輸入輸出都可能長短不同 | Encoder-decoder（T5/BART） |
| 翻譯 + 摘要 | 先理解輸入，再生成另一段文字 | Encoder-decoder（T5/BART） |
| 一詞多義 + 上下文 | 同一個詞要依句子改變意思 | 語境化 embedding（BERT/ELMo） |
| 新詞 / 專有名詞 / OOV | 不想遇到字典外詞就失效 | Subword tokenization |
| 中文 / 日文 / 無空白語言 | 不能只靠空格切詞 | 字元級 / BPE / Unigram / SentencePiece |
| 最新資料 + 文件引用 + 降低幻覺 | 先查資料再生成答案 | RAG（檢索 → 增強 → 生成） |

**最後用這組口訣收斂**：

```text
切字看 tokenization
變數字看 embedding
懂上下文看 Transformer
理解分類找 BERT
續寫對話找 GPT
翻譯摘要找 T5/BART
查資料再回答找 RAG
```

---

## Section 4. Comparison Tables（易混淆概念對照表）

### 4.1 word2vec vs BERT Embeddings（靜態 vs 語境化）🔥🔥🔥

| 面向 | word2vec（靜態） | BERT（語境化） |
|---|---|---|
| 向量是否依上下文變化 | ❌ 同一個字永遠同一向量 | ✅ 依上下文動態產生 |
| 一詞多義處理 | ❌ 無法區分 "bank"（河岸 vs 銀行） | ✅ 自然處理 |
| 架構底層 | 淺層神經網路（2-layer） | 深層 Transformer encoder |
| 訓練目標 | Skip-gram / CBOW（預測鄰近詞） | MLM（猜被遮蔽的字） |
| 使用方式 | 查表即可 | 需整個模型跑 forward pass |
| 年代 | 2013 | 2018 |

**考題看到這樣判斷**：
- 「固定向量、查表、2013、Skip-gram / CBOW」→ `word2vec`
- 「上下文改變向量、一詞多義、MLM、Transformer encoder」→ `BERT`
- 「bank 在河岸與銀行意思不同」→ 選語境化 embedding，不選 word2vec

### 4.2 三大架構家族對照 🔥🔥🔥

| 面向 | Encoder-only | Decoder-only | Encoder-decoder |
|---|---|---|---|
| 代表模型 | BERT, RoBERTa | GPT, Llama, Qwen | T5, BART, mT5 |
| 注意力方向 | 雙向 bidirectional | 單向 causal | encoder 雙向 + decoder 單向 |
| 訓練目標 | MLM（mask 15% 猜回來） | Next-token prediction | Span corruption / Denoising |
| 擅長任務 | 分類、情感、NER、抽取式 QA | 對話、生成、續寫、few-shot | 翻譯、摘要、生成式 QA |
| 現況（2026） | NER / 抽取式 QA 仍是基準 | 通用 LLM 主流 | 翻譯/摘要仍常用 |

**考題看到這樣判斷**：
- 「理解、分類、情感分析、NER、抽取式 QA」→ `Encoder-only / BERT`
- 「生成、對話、續寫、few-shot、autoregressive」→ `Decoder-only / GPT`
- 「翻譯、摘要、seq2seq、輸入輸出長度都可變」→ `Encoder-decoder / T5/BART`

### 4.3 Subword Tokenizer 對照 🔥🔥

| 演算法 | 核心邏輯 | 對應模型 | 備註 |
|---|---|---|---|
| BPE | 合併最頻繁的**字元/子字元 pair**；GPT-2+ 改 byte-level（直接對 UTF-8 位元組操作） | GPT-2 / GPT-3 / GPT-4 / Llama / Qwen / Gemma | 從底層合併到頂；byte-level 版本對任何語言不會 OOV |
| WordPiece | 選擇讓 likelihood 提升最多的合併；非首 subword 加 `##` 前綴 | BERT / DistilBERT / RoBERTa | 與 BPE 很像但選擇標準不同 |
| Unigram LM | 從大 vocab 開始剪掉最不重要的 subword | T5 / XLNet / ALBERT / mT5 / 多語模型 | 實作常用 **SentencePiece** 函式庫；不依賴空白切分 → 中/日/泰更穩 |

> 🔎 **SentencePiece ≠ 演算法**：SentencePiece 是 Google 開源的 tokenizer 函式庫，可以實作 BPE 或 Unigram。T5 / ALBERT / XLNet 雖然都用 SentencePiece，但實際採用的是 **Unigram** 演算法。考題若把 SentencePiece 與 BPE/WordPiece 並列，請理解為「Unigram (via SentencePiece)」的簡寫。

**考題看到這樣判斷**：
- 「GPT / Llama / byte-level」→ `BPE`
- 「BERT / ## 前綴」→ `WordPiece`
- 「T5 / XLNet / ALBERT / SentencePiece / 無空白語言」→ `Unigram`
- 「OOV / 新詞 / 專有名詞」→ 優先想到 `Subword tokenization`

### 4.4 抽取式 vs 生成式摘要 🔥

| 面向 | 抽取式 Extractive | 生成式 Abstractive |
|---|---|---|
| 做法 | 從原文挑重要句子 | 用自己的話重寫 |
| 一定忠於原文 | ✅ | ❌（可能 hallucinate） |
| 讀起來自然 | 中等（句子拼接） | 高 |
| 典型架構 | encoder-only + 分類頭 | encoder-decoder（T5/BART） |
| 白話類比 | 考前畫螢光筆 | 幫同學整理筆記到 Instagram 限動 |

**考題看到這樣判斷**：
- 「從原文挑句子、答案必須在原文」→ 抽取式，可用 `encoder-only`
- 「用自己的話重寫、可讀性高、可能 hallucinate」→ 生成式，典型選 `encoder-decoder`

### 4.5 Self-attention vs Multi-head Attention vs Cross-attention

先記一個原則：
- `self-attention` / `cross-attention` 講的是 **Q、K、V 來自哪裡**
- `multi-head attention` 講的是 **同時用幾組 attention 去看**

所以它們不是互斥關係。實務上常見的是：
- `multi-head self-attention`
- `multi-head cross-attention`

| 面向 | Self-attention | Multi-head attention | Cross-attention |
|---|---|---|---|
| 主要在講什麼 | 同一序列內彼此互看 | 平行做多組 attention | 不同序列之間互看 |
| Q 來自哪 | 同一序列 | 視 self / cross 而定 | decoder |
| K, V 來自哪 | 同一序列 | 視 self / cross 而定 | encoder |
| 出現位置 | encoder 內、decoder masked 層 | 幾乎所有 attention 模組都可用 | encoder-decoder 模型的 decoder |
| 功能 | 同序列內建立依賴關係 | 同時學多種關係 | decoder 讀取 encoder 的內容 |
| 白話 | 自己看自己 | 用很多角度一起看 | 看對面（讀取來源句） |

> 📌 口訣：`self / cross` 看「資料來源」，`multi-head` 看「觀察角度數量」。

**考題看到這樣判斷**：
- 「同一句話內 token 彼此互看」→ `Self-attention`
- 「平行多組注意力、不同角度」→ `Multi-head attention`
- 「decoder 讀 encoder 的輸出」→ `Cross-attention`

---

## Section 5. 口訣 / Mnemonics

**5.1 三大架構 → 任務速記** 🔥🔥🔥
> **「懂雙向選 BERT，寫東西找 GPT，翻譯摘要 T5 包」**
- 理解（雙向）→ BERT
- 生成（單向）→ GPT
- 翻譯/摘要（seq2seq）→ T5/BART

**5.2 Tokenizer 對應口訣** 🔥🔥
> **「GPT 吃 BPE，BERT 切 WordPiece，T5 拿 Unigram（走 SentencePiece）」**

**5.3 Self-Attention Q/K/V 口訣** 🔥🔥
> **「Q 問我要啥，K 答我是啥，V 給我實料」**
- Query = 問題
- Key = 標籤
- Value = 內容

**5.4 三大訓練目標 → 架構口訣**
> **「遮字 encoder，順寫 decoder，挖段 encoder-decoder」**
- 遮字（MLM） → encoder-only
- 順寫（causal） → decoder-only
- 挖段（span corruption） → encoder-decoder

**5.5 word2vec 兩種方法口訣**
> **「Skip 中心問周圍，CBOW 周圍猜中心」**

**5.6 Transformer 為何贏 RNN 口訣**
> **「平行、長距、快訓練」**（平行運算、長距依賴、訓練速度快）

**5.7 靜態 vs 語境化速記**
> **「word2vec 只給一件制服，BERT 會依場合換裝」**

---

## Section 6. 考試陷阱（Exam Traps）

### ❌ 陷阱 1：Transformer 是一個模型
✅ **正解**：Transformer 是**架構**（architecture），BERT / GPT / T5 才是**模型**（models）。它們都是基於 Transformer 架構設計的具體模型。
> 為什麼會搞混：很多入門文章直接把「GPT」叫「Transformer model」，講快了就忘了前面「model」，只留「Transformer」變專有名詞。
> 常見錯誤選項：把 Transformer 和 BERT/GPT/T5 並列成同一層級。看到這種選項，要先分清楚「架構」和「模型」。

### ❌ 陷阱 2：BERT 可以生成長文字
✅ **正解**：BERT 是 **encoder-only**，只能做理解類任務（分類、NER、抽取式 QA），**不能自然生成連貫長文**。要生成請用 GPT（decoder-only）或 T5（encoder-decoder）。
> 為什麼會搞混：BERT 的 MLM 在預測被遮蔽的字，看起來像「生成」，但那只是 per-token 的填空，不是自回歸的連續生成。
> 常見錯誤選項：選 BERT 做聊天機器人長回覆、文章續寫、產品文案生成。看到「續寫 / 對話 / 生成長文」優先選 GPT。

### ❌ 陷阱 3：word2vec 可以處理一詞多義
✅ **正解**：word2vec 是**靜態**詞嵌入，一個字只有一個固定向量。要處理一詞多義（"bank" = 河岸 vs 銀行）必須用**語境化**詞嵌入（ELMo / BERT）。這是 114.09 樣題明確標註的「重要細節考核」。
> 常見錯誤選項：看到「詞嵌入」就選 word2vec。題目若強調上下文或不同語意，要改選 BERT / ELMo。

### ❌ 陷阱 4：GPT 可以做雙向理解
✅ **正解**：GPT 是 **decoder-only / causal**，只能**由左到右**看文字，**不能**看後面還沒出現的字。要雙向理解請用 BERT。
> 為什麼會搞混：GPT-4 在回答問題時看起來「什麼都懂」，但它是靠龐大的上下文學習能力，不是靠雙向注意力——架構上它嚴格單向。
> 常見錯誤選項：把 GPT 說成 bidirectional encoder。看到 `causal / autoregressive / next-token`，就是 decoder-only。

### ❌ 陷阱 5：摘要任務只能用 encoder-only
✅ **正解**：**抽取式摘要**可用 encoder-only（挑句子即可）；**生成式摘要**（abstractive）要用 encoder-decoder（T5/BART）或 decoder-only（GPT）才能改寫成自己的話。題目若強調「用自己的話重寫」或「可讀性高」，就是生成式 → encoder-decoder。
> 常見錯誤選項：只看到「摘要」就選 BERT。要先看它是「從原文挑句子」還是「重新生成一段摘要」。

### ❌ 陷阱 6：Tokenizer 可以跨模型混用
✅ **正解**：**不行**。BERT 的 checkpoint 只能配 WordPiece tokenizer、GPT 只能配 BPE、T5 只能配 Unigram（SentencePiece 實作）。tokenizer 和模型權重是一起訓練出來的，對應關係固定。用錯 tokenizer → 模型吐亂碼。
> 常見錯誤選項：說所有 Transformer 模型都能共用同一個 tokenizer。考試要記模型、tokenizer、vocab 是一起配套的。

### ❌ 陷阱 7：Transformer 不需要位置訊息（因為有 attention）
✅ **正解**：**需要**。self-attention 本身對順序不敏感（「我打你」和「你打我」attention 結果一樣），所以 Transformer 必須另外加 **Positional Encoding** 或 positional embedding，才能讓模型知道誰在前誰在後。
> 常見錯誤選項：說 attention 已經自然保留順序。事實是 attention 擅長看關係，但順序資訊要另外加入。

### ❌ 陷阱 8：GloVe 和 word2vec 都是預測型
✅ **正解**：**word2vec = 預測型**（Skip-gram/CBOW 預測鄰近詞）；**GloVe = 共現統計型**（count-based，分解全域共現矩陣）。兩者路線不同。
> 常見錯誤選項：把 GloVe 說成 Skip-gram 或 CBOW。看到 `co-occurrence / count-based / global statistics`，就是 GloVe。

---

## Section 7. 情境題快速判斷（Scenario Quick-Judge）

### 7.1 Exam Decision Flow

看到情境題時，先不要急著看模型名稱。照下面順序判斷：

```text
1. 題目問的是文字處理流程哪一段？
   - 切文字 → tokenization
   - 文字變數字 → embedding
   - 理解上下文 → Transformer / attention
   - 任務選型 → encoder-only / decoder-only / encoder-decoder / RAG

2. 如果是任務選型，先看輸出形式：
   - 輸出一個類別 → BERT / encoder-only
   - 輸出原文中的片段 → BERT / encoder-only
   - 輸出新寫出來的文字 → GPT 或 T5/BART
   - 輸入一段、輸出另一段 → T5/BART / encoder-decoder

3. 再看題目關鍵字：
   - 雙向 / 理解 / classification / NER → BERT
   - autoregressive / next-token / few-shot / chat → GPT
   - translation / summarization / seq2seq → T5/BART
   - 最新資料 / 引用文件 / 降低幻覺 → RAG
```

### 7.2 Keyword Map

看到題目關鍵字，直接對照選答案。

```
🔑 關鍵字 → 答案

─── 架構家族 ───
「雙向 / bidirectional / 理解」         → Encoder-only (BERT)
「情感分析 / NER / 抽取式 QA」          → Encoder-only (BERT)
「生成對話 / 續寫文章 / few-shot」      → Decoder-only (GPT / Llama)
「autoregressive / causal / 單向 LM」   → Decoder-only (GPT)
「翻譯 / 摘要 / seq2seq」               → Encoder-decoder (T5 / BART)
「可變長輸入輸出 / span corruption」    → Encoder-decoder (T5)

─── 詞嵌入 ───
「一詞多義 / polysemy / 語境相關」      → 語境化詞嵌入 (BERT / ELMo)
「固定向量 / 查表 / 2013」              → 靜態詞嵌入 (word2vec / GloVe)
「預測周圍詞」                          → word2vec (Skip-gram / CBOW)
「共現矩陣 / count-based / 全域統計」   → GloVe

─── Tokenization ───
「詞彙量大 / OOV / 未登錄詞」           → Subword tokenization
「BERT 家族 / ## 前綴」                  → WordPiece
「GPT / Llama / Qwen 家族 / byte-level」 → BPE (Byte Pair Encoding)
「T5 / XLNet / 多語 / 中文無空白」       → Unigram (via SentencePiece)
「最新資料 / 引用來源 / 減少幻覺」       → RAG（檢索→增強→生成）

─── Transformer 機制 ───
「自注意力 / 多頭 / 長距依賴 / 平行」   → Transformer（對照 RNN/LSTM）
「Q K V / 查詢 鍵 值」                   → Self-Attention
「沒有順序性需另加」                    → Positional Encoding
「取代 RNN / LSTM」                      → Transformer (2017)

─── 任務判斷 ───
「判斷好評負評」                        → 情感分析 (Sentiment Analysis)
「抽出人名公司金額」                    → NER
「把中文換英文」                        → 機器翻譯 → encoder-decoder
「論文變短摘要用自己的話」              → Abstractive → encoder-decoder
「從原文挑重要句子」                    → Extractive → encoder-only
```

### 7.3 Mini Practice

先遮住答案，自己用「輸出形式 → 關鍵字 → 架構」判斷一次。

| 題目情境 | 判斷 | 答案 |
|---|---|---|
| 公司想把客服留言分成正面、負面、中性 | 輸出是類別；要理解整句 | 情感分析；Encoder-only / BERT |
| 從履歷中找出姓名、學校、技能 | 輸出是原文中的實體標記 | NER；Encoder-only / BERT |
| 把英文產品說明翻成中文 | 輸入輸出都是文字，長度可變 | Machine translation；Encoder-decoder / T5/BART |
| 把一篇長新聞用自己的話整理成三句摘要 | 生成新文字，不只是挑原句 | Abstractive summarization；Encoder-decoder / T5/BART |
| 根據前面聊天紀錄產生下一句回覆 | 續寫、對話、自回歸生成 | Decoder-only / GPT |
| 給模型三個範例，請它仿寫第四個產品文案 | few-shot + 生成文字 | Decoder-only / GPT |
| 問答系統要先查公司內部文件，再回答並附來源 | 檢索文件後再生成 | RAG |
| 題目比較 `bank` 在河岸和銀行的不同意思 | 同一詞依上下文改變語意 | 語境化 embedding；BERT / ELMo |
| 模型需要處理新品牌名與罕見專有名詞 | 降低 OOV 問題 | Subword tokenization |
| 題目問為何 Transformer 比 RNN 更適合長距依賴 | token 可直接彼此注意，且可平行 | Self-attention / Transformer |

---

## Quick Check Answers

| 小節 | 答案 |
|---|---|
| 3.1 Tokenization | `Subword tokenization`，因為它能減少 OOV，又不會像 character-level 那麼長 |
| 3.2 Word Embeddings | 語境化 embedding，例如 `BERT / ELMo` |
| 3.3 Transformer | `self-attention`、平行運算、長距依賴；不是 word-level tokenization |
| 3.4 三大架構家族 | `Encoder-decoder`，典型是 `T5 / BART` |
| 3.5 NLP 任務家族 | `NER`，因為要從文字中抽出姓名、學校、技能等實體 |

---

## 結尾：快速自我檢查 ✅

用下面這張清單自我盤點，每項要能在 30 秒內口頭回答出來。全部勾完 → 直接上考場。任一題卡住 → 回對應小節重讀。

- [ ] 我能在 30 秒內解釋 **BERT 用 encoder-only、GPT 用 decoder-only、T5 用 encoder-decoder** 的差別，並舉一個各自擅長的任務。
- [ ] 我能說出 **BPE / WordPiece / Unigram** 三種 subword 演算法各對應哪個模型家族，並知道 SentencePiece 是函式庫不是演算法。
- [ ] 我能解釋 **word2vec（靜態）vs BERT（語境化）** 的差別，並說明為什麼「bank」的一詞多義只有語境化嵌入能處理。
- [ ] 我能畫出 **self-attention 的 Q/K/V 公式**：`softmax(QKᵀ / √d_k) · V`，並解釋為何要除以 √d_k、為何它是 soft attention。
- [ ] 我能把 **5 大任務家族（分類 / 情感 / NER / 摘要 / 翻譯）+ QA/RAG** 對應到正確的架構家族，看到「生成式摘要」知道選 encoder-decoder。
- [ ] 我能說出三大訓練目標 **MLM / Causal LM / Span corruption** 各對應哪種架構。
- [ ] 我能在看到考題陷阱（「Transformer 是模型」「BERT 可生成」「word2vec 處理一詞多義」「GPT 雙向」）時**立刻反駁**並說出正解。
- [ ] 我能解釋 **RAG 的三步驟（檢索 → 增強 → 生成）**，並說出它相較純 LLM 的兩個優勢（減少幻覺、引用最新資料）。

> 📌 進一步的訓練細節（loss function 展開、Adam 最佳化、LoRA / RLHF / fine-tuning 策略）屬 L23 機器學習組內容，本科只需了解架構層級。考場上看到 backprop 公式或 LoRA rank 選擇題 → 那不是 L21101 範疇，繼續下一題。
