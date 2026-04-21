# 圖5：大數據 ML 挑戰分類樹

```mermaid
mindmap
  root((大數據 ML 挑戰))
    記憶體與計算挑戰
      無法一次載入全部資料
        解法：Mini-batch / Out-of-core
      單機算力不足
        解法：分散式訓練
    資料品質挑戰
      高維度 High Dimensionality
        維度災難 Curse of Dimensionality
        解法：特徵選取 / PCA降維
      資料稀疏 Sparsity
        矩陣大量零值
        解法：稀疏矩陣格式 CSR/CSC
      資料不平衡 Class Imbalance
        少數類別難學習
        解法：SMOTE / 加權損失
    時間動態挑戰
      Concept Drift 概念漂移
        統計分佈隨時間變化
        解法：Online Learning / 定期重訓
      資料串流 Data Stream
        無法預知總量
        解法：流式學習框架
    演算法擴展性挑戰
      O(n²) 以上的演算法
        kNN 在大數據慢
        解法：近似最近鄰 ANN
      梯度更新通訊瓶頸
        解法：AllReduce / 梯度壓縮
```

> **快速判斷**：看到「單機記憶體不足」→ Mini-batch 或分散式；看到「資料動態變化」→ Online Learning；看到「高維度特徵」→ 維度災難問題。
