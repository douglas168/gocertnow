# Accuracy Review — L21101: 自然語言處理技術與應用
Date: 2026-04-30
Reviewers: Gemini (adversarial pass); Codex unavailable (model version error — single-reviewer synthesis)

## Summary
The guide is structurally sound and pedagogically clear for foundational NLP concepts. However it contains one confirmed factual error in tokenizer-model mapping (RoBERTa), and is missing several intermediate-level topics (evaluation metrics, fine-tuning methods, Taiwan-specific NLP tools) that are expected at the 中級 level.

---

## Critical Errors (must fix before publishing)

- **RoBERTa uses BPE, NOT WordPiece.**
  - Current claim: "WordPiece is used by BERT / DistilBERT / **RoBERTa**"
  - Correct: RoBERTa uses Byte-level BPE (50K vocab), the same algorithm family as GPT-2. It does NOT use WordPiece and does NOT produce `##`-prefixed subwords. Listing it alongside BERT under WordPiece is a clear factual error.
  - Fix: Move RoBERTa to the BPE column. Example corrected table row: `BPE | GPT / Llama / Qwen / Gemma / RoBERTa`

- **BART's training objective is materially different from T5's.**
  - Current claim: both T5 and BART use "Span corruption / Denoising" as a single shared row
  - Correct: T5 uses **span corruption with sentinel tokens** (`<extra_id_n>`). BART uses a broader set of **denoising objectives** including text infilling, token deletion, sentence permutation, and document rotation. Treating them as identical is technically wrong and could cause exam errors on questions that distinguish the two.
  - Fix: Split into two rows or add a note: "T5 → sentinel-token span corruption; BART → multi-noise denoising (infilling, deletion, permutation)."

---

## Minor Issues

- **XLNet tokenizer classification is imprecise.** The guide places XLNet under "Unigram LM via SentencePiece." XLNet's original paper and implementation actually use BPE through SentencePiece, not Unigram. This is a second-order issue since the exam may not test at this granularity, but it should not be stated as certain. Suggest softening to "SentencePiece-based" without committing to the algorithm for XLNet.

- **Abstractive summarization is now primarily decoder-only in practice.** The guide correctly maps abstractive summarization to Encoder-decoder (T5/BART) for the classical architecture framing. This is still the correct answer for exam context. However, the guide also introduces Llama/Qwen/Gemma in the tokenizer table and will implicitly create confusion for students who know modern LLMs dominate this task. A one-line caveat ("In practice, modern decoder-only LLMs like Llama/GPT also perform abstractive summarization") would prevent this confusion without changing the core exam answer.

- **Attention scaling explanation is correct but incomplete.** The `/ sqrt(d_k)` explanation only mentions preventing extreme softmax. For 中級 level, it is also standard to note that without scaling, gradients become very small in high-dimensional spaces (gradient vanishing in training). Adding one sentence strengthens this.

---

## Missing Key Concepts

- **Evaluation metrics** — BLEU (machine translation), ROUGE (summarization), Perplexity (language modeling). An AI Application Planner (規劃師) must know how to measure NLP task quality. Complete absence is a gap.

- **Fine-tuning and PEFT** — LoRA, Adapters, prompt tuning. For 中級, the distinction between pre-training, full fine-tuning, and parameter-efficient fine-tuning is expected. Absent entirely.

- **Instruction Tuning / RLHF** — Llama/Qwen/Gemma are listed in the tokenizer table but the guide does not explain the training paradigm that makes them chat-capable (SFT + RLHF). Intermediate candidates need this.

- **Taiwan-specific NLP tooling** — For a Taiwan exam (ITRI-hosted), CKIP (中研院 CKIP tagger) and traditional Chinese word segmentation are notably absent. These are high-frequency distractor topics in IPAS exams.

- **Traditional NLP preprocessing concepts** — Stemming, lemmatization, stopword removal. These appear as distractors in IPAS multiple-choice questions to test whether candidates can distinguish classical preprocessing from deep-learning-era NLP.

---

## Terminology Notes

- **斷詞** vs **標記化/Token化**: The guide uses 斷詞 throughout. For subword-level LLM tokenization, 標記化 or Token化 is more precise at 中級 level. Recommend using 斷詞/標記化 with a note that the terms are related but not identical.
- **Denoising (去噪)**: The term is used correctly but its relationship to BART's "auto-encoding" nature vs. T5's "text-to-text" nature is never surfaced. Worth a one-line note.
- No other terminology errors found; all core terms (詞嵌入, 語境化嵌入, 注意力機制, 位置編碼, 編碼器, 解碼器) are standard.

---

## Convergence Notes

Gemini reviewed this lesson (Codex was unavailable due to CLI version error). The single confirmed convergence point from Gemini's analysis:

- **RoBERTa / WordPiece error**: Gemini flagged this as a "fundamental technical error." This is a well-known fact verifiable from the RoBERTa paper (Liu et al., 2019) — the paper explicitly states it uses Byte-Pair Encoding, not WordPiece. High confidence real error.
- **BART vs T5 training objective**: Gemini flagged the conflation as an oversimplification. Supported by the original papers. High confidence issue.
- **Missing evaluation metrics (BLEU/ROUGE)**: Gemini flagged as critical absence. Consistent with 中級 exam scope expectations.

---

## Verdict
One confirmed factual error (RoBERTa tokenizer) and one load-bearing oversimplification (BART vs T5 training objective) must be fixed before publishing. The structural and pedagogical quality is good; gaps are primarily in coverage breadth (eval metrics, fine-tuning, Taiwan NLP tooling) rather than core concept accuracy. Overall accuracy: **B — fix the two critical errors, then acceptable for exam prep use.**
