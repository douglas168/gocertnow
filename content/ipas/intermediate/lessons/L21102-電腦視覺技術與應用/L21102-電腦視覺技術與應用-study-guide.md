# L21102 電腦視覺技術與應用 — Study Guide v2

> 一句話定位：你不是來學「什麼是電腦視覺」，你是來學 **CNN 怎麼蓋、偵測和分割差在哪、怎麼用 IoU 和 mAP 打分數**。這三件事抓穩，科目一的 CV 題 2～3 題基本都是你的。

---

## 0. How to Use This Guide

**建議閱讀順序：**

1. 先讀 **Section 1**（大全圖），建立整體骨架
2. 按順序讀 **Sections 2–7**，每節後做 Quick Check
3. 讀 **Section 8** 決策樹，練習「看到關鍵字直接選答案」
4. 讀 **Section 9** 陷阱診所，掃一遍你最可能答錯的題型
5. 做 **Section 10** 練習題，驗收
6. 考前 3 分鐘唸 **Final Oral Recall**

**火力標記說明：**

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

---

## 1. Big Picture / Core Pipeline

### 電腦視覺的三層骨架

```text
原始影像 (Raw Image)
  │
  ▼
CNN 底層元件
  ├─ 卷積層 (Convolutional Layer) — 抽特徵
  ├─ 激活函數 (Activation Function, ReLU) — 加入非線性
  ├─ 池化層 (Pooling Layer) — 縮小尺寸 + 平移不變性
  ├─ 殘差連接 (Skip Connection, ResNet) — 解決深層退化
  └─ 全連接層 (Fully Connected Layer) — 做最後分類
  │
  ▼
任務選擇 (Task Selection)
  ├─ 影像分類 (Classification) → 輸出：單一 label
  ├─ 物件偵測 (Object Detection) → 輸出：bbox + 類別 + 信心
  ├─ 語意分割 (Semantic Segmentation) → 輸出：每像素類別
  └─ 實例分割 (Instance Segmentation) → 輸出：每像素類別 + 個體 ID
  │
  ▼
評估指標 (Evaluation Metrics)
  ├─ 分類任務 → Top-1 / Top-5 accuracy
  ├─ 偵測任務 → IoU → Precision / Recall → AP → mAP
  └─ 分割任務 → mIoU (語意) / mAP-mask (實例)
```

### 題目快速對照表

| 題目問的是 | 想到 |
|---|---|
| 即時偵測 / 毫秒級 / 邊際裝置 | YOLO（單階段偵測器）|
| 最高精度 / 醫療影像 / 離線分析 | Faster R-CNN（兩階段偵測器）|
| 每個像素都要標類別 / 腫瘤輪廓 | 語意分割 (U-Net / DeepLab) |
| 同類要分個體 / 每人獨立 mask | 實例分割 (Mask R-CNN) |
| 降維度 / 平移不變性 / 縮小特徵圖 | 池化層 (Pooling) |
| 網路很深卻訓不起來 / 退化問題 | ResNet skip connection |
| 交集比聯集 / 預測框重疊度 | IoU |
| 10 個門檻平均 / COCO 嚴格評測 | mAP@0.5:0.95 |

---

## 2. CNN 底層元件 🔥🔥🔥

### 先懂一句話

CNN（Convolutional Neural Network，卷積神經網路）用「小視窗在圖上滑動」的方式抽特徵，解決了傳統全連接網路遇到影像時的兩大問題：**參數爆炸** 和 **對位置敏感**。

### Everyday Analogy

想像你在翻一疊貓咪照片。你不需要每張從頭到尾逐格檢查——眼睛只要掃到「尖耳朵 + 鬍鬚形狀」的局部特徵，就知道那是貓。CNN 的卷積核做的正是同一件事：用同一個小型偵測器（kernel）掃過整張圖，不管貓在左邊還是右邊都能認出來。

### 在整體流程中的位置

```text
原始影像 → [卷積層 → ReLU → 池化層] × N 層 → 全連接層 → 分類結果
              ↑ 這一節的主角
```

### Key Concepts

**為什麼不用全連接網路 (Fully Connected Network) 處理影像？**

| 問題 | 說明 |
|---|---|
| 參數爆炸 | 224×224×3 的彩色圖攤平 = 150,528 個輸入，接 1,000 個神經元就需要 1.5 億個權重 |
| 對位置敏感 | 貓移到右邊 3 像素，整組權重要重學；但貓還是貓 |

**CNN 五大建構元件：**

| 元件 | 職責 | 口訣 |
|---|---|---|
| 卷積層 (Conv Layer) | 抽取局部特徵（邊緣、紋理、形狀） | 找特徵 |
| 激活函數 (ReLU) | 引入非線性，讓網路能學複雜模式 | 加彎度 |
| **批次正規化 (Batch Normalization, BN)** | 正規化每層輸出，加速訓練、緩解梯度問題 | 穩訓練 |
| 池化層 (Pooling Layer) | 縮小特徵圖尺寸、提升平移不變性 | 縮維度 |
| 全連接層 (FC Layer) | 根據抽到的特徵做最後分類決策 | 說答案 |

**Batch Normalization（批次正規化）：**

在每層卷積輸出後，對 mini-batch 中的每個特徵做正規化（mean=0, std=1），再經可學習的 γ/β 參數做縮放與平移。

三大作用：
1. **加速訓練**：允許更大學習率，收斂更快
2. **緩解梯度消失 / 爆炸**：這是現代深層網路（包含 ResNet）能訓練深到 50–152 層的關鍵之一
3. **輕微正則化效果**：mini-batch 統計量帶入隨機性，類似 Dropout 的輕微效果

> 現代 CNN 的實際前向順序通常是 **Conv → BN → ReLU → Pool**（而非教科書的 Conv → ReLU → Pool）。ResNet、EfficientNet 等主流架構均使用 BN。

**卷積輸出尺寸公式（必背）：**

