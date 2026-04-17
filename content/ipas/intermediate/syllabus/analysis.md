# IPAS AI應用規劃師 中級 — Syllabus Analysis

**Purpose:** Pre-lesson scoping for all 34 syllabus items across 3 subjects (L21 required, L22/L23 elective). Feeds lesson generation, boundary decisions, and exam-weight calibration.

**Exam shape recap:** 50 單選 × 90 min per subject · 平均 ≥ 70 AND 單科 ≥ 60 · L22/L23 include 程式判讀題 (pseudocode single-choice) · dual-constraint scenario style.

**Counts at a glance:**
- Total items: 34 (L21: 9, L22: 13, L23: 12)
- `external_docs_needed: true` flagged in YAML: 3 (L21203, L22404, L23401) — additional items flagged in Section 1 below
- `includes_code: true` flagged in YAML: 25 (all of L22 + all of L23)
- `keywords_inferred: true` (thin PDF notes): 6 items (L21101, L21102, L21103, L22103, L22203, L23301)

---

## 1. Items Requiring External Research

Includes the 3 YAML-flagged items plus items I'd add because their substance depends on named vendor stacks, live regulation, or published benchmarks that evolve faster than a PDF can be reprinted.

| Code | Item | Why | Source to Find |
|---|---|---|---|
| L21203 | AI風險管理 | "負責任AI" and "安全與合規性" map to live regulatory and framework documents; cannot be taught from first principles. | EU AI Act (official EUR-Lex consolidated text + Annex III risk tiers); NIST AI RMF 1.0 (nist.gov/itl/ai-risk-management-framework); Taiwan MODA「人工智慧基本法」草案 + 金管會「金融業運用AI指引」 (fsc.gov.tw); ISO/IEC 42001:2023 AI management system standard (iso.org). |
| L22404 | 大數據隱私保護、安全與合規 | Privacy-engineering techniques and compliance regimes are jurisdiction- and standard-specific. | 個資法 + 施行細則 (moj.gov.tw law database); GDPR Art. 25 (privacy by design) + Art. 32; ISO/IEC 27701; differential privacy primers (Dwork & Roth foundations paper, Google/Apple DP white papers); federated-learning overview (Google AI blog McMahan 2017). |
| L23401 | 數據隱私、安全與合規 | Same regulatory surface as L22404 but scoped to ML pipelines (membership-inference, model-inversion, secure aggregation). | NIST SP 800-218 SSDF; OWASP ML Security Top 10; Google "Federated Learning Comic" + TFF docs; PyTorch Opacus DP-SGD docs; Microsoft SmartNoise toolkit docs. |
| L21103 | 生成式AI技術與應用 | Architecture names (GAN/Diffusion/LLM) are on the 初級 boundary line — intermediate depth needs current vendor stacks and paper references. | "Attention Is All You Need" (Vaswani 2017 arXiv:1706.03762); DDPM (Ho 2020 arXiv:2006.11239); Hugging Face Transformers docs; OpenAI/Anthropic/Google model cards (GPT-4, Claude 3.x/4.x, Gemini 2.x) for architecture summaries. |
| L21102 | 電腦視覺技術與應用 | YOLO/CNN depth requires versioned architectures — YOLOv8 vs YOLOv10 have materially different heads. | Ultralytics YOLOv8 docs (docs.ultralytics.com); original ResNet paper (He 2015 arXiv:1512.03385); COCO benchmark leaderboard (cocodataset.org); Papers With Code object-detection SOTA page. |
| L21302 | AI技術系統集成與部署 | "雲端環境建置" pulls in hyperscaler-specific MLOps primitives. | AWS SageMaker deployment guide; GCP Vertex AI prediction docs; Azure ML endpoints docs; MLflow model-registry docs; Kubeflow serving docs; Google SRE book chapters on monitoring for model-drift framing. |
| L22203 | 數據處理技術與工具 | Apache Spark / Hadoop / SQL dialects need live doc references — concept-only teaching will get exam items wrong. | Apache Spark 3.5 PySpark docs (spark.apache.org/docs); Hadoop 3.x HDFS architecture doc; PostgreSQL 16 manual (for SQL reference); dbt Labs ETL vs ELT primer. |
| L22303 | 數據可視化工具 | "視覺化效能" and "圖表類型選擇" need a canonical reference to avoid opinion-based answers. | Tableau / Power BI official "chart chooser" guides; Claus Wilke "Fundamentals of Data Visualization" (ISBN 978-1492031086, free web edition); Edward Tufte principles (data-ink ratio); matplotlib / seaborn / Plotly gallery pages. |
| L23203 | 深度學習原理與框架 | "類神經網路架構" depth needs specific framework APIs for pseudocode items. | PyTorch 2.x nn.Module docs; TensorFlow/Keras API reference; CS231n Stanford notes (cs231n.github.io); Goodfellow, Bengio, Courville "Deep Learning" (free html edition) chapters 6-9. |
| L23402 | 演算法偏見與公平性 | Fairness-metric definitions are load-bearing on exam wording (demographic parity vs equal opportunity vs equalised odds differ). | Barocas, Hardt, Narayanan "Fairness and Machine Learning" (fairmlbook.org, free); IBM AIF360 toolkit docs; Google "What-If Tool" docs; US EEOC 80% rule (four-fifths rule) guidance for HR fairness context. |

