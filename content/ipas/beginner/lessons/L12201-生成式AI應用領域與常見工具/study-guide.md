# L12201 生成式AI應用領域與常見工具 — 讀書指南

---

## 1. 考試對應範圍

> 對應評鑑範圍：**L12201 生成式AI應用領域與常見工具**
>
> 所屬主題：L122 生成式AI工具 → L12201 應用領域與常見工具
>
> 關鍵字：文本生成（Text Generation）、圖像生成（Image Generation）、聲音生成（Audio Generation）、OpenAI API、ChatGPT、Midjourney、Copilot Studio、VS Code for Copilot、GitHub Copilot、Cursor、Gemini
>
> 高頻出題方向：工具 ↔ 功能配對；API vs 產品介面差異；Copilot 生態系辨認；三大生成領域分類；台灣本土 AI 工具辨識

L122 為初級獨有範圍，無中級重疊。考試約出 4–6 題，佔第二科約 10%。題型從早期的「以下何者是○○工具」逐漸演變為實務情境題：「某公司想做○○，應選哪個工具？」因此不只要記住工具名稱，更要理解**每個工具適合什麼場景**。

---

## 2. 知識樹（Knowledge Tree）

```
🔧 L12201 生成式AI應用領域與常見工具
│
├── 📖 三大生成領域（Generation Domains）
│   ├── ✍️ 文本生成（Text Generation）
│   │   ├── ChatGPT — 對話式 AI 助手（月費制產品）🔥🔥
│   │   ├── OpenAI API — 開發者程式介面（按 token 計費）🔥🔥
│   │   ├── Gemini — Google 多模態 AI（跨文字/圖片/影片）🔥
│   │   └── 陷阱：ChatGPT ≠ OpenAI API，兩者獨立計費！
│   │
│   ├── 🎨 圖像生成（Image Generation）
│   │   ├── Midjourney — 照片級 AI 繪圖（無免費方案）🔥
│   │   ├── GPT Image（原 DALL-E）— OpenAI 原生圖像生成（含在 ChatGPT 中）
│   │   └── 陷阱：Midjourney 無免費方案；GPT Image 非獨立產品
│   │
│   └── 🔊 聲音生成（Audio Generation）
│       ├── ElevenLabs — 語音合成領導品牌
│       ├── Suno AI — AI 音樂創作（考古題出現過）
│       └── 陷阱：Sora 是影片生成 ≠ 聲音/程式碼生成（⚠️ 已宣布關閉）
│
├── 💻 程式碼輔助工具（Code Assistance）
│   ├── GitHub Copilot — IDE 擴充套件，行內補全 🔥
│   ├── VS Code for Copilot — Copilot 在 VS Code 的整合介面
│   ├── Cursor — 獨立 AI IDE，Vibe Coding 代表 🔥
│   ├── Copilot Studio — 低程式碼 Agent 建置平台 🔥🔥
│   └── 陷阱：Copilot Studio ≠ GitHub Copilot！名字像但用途完全不同
│
├── 🇹🇼 台灣本土工具
│   └── TAIDE — 國科會主導開發繁中 LLM（幾乎必考）🔥🔥
│
└── 📊 考試延伸工具
    ├── NotebookLM — RAG 文件問答
    ├── Perplexity — 附來源的 AI 搜尋
    └── DeepSeek — 開源模型代表
```

---

## 3. 核心概念

### 3.1 三大生成領域概覽 🔥🔥

生成式 AI（Generative AI）的應用可依**輸出類型**分為三大領域：

| 領域 | 輸出 | 核心能力 | 代表工具 |
|------|------|----------|----------|
| 文本生成（Text Generation） | 文字 | 對話、摘要、翻譯、寫作 | ChatGPT, Gemini, OpenAI API |
| 圖像生成（Image Generation） | 圖片 | 文生圖、風格轉換、編輯 | Midjourney, GPT Image |
| 聲音生成（Audio Generation） | 語音/音樂 | 文字轉語音、音樂創作 | ElevenLabs, Suno AI |