```text
O = ⌊(W − F + 2P) / S⌋ + 1

W = 輸入邊長
F = kernel 大小（filter size）
P = padding 填補圈數
S = stride 步長
⌊ ⌋ = floor 向下取整（PyTorch / TensorFlow 預設）
```

**實戰算例（ResNet-50 第一層）：**

```text
輸入 224×224，kernel 7×7，stride 2，padding 3，64 個 filter
O = ⌊(224 − 7 + 2×3) / 2⌋ + 1
  = ⌊223 / 2⌋ + 1
  = 111 + 1
  = 112

輸出尺寸：112 × 112 × 64
```

**池化層種類：**

| 種類 | 運算 | 用途 |
|---|---|---|
| 最大池化 (Max Pooling) | 取視窗最大值 | 保留銳利邊緣特徵，最常用 |
| 平均池化 (Average Pooling) | 取視窗平均值 | 平滑輸出，減少噪音 |
| 全域平均池化 (GAP) | 整張特徵圖壓成一個數 | ResNet 最後 conv 後接分類層 |

> 陷阱提示：池化層的作用是「縮小尺寸 + 平移不變性」，**不是**抽取新特徵。抽特徵是卷積層的事。

### Exam Rule

```text
影像參數爆炸 / 位置不變性需求 → CNN（用卷積取代全連接）
「每次跳幾格」→ stride（步長）
「邊緣補零保尺寸」→ padding (same padding)
「縮小特徵圖」→ 池化層（Max / Average Pooling）
「池化目的」→ 降維 + 平移不變性（不是抽特徵）
卷積輸出尺寸 → O = ⌊(W − F + 2P) / S⌋ + 1
```

### Quick Check

池化層最主要的目的是什麼？

答案：縮小特徵圖尺寸、保留關鍵訊號、提升平移不變性。池化層**不是**用來抽取更多特徵，那是卷積層的工作。

---

## 3. ResNet 殘差連接 🔥🔥

### 先懂一句話

ResNet 在網路裡加了一條「捷徑」（skip connection），讓深層網路的梯度有高速公路可以反傳，解決了「網路越深、訓練誤差越大」的退化問題 (degradation problem)。

### Everyday Analogy

你用 LINE 傳訊息給阿嬤，中間要經過 10 個親戚轉達。殘差連接就像多拉一條「把原話直接附上」的捷徑——就算中間某位親戚轉錯了，原話還在。網路不用每一層都硬記整句話，只要學「需要補充或修正什麼」就好。

### 在整體流程中的位置

```text
普通 CNN：輸入 x → [Conv → BN → ReLU → Conv → BN] → 輸出 H(x)

ResNet：  輸入 x ──── 捷徑（identity shortcut）────┐
              │                                    ▼
              └─► [Conv → BN → ReLU → Conv → BN] → (+) → ReLU → 輸出 H(x)
                              F(x)
```

### Key Concepts

**退化問題 (Degradation Problem)：**

網路從 20 層加深到 56 層，**連訓練誤差都變大**（不是只有測試誤差）。這不是過擬合（overfitting），是深層網路本身難以優化的問題。

**ResNet 解法：**

```text
公式：H(x) = F(x) + x

x    = 原始輸入，走捷徑直達輸出
F(x) = 這個 block 實際要學的「修正量」（殘差）
H(x) = 最終輸出 = 原輸入 + 修正量
```

最壞情況：如果這層沒什麼要學，F(x) → 0，整個 block 自動變成 H(x) = x（恆等映射），「加深不會變差」。

**Identity Shortcut vs Projection Shortcut：**

| 類型 | 條件 | 公式 | 說明 |
|---|---|---|---|
| Identity shortcut | 輸入輸出維度相同 | H(x) = F(x) + x | 直接相加，無額外參數 |
| Projection shortcut | 輸入輸出維度不同 | H(x) = F(x) + Wₛx | 1×1 卷積調整維度後再相加 |

> 考試重點：ResNet-50 在各 stage 銜接處（如 conv2→conv3），channel 數從 256 → 512，輸入輸出維度不同，此時 skip connection 會改用 **1×1 conv（projection shortcut）** 來對齊維度。考題會區分：同維度 = identity shortcut，跨維度 = projection shortcut。

**ResNet 兩大收益：**

| 收益 | 說明 |
|---|---|
| **主要：解決退化問題** | 最差退化為恆等映射，而非比淺層更爛 |
| **次要：改善梯度流動** | 捷徑讓梯度更順暢反傳到淺層（次要效果） |

> 考試陷阱：殘差連接解決的是「**退化問題**」，而非梯度消失。梯度消失已由 **Batch Normalization + ReLU** 解決（BN 在 ResNet 之前就存在）。如果選項說「skip connection 解決梯度消失」是不精確的說法——選「解決退化問題」才是 ResNet 的核心動機。

**與普通 CNN 比較：**

| 比較項目 | 普通 CNN | ResNet |
|---|---|---|
| Block 公式 | H(x) = F(x) | H(x) = F(x) + x |
| 深度極限 | 20~30 層就開始退化 | 152+ 層仍穩定訓練 |
| 梯度流動 | 深層可能梯度消失 | 捷徑讓梯度直達淺層 |
| 最壞情況 | 可能比淺層更差 | 至少退化成恆等映射 |

### Exam Rule

```text
「網路很深卻訓不起來」「訓練誤差也在增加」→ 退化問題 (degradation)
「解決退化問題」→ ResNet skip connection（核心動機）
「梯度消失」→ 主要靠 Batch Normalization + ReLU 解決（BN 早於 ResNet）
「H(x) = F(x) + x」→ identity shortcut（維度相同時）
「H(x) = F(x) + Wₛx」→ projection shortcut（維度不同時，用 1×1 conv）
skip connection「不是」為了解決過擬合！→ 它解決退化問題
ResNet 代表：ResNet-50（現代主流 backbone）
```

### Quick Check

ResNet 的 skip connection 主要解決了什麼問題？

