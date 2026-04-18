# L21104 多模態人工智慧應用 — 學習指南

> 對應評鑑範圍：**L21104 多模態人工智慧應用**（如文字、圖像、聲音等）

---

## Section 1 · 本課要你答對的事

到了 L21104，學生已經學過 L21101 Transformer、L21102 CNN/ViT、L21103 生成模型（GAN／Diffusion／LLM）。這一課不再重講任何一個單一模態的架構，而是把它們**組合起來**：當模型同時收到「文字 + 圖像 + 聲音」時，**資訊要在哪一層、用哪一種機制融合？**

> 對應評鑑範圍：**L21104 多模態人工智慧應用**（如文字、圖像、聲音等）
>
> 關鍵字：多模態（multimodal）、文字、圖像、聲音、融合策略（fusion）、對比學習（contrastive）、交叉注意力（cross-attention）、CLIP、Flamingo、Whisper、GPT-4o、Gemini。

🗣️ **白話說明**：你點 Uber Eats 時會看到「餐廳照片 + 菜名文字 + 評價星數」——你的大腦會自動把三種資訊合起來判斷要不要點。多模態 AI 就是在教機器做這件事，而這門課要你知道「合起來」可以有四種做法，而且每一種做法有不同的代表模型。

---

## Section 2 · 關鍵概念總覽圖（Knowledge Tree）

```
多模態人工智慧 Multimodal AI
│
├─ 🤖 基本概念
│   ├─ 單模態 Unimodal ─────── 只處理一種模態（純文字 BERT、純圖像 ResNet）
│   ├─ 多模態 Multimodal ───── 模型同時處理多種模態（umbrella term）
│   └─ 跨模態 Cross-modal ── 在模態之間**轉換／檢索**（T→I 生成、I↔T 檢索）
│       ⚠️ 多模態 ⊇ 跨模態；兩者常混用但不等價 🔥
│
├─ 📖 模態編碼器 Modality Encoders（把每種模態「翻譯」成向量）
│   ├─ 文字 Text ── BPE/SentencePiece → Transformer（BERT/GPT） → L21101
│   ├─ 圖像 Image
│   │   ├─ CNN（ResNet）
│   │   └─ ViT（patch embedding 16×16） → L21102
│   ├─ 聲音 Audio
│   │   ├─ log-Mel Spectrogram → CNN/Transformer（Whisper encoder）
│   │   └─ Wav2Vec2（self-supervised on raw waveform）
│   └─ 影片 Video ── 3D CNN / spacetime patches（Sora-style）
│       ⚠️ 考試重點：編碼器是「選擇題」，不考內部數學 🔥
│
├─ 📊 融合策略 Fusion Strategies（L21104 核心）🔥🔥
│   ├─ 早期融合 Early Fusion（特徵層融合）
│   │   └─ 原始特徵直接 concat → 單一聯合模型
│   ├─ 晚期融合 Late Fusion（決策層融合）
│   │   └─ 各模態獨立模型 → 輸出層投票／加權
│   │       代表：CLIP（雙編碼器 + dot product）
│   ├─ 混合融合 Hybrid Fusion（中層融合）
│   │   └─ 中間層經注意力／門控結合
│   └─ 交叉注意力融合 Cross-Attention Fusion ★ 2022+ 主流
│       └─ Q 來自一個模態，K/V 來自另一個模態
│           代表：Flamingo、Stable Diffusion、Whisper decoder
│       ⚠️ 「哪種融合最好」看情境，不是絕對排序 🔥
│
├─ 🔧 對比學習 Contrastive Learning（CLIP 的靈魂）🔥🔥
│   ├─ 雙編碼器 Dual Encoder（image + text）
│   ├─ 共享嵌入空間 Shared Embedding Space
│   ├─ 對比損失 InfoNCE（對稱版本）
│   │   └─ 配對 (image_i, text_i) 為正樣本；其他皆為負樣本
│   └─ 用途：零樣本分類 Zero-shot Classification、圖文檢索 Retrieval
│       ⚠️ CLIP 不生圖！生圖是 DALL-E / Stable Diffusion 🔥🔥
│
├─ 🔧 交叉注意力 Cross-Attention（Flamingo / SD / Whisper 的靈魂）🔥🔥
│   ├─ 自注意力 Self-Attention：Q、K、V 來自**同一**序列
│   └─ 交叉注意力 Cross-Attention：Q 來自一個模態，K/V 來自**另一個**模態
│       「我（Q）想看看你（K/V）有什麼資訊」
│
├─ 🤖 名稱架構速查（考試點名率高）
│   ├─ CLIP（2021）── 文字↔圖像對齊／檢索／零樣本分類 🔥🔥
│   ├─ DALL-E 2/3（2022–23）── 文字→圖像生成
│   ├─ Stable Diffusion（2022）── U-Net + CLIP 文字編碼器交叉注意力
│   ├─ Flamingo（2022）── Perceiver Resampler + Gated Cross-Attention + 凍結 LLM
│   ├─ Whisper（2022）── 語音→文字（encoder-decoder）
│   ├─ LLaVA（2023）── 線性投影（prefix）+ LLM，開源 VQA
│   ├─ GPT-4V（2023）── 視覺貼到文字模型上的「後接式」多模態
│   ├─ GPT-4o（2024）── 原生多模態，統一 token 空間 🔥
│   ├─ Gemini（2023–）── 預訓練階段即多模態
│   └─ Qwen-VL（2023–）── 中文 VQA / OCR 強，Taiwan 可用
│
├─ ⚖️ 損失函數
│   ├─ InfoNCE 對稱對比損失（CLIP）
│   ├─ 下一個 token 交叉熵（Flamingo、Whisper、LLaVA、GPT-4o）
│   └─ Diffusion MSE + CFG（Stable Diffusion 條件生成）← L21103 refer only
│
├─ 📊 典型任務 → 架構對應
│   ├─ 圖文檢索／零樣本分類 → CLIP
│   ├─ 看圖說故事 Image Captioning → LLaVA、Flamingo、GPT-4V
│   ├─ 視覺問答 VQA → Flamingo、LLaVA、GPT-4V、Qwen-VL
│   ├─ 文字→圖像 → Stable Diffusion、DALL-E
│   ├─ 語音→文字 ASR → Whisper、Wav2Vec2
│   ├─ 文字→語音 TTS → VALL-E、ElevenLabs、GPT-4o
│   ├─ 文字→影片 → Sora、Veo（DiT，僅 refer）
│   └─ 多模態對話 → GPT-4o、Gemini、Claude、Qwen-VL
│
└─ ⚖️ 陷阱提示（Leaf-level traps）
    ├─ 「ChatGPT 一定是多模態」❌（GPT-3.5 純文字；只有 GPT-4V/4o 是）
    ├─ 「CLIP 可以生成圖像」❌（CLIP 只做對齊／檢索）
    ├─ 「Stable Diffusion 不用 CLIP」❌（用 CLIP ViT-L/14 作文字編碼器）
    ├─ 「交叉注意力 = 兩個輸入的自注意力」❌（Q 與 K/V 來源不同才是關鍵）
    └─ 「早期融合一定比晚期融合好」❌（視情境，獨立訊號反而 late fusion 好）
```

