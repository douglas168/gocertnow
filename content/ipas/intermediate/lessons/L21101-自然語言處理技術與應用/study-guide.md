# L21101 自然語言處理技術與應用 — Study Guide

> 對應評鑑範圍：**L21101 自然語言處理技術與應用**

本科屬 iPAS AI 應用規劃師中級「科目一：人工智慧技術應用與規劃」。中級起點就在**架構層級**，所以這份指南不會再重講「鑑別式 vs 生成式」（那是初級 L11401 的事），也不會教你怎麼下 prompt（那是初級 L12202）。我們直接進入 NLP 的三大架構家族、tokenization、詞嵌入、Transformer self-attention、以及「任務→架構」的選型判斷。

---

## Section 1. 考試導覽（Exam Mapping）

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

### 3.1 Tokenization 斷詞 🔥🔥

**定義**：把原始文字切成模型看得懂的最小單位（token）。一句話進入 BERT/GPT 之前，一定先被 tokenizer 切一輪。

**白話說明 🗣️**：
就像你把一則 Instagram 貼文貼進 LINE 要分享，LINE 會自動切成「預覽卡 + 連結」。模型的 tokenizer 也一樣——它不是一個字一個字吃，也不是整句吞，而是切成「中等大小的 subword」，這樣既能處理冷門詞（例如「蝦皮購物」可能被切成「蝦皮_購物」），又不會讓序列長到 GPU 爆記憶體。

**三種主流做法**：

| 切法 | 代表模型 | 邏輯 |
|---|---|---|
| Word-level | 早期 NLP | 以空白切詞；中文沒空白 → 需額外斷詞工具；遇到 OOV（Out-Of-Vocabulary）會產出 `[UNK]` token → **資訊遺失**，下游任務準確率下降 |
| **Subword** 🔥🔥 | BERT / GPT / T5 | 常見字保留整詞，罕見字切碎（WordPiece 會在非首 subword 加 `##`，例如 `playing` → `play` + `##ing`） |
| Character-level | 少數多語模型 | 一字一 token；序列過長、效率低 |

**Subword 三巨頭（這題幾乎必考）🔥🔥🔥**：

```
┌─────────────────┬──────────────────┬──────────────────────┐
│ 演算法          │ 代表模型         │ 關鍵特徵             │
├─────────────────┼──────────────────┼──────────────────────┤
│ BPE             │ GPT / Llama /    │ 合併最頻繁的         │
│ (Byte Pair Enc) │ Qwen / Gemma     │ 字元/子字元 pair；   │
│                 │                  │ GPT-2+ 改 byte-level │
├─────────────────┼──────────────────┼──────────────────────┤
│ WordPiece       │ BERT / DistilBERT│ 類似 BPE，選擇依     │
│                 │ / RoBERTa        │ likelihood 提升量    │
├─────────────────┼──────────────────┼──────────────────────┤
│ Unigram LM      │ T5 / XLNet /     │ 從大 vocab 剪掉最    │
│ (via Sentence-  │ ALBERT / mT5 /   │ 不重要的 subword；   │
│ Piece)          │ 多語模型         │ 不依賴空白（對中文   │
│                 │                  │ 更穩健）🔥           │
└─────────────────┴──────────────────┴──────────────────────┘
```

> 📌 **口訣先記**：「BERT 切 WordPiece，GPT 吃 BPE，T5 拿 Unigram（實作走 SentencePiece）」

> 🔎 **名詞釐清**：SentencePiece 是 Google 開源的 tokenizer 函式庫，支援 BPE 與 Unigram 兩種演算法；T5 / ALBERT / XLNet 多用 Unigram。考題若把「SentencePiece」當成演算法和 BPE / WordPiece 並列，嚴格來說是不精確的——但目前坊間教材常見此寫法，答題時仍以「SentencePiece 對應 T5/XLNet」判斷即可。

> 💡 **Byte-level BPE 小補充**：GPT-2 之後採用 **byte-level BPE**——直接對 UTF-8 位元組操作，對任何語言都不會 OOV，這是 GPT 系列能無痛處理中日韓文的關鍵。

