# L21103 生成式AI技術與應用 學習指引

> 對應評鑑範圍：**L21103 生成式AI技術與應用**
>
> 中級深度：架構層級比較（GAN / Diffusion / LLM-Transformer）、注意力機制（描述層）、訓練三段式（Pretrain → SFT → RLHF）、評估指標對應。
>
> 先備知識：初級 L11401（判別式 vs 生成式基本概念）、初級 L12201/L12202（ChatGPT/Midjourney 等工具生態）— 本課不再重複。

---

## Section 1：Exam Item Mapping

本課對應的考綱重點如下：

| 考綱代碼 | 主題 | 關鍵詞 | 深度 |
|---|---|---|---|
| L21103 | 生成式AI技術與應用 | 生成式AI、GAN、Diffusion、LLM、Transformer | 深（架構比較 + 訓練典範 + 評估指標） |

**本課會教的：**
- GAN / Diffusion / LLM 三大生成式架構的**結構、目標、損失函數、失敗模式**
- Transformer 自注意力公式 `Attention(Q,K,V) = softmax(QK^T / √d_k) V` 的**描述層意義**
- BERT（encoder-only）/ GPT（decoder-only）/ T5（encoder-decoder）三種 Transformer 變體
- 現代 LLM 三段式訓練管線：Pretrain → SFT → RLHF 的**階段目標差異**
- 生成模型的**評估指標**（PPL、FID、CLIP score、人類 ELO）與其適用模態

**本課不會教的（已超出中級範圍）：**
- ChatGPT / Midjourney 操作技巧、prompt 寫法 → 這是初級 L12201/L12202
- Variational Lower Bound 完整推導、Wasserstein distance 證明 → 屬研究所課程
- RoPE、DPO、GRPO、RLVR、Mixture-of-Experts 內部細節 → 延伸閱讀
- RAG、LoRA、prompt injection 深入探討 → L21202 導入 / L21203 風險
- 多模態融合（vision-language）→ L21104

---

## Section 2：關鍵概念總覽圖（Knowledge Tree）

```
生成式 AI 技術與應用 (L21103)
│
├── 🎨 GAN（生成對抗網路）
│   ├── 兩個網路：Generator 造假 / Discriminator 抓假
│   ├── 損失：Adversarial min-max（⚠️ 整體是對抗式，但 D 內部用 BCE）
│   ├── 失敗模式：mode collapse、training instability
│   └── 代表：DCGAN、StyleGAN、CycleGAN
│
├── 🌫️ Diffusion（擴散模型）
│   ├── Forward：固定加雜訊 schedule（⚠️ 不是學出來的！）
│   ├── Reverse：學會去噪的 U-Net
│   ├── 損失：MSE on predicted noise ε
│   └── 代表：DDPM、Stable Diffusion（latent diffusion）、CFG
│
├── 📝 LLM / Transformer（大型語言模型）
│   ├── 底層：Transformer block
│   │   ├── Self-attention：softmax(QK^T/√d_k)V
│   │   ├── Multi-head：h 個頭並行
│   │   ├── FFN + 殘差 + LayerNorm
│   │   └── Positional encoding（注意力本身無順序）
│   └── 三大變體
│       ├── Encoder-only：BERT（🔥🔥 雙向、MLM、分類）
│       ├── Decoder-only：GPT / Claude / Llama（🔥🔥 單向、next-token、生成）
│       └── Encoder-decoder：T5 / BART（翻譯、摘要）
│
├── 🔄 訓練典範（現代 LLM pipeline）
│   ├── Stage 1 Pretrain：海量語料 + 下一 token 預測（學通識）
│   ├── Stage 2 SFT：指令微調（學禮儀、格式）
│   └── Stage 3 RLHF：獎勵模型 + PPO（學偏好、對齊）
│
└── 📊 評估指標
    ├── PPL（Perplexity）→ LLM 語言模型困惑度
    ├── FID（Fréchet Inception Distance）→ 圖像生成品質+多樣性
    ├── CLIP Score → 文字-圖片對齊度
    └── Human / ELO → Chatbot Arena 人類偏好排名
```

---

## Section 3：Core Concepts

### 3.1 🎨 GAN — 生成對抗網路

**全名：** 生成對抗網路（Generative Adversarial Network, GAN），Goodfellow 等人於 2014 年提出。

#### 🗣️ 白話說明

想像你是夜市賣蝦皮寄來的「高仿聯名 T」的攤商（Generator，G），對面有一個專門抓高仿的鑑定師（Discriminator，D）：

- **G 的工作**：把一堆隨機布料（輸入雜訊 z）想辦法做成看起來像正品的 T 恤。
- **D 的工作**：看一件 T 恤，判斷它是正品還是 G 做的高仿。
- **訓練過程**：兩個人輪流進步。G 做出越來越像正品的假貨、D 越來越會抓假。
- **Nash 均衡**：當 G 做到 D 完全分不出真假（D 只能猜 50/50），就達到理論最佳。

