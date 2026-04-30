# L21101 自然語言處理技術與應用 — Study Guide v2

> 目標：用「先理解，再判斷考題」的方式準備 iPAS AI 應用規劃師中級 L21101。

這份版本不是百科式整理，而是考試訓練路線。每個主題都照同一個節奏讀：

```text
先懂一句話 → 放回 NLP 流程 → 看例子 → 記考試判斷規則 → 練題
```

---

## 0. How to Use This Guide

建議讀法：

1. 先讀 Section 1 的 NLP pipeline，建立整體地圖。
2. Section 2-5 照順序讀，因為這就是文字進入模型後的處理順序。
3. Section 6-8 開始練考題判斷，不要只背模型名稱。
4. Section 9 專門處理陷阱題。
5. Section 10 當作考前練習題。
6. 考試當天快速複習 `Final Oral Recall`、`Exam Decision Trees`、`Trap Clinic`。

### 火力標記

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

---

## 1. The NLP Pipeline

NLP 題目最常考兩件事：

1. 這個名詞在 NLP 流程中的哪一段？
2. 這個任務應該選哪種架構？

先把整條流程記起來：

```text
Raw text 原始文字
→ Tokenization 斷詞
→ Embedding 詞嵌入
→ Transformer / Attention 理解上下文
→ Architecture family 架構家族
→ Task output 任務輸出
```

白話版：

```text
文字先切塊
切完變數字
數字進 Transformer 理解上下文
最後依任務輸出分類、摘要、翻譯、答案或生成文字
```

### 考試判斷法

| 題目問的是 | 想到 |
|---|---|
| 文字怎麼切 | Tokenization |
| 文字怎麼變成模型能算的形式 | Embedding |
| 模型怎麼看上下文 | Self-attention / Transformer |
| 任務該選哪個模型 | Encoder-only / Decoder-only / Encoder-decoder |
| 如何查文件後回答 | RAG |

### Quick Check

如果題目問「為什麼模型不能直接處理文字，必須先轉成數字？」這是在問 pipeline 的哪一段？

答案：`Embedding`。因為 embedding 負責把 token 轉成模型能計算的數字向量。

---

## 2. Tokenization 斷詞 🔥🔥

### 先懂一句話

Tokenization 是把原始文字切成模型可以處理的小單位，這些小單位叫 `token`。

```text
I am playing basketball
→ I / am / play / ##ing / basketball
```

`##ing` 表示它不是一個新詞的開頭，而是接在前面 token 後面的片段。

### Everyday Analogy

Tokenization 像把一份便當切成一口大小。模型不能一口吞完整句子，所以 tokenizer 先把文字切成適合處理的小塊。

### 在 NLP 流程中的位置

```text
Raw text → Tokenization → Embedding
```

Tokenization 只負責切文字，還沒有把文字變成向量。

### 三種切法

| 切法 | 白話 | 優點 | 問題 |
|---|---|---|---|
| Word-level | 一個完整詞一個 token | 直覺、簡單 | 遇到字典外詞 OOV；中文不能只靠空格 |
| Subword | 把詞拆成有意義的小片段 | 現代主流；能處理新詞、罕見詞 | 需要 tokenizer 訓練與 vocab |
| Character-level | 一個字元一個 token | 幾乎不會 OOV | 序列太長、效率差 |

### Subword 為什麼重要

Subword 是 word-level 和 character-level 的折衷：

```text
word-level 太粗：遇到新詞可能 OOV
character-level 太細：序列太長
subword 剛好：能拆新詞，又不會太長
```

例子：

```text
unbelievable → un / believe / able
playing → play / ##ing
```

### Subword 三大方法

| 方法 | 常見模型 | 考試記法 |
|---|---|---|
| BPE | GPT / Llama / Qwen / Gemma / **RoBERTa** | 合併常一起出現的字元或子字元 pair；RoBERTa 使用 Byte-level BPE (BBPE)，**不產生 `##` 前綴** |
| WordPiece | BERT / DistilBERT | BERT 常見；常看到 `##` 非詞首標記 |
| Unigram LM | T5 / XLNet / ALBERT / mT5 | 常透過 SentencePiece 實作；適合無空白語言 |

> 口訣：GPT/RoBERTa 吃 BPE，BERT 切 WordPiece，T5 拿 Unigram。

### 常見陷阱