---

## Section 3 · 核心概念（Core Concepts）

### 3.1 多模態的定義與意義

**多模態（Multimodal）人工智慧** 指的是一個模型能同時處理、理解或生成**兩種以上**的資訊模態（modality）。最常見的組合是文字（text）、圖像（image）、聲音（audio），進階版還會加上影片（video）、感測器訊號、3D 點雲等。

🗣️ **白話說明**：你在 IG 滑一個美食 Reel，同時看到**影像**（畫面）、聽到**聲音**（背景樂 + 店員講話）、讀到**文字**（貼文說明 + 留言）。你一秒內就能理解「這家在東區、排隊很久、店員很兇但好吃」。單模態 AI 只能看其中一種；多模態 AI 要學會像你一樣**把三條資訊串成一個判斷**。

**多模態 vs 跨模態（Cross-modal）** 🔥

- **多模態（Multimodal）** 是「**能力**」——模型有能力同時處理多種模態。
- **跨模態（Cross-modal）** 是「**任務方向**」——在模態之間**轉換或檢索**，例如：
  - 文字→圖像（DALL-E 生圖）
  - 圖像→文字（看圖說故事）
  - 文字↔圖像檢索（你打「夕陽海邊」找對應照片）
- **包含關係**：多模態 ⊇ 跨模態。所有跨模態任務都發生在多模態系統裡，但多模態系統不一定做跨模態（例如把文字+圖像一起輸入判斷情緒，本身不「轉換」模態）。

> 🔥 iPAS 考題常用「跨模態檢索」一詞——看到就要想到 CLIP。

---

📊 **視覺化對照**：三大模態（文字／影像／音訊）編碼器的輸入、流程、輸出對照見 [`diagrams/04-modality-encoder-comparison.md`](diagrams/04-modality-encoder-comparison.md)。

---

### 3.2 模態編碼器概覽（Modality Encoders）

多模態系統的第一步，永遠是**把每種模態各自翻譯成向量**。這一步的內部細節已在 L21101（文字）、L21102（圖像）教過，這裡只做選擇題層級的概覽：

```
┌─────────┐          ┌──────────────┐         ┌──────────────┐
│  文字   │ ──→     │ Tokenizer +   │  ──→   │  文字向量    │
│  Text   │          │ Transformer   │         │  text embed  │
└─────────┘          └──────────────┘         └──────────────┘
                         (L21101 內部)

┌─────────┐          ┌──────────────┐         ┌──────────────┐
│  圖像   │ ──→     │ CNN (ResNet)  │  ──→   │  圖像向量    │
│  Image  │          │ or ViT Patches│         │  image embed │
└─────────┘          └──────────────┘         └──────────────┘
                         (L21102 內部)

┌─────────┐          ┌──────────────┐         ┌──────────────┐
│  聲音   │ ──→     │ log-Mel →     │  ──→   │  音訊向量    │
│  Audio  │          │ Conv +        │         │  audio embed │
│         │          │ Transformer   │         │              │
└─────────┘          └──────────────┘         └──────────────┘
                  (Whisper encoder / Wav2Vec2)
```