答案：**退化問題 (degradation)**。退化是指訓練誤差本身隨網路加深而增大（不是過擬合）。skip connection 對梯度流動也有次要幫助，但梯度消失的主要解法是 **Batch Normalization + ReLU**，不是 skip connection。考試若問「ResNet 的核心動機」，選退化問題，不選梯度消失。

---

## 4. 三大任務族：分類、偵測、分割 🔥🔥🔥

### 先懂一句話

電腦視覺任務的核心差別在「模型要回答得多細」：**分類**只回答「是什麼」，**偵測**要回答「在哪裡 + 是什麼」，**分割**要回答「每個像素屬於誰」。

### Everyday Analogy

以「外送照片」為例：
- **分類** = 「這張照片裡有食物嗎？」（一個答案）
- **偵測** = 「用方框圈出便當在哪、珍奶在哪、餐具在哪」（每個物件一個框）
- **語意分割** = 「這幾個像素是便當、那幾個像素是珍奶」（同類不分杯）
- **實例分割** = 「三杯珍奶要分成珍奶 1、珍奶 2、珍奶 3」（每個個體獨立）

### 在整體流程中的位置

```text
有圖片
  │
  ├─ 只要整張圖的標籤？ → 影像分類 (Classification)
  │
  ├─ 要知道物件位置？ → 物件偵測 (Object Detection)
  │
  └─ 要像素級精度？
        ├─ 同類不分個體 → 語意分割 (Semantic Segmentation)
        ├─ 同類要分個體 → 實例分割 (Instance Segmentation)
        └─ 兩者都要 → 全景分割 (Panoptic Segmentation)
```

### Key Concepts

**四大任務全覽：**

| 任務 | 輸入 | 輸出 | 代表架構 | 標準指標 |
|---|---|---|---|---|
| 影像分類 (Classification) | 一張圖 | 單一類別 label | **ResNet** | Top-1 / Top-5 accuracy |
| 物件偵測 (Object Detection) | 一張圖 | bbox + 類別 + 信心 list | **YOLO / Faster R-CNN** | **mAP** |
| 語意分割 (Semantic Segmentation) | 一張圖 | 每像素類別圖 | **U-Net / FCN / DeepLab** | mIoU |
| 實例分割 (Instance Segmentation) | 一張圖 | 每像素類別 + 個體 ID | **Mask R-CNN** | mAP (mask) |
| 全景分割 (Panoptic Segmentation) | 一張圖 | 每像素 (類別 + 個體 ID) | Panoptic FPN | PQ |

**草原上 1 隻狗 + 3 隻羊，四種任務的輸出：**

```text
影像分類：      「動物」（一個 label）

物件偵測：      [狗 bbox] + [羊₁ bbox] + [羊₂ bbox] + [羊₃ bbox]

語意分割：      狗的像素 → 全部標「狗色」
               羊的像素 → 全部標「羊色」（3 隻羊是同一塊色，不分開）

實例分割：      狗的像素 → 標「狗-個體1」
               羊₁像素 → 標「羊-個體1」
               羊₂像素 → 標「羊-個體2」
               羊₃像素 → 標「羊-個體3」（各自獨立 mask）
```

**語意分割 vs 實例分割 vs 全景分割（最常考）：**

| 比較項目 | 語意分割 | 實例分割 | 全景分割 |
|---|---|---|---|
| 像素標籤 | 類別 | 類別 + 個體 ID | 類別 + 個體 ID（涵蓋所有像素）|
| 3 台車怎麼標 | 一片「車」色塊 | 車₁、車₂、車₃ 三塊 mask | 車₁、車₂、車₃ + 背景各自標 |
| 天空 / 路面（stuff）| 標記 | 通常不標 | 標記 |
| 代表架構 | U-Net / DeepLab | Mask R-CNN | Panoptic FPN |

**記憶口訣：**
- 一張標 = 分類
- 有框 = 偵測
- 每個像素 = 分割
- 每個像素 + 分個體 = 實例分割

### Exam Rule

```text
「整張圖一個答案 / 貓還是狗」→ 影像分類 / ResNet
「框出物件位置 + 類別 + 信心」→ 物件偵測 / YOLO / Faster R-CNN
「醫學影像切邊 / 腫瘤輪廓 / 像素級標記」→ 語意分割 / U-Net
「3 隻羊要分開 / 每人獨立 mask / 人群計數」→ 實例分割 / Mask R-CNN
「天空+路面+每個人都要標」→ 全景分割 / Panoptic FPN
mAP 是偵測任務的指標，mIoU 是語意分割的指標（不混用）
```

### Quick Check

「醫院想讓 AI 在 CT 掃描圖中標出每個腫瘤的輪廓，且每個腫瘤要獨立標記」，應選哪種任務和架構？

答案：**實例分割 (Instance Segmentation) / Mask R-CNN**。需要「每個像素的類別 + 每個腫瘤個體的獨立 mask」，語意分割做不到「分個體」，實例分割才可以。

---

## 5. 物件偵測：YOLO vs Faster R-CNN 🔥🔥

### 先懂一句話

物件偵測有兩條路：**單階段 (single-shot)** 一次 forward pass 直接出框（快），**兩階段 (two-stage)** 先提候選框再分類（準）。YOLO 是單階段代表，Faster R-CNN 是兩階段代表。

### Everyday Analogy

- **YOLO（單階段）** = 你說「幫我找一副好評無線耳機」，語音助理一次給你答案
- **Faster R-CNN（兩階段）** = 你先在蝦皮搜出 2,000 個候選商品，再一件件點進去看評價——慢，但不漏

### 在整體流程中的位置

```text
單階段 (YOLO / SSD)：
圖 → backbone → 直接輸出 grid 的 (bbox + 類別 + 信心)

兩階段 (Faster R-CNN)：
圖 → backbone → RPN（提候選框 ~2000 個，訓練時）→ NMS 篩選 → ~300 個候選框 → 分類 + 精修 bbox
```

