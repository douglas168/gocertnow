# Diagram 3 — TCO 成本拆解堆疊圖 (TCO Breakdown Stack)

**用途：** 對應 §3.5（成本效益分析）。展示 TCO 5 大組成的相對比例，並對比「Managed API」vs「Self-host」兩種部署的成本結構差異。

**Render note:** Render to PNG via Gemini downstream. Source: Mermaid pie/bar (or render as horizontal stacked bar chart image).

```mermaid
flowchart LR
    subgraph Managed["Managed API（如 GPT-4o, Claude）"]
        direction TB
        M1["🟦 推論費用 Inference: 70%<br/>（per-token, 用越多付越多）"]
        M2["🟨 資料處理 Data Pipeline: 15%"]
        M3["🟧 整合開發 Integration: 10%"]
        M4["🟥 監控維運 MLOps: 5%"]
        M5["⬜ 硬體 Hardware: 0%"]
    end

    subgraph SelfHost["Self-host（如 TAIDE-8B on H100）"]
        direction TB
        S1["⬜ 推論費用 Inference: 0%"]
        S2["🟨 資料處理 Data Pipeline: 10%"]
        S3["🟧 整合開發 Integration: 15%"]
        S4["🟥 監控維運 MLOps: 25%<br/>（GPU 監控、自動擴縮）"]
        S5["🟦 硬體 Hardware: 50%<br/>（H100 一台 NT$130 萬+）"]
    end

    Note["📌 5 大組成記憶口訣：<br/>『硬體 + 推論 + 資料 + 整合 + 維運 = TCO』<br/>= 『硬·推·資·整·維』"]

    Managed -.-> Note
    SelfHost -.-> Note

    style Managed fill:#1e3a5f,stroke:#fff,color:#fff
    style SelfHost fill:#3d2d5f,stroke:#fff,color:#fff
    style Note fill:#7a5a3d,stroke:#fff,color:#fff
```

**閱讀重點：**
- **Managed API**：成本曲線是**用量驅動**的線性增長 — 用 100 萬 token 的成本是用 10 萬 token 的 10 倍。
- **Self-host**：成本曲線是**前期高、邊際低** — 一旦 H100 買了，多跑 10 倍 token 的硬體成本不變（只多耗電）。
- **臨界點（Break-even）公式：** `5 × X = 300 萬 + X → X ≈ 7.5 億 token / 月` 才划算自建（假設 managed = $5/M token, self-host 月固定成本 = NT$300 萬, 匯率 32）。
- 中小企業（< 1 億 token / 月）幾乎都該選 Managed API；除非有資料不能出境的硬約束。