🗣️ 白話說明：就像 7-11 裡有食品區、飲料區、生活用品區一樣，生成式 AI 也按照「它能產出什麼」分成三個區域。你要文字就去文本區找 ChatGPT，要圖片就去圖像區找 Midjourney，要配音就去聲音區找 ElevenLabs。

```
生成式 AI 三大領域

  輸入（Prompt / 指令）
         │
    ┌────┼────────────┐
    ▼    ▼            ▼
 ✍️文本  🎨圖像      🔊聲音
 ChatGPT Midjourney  ElevenLabs
 Gemini  GPT Image   Suno AI
 API     (原DALL-E)
    │    │            │
    ▼    ▼            ▼
 文章/   圖片/       語音/
 對話/   插畫/       音樂/
 程式碼  海報        配音
```

🔥 **考試重點：** 題目常給一個任務情境，要你選「該用哪類工具」。看到「寫文案」→ 文本生成；看到「設計海報」→ 圖像生成；看到「做 Podcast 配音」→ 聲音生成。

---

### 3.2 文本生成工具 🔥🔥

#### ChatGPT vs OpenAI API — 最重要的對比 🔥🔥

這是本課最高頻考點。兩者都來自 OpenAI，但定位完全不同：

```
ChatGPT vs OpenAI API

  ChatGPT（產品）              OpenAI API（介面）
  ┌──────────────┐            ┌──────────────┐
  │  月費訂閱制   │            │ 按 token 計費  │
  │  $20/月 Plus  │            │ $1.75/M input │
  │              │            │              │
  │  有對話介面   │            │  無介面       │
  │  直接使用     │            │  需寫程式呼叫  │
  │              │            │              │
  │  終端使用者   │            │  開發者       │
  └──────────────┘            └──────────────┘
        │                           │
    「我自己用」               「做進我的產品裡」
```

🗣️ 白話說明：ChatGPT 就像你去全家買一杯咖啡，店面裝潢好、杯子幫你裝好，掃描付錢直接喝。OpenAI API 就像你跟咖啡豆批發商叫貨——沒有店面、沒有杯子，你要自己開店、自己決定裝潢和杯型，但可以做出自己品牌的咖啡。

🔥🔥 **必考情境判斷：**
- 「個人想用 AI 寫報告」→ ChatGPT
- 「公司想在自家 App 內建 AI 客服」→ OpenAI API
- 「補習班想做 AI 評鑑系統」→ OpenAI API（需整合進系統）

#### Gemini（Google）🔥

Gemini（前身 Bard）是 Google 的 AI 助手，考試定位強調兩個關鍵字：

1. **多模態（Multimodal）**：同時理解文字、圖片、影片（不只是文字）
2. **Google 生態整合**：與 Gmail、Google Docs、Google Drive 深度連動

🗣️ 白話說明：如果 ChatGPT 像一個很會聊天的朋友，Gemini 就像一個住在你 Google 帳號裡的助理——它能看你的 Google Drive 檔案、讀你的 Gmail、幫你改 Google Docs，而且不只看得懂文字，圖片和影片也能理解。

---

### 3.3 圖像生成工具 🔥

#### Midjourney

Midjourney 是目前最知名的 AI 圖像生成工具，以**照片級真實感**聞名。

**考試必記三特徵：**
1. 純圖像生成工具（不做文字、不做聲音）
2. 透過 **Discord** 或 Web 介面操作
3. **無免費方案**（最低 $10/月起）

🗣️ 白話說明：Midjourney 就像一個超強的 AI 畫師，你用文字描述「一隻穿西裝的柴犬坐在台北 101 前」，它就能畫出來。但跟 Instagram 濾鏡不同，它是從零開始「畫」出一張全新圖片，不是修改你的照片。

#### GPT Image（原 DALL-E，OpenAI）

GPT Image 是 OpenAI 的原生圖像生成功能（2025 年 3 月起取代 DALL-E 3，基於 4o 原生圖像生成）。**內建於 ChatGPT 中**，Free 和 Go 使用者也可使用（有每日次數限制），Plus 以上額度更高。