### Key Concepts

**速度 vs 精度對比：**

| 維度 | YOLO（單階段）| Faster R-CNN（兩階段）|
|---|---|---|
| 流程 | 一次 forward 完事 | 先提候選框，再分類 |
| 速度 | 毫秒級，30+ FPS | 數十至上百 ms |
| 精度 | 傳統略低（v8+ 已追平）| 傳統較高 |
| 小物件偵測 | 較弱 | 較強 |
| 適用情境 | 即時影像、邊際裝置、監視器 | 醫療影像、離線精密分析 |
| NMS 需求 | v5～v8 需要；v10 免 | 需要 |

**YOLO 世代演進：**

| 版本 | 關鍵特色 |
|---|---|
| v3～v7 | Anchor-based（預設 prior box，需調整）|
| v8 | Anchor-free（直接預測中心點到四邊距離），仍需 NMS |
| v10 | NMS-free（訓練時一對多、推論時一對一，不需 NMS 後處理）|

> iPAS 重點：題目通常只用「YOLO」通稱，不考你 v8 還 v10 差在哪。**「單階段、快、即時」是必背標籤。**

> 考試陷阱：Faster R-CNN 的「~2000 個 proposals」是**訓練時** RPN 的輸出數量；**推論時**經 NMS 篩選後只剩約 **300 個**候選框，才進入後續分類精修。題目若拿 2000 和 YOLO 比速度，前提要看是訓練還是推論情境。

**NMS (Non-Maximum Suppression，非最大值抑制)：**
偵測器對同一物件常產生多個重疊 bbox，NMS 用 IoU 門檻把重疊且信心較低的 bbox 刪掉，只保留信心最高的那個。YOLOv10 用 one-to-one head 省去這步。

### Exam Rule

```text
「即時偵測 / 毫秒級 / 邊際裝置 / 監視器 / 30 FPS」→ YOLO（單階段）
「最高精度 / 醫療影像 / 不計時間 / 小物件」→ Faster R-CNN（兩階段）
「先提候選框再分類」→ 兩階段偵測器（Faster R-CNN）
「anchor-free + NMS-free」→ YOLOv10
「重疊 bbox 太多，留信心最高的」→ NMS
「產線即時檢測 / 工廠瑕疵辨識」→ YOLO（台灣製造業標準答案）
```

### Quick Check

某工廠要在產線上即時偵測瑕疵品，要求每秒處理 30 幀以上，應選哪種偵測器？

答案：**YOLO（單階段偵測器）**。即時性 + 高 FPS = 單階段偵測器首選。Faster R-CNN 雖然精度高，但速度達不到即時要求。

---

## 6. 任務與架構選型 🔥🔥

### 先懂一句話

「用哪種架構」不是靠感覺，而是**先看任務需求（輸出格式 + 即時性 + 精度要求），再選方法**。這一節就是把這個判斷流程練熟。

### Everyday Analogy

選架構就像選工具：螺絲釘要螺絲刀，釘子要鐵鎚——不是哪個工具最貴就選哪個，是看工作需要什麼。需要即時性就選 YOLO，需要像素級邊界就選 U-Net，需要分個體就選 Mask R-CNN。

### 在整體流程中的位置

```text
先看輸出形式 / 場景需求
  │
  ├─ 需要即時性（毫秒級）？→ 單階段偵測（YOLO）
  ├─ 需要最高精度（不計時）？→ 兩階段偵測（Faster R-CNN）
  ├─ 需要像素級邊界？
  │    ├─ 不分個體 → 語意分割（U-Net / DeepLab）
  │    └─ 要分個體 → 實例分割（Mask R-CNN）
  └─ 只需要整張圖分類？→ 影像分類（ResNet）
```

### Key Concepts

**情境 → 任務 → 架構 → 指標 完整對應表：**

| 情境 / 場景 | 任務類型 | 代表架構 | 評估指標 |
|---|---|---|---|
| 產線即時瑕疵偵測 | 物件偵測（即時）| YOLO | mAP |
| 醫療 CT 精準偵測腫瘤 | 物件偵測（高精度）| Faster R-CNN | mAP |
| 自駕車路面像素分割 | 語意分割 | DeepLab / FCN | mIoU |
| 手術刀切割腫瘤邊界 | 語意分割 | U-Net | mIoU |
| 人群計數（分每個人）| 實例分割 | Mask R-CNN | mAP-mask |
| 整張圖「有沒有人」 | 影像分類 | ResNet | Top-1 accuracy |
| 自駕需要天空 + 人都標 | 全景分割 | Panoptic FPN | PQ |

**輸出 vs 架構快速配對：**

| 輸出形式 | 選這個 |
|---|---|
| 單一 label | ResNet（分類）|
| bbox + 類別 + 信心（即時）| YOLO |
| bbox + 類別 + 信心（高精）| Faster R-CNN |
| 逐像素類別（不分個體）| U-Net / DeepLab |
| 逐像素類別 + 個體 ID | Mask R-CNN |

### Exam Rule

```text
輸出 = 一個 label → 分類 → ResNet
輸出 = bbox list，且要即時 → YOLO
輸出 = bbox list，且要高精度 → Faster R-CNN
輸出 = 每像素類別（不分個體）→ U-Net / DeepLab
輸出 = 每像素類別 + 個體 → Mask R-CNN
醫學影像切邊 / 細胞邊界 → U-Net（語意分割）
```

### Quick Check

「自動駕駛系統需要將攝影機影像的每個像素分類為：天空、道路、行人₁、行人₂、行人₃……且行人之間必須分開標記」，應選哪種架構？

答案：**Mask R-CNN（實例分割）**，或更完整的 **Panoptic FPN（全景分割）**。需要同時處理「可數個體（行人分個體）」且像素層級，實例分割是最低要求；若還要處理天空 / 路面這類 stuff 像素，則選全景分割。

---

