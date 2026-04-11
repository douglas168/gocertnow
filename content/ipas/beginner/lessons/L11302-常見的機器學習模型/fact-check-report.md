# Fact Check Report — L11302 常見的機器學習模型
Generated: 2026-04-11

## Summary

**Overall: PASS WITH ISSUES (minor)**

The L11302 study guide is technically accurate, comprehensive, and well-aligned with the research notes. It correctly handles every high-priority concept — AI/ML/DL hierarchy, all four classical paradigms (plus self-supervised and multimodal), algorithm categorization, 分類 vs 分群, K-means vs KNN, 邏輯迴歸 as classification, RL five-element vocabulary, multimodal ≠ multitask, self-supervised vs semi-supervised, accuracy paradox, and precision/recall trade-offs. Boundary compliance is excellent: no formulas, no loss functions, no gradient descent, no code, no hyperparameter values, no internal algorithm mechanics, no L11401 discriminative-vs-generative content leakage.

The small issues found are mostly presentational/taxonomic nuances (e.g., an ambiguous "深度學習（生成式）" label in scenario #23, and one scenario labeled "多模態 + 自監督式" for CLIP that deserves a light caveat). None are wrong enough to block publishing. Terminology is consistent Taiwan-standard throughout.

---

## Critical Issues (must fix before publishing)

**None.**

All high-priority factual claims were verified correct against the research notes and standard ML references.

---

## Minor Issues (recommended fixes)

### Minor 1 — Scenario #23 label ambiguous
- **Location:** Section 7, row 23: "訓練 AI 把照片寫成詩（文字風格轉換）| 深度學習（生成式）"
- **Issue:** "文字風格轉換" (text style transfer) and "照片寫成詩" (image → poem) are two different tasks. If the input is an image and the output is text, it is actually a multimodal task (image-to-text) — more aligned with scenario #24. If it is pure text style transfer, the paradigm is supervised (seq2seq) or self-supervised. Labeling it "深度學習（生成式）" is a method label, not a paradigm label, and mixes two dimensions that the rest of the guide deliberately keeps orthogonal.
- **Suggested correction:** Rephrase as either (a) "從照片自動生成詩句" → "多模態學習（影像輸入 + 文字輸出）" or (b) drop "文字風格轉換" to avoid conflating two distinct tasks. Also consider matching the same "深度學習（方法）/ 多模態（典範橫切面）" split used elsewhere in the guide.
- **Severity:** MINOR

### Minor 2 — Scenario #29 CLIP labeling
- **Location:** Section 7, row 29: "大量圖文配對資料訓練圖文共通語意空間（CLIP）| 多模態 + 自監督式"
- **Issue:** CLIP is technically trained with **contrastive learning on image-text pairs**, which in most Taiwan teaching materials (including the research notes, line 319: "CLIP（OpenAI，把圖像和文字投射到同一語意空間…）") is classified as **contrastive / self-supervised-style** training. However, strictly speaking CLIP uses naturally-paired (image, caption) data scraped from the web — some sources call this "weakly supervised" rather than pure self-supervised. The "多模態 + 自監督式" label is defensible but slightly debatable for an exam context where the distinction matters.
- **Suggested correction:** Either (a) keep as-is with a tiny footnote that "CLIP 也有人歸為弱監督", or (b) swap CLIP for a cleaner example like "BERT 預訓練" (pure self-supervised, no multimodal confusion). The current answer is unlikely to appear in this exact form on a 初級 exam, so the risk is low.
- **Severity:** MINOR

### Minor 3 — DL architecture "GAN / Autoencoder（認名即可）" line in knowledge tree
- **Location:** Section 2, line "+-- GAN / Autoencoder（認名即可）"
- **Issue:** Autoencoder appears twice in the guide — once listed under 非監督式 降維 algorithms (§3.4, line 211) and once under DL architectures (§3.8, table). This is factually correct (Autoencoder is both a neural-network-based DL method AND used for unsupervised tasks) but the guide does not explicitly call out why it appears in both places. A student may see this as an inconsistency.
- **Suggested correction:** One short sentence in §3.8 noting "自動編碼器既是深度學習方法、也常用於非監督式的降維／異常偵測——兩個分類維度都對得上"  would eliminate potential confusion. This is also a great reinforcement of the "depth × paradigm 正交" framing introduced in §3.2.
- **Severity:** MINOR

### Minor 4 — RL algorithm list slightly shorter than research notes
- **Location:** Section 3.6, algorithm names list
- **Issue:** The study guide lists only Q-learning and DQN under RL (line 290–291), while the research notes (line 221–225) also include Policy Gradient, Actor-Critic, PPO. For a 初級 exam this is fine — the two listed are the canonical pair — but if the guide aims to mirror the research notes fully, it is a minor omission.
- **Suggested correction:** Optional: add "(進階名詞，不需深入：Policy Gradient / Actor-Critic / PPO)" or leave as-is. Research notes explicitly mark these as "name only, no mechanism," so inclusion would not violate depth ceiling. Strongly **optional**.
- **Severity:** MINOR (nice-to-have only)

### Minor 5 — Table 一 "非監督式" row missing Autoencoder
- **Location:** Section 4, Table 一 row 非監督式: "K-means、階層式分群、DBSCAN、PCA"
- **Issue:** Autoencoder (used for dimensionality reduction / 降維) is listed in §3.4's bullet list of unsupervised algorithms (line 211) but is missing from Table 一. Not wrong — just inconsistent with §3.4.
- **Suggested correction:** Add Autoencoder to Table 一 non-supervised row to match §3.4, or remove it from §3.4 for consistency. Low impact.
- **Severity:** MINOR

---

## Verified Correct (spot checks passed)

1. **AI ⊃ ML ⊃ DL hierarchy** — §3.1 correctly states DL is a subset of ML (not parallel), AI contains ML which contains DL, and GenAI sits inside the DL circle. Research notes line 65–91 match. The "俄羅斯套娃" analogy is a nice mental model.
2. **ML/DL parallel misconception trap** — §3.1 and exam trap #1 correctly flag "ML 和 DL 是並列" as wrong. Matches research notes line 91.
3. **Four classical paradigms by data labeling** — §3.2, §3.3–3.6 correctly categorize: 監督(all labeled), 非監督(no labels), 半監督(few+many), 強化(reward signal). Matches research notes line 97–100.
4. **監督式 subtypes 分類 vs 迴歸 — discrete vs continuous output** — §3.3, Table 二 correctly distinguish. Mnemonic "離散→分類，連續→迴歸" matches research notes line 122.
5. **邏輯迴歸 is classification despite the name** — §3.3 line 174, exam trap #2 (line 736), and Table 二 footer all correctly flag this. Research notes line 128, 443 match.
6. **非監督式 subtypes 分群 vs 降維** — §3.4 correctly separates clustering from dimensionality reduction with examples. Matches research notes line 152–156.
7. **K-means vs KNN trap** — Table 五, exam trap #3, and scenario rows #31/#32 all correctly state K-means=非監督分群, KNN=監督分類, and explain the two different "K" meanings. Matches research notes line 432–436.
8. **RL 5-element vocabulary** — §3.6 table correctly lists Agent/智能體, Environment/環境, State/狀態, Action/動作, Reward/獎勵 with canonical translations. Matches research notes line 200–206 and glossary line 47–51.
9. **多模態 ≠ 多工 distinction** — §3.7 and Table 七 correctly state multimodal=input data types, multitask=multiple tasks. Matches research notes line 249–253.
10. **DL is a method, not a paradigm** — §3.2 (calls it "橫切面"), §3.8 ("DL 是 ML 的一種方法"), and §3.8 explicitly says DL can combine with any paradigm (CNN supervised, Autoencoder unsupervised, DQN RL). Matches research notes line 285–287.
11. **自監督 vs 半監督 distinction** — §3.9, Table 八, exam trap #6 all correctly state self-supervised has no human labels (labels from data structure) vs semi-supervised has few human labels. LLM pretraining (GPT/BERT/Claude) correctly labeled self-supervised. Matches research notes line 265–274.
12. **Classification metrics — intuitive, no formulas** — §3.10 table describes Accuracy/Precision/Recall/F1 in plain Chinese only. Line 441 explicitly says "不要去背 Precision = TP/(TP+FP) 這類的算式". Matches research notes line 340–345 boundary.
13. **Confusion matrix 2x2 — structure only, no math** — §3.10 ASCII diagram shows TP/FP/FN/TN layout only, with plain Chinese intuition ("狼來了", "漏網之魚"). No formulas. Matches research notes line 327–336.
14. **Accuracy paradox** — §3.10 correctly explains with 99% fraud example: "永遠預測正常" model gets 99% accuracy but useless. Matches research notes line 351–356.
15. **Precision vs Recall scenarios** — §3.10, §6 mnemonic, Table 九 all correctly map medical/fraud/disaster → Recall and spam filter/recommendation → Precision. Matches research notes line 360–371.
16. **CNN/RNN/LSTM/Transformer/GAN/Autoencoder — name-only** — §3.8 table gives one-line "擅長領域" for each without internal mechanics. No attention mechanism, no convolution formulas, no backprop. Boundary-compliant.
17. **Supervised algorithm list** — §3.3 correctly lists 線性迴歸、邏輯迴歸、決策樹、隨機森林、SVM、KNN、單純貝氏、神經網路. Matches research notes line 126–134.
18. **Unsupervised algorithm list** — §3.4 correctly lists K-means、階層式分群、DBSCAN、PCA、Autoencoder. Matches research notes line 160–168.
19. **RL algorithm names** — §3.6 lists Q-learning and DQN (canonical two). Matches research notes line 220–225 (subset, minor gap noted above).
20. **Taiwan terminology consistency** — 監督式 (not 有監督), 非監督式 (not 無監督), 分群 (not 聚類), 單純貝氏 (not 樸素貝葉斯), 強化式 (not 增強), 迴歸 (not 回歸), 神經網路 (not 神經網絡), 支援向量機 (not 支持向量機), 主成分分析, 召回率, 精確率, 準確率 — all Taiwan-preferred forms used throughout. Matches glossary line 13–59.
21. **AlphaGo as RL canonical example** — §3.6, scenario #6 correctly cites AlphaGo as the RL milestone with DeepMind's 2016 defeat of 李世乭. Factually correct.
22. **GPT as self-supervised example** — §3.9, scenario #9, exam trap #6 all correctly label ChatGPT/GPT predictive training as self-supervised. Factually correct (next-token prediction from raw text).
23. **Accuracy paradox examples** — Fraud (99:1), cancer screening, spam (2:98) all correctly explain the imbalanced-class trap. Matches research notes line 351–354.
24. **RLHF mention** — §3.6 correctly notes "大型語言模型的 RLHF（ChatGPT 訓練後期用到）". Factually accurate.
25. **Regression metrics (MAE/RMSE/R²) — name + intuition only** — §3.10 table gives one-line intuition, explicitly says "不需要背任何公式". Matches research notes line 376–382.

---

## Boundary Violations

**None found.**

Explicitly checked for:
- **Formulas** — None. Precision/Recall/F1/R²/MAE/RMSE are all explained in plain Chinese intuition only; §3.10 line 441 explicitly prohibits formula memorization.
- **Loss functions** — None (no cross-entropy, MSE, hinge loss, etc.).
- **Gradient descent / backpropagation / optimizers** — None.
- **Algorithm pseudocode** — None.
- **Code** — None (no Python, scikit-learn, TensorFlow, PyTorch).
- **Internal mechanics of specific algorithms** — None. SVM kernels, decision tree splits, K-means centroid updates, Transformer attention — all absent.
- **Hyperparameter numerical values** — None. No learning rates, batch sizes, K values with numbers, etc.
- **L11401 (discriminative vs generative AI) content leakage** — None. The guide mentions "生成式 AI (GenAI)" as a contextual placement inside DL circle and references Transformer/GAN as architectures, but does NOT enter the discriminative-vs-generative paradigm discussion that belongs to L11401. "生成式" appears only as a descriptor in a few places (GPT, GAN, scenario #23) without taxonomic explanation.
- **L11301 (train/val/test, overfitting) content duplication** — Minimal and deliberate: §3.10 says "callback to L11301 的測試集" and scenario #19 labels it as "(L11301 callback)" — correctly treating it as a callback, not new content.

The guide stays firmly within the L11302 scope: taxonomy + paradigm identification + concept-level metric intuition. Depth ceiling respected throughout.

---

*Fact-check complete. Recommend publishing after the minor fixes above (or even as-is — none are blocking).*
