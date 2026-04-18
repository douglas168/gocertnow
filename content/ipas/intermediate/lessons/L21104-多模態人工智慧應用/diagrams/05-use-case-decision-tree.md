# Diagram 5 — 應用情境 → 架構選型決策樹

說明：面對多模態應用需求，如何根據輸入、輸出、訓練資源選擇合適架構。

```mermaid
flowchart TD
    Start{需求類型？} --> Q1{輸入 / 輸出<br/>模態組合？}

    Q1 --> A["圖 → 文<br/>(Captioning / VQA)"]
    Q1 --> B["文 → 圖<br/>(Text-to-Image)"]
    Q1 --> C["語音 → 文<br/>(ASR 轉錄)"]
    Q1 --> D["圖 + 文 → 相似度<br/>(檢索 / 分類)"]
    Q1 --> E["圖 + 文 → 文<br/>(多輪對話)"]

    A --> A1{訓練資源？}
    A1 -->|有限算力<br/>凍結 LLM| A2["Flamingo-style<br/>凍結視覺塔 + 凍結 LLM<br/>+ Gated Cross-Attention"]
    A1 -->|中等算力| A3["LLaVA-style<br/>凍結視覺塔<br/>+ Linear/MLP Projector"]
    A1 -->|原生多模態<br/>高算力| A4["GPT-4o / Gemini<br/>單一統一模型<br/>從頭共同訓練"]

    B --> B1["Stable Diffusion / DALL-E 3<br/>CLIP 文字編碼 → U-Net Cross-Attention<br/>多步驟去噪"]

    C --> C1["Whisper<br/>梅爾頻譜 + Encoder-Decoder<br/>多語 (99+)"]

    D --> D1["CLIP<br/>雙塔對比學習<br/>zero-shot 分類 / 圖文檢索"]

    E --> E1{需要 function<br/>calling / 即時語音？}
    E1 -->|是| E2["GPT-4o / Gemini<br/>原生多模態 (延遲低)"]
    E1 -->|否，成本優先| E3["LLaVA-NeXT<br/>開源可自部署"]

    style A2 fill:#e3f2fd,stroke:#1976d2
    style A3 fill:#e3f2fd,stroke:#1976d2
    style A4 fill:#e8f5e9,stroke:#388e3c
    style B1 fill:#fff3e0,stroke:#f57c00
    style C1 fill:#f3e5f5,stroke:#7b1fa2
    style D1 fill:#fce4ec,stroke:#c2185b
    style E2 fill:#e8f5e9,stroke:#388e3c
    style E3 fill:#e3f2fd,stroke:#1976d2
```

**決策速查表：**

| 需求 | 首選架構 | 關鍵評估指標 |
|---|---|---|
| 商品搜尋、圖文檢索、zero-shot 分類 | **CLIP** 雙塔 | Recall@K, NDCG |
| 大量圖生文（描述、VQA、報告） | **LLaVA / Flamingo** | BLEU, CIDEr, VQA Accuracy |
| 文字生成高品質圖像 | **Stable Diffusion / DALL-E 3** | FID, CLIPScore |
| 多語語音轉錄、影片字幕 | **Whisper** | WER (詞錯率) |
| 即時語音對話、影像問答 | **GPT-4o (原生)** / **Gemini** | 延遲、一致性 |
| 敏感資料需地端部署 | **LLaVA-NeXT / Llama-3-Vision / TAIDE** | (內部準確率) |

**三層決策順序：**
1. **模態方向**：輸入是什麼、輸出要什麼 → 先框定架構族
2. **訓練資源**：算力、資料量、是否可微調 → 決定是 bolt-on (projector/cross-attention) 還是原生多模態
3. **部署限制**：即時性、隱私、成本 → 決定開源 vs 商業 API、是否需要蒸餾/量化

**核心考點：**
- **CLIP ≠ 生成模型**：僅學相似度，不會生成圖像（Stable Diffusion 借用它的文字編碼器）
- **Whisper = ASR，不是翻譯模型**：雖可多語轉錄，主要任務是「語音→同語言文字」
- **GPT-4V vs GPT-4o**：4V 是 vision bolt-on 到 GPT-4；4o 是原生多模態單一模型（語音延遲 320ms → 理論下限 200ms）
- **DALL-E 2 vs DALL-E 3**：DALL-E 2 = unCLIP 架構；DALL-E 3 整合 ChatGPT，prompt 自動改寫增強
