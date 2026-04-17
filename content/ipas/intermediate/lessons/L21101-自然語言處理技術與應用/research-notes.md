# Research Notes: L21101 自然語言處理技術與應用

## Official Sources

- **iPAS 官方 115 年度簡章 (115.01 版)** — 中級科目一「人工智慧技術應用與規劃」列 NLP 為主要章節，樣題擴增至每科 15 題（舊版 5 題 → 新版 15 題，增加 200%），整體難度與細節度顯著提升。
  URL: https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115年度AI應用規劃師能力鑑定簡章(初級、中級)_0105_20260105184002.pdf
- **iPAS 官方學習指引 科目一** — 明確列出 NLP 子項：tokenization、word embedding (word2vec/GloVe/BERT)、Transformer self-attention、LLM 架構。
  URL: https://www.ipas.org.tw/api/proxy/uploads/certification_resource/.../AI應用規劃師(中級)-學習指引-科目1_20251222101833.pdf
- **114 年第二次 公告試題 中級科目一** — 官方正式考題公開檔。
  URL: https://www.ipas.org.tw/api/proxy/uploads/certification_resource/.../114年第二梯次中級AI應用規劃師第一科...公告114_20251226000616.pdf
- **Attention Is All You Need (Vaswani et al. 2017)** — arXiv:1706.03762 — Transformer 原始論文，Q/K/V scaled dot-product、multi-head、sinusoidal positional encoding 全部定義來源。
- **BERT (Devlin et al. 2018)** — arXiv:1810.04805 — MLM (~15% token mask) + NSP 預訓練目標；雙向 encoder。
- **Hugging Face Tokenizer Summary** — https://huggingface.co/docs/transformers/tokenizer_summary — 三大 subword 演算法 (BPE / WordPiece / Unigram/SentencePiece) 權威對應表：GPT-2/Llama→BPE、BERT→WordPiece、T5/XLNet→SentencePiece。

## Community Insights (exam patterns)

來源：vocus CCChen 多篇中級備考/考題回顧文（05/17 實考、114.09 樣題、科目一整理）

- **最高頻考點**：BERT vs GPT「雙向 vs 單向訓練」差異 — 05/17 實考直接問「BERT與GPT的差異？」標準答案即 "BERT 是雙向、GPT 是單向"。
- **詞嵌入題型**：樣題 Q10 直接考「NLP 詞嵌入技術」→ 正解 Word2Vec；常見陷阱選項 = TF-IDF（非 embedding，是 sparse 統計）、One-hot（非學習式）、LDA（主題模型）。
- **Tokenization 題型**：樣題 Q2 考「將接續文本轉換為詞彙單位」→ 正解「斷詞 (Tokenization)」；易混淆選項 = 詞幹還原 (stemming)、詞形還原 (lemmatization)、停用詞移除。
- **NLP 用途題**：樣題 Q3 正解「情緒分析 (sentiment analysis)」；干擾項常放「影像分類」「語音合成」等跨模態誤導。
- **Word2Vec vs GloVe**：常被要求辨識「預測型 (predictive) vs 共現統計型 (count-based)」。Word2Vec = 預測（CBOW/Skip-gram）、GloVe = 全域共現矩陣分解。
- **Transformer 機制題**：考「自注意力 + 多頭 + 支援長距依賴 + 平行運算」四個關鍵詞同時出現；RNN 為對照組（循序、梯度消失、無法平行）。
- **動態 vs 靜態詞向量**：BERT 會依上下文產生不同向量（"bank" 在河岸 vs 銀行），Word2Vec/GloVe 為單一固定向量 — 此差異在 114.09 樣題解析中被標註為「重要細節考核」。

## Current State (technology topic)

- **Tokenization 主流三選一**：BPE (GPT 族、Llama、Qwen2、Gemma) / WordPiece (BERT 族) / SentencePiece + Unigram (T5、XLNet、多語模型)。SentencePiece 的關鍵優勢：將文字當作 raw byte stream，不依賴空白切分，對中/日/泰等無空白語言更穩健 — 這是 IPAS 繁中考試會強調的區別。
- **三大架構家族（2026 exam-ready 版）**：
  - **Encoder-only (BERT, RoBERTa)** → MLM 預訓練 → 擅長理解類任務：文本分類、情感分析、NER、抽取式問答。
  - **Decoder-only (GPT, Llama, Qwen)** → causal / autoregressive LM → 擅長生成：文本生成、對話、續寫、few-shot prompting。此家族已成為 2024–2026 LLM 主流。
  - **Encoder-decoder (T5, BART, mT5)** → span corruption (T5) 或 denoising (BART) → 擅長 seq2seq：機器翻譯、摘要、生成式問答。
