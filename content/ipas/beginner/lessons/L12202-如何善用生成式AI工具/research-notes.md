# Research Notes: L12202 如何善用生成式AI工具

## Official Sources
- [iPAS 官方網站 — AI應用規劃師最新消息](https://www.ipas.org.tw/AIAP): 115年度簡章、學習資源、公告試題
- [114年第四次初級公告試題 — 第二科：生成式AI應用與規劃](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E7%94%9F%E6%88%90%E5%BC%8FAI%E6%87%89%E7%94%A8%E8%88%87%E8%A6%8F%E5%8A%83(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000507.pdf): 官方公告考古題PDF
- [iPAS 考試樣題 114年版](https://www.ipas.org.tw/DownloadFile.ashx?filename=e8d50f7f-17ce-4057-ad60-f42db15b20cd_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf): 官方樣題（非正式考題）
- [115年度簡章PDF](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf): 考試範圍與評鑑項目定義

## Community Insights (exam patterns)
- **題型轉變**: 從「AI名詞記憶」→「AI導入規劃能力」; 情境題比重大幅增加 ([CCChen 考前更新](https://vocus.cc/article/69aee22dfd8978000194b35e))
- **跨領域混合情境題**: 技術+法規+導入情境「三元素同時出現」是新常態
- **提示工程為科目二核心**: CoT、ToT、Few-shot、APE 均為高頻考點 ([CCChen 考前總整理](https://vocus.cc/article/69bba7b6fd89780001b3df00))
- **RAG 為 2026 年重點新增**: 考的是概念理解（為何用RAG、降低幻覺）而非實作細節
- **新工具會考**: 考生反映近一年發布的AI工具（Cursor、Perplexity等）開始入題 ([考試心得](https://vocus.cc/article/6815f36afd8978000136ffeb))
- **評估四面向**: 技術面、法規面、組織面、效益面 — 工具選擇題常以此框架出題
- Source: [iPAS AI初級考試筆記 (Medium)](https://medium.com/@galingalinga/ipas-ai-%E5%88%9D%E7%B4%9A%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%80%83%E8%A9%A6%E7%AD%86%E8%A8%98-c2b18dc51e90)

## Prompt Engineering Frameworks
- **CO-STAR** (最常考): Context / Objective / Style / Tone / Audience / Response — 六維度結構化提示框架 ([infoai.com.tw](https://www.infoai.com.tw/blog/co-star-framework-gpt4-prompt-design))
- **CRISPE**: Capacity & Role / Insight / Statement / Personality / Experiment — 含實驗環節，適合創意任務; 由Matt Nigh提出，2024年經微軟研究院優化 ([CSDN](https://blog.csdn.net/m0_59614665/article/details/140879436))
- **RTF**: Role / Task / Format — 最簡潔的框架，適合簡單任務; 複雜場景不夠用 ([ai233.top](https://www.ai233.top/posts/co-star-vs-crispe-rtf-5w1h))
- **APE** (Automatic Prompt Engineering): 模型自動生成、測試、優化提示詞; 發現了比人工「Let's think step by step」更好的零樣本CoT提示 ([Prompt Engineering Guide](https://www.promptingguide.ai/zh/techniques/ape))
- 考試角度: 考「框架組成要素」和「適用場景選擇」，不考實際操作

## Prompt Design Techniques
- **Zero-shot**: 不提供範例，直接給指令; LLM靠預訓練知識完成任務 ([IBM](https://www.ibm.com/think/topics/zero-shot-prompting), [Codecademy](https://www.codecademy.com/article/prompt-engineering-101-understanding-zero-shot-one-shot-and-few-shot))
- **Few-shot**: 提供少量範例引導模型; 研究顯示可提升準確度達28%; 風險: domain shift（領域遷移失敗）([Prompt Engineering Guide](https://www.promptingguide.ai/techniques/fewshot))
- **Chain-of-Thought (CoT)**: 透過中間推理步驟實現複雜推理; Zero-shot CoT = 加上「讓我們一步一步想」即可觸發 ([promptingguide.ai](https://www.promptingguide.ai/techniques/cot))
- **Tree-of-Thought (ToT)**: CoT的延伸，適合多分支複雜場景; 允許模型探索多條推理路徑
- **Role Prompting**: 指定角色（如「你是一位資深律師」）以獲得專業風格回應
- 考試角度: 常考「哪種技術適合哪種任務」的情境配對題

## RAG Concepts
- **定義**: 整合「知識檢索」+「文字生成」，讓AI查資料後再回答 ([AWS](https://aws.amazon.com/what-is/retrieval-augmented-generation/), [Oracle](https://www.oracle.com/artificial-intelligence/generative-ai/retrieval-augmented-generation-rag/))
- **核心目的**: 降低幻覺（Hallucination）、確保回答基於最新/私有資料
- **工作流程**: 資料提取 → 文本分割(chunking) → 向量化(embedding) → 入庫 → 用戶提問 → 檢索 → 注入Prompt → LLM生成答案 ([知乎](https://zhuanlan.zhihu.com/p/675509396))
- **RAG vs Fine-tuning**: RAG = 開卷考試（查資料回答）; Fine-tuning = 閉卷考試（已學會知識）; RAG更適合需要即時更新的場景
- **向量資料庫**: 儲存embedding的專用資料庫，支援語義搜尋（考試會考概念，不考實作）
- **Hybrid Search**: 結合關鍵字搜尋+語義搜尋，提升檢索完整性
- 考試角度: 考「為何選RAG」「RAG流程順序」「RAG vs 微調的差異」，不考chunking策略細節

## AI Tool Integration
- **三大工具定位** ([CloudMile](https://cloudmile.ai/tw/resource_blog/Comparison-of-AI-Assistants-ChatGPT-Gemini-Copilot-Perplexity-Claude-Best-Partner-to-Maximize-Productivity_913)):
  - ChatGPT: 全能型，長文/創意/迭代，龐大外掛生態系
  - Gemini: Google生態系整合（Docs/Sheets/Gmail），多模態能力
  - Copilot: Microsoft 365深度整合，企業辦公自動化
- **多工具工作流範例**: ChatGPT腦力激盪 → Claude寫長文草稿 → Perplexity查證 → Copilot做簡報
- **整合模式**:
  - API串接（API chaining）: 用程式碼連接多個AI服務
  - 外掛生態系（Plugin ecosystem）: ChatGPT GPTs、Gemini Extensions
  - AI Agent: 自主任務規劃、多代理協作(A2A)、外部工具呼叫
  - MCP (Model Context Protocol): 統一AI工具與外部資源的連接標準
- 考試角度: 考「工具特性比較」「工具選擇依據」「整合架構概念」

## Current State
- 台灣《人工智慧基本法》2025年底通過、2026/1/14施行 — 考試已納入七大原則
- EU AI Act 四級風險框架為考試重點（但屬L121範圍，本課僅需帶過）
- 2026年考試趨勢: 從「認識AI工具」轉向「規劃AI導入」
- Agentic AI / AI Agent 為 2025-2026 新增熱點，初級考概念層

## Key Findings Summary
1. **提示工程是科目二最高頻考點**: CoT/ToT/Few-shot/APE + 框架(CO-STAR/CRISPE/RTF)組成要素與適用場景必考
2. **RAG考概念不考實作**: 流程順序、「為何用RAG」(降幻覺/即時更新)、RAG vs Fine-tuning差異是三大必考題型
3. **工具整合考選擇判斷**: 不考操作步驟，考「哪個工具適合哪個場景」+ 整合架構概念(API/Plugin/Agent/MCP)
4. **情境題為主流**: 純定義記憶題減少，「技術+場景+判斷」三元素組合題增加
5. **新工具會入題**: Cursor、Perplexity、Claude等近一年熱門工具的特性與定位需要認識

## Scope Notes
- **ToT深度計算/實作**: Tree-of-Thought的演算法細節屬中級範圍，初級只需知道概念與適用場景
- **RAG chunking策略/向量資料庫選型**: 屬實作層級，超出初級「善用工具」的邊界
- **Fine-tuning/LoRA/知識蒸餾**: 明確屬中級範圍，本課不涉及（boundary rule: 討論模型微調技術 → 中級）
- **Agent框架實作(LangChain/LlamaIndex)**: 屬開發層級，初級只需知道Agent概念
- **MCP協議技術細節**: 初級只需知道「統一連接標準」的概念，不需要了解協議規格
- **Transformer/Attention機制**: 明確屬模型架構內部，本課不涉及