## 7. 評估指標：IoU 與 mAP 🔥🔥🔥

### 先懂一句話

偵測模型的好壞不能只看「有沒有找到物件」，還要看「框得多準」——這就是 IoU 和 mAP 存在的原因。IoU 量單一框的重疊度，mAP 是整個資料集上所有類別的平均精度。

### Everyday Analogy

- **IoU** = 你跟朋友合租，「共用空間」除以「兩人加起來的總空間」——共用越多，IoU 越高，定位越準。
- **mAP@0.5** = 「只要寫得跟標準答案差不多就給分」（一位老師，寬鬆）
- **mAP@0.5:0.95** = 「從寬鬆到超嚴格 10 位老師同時打分、再平均」（公平但嚴格）

### 在整體流程中的位置

```text
偵測模型輸出 bbox
  │
  ├─ 和 ground truth 重疊多少？→ IoU
  │
  ├─ IoU ≥ 0.5 → True Positive (TP)
  ├─ IoU < 0.5 → False Positive (FP)
  │
  ├─ Precision = TP / (TP + FP)
  ├─ Recall    = TP / (TP + FN)
  │
  ├─ PR 曲線下面積 = AP（某類別）
  │
  └─ 各類別 AP 平均 = mAP
```

### Key Concepts

**IoU（Intersection over Union，交集比聯集）：**

```text
IoU = 交集面積 / 聯集面積

範圍 [0, 1]
IoU ≥ 0.5 → 一般視為正確偵測 (True Positive)
IoU < 0.5 → 偵測失敗 (False Positive)
```

**IoU 計算算例：**

```text
預測 bbox = 100×100（左上角在 (0, 0)）
真實 bbox = 100×100（左上角在 (50, 50)）

交集：50×50 = 2,500
聯集：10,000 + 10,000 − 2,500 = 17,500
IoU = 2,500 / 17,500 ≈ 0.143 → False Positive（沒過 0.5 門檻）
```

**Precision / Recall / F1：**

```text
Precision = TP / (TP + FP)    ← 你說有的，有多少是真的
Recall    = TP / (TP + FN)    ← 真的有的，你抓到幾個
F1        = 2PR / (P + R)     ← 精確率與召回率的調和平均
```

**AP 與 mAP：**

| 指標 | 定義 |
|---|---|
| AP (Average Precision) | 某一個類別的 Precision-Recall 曲線下面積 |
| mAP (mean AP) | 各類別 AP 的平均，物件偵測的標準指標 |

**mAP@0.5 vs mAP@0.5:0.95（最常考）：**

| 指標 | IoU 門檻 | 嚴格度 | 資料集傳統 |
|---|---|---|---|
| mAP@0.5 | 單一門檻 = 0.5 | 寬鬆 | PASCAL VOC |
| mAP@0.5:0.95 | 0.5, 0.55, 0.60, …, 0.95，共 10 個門檻，各算一次 mAP 後取平均 | 嚴格 | **COCO**（現代論文標配）|

```text
mAP@0.5      = mAP(IoU=0.5)
mAP@0.5:0.95 = mean{ mAP(0.50), mAP(0.55), …, mAP(0.95) }
                      共 10 個門檻，每 0.05 一階
```

### Exam Rule

```text
「交集面積 / 聯集面積」→ IoU
「IoU ≥ 0.5 才算正確」→ 最常用的 TP 判斷門檻（但不代表「完美」）
「各類別 AP 的平均」→ mAP
「PASCAL VOC 指標 / 單一 IoU 門檻」→ mAP@0.5
「COCO 指標 / 10 個門檻平均 / 嚴格評測」→ mAP@0.5:0.95
「對定位精度最敏感的指標」→ mAP@0.5:0.95（COCO）
語意分割的指標 = mIoU（不是 mAP）
```

### Quick Check

「某論文報告 mAP@0.5:0.95 = 0.52」，這個指標是怎麼計算的？

答案：在 **COCO** 資料集慣例下，分別計算 IoU 門檻為 0.50, 0.55, 0.60, …, 0.95（共 **10 個門檻**）的 mAP，再取這 10 個值的平均。比 mAP@0.5 嚴格得多。

---

## 8. Exam Decision Trees

### Tree A：看到「任務需求」→ 選架構

```text
題目描述一個應用場景，問要用什麼架構？
│
├─ 輸出是「整張圖的類別」？
│     └─ → 影像分類 (Image Classification) / ResNet
│
├─ 輸出是「物件位置框 + 類別」？
│     ├─ 需要即時（毫秒級 / 高 FPS）？
│     │     └─ → YOLO（單階段偵測器）
│     └─ 需要最高精度 / 不計速度？
│           └─ → Faster R-CNN（兩階段偵測器）
│
└─ 輸出是「每個像素的標籤」？
      ├─ 同類不需要分個體？
      │     └─ → 語意分割 / U-Net / DeepLab
      ├─ 同類也要分個體？
      │     └─ → 實例分割 / Mask R-CNN
      └─ 所有像素都要標（包含天空 / 路面）+ 個體分開？
            └─ → 全景分割 / Panoptic FPN
```

### Tree B：看到「CNN 元件問題」→ 判斷是哪個元件

```text
題目在問 CNN 的某個元件的目的或效果？
│
├─ 「抽取局部特徵 / 邊緣 / 紋理」？
│     └─ → 卷積層 (Convolutional Layer)
│
├─ 「縮小特徵圖 / 平移不變性 / 降低參數量」？
│     └─ → 池化層 (Pooling Layer)
│        注意：不是「抽特徵」！那是卷積層的事
│
├─ 「引入非線性 / 讓網路學複雜模式」？
│     └─ → 激活函數 (ReLU)
│
└─ 「根據特徵做最後分類 / 輸出類別機率」？
      └─ → 全連接層 (Fully Connected Layer)
```

### Tree C：看到「深層網路問題」→ 判斷是什麼解法

