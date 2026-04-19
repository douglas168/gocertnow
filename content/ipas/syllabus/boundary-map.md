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

### 4. Generative AI Tools & Techniques

**初級 L122 (生成式AI應用領域與工具使用) vs 中級 L21103 (生成式AI技術與應用) + L21104 (多模態人工智慧應用)**

| Aspect | 初級 | 中級 |
|---|---|---|
| Scope | **Tool-level usage**: naming and using specific GenAI tools (ChatGPT, Midjourney, Copilot, Cursor, Gemini, OpenAI API) across text/image/audio domains; prompt engineering (frameworks, design, optimization); RAG as a usage pattern; AI tool integration into workflows. | **Technical architecture**: how generative and multi-modal systems work internally -- Transformer/decoder-only LLM structure, Diffusion model denoising process, GAN generator-discriminator training loop, and multi-modal fusion architectures (early fusion, late fusion, cross-attention between text/image/audio encoders). |
| Depth | Operate the tool and write effective prompts -- "Given a task, pick the right tool and craft a prompt that gets a usable output." | Explain and compare architectures -- "Given a modality and data constraint, justify why diffusion outperforms GAN for high-resolution image synthesis, or why cross-attention is needed in a vision-language model." |
| Example language | "To generate marketing copy, use ChatGPT with a CO-STAR prompt (Context, Objective, Style, Tone, Audience, Response). For product images, use Midjourney with a style reference. Combine both with a RAG workflow when the copy must cite internal product specs." | "Stable Diffusion iteratively denoises a latent from pure Gaussian noise using a U-Net conditioned on CLIP text embeddings. Multi-modal models like CLIP align text and image encoders by contrastive loss over paired samples, enabling zero-shot classification." |
| Math/Code | None -- no architecture diagrams, no loss functions, no training steps | Required -- architecture diagrams, loss function names (contrastive, cross-entropy, reconstruction), forward/reverse diffusion intuition, attention mechanism math at a descriptive level |
| **Rule** | **初級 stays at tool operation and prompt craft.** Name tools, show prompt templates, describe RAG as "retrieve relevant docs then ask the LLM". Never name internal model components (encoder, decoder, attention heads, U-Net, latent space), never show training loops, and never compare architectures. If a sentence contains "Transformer", "Diffusion", "GAN" as architecture names rather than tool categories, it belongs in 中級. | **中級 starts at architecture.** Assume the student can already use ChatGPT and write prompts -- do not reteach prompt engineering. Instead, explain how LLMs, diffusion models, GANs, and multi-modal fusion work internally, what training data and loss functions they require, and how architectural choices drive capability differences. |

---

### 5. Discriminative vs Generative AI

**初級 L114 (鑑別式AI與生成式AI概念 -- L11401 原理 + L11402 整合應用) vs 中級 L211 (AI相關技術應用 -- L21101 NLP, L21102 CV, L21103 生成式, L21104 多模態)**

| Aspect | 初級 | 中級 |
|---|---|---|
| Scope | **Conceptual distinction and use-case mapping**: discriminative AI classifies/predicts, generative AI creates; their purposes, characteristics, application scenarios (computer vision, speech recognition, content generation); the idea that they can be combined in a single product; model deployment and performance management as concepts. | **Specific algorithm families per modality**: NLP (BERT, Transformer encoders, tokenization, fine-tuning for sentiment/classification); CV (CNN, YOLO, object-detection pipelines, image-classification architectures); 生成式 (GAN generator-discriminator, Diffusion denoising, LLM decoder-only); 多模態 (fusion architectures joining text/image/audio encoders). |
| Depth | Identify the correct category for a given scenario -- "Is an email spam filter discriminative or generative? Why?" | Select and justify an algorithm family per task -- "For real-time object detection in video, use YOLO rather than a two-stage R-CNN because single-shot inference meets the latency budget." |
| Example language | "A spam filter is discriminative AI -- it learns the boundary between spam and not-spam. ChatGPT is generative AI -- it produces new text. A customer-service bot may combine both: a classifier routes the question, then an LLM drafts the reply." | "BERT uses bidirectional Transformer encoders with masked language modeling, making it strong for classification and extraction. YOLO divides an image into a grid and predicts bounding boxes per cell in one pass, trading some accuracy for speed versus Faster R-CNN." |
| Math/Code | None -- no algorithm names as architectures, no architectural diagrams | Required -- algorithm names (BERT, CNN, YOLO, GAN, Diffusion), architectural descriptions, training-objective names |
| **Rule** | **初級 covers the conceptual distinction and maps scenarios to category.** Explain what each category does, name application scenarios (CV, speech, content gen), and state that systems can combine both. Never name a specific algorithm as an architecture (no BERT, CNN, YOLO, GAN, Diffusion, Transformer-as-architecture). Model deployment and performance are mentioned only as concepts ("models need to be deployed and monitored"). | **中級 assumes the conceptual split and teaches algorithm families per modality.** Never re-explain "discriminative classifies, generative creates" -- instead, given a modality (NLP / CV / 生成 / 多模態), introduce the dominant algorithm families, their training objectives, and their selection criteria. |