- **未棄用但趨勢轉移**：BERT/T5 仍是 NER、抽取式 QA 的 SOTA 基準；但通用 LLM 應用已明顯倒向 decoder-only + instruction tuning。考試層面兩條路線都要會。
- **ELMo** 已屬歷史背景（LSTM-based contextualized embeddings），考試只需知道「ELMo = 第一代 contextualized embedding，BERT 是 Transformer 版繼任者」。

## External Documents Found

- **arXiv:1706.03762 (Attention Is All You Need)** — Transformer 架構定義：Encoder stack + Decoder stack、Scaled Dot-Product Attention、Multi-Head Attention (8 heads default)、Sinusoidal Positional Encoding、Position-wise FFN、Add & Norm。
- **arXiv:1810.04805 (BERT)** — 雙向 Transformer encoder、MLM 目標 (mask 15% tokens，其中 80% 換 [MASK]、10% 換隨機詞、10% 保留原詞)、Next Sentence Prediction、pretrain→fine-tune 範式。
- **Hugging Face Transformers docs** — 模型卡片與 tokenizer 對應、pipeline API (text-classification / token-classification / summarization / translation / question-answering) 是中級考試「任務-架構對應」題的現代對照表。
- **T5 (arXiv:1910.10683)** — text-to-text 統一框架、span corruption 目標；BART (arXiv:1910.13461) — denoising autoencoder 目標。

## Key Findings Summary

1. **中級考試已確認考 BERT / Transformer / word2vec / tokenization 原字**（vocus 05/17 實考 + 114.09 樣題雙重驗證），此為 L21101 必命中核心。
2. **最高投報率考點 = "雙向 vs 單向" + "encoder vs decoder vs encoder-decoder 對應任務"** — 幾乎每次實考都以某種形式出現。
3. **Tokenizer 對應模型**是冷門但高頻陷阱：BERT→WordPiece、GPT→BPE、T5→SentencePiece — 混搭選項是常見干擾。
4. **靜態 vs 動態詞向量**：word2vec/GloVe 單一向量 vs BERT 依上下文變化 — 官方解析明確標為「進階細節」。
5. **Dual-constraint 題型預測**：例如「同時支援雙向理解 AND 抽取式 NER」→ encoder-only (BERT)；「同時要求可變長輸入 AND 可變長輸出」→ encoder-decoder (T5/BART)；「autoregressive 生成 AND few-shot prompting」→ decoder-only (GPT)。

## Scope Notes

- **排除（屬 L23 機器學習組深度學習內部）**：backprop 梯度公式、Adam/LR schedule 細節、dropout 數學、loss function 推導、layer-norm vs batch-norm 內部計算、完整訓練迴圈程式碼。中級 L21101 只要認得「MLM / causal LM / span corruption」三個訓練目標的**名稱與對應架構**即可，不考數學展開。
- **排除（屬 初級 L11401 已覆蓋）**：discriminative vs generative 基本定義 — 中級直接用架構家族名稱 (encoder-only / decoder-only / encoder-decoder) 取代，不再回頭解釋。
- **排除（屬 初級 L12202 已覆蓋）**：prompt engineering 技巧、工具操作 (ChatGPT / Copilot UI)。中級若出現「prompt」字眼，只會在 in-context learning / few-shot 作為 decoder-only 架構能力的佐證。
- **邊界提醒**：fine-tuning 在 L21101 可點名（"pretrain → fine-tune 範式由 BERT 確立"），但完整 fine-tuning 策略（LoRA、adapter、RLHF）屬 L22 或 L23 範疇，L21101 不展開。
- **L24 / L25（應用規劃 / 治理）不在本課**：模型選型決策流程、成本評估、資料治理等即使與 NLP 有關也不在 L21101 研究範圍。