這就是「對抗式學習」：用一個「打假專家」當老師，逼 G 進步。

#### ASCII 圖：GAN 對抗訓練迴圈

```
            隨機雜訊 z ~ N(0, I)
                   │
                   ▼
         ┌──────────────────┐
         │  Generator  G    │  造假者：雜訊 → 假樣本
         └────────┬─────────┘
                  │
                  ▼
             x_fake = G(z)
                  │
                  │           真實資料 x_real ~ p_data
                  │                 │
                  └────────┬────────┘
                           ▼
              ┌──────────────────────┐
              │  Discriminator  D    │  鑑定師：樣本 → 真假機率
              └──────────┬───────────┘
                         ▼
                  D(x) ∈ [0, 1]
                         │
           ┌─────────────┴─────────────┐
           ▼                           ▼
   D 損失：最大化抓真打假        G 損失：最小化被抓（騙過 D）
```

#### Min-max 目標（描述層）🔥

```
min_G  max_D   E_{x~p_data}[ log D(x) ]  +  E_{z~p_z}[ log(1 − D(G(z))) ]
```

- D 想**最大化**這個式子（正確把真的判對、假的判假）
- G 想**最小化**它（讓 D 把 G(z) 誤判為真，即 D(G(z)) → 1）
- GAN **整體**是一個 min-max 對抗賽局，因此被稱為**對抗式損失（Adversarial Loss）**。
- ⚠️ 內部細節：**判別器（D）本質上就是用 Binary Cross-Entropy（BCE）做真假二元分類**（把「真樣本→1、假樣本→0」當成 logistic regression 來訓練）；生成器（G）的目標則是欺騙 D。所以「GAN 和 cross-entropy 完全無關」是錯的——D 的訓練就是 BCE。正確理解是：**GAN 的整體架構是對抗式 min-max，而不是一條簡單的 MSE 回歸；D 的內部損失仍是 BCE**。

#### 🔥 高頻考點

- **Generator 輸入是雜訊 z、輸出是樣本；Discriminator 輸入是樣本、輸出是真假機率**（輸入輸出方向很常被反問）
- **Mode collapse（模式崩潰）**：G 找到幾種能騙過 D 的「套路」就擺爛，不再產生多樣性。這是 GAN 的經典失敗模式。
- GAN 的對抗訓練容易**不穩定**（training instability）、**梯度消失**（D 太強時 G 收不到梯度）。

#### 代表變體（名字層，不深入）

| 變體 | 特點 | 應用 |
|---|---|---|
| DCGAN | 卷積版 GAN | 低解析度圖像 |
| StyleGAN | 風格可控、高解析度 | 人臉生成（ThisPersonDoesNotExist） |
| CycleGAN | 不需成對資料的影像轉換 | 照片 ↔ 油畫風格 |
| WGAN | 使用 Wasserstein 距離 | 訓練較穩定 |

（更深的收斂性證明、訓練穩定性分析為中級以上內容，本課略過）

---

### 3.2 🌫️ Diffusion — 擴散模型

**全名：** 擴散模型（Diffusion Model），代表作 DDPM（Denoising Diffusion Probabilistic Models, Ho et al. 2020）。

#### 🗣️ 白話說明

想像你有一張在 IG 上看到的日系咖啡廳照片，然後你拿一支奇異筆慢慢在上面塗鴉，塗了 1000 次之後，整張照片變成純粹的雜訊（像電視無訊號的雪花畫面）。

- **正向過程（Forward）** = 一步一步加雜訊，這個「塗鴉的量」是事先規定好的（noise schedule），**完全不需要學習**。
- **反向過程（Reverse）** = 從一張純雪花畫面開始，一步一步「去塗鴉」，最終還原成一張清晰的咖啡廳照片。**這個去噪網路才是要學的**。

這就是 Stable Diffusion 能做到高品質圖像生成的核心原理。

#### ASCII 圖：Diffusion 正反向流程

```
  x_0（原圖）→→→→→→→→→→→ Forward（固定加雜訊，不學習）→→→→→→→→→→→→ x_T（純雜訊 N(0,I)）
  (清晰咖啡廳照)                                                  (完全雪花)
      ●●●●●  →(β₁ 排程加雜訊)→  ●●●▲●  →(β₂ 排程加雜訊)→  ●▲●▲●  ... →(β_T 排程加雜訊)→  ▲▲▲▲▲
                                 ▲                                        ▲
                             加一點雜訊                               再加一點
  （註：β_t 是「雜訊排程」，控制每一步要加多少雜訊的變異數，並不是「直接把 β_t 加到 x 上」。）
  
  ─────────────────────── 反轉 ───────────────────────
  
  x_T（純雜訊）←←←←←←←←←← Reverse（學會去噪，要訓練！）←←←←←←←←←←← x_0（生成圖）
      ▲▲▲▲▲      →ε_θ→  ●▲●▲●  →ε_θ→  ●●●▲●  ... →ε_θ→  ●●●●●
                          ▲                                ●
                    U-Net 去一點雜訊                 最後還原出清晰圖
```

