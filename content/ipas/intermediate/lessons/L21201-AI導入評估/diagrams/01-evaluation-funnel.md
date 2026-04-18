# Diagram 1 — AI 導入評估流程漏斗 (Evaluation Funnel)

**用途：** 對應 §3.1（評估總覽）。展示從業務問題到最終決策的 5 階段漏斗，幫助學員建立「先收斂後決策」的順序感。

**Render note:** Render to PNG via Gemini downstream. Source: Mermaid flowchart.

```mermaid
flowchart TD
    Start([業務問題 Business Problem]) --> S1
    S1[1. 技術可行性<br/>Technical Feasibility<br/>準確率 / 延遲 / 吞吐] --> S2
    S2[2. 工具效能評估<br/>Tool Performance<br/>Benchmark / Cost / Vendor Lock-in] --> S3
    S3[3. 解決方案選擇<br/>Solution Selection<br/>Prompt → RAG → FT → Scratch] --> S4
    S4[4. 成本效益分析<br/>Cost-Benefit Analysis<br/>TCO / ROI / Payback] --> S5
    S5[5. 風險與合規<br/>Risk & Compliance<br/>個資 / 偏見 / SLA]
    S5 --> Decision{是否導入？}
    Decision -->|Go| Pilot[小規模 Pilot<br/>3 個月驗證]
    Decision -->|No-Go| Reframe[重新定義問題<br/>或暫緩導入]

    style Start fill:#1e3a5f,stroke:#fff,color:#fff
    style S1 fill:#2d4a7c,stroke:#fff,color:#fff
    style S2 fill:#2d4a7c,stroke:#fff,color:#fff
    style S3 fill:#2d4a7c,stroke:#fff,color:#fff
    style S4 fill:#2d4a7c,stroke:#fff,color:#fff
    style S5 fill:#2d4a7c,stroke:#fff,color:#fff
    style Decision fill:#a04545,stroke:#fff,color:#fff
    style Pilot fill:#3d7a3d,stroke:#fff,color:#fff
    style Reframe fill:#7a5a3d,stroke:#fff,color:#fff
```

**閱讀重點：**
- 5 階段是**收斂順序**，不可顛倒（先過濾不可行的，再評分排序剩下的）。
- 第 5 階段的「風險與合規」是**否決票**：任何一個紅燈都可能讓前 4 階段的綠燈失效（例：個資外洩風險 → 不能用 managed API）。
- Pilot 是 Go 的最小驗證單位，不是「全公司一次到位」。
