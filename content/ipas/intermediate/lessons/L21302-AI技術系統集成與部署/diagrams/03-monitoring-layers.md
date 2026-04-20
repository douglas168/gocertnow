# 圖三：兩層監控架構

> 對應考點：模型效能監控 — 系統監控 vs. 模型監控

```mermaid
flowchart TB
    subgraph SYS["第一層：系統健康監控（System Health）"]
        direction LR
        S1[⏱️ 延遲\nLatency\np95/p99]
        S2[📊 吞吐量\nThroughput\nRPS/QPS]
        S3[❌ 錯誤率\nError Rate\n4xx/5xx]
        S4[💾 資源使用率\nCPU/GPU/Memory]
    end

    subgraph MODEL["第二層：模型健康監控（Model Health）"]
        direction LR
        M1[📉 數據漂移\nData Drift\n輸入分布改變]
        M2[🔄 概念漂移\nConcept Drift\n目標變數關係改變]
        M3[📈 預測分布\nPrediction Drift\n輸出分布改變]
        M4[🎯 模型指標\nAccuracy/F1/AUC\n定期批次評估]
    end

    SYS --> Alert1{系統告警}
    MODEL --> Alert2{模型告警}

    Alert1 --> Action1[擴容 / 重啟\n基礎設施操作]
    Alert2 --> Action2[觸發再訓練\n or 版本回滾]
```

## 數據漂移 vs 概念漂移

```
數據漂移（Data Drift）
┌─────────────────────────────────────────┐
│  訓練時：用戶年齡分布 18-35 歲（主力）  │
│  上線後：用戶年齡分布 45-65 歲（改變）  │
│  → 輸入 X 的分布改變了                  │
└─────────────────────────────────────────┘
          ↓ 如果還沒改變 Y 的關係 = Data Drift
          ↓ 如果 X→Y 的關係也改變了 = Concept Drift

概念漂移（Concept Drift）
┌─────────────────────────────────────────┐
│  訓練時：「低價格 → 高購買意願」         │
│  上線後：「低價格 → 品質疑慮 → 低意願」 │
│  → X 和 Y 之間的關係本身改變了          │
└─────────────────────────────────────────┘
```

**考試口訣：**「數漂看輸入，概漂看關係」
- 數據漂移（Data Drift）= 輸入分布變了
- 概念漂移（Concept Drift）= X→Y 的映射關係變了（更嚴重，更難修復）

**🔥🔥 PSI（Population Stability Index）** 是偵測數據漂移最常見的指標：
- PSI < 0.1 → 穩定
- 0.1 ≤ PSI < 0.2 → 需注意
- PSI ≥ 0.2 → 明顯漂移，需再訓練
