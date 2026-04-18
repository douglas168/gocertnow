# Diagram 2 — CLIP 對比學習訓練迴圈 (Contrastive Training Loop)

說明：CLIP 使用對稱 InfoNCE loss，將 N 對 (影像, 文字) 嵌入到同一語義空間——對角線為正樣本（對應配對），非對角線為負樣本（批次內其他配對）。

```mermaid
flowchart LR
    subgraph Inputs["訓練批次 (Batch of N pairs)"]
        T1["文字 T₁<br/>a cat on sofa"]
        T2["文字 T₂<br/>a dog running"]
        TN["文字 T<sub>N</sub><br/>..."]
        I1["影像 I₁"]
        I2["影像 I₂"]
        IN["影像 I<sub>N</sub>"]
    end

    subgraph Encoders["雙塔編碼器 (Dual Encoders)"]
        TE["Text Encoder<br/>Transformer"]
        IE["Image Encoder<br/>ViT / ResNet"]
    end

    T1 --> TE
    T2 --> TE
    TN --> TE
    I1 --> IE
    I2 --> IE
    IN --> IE

    TE --> TEmb["文字嵌入<br/>t₁, t₂, ..., t<sub>N</sub>"]
    IE --> IEmb["影像嵌入<br/>i₁, i₂, ..., i<sub>N</sub>"]

    TEmb --> Sim["相似度矩陣 N×N<br/>S<sub>jk</sub> = t<sub>j</sub> · i<sub>k</sub>"]
    IEmb --> Sim

    Sim --> Loss["對稱 InfoNCE Loss<br/>對角線 = 正樣本<br/>非對角線 = 負樣本<br/>L = (L<sub>t→i</sub> + L<sub>i→t</sub>) / 2"]

    Loss -.->|反向傳播更新雙塔| TE
    Loss -.->|反向傳播更新雙塔| IE

    style Sim fill:#e8f5e9,stroke:#388e3c,stroke-width:2px
    style Loss fill:#ffebee,stroke:#c62828,stroke-width:2px
```

**相似度矩陣視覺化：**

```
              i₁    i₂    i₃    i₄
        t₁ [ ✓    ·     ·     ·  ]   ← 對角線 = 正樣本 (對應配對)
        t₂ [ ·    ✓     ·     ·  ]   ← 非對角線 = 負樣本 (批次內其他組合)
        t₃ [ ·    ·     ✓     ·  ]
        t₄ [ ·    ·     ·     ✓  ]
```

**核心考點：**
- CLIP = **Contrastive Language-Image Pre-training**
- 損失函數：**對稱 InfoNCE**（文字→影像 + 影像→文字）
- 訓練資料：**4 億 (影像, 文字描述) 對**（網路爬取，弱監督）
- 推論能力：**zero-shot 分類**（不需再訓練即可分類新類別）
- 下游應用：Stable Diffusion 文字編碼器、圖文檢索、DALL-E 2 先驗階段
