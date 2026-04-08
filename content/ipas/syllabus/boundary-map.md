# IPAS AI Application Planner -- Level Boundary Map

> **Purpose:** Define explicit scope boundaries between 初級 (Beginner) and 中級 (Intermediate) so that content generators never produce overlapping material.
>
> **How to use:** Before writing any lesson, quiz question, or exam item, check the relevant overlapping area below. Follow the **Rule** row exactly.

---

## Overlapping Areas

### 1. AI Adoption Assessment & Planning

**初級 L123 (生成式AI導入評估規劃) vs 中級 L212 (AI導入評估規劃)**

| Aspect | 初級 | 中級 |
|---|---|---|
| Scope | Evaluate whether to adopt a **specific GenAI tool or service** for a business task. Covers tool/model selection checklists, basic cost-benefit framing, and the MOEA "AI導入指引" document at a summary level. | Design an **end-to-end AI adoption program** for an organization: requirements analysis, technical solution architecture, resource allocation across teams, and formal risk management frameworks. |
| Depth | Conceptual -- can a non-technical manager follow a checklist to decide "should we use ChatGPT for customer service?" | Practitioner -- an AI project lead writes a proposal with budget, timeline, technical requirements, and risk mitigation plan. |
| Example language | "When evaluating a GenAI tool, consider three factors: task fit, data privacy implications, and cost per API call." | "Conduct a requirements analysis mapping each business process to candidate AI techniques, then score each option on accuracy, latency, integration effort, and total cost of ownership over 3 years." |
| Math/Code | None | Basic (cost models, ROI calculations, scoring matrices) |
| **Rule** | **初級 stops at tool-level evaluation.** Cover "which GenAI tool fits this use case?" using simple criteria (cost, capability, privacy). Never discuss organizational change management, multi-system architecture, or formal project planning methodologies. | **中級 starts at organization-level planning.** Assume the student already knows how to evaluate individual tools. Focus on cross-functional planning, resource allocation, technical solution design, and formal risk frameworks. |

---

### 2. Machine Learning

**初級 L113 (機器學習概念) vs 中級 L23 (機器學習技術與應用, especially L232)**

| Aspect | 初級 | 中級 |
|---|---|---|
| Scope | What ML is, why it matters, and the **taxonomy** of learning paradigms (supervised, unsupervised, semi-supervised, reinforcement, deep learning). Model training and generalization as high-level concepts. | **How ML algorithms work internally**: math foundations (probability, linear algebra, optimization), specific algorithm mechanics (decision trees, SVMs, neural network architectures), hyperparameter tuning, model evaluation metrics (precision/recall/F1/AUC), and full training pipelines. |
| Depth | Recognize and classify -- "Given a scenario, identify which type of learning applies." No algorithm internals. | Analyze and apply -- "Given a dataset and business goal, select an algorithm, justify the choice, tune hyperparameters, and interpret evaluation metrics." |
| Example language | "Supervised learning uses labeled data to train a model that predicts outcomes for new inputs. Common examples include spam filtering and image classification." | "A random forest aggregates predictions from multiple decision trees trained on bootstrap samples. Tuning n_estimators and max_depth controls the bias-variance tradeoff, measurable via out-of-bag error." |
| Math/Code | None -- no formulas, no code, no loss functions | Required -- probability distributions, gradient descent intuition, matrix operations, Python/pseudocode snippets |
| **Rule** | **初級 covers ML taxonomy and conceptual understanding only.** Describe what each learning type does and when to use it. Never show mathematical formulas, loss functions, code, algorithm pseudocode, or evaluation metric calculations. The deepest you go is "model training uses data to learn patterns, and generalization means the model works on unseen data." | **中級 assumes taxonomy knowledge and teaches algorithm mechanics.** Never re-explain "what is supervised learning" -- jump straight into how specific algorithms work, their math, and when one outperforms another. |

---

### 3. Data Processing & Analysis

**初級 L112 (資料處理與分析概念) vs 中級 L22 (大數據處理分析與應用, especially L221, L222)**

