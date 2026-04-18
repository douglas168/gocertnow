# Diagram 4 — 模態編碼器對照 (Modality Encoder Comparison)

說明：不同模態的原始資料特性差異極大，對應的編碼器設計原則也不同。本圖對比文字、影像、音訊三大模態的主流編碼器。

```mermaid
flowchart TB
    subgraph Text["文字模態 (Text)"]
        T1[原始：字串序列]
        T2[Tokenizer<br/>BPE / WordPiece]
        T3[Embedding 查表]
        T4[Transformer Encoder<br/>Self-Attention]
        T5[輸出：d 維向量 / token 序列]
        T1 --> T2 --> T3 --> T4 --> T5
    end

    subgraph Image["影像模態 (Image)"]
        I1["原始：H×W×3 像素陣列"]
        I2A[CNN 路線<br/>ResNet / EfficientNet]
        I2B[Transformer 路線<br/>ViT：切 16×16 patches]
        I3[輸出：d 維向量 / patch 序列]
        I1 --> I2A
        I1 --> I2B
        I2A --> I3
        I2B --> I3
    end

    subgraph Audio["音訊模態 (Audio)"]
        A1[原始：1D 波形]
        A2A[Wav2Vec2<br/>自監督學習]
        A2B[Whisper<br/>梅爾頻譜 + Encoder-Decoder]
        A3[輸出：d 維向量 / 時間序列]
        A1 --> A2A
        A1 --> A2B
        A2A --> A3
        A2B --> A3
    end

    T5 --> Shared["共享語義空間<br/>Shared Embedding Space<br/>(CLIP / ImageBind / 多模態 LLM)"]
    I3 --> Shared
    A3 --> Shared

    style Text fill:#fff3e0,stroke:#f57c00
    style Image fill:#e3f2fd,stroke:#1976d2
    style Audio fill:#f3e5f5,stroke:#7b1fa2
    style Shared fill:#e8f5e9,stroke:#388e3c,stroke-width:3px
```

**比較表：**

| 特性 | 文字 | 影像 | 音訊 |
|---|---|---|---|
| 原始資料 | 字串序列 | 像素陣列 (H×W×3) | 1D 波形 |
| 離散 / 連續 | 離散 | 連續 | 連續 |
| 主流編碼器 | Transformer | CNN (ResNet) / **ViT** | Wav2Vec2 / **Whisper** |
| 對比學習代表 | BERT, RoBERTa | SimCLR, DINO | Wav2Vec2 |
| 多模態代表 | CLIP 文字塔 | CLIP 影像塔, ViT | AudioCLIP, ImageBind |
| 前處理 | Tokenize (BPE/WordPiece) | Resize + Normalize | 梅爾頻譜 (Whisper) |

**核心考點：**
- **各模態需要專用編碼器**：無法用同一個網路處理像素和文字（資料分布截然不同）
- **ViT vs CNN**：ViT 把影像切成 patch 後視為 token 序列 → 用 Transformer 處理（與文字統一範式）
- **Whisper (OpenAI 2022)**：多語 ASR 模型，**編碼器-解碼器 Transformer**，支援 99+ 語言，訓練資料 68 萬小時
- **Wav2Vec2**：Facebook 自監督音訊表徵模型，適合低資源語音任務
- **共享嵌入空間**：CLIP（圖+文）、ImageBind（六模態對齊到影像）是將不同模態投射到同一向量空間的代表