| 錯誤說法 | 正確觀念 |
|---|---|
| 中文可以直接用空格切詞 | 中文沒有天然空格，不能只靠 space |
| SentencePiece 是一種模型 | SentencePiece 是 tokenizer 工具，不是模型 |
| 所有 Transformer 都用同一種 tokenizer | tokenizer 和模型權重通常是配套的 |

### 中文 NLP 補充：CKIP 🔥

**CKIP（中研院中文知識庫計劃）** 是台灣最常被引用的繁體中文 NLP 工具組，提供：

- **中文斷詞**（Word Segmentation）
- **詞性標記**（POS Tagging）
- **命名實體識別**（NER）

> 考試記法：台灣 AI 情境提到繁體中文斷詞或中文 NLP 基礎工具 → CKIP（中研院）。IPAS 為台灣本土考試，CKIP 是高頻出現的干擾選項與正確答案。

### Exam Rule

```text
OOV / 新詞 / 罕見詞 / 專有名詞 → Subword tokenization
BERT / ## 前綴 → WordPiece
GPT / byte-level → BPE
T5 / SentencePiece / 無空白語言 → Unigram
```

### Quick Check

如果題目說「模型要處理新品牌名與罕見專有名詞」，最可能考哪個概念？

答案：`Subword tokenization`。因為 subword 能減少 OOV，又不會像 character-level 那麼長。

---

## 3. Word Embeddings 詞嵌入 🔥🔥

### 先懂一句話

Word embedding 是把 token 轉成數字向量，因為模型只能計算數字。

```text
cat → [0.2, 0.8, -0.1]
dog → [0.3, 0.7, -0.2]
car → [-0.6, 0.1, 0.9]
```

意思接近的詞，向量距離通常也比較近。

### Everyday Analogy

Embedding 像把每個詞放到地圖上的座標。意思接近的詞會靠得比較近，意思差很多的詞會離得比較遠。

### 在 NLP 流程中的位置

```text
Tokenization → Embedding → Transformer
```

Tokenization 是切成 token；embedding 是把 token 變成可計算的向量。

### 最大考點：靜態 vs 語境化

| 類型 | 核心概念 | 代表方法 | 能否處理一詞多義 |
|---|---|---|---|
| Static embedding | 同一個詞永遠同一個向量 | word2vec / GloVe | 不能 |
| Contextualized embedding | 同一個詞會依上下文產生不同向量 | ELMo / BERT | 可以 |

用 `bank` 來理解：

```text
river bank → 河岸
money bank → 銀行
```

word2vec / GloVe：

```text
bank 永遠同一個向量
→ 分不出河岸與銀行
```

BERT / ELMo：

```text
bank 會依上下文變成不同向量
→ 可以分辨河岸與銀行
```

### 四個代表方法

| 方法 | 類型 | 考試關鍵字 |
|---|---|---|
| word2vec | 靜態 | 預測型；根據附近詞學向量 |
| GloVe | 靜態 | 共現統計型；看全域共現矩陣 |
| ELMo | 語境化 | 雙向 LSTM |
| BERT | 語境化 | Transformer encoder + MLM |

### word2vec 內部兩種訓練法

| 方法 | 白話 | 考試記法 |
|---|---|---|
| Skip-gram | 給中心詞，預測周圍詞 | 中心猜旁邊；適合小資料、冷門詞 |
| CBOW | 給周圍詞，預測中心詞 | 旁邊猜中心；訓練較快 |

### Exam Rule

```text
固定向量 / 查表 / Skip-gram / CBOW → word2vec
共現矩陣 / count-based / global statistics → GloVe
一詞多義 / 上下文改變意思 → BERT / ELMo
```

### Quick Check

如果題目問「哪種 embedding 可以分辨 bank 在銀行與河岸中的不同意思？」答案方向是什麼？

答案：`Contextualized embedding`，例如 `BERT / ELMo`。因為它會根據上下文改變同一個詞的向量。

---

## 4. Transformer and Attention 🔥🔥🔥

### 先懂一句話

Transformer 是用 attention 讓模型判斷「每個 token 應該注意句子裡哪些其他 token」的架構。

RNN/LSTM 像一個字一個字照順序讀；Transformer 可以讓整句話的 token 同時彼此參考。

### Everyday Analogy

Self-attention 像小組討論。每個人都能同時看其他人的訊息，再判斷哪些訊息最重要；不是只能照座位順序一個一個聽。

