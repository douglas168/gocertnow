# Accuracy Review — L21302: AI技術系統集成與部署
Date: 2026-04-30
Reviewers: Gemini (adversarial pass); Codex unavailable (model version error — single-reviewer synthesis)

## Summary
The guide covers the MLOps pipeline lifecycle accurately for the target scope. Core concepts (batch vs real-time inference, drift taxonomy, deployment strategies, SLI/SLO/SLA) are correctly described. Two architectural claims need nuance (Model Registry storing deployment location; Blue-Green "all at once" framing), and there are notable gaps in advanced MLOps concepts expected at 中級 level (Feature Store, model optimization, CT pipeline).

---

## Critical Errors (must fix before publishing)

- **Model Registry should NOT store "deployment location" as a primary attribute.**
  - Current claim: Model Registry stores "model name, version, training metadata, evaluation metrics, approval status, 部署位置 (deployment location)"
  - Issue: Storing active deployment location in the registry is an MLOps anti-pattern. The registry manages **artifacts, lineage, and approval state**. Active deployment endpoints/locations are managed by serving infrastructure (e.g., SageMaker Endpoints, K8s Services). Listing deployment location as a registry attribute will confuse candidates on architecture questions about registry vs. endpoint decoupling.
  - Fix: Remove "部署位置" from the registry attribute list, or add a note: "Some registries record deployment history as read-only audit trail, but active endpoint state is managed by serving infrastructure, not the registry."

- **Vertex AI "traffic split" is an endpoint feature, not a batch inference mechanism.**
  - Current claim (Exam Rule): "GCP 看到 traffic split → Vertex AI" and the cloud table maps Vertex AI batch inference to "Batch Prediction" but the exam keyword listed is only "traffic split / endpoint / model monitoring"
  - Issue: "traffic split" is a feature of Vertex AI **Online Prediction endpoints** used for A/B testing and canary rollouts. Using it as the primary identifier for Vertex AI's *batch* capability is misleading. The primary Vertex AI batch inference keyword is **Batch Prediction Job**.
  - Gemini explicitly flagged: "Mixing a feature name with a service category will lead to wrong answers on platform-specific questions."
  - Fix: Update Vertex AI exam keywords to distinguish: "batch → Batch Prediction Job; online → endpoint / traffic split / model monitoring"

---

## Minor Issues

- **Blue-green "switch all traffic at once" framing is oversimplified.**
  - Modern blue-green in AI/ML contexts uses weighted routing during cutover, not a hard instant switch. The defining characteristic of blue-green is **full environment duplication enabling instant rollback**, not the instantaneous nature of the switch. "All at once" as the distinguishing feature vs. canary is technically defensible but creates a false dichotomy.
  - For exam purposes this is acceptable, but add a note: "Blue-green切換可以是即時也可以是加權切換；定義特徵是兩套完整環境、可即時回退。"

- **Containerization description omits orchestration layer.**
  - The guide correctly states containerization ≠ high availability. However, it stops at "redundancy + autoscaling + monitoring + rollback" without mentioning **orchestration (Kubernetes/K8s)** as the standard mechanism. For 中級 candidates, "container + K8s = production-grade deployment" is expected knowledge.
  - Fix: Add one line in Trap 5: "容器化通常搭配 Kubernetes 等編排平台（Orchestration）實現自動擴展與高可用。"

---

## Missing Key Concepts

- **Feature Store** — Critical omission. 中級 candidates must understand the training-serving skew problem and how Feature Stores (centralized feature repositories with online/offline consistency) prevent it. Tools: SageMaker Feature Store, Feast, Tecton. Completely absent.

- **Model Optimization / Compression** — No mention of quantization (INT8/FP16), pruning, or knowledge distillation. Essential for deployment planning, especially for LLM inference cost and edge deployment. A 規劃師 must know why INT8 quantization is used in production.

- **CI/CD/CT Pipeline** — The guide describes CT (Continuous Training) conceptually in the pipeline but never explicitly names the CI/CD/CT paradigm. This is the foundational MLOps vocabulary and should be named explicitly.

- **Model Signature / Input-Output Schema** — Registry must store the model's expected input/output schema to prevent API-breaking changes during model updates. Absent from the registry discussion.

- **Vector Database and RAG integration** — For 2026 exam scope, system integration for AI increasingly involves vector DBs (Milvus, Pinecone, Weaviate) for RAG pipelines. L21302 covers "system integration" but never mentions this layer. At minimum, a one-line pointer to the retrieval infrastructure layer is needed.

---

## Terminology Notes

- **推論 vs 推理**: Use 推論 (Taiwan standard for "inference") throughout. The guide uses 推論 correctly — confirm this is consistent in all sections.
- **偏移 / 漂移 for Drift**: Both are used in Taiwanese AI literature. The guide uses "退化" for drift-caused degradation which is correct. Recommend standardizing on **資料偏移 (data drift)** and **概念偏移 (concept drift)** for ITRI alignment.
- **吞吐量 for Throughput**: Guide uses 吞吐量 correctly.
- **即時推論 for Real-time Inference**: Correct Taiwan standard term; guide uses this correctly.
- **容器化 for Containerisation**: Correct.
- No serious terminology errors found.

---

## Convergence Notes

Gemini reviewed this lesson (Codex was unavailable due to CLI version error). Key findings from Gemini's analysis:

- **Model Registry / deployment location**: Gemini flagged storing deployment location in registry as an "architectural anti-pattern." Well-supported by MLOps reference architectures (e.g., MLflow, SageMaker Model Registry documentation). High confidence issue.
- **Vertex AI "traffic split" conflation**: Gemini explicitly identified this as a claim that "will lead to wrong answers on platform-specific questions." High confidence issue — traffic split is an endpoint feature, not a batch feature.
- **Feature Store absence**: Gemini flagged as "fatal omission" for 中級 level. Consistent with IPAS intermediate scope which covers system integration end-to-end.
- **Model optimization absence**: Gemini flagged quantization/pruning/knowledge distillation as absent. Relevant for planning-level decisions about deployment infrastructure cost.

---

## Verdict
Two critical issues need fixing (registry deployment location attribute; Vertex AI batch vs. traffic-split conflation). The core MLOps pipeline, drift taxonomy, deployment strategy distinctions, and SLI/SLO/SLA definitions are all accurate. Coverage gaps (Feature Store, model optimization, CI/CD/CT naming) reduce depth but do not introduce wrong answers. Overall accuracy: **B — fix the two critical issues, supplement three missing topics, then suitable for 中級 exam prep.**