```text
題目提到深層網路的訓練問題？
│
├─ 「訓練誤差也在增加（越深越差）」？
│     └─ → 退化問題 (degradation)，解法：ResNet skip connection
│
├─ 「梯度在深層越傳越弱 / 消失」？
│     └─ → 梯度消失 (vanishing gradient)，主要解法：Batch Normalization + ReLU
│           （ResNet skip connection 為次要幫助，退化問題才是 skip connection 的核心動機）
│
└─ 「訓練誤差低，但測試誤差高」？
      └─ → 過擬合 (overfitting)，解法：Dropout / 正規化
         注意：這不是 skip connection 解決的問題！
```

### Tree D：看到「mAP 指標問題」→ 判斷用哪個標準

```text
題目問評估指標或比較嚴格度？
│
├─ 「單一 IoU 門檻 / 寬鬆評測 / PASCAL VOC」？
│     └─ → mAP@0.5
│
├─ 「10 個門檻平均 / 嚴格 / COCO 標準 / 現代論文」？
│     └─ → mAP@0.5:0.95
│
├─ 「逐像素精度 / 語意分割評測」？
│     └─ → mIoU（不是 mAP）
│
└─ 「偵測框重疊度 / 預測框和真實框」？
      └─ → IoU（交集 / 聯集）
```

---

## 9. Trap Clinic

### Trap 1：池化層的目的是「抽取更多特徵」

錯。池化層的目的是「縮小特徵圖尺寸 + 保留關鍵訊號 + 降低參數量 + 提升平移不變性」。**抽特徵是卷積層的工作**，池化層只是整理、濃縮已有的特徵圖。

Exam fix：

```text
「縮小特徵圖 / 降維 / 平移不變性」→ 池化層
「抽取特徵 / 找邊緣 / 找紋理」→ 卷積層
```

---

### Trap 2：ResNet 的 skip connection 是為了解決過擬合或梯度消失

錯。skip connection 解決的核心是**退化問題 (degradation)**：訓練誤差本身就比淺層更大，這不是過擬合（「訓練誤差低、測試誤差高」），也不是梯度消失（梯度消失的主要解法是 **Batch Normalization + ReLU**，早於 ResNet 就已解決）。skip connection 對梯度流動有次要幫助，但把它列為「解決梯度消失」是不精確的，會在細分類題目上失分。

Exam fix：

```text
「過擬合」→ Dropout / 正規化（L1/L2）/ 資料擴增
「梯度消失」→ Batch Normalization + ReLU（主要解法）
「退化問題 / 訓練誤差隨深度增加 / 網路越深越難訓」→ ResNet skip connection
```

---

### Trap 3：語意分割和實例分割是同一件事

錯。語意分割只標「像素的類別」，同類不分個體；實例分割標「像素的類別 + 每個個體的獨立 mask」。照片裡 3 隻羊：語意分割輸出一塊「羊」色，實例分割輸出羊₁、羊₂、羊₃ 三塊分開的 mask。

Exam fix：

```text
「同類不分個體 / 一片色塊」→ 語意分割 / U-Net
「同類要分個體 / 3 隻羊 3 個 mask」→ 實例分割 / Mask R-CNN
```

---

### Trap 4：mAP 就是「在 IoU=0.5 下的平均精度」

錯，不一定。mAP@0.5 是單門檻，但 COCO 的 mAP@0.5:0.95 是 10 個門檻（0.5, 0.55, …, 0.95）的平均。現代論文說「mAP」通常指的是後者（更嚴格）。

Exam fix：

```text
「單一門檻 0.5 / PASCAL VOC」→ mAP@0.5
「10 個門檻平均 / COCO / 嚴格」→ mAP@0.5:0.95
```

---

### Trap 5：Faster R-CNN 一定比 YOLO 更精準

錯，傳統上是這樣，但新版 YOLO（v8、v10）已大幅追平甚至超越。如果題目說「兩階段**一定**比單階段精準」，要警覺——這是陷阱。

Exam fix：

```text
「傳統上精度較高 / 不計速度」→ Faster R-CNN
「現代 v8+ 精度已追平 / 仍需即時」→ YOLO v8/v10
「一定/必定 兩階段更準」→ 這說法是陷阱（現代 YOLO 已追平）
```

---

### Trap 6：卷積輸出尺寸公式是 O = W / S

錯，漏掉了 kernel size 和 padding。正確公式：

```text
O = ⌊(W − F + 2P) / S⌋ + 1
```

最常見錯誤：忘記減 F、忘記加 2P、忘記最後加 1、忘記 floor。

Exam fix：

```text
「卷積輸出尺寸」→ 先寫 W − F + 2P，再除 S，floor，加 1
stride 增大 → 輸出縮小（S=2 約縮半）
same padding（S=1）→ P = (F−1)/2，輸出與輸入同尺寸
```

---

### Trap 7：IoU ≥ 0.5 代表「完美偵測」

錯，IoU ≥ 0.5 只是被計為 True Positive 的**最低門檻**，不代表「完美」。COCO 嚴格評測要求到 0.95。更高的 IoU 代表定位更精準。

Exam fix：

```text
「IoU ≥ 0.5 → True Positive」→ 只是「及格線」，不是完美
「COCO 嚴格評測」→ 需要 IoU 從 0.5 到 0.95 都能得分
```

---

### Trap 8：YOLO 和 CNN 是競爭關係

錯，YOLO 建立在 CNN backbone 之上。YOLOv8 的 backbone 就是 CSPDarknet + C2f 模組（CNN 家族）。CNN 是底層元件，YOLO 是上層應用，兩者是**層級關係**，不是替代關係。

Exam fix：

```text
「YOLO vs CNN」→ 不是替代，YOLO 的底層就是 CNN backbone
「YOLO 的組成」→ CNN backbone + detection head（+ neck）
```

---

## 10. Practice Questions

### 10.1 CNN 元件與公式

**Q1.** 卷積層（Convolutional Layer）最主要的功能是什麼？