> 🇹🇼 **繁中 vs 簡中 tokenization 策略**：中文（無空格）tokenization 常見策略——字元級（每個字一 token，簡單但序列太長）/ jieba 等分詞器（詞級，繁中需用繁中字典如 jieba-tw）/ BPE / Unigram（學出混合單位，BERT-Chinese 走此路）。繁簡混用時要注意字典一致性，否則同一個詞會切出不同 token。**考試若出現中文 NLP 場景題，預設是字元級 / BPE / Unigram，不要選「用空格分詞」。**

---

### 3.2 詞嵌入 Word Embeddings 🔥🔥

**定義**：把 token（字串）轉換成向量（數字陣列）的技術。模型只看得懂數字，所以 token 一定要先變向量。

**白話說明 🗣️**：
想像你在 104 人力銀行填履歷，技能欄打「Python」「JavaScript」「SQL」。電腦不認得文字，但它可以把每個技能變成一組座標（例如 Python=[0.8, 0.2, 0.5]），這樣「Python 和 Java」會很近、「Python 和 廚師」會很遠。詞嵌入就是這個「文字→座標」的動作。

**靜態 vs 語境化（這是 114.09 樣題明確標註的「進階細節」）🔥🔥**：

```
靜態詞嵌入（word2vec / GloVe）
──────────────────────────────
  "bank" ─────────► [0.3, -0.2, 0.7, ...]   ← 永遠同一個向量
  （河岸的 bank 和銀行的 bank 向量一模一樣 → 一詞多義無解）

語境化詞嵌入（ELMo / BERT）
──────────────────────────────
  "I sat on the river bank"  ─► bank = [0.1, 0.4, -0.3, ...]
  "I deposited money at the bank" ─► bank = [0.8, -0.2, 0.5, ...]
  （同一個字，上下文不同 → 向量不同 🔥）
```

**word2vec 內部兩種訓練法**：
- **Skip-gram**：給中心詞，預測周圍詞（適合小資料 + 冷門詞）
- **CBOW**（Continuous Bag of Words）：給周圍詞，預測中心詞（訓練快）

**word2vec vs GloVe 差異**：
- word2vec = 預測型（predictive，局部視窗）
- GloVe = 共現統計型（count-based，全域共現矩陣分解）
- 考試常出「哪個是預測型？」答案是 word2vec。

---

### 3.3 Transformer 架構 🔥🔥🔥

**定義**：2017 年 Vaswani et al. 發表的 "Attention Is All You Need" 所提出的模型架構。它**完全拋棄 RNN/LSTM 的循序處理**，改用 self-attention 一次性看全部位置，因此可以平行運算 + 捕捉長距依賴。

**白話說明 🗣️**：
想像你在大學做小組報告，七個組員同時在 LINE 群組裡討論。如果是 RNN，就像大家輪流講話（一個講完另一個才能開口），又慢又容易忘記最早講的人說什麼。Transformer 的 self-attention 則像是「每個人看到其他六個人的訊息之後，同時決定要回誰、要聽誰的」——一次全部處理完，快得多也記得更牢。

**為什麼 Transformer 取代 RNN/LSTM**：

| 面向 | RNN/LSTM | Transformer |
|---|---|---|
| 處理方式 | 循序 sequential | 平行 parallel |
| 長距依賴 | 梯度消失、難 | self-attention 直接建連 |
| 訓練速度 | 慢（無法平行） | 快（全部一起算） |
| GPU 利用率 | 低 | 高 |

**Self-Attention 的 Q/K/V 🔥🔥🔥**：

```
    每個 token 會產生三個向量：
    
    Query (Q) ──► 我要找什麼？
    Key   (K) ──► 我是什麼？
    Value (V) ──► 我實際能提供什麼？
    
    ┌────────────────────────────────────────────────┐
    │  Attention(Q, K, V) = softmax(QKᵀ / √d_k) · V  │
    └────────────────────────────────────────────────┘
    
    步驟：
    1. Q · Kᵀ   → 算出每個 token 對其他 token 的「相關性分數」
    2. / √d_k   → 縮放，避免分數過大（scaled dot-product）
    3. softmax  → 把分數變成機率分布（加總 = 1）
    4. · V      → 用這個機率對 Value 加權平均（所有 token 都有份）
```

