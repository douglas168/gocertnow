# Diagram 4 — 自建 vs 採購 決策樹 (Build vs Buy Decision Tree)

**用途：** 對應 §3.4（解決方案階梯）+ §3.5（成本拆解）。將「Prompt → RAG → Fine-tune → From-scratch」階梯轉化為一張決策樹，含 5 個分岔點。

**Render note:** Render to PNG via Gemini downstream. Source: Mermaid flowchart.

```mermaid
flowchart TD
    Start([需要 AI 解決一個任務]) --> Q1{現成 LLM<br/>能否完成？}
    Q1 -->|Yes 直接呼叫 API| Sol1[✅ 用 Prompt Engineering<br/>成本：低 · 上線：1-2 週<br/>準確率：70-85%]
    Q1 -->|No 缺領域知識| Q2

    Q2{知識是否在<br/>內部文件中？} -->|Yes 文件可檢索| Sol2[✅ 用 RAG<br/>成本：中 · 上線：1-2 月<br/>準確率：85-94%]
    Q2 -->|No 需要學會新行為| Q3

    Q3{是否有 1000+ 筆<br/>標註訓練資料？} -->|Yes 資料夠| Q4
    Q3 -->|No 資料太少| Sol1b[⚠️ 退回 Prompt + RAG<br/>或先做資料蒐集 3-6 月]

    Q4{資料是否<br/>不能離境？} -->|Yes 個資/法規| Sol3[✅ Fine-tune 開源模型<br/>（TAIDE-8B / Llama-3.1）<br/>成本：中-高 · 上線：3-6 月<br/>準確率：90-96%]
    Q4 -->|No 可用 cloud| Sol3b[✅ Fine-tune Managed<br/>（OpenAI FT API / Bedrock）<br/>成本：中 · 上線：1-3 月]

    Q4 -.->|極罕見| Q5{是否為<br/>世界級研究機構？}
    Q5 -->|Yes 有 100M+ 預算| Sol4[⚠️ From-scratch 訓練<br/>成本：極高 · 上線：12+ 月<br/>準確率：92-97%<br/>📌 99% 企業不該走這條]
    Q5 -->|No| Sol3

    style Start fill:#1e3a5f,stroke:#fff,color:#fff
    style Sol1 fill:#3d7a3d,stroke:#fff,color:#fff
    style Sol2 fill:#3d7a3d,stroke:#fff,color:#fff
    style Sol3 fill:#5a7a3d,stroke:#fff,color:#fff
    style Sol3b fill:#5a7a3d,stroke:#fff,color:#fff
    style Sol4 fill:#a04545,stroke:#fff,color:#fff
    style Sol1b fill:#7a5a3d,stroke:#fff,color:#fff
    style Q1 fill:#2d4a7c,stroke:#fff,color:#fff
    style Q2 fill:#2d4a7c,stroke:#fff,color:#fff
    style Q3 fill:#2d4a7c,stroke:#fff,color:#fff
    style Q4 fill:#2d4a7c,stroke:#fff,color:#fff
    style Q5 fill:#2d4a7c,stroke:#fff,color:#fff
```

**閱讀重點：**
- **階梯規則：先試 Prompt → 不夠就 RAG → 還不夠才 Fine-tune → 極端少數才 From-scratch**。跳階梯（直接 fine-tune）通常是過度設計。
- **Q4「資料是否不能離境」** 是 Taiwan-specific 關鍵分岔：金融、醫療、政府案件常因個資法/金管會規定走 self-host fine-tune。
- **From-scratch 在中級考試屬於「概念知道即可」**，實務上 99% 企業不會做。學員看到題目選項出現「從零訓練」時，先問自己：**「這真的有必要嗎？」**
