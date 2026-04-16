# 補充資料：生成式 AI 工具詳細介紹

本文件為 L12201 讀書指南的延伸閱讀，詳細介紹每個工具的定價方案、功能細節與考試重點。

---

## 一、文本生成工具

### ChatGPT（OpenAI）

**一句話定位：** 最普及的對話式 AI 助手，面向終端使用者的產品介面。

| 方案 | 月費 | 主要功能 |
|------|------|----------|
| Free | $0 | GPT-4o-mini, 30 次/小時 |
| Go | $8/月 | GPT-5.2 Instant（無限）+ GPT-5.3（限量） |
| Plus | $20/月 | GPT-5.4 Thinking, GPT Image（原 DALL-E）, 進階語音, Custom GPTs |
| Pro | $200/月 | 完整模型存取, 無限制使用 |

🔥 **考試重點：** Plus 是多數使用者最佳方案，包含 GPT Image（原 DALL-E）圖像生成與進階語音模式。

⚠️ **注意：** Pro $200/月**不包含** API 存取權，ChatGPT 訂閱與 API 是完全獨立的計費系統。

---

### OpenAI API

**一句話定位：** 讓開發者將 AI 能力嵌入自有產品的程式介面。

| 項目 | ChatGPT | OpenAI API |
|------|---------|------------|
| 使用者 | 終端使用者（End User） | 開發者（Developer） |
| 計費 | 月費訂閱制 | 按 token 計費（Pay-per-use） |
| 介面 | 網頁/App 對話介面 | 程式碼呼叫（HTTP Request） |
| 客製化 | Custom GPTs | 完整參數控制、System Prompt |
| 整合 | 獨立使用 | 嵌入自有 App/網站/系統 |

🔥🔥 **必考對比：** API = 按 token 付費、開發者整合；ChatGPT = 月費訂閱、終端使用者介面。考過情境題：「補習班評鑑平台應使用 ChatGPT 還是 OpenAI API？」→ 答案是 API（需整合進系統）。

---

### Gemini（Google）

**一句話定位：** Google 的多模態 AI 助手，深度整合 Google 生態系。

| 方案 | 月費 | 主要功能 |
|------|------|----------|
| Free | $0 | Gemini 2.5 Flash, 100 AI 額度/月 |
| Advanced | $20/月 | 2.5 Pro, 1M context, Deep Research + 2TB 儲存 |
| Ultra | $249.99/月（首3個月五折 ~$125/月） | 3.1 Pro, Deep Think, Veo 3.1 |

🔥 **考試定位：** 多模態（Multimodal）= 同時理解文字+圖片+影片；與 Google Workspace 深度整合。

---

## 二、圖像生成工具

### Midjourney

**一句話定位：** 專業級 AI 圖像生成工具，以照片級真實感著稱。

| 方案 | 月費 | 特色 |
|------|------|------|
| Basic | $10/月 | 入門級 |
| Standard | $30/月 | 一般使用者 |
| Pro | $60/月 | 專業使用者 |
| Mega | $120/月 | 大量生成需求 |

**核心特徵：**
- 目前預設為 V7 模型
- 透過 Discord 或 Web 介面操作
- **無免費方案**（考試常考）
- 強項：照片級真實感、複雜提示詞解讀

🔥 **考試定位：** 純圖像生成工具、需付費、透過 Discord/Web 操作。

---

## 三、程式碼輔助工具

### GitHub Copilot（Microsoft/GitHub）

**一句話定位：** IDE 內的 AI 程式碼自動補全擴充套件。

| 方案 | 月費 | 特色 |
|------|------|------|
| Pro | $10/月 | GPT-4o 預設, 可選 Claude Sonnet / Gemini |
| Pro+ | $39/月 | 含 Claude Opus 4, o3 等頂級模型 |

**核心特徵：**
- 以 IDE **擴充套件**（Extension）形式安裝
- 支援 VS Code、JetBrains 等多種 IDE
- 提供行內自動補全（Inline Completion）+ Chat 功能 + 多檔案上下文理解（workspace indexing）

---

### VS Code for Copilot

**一句話定位：** GitHub Copilot 在 VS Code 中的整合介面。

⚠️ **關鍵澄清：** 這**不是**一個獨立產品，而是指 GitHub Copilot 安裝在 VS Code 編輯器中的使用方式。VS Code 是微軟的免費程式碼編輯器，Copilot 是裝在裡面的 AI 擴充套件。

---

### Copilot Studio（Microsoft）

**一句話定位：** 低程式碼 AI Agent 建置平台，屬於 Microsoft 365 生態系。

**核心特徵：**
- 用來**建立聊天機器人**和**自動化流程**
- 視覺化拖放介面，低程式碼開發
- 屬於 Power Platform 生態系（與 Power Automate、Power Apps 同系列）
- 計費：25,000 Copilot Credits / $200/pack/月

🔥🔥 **與 GitHub Copilot 完全不同！**
- GitHub Copilot = **寫程式的 AI 助手**（IDE 擴充套件）
- Copilot Studio = **建聊天機器人的平台**（低程式碼工具）
- 名字都有「Copilot」但用途天差地別

---

### Cursor

**一句話定位：** 獨立 AI 程式碼編輯器，Vibe Coding 代表工具。

| 方案 | 月費 | 特色 |
|------|------|------|
| Free | $0 | 基本功能 |
| Pro | $20/月 | 完整 AI 對話 + 多模型切換 |

**核心特徵：**
- 基於 VS Code **fork**（分支複製）的完整 IDE
- 內建 AI 對話 + 多模型切換
- **Vibe Coding（氛圍程式設計）** 代表工具：用自然語言描述架構意圖，AI 生成完整程式碼

🔥 **與 GitHub Copilot 的關鍵差異：**
- Cursor = 完整獨立 IDE（VS Code 的 fork）
- GitHub Copilot = IDE 內的擴充套件（Plugin）

---

## 四、聲音生成工具

### ElevenLabs

**一句話定位：** 語音 AI 領導品牌，文字轉語音品質業界領先。

**核心特徵：**
- TTS（Text-to-Speech）品質評分 MOS 4.14，業界最高
- 支援情感控制標籤
- 已擴展至語音轉文字（STT）、對話式 AI Agent、音樂生成

---

## 五、考試延伸補充工具

### TAIDE（台灣本土）

**一句話定位：** 國家科學及技術委員會（國科會）主導開發的台灣繁體中文大型語言模型。

🔥 **幾乎必考！** 考試會問「台灣自主研發的 AI 模型」→ 答案就是 TAIDE。
- 反映本地語言文化
- 支援繁體中文理解與生成
- 由政府推動，強調數位主權

### Suno AI

**一句話定位：** AI 音樂創作平台。

- 使用者輸入文字描述，AI 生成完整歌曲（含歌詞、旋律、編曲）
- 考古題出現過，歸類在「聲音生成」領域

### NotebookLM（Google）

**一句話定位：** 基於 RAG（檢索增強生成）的文件問答工具。

- 上傳文件後，AI 基於文件內容回答問題
- 考古題考過，歸類在「文本生成」延伸應用

### Perplexity

**一句話定位：** 附帶來源引用的 AI 搜尋引擎。

- 回答都附上資料來源連結
- 與 ChatGPT 差異：Perplexity 強調「有來源」

### DeepSeek

**一句話定位：** 中國開源大型語言模型。

- 考試考點：開源模型（Open-Source Model）的代表之一
