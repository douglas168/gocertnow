# Accuracy Review — L22404: 大數據隱私保護、安全與合規
Date: 2026-04-30
Reviewers: Gemini (rate-limited, no output), Codex (broken — model error), Claude Sonnet 4.6 (sole adversarial reviewer)

## Summary
The guide covers anonymization (k-anonymity, ℓ-diversity, t-closeness), differential privacy (ε, δ, Laplace/Gaussian mechanisms, composition), federated learning (FedAvg, Secure Aggregation, Horizontal/Vertical FL), encryption (AES-256 at rest, TLS 1.3 in transit, Homomorphic Encryption), access control (RBAC/ABAC/column-level), and compliance (Taiwan PDPA, GDPR, ISO/IEC 27701). This is the most regulation-dense lesson in the series. Several claims require verification against primary sources. One potentially significant claim about ISO/IEC 27701:2025 needs flagging.

## Critical Errors (must fix before publishing)

- **ISO/IEC 27701:2025 "可獨立使用" (standalone) claim needs verification:** The guide states "ISO/IEC 27701:2025 是可獨立使用的管理系統標準." The original ISO/IEC 27701:2019 was explicitly designed as an extension to ISO/IEC 27001/27002 and could NOT be used standalone. As of April 2026, a 2025 revision has been widely anticipated and its publication has been reported — it is designed to be a standalone Privacy Information Management System (PIMS) standard. However, the exact publication date and official standalone status should be verified against the ISO catalogue before the 5/23 exam. If the 2025 revision has been confirmed published, the claim is correct. If it's still in draft (DIS/FDIS stage), telling students "ISO/IEC 27701:2025 is standalone" could cause exam errors if official study materials still reference the 2019 version. **Action:** Verify ISO catalogue. The guide's Trap 9 appropriately caveats this by distinguishing 2019 vs 2025. The claim is directionally correct but the publication status should be confirmed.

- **GDPR Art.33 — 72-hour notification is conditional, not absolute:** The guide states "72 小時外洩通報主管機關." GDPR Art.33 is accurate — data controllers must notify the supervisory authority within 72 hours of becoming aware of a personal data breach UNLESS the breach is "unlikely to result in a risk to the rights and freedoms of natural persons." The guide presents it as unconditional. For exam purposes, "72 hours" is the standard test-taking answer, but adding the caveat "unless the breach is unlikely to result in risk" prevents a student from being tripped up by a distractor option. **Severity: Minor** — the exam-level answer is correct, but the absolute framing is technically incomplete.

## Minor Issues

- **Taiwan PDPA Art.12 — no explicit timeframe in the article:** The guide correctly identifies Art.12 as breach notification to data subjects. Taiwan's Art.12 does NOT specify a fixed timeframe (unlike GDPR Art.33's 72 hours). The guide correctly distinguishes this from GDPR's 72-hour clock. No error.

- **Taiwan PDPA Art.27 deprecation:** The guide notes "2025-11-11 修法已公告刪除個資法第 27 條但施行日未定." This is an important live-issue flag. Students sitting the 5/23/2026 exam should know: if exam questions reference Art.27 as current law, treat it as the "适當安全措施" article. If the exam has been updated to post-amendment curriculum, Art.27 may be removed from scope. The guide's handling of this ambiguity is appropriate.

- **Differential Privacy composition theorems:** The guide states "順序組合：ε_total = ε1 + ε2 + … + εn; 平行組合：取最大 ε." These are correct under basic (ε,0)-DP (pure DP). For (ε,δ)-DP (approximate DP), advanced composition provides tighter bounds (ε doesn't simply add linearly). The guide's simplification is appropriate for an exam context but should note it applies to pure DP. The Gaussian mechanism produces (ε,δ)-DP, and the composition theorem for δ is correctly stated as additive. No practical error for exam-level questions.

- **FedAvg "n_k / N 加權" description:** The guide describes FedAvg as "依各客戶端資料量加權平均模型 (n_k/N 加權概念)." This is the standard FedAvg description from the McMahan et al. 2017 paper and is accurate.

- **Homomorphic Encryption framing:** The guide says "不解密仍可在密文上運算." This is accurate. The guide correctly does not overstate HE's practical deployment — it remains computationally expensive. No error.

- **GDPR Art.25 — "Privacy by Design and by Default":** Correct article. Art.25 specifically requires data protection by design (technical measures from inception) and by default (only necessary data by default). The guide's mapping is accurate.

- **GDPR Art.32 — "Security of Processing":** Correct article. Art.32 covers encryption, pseudonymisation, confidentiality/integrity/availability/resilience (CIA + resilience), and recovery testing. The guide's mapping is accurate.

## Missing Key Concepts
- **Pseudonymisation (假名化):** GDPR Art.32 explicitly names pseudonymisation alongside encryption as a measure. The guide mentions it briefly (in the Art.32 Exam Rule line) but does not explain it as a distinct concept. For the GDPR security section, pseudonymisation vs anonymisation is a common distinction to test.
- **Data Processing Agreements (DPA) / 資料處理協議:** GDPR Art.28 requires written contracts with data processors. Not covered.
- **Right to Erasure / Right to be Forgotten (被遺忘權):** GDPR Art.17. Relevant to big data systems where deletion of individual records from trained models is a hard problem. Not covered but potentially testable.
- **Taiwan PDPA Art.6 — special categories:** Sensitive personal data (health, criminal records, etc.) requiring stricter handling. Not mentioned.
- **Gradient inversion attacks:** The guide notes FL gradients can leak information, but does not name the specific attack class (gradient inversion / deep leakage from gradients). Adding the terminology would sharpen the "FL is not absolutely safe" claim.

## Terminology Notes
- 差分隱私 (Differential Privacy): correct.
- 隱私預算 (Privacy Budget): correct.
- 聯邦學習 (Federated Learning): correct.
- 橫向 / 縱向聯邦學習 (Horizontal / Vertical FL): correct.
- 安全聚合 (Secure Aggregation): correct.
- 靜態加密 (Encryption at Rest): correct.
- 傳輸加密 (Encryption in Transit): correct.
- 同態加密 (Homomorphic Encryption): correct.
- k-匿名性 / ℓ-多樣性 / t-相近性: correct and standard Chinese translations.
- 準識別欄位 (Quasi-identifiers): correct.
- 個人資料保護法 (PDPA): correct.
- 隱私資訊管理系統 (PIMS): correct.

## Convergence Notes
Gemini: rate-limited, no output. Codex: broken. Claude was sole adversarial reviewer for this lesson. The ISO/IEC 27701:2025 standalone claim and GDPR Art.33 conditional nature are the two findings that require attention.

## Verdict
**Grade: A−** — The guide is technically sound for exam prep. The GDPR/PDPA article mappings are correct. The anonymization framework and DP composition rules are accurate at the exam level. Two items need attention: (1) verify ISO/IEC 27701:2025 publication status before the 5/23 exam, (2) add "unless unlikely to result in risk" qualifier to the GDPR Art.33 72-hour claim to prevent distractor confusion. Pseudonymisation and Right to Erasure are notable missing concepts worth adding if study time permits.