### 在 NLP 流程中的位置

```text
Embedding → Transformer → Task output
```

Transformer 不負責切詞，也不負責把文字變數字。它負責讓向量吸收上下文。

### Attention 三個名詞

| 名稱 | 問的是什麼 | 白話 |
|---|---|---|
| Soft attention | 怎麼加權 | 全部 token 都看，只是權重不同 |
| Self-attention | 看誰 | 同一句話內 token 彼此互看 |
| Multi-head attention | 看幾種角度 | 同時做多組 attention |

Transformer 常見核心：

```text
multi-head self-attention
```

意思是：同一句話內 token 彼此互看，而且用多個 head 從不同角度看。

### Q / K / V

每個 token 會產生三個向量：

| 名稱 | 白話 |
|---|---|
| Query (Q) | 我想找什麼資訊？ |
| Key (K) | 我身上有哪些可被比對的特徵？ |
| Value (V) | 如果你關注我，我實際提供什麼內容？ |

流程：

```text
Q 和 K 算相關性
→ softmax 變成權重
→ 用權重加總 V
```

公式：

```text
Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) · V
```

`/ sqrt(d_k)` 是縮放，避免分數太大讓 softmax 太極端，訓練變不穩。

### 為什麼需要 Positional Encoding

Self-attention 本身不自帶順序感。

```text
我打你
你打我
```

這兩句詞一樣，但順序不同，意思完全不同。所以 Transformer 要加入 positional encoding 或 positional embedding。

### Transformer 為什麼贏 RNN/LSTM

| 面向 | RNN/LSTM | Transformer |
|---|---|---|
| 處理方式 | 循序 sequential | 平行 parallel |
| 長距依賴 | 較難保留遠距資訊 | token 可直接互相注意 |
| 訓練速度 | 較慢 | 較快 |
| GPU 利用率 | 較低 | 較高 |

### Exam Rule

```text
Q/K/V → Self-attention
長距依賴 / 平行運算 / 取代 RNN → Transformer
沒有順序感 / 需要順序資訊 → Positional Encoding
同一句話內互看 → Self-attention
多個角度一起看 → Multi-head attention
```

### Quick Check

如果題目說「Transformer 為什麼比 RNN 更適合長文本？」應該提到哪些關鍵詞？

答案：`self-attention`、平行運算、長距依賴。Transformer 讓 token 直接彼此注意，不必像 RNN 一樣逐步傳遞資訊。

---

## 5. Three Transformer Families 🔥🔥🔥

### 先懂一句話

Transformer 架構可以分成三大家族：

```text
Encoder-only
Decoder-only
Encoder-decoder
```

這是 L21101 最重要的考點之一。

### Everyday Analogy

把三大家族想成三種角色：`BERT` 是閱讀理解高手，擅長看完整段文字後判斷；`GPT` 是接話寫作高手，擅長根據前文往後寫；`T5/BART` 是改寫與翻譯高手，擅長把一段文字變成另一段文字。

### 三大家族

| 架構 | 代表模型 | 看文字方式 | 擅長任務 |
|---|---|---|---|
| Encoder-only | BERT / RoBERTa | 雙向理解 | 分類、情感分析、NER、抽取式 QA |
| Decoder-only | GPT / Llama / Qwen | 單向生成 | 對話、續寫、few-shot、通用生成 |
| Encoder-decoder | T5 / BART / mT5 | encoder 理解，decoder 生成 | 翻譯、摘要、生成式 QA |

### 一句話分辨

```text
BERT = 看懂整句，適合理解類任務
GPT = 根據前文往後寫，適合生成類任務
T5/BART = 先讀懂再改寫，適合 seq2seq 任務
```

### 三大訓練目標

| 訓練目標 | 白話 | 對應架構 |
|---|---|---|
| MLM | 遮住部分 token，猜回來 | Encoder-only / BERT |
| Causal LM / Next-token | 給前文，猜下一個 token | Decoder-only / GPT |
| Span corruption（sentinel token） | 用 `<extra_id_n>` 取代連續 span，還原被遮住的片段 | Encoder-decoder / **T5** |
| Multi-noise Denoising | 文字填充、token 刪除、句子換序、文件旋轉等多種雜訊組合，還原原文 | Encoder-decoder / **BART** |

> T5 vs BART 是考試常見陷阱：兩者都是 encoder-decoder，但預訓練雜訊方式不同。T5 → sentinel span corruption；BART → 多種 denoising 雜訊。

