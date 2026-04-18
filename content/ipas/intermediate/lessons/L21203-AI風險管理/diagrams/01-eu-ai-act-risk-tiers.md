# Diagram 01 — EU AI Act 四層風險金字塔

```mermaid
flowchart TB
    classDef prohibited fill:#dc2626,stroke:#7f1d1d,color:#fff,font-weight:bold
    classDef high fill:#ea580c,stroke:#7c2d12,color:#fff,font-weight:bold
    classDef gpai fill:#ca8a04,stroke:#713f12,color:#fff
    classDef minimal fill:#16a34a,stroke:#14532d,color:#fff

    A["🚫 禁止實務 Prohibited (Art.5)<br/>社會評分 / 認知行為操控 / 即時遠端生物辨識(執法)<br/>職場-學校情緒辨識 / 敏感屬性生物分類 等 8 類<br/>📅 2025-02-02 已生效"]:::prohibited
    B["⚠️ 高風險 High-Risk (Annex III + Annex I)<br/>就業、教育、醫療、司法、執法、關鍵基礎設施…<br/>須 FRIA / 風險管理 / QMS / 上市後監控<br/>📅 Annex III: 2026-08-02｜Annex I: 2027-08-02"]:::high
    C["🤖 GPAI 通用 AI<br/>基礎模型透明度義務<br/>系統性風險：紅隊測試 / 事件通報 / 資安<br/>📅 2025-08-02 義務生效"]:::gpai
    D["✅ 最小風險 / 透明度義務<br/>聊天機器人、deepfake 揭露、合成內容標記<br/>多數 AI 系統落於此層"]:::minimal

    A --> B --> C --> D

    note["⚖️ 規範強度由上而下遞減<br/>同一案件可能同時觸發多層義務"]
```

**閱讀重點**
- 金字塔自上而下「禁止 → 高風險 → GPAI → 最小」對應規範密度。
- 「職場/學校情緒辨識」與「敏感屬性生物特徵分類」屬 Art.5 禁止，**不要** 再進高風險評估流程（study-guide §3.5.1）。
- 高風險義務分兩波生效（Annex III 2026-08-02、Annex I 2027-08-02），考題愛拿日期當誘答。