#### 目標函數（描述層）🔥🔥

DDPM 的損失函數簡化後就是：

```
L_simple = E[ || ε − ε_θ(x_t, t) ||² ]
```

- ε 是正向過程**實際加上去**的真實雜訊
- ε_θ 是神經網路（U-Net）**預測**的雜訊
- 損失 = 兩者的均方誤差（MSE）

**關鍵：Diffusion 的 loss 是 denoising MSE（對「預測的雜訊」做回歸），不是 adversarial、也不是 classification 式的 cross-entropy。**

#### 🔥🔥 最容易考的點

- **正向過程是「固定」的、不學；反向過程才是「學」的**（這個方向感每年都被反問）
- Diffusion 為什麼能打敗 GAN 成為高解析度 T2I 主流？因為**訓練穩定**（不是 min-max）、**不會 mode collapse**、**模式覆蓋度好**。
- Diffusion 缺點：**推論慢**（要跑 T 步，T ≈ 1000）。解決方案：DDIM、consistency models、模型蒸餾到 1–4 步。

#### Stable Diffusion = Latent Diffusion

| 差異 | 原版 DDPM | Stable Diffusion |
|---|---|---|
| 擴散空間 | 像素空間（512×512×3） | 潛空間（64×64×4，~50× 更小） |
| 需要什麼 | U-Net | VAE encoder/decoder + U-Net |
| 文字條件 | 無 | 透過 **CLIP text encoder + cross-attention** 注入 |
| 推論速度 | 慢 | 快很多（因為計算在低維潛空間） |

#### Classifier-Free Guidance（CFG）

訓練時隨機 10% 拿掉文字條件，推論時：

```
ε_final = ε_uncond + w · (ε_cond − ε_uncond)
```

w 就是大家在 Stable Diffusion WebUI 看到的「CFG Scale」，預設 7.5。w 越大 → 越貼合 prompt，但多樣性下降。

---

### 3.3 📝 LLM / Transformer — 大型語言模型

**全名：** 大型語言模型（Large Language Model, LLM），現代幾乎都以 Transformer（Vaswani et al. 2017, "Attention Is All You Need"）為底層架構。

#### 🗣️ 白話說明

想像你在 LINE 群組裡幫朋友接話尾：「今天晚餐要吃 ___」。你會根據前面的對話（誰在抱怨 104 面試、誰剛搬完 Taipei 租屋、今天是不是週五）來預測下一個最合適的詞可能是「滷味」、「壽司」或「Uber Eats」。

LLM 做的就是這件事，只是尺度巨大：

- **Pretrain（預訓練）**：讀完網路上所有中文 + 英文 + 程式碼，學會「下一個 token 是什麼」這個遊戲。等於把全世界的 PTT、維基、GitHub 背進腦中。
- **SFT（指令微調）**：教它「被問問題要回答，不要一直接下一句文章」。等於教它「說話禮儀」。
- **RLHF（人類偏好對齊）**：教它「要有用、要誠實、不要講幹話」。等於教它「做人」。

業界普遍採用此類三段式流程（GPT、Claude、Llama 為代表；Gemini 公開資訊較少，但推測使用類似的 Pretrain → SFT → 偏好對齊管線）。

#### 自注意力（Self-Attention）核心公式 🔥🔥

```
Attention(Q, K, V) = softmax( Q · K^T / √d_k ) · V
```

**每個符號代表什麼？**

| 符號 | 中文 | 意義 |
|---|---|---|
| Q（Query） | 查詢 | 「我想找什麼？」從當前 token 投影出來 |
| K（Key） | 鍵 | 「我是什麼？」從每個 token 投影出來供 Q 比對 |
| V（Value） | 值 | 「我帶什麼資訊？」從每個 token 投影出來供加權平均 |
| d_k | key 維度 | 用 √d_k 做 scaling，**避免 softmax 飽和**（維度大時內積變得很極端） |
| softmax | 歸一化 | 把內積分數轉成權重（加總為 1） |

**白話翻譯**：每個位置用自己的 Q 去和所有位置的 K 算相似度，得到權重，再用這些權重加權平均所有位置的 V。這就是「注意力」——有選擇地看上下文。

#### ASCII 圖：自注意力運算流程

```
 輸入序列: [我, 今天, 晚餐, 吃, ___]
              │
              ▼   每個 token 投影成三個向量
        ┌─────┴─────┐
        ▼     ▼     ▼
        Q     K     V   （shape: seq_len × d_k）
        │     │     │
        │  Q · K^T  │   → 相似度矩陣（seq_len × seq_len）
        │     │     │
        │  ÷ √d_k   │   → 避免 softmax 飽和
        │     │     │
        │  softmax  │   → 注意力權重（每列加總為 1）
        │     │     │
        └─ × V ─────┘
              │
              ▼
         輸出：上下文加權後的表徵
```