| Aspect | 初級 | 中級 |
|---|---|---|
| Scope | **Conceptual data literacy**: data types (numeric, text, image), structured vs unstructured, the data pipeline concept (collect -> clean -> analyze -> present), feature engineering as a term, data standardization as a term, data privacy basics. | **Technical big-data practice**: descriptive statistics (mean, median, variance, distributions), probability distributions, hypothesis testing, data storage systems (data lakes, warehouses, NoSQL), processing tools (Spark, Hadoop concepts), and data visualization tool proficiency. |
| Depth | Vocabulary and workflow awareness -- "What are the steps in a data pipeline?" | Hands-on statistical and engineering skills -- "Calculate the standard deviation of this dataset" or "Choose between a data lake and a warehouse for this use case." |
| Example language | "Data cleaning removes errors and inconsistencies so the data is ready for analysis. Common steps include handling missing values and removing duplicates." | "Apply the Shapiro-Wilk test to check normality before selecting a parametric vs non-parametric test. For datasets exceeding 10M rows, use Spark's distributed DataFrame API for efficient aggregation." |
| Math/Code | None -- describe what standardization is, never show z-score formula | Required -- statistical formulas, tool commands, SQL/Python snippets |
| **Rule** | **初級 teaches data pipeline vocabulary and awareness only.** Explain what each step does and why it matters. Never show statistical formulas, SQL, Python, or tool-specific commands. Feature engineering and standardization are defined conceptually ("transforming raw features into a more useful form") -- never demonstrate them with code or math. | **中級 assumes pipeline vocabulary and teaches statistical and engineering execution.** Never re-define "what is data cleaning" -- go straight to techniques, formulas, tools, and tradeoffs. |

---

### 4. AI Ethics, Governance & Risk

**初級 L11102 (AI治理概念) + L12303 (生成式AI風險管理) vs 中級 L21203 (AI風險管理) + L234 (機器學習治理)**

| Aspect | 初級 | 中級 |
|---|---|---|
| Scope | **Awareness of governance landscape**: know that AI governance frameworks exist (EU AI Act, Taiwan MODA handbook, FSC AI guidelines), understand categories of AI risk, GenAI-specific ethical risks (hallucination, bias in outputs, data leakage), and basic compliance concepts. | **Operational risk management**: formal risk identification and assessment methodologies, building compliance programs, algorithmic bias detection and mitigation techniques, responsible AI implementation frameworks, data privacy engineering (differential privacy, federated learning concepts), and audit/monitoring systems. |
| Depth | Recognize risks and name relevant regulations -- "The EU AI Act classifies AI systems into risk tiers." | Design and execute mitigation -- "Implement a bias audit pipeline that measures disparate impact across protected groups and triggers retraining when thresholds are breached." |
| Example language | "Generative AI can produce hallucinated content that appears factual. Organizations should establish review processes before deploying GenAI in customer-facing applications." | "Apply the 80% rule (four-fifths rule) to measure adverse impact in model predictions across demographic groups. If disparate impact is detected, apply reweighting or adversarial debiasing before redeployment." |
| Math/Code | None | Basic (fairness metrics formulas, privacy budget calculations) |
| **Rule** | **初級 covers governance awareness and risk recognition.** Name frameworks, describe risk categories, and explain why ethics matters. Never describe specific bias detection algorithms, fairness metric formulas, or compliance implementation procedures. The deepest you go is "organizations should monitor AI systems for bias and comply with relevant regulations." | **中級 assumes governance awareness and teaches risk mitigation execution.** Never re-explain what the EU AI Act is -- instead discuss how to classify your system under it, what documentation is required, and how to implement technical safeguards. |

---

### 5. Discriminative AI vs Generative AI

**初級 L114 (鑑別式AI與生成式AI概念) vs 中級 L211 (AI相關技術應用) + L224 (大數據在AI之應用)**

