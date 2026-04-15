# V4 — 情境判斷決策樹

> 考試解題用：看到情境題，按此決策樹快速判斷屬於鑑別式、生成式、還是整合應用

```mermaid
flowchart TD
    START["❓ 題目描述了一個AI應用場景"]

    START --> Q1{"任務的目的是什麼？"}

    Q1 -->|"分類 / 預測 / 偵測\n判斷是非對錯"| DISC["🏷️ 鑑別式AI"]
    Q1 -->|"創造新內容\n生成文字/圖片/語音"| GEN["🎨 生成式AI"]
    Q1 -->|"兩者都有\n或流程中包含多步驟"| Q2{"進一步判斷整合模式"}

    Q2 --> Q3{"生成的內容是否\n經過品質審核？"}
    Q3 -->|"是：生成→檢查→回饋"| PAT1["🔗 模式1\n生—鑑—監 閉環"]

    Q2 --> Q4{"是否提到 GAN\n或對抗式訓練？"}
    Q4 -->|"是：兩個模型互相對抗"| PAT2["🔗 模式2\nGAN 協作"]

    Q2 --> Q5{"是否用AI生成資料\n來訓練另一個模型？"}
    Q5 -->|"是：合成→擴充→訓練"| PAT3["🔗 模式3\n合成數據增強"]

    Q2 --> Q6{"是否多個AI模組\n按順序串接？"}
    Q6 -->|"是：A→B→C 管線"| PAT4["🔗 模式4\n管線串接"]

    Q2 --> Q7{"是否先檢索資料庫\n再生成回答？"}
    Q7 -->|"是：檢索→生成"| PAT5["🔗 模式5\nRAG 檢索增強生成"]

    DISC --> EX_D["典型關鍵字：\n辨識、偵測、分類、預測、\n判斷、篩選、標記"]
    GEN --> EX_G["典型關鍵字：\n生成、創作、撰寫、合成、\n產出、設計、模擬"]

    style START fill:#1e293b,color:#fff
    style Q1 fill:#334155,color:#fff
    style Q2 fill:#334155,color:#fff
    style DISC fill:#bbdefb
    style GEN fill:#ffe0b2
    style PAT1 fill:#c8e6c9
    style PAT2 fill:#c8e6c9
    style PAT3 fill:#c8e6c9
    style PAT4 fill:#c8e6c9
    style PAT5 fill:#c8e6c9
    style EX_D fill:#e3f2fd
    style EX_G fill:#fff8e1
    style Q3 fill:#455a64,color:#fff
    style Q4 fill:#455a64,color:#fff
    style Q5 fill:#455a64,color:#fff
    style Q6 fill:#455a64,color:#fff
    style Q7 fill:#455a64,color:#fff
```

🔥 考試速解口訣：
1. **先看目的**：分辨→鑑別，創造→生成，兩者都有→整合
2. **再看模式**：閉環（有回饋）、GAN（對抗）、合成數據（生成訓練用）、管線（串接）、RAG（檢索+生成）
3. **抓關鍵字**：「偵測」「分類」→鑑別；「生成」「創作」→生成；「先...再...」「結合」→整合

## Gemini Image Prompt

Create a professional decision tree infographic in dark mode (dark navy #0f172a, white text). Title: "情境判斷決策樹 — 鑑別式 vs 生成式 vs 整合". Layout: top-down flowchart starting from a question "題目描述了一個AI應用場景" at the top. First decision diamond asks about the task purpose, branching into three paths: left branch (blue #60a5fa) for discriminative, right branch (orange #fb923c) for generative, center branch (green #4ade80) for integration. The integration branch further splits into 5 sub-decisions for the 5 integration patterns. Each leaf node shows the pattern name and a one-line description. Include keyword hints at the bottom of discriminative and generative branches. Style: clean flowchart with rounded nodes, clear arrows with labels, no clutter. Resolution 1920x1080. Traditional Chinese text only.
