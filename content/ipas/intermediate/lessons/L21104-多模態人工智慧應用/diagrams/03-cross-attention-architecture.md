# Diagram 3 — 視覺-語言模型交叉注意力架構 (Cross-Attention Architecture)

說明：以 Flamingo 為代表的視覺-語言 (VLM) 架構，使用凍結的視覺編碼器與 LLM，透過 **Perceiver Resampler** 與 **Gated Cross-Attention** 將影像特徵注入語言模型。Q 來自文字端、K/V 來自影像端。

```mermaid
flowchart TB
    subgraph Vision["視覺支線 (Vision Branch - 凍結)"]
        IMG[輸入影像] --> VE[凍結 Vision Encoder<br/>NFNet / ViT]
        VE --> VF["影像特徵 <br/>不定長 token 序列"]
        VF --> PR["Perceiver Resampler<br/>壓縮為固定 64 tokens"]
    end

    subgraph Language["語言支線 (LLM - 凍結)"]
        TXT[輸入文字 prompt] --> TE[Text Embedding]
        TE --> L1[LLM Block 1<br/>Self-Attention]
    end

    PR -->|提供 K, V| GX1["Gated Cross-Attention<br/>(可訓練, 新增層)"]
    L1 -->|提供 Q| GX1

    GX1 --> L2[LLM Block 2<br/>Self-Attention]
    PR -->|提供 K, V| GX2["Gated Cross-Attention<br/>(可訓練, 新增層)"]
    L2 -->|提供 Q| GX2

    GX2 --> L3[LLM Block 3<br/>...]
    L3 --> OUT["文字輸出<br/>Image Captioning / VQA"]

    style Vision fill:#e3f2fd,stroke:#1976d2
    style Language fill:#fff3e0,stroke:#f57c00
    style GX1 fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
    style GX2 fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

**Cross-Attention 公式：**

```
Q = W_q · X_text       ← Query 來自文字（主角）
K = W_k · X_image      ← Key 來自影像
V = W_v · X_image      ← Value 來自影像

Attention(Q,K,V) = softmax(Q·Kᵀ / √d_k) · V
                   └────────────────┘
                   權重：文字 token 對每個影像 token 的關注程度
```

**輸出形狀 = Q 的形狀 = 文字序列長度**（影像只是被「查詢」的記憶庫）

**核心考點：**
- **Flamingo (2022 DeepMind)** = 凍結視覺塔 + 凍結 LLM + 可訓練 gated cross-attention 層
- **Perceiver Resampler**：將不定長影像特徵壓縮為固定長度（64 tokens），解決「影像 patch 數量不一」問題
- **Gated** 機制：訓練初期門控為零 → 確保加入 cross-attention 不破壞已有 LLM 能力
- **對比 LLaVA**：LLaVA 用簡單 **linear / MLP projector**（專案器）取代 cross-attention，將影像特徵映射到 LLM 詞嵌入空間後直接拼接
- **對比 Stable Diffusion**：SD 的 cross-attention 在 U-Net 內部，Q 來自影像 latent、K/V 來自 CLIP 文字編碼 → 反向：文字指導影像生成
