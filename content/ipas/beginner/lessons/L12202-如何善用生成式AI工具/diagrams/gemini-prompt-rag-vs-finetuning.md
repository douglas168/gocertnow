# Gemini Image Generation Prompt — RAG vs Fine-tuning 比較海報

## Prompt

Create a comparison infographic in dark mode style (dark navy background, white/light text) with the following content in Traditional Chinese:

Title: "RAG vs Fine-tuning 一張圖搞懂" 

Split the image into two sides:

**Left side — RAG（檢索增強生成）**
- Analogy icon: Open book exam (開卷考)
- Key visual: A student looking up information in a reference book while writing
- How it works: 即時檢索外部資料 → 注入 Prompt → 生成
- Best for: 知識常更新、需引用來源
- Update cost: 低（更新資料庫即可）
- Hallucination risk: 較低（有資料佐證，但無法完全消除）
- Exam tag: 🔥🔥 初級考概念

**Right side — Fine-tuning（微調）**
- Analogy icon: Closed book exam after intensive training (閉卷考+特訓)
- Key visual: A student studying intensively before an exam
- How it works: 用資料重新訓練模型參數
- Best for: 特定領域風格/行為模式調整
- Update cost: 高（需重新訓練）
- Hallucination risk: 仍可能（訓練的是風格，不保證事實正確）
- Exam tag: ⚠️ 中級才考細節

**Bottom section — Key exam trap:**
❌ "RAG 是一種訓練方法" → ✅ "RAG 不訓練模型，是推論時即時檢索"

Style: Modern, clean, exam study material. Use contrasting but harmonious colors for the two sides. Include the 🔥🔥 markers prominently.

## Output

Save to: `content/ipas/beginner/lessons/L12202-如何善用生成式AI工具/diagrams/rag-vs-finetuning-poster.png`
