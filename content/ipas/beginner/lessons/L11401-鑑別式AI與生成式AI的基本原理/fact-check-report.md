# Fact Check Report: L11401 鑑別式AI與生成式AI的基本原理

## Summary
- Verified claims: 52
- Flagged issues: 5 (1 error, 0 stale, 2 unsupported, 2 misleading)

## Verified Claims

### Section 1 — 考試對應範圍
- [OK] Line 7: "對應評鑑範圍：L11401 鑑別式AI與生成式AI的基本原理" — confirmed via syllabus.yaml L105-106: code L11401, name matches
- [OK] Line 9: "所屬主題：L114 鑑別式AI與生成式AI" — confirmed via syllabus.yaml L102-103
- [OK] Line 11: Keywords list (鑑別式AI基本原理, 生成式AI基本原理, 技術測試與驗證, 模型目的與特性, 模型部署, 效能管理) — confirmed via syllabus.yaml L107-113

### Section 3.1 — 鑑別式AI基本原理
- [OK] Line 83: "拿到一筆資料，告訴你它「是什麼」或「會怎樣」" — confirmed via research-notes L79: "給定輸入 x，輸出 y 的概率"
- [OK] Line 85-86: Application examples (垃圾郵件, X光片, 交易紀錄) — confirmed via research-notes L84-90
- [OK] Line 92-97: Discriminative AI characteristics table (分類/預測/迴歸, 有標註資料, 監督式學習, 決策邊界) — confirmed via research-notes L78-99
- [OK] Line 94: "需要有標註的資料（Labeled Data）" — confirmed via research-notes L99 and L25 (經濟部: 有標註資料進行辨識分類)
- [OK] Line 97: "找到最佳的決策邊界（Decision Boundary）" — confirmed via research-notes L80
- [OK] Lines 107-114: Application scenario table (spam, fraud, medical, defect, sentiment, OCR, face, license plate) — confirmed via research-notes L84-90
- [OK] Lines 122-126: Discriminative model list (Logistic Regression, SVM, Decision Tree/Random Forest, Gradient Boosting, Neural Networks for classification) — confirmed via research-notes L93-97

### Section 3.2 — 生成式AI基本原理
- [OK] Line 145: "學習資料長什麼樣子，然後創造出全新的、以前不存在的內容" — confirmed via research-notes L104-106
- [OK] Line 155: "生成全新的文字、圖像、音頻、影片、程式碼、3D模型" — confirmed via research-notes L108-114
- [OK] Line 156: "可以使用未標註的資料（Unlabeled Data）" — confirmed via research-notes L122
- [OK] Line 157: "可使用非監督式學習" — confirmed via research-notes L122
- [OK] Line 159: "學習資料分布（Data Distribution）" — confirmed via research-notes L104
- [OK] Lines 163-170: Application scenario table with representative tools (ChatGPT/Claude, DALL-E/Midjourney/Stable Diffusion, GitHub Copilot, Suno/ElevenLabs, Sora) — confirmed via research-notes L108-114
- [OK] Lines 178-181: Generative model list (GAN, VAE, Diffusion Model, Autoregressive/GPT) — confirmed via research-notes L117-120
- [OK] Line 183: GAN/VAE/Diffusion internal architecture is intermediate-level — confirmed via research-notes L193

### Section 3.3 — 技術測試與驗證
- [OK] Line 228-230: PoC definition (小規模實驗確認方向走得通) — confirmed via research-notes L136
- [OK] Lines 247-248: Bias = underfitting, Variance = overfitting — confirmed via research-notes L137
- [OK] Lines 259-263: Imbalanced data should use Recall — confirmed via research-notes L139
- [OK] Line 277: Regulatory Sandbox definition (政府提供安全實驗區) — confirmed via research-notes L140

### Section 3.3 — 鑑別式 vs 生成式特性對比
- [OK] Lines 284-296: Comparison diagram (目的, 特性, 資料需求, 輸出, 評估, 可解釋性, 幻覺) — confirmed via research-notes L126-133 comparison table. The addition of "決策可解釋性較高" for discriminative and "可能產生幻覺" for generative is accurate general AI knowledge.