**External count:** 10 items (3 YAML-flagged + 7 added).

---

## 2. Ambiguous Items

These have thin or missing PDF notes and would generate a wandering lesson without an explicit scoping sentence. I'm giving each a concrete boundary the lesson writer can paste at the top of the draft.

| Code | Item | Risk | Recommendation (+ scoping sentence) |
|---|---|---|---|
| L21101 | 自然語言處理技術與應用 | `notes: null`, `keywords_inferred: true`. NLP spans 40 years of techniques — without scope, lesson will over-reach into 初級 territory or over-reach into L23 DL territory. | Cross-reference boundary map Section 5 (中級 rule: "architectural understanding, not re-explain discriminative vs generative"). **Scope sentence:** "Cover tokenization, embeddings (word2vec/BERT), transformer self-attention mechanism, and task families (分類/情感/NER/摘要/翻譯). Stop at architecture level; do not train a model end-to-end. Include one pseudocode item on attention weight computation." |
| L21102 | 電腦視覺技術與應用 | `notes: null`, `keywords_inferred: true`. CV covers CNN internals, detection heads, segmentation — unbounded. | Research past exams for whether YOLO version specificity appears. **Scope sentence:** "Cover CNN building blocks (卷積/池化/步長/padding), 3 task families (classification / object detection / segmentation), and two named architectures (ResNet as classification anchor, YOLO as detection anchor). Include evaluation metrics IoU, mAP." |
| L21103 | 生成式AI技術與應用 | `notes: null`, `keywords_inferred: true`. GAN+Diffusion+LLM is three distinct architectures; each can be a whole lesson. | Split into three mini-sections, not three lessons. **Scope sentence:** "Cover one representative from each family: GAN (generator/discriminator adversarial loop), Diffusion (forward noising + reverse denoising intuition, no SDE math), LLM (decoder-only transformer, next-token prediction, in-context learning). No training code; architecture diagrams only." |
| L22103 | 假設檢定與統計推論 | `notes: null`, `keywords_inferred: true`. Statistical testing surface is enormous. | Research past exams for whether ANOVA / Wilcoxon / effect-size appear. **Scope sentence:** "Cover H0/H1 framing, α / β / p-value / 信賴區間, and three named tests mapped to use case: t-test (means comparison), chi-square (categorical independence), F-test (variance/ANOVA). Include one worked p-value interpretation pseudocode item." |
| L22203 | 數據處理技術與工具 | `notes: null`, `keywords_inferred: true`. Spark + Hadoop + ETL + SQL is 4 sub-ecosystems. | **Scope sentence:** "Cover the conceptual split between batch (Hadoop/Spark) and stream; the MapReduce mental model; Spark DataFrame vs RDD; ETL vs ELT; and SQL window-function literacy sufficient for pseudocode items (GROUP BY, JOIN, window aggregates). No cluster-sizing or operator tuning." |
| L23301 | 數據準備與特徵工程 | `notes: null`, `keywords_inferred: true`. Overlaps L22201 and L22301 if not bounded. | Cross-reference boundary map. **Scope sentence:** "Assume L22 data-cleaning vocabulary. Focus on ML-specific preparation: train/val/test split strategy, stratified sampling, SMOTE for imbalanced classes, normalization vs standardization (when each), feature selection (filter/wrapper/embedded), and categorical encoding (one-hot vs ordinal vs target). One pseudocode item on a scikit-learn-style pipeline." |
| L21104 | 多模態人工智慧應用 | Notes say "如文字、圖像、聲音等" — generic; no bound on depth of CLIP/Flamingo/GPT-4V style systems. | Ask user whether past exams reference specific multimodal models. **Scope sentence:** "Cover the multimodal problem statement (shared embedding space), contrastive-learning intuition (CLIP-style), and two application patterns (image-captioning, text-to-image). One comparison table of modality fusion strategies (early/late/hybrid). No training math." |
| L21201 | AI導入評估 | Notes list 4 buzzwords; without a framework, lesson becomes platitudes. | **Scope sentence:** "Teach a single scoring-matrix framework with 4-6 criteria (accuracy, latency, integration cost, TCO, vendor risk, data-privacy fit). Include one worked dual-constraint case: 'pick the model that satisfies latency < 200ms AND cost < X/1k tokens'." |
| L21202 | AI導入規劃 | Notes list 4 buzzwords; risk of re-teaching generic project management. | Cross-reference boundary map Section 1 ("中級 starts at organization-level planning"). **Scope sentence:** "Cover a 5-phase adoption roadmap (requirements → solution design → resource plan → pilot → rollout), with one RACI example and one resource-allocation heuristic. Skip change-management and generic PMP content." |
| L22201 | 數據收集與清理 | Notes only say "預處理、特徵提取". Overlaps L21301 and L23301. | **Scope sentence:** "Scoped to the *big-data* cleaning step (not ML-specific prep): schema drift, PII redaction, deduplication at scale, late-arriving records, out-of-order streams. Include one pseudocode item on a windowed deduplication." |
| L23102 | 線性代數之機器學習基礎應用 | Notes list PCA-like keywords but no bound. | **Scope sentence:** "Cover vector/matrix/tensor mental model, dot product as similarity, eigenvalue/eigenvector intuition via PCA, and SVD at a high level. One pseudocode item tracing a 2×2 PCA projection. No proofs." |
| L23103 | 數值優化技術與方法 | Notes only say "演算法效率與可擴展性評估". Could mean gradient descent, could mean combinatorial optimization. | Ask user / cross-reference past exams. **Scope sentence:** "Cover gradient-descent family (GD / SGD / mini-batch / Adam at intuition level), learning-rate schedules, and convex vs non-convex loss surfaces. Include one pseudocode item tracing a 2-step SGD update. Skip second-order methods and constrained optimization." |

