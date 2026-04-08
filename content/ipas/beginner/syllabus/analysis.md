# Syllabus Depth Analysis — IPAS AI應用規劃師 初級

**Certification:** IPAS AI應用規劃師能力鑑定
**Level:** 初級 (Beginner)
**Syllabus version:** 115.02
**Analysis date:** 2026-04-08

---

## 1. Items Requiring External Research

These items explicitly reference government or institutional documents that must be sourced, read, and summarized before accurate course content can be written.

| Code | Item | Why | Source to Find |
|---|---|---|---|
| L11102 | AI治理概念 | References at least 4 specific external policy/regulatory documents by name. Exam questions (114年) tested knowledge of specific provisions within these docs. | **1.** 歐盟AI法規 (EU AI Act) — full text at eur-lex.europa.eu; focus on risk classification tiers (unacceptable / high / limited / minimal) and obligations per tier. **2.** 數位發展部《公部門人工智慧應用參考手冊》 — search moda.gov.tw for the handbook PDF. **3.** 數位發展部《AI產品與系統評測》 — likely a separate publication from moda.gov.tw or subordinate agencies. **4.** 金融監督管理委員會《金融業運用人工智慧（AI）指引》 — search fsc.gov.tw for the guidelines PDF (published ~2023-2024). |
| L12301 | 生成式AI導入評估 | References 經濟部產業發展署《AI導入指引》 by name. Likely tested as scenario-based questions about enterprise AI adoption steps. | 經濟部產業發展署《AI導入指引》 — search ida.gov.tw (Industrial Development Administration) or moea.gov.tw for the guide PDF. Look for the most recent edition; the guide covers assessment frameworks, readiness checklists, and phased adoption models. |

---

## 2. Ambiguous Items

| Code | Item | Risk | Recommendation |
|---|---|---|---|
| L11101 | AI的定義與分類 | Keywords list is empty, notes are null. Unclear whether "分類" means narrow/general/super AI, or the EU risk-based classification, or ML taxonomy (supervised/unsupervised), or all of the above. | Cross-reference 114年 past exam questions. At minimum cover: (a) narrow vs. general vs. super AI, (b) rule-based vs. learning-based, (c) AI winters / brief history timeline. Prepare for overlap with L11102 (EU risk classification could appear here too). |
| L11203 | 資料隱私與安全 | Keywords list is empty, notes are null. Could mean Taiwan's 個人資料保護法 (PDPA), GDPR basics, data anonymization techniques, or just conceptual principles. No guidance on depth. | Cover: (a) core privacy principles (consent, purpose limitation, data minimization), (b) Taiwan 個資法 basics, (c) anonymization vs. pseudonymization concepts, (d) data breach response. Check past exams to see if GDPR specifics were tested or only general principles. |
| L12101 | No Code / Low Code的基本概念 | "基本認知與基礎概念" is vague. Unclear whether the exam expects specific tool names (Bubble, Airtable, Power Platform) or only the abstract concept. | Likely conceptual at beginner level: what no-code/low-code means, visual development paradigm, citizen developer concept. The explicit tool list in L12201 suggests this item stays conceptual. |
| L12102 | No Code / Low Code的優勢與限制 | "各場域應用情況" is open-ended — could mean any industry vertical. Hard to know which scenarios will be tested. | Cover 3-4 common application domains (business process automation, internal tools, prototyping, data dashboards) with pros/cons for each. Keep it pattern-based rather than exhaustive. |
| L11401 | 鑑別式AI與生成式AI的基本原理 | Keywords include "模型部署" and "效能管理" which are enterprise-level concepts. Unclear how deep the exam goes for a beginner cert. | Treat deployment/performance management at a conceptual level: what deployment means (cloud vs. edge vs. on-prem), latency/throughput/cost trade-offs. Do not go into MLOps tooling details. |
| L12303 | 生成式AI風險管理 | Keywords mention "合規性" but do not specify which regulations. Could overlap heavily with L11102 (governance) and L11203 (data privacy). | Scope to GenAI-specific risks: hallucination, bias in generated output, IP/copyright, prompt injection, data leakage via prompts. Reference L11102 governance docs for regulatory overlap rather than duplicating. |

---

## 3. Depth Estimation

