# Accuracy Review — L21203: AI風險管理
Date: 2026-04-30
Reviewers: Claude independent pass (Gemini rate-limited and returned no output for this file)

---

## Summary

L21203 is the stronger of the two guides in terms of regulatory accuracy. EU AI Act structure, NIST AI RMF four-function model, ISO standard distinctions, and HLEG attribution are all substantially correct. The primary concerns are: (1) the Taiwan AI Basic Law dates are very recent and AI-generated claims about very new legislation carry high fabrication risk — must be verified against the actual text; (2) one minor HLEG requirement name truncation; (3) the FRIA/deployer scope has a nuance the guide omits. No Gemini output was received due to rate limits; this review is Claude-only.

---

## Critical Errors (must fix before publishing)

### Error 1 — Taiwan AI Basic Law dates: HIGH fabrication risk, requires primary-source verification
**Claim in guide:**
- 三讀通過日：2025-12-23
- 公布施行日：2026-01-14
- 中央主管機關：NSTC（國科會）
- Art.19：政府機關用 AI 需做風險評估
- MODA role：推動風險分類框架、協助風險基礎管理規範

**Problem:** This is AI-generated content about very recently enacted legislation (December 2025 / January 2026). AI models have high hallucination rates for specific legislative dates, article numbers, and role assignments in recent law. The dates (2025-12-23 and 2026-01-14) are specific and plausible but UNVERIFIED.

**Correction required:**
- Cross-check the actual Legislative Yuan record for 《人工智慧基本法》 third reading date.
- Verify the promulgation date in the Presidential Office gazette (總統府公報).
- Verify NSTC is explicitly designated as 中央主管機關 in the law text.
- Verify MODA's described role is in the actual law text, not interpolated.
- Verify Art.19 content is accurate (the article number may have shifted between drafts).

**Risk if not fixed:** If the dates or article numbers are wrong, any exam question testing specific facts about Taiwan's AI law will be answered incorrectly. This is the single highest-risk claim in the entire guide because it involves very recent legislation and AI models are prone to confabulating specific dates for new laws.

---

### Error 2 — HLEG 7th requirement name truncated
**Claim in guide:** Lists HLEG requirement as "Diversity & Fairness"
**Actual HLEG 2019 text:** The correct full name is **"Diversity, Non-discrimination and Fairness"**

**Problem:** The guide truncates the requirement to "Diversity & Fairness," dropping "Non-discrimination." This matters for exam questions that ask candidates to match requirement names, especially if the exam presents the full name and the candidate has memorized the truncated version.

**Correction:** Replace "Diversity & Fairness" with "Diversity, Non-discrimination and Fairness" in the ISO standards comparison table (Section 7) and in any other location it appears.

---

## Minor Issues

### Minor 1 — FRIA deployer scope: EU AI Act nuance omitted
**Claim:** "FRIA is deployer's obligation for all Annex III high-risk AI systems"
**Nuance:** EU AI Act Art.27 FRIA obligation specifically applies to deployers who are **public authorities or bodies, or private entities providing public services** using Annex III systems that affect individuals' rights. Not all Annex III deployers (e.g., private sector employers using recruitment AI) are automatically subject to Art.27 FRIA — their obligations may differ. The guide's universal framing is an oversimplification.

**Fix:** Add a qualifier: "Art.27 FRIA 特別適用於公部門或提供公共服務的私部門 deployer；私人僱主使用招募 AI 的 FRIA 義務依具體情境而定。" This is exam-relevant for scenario questions involving private-sector deployers.

### Minor 2 — Social Scoring prohibition scope
**Claim in guide:** Lists "Social Scoring" as an Art.5 prohibition without specifying the subject.
**Nuance:** The final EU AI Act Art.5 prohibits social scoring specifically by **public authorities** (or for similar societal contexts). Private sector behavioral scoring for targeted advertising, for example, may not trigger Art.5. The guide's Q7 practice question (retail social scoring) correctly applies Art.5 social scoring — but the definition in Section 4 doesn't specify "by public authorities" which could cause confusion.
**Fix:** Add "(尤指公部門或等效情境)" after the social scoring prohibition description.

### Minor 3 — NIST AI RMF: "Govern" ordering in diagram
**Claim:** The guide's ASCII diagram shows "Govern → Map → Measure → Manage" with Govern as cross-cutting. The official NIST AI RMF 1.0 document places Govern as a cross-cutting function but the primary sequential flow is Map → Measure → Manage. The guide acknowledges Govern is cross-cutting in the text, but the diagram's arrow "Govern →" could imply sequential order before Map.
**Fix:** The text explanation is correct; consider adjusting the diagram to better show Govern surrounding rather than preceding Map/Measure/Manage.

---

## Missing Key Concepts

1. **EU AI Act GPAI (General Purpose AI) provisions** — The final EU AI Act includes specific obligations for GPAI model providers (systemic risk models, transparency obligations). For IPAS 中級 2026 exams, GPAI is likely testable. The guide does not mention this at all.

2. **EU AI Act timeline/enforcement** — The guide describes prohibited practices (Art.5) as already in force. EU AI Act enforcement timeline: prohibited practices apply 6 months after entry into force (August 2026); GPAI obligations apply 12 months after entry into force; most high-risk provisions apply 24-36 months after entry into force (2026-2027). For a 2026 exam, clarifying what is currently enforceable vs. phased-in is relevant.

3. **Conformity Assessment for High-Risk AI** — The guide mentions provider obligations briefly in the FRIA decision tree but doesn't explain the Conformity Assessment process (self-assessment vs. third-party) that providers of Annex III systems must complete. This is likely testable.

---

## Terminology Notes

- "不可接受風險 / 高風險 / 限制風險 / 最小風險" — These Chinese tier names are consistent with ITRI and industry usage; acceptable.
- "基本權影響評估" (FRIA) — This is the standard Chinese translation; correct.
- "風險胃納" (Risk Appetite) — Standard in the ISO 31000/AI risk context; correct.
- "治盤量管" as mnemonic for Govern/Map/Measure/Manage — Functional mnemonic; the Chinese mapping (治=Govern, 盤=Map, 量=Measure, 管=Manage) is correct.
- "行政指導" for FSC AI Guidelines — Correct legal classification.
- "Deployer / Provider" — The guide uses English terms. In IPAS context, verify if ITRI's preferred Chinese is "部署者/提供者" or if English terms are expected in exam answers.

---

## Convergence Notes

Gemini did not return output for L21203 due to API rate limits. This is a Claude-only review. The absence of a second adversary means lower confidence on edge cases. The Taiwan AI Basic Law claims are the most vulnerable to error and should be verified regardless.

---

## Verdict

**Grade: B**

The regulatory framework content (EU AI Act, NIST AI RMF, ISO distinctions, HLEG attribution) is largely accurate and well-structured. The critical vulnerability is the Taiwan AI Basic Law date/article claims, which are recent legislation and therefore high-risk for AI-generated factual errors — these MUST be verified against primary sources before publishing. Fix the HLEG truncation. Consider adding GPAI provisions as a missing topic. The rest of the guide can be published after the Taiwan law facts are verified.