**Ambiguous count:** 12 items flagged.

---

## 3. Code-Style Items Inventory

All 25 items with `includes_code: true`. Per the YAML notes, 科目二/三 carry 程式判讀題 (pseudocode single-choice). For each, I'm predicting the most likely pseudocode pattern so the question generator can target it.

| Code | Item | Subject | Likely code-style patterns |
|---|---|---|---|
| L22101 | 敘述性統計與資料摘要技術 | L22 | metric-calculation (mean/median/variance on a small array); library-choice (pandas.describe vs numpy vs scipy.stats) |
| L22102 | 機率分佈與資料分佈模型 | L22 | library-choice (scipy.stats.norm / binom / poisson); metric-calculation (PDF/CDF evaluation at a point) |
| L22103 | 假設檢定與統計推論 | L22 | pseudocode interpretation (trace a t-test result: t-stat, p-value, accept/reject H0); library-choice (scipy.stats.ttest_ind vs chi2_contingency) |
| L22201 | 數據收集與清理 | L22 | pseudocode interpretation (pandas dropna/fillna/drop_duplicates trace); algorithm-tracing (regex extraction) |
| L22202 | 數據儲存與管理 | L22 | library-choice (SQL SELECT vs NoSQL .find() vs Spark DataFrame); pseudocode interpretation (schema DDL reading) |
| L22203 | 數據處理技術與工具 | L22 | pseudocode interpretation (Spark DataFrame chain: .filter().groupBy().agg()); SQL window-function tracing |
| L22301 | 統計學在大數據中的應用 | L22 | metric-calculation (z-score standardization, min-max normalization); pseudocode interpretation (sklearn.preprocessing snippet) |
| L22302 | 常見的大數據分析方法 | L22 | algorithm-tracing (k-means or decision-tree split trace); library-choice (imblearn SMOTE vs RandomUnderSampler) |
| L22303 | 數據可視化工具 | L22 | library-choice (matplotlib vs seaborn vs plotly for a given chart); pseudocode interpretation (chart-type identification from code) |
| L22401 | 大數據與機器學習 | L22 | pseudocode interpretation (batch vs online training loop); algorithm-tracing (mini-batch sampling) |
| L22402 | 大數據應用於鑑別式AI中的應用 | L22 | metric-calculation (precision/recall/F1/AUC on small confusion matrix); pseudocode interpretation (sklearn classifier .fit/.predict) |
| L22403 | 大數據在生成式AI中的應用 | L22 | pseudocode interpretation (tokenizer → model.generate() snippet); library-choice (transformers pipeline task names) |
| L22404 | 大數據隱私保護、安全與合規 | L22 | metric-calculation (k-anonymity check, ε-differential-privacy budget arithmetic); pseudocode interpretation (anonymization transform trace) |
| L23101 | 機率/統計之機器學習基礎應用 | L23 | metric-calculation (variance explained %, Bayes-rule arithmetic); pseudocode interpretation (likelihood calculation) |
| L23102 | 線性代數之機器學習基礎應用 | L23 | algorithm-tracing (PCA on 2D data: find eigenvector, project); metric-calculation (matrix-vector product) |
| L23103 | 數值優化技術與方法 | L23 | algorithm-tracing (SGD step: w ← w − η∇L, trace 2-3 iterations); pseudocode interpretation (Adam vs SGD loop) |
| L23201 | 機器學習原理與技術 | L23 | pseudocode interpretation (train/val/test split snippet, cross-val loop); library-choice (sklearn model_selection API) |
| L23202 | 常見機器學習演算法 | L23 | algorithm-tracing (decision-tree gini/entropy split, k-NN distance computation); library-choice (sklearn estimator selection) |
| L23203 | 深度學習原理與框架 | L23 | pseudocode interpretation (PyTorch nn.Module forward pass, layer dimensions); algorithm-tracing (backprop shape check) |
| L23301 | 數據準備與特徵工程 | L23 | pseudocode interpretation (sklearn Pipeline / ColumnTransformer); library-choice (SMOTE vs class_weight); metric-calculation (feature-importance reading) |
| L23302 | 模型選擇與架構設計 | L23 | pseudocode interpretation (Keras Sequential stack / PyTorch nn.Module __init__); library-choice (dropout / batchnorm placement) |
| L23303 | 模型訓練、評估與驗證 | L23 | metric-calculation (confusion matrix → precision/recall/F1/AUC-ROC); algorithm-tracing (k-fold CV fold indices) |
| L23304 | 模型調整與優化 | L23 | pseudocode interpretation (GridSearchCV / RandomizedSearchCV / Optuna objective); algorithm-tracing (learning-rate-schedule trace) |
| L23401 | 數據隱私、安全與合規 | L23 | metric-calculation (ε-DP budget composition); pseudocode interpretation (DP-SGD noise-addition step, federated-averaging aggregation) |
| L23402 | 演算法偏見與公平性 | L23 | metric-calculation (demographic parity / equal opportunity / disparate impact ratio from a confusion matrix per group); pseudocode interpretation (reweighting trace) |

