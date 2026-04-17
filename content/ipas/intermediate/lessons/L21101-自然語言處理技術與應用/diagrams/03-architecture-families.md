# Transformer 三大架構家族比較

```mermaid
flowchart TB
    T["Transformer 原架構<br/>(Vaswani et al. 2017)<br/>Encoder + Decoder"] --> EO["Encoder-Only<br/>BERT / RoBERTa / ALBERT"]
    T --> DO["Decoder-Only<br/>GPT / Llama / Qwen / Claude"]
    T --> ED["Encoder-Decoder<br/>T5 / BART / mT5 / mBART"]

    EO --> EO1["預訓練：MLM<br/>(Masked Language Modeling)"]
    EO --> EO2["雙向 (bidirectional)"]
    EO --> EO3["適合：分類、NER、<br/>抽取式 QA、情感分析"]

    DO --> DO1["預訓練：Causal LM<br/>(autoregressive)"]
    DO --> DO2["單向 (left→right)"]
    DO --> DO3["適合：對話、生成、<br/>few-shot、續寫"]

    ED --> ED1["預訓練：Span Corruption<br/>(T5) / Denoising (BART)"]
    ED --> ED2["輸入雙向 + 輸出單向"]
    ED --> ED3["適合：翻譯、摘要、<br/>text-to-text 任務"]

    style EO fill:#e1f5ff
    style DO fill:#fff4e1
    style ED fill:#f0e1ff
```

## 🗣️ 白話記憶法

| 家族 | 角色類比 | 口訣 |
|---|---|---|
| **Encoder-only (BERT)** | 閱讀理解考生 | 「讀懂就好，不用寫」 |
| **Decoder-only (GPT)** | 接龍寫作家 | 「一字一字往下寫」 |
| **Encoder-decoder (T5)** | 翻譯 / 改寫員 | 「讀進來，再寫出去」 |

## Tokenizer × 家族對應（考試必考）

| 模型 | Tokenizer | 演算法 |
|---|---|---|
| BERT / ALBERT | WordPiece | 最大化語言模型概率 |
| GPT / Llama | (byte-level) BPE | 合併高頻字元對 |
| T5 / mT5 / XLNet | SentencePiece (函式庫) | Unigram LM 演算法 |

> ⚠️ **陷阱：** SentencePiece 是 Google 的 tokenizer **函式庫**，內部演算法是 BPE 或 Unigram LM —— 不要把函式庫當成演算法。
