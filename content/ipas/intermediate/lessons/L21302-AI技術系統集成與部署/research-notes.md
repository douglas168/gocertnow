# Research Notes: L21302 AI技術系統集成與部署

Research conducted 2026-04-20 for iPAS AI 應用規劃師中級（115 年度簡章 / 115.02 評鑑內容範圍 / 114 年第二次公告試題）。

## Official Sources
- [iPAS 115.02 評鑑內容範圍參考](https://www.ipas.org.tw/api/proxy/uploads/certification_news/05a129ac3ddb4b3da23fef4abecfa0e3/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11502_20260226174411.pdf): 官方對 L21302 的一句話定義最重要；明列 AI 技術系統架構設計、模型部署、效能監控、更新管理、測試驗證、穩定性與可用性、雲端環境建置。
- [iPAS 115 年度簡章（2026-04-10 版）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 確認 L21302 屬中級科目一 L21 必考；中級每科 50 題單選，屬情境判斷型考試，不是實作題。
- [iPAS 學習資源頁：中級科目一學習指引入口](https://www.ipas.org.tw/AIAP/AbilityPageContent.aspx?pgeno=263534ef-6ab9-4ce9-a9be-4ad9a4ed7440): 官方說明學習指引用途是「掌握評鑑方向、重點說明與考題解析」；可作為備考優先來源。頁面也明列中級科目一學習指引與《製造業 AI 升級引擎》資源入口。
- [114 年第二次 AI 應用規劃師中級第一科公告試題（2025-11-20 公告）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%B8%80%E7%A7%91%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8%E8%88%87%E8%A6%8F%E5%8A%83%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000616.pdf): 已直接出現 CI、容器化部署 + Auto Scaling、PSI、Data Drift / Concept Drift 監測等題目，證明 L21302 不是只考名詞定義，而是考「哪個機制最適合該情境」。
- [AWS SageMaker AI: Real-time inference](https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html): 官方將 real-time inference 定義為低延遲互動式推論，且端點支援 autoscaling；適合對應「即時推論、SLA/SLO、水平擴展」考點。
- [AWS SageMaker AI: Batch transform for inference](https://docs.aws.amazon.com/sagemaker/latest/dg/batch-transform.html): 官方 batch transform 文件可直接對應「批次推論」；適合整理與 real-time inference 的差異。
- [AWS SageMaker AI: Model Registry Models, Model Versions, and Model Groups](https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-models.html): 官方明確說明 Model Group + versioning 結構；可支持版本管理、回滾、重新部署的教學。
- [AWS SageMaker AI: Data quality monitoring](https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor-data-quality.html): 官方說明 Model Monitor 以 baseline statistics / constraints 偵測 data drift，且可告警；很適合寫監控段落。
- [Google Cloud Vertex AI: Deploy a model to an endpoint](https://cloud.google.com/vertex-ai/docs/general/deployment): 官方說明 online inference 要先 deploy 到 endpoint，且 autoscaling 依 concurrent requests 運作；也提到模型需在 Model Registry 可見才可部署。
- [Google Cloud Vertex AI: Get online inferences](https://docs.cloud.google.com/vertex-ai/docs/predictions/get-online-predictions): 官方對 online prediction 的標準文件，可作為 real-time serving 來源。
- [Google Cloud Vertex AI: Get batch inferences](https://docs.cloud.google.com/vertex-ai/docs/predictions/get-batch-predictions): 官方明確指出 batch inference 是非即時、且「不像 online inference，batch jobs 不會 autoscale」；這是很好的考點對照。
- [Google Cloud Vertex AI: Set up model monitoring](https://cloud.google.com/vertex-ai/docs/model-monitoring/set-up-model-monitoring): 官方說明先註冊到 Model Registry、再設 monitor，且 online monitoring 需啟用 request-response logging。
- [Azure Machine Learning: Endpoints for inference](https://learn.microsoft.com/azure/machine-learning/how-to-deploy-package-models): 官方將 online endpoints 定義為 real-time inference，batch endpoints 定義為 long-running batch inference；適合整理選型表。
- [Azure Machine Learning: Deploy models to online endpoints](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-use-managed-online-endpoint-studio): 官方文件可支持 managed online endpoint、API serving、local debug、Docker 本地測試等考點。
- [Azure Machine Learning: Deploy models for scoring in batch endpoints](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-use-batch-endpoint): 官方定義 batch endpoint 為非同步批次推論；文件也展示 default deployment 與多 deployment 結構。
- [MLflow Model Registry Workflows（latest）](https://www.mlflow.org/docs/latest/ml/model-registry/workflow/): 官方最新文件已指出 model stages 已 deprecated，未來要改用 aliases / tags / separate environments；對「Current State」特別重要。
- [KServe: Canary Rollout Strategy](https://kserve.github.io/website/docs/model-serving/predictive-inference/rollout-strategies/canary): 官方文件直接覆蓋 canary deployment、流量百分比分配與 rollback。
- [KServe: System Architecture Overview](https://kserve.github.io/website/docs/concepts/architecture): 官方描述控制面/資料面、Kubernetes-based serving、scalability；可支援容器化與 K8s 服務架構敘述。
- [Google SRE Book: Monitoring Distributed Systems](https://sre.google/resources/book-update/monitoring-distributed-systems/) 與 [Service Level Objectives](https://sre.google/sre-book/service-level-objectives/): 官方 SRE 來源可用來定義 SLI/SLO/SLA、percentile latency、alert 應與可行動作綁定。

## Community Insights (exam patterns)
- [Dcard：iPAS AI 應用規劃師中級｜準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 考生回報中級科目一大量是長題幹情境題，選項常是 2 選 1，不是靠刷題背答案；對 L21302 代表要能判斷「哪個部署/監控/擴展方案最合理」。
- [Vocus：小六生也能懂的 iPAS AI 應用規劃師考前重點摘要(7)-MLOps](https://vocus.cc/article/690bd895fd897800011785b1): 社群備考材料已把 MLOps、模型部署、drift、版本管理、自動測試視為考前重點，和官方 L21302 邊界一致。
- [Vocus：iPAS AI應用規劃師中級年終報告](https://vocus.cc/article/69500026fd89780001276a3a): 社群觀察認為中級偏 AI 應用落地、系統架構選擇、雲端 vs 邊緣、跨部門情境，不偏演算法推導。
- 社群可信度低於官方題目；真正可驗證的出題模式仍以 114 年公告試題為主。
- 常見陷阱推測：
  - 把 system metrics 當成 model metrics：CPU/RAM 高不等於模型失效；資料分布漂移、PSI、信心分布變化更接近模型退化預警。
  - 把 batch / real-time 混為一談：即時服務重低延遲與端點穩定，批次推論重吞吐與非同步處理。
  - 把 rollout 策略混淆：A/B testing 是比較方案效果；canary 是小流量漸進發布；shadow mode 是只旁路比對、不影響正式回應。

## Current State (if technology topic)
- [MLflow latest docs](https://www.mlflow.org/docs/latest/ml/model-registry/workflow/): 自 MLflow 2.9.0 起，`Staging/Production/Archived` stages 已標示 deprecated；若教材仍用 stages，要註明是「考試常見傳統名詞」，現行實務更偏 aliases + tags + 分環境模型。
- [Vertex AI batch prediction docs](https://docs.cloud.google.com/vertex-ai/docs/predictions/get-batch-predictions): Google 官方目前明講 batch inference jobs 不 autoscale；命題時可拿來和 online endpoint autoscaling 對比。
- [Vertex AI deployment docs](https://cloud.google.com/vertex-ai/docs/general/deployment): 線上端點可多模型共用 endpoint 並設定 traffic split；很適合延伸到 A/B 或 gradual rollout 概念。
- [SageMaker AI docs](https://docs.aws.amazon.com/sagemaker/latest/dg/realtime-endpoints.html): AWS 官方品牌名稱已是「Amazon SageMaker AI」；若教材沿用舊稱 SageMaker，屬可接受，但最好補一行新舊名稱對照。
- [KServe Canary docs](https://kserve.github.io/website/docs/model-serving/predictive-inference/rollout-strategies/canary): v0.17 文件仍強調 canary rollout 僅支援 serverless deployment mode；不要把它講成所有模式都原生支援。
- [Azure batch endpoint docs](https://learn.microsoft.com/en-us/azure/machine-learning/how-to-use-batch-endpoint): Azure 現行官方仍將 batch endpoint 定位為 asynchronous job-based inference；不是同步 API。
- 2025-2026 沒看到會改變 syllabus 核心的重大觀念斷點；變動最大的是平台產品名稱與 MLflow registry lifecycle 實作方式。

## External Documents Found
- [AWS SageMaker deployment / inference docs](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model-options.html): 有；涵蓋 real-time、async、batch transform、endpoint autoscaling、registry。
- [AWS SageMaker Model Registry docs](https://docs.aws.amazon.com/sagemaker/latest/dg/model-registry-models.html): 有；可支撐 model group、model version、approval status、deploy from registry。
- [GCP Vertex AI prediction docs](https://cloud.google.com/vertex-ai/docs/general/deployment): 有；online prediction、batch prediction、model monitoring、traffic split 都有官方文件。
- [Azure ML endpoints docs](https://learn.microsoft.com/azure/machine-learning/how-to-deploy-package-models): 有；managed online endpoints、batch endpoints、監控指標、local debug 均可引用。
- [MLflow model registry docs](https://www.mlflow.org/docs/latest/ml/model-registry/workflow/): 有；但要注意「stages 已 deprecated」。
- [KServe docs](https://kserve.github.io/website/docs/concepts/architecture): 有；涵蓋 serving architecture、autoscaling、canary rollout、inference graph。
- [Google SRE book chapters](https://sre.google/sre-book/service-level-objectives/): 有；可作為 latency percentile、SLI/SLO、alerting 設計的權威背景。
- 台灣政府或 iPAS 官方未指定「模型部署專用外部法規/準則」；此題主要依賴官方考綱 + 雲端廠商官方技術文件，而不是法規。

## Key Findings Summary
- 114 年官方公告試題已實際考出 `CI`、`容器化 + Auto Scaling`、`PSI`、`Data Drift / Concept Drift`，代表 L21302 的考法是情境化運維判斷，不是背名詞。
- 教學主軸應以標準 MLOps pipeline 串起來：`train -> registry -> deploy/serve -> monitor -> retrain`；registry、serving、monitoring、rollback 各自的角色要能分清。
- `batch inference` vs `real-time inference` 是高機率對照題：前者偏非同步、大量資料、低即時性；後者偏 API endpoint、低延遲、SLA/SLO、autoscaling。
- 監控不能只講 CPU/記憶體；要把 `latency / throughput / error rate / drift / PSI / confidence shift` 分成「系統健康」與「模型健康」兩層。
- 更新管理要能區分 `versioning`、`rollback`、`A/B testing`、`canary deployment`、`shadow mode`；這些名詞很容易互相混淆。

## Scope Notes
- 超出本 lesson 邊界：
  - AI 治理、法遵、個資、倫理、responsible AI 框架。
  - 深入 K8s cluster operation、service mesh、Istio 細節、Terraform 細節。
  - 各雲平台 SDK / CLI 實作命令與 YAML 細節。
- MLflow `stages` 雖然是考試常見詞，但現行官方已 deprecated；建議主文仍教 stages 是什麼，同時在註記說明業界正在轉向 aliases / tags。
- Google SRE 書可用來定義 SLO / alerting，但不要延伸到完整 SRE 組織文化或 error budget 治理流程，否則會超出 L21302。