#### 多頭注意力（Multi-Head Attention）

不要只用一組 Q/K/V，而是用 **h 組**並行計算（head 1 可能學「主詞關係」、head 2 學「時間線索」、head 3 學「情緒關聯」……），最後 concat 起來再投影一次。

```
MultiHead = Concat(head_1, ..., head_h) · W_O
```

#### Transformer Block 三件套 🔥

```
┌─────────────────────────────────┐
│  Input                          │
│    │                            │
│    ├──┐                         │
│    │  └→ Multi-Head Attention   │ ← 注意力
│    │         │                  │
│    └──+──────┘                  │ ← 殘差連接
│       │                         │
│    LayerNorm                    │
│       │                         │
│       ├──┐                      │
│       │  └→ Feed-Forward (FFN)  │ ← 非線性轉換
│       │         │               │
│       └──+──────┘               │ ← 殘差連接
│          │                      │
│       LayerNorm                 │
│          │                      │
│        Output                   │
└─────────────────────────────────┘
```

**記住「注意力 + FFN + 殘差 + LayerNorm」這四件套。**

**為什麼要殘差 + LayerNorm？** 殘差連接（Residual Connection）讓梯度能直接流回前層，**防止深層網路梯度消失**；LayerNorm 則在每層輸出之間**穩定數值分佈**，避免激活值飄走。兩者是 Transformer 能穩定疊到上百層的關鍵設計。

#### Positional Encoding（位置編碼）

注意力的一個「feature」：**對位置完全無感**（打亂順序結果相同）。所以必須額外注入位置資訊：

- 經典版：sinusoidal positional encoding（正弦/餘弦函數）加到 embedding。
- 現代**開源** LLM（Llama、Mistral、Qwen 等）：多用 **RoPE**（Rotary Position Embedding）。閉源模型（GPT-4、Claude、Gemini）的位置編碼**未公開細節**，推測也使用相近的相對位置方案。（此為延伸，iPAS 不考 RoPE 細節）

#### 三大 Transformer 變體 🔥🔥

| 變體 | 代表 | 注意力方向 | Pretrain 任務 | 用途 |
|---|---|---|---|---|
| **Encoder-only** | BERT | **雙向**（看得到左右） | MLM（Masked LM）+ NSP | 分類、NER、抽取式 QA |
| **Decoder-only** | GPT / Claude / Llama / Gemini | **單向**（只看左邊，causal mask） | Next-token prediction | **生成**（對話、寫文章、coding） |
| **Encoder-decoder** | T5 / BART | 編碼器雙向、解碼器單向 + cross-attention | Denoising / Span corruption | 翻譯、摘要（seq2seq） |

> 🔥🔥 **114/05 直接考題：「BERT 是雙向訓練，GPT 是單向訓練」** — 這題每年都出。

---

### 3.4 🔄 訓練典範：Pretrain → SFT → RLHF

現代 LLM（GPT-4/5、Claude、Llama 4）全部走同一個三段式流程：

#### ASCII 圖：LLM 訓練管線

```
┌───────────────────────────────────────────────────────────────────────┐
│ Stage 1：Pretrain（預訓練）                                           │
│  • 資料：兆級 token 的網路文本（Common Crawl、Wikipedia、GitHub...）  │
│  • 目標：預測下一個 token（next-token prediction）                    │
│  • 學到什麼：語言結構、通識、事實、程式模式                           │
│  • 計算量：極大（訓練一次花數百萬美元）                               │
└──────────────────────────┬────────────────────────────────────────────┘
                           ▼
┌───────────────────────────────────────────────────────────────────────┐
│ Stage 2：SFT（Supervised Fine-Tuning，監督式微調）                    │
│  • 資料：人類寫的（指令, 回答）示範對，數萬~數十萬筆                  │
│  • 目標：學會「被問問題要回答」的格式與風格                           │
│  • 學到什麼：指令遵循、回答格式、禮貌用詞                             │
│  • 計算量：中等（幾天~幾週）                                          │
└──────────────────────────┬────────────────────────────────────────────┘
                           ▼
┌───────────────────────────────────────────────────────────────────────┐
│ Stage 3：RLHF（Reinforcement Learning from Human Feedback）           │
│  • 資料：人類對兩個回答的偏好比較（A 比 B 好）                        │
│  • 流程：① 用偏好資料訓一個 reward model                              │
│          ② 用 PPO（強化學習）讓 LLM 的輸出最大化 reward               │
│  • 學到什麼：有用性、安全性、避免胡說八道、符合人類偏好               │
│  • 計算量：中等，但人力成本高（需大量人類標註）                       │
└───────────────────────────────────────────────────────────────────────┘
```

#### 三階段的「分工」 🔥🔥

| 階段 | 學到什麼 | 類比 |
|---|---|---|
| Pretrain | 通識 + 語言基礎 | 讀完整個圖書館 |
| SFT | 對話格式 + 指令遵循 | 學待人接物 |
| RLHF | 人類偏好 + 對齊 | 學做人處世 |

