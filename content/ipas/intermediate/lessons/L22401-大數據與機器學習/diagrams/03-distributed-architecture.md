# 圖3：集中式 vs 分散式訓練架構

```mermaid
graph TB
    subgraph Central["🖥️ 集中式訓練 Centralized"]
        direction LR
        SD["完整資料集"] --> SM["單一機器<br/>（記憶體限制）"]
        SM --> SW["模型權重更新"]
    end

    subgraph PS["⚙️ 分散式 — Parameter Server 架構"]
        direction TB
        PSS["Parameter Server<br/>（儲存全域權重）"]
        W1["Worker 1<br/>資料分片 A"] -->|"梯度 ∇L"| PSS
        W2["Worker 2<br/>資料分片 B"] -->|"梯度 ∇L"| PSS
        W3["Worker 3<br/>資料分片 C"] -->|"梯度 ∇L"| PSS
        PSS -->|"更新後權重 W"| W1
        PSS -->|"更新後權重 W"| W2
        PSS -->|"更新後權重 W"| W3
    end

    subgraph AR["🔄 分散式 — AllReduce / Ring-AllReduce 架構"]
        direction LR
        A1["Worker 1"] --> A2["Worker 2"]
        A2 --> A3["Worker 3"]
        A3 --> A1
        A1 -.->|"Ring 同步<br/>所有節點均等"| A2
    end

    Central -.->|"資料超過單機 RAM"| PS
    PS -.->|"PS 成為瓶頸時"| AR
```

> **🔥🔥 考試區分重點**
> - **Parameter Server**：有中央協調節點，Worker 傳「梯度」→ PS 聚合 → 傳回「新權重」
> - **AllReduce / Ring-AllReduce**：無中央節點，所有 Worker 地位均等，環狀傳遞聚合
> - **Spark MLlib**：大數據分散式 ML 框架代表，基於資料並行