| 模態 | 常見編碼器 | 輸出形式 | 備註 |
|---|---|---|---|
| 文字 Text | BPE/SentencePiece + Transformer | token 向量序列 | 參考 L21101，不重教 |
| 圖像 Image | CNN（ResNet）或 ViT（16×16 patch embedding） | patch 向量序列 | 參考 L21102 |
| 聲音 Audio | log-Mel 聲譜圖 + CNN/Transformer（Whisper），或 Wav2Vec2 | 音框向量序列 | 雜訊（不是「噪聲」）是重要預處理課題 |
| 影片 Video | 3D CNN（I3D）或 spacetime patches | 時空 token | Sora 採後者 |

🗣️ **白話說明**：把文字、圖像、聲音編碼成向量，就像把英文、中文、日文各自翻成**同一本字典裡的座標**。只有翻成統一格式，後面的「融合層」才能比對、結合、對齊。

> 🔥 考試不考哪一個編碼器的內部數學，但要能**辨識**「聲音 → log-Mel → Whisper encoder」「圖像 → ViT → patch token」是標準配方。

---

### 3.3 四種融合策略（Fusion Strategies） 🔥🔥

這是 L21104 的核心考點。融合策略決定**資訊在哪一層合起來**。

#### 3.3.1 早期融合 Early Fusion（特徵層融合）

```
 [文字原始特徵] ┐
               ├─→  concat →  [單一聯合模型]  →  輸出
 [圖像原始特徵] ┘
```

- **做法**：各模態的低層特徵（甚至原始輸入）直接串接（concatenate），餵進同一個模型。
- **優點**：能捕捉細粒度的跨模態共變關係（例如影片中嘴型與語音對齊）。
- **缺點**：對模態對齊、同步、特徵尺度差異極度敏感；缺一模態整個垮掉。

🗣️ **白話說明**：像情侶之間「一個人做菜，另一個人幫忙調味」——在鍋子裡就合起來了。好處是兩人動作要精準配合；壞處是只要一個人遲到，這餐就毀了。

#### 3.3.2 晚期融合 Late Fusion（決策層融合）

```
 [文字] → [文字分類器] → logits_t ┐
                                   ├─→ 加權／投票 → 最終輸出
 [圖像] → [圖像分類器] → logits_i ┘
```

- **做法**：每個模態各自有一個獨立模型，只在**輸出層**合起來（平均、投票、加權、stacking）。
- **優點**：模組化、訓練容易、缺模態也能降級運作（graceful degradation）。
- **缺點**：無法在表徵層學會跨模態互動。
- **代表**：**CLIP** 的推論階段就是晚期融合——圖像和文字各自編碼完再做內積。
- 🔍 **嚴格說明**：嚴格來說 CLIP 更常被歸類為「對比式雙編碼器對齊（contrastive dual-encoder alignment）」，但若以「何時合流」視角來看，推論階段只在最終相似度層合併，屬於 late fusion 的典型範例。

🗣️ **白話說明**：像 7-11 的「集點兌換」——文字店員記你的點數、圖像店員記你的商品，結帳時兩邊系統才對帳。各走各的路，最後才會合。

#### 3.3.3 混合融合 Hybrid Fusion（中層融合）

```
 [文字] → [文字 backbone 中層特徵] ┐
                                    ├─→ 注意力／門控結合 → 聯合模型 → 輸出
 [圖像] → [圖像 backbone 中層特徵] ┘
```

- **做法**：保留各模態獨立 backbone，但在**中間層**透過注意力或門控機制結合。
- **優點**：介於早期與晚期的平衡；2022 年後絕大多數主流多模態模型其實都是 hybrid。

#### 3.3.4 交叉注意力融合 Cross-Attention Fusion ★ 🔥🔥

這是 2022 年後的**主流機制**，單獨在 3.5 節展開。簡寫版：**一個模態出 Q（想問什麼），另一個模態出 K/V（提供答案）**。

#### 四者比較（先看，3.4–3.5 再展開）

| 策略 | 合流時機 | 代表 | 適用情境 |
|---|---|---|---|
| Early | 最低層 | 同步音訊+嘴型 | 低層強相關、同時間軸 |
| Late | 輸出層 | CLIP 推論、分類器投票 | 訊號獨立、可能缺模態 |
| Hybrid | 中間層 | 多數現代模型 | 中等耦合 |
| Cross-attention | 注意力層 | Flamingo、SD、Whisper | 深層語意對齊 |

> 🔍 **關於 CLIP 的歸類**：CLIP 嚴格來說屬於「對比式雙編碼器對齊」，上表以「合流時機」視角將其歸入 Late，是為了教學分類方便，非單一權威答案。

📊 **視覺化對照**：四種融合策略的資料流動差異見 [`diagrams/01-fusion-strategies.md`](diagrams/01-fusion-strategies.md)。

---

### 3.4 對比學習與 CLIP 架構 🔥🔥

**CLIP（Contrastive Language-Image Pre-training，OpenAI 2021）** 是 iPAS 中級最常被點名的多模態模型。

#### 架構（雙編碼器 + 共享嵌入空間）

```
         圖像  I₁, I₂, ..., I_N
 Image Encoder (ViT or ResNet)
         ↓
      image embeddings  v₁, v₂, ..., v_N  ──┐
                                             │
                                       [共享嵌入空間]
                                             │
      text embeddings   t₁, t₂, ..., t_N  ──┘
         ↑
  Text Encoder (Transformer)
         文字  T₁, T₂, ..., T_N


批次內相似度矩陣  (N×N)

           t₁   t₂   t₃   ...  t_N
      v₁ [ ● ][   ][   ][   ][   ]   ← 正樣本 (v_i, t_i) 對角線
      v₂ [   ][ ● ][   ][   ][   ]   ← 其餘皆為負樣本
      v₃ [   ][   ][ ● ][   ][   ]
      ... 
      v_N[   ][   ][   ][   ][ ● ]

 目標：對角線變大，非對角線變小（雙向都如此 → 對稱 InfoNCE）
```

