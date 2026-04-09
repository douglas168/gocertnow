# Fact Check Report: L11202 資料整理與分析流程

## Summary
- Verified claims: 22
- Flagged issues: 4

---

## Verified Claims

### Data Pipeline
- [OK] The 4-stage data pipeline (收集 → 清理 → 分析 → 呈現) is a widely recognized framework in data science education and matches sources cited (ALPHA Camp, 帆軟, 博弘雲端). The fixed ordering is standard.
- [OK] The cooking metaphor (buy ingredients → wash/prep → cook → plate) is pedagogically appropriate and does not distort the underlying concepts.

### Data Cleaning
- [OK] The 4 problem types (缺失值, 重複值, 異常值, 不一致) are standard and well-established in data quality literature.
- [OK] Definitions of each problem type are accurate and match industry usage.
- [OK] The note that outliers are not always errors (e.g., billionaire income in salary data) is correct and important.

### 4 Analytics Types
- [OK] The four types (Descriptive, Diagnostic, Predictive, Prescriptive) are correctly named and defined. This taxonomy is standard and widely attributed to Gartner's analytics maturity model.
- [OK] The core questions each type answers (What happened / Why / What will happen / What should we do) are correctly stated and match Adobe, Domo, and Gartner sources.
- [OK] The progressive/sequential relationship claim is correct. These types do represent increasing analytical maturity and each level generally builds on the previous one.

### Chart Type Recommendations
- [OK] Bar chart for comparison, line chart for trends, pie chart for composition, scatter plot/histogram for distribution — these are standard data visualization recommendations consistent with sources like Factsviz and general data viz best practices.

### Feature Engineering
- [OK] The three categories (Selection, Extraction, Transformation) match IBM's feature engineering taxonomy and are well-established in ML literature.
- [OK] Feature Selection definition (selecting relevant subset, removing irrelevant/redundant features) is accurate.
- [OK] Feature Extraction definition (creating new feature representations, compressing information) is accurate.
- [OK] Feature Transformation definition (changing representation — encoding, standardization, normalization) is accurate.

### One-Hot Encoding
- [OK] Definition as converting unordered categorical data to a binary (0/1) matrix is correct.
- [OK] The example (red/blue/green → three binary columns) correctly illustrates the concept.
- [OK] The warning that One-Hot Encoding is not suitable for ordinal data (would lose ordering information) is correct. For ordinal data, ordinal encoding or label encoding that preserves order is preferred.

### Data Leakage
- [OK] The definition — using information during training that would not be available at prediction time, causing overoptimistic performance estimates — is accurate and standard.
- [OK] The analogy (peeking at exam answers during practice) correctly conveys the concept.

### Standardization vs Normalization
- [OK] Standardization (Z-Score): transforms data to mean=0, std=1. This is correct.
- [OK] Normalization (Min-Max): scales data to a fixed range, typically 0-1. This is correct.
- [OK] The conceptual distinction — standardization focuses on relative position (distance from mean in std dev units), normalization focuses on absolute range — is correct and matches DataCamp/KDnuggets sources.

---

## Flagged Issues

### Errors

(None found.)

### Stale Information

(None found.)

### Accuracy Concerns

#### 1. [NUANCE] 60-80% data cleaning time claim

**Claim (line 100):** "資料清理...實務上可能佔整個分析工作的 60-80%"

**Assessment:** This statistic is widely cited in the data science community but its provenance is imprecise. The most commonly referenced source is a 2016 CrowdFlower (now Appen) survey that found data scientists spend ~60% of their time on "cleaning and organizing data." A 2020 Anaconda survey reported ~45% of time on data preparation. The "80%" upper bound is anecdotal and appears in blog posts but lacks a rigorous primary source.

**Risk level:** Low. For an exam study guide, this is acceptable as a commonly cited industry estimate. The range "60-80%" is defensible as a rough heuristic.

**Suggested fix:** Consider softening to "業界常引用的估計約 60-80%" or adding a brief note like "根據 CrowdFlower 2016 調查" for attribution. No change strictly required for exam prep purposes.

---

#### 2. [NUANCE] Standardization "robust to outliers" is an oversimplification

**Claim (lines 331, 389):** Standardization is described as "對異常值較為穩健" and normalization as "對異常值敏感."

**Assessment:** This is the standard teaching in introductory data science, and for exam purposes it is the expected answer. However, technically, standard Z-score standardization still uses the mean and standard deviation, both of which ARE affected by outliers. It is more accurate to say Z-score is LESS sensitive to outliers than Min-Max (because Min-Max uses only the min and max values, which are directly the outliers themselves, compressing all other data). Truly robust standardization uses median and IQR (Robust Scaler). The study guide's framing matches what DataCamp and KDnuggets teach at introductory level, and more importantly, matches what the IPAS exam expects as the correct answer.

**Risk level:** Low for exam purposes. The relative comparison (Z-score is more robust THAN Min-Max) is correct. The absolute statement could mislead advanced learners but is appropriate for this beginner cert.

**Suggested fix:** No change needed for exam prep. The current phrasing "較為穩健" (relatively robust) already uses comparative language, which is technically correct.

---

#### 3. [NUANCE] Predictive Analytics question phrasing inconsistency

**Claim:** The study guide uses two different English phrasings for the Predictive Analytics core question.

- Line 222 in the ASCII diagram: "What if?"
- Line 227 and elsewhere: "What will happen?"

**Assessment:** The standard phrasing for Predictive Analytics is "What will happen?" or "What is likely to happen?" The phrase "What if?" is more commonly associated with scenario analysis or simulation, which overlaps with Prescriptive Analytics. While minor, this inconsistency could confuse students preparing for multiple-choice questions.

**Risk level:** Low-medium. An exam question testing the English phrasing could trip up a student who memorized "What if?" from the diagram.

**Suggested fix:** Change "What if?" in the ASCII diagram (line 222) to "What will?" to match the rest of the guide and standard industry usage.

---

#### 4. [NUANCE] Four analytics types described as strictly sequential may be slightly overstated

**Claim (Exam Trap 6, line 518):** "你不可能在不知道「發生了什麼」的情況下回答「為什麼發生」" — the four types are described as strictly progressive, not independent.

**Assessment:** The progressive relationship is the standard teaching and is correct as a general principle. However, in practice, organizations sometimes implement predictive models (e.g., churn prediction via ML) without having formal descriptive or diagnostic analytics in place. The Gartner maturity model presents these as maturity levels, not strict prerequisites. For the IPAS exam, the "progressive relationship" framing is the expected correct answer, so the study guide is aligned with exam expectations.

**Risk level:** Very low. This is the correct answer for the exam.

**Suggested fix:** No change needed. The current framing matches exam expectations.

---

## Overall Assessment

The study guide is factually accurate and well-aligned with both industry-standard knowledge and IPAS exam expectations. All core definitions, taxonomies, and comparisons are correct. The four flagged items are nuance-level concerns, not errors — three require no changes, and one (the "What if?" inconsistency in the ASCII diagram) warrants a minor text fix for internal consistency.
