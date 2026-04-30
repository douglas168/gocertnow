# Accuracy Review — L21102: 電腦視覺技術與應用
Date: 2026-04-30
Reviewers: Claude (independent pass) + Gemini (adversarial pass)

---

## Summary

The guide is structurally solid and pedagogically well-organized. Math and core formulas are correct. The main failure is a **conceptual conflation** between ResNet's degradation problem and the pre-existing vanishing gradient problem, and **imprecise architectural details** (RPN proposal counts, projection shortcuts). Terminology is largely ITRI-standard. No catastrophic formula errors.

---

## Critical Errors (must fix before publishing)

### CE-1: Skip Connection conflates two distinct problems
- **Claim**: Skip connections solve BOTH "退化問題 (degradation)" AND "梯度消失 (vanishing gradient)"
- **Correction**: These are **different problems with different primary solutions**. Vanishing gradient was already largely addressed by Batch Normalization + ReLU *before* ResNet. ResNet's original motivation (He et al., 2015) is specifically the **degradation problem** — where deeper models have *higher training error* than shallower ones, even without overfitting. Skip connections help gradient flow as a *secondary* benefit, but BN is the primary solution to vanishing gradient. Presenting them as co-equal solutions is misleading.
- **Fix**: In Section 3, change "ResNet 兩大收益" to: "主要解決退化問題 (degradation problem)；梯度流動獲益為次要效果（主要靠 Batch Normalization 解決梯度消失）"

### CE-2: Faster R-CNN RPN proposal count is training-only
- **Claim**: "RPN（提候選框 ~2000 個）"
- **Correction**: The ~2000 figure is for **training**; at **inference** Faster R-CNN uses ~300 proposals (NMS-filtered). Presenting 2000 as the operational number creates a misleading impression of inference latency for an "AI Application Planning" exam.
- **Fix**: Add "(訓練時 ~2000，推論時 ~300，經 NMS 篩選)"

### CE-3: ResNet identity shortcut is incomplete — projection shortcuts ignored
- **Claim**: H(x) = F(x) + x (only identity shortcut shown)
- **Correction**: ResNet-50 uses **projection shortcuts** (H(x) = F(x) + Wₛx with 1×1 conv) when channel dimensions change between stages. Identity shortcut only applies when input/output dimensions match. For ResNet-50 specifically, projection shortcuts appear at stage transitions. Ignoring this leaves exam takers unable to handle questions about dimension-mismatch handling.
- **Fix**: Add a note in Section 3: "當輸入輸出維度不同時（如 stage 切換），使用 projection shortcut：H(x) = F(x) + Wₛx（1×1 卷積調整維度）"

---

## Minor Issues

### MI-1: "mAP-mask" is informal terminology
- Standard COCO notation is **AP^mask** or **AP_segm**, not "mAP-mask." Minor but could confuse students reading actual papers.
- Fix: Change to "AP^mask（COCO 標準寫法）" in the metrics table.

### MI-2: Pooling as "NOT feature extraction" is philosophically contested
- Gemini flagged: Max pooling does select the most salient feature in a region, which is a form of feature selection/extraction.
- Assessment: For IPAS exam purposes, the guide's framing ("縮小特徵圖尺寸 + 平移不變性") is the correct exam answer. This is an acceptable simplification. **No fix required**, but add a footnote: "嚴格說，max pooling 選出最顯著特徵，是一種特徵篩選；考試語境下，池化層的主要目的是降維 + 平移不變性。"

### MI-3: Panoptic FPN is one option, not the canonical answer
- Panoptic-DeepLab is equally or more widely cited in 2024-2026 literature. The guide presents Panoptic FPN as the representative architecture.
- Assessment: For exam prep, having one standard answer is pedagogically sound. **Low risk**, but note that the question pool should not penalize Panoptic-DeepLab answers.

### MI-4: CNN forward pass order simplification
- Guide shows "Conv → ReLU → Pool" but modern networks often use "Conv → BN → ReLU → Pool."
- Assessment: The simplified form is the standard textbook version and acceptable for IPAS exam context.

---

## Missing Key Concepts

1. **Batch Normalization (BN)**: Not mentioned at all in the CNN components section. BN is the actual primary tool that enabled deep network training and is standard in all modern architectures. Should appear in the ResNet section at minimum.
2. **Transfer Learning / Fine-tuning**: Absent. For an AI Application Planner, knowing to use pretrained ResNet/EfficientNet backbone + fine-tune is more practically load-bearing than calculating conv output sizes from scratch.
3. **Data Augmentation**: Not mentioned. Standard CV pipeline knowledge for planners.
4. **Receptive Field**: Not mentioned. Relevant for understanding why different architectures suit different object scales.

---

## Terminology Notes

| Term | Used in Guide | ITRI/Industry Standard | Status |
|---|---|---|---|
| 退化問題 | Yes | 退化問題 (degradation problem) | Correct |
| 梯度消失 | Yes | 梯度消失 (vanishing gradient) | Correct |
| 平移不變性 | Yes | 平移不變性 (translation invariance) | Correct |
| 非最大值抑制 | Yes | 非最大值抑制 (NMS) | Correct |
| 全景分割 | Yes | 全景分割 (panoptic segmentation) | Correct |
| 實例分割 | Yes | 實例分割 (instance segmentation) | Correct |
| mAP-mask | Yes | AP^mask / AP_segm | **Informal — fix** |

---

## Convergence Notes

Claude and Gemini converge on:
- **CE-1** (skip connection conflation): Both flagged independently. High confidence this is a real error.
- **CE-2** (RPN ~2000 is training-only): Both flagged independently. High confidence.
- **Projection shortcuts**: Both flagged. High confidence this is missing.
- **Terminology**: Both agree ITRI-standard terms are correctly used.

Gemini raised but Claude disagrees on:
- "Pooling is NOT feature extraction" being "technically suspect" — for IPAS exam purposes the guide's framing is the correct answer. Not a publishable error.

---

## Verdict

Grade: **B**

Core math and formulas are correct. The ResNet skip-connection conflation (CE-1) is the most pedagogically dangerous error because it creates a wrong mental model that will lose exam points on nuanced questions about degradation vs. overfitting vs. vanishing gradient. The RPN count issue (CE-2) and missing projection shortcuts (CE-3) are important for a 中級 (intermediate) exam planner. Fix CE-1 through CE-3 before publishing. Missing BN is the largest gap for a truly professional-grade guide.