---

### 6. AI Governance, Risk & Data Privacy

**初級 L11102 (AI治理概念) + L11203 (資料隱私與安全) vs 中級 L21203 (AI風險管理) + L22404 (大數據隱私保護、安全與合規) + L234 (L23401 數據隱私、安全與合規 + L23402 演算法偏見與公平性)**

| Aspect | 初級 | 中級 |
|---|---|---|
| Scope | **Policy awareness and framework names**: existence of AI governance frameworks (EU AI Act, 數位發展部《公部門人工智慧應用參考手冊》, 金管會《金融業運用AI指引》, 《AI產品與系統評測》); categories of AI risk (ethical, privacy, security, compliance); basic data privacy rules (consent, minimization, retention); awareness that bias exists. | **Practitioner-level risk and privacy execution**: risk identification methodologies, responsible AI (負責任AI) implementation, algorithm bias detection and mitigation (data-source bias, model bias, fairness metrics like disparate impact), data-level privacy techniques (differential privacy, federated learning, anonymization, encryption-at-rest), and law-compliance techniques (GDPR right-to-explanation, 個資法 mapping, audit logging). |
| Depth | Name the framework, recognize the risk -- "The EU AI Act defines risk tiers; GenAI outputs can hallucinate; personal data needs consent." | Identify, measure, mitigate -- "Run a disparate-impact check on model predictions across protected groups; if the 80% rule is violated, apply reweighting or adversarial debiasing and document the change in the model card." |
| Example language | "AI governance means setting rules so AI is used responsibly. Taiwan's 數位發展部 published a public-sector AI reference handbook. Organizations should collect only the personal data they need and inform users how it will be used." | "For a training dataset containing PII, apply k-anonymity or differential privacy with an epsilon budget before model training. During deployment, log every inference on regulated decisions and retain audit trails to satisfy GDPR Article 22 right-to-explanation." |
| Math/Code | None -- no fairness metric formulas, no privacy budget math | Basic -- fairness metric names and formulas (disparate impact ratio, equal opportunity), privacy budget (epsilon, delta) at a descriptive level, bias-mitigation technique names |
| **Rule** | **初級 stays at awareness -- names, categories, why-it-matters.** Name frameworks and regulators, list risk categories, state privacy principles (consent, minimization, retention). Never show a fairness formula, never name a specific bias-mitigation algorithm (reweighting, adversarial debiasing, reject-option classification), and never describe privacy-engineering techniques (differential privacy mechanisms, federated learning architecture). The deepest you go on bias is "models can reflect biases in training data, so organizations should monitor fairness." | **中級 assumes awareness and teaches execution.** Never re-introduce what the EU AI Act is -- instead explain how to classify your system under it and what documentation/controls follow. Teach how to detect bias (metrics, audit procedures), how to mitigate it (technique names), and how to engineer privacy into data and model lifecycles. |

---

## Internal 中級 Boundaries (L22 大數據組 ↔ L23 機器學習組)

> These sections are critical because a 機器學習組 (L23) student and a 資料分析組 (L22) student will otherwise see duplicated material. Each rule says: this item teaches X, that item teaches Y, do not overlap.