#### 對比損失 InfoNCE（對稱版）

- 對於每一個正樣本配對 (image_i, text_i)：
  - 圖→文 loss：把第 i 列視為一個分類問題，正確類別是第 i 個文字。
  - 文→圖 loss：把第 i 行視為一個分類問題，正確類別是第 i 張圖。
- **對稱版 InfoNCE** = 兩邊平均，才稱「symmetric contrastive loss」。

🗣️ **白話說明**：像蝦皮商城把「商品圖」和「商品描述」湊成正確配對。CLIP 學會「**這張圖的描述**應該是**這句話**、而**不是**批次裡其他 N-1 句」。學久了，圖和文字在同一個向量空間裡，文字相近的意思會靠近對應的圖。

#### 用途（CLIP 做什麼）

- **零樣本分類（Zero-shot Classification）**：把候選類別名稱寫成「a photo of a _」的文字，丟進 CLIP，看哪一個文字向量離圖像向量最近。
- **跨模態檢索（Cross-modal Retrieval）**：以文字查圖、以圖查文。
- **當作別人的文字編碼器**：Stable Diffusion 用 CLIP 的 ViT-L/14 text encoder 取文字條件。

> 🔥🔥 考題必考：「結合影像與文字進行理解的技術是哪一個？→ CLIP」（114/05/17 實際考題）。看到「零樣本分類」「圖文檢索」「共享嵌入空間」**直接選 CLIP**。

> 🔥🔥 **CLIP 不生成圖像**。CLIP 的輸出是向量，不是像素。生圖是 DALL-E／Stable Diffusion 的工作——它們**用** CLIP 作為文字條件，但那是別人家的事。

---

📊 **視覺化對照**：CLIP 對比學習訓練迴圈（雙塔 + 相似度矩陣 + InfoNCE）見 [`diagrams/02-clip-contrastive-loop.md`](diagrams/02-clip-contrastive-loop.md)。

---

### 3.5 交叉注意力（Cross-Attention） 🔥🔥

在 L21101 裡你學過**自注意力（Self-Attention）**——Q、K、V 全部從**同一個**序列投影出來。

交叉注意力把 Q 和 K/V **拆到兩個不同來源**。

```
 Self-Attention（L21101）
 
 序列 X ──┬── W_Q → Q ┐
          ├── W_K → K │
          └── W_V → V ┘  →  Attention(Q, K, V) = softmax(QKᵀ/√d)V

 Cross-Attention（L21104 核心機制）
 
 模態 A（query 端）  ── W_Q → Q ┐
                                 │
 模態 B（被查詢端）  ── W_K → K │  → softmax(QKᵀ/√d)V
                    ── W_V → V ┘
```

**一句話記：Q 來自「想看對方的人」，K/V 來自「被看的人」。**

🔎 **進階**：Q 同時決定輸出的「形狀與主體」；K/V 只提供「條件與內容」。例如 Stable Diffusion 生圖時，Q 來自圖像雜訊（輸出是圖像），文字 CLIP 是 K/V（提供條件）。

🗣️ **白話說明**：像大學分組報告時你（Q）去問組員（K/V）「幫我看這段邏輯對不對？」——你帶著**問題**（Query），組員手邊有**筆記**（Key）和**答案**（Value）。Self-attention 是自問自答，Cross-attention 是跨組對話。

#### 三個經典交叉注意力例子

| 模型 | Q 來自 | K/V 來自 | 做什麼 |
|---|---|---|---|
| **Flamingo** | 凍結 LLM 中的文字隱狀態 | Perceiver Resampler 壓縮後的視覺 token | 產生「看過圖的」文字 |
| **Stable Diffusion** | U-Net 中正在去雜訊的圖像潛在 | CLIP 文字編碼器輸出 | 文字條件化圖像生成 |
| **Whisper decoder** | 文字解碼器當前狀態 | Whisper encoder 的音訊特徵 | 音訊條件化文字生成（ASR） |

> 🔥🔥 **考試陷阱**：題目問「Q 來自一個模態、K/V 來自另一個模態是什麼機制？」——選**交叉注意力**，不是「多頭自注意力」「雙向注意力」之類的干擾項。

📊 **視覺化對照**：Flamingo-style 視覺語言模型交叉注意力架構（Perceiver Resampler + Gated Cross-Attention）見 [`diagrams/03-cross-attention-architecture.md`](diagrams/03-cross-attention-architecture.md)。

⚠️ **模態缺失的韌性**：Late fusion 缺一個模態時仍可降級運作（其他分類器仍能投票）；cross-attention 若 K/V 來源的模態缺失，通常需要設計 padding 遮罩或 fallback 機制，否則模型會產生幻覺或崩潰。這是實務部署時的重要考量。

---

### 3.6 名稱架構導覽（Named Architectures）

這一節是考題密集區。每個架構抓住**融合策略 + 訓練目標 + 代表用途**三件事。