### Exam Rule

```text
雙向 / 理解 / 分類 / NER / 抽取式 QA → Encoder-only / BERT
單向 / autoregressive / next-token / 對話 / 續寫 → Decoder-only / GPT
翻譯 / 摘要 / seq2seq / 可變長輸入輸出 → Encoder-decoder / T5/BART
```

### Quick Check

如果任務是「把英文文章翻成中文摘要」，你會選哪一類架構？

答案：`Encoder-decoder / T5/BART`。因為這是輸入文字變成另一段文字的 seq2seq 任務。

### NLP 評估指標補充 🔥

| 指標 | 全名 | 用於哪種任務 | 考試記法 |
|---|---|---|---|
| BLEU | Bilingual Evaluation Understudy | 機器翻譯、文字生成品質評估 | 翻譯 → BLEU |
| ROUGE | Recall-Oriented Understudy for Gisting Evaluation | 自動摘要評估 | 摘要 → ROUGE |

> IPAS 中級可能考「哪個指標用於機器翻譯品質評估？」→ BLEU；「哪個指標用於摘要評估？」→ ROUGE。

---

## 6. NLP Tasks and Architecture Selection 🔥🔥🔥

### 先懂一句話

選架構時，先看任務的輸出形式。

```text
輸出類別 → BERT
輸出原文片段 → BERT
輸出新文字 → GPT 或 T5/BART
輸入文字變另一段文字 → T5/BART
需要查文件再回答 → RAG
```

### Everyday Analogy

選 NLP 架構像選工具。要判斷評論好壞就用「分類工具」BERT；要寫下一句回覆就用「寫作工具」GPT；要翻譯或摘要就用「改寫工具」T5/BART。

### 任務對照表

| 任務 | 輸入 | 輸出 | 常見架構 |
|---|---|---|---|
| Text classification | 一段文字 | 類別 | Encoder-only / BERT |
| Sentiment analysis | 評論 | 正面 / 負面 / 中性 | Encoder-only / BERT |
| NER | 一段文字 | 人名、地名、組織、日期等標記 | Encoder-only / BERT |
| Extractive QA | 問題 + 文章 | 原文中的答案片段 | Encoder-only / BERT |
| Abstractive summarization | 長文章 | 新寫出的摘要 | Encoder-decoder / T5/BART |
| Machine translation | 一種語言 | 另一種語言 | Encoder-decoder / T5/BART |
| Chat / continuation | 前文 | 下一段生成文字 | Decoder-only / GPT |

### 摘要任務特別容易考

| 類型 | 做法 | 架構 |
|---|---|---|
| Extractive summary | 從原文挑重要句子 | 可用 encoder-only |
| Abstractive summary | 用自己的話重寫 | 典型 encoder-decoder |

### Fine-tuning 與 PEFT 補充 🔥

把預訓練模型調整到特定任務稱為 fine-tuning。中級考試需要知道兩種主要方式：

| 方式 | 白話 | 代表方法 |
|---|---|---|
| Full fine-tuning | 更新模型全部參數 | 效果好，但計算與記憶體成本高 |
| PEFT（Parameter-Efficient Fine-Tuning） | 只更新少量新增參數，凍結大部分權重 | LoRA、Adapter、Prompt Tuning |

**LoRA（Low-Rank Adaptation）**：在原本權重矩陣旁邊插入低秩矩陣，只訓練新插入的參數，不動原始模型權重。資源受限環境（如邊緣裝置或預算有限的微調）的常見選擇。

> 考試記法：「資源受限 / 不想更新全部參數 / 大型模型微調」→ PEFT / LoRA。

### Exam Rule

```text
判斷好評負評 → Sentiment analysis → BERT
抽出人名公司日期 → NER → BERT
答案在原文中 → Extractive QA → BERT
用自己的話摘要 → Abstractive summary → T5/BART
翻譯 → Machine translation → T5/BART
聊天續寫 → GPT
```

### Quick Check

題目說「從客服訊息中抽出訂單編號、日期、金額」，這是哪種 NLP 任務？

答案：`NER`。因為它要從文字中抽出特定實體或欄位。

---

## 7. RAG and Modern QA 🔥

### 先懂一句話

RAG（Retrieval-Augmented Generation）是「先查資料，再讓 LLM 回答」。