| Aspect | 初級 | 中級 |
|---|---|---|
| Scope | **Conceptual distinction**: what discriminative AI does vs what generative AI does, their purposes, characteristics, application scenarios (computer vision, speech recognition, content generation), and the idea that they can be combined. Basic deployment and performance management as concepts. | **Technical depth per modality**: NLP techniques (tokenization, transformers, fine-tuning), computer vision pipelines (CNNs, object detection architectures), generative model architectures (GANs, diffusion models, LLM internals), multimodal AI systems, and how big data fuels both discriminative and generative models. |
| Depth | Compare and contrast at the concept level -- "Discriminative models classify inputs; generative models create new data." | Architectural understanding -- "A transformer uses self-attention to weigh token relationships, enabling parallel processing unlike RNNs." |
| Example language | "Discriminative AI powers spam filters by learning to classify emails as spam or not-spam. Generative AI powers ChatGPT by learning to produce human-like text. Some systems combine both, using discriminative AI to filter and generative AI to respond." | "GPT-class models use decoder-only transformer architectures with causal attention masks. Training on large-scale web corpora with next-token prediction enables emergent capabilities like in-context learning." |
| Math/Code | None | Basic (attention mechanism intuition, loss function names, architecture diagrams) |
| **Rule** | **初級 covers the what and why of discriminative vs generative AI.** Explain purposes, characteristics, and application scenarios at a conceptual level. Mention model deployment and performance management only as concepts ("models need to be deployed and monitored"). Never explain internal architectures, name specific neural network layers, or describe training procedures. | **中級 assumes the conceptual distinction and teaches technical implementation per modality.** Never re-explain "discriminative AI classifies, generative AI creates" -- go straight to how NLP, CV, and generative systems work internally, their architectures, and their data requirements. |

---

## Topics Unique to 初級 (No Overlap)

These topics exist only in the 初級 syllabus. Content generators have full creative freedom here -- no boundary constraints apply.

| Code | Topic | Notes |
|---|---|---|
| L121 | **No Code / Low Code 概念** | Basic concepts, advantages, and limitations of no-code/low-code platforms. Unique to beginner because 中級 assumes students can already code or use technical tools. |
| L122 | **生成式AI應用領域與工具使用** | Specific GenAI tools (ChatGPT, Midjourney, Copilot, Cursor, Gemini), prompt engineering (frameworks, design, optimization), RAG concepts, and AI tool integration. This is the practitioner-tools topic that has no 中級 equivalent because 中級 focuses on building/deploying AI systems rather than using GenAI tools. |
| L11101 | **AI的定義與分類** | Foundational AI taxonomy -- what AI is, narrow vs general AI, AI subfields. 中級 assumes this knowledge. |
| L11201 | **資料基本概念與來源** | What data types exist, structured vs unstructured, data sources. 中級 assumes this vocabulary. |

---

## Topics Unique to 中級 (No Overlap)

These topics exist only in the 中級 syllabus. They are listed here so content generators for 初級 know to **never drift into these areas**.

| Code | Topic | Why 初級 must avoid |
|---|---|---|
| L221 | **機率統計基礎** (descriptive statistics, probability distributions, hypothesis testing) | 初級 never uses statistical formulas or tests. |
| L222 | **大數據處理技術** (data collection/cleaning engineering, storage systems, processing tools) | 初級 covers data pipeline concepts only, never specific tools or infrastructure. |
| L223 | **大數據分析方法與工具** (statistical methods in big data, analysis techniques, visualization tools) | 初級 mentions "data visualization" only as a pipeline step, never teaches specific tools. |
| L231 | **機器學習基礎數學** (probability/statistics for ML, linear algebra for ML, optimization techniques) | 初級 has zero math. Any formula or equation is out of scope. |
| L232 | **機器學習與深度學習** (algorithm internals, specific algorithms, DL frameworks) | 初級 covers ML taxonomy only. Algorithm mechanics belong to 中級. |
| L233 | **ML建模與參數調校** (feature engineering execution, model selection, training pipelines, tuning) | 初級 mentions feature engineering and model training as concepts only. |
| L213 | **AI技術應用與系統部署** (system architecture design, model deployment engineering, cloud infrastructure) | 初級 mentions deployment as a concept. System design and cloud infrastructure are 中級 territory. |

---

## Quick-Reference Depth Calibration

Use this table to instantly check if a sentence belongs in 初級 or 中級:

| If the sentence... | It belongs in... |
|---|---|
| Defines a term or explains what something is | 初級 |
| Names a tool and explains when to use it | 初級 |
| Shows a formula, metric calculation, or code snippet | 中級 |
| Describes how an algorithm works internally | 中級 |
| Lists risk categories or names a regulation | 初級 |
| Explains how to implement a compliance program | 中級 |
| Compares GenAI tools for a business task | 初級 |
| Designs a multi-system AI architecture | 中級 |
| Uses the phrase "for example, ChatGPT can..." | 初級 |
| Uses the phrase "the transformer architecture uses..." | 中級 |
| Discusses prompt engineering techniques | 初級 |
| Discusses model fine-tuning techniques | 中級 |
