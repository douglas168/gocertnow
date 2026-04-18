---
title: 電腦視覺三大任務族群總覽
type: mermaid
purpose: 一張圖看懂 Classification / Detection / Segmentation 的關係與代表模型
embed_in: study-guide.md §3.2 Core Concepts — Task Families
---

# 電腦視覺三大任務族群

```mermaid
graph TD
    A[電腦視覺任務<br/>Computer Vision Tasks]

    A --> B[影像分類<br/>Image Classification]
    A --> C[物件偵測<br/>Object Detection]
    A --> D[影像分割<br/>Image Segmentation]

    B --> B1[輸出：整張圖一個標籤]
    B --> B2[代表：ResNet / VGG]
    B --> B3[口訣：這是什麼？]

    C --> C1[輸出：bbox + 類別 + 信心度]
    C --> C2[兩階段<br/>Two-stage]
    C --> C3[單階段<br/>One-stage]
    C2 --> C2a[Faster R-CNN<br/>精度高 / 速度慢]
    C3 --> C3a[YOLO / SSD<br/>即時 / 速度快]
    C --> C4[口訣：在哪裡？]

    D --> D1[語意分割<br/>Semantic]
    D --> D2[實例分割<br/>Instance]
    D --> D3[全景分割<br/>Panoptic]
    D1 --> D1a[同類別同色<br/>代表：U-Net / DeepLab]
    D2 --> D2a[個別實例<br/>代表：Mask R-CNN]
    D3 --> D3a[Semantic + Instance<br/>最完整]
    D --> D4[口訣：像素級屬於誰？]

    style B fill:#e1f5ff
    style C fill:#ffe1e1
    style D fill:#e1ffe1
    style C2a fill:#fff4e1
    style C3a fill:#fff4e1
```

## 記憶口訣

| 任務 | 問題 | 輸出單位 |
|---|---|---|
| Classification | 這是什麼？ | 整張圖 1 個 label |
| Detection | 在哪裡？ | N 個 bbox |
| Segmentation | 像素級屬於誰？ | H×W mask |

## 中級必背對照

- **YOLO vs Faster R-CNN** → 單階段 vs 兩階段；速度 vs 精度的經典取捨
- **Semantic vs Instance** → 會不會區分「同類別的不同個體」
- **Mask R-CNN** → 是實例分割，不是純偵測（常見陷阱）
