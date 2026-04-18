# LLM Training Pipeline（大型語言模型訓練三階段）

現代 LLM（ChatGPT、Claude、Gemini）的訓練通常分三階段：Pretrain → SFT → RLHF。

```mermaid
flowchart TD
    CORPUS[網路文本語料<br/>Common Crawl / 書籍 / Wikipedia<br/>~數兆 token]
    STAGE1[Stage 1 - Pretrain<br/>預訓練<br/>Next-Token Prediction]
    BASE[Base Model<br/>會接龍但不會對話]

    SFT_DATA[人工標註對話資料<br/>Supervised Fine-Tuning<br/>數萬 ~ 數十萬筆]
    STAGE2[Stage 2 - SFT<br/>監督微調]
    CHAT[Chat Model<br/>會對話但可能有害]

    PREF[人類偏好排序資料<br/>同一問題的多個回答<br/>由人類排好壞]
    RM[Reward Model<br/>獎勵模型<br/>學會打分]
    STAGE3[Stage 3 - RLHF<br/>以人類回饋強化學習<br/>PPO 演算法]
    FINAL[Aligned Model<br/>對齊人類偏好]

    CORPUS --> STAGE1
    STAGE1 --> BASE
    BASE --> STAGE2
    SFT_DATA --> STAGE2
    STAGE2 --> CHAT
    PREF --> RM
    CHAT --> STAGE3
    RM --> STAGE3
    STAGE3 --> FINAL

    classDef pretrain fill:#bfdbfe,stroke:#1d4ed8,color:#000
    classDef sft fill:#ffd7a8,stroke:#d97706,color:#000
    classDef rlhf fill:#a7e3a0,stroke:#15803d,color:#000
    class STAGE1,BASE pretrain
    class STAGE2,CHAT sft
    class STAGE3,FINAL,RM rlhf
```

## 考點重點

- **Pretrain（預訓練）**：目標是 Next-Token Prediction（下一詞預測）。學會語言的統計規律，但還不會「對話」或「遵循指令」。
- **SFT（監督微調 / Supervised Fine-Tuning）**：用人工標註的高品質對話資料微調。讓模型學會「被問問題就要回答」的格式。
- **RLHF（以人類回饋強化學習 / Reinforcement Learning from Human Feedback）**：
  - 先訓練 Reward Model（獎勵模型），讓它學會預測人類偏好。
  - 再用 PPO（Proximal Policy Optimization）演算法，以 RM 的分數為獎勵，強化 LLM 產出人類偏好的回答。
- **常見陷阱**：
  - RLHF 不是直接拿人類打分來訓練 LLM——中間有 Reward Model。
  - Pretrain 階段不需要人工標註（Self-Supervised），成本大的是算力與電力。
- **替代方案**：DPO（Direct Preference Optimization）用單一損失函數取代 RM + PPO，是 RLHF 的簡化版。
