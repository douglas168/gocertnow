# Transformer Block Anatomy（Transformer 區塊解剖圖）

一個 Transformer 區塊（block）的資料流：輸入 → Self-Attention → Add & Norm → FFN → Add & Norm → 輸出。

```mermaid
flowchart TD
    X[Input Embedding<br/>x + Positional Encoding]
    MHA[Multi-Head Self-Attention<br/>softmax QK^T / √d_k · V]
    ADD1[Add ⊕<br/>Residual]
    LN1[LayerNorm]
    FFN[Feed-Forward Network<br/>Linear → GELU → Linear]
    ADD2[Add ⊕<br/>Residual]
    LN2[LayerNorm]
    Y[Output<br/>to next block]

    X --> MHA
    X -.residual.-> ADD1
    MHA --> ADD1
    ADD1 --> LN1
    LN1 --> FFN
    LN1 -.residual.-> ADD2
    FFN --> ADD2
    ADD2 --> LN2
    LN2 --> Y

    classDef attention fill:#ffd7a8,stroke:#d97706,color:#000
    classDef ffn fill:#a7e3a0,stroke:#15803d,color:#000
    classDef norm fill:#bfdbfe,stroke:#1d4ed8,color:#000
    class MHA attention
    class FFN ffn
    class LN1,LN2 norm
```

## 考點重點

- **Self-Attention 是 Transformer 的核心**：公式 `softmax(QK^T / √d_k) · V`，讓每個 token 能「看見」序列中所有其他 token，不受 RNN 單向/固定距離限制。
- **Residual + LayerNorm 缺一不可**：Residual（殘差）防止深層網路梯度消失；LayerNorm 穩定訓練。缺任一個，深層堆疊會崩潰。
- **兩個子層**：Self-Attention（學 token 關係）+ FFN（Feed-Forward，學非線性變換），兩者交替。
- **BERT 使用 Encoder-only（雙向）**；**GPT 使用 Decoder-only（單向 / Masked Self-Attention）**。這是中級高頻考點。
