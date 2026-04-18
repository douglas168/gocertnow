---
title: ResNet 殘差連接結構（Skip Connection）
type: mermaid + ascii
purpose: 解釋 ResNet 為何能訓練超過 50 層深度——核心就是 H(x) = F(x) + x
embed_in: study-guide.md §3.3 Core Concepts — ResNet
---

# ResNet 殘差塊（Residual Block）

## 結構圖

```mermaid
flowchart TD
    X["輸入 x<br/>(H × W × C)"] --> Split

    Split["分成兩條路"] --> Main["主路徑<br/>F(x)"]
    Split --> Skip["跳過連接<br/>Identity Mapping<br/>（原封不動）"]

    Main --> C1["Conv 3×3<br/>BN + ReLU"]
    C1 --> C2["Conv 3×3<br/>BN"]
    C2 --> Add(("⊕<br/>相加"))
    Skip --> Add

    Add --> ReLU["ReLU"]
    ReLU --> OUT["輸出 H(x) = F(x) + x"]

    style Skip fill:#ffe1e1
    style Add fill:#fff4e1
    style OUT fill:#e1ffe1
```

## 為什麼叫「殘差」

傳統網路要學的目標是 `H(x)`。ResNet 改讓網路學 **殘差** `F(x) = H(x) − x`：
- 如果這一層該做「什麼也不變」，網路只需把 `F(x)` 學成 0（很簡單）
- 加上 skip connection 後：`H(x) = F(x) + x`
- 梯度可以沿 skip 直接回傳，**解決梯度消失**

## ASCII 版（簡化）

```
         ┌─────────── x ───────────┐  ← skip connection（直通）
         │                         │
  x ─────┤                         ▼
         │                       ┌─┴─┐
         └──► Conv → BN → ReLU ──► ⊕ ├──► ReLU ──► 輸出 H(x)
              → Conv → BN ───────┘   │
                                   F(x)
```

## ResNet 家族深度對照

| 模型 | 層數 | ImageNet Top-1 | 備註 |
|---|---|---|---|
| ResNet-18 | 18 | ~70% | 輕量、邊緣設備友善 |
| ResNet-50 | 50 | ~76% | **產業標配 backbone** |
| ResNet-101 | 101 | ~77% | 精度略升，算力翻倍 |
| ResNet-152 | 152 | ~78% | 原論文集成版本曾達 ~96% top-5 |

> 💡 **考試陷阱提醒**：ResNet **不是**純粹「越深越好」—— skip connection 才是核心創新，沒有它，深網路會因梯度消失而退化。
