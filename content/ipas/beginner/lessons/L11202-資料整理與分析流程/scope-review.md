# Scope Review: L11202 資料整理與分析流程

## Boundary Rule
初級 teaches data pipeline vocabulary and workflow awareness only. Explain what each step does and why it matters. NEVER show statistical formulas, SQL, Python, or tool-specific commands. Feature engineering and standardization are defined conceptually ("transforming raw features into a more useful form") — never demonstrate them with code or math.

## Summary
- Sections within boundary: 15
- Scope violations: 0
- Borderline flags: 3

## Within Boundary

- [OK] **Section 1 (Exam Mapping)**: Lists keywords and estimated question count. Pure metadata, no scope issue.
- [OK] **Section 2 (Knowledge Tree)**: ASCII concept map of the topic hierarchy. Vocabulary-level overview only. Within scope.
- [OK] **Section 3-1 (Pipeline Overview)**: Cooking metaphor for the 4-step pipeline (collect -> clean -> analyze -> present). Purely conceptual. Within scope.
- [OK] **Section 3-2 (Data Collection)**: Brief reference back to L11201, lists considerations at awareness level. Within scope.
- [OK] **Section 3-3 (Data Cleaning — 4 types)**: Defines missing values, duplicates, outliers, inconsistency with everyday analogies (104 resumes, Shopee double-order, Uber Eats pricing). No code, no tool commands, no statistical methods for detection. Within scope. (See BORDERLINE #1 below for the 60-80% claim.)
- [OK] **Section 3-4 (4 Analytics Types)**: Descriptive/Diagnostic/Predictive/Prescriptive defined with YouTube and Uber Eats analogies. Stays at "what question does each type answer" level. No statistical methods, no tool usage. Within scope.
- [OK] **Section 3-5 (Data Presentation)**: Chart selection by purpose (bar/line/pie/scatter/histogram) with simple ASCII art. Conceptual chart literacy — "when to pick which chart." No tool-specific commands (no Tableau, no matplotlib). Within scope.
- [OK] **Section 3-6 (Feature Engineering)**: Three categories (selection, extraction, transformation) defined conceptually with resume/report analogies. Extraction explicitly notes "此為中級內容，初級只需了解概念." Within scope. (See BORDERLINE #2 below for One-Hot Encoding visual.)
- [OK] **Section 3-8 (Data Leakage)**: Definition only with exam-cheating analogy. Explicitly defers prevention strategies to 中級. Within scope.
- [OK] **Section 4 (Comparison Tables)**: 5 tables comparing concepts at vocabulary level. No formulas, no code. Within scope. (See BORDERLINE #3 below for Table 4-2.)
- [OK] **Section 5 (Mnemonics)**: 4 memory hooks using Chinese character mnemonics. Pure study aids. Within scope.
- [OK] **Section 6 (Exam Traps)**: 6 traps in misconception/correction format. All corrections stay at conceptual level. Trap 3 explicitly reinforces "初級考試完全不考程式碼." Within scope.
- [OK] **Section 7 (Scenario Quick-Judge)**: 6 lookup tables mapping scenario keywords to concept categories. Decision-tree format for exam prep. No technical depth. Within scope.

## Scope Violations

### Exceeds Level
(None found.)

### Below Level
(None found.)

## Borderline Flags

### [BORDERLINE #1] Section 3-3 — "60-80% of analysis time" for cleaning

**Location:** Line 101 — "實務上可能佔整個分析工作的 60-80%"

**Concern:** This is practitioner-level knowledge (industry rule of thumb), not pure vocabulary/workflow awareness. A student might wonder "how do you know it's 60-80%?" which pulls toward practitioner experience.

**Verdict: ACCEPTABLE.** This is a widely cited factual benchmark that reinforces why cleaning matters (the "why it matters" part of the boundary rule). It does not teach how to clean data or use any tools. It also appears in Quick-Judge Table F (line 576) as a potential exam answer, suggesting it is exam-relevant. No action needed.

---

### [BORDERLINE #2] Section 3-6 — One-Hot Encoding visual transformation table

**Location:** Lines 302-311 — ASCII table showing "紅/藍/綠" mapped to binary 1/0 matrix.

**Concern:** The boundary rule says "never demonstrate [feature engineering] with code or math." This visual shows a concrete data transformation (categorical values mapped to 0/1 binary columns). Is this "demonstrating with code"?

**Verdict: ACCEPTABLE.** This is a conceptual illustration, not executable code. It shows the *idea* of One-Hot Encoding using a simple lookup table — the same way a textbook diagram would. There is no programming language, no library call, no function syntax. The questionnaire analogy (line 313: "勾選轉成 0 和 1") reinforces that this is at the "what does it do" level, not "how to implement it." The boundary rule targets code/math demonstrations; a visual concept diagram does not cross that line. No action needed.

---

### [BORDERLINE #3] Section 3-7 + Table 4-2 — Standardization details

**Location:** Lines 325-355 (Section 3-7) and Lines 385-392 (Table 4-2).

**Concern:** Multiple specific details that approach formula territory:
1. Line 325: Names the technique "Z-Score Scaling" explicitly.
2. Line 327: States "轉換後的資料平均值為 0" (transformed data has mean = 0).
3. Table 4-2, line 388: States "平均值為 0、標準差為 1" (mean = 0, standard deviation = 1).
4. Table 4-2, line 387: Names "Min-Max Scaling" explicitly.

The boundary rule says standardization should be defined conceptually ("transforming raw features into a more useful form") and formulas must never be shown. While no formula is shown (no z = (x - mu) / sigma), stating the exact output properties (mean=0, SD=1) is one step away from the formula — a student could reverse-engineer the formula from these properties.

**Verdict: ACCEPTABLE WITH RESERVATION.** The guide correctly includes the disclaimer "公式推導為中級內容，初級只需了解概念" (line 355). No formula is actually shown. Naming "Z-Score" and "Min-Max" is vocabulary (these are the proper names of the techniques). Stating "mean=0, SD=1" is borderline but serves as the conceptual definition that distinguishes standardization from normalization — without it, a student cannot answer the comparison questions that appear in the exam traps and quick-judge tables. The content stays on the safe side of the line. **However, if the boundary is intended to be strictly "what it does in plain language only," then lines 327 and 388 should be softened to something like "轉換後資料會重新分佈在平均值附近" without specifying the exact numeric properties.** This is a judgment call for the content owner.

---

## Final Assessment

The study guide is **within boundary**. All core concepts are presented at vocabulary and workflow awareness level with everyday analogies. No statistical formulas, SQL, Python, or tool-specific commands appear anywhere. Feature engineering and standardization are defined conceptually. Three borderline items were flagged for transparency, but none constitute clear violations. The guide consistently defers technical depth to 中級 with explicit disclaimers where topics approach the boundary.
