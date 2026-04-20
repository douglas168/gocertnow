# 圖四：三大雲端 MLOps 平台比較

> 對應考點：雲端環境建置 — AWS SageMaker / GCP Vertex AI / Azure ML

```mermaid
graph TB
    subgraph AWS["☁️ AWS SageMaker"]
        A1[SageMaker Studio\nIDE 環境]
        A2[SageMaker Pipelines\nML 工作流程]
        A3[SageMaker Model Registry\n版本管理]
        A4[SageMaker Endpoints\n即時推論]
        A5[SageMaker Batch Transform\n批次推論]
        A6[SageMaker Model Monitor\n漂移偵測]
    end

    subgraph GCP["☁️ GCP Vertex AI"]
        G1[Vertex AI Workbench\nNotebook 環境]
        G2[Vertex AI Pipelines\nML 工作流程]
        G3[Vertex AI Model Registry\n版本管理]
        G4[Vertex AI Endpoints\n即時推論]
        G5[Vertex AI Batch Prediction\n批次推論]
        G6[Vertex AI Model Monitoring\n漂移偵測]
    end

    subgraph Azure["☁️ Azure Machine Learning"]
        Z1[Azure ML Studio\nIDE 環境]
        Z2[Azure ML Pipelines\nML 工作流程]
        Z3[Azure ML Model Registry\n版本管理]
        Z4[Azure ML Managed Online Endpoint\n即時推論]
        Z5[Azure ML Batch Endpoint\n批次推論]
        Z6[Azure ML Data Drift Monitor\n漂移偵測]
    end
```

## 🔥 考試重點對照表

| 功能 | AWS SageMaker | GCP Vertex AI | Azure ML |
|---|---|---|---|
| IDE 環境 | SageMaker Studio | Vertex AI Workbench | Azure ML Studio |
| 即時推論端點 | SageMaker Endpoint | Vertex AI Endpoint | Managed Online Endpoint |
| 批次推論 | Batch Transform | Batch Prediction | Batch Endpoint |
| 模型監控 | Model Monitor | Model Monitoring | Data Drift Monitor |
| 管道編排 | Pipelines | Vertex AI Pipelines | Azure ML Pipelines |

## MLflow 模型登錄（Model Registry）四階段

```
版本生命週期：
┌────────┐    ┌──────────┐    ┌────────────┐    ┌──────────┐
│  None  │ →  │ Staging  │ →  │ Production │ →  │ Archived │
│ 剛登錄  │    │ 測試驗證  │    │  正式上線   │    │  已封存   │
└────────┘    └──────────┘    └────────────┘    └──────────┘
     ↑              ↑                                  ↑
  剛 log        QA 測試中           可回滾         不再使用

🔥🔥 MLflow 傳統版本共 4 個階段：None / Staging / Production / Archived
（考試常見陷阱：只列 3 個，漏掉 None）
```

**🔥 雲端平台記憶口訣：「亞薩谷」**
- 亞 = AWS (Amazon)
- 薩 = SageMaker（英文諧音「沙」）
- 谷 = Google Vertex AI（Google = 谷歌）
- Azure 最後（字母順序 A 先但記憶放最後避免混淆）
