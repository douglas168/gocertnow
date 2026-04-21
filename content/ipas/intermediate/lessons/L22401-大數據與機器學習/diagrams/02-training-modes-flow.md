# 圖2：三種訓練模式資料流比較

```mermaid
flowchart LR
    subgraph FB["🔵 全批次訓練 Full-batch"]
        direction TB
        D1["全部訓練資料<br/>N 筆"] --> M1["載入記憶體<br/>（需容納全部資料）"]
        M1 --> U1["一次計算梯度<br/>更新一次權重"]
        U1 --> E1["Epoch +1<br/>重複"]
    end

    subgraph MB["🟡 小批次訓練 Mini-batch SGD"]
        direction TB
        D2["全部訓練資料<br/>N 筆"] --> S2["切成 B 筆一批<br/>共 N/B 個 batch"]
        S2 --> M2["逐批載入記憶體<br/>（只需 B 筆空間）"]
        M2 --> U2["每批更新一次權重"]
        U2 --> E2["掃完全部批次<br/>= 1 Epoch"]
    end

    subgraph OL["🟢 線上學習 Online Learning"]
        direction TB
        D3["資料流<br/>逐筆或小量到達"] --> M3["每筆/批即時處理<br/>無需儲存全部資料"]
        M3 --> U3["立即更新模型<br/>適應 Concept Drift"]
        U3 --> D3
    end

    FB -.->|"❌ 記憶體爆炸時"| MB
    MB -.->|"❌ 資料即時串流時"| OL
```

| | Full-batch | Mini-batch SGD 🔥🔥 | Online Learning 🔥 |
|---|---|---|---|
| 觸發條件 | 小資料集，完全放入記憶體 | 標準大數據 ML 選擇 | 串流資料、需即時更新 |
| 記憶體需求 | 高（全部資料） | 低（僅一個 batch） | 最低 |
| 更新頻率 | 每 epoch 1 次 | 每 batch 1 次 | 每筆/批即時 |
| Concept Drift | 無法適應 | 需重新訓練 | **天生適應** |
