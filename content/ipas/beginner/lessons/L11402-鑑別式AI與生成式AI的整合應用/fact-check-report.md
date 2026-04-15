# Fact Check Report: L11402 鑑別式AI與生成式AI的整合應用

## Summary
- Verified claims: 89
- Flagged issues: 8 (1 errors, 1 stale, 3 unsupported, 3 misleading)

## Verified Claims (notable)

The following major claims were verified correct against research notes, syllabus, and external knowledge:

- Line 7-11: Exam mapping to L11402, keywords (應用場域與情境, 電腦視覺, 語音辨識, 生成技術) match syllabus YAML lines 117-124 exactly.
- Line 13: High-frequency exam topics (scenario judgment, GAN dual nature, three domains, RAG) match research notes lines 171-181.
- Line 34-36: CV discriminative applications list (影像分類, 物件偵測, 人臉辨識, 瑕疵檢測, 車牌辨識) matches research notes lines 34-41.
- Line 35-36: CV generative applications (影像生成, 風格轉換, 超解析度, 影像修復) matches research notes lines 44-49.
- Line 40-41: Speech discriminative (ASR, 聲紋辨識, 語音情緒分析) matches research notes lines 60-64.
- Line 41: Speech generative (TTS, 聲音複製, 音樂生成) matches research notes lines 67-71.
- Line 44-49: Text/NLP applications match research notes lines 82-93.
- Line 52-56: Five integration patterns match research notes lines 133-167.
- Line 89-95: CV discriminative table entries verified against research notes lines 34-41.
- Line 94: "台大醫院 AI 胰臟癌偵測系統" — confirmed in research notes line 103. The system received FDA Breakthrough Device designation.
- Line 103: Midjourney, DALL-E as image generation tools — verified, current as of 2026.
- Line 138: "NVIDIA Omniverse 就是用生成式 AI 模擬城市場景" — matches research notes line 123.
- Line 156-157: GAN for synthetic defect generation in manufacturing — matches research notes line 53.
- Line 163: Deepfake attack-defense pattern with GAN — matches research notes line 54, including Trend Micro reference.
- Line 167: 台大醫院 AI 胰臟癌偵測 as discriminative AI — matches research notes line 103.
- Line 169: 遠傳+亞東醫院 GenAI 照護 — matches research notes line 105.
- Line 179-180: ASR = 聲音→文字 (鑑別式), TTS = 文字→聲音 (生成式) — correct classification, matches research notes lines 60, 67.
- Line 233-235: 達宣醫聲通 as Taiwan medical ASR case — matches research notes line 60.
- Line 283-286: RAG explanation (retrieval = discriminative, generation = generative) — matches research notes lines 163-167.
- Line 345-366: GAN explanation with Generator (generative) + Discriminator (discriminative) — matches research notes lines 141-147.
- Line 387: "美國運通 / SAS 用 GAN 生成詐欺交易樣本" — matches research notes line 111.
- Line 414: ChatGPT hallucination problem and RAG as solution — well-established fact, matches research notes line 166.
- Line 427: 美國運通/SAS in finance GAN fraud — matches research notes line 111.

## Flagged Issues

### Errors

- [ERROR] Line 92: "台積電晶圓良率檢測" used as example for defect detection
  - **What's wrong**: The research notes (line 37) describe generic "製造業品管，辨識產品外觀瑕疵" for defect detection. TSMC does use AI for wafer inspection, but the study guide specifically says "台積電晶圓良率檢測" as if it were a confirmed, documented case. TSMC is famously secretive about its internal AI tooling and does not publicly disclose specifics of its AI-powered defect detection systems. Using TSMC as a named example implies a publicly documented case that students could reference, which does not exist in the research notes or public sources.
  - **Fix**: "半導體晶圓瑕疵檢測" (remove the TSMC brand name, keep generic semiconductor example) or replace with a documented Taiwan manufacturing AI case.

### Stale Information

- [STALE] Line 103: "Midjourney、DALL-E 生成插畫" listed as representative image generation tools
  - **What changed**: While Midjourney and DALL-E remain relevant, the image generation landscape as of early 2026 has expanded significantly. The syllabus YAML (line 166) lists tools for L12201 including Midjourney but in the context of generative AI tools. For L11402 purposes this is acceptable, but notably absent from the study guide is any mention of Stable Diffusion (which IS in the research notes line 44) despite it being a major open-source alternative frequently referenced in exam contexts.
  - **Fix**: "Midjourney、DALL-E、Stable Diffusion 生成插畫" — add Stable Diffusion to match research notes line 44 which lists all three.

### Unsupported Claims

