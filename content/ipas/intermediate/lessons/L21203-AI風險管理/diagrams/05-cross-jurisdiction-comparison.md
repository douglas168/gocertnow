# Diagram 05 — 跨法域 / 跨框架對照

```mermaid
flowchart TB
    classDef law fill:#0e7490,stroke:#083344,color:#fff,font-weight:bold
    classDef guide fill:#7c3aed,stroke:#3b0764,color:#fff,font-weight:bold
    classDef std fill:#a16207,stroke:#451a03,color:#fff
    classDef framework fill:#15803d,stroke:#14532d,color:#fff

    subgraph LAW [" 強制法令 (Law) "]
        EU["🇪🇺 EU AI Act<br/>Reg (EU) 2024/1689<br/>分級規範 + FRIA<br/>📅 GPAI 2025-08-02 / 高風險 2026-08-02"]:::law
        TW["🇹🇼 臺灣 AI 基本法<br/>2026-01-14 公布並施行<br/>總統令 華總一義字第11500001671號<br/>主管機關：國科會 NSTC"]:::law
    end

    subgraph SOFT [" 行政指導 / 軟法 "]
        FSC["🏦 金管會「金融業運用 AI 指引」<br/>2024-06-20 發布｜行政指導（非強制法令）<br/>6 原則：治理問責 / 公平人本 / 隱私 / 穩健資安 / 透明 / 永續"]:::guide
    end

    subgraph FRAMEWORK [" 自願性框架 "]
        NIST["🇺🇸 NIST AI RMF 1.0 (2023)<br/>+ GenAI Profile (NIST AI 600-1, 2024-07-26)<br/>治盤量管 4 功能"]:::framework
        HLEG["🇪🇺 EU HLEG Trustworthy AI (2019)<br/>7 原則 → AI Act 思想前身"]:::framework
    end

    subgraph STANDARD [" 國際標準 (ISO) "]
        S42001["📐 ISO/IEC 42001:2023<br/>AIMS — 可驗證認證"]:::std
        S23894["📐 ISO/IEC 23894:2023<br/>AI 風險管理指引（不可認證）"]:::std
        S27001["📐 ISO/IEC 27001<br/>資訊安全（非 AI 專屬）"]:::std
    end

    HLEG -.思想來源.-> EU
    NIST -.方法參考.-> TW
    NIST -.方法參考.-> FSC
    S42001 -.AIMS 認證對應.-> NIST
    S23894 -.風險方法對應.-> NIST
```

**易混淆對照（study-guide §3.11、§3.12 重點）**

| 維度 | EU AI Act | 臺灣基本法 | 金管會指引 | NIST AI RMF | ISO 42001 |
|---|---|---|---|---|---|
| 性質 | 強制法令 | 強制法令（基礎） | 行政指導 | 自願性框架 | 自願性標準 |
| 主管 | 各成員國 + AI Office | 國科會 NSTC | 金管會 | NIST（無強制） | ISO（驗證機構） |
| 對象 | 全產業 | 公部門優先（§19） | 金融業 | 任意組織 | 任意組織 |
| 核心 | 風險分級 + FRIA | 7 原則 + 治理 | 6 原則 | 治盤量管 4 功能 | AIMS PDCA |
| 認證 | 高風險須符合性評估 | — | — | — | 可第三方認證 |
| 違規處罰 | 最高 €35M / 7% 全球營收 | 公部門責任 + 細則待定 | 行政監管 | 無 | 認證撤銷 |

**考點提醒**
- 「金管會指引」常被誤判為強制法令——實為**行政指導**。
- ISO 42001 是**可認證**的 AIMS；ISO 23894 是**指引**（不可認證）；ISO 27001 是**資安**標準（非 AI 專屬）。
- NIST 另有 **Cybersecurity Framework (CSF)**，與 AI RMF 為不同框架，考題愛拿來互換誘答（study-guide §3.7）。