🔥 **考試注意：** GPT Image 不是獨立的付費產品，而是 ChatGPT 的內建功能。使用者在 ChatGPT 對話中就能直接生成圖片。考題若仍出現 DALL-E 名稱，視為同一工具。

---

### 3.4 聲音生成工具

聲音生成（Audio Generation）涵蓋兩大子領域：

| 子領域 | 說明 | 代表工具 |
|--------|------|----------|
| 文字轉語音 TTS（Text-to-Speech） | 文字 → 人聲朗讀 | ElevenLabs, Azure AI Speech |
| AI 音樂生成（AI Music Generation） | 文字描述 → 完整歌曲 | Suno AI |

🗣️ 白話說明：TTS 就像你在 YouTube 上看到的「AI 配音」影片——把文字稿丟進去，AI 用擬真人聲唸出來。Suno AI 更誇張，你告訴它「幫我做一首台語嘻哈歌，歌詞關於加班」，它真的能生出一首完整的歌，有旋律、有歌詞、有編曲。

**ElevenLabs** 是目前語音合成（Voice Synthesis）品質最高的工具，TTS 品質評分 MOS 4.14 為業界最高。

---

### 3.5 程式碼輔助工具 🔥🔥

這是考試最容易混淆的區塊。三個名字裡都有「Copilot」或與 VS Code 相關的工具，定位完全不同：

```
程式碼輔助工具關係圖

  Microsoft 生態系
  ┌─────────────────────────────────────────────┐
  │                                             │
  │  GitHub Copilot          Copilot Studio     │
  │  ┌────────────┐         ┌────────────┐      │
  │  │ IDE 擴充套件 │         │ 低程式碼平台 │      │
  │  │ 寫程式碼    │         │ 建聊天機器人 │      │
  │  │ $10/月     │         │ $200/pack   │      │
  │  └─────┬──────┘         └────────────┘      │
  │        │ 安裝於                               │
  │        ▼                                     │
  │  ┌────────────┐                              │
  │  │  VS Code   │  ← VS Code for Copilot      │
  │  └────────────┘    = Copilot + VS Code       │
  │                                             │
  └─────────────────────────────────────────────┘

  獨立生態
  ┌─────────────┐
  │   Cursor     │ ← VS Code 的 fork（完整獨立 IDE）
  │  AI IDE      │    Vibe Coding 代表工具
  │  $20/月      │    內建 AI 對話 + 多模型切換
  └─────────────┘
```

#### GitHub Copilot 🔥

- **定位：** IDE 內的 AI 程式碼自動補全**擴充套件**（Extension / Plugin）
- 安裝在 VS Code、JetBrains 等 IDE 裡使用
- 主要功能：行內自動補全 + AI Chat + 多檔案上下文理解（workspace indexing）
- Pro $10/月，Pro+ $39/月

#### VS Code for Copilot

- **不是獨立產品！** 就是 GitHub Copilot 安裝在 VS Code 編輯器中的使用方式
- VS Code 是微軟的免費程式碼編輯器，Copilot 是裝在裡面的 AI 擴充套件

#### Copilot Studio（Microsoft）🔥🔥

- **定位：** 低程式碼（Low-Code）AI Agent 建置平台
- 用來**建立聊天機器人**和**自動化流程**，**不是**寫程式碼的工具
- 屬於 Microsoft 365 / Power Platform 生態系
- 與 Power Automate、Power Apps 同系列

🗣️ 白話說明：GitHub Copilot 就像你寫報告時旁邊坐了一個很會打字的助教，你打了上半句它自動幫你補完下半句。Copilot Studio 則像是一個聊天機器人的「工廠」——你在裡面拖拖拉拉就能組裝出一個客服機器人，完全不用寫程式。兩個都叫 Copilot，但一個幫你「寫 code」，一個幫你「不寫 code 就做出聊天機器人」。

#### Cursor 🔥