#### CLIP（2021, OpenAI）
- 融合：**晚期融合**（雙編碼器 + dot product）。
- 訓練：**對稱 InfoNCE 對比損失**，400M 組圖文配對。
- 用途：零樣本影像分類、圖文檢索。

#### DALL-E 2 / 3（2022–23, OpenAI）
- 融合：**交叉注意力**（CLIP 文字 → 先驗 → 擴散解碼器）。
- 訓練：Diffusion MSE + CLIP alignment。
- 用途：**文字→圖像生成**。
- 🔖 **版本差異**：DALL-E 2 採 unCLIP 架構；DALL-E 3 改為與 ChatGPT 整合、含 prompt 重寫管線。

#### Stable Diffusion（2022, Stability AI / CompVis）
- 融合：**交叉注意力**（U-Net Q，CLIP ViT-L/14 文字 K/V）在 U-Net 多個解析度注入。
- 訓練：Latent Diffusion MSE + Classifier-Free Guidance（L21103 主題，此處僅參考）。
- 用途：開源文字→圖像。
- 🔥 **注意**：Stable Diffusion **用的是 CLIP 的文字編碼器**，不要以為 CLIP 與 SD 對立。

#### Flamingo（2022, DeepMind）
- 融合：**Gated Cross-Attention**（閘門在初始化時為 0，保留預訓練 LLM 行為）+ **Perceiver Resampler**（把不定長視覺特徵壓成 64 個固定 token）。
- 訓練：下一個 token 交叉熵，視覺作為條件；**凍結 vision encoder 與 LLM**。
- 用途：少樣本 VQA、看圖說故事。
- 是交叉注意力融合「規模化落地」的教科書例子。

#### Whisper（2022, OpenAI）
- 融合：**交叉注意力**（標準 encoder-decoder Transformer）。
- 輸入：log-Mel 聲譜圖 → 2 層 conv → Transformer encoder。
- 輸出：文字 token（ASR、翻譯、語言辨識、語音活動偵測四任務合一，靠特殊 token 切換）。
- 訓練：680k 小時多語言網路音訊；seq2seq cross-entropy。
- 🔥 考題看到「語音轉文字」或「多語言 ASR」→ **Whisper**。

#### LLaVA（2023, Liu et al.）
- 融合：**線性投影 Prefix**（最簡單的 bolt-on 做法）——CLIP ViT 視覺特徵經一層線性層（原 LLaVA 為一層線性；LLaVA-1.5 起改為兩層 MLP 投影），當作 token 塞進 Vicuna/Llama 解碼器的 prompt 前面。
- 訓練：指令微調（instruction tuning）cross-entropy。
- 用途：開源 VQA 助理。
- 🔥 考題陷阱：LLaVA **不用交叉注意力**，只用線性投影 + 拼接。

#### GPT-4V（2023, OpenAI）
- 融合：視覺 token 拼到文字解碼器前（hybrid 靠近 bolt-on）。
- 架構上是「**文字模型長出視覺能力**」——**後接式多模態**。

#### GPT-4o（2024, OpenAI） 🔥
- 融合：**原生多模態（Native Multimodal）**——單一自回歸模型，在**統一 token 空間**處理文字／圖像／音訊／影片。
- 特點：sub-second 語音對話、端到端情感與語氣保留。
- **與 GPT-4V 的差別**：GPT-4V = 視覺貼在文字模型上；GPT-4o = 從預訓練就是多模態一體。

#### Gemini（2023–, Google/DeepMind）
- 「**Built multimodal from day one**」——**預訓練階段**就是多模態。
- Gemini 2.5 支援原生音訊輸出。

#### Qwen-VL / Qwen2-VL（2023–24, Alibaba）
- 架構：ViT + 交叉注意力 adapter + Qwen LLM。
- **中文（含繁中）OCR 與 VQA 強**，Taiwan 部署實務上值得認識。

#### Sora / Veo（2024–25）
- 文字→影片的 DiT（Diffusion Transformer）on spacetime patches。
- L21104 僅需 **refer**，不展開。

---

### 3.7 典型多模態任務（Task → Architecture Mapping）

| 任務 | 方向 | 代表架構 |
|---|---|---|
| 圖像描述生成 Image Captioning | image → text | ViT + GPT、LLaVA、Flamingo |
| 視覺問答 VQA | image + text → text | Flamingo、LLaVA、GPT-4V、Qwen-VL |
| 文字→圖像 Text-to-Image | text → image | Stable Diffusion、DALL-E 3 |
| 文字→語音 TTS | text → audio | VALL-E、ElevenLabs、GPT-4o |
| 語音→文字 ASR | audio → text | **Whisper**、Wav2Vec2 |
| 跨模態檢索 Cross-modal Retrieval | text ↔ image | **CLIP**（共享嵌入 + dot product） |
| 零樣本影像分類 Zero-shot | image (+ class text) | **CLIP** |
| 文字→影片 T2V | text → video | Sora、Veo（僅參考） |

🗣️ **白話說明**：這張表就是考場「看到關鍵字 → 選架構」的對照本。考 VQA 選 Flamingo / LLaVA / GPT-4V；考 ASR 選 Whisper；考零樣本分類選 CLIP。不要亂猜。

---

### 3.8 原生多模態 vs 後接式多模態 🔥

2024–26 年的新考題角度。

