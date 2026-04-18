# Diagram 02 — NIST AI RMF 1.0 四功能循環

```mermaid
flowchart TB
    classDef govern fill:#7c3aed,stroke:#3b0764,color:#fff,font-weight:bold
    classDef map fill:#0891b2,stroke:#083344,color:#fff
    classDef measure fill:#0d9488,stroke:#042f2e,color:#fff
    classDef manage fill:#65a30d,stroke:#1a2e05,color:#fff

    G["🏛️ GOVERN (治)<br/>政策、文化、責任、資源<br/>跨切式（cross-cutting），統管下列三者"]:::govern

    subgraph LIFECYCLE [" 生命週期循環 (Lifecycle) "]
        direction LR
        M["🗺️ MAP (盤)<br/>情境、利害關係人、用途、危害<br/>建 Risk Register"]:::map
        E["📏 MEASURE (量)<br/>指標、測試、文件、可信度評估<br/>跨技術 + 社會技術維度"]:::measure
        N["🛠️ MANAGE (管)<br/>排序、處置、資源配置、應變<br/>持續監控、回饋治理"]:::manage

        M --> E --> N --> M
    end

    G -.治理回饋.-> M
    G -.治理回饋.-> E
    G -.治理回饋.-> N
    N -.事件回饋.-> G

    GP["🔧 GenAI Profile (NIST AI 600-1)<br/>2024-07-26 發布，補充生成式 AI 12 類獨特風險"]
    GP -.套用於.-> LIFECYCLE
```

**口訣 vs 圖**
- 「治盤量管」= **Govern · Map · Measure · Manage**（與 study-guide §3.7、§5.3 一致）
- 「治」是中央管制塔台，恆常運轉；「盤量管」是繞著治轉的生命週期循環。
- 考題愛問「Govern 是分立步驟還是 cross-cutting？」→ 答：cross-cutting。
