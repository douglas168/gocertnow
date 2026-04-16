# Research Notes: L12301 生成式AI導入評估

## Official Sources

- **經濟部產業發展署《製造業AI導入指引》** (aimfg.org.tw/ai_guide): The authoritative framework referenced in the syllabus. Defines a 4-phase AI adoption process:
  1. 構想評估 — analyze business pain points, check internal resource/AI fit, select application areas
  2. 方案設計 — define KPIs, understand data needs, plan AI scenario, estimate costs
  3. 驗證/POC — develop model, simulate operations, evaluate ROI
  4. 實施/營運 — deploy, monitor retraining thresholds, scale AI culture
  - Source: [製造業AI升級引擎 - AI導入指引](https://aimfg.org.tw/ai_guide)

- **iPAS 115年度簡章**: L123 covers 生成式AI導入評估規劃, including 導入評估 / 導入規劃 / 風險管理 three sub-topics
  - Source: [115年簡章PDF](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf)

- **iPAS 114年樣題 (114年1月版)**: Contains sample questions on AI adoption evaluation
  - Source: [iPAS樣題PDF](https://www.ipas.org.tw/DownloadFile.ashx?filename=e8d50f7f-17ce-4057-ad60-f42db15b20cd_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf&type=10)

- **iPAS學習資源頁**: Official learning guide for AI應用規劃師 now available
  - Source: [iPAS學習資源](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources)

- **114年第四梯次公告試題**: Released exam with questions on medical AI adoption evaluation
  - Source: [114年第四次第二科試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E5%9B%9B%E6%A2%AF%E6%AC%A1%E5%88%9D%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E7%94%9F%E6%88%90%E5%BC%8FAI%E6%87%89%E7%94%A8%E8%88%87%E8%A6%8F%E5%8A%83(%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000507.pdf)

## Community Insights (exam patterns)

- **CCChen (vocus.cc)** — most prolific exam experience blogger for iPAS AI:
  - 2026 exam direction shifting from "AI tool understanding" to "AI adoption planning ability"
  - Cross-domain scenario questions becoming common (e.g., medical + AI adoption)
  - Exam tests not just "what is it" but "how to use" and "how to plan"
  - 114年第四次 included questions about medical institution AI adoption technical assessment
  - Source: [CCChen 考試心得](https://vocus.cc/article/68a2c94afd897800015778df), [2026考前指南](https://vocus.cc/article/69aee22dfd8978000194b35e)

- **Exam format**: 75 minutes, multiple choice, can enter 20min late, cannot leave before 30min
- **Trend**: Policy/industry/exam all shifting toward "trustworthy AI x application planning x practical implementation"
- **Key tested area**: AI governance + EU AI Act 4-level risk framework + HITL requirements appear alongside adoption topics

## Current State

- **AI Agent (AI代理)** is a NEW addition to the 115年 syllabus — exam-takers report it started appearing in 114年 later rounds
  - Core concept: AI Agent = LLM + memory + tool-calling + autonomous decision-making (observe -> decide -> act loop)
  - Key distinction from single-prompt GenAI: agents handle multi-step tasks autonomously, use tools, maintain context across steps
  - 2025-2026 = "Agent Year" per industry consensus
  - Source: [GIGABYTE AI Agent解析](https://www.gigabyte.com/tw/Article/what-is-agentic-ai-are-you-on-track-to-profit-from-it), [eCloudValley](https://www.ecloudvalley.com/tw/blog/what-is-ai-agent)

- **ROI reality check (exam-relevant context)**:
  - IDC: average GenAI ROI = 3.7x, but McKinsey: only ~6% of enterprises attribute 5%+ pretax profit to AI
  - Hidden costs: API fees = only 5-15% of total cost; talent, data governance, RAG infrastructure are the real costs
  - Source: [FIND 生成式AI價值重估](https://www.find.org.tw/indus_trend/browse/05f0dd9d986ded9cf4333800f8486fc1)

- **Taiwan market**: GenAI market ~US$300M in 2025, CAGR 17.81%, financial sector adoption 33%

## External Documents Found

- **經濟部產業發展署《製造業AI導入指引》**: FOUND at aimfg.org.tw/ai_guide
  - 4-phase framework: 構想評估 → 方案設計 → 驗證/POC → 實施/營運
  - Targets companies with AI adoption intent but no prior experience
  - Provides systematic procedure through "evaluation and adoption" steps
  - Full document downloadable from site; also mirrored at eii.nat.gov.tw/aimfg/ai_guide
  - NOTE: While titled "製造業" (manufacturing), the framework is generic enough for the exam — iPAS syllabus explicitly references this document

- **2025 台灣產業AI化大調查暨AI落地指引** (by AIF): Additional reference
  - Source: [AIF PDF](https://aif.tw/event/ai-research/file/2025%20%E5%8F%B0%E7%81%A3%E7%94%A2%E6%A5%AD%20AI%20%E5%8C%96%E5%A4%A7%E8%AA%BF%E6%9F%A5%E6%9A%A8%20AI%20%E8%90%BD%E5%9C%B0%E6%8C%87%E5%BC%95.pdf)

- **數位發展部《公部門人工智慧應用參考手冊》**: Government AI adoption reference (complementary)
  - Source: [moda.gov.tw](https://moda.gov.tw/digital-affairs/digital-service/ai-resource/18248)

## Key Findings Summary

1. **《AI導入指引》4-phase framework is the exam backbone**: 構想評估 → 方案設計 → 驗證/POC → 實施/營運. Students must know each phase's purpose and key activities. This is the most testable structure.

2. **Evaluation dimensions for exam**: technical assessment (can current infra support it?), tool evaluation (which GenAI tool fits the use case?), model evaluation (accuracy/latency/cost tradeoffs), performance evaluation (KPIs before and after). All at checklist/conceptual level for 初級.

3. **Cost-benefit at 初級 = qualitative framing**: Know that ROI must be defined before adoption, hidden costs exist beyond API fees, and POC should validate business value before scaling. No math required.

4. **AI Agent is newly testable**: Expect 1-3 questions distinguishing AI Agent from single-prompt GenAI. Key: agents = autonomous multi-step + tool use + memory; GenAI = one-shot content generation.

5. **Scenario-based questions dominate**: Real exam uses industry scenarios (medical, manufacturing, customer service) and asks "what should you evaluate first?" or "which phase of adoption is this?" — pure memorization is insufficient.

## Scope Notes

- **Cost-benefit with actual ROI calculations, scoring matrices, budget templates** → 中級 territory. 初級 only needs conceptual understanding (why do CBA, what factors to consider).
- **Detailed AI Agent frameworks (LangChain, AutoGen, CrewAI architecture)** → 中級/beyond. 初級 only needs the concept and how agents differ from basic GenAI.
- **Technical model fine-tuning, MLOps pipeline design** → 中級. 初級 covers model selection criteria at a high level only.
- **The 製造業AI導入指引 has deep manufacturing-specific content** — for 初級, focus on the generic 4-phase framework, not manufacturing-specific details.