| 維度 | 原生多模態 Native | 後接式 Bolt-on |
|---|---|---|
| 代表 | GPT-4o、Gemini | GPT-4V、LLaVA |
| 訓練時機 | 預訓練階段就含多模態資料 | 先訓練單模態基礎模型，之後「貼」上別的模態 |
| Token 空間 | 統一的 token 空間 | 各模態 token 經投影／交叉注意力進入 LLM |
| 延遲 | 可做 sub-second 端到端 | 通常較慢，受限於視覺編碼器 |
| 模態保真 | 情感、語氣等可端到端保留 | 視覺/音訊資訊轉成文字摘要後常流失細節 |

🗣️ **白話說明**：後接式（GPT-4V）像是「戴著即時翻譯耳機的單語人」——聽得懂，但會漏掉語氣和情緒；原生多模態（GPT-4o）像是「母語雙語者」——大腦（Token 空間）直接同時處理兩種語言，反應快且精準。

---

### 3.9 評估指標（高層概念，不推導）

| 任務 | 常用指標 | 一句話 |
|---|---|---|
| Image Captioning | BLEU、CIDEr、METEOR | 與人工撰寫的 reference caption 比對 n-gram／共識 |
| 跨模態檢索 | Recall@K（R@1、R@5、R@10） | Top-K 內是否命中正確配對 |
| VQA | VQA Accuracy（多個人工答案投票） | 答案與多數人工答案吻合率 |
| ASR | WER（Word Error Rate） | 錯誤字率愈低愈好 |
| T2I | FID、CLIPScore、Human Eval | 分布距離 / CLIP 對齊 / 人評 |

> 🔥 考試多半只考「哪個任務用哪個指標」的一對一配對，不考公式推導。

---

## Section 4 · 易混淆概念對照表（Comparison Tables）

### 4.1 多模態 vs 跨模態 vs 單模態

| 維度 | 單模態 Unimodal | 多模態 Multimodal | 跨模態 Cross-modal |
|---|---|---|---|
| 定義 | 只一種模態 | 同時處理 ≥2 種 | 在模態間轉換／檢索 |
| 包含關係 | — | 包含跨模態 | 多模態的子任務 |
| 典型例 | BERT、ResNet、Whisper encoder | GPT-4o、Gemini、Flamingo | CLIP 檢索、DALL-E 生圖 |
| 考試用語 | 「只使用一種模態」通常是錯誤選項 | 「整合 X 與 Y」 | 「文字↔圖像檢索」「文字→圖像生成」 |

### 4.2 Early vs Late vs Hybrid vs Cross-Attention Fusion

| 維度 | Early Fusion | Late Fusion | Hybrid Fusion | Cross-Attention Fusion |
|---|---|---|---|---|
| 合流位置／時機 | 原始特徵層 | 輸出／決策層 | 多階段（中間層經門控／注意力） | 注意力層（中間） |
| 模態間互動 | 強（但易被對齊破壞） | 無（表徵層獨立，推論階段 CLIP 為此類典型*） | 中高（多階段選擇性互動） | 強且選擇性 |
| 缺模態容忍 | 差 | 好 | 中高（視架構而定） | 中 |
| 代表 | 早期影音同步分類 | CLIP 推論、分類器投票 | CLIP→SD 管線、檢索增強生成（RAG） | Flamingo、Stable Diffusion、Whisper |
| 適用情境 | 低層強相關、同時間軸 | 訊號獨立、模態可能缺 | 需兼顧速度與表達力的系統 | 深層語意需對齊 |
| 優點 | 捕捉細粒度共變 | 模組化、缺模態仍能運作 | 兼顧速度與表達力 | 深層對齊、條件化精準 |
| 缺點 | 對齊與尺度敏感 | 無法學到表徵層互動 | 架構複雜、調校成本高 | 計算量較高 |

> *CLIP 嚴格屬「對比式雙編碼器對齊」；此處以「何時合流」視角將其列為 Late Fusion 代表，便於教學分類。

### 4.3 Self-Attention vs Cross-Attention 🔥🔥

| 維度 | Self-Attention | Cross-Attention |
|---|---|---|
| Q 來自 | 同一序列 | 模態 A |
| K/V 來自 | **同一序列**（與 Q 相同） | **模態 B**（與 Q 不同） |
| 典型位置 | Transformer encoder 內、decoder self-attn | Transformer decoder 的交叉層、Flamingo 閘控層、SD U-Net |
| 功能 | 序列內部關係建模 | 跨模態／跨序列條件對齊 |
| 記憶法 | 「自問自答」 | 「Q 問對方，K/V 在對方手上」 |

### 4.4 CLIP vs Stable Diffusion（兩個都用 CLIP 文字編碼器，方向相反）

| 維度 | CLIP | Stable Diffusion |
|---|---|---|
| 方向 | 文字↔圖像**對齊／檢索** | 文字→圖像**生成** |
| 融合策略 | 晚期融合（雙編碼器） | 交叉注意力（U-Net Q、CLIP text K/V） |
| 是否生成像素 | 否（只輸出向量） | **是**（去雜訊出像素） |
| 損失 | 對稱 InfoNCE | Latent Diffusion MSE + CFG |
| 是否內含 CLIP | **就是** CLIP | **使用** CLIP 的 ViT-L/14 文字編碼器 |
| 考題陷阱 | 「CLIP 能生成圖片」❌ | 「SD 不用 CLIP」❌ |

