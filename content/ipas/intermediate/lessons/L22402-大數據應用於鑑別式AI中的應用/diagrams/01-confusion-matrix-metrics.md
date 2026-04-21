# Diagram 1: Confusion Matrix → Metrics Derivation

```mermaid
flowchart TD
    CM["混淆矩陣 Confusion Matrix
    ─────────────────────────────
    實際 ↓ / 預測 →  |  正 (P)  |  負 (N)
    ─────────────────────────────
    正 (P)            |  TP      |  FN
    負 (N)            |  FP      |  TN
    ─────────────────────────────"]

    CM --> P["Precision (精確率)
    TP ÷ (TP + FP)
    ─────────────────
    預測為正的裡面
    有多少真的是正？"]

    CM --> R["Recall (召回率/靈敏度)
    TP ÷ (TP + FN)
    ─────────────────
    所有真正的正例
    有多少被找出來？"]

    CM --> A["Accuracy (準確率)
    (TP + TN) ÷ (TP+FP+FN+TN)
    ─────────────────
    所有預測中正確的比例
    ⚠️ 類別不平衡時失真"]

    P --> F1["F1-Score
    2 × P × R ÷ (P + R)
    ─────────────────
    P 與 R 的調和平均數
    ≠ 算術平均 (P+R)÷2"]

    style CM fill:#f0f4ff,stroke:#4a6fa5
    style P fill:#d4edda,stroke:#28a745
    style R fill:#d4edda,stroke:#28a745
    style A fill:#fff3cd,stroke:#ffc107
    style F1 fill:#cce5ff,stroke:#004085
```

## 記憶口訣

| 指標 | 分母是誰？ | 核心問題 |
|------|-----------|---------|
| Precision | TP + FP（預測為正） | 我說正的，對嗎？ |
| Recall | TP + FN（實際為正） | 正的有沒有漏掉？ |
| Accuracy | 全部樣本 | 整體對幾成？ |
| F1 | 調和平均 | 兼顧 P 和 R |
