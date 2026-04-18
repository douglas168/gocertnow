# Research Notes: L21103 生成式AI技術與應用

Research date: 2026-04-18 · Scope: iPAS AI 中級 科目一 · Depth: Deep (architecture-level, 3-way comparison)

## Official Sources
- **Attention Is All You Need, Vaswani et al. 2017** (arXiv:1706.03762, https://arxiv.org/abs/1706.03762): Transformer origin. Self-attention formula `Attention(Q,K,V) = softmax(QK^T / √d_k) V`; scale by `√d_k` prevents softmax saturation when dimensions grow. Multi-head = h parallel projections → concat → linear. Encoder stack: self-attention + FFN, each wrapped by residual + LayerNorm. Decoder adds masked self-attention (causal) + encoder-decoder cross-attention. Dispenses with RNN/CNN entirely — enables full sequence parallelism.
- **DDPM, Ho et al. 2020** (arXiv:2006.11239, https://arxiv.org/abs/2006.11239): Denoising Diffusion Probabilistic Models. **Forward process** `q(x_t | x_{t-1})` fixed Gaussian noise schedule (no learning). **Reverse process** `p_θ(x_{t-1} | x_t)` learned denoiser. Training objective simplified to **MSE between predicted noise ε_θ and true noise ε** (`L_simple = E[||ε − ε_θ(x_t, t)||²]`). Connection to denoising score matching over noise levels.
- **GAN, Goodfellow et al. 2014** (arXiv:1406.2661): Generator G maps noise z → fake sample; Discriminator D outputs real/fake probability. **Min-max objective:** `min_G max_D V(D,G) = E_x[log D(x)] + E_z[log(1 − D(G(z)))]`. Nash equilibrium at `p_g = p_data`. Failure modes: mode collapse, training instability, vanishing gradient when D too strong.
- **Latent Diffusion / Stable Diffusion, Rombach et al. 2022** (https://github.com/CompVis/stable-diffusion): VAE encoder compresses 512×512 image → low-dim latent → U-Net denoiser runs in latent space → VAE decoder back to pixels. Text conditioning via **CLIP ViT-L/14 text encoder** injected through cross-attention. Latent space drops compute ~50× vs pixel-space diffusion.
- **Classifier-Free Guidance, Ho & Salimans 2022** (arXiv:2207.12598): Train one model with random 10% unconditional dropout → at inference, extrapolate `ε = ε_uncond + w·(ε_cond − ε_uncond)` with guidance scale w>1. Higher w = more prompt-adherent, less diverse. Default CFG scale in Stable Diffusion = 7.5.
- **Hugging Face Transformers course** (https://huggingface.co/learn/llm-course/en/chapter1/6): Canonical three-way taxonomy — encoder-only (BERT, understanding/classification), decoder-only (GPT family, generation), encoder-decoder (T5, BART, seq2seq like translation).
- **BERT, Devlin et al. 2018:** Bidirectional encoder, pretraining = Masked Language Modeling (MLM) + Next Sentence Prediction (NSP). Good for classification/NER/extractive QA. Not generative.
- **Sebastian Raschka, "State of LLMs 2025"** (https://magazine.sebastianraschka.com/p/state-of-llms-2025): 2024–25 pipeline evolution — synthetic data, long-context training, RLVR (reinforcement learning with verifiable rewards for reasoning models), DPO/GRPO replacing/augmenting PPO in RLHF.

## Community Insights (iPAS exam patterns)
Primary source: vocus.cc/CCChen exam collections (the main Traditional-Chinese iPAS AI study blog).
- **生成式AI 科目一 考點 (CCChen 備考速查表):**
  - GAN: 生成器 vs 判別器對抗學習 → 圖像生成、Deepfake
  - Diffusion: 透過逐步「去噪」學習影像分布 → Stable Diffusion
  - Transformer: 自注意力 + 多頭機制，支援長距依賴與並行運算 → GPT、翻譯
  - BERT: 上下文動態詞向量 (contextual embeddings)
- **114/05 回報 (CCChen exam field report):** **"BERT是雙向訓練，GPT是單向訓練"** is a direct question item — the bidirectional vs unidirectional distinction is a guaranteed trap.
- **LoRA, RAG, Knowledge Distillation, Prompt Injection** appear as secondary items in 中級 but edge toward L21202/L21203 territory (導入/風險). For L21103 flag only briefly.
- **VAE + KL divergence** appears once in 114 papers — describe KL as the latent-space regularizer (force posterior ≈ N(0,I)). Not a core L21103 anchor but worth one mention.
- **Model compression (參數剪枝 pruning, 量化, 知識蒸餾)** appeared on 114/09 sample as a generative-AI-deployment question — compress LLM before serving.
- **No past official question bank** — iPAS does not publish 考古題. CCChen's vocus blog is the main field-collected source.

## Current State (2024–2026 landscape)
- **LLM frontier (2024–2026):** GPT-4o (May 2024) multimodal; GPT-5 (Aug 2025); Claude 3.5 Sonnet (2024) → 3.7 → 4.x series; Gemini 2.x (2024–25); Llama 3.x (open-weight, Meta) → Llama 4 (Apr 2025) with multi-round alignment (SFT + rejection sampling + PPO + DPO). All still **decoder-only Transformers** — no architectural revolution, just scale + data + post-training sophistication.
- **Reasoning models (2024+):** OpenAI o1/o3, DeepSeek-R1 — trained with **RLVR** (Reinforcement Learning with Verifiable Rewards) on math/code where correctness is automatable. Chain-of-thought internalized into weights.
- **Positional encoding shift:** Paper (2017) used sinusoidal PE; modern LLMs (Llama, GPT-4+) use **RoPE** (Rotary Position Embedding) — encodes relative position via rotation, extrapolates better to long contexts. Flag as 延伸 only; iPAS doesn't test RoPE.
- **Image generation:** Stable Diffusion 3/3.5, FLUX, Midjourney v6+. Diffusion has decisively **won high-res image generation over GAN** (GANs now niche — face generation, style transfer; Diffusion dominates general text-to-image).
- **Training paradigm evolution:** classic RLHF (PPO) → DPO (direct preference optim, no reward model) → GRPO (used in DeepSeek). For iPAS: teach classic **Pretrain → SFT → RLHF** pipeline; DPO is 延伸.

## External Documents Found
- **Attention Is All You Need (Vaswani 2017)** — https://arxiv.org/abs/1706.03762
- **DDPM (Ho 2020)** — https://arxiv.org/abs/2006.11239
- **Classifier-Free Guidance (Ho & Salimans 2022)** — https://arxiv.org/abs/2207.12598
- **Stable Diffusion repo** — https://github.com/CompVis/stable-diffusion
- **Hugging Face Transformers course** — https://huggingface.co/learn/llm-course/en/chapter1/6
- **Sebastian Raschka "State of LLMs 2025"** — https://magazine.sebastianraschka.com/p/state-of-llms-2025
- **CCChen 備考速查表** — https://vocus.cc/article/68b1692ffd89780001ffcc86
- **CCChen 114/05/17 場 考題收集** — https://vocus.cc/article/68288518fd89780001cf1c5f
- **CCChen 114/09 樣題整理** — https://vocus.cc/article/68cfb814fd897800012a73ab
- **CCChen 中級學習指引重點** — https://vocus.cc/article/68ecd196fd89780001f5c8f1
- **GAN 原論文** — https://arxiv.org/abs/1406.2661

## Architecture Deep-Dive Summaries

### GAN (Generative Adversarial Network)
- **Two networks:** Generator `G: z → x_fake` (noise → sample); Discriminator `D: x → [0,1]` (real vs fake probability).
- **Min-max objective (descriptive):** `min_G max_D  E[log D(x_real)] + E[log(1 − D(G(z)))]`. D maximizes (correct classification); G minimizes (fool D). Nash equilibrium: `p_g = p_data`, D(x) = 0.5 everywhere.
- **Training loop:** alternate (1) freeze G, update D on mixed real+fake; (2) freeze D, update G via D's gradient.
- **Failure modes:** **mode collapse** (G produces few modes that fool D → loses diversity); **training instability** (oscillation, non-convergence); **vanishing gradient** (D too strong → G gets zero gradient).
- **Variants:** DCGAN (convolutional), StyleGAN (style-based, high-res faces), CycleGAN (unpaired image-to-image), WGAN (Wasserstein distance, stabler).
- **When used:** face synthesis, style transfer, data augmentation, deepfake. Largely superseded by diffusion for general high-res T2I.

### Diffusion Models
- **Forward process (fixed, no learning):** `q(x_t | x_{t-1}) = N(x_t; √(1−β_t)·x_{t-1}, β_t·I)`. Gradually add Gaussian noise over T steps (T ≈ 1000 for DDPM). After T steps, `x_T ≈ N(0, I)` pure noise.
- **Reverse process (learned):** `p_θ(x_{t-1} | x_t)` — neural net (usually U-Net) predicts noise ε at each step, iteratively denoise N(0,I) → sample.
- **Loss (descriptive):** `L_simple = ||ε − ε_θ(x_t, t)||²` — MSE between true noise and predicted noise. Much simpler than full variational lower bound.
- **Classifier-free guidance (CFG):** train with random unconditional dropout; at inference extrapolate `ε = ε_uncond + w·(ε_cond − ε_uncond)`, w = guidance scale (7.5 default).
- **Latent diffusion (Stable Diffusion):** VAE compresses image → latent (~64× fewer elements) → diffusion in latent space → VAE decodes. Drops compute ~50× vs pixel-space.
- **Strengths vs GAN:** stable training (no min-max), better mode coverage (no collapse), higher quality at high-res.
- **Weakness:** slow inference (T iterative steps). Mitigations: DDIM sampler, consistency models, distillation to 1–4 steps.

### LLM / Transformer
- **Self-attention formula:** `Attention(Q,K,V) = softmax(QK^T / √d_k) · V`. Q=query, K=key, V=value — all projected from input. `√d_k` scaling prevents softmax saturation.
- **Multi-head attention:** h independent attention heads in parallel, each with own Q/K/V projections → concat → output linear projection. Captures different relation types.
- **Positional encoding:** Attention is **permutation-invariant** by design → must inject position info. Classic: sinusoidal PE added to embeddings. Modern: RoPE (rotary).
- **Transformer block:** (self-attention → add&norm) → (feed-forward → add&norm). Residual connections + LayerNorm at every sublayer.
- **Three architecture variants:**
  - **Encoder-only (BERT):** bidirectional self-attention; pretrain = Masked LM + NSP; good for classification/NER/extractive QA.
  - **Decoder-only (GPT family, Claude, Llama, Gemini):** causal masked self-attention (only attend to prior tokens); pretrain = next-token prediction; **dominant LLM architecture 2024–26**.
  - **Encoder-decoder (T5, BART):** encoder processes input bidirectionally → decoder generates with cross-attention to encoder output; good for translation/summarization.
- **Training pipeline (modern LLM):**
  1. **Pretrain** on trillions of tokens (internet text) — next-token prediction, self-supervised. Learns general language + knowledge.
  2. **SFT (Supervised Fine-Tuning)** on curated (instruction, response) pairs — teach format and task-following.
  3. **RLHF (Reinforcement Learning from Human Feedback):** train reward model from human preference pairs → PPO (or DPO) to align outputs with preferences. Fixes harmfulness, sycophancy, format.
- **Emergent capabilities / scaling laws:** loss decreases predictably with compute/data/params (Kaplan, Chinchilla). Some abilities (chain-of-thought reasoning, instruction following) appear non-linearly at scale thresholds.

## Training-Paradigm Comparison (exam-critical table)
| Family | Objective | Loss type | Training style | Key failure |
|---|---|---|---|---|
| **GAN** | Fool discriminator | **Adversarial** (min-max) | Two networks compete | Mode collapse, instability |
| **Diffusion** | Predict noise at each step | **Denoising** (MSE on ε) | Single network, stable | Slow inference |
| **LLM (decoder)** | Predict next token | **Autoregressive** (cross-entropy) | Causal, self-supervised | Hallucination |
| **BERT (encoder)** | Predict masked token | **Masked-LM** (cross-entropy) | Bidirectional, self-supervised | Not generative |
| **Contrastive (CLIP)** | Align matched text-image pairs | **Contrastive** (InfoNCE) | Dual encoders | Needs paired data |

## Evaluation Metrics
- **Perplexity (PPL):** LLM metric — `exp(average cross-entropy)`. Lower = better. "As if choosing among PPL equally-likely tokens at each step."
- **FID (Fréchet Inception Distance):** image gen — Gaussian distance between Inception-v3 features of real vs generated images. Captures both quality and diversity. Lower = better. Standard benchmark.
- **Inception Score (IS):** older image metric — KL divergence measuring class sharpness × diversity. Flawed (uses ImageNet classes), largely replaced by FID.
- **CLIP Score:** text-to-image alignment — cosine similarity between CLIP text and image embeddings. Higher = better prompt adherence.
- **Human eval / ELO (Chatbot Arena):** de facto LLM benchmark in 2024–26 — pairwise human preference → ELO ranking.

## Confused-Pair Traps (high exam-trap yield)
- **Generator vs Discriminator role:** G creates fakes (input = noise, output = sample); D judges (input = sample, output = real/fake probability). Trap: reversing the input/output.
- **Forward vs Reverse diffusion:** forward = **fixed noise addition, no learning**; reverse = **learned denoising**. Trap: saying "forward process is learned".
- **BERT vs GPT:** BERT = **encoder-only, bidirectional, MLM, classification**; GPT = **decoder-only, unidirectional, next-token, generation**. Direct exam item per 114/05 report.
- **GAN loss vs Diffusion loss:** GAN = adversarial min-max; Diffusion = MSE denoising. Not cross-entropy for either core objective.
- **Self-attention vs Cross-attention:** self-attention Q/K/V from same sequence; cross-attention Q from one sequence (e.g., decoder), K/V from another (e.g., encoder, or text embedding in Stable Diffusion).
- **Pretrain vs SFT vs RLHF purpose:** pretrain = knowledge/language; SFT = format/instruction following; RLHF = alignment/preference. Common trap: attributing "teach facts" to RLHF.
- **Latent vs pixel diffusion:** Stable Diffusion = latent (compressed); DDPM original = pixel. Latent is faster, not a different algorithm family.
- **Inception Score vs FID:** IS uses only generated images; FID compares real vs generated. FID is the modern standard.

## Key Findings Summary
1. **Three-way architecture comparison (GAN / Diffusion / LLM-Transformer) is the spine of L21103.** Lesson must deliver architecture diagrams + objective/loss comparison table; this is boundary-map §4 mandate.
2. **Self-attention formula `softmax(QK^T/√d_k)V` is fair game** at descriptive level per boundary map. Teach what Q/K/V are, why `√d_k`, why multi-head — not gradient derivations.
3. **BERT vs GPT (bidirectional vs unidirectional; encoder-only vs decoder-only)** is a confirmed field-reported exam item — guaranteed trap pattern.
4. **Diffusion forward-fixed / reverse-learned asymmetry** is the #1 diffusion trap. Students confuse which side has parameters.
5. **Modern LLM pipeline Pretrain → SFT → RLHF** purposes are exam-relevant (each stage teaches something different). DPO/GRPO/RLVR are 延伸 only.
6. **Metric families map to modality:** perplexity (LLM), FID (image gen), CLIP score (text-to-image), human/ELO (LLM chat). Students should pick the right metric for a scenario.
7. **GAN is not dead but niche;** diffusion has won high-res T2I. Reflect this in "when to use" framing without deprecating GAN (still tested).

## Scope Notes
- **In scope (architecture-level):** GAN structure + min-max objective (descriptive), Diffusion forward/reverse + MSE loss, Transformer self-attention formula + multi-head + positional encoding + three variants, LLM training pipeline (pretrain/SFT/RLHF), CLIP-style contrastive, evaluation metrics (PPL/FID/CLIP score), confused-pair traps.
- **Out of scope (flag, do not include in main body):**
  - Tool operation ("how to use ChatGPT / Midjourney / prompt tips") → 初級 L12201/L12202 only.
  - API pricing, UI features, subscription tiers.
  - Detailed math proofs (variational lower bound derivation, Wasserstein distance proofs, gradient of min-max).
  - RoPE, DPO, GRPO, RLVR, consistency models, Mixture-of-Experts internals — flag as 延伸 only.
  - Full RAG / LoRA / prompt injection deep-dives → L21202 導入 / L21203 風險.
  - Multimodal fusion (vision-language, audio) → L21104.
  - MLOps / deployment pipelines → L21302.
- **Prereqs assumed already known (do NOT re-explain):** 初級 L11401 (discriminative vs generative basics); 初級 L12201/L12202 (tool ecosystem, what ChatGPT/Midjourney are).
- **Boundary-safe lesson anchors:** GAN (G/D + min-max + mode collapse), Diffusion (forward/reverse + DDPM MSE + latent diffusion + CFG), Transformer (self-attention formula + multi-head + positional encoding + BERT/GPT/T5 variants), LLM pipeline (pretrain/SFT/RLHF), evaluation (PPL/FID/CLIP score). Exactly matches syllabus keywords + boundary-map §4 mandate.