### 4.5 GPT-4V（後接式）vs GPT-4o（原生）

| 維度 | GPT-4V（2023） | GPT-4o（2024） |
|---|---|---|
| 架構本質 | 視覺貼在文字模型上 | 單一模型、統一 token 空間 |
| 模態 | 文字 + 圖像 | 文字 + 圖像 + 音訊 + 影片 |
| 端到端語音 | ❌（需 Whisper + TTS 串接） | ✅（sub-second） |
| 情緒／語氣保真 | 低（轉文字中途損失） | 高 |
| 考題用語 | 「後接式」「vision-on-top-of-text」 | 「原生」「natively multimodal」 |

### 4.6 對比學習 vs 監督學習（多模態情境）

| 維度 | 對比學習 Contrastive | 監督學習 Supervised |
|---|---|---|
| 標註需求 | 成對資料（image, caption） | 明確類別標籤 |
| 訓練訊號 | 「這對匹配 / 不匹配」 | 「這是第 X 類」 |
| 資料規模 | 易擴充到億級（網路爬來的圖文對） | 通常更小（需人工標） |
| 輸出 | 共享嵌入空間 | 類別機率 |
| 代表 | CLIP、ALIGN | ResNet 分類、BERT 微調 |

---

## Section 5 · 口訣（Mnemonics）

### 5.1 四種融合策略：「**早晚混交**」
- **早**期融合：特徵一起進鍋
- **晚**期融合：各做各的，最後投票
- **混**合融合：中段交手
- **交**叉注意力：Q 問對方，K/V 在對方手上

### 5.2 CLIP 訓練目標：「**雙編 + 對稱 + 對比**」
- **雙編** 碼器（圖像編碼器 + 文字編碼器）
- **對稱** InfoNCE（圖→文 loss + 文→圖 loss 取平均）
- **對比** 學習（配對拉近、非配對推遠）

配合一句：「**圖文配對上對角線，其餘拉去最遠線**。」

### 5.3 交叉注意力：「**Q 找 K/V，KV 不同家**」
- Q 是你**想知道什麼**
- K/V 來自**另一個模態**
- 一句背：「**Query 自己，Key Value 對面來**」

Self vs Cross 的速記：「**Self 同源，Cross 異源**」。

### 5.4 模態編碼器：「**文靠 Trans，圖用 ViT，聲看 Whisper**」
- **文**字：Transformer（BERT/GPT）
- **圖**像：ViT / CNN（patch embedding）
- **聲**音：log-Mel → Whisper encoder（或 Wav2Vec2）

### 5.5 名稱架構四組分類：「**檢 / 生 / 理 / 原**」

依「這個模型在做什麼」分成 4 個語意群組，比死背字母順序好用：

| 群組 | 定位 | 代表模型 | 動作口訣 |
|---|---|---|---|
| 🔍 **檢**索對齊 | 雙編碼器對齊、共享嵌入空間 | **CLIP** | 圖文**對齊**、零樣本**檢**索 |
| 🎨 **生**成類 | 文字轉圖像（條件生成） | **DALL-E**、**Stable Diffusion** | 文字**生**圖 |
| 💬 **理**解類 | 圖像問答、後接式多模態 | **LLaVA**、**GPT-4V** | 看圖**理**解、VQA |
| 🌐 **原**生多模態 | Token 空間統一、預訓練即多模態 | **GPT-4o**、**Gemini** | **原**生端到端 |

一句話背：「**檢對齊（CLIP）、生圖像（DALL-E/SD）、理圖文（LLaVA/GPT-4V）、原生一體（GPT-4o/Gemini）**」。

補充：**Whisper** 是 ASR 專用（語音→文字），獨立於這四組外單獨記。

---

## Section 6 · 考試陷阱（Exam Traps）

### 陷阱 1：ChatGPT 一定是多模態
- ❌ 「因為 ChatGPT 很強，所以 ChatGPT 是多模態。」
- ✅ **GPT-3.5 是純文字**；只有 GPT-4V（2023，視覺）、GPT-4o（2024，文字+圖+音+影）是多模態。考題要看**哪個版本**。

### 陷阱 2：CLIP 可以生成圖像
- ❌ 「CLIP 是 OpenAI 的圖像模型，所以可以生圖。」
- ✅ **CLIP 只做對齊與檢索**，輸出是向量不是像素。生圖是 DALL-E／Stable Diffusion 的工作；SD 只是**用** CLIP 當文字編碼器。🔥🔥

### 陷阱 3：多模態 = 跨模態
- ❌ 「多模態和跨模態是同義詞。」
- ✅ **多模態** 是**能力**（同時處理多種），**跨模態** 是**任務方向**（在模態間轉換／檢索）。多模態 ⊇ 跨模態。

### 陷阱 4：交叉注意力 = 兩個輸入的自注意力
- ❌ 「有兩個輸入的就是交叉注意力。」
- ✅ 關鍵在 **Q 與 K/V 的來源**。Self = 同源；Cross = Q 一邊、K/V 另一邊。不看來源只看輸入數量是錯誤判斷。🔥🔥

### 陷阱 5：早期融合一定比晚期融合好
- ❌ 「早期融合能捕捉更多細節，所以一定比較好。」
- ✅ **看情境**。訊號獨立、可能缺模態 → late fusion 更穩；低層強相關、同時間軸 → early fusion 較好；深層語意對齊 → cross-attention。沒有一律最佳解。🔥

