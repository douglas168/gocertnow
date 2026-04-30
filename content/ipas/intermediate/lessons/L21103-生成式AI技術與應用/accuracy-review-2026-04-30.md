# Accuracy Review — L21103: 生成式AI技術與應用
Date: 2026-04-30
Reviewers: Claude (independent pass) + Gemini (adversarial pass)

---

## Summary

The guide covers GAN, Diffusion, Transformer/LLM, and evaluation metrics with good breadth. Core formulas are technically correct. The main weakness is that the content reflects **2022-era paradigms** in several places: NSP is included in BERT's pretraining as if it's still standard, RLHF is described as exclusively PPO-based (ignoring DPO which is now mainstream), and DDIM — the sampler actually used in production Stable Diffusion — is never mentioned. The SD compression ratio is a minor imprecision. For a 2026 exam, these are meaningful gaps.

---

## Critical Errors (must fix before publishing)

### CE-1: BERT's NSP objective is outdated and potentially misleading
- **Claim**: "Pretrain 任務：MLM（克漏字）+ NSP" listed as load-bearing for BERT
- **Correction**: NSP (Next Sentence Prediction) was shown to be **ineffective or detrimental** by RoBERTa (Liu et al., 2019) and subsequently dropped by virtually all encoder models. Listing NSP as a key BERT objective teaches students a fact that was obsolete by 2020. If the exam asks "what are BERT's pretraining objectives," and a student answers "MLM + NSP," they may be penalized under 2026 standards.
- **Fix**: Change to "Pretrain 任務：MLM（克漏字）[+ NSP，原始 BERT 包含但後續研究（RoBERTa）發現無效，現代 encoder 模型已捨棄]." Or simply: "主要任務：MLM（克漏字）"

### CE-2: RLHF described as exclusively PPO-based — DPO not mentioned
- **Claim**: "RLHF 流程：① 訓練 Reward Model → ② PPO 強化學習最大化 reward"
- **Correction**: DPO (Direct Preference Optimization, Rafailov et al., 2023) is now the **dominant alignment method in 2024-2026**, used by Llama 3, Mistral, Gemma, and many others. DPO bypasses the explicit Reward Model and PPO entirely by directly optimizing the LLM on preference data. Teaching PPO-only RLHF is technically not wrong for the original RLHF framework, but presenting it as the complete picture for a 2026 exam creates a critical blind spot.
- **Fix**: Add after RLHF description: "⚠️ 延伸：DPO（Direct Preference Optimization，2023）是目前主流替代方案，直接在偏好對上優化模型，省去 Reward Model 和 PPO，Llama 3 / Mistral 等主流模型均採用。"