> 📌 **d_k 是 key 向量維度**；除以 √d_k 是為了避免點積過大導致 softmax 梯度消失（Vaswani et al. 2017, §3.2.1）。數學展開細節（backprop、梯度推導）屬 L23 機器學習組內容，本科只需了解架構層級。

**白話 Q/K/V 🗣️**：
想像你是調酒師要調一杯客製調酒。客人說「我要偏甜、帶點果香、不要太烈」= **Query**；吧檯上每一瓶基酒的風味標籤（Gin/Rum/利口酒/果汁）= **Key**；每一瓶實際倒進杯子的液體 = **Value**。self-attention 就是把你的 Query 去比對所有 Key，算出**每瓶基酒該倒的比例**（softmax 後加起來 = 1），再按比例**混合**所有 Value 成一杯新的調酒——不是只挑一瓶最像的灌下去。

> 🔑 **這是 soft attention**（所有 token 都參與加權混合），不是 hard attention（只挑一個）。self-attention 的核心就是「軟性加權平均」——每個 token 的新表徵 = 所有 token 的 V 按權重混合。

**Multi-Head Attention 多頭注意力**：
- 單一頭只能學一種關係（例如主詞-動詞）
- 多頭（原論文 = 8 頭）讓模型同時學多種關係（語法、語意、位置、共指…）
- 像團隊分工：一個人看語法、一個人看情感、一個人看指代——最後合併

**Positional Encoding 位置編碼**：
- Transformer 沒有 RNN 的順序性，它天生「無序」
- 必須額外加入位置訊號（原論文用正弦/餘弦波）
- 否則「我打你」和「你打我」對模型來說一樣

**其他零件**（考試知道名字即可）：
- **Layer Normalization + Residual Connection（Add & Norm）**：每個子層（attention、FFN）之後都接一個「殘差 + 標準化」，避免深層網路訓練不穩。白話 🗣️：想像你在聽一段 Podcast 錄音，不同片段音量差很大——LayerNorm 會把每一層的輸出「音量」調到固定範圍（mean=0, var=1），避免某些神經元聲音太大蓋過其他人。**BatchNorm** 跨樣本算（多首歌的平均音量），**LayerNorm** 在單一樣本內跨 feature 算（同一首歌內平衡）——Transformer 用 LayerNorm，因為 batch size 很小或變動時（例如推論階段）它更穩定。
- **Position-wise Feed-Forward Network（FFN）**：每個位置套用同一個兩層全連接網路，等於 attention 之後再做一次「特徵轉換」。

**Transformer 完整資料流（考試不會考細節，但理解後很多題會秒解）**：

```
輸入文字
   │
   ▼
Tokenizer（BPE / WordPiece / SentencePiece）
   │
   ▼
Token Embedding + Positional Encoding（把每個 token 變向量並加位置資訊）
   │
   ▼
┌──────────────────────────────────┐
│ Encoder Block（堆疊 N 層）       │
│ ┌──────────────────────────────┐ │
│ │ Multi-Head Self-Attention    │ │  ◄── 每層都重複
│ │   + Add & Norm               │ │
│ │ Feed-Forward Network         │ │
│ │   + Add & Norm               │ │
│ └──────────────────────────────┘ │
└──────────────────────────────────┘
   │
   ▼
輸出向量 → 丟給分類頭 / 解碼器 / 任務頭
```

> 📌 數學展開、梯度推導、訓練迴圈程式碼屬 L23 機器學習組內容，本科只需了解架構層級。

---

### 3.4 三大架構家族 🔥🔥🔥

這是整科最高頻的考點。請務必把下面這張圖刻進腦袋。