```text
Retrieval 檢索
→ Augmentation 把檢索結果放進 prompt
→ Generation 生成答案
```

### Everyday Analogy

RAG 像開書考。你不是只靠記憶回答，而是先翻課本或公司文件找到相關內容，再根據查到的資料作答。

### 為什麼需要 RAG

純 LLM 可能有兩個問題：

1. 不知道最新資料。
2. 可能幻覺，講得像真的但沒有依據。

RAG 的做法是先查公司文件、知識庫、網頁或資料庫，再把查到的內容交給模型回答。

### 適合 RAG 的場景

| 場景 | 為什麼適合 RAG |
|---|---|
| 公司內部 QA | 需要根據內部文件回答 |
| 最新政策查詢 | 模型訓練資料可能過時 |
| 法規、產品文件查詢 | 需要引用來源 |
| 客服知識庫 | 要降低亂回答風險 |

### Exam Rule

```text
最新資料 / 公司文件 / 引用來源 / 減少幻覺 → RAG
RAG 三步驟 → 檢索 → 增強 → 生成
```

### Quick Check

如果題目說「模型回答前要先搜尋公司內部文件，並附上引用來源」，這是哪個架構概念？

答案：`RAG`。因為它是「檢索 → 增強 → 生成」，適合查文件後再回答。

---

## 8. Exam Decision Trees

### 8.1 任務選型決策樹

```text
題目是在問 NLP 任務嗎？
│
├─ 輸出是一個類別？
│  └─ 是 → Text classification / Sentiment analysis → BERT
│
├─ 輸出是原文中的實體或答案片段？
│  └─ 是 → NER / Extractive QA → BERT
│
├─ 輸出是新生成的文字？
│  ├─ 對話 / 續寫 / few-shot → GPT
│  └─ 翻譯 / 摘要 / seq2seq → T5/BART
│
└─ 需要先查文件再回答？
   └─ 是 → RAG
```

### 8.2 概念判斷決策樹

```text
題目關鍵字是什麼？
│
├─ OOV / 新詞 / 專有名詞 → Subword tokenization
├─ BPE / WordPiece / Unigram → Tokenizer
├─ 固定向量 / 一詞多義 → Embedding
├─ Q/K/V / softmax / attention → Self-attention
├─ 位置順序 → Positional Encoding
├─ MLM / causal LM / span corruption → Training objective
└─ BERT / GPT / T5 → Architecture family
```

### 8.3 最短判斷口訣

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

## 9. Trap Clinic

### Trap 1：Transformer 是一個模型

錯。Transformer 是架構，BERT / GPT / T5 才是模型。

```text
架構：Transformer
模型：BERT / GPT / T5 / BART / Llama
```

Exam fix：

```text
題目把 Transformer 和 BERT/GPT/T5 並列時，要先分清楚層級。
```

### Trap 2：BERT 可以自然生成長文

錯。BERT 是 encoder-only，擅長理解，不擅長自回歸長文生成。

Exam fix：

```text
分類 / NER / 抽取式 QA → BERT
對話 / 續寫 / 長文生成 → GPT
翻譯 / 摘要 → T5/BART
```

### Trap 3：word2vec 可以處理一詞多義

錯。word2vec 是靜態 embedding，同一個詞永遠同一個向量。

Exam fix：

```text
一詞多義 / 上下文不同 → BERT / ELMo
```

### Trap 4：GPT 是雙向模型

錯。GPT 是 decoder-only / causal / autoregressive，只看前文預測後文。

Exam fix：

```text
雙向理解 → BERT
單向生成 → GPT
```

### Trap 5：摘要任務一定選 BERT

錯。要先分抽取式還是生成式。

```text
從原文挑句子 → Extractive → 可用 BERT
用自己的話重寫 → Abstractive → T5/BART
```

### Trap 6：Attention 自帶順序資訊

錯。Self-attention 本身不自帶順序感，需要 positional encoding。

Exam fix：

```text
順序 / 位置 / 我打你 vs 你打我 → Positional Encoding
```

### Trap 7：GloVe 和 word2vec 都是預測型

錯。

```text
word2vec → 預測型
GloVe → 共現統計型
```

### Trap 8：SentencePiece 是模型或固定演算法

錯。SentencePiece 是 tokenizer 工具，可以實作 BPE 或 Unigram。T5 常見是 Unigram via SentencePiece。

---

## 10. Practice Questions

### 10.1 Tokenization