**陷阱警告**：很多考生會把「教事實」歸給 RLHF — 錯的。事實是 Pretrain 學的，RLHF 是微調「偏好」。

#### 延伸（本課略過）

2024–26 年業界還有 **DPO**（Direct Preference Optimization，省掉 reward model）、**GRPO**（DeepSeek 用）、**RLVR**（可驗證獎勵的 RL，用在推理模型 o1/o3/DeepSeek-R1 上）。（此為中級以上內容，本課略過）

> 💡 **延伸概念（情境題常見）**：**檢索增強生成（Retrieval-Augmented Generation, RAG）** — 在 LLM 生成前先檢索外部知識庫，把相關文件塞進 prompt 再生成，用於解決幻覺（hallucination）問題。**完整實作屬 L21202（AI 導入規劃）**，但情境題可能把它當作已知工具使用——看到題目出現「避免幻覺」「接公司內部知識庫」「外部檢索後生成」等描述，就要對應到 **RAG**。

---

### 3.5 📊 評估指標（Evaluation Metrics）

不同模態用不同指標——這是很重要的「指標對應模態」考點。

#### 📊 指標家族速查

| 指標 | 全名 | 適用 | 計算方式（描述層） | 方向 |
|---|---|---|---|---|
| **PPL** | Perplexity（困惑度） | LLM 語言模型 | `exp(average cross-entropy)` | **越低越好** |
| **FID** | Fréchet Inception Distance | 圖像生成 | 用 Inception-v3 抽特徵，比較真實集合 vs 生成集合的高斯距離 | **越低越好** |
| **IS** | Inception Score | 舊圖像指標 | 類別銳利度 × 多樣性 | 越高越好（但已被 FID 取代） |
| **CLIP Score** | CLIP 相似度 | 文字-圖片對齊 | CLIP 文字 embedding 與圖片 embedding 的 cosine 相似度 | **越高越好** |
| **BLEU** | Bilingual Evaluation Understudy | 機器翻譯 / 摘要（文字重疊度） | 比較生成句與參考句的 n-gram 重疊率 | **越高越好** |
| **WER** | Word Error Rate | 語音辨識 / 字幕生成 | (替換 + 刪除 + 插入) / 參考詞數 | **越低越好** |
| **Human / ELO** | Chatbot Arena | LLM 對話品質 | 人類成對偏好 → ELO 排名 | 越高越好 |

#### 🗣️ 白話理解

- **PPL 越低**：模型越不「困惑」下一個字是什麼，就越準。像你看 YouTube 字幕，PPL 低 = 字幕組語感很順。
- **FID 越低**：生成的一批圖 vs 真實一批圖，在「特徵分布」上越接近。不是單張比，是「一堆比一堆」。
- **CLIP Score 高**：你下 prompt「戴 AirPods 的柴犬」，生成的圖跟這句話的「CLIP 向量」貼近度高 = prompt 有跟上。
- **ELO**：就是 LoL 跟 Chatbot Arena 一樣的排名系統，兩兩對戰累積出分數。

#### 🔥 關鍵對應關係

- 看到「**文字生成品質**」→ PPL
- 看到「**圖像生成品質 + 多樣性**」→ FID
- 看到「**text-to-image 對齊度**」→ CLIP Score
- 看到「**機器翻譯 / 摘要品質**」→ BLEU（n-gram 重疊）
- 看到「**語音辨識錯誤率 / 字幕生成**」→ WER（越低越好）
- 看到「**聊天機器人真實使用體驗**」→ Human eval / ELO

---

## Section 4：Comparison Tables（易混淆概念比較）

### 4.1 三大生成式架構比較（核心表，必背） 🔥🔥

| 面向 | 🎨 GAN | 🌫️ Diffusion | 📝 LLM（decoder-only） |
|---|---|---|---|
| **訓練目標** | 騙過判別器 | 預測每一步的雜訊 | 預測下一個 token |
| **損失函數** | Adversarial min-max | Denoising MSE（on ε） | Autoregressive cross-entropy |
| **訓練風格** | 兩個網路對抗 | 單一網路，穩定 | 自監督，因果遮罩 |
| **強項** | 快速推論、風格可控 | 高品質、模式覆蓋好、訓練穩定 | 長序列理解、通識知識 |
| **失敗模式** | Mode collapse、不穩定 | 推論慢（T 步） | 幻覺（hallucination） |
| **代表作** | StyleGAN、CycleGAN | Stable Diffusion、DALL-E 3 | GPT-4/5、Claude、Llama |
| **主流應用** | 人臉、風格轉換 | 高解析度 T2I | 對話、寫作、coding |

### 4.2 BERT vs GPT vs T5 🔥🔥

