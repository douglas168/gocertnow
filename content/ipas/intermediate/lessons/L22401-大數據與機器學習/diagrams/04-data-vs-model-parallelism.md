# 圖4：資料並行 vs 模型並行

```mermaid
graph LR
    subgraph DP["📦 資料並行 Data Parallelism（最常用）"]
        direction TB
        FullData["完整模型（每台 Worker 各自一份）"]
        Shard1["資料分片 1<br/>→ Worker 1"] 
        Shard2["資料分片 2<br/>→ Worker 2"]
        Shard3["資料分片 3<br/>→ Worker 3"]
        Sync["梯度同步<br/>（PS 或 AllReduce）"]
        FullData --> Shard1
        FullData --> Shard2
        FullData --> Shard3
        Shard1 --> Sync
        Shard2 --> Sync
        Shard3 --> Sync
    end

    subgraph MP["🧩 模型並行 Model Parallelism（模型太大時）"]
        direction TB
        FullData2["完整資料集（一份）"]
        Layer1["模型前半段<br/>→ GPU 1"]
        Layer2["模型後半段<br/>→ GPU 2"]
        FullData2 --> Layer1
        Layer1 -->|"中間層啟動值"| Layer2
    end

    DP -.->|"觸發條件：<br/>資料太多，模型放得下"| DP
    MP -.->|"觸發條件：<br/>模型太大，單 GPU 放不下"| MP
```

| | 資料並行 Data Parallelism 🔥🔥 | 模型並行 Model Parallelism |
|---|---|---|
| 觸發情境 | 資料量大，模型可放入單機記憶體 | 模型本身太大，無法放入單一 GPU |
| 每個 Worker 持有 | **完整模型副本** + 資料分片 | **部分模型層** + 完整資料 |
| 常見框架 | Spark MLlib、Horovod、PyTorch DDP | DeepSpeed、Pipeline Parallelism |
| L22 考試範圍 | ✅ 必考 | ✅ 認識即可（觸發條件） |