- **定位：** 獨立 AI 程式碼編輯器，**Vibe Coding（氛圍程式設計）** 代表工具
- 基於 VS Code 的 **fork**（分支複製），是完整獨立 IDE
- 特色：用自然語言描述你想做什麼，AI 生成完整程式碼

🗣️ 白話說明：如果 GitHub Copilot 像是「你在寫，AI 在旁邊補」，那 Cursor 的 Vibe Coding 更像是「你用說的，AI 整段寫」。你只要告訴它「幫我做一個登入頁面，要有 Google 登入和忘記密碼功能」，它就直接生出來。

🔥 **Vibe Coding（氛圍程式設計）** 由 Andrej Karpathy 於 2025 年 2 月提出，為 2026 考試新增考點：用自然語言下達架構意圖，搭配 Cursor 等工具讓 AI 生成完整程式碼。

---

### 3.6 台灣本土：TAIDE 🔥🔥

TAIDE（Trustworthy AI Dialogue Engine）是**國家科學及技術委員會（國科會, NSTC）**主導開發的台灣繁體中文大型語言模型（LLM），由學術團隊（陽明交大李育杰教授領軍）執行研發，國研院國網中心提供算力。數位發展部負責評測環境建置。

**考試必記三特徵：**
1. **台灣政府推動**（國科會主導）
2. **反映本地語言文化**（繁體中文最佳化）
3. **強調數位主權**（資料不需送到國外處理）

🗣️ 白話說明：就像台灣有自己的健保系統而不完全依賴外國保險一樣，TAIDE 的意義在於台灣要有自己的 AI 模型，不能所有 AI 都依賴美國公司。它特別懂繁體中文和台灣的用語習慣。

---

### 3.7 多模態工具（Multimodal Tools）

多模態（Multimodal）意指一個工具能處理**多種類型的輸入或輸出**（文字、圖片、影片、語音）。

```
單一模態 vs 多模態

  Midjourney（單一模態）     Gemini / ChatGPT Plus（多模態）
  ┌──────┐                 ┌──────────────────────┐
  │文字→圖│                 │文字→文字              │
  │      │                 │文字→圖片（GPT Image） │
  │      │                 │圖片→文字（圖片理解）   │
  │      │                 │語音→文字（語音模式）   │
  └──────┘                 └──────────────────────┘
```

🔥 **考試判斷：** 看到「多模態」關鍵字 → 想到 Gemini（最強調多模態定位的工具）。

> 📖 **延伸閱讀：** 各工具詳細定價方案、功能比較與考試延伸工具
> → 詳見 [supplement-工具詳細介紹.md](supplement-工具詳細介紹.md)

---

## 4. 易混淆概念比較

### 4.1 ChatGPT vs OpenAI API 🔥🔥

| 比較項目 | ChatGPT | OpenAI API |
|----------|---------|------------|
| 使用者 | 一般人、終端使用者 | 開發者 |
| 計費方式 | 月費訂閱（$0–$200/月） | 按 token 計費（用多少付多少） |
| 操作介面 | 網頁/App 對話視窗 | 程式碼呼叫（HTTP Request） |
| 客製化 | Custom GPTs（有限） | 完整參數控制 |
| 適用情境 | 個人使用、日常問答 | 整合進自家產品/系統 |
| 互通性 | ❌ 獨立計費，互不相通 | ❌ 獨立計費，互不相通 |

### 4.2 GitHub Copilot vs Copilot Studio vs Cursor 🔥🔥

| 比較項目 | GitHub Copilot | Copilot Studio | Cursor |
|----------|---------------|----------------|--------|
| 定位 | 程式碼補全助手 | 低程式碼 Agent 平台 | AI 程式碼編輯器 |
| 形式 | IDE 擴充套件 | 獨立 Web 平台 | 獨立 IDE |
| 使用者 | 程式開發者 | 業務/IT 人員 | 程式開發者 |
| 功能 | 行內補全 + Chat + 多檔案上下文 | 建聊天機器人 | 全程式碼生成 |
| 價格 | $10/月起 | $200/pack/月 | $20/月 |
| 生態系 | GitHub | Microsoft 365 | 獨立（VS Code fork） |
| 考試關鍵字 | Extension、行內補全 | 低程式碼、Agent | Vibe Coding、fork |