| 面向 | BERT | GPT | T5 |
|---|---|---|---|
| **架構** | Encoder-only | Decoder-only | Encoder-Decoder |
| **注意力方向** | **雙向**（看左右） | **單向**（causal，只看左） | 編碼雙向、解碼單向 |
| **Pretrain 任務** | MLM + NSP | Next-token prediction | Span corruption / denoising |
| **輸出** | 每個位置的表徵 | 下一個 token（逐字生成） | seq2seq（輸入→輸出） |
| **典型任務** | 分類、NER、抽取 QA | **生成**、對話、寫程式 | 翻譯、摘要 |
| **是否生成式** | ❌ 不是生成式（不會逐字吐） | ✅ 是生成式（autoregressive） | ✅ 是生成式 |

### 4.3 Pretrain vs SFT vs RLHF

| 階段 | 資料型態 | 主要目標 | 損失家族 | 在管線位置 |
|---|---|---|---|---|
| **Pretrain** | 未標註海量文本 | 學語言 + 世界知識 | 自監督 cross-entropy（next-token） | 第一階段 |
| **SFT** | 人寫（指令, 回答）對 | 學指令遵循 + 回答格式 | 監督式 cross-entropy | 第二階段 |
| **RLHF** | 人類偏好比較對 | 學人類偏好對齊 | Reward model + PPO | 第三階段 |

### 4.4 Self-Attention vs Cross-Attention

| 面向 | Self-Attention | Cross-Attention |
|---|---|---|
| **Q 來源** | 同一個序列 | 序列 A（如 decoder） |
| **K, V 來源** | 同一個序列（與 Q 相同） | 序列 B（如 encoder output、或 CLIP text embedding） |
| **用途** | 抓自己內部上下文依賴 | 讓一個序列「看」另一個序列 |
| **典型場景** | Transformer encoder、GPT 內部 | T5 decoder、Stable Diffusion 的文字條件注入 |

### 4.5 損失函數家族對照（快速辨識）

| 模型家族 | 主要損失 | 關鍵字 |
|---|---|---|
| GAN | Adversarial (min-max) | log D(x) + log(1 − D(G(z))) |
| Diffusion (DDPM) | Denoising MSE on ε | ‖ε − ε_θ‖² |
| LLM / BERT | Cross-entropy | next-token / masked-token |
| CLIP | Contrastive (InfoNCE) | 配對文字-圖片相似度 |

---

## Section 5：口訣 / Mnemonics

### 🧠 GAN 兩角色口訣
> **「G 造假、D 抓假，min-max 在打架」**
>
> Generator 造、Discriminator 判、目標是 min-max 對抗式損失。記住 G 的輸入是雜訊、D 的輸入是樣本。

### 🧠 Diffusion 方向口訣
> **「正向加噪固定，反向去噪要學」**
>
> Forward process = 固定 noise schedule，不學；Reverse process = 學一個 U-Net 去除雜訊。損失是 MSE on ε。

### 🧠 LLM 三階段口訣
> **「預訓練學通識 → SFT 學禮儀 → RLHF 學偏好」**
>
> Pretrain 學世界、SFT 學格式、RLHF 學對齊。事實在 Pretrain 學，不是 RLHF。

### 🧠 Transformer 三件套口訣
> **「注意力 + FFN + 殘差，LayerNorm 墊下巴」**
>
> Transformer block = Self-Attention → 殘差+LayerNorm → FFN → 殘差+LayerNorm。

### 🧠 BERT vs GPT 方向口訣
> **「BERT 雙向讀，GPT 單向寫」**
>
> BERT = encoder-only，雙向看得到左右，做分類/理解。GPT = decoder-only，causal mask 只能看左邊，做生成。

### 🧠 指標對模態口訣
> **「文字困惑（PPL）、圖像 FID、對齊 CLIP、聊天看 ELO」**

### 🧠 注意力公式口訣
> **「Q 問 K，除根號 d_k，softmax 當權重，加權在 V」**
>
> `Attention(Q,K,V) = softmax(QK^T / √d_k) V`

---

## Section 6：考試陷阱（Exam Traps）

### ❌ 陷阱 1：BERT 和 GPT 的訓練方向搞反
**錯誤說法：** 「BERT 是單向訓練、GPT 是雙向訓練」
**✅ 正解：** **BERT 是雙向訓練（bidirectional，encoder-only，MLM），GPT 是單向訓練（unidirectional，decoder-only，causal next-token）**。
（這是 CCChen 於 114/05 場次回報的直接考題，幾乎每次都會出。）

### ❌ 陷阱 2：Diffusion 的正向過程是學出來的
**錯誤說法：** 「Diffusion 的正向加噪過程是模型學出來的」
**✅ 正解：** **正向過程是固定的 noise schedule，完全不需學習；只有反向去噪是神經網路學的**。方向搞反是診斷題最愛的陷阱。

### ❌ 陷阱 3：Generator 和 Discriminator 的輸入輸出搞反
**錯誤說法：** 「Generator 的輸入是真實資料，Discriminator 的輸出是雜訊」
**✅ 正解：**
- **Generator 輸入 = 隨機雜訊 z，輸出 = 假樣本 G(z)**
- **Discriminator 輸入 = 樣本（真或假），輸出 = 屬於「真實」的機率 ∈ [0,1]**

