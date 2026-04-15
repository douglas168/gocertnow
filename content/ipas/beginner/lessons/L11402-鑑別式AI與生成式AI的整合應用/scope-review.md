# Scope Review: L11402 鑑別式AI與生成式AI的整合應用

## Boundary Rule
**初級 covers the what and why of discriminative vs generative AI.** Explain purposes, characteristics, and application scenarios at a conceptual level. Mention model deployment and performance management only as concepts ("models need to be deployed and monitored"). Never explain internal architectures, name specific neural network layers, or describe training procedures.

**中級 assumes the conceptual distinction and teaches technical implementation per modality.** Never re-explain "discriminative AI classifies, generative AI creates" -- go straight to how NLP, CV, and generative systems work internally, their architectures, and their data requirements.

## Summary
- Sections within boundary: 14
- Scope violations: 2

## Scope Violations

### Exceeds Level

- [SCOPE] Line 362: "兩者**對抗式學習**，生成器越來越會騙，鑑別器越來越會抓——最終生成的圖片幾可亂真"
  - **Why it exceeds**: "對抗式學習 (adversarial training)" describes a training procedure. The boundary rule states: "Never ... describe training procedures." Naming the training paradigm and explaining how the two components iteratively improve crosses into how the model is trained, not just what it does.
  - **Suggested fix**: "GAN 內部同時包含生成器（生成式）和鑑別器（鑑別式）。生成器負責產生新內容，鑑別器負責判斷真假——兩者搭配，讓生成品質越來越逼真。" Remove the phrase "對抗式學習" and the iterative improvement mechanism description. The analogy in line 366 (counterfeit/inspector) is fine as a conceptual explanation of the relationship but should not frame it as a training loop.

### Borderline

- [BORDERLINE] Line 13: "辨認 GAN 同時包含鑑別與生成元件"
  - **Assessment**: This is fine as a conceptual statement about GAN's composition. It does not describe architecture internals. Within boundary.
  - **Recommendation**: Keep as-is.

- [BORDERLINE] Line 73: "模型名稱（SVM、GAN、GPT 等）你也能歸類了"
  - **Assessment**: Naming specific model families (SVM, GAN, GPT) as examples of discriminative vs generative classification is acceptable at 初級 -- this is taxonomy, not architecture. The boundary rule forbids explaining internal architectures, not naming models.
  - **Recommendation**: Keep as-is.

- [BORDERLINE] Line 107: "用 GAN 生成罕見瑕疵圖片"
  - **Assessment**: Naming GAN as a tool for synthetic data generation is "names a tool and explains when to use it" -- 初級 OK per the quick-reference depth check.
  - **Recommendation**: Keep as-is.

- [BORDERLINE] Line 156-157: "**生成式 AI（GAN）** 合成大量「假的瑕疵圖片」來擴充訓練資料" / "**鑑別式 AI** 用這些擴充資料訓練後，偵測瑕疵的準確度大幅提升"
  - **Assessment**: This describes the synthetic data augmentation workflow at a conceptual level (generate fake data, use it to train, result improves). It does not describe the training procedure itself (loss functions, epochs, gradient updates). The phrase "訓練後" is a high-level concept reference. Acceptable.
  - **Recommendation**: Keep as-is.

- [BORDERLINE] Line 290: "此為初級概念說明，RAG 的技術實作細節如向量資料庫、嵌入方式等屬中級內容，初級只需了解概念"
  - **Assessment**: This is a well-placed scope disclaimer that explicitly warns students about the boundary. Good practice.
  - **Recommendation**: Keep as-is.

- [BORDERLINE] Line 364: "GAN 的訓練機制如損失函數、Nash 均衡等屬中級內容，初級只需了解這個對抗協作的概念"
  - **Assessment**: The disclaimer itself is good -- it correctly marks training mechanics as out of scope. However, the surrounding text (line 362) already describes the training procedure before the disclaimer arrives. The disclaimer does not undo the violation in line 362.
  - **Recommendation**: Fix line 362 as noted in the Exceeds Level section above; keep the disclaimer.

- [BORDERLINE] Line 374: "生成式 AI（GAN/Diffusion）合成大量假資料"
  - **Assessment**: Naming "Diffusion" as a model type alongside GAN is borderline. It names a model family without explaining its internals. Per the quick-reference check, "names a tool and explains when to use it" is 初級 OK. However, "Diffusion" (diffusion models) is closer to an architecture name than a tool name. The study guide does not explain what diffusion models are or how they work, which keeps it within boundary, but it could confuse students who have no context.
  - **Suggested fix**: Consider replacing "GAN/Diffusion" with "GAN 等生成模型" to avoid introducing an unexplained architecture term. Alternatively, keep it but add a brief parenthetical: "GAN/擴散模型（Diffusion Model）等生成技術".
  - **Recommendation**: Simplify -- the term adds no exam value at 初級 and risks implying students need to know what diffusion models are.

### Below Level

No sections fall below the expected depth for 初級. The study guide thoroughly covers:
- Application scenarios across all three domains (CV, speech, NLP)
- Five integration patterns at a conceptual level
- Industry application mapping
- Scenario-based judgment frameworks
- Common exam traps with correct reasoning

All core concepts expected at 初級 for L11402 are present and appropriately addressed.