### 4.3 三大領域 × 工具配對表

| 工具 | 文本 | 圖像 | 聲音 | 程式碼 | 多模態 |
|------|:----:|:----:|:----:|:------:|:------:|
| ChatGPT (Plus) | ✅ | ✅* | ✅* | ✅ | ✅ |
| OpenAI API | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gemini | ✅ | ✅ | — | — | ✅ |
| Midjourney | — | ✅ | — | — | — |
| ElevenLabs | — | — | ✅ | — | — |
| GitHub Copilot | — | — | — | ✅ | — |
| Cursor | — | — | — | ✅ | — |
| Copilot Studio | — | — | — | —** | — |
| TAIDE | ✅ | — | — | — | — |

\* ChatGPT Plus 透過 GPT Image（原 DALL-E）生成圖像、透過進階語音模式處理聲音
\** Copilot Studio 是低程式碼平台，不是程式碼生成工具

### 4.4 免費 vs 付費速查

| 工具 | 有免費方案？ | 付費起價 |
|------|:----------:|----------|
| ChatGPT | ✅ | $8/月（Go） |
| Gemini | ✅ | $20/月（Advanced） |
| Midjourney | ❌ | $10/月（Basic） |
| GitHub Copilot | ✅* | $10/月（Pro） |
| Cursor | ✅ | $20/月（Pro） |
| ElevenLabs | ✅ | 有 Free 方案，Pro $99/月 |

\* GitHub Copilot 有個人免費額度（功能受限）

---

## 5. 口訣 / Mnemonics

### 三大領域口訣：「文圖聲」

> **「文」**本生成 → ChatGPT、Gemini
> **「圖」**像生成 → Midjourney、GPT Image（原 DALL-E）
> **「聲」**音生成 → ElevenLabs、Suno AI
>
> 記法：**文圖聲，像點餐：要文字找 ChatGPT，要圖片找 MJ，要聲音找 EL。**

### Copilot 三兄弟口訣：「寫、建、編」

> GitHub Copilot = **寫**（寫程式碼的助手）
> Copilot Studio = **建**（建聊天機器人的平台）
> Cursor = **編**（AI 編輯器，Vibe Coding）
>
> 記法：**「寫建編」— Copilot 寫 code、Studio 建 bot、Cursor 編程式。**

### API vs 產品口訣：「批發 vs 零售」

> OpenAI API = **批發**（按量計費、開發者自己包裝）
> ChatGPT = **零售**（月費固定、直接使用）
>
> 記法：**API 批發，ChatGPT 零售。看到「整合進系統」→ API；看到「自己用」→ ChatGPT。**

### 台灣必考口訣：「台灣 AI 找 TAIDE」

> 看到「台灣自主研發」、「繁體中文模型」、「國科會」→ 答案 **TAIDE**

---

## 6. 考試陷阱

❌ **陷阱：** ChatGPT Pro ($200/月) 包含 API 存取權，所以不需要另外付 API 費用。
✅ **正解：** ChatGPT 訂閱與 OpenAI API 是**完全獨立**的計費系統，即使買了 Pro $200/月也不包含 API 存取。要用 API 必須另外在 OpenAI Platform 儲值。

---

❌ **陷阱：** Copilot Studio 是 GitHub Copilot 的進階版本。
✅ **正解：** 兩者**完全不同**。GitHub Copilot 是寫程式碼的 IDE 擴充套件；Copilot Studio 是建聊天機器人的低程式碼平台，屬於 Microsoft 365 / Power Platform 生態系。名字都有 Copilot 但用途天差地別。

---

❌ **陷阱：** Cursor 是 GitHub Copilot 的競品，所以也是 IDE 擴充套件。
✅ **正解：** Cursor 是**完整獨立 IDE**（VS Code 的 fork），不是擴充套件。GitHub Copilot 裝在別人的 IDE 裡，Cursor 本身就是一個 IDE。

