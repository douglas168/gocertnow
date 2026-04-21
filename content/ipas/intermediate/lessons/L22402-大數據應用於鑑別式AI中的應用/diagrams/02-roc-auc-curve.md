# Diagram 2: ROC Curve & AUC

```
ROC 曲線示意圖
TPR (Recall / 靈敏度)
1.0 |★ 完美分類器 (AUC = 1.0)
    |╲·····················
    | ╲·····  ◆ 典型分類器
    |  ╲···  /  (AUC ≈ 0.8)
    |   ╲·  /
    |    ╲ /
0.5 |     ╳ ← 對角線 = 隨機猜測 (AUC = 0.5)
    |    / ╲
    |   /   ╲
    |  /     ╲
0.0 └──────────────────────
   0.0       0.5       1.0
              FPR (1 - 特異度)
```

```mermaid
graph LR
    A["AUC 解讀"] --> B["AUC = 1.0\n完美分類器\n（實際不存在）"]
    A --> C["AUC > 0.9\n優秀"]
    A --> D["AUC 0.7–0.9\n良好（多數實務場景）"]
    A --> E["AUC ≈ 0.5\n等同隨機猜測\n模型無效"]
    A --> F["AUC < 0.5\n反向預測\n（罕見）"]

    style B fill:#d4edda,stroke:#28a745
    style C fill:#d4edda,stroke:#28a745
    style D fill:#cce5ff,stroke:#004085
    style E fill:#fff3cd,stroke:#ffc107
    style F fill:#f8d7da,stroke:#dc3545
```

## 考試重點
- **X 軸 = FPR**（False Positive Rate = 1 - Specificity），**Y 軸 = TPR**（= Recall）
- AUC = ROC 曲線下面積，值域 [0, 1]
- 曲線越靠近左上角 → AUC 越大 → 模型越好
- 對角線（AUC = 0.5）= 隨機猜測基準線