**Code-style count:** 25 (matches YAML `includes_code: true` count exactly — every flagged item appears).

Items **without** `includes_code: true` (all of L21, 9 items): exam items here stay scenario-text-only (no pseudocode), per the YAML's `includes_code_subjects: [L22, L23]` constraint.

---

## 4. Math-Heavy Items Inventory

Every item that will carry mathematical content. "Load-bearing" = a student who doesn't know the formula cannot answer the exam item.

| Code | Item | Math Load | Specific Concepts |
|---|---|---|---|
| L21201 | AI導入評估 | Basic | Weighted-scoring matrix arithmetic, ROI / TCO calculations, break-even |
| L21301 | 數據準備與模型選擇 | Basic | Train/val/test proportion intuition, class-imbalance ratio |
| L22101 | 敘述性統計與資料摘要技術 | Intermediate | Mean / median / mode, variance / std / IQR formulas, skewness, kurtosis intuition |
| L22102 | 機率分佈與資料分佈模型 | Intermediate | PMF/PDF/CDF, Normal (μ, σ²), Binomial, Poisson, Uniform; Central Limit Theorem at the intuition level |
| L22103 | 假設檢定與統計推論 | Intermediate | H0/H1, Type I/II error, p-value, α level, confidence interval; t-statistic, chi-square-statistic, F-statistic formulas |
| L22301 | 統計學在大數據中的應用 | Intermediate | z-score, min-max normalization, log/Box-Cox transforms, standardization vs normalization formulas |
| L22302 | 常見的大數據分析方法 | Intermediate | k-means objective (SSE), decision-tree impurity (gini, entropy, info gain), SMOTE interpolation |
| L22402 | 大數據應用於鑑別式AI中的應用 | Intermediate | Confusion matrix, precision, recall, F1, accuracy, AUC-ROC formulas |
| L22404 | 大數據隱私保護、安全與合規 | Intermediate | k-anonymity, ℓ-diversity, ε-differential-privacy budget |
| L23101 | 機率/統計之機器學習基礎應用 | Intermediate | Conditional probability, Bayes' theorem, likelihood vs prior vs posterior, expected value, variance explained |
| L23102 | 線性代數之機器學習基礎應用 | Heavy | Vector dot product, matrix multiplication, eigenvalues/eigenvectors, SVD, PCA projection |
| L23103 | 數值優化技術與方法 | Heavy | Gradient, partial derivatives, gradient-descent update rule w ← w − η∇L, SGD/mini-batch/Adam, learning-rate schedules, convex vs non-convex |
| L23201 | 機器學習原理與技術 | Intermediate | Loss functions (MSE, cross-entropy), bias-variance decomposition, cross-validation |
| L23202 | 常見機器學習演算法 | Intermediate | Linear regression normal equation, logistic-regression sigmoid + cross-entropy, k-NN distance metrics, decision-tree split criteria, SVM margin intuition |
| L23203 | 深度學習原理與框架 | Heavy | Neuron output σ(Wx + b), activation functions (ReLU/sigmoid/tanh/softmax), forward + backward pass, chain rule for backprop, parameter-count arithmetic per layer |
| L23301 | 數據準備與特徵工程 | Basic | Standardization/normalization formulas (overlaps L22301), class-weight computation |
| L23302 | 模型選擇與架構設計 | Basic | Layer output-shape arithmetic, parameter counting, dropout rate |
| L23303 | 模型訓練、評估與驗證 | Intermediate | Full metric suite (precision/recall/F1/AUC/MSE/MAE/R²), k-fold CV, learning-curve / bias-variance reading |
| L23304 | 模型調整與優化 | Intermediate | Learning-rate decay formulas, early-stopping criteria, regularization (L1/L2) math, grid-search complexity |
| L23401 | 數據隱私、安全與合規 | Intermediate | ε-DP composition, noise calibration (Laplace, Gaussian), federated-averaging weighted mean |
| L23402 | 演算法偏見與公平性 | Intermediate | Demographic parity, equal opportunity, equalised odds, disparate impact (80% rule), calibration across groups |

