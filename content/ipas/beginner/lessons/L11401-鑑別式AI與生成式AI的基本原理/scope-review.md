# Scope Review: L11401 鑑別式AI與生成式AI的基本原理

## Boundary Rule
初級 covers the **what and why** of discriminative vs generative AI. Explain purposes, characteristics, and application scenarios at a conceptual level. Mention model deployment and performance management only as concepts ("models need to be deployed and monitored"). **Never** explain internal architectures, name specific neural network layers, or describe training procedures. NO math formulas, NO probability notation like P(y|x). Model names can be mentioned as examples of which category, but NOT how they work internally. Deployment and performance metrics at concept level only -- no formulas.

## Summary
- Sections within boundary: 8
- Scope violations: 6 (3 exceeds, 0 below, 3 borderline)

## Within Boundary
- [OK] Study Guide Section 1 (lines 5-16): Exam mapping and topic intro -- appropriate overview
- [OK] Study Guide Section 2 (lines 19-75): Knowledge tree -- lists model names by category, deployment types, and performance concepts without going into internals
- [OK] Study Guide Section 3.1 (lines 80-139): Discriminative AI fundamentals -- explains purpose, characteristics, application scenarios at conceptual level; lists model names for recognition without explaining how they work
- [OK] Study Guide Section 3.2 (lines 143-218): Generative AI fundamentals -- explains purpose, characteristics, application scenarios; lists model names for categorization; line 183 correctly self-polices that GAN/VAE internals are 中級
- [OK] Study Guide Section 3.3 (lines 222-298): Testing & validation -- PoC, bias-variance tradeoff, recall vs accuracy at conceptual level; line 257 correctly notes no math formulas for bias-variance
- [OK] Study Guide Section 3.4 (lines 301-420): Deployment & performance management -- four deployment types and three performance metrics all at conceptual level with good analogies
- [OK] Study Guide Sections 4-7 (lines 424-628): Comparison tables, mnemonics, exam traps, scenario quick-judge -- all at conceptual/recognition level
- [OK] Questions Q01, Q03-Q09, Q11, Q13-Q20, Q22-Q30: Within boundary -- test scenario recognition, model categorization, deployment selection, and performance concepts

## Scope Violations

### Exceeds Level

- [SCOPE] Questions file line 24: "鑑別式AI學習的是條件概率 P(y|x)。"
  - **Why it exceeds**: Uses probability notation P(y|x), which is explicitly forbidden by the boundary rule ("NO math formulas, NO probability notation like P(y|x)")
  - **Suggested fix**: Replace with "鑑別式AI學習的是如何根據輸入資料判斷類別" or "鑑別式AI學習的是輸入和輸出之間的對應關係"

- [SCOPE] Questions file line 43: "GAN（Generative Adversarial Network）是經典的生成式模型，透過生成器和判別器的對抗學習來產生新的資料（如圖像）。"
  - **Why it exceeds**: Names specific internal architecture components ("生成器和判別器") and describes the training procedure ("對抗學習"). The boundary rule says "Never explain internal architectures" and the study guide itself correctly notes at line 183 that GAN/VAE internal architecture is 中級 content.
  - **Suggested fix**: "GAN（Generative Adversarial Network）是經典的生成式模型，能夠學習資料分布並產生全新的資料（如圖像）。名稱中的 Generative 就表示它屬於生成式。"

- [SCOPE] Questions file line 261: "SVM 不是生成式模型。它是找到資料類別之間的最佳分隔超平面，屬於典型的鑑別式方法。"
  - **Why it exceeds**: "最佳分隔超平面" describes SVM's internal mechanism (a specific geometric concept of how the algorithm works). The boundary rule says model names can be mentioned for categorization but NOT how they work internally.
  - **Suggested fix**: "SVM 不是生成式模型。它的任務是學習決策邊界來區分不同類別的資料，屬於典型的鑑別式方法。"

### Below Level
(none)

### Borderline

- [BORDERLINE] Study Guide line 97: "找到最佳的決策邊界（Decision Boundary）——就是在不同類別之間畫一條分界線"
  - **Why borderline**: "決策邊界" is used as a conceptual metaphor throughout the guide and in the boundary-map's own example language. It is an abstraction, not a specific architectural detail. However, it edges toward describing how discriminative models work internally rather than just what they do.
  - **Recommendation**: KEEP -- this is a widely-used conceptual term that appears in the boundary map's own 初級 example language and helps students understand the "what" of discriminative AI without revealing algorithm mechanics.

- [BORDERLINE] Questions file lines 214-215 (Q10 explanation): "它透過先加入噪聲再逐步去噪的過程來生成高品質圖像。"
  - **Why borderline**: Describes the diffusion model's internal generation procedure (add noise then denoise). This goes beyond merely categorizing the model as generative and begins to explain how it works.
  - **Recommendation**: SIMPLIFY -- replace with "它是生成式模型的一種，能生成高品質圖像。Stable Diffusion 就是其代表應用。" to stay at the categorization level.

- [BORDERLINE] Questions file line 480 (Q22 explanation): "推理效率（如模型壓縮、邊緣部署等）"
  - **Why borderline**: "模型壓縮" (model compression) is a technique name that was not introduced in the study guide and leans toward 中級 deployment engineering (L213). However, it appears only in a parenthetical example and does not explain the technique.
  - **Recommendation**: REMOVE the parenthetical -- change to "因此需要特別關注推理效率和成本優化" without naming specific optimization techniques.