### 7. Data Preparation & Feature Engineering (內部劃分)

**L22201 (數據收集與清理, under 大數據處理技術) vs L23301 (數據準備與特徵工程, under ML建模與參數調校)**

Context: 初級 L11202 already covers the concept layer (what data collection / cleaning / feature engineering are). 中級 splits execution between data-pipeline scale (L22) and model-input preparation (L23).

| Aspect | L22201 | L23301 |
|---|---|---|
| Scope | **Large-scale data collection and cleaning pipelines**: ingestion from heterogeneous sources, data preprocessing at volume, feature extraction as part of an ETL pipeline, handling missing/duplicate/malformed records across TB-scale datasets. | **Feature engineering for model training**: transforming cleaned data into model-ready inputs -- normalization/standardization for specific algorithms, SMOTE for class imbalance, feature selection (filter/wrapper/embedded), one-hot / target encoding, splitting train/validation/test. |
| Depth | Pipeline engineering -- "Design an ETL that ingests Kafka event streams, deduplicates in Spark, and lands cleaned records in a Delta Lake table." | Model-input engineering -- "Given a tabular dataset with 95:5 class imbalance, apply SMOTE on the training split only, standardize numeric features, and select top-K features by mutual information." |
| Example language | "Use Spark's `dropDuplicates` after window-based deduplication keyed on event_id and event_time. For missing values, impute via median within partition rather than globally to preserve per-segment distributions." | "Apply `StandardScaler` to numeric features before training an SVM (scale-sensitive). Use `SMOTE(sampling_strategy=0.5)` on the training fold only -- never on validation -- to avoid leakage. Select features with `SelectKBest(mutual_info_classif, k=20)`." |
| Math/Code | Required -- pipeline-tool code (Spark, ETL patterns, SQL), cleaning logic | Required -- scikit-learn / modelling-library code, scaler/encoder/sampler APIs, train-val-test split discipline |
| **Rule** | **L22201 owns collection and cleaning at scale -- pipeline side.** Teach ingestion sources, deduplication at volume, missing-value handling in distributed frames, feature extraction as an ETL step. Never teach SMOTE, feature selection methods, or scaler choice tied to a specific algorithm -- those belong to L23301. | **L23301 owns preparing already-clean data for a specific model.** Assume the input DataFrame is clean (L22201 did that). Teach scaling/encoding tied to algorithm assumptions, class-imbalance handling (SMOTE, class weights), feature selection, and leakage-safe train/val/test discipline. Never teach Spark pipelines or ingestion sources. |

---

### 8. Statistics in Big Data vs ML (內部劃分)

**L22301 (統計學在大數據中的應用, under 大數據分析方法與工具) vs L23101 (機率/統計之機器學習基礎應用) + L23102 (線性代數之機器學習基礎應用, both under 機器學習基礎數學)**

| Aspect | L22301 | L23101 / L23102 |
|---|---|---|
| Scope | **Statistics applied to data transformation and feature engineering at scale**: data transformation (log/Box-Cox), scaling and distribution adjustment (min-max, z-score, quantile), feature engineering driven by distribution shape -- all framed as data-preparation statistics. | **L23101**: statistics as ML algorithm foundations -- distribution assumptions behind specific models (Gaussian for LDA, Bernoulli for Naive Bayes), variance explanation in models (R², explained variance in PCA). **L23102**: linear algebra for ML -- matrix operations, eigendecomposition for PCA, SVD for dimensionality reduction, vectors/dot products as the substrate of features. |
| Depth | Reshape data so downstream analytics and models behave -- "Given a right-skewed revenue column, apply log transform before aggregating." | Explain why an algorithm works and what math it rests on -- "PCA projects data onto the top eigenvectors of the covariance matrix; the variance retained equals the sum of the selected eigenvalues." |
| Example language | "Before training, apply a quantile transform to map skewed features to a uniform distribution, which stabilizes gradient updates for distance-based models." | "(L23101) The Gaussian assumption lets LDA use class-mean differences and a shared covariance matrix to derive a linear decision boundary. (L23102) PCA decomposes X^T X into eigenvectors; keeping the top k explains ∑λ_i / ∑λ_j of total variance." |
| Math/Code | Required -- transformation formulas, scaler code, distribution-fit diagnostics | Required -- probability-distribution PDFs, eigendecomposition, SVD, variance decomposition |
| **Rule** | **L22301 owns statistics in the service of data preparation.** Teach transformations that make data analyzable or model-friendly. Never teach distribution assumptions of specific ML algorithms, never teach eigendecomposition or SVD -- those are ML-foundations territory. | **L23101 owns the probability/statistics foundations that explain why ML algorithms work.** Teach the distribution assumptions behind named models, variance explanation, and probabilistic reasoning. **L23102 owns the linear-algebra foundations** -- vectors, matrices, eigendecomposition, SVD, PCA derivation. Never re-teach scaling or transformation choices driven by data-prep needs -- that is L22301. |