### Section 3.4 — 模型部署
- [OK] Lines 309-311: Cloud deployment characteristics (強大計算力, 高可擴展性, 延遲較高) — confirmed via research-notes L146
- [OK] Lines 316-318: Edge deployment characteristics (低延遲, 資料不離場, 算力有限) — confirmed via research-notes L147
- [OK] Lines 321-323: On-Premise deployment characteristics (完全本地化, 低延遲, 高初期投資) — confirmed via research-notes L148
- [OK] Lines 327-329: Hybrid deployment (雲端訓練 + 邊緣推理) — confirmed via research-notes L149
- [OK] Line 365: "2026年考試新增了邊緣運算 vs 即時推論的場景判斷題" — confirmed via research-notes L151-152
- [OK] Lines 452: Deployment scenario mapping (大模型訓練→雲端, IoT/手機→邊緣, 高安全/合規→內部部署) — confirmed via research-notes L146-148

### Section 3.4 — 效能管理
- [OK] Lines 372-376: Latency definition (輸入到回應時間) — confirmed via research-notes L158
- [OK] Line 377: TTFT and per-token latency concepts — confirmed via research-notes L158
- [OK] Lines 380-381: Throughput definition (token/秒, 吞吐量越高投資回報越高) — confirmed via research-notes L159
- [OK] Lines 387-388: Training cost is one-time, inference cost is continuous — confirmed via research-notes L161
- [OK] Line 392: "推理成本會隨使用量持續增長，是 AI 應用長期營運的最大成本來源" — confirmed via research-notes L161
- [OK] Lines 410-412: Data Drift definition (真實資料和訓練資料漸漸不同) — confirmed via research-notes L154
- [OK] Lines 414-418: Model monitoring (定期檢查, 異常告警, 重新訓練) — confirmed via research-notes L162

### Section 4 — 易混淆概念比較表
- [OK] Lines 428-440: Core comparison table — all entries confirmed via research-notes L126-133 comparison table and sections above
- [OK] Lines 443-453: Cloud vs Edge vs On-Prem table — confirmed via research-notes L144-149
- [OK] Lines 457-463: Latency vs Throughput vs Cost table — confirmed via research-notes L158-161

### Section 6 — 考試陷阱
- [OK] Lines 511-514: Trap 1 (生成式AI不只文字) — confirmed via research-notes L108-114
- [OK] Lines 517-520: Trap 2 (鑑別式不只分類) — accurate; regression and anomaly detection are standard discriminative tasks
- [OK] Lines 523-526: Trap 3 (部署不只雲端) — confirmed via research-notes L144-149
- [OK] Lines 529-540: Trap 4 (SVM/VAE/GAN classification) — confirmed via research-notes L92-120
- [OK] Lines 543-546: Trap 5 (Data Drift is post-deployment) — confirmed via research-notes L154 and L203
- [OK] Lines 549-552: Trap 6 (Accuracy misleading for imbalanced data) — confirmed via research-notes L139
- [OK] Lines 555-558: Trap 7 (推理成本持續增長) — confirmed via research-notes L161

### Section 7 — 情境題快速判斷
- [OK] Lines 566-582: Discriminative vs Generative scenario table — all scenarios consistent with research-notes L84-114
- [OK] Lines 586-596: Model classification table — confirmed via research-notes L92-120
- [OK] Lines 600-610: Deployment scenario table — confirmed via research-notes L144-149
- [OK] Lines 614-623: Performance indicator table — confirmed via research-notes L136-162

---

## Flagged Issues

### Errors

- [ERROR] Line 13: "預估出題數：4-6 題"
  - **What's wrong**: The study guide claims 4-6 questions will appear from this single lesson topic (L11401). The syllabus YAML (L102-115) shows L114 contains two sub-topics: L11401 and L11402. The iPAS beginner exam has two subjects of 50 questions each (100 total), spread across all topics in the syllabus. With L114 being one of multiple topics under Subject 1, estimating 4-6 questions for just L11401 alone appears inflated. No source in the research notes provides a per-topic question count estimate.
  - **Fix**: Either remove the estimate, or soften it to something like: "預估 L114 整個主題出題數：3-5 題（L11401 + L11402 合計）" and cite the basis for the estimate. If no basis exists, remove the number entirely and replace with qualitative guidance like "本主題為高頻考點".

