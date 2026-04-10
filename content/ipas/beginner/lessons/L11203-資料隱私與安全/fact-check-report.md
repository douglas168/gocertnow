# Fact Check Report — L11203 資料隱私與安全
Generated: 2026-04-10

---

## Summary

**Overall: PASS WITH ISSUES**

The study guide is well-structured and broadly accurate. All high-priority facts (special personal data categories, PDPC timeline, 72-hour rule attribution, OECD/GDPR counts, CIA triad, DAD model, Article 3 rights) are stated correctly. However, two issues require attention before publishing: one CRITICAL omission (the PDPC's 2022 Constitutional Court ruling number is not specified) and several MINOR issues including an imprecise statement about the 去識別化 vs 假名化 distinction, a potentially misleading table row, and a mnemonic that could create a false conceptual link. No boundary violations found. The guide stays firmly in 初級 territory throughout.

---

## Critical Issues (must fix before publishing)

### CRITICAL-1: Constitutional Court Ruling Number Not Stated
**Location:** Section 3.2, PDPC timeline bullet "2022 年：憲法法庭判決要求設立獨立監管機構"
**What study guide says:** "2022 年：憲法法庭判決要求設立獨立監管機構" — the ruling number is omitted entirely.
**What it should say:** The ruling is **111年憲判字第13號** (Constitutional Court Ruling No. 13, August 2022). Research notes list this as a key fact and an exam trap (students confuse "which court order triggered PDPC"). Without the ruling number, a student cannot answer a question that asks "which ruling required the independent oversight body."
**Severity: CRITICAL** — The specific number (No. 13 / 第13號) is a directly testable fact per research notes.

---

## Minor Issues (recommended fixes)

### MINOR-1: De-identification Table — "不可逆" Column Is Misleading
**Location:** Section 4, 表二：去識別化 vs 假名化, row "可逆性" under 去識別化 column
**What study guide says:** 去識別化 is listed as "**不可逆**（永久切斷識別連結）" without qualification.
**Issue:** In Taiwan law, 去識別化 is the **umbrella term** that encompasses both 匿名化 (truly irreversible) and 假名化 (reversible). The "不可逆" label applies to 匿名化 specifically, not to 去識別化 as a whole. The study guide itself correctly explains this umbrella relationship in Section 3.6, but the comparison table then contradicts it by assigning irreversibility to 去識別化 directly — a student reading only the table gets the wrong picture.
**Suggested correction:** Change the table row or add a footnote: "若完全匿名化後不可逆；去識別化涵蓋範圍包含可逆的假名化，完整定義見第 3.6 節。"
**Severity: MINOR** — Internally contradicted by correct text in Section 3.6, but a student skimming comparison tables will be misled.

### MINOR-2: Section 3.2 PDPC — Omits "籌備處 Still Operational as of 2026" Caveat
**Location:** Section 3.2, PDPC timeline bullet "2025 年：相關組織法及修法陸續通過，個資會獲得實質執法權"
**What study guide says:** Describes 2025 as when 個資會 "獲得實質執法權" — implies full formal establishment.
**What research notes say:** As of April 2026, the formal 個人資料保護委員會組織法 has still not fully completed the legislative process. The PDPC is still operating as **籌備處** (Preparatory Office). The 2025 amendments granted enforcement powers but the full independent agency is not yet formally constituted.
**Issue:** Saying "個資會獲得實質執法權" is mostly accurate (the 2025 amendments did confer enforcement powers per the research notes), but the phrasing implies complete establishment which is not the case. For exam purposes the distinction is unlikely to be tested at 初級 level, but the description should not overstate the PDPC's current status if students might encounter questions about whether it is fully operational.
**Suggested correction:** Add a clarifying note such as: "（截至 2026 年 4 月，個資會仍以籌備處形式運作，組織法尚在立法程序中）"
**Severity: MINOR** — Unlikely to be directly tested at 初級 level, but factually imprecise.

### MINOR-3: OECD Mnemonic Creates a Misleading Historical Implication
**Location:** Section 5, 記憶口訣 for OECD 8 vs GDPR 7
**What study guide says:** "OECD = O = 0 (零) + 8 = 08 → 『零八年以前的老規矩，有 8 條』"
**Issue:** OECD guidelines were published in **1980** (and revised 2013), not "before 2008 (零八年)." The mnemonic links OECD to "零八年以前" (before 2008), which is factually misleading — GDPR (2018) is also "after 2008" but the mnemonic implies OECD originated around 2008. Students who take the mnemonic at face value will have a wrong date association. The OECD guidelines are from **1980**, which is far earlier than the mnemonic implies.
**Suggested correction:** Replace with a mnemonic that does not reference a specific year, e.g., "OECD 老前輩，8 條規矩；GDPR 歐盟新，7 條精煉" or simply rely on the numeric statement "OECD 8，GDPR 7，老多新少" (which is already in the same section and is accurate).
**Severity: MINOR** — Mnemonic-only issue; the accurate numbers are stated correctly in the guide. Risk is student confusing OECD's founding date.

### MINOR-4: 去識別化 Description in Section 3.6 Does Not Distinguish Umbrella vs Anonymization Cleanly
**Location:** Section 3.6, 去識別化（De-identification） opening paragraph
**What study guide says:** "去識別化之後，如果資料**真的無法再識別特定個人**，就超出個資法的規範範圍——不再被視為個人資料。"
**Issue:** This is technically correct but could be read as saying that all 去識別化 removes data from 個資法 scope. The conditional "如果...真的無法再識別" is the right hedge, but it comes after establishing 去識別化 as the umbrella term without explicitly noting that the umbrella includes 假名化 (which is reversible and does NOT exit 個資法 scope). A student may misread this as: "once I apply any form of 去識別化, the data leaves 個資法 scope."
**Suggested correction:** Add a sentence after the umbrella definition: "去識別化包含兩種情況：（1）匿名化（永久切斷，脫離個資法）；（2）假名化（仍可還原，仍受個資法規範）。" This clarification already appears implicitly in the diagram below, but an explicit sentence before the diagram would prevent misreading.
**Severity: MINOR** — Risk is minor because the diagram in Section 3.6 shows the umbrella structure clearly.

### MINOR-5: Section 3.7 Does Not Mention the 30-Day Mass Notification Alternative
**Location:** Section 3.7, 2025 修法重點：72 小時雙軌通報義務
**What study guide says:** Lists dual notification obligations and key details including weekends/holidays, but does not mention the mass notification fallback (30 consecutive days via website/media when individual notification is impractical).
**What research notes say:** "Mass Notification Alternative: When notifying huge numbers of individuals is impractical or contact info unavailable: may publish notice via website or media for at least **30 consecutive days** (30天以上)."
**Issue:** The 30-day alternative is a testable detail and is omitted. A question could ask "what is the alternative when individual notification is impractical?" without this, a student has no prepared answer.
**Suggested correction:** Add under "關鍵細節": "大量通知困難時：可改以網站公告或媒體發布，持續至少 30 天（30天以上），並注意不得公開揭露個人識別資訊。"
**Severity: MINOR** — Testable detail missing.

### MINOR-6: Article Numbers for 回應期限 Are Cited Correctly but Could Be Clearer
**Location:** Section 3.4, 回應期限 table
**What study guide says:** "查詢 / 閱覽 / 複製本（第 10 條）" and "補充 / 更正 / 刪除 / 停止（第 11 條）"
**What research notes say:** Research notes confirm Article 10 covers access/query (15 days) and Article 11 covers correction/supplement/deletion/cessation (30 days). These are accurate.
**Issue:** No factual error. However, the table header labels "請求類型" but the article references are in parentheses inside the row, making it easy to miss them. No correction needed — flagged as verified correct.
**Severity: N/A (verified correct)** — Listed here only to confirm article numbers match.

---

## Verified Correct (spot checks passed)

1. **特種個資 count:** Correctly stated as exactly **6 categories** in Section 3.4 knowledge tree, Section 4 表一, Section 6 陷阱 2, and Section 7 快查表. Consistent throughout.

2. **特種個資 categories:** All 6 listed correctly in every location: 病歷、醫療、基因、性生活、健康檢查、犯罪前科. Mnemonic 「病醫基性健犯」 correctly encodes all 6.

3. **GDPR vs Taiwan 特種個資 contrast:** Section 4 表一 and Section 6 陷阱 2 both correctly state that 種族/民族、政治見解、宗教信仰、工會成員 are in GDPR but NOT in Taiwan 個資法. This is the primary exam trap and it is flagged with 🔥 appropriately.

4. **PDPC founding dates:** 2023-05 amendment, 2023-12-05 籌備處 揭牌 — both correctly stated in Section 3.2.

5. **72-hour rule attribution to 2025 amendment:** Section 3.7 and Section 6 陷阱 6 both correctly attribute the 72-hour rule to the **2025 amendment (promulgated 2025-11-11)**, not to the original 個資法. Pre-2025 law is correctly described as having no fixed deadline.

6. **Dual reporting (雙軌通報):** Section 3.7 correctly describes two simultaneous obligations: (1) notify affected data subjects, and (2) report to PDPC. Diagram is accurate.

7. **72-hour clock starts from discovery (知悉), not from legal determination:** Section 3.7 "關鍵細節" correctly states "72 小時計算從「知悉」起算，不是從「確認法律責任」起算." Matches research notes exactly.

8. **Weekends/holidays included in 72-hour window:** Section 3.7 "週末、假日都算在 72 小時內" — correct per research notes.

9. **OECD = 8 principles, GDPR = 7 principles:** Correctly stated in Section 3.3, Section 5 mnemonic, Section 6 陷阱 5, and Section 7 快查表. Consistent and accurate throughout.

10. **OECD 8 principles — all 8 named:** Section 3.3 table lists all 8 correctly: 限制蒐集、資料品質、目的明確化、限制利用、安全保護、公開、個人參加、責任. Matches research notes exactly.

11. **GDPR 7 principles — all 7 named:** Section 3.3 table lists all 7 correctly: 合法性/公平性/透明性、目的限制、資料最小化、正確性、儲存期限限制、完整性與機密性、當責性. Matches research notes exactly.

12. **CIA triad Chinese terms:** 機密性 (C), 完整性 (I), 可用性 (A) — correct in Section 3.5, knowledge tree, CIA diagram, and mnemonics throughout.

13. **DAD threat model mapping:** Disclosure → 洩漏 (threatens 機密性), Alteration → 竄改 (threatens 完整性), Denial → 阻斷 (threatens 可用性) — correct in Section 3.5 diagram and Section 5 mnemonic 「洩竄斷」.

14. **Article 3 rights — exactly 5:** Section 3.4 correctly lists exactly 5 rights, no more. The 5 rights match research notes exactly: 查詢或請求閱覽、請求製給複製本、請求補充或更正、請求停止蒐集/處理/利用、請求刪除.

15. **No right to data portability in Taiwan 個資法:** Section 3.4 and Section 6 陷阱 — correctly states Taiwan 個資法 has no equivalent of GDPR's 資料可攜權.

16. **Article 3 rights cannot be pre-waived by contract:** Section 3.4 correctly states "這些權利**不能事先以契約排除或限制**". Section 7 快查表 repeats this correctly.

17. **蒐集/處理/利用 definitions:** Section 3.2 table and Section 4 表四 both correctly reproduce the Article 2 official definitions for all three terms. 處理 list of operations (記錄、輸入、儲存、編輯、更正、複製、檢索、刪除、輸出、連結、內部傳送) matches research notes precisely.

18. **假名化 not explicitly defined in 個資法:** Section 3.6 and 表二 both correctly note "台灣個資法：**未明確定義**「假名化」這個詞." Accurate per research notes.

19. **Pseudonymized data remains personal data under GDPR:** Section 3.6 and 表二 correctly state "GDPR 下：假名化資料仍然是個人資料" and "**仍屬個人資料，GDPR 仍適用**". Accurate.

20. **Response timelines — Article 10 and 11:** 15 days (extendable +15) for access/query/copy (Article 10); 30 days (extendable +30) for correction/deletion/cessation (Article 11) — correct in Section 3.4 table.

21. **PDPC predecessor structure — 國發會 role:** Section 3.2 and exam trap correctly identifies 國發會 as the prior de facto coordinator and explains the shift to PDPC. Accurate.

22. **AI privacy risk — Article 27 安全維護義務:** Section 3.8 correctly cites Article 27 as the applicable provision for AI tool data handling obligations. Correct per research notes.

23. **Scope caveat for AI risks (Section 3.8 note):** The guide includes an explicit note that deep AI privacy techniques (聯邦學習、差分隱私) belong to 中級 scope. This boundary is correctly identified and labelled.

24. **個資法protects 自然人 only, not 法人:** Section 3.2, Section 6 陷阱 3, and Section 7 快查表 all correctly state that 個資法 protects natural persons only, not corporations/legal entities.

---

## Boundary Violations

**None found.**

The study guide stays within 初級 territory throughout. Specific checks:

- **No encryption algorithm names** (AES, RSA, ECC, etc.) appear anywhere in the guide. Encryption is mentioned only at the conceptual level ("加密概念 — 靜態資料加密 / 傳輸中加密") in the knowledge tree, with no algorithm specifications.
- **No mathematical formulas** (k-anonymity, differential privacy ε, l-diversity) appear.
- **No code snippets** of any kind.
- **No model inversion attack mechanics** beyond the conceptual sentence in Section 3.8 ("AI 大型語言模型在訓練過程中，可能將訓練資料中的個人資訊「記憶」下來"). This is appropriate conceptual awareness only.
- **No GDPR operational compliance mechanics** (DPO requirements, SCCs, data transfer mechanisms) — only principles-level comparison.
- Section 3.8 explicitly labels deeper AI privacy topics (聯邦學習、差分隱私) as 中級 scope and marks them out-of-scope.

---

## Action Required Before Publishing

| Priority | Location | Action |
|----------|----------|--------|
| CRITICAL | Section 3.2 PDPC timeline | Add Constitutional Court Ruling No. **111年憲判字第13號** (No. 13, August 2022) to the 2022 bullet |
| MINOR | Section 4 表二 去識別化 可逆性 row | Clarify that 不可逆 applies to 匿名化, not to 去識別化 (umbrella). Add footnote or qualifier. |
| MINOR | Section 3.2 PDPC 2025 bullet | Add parenthetical: as of April 2026, PDPC still operates as 籌備處; 組織法 pending. |
| MINOR | Section 5 OECD mnemonic | Remove or rephrase "零八年以前的老規矩" — misleadingly implies OECD year ≈ 2008; actual year is 1980. |
| MINOR | Section 3.6 去識別化 opening | Add one sentence clarifying umbrella includes both reversible (假名化) and irreversible (匿名化) sub-types, before the "超出個資法" statement. |
| MINOR | Section 3.7 72小時 關鍵細節 | Add the 30-day mass notification fallback: 大量通知困難時可網站/媒體公告至少 30 天. |