---

### 9. Privacy & Compliance (內部劃分)

**L22404 (大數據隱私保護、安全與合規, under 大數據在人工智慧之應用) vs L23401 (數據隱私、安全與合規, under 機器學習治理)**

| Aspect | L22404 | L23401 |
|---|---|---|
| Scope | **Data-level privacy techniques**: differential privacy mechanisms on datasets, federated learning architecture, anonymization (k-anonymity, l-diversity), encryption-at-rest and in-transit, secure storage and access controls for big-data platforms. | **ML-lifecycle compliance**: training-data provenance and lineage, model card / datasheet documentation, GDPR right-to-explanation (Article 22), 個資法 mapping to model outputs, audit logging of inference, consent propagation from data subject to model decisions, model-retirement and data-deletion procedures. |
| Depth | Engineer privacy into the data layer -- "Given a medical dataset, apply differential privacy with ε=1.0 before sharing for training." | Engineer compliance into the model lifecycle -- "Produce a model card documenting training-data sources, known limitations, and fairness evaluations; wire inference logs to a retention store meeting audit requirements." |
| Example language | "Use federated learning so raw patient records stay on-premise at each hospital; only encrypted gradient updates are aggregated at the central server. Add a Laplace noise mechanism with ε=0.5 to published aggregates." | "Maintain a model card per deployed model listing training data source, evaluation metrics across demographic slices, and known failure modes. On every regulated inference, log input hash, model version, and decision rationale to satisfy right-to-explanation requests." |
| Math/Code | Required -- privacy budget (ε, δ), anonymization parameters, encryption choices, federated-aggregation protocols | Required -- documentation templates (model card, datasheet), audit-log schemas, lineage metadata, retention-policy code |
| **Rule** | **L22404 owns the data layer.** Teach techniques that protect the dataset itself -- differential privacy, federated learning, anonymization, encryption, access control. Never teach model cards, audit logs of inference, or lifecycle documentation -- those belong to L23401. | **L23401 owns the ML lifecycle.** Teach provenance, documentation (model cards/datasheets), right-to-explanation procedures, inference audit logging, consent propagation, and retirement/deletion workflows. Never re-teach differential privacy mechanisms or federated-learning architecture -- those are L22404. If the mitigation changes the dataset before training, it's L22404; if it documents or audits the model after training, it's L23401. |

---

## 10. Topics Unique to Each Level / Track

Quick-reference list of items with no cross-level or cross-track analog. Content generators can stay within these items without triggering boundary conflicts.

### Only in 初級 (no 中級 analog)

| Code | Topic | Why no analog |
|---|---|---|
| L11101 | AI的定義與分類 | Foundational taxonomy -- 中級 assumes this knowledge. |
| L11201 | 資料基本概念與來源 | Data vocabulary -- 中級 assumes this. |
| L121 (L12101, L12102) | No Code / Low Code 概念 | 中級 assumes students can use technical tools directly; no-code platforms are a 初級-only practitioner topic. |
| L122 (L12201, L12202) | 生成式AI應用領域與工具使用 | Tool-operation and prompt engineering -- 中級 jumps to architecture (see Section 4). |
| L12302 | 生成式AI導入規劃 (目標設置、資源分配、導入策略、測試) | 中級 L21202 covers organization-level planning with different scope; GenAI-specific導入規劃 with 因應措施/測試 is 初級-only. |
| L12303 | 生成式AI風險管理 | GenAI-specific ethical risk, 資料安全隱私, 合規性, 風險影響 framed for a planner, not a practitioner. 中級 L21203 does risk management at practitioner level across all AI, not GenAI-specific. |