### CE-3: DDIM not mentioned — DDPM presented as the only diffusion paradigm
- **Claim**: "推論慢（T ≈ 1000 步）" described as inherent to diffusion; no mention of DDIM
- **Correction**: DDIM (Denoising Diffusion Implicit Models, Song et al., 2020) enables deterministic generation in **~50 steps** (vs DDPM's 1000 Markovian steps) and is the **default sampler in Stable Diffusion**. The guide's framing that diffusion inference is inherently slow is incorrect in practice — DDIM makes it usable. For a 2026 exam, DDIM is a testable concept.
- **Fix**: Add to Section 3: "⚠️ DDIM（Denoising Diffusion Implicit Models）：非 Markovian 反向過程，推論步數從 ~1000 降至 ~50，為 Stable Diffusion 預設採樣器。考題常問 DDPM vs DDIM 的主要差異（速度）。"

---

## Minor Issues

### MI-1: Stable Diffusion ~50× compression is imprecise
- Claim: "潛空間（~50× 更小）"
- Actual: SD 1.x VAE: 512×512×3 → 64×64×4. Spatial compression: 8× per dimension (64×). Total pixel count ratio: (512×512) / (64×64) = 64×. Accounting for channel change (3→4): (512×512×3) / (64×64×4) ≈ 48×.
- Assessment: The tilde (~50×) makes this technically acceptable as a rough figure. However "~50×" is a loose approximation and could be tightened. **Low priority fix**: change to "約 48× 更小（空間 8× 壓縮，SD 1.x 標準 VAE）"

### MI-2: GAN loss as stated is the saturating form; non-saturating heuristic not mentioned
- The guide states the theoretical minimax E[log D(x)] + E[log(1−D(G(z)))] and notes it's "描述層" — this is accurate.
- However: the original GAN paper immediately proposes the **non-saturating heuristic** for G (maximize log D(G(z)) instead of minimize log(1−D(G(z)))) to prevent G's gradient vanishing early in training. This is why GAN training works at all in practice.
- Assessment: For IPAS exam purposes, the theoretical minimax is the testable formula. The non-saturating heuristic is an implementation detail. **Low priority**, but worth a footnote.

### MI-3: DDPM also supports x₀-prediction, guide only shows ε-prediction
- The guide states the loss as predicting ε (noise). DDPM paper also describes predicting x₀ (original image) directly. Modern diffusion (e.g., SD 3, FLUX) uses v-prediction (velocity parameterization).
- Assessment: For IPAS 中級 exam prep, ε-prediction is the testable standard. **No fix required** — current content is correct for exam context.

### MI-4: FID Gaussian assumption acknowledged but limitation not flagged
- The guide correctly describes FID as fitting Gaussians to Inception-v3 features. This is accurate.
- Limitation: real feature distributions are non-Gaussian, so FID has a known systematic bias.
- Assessment: For exam prep, the guide's description is correct at the required level of detail. **No fix required**.

---

## Missing Key Concepts

1. **DDIM / accelerated samplers**: CE-3 above. Critical gap for 2026.
2. **DPO (Direct Preference Optimization)**: CE-2 above. Critical gap for 2026.
3. **LoRA / PEFT (Parameter-Efficient Fine-Tuning)**: Not mentioned. Highly relevant for planners deciding how to fine-tune LLMs efficiently without full fine-tuning costs.
4. **Hallucination root causes**: RAG is correctly presented as a mitigation. But the guide doesn't explain *why* LLMs hallucinate (parametric memory limitations, training distribution gaps). This matters for application planning.
5. **Context window and position encoding impact**: Mentioned briefly (RoPE for Llama/Mistral) but not explained. Position encoding is testable at 中級 level.
6. **Score-based generative models / DDPM vs score-based distinction**: The guide collapses these. Acceptable for IPAS exam prep, but a named gap.

---

## Terminology Notes

| Term | Used in Guide | ITRI/Industry Standard | Status |
|---|---|---|---|
| 擴散模型 | Yes | 擴散模型 (diffusion model) | Correct |
| 生成對抗網路 | Yes | 生成對抗網路 (GAN) | Correct |
| 潛空間 | Yes | 潛空間 / 隱空間 | Correct (both used) |
| 指令微調 | Yes | 指令微調 (instruction fine-tuning / SFT) | Correct |
| 檢索增強生成 | Yes | 檢索增強生成 (RAG) | Correct |
| 困惑度 | Yes | 困惑度 (perplexity) | Correct |
| 模式崩潰 | Yes (as "mode collapse") | 模式崩潰 | Correct |
| 幻覺 | Yes (as "hallucination") | 幻覺 / 錯誤生成 | Correct |

---

## Convergence Notes

Claude and Gemini converge on:
- **CE-1** (NSP obsolete): Both flagged independently. High confidence — this is a real, testable error for 2026.
- **CE-2** (PPO-only RLHF, DPO missing): Both flagged independently. High confidence.
- **CE-3** (DDIM missing): Both flagged independently. High confidence.
- **SD ~50× compression**: Both flagged as imprecise. Low severity.
- **GAN non-saturating loss**: Both noted it's the practical standard but not mentioned.

Gemini was sharper on: DDPM variants (Improved DDPM with learned variance). This is a valid point but is below IPAS exam scope — low priority.

---

## Verdict

Grade: **C**

The formulas are correct and the structure is excellent. However, three critical gaps (NSP obsolescence, DPO omission, DDIM omission) mean the guide teaches students 2022-era facts for a 2026 exam. A student who reads this guide and is asked about modern LLM alignment methods, or how diffusion inference is made practical, will give outdated answers. CE-1 through CE-3 must be fixed before publishing. After fixes, this guide would earn a B+.
