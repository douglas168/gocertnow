# Research Notes: L21102 電腦視覺技術與應用

Research date: 2026-04-18 · Scope: iPAS AI 中級 科目一 · Depth: Deep (40-question pool)

## Official Sources
- **Ultralytics YOLOv8 docs** (https://docs.ultralytics.com/models/yolov8/): CSPDarknet53 backbone with C2f modules (replacing C3), PANet neck, anchor-free split detection head, Task-Aligned Assigner for dynamic positive-sample matching. Anchor-free removes prior-box tuning — a frequently-tested difference vs YOLOv5/v7.
- **YOLOv8 vs YOLOv10 comparison** (https://docs.ultralytics.com/compare/yolov8-vs-yolov10/): v10's defining innovation is **Consistent Dual Assignments → NMS-free training**. One-to-many head during training (rich supervision) + one-to-one head at inference (no NMS post-processing). Also: lightweight classification head (two 3×3 depthwise-separable conv + 1×1), spatial-channel decoupled downsampling, rank-guided block design.
- **YOLOv8 loss function** (https://docs.ultralytics.com/reference/utils/loss/, https://learnopencv.com/yolo-loss-function-siou-focal-loss/): three-part loss — **BCE (classification) + CIoU (bbox regression) + DFL (distribution focal loss for continuous bbox distribution)**. Objectness branch dropped in v8 (was in v5); IoU is folded into a Task-Aligned classification score.
- **ResNet paper, He et al. 2015** (arXiv:1512.03385, https://arxiv.org/abs/1512.03385): Residual block `y = F(x) + x`. Solves the **degradation problem** (deeper plain nets lose accuracy even on training set — not a vanishing-gradient issue alone, but optimization difficulty). Won ILSVRC 2015 with 152-layer net, 3.57% top-5 error. Canonical image-classification backbone anchor.
- **Mask R-CNN, He et al. 2017** (arXiv:1703.06870): extends Faster R-CNN with a parallel mask branch (small FCN per RoI, pixel-to-pixel). Key contribution: **RoIAlign** (bilinear interpolation, no quantization) → +10–50% relative mask accuracy vs RoIPool. Instance-segmentation anchor.
- **U-Net, Ronneberger et al. 2015** (arXiv:1505.04597): encoder-decoder (contracting path + expansive path) with **skip connections concatenating encoder features into decoder** at matching resolutions. Semantic-segmentation anchor, originally biomedical.
- **COCO mAP convention** (https://cocodataset.org/#detection-eval, https://pyimagesearch.com/2022/05/02/mean-average-precision-map-using-the-coco-evaluator/): `mAP@0.5:0.95` averages mAP across 10 IoU thresholds {0.50, 0.55, …, 0.95}, step 0.05. COCO uses 101-point interpolation (recall 0, 0.01, …, 1.0). `mAP@0.5` = PASCAL VOC-style lenient single-threshold metric.
- **CS231n convolution math** (https://cs231n.github.io/convolutional-networks/): output size `O = (W − F + 2P)/S + 1`. Must be integer. "Same" padding when `S=1` needs `P = (F−1)/2`.

## Community Insights (iPAS exam patterns)
Primary source: vocus.cc/CCChen exam collections (the main Traditional-Chinese iPAS AI study blog).
- **CV questions in 科目一 = ~2–3 per sitting** per vocus 05/17 exam report. Not dominant but guaranteed.
- **Image-to-term matching is the dominant question format.** 114/05 paper: shown 4 photos (sheep+dog scene), asked to match to {物件偵測, 影像分類, 語意分割, 實例分割}. Students must distinguish bounding boxes (偵測) vs per-pixel color masks same-color-per-class (語意) vs per-pixel different-color-per-instance (實例).
- **CNN pooling purpose** is a recurring fill-in/choice: "**縮小特徵圖尺寸、保留關鍵特徵、降低參數量、提升平移不變性 (translation invariance)**".
- **YOLO real-time scenario** framing: "毫秒級即時 + 同時分類 + bbox 定位 → YOLO" — almost verbatim on a 114 paper.
- **Medical imaging boundary → 影像分割** (tumor segmentation example used as distractor scenario).
- **Trap:** 語意分割 vs 實例分割 → semantic can't count same-class objects; instance assigns each object a unique ID.
- **No past official question bank** — iPAS does not publish 考古題; only 官方樣題 (sample items) from 學習指引 PDF. CCChen's blog is the main field-collected source.
- **114/09 syllabus update** explicitly strengthened CV items — new emphasis on correctly pairing {classification, detection, semantic seg, instance seg} to scenarios.

## Current State (CV technology landscape 2025-2026)
- **YOLO version landscape (exam-relevant delta):**
  - **YOLOv8 (Ultralytics, 2023):** anchor-free, C2f blocks, PANet neck, CIoU+DFL+BCE loss, requires NMS post-processing.
  - **YOLOv10 (2024):** NMS-free via consistent dual assignments, lightweight head, v1.0 end-to-end deployable (single graph export to TensorRT/OpenVINO with no custom NMS op).
  - Exam-relevant shift: "anchor-based → anchor-free" (v5→v8) and "NMS → NMS-free" (v8→v10). iPAS 115 syllabus lists YOLO generically; cite v8 as the default modern anchor.
- **Beyond scope (flag only):** YOLOv11 (2024) and YOLO26 (2025) exist; Vision Transformers (ViT) and DETR-family detectors are mainstream in research but not on the iPAS 115 CV item (see Scope Notes).

## External Documents Found
- **Ultralytics YOLOv8 docs** — https://docs.ultralytics.com/models/yolov8/ (backbone/neck/head breakdown)
- **Ultralytics YOLOv8 vs v10** — https://docs.ultralytics.com/compare/yolov8-vs-yolov10/ (architecture delta)
- **Ultralytics loss reference** — https://docs.ultralytics.com/reference/utils/loss/
- **ResNet paper** — https://arxiv.org/abs/1512.03385
- **Mask R-CNN paper** — https://arxiv.org/abs/1703.06870
- **U-Net paper** — https://arxiv.org/abs/1505.04597
- **COCO eval** — https://cocodataset.org/#detection-eval
- **CS231n ConvNets** — https://cs231n.github.io/convolutional-networks/
- **CCChen 114/05/17 exam field report** — https://vocus.cc/article/68288518fd89780001cf1c5f (sole Traditional-Chinese collected-questions source)
- **CCChen 備考速查表** — https://vocus.cc/article/68b1692ffd89780001ffcc86
- **CCChen 學習指引新趨勢** — https://vocus.cc/article/68eceef5fd89780001fbb2bd
- **115 年度 iPAS AIAP 簡章** — https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115年度AI應用規劃師能力鑑定簡章(初級、中級)_0105_20260105184002.pdf

## Key Facts for Study Guide

### CNN building blocks
- **Convolution output size:** `O = (W − F + 2P)/S + 1`. Must be integer.
- **"Same" padding rule** (preserve size when S=1): `P = (F − 1)/2`. For F=3 → P=1; F=5 → P=2; F=7 → P=3.
- **Parameter count per conv layer:** `(F × F × C_in + 1) × C_out` — `+1` is bias. Example: 3×3 conv, 64 in-channels, 128 out-channels → `(3×3×64+1)×128 = 73,856` params.
- **Stride (步長):** step size of filter; stride>1 downsamples. Stride 2 on a 28×28 feature map with F=3, P=1 → 14×14.
- **Padding (填補):** "valid" = no padding (shrinks); "same" = preserves spatial size (when S=1).
- **Receptive field (感受野):** area of input one output neuron "sees". Grows with depth and stride; stacking 3×3 convs cheaply grows it (two 3×3 ≈ one 5×5 receptive field, fewer params).
- **Feature map (特徵圖):** output tensor of a conv layer; channels = number of filters in that layer.
- **Pooling (池化):** **max pooling** keeps max in window (translation invariance + sharp features); **average pooling** smooths; **global average pooling** collapses H×W→1 (often before final FC in ResNet). Purpose on iPAS: 縮小尺寸、降低參數、保留主要特徵、提升平移不變性.
- **Worked convolution example:** 224×224×3 image, 7×7 filter, stride 2, padding 3, 64 filters → `(224−7+2·3)/2+1 = 112`; output 112×112×64 — this is ResNet-50's conv1.

### Task families
- **Image Classification (影像辨識):** input=image, output=single class label (+ probability). Loss=cross-entropy. Metric=Top-1/Top-5 accuracy. Anchor: **ResNet**.
- **Object Detection (物件偵測):** input=image, output=list of (bbox x,y,w,h + class + confidence). Loss=classification + bbox-regression (+ objectness in older YOLOs). Metric=**mAP**. Anchor: **YOLO** (single-shot) / **Faster R-CNN** (two-stage).
- **Semantic Segmentation (語意分割):** per-pixel class label; same-class objects not distinguished. Loss=per-pixel cross-entropy (or Dice). Metric=mIoU. Anchor: **U-Net, FCN, DeepLab**.
- **Instance Segmentation (實例分割):** per-pixel class **+ instance ID**; distinguishes two sheep as sheep_1, sheep_2. Anchor: **Mask R-CNN**.
- **Panoptic Segmentation (全景分割):** unifies semantic (stuff: sky, road) + instance (things: car, person). Every pixel gets (class, instance-id); no overlapping segments.

### Evaluation metrics
- **IoU (Intersection over Union):** `IoU = Area(overlap) / Area(union) = Area(A∩B) / Area(A∪B)`. Range 0–1. Threshold used to count a prediction as TP.
- **IoU worked example:** predicted box 100×100 at origin, ground-truth 100×100 offset by (50,50) → overlap 50×50=2500, union = 10000+10000−2500 = 17500, IoU = 2500/17500 ≈ 0.143 (would be FP at 0.5 threshold).
- **Precision = TP/(TP+FP)**; **Recall = TP/(TP+FN)**; **F1 = 2PR/(P+R)**.
- **AP (Average Precision)** per class = area under the precision-recall curve (COCO uses 101-point interpolation).
- **mAP** = mean of AP across all classes.
- **mAP@0.5** (PASCAL VOC): single IoU threshold = 0.5. Lenient.
- **mAP@0.5:0.95** (COCO default): mean of mAP at 10 IoU thresholds {0.50, 0.55, …, 0.95}. Strict — rewards tight localization. This is the headline metric in modern papers.

### Architecture anchors
- **ResNet residual block:** `y = F(x) + x` (identity shortcut). Solves **degradation** (adding layers → training error *increases* even though hypothesis class is larger; optimization problem, not overfitting). Skip connection lets gradient flow and lets block learn identity when deeper layers are not helpful. ResNet-50 = 50 layers, canonical backbone for classification + as feature extractor in detectors.
- **YOLO (single-shot):** one CNN pass → grid of predictions. Each grid cell outputs (bbox offsets, objectness — legacy, class probs). **Anchor-based (v3–v7):** predefined prior boxes per cell; predictions are offsets. **Anchor-free (v8+):** predicts box directly (center + distances to 4 sides). Requires **NMS** to remove duplicate detections at inference (except v10, which is NMS-free via one-to-one head at inference).
- **YOLOv8 loss = BCE (cls) + CIoU (bbox overlap + aspect ratio + center distance) + DFL (bbox coordinate as distribution, not point).**
- **Faster R-CNN (two-stage):** Stage 1 **RPN** proposes ~2000 candidate regions; Stage 2 classifies + refines each. Higher accuracy (especially small objects), much slower. Mask R-CNN adds a 3rd branch for pixel masks.
- **Backbone / Neck / Head anatomy:** Backbone = feature extractor (e.g., CSPDarknet, ResNet). Neck = multi-scale fusion (FPN, PANet). Head = task-specific output (bbox+class for detection; mask for segmentation).

### Speed-accuracy tradeoff (iPAS scenario question template)
- **Need real-time (≥30 FPS) + embedded device → YOLO (single-shot).**
- **Need highest precision, offline/medical → Faster R-CNN or Mask R-CNN (two-stage).**
- Reported numbers (Keylabs benchmark): YOLOv8 mAP@0.5=0.62, 1.3ms GPU; Faster R-CNN mAP@0.5=0.41, 54ms GPU — the canonical tradeoff data point.

## Key Findings Summary
1. **CV section is 2–3 Q per sitting in 科目一** — not the biggest topic, but consistent. Highest-yield practice = image-to-task-family matching (分類/偵測/語意/實例).
2. **YOLO + CNN pooling + semantic-segmentation definition** are the three verbatim recurring question spines from field reports. Every variant shows up.
3. **Convolution math** (output-size formula, parameter counting) is **calculation-item territory** — the 40-question pool should have ≥3 numerical items since 中級 pseudocode/calc style favors these.
4. **YOLO anchor-free (v8) and NMS-free (v10)** are the modern deltas — iPAS 115 syllabus uses generic "YOLO" language, so state v8 as default and flag v10's NMS-free as the 2024–25 development.
5. **IoU formula + mAP@0.5 vs mAP@0.5:0.95 distinction** is the definitional foundation every detection question sits on — must be taught with a worked example, not just prose.

## Scope Notes
- **Out of scope (flag, do not include in main body):**
  - **Vision Transformers (ViT, Swin, DETR)** — not on iPAS 115 CV item; mention in "延伸閱讀" only.
  - **Diffusion/GAN image generation, Stable Diffusion, Midjourney** → belongs to L21103 生成式AI.
  - **CLIP, vision-language, multimodal fusion** → L21104 多模態. (Note: CCChen 新趨勢 article does flag CLIP as a "keyword to know" — include as a single boundary-aware mention only, with explicit pointer to L21104.)
  - **Full training/deployment pipelines, MLOps for CV** → L21302.
  - **Generic "what is CV / what is deep learning"** — assumed from 初級 L114.
- **Boundary-safe anchors for this lesson:** CNN (building blocks), ResNet (classification), YOLO (detection), Mask R-CNN + U-Net (segmentation), IoU + mAP (metrics). Exactly matches boundary-map.md §5 scope sentence.
