# 圖二：四大部署策略比較

> 對應考點：模型更新管理 — Canary / Shadow / Blue-Green / A/B Testing

```mermaid
flowchart TB
    subgraph BG["藍綠部署（Blue-Green）"]
        direction LR
        BG_LB[負載均衡器] -->|100% 流量| BG_Blue[舊版 Blue\n生產環境]
        BG_LB -.->|切換後 100%| BG_Green[新版 Green\n待命中]
        BG_Note["✅ 零停機\n✅ 一鍵回滾\n⚠️ 需雙倍資源"]
    end

    subgraph Canary["金絲雀部署（Canary）"]
        direction LR
        C_LB[負載均衡器] -->|90% 流量| C_Old[舊版]
        C_LB -->|10% 流量| C_New[新版\n金絲雀]
        C_Note["✅ 風險可控\n✅ 逐步擴大\n⚠️ 需流量分割"]
    end

    subgraph Shadow["影子部署（Shadow）"]
        direction LR
        S_LB[負載均衡器] -->|100% 流量| S_Old[舊版\n真實回應]
        S_LB -.->|鏡像流量| S_New[新版\n影子模式\n不回應用戶]
        S_Note["✅ 零風險驗證\n✅ 真實流量測試\n⚠️ 結果不影響用戶"]
    end

    subgraph AB["A/B 測試（A/B Testing）"]
        direction LR
        AB_LB[負載均衡器] -->|群組 A| AB_A[版本 A\n50% 用戶]
        AB_LB -->|群組 B| AB_B[版本 B\n50% 用戶]
        AB_Note["✅ 商業效果對比\n✅ 統計顯著性\n⚠️ 非快速部署工具"]
    end
```

## 🔥🔥 四策略快速對照表

| 策略 | 用戶看到新版？ | 核心目的 | 回滾方式 |
|---|---|---|---|
| 藍綠部署 | 切換後全部看到 | 零停機切換 | 流量打回 Blue |
| 金絲雀 | 部分用戶先看到 | 漸進式上線 | 減少金絲雀比例→0% |
| 影子部署 | **不看到** | 上線前無風險驗證 | 直接移除影子 |
| A/B 測試 | 各一半 | **商業效果比較** | 選勝出版本 |

**考試陷阱：**
- ❌ 「Canary = A/B Testing」→ 錯！Canary 是部署漸進策略，A/B 是商業效果實驗
- ❌ 「Shadow 部署的用戶會看到不同結果」→ 錯！Shadow 結果不回應給用戶
