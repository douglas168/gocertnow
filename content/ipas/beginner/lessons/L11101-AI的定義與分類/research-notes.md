# Research Notes: L11101 AI的定義與分類

> Research date: 2026-04-08
> Certification: iPAS AI應用規劃師能力鑑定 (初級)
> Topic code: L11101

---

## Official Sources

### iPAS 官方學習指引
- **Source**: [AI應用規劃師(初級)-學習指引-科目1](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB(%E5%88%9D%E7%B4%9A)-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE1_%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E5%9F%BA%E7%A4%8E%E6%A6%82%E8%AB%961141203_20251222172144.pdf) (PDF, 114年12月版)
- L11101 splits into three sub-units: L11101_1 演進 (evolution/history), L11101_2 定義 (definition), L11101_3 分類 (classification)
- This is foundational-level content in Subject 1 (人工智慧基礎概論)

### iPAS 考試樣題 (114年版)
- **Source**: [iPAS AI應用規劃師考試樣題](https://www.ipas.org.tw/DownloadFile.ashx?filename=e8d50f7f-17ce-4057-ad60-f42db15b20cd_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf) (PDF)
- Sample questions available; actual exam questions embedded in images in community posts

### 115年度考試簡章
- **Source**: [115年度AI應用規劃師能力鑑定簡章](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf) (PDF)
- Covers 2026 exam scope changes

### 台灣《人工智慧基本法》(2026年1月14日施行)
- **Source**: [立院三讀通過人工智慧基本法](https://www.cna.com.tw/news/aipl/202512230036.aspx), [台灣AI學校解讀](https://aiacademy.tw/news-ai-fundamental-act-futurecity/), [寶博士逐條解析](https://blog.juchunko.com/zh/ai-basic-law-detailed-analysis/)
- **第三條 AI法定定義**: 「具自主運行能力之系統，該系統透過輸入或感測，經由機器學習及演算法，可為明確或隱含之目標實現預測、內容、建議或決策等影響實體或虛擬環境之產出」
- Key elements: (1) 自主運行能力, (2) 透過輸入或感測, (3) 經由機器學習及演算法, (4) 產出預測/內容/建議/決策
- Aligned with EU AI Act approach — technology-neutral, broad definition
- **Now part of official exam scope for 2026** (per CCChen analysis)

---

## Community Insights (Exam Patterns)

### CCChen 考試分析 (最權威的社群資源)
- **Source**: [科目一各項主題備考分析](https://vocus.cc/article/67ea3750fd897800016413bc), [第三場考古題](https://vocus.cc/article/68a2c94afd897800015778df), [2026考前總整理](https://vocus.cc/article/69bba7b6fd89780001b3df00), [2026三份必讀文件](https://vocus.cc/article/69aee22dfd8978000194b35e)
- **L11101 typically generates 1-2 questions** per exam, classified as "basic concept questions"
- Tested concepts: AI的定義, 圖靈測試 (Turing Test) 的目的, 強AI vs 弱AI 區別
- Exam difficulty has been **increasing since 2025** — from knowledge memorization toward scenario-based judgment
- 2026 direction shift: from "AI工具理解" to "AI導入規劃能力"

### 2026 Exam Scope Changes (Critical)
- Three new mandatory documents added to exam scope:
  1. 《人工智慧基本法》— AI法定定義 now testable
  2. 《公部門人工智慧應用參考手冊》
  3. 《AI應用規劃師評鑑範圍 11502版》
- **Exam trap**: 中央AI主管機關是「國科會」, NOT 數位發展部
- Seven principles mnemonic: 「永人隱資透公問」(永續、人類自主、隱私、資料治理、透明、公平、問責)

### 其他社群資源
- **Source**: [104學習考古題](https://nabi.104.com.tw/ability/10049056/), [yamol試卷](https://yamol.tw/cat-iPAS%E2%97%86AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E2%97%86%E5%88%9D%E7%B4%9A-6731.htm), [S測驗模擬](https://sustainnovation.cc/?cat=13), [Vercel模擬題](https://ipas-ai-primary.vercel.app/)
- Commercial: Shopee有賣1600題考題集 (含名詞解釋)

---

## Textbook & Academic Definitions

### Russell & Norvig 四大取向 (AI: A Modern Approach)
- **Source**: [OpenLearn](https://www.open.edu/openlearn/mod/oucontent/view.php?id=116249&section=2.4), [Berkeley AIMA Ch.1](https://people.eecs.berkeley.edu/~russell/aima1e/chapter01.pdf)
- Four approaches to defining AI (2x2 matrix):
  | | Human-like | Rational |
  |---|---|---|
  | **Thinking** | Thinking Humanly (cognitive modeling) | Thinking Rationally (laws of thought/logic) |
  | **Acting** | Acting Humanly (Turing Test) | Acting Rationally (rational agent) |
- Russell & Norvig favor **Acting Rationally** (rational agent approach)
- The Turing Test falls under "Acting Humanly"
- This is the **standard textbook framework** most likely referenced by iPAS exam designers

### AI Classification by Capability (三大分類)
- **Source**: [Clarifai](https://www.clarifai.com/blog/types-of-ai/), [Data Literacy](https://dataliteracy.com/breaking-down-the-4-different-levels-of-ai/)
- **Artificial Narrow Intelligence (ANI) / 弱AI / 窄AI**: Designed for specific tasks. All current AI is ANI. Examples: recommendation engines, chatbots, self-driving lane-keeping
- **Artificial General Intelligence (AGI) / 強AI / 通用AI**: Hypothetical — human-level cognition across all domains. Does not exist yet
- **Artificial Super Intelligence (ASI) / 超AI**: Hypothetical — surpasses all human intelligence. Purely theoretical

### AI Classification by Function (四大類型 — John Searle / Arend Hintze framework)
- **Source**: [Clarifai](https://www.clarifai.com/blog/types-of-ai/)
- **Reactive Machines (反應式機器)**: No memory, responds to current input only. Example: IBM Deep Blue
- **Limited Memory (有限記憶)**: Uses historical data to improve decisions. Example: self-driving cars, medical diagnostics. Most current AI falls here
- **Theory of Mind (心智理論)**: Would understand emotions/intentions/social cues. Research stage, no commercial implementation
- **Self-Aware AI (自我意識)**: Hypothetical machine consciousness. Purely theoretical

### Strong AI vs Weak AI (Searle's philosophical distinction)
- **Weak AI (弱AI)**: Systems that simulate intelligence for specific tasks — no understanding or consciousness
- **Strong AI (強AI)**: Systems that would genuinely understand and have consciousness
- Note: "Weak AI" ≈ "Narrow AI" in common usage, but strictly speaking Searle's distinction is philosophical (consciousness) while the Narrow/General/Super taxonomy is about capability scope

### AI Subfield Hierarchy
- **AI ⊃ Machine Learning (ML) ⊃ Deep Learning (DL)**
- AI is the broadest field; ML is a subset using data-driven learning; DL is a subset of ML using neural networks with many layers

---

## AI History Timeline (for L11101_1 演進)

| Year | Event | Significance |
|------|-------|-------------|
| 1950 | Turing publishes "Computing Machinery and Intelligence" | Proposes the Turing Test (imitation game) |
| 1956 | Dartmouth Conference | Term "Artificial Intelligence" coined; AI established as academic field. Organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, Claude Shannon |
| 1957 | Frank Rosenblatt's Perceptron | First neural network model |
| 1960s | ELIZA, SHRDLU | Early NLP breakthroughs |
| 1969 | Minsky & Papert's "Perceptrons" | Exposed limitations of single-layer perceptrons, reduced neural network funding |
| Mid-1970s | **First AI Winter** | Unmet expectations, funding cuts |
| 1980s | Expert Systems era | Rule-based systems (e.g., MYCIN, XCON) briefly revive AI |
| Late 1980s | **Second AI Winter** | Expert systems fail to scale; funding collapses again |
| 1997 | IBM Deep Blue defeats Kasparov | Chess milestone |
| Late 1990s-2000s | ML resurgence | Learning algorithms + internet data + compute power |
| 2011 | IBM Watson wins Jeopardy! | NLP milestone |
| 2012 | AlexNet wins ImageNet | **Deep Learning revolution begins** |
| 2016 | AlphaGo defeats Lee Sedol | Go milestone; demonstrates DL + reinforcement learning |
| 2017 | Transformer paper ("Attention Is All You Need") | Foundation of modern LLMs |
| 2022 | ChatGPT (GPT-3.5) released | **GenAI era begins**; mainstream AI adoption |
| 2023-2025 | GPT-4, Gemini, Claude, open-source LLMs | Rapid LLM advancement |
| 2025.12 | 台灣《人工智慧基本法》三讀通過 | Taiwan's first AI law |
| 2026.01 | 《人工智慧基本法》正式施行 | Legal AI definition now in force |

**Sources**: [Dartmouth Conference history](https://opendigitalai.org/en/the-dartmouth-conference-1956-the-big-bang-of-ai/), [AI Timeline](https://aitopicshub.com/ai-foundations/ai-history/history-of-artificial-intelligence-from-dartmouth-to-today/), [Dartmouth Wikipedia](https://en.wikipedia.org/wiki/Dartmouth_workshop)

---

## Current State (2025-2026 Terminology)

### AGI Debate
- **Source**: [Fortune - Jensen Huang AGI claim](https://fortune.com/2026/03/30/agi-definition-jensen-huang-lex-fridman-deepmind-turing-text-cognitive-taxonomy/), [WeBuiltIt](https://webuildit.tech/what-is-artificial-general-intelligence-agi-and-why-is-it-still-a-debate-in-2026/), [arxiv paper "WTF is AGI?"](https://arxiv.org/pdf/2503.23923)
- **No universal definition of AGI exists** — Sam Altman calls it "a very sloppy term"
- Jensen Huang (Nvidia) claimed in March 2026 "we've achieved AGI" — but experts disagree on what that means
- Prediction range: Eric Schmidt says 3-5 years (from April 2025), Elon Musk says by 2026, Demis Hassabis says ~50% chance by 2030
- AGI has become "a Rorschach test" — different definitions yield different conclusions
- For exam purposes: AGI is still classified as **theoretical/not yet achieved** in standard frameworks

### Taiwan-Specific Context
- **Source**: [行政院](https://www.ey.gov.tw/Page/9277F759E41CCD91/5d673d1e-f418-47dc-ab35-a06600f77f07), [數位發展部](https://moda.gov.tw/press/press-releases/18316)
- Taiwan's AI Basic Law uses a **capability-based, technology-neutral** definition
- Emphasis on distinguishing AI (自主運行) from traditional software (rule-based only)
- 台灣 AI 教育體系: 12年國教 → 大學 AI 課程, with iPAS as industry certification layer
- **Source**: [台灣人工智慧教育平台](https://idea.cs.nthu.edu.tw/~AIcoursemap/home/index-chinese.html), [台灣AI學校](https://aiacademy.tw/)

---

## Key Findings Summary

1. **L11101 is a low-weight topic (1-2 questions)** but foundational — it sets vocabulary for all subsequent topics. Focus on definitional clarity, not depth.

2. **Three classification frameworks are testable**: (a) Capability: ANI/AGI/ASI, (b) Function: Reactive/Limited Memory/Theory of Mind/Self-Aware, (c) Philosophy: Strong AI vs Weak AI. Students must know which is which and not confuse them.

3. **Taiwan's 人工智慧基本法 definition is now exam-relevant (2026 scope change)**. The legal definition emphasizes 自主運行能力 + 機器學習及演算法 + 產出影響環境. This distinguishes AI from traditional rule-based software.

4. **Russell & Norvig's 2x2 matrix** (Thinking/Acting x Humanly/Rationally) is the standard textbook framework. The Turing Test maps to "Acting Humanly." Know this mapping.

5. **AI history milestones are testable**: Dartmouth 1956 (birth of AI), AI winters (1970s, late 1980s), Deep Learning revival (2012 AlexNet), GenAI era (2022 ChatGPT). Students should know key dates and their significance, not detailed technical content.

---

## Scope Notes (Boundary Warnings)

- **Machine Learning algorithms, neural network architecture, backpropagation**: These belong to later topics (ML/DL sections). L11101 only needs to know that AI ⊃ ML ⊃ DL as a hierarchy, not how they work internally.
- **AI ethics and governance details**: The seven principles (永人隱資透公問) belong to L11102 (AI治理) or related governance topics. L11101 may reference the 人工智慧基本法 definition but should not deep-dive into governance frameworks.
- **Prompt engineering, RAG, AI Agent**: These are Subject 2 topics (生成式AI應用), not L11101.
- **Mathematical foundations** (linear algebra, calculus, statistics): Entirely out of scope for 初級.
- **AGI debate specifics** (prediction timelines, company claims): Mention briefly for context but don't test on this — the exam treats AGI as "theoretical, not yet achieved."
- **EU AI Act details, risk classification frameworks**: These are governance topics, not L11101 definition scope. Only mention in passing when explaining how Taiwan's definition aligns with international standards.
