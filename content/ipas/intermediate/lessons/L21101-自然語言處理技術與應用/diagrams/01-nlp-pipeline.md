# NLP 處理流程總覽 (Tokenization → Embedding → Transformer → Task Head)

```mermaid
flowchart LR
    A["原始文字<br/>Raw Text<br/>例：『今天天氣真好』"] --> B["Tokenization<br/>分詞<br/>BPE / WordPiece / Unigram"]
    B --> C["Token IDs<br/>[101, 2523, 1929, ...]"]
    C --> D["Embedding Layer<br/>詞向量<br/>+ Positional Encoding"]
    D --> E["Transformer Blocks<br/>Self-Attention + FFN<br/>× N 層"]
    E --> F{"任務頭<br/>Task Head"}
    F -->|"分類 / 情感"| G1["[CLS] → Linear → 類別"]
    F -->|"NER / 序列標註"| G2["每個 token → BIO 標籤"]
    F -->|"抽取式 QA"| G3["start / end 位置"]
    F -->|"生成 / 翻譯 / 摘要"| G4["Decoder 逐字生成"]

    style A fill:#e1f5ff
    style B fill:#fff4e1
    style D fill:#f0e1ff
    style E fill:#ffe1e1
    style F fill:#e1ffe1
```

## 備註

- **Tokenizer** 是 NLP 流程第一步，決定詞彙表大小與 OOV 處理方式
- **Embedding** 把離散 token ID 映射到連續向量空間；BERT 之前多用靜態詞向量（word2vec/GloVe），之後改用 contextualized embedding
- **Transformer** 是核心架構，2017 年提出，取代 RNN/LSTM
- **Task Head** 依任務類型加在 Transformer 之上，決定最終輸出形式