**Q1.** 模型需要處理大量新品牌名稱與罕見專有名詞，最適合的 tokenization 策略是什麼？

答案：Subword tokenization。  
理由：能減少 OOV，又不會像 character-level 那麼長。

**Q2.** 題目出現 BERT tokenizer 與 `##ing` 前綴，應想到哪個方法？

答案：WordPiece。  
理由：BERT 家族常用 WordPiece，非詞首 subword 常用 `##`。

**Q3.** T5 / XLNet / ALBERT 常見 tokenizer 實作工具是什麼？

答案：SentencePiece。  
注意：考試要知道 SentencePiece 是工具，常見方法是 Unigram。

### 10.2 Embeddings

**Q4.** 哪種 embedding 無法分辨 `bank` 是河岸還是銀行？

答案：Static embedding，例如 word2vec / GloVe。  
理由：同一個詞永遠同一個向量。

**Q5.** 題目強調同一個詞在不同上下文有不同意思，應選哪類 embedding？

答案：Contextualized embedding，例如 BERT / ELMo。

**Q6.** word2vec 和 GloVe 最大差異是什麼？

答案：word2vec 是預測型；GloVe 是共現統計型。

### 10.3 Transformer

**Q7.** Q/K/V 出現時，通常是在考哪個概念？

答案：Self-attention。

**Q8.** 為什麼 attention 公式要除以 `sqrt(d_k)`？

答案：縮放分數，避免 softmax 太極端，使訓練較穩定。

**Q9.** Transformer 為什麼需要 positional encoding？

答案：Self-attention 本身不自帶順序感，需要額外加入位置資訊。

### 10.4 Architecture Selection

**Q10.** 判斷一則餐廳評論是正面還是負面，應選哪種架構？

答案：Encoder-only / BERT。  
理由：輸出是類別，是理解類任務。

**Q11.** 從文章中抽出人名、公司名、日期，這是哪個任務？常用架構是什麼？

答案：NER；Encoder-only / BERT。

**Q12.** 根據前面聊天紀錄生成下一句回覆，應選哪種架構？

答案：Decoder-only / GPT。  
理由：對話與續寫是自回歸生成。

**Q13.** 把英文新聞翻成中文，應選哪種架構？

答案：Encoder-decoder / T5/BART。  
理由：翻譯是 seq2seq 任務。

**Q14.** 把一篇長文章用自己的話整理成短摘要，應選哪種架構？

答案：Encoder-decoder / T5/BART。  
理由：生成式摘要是 seq2seq generation。

**Q15.** 問答系統回答前要先查公司知識庫，並附引用來源，應選什麼架構概念？

答案：RAG。  
理由：檢索 → 增強 → 生成。

### 10.5 Mixed Traps

**Q16.** 「Transformer 是 BERT、GPT、T5 之外的另一個模型。」這句對嗎？

答案：錯。Transformer 是架構，BERT/GPT/T5 是模型。

**Q17.** 「BERT 的 MLM 代表它適合生成長篇文章。」這句對嗎？

答案：錯。MLM 是填空式預訓練，不是自回歸長文生成。

**Q18.** 「GPT 是 decoder-only，所以它用 causal attention 根據前文預測後文。」這句對嗎？

答案：對。

**Q19.** 「生成式摘要可能 hallucinate，但讀起來通常比抽取式摘要自然。」這句對嗎？

答案：對。

**Q20.** 「看到最新資料、引用來源、降低幻覺，應想到 RAG。」這句對嗎？

答案：對。

---

## Final Oral Recall

考前最後 3 分鐘，把這五句唸一次：

1. `BERT` 是 encoder-only，雙向理解，適合分類、情感、NER、抽取式 QA。
2. `GPT` 是 decoder-only，causal / autoregressive，適合對話、續寫、few-shot 生成。
3. `T5/BART` 是 encoder-decoder，適合翻譯、摘要、seq2seq。
4. `word2vec/GloVe` 是靜態 embedding；`BERT/ELMo` 是語境化 embedding。
5. `RAG` 是檢索 → 增強 → 生成，用來查文件、引用來源、降低幻覺。

---

## Final Study Advice

不要只背模型名稱。考試真正想測的是你能不能從題目描述判斷：

```text
這是理解、生成、seq2seq，還是查資料後回答？
```

只要這個判斷穩，L21101 的 NLP 題目大多可以快速排除錯誤選項。