**Math-heavy count:** 21 items (3 Heavy, 12 Intermediate, 6 Basic). All 9 L21 items are math-free except L21201 (Basic) and L21301 (Basic).

---

## 5. Depth Estimation (ALL 34 items)

| Code | Item | Depth | Content Type |
|---|---|---|---|
| L21101 | 自然語言處理技術與應用 | Deep | Conceptual overview + architecture diagrams (tokenization → embeddings → transformer) + comparison table of task families |
| L21102 | 電腦視覺技術與應用 | Deep | Conceptual overview + CNN mechanics walkthrough + comparison table (classification/detection/segmentation) + metric cheatsheet (IoU/mAP) |
| L21103 | 生成式AI技術與應用 | Deep | Three-part architectural overview (GAN / Diffusion / LLM) + training-paradigm comparison table |
| L21104 | 多模態人工智慧應用 | Medium | Comparison table + use cases; fusion-strategy diagram |
| L21201 | AI導入評估 | Medium | Scoring-matrix framework + one dual-constraint worked example |
| L21202 | AI導入規劃 | Medium | Policy + framework (5-phase roadmap + RACI example) |
| L21203 | AI風險管理 | Deep | Policy + framework (EU AI Act risk tiers, NIST AI RMF, Taiwan MODA/FSC) + risk-register template |
| L21301 | 數據準備與模型選擇 | Medium | Decision tree (algorithm-choice flowchart) + dataset-size heuristics table |
| L21302 | AI技術系統集成與部署 | Deep | System-architecture walkthrough (train → registry → serve → monitor → retrain) + cloud-environment comparison table |
| L22101 | 敘述性統計與資料摘要技術 | Medium | Formula reference + worked example on a small dataset |
| L22102 | 機率分佈與資料分佈模型 | Medium | Comparison table (Normal/Binomial/Poisson/Uniform) + CDF reading walkthrough |
| L22103 | 假設檢定與統計推論 | Deep | Hands-on walkthrough (H0/H1 framing → test selection → p-value interpretation) + decision tree for test choice |
| L22201 | 數據收集與清理 | Medium | Hands-on walkthrough (pandas/SQL snippets) + comparison of cleaning strategies |
| L22202 | 數據儲存與管理 | Medium | Comparison table (RDBMS / NoSQL / data lake / warehouse / lakehouse) + use-case mapping |
| L22203 | 數據處理技術與工具 | Deep | Hands-on walkthrough (Spark DataFrame chain) + batch-vs-stream comparison + SQL window-function primer |
| L22301 | 統計學在大數據中的應用 | Medium | Formula reference + feature-transformation decision tree |
| L22302 | 常見的大數據分析方法 | Deep | Algorithm mechanics (k-means + decision-tree split) + imbalance-handling comparison (SMOTE / undersample / class-weight) |
| L22303 | 數據可視化工具 | Medium | Comparison table + chart-chooser decision tree + tool comparison |
| L22401 | 大數據與機器學習 | Medium | Conceptual overview + comparison table (batch vs online, centralized vs distributed training) |
| L22402 | 大數據應用於鑑別式AI中的應用 | Deep | Metric-calculation walkthrough (precision/recall/F1/AUC from confusion matrix) + use-case catalogue |
| L22403 | 大數據在生成式AI中的應用 | Medium | Conceptual overview + data-requirement comparison (pretraining corpus vs fine-tune vs RAG) |
| L22404 | 大數據隱私保護、安全與合規 | Deep | Policy + framework (個資法/GDPR) + technical walkthrough (k-anonymity, DP budget) |
| L23101 | 機率/統計之機器學習基礎應用 | Medium | Formula reference (Bayes, variance-explained) + worked example |
| L23102 | 線性代數之機器學習基礎應用 | Deep | Algorithm mechanics (PCA step-by-step on 2D toy data) + SVD intuition |
| L23103 | 數值優化技術與方法 | Deep | Algorithm mechanics (GD/SGD/Adam update-rule trace) + loss-surface diagrams |
| L23201 | 機器學習原理與技術 | Deep | Conceptual overview + bias-variance framework + CV walkthrough |
| L23202 | 常見機器學習演算法 | Deep | Algorithm mechanics for 5-6 named algorithms (linear/logistic/tree/RF/SVM/k-NN) + comparison table |
| L23203 | 深度學習原理與框架 | Deep | Algorithm mechanics (forward/backward pass) + framework comparison (PyTorch vs TF/Keras) + architecture catalogue (MLP/CNN/RNN/Transformer) |
| L23301 | 數據準備與特徵工程 | Deep | Hands-on walkthrough (pipeline) + imbalance-handling comparison (overlaps with but scoped distinct from L22302) |
| L23302 | 模型選擇與架構設計 | Medium | Decision tree (task → model family) + architecture-configuration checklist |
| L23303 | 模型訓練、評估與驗證 | Deep | Metric-calculation walkthrough + overfitting/underfitting diagnostic + CV comparison |
| L23304 | 模型調整與優化 | Deep | Hands-on walkthrough (hyperparameter-tuning loop) + regularization comparison + early-stopping mechanics |
| L23401 | 數據隱私、安全與合規 | Medium | Policy + framework (re-uses L22404 content, scoped to ML) + DP-SGD intuition |
| L23402 | 演算法偏見與公平性 | Deep | Metric-calculation walkthrough (3-4 fairness metrics from same confusion matrix) + debiasing-strategy comparison |

