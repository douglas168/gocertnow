# 靜態 vs 情境化詞向量：word2vec vs BERT

```mermaid
flowchart TB
    subgraph S1["word2vec（靜態詞向量）"]
        W1["『蘋果發表新手機』"] --> V1["蘋果 → [0.23, -0.41, 0.88, ...]<br/>固定向量"]
        W2["『產季蘋果好吃』"] --> V1
    end

    subgraph S2["BERT（情境化詞向量）"]
        B1["『蘋果發表新手機』"] --> BV1["蘋果 → [0.91, 0.12, -0.33, ...]<br/>(偏向『科技公司』語義)"]
        B2["『產季蘋果好吃』"] --> BV2["蘋果 → [-0.27, 0.78, 0.45, ...]<br/>(偏向『水果』語義)"]
    end

    style S1 fill:#fff4e1
    style S2 fill:#e1f5ff
```

## 關鍵差異

| 維度 | word2vec (2013) | BERT (2018) |
|---|---|---|
| **向量類型** | 靜態 (static) | 情境化 (contextualized) |
| **同一詞在不同句中** | 向量相同 | 向量不同 |
| **多義詞處理 (polysemy)** | ❌ 無法區分 | ✅ 能區分 |
| **訓練方式** | 淺層 NN（CBOW / Skip-gram） | 深層 Transformer encoder + MLM |
| **訓練資料規模** | 百億 token | 千億 token（BERT-Large） |
| **下游使用** | 取向量 → 接分類器 | Fine-tune 整個模型 |
| **年代** | 2013 | 2018 |

## 🗣️ 白話說明

- **word2vec 像字典：** 每個字只查得到一個固定解釋，不管上下文
- **BERT 像有讀句子的人：** 看過整句才決定這個字在這裡是什麼意思

## word2vec 內部：CBOW vs Skip-gram

```mermaid
flowchart LR
    subgraph CBOW["CBOW：上下文預測中心詞"]
        C1["今天 / 真 / 好"] --> C2["預測：天氣"]
    end

    subgraph SG["Skip-gram：中心詞預測上下文"]
        S1["天氣"] --> S2["預測：今天 / 真 / 好"]
    end

    style CBOW fill:#e1f5ff
    style SG fill:#fff4e1
```

- **CBOW** 訓練快、對高頻詞好
- **Skip-gram** 對低頻詞表現較佳

兩者都屬**預測型 (predictive)**；GloVe 則屬**共現統計型 (count-based)**，但三者最終都輸出靜態詞向量。
