# Accuracy Review — L21202: AI導入規劃
Date: 2026-04-30
Reviewers: Gemini (adversarial) + Claude independent pass

---

## Summary

The guide is structurally sound and pedagogically well-designed. Most core concepts (RACI, CRISP-DM phases, IBM AI Ladder, pilot gate conditions, five-layer requirements, SMART/OKR) are accurate. Two claims are potentially fabricated or sourced incorrectly and require immediate correction before publishing: the 70/20/10 budget heuristic as stated, and the Google Cloud AI Adoption Framework pillar count (6 vs 4).

---

## Critical Errors (must fix before publishing)

### Error 1 — 70/20/10 Budget Heuristic: Source and framing likely fabricated
**Claim in guide:** "70% 基礎設施 / 20% 模型開發 / 10% 運維治理" presented as an industry heuristic for Build/Self-host AI projects.

**Problem:** The well-known BCG/industry "10/20/70 rule" for AI projects allocates **70% to people/process/change management, 20% to technology, and 10% to algorithms/models** — which is the near-opposite framing. The guide's specific "70% infrastructure" split appears to conflate this with Andrew Ng's observation that data pipelines dominate AI project effort, but no authoritative source uses the exact 70/20/10 label with these three categories in this ratio. This ratio is likely a hallucination or unverifiable fabrication.

**Correction options:**
- Remove the specific 70/20/10 ratio entirely and replace with the verified BCG framing (70% people/change, 20% tech, 10% algorithms), noting this measures effort not capital spend.
- Alternatively, retain the "infrastructure dominates" insight attributed to Andrew Ng / Sculley et al. (Hidden Technical Debt paper) without attaching an unverifiable ratio.
- If the intent is to distinguish CapEx allocation for Build projects, re-source it with a citable reference or frame it explicitly as a heuristic "from practitioners, not a named standard."

**Risk if not fixed:** Candidates who encounter a BCG-framed version of this rule in other materials will be confused. The inverted 10/20/70 (which IS a real named rule) is the opposite of what the guide teaches.

---

### Error 2 — Google Cloud AI Adoption Framework: Pillar count wrong (6 vs 4)
**Claim in guide:** "4 themes × 6 pillars (People / Data / Technology / Process / Governance / Culture)"

**Problem:** Google's Cloud AI Adoption Framework (v1/v2) uses **4 pillars**, not 6. The four pillars are: People, Process, Technology, Data. "Governance" and "Culture" are not separate pillars in Google's published framework — they are discussed as dimensions within the existing pillars. Adding them as pillars is an AI-generated fabrication.

The "4 themes: Learn / Lead / Access / Scale" — this specific theme list is unverifiable from Google's official published framework documentation and may also be hallucinated.

**Correction:** Verify against Google's actual "AI Adoption Framework" documentation. If the 4-pillar structure is confirmed, remove "Governance" and "Culture" from the pillar list and update the mnemonic. If the theme names (Learn/Lead/Access/Scale) cannot be verified, either remove them or mark as "approximate/subject to exam version."

**Risk if not fixed:** A candidate who looks up Google's actual framework will see 4 pillars, not 6, and lose confidence in the entire guide.

---

## Minor Issues

### Minor 1 — CRISP-DM presented as linear (should be cyclical)
**Claim:** Guide presents CRISP-DM as a 6-phase sequential flow (業·資·備·模·評·部).
**Issue:** CRISP-DM is explicitly cyclical — after Evaluation you typically loop back to Business Understanding. The guide's linear presentation omits this core characteristic.
**Fix:** Add one sentence: "CRISP-DM 是循環（iterative）的，非線性流程；Evaluation 後常 loop 回 Business Understanding 重新調整。" This is exam-relevant because questions may ask about the nature of CRISP-DM vs Waterfall.

### Minor 2 — Gartner 6% statistic is floating/undated
**Claim:** "全球約只有 6% 的企業達到這個等級 [Level 5 Transformational]"
**Issue:** The specific percentage varies by Gartner survey year. 2024 surveys suggest as low as 2%, earlier surveys showed higher numbers. Presenting a specific unattributed percentage is risky.
**Fix:** Replace "約只有 6%" with "極少數企業（依年份調查不同，多在個位數%）" or remove the statistic entirely.

### Minor 3 — RACI C/I bidirectional framing is a mnemonic, not a structural rule
**Claim:** "C 是雙向諮詢，I 是單向告知"
**Issue:** This is a useful learning mnemonic and is operationally correct, but the original RACI literature describes C as "consulted before" and I as "informed after" without explicitly using "bidirectional/unidirectional" language. The framing is fine for exam prep and is widely used in practice.
**Severity:** Low — this is acceptable for exam purposes; no change required unless ITRI specifically tests the original RACI source text.

---

## Missing Key Concepts

1. **CRISP-DM cyclical nature** — covered under Minor 1 above.
2. **Hidden Technical Debt in ML systems** (Sculley et al., Google 2015) — relevant to the "持續再訓練 OpEx" argument but the foundational paper is not referenced. May be relevant for 中級 exam if questions cite this concept.
3. **ITRI AIMM (AI Maturity Model)** — Gemini flags this as Taiwan-specific ITRI framework. Whether IPAS 中級 tests this specifically should be verified against the syllabus.

---

## Terminology Notes

- "北極星指標" (North Star Metric) — standard industry Chinese, acceptable.
- "業·流·決·資·技" (Business/Process/Decision/Data/Technology) — appropriate; verify against ITRI IPAS syllabus vocabulary for exact mapping.
- CRISP-DM Chinese phase names (業務理解/資料理解/資料準備/建模/評估/部署) — these are standard and widely used translations; acceptable.
- "當責" (Accountable) — correct and standard.

---

## Convergence Notes

- **Gemini and Claude both flag the 70/20/10 heuristic** as problematic, though with different framings. Gemini calls it "the exact opposite of reality" (referencing BCG 10/20/70); Claude notes it's an unverifiable fabrication that may conflate multiple sources. Strong convergence — this is a real error.
- **Gemini flags Google's 6 pillars; Claude independently reaches the same conclusion** (4 pillars in the actual Google framework). Strong convergence.
- **Gemini flags CRISP-DM linearity; Claude agrees** it is a minor pedagogical omission.
- **Gemini's claim that C/I bidirectional framing is "not technically in original RACI"** — Claude judges this low severity for exam purposes; the framing is practically standard.
- **Gemini raises the BCG 10/20/70 as THE named rule** — Claude notes the BCG rule is a real competing claim that could confuse candidates. Convergence: the 70/20/10 as written needs either a source or removal.

---

## Verdict

**Grade: C**

Two critical fabrication-level errors (70/20/10 ratio unsourced/possibly inverted; Google 6-pillar claim) that could actively mislead candidates. The rest of the guide (RACI, CRISP-DM phases, IBM Ladder, pilot gate, five-layer requirements, SMART/OKR/NSM framework) is accurate and well-structured. Fix the two critical errors before publishing; the minor issues can be addressed in a subsequent revision.