答案：A. 從影像中抽取局部特徵（邊緣、紋理、形狀）
理由：卷積層用 kernel 在影像上滑動、做局部內積，負責特徵提取；降維是池化層的工作。

---

**Q2.** 以下哪個參數決定卷積核每次在影像上移動的距離？

A. Padding　B. Kernel size　C. Stride　D. Channel

答案：C. Stride（步長）
理由：Stride 控制卷積核每次移動幾格，S=2 時輸出尺寸約縮為輸入的一半。

---

**Q3.** 輸入影像 32×32，使用 3×3 kernel，stride=1，padding=0，輸出特徵圖尺寸是？

答案：30×30
理由：O = ⌊(32 − 3 + 2×0) / 1⌋ + 1 = 29 + 1 = 30。

---

**Q4.** 輸入影像 64×64，使用 5×5 kernel，stride=2，padding=2，輸出尺寸是？

答案：32×32
理由：O = ⌊(64 − 5 + 2×2) / 2⌋ + 1 = ⌊63 / 2⌋ + 1 = 31 + 1 = 32。

---

**Q5.** 池化層（Pooling Layer）最主要的目的是？

A. 抽取更細緻的局部特徵
B. 縮小特徵圖尺寸、提升平移不變性
C. 引入非線性，讓網路學習複雜模式
D. 輸出最終的分類機率

答案：B
理由：池化層做的是「降維 + 平移不變性」，不是抽特徵（那是卷積層），不是引入非線性（那是 ReLU）。

---

**Q6.** 最大池化（Max Pooling）和平均池化（Average Pooling）最主要的差異是？

答案：最大池化取視窗內最大值，保留銳利邊緣特徵，適合中間層；平均池化取平均值，輸出較平滑，常用於 Global Average Pooling（在分類層前壓縮特徵圖）。
理由：兩者都是降維，差異在「取最大值 vs 取平均值」，用途也略不同。

---

### 10.2 ResNet 殘差連接

**Q7.** ResNet 的 skip connection（殘差連接）主要解決了什麼問題？

A. 過擬合 (overfitting)
B. 退化問題 (degradation) 與梯度消失 (vanishing gradient)
C. 池化層丟失特徵資訊
D. 卷積核尺寸不足

答案：B（但注意：更精確的答案是「退化問題」是核心動機；梯度消失的主要解法是 BN+ReLU，skip connection 的貢獻是次要）
理由：退化問題是「訓練誤差隨網路加深而增大」，和過擬合（訓練低、測試高）不同。skip connection 讓最壞情況退化為恆等映射，同時對梯度流動有次要改善效果。

---

**Q8.** ResNet 的 block 公式 H(x) = F(x) + x 中，x 代表什麼？

答案：x 是原始輸入（input），通過 identity shortcut（捷徑）直接加到輸出。F(x) 是這個 block 要學的「修正量（殘差）」，輸出 = 原輸入 + 修正量。
理由：這個設計讓「最壞情況下 F(x)→0，輸出=x（恆等映射）」，加深網路不會比淺層更差。

---

**Q9.** 以下哪個描述符合 ResNet 設計的核心動機？

A. 引入更多 pooling 層來加速訓練
B. 讓深層網路的訓練誤差不隨深度增加而惡化
C. 使用更大的 kernel 來捕捉全局特徵
D. 完全取代全連接層

答案：B
理由：ResNet 的核心動機就是「解決退化問題」——讓加深網路不再比淺層更難訓練。

---

### 10.3 任務族與架構選型

**Q10.** 「偵測交通影像中每台車的位置（bounding box）和車型」，最適合哪種任務和架構？

A. 影像分類 / ResNet
B. 物件偵測 / YOLO 或 Faster R-CNN
C. 語意分割 / U-Net
D. 實例分割 / Mask R-CNN

答案：B
理由：需要輸出「bounding box + 類別」 = 物件偵測任務。是否選 YOLO 或 Faster R-CNN 取決於是否需要即時性。

---

**Q11.** 「醫療 AI 要標出 MRI 掃描圖中每顆腫瘤的精確輪廓，且每顆腫瘤獨立標記」，應選哪種架構？

答案：Mask R-CNN（實例分割）
理由：需要「每像素類別 + 每個腫瘤個體獨立 mask」= 實例分割。語意分割可以標像素類別，但無法分開「第幾顆腫瘤」。

---

**Q12.** 「照片裡有 3 隻貓，語意分割的輸出是什麼？」

答案：3 隻貓的像素**全部標記為同一個「貓」類別**（一片色塊），不區分哪隻是第幾隻。
理由：語意分割只做像素層級的類別標記，同類個體不分開。要分個體需要實例分割。

---

**Q13.** 以下哪個架構適合「自駕車需要將攝影機畫面中的天空、路面（stuff）以及每個行人、每台車（things + 分個體）全部標記」的需求？

A. 語意分割 / DeepLab
B. 實例分割 / Mask R-CNN
C. 全景分割 / Panoptic FPN
D. 影像分類 / ResNet

答案：C
理由：全景分割 = 語意分割（處理 stuff：天空、路面）+ 實例分割（處理 things：行人、車分個體），是最完整的方案。

---

### 10.4 YOLO vs Faster R-CNN

**Q14.** 工廠產線需要每秒偵測 30 幀以上的瑕疵品，應選哪種偵測器？

答案：YOLO（單階段偵測器）
理由：即時性需求（高 FPS）= 單階段偵測器首選。YOLO 一次 forward pass 直接輸出所有 bbox，適合即時場景。

---

**Q15.** 以下對「Faster R-CNN 和 YOLO」的描述，哪項是正確的？

A. YOLO 先提候選框，再逐框分類
B. Faster R-CNN 一次 forward pass 直接輸出所有 bbox
C. YOLO 是單階段偵測器，速度較快
D. Faster R-CNN 是單階段偵測器，精度較高