### 陷阱 6：Stable Diffusion 不用 CLIP
- ❌ 「SD 是圖像模型，和 CLIP 無關。」
- ✅ **Stable Diffusion 的文字編碼器就是 CLIP ViT-L/14**，透過**交叉注意力**注入 U-Net。CLIP 與 SD 是合作關係，不是對立。🔥🔥

### 陷阱 7：所有多模態模型都是 Transformer-based
- ❌ 「多模態 = Transformer。」
- ✅ 現在的主流（CLIP、Flamingo、Whisper、GPT-4o）確實以 Transformer 為主，但**早期多模態**常用 CNN + RNN、CNN + LSTM 等組合。Transformer 是**目前主導**，不是**唯一定義**。

### 陷阱 8：多模態就是把模態拼起來
- ❌ 「只要同時輸入圖像和文字就是多模態。」
- ✅ 真正的挑戰在**融合策略**——early / late / hybrid / cross-attention 各有不同表現與適用情境。題目問「最能強化系統」時，單一模態或簡單拼接通常是錯誤選項，**跨模態整合的 Transformer 架構**才是正解。

### 陷阱 9：Whisper 是多模態聊天機器人
- ❌ 「Whisper 能聽又能寫，是對話助理。」
- ✅ **Whisper 是 ASR（語音轉文字）模型**，做轉錄、翻譯、語言辨識、VAD 四件事。**不是**對話模型，不能回答問題。對話型多模態要選 GPT-4o / Gemini。

### 陷阱 10：LLaVA 用交叉注意力
- ❌ 「LLaVA 是多模態模型，所以用交叉注意力。」
- ✅ **LLaVA 用的是線性投影 + 拼接**（prefix pattern）——視覺 token 經一層線性層，當 prompt 前綴塞進 LLM。簡單但有效，刻意不用交叉注意力。🔥

---

## Section 7 · 情境題快速判斷（Scenario Quick-Judge）

📊 **視覺化決策樹**：從「輸入/輸出模態 → 訓練資源 → 部署限制」三層挑架構的速查圖見 [`diagrams/05-use-case-decision-tree.md`](diagrams/05-use-case-decision-tree.md)。

🔑 **看到關鍵字 → 選這個答案**

- 看到「結合影像與文字」「圖文檢索」「零樣本影像分類」「共享嵌入空間」→ **CLIP** 🔥🔥
- 看到「文字生成圖像」「text-to-image」→ **DALL-E** 或 **Stable Diffusion**
- 看到「SD 文字條件如何注入 U-Net」→ **交叉注意力（Cross-Attention）**，文字編碼器是 **CLIP**
- 看到「視覺問答」「VQA」「回答圖片中的問題」→ **Flamingo / LLaVA / GPT-4V / Qwen-VL**
- 看到「語音辨識」「語音轉文字」「ASR」「log-Mel 聲譜圖 encoder-decoder」→ **Whisper** 🔥
- 看到「Q 來自一個模態，K/V 來自另一個模態」→ **交叉注意力 Cross-Attention** 🔥🔥
- 看到「Q、K、V 都來自同一序列」→ **自注意力 Self-Attention**
- 看到「原生多模態」「natively multimodal」「統一 token 空間」「端到端語音」→ **GPT-4o** 或 **Gemini**
- 看到「後接式多模態」「視覺貼在文字模型上」→ **GPT-4V** 或 **LLaVA**
- 看到「凍結 LLM + 閘控交叉注意力 + Perceiver Resampler」→ **Flamingo**
- 看到「成對圖文資料 + InfoNCE loss + 對稱」→ **CLIP contrastive pretraining** 🔥🔥
- 看到「雙編碼器輸出做 dot product」→ **CLIP 晚期融合**
- 看到「分類器加權、投票、stacking」→ **晚期融合 Late Fusion**
- 看到「低層特徵直接 concat 送同一模型」→ **早期融合 Early Fusion**
- 看到「只使用單一模態」「只使用 CNN」當作跨模態整合答案 → **多半不是最佳答案**（除非題幹明示單模態場景）（iPAS 114 醫療多模態情境題模式）
- 看到「整合醫學影像與臨床文字最能強化系統」→ **Transformer 架構整合多模態**
- 看到「繁體中文 OCR / 中文 VQA」→ **Qwen-VL / Qwen2-VL**
- 看到「文字轉影片」「spacetime patches」→ **Sora / Veo**（DiT，僅參考，非 L21104 主體）
- 看到「跨模態檢索」「cross-modal retrieval」→ **CLIP 共享嵌入空間 + dot product**

---

### 結尾小提醒

把這張學習指南讀第三次時，你會發現 L21104 真正要你會的只有三件事：

1. **四種融合策略**（early / late / hybrid / cross-attention）對應情境。
2. **CLIP 的訓練配方**（雙編碼器 + 對稱 InfoNCE + 共享嵌入空間）與其**非生成**的本質。
3. **交叉注意力** 的 Q/K/V 來源差異，以及**哪些模型**（Flamingo、SD、Whisper）用它。

其他的名稱架構只是把這三件事排列組合。考試時先抓關鍵字 → 對應 Section 7 表 → 回去 Section 4 驗證 → 選答案。穩。
