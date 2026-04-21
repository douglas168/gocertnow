# Research Notes: L22403 大數據在生成式AI中的應用

Research conducted 2026-04-21. Priority given to iPAS official documents and current official/vendor docs. Community evidence for **L22403 單題回憶** was limited, so exam-pattern notes rely mainly on official公告試題 +少量備考社群觀察。

## Official Sources
- [115年度 AI 應用規劃師能力鑑定簡章（2026-04-10）](https://www.ipas.org.tw/DownloadFile.ashx?filename=74ff7902-ec9b-4aae-bee5-6276e4681bd7_115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29.pdf&type=10): 官方已明列 L22403 屬中級第二科 L224「大數據在人工智慧之應用」下之子題；考試日期為 **2026-05-23**，可確認本 topic 是正式命題範圍。
- [114 年第二次中級第二科公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 第二科實際題目偏 **情境式單選**，且會直接混用英文術語（如 stream processing、anonymization、hash）；L22403 教材宜準備「名詞辨識 + 情境選法」而非推導題。
- [Hugging Face Transformers Pipelines docs](https://huggingface.co/docs/transformers/en/main_classes/pipelines): 官方列出常見 `pipeline` task names；對 L22403 最相關的是 `text-generation`、`summarization`、`translation_*`、`question-answering`、`text2text-generation`、`feature-extraction`。適合支撐「API 介面」考點。
- [Hugging Face Text Generation docs](https://huggingface.co/docs/transformers/en/main_classes/text_generation): `model.generate()` 常見參數目前仍以 `max_new_tokens`、`do_sample`、`temperature`、`top_p` 為核心；可教成 API 參數辨識，不必進 beam search 數學。
- [Hugging Face Summarization task docs](https://huggingface.co/docs/transformers/tasks/summarization): 官方範例清楚呈現 `AutoTokenizer.from_pretrained(...)` → tokenizer 編碼 → `AutoModelForSeq2SeqLM.from_pretrained(...)` → `model.generate(...)` → `tokenizer.decode(...)` 的流程；這正是 syllabus 要的 tokenizer → generate 流程。
- [Hugging Face Tokenization algorithms](https://huggingface.co/docs/transformers/en/tokenizer_summary): 官方明確區分 BPE / WordPiece / SentencePiece。重點：
  - BPE：從頻繁字元對合併而成。
  - WordPiece：以「提升訓練資料 likelihood」選 merge，不只是看頻率。
  - SentencePiece：可直接對 raw text 做 BPE/Unigram，特別適合無空白語言。
- [OpenAI Help: What are tokens and how to count them?](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them): 官方指出 `tiktoken` 是 OpenAI models 使用的 fast BPE tokenizer；也提醒 token 限制會影響大文件需先切塊。
- [OpenAI Retrieval docs](https://developers.openai.com/api/docs/guides/retrieval): 官方把 RAG 資料流程明確定義為檔案加入 vector store 後會被 **chunked, embedded, and indexed**；目前預設 chunk 大小為 **800 tokens**、overlap **400 tokens**，單檔上限 **5,000,000 tokens**。這些數字可當 exam-friendly 具體範圍。
- [Hugging Face Parallelism methods](https://huggingface.co/docs/transformers/main/perf_train_gpu_many): 官方把 distributed training 區分為 data parallelism、tensor/model parallelism、pipeline parallelism，並指出可再與 ZeRO 組成 3D parallelism；適合本課只講資料與資源配置視角。
- [Common Crawl official archive update (2025-04-01)](https://commoncrawl.org/blog/march-2025-crawl-archive-now-available): 單次 2025-03 crawl 含 **2.74B web pages / 455 TiB uncompressed / 38M domains**；可作為「開放網路語料規模非常大、品質與截斷控制重要」的最新官方數字。
- [The Pile dataset card](https://huggingface.co/datasets/EleutherAI/pile): 官方 dataset card 明列 The Pile 為 **825 GiB**、由 **22** 個高品質子資料集組成；適合對照 Common Crawl 類原始網頁語料 vs curated mixture。
- [ROOTS paper page](https://huggingface.co/papers/2303.03915): ROOTS 為 **1.6TB**、**59 languages** 的多語料庫；對應 syllabus 的「多樣性、授權與責任治理」。
- [RedPajama official blog](https://www.together.ai/blog/redpajama): 官方公開聲明 RedPajama base dataset 為 **1.2T tokens** fully-open dataset，並強調 pretraining data 需要高品質與 broad coverage。
- [Dolma dataset card](https://huggingface.co/datasets/allenai/dolma): dataset card 顯示 Dolma 全量 token counts 約 **1.715T tokens**；適合作為近期大規模開放預訓練語料案例。
- [Deduplicating Training Data Makes Language Models Better](https://huggingface.co/papers/2107.06499): 官方論文頁摘要指出 dedup 可降低 memorization 與 train-test overlap；並舉 C4 中重複 60,000 次的句子為例，適合支撐「去重不是可有可無」。
- [google-research/deduplicate-text-datasets](https://github.com/google-research/deduplicate-text-datasets): 官方 repo 明示提供 `ExactSubstr` dedup 工具；可用來區分 exact-match / long repeated substring 類型。
- [Anthropic HH-RLHF dataset card](https://huggingface.co/datasets/Anthropic/hh-rlhf): 官方資料卡說明 RLHF 偏好資料是 `chosen/rejected` 對，目的是 reward/preference model，不應直接拿來當一般 SFT 對話資料。
- [TRL SFT Trainer docs](https://huggingface.co/docs/trl/sft_trainer): 官方明示 SFT 常見資料格式是 `text` 或 prompt-completion / conversational 格式；說明 SFT 本質是「標準化監督資料」。
- [TRL Reward Modeling docs](https://huggingface.co/docs/trl/main/en/reward_trainer): 官方示例使用 `lmarena-ai/arena-human-preference-55k`，可作為「偏好資料常是數萬筆等級 pairwise comparisons」的 current example。
- [OpenHermes dataset card](https://huggingface.co/datasets/teknium/openhermes): 開放 instruction dataset 規模約 **242K entries**。
- [Stanford Alpaca repo/example](https://github.com/trainML/alpaca-llm-fine-tuning-example): 清楚說明 Alpaca 以 **52K instruction-following** examples 微調 7B LLaMA；適合 exam 記憶點。
- [Scaling Instruction-Finetuned Language Models](https://arxiv.org/abs/2210.11416): 官方論文指出 Flan-PaLM 可擴到 **1.8K tasks**；適合說明 instruction tuning 不一定只靠幾萬筆單一格式資料，也可能是多任務混合。
- [LoRA docs (PEFT)](https://huggingface.co/docs/peft/package_reference/lora): 官方目前 `LoraConfig` 預設 `r=8`；可作為「LoRA rank 常見從個位數到十幾起跳」的保守數字來源。
- [FAISS docs](https://faiss.ai/): 官方定義 FAISS 是 dense vectors 的 similarity search / clustering library；適合作為 vector store 代表。
- [Chroma docs: Embedding Functions](https://docs.trychroma.com/docs/embeddings/embedding-functions): 官方說明 Chroma 會儲存與索引 embeddings，並可在 `add/query` 流程中自動使用 embedding function。
- [Weaviate docs](https://docs.weaviate.io/weaviate/current/): 官方定義 Weaviate 為 open-source vector database，可支援 semantic search、hybrid search 與 RAG。

## Community Insights (exam patterns)
- [Dcard：iPAS AI 應用規劃師中級｜準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 考生回報主要依賴 **官方教材、例題、公開樣題**；代表 L22403 研究筆記應優先對齊官方名詞與題型，而不是追太深論文細節。
- [Vocus／CCChen：初級與中級考試題目難易度分析](https://vocus.cc/article/6929a8b8fd89780001b734bb): 雖非 L22403 專篇，但備考社群認為近年題目已大量出現 **RAG、上下文工程、資料處理、導入情境**；顯示生成式 AI 題目趨勢偏落地應用。
- 社群可驗證的 **L22403 單一考點回憶不足**；沒有找到「今年一定考 BPE / MinHash / LoRA rank」這種可靠回報，因此教材應把這些視為 **高相關技術詞彙**，不是官方明講必考。
- 依官方第二科公告試題反推，常見陷阱會是：
  - 把 **pretraining / fine-tuning / RAG** 混成同一種資料需求。
  - 把 tokenizer 當模型內部架構題，而不是資料前處理最後一步。
  - 把向量資料庫說成訓練模型本身；其實它是 RAG 的檢索基礎設施。
  - 把 data parallelism / model parallelism / pipeline parallelism 的「切分對象」搞反。

## Current State (technology topic)
- **預訓練資料量**：公開代表性語料已普遍是 **百 GB 到 TB / 兆 token 級**。例：The Pile 825 GiB、ROOTS 1.6TB、RedPajama 1.2T tokens、Dolma 約 1.715T tokens。考點應聚焦「預訓練 >> 微調 >> RAG 單次索引」的資料量級差異。
- **大規模語料挑戰**：最新 Common Crawl 官方更新除了規模，還特別揭露 **truncation limit** 從 1 MiB 提升到 5 MiB；代表品質問題不只髒資料，也包含截斷、重複、版權與來源不可控。
- **Dedup 仍是 current standard**：Google dedup 論文/工具仍被大量沿用。exam-safe 講法可分三層：
  - exact-match：完全相同文件或完全相同字串。
  - exact-substring：長段重複片段。
  - near-dedup：近似重複，常用 MinHash / LSH 類方法。
- **Tokenizer 現況**：HF 官方仍以 BPE / WordPiece / SentencePiece 為主流教學；OpenAI 官方仍把 `tiktoken` 定義為 fast BPE tokenizer。L22403 可教「subword tokenization 為資料清理後的最後一步」。
- **微調資料量沒有單一官方標準值**：目前較可靠的說法是看資料品質與任務複雜度。可引用的公開例子有 Alpaca **52K**、OpenHermes **242K**、reward/preference 範例 `arena-human-preference-55k`。若教材要寫「典型需求」，宜寫成 **SFT 常見為數萬到數十萬筆；偏好資料常見數萬組 chosen/rejected pairs；LoRA/PEFT 常用於較少資料、高成本受限場景**。
- **LoRA / PEFT**：HF PEFT 文件目前 `LoraConfig` 預設 `r=8`。就 exam 用語而言，應強調它是「只訓練少量 adapter 參數，通常比 full fine-tuning 更省記憶體與資料成本」，而不是教矩陣分解推導。
- **RAG 管線**：官方與主流向量庫文件都一致呈現流程為 `chunking -> embedding -> vector index/store -> retrieval -> generation`。OpenAI 目前預設 800/400 token chunking；Weaviate 文件給的 baseline 是 **100-200 words + 50-word overlap**。這可整理成「沒有唯一標準，常從數百 token/詞起試」。
- **Distributed training terminology**：HF 2026-04 穩定文件仍以 data / tensor(model) / pipeline parallelism 作為主分類，並提到可與 ZeRO 混合成 3D parallelism；這是當前文件語言，沒有過時。
- **HF API**：`pipeline(...)` 仍是入門高階介面；手動流程則是 `AutoTokenizer` 編碼後交給 model，再用 `model.generate()` 產出。這個教法截至 2026-04 仍未改變。

## External Documents Found
None required.

## Key Findings Summary
- L22403 最該教的是 **三種資料典範的量級差異**：預訓練通常是 TB/兆 token 等級；SFT/RLHF 多為數萬到數十萬筆；RAG 不是再訓練，而是把文件切塊、嵌入、索引後檢索。
- 官方文件可直接支撐的高頻名詞有：**BPE / WordPiece / SentencePiece、chunking、embedding、vector store、data parallelism / model(tensor) parallelism / pipeline parallelism、AutoTokenizer、pipeline、model.generate**。
- 可引用的具體數字：Common Crawl 單次 crawl 可到 **2.74B pages / 455 TiB**；The Pile **825 GiB**；ROOTS **1.6TB / 59 languages**；RedPajama **1.2T tokens**；Dolma **1.715T tokens**；OpenAI Retrieval 預設 **800-token chunks + 400 overlap**；LoRA `r` 預設 **8**。
- 去重是 exam-relevant：官方研究明確指出 dedup 可降低 memorization 與 train-test overlap；教材可用 **exact-match / exact-substring / near-dedup(MinHash)** 三層框架講解。
- 找不到 iPAS 官方逐條公開說明 L22403 必考數值門檻；因此「典型 chunk 大小」「SFT 筆數範圍」應標示為 **業界常見實務範圍**，不是 iPAS 官方硬規格。

## Scope Notes
- 本題只需從 **資料面** 講 tokenizer / corpus / dedup / SFT-RLHF-RAG / chunking / vector store / distributed data strategy；不要展開 Transformer 權重計算、attention 數學、loss function 推導。
- `model.generate()` 僅適合講 **API 參數與流程**；不要延伸到 beam search、sampling 數學證明。
- 向量資料庫只需講「RAG 檢索索引容器」；不要深入 HNSW/IVF/PQ 架構，這超出本 level 邊界。
- 未找到足夠權威來源可把 **C4、ROOTS、RedPajama、Dolma** 全部整理成同一套完全一致的最新 tokens/授權比較表；若教材需要完整橫向表，建議再做一次專門 dataset-card 深挖。