### Only in 中級 (all tracks -- L21 required)

| Code | Topic | Why no 初級 analog |
|---|---|---|
| L21101 | 自然語言處理技術與應用 (BERT, Transformer, 情感分析, 文本分類) | 初級 has no NLP algorithm coverage. |
| L21102 | 電腦視覺技術與應用 (CNN, YOLO, 影像辨識, 物件偵測) | 初級 mentions 電腦視覺 only as an application scenario, never algorithms. |
| L21301 | 數據準備與模型選擇 | 初級 mentions data prep and model types as concepts; 中級 L21301 teaches selection tradeoffs. |
| L21302 | AI技術系統集成與部署 (系統架構設計, 部署技術, 效能監控, 雲端建置) | 初級 mentions deployment as a concept only. System architecture and cloud are 中級-only. |

### Only in 資料分析組 (L22 elective -- a 機器學習組 student will not see these)

| Code | Topic | Track-exclusive focus |
|---|---|---|
| L22101 | 敘述性統計與資料摘要技術 | Descriptive statistics at data-summary level. |
| L22102 | 機率分佈與資料分佈模型 | Probability models applied to data distributions. |
| L22103 | 假設檢定與統計推論 (t-test, chi-square, F-test, p-value) | Hypothesis testing framework. |
| L22201 | 數據收集與清理 | Pipeline-side data prep (see Section 7 for boundary vs L23301). |
| L22202 | 數據儲存與管理 | Database architecture, storage mechanisms. |
| L22203 | 數據處理技術與工具 (Spark, Hadoop, ETL, SQL) | Big-data processing tooling. |
| L22301 | 統計學在大數據中的應用 | Stats for data transformation (see Section 8 for boundary vs L23101/L23102). |
| L22302 | 常見的大數據分析方法 | Analytics algorithms, pattern recognition, imbalance handling at data-analysis level. |
| L22303 | 數據可視化工具 | Visualization tools and chart selection. |
| L22401 | 大數據與機器學習 (big-data characteristics' impact on ML algorithms) | The bridge topic -- framed from the data side, not the model side. |
| L22402 | 大數據應用於鑑別式AI | Data-side view of classification/prediction workloads. |
| L22403 | 大數據在生成式AI中的應用 | Data-side view of large-corpus training requirements. |
| L22404 | 大數據隱私保護、安全與合規 | Data-layer privacy (see Section 9 for boundary vs L23401). |

### Only in 機器學習組 (L23 elective -- a 資料分析組 student will not see these)

| Code | Topic | Track-exclusive focus |
|---|---|---|
| L23101 | 機率/統計之機器學習基礎應用 | Stats as ML foundations (see Section 8). |
| L23102 | 線性代數之機器學習基礎應用 | Linear algebra as ML foundations (see Section 8). |
| L23103 | 數值優化技術與方法 (演算法效率、可擴展性評估) | Optimization theory for ML -- no analog in L22. |
| L23201 | 機器學習原理與技術 | ML theoretical foundations, probabilistic inference. |
| L23202 | 常見機器學習演算法 | Specific algorithm mechanics, application, optimization. |
| L23203 | 深度學習原理與框架 | Neural network architectures, layer-level computation, model performance analysis. |
| L23301 | 數據準備與特徵工程 | Model-input-side feature engineering (see Section 7 for boundary vs L22201). |
| L23302 | 模型選擇與架構設計 | Architecture definition and pre-training configuration. |
| L23303 | 模型訓練、評估與驗證 | Training runs, generalization, stability evaluation. |
| L23304 | 模型調整與優化 | Hyperparameter tuning, optimization control, performance-improvement strategies. |
| L23401 | 數據隱私、安全與合規 | ML-lifecycle compliance (see Section 9 for boundary vs L22404). |
| L23402 | 演算法偏見與公平性 | Bias source identification (data and model) and mitigation strategy. |
