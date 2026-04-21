# Diagram 5: sklearn Classification Inference Pipeline

```mermaid
flowchart TD
    DATA["📦 大數據集\nbig_data (100M+ rows)"]

    DATA --> SPLIT["train_test_split()\n訓練集 / 測試集分割"]

    SPLIT --> XTRAIN["X_train, y_train\n訓練特徵 + 標籤"]
    SPLIT --> XTEST["X_test, y_test\n測試特徵 + 標籤"]

    XTRAIN --> FIT["model.fit(X_train, y_train)\n⬅ 學習決策邊界\n（僅訓練集）"]

    FIT --> MODEL["訓練完成的模型\nTrained Classifier"]

    MODEL --> PRED["model.predict(X_test)\n⬅ 輸出類別標籤\n[0, 1, 0, 1, ...]"]
    MODEL --> PROBA["model.predict_proba(X_test)\n⬅ 輸出各類別機率\n[[0.9, 0.1], [0.3, 0.7], ...]"]

    PRED --> METRICS["混淆矩陣 → Precision / Recall / F1\n用 sklearn.metrics 計算"]
    PROBA --> ROC["AUC-ROC 曲線\nroc_auc_score() 需要機率值"]

    style DATA fill:#f0f4ff,stroke:#4a6fa5
    style FIT fill:#d4edda,stroke:#28a745
    style MODEL fill:#cce5ff,stroke:#004085
    style PRED fill:#fff3cd,stroke:#ffc107
    style PROBA fill:#fff3cd,stroke:#ffc107
```

## 考試陷阱：predict vs predict_proba

| 方法 | 輸出 | 用途 |
|------|------|------|
| `.predict(X)` | 類別標籤 `[0, 1, 0]` | 計算 Precision / Recall / F1 / Accuracy |
| `.predict_proba(X)` | 各類別機率 `[[0.9, 0.1], ...]` | 畫 ROC 曲線、計算 AUC |
| `.fit(X, y)` | 無回傳（訓練模型） | **只能用訓練集**，不能用測試集 |