```
┌────────────────────────────────────────────────────────────────┐
│                      Transformer 架構                          │
│                                                                │
│   ┌──────────────┐              ┌──────────────┐               │
│   │   Encoder    │  ◄──雙向──►  │   Decoder    │ ◄──單向       │
│   │  (雙向理解)  │              │  (生成)      │               │
│   └──────────────┘              └──────────────┘               │
│                                                                │
│   ┌──────────────────┬──────────────────┬──────────────────┐   │
│   │  Encoder-only    │   Decoder-only   │ Encoder-decoder  │   │
│   │  BERT / RoBERTa  │  GPT / Llama     │  T5 / BART       │   │
│   ├──────────────────┼──────────────────┼──────────────────┤   │
│   │  MLM             │  Next-token LM   │  Span corruption │   │
│   │  (mask 15%)      │  (causal)        │  / denoising     │   │
│   ├──────────────────┼──────────────────┼──────────────────┤   │
│   │ 🎯 理解類        │ 🎯 生成類        │ 🎯 seq2seq       │   │
│   │ - 文本分類       │ - 對話           │ - 翻譯           │   │
│   │ - 情感分析       │ - 續寫           │ - 摘要           │   │
│   │ - NER            │ - few-shot       │ - 生成式 QA      │   │
│   │ - 抽取式 QA      │ - 通用 LLM       │                  │   │
│   └──────────────────┴──────────────────┴──────────────────┘   │
└────────────────────────────────────────────────────────────────┘
```

**白話類比 🗣️**：
- **Encoder-only (BERT)** = 你在 7-11 當店員盤點架上所有商品。你同時看前面、後面、左右所有位置（雙向），然後回答「哪一格缺貨？」——擅長**判讀全景**。
- **Decoder-only (GPT)** = 你在 LINE 打字回訊息，一個字接一個字（單向），不能偷看還沒打出來的下一個字——擅長**往前寫**。
- **Encoder-decoder (T5)** = 你在蝦皮賣場把中文描述翻成英文給海外客人：先 encoder 把中文整句看懂（雙向），再 decoder 一字一字寫英文（單向）——擅長**兩邊等長都不固定的任務**。

**三大訓練目標（名稱與對應架構必背）🔥**：

| 訓練目標 | 白話 | 對應架構 |
|---|---|---|
| MLM（Masked Language Modeling） | 把 15% 的字挖空，模型猜回來 | Encoder-only（BERT） |
| Causal / Next-token LM | 給前面 n 個字，猜第 n+1 個 | Decoder-only（GPT） |
| Span corruption / Denoising | 把一段連續文字整段挖空或打亂，還原 | Encoder-decoder（T5/BART） |

> 📌 完整 fine-tuning 策略（LoRA、adapter、RLHF、訓練迴圈程式碼）屬 L23 機器學習組內容，本科只需了解架構層級。

---

### 3.5 NLP 任務家族

iPAS 樣題 Q3 已出現「情緒分析」正解題。你需要能把每個任務對應到架構家族。

**文本分類 Text Classification** 🔥
- 輸入：一段文字
- 輸出：一個類別標籤（垃圾信/正常、正面/負面）
- 典型：Encoder-only（BERT fine-tune）

**情感分析 Sentiment Analysis** 🔥🔥（樣題 Q3 正解）
- 判斷文本是正面、負面、中性
- 白話：蝦皮評論自動分類「好評/負評」
- 典型：Encoder-only（BERT）

**命名實體識別 NER（Named Entity Recognition）** 🔥
- 從文本抽出人名、地名、組織、時間、金額
- 白話：把一則 104 職缺描述裡的「公司名、薪水、地點」自動標出來
- 典型：Encoder-only（BERT + token classification head）

**摘要 Summarization**：
- **抽取式 Extractive**：從原文直接挑重要句子拼起來（像你考前畫重點）→ 可用 encoder-only
- **生成式 Abstractive**：用自己的話重寫一份短的（像你把論文寫成 FB 貼文）→ 典型 encoder-decoder（T5/BART）🔥

**機器翻譯 Machine Translation** 🔥
- 中→英、日→中
- 輸入輸出長度都不固定 → 典型 encoder-decoder（T5/BART）

**問答 QA**：
- **抽取式 Extractive QA**：答案是原文裡的一段（「台北 101 位於哪裡？」→ 原文中的「信義區」）→ encoder-only
- **生成式 Generative QA**：答案要自己生成 → encoder-decoder 或 decoder-only
- **RAG（Retrieval-Augmented Generation，檢索增強生成）** 🔥：現代 QA 主流架構——先用 embedding 檢索相關文件，再把檢索結果塞進 LLM prompt 產生答案。比純 LLM 回答**更不會幻覺、能引用最新資料**。中級考試會出 RAG 架構基本概念——記住「**檢索 → 增強 → 生成**」三步驟。(📎 RAG 原理細節見 L21103 生成式AI技術與應用)

