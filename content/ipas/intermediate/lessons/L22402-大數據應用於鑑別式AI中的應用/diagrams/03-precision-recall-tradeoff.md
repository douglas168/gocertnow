# Diagram 3: Precision–Recall Tradeoff (Threshold Effect)

```
門檻值 (Threshold) 拉高 →

Precision ↑  ────────────────→  更嚴格，只報最確定的正例
Recall    ↓  ←────────────────  漏掉更多真正的正例

門檻值 (Threshold) 拉低 →

Precision ↓  ←────────────────  報了更多假正例
Recall    ↑  ────────────────→  幾乎不漏掉任何正例
```

```mermaid
flowchart LR
    T_HIGH["門檻值 高\nThreshold ↑"]
    T_LOW["門檻值 低\nThreshold ↓"]

    T_HIGH --> P_UP["Precision ↑\n（假警報少）"]
    T_HIGH --> R_DOWN["Recall ↓\n（漏報多）"]

    T_LOW --> P_DOWN["Precision ↓\n（假警報多）"]
    T_LOW --> R_UP["Recall ↑\n（漏報少）"]

    P_UP & R_DOWN --> SPAM["適合場景：垃圾郵件篩選\n（不想把正常郵件誤判為垃圾）"]
    P_DOWN & R_UP --> MED["適合場景：癌症早篩\n（寧可多查，不想漏診）"]

    style SPAM fill:#cce5ff,stroke:#004085
    style MED fill:#d4edda,stroke:#28a745
```

## 情境選題口訣

| 場景 | 重視 | 理由 |
|------|------|------|
| 詐欺偵測 (Fraud) | F1（兼顧 P & R） | 類別不平衡，Accuracy 失真 |
| 癌症篩查 (Cancer screening) | Recall ↑ | 漏診代價遠高於多查一次 |
| 垃圾郵件 (Spam) | Precision ↑ | 誤判重要信件代價高 |
| 客戶流失 (Churn) | Recall ↑ | 留住每個可能流失的客戶 |
