# GAN Training Loop（對抗式訓練循環）

Generator（生成器）與 Discriminator（判別器）的 min-max 對抗：G 想騙過 D，D 想分辨真假。

```mermaid
flowchart LR
    Z[隨機雜訊 z<br/>Random Noise]
    G[Generator G<br/>生成器]
    FAKE[假樣本 G z]
    REAL[真實資料 x<br/>Real Data]
    D[Discriminator D<br/>判別器<br/>二元分類]
    OUT{真 或 假?}
    LOSS_D[D 損失<br/>BCE<br/>最大化分辨能力]
    LOSS_G[G 損失<br/>最小化被識破機率]

    Z --> G
    G --> FAKE
    FAKE --> D
    REAL --> D
    D --> OUT
    OUT -->|更新 D<br/>梯度上升| LOSS_D
    OUT -->|更新 G<br/>梯度下降| LOSS_G
    LOSS_D -.反向傳播.-> D
    LOSS_G -.反向傳播.-> G

    classDef gen fill:#ffd7a8,stroke:#d97706,color:#000
    classDef disc fill:#fecaca,stroke:#b91c1c,color:#000
    classDef data fill:#bfdbfe,stroke:#1d4ed8,color:#000
    class G gen
    class D,OUT disc
    class REAL,FAKE,Z data
```

## 考點重點

- **Min-Max 對抗式損失**：`min_G max_D V(D,G) = E[log D(x)] + E[log(1 − D(G(z)))]`。D 想最大化，G 想最小化。
- **D 內部是 BCE（Binary Cross-Entropy）**：因為 D 做二元分類（真/假）。這是常見陷阱——整體 GAN 叫「對抗式損失」，但 D 的分類損失本質上是 BCE。
- **Nash 均衡**：理想終點是 G 生成的分佈完全等於真實分佈，D 輸出恆為 0.5（分不出來）。
- **常見問題**：模式崩塌（Mode Collapse）——G 只生成少數幾種輸出；訓練不穩定。
