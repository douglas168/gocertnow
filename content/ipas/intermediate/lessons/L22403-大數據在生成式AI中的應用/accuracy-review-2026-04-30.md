# Accuracy Review — L22403: 大數據在生成式AI中的應用
Date: 2026-04-30
Reviewers: Gemini (succeeded — full output), Codex (broken — model error), Claude Sonnet 4.6 (adversarial analysis)

## Summary
The guide covers pretraining corpora, corpus cleaning/deduplication, tokenization (BPE/WordPiece/SentencePiece/tiktoken), pretraining vs fine-tuning vs RAG paradigms, LoRA/PEFT, RLHF preference data, RAG pipeline (chunking/embedding/vector store/retrieval), distributed training (DDP/Tensor Parallelism/Pipeline Parallelism), and Hugging Face API. Several factual issues were surfaced: dataset size figures are partially outdated, LoRA rank range is conservative, and RLHF section does not mention DPO which has become the dominant alignment approach in 2024-2026.

## Critical Errors (must fix before publishing)

- **OpenHermes dataset size outdated (Gemini finding):** Guide states "OpenHermes 約 242K." This refers to OpenHermes 1.0. OpenHermes 2.5 (~1M samples) has been the standard reference since late 2023. For a 2026 exam prep guide, citing the outdated 242K figure is misleading if students encounter exam material referencing current practice. **Fix:** Update to "OpenHermes 2.5 約 1M samples" or remove the specific number and say "數十萬到百萬級別."

- **RLHF section omits DPO (Gemini + Claude finding):** Guide frames RLHF as using "chosen/rejected response pairs → reward modeling." This is accurate for classic RLHF (Reinforcement Learning from Human Feedback using PPO), but DPO (Direct Preference Optimization, 2023) uses the same chosen/rejected data format without a separate reward model or PPO training loop. DPO is now the dominant method used in LLaMA 3, Zephyr, and most 2024-2026 open models. An exam asking "what method uses chosen/rejected pairs without a separate reward model" would stump students who only learned RLHF. **Fix:** Add a paragraph noting DPO as a RLHF variant that uses the same data format but trains the LM directly.

## Minor Issues

- **RedPajama version distinction (Gemini finding):** Guide states "RedPajama — 1.2T tokens, fully-open." This is accurate for RedPajama-v1 (a reproduction of LLaMA-1 training data). RedPajama-v2 (2023, 100T+ tokens) is a separate, much larger dataset. The guide should note the v1/v2 distinction, or at minimum state this refers to v1.

- **The Pile size:** The guide states "825GB, 22種來源." The Pile v1 is ~825 GiB (gibibytes), not GB (gigabytes). The difference is ~11%. For big data contexts this matters. More importantly, The Pile 2 / DataComp LM (DCLM) have emerged as successors. The 825GB figure and 22-source count are accurate for Pile v1.

- **LoRA rank range (Gemini finding):** Guide says "常見範圍 4-64, 常見預設可記 r=8." The range 4-64 is accurate for most use cases. However, high-quality fine-tuning in 2024-2026 literature frequently uses r=128 or r=256 for larger models with substantial domain shift. The stated range is not wrong, but adding a note that "high-performance scenarios may use r up to 128-256" would be more accurate for an intermediate guide.

- **Hugging Face pipeline task "translation_en_to_fr" (Gemini finding):** Listed as a primary example. While this is a valid task name in older transformers versions, the more generic `"translation"` is the standard identifier. The specific `"translation_en_to_fr"` form still works but may confuse students if they see exam code using `"translation"` only.

- **LLaMA 3 tokenizer assignment:** Guide correctly states LLaMA 3 uses tiktoken-based BPE (distinct from LLaMA 1/2's SentencePiece). This is accurate — LLaMA 3 moved to a 128K vocabulary tiktoken tokenizer. Correct.

- **tiktoken versions:** Guide states "GPT-3.5/GPT-4 常見 cl100k_base, GPT-4o 起常見 o200k_base." This is accurate as of 2024.

## Missing Key Concepts
- **DPO (Direct Preference Optimization):** Critical gap identified by both Gemini reviews. Must add.
- **QLoRA:** Guide covers LoRA but not QLoRA (Quantized LoRA), which is the practical enabler for fine-tuning 70B+ models on limited hardware. For "big data + generative AI" context, QLoRA is highly relevant.
- **FineWeb / FineWeb-Edu (Gemini finding):** New (2024) gold standard for web-scale data filtering from Hugging Face. Emerging in ITRI/industry materials but not yet confirmed as IPAS exam material.
- **Chinchilla scaling laws:** Understanding "how much data do you need for a model of N parameters" is increasingly testable at the intermediate level.
- **Data contamination:** How to detect if benchmark test sets were leaked into pretraining corpora.

## Terminology Notes
- 生成式 AI (Generative AI): correct.
- 監督式微調 (Supervised Fine-Tuning, SFT): correct.
- 參數高效微調 (PEFT, Parameter-Efficient Fine-Tuning): correct.
- 檢索增強生成 (RAG, Retrieval-Augmented Generation): correct.
- 分詞器 (Tokenizer): correct.
- SentencePiece: correctly identified as a framework (not an algorithm), supporting BPE or Unigram underneath. The guide's Trap 6 explicitly covers this. Correct.
- 子詞分割 (Subword Tokenization): correct.
- 向量資料庫 (Vector Store/Database): correct.

## Convergence Notes
Both Gemini runs independently identified: (1) OpenHermes outdated version, (2) RedPajama v1/v2 distinction, (3) LoRA rank range, (4) missing DPO, (5) SentencePiece-as-framework clarification. Claude confirmed all and added QLoRA as a gap. No contradictions between reviewers.

## Verdict
**Grade: B** — Core architecture descriptions are accurate. Two critical fixes needed before publishing: (1) update OpenHermes data size to v2.5, (2) add DPO as an RLHF variant using the same data format. Minor issues with RedPajama versioning and LoRA range are worth a polish pass. The guide is functionally safe for the 5/23 exam but the DPO gap is a real risk if IPAS 2026 tests modern alignment methods.
