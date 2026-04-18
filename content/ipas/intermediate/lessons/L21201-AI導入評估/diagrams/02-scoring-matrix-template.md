# Diagram 2 — 加權評分矩陣模板 (Weighted Scoring Matrix Template)

**用途：** 對應 §3.4（適用解決方案選擇）+ §3.7（雙約束篩選）。展示一個可直接套用的 4-criteria × 3-vendor 評分矩陣，含敏感度註解。

**Render note:** Render to PNG via Gemini downstream. Source: Mermaid table block (or render as static table image).

```mermaid
flowchart TB
    subgraph Matrix["加權評分矩陣（範例：客服 chatbot 選型）"]
        direction TB
        Header["| 評估準則 | 權重 | GPT-4o | Claude Sonnet 4.6 | TAIDE-8B (self-host) |<br/>|---|---|---|---|---|"]
        R1["| 準確率（中文客服題） | 0.35 | 9 × 0.35 = 3.15 | 9 × 0.35 = 3.15 | 7 × 0.35 = 2.45 |"]
        R2["| 月成本（NT$ 上限 30 萬） | 0.30 | 5 × 0.30 = 1.50 | 6 × 0.30 = 1.80 | 8 × 0.30 = 2.40 |"]
        R3["| p95 延遲（< 800ms） | 0.20 | 7 × 0.20 = 1.40 | 7 × 0.20 = 1.40 | 9 × 0.20 = 1.80 |"]
        R4["| 資料殘留風險 | 0.15 | 5 × 0.15 = 0.75 | 6 × 0.15 = 0.90 | 10 × 0.15 = 1.50 |"]
        Total["**加權總分** | 1.00 | **6.80** | **7.25** | **8.15** ✅"]
        Header --> R1 --> R2 --> R3 --> R4 --> Total
    end

    Sensitivity["📌 敏感度提醒：<br/>若把『資料殘留風險』權重從 0.15 → 0.30（金融/醫療場景），<br/>TAIDE 領先擴大到 ~1.5 分；GPT-4o 反而墊底。<br/>→ 結論：權重決定排序，沒有『絕對最佳模型』。"]

    Total -.-> Sensitivity

    style Matrix fill:#1e3a5f,stroke:#fff,color:#fff
    style Sensitivity fill:#7a5a3d,stroke:#fff,color:#fff
```

**閱讀重點：**
- **加權總分 = Σ(分數 × 權重)**，總權重必須 = 1.00。
- 分數採 1-10 標度（10 = 最佳），不要用百分比（會被「99.9% vs 99.99%」這種小差距誤導）。
- **敏感度分析（Sensitivity Analysis）** 是中級必考點：改一個權重 ±10%，看看排序是否翻盤；若翻盤 = 結論不穩固。
- 此矩陣**不取代**雙約束硬條件過濾（§3.7）— 應先過濾掉不滿足硬約束的選項，再對剩下的評分。