**白話任務地圖 🗣️**（用你每天會碰到的 app 套進來）：

```
📱 情感分析  → 蝦皮把全部評論自動分成好評 / 負評
📱 NER      → 104 從職缺描述抽「公司 / 薪水 / 地點」
📱 分類     → Gmail 把信標成主要 / 促銷 / 社交
📱 翻譯     → Google 翻譯把日本旅遊網頁變中文
📱 摘要     → 新聞 App 把長文章壓成一段 Instagram 限動
📱 對話     → LINE 的 ChatGPT bot
📱 續寫     → 你在 IG 打到一半，鍵盤自動建議下一個字
📱 QA       → 你對 Siri 問「明天台北會下雨嗎？」
📱 RAG QA   → Perplexity / ChatGPT 開網路查詢模式回答即時新聞
```

---

### 3.6 任務 → 架構選型（Dual-constraint 題必考）🔥🔥🔥

iPAS 中級偏好「雙條件」題型：給你兩個特徵，要你選架構。熟悉下面這張對照表就搞定一半。

```
情境題關鍵字                            → 答案
────────────────────────────────────────────────────
「雙向 + 抽取式 NER」                  → Encoder-only (BERT)
「雙向 + 情感分類」                    → Encoder-only (BERT)
「autoregressive + few-shot」          → Decoder-only (GPT/Llama)
「對話 + 續寫」                        → Decoder-only (GPT)
「可變長輸入 + 可變長輸出」            → Encoder-decoder (T5/BART)
「翻譯 + 摘要」                        → Encoder-decoder (T5/BART)
「一詞多義 + 語境相關」                → 語境化詞嵌入 (BERT/ELMo)
「詞彙量大 + 未登錄詞 OOV」            → Subword tokenization
「無空白語言（中/日/泰）+ raw byte」   → Unigram (via SentencePiece)
「檢索最新資料 + 不幻覺回答」          → RAG（檢索→增強→生成）
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

### 4.2 三大架構家族對照 🔥🔥🔥

| 面向 | Encoder-only | Decoder-only | Encoder-decoder |
|---|---|---|---|
| 代表模型 | BERT, RoBERTa | GPT, Llama, Qwen | T5, BART, mT5 |
| 注意力方向 | 雙向 bidirectional | 單向 causal | encoder 雙向 + decoder 單向 |
| 訓練目標 | MLM（mask 15% 猜回來） | Next-token prediction | Span corruption / Denoising |
| 擅長任務 | 分類、情感、NER、抽取式 QA | 對話、生成、續寫、few-shot | 翻譯、摘要、生成式 QA |
| 現況（2026） | NER / 抽取式 QA 仍是基準 | 通用 LLM 主流 | 翻譯/摘要仍常用 |

### 4.3 Subword Tokenizer 對照 🔥🔥

| 演算法 | 核心邏輯 | 對應模型 | 備註 |
|---|---|---|---|
| BPE | 合併最頻繁的**字元/子字元 pair**；GPT-2+ 改 byte-level（直接對 UTF-8 位元組操作） | GPT-2 / GPT-3 / GPT-4 / Llama / Qwen / Gemma | 從底層合併到頂；byte-level 版本對任何語言不會 OOV |
| WordPiece | 選擇讓 likelihood 提升最多的合併；非首 subword 加 `##` 前綴 | BERT / DistilBERT / RoBERTa | 與 BPE 很像但選擇標準不同 |
| Unigram LM | 從大 vocab 開始剪掉最不重要的 subword | T5 / XLNet / ALBERT / mT5 / 多語模型 | 實作常用 **SentencePiece** 函式庫；不依賴空白切分 → 中/日/泰更穩 |

> 🔎 **SentencePiece ≠ 演算法**：SentencePiece 是 Google 開源的 tokenizer 函式庫，可以實作 BPE 或 Unigram。T5 / ALBERT / XLNet 雖然都用 SentencePiece，但實際採用的是 **Unigram** 演算法。考題若把 SentencePiece 與 BPE/WordPiece 並列，請理解為「Unigram (via SentencePiece)」的簡寫。

### 4.4 抽取式 vs 生成式摘要 🔥

