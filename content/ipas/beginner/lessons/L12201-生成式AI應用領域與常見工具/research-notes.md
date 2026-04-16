# Research Notes: L12201 生成式AI應用領域與常見工具

## Official Sources
- [iPAS 114年樣題 PDF](https://www.ipas.org.tw/DownloadFile.ashx?filename=e8d50f7f-17ce-4057-ad60-f42db15b20cd_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf&type=10): 初級樣題含工具辨識題型
- [114年第四梯次科目二公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E7%94%9F%E6%88%90%E5%BC%8FAI%E6%87%89%E7%94%A8%E8%88%87%E8%A6%8F%E5%8A%83(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000507.pdf): 唯一官方公開考古題
- [iPAS 學習資源頁](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方推薦教材清單

## Community Insights (exam patterns)
- Sources: [CCChen 2026/03/21 考前總整理](https://vocus.cc/article/69bba7b6fd89780001b3df00), [CCChen 05/03 考古題](https://vocus.cc/article/6815f36afd8978000136ffeb), [CCChen 08/16 考古題](https://vocus.cc/article/68a2c94afd897800015778df)
- **工具辨識題**: 考「以下何者不是程式碼生成AI？」選項含 Cursor、GitHub Copilot、OpenAI Codex — 答案 Sora（文生影片非程式碼）
- **工具對應功能**: Cursor = AI寫程式, Gemini = 多模態, NotebookLM = RAG應用, Perplexity = 有來源, DeepSeek = 開源模型
- **音樂生成**: Suno AI 音樂創作平台（考過）
- **台灣本土**: TAIDE（數位發展部開發，反映本地語言文化）必考
- **趨勢題**: Vibe Coding（用自然語言下達架構意圖，搭配 Cursor 等工具）為 2026 新增考點
- **API vs 產品**: 考過「補習班評鑑平台應用 ChatGPT 或 OpenAI API 搭配表單管理工具」情境題
- **考題難度逐場提升**, 第三場起明顯加入更多實務情境與最新工具

## Current State of Tools

### Text Generation
- **ChatGPT** (OpenAI)
  - Free: GPT-4o-mini, 30 turns/hr; Go: $8/mo; Plus: $20/mo (full GPT-4o → 2026/02 後升級 GPT-5.2); Pro: $200/mo
  - Plus 為多數使用者最佳方案：含 DALL-E 圖像生成、進階語音模式、Custom GPTs
  - 2026/02/13 後 GPT-4o 退役，全面轉向 GPT-5.2 家族
  - Source: [ChatGPT Pricing](https://chatgpt.com/pricing/), [IntuitionLabs 比較](https://intuitionlabs.ai/articles/chatgpt-plans-comparison)
- **OpenAI API** — 與 ChatGPT 的關鍵差異（考試重點）
  - 計費方式不同：API = 按 token 計費（GPT-5.2: $1.75/M input, $14/M output）; ChatGPT = 月費訂閱
  - API 適合開發者整合進自有產品；ChatGPT 是直接面對終端使用者的介面
  - Pro $200/月 不含 API 存取，兩者完全獨立計費
  - Source: [OpenAI API Pricing](https://openai.com/api/pricing/), [GetAIPerks](https://www.getaiperks.com/en/articles/openai-pricing)
- **Gemini** (Google)
  - Free: Gemini 2.5 Flash, 100 月度 AI 額度, 32K context; Advanced: $20/mo (2.5 Pro, 1M context, Deep Research, Gems) + 2TB Google 儲存
  - Ultra: $124.99/3mo (Gemini 3.1 Pro, Deep Think, Veo 3.1)
  - 考試定位：多模態（文字+圖片+影片理解）、與 Google 生態整合
  - Source: [Google One AI Plans](https://one.google.com/about/google-ai-plans/), [FreeAcademy 比較](https://freeacademy.ai/blog/gemini-free-vs-advanced-comparison-2026)

### Image Generation
- **Midjourney**
  - 無免費方案; Basic $10/mo, Standard $30/mo, Pro $60/mo, Mega $120/mo（年繳 8 折）
  - V7 為預設模型（2026 現況），V8 Alpha 預覽中
  - V7 新功能：Omni Reference（取代舊版角色參考）、個人化風格檔案、Draft Mode 快速構想
  - 強項：照片級真實感、文字渲染改善、複雜多元素提示詞解讀
  - 考試定位：純圖像生成工具，透過 Discord/Web 操作，需付費
  - Source: [Midjourney Docs](https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans), [AIVideoBootcamp Guide](https://aivideobootcamp.com/blog/midjourney-complete-guide-2026/)

### Code Assistance
- **GitHub Copilot** (Microsoft/GitHub)
  - Pro: $10/mo (GPT-4o 預設, 可選 Claude Sonnet 4.6 / Gemini 2.5 Pro); Pro+: $39/mo (含 Claude Opus 4, o3)
  - 整合於 VS Code、JetBrains 等 IDE，提供行內自動補全 + chat
  - **VS Code for Copilot** = GitHub Copilot 在 VS Code 中的整合介面（非獨立產品）
  - Source: [NxCode 比較](https://www.nxcode.io/resources/news/github-copilot-vs-cursor-2026-which-to-pay-for)
- **Copilot Studio** (Microsoft) — 注意：與 GitHub Copilot 完全不同
  - 定位：低程式碼 AI Agent 建置平台（建立聊天機器人/自動化流程），非程式碼輔助工具
  - 計費：25,000 Copilot Credits / $200/pack/month，或 Azure 隨用隨付
  - 屬於 Microsoft 365 / Power Platform 生態系
  - Source: [Microsoft Copilot Studio Pricing](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing/copilot-studio), [HSO 比較](https://www.hso.com/blog/microsoft-copilot-vs-studio)
- **Cursor** — 獨立 AI 程式碼編輯器
  - Pro: $20/mo; 基於 VS Code fork，內建 AI 對話 + 多模型切換
  - 與 GitHub Copilot 差異：Cursor 是完整 IDE（fork of VS Code）；Copilot 是 IDE 擴充套件
  - SWE-Bench: Copilot 56.0% vs Cursor 51.7%，但 Cursor 速度快 30%
  - 考試考點：Vibe Coding 代表工具 — 用自然語言描述架構意圖，AI 生成完整程式碼
  - Source: [Morphllm 比較](https://www.morphllm.com/comparisons/cursor-vs-copilot), [Superblocks 比較](https://www.superblocks.com/blog/cursor-vs-copilot)

### Audio Generation
- **ElevenLabs** — 語音 AI 領導品牌
  - TTS MOS 評分 4.14（業界領先）; V3 模型支援行內情感標籤控制
  - Pro: $99/mo (~1M chars); 另有 Free/Starter/Scale 等方案
  - 已擴展至 STT (Scribe v2)、對話式 AI Agent、音樂生成
  - Source: [Aloa 比較](https://aloa.co/ai/comparisons/ai-voice-comparison/elevenlabs-vs-azure-speech)
- **Azure AI Speech** (Microsoft) — 企業級 TTS/STT
  - Neural TTS $15-16/M chars; Voice Live API 支援即時語音對話
  - 適合大規模企業部署，成本效益佳
- **其他主要玩家**: Google Chirp 3, OpenAI gpt-4o-mini-tts, Amazon Polly Generative
  - Source: [TTS 比較指南](https://blog.greeden.me/en/2026/03/12/latest-tts-model-comparison-2026-the-definitive-guide-to-choosing-by-use-case-across-gemini-azure-elevenlabs-openai-amazon-polly-and-oss/)

## Key Findings Summary
1. **考試最愛考「工具 ↔ 功能配對」**: 給情境選工具，或給工具判斷用途。必須記住每個工具的一句話定位（如 Cursor = Vibe Coding, Midjourney = 圖像生成, ElevenLabs = 語音合成）
2. **API vs 產品是必考對比**: OpenAI API（按 token 付費、開發者整合）vs ChatGPT（月費、終端使用者介面）— 考過情境題
3. **Copilot 生態系易混淆**: GitHub Copilot（程式碼補全 IDE 擴充）vs Copilot Studio（低程式碼 Agent 建置平台）vs VS Code for Copilot（= Copilot 在 VS Code 的介面）— 三者定位完全不同
4. **三大生成領域分類清晰**: 文本生成（ChatGPT/Gemini）、圖像生成（Midjourney/DALL-E）、聲音生成（ElevenLabs/Azure TTS）— 考試以此分類出題
5. **台灣本土元素**: TAIDE 幾乎必考；Suno AI（音樂生成）也出現過 — 非主流工具也要認識

## Scope Notes
- 所有內容維持在「工具使用者」層級：哪個工具做什麼、怎麼收費、適合什麼情境
- 未涉及 Transformer 架構、attention 機制、模型微調等超出邊界的技術細節
- 價格資訊截至 2026/04，AI 工具定價變動快，考試不太考具體金額但會考免費/付費區別
- Suno AI（音樂）和 TAIDE（台灣 LLM）不在本課綱 syllabus 列表中，但考古題出現過，建議在「延伸補充」中帶一筆