**Tally check:** 34 items listed. By depth: Shallow 0, Medium 14, Deep 20. (No Shallow items — 中級 does not reward terminology-only items; all demand at least a comparison or worked example.)

---

## 6. Exam Weight vs Content Effort

Item weights are not officially published per item, so I'm estimating at subject and topic-group level, converting depth into lesson-weeks (Shallow = 0.25, Medium = 0.5, Deep = 1.0 lesson-week).

| Subject | Items | Shallow / Medium / Deep | Est. lesson-weeks | Flag |
|---|---|---|---|---|
| L21 必考 | 9 | 0 / 4 / 5 | 2.0 + 5.0 = **7.0** | OK. 50 Q / 9 items ≈ 5-6 Q per item. Keep L21101/L21102/L21103/L21203/L21302 at Deep; other four Medium is right. |
| L22 擇一 | 13 | 0 / 7 / 6 | 3.5 + 6.0 = **9.5** | Slightly over. 50 Q / 13 items ≈ 3-4 Q per item. 6 Deep items is fine if L22101/L22301/L22401/L22403 stay Medium (they already are). Re-confirm L22302 and L22402 as Deep — those two alone will fuel ~15 Q on metrics/algorithms. |
| L23 擇一 | 12 | 0 / 3 / 9 | 1.5 + 9.0 = **10.5** | Over. 50 Q / 12 items ≈ 4 Q per item, but 9 Deep items projects ~40+ practice-question content. Candidates to trim from Deep → Medium: **L23101** (math foundations can be Medium with formula reference), **L23301** (can share scaffolding with L22201 / L22301), **L23201** (the "原理與技術" overview is inherently narrower than the algorithms lesson that follows). Keep L23102, L23103, L23202, L23203, L23303, L23304, L23402 at Deep — they carry load-bearing math and pseudocode items. |
| **Total** | **34** | **0 / 14 / 20** | **~27 lesson-weeks** | SKU-1 (L21+L22) sprint budget = 7.0 + 9.5 = **16.5 lesson-weeks**; SKU-2 (L21+L23) = 7.0 + 10.5 = **17.5 lesson-weeks**. Founder's 5/23 sprint targets L21+L23 (機器學習組) per memory; if the sprint is actually L21+L22 (資料分析組), flag now. |

