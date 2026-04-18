# Diagram 03 — AI 風險管理閉環（定列量控治追）

```mermaid
flowchart LR
    classDef step fill:#1e40af,stroke:#1e3a8a,color:#fff,font-weight:bold
    classDef tool fill:#f1f5f9,stroke:#64748b,color:#0f172a

    S1["①📌 定<br/>定義範疇<br/>Use Case + 利害關係人"]:::step
    S2["②📋 列<br/>列風險清單<br/>Risk Register"]:::step
    S3["③📊 量<br/>量化評估<br/>5x5 可能性衝擊矩陣"]:::step
    S4["④🛡️ 控<br/>控制處置<br/>避免/降低/移轉/接受"]:::step
    S5["⑤📜 治<br/>治理機制<br/>政策/責任/文件"]:::step
    S6["⑥🔁 追<br/>持續追蹤<br/>監控 + 上市後回饋"]:::step

    S1 --> S2 --> S3 --> S4 --> S5 --> S6
    S6 -.新風險浮現.-> S1

    T1["🔧 工具：FRIA / AIIA / DPIA"]:::tool
    T2["🔧 工具：5x5 矩陣 / Risk Appetite"]:::tool
    T3["🔧 工具：ISO 42001 / 23894"]:::tool

    S1 -.- T1
    S3 -.- T2
    S5 -.- T3
```

**口訣對齊（study-guide §5.7）**
| 步驟 | 字 | 對應動作 | 對應工具 |
|---|---|---|---|
| ① | 定 | 定義範疇 | Use Case Canvas、利害關係人地圖 |
| ② | 列 | 列風險清單 | Risk Register |
| ③ | 量 | 量化評估 | 5x5 可能性衝擊矩陣、Risk Appetite |
| ④ | 控 | 控制處置 | 4T（Treat/Tolerate/Transfer/Terminate） |
| ⑤ | 治 | 治理機制 | ISO 42001 AIMS、政策、責任分工 |
| ⑥ | 追 | 持續追蹤 | 上市後監控、事件通報、KRI/KPI |

**對應到 NIST AI RMF**：① ② = Map｜③ = Measure｜④ ⑥ = Manage｜⑤ = Govern
