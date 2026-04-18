# Research Notes: L21104 多模態人工智慧應用

Research date: 2026-04-18 · Scope: iPAS AI 中級 科目一 · Depth: Architecture-level (fusion strategies + named models)

## Official Sources
- **CLIP, Radford et al. 2021** (arXiv:2103.00020, https://arxiv.org/pdf/2103.00020): Dual-encoder (ViT/ResNet for image + Transformer for text) projected into shared embedding space. **Symmetric InfoNCE contrastive loss** over in-batch positives (matched image-caption) vs all other in-batch pairs as negatives. Trained on ~400M (image, text) pairs scraped from web. Enables **zero-shot classification** (embed candidate class names as text, pick closest to image) and **cross-modal retrieval**. OpenAI blog: https://openai.com/index/clip/.
- **Flamingo, Alayrac et al. (DeepMind) 2022** (NeurIPS, https://proceedings.neurips.cc/paper_files/paper/2022/file/960a172bc7fbf0177ccccbb411a7d800-Paper-Conference.pdf): Vision-language few-shot learner. Three parts: (1) **frozen vision encoder** (NFNet), (2) **Perceiver Resampler** — learned latent queries cross-attend to flattened visual features, compressing variable-size visual input to fixed 64 tokens, (3) **gated cross-attention layers** interleaved into a **frozen LLM**; gates initialized to zero so the pretrained LM behavior is preserved at init. Canonical example of cross-attention fusion at scale.
- **Latent Diffusion / Stable Diffusion, Rombach et al. 2022** (https://github.com/CompVis/stable-diffusion): Text-to-image = **CLIP ViT-L/14 text encoder** produces text embeddings → injected into U-Net denoiser via **cross-attention** at multiple resolutions. Reference only (full diffusion mechanics = L21103).
- **Whisper, Radford et al. (OpenAI) 2022** (https://openai.com/research/whisper): Encoder-decoder Transformer for speech. Audio → log-Mel spectrogram → convolutional stem → Transformer encoder → Transformer decoder emits text tokens (ASR) or translation tokens. Trained on 680k hours multilingual web audio. Multitask: transcribe / translate / language-ID / voice-activity, all via special tokens.
- **GPT-4o System Card, OpenAI 2024** (https://cdn.openai.com/gpt-4o-system-card.pdf): **Single autoregressive model** accepting any combination of text/audio/image/video, emitting text/audio/image. Natively multimodal (not a pipeline of separate models) — sub-second speech-to-speech via unified token space. Contrast with GPT-4V (2023) which was vision-on-top-of-text.
- **Gemini, Google/DeepMind** (https://en.wikipedia.org/wiki/Gemini_(language_model)): "Built multimodal from day one" — joint training across text/image/audio/video from pretraining, not modality bolt-on. Gemini 2.5 Pro/Flash support native audio output.
- **LLaVA, Liu et al. 2023** (arXiv:2304.08485): Open-source vision-language assistant. **Linear projection** from CLIP ViT visual features → LLM token space → concatenated with text tokens into a Vicuna/Llama decoder. Simple but effective; no cross-attention, just prefix projection.
- **Qwen-VL / Qwen2-VL, Alibaba 2023–24**: Chinese-strong open vision-language. ViT encoder + cross-attention adapter + Qwen LLM. Supports 繁體中文 OCR and VQA — practically relevant for Taiwan deployment.
- **Multimodal Alignment and Fusion: A Survey (Zhang et al. 2024)** (arXiv:2411.17040, https://arxiv.org/html/2411.17040v1): Current survey. Confirms early/late/hybrid taxonomy, flags **cross-attention / Transformer-based fusion** as dominant post-2022.
- **Towards LLM-Centric Multimodal Fusion Survey 2025** (arXiv:2506.04788): Modern taxonomy groups methods into encoder-decoder, attention, GNN, generative-NN, and constraint-based — shows traditional early/late framing is evolving but still pedagogically core.

## Community Insights (iPAS 中級 exam patterns)
Primary: vocus.cc/CCChen field-collected exam reports (the main zh-TW iPAS AI study blog).
- **114/05/17 場 考題收集** (https://vocus.cc/article/68288518fd89780001cf1c5f) and **114/09 樣題整理** (https://vocus.cc/article/68cfb814fd897800012a73ab):
  - **"結合影像與文字進行理解的技術是哪一個?" → CLIP** — a near-canonical 中級 item. Students must recognize CLIP as the text-image multimodal anchor.
  - **醫療多模態情境題:** "要整合醫學影像與臨床文字，下列哪一種技術最能強化系統?" — wrong options include "只使用 CNN 架構" or "只使用單一模態資料"; correct answer invokes **Transformer 架構整合多模態**. Pattern = single-modality is always a distractor.
  - Keyword recognition items: 多模態 = multimodal, 跨模態檢索 = cross-modal retrieval.
- **數位時代 bnext 考情分析** (https://www.bnext.com.tw/article/82484/ai-master-2025): Covers AI application scope and exam structure — confirms L21104 multimodal as a syllabus item.
- **Exam trap patterns to expect:**
  - Confusing **CLIP (retrieval / alignment)** with **Stable Diffusion (generation)** — both use CLIP text encoder but for opposite tasks.
  - "Which fusion is best for X?" scenario questions — late fusion when modalities are independent (e.g., separate classifiers vote), cross-attention when deep semantic alignment needed.
  - **Self-attention vs cross-attention** wording trap — self = Q/K/V from same sequence; cross = Q from one modality, K/V from another.
  - Naming trap: GPT-4o is **natively multimodal (one model)**, older GPT-4V was vision-on-text pipeline. Field reports expect candidates to know this distinction for 2025–26 papers.

## Current State (2024–2026)
- **Natively-multimodal era:** GPT-4o (May 2024), Gemini 2.x/3.0, Claude 4.x with vision, Llama 3.2/4 Vision, Qwen2-VL. All treat text/image/audio as tokens in a unified sequence rather than separate pipelines.
- **Text-to-video mainstream:** Sora (OpenAI, 2024–25), Google Veo 2/3, Runway Gen-3. Uses diffusion Transformer (DiT) on spacetime patches. Reference only for L21104.
- **Speech is now first-class:** GPT-4o Realtime API for sub-second speech-to-speech; Gemini Live API. Whisper still dominant for pure ASR. TTS side: ElevenLabs, OpenAI TTS, Google native TTS.
- **Open-source multimodal:** LLaVA-NeXT, Qwen2-VL, InternVL, MiniCPM-V — all roughly follow "vision encoder → projector → LLM decoder" pattern.
- **Deprecation / moved on:** Old VGG/InceptionV3-based captioning pipelines, BLIP-1 largely superseded by BLIP-2 / LLaVA / Qwen-VL.

## Fusion Strategies (core content)
- **Early fusion (feature-level / input-level / 特徵層融合):** Concatenate raw features or low-level representations from each modality before feeding into a **single joint model**. Example: concatenate image CNN features + text word embeddings → one classifier. **Pro:** captures low-level cross-modal correlations. **Con:** sensitive to modality misalignment, synchronization, different feature scales.
- **Late fusion (decision-level / 決策層融合):** Each modality has its **own independent model**; combine only at the output (voting, averaging logits, weighted sum, stacking). **Pro:** modular, robust to missing modality. **Con:** cannot model cross-modal interactions at representation level. **Canonical example: CLIP** — image encoder and text encoder run independently; fusion = dot product of final embeddings.
- **Hybrid / intermediate fusion (混合融合 / 中層融合):** Combine intermediate features from modality-specific backbones, typically through attention or gating. Bridges the early/late extremes. Most modern multimodal systems are hybrid.
- **Cross-attention fusion (跨注意力融合 / 交叉注意力融合):** Dominant 2022+ approach. One modality provides **Query (Q)**, the other modality provides **Key (K)** and **Value (V)**. Lets a decoder "look at" another modality's features during generation. **Canonical examples:**
  - **Flamingo** — gated cross-attention from LM to visual Perceiver outputs.
  - **Stable Diffusion** — U-Net Q from noisy image latent, K/V from CLIP text embeddings (text conditions image denoising).
  - **Whisper decoder** — text decoder Q, audio encoder K/V.

### Choosing a fusion strategy (exam scenario pattern)
| Scenario | Best fit | Why |
|---|---|---|
| Independent modality signals, one may be missing | **Late fusion** | Graceful degradation, modular |
| Low-level correlated signals, same time axis | **Early fusion** | Captures fine-grained co-variation |
| Deep semantic reasoning across modalities | **Cross-attention** | Learns conditional attention |
| Large-scale retrieval / zero-shot classification | **Contrastive dual-encoder (late)** | Pre-computable embeddings, fast lookup |

## Named Architectures Cheatsheet
| Model | Year | Modalities | Fusion strategy | Training objective | Canonical use |
|---|---|---|---|---|---|
| **CLIP** | 2021 | text + image | Late (dual encoder + dot product) | **Contrastive (symmetric InfoNCE)** | Zero-shot classification, text-image retrieval |
| **DALL-E 2 / 3** | 2022–23 | text → image | Cross-attention (CLIP text → diffusion prior + decoder) | Diffusion (MSE on noise) + CLIP alignment | Text-to-image generation |
| **Stable Diffusion** | 2022 | text → image | Cross-attention (U-Net Q, CLIP text K/V) | Latent diffusion MSE + CFG | Open-source T2I |
| **Flamingo** | 2022 | text + image/video | **Gated cross-attention** + Perceiver Resampler | Next-token (with vision conditioning) | Few-shot VQA, captioning |
| **Whisper** | 2022 | audio → text | Cross-attention (encoder-decoder) | Seq-to-seq cross-entropy | ASR, speech translation |
| **LLaVA** | 2023 | text + image | **Linear projection** (prefix, simplest) | Instruction-tuning cross-entropy | Open-source VQA assistant |
| **GPT-4V** | 2023 | text + image | Vision tokens → text decoder (hybrid) | Next-token | Multimodal chat (legacy) |
| **GPT-4o** | 2024 | text + image + audio + video | **Natively unified** (single model, token-level) | Unified autoregressive | Real-time voice + vision assistant |
| **Gemini (1.x–3.x)** | 2023–26 | text + image + audio + video | **Natively multimodal from pretraining** | Unified next-token | General multimodal |
| **Qwen-VL / Qwen2-VL** | 2023–24 | text + image (strong zh) | Cross-attention adapter → LLM | Next-token | Chinese VQA, OCR |
| **Sora / Veo** | 2024–25 | text → video | DiT cross-attention on spacetime patches | Diffusion | Text-to-video (reference only) |

## Modality Encoders (how each modality enters the model)
- **Text:** tokenizer (BPE/SentencePiece) → Transformer (BERT/GPT) → token embeddings. **Reference L21101** — do not re-teach.
- **Image:** two options —
  - **CNN (ResNet):** convolutional feature maps.
  - **ViT (Vision Transformer):** **patch embedding** — split image into 16×16 patches, linearly project each patch to a token, add positional embedding, feed to Transformer. **Reference L21102** — do not re-teach internals.
- **Audio:**
  - **Wav2Vec2 (Meta):** self-supervised CNN + Transformer directly on raw waveform.
  - **Whisper encoder:** log-Mel spectrogram (80 mel bins × time) → 2× conv stem → Transformer encoder.
  - Classical: MFCC / spectrogram + CNN.
- **Video:** 3D CNN (I3D, SlowFast), or ViT variants with **temporal attention** / spacetime patches (Sora-style).

## Loss Functions Relevant to Multimodal
- **Contrastive loss (InfoNCE, CLIP-symmetric):** for each positive (image_i, text_i) pair, all other (image_i, text_j≠i) in the batch are negatives. Symmetric = image-to-text loss + text-to-image loss, averaged. Drives matched pairs closer, unmatched apart in shared embedding space.
- **Cross-attention conditioning loss:** no new loss — the base task loss (next-token cross-entropy, diffusion MSE) flows through cross-attention layers so they learn to align modalities.
- **Reconstruction / masked modeling:** BEiT-style masked image modeling, MAE. Flag only — not the L21104 spine.
- **Alignment + generation combo:** DALL-E 2 uses CLIP embedding as target + diffusion decoder on top → "prior" (text→image-embed) + "decoder" (image-embed→pixels).

## Use Cases (with task-direction distinction — common exam trap)
| Task | Direction | Canonical architecture |
|---|---|---|
| 圖像描述生成 (image captioning) | image → text | Encoder-decoder (ViT + GPT), LLaVA, Flamingo |
| 視覺問答 VQA (Visual Question Answering) | image + text → text | Flamingo, LLaVA, GPT-4V |
| 文字轉圖像 (text-to-image) | text → image | Stable Diffusion, DALL-E 3 |
| 文字轉語音 TTS | text → audio | Tacotron 2, VALL-E, ElevenLabs, GPT-4o |
| 語音轉文字 ASR | audio → text | Whisper, Wav2Vec2 |
| 多模態檢索 (cross-modal retrieval) | text ↔ image | CLIP (dot product in shared space) |
| 文字轉影片 (text-to-video) | text → video | Sora, Veo (DiT) |
| 零樣本影像分類 (zero-shot image classification) | image (→ classes as text) | CLIP |

## Taiwan Terminology (zh-TW)
- 多模態 = multimodal (模型同時處理多種模態)
- 跨模態 = cross-modal (在模態間轉換或檢索，如文字↔圖像檢索，DALL-E 文字→圖像生成)
- 多模態 ⊇ 跨模態 (cross-modal tasks are a subset of multimodal systems)
- 視覺問答 = VQA (Visual Question Answering)
- 圖像描述生成 / 看圖說故事 = image captioning
- 對比學習 = contrastive learning
- 交叉注意力 / 跨注意力 = cross-attention (both seen in zh-TW literature; 交叉注意力 slightly more common in Taiwan academic writing)
- 自注意力 = self-attention
- 特徵層融合 / 決策層融合 / 混合融合 = early / late / hybrid fusion
- 共享嵌入空間 = shared embedding space
- 雙編碼器 = dual encoder
- 語音辨識 = ASR (automatic speech recognition)
- 文字轉語音 = TTS (text-to-speech)
- 雜訊 (Taiwan) not 噪聲 (China) for noise; 解析度 not 分辨率 for resolution.

## Key Findings Summary
1. **L21104 spine = fusion taxonomy + named-architecture matching.** Exam asks "which model for which task" and "which fusion strategy for which scenario." Architecture table is the core deliverable.
2. **CLIP is the single most-tested multimodal model** (field-confirmed on 114 papers). Teach: dual encoder + symmetric InfoNCE + shared embedding space + zero-shot / retrieval use case.
3. **Cross-attention is the dominant 2022+ fusion mechanism** for deep semantic integration. Teach the Q/K/V-from-different-modalities distinction vs self-attention. Canonical examples: Flamingo, Stable Diffusion, Whisper.
4. **Natively multimodal (GPT-4o, Gemini) vs bolt-on (GPT-4V, LLaVA)** is a 2024–26 distinction worth one exam item. Native = unified token space, trained multimodally from pretraining.
5. **Task direction is a trap surface:** CLIP = retrieval/alignment (no generation), Stable Diffusion = generation (no retrieval), both use CLIP text encoder. Students must not confuse.
6. **多模態 vs 跨模態 terminology** — multimodal = the capability; cross-modal = the task direction (transfer/retrieval across modalities). Often used interchangeably in zh-TW popular writing; iPAS favors 多模態 as the umbrella term.

## Scope Notes
- **In scope (L21104 core):** fusion taxonomy (early/late/hybrid/cross-attention), CLIP contrastive alignment at descriptive level, named-architecture cheatsheet, cross-attention vs self-attention, modality-to-task mapping, zh-TW terminology.
- **Out of scope — flag, do not main-body:**
  - Full **diffusion math / DDPM forward-reverse / CFG derivation** → L21103. Here: only reference Stable Diffusion as a cross-attention fusion example.
  - Full **CNN math / ViT patch-embedding internals / convolution arithmetic** → L21102. Here: encoder = black-box choice.
  - Full **Transformer self-attention formula `softmax(QK^T/√d_k)V` derivation / multi-head derivation / tokenizer BPE** → L21101. Here: reference only.
  - **Discriminative vs generative 概念性對比** → 初級 L11401. Do not re-teach.
  - **Prompt engineering / tool usage (ChatGPT/Midjourney how-to)** → 初級 L12201/L12202. Do not re-teach.
  - **RLHF / SFT / DPO pipeline** → L21103 (generative training) or L21203 (alignment risk). Not a L21104 anchor.
  - **MLOps / deployment / serving multimodal models** → L21302.
- **Prereqs assumed (do NOT re-explain):** L21101 Transformer basics, L21102 CNN/ViT basics, L21103 generative model training (GAN/Diffusion/LLM), 初級 L11401 (discriminative vs generative), 初級 L12201/L12202 (tools).
- **Boundary-safe lesson anchors:** (1) multimodal definition + 多模態/跨模態, (2) fusion taxonomy (early/late/hybrid/cross-attention) with scenario mapping, (3) CLIP deep-dive (dual encoder + InfoNCE + use cases), (4) cross-attention mechanism (Q vs K/V from different modalities) with Flamingo + Stable Diffusion as examples, (5) named-architecture cheatsheet + task-direction matching, (6) Taiwan terminology. Matches syllabus keywords (多模態/文字/圖像/聲音) + boundary-map §4 and §5 mandate.