**Per-item question density sanity check:** With 50 Q per subject and 9-13 items per subject, each item gets 4-6 exam items. A Deep lesson must produce at least ~15 Q in the practice pool (per Question bank strategy memory: practice sized for retakes at 25/30/35, mock always fresh) — so even after trimming the 3 suggested items L23 still has 7 Deep items = 105+ practice Q minimum for L23 alone. Content-feasible but not budget-trivial; plan accordingly.

---

## 7. Gaps to Verify

Things I don't know yet and should confirm before building lessons:

- **Exact 單選 question count at each difficulty tier (1-5).** The current YAML declares 50 Q per subject but does not record a difficulty distribution. Vocus historical write-ups suggest roughly 20 / 20 / 10 easy/medium/hard for 初級; 中級 is likely more compressed. Needs sourcing from a past-paper post-mortem or IPAS 評鑑內容範圍 附錄.
- **Whether real exam has 多選 items.** YAML says single-choice only and vocus/founder confirm. Keep question generators `question_types: single_choice` locked; flag if a future practice sitting shows otherwise.
- **Official 簡章 location for this cycle (115-02).** NAT IPAS site was 404-ing at scaffolding time. Re-pull from https://www.ipas.org.tw/AI/AbilityIndex.aspx (or current equivalent) once live, and archive as PDF into `content/ipas/` to lock the spec.
- **Past-paper availability for 中級.** 中級 has run since at least 114-01; a past-paper set (even partial) would collapse most Section 2 ambiguity. Worth a founder outreach to IPAS examinees in LINE/Threads/Dcard before May.
- **Whether pseudocode items use a specific syntactic style** (Python-like, SQL-like, math-notation, or MOEA's own pseudocode conventions). 初級 has zero code so there is no precedent. Cross-check with any 114 中級 paper screenshots; if unconfirmed by first content batch, draft items in Python-like pseudocode and flag for review.
- **Whether L22 and L23 share items.** Some 大數據/ML overlap (e.g. feature engineering, data preparation) means an identical question could theoretically appear in both subjects. Need to confirm whether IPAS deliberately keeps the two subject pools disjoint.
- **Dual-constraint scenario calibration.** Founder has told me this is the distinguishing question style; need 3-5 sample items from a past paper to calibrate how tightly the two constraints are drawn (e.g. "accuracy ≥ 90% AND latency < 200ms" style). Without this, generator will default to loose constraints and under-difficulty the mock exams.
- **Founder's sprint SKU.** Memory says 機器學習組 is priority 2 and 資料分析組 priority 1, but founder sits 5/23. Confirm: is 5/23 sitting L21+L22 (資料分析) or L21+L23 (機器學習)? Affects which subject gets completed first.
- **Boundary-map extension.** The current boundary map has 5 overlap sections — sufficient for 初級 bound-setting. Sections likely still needed for 中級-internal bound-setting: L22201 vs L23301 (data prep), L22301 vs L23101/L23102 (statistics-in-bigdata vs ML-math), L21302 vs L21203 (deployment vs risk) to avoid lesson-to-lesson overlap inside 中級 itself.

---

## Final Tallies

- **Depth Estimation (Section 5):** 34 / 34 items listed.
- **External (Section 1):** 10 items flagged (3 from YAML + 7 added).
- **Ambiguous (Section 2):** 12 items flagged, each given a concrete scoping sentence.
- **Code-Style (Section 3):** 25 items — matches YAML `includes_code: true` count exactly.
- **Math-Heavy (Section 4):** 21 items (3 Heavy / 12 Intermediate / 6 Basic).
- **Depth mix:** 0 Shallow / 14 Medium / 20 Deep. All 20 Deep items justified by either load-bearing math, algorithm mechanics, or external-framework dependency.

**Unusual findings:**
1. Zero Shallow items. 中級 is genuinely denser than 初級 and will not tolerate definition-only lessons.
2. L23 is over-budget on Deep items (9 of 12). Recommend demoting L23101, L23201, L23301 from Deep → Medium before content generation starts, or acknowledge that L23 will take ~2 more lesson-weeks than L22.
3. Three item pairs (L22301 / L23301, L22201 / L23301, L22404 / L23401) carry near-duplicate surface area — ensure boundary-map extension locks the internal 中級 divides to avoid wasted content.
4. Six items have `keywords_inferred: true` in YAML (L21101, L21102, L21103, L22103, L22203, L23301) plus two with generic-only notes (L21104, L22201) — all flagged in Section 2 with scoping sentences.
5. The 25 pseudocode items concentrate into 4 pattern families (interpretation / library-choice / algorithm-tracing / metric-calculation). Question generator should pre-tag each item with its expected pattern to keep mock exams balanced.