| Code | Item | Estimated Depth | Content Type |
|---|---|---|---|
| L11101 | AI的定義與分類 | Medium | Definitions + classification table (narrow/general/super; rule-based/learning-based) + brief history timeline. 3-4 paragraphs + 1-2 comparison tables. |
| L11102 | AI治理概念 | Deep | Must cover EU AI Act risk tiers, 3+ Taiwan government documents, risk assessment concepts, and regulatory landscape. Full section with document summaries, comparison table of frameworks, and scenario examples. |
| L11201 | 資料基本概念與來源 | Medium | Big data 5Vs, structured vs. unstructured vs. semi-structured, data types (numerical/text/image). 3-4 paragraphs + type classification table. |
| L11202 | 資料整理與分析流程 | Medium | Data pipeline stages (collect, clean, analyze, present), feature engineering basics, normalization/standardization. 4-5 paragraphs + pipeline diagram + examples table. |
| L11203 | 資料隱私與安全 | Medium | Core privacy principles, Taiwan 個資法 basics, anonymization concepts, security best practices. 3-4 paragraphs + principles table. |
| L11301 | 機器學習基本原理 | Medium | What ML is, why it matters, training/validation/test split, overfitting vs. underfitting, generalization. 3-5 paragraphs + diagram of train-test pipeline. |
| L11302 | 常見的機器學習模型 | Deep | Must cover 6+ learning paradigms (supervised, unsupervised, semi-supervised, reinforcement, multimodal, deep learning) with examples and comparison. Full section with comparison table, algorithm examples per category, evaluation metrics. |
| L11401 | 鑑別式AI與生成式AI的基本原理 | Medium | Discriminative vs. generative model concepts, purpose/characteristics, deployment concepts, performance considerations. 4-5 paragraphs + comparison table. |
| L11402 | 鑑別式AI與生成式AI的整合應用 | Medium | Application scenarios across CV, speech recognition, generation. 3-4 paragraphs + application scenario table showing which model type applies where. |
| L12101 | No Code / Low Code的基本概念 | Shallow | Definitions, visual development paradigm, citizen developer concept. 2-3 paragraphs. |
| L12102 | No Code / Low Code的優勢與限制 | Medium | Pros/cons across domains, scalability limitations, when to use vs. traditional development. 3-4 paragraphs + pros/cons table. |
| L12201 | 生成式AI應用領域與常見工具 | Deep | Must cover 3 generation domains (text/image/audio) and 8+ named tools (OpenAI API, ChatGPT, Midjourney, Copilot Studio, VS Code Copilot, GitHub Copilot, Cursor, Gemini). Full section with tool comparison matrix, use-case mapping, and capability summaries. |
| L12202 | 如何善用生成式AI工具 | Deep | Prompt engineering frameworks, prompt design/optimization techniques, RAG concept and workflow, tool integration patterns. Full section with prompt examples, framework diagrams, and RAG architecture explanation. |
| L12301 | 生成式AI導入評估 | Deep | Technical/tool/model/performance evaluation, solution selection, cost-benefit analysis, AI agents concept, plus the 經濟部《AI導入指引》framework. Full section with evaluation frameworks, decision matrices, and document-based content. |
| L12302 | 生成式AI導入規劃 | Medium | Goal setting, resource allocation, adoption strategy, contingency measures, testing. 4-5 paragraphs + planning checklist/framework table. |
| L12303 | 生成式AI風險管理 | Medium | GenAI-specific ethical risks, data security/privacy in GenAI context, compliance considerations, risk impact assessment. 4-5 paragraphs + risk matrix table. |

**Summary:** 5 Deep, 10 Medium, 1 Shallow across all 16 items.

---

## 4. Exam Weight vs Content Effort

Since no official weights are published, estimates are based on topic breadth (items per topic) and keyword density.

| Subject | Code | Topics | Items | Est. Questions (of 50) | Implications |
|---|---|---|---|---|---|
| 人工智慧基礎概論 | L11 | 4 | 9 | 50 | More ground to cover (9 items). Questions likely skew toward factual recall and concept matching. L11102 (AI governance) and L11302 (ML models) are the heaviest items — expect 8-12 questions each given keyword density. L11101 and L11203 have no keywords, suggesting fewer questions or bridge roles. |
| 生成式AI應用與規劃 | L12 | 3 | 7 | 50 | Fewer items but each is broader in scope. L12201 (tools) and L12202 (prompt engineering) are likely the biggest question sources — scenario-based "which tool for which task" and prompt optimization. L12301 is the wildcard: the external document reference suggests 3-5 questions directly from the《AI導入指引》. |

### Key Implications for Content Production

1. **Governance is disproportionately important.** L11102 + L12303 + L12301 together form a "governance cluster" likely accounting for 15-20 questions across both subjects. All require external document research before writing.

2. **Tool-specific knowledge is explicitly tested.** L12201 names 8 tools. Past exams (114年) confirm scenario-based tool selection questions. The course must cover each tool's primary use case, pricing model (free vs. paid), and key differentiators.

3. **Prompt engineering is a high-value section.** L12202 covers prompt frameworks, RAG, and tool integration — likely 8-10 questions and the most practical/hands-on section. Invest in concrete examples.

4. **Subject 1 (L11) has more items but may be easier to produce** — most items are established CS/AI concepts with abundant reference material. Subject 2 (L12) has fewer items but requires more original content (tool comparisons, prompt examples, governance docs).

5. **Production bottleneck: external documents.** L11102 and L12301 cannot be finalized until all referenced government documents are sourced and reviewed. Start document acquisition immediately — these are the critical path items.

6. **Risk of scope creep on L11302.** Six learning paradigms plus evaluation metrics could balloon into a full ML textbook chapter. Keep it at recognition level (identify which paradigm fits a scenario), not implementation level.