### ❌ 陷阱 4：Pretrain vs SFT vs RLHF 的階段目標混淆
**錯誤說法：** 「RLHF 是教模型新事實/新知識的階段」
**✅ 正解：** **事實/知識 = Pretrain 階段學的；RLHF 只負責「偏好對齊」**。RLHF 不會補知識，只會調整「偏好方向」。三階段分別學「通識 / 格式 / 偏好」。

### ❌ 陷阱 5：Self-Attention vs Cross-Attention 時機搞錯
**錯誤說法：** 「Stable Diffusion 把文字注入圖片是用 self-attention」
**✅ 正解：** **Stable Diffusion 用 cross-attention**——Q 來自 U-Net 的圖像 latent，K/V 來自 CLIP 文字編碼器。自注意力 Q/K/V 來自**同一序列**；交叉注意力 Q 和 K/V 來自**不同序列**。

### ❌ 陷阱 6：以為所有生成任務都用同一個架構
**錯誤說法：** 「現在都用 LLM 了，圖像也用 LLM 生成就好」
**✅ 正解：** **不同模態有各自最佳架構**：
- 高解析度圖像 → Diffusion（Stable Diffusion）
- 文字對話 → Autoregressive LLM（GPT/Claude）
- 人臉風格轉換 → 仍是 GAN 的強項
- 文字-圖片對齊測量 → Contrastive（CLIP）

### ❌ 陷阱 7：把 GAN 整體損失當成 MSE / 普通 cross-entropy
**常見錯誤 A：** 「GAN 的整體訓練損失就是 MSE。」
**常見錯誤 B：** 「GAN 的整體訓練損失就是一條 cross-entropy 分類損失。」
**✅ 正解：**
- **GAN 整體是 min-max 對抗賽局**，因此被稱為**對抗式損失（Adversarial Loss）**，不是一條簡單的 MSE 回歸損失。MSE 是 Diffusion 在預測雜訊 ε 時用的。
- **不過，內部細節上：判別器 D 本質上就是用 Binary Cross-Entropy（BCE）做「真 vs 假」的二元分類**——所以說「GAN 和 cross-entropy 完全無關」也是錯的。
- 正確記法：**「整體對抗式，D 內部 BCE」**。

### ❌ 陷阱 8：FID 是看單張圖好壞
**錯誤說法：** 「FID 越低代表這張生成圖越逼真」
**✅ 正解：** **FID 是比較「生成集合 vs 真實集合」在 Inception 特徵空間的分布距離**，看的是「一堆圖 vs 一堆圖」，不是單張。因此同時反映了**品質**與**多樣性**。

### ❌ 陷阱 9：注意力的 √d_k 可有可無
**錯誤說法：** 「softmax(QK^T/√d_k) 裡的 √d_k 只是數學技巧，拿掉也可以」
**✅ 正解：** **√d_k scaling 是防止 softmax 飽和**——當 d_k 大時，內積會變得很極端，softmax 輸出趨近 one-hot，導致梯度消失。這是正式設計的一部分。

---

## Section 7：情境題快速判斷（Scenario Quick-Judge）

看到題目裡的**關鍵字**，立刻對應出答案方向：

