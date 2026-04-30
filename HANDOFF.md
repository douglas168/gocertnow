# Handoff — 2026-04-30

## Session Summary

Full adversarial accuracy review and v2 study guide generation for all 22 IPAS AI應用規劃師 中級 lessons.

## What Was Done

1. **Renamed** existing `study-guide-v2.md` files to `{code}-{topic}-study-guide.md` across 15 lesson folders (L21101, L21302, L22101–L22404).

2. **Generated v2-format study guides** (from scratch, using `study-guide-format-template.md`) for 7 lessons that had no v2 file:
   - L21102 電腦視覺技術與應用
   - L21103 生成式AI技術與應用
   - L21104 多模態人工智慧應用
   - L21201 AI導入評估
   - L21202 AI導入規劃
   - L21203 AI風險管理
   - L21301 數據準備與模型選擇

3. **Adversarial accuracy review** (Gemini + Claude) run on all 22 guides. Each lesson has an `accuracy-review-2026-04-30.md`. Codex CLI was broken this session (gpt-5.5 version error).

4. **Applied all accuracy fixes** to both existing 15 guides and 7 new guides. Key corrections:
   - RoBERTa tokenizer: WordPiece → Byte-level BPE
   - CLIP architecture: Late Fusion → dual-encoder contrastive
   - BCG AI investment ratio: 70/20/10 → 10/20/70 (70% = people & process)
   - Google AI governance framework: 3 pillars → 4 pillars
   - CRISP-DM: linear → cyclical
   - DDIM added to diffusion section; "slow" caveat corrected
   - DPO full section added to L22403 and L21103
   - BERT NSP: marked as largely abandoned in RoBERTa+
   - DALL-E 3: synthetic recaptioning mechanism explained
   - LLaVA 1.5+: 1-layer projection → 2-layer MLP
   - Faster R-CNN: proposal counts corrected (2000 train / 300 inference)
   - Skip connections: "degradation problem" not vanishing gradient
   - Exponential Distribution: full section added to L22102 (was missing)
   - Statistical corrections: CLT n≥30, Binomial→Poisson (n≥100, np≤10), continuity correction ±0.5
   - GDPR Art.33 conditional qualifier added; pseudonymisation vs anonymization clarified
   - EU AI Act: GPAI provisions section added to L21203
   - TAIDE model: LLaMA 2 7B (not Llama 3.1)
   - sklearn confusion_matrix orientation warning added
   - Tableau Public: "forces public" (does not restrict sharing)

## Pending / Needs Verification Before 5/23 Exam

- **Taiwan AI Basic Law dates** in L21203 — accuracy review flagged these as needing verification against Presidential Office gazette / Legislative Yuan records. The content cites specific enactment/implementation dates but the reviewer flagged them as unverified. Verify before the exam.
- **ISO/IEC 27701:2025 standalone claim** in L22404 — standard was originally an extension to ISO 27001; the 2025 edition's standalone status should be confirmed with the ISO catalogue.

## What's Next

- **Generate 3 mock exams** for 資料分析組 SKU (`/course-generate-exam`) — highest ROI given 中級 exam is 2026-05-23.
- Start 機器學習組 SKU (L23xxx, 12 lessons) after mock exams are assembled.

## Key File Paths

- Study guides: `content/ipas/intermediate/lessons/{code}-{topic}/{code}-{topic}-study-guide.md`
- Accuracy reviews: `content/ipas/intermediate/lessons/{code}-{topic}/accuracy-review-2026-04-30.md`
- Format template: `study-guide-format-template.md`
- Original source materials: `content/ipas/intermediate/lessons/{code}-{topic}/study-guide.md`

## Open Items Carried Forward (from prior sessions)

- **L22404**: Gemini cross-review skipped previously (CLI error) — now done in this session
- **All lessons**: Mermaid diagram rendering to PNG pending across L21101–L22404 (non-blocking)
- **L21102** coverage gaps: image-matching and Precision/Recall/F1 each have only 1 question in the practice pool
- **Landing page**: `web/app/(marketing)/page.tsx` has fake-claim 92% 通過率 badge + sampleTestimonials — must fix before sending traffic