| 面向 | 抽取式 Extractive | 生成式 Abstractive |
|---|---|---|
| 做法 | 從原文挑重要句子 | 用自己的話重寫 |
| 一定忠於原文 | ✅ | ❌（可能 hallucinate） |
| 讀起來自然 | 中等（句子拼接） | 高 |
| 典型架構 | encoder-only + 分類頭 | encoder-decoder（T5/BART） |
| 白話類比 | 考前畫螢光筆 | 幫同學整理筆記到 Instagram 限動 |

### 4.5 Self-attention vs Cross-attention

| 面向 | Self-attention | Cross-attention |
|---|---|---|
| Q 來自哪 | 同一序列 | decoder |
| K, V 來自哪 | 同一序列 | encoder |
| 出現位置 | encoder 內、decoder masked 層 | encoder-decoder 模型的 decoder |
| 功能 | 同序列內建立依賴關係 | decoder 讀取 encoder 的內容 |
| 白話 | 自己看自己（內省） | 看對面（讀取翻譯來源） |

---

## Section 5. 口訣 / Mnemonics

**5.1 三大架構 → 任務速記** 🔥🔥🔥
> **「懂雙向選 BERT，寫東西找 GPT，翻譯摘要 T5 包」**
- 理解（雙向）→ BERT
- 生成（單向）→ GPT
- 翻譯/摘要（seq2seq）→ T5/BART

**5.2 Tokenizer 對應口訣** 🔥🔥
> **「BERT 切 WordPiece，GPT 吃 BPE，T5 拿 Unigram（走 SentencePiece）」**

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

### ❌ 陷阱 2：BERT 可以生成長文字
✅ **正解**：BERT 是 **encoder-only**，只能做理解類任務（分類、NER、抽取式 QA），**不能自然生成連貫長文**。要生成請用 GPT（decoder-only）或 T5（encoder-decoder）。
> 為什麼會搞混：BERT 的 MLM 在預測被遮蔽的字，看起來像「生成」，但那只是 per-token 的填空，不是自回歸的連續生成。

### ❌ 陷阱 3：word2vec 可以處理一詞多義
✅ **正解**：word2vec 是**靜態**詞嵌入，一個字只有一個固定向量。要處理一詞多義（"bank" = 河岸 vs 銀行）必須用**語境化**詞嵌入（ELMo / BERT）。這是 114.09 樣題明確標註的「重要細節考核」。

### ❌ 陷阱 4：GPT 可以做雙向理解
✅ **正解**：GPT 是 **decoder-only / causal**，只能**由左到右**看文字，**不能**看後面還沒出現的字。要雙向理解請用 BERT。
> 為什麼會搞混：GPT-4 在回答問題時看起來「什麼都懂」，但它是靠龐大的上下文學習能力，不是靠雙向注意力——架構上它嚴格單向。

### ❌ 陷阱 5：摘要任務只能用 encoder-only
✅ **正解**：**抽取式摘要**可用 encoder-only（挑句子即可）；**生成式摘要**（abstractive）要用 encoder-decoder（T5/BART）或 decoder-only（GPT）才能改寫成自己的話。題目若強調「用自己的話重寫」或「可讀性高」，就是生成式 → encoder-decoder。

### ❌ 陷阱 6：Tokenizer 可以跨模型混用
✅ **正解**：**不行**。BERT 的 checkpoint 只能配 WordPiece tokenizer、GPT 只能配 BPE、T5 只能配 Unigram（SentencePiece 實作）。tokenizer 和模型權重是一起訓練出來的，對應關係固定。用錯 tokenizer → 模型吐亂碼。

### ❌ 陷阱 7：Transformer 不需要位置訊息（因為有 attention）
✅ **正解**：**需要**。self-attention 本身對順序不敏感（「我打你」和「你打我」attention 結果一樣），所以 Transformer 必須另外加 **Positional Encoding** 或 positional embedding，才能讓模型知道誰在前誰在後。

### ❌ 陷阱 8：GloVe 和 word2vec 都是預測型
✅ **正解**：**word2vec = 預測型**（Skip-gram/CBOW 預測鄰近詞）；**GloVe = 共現統計型**（count-based，分解全域共現矩陣）。兩者路線不同。

---

## Section 7. 情境題快速判斷（Scenario Quick-Judge）

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