答案：C
理由：YOLO = 單階段（single-shot），一次 forward pass 直接預測。Faster R-CNN = 兩階段（two-stage），先 RPN 提候選框再分類。

---

**Q16.** NMS（Non-Maximum Suppression，非最大值抑制）的作用是什麼？

答案：刪除對同一個物件的多個重疊 bounding box，只保留信心分數最高的那個框。
理由：偵測器常對同一物件輸出多個重疊 bbox，NMS 用 IoU 門檻篩選，避免重複偵測。

---

### 10.5 IoU 與 mAP

**Q17.** 「IoU ≥ 0.5 視為 True Positive」中，IoU 是如何計算的？

答案：IoU = 預測 bbox 與真實 bbox 的「交集面積」除以「聯集面積」。IoU 範圍是 [0, 1]，越高代表定位越準。
理由：這是物件偵測評估的基礎公式。

---

**Q18.** 以下哪個指標是 COCO benchmark 的現代標準，且比 PASCAL VOC 的指標更嚴格？

A. mAP@0.5
B. Top-1 accuracy
C. mAP@0.5:0.95
D. mIoU

答案：C
理由：mAP@0.5:0.95 在 IoU 從 0.5 到 0.95（共 10 個門檻）各算一次 mAP 後取平均，是 COCO 標準，比只用 IoU=0.5 的 mAP@0.5 嚴格得多。

---

**Q19.** mAP@0.5:0.95 使用幾個 IoU 門檻？

答案：10 個（0.50, 0.55, 0.60, 0.65, 0.70, 0.75, 0.80, 0.85, 0.90, 0.95，每 0.05 一階）。
理由：這是 COCO 評估協議的標準定義，記住「10 個門檻、每 0.05 一階」。

---

**Q20.** 語意分割任務最常用的評估指標是什麼？

答案：**mIoU（mean Intersection over Union）**，即各類別 IoU 的平均值。
理由：mAP 主要用於物件偵測（有 bbox），語意分割是逐像素任務，用 mIoU 衡量每個像素的標記精度更合適。

---

### 10.6 混合題型

**Q21.** 以下何者對「池化層平移不變性」的描述最準確？

A. 池化層讓模型記住特徵的絕對位置
B. 池化層讓同樣的特徵無論出現在影像何處，輸出都相似
C. 池化層引入更多非線性，讓模型更強大
D. 池化層將特徵圖的解析度放大

答案：B
理由：平移不變性（translation invariance）= 特徵平移後，池化後的輸出不會大幅改變。這是最大池化降採樣的重要特性。

---

**Q22.** 「AP（Average Precision）」是針對什麼計算的？

A. 整個資料集所有類別的平均精度
B. 某一個類別的 Precision-Recall 曲線下面積
C. 某一張圖的精確率
D. 所有 IoU 門檻下的平均

答案：B
理由：AP 是針對**單一類別**計算 PR 曲線下面積；**mAP** 才是所有類別 AP 的平均。

---

**Q23.** 以下哪一項架構的輸出格式為「逐像素類別 map，同類物件不分個體」？

答案：**語意分割（Semantic Segmentation）**，代表架構為 U-Net / FCN / DeepLab。
理由：語意分割對每個像素輸出一個類別標籤，但同類別的不同個體使用同一標籤、不做區分。

---

**Q24.** 一個 CNN 的完整前向傳播順序（從輸入到分類輸出），以下哪個順序正確？

A. FC → Conv → ReLU → Pool → Softmax
B. Conv → ReLU → Pool → ... → FC → Softmax
C. Pool → Conv → ReLU → ... → FC → Softmax
D. Conv → Pool → ReLU → ... → FC → Softmax

答案：B
理由：標準 CNN block 是「卷積 → ReLU → 池化」重複 N 次，最後接全連接層 + Softmax 輸出分類機率。

---

**Q25.** ResNet-50 中的「50」代表什麼？

答案：網路總共有 **50 層**（可訓練的卷積層 + 全連接層的總深度）。
理由：ResNet 家族以深度命名，如 ResNet-18, 34, 50, 101, 152；ResNet-50 是目前最常用的 backbone 基準。

---

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. CNN 四大元件：「**卷積抽特徵、ReLU 加非線性、池化縮維度、全連接說答案**」——池化絕對不是抽特徵，那是最常考的陷阱。

2. 卷積輸出公式：「**O = ⌊(W − F + 2P) / S⌋ + 1**，框架預設 floor 向下取整」——漏掉 F 或 2P 是最常見錯誤。

3. 任務三階梯：「**一張標 = 分類、有框 = 偵測、每個像素 = 分割**；同類要分個體就選實例分割 (Mask R-CNN)」。

4. 偵測器二選一：「**即時 / 高 FPS / 邊際裝置 → YOLO；最高精度 / 醫療 / 離線 → Faster R-CNN**」。

5. skip connection 解決的是「**退化問題**，不是過擬合也不是梯度消失」——過擬合是訓練低 / 測試高；退化是訓練誤差本身就變大；梯度消失靠 **BN + ReLU** 解決。

6. mAP 記憶：「**mAP@0.5 = 單一門檻 0.5（PASCAL VOC，寬鬆）；mAP@0.5:0.95 = 10 個門檻平均（COCO，嚴格）**」。

7. 分割三兄弟：「**語意不認人（同類一片色）、實例會點名（同類也分開）、全景全包辦（連天空都標）**」。

---

## Final Study Advice

不要只背架構名稱。考試真正測的是：**你能不能從題目描述判斷「這需要什麼輸出格式 → 對應什麼任務 → 選哪個架構」**。

每道情境題的解題步驟：
1. 先看輸出格式（一個 label？bbox？每像素？）
2. 再看場景需求（即時？高精度？分個體？）
3. 最後選架構

遇到 mAP 題目：先確認是「PASCAL VOC / 單門檻」還是「COCO / 10 門檻」；遇到 ResNet 題目：先確認是「解決退化」不是「解決過擬合」。這兩個是最高頻的混淆點。
