# V3 — 產業應用地圖

> 六大產業中鑑別式AI、生成式AI、整合應用的具體場景對照

```mermaid
flowchart TB
    ROOT["🏭 產業應用地圖"]

    ROOT --> MED["🏥 醫療"]
    ROOT --> FIN["🏦 金融"]
    ROOT --> MFG["🏭 製造"]
    ROOT --> CAR["🚗 自駕車"]
    ROOT --> EDU["📚 教育"]
    ROOT --> ENT["🎮 娛樂"]

    subgraph MED_SUB["醫療 Healthcare"]
        direction LR
        MED_D["🏷️ 鑑別式\nAI影像診斷\n病理切片分類"]
        MED_G["🎨 生成式\n生成罕見病例影像\nAI撰寫病歷摘要"]
        MED_I["🔗 整合\n合成稀缺醫學影像\n→ 訓練診斷模型"]
    end
    MED --> MED_SUB

    subgraph FIN_SUB["金融 Finance"]
        direction LR
        FIN_D["🏷️ 鑑別式\n詐欺偵測\n信用評分"]
        FIN_G["🎨 生成式\n自動撰寫研究報告\n合成交易情境"]
        FIN_I["🔗 整合\n生成異常交易樣本\n→ 強化偵測模型"]
    end
    FIN --> FIN_SUB

    subgraph MFG_SUB["製造 Manufacturing"]
        direction LR
        MFG_D["🏷️ 鑑別式\n瑕疵檢測\n預測性維護"]
        MFG_G["🎨 生成式\n產品設計自動生成\n製程參數最佳化"]
        MFG_I["🔗 整合\n生成罕見瑕疵圖\n→ 提升品管準確度"]
    end
    MFG --> MFG_SUB

    subgraph CAR_SUB["自駕車 Autonomous Driving"]
        direction LR
        CAR_D["🏷️ 鑑別式\n物件偵測\n車道辨識"]
        CAR_G["🎨 生成式\n場景模擬\n合成訓練環境"]
        CAR_I["🔗 整合\n生成極端天氣場景\n→ 強化偵測魯棒性"]
    end
    CAR --> CAR_SUB

    subgraph EDU_SUB["教育 Education"]
        direction LR
        EDU_D["🏷️ 鑑別式\n學習弱點分析\n作弊偵測"]
        EDU_G["🎨 生成式\n個人化出題\nAI教學助理"]
        EDU_I["🔗 整合\n分析錯題類型\n→ 生成針對性練習"]
    end
    EDU --> EDU_SUB

    subgraph ENT_SUB["娛樂 Entertainment"]
        direction LR
        ENT_D["🏷️ 鑑別式\n推薦系統\n內容審核"]
        ENT_G["🎨 生成式\n遊戲場景生成\nAI配樂"]
        ENT_I["🔗 整合\n分析玩家行為\n→ 動態生成關卡"]
    end
    ENT --> ENT_SUB

    style MED fill:#e3f2fd
    style FIN fill:#fff8e1
    style MFG fill:#e8f5e9
    style CAR fill:#f3e5f5
    style EDU fill:#fce4ec
    style ENT fill:#e0f7fa
    style MED_D fill:#bbdefb
    style MED_G fill:#ffe0b2
    style MED_I fill:#c8e6c9
    style FIN_D fill:#bbdefb
    style FIN_G fill:#ffe0b2
    style FIN_I fill:#c8e6c9
    style MFG_D fill:#bbdefb
    style MFG_G fill:#ffe0b2
    style MFG_I fill:#c8e6c9
    style CAR_D fill:#bbdefb
    style CAR_G fill:#ffe0b2
    style CAR_I fill:#c8e6c9
    style EDU_D fill:#bbdefb
    style EDU_G fill:#ffe0b2
    style EDU_I fill:#c8e6c9
    style ENT_D fill:#bbdefb
    style ENT_G fill:#ffe0b2
    style ENT_I fill:#c8e6c9
```

🔥 考點：考試常見題型——「某銀行導入AI偵測異常交易，屬於哪一類AI？」答：**鑑別式**（分類任務）。「若該銀行同時用AI生成模擬交易來訓練偵測模型？」答：**整合應用**（合成數據增強模式）。

## Gemini Image Prompt

Create a professional infographic in dark mode (dark navy #0f172a, white text). Title: "產業應用地圖 — 鑑別式 × 生成式 × 整合". Layout: 6 industry cards in a 3x2 grid. Each card has an industry icon and name at the top (醫療, 金融, 製造, 自駕車, 教育, 娛樂), with three rows below: blue row for 鑑別式 applications, orange row for 生成式 applications, green row for 整合 applications. Each row contains 1-2 concrete examples in small text. Card backgrounds are slightly different dark shades to distinguish industries. Style: clean dashboard cards with subtle borders, modern SaaS aesthetic. Resolution 1920x1080. Traditional Chinese text only.