---

❌ **陷阱：** Midjourney 有免費試用方案。
✅ **正解：** Midjourney **沒有免費方案**，最低從 Basic $10/月起跳。（早期曾有免費試用，但已取消。）

---

❌ **陷阱：** Sora 是程式碼生成工具。
✅ **正解：** Sora（OpenAI）是**影片生成**工具，與程式碼完全無關。考過「以下何者不是程式碼生成 AI？」陷阱選項就是 Sora。（⚠️ Sora 已宣布關閉：App 於 2026/4/26 停止、API 於 2026/9 關閉，考試僅作為歷史工具辨識。）

---

❌ **陷阱：** TAIDE 是由 OpenAI 或 Google 開發的台灣版 AI。
✅ **正解：** TAIDE 是由**國家科學及技術委員會（國科會）**主導開發的自主繁體中文模型，與 OpenAI 和 Google 無關，強調的是台灣數位主權。

---

❌ **陷阱：** Vibe Coding 是一種程式語言。
✅ **正解：** Vibe Coding（氛圍程式設計）是一種**開發方式**——用自然語言描述架構意圖，讓 AI 工具（如 Cursor）生成完整程式碼。它不是語言，是方法論。

---

❌ **陷阱：** 以為免費方案就能無限使用所有功能。
✅ **正解：** 免費方案有次數限制、模型較低階、功能較少（如 ChatGPT Free 有訊息數上限、無法使用進階模型）。

---

❌ **陷阱：** 用 ChatGPT 網頁版和用 API 的資料隱私政策相同。
✅ **正解：** ChatGPT 網頁/App 的對話內容**預設可能被用於模型訓練**（除非手動關閉），但 **API 呼叫的資料預設不會用於訓練**。企業評估工具時，這是選擇 API 而非網頁版的重要考量。

---

## 7. 情境題快速判斷

### 🔑 看到關鍵字 → 選這個答案

**依任務選工具：**
- 「寫文案 / 翻譯 / 摘要 / 日常問答」→ **ChatGPT**
- 「整合進自家 App / 按量計費 / 開發者」→ **OpenAI API**
- 「Google 整合 / 多模態 / 同時理解文字和圖片」→ **Gemini**
- 「設計海報 / AI 繪圖 / 照片級圖像」→ **Midjourney**
- 「配音 / 文字轉語音 / Voice」→ **ElevenLabs**
- 「AI 作曲 / 音樂生成」→ **Suno AI**
- 「程式碼補全 / IDE 擴充 / 行內自動完成」→ **GitHub Copilot**
- 「低程式碼 / 建聊天機器人 / Agent 平台」→ **Copilot Studio**
- 「Vibe Coding / 自然語言寫程式 / AI IDE」→ **Cursor**
- 「台灣 / 繁中模型 / 國科會」→ **TAIDE**

**依概念選答案：**
- 「月費 vs 按 token」→ **ChatGPT vs OpenAI API**
- 「擴充套件 vs 獨立 IDE」→ **GitHub Copilot vs Cursor**
- 「寫程式碼 vs 建聊天機器人」→ **GitHub Copilot vs Copilot Studio**
- 「無免費方案的圖像工具」→ **Midjourney**
- 「RAG / 文件問答」→ **NotebookLM**
- 「有來源引用的搜尋」→ **Perplexity**
- 「開源模型」→ **DeepSeek**
- 「影片生成（非程式碼/非聲音）」→ **Sora**（已關閉，僅供歷史辨識）

**排除法速查：**
- 「以下何者不是程式碼生成工具？」→ 排除 **Sora**（影片）、**Midjourney**（圖像）、**ElevenLabs**（語音）
- 「以下何者沒有免費方案？」→ **Midjourney**
- 「以下何者不屬於 Microsoft 生態系？」→ **Cursor**（獨立）、**Midjourney**（獨立）