### Stale Information

(none found)

### Unsupported Claims

- [UNSUPPORTED] Line 92: "異常偵測（Anomaly Detection）" listed as a core task of discriminative AI
  - **What's wrong**: The research notes (L79-98) list discriminative AI core tasks as "分類 (classification) 和 預測 (prediction/regression)". Anomaly detection is NOT mentioned in the research notes as a discriminative AI task. While anomaly detection can be framed as a classification problem, it is also commonly done with unsupervised methods (e.g., autoencoders, isolation forests) that do not fit neatly into the "discriminative" category. The study guide elevates anomaly detection to a "core task" of discriminative AI with no source support.
  - **Fix**: Either (a) remove "異常偵測" from the core task list and keep it only in the application scenarios table (line 108, fraud detection), noting it as a special case of classification, or (b) add a qualifying note: "異常偵測在某些情況下可視為二元分類的特例（正常 vs 異常），但也可用非監督式方法實現。"

- [UNSUPPORTED] Line 72-73: "有效吞吐量 (Goodput)" included as a key performance metric in the knowledge tree and section 3.4
  - **What's wrong**: Goodput is mentioned in research-notes L160, but the research notes also note it is a more specialized metric. The syllabus keywords (L107-113) list "效能管理" generically. Including Goodput as a top-level knowledge-tree item alongside Latency/Throughput/Cost may over-emphasize it for a beginner exam. However, the study guide does explain the concept in the knowledge tree (line 72) but then notably does NOT elaborate on Goodput anywhere in Section 3.4. The metric appears in the knowledge tree but is orphaned — no explanation follows.
  - **Fix**: Either (a) add a brief explanation of Goodput in Section 3.4 to match the knowledge tree, or (b) remove Goodput from the knowledge tree and add it as a brief footnote under the Throughput explanation: "進階補充：有效吞吐量（Goodput）是在維持目標延遲水準下的真實吞吐量，比單純吞吐量更全面。初級了解即可。"

### Misleading

- [MISLEADING] Line 94: "需要有標註的資料（Labeled Data）——每筆資料都要附正確答案"
  - **What's wrong**: While the research notes (L99) confirm discriminative models primarily use supervised learning with labeled data, and the study guide's core claim is correct, the absolute phrasing "需要有標註的資料" (without qualifier) is slightly misleading. Some discriminative approaches (e.g., semi-supervised discriminative models, self-training) can work with partially labeled data. The research notes themselves use the softer phrasing "監督式學習 (supervised learning)，需要有標註的資料 (labeled data)" — which is accurate as a general statement. The study guide's version makes it sound like an absolute requirement with zero exceptions.
  - **Fix**: This is a minor point for a beginner guide. The current phrasing is acceptable for exam purposes since the iPAS beginner exam tests this as a binary distinction. No change strictly necessary, but if desired, add a parenthetical: "需要有標註的資料（Labeled Data）——通常每筆資料都要附正確答案" (adding 通常).

- [MISLEADING] Lines 293-294: "決策可解釋性較高" for discriminative AI and "可能產生幻覺 (Hallucination)" for generative AI
  - **What's wrong**: These claims are generally true but presented as if they are defining characteristics in a direct comparison. Discriminative AI interpretability varies greatly — a logistic regression is highly interpretable, but a deep neural network classifier is often a black box. Similarly, hallucination is specific to language/image generation models, not all generative models (e.g., a GAN generating faces does not "hallucinate" in the ChatGPT sense). Neither claim appears in the research notes comparison table (L126-133). The study guide adds these as novel comparison dimensions without source support.
  - **Fix**: Add qualifiers: "決策可解釋性**因模型而異**（邏輯迴歸較高，深度神經網路較低）" and "大型語言模型可能產生幻覺 (Hallucination)". Or note these are general tendencies, not defining features.
