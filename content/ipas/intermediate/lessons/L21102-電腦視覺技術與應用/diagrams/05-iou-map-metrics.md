---
title: IoU 與 mAP 評估指標視覺化
type: ascii + mermaid
purpose: 讓學員一眼看懂 IoU 怎麼算、mAP@0.5 和 mAP@0.5:0.95 差在哪
embed_in: study-guide.md §3.5 Core Concepts — Evaluation Metrics
---

# IoU（Intersection over Union）

## 定義

```
                      Area of Overlap
         IoU  =  ───────────────────────
                      Area of Union
```

## ASCII 視覺化

```
        ┌─────────────┐               ┌─────────────┐
        │   Predicted │               │             │
        │   Box  A    │               │             │
        │    ┌────────┼──────┐        │    ┌────────┤
        │    │        │      │        │    │ Overlap│
        │    │ Overlap│      │   →    │    │   ∩    │
        │    │   ∩    │      │        │    └────────┤
        └────┤────────┘      │        └─────────────┘
             │   Ground      │             Union
             │   Truth  B    │               ∪
             └───────────────┘

                    IoU = |A ∩ B| / |A ∪ B|
```

## IoU 閾值決定判對判錯

| IoU 值 | 判定 | 品質 |
|---|---|---|
| 1.0 | 完美重合 | 💯 |
| ≥ 0.5 | 通常算 TP（True Positive） | ✅ 及格 |
| 0.5 ~ 0.75 | 合理但不夠精準 | 🆗 |
| < 0.5 | 通常算 FP（False Positive） | ❌ 不及格 |
| 0 | 完全不重疊 | 💀 |

---

# mAP（mean Average Precision）

## 兩種常見版本

```mermaid
flowchart TD
    A["偵測器對整個驗證集做推論"] --> B["對每個類別畫 PR Curve"]
    B --> C["計算該類別的 AP<br/>Average Precision<br/>= PR 曲線下面積"]
    C --> D1["平均所有類別的 AP<br/>= mAP"]

    D1 --> E1["mAP@0.5<br/>（只看 IoU ≥ 0.5）"]
    D1 --> E2["mAP@0.5:0.95<br/>（10 個閾值平均：<br/>0.5, 0.55, ..., 0.95）"]

    E1 --> F1["較寬鬆<br/>定位精度要求低<br/>PASCAL VOC 標準"]
    E2 --> F2["較嚴格<br/>獎勵緊貼物件的預測<br/>COCO 標準"]

    style E1 fill:#fff4e1
    style E2 fill:#ffe1e1
```

## 重點對照

| 指標 | 閾值數 | 嚴格度 | 常見基準 |
|---|---|---|---|
| **mAP@0.5** | 1 個（IoU ≥ 0.5） | 寬鬆 | PASCAL VOC |
| **mAP@0.5:0.95** | 10 個（0.5→0.95，步距 0.05） | 嚴格 | **COCO**（中級主流） |

## 🗣️ 白話說明

- **mAP@0.5：** 只要框「大致對」就算分——像交作業只看有沒有寫
- **mAP@0.5:0.95：** 要求框「緊貼物件」，不同鬆緊都要打分再平均——像老師連排版都要看

## 考試陷阱

❌ 「mAP 值越高代表速度越快」  
✅ mAP 是**精度**指標，與速度（FPS）無關；論文通常會同時列 mAP 和 FPS 兩個數字。

❌ 「IoU 閾值設定越高，模型就越準」  
✅ IoU 閾值是**評估時**的門檻，不會改變模型本身；高閾值只會讓通過的 bbox 變少。