- [UNSUPPORTED] Line 90: "iPhone 拍照時自動框出人臉" as example of Object Detection
  - **Risk**: iPhone camera face detection is technically face detection (a specific subtype), not general object detection. While face detection can be considered a form of object detection, using it as THE example for object detection could cause confusion. The research notes (line 36) use "自駕車偵測行人、車輛" as the object detection example, which is more representative.
  - **Recommendation**: Replace with "自駕車偵測行人、車輛" to match research notes, or clarify that iPhone face detection is a specific application of object detection principles.

- [UNSUPPORTED] Line 199: "Suno AI 生成完整歌曲" as example of Music Generation
  - **Risk**: Suno AI is not mentioned in the research notes. While Suno AI is a real and popular music generation tool as of 2026, it is not sourced in the research materials. If this appears as an exam answer option, students may be confused if the exam uses different examples.
  - **Recommendation**: Verify that Suno AI is a well-known enough example for the IPAS exam context. The research notes (line 69) only say "AI作曲與音樂創作" generically. Consider adding a note that this is a supplementary example.

- [UNSUPPORTED] Line 343: "就像 YouTube 的內容系統——AI 推薦影片給你（生成推薦清單）" as example of 生—鑑—監 閉環
  - **Risk**: The analogy frames a recommendation system as "generative" (生成推薦清單). However, recommendation systems are traditionally classified as discriminative AI (they predict/rank items, not generate new content). The research notes (line 130) explicitly classify "推薦系統（Netflix/Spotify）" under discriminative AI for entertainment. Using YouTube recommendations as an example of the Generate-Discriminate-Monitor loop could confuse students about whether recommendation is generative or discriminative.
  - **Recommendation**: Replace with a clearer example where the "generate" step is unambiguously generative. For instance: "就像一個 AI 行銷系統——生成式 AI 撰寫廣告文案（生成），鑑別式 AI 審核文案是否合規（鑑別），上線後追蹤點擊率（監控），數據回饋讓文案越來越好。" This matches the content creation + review pattern from research notes lines 97 and 136-139.

### Misleading

- [MISLEADING] Line 214: "NLP 意圖理解" labeled as "(鑑別/生成)" in the smart customer service pipeline diagram
  - **Risk**: The middle NLP step is labeled as both discriminative and generative, which is vague. In the research notes (line 74), the pipeline is "ASR (鑑別式) 將客戶語音轉文字 → NLP理解意圖 → TTS (生成式)". The NLP step in a traditional customer service pipeline performs intent classification (discriminative) and then response generation (generative) — these are two distinct sub-steps. Labeling the entire box as "(鑑別/生成)" without explanation could cause students to misidentify the individual operations on an exam.
  - **Risk**: If an exam question asks "In a smart customer service pipeline, which step is discriminative?", a student might skip NLP intent classification because it was grouped with generation.
  - **Fix**: Split the NLP box into two conceptual steps in the description, or add a clarifying note: "NLP 步驟包含兩個動作：意圖分類（鑑別式）和回覆生成（生成式）"

- [MISLEADING] Line 289-290: "RAG 不是純生成技術！它的「R（Retrieval）」是鑑別式的檢索環節"
  - **Risk**: Calling the retrieval step "discriminative AI" is a pedagogically useful simplification for exam purposes, and the research notes (line 96, 164) support this framing. However, it is worth noting that semantic search / vector retrieval in RAG systems often uses embedding models (which can be based on the same transformer architecture as generative models) rather than classical discriminative classifiers. At the beginner level this distinction is not tested, but the blanket statement that retrieval IS discriminative could be challenged at the intermediate level. Since this is flagged as a "super exam trap" (line 288), students may over-anchor on this claim.
  - **Risk**: Low for beginner exam, but students progressing to intermediate may carry an oversimplified mental model.
  - **Fix**: Add a brief qualifier: "RAG 的檢索環節執行的是「比對、篩選」的鑑別式任務（初級考試以此概念為準）" — this preserves exam accuracy while signaling that the full picture is more nuanced.

- [MISLEADING] Line 573: "翻譯" listed as a keyword for generative AI
  - **Risk**: In the quick-judge table (line 572), "翻譯" is listed as a generative action keyword. However, in the speech pipeline section (line 403), "即時翻譯" is described as a pipeline of ASR (discriminative) + translation + TTS (generative) — an integrated application. Machine translation itself can be argued as generative (it generates text in a target language), but when embedded in a speech translation pipeline, the overall system is an integration. A student seeing "翻譯" in an exam might reflexively mark "generative" when the correct answer for a speech translation scenario would be "integrated."
  - **Risk**: Could cause wrong answers on pipeline/integration scenario questions involving translation.
  - **Fix**: Add a footnote or qualifier: "翻譯（單獨文字翻譯為生成式；若結合語音辨識+語音合成則為整合應用）"