| 題目關鍵字 | 立刻想到 |
|---|---|
| 「高解析度圖片生成」「text-to-image」 | → **Diffusion / Stable Diffusion（latent diffusion）**<br/>⚠️ 易混：GAN 也能生圖，但**高解析度 + 多樣性 + 訓練穩定**是 Diffusion 的強項；GAN 現在主要用於人臉/風格轉換，不是高解析度 T2I 主流。 |
| 「文字理解」「情感分類」「雙向上下文」「抽取式 QA」 | → **BERT（encoder-only，雙向）**<br/>⚠️ 易混：GPT 也能做分類，但 GPT 是 causal 單向；看到「**雙向**上下文」或「抽取式 QA」第一反應一定是 BERT。 |
| 「對話生成」「逐字輸出」「autoregressive」「長文對話生成」 | → **GPT 系列（decoder-only，單向）**<br/>⚠️ 易混：T5 也能生成，但 T5 是 encoder-decoder，偏翻譯/摘要；純對話/長文逐字生成 = GPT decoder-only。 |
| 「翻譯」「摘要」「seq2seq」 | → **T5 / BART（encoder-decoder）**<br/>⚠️ 易混：GPT 也做翻譯/摘要，但題目若強調 **seq2seq / 輸入→輸出對齊** 就選 encoder-decoder；若只強調「生成流暢」才選 GPT。 |
| 「mode collapse」 | → **GAN 的典型失敗模式**<br/>⚠️ 易混：Diffusion 的缺點是「推論慢」，不是 mode collapse；LLM 的缺點是「幻覺」。看到 mode collapse 直接對應 GAN。 |
| 「生成對抗」「兩個網路互相對抗」 | → **GAN（Generator + Discriminator）** |
| 「reward model + PPO」「人類偏好對齊」 | → **RLHF 階段** |
| 「指令微調」「instruction tuning」 | → **SFT（Supervised Fine-Tuning）** |
| 「next-token prediction 大規模語料」 | → **Pretrain（預訓練）階段** |
| 「`softmax(QK^T/√d_k)`」 | → **自注意力 Self-Attention** |
| 「多頭」「h 個 head 並行」 | → **Multi-Head Attention** |
| 「位置資訊無感」「要加 sinusoidal/RoPE」 | → **Positional Encoding（注意力本身無順序）** |
| 「U-Net 去噪」「MSE on ε」「noise schedule」 | → **Diffusion Model（DDPM）**<br/>⚠️ 易混：U-Net 本身原本是做影像分割的，但在生成場景出現 U-Net + 去噪 + MSE 幾乎必是 Diffusion。 |
| 「Generator 輸入雜訊、輸出樣本」 | → **GAN 的 G** |
| 「Discriminator 輸出 [0,1] 機率」 | → **GAN 的 D**<br/>⚠️ 易混：D 的內部損失是 **BCE**（真/假二元分類），但 GAN **整體**仍稱為 adversarial min-max。看到「[0,1] 真假機率」就是 D。 |
| 「PPL 越低越好」 | → **LLM 語言模型困惑度** |
| 「FID 越低越好」 | → **圖像生成品質+多樣性** |
| 「CLIP score」 | → **text-to-image 對齊度** |
| 「Chatbot Arena」「ELO」 | → **LLM 人類偏好實戰評估** |
| 「CFG scale = 7.5」「guidance scale」 | → **Classifier-Free Guidance（Stable Diffusion）** |
| 「latent space」「VAE 壓縮後擴散」 | → **Latent Diffusion（Stable Diffusion）** |
| 「StyleGAN / CycleGAN / DCGAN」 | → **GAN 變體** |
| 「BERT 雙向 / GPT 單向」 | → **🔥🔥 encoder-only vs decoder-only（必考！）** |

---

## ✅ 自我檢核 Checklist

讀完本課後，你應該能做到：

- [ ] 口頭解釋 GAN 的 Generator 與 Discriminator 各自目標，以及 adversarial min-max 的含義（並知道 D 內部本質上是 BCE）
- [ ] 區分 Diffusion 的 forward process（固定加雜訊）vs reverse process（學習去雜訊）
- [ ] 寫出 self-attention 公式 `softmax(QK^T/√d_k)V`，並解釋 √d_k 的作用
- [ ] 區分 BERT（encoder-only 雙向）、GPT（decoder-only 單向）、T5（encoder-decoder）的適用任務
- [ ] 說明 Pretrain、SFT、RLHF 三階段各自的資料型態與訓練目標
- [ ] 為任務場景選對評估指標（PPL / FID / CLIP / BLEU / WER / 人工評估）
- [ ] 辨識 mode collapse、過度信任 pretrain 知識、直接用 cross-entropy 評判生成品質等常見陷阱

若有任何一項卡關，回去對應章節重讀。

---

## 📖 延伸閱讀（非考試範圍）

以下主題屬中級以上或其他考綱，本課不深入，給學有餘力者參考：

- **RoPE（Rotary Position Embedding）**：現代開源 LLM（Llama、Mistral、Qwen 等）取代 sinusoidal PE 的相對位置編碼，外推長上下文表現更好。閉源模型（GPT-4、Claude、Gemini）未公開位置編碼細節。
- **DPO / GRPO / RLVR**：2024–26 年 RLHF 的後繼者（Direct Preference Optimization、Group Relative Policy Optimization、Reinforcement Learning with Verifiable Rewards）。DeepSeek-R1、OpenAI o1/o3 使用。
- **Mixture-of-Experts（MoE）**：稀疏專家模型，用於 GPT-4、Mixtral、DeepSeek-V3 等。
- **Consistency Models / 1-step Diffusion**：把 Diffusion 蒸餾到 1–4 步推論。
- **RAG / LoRA / Prompt Injection**：→ L21202（導入）/ L21203（風險）深入探討。
- **Multimodal fusion（視覺-語言整合）**：→ L21104。

---

## 最後提醒

- **三大架構**（GAN / Diffusion / LLM-Transformer）的「目標、損失、訓練風格、失敗模式」比較表是**本課的核心**，務必熟背 §4.1。
- **BERT 雙向 vs GPT 單向**是 114/05 直接出題的考古題等級陷阱，務必在腦中自動化反應。
- **Diffusion 正向固定、反向學習**的方向感不能搞反。
- **注意力公式** `softmax(QK^T/√d_k)V` 的每個符號都要能解釋。
- **Pretrain / SFT / RLHF 三階段**各自教什麼，不要把「事實」錯歸給 RLHF。

加油！你已經比大多數考生更接近 5/23 的那張 71 分及格線了。
