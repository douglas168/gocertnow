# Scope Review — L11203 資料隱私與安全
Generated: 2026-04-10

## Summary

**PASS WITH MINOR VIOLATIONS**

The study guide is overwhelmingly within 初級 scope. Content is vocabulary-and-awareness focused throughout — it names regulations, defines terms, describes rights and risk categories, and applies concepts to scenarios. Two minor violations exist: one passage drifts into compliance procedure detail (how the 72-hour dual-track notification mechanics work step-by-step), and one sub-section inside the data breach response flow uses a diagram format that itemises operational response steps rather than simply naming the phase. Neither is a major failure, but both require a trim to stay cleanly in the 初級 lane.

---

## Boundary Violations Found

### Violation 1 — Section 3.7: 72 小時雙軌通報 — Operational Procedure Detail

**Location:** Section 3.7「2025 修法重點：72 小時雙軌通報義務」, specifically the "關鍵細節" bullet list:

> - 72 小時計算從「**知悉**」起算，不是從「確認法律責任」起算
> - 週末、假日都算在 72 小時內
> - 有正當理由（如天災）無法即時通報：須說明原因，並在原因消除後 72 小時內補報

**Why it violates 初級 boundary:** This is compliance implementation procedure, not awareness. Specifying that (a) the clock starts from "知悉" not "legal confirmation," (b) weekends count, and (c) force-majeure triggers a secondary 72-hour window upon removal of the cause — these are the mechanics a compliance officer would consult when executing the reporting procedure. The boundary rule for Section 3 states "NO: compliance implementation procedures — only describe that compliance is required," and the quick-reference calibration confirms "Explains how to implement a compliance program → 中級." Saying "organisations must notify within 72 hours" is 初級; specifying the exact clock-start trigger, holiday counting rules, and exception sub-procedures is 中級.

**Severity: MINOR** — the paragraph is brief and does not involve formulas or code. A single sentence stating "the 2025 amendment requires notification within 72 hours of becoming aware of the breach" would be fully compliant.

---

### Violation 2 — Section 3.7: Data Breach Response Flow — Step-by-Step Operational Detail

**Location:** Section 3.7, the four-phase response diagram:

> 偵測 (Detect) --> 遏制 (Contain) --> 通報 (Notify/Report) --> 復原 (Recover)
> 發現異常 / 確認是否真的外洩 | 立即隔離受影響系統 / 防止擴散 | 72小時內通知當事人 / 向個資會報告 | 修補漏洞 / 恢復系統 / 建立預防機制

**Why it violates 初級 boundary:** Naming the four phases as vocabulary terms is 初級. However, the diagram annotates each phase with specific operational sub-tasks (isolate affected systems, patch vulnerabilities, restore systems, build prevention mechanisms) that describe how to execute an incident response program. Compliance implementation procedures belong to 中級. The deepest 初級 should go is "organisations should have an incident response process that covers detection, containment, notification, and recovery." Detailing what to do inside each phase crosses into operational procedure territory.

**Severity: MINOR** — removing the sub-task annotations from the diagram while keeping the four phase labels would bring this fully into scope.

---

## Scope-Compliant (Verified In-Boundary)

1. **Section 3.1 — Privacy vs Security distinction:** Defines both terms conceptually (privacy = purpose/right; security = means/tool) and explains their relationship with an analogy. Purely definitional — clearly 初級.

2. **Section 3.2 — PDPA Article 2 definition of personal data:** Quotes the legal definition, explains direct vs indirect identification, and notes the law covers natural persons only. Naming a regulation and explaining what it covers = 初級.

3. **Section 3.2 — Three-stage framework (蒐集/處理/利用):** Explains what each stage means, provides everyday examples, and states the compliance requirement (specific purpose + necessary scope). No procedures; pure vocabulary and workflow awareness — 初級.

4. **Section 3.2 — PDPC establishment timeline:** Names the regulatory body, dates its establishment, and describes its role categories (receive reports, investigate, handle complaints). Organisation awareness only — 初級.

5. **Section 3.3 — OECD 8 principles and GDPR 7 principles:** Lists principle names and short descriptions, notes corresponding PDPA articles, and calls out the 8-vs-7 count distinction. Listing a regulation's principles by name and explaining what they mean = squarely 初級.

6. **Section 3.4 — Data subject rights (Article 3):** Names all five rights, notes they cannot be contracted away, and specifies the 15-day and 30-day response windows. Describing rights that exist under a regulation and their statutory deadlines = 初級.

7. **Section 3.5 — CIA Triad and DAD Threat Model:** Defines each element, maps threats to elements, and applies to attack scenarios. No formulas, no implementation mechanics, purely definitional and recognition-focused — 初級.

8. **Section 3.6 — De-identification vs Pseudonymization:** Explains the concepts, compares reversibility, distinguishes GDPR treatment from Taiwan PDPA treatment. Purely conceptual comparison — 初級. Notably does NOT mention k-anonymity calculations, differential privacy, or l-diversity formulas, which are explicitly banned.

9. **Section 3.8 — AI privacy risks (Model Memorization, Prompt Leakage, training data ingestion):** Describes each risk at the conceptual level ("AI models may memorize training data and reproduce it"), connects to PDPA Article 27 as the applicable obligation. The section explicitly self-limits with a footnote: "聯邦學習、差分隱私等技術，屬於… 中級的範疇。本節只需掌握概念層次。" This is good scope hygiene.

10. **Section 4 — Comparison tables (Tables 1–4):** All four tables compare concepts at the definitional/descriptive level. No formulas, no code, no implementation steps — entirely vocabulary and awareness tier.

---

## Overlap Risk

The following passages come close to 中級 territory but do not cross the line. Flag for awareness during content updates.

**A. Section 3.7 — "大量通知困難時：網站或媒體公告至少 30 天"**
This is a specific procedural detail from the 2025 amendment (mass notification via website/media for at least 30 days when individual notification is impractical). It is narrowly factual (naming the statutory alternative mechanism) rather than instructing how to execute a compliance program. It sits at the very edge of the 初級/中級 line. Current wording is defensible as "naming what the law requires," but any expansion (e.g., how to draft the public notice, which media channels qualify) would cross into 中級.

**B. Section 3.4 — Response deadlines (15 days / 30 days with extensions)**
Specifying the statutory response windows (15 days, extendable 15; 30 days, extendable 30) is factual regulation knowledge, not implementation procedure. This is firmly 初級 — naming what the law says. Flag only because test-writers for 中級 might use the same figures in a compliance-execution context; content is fine here.

**C. Section 3.3 — OECD principle-to-PDPA-article mapping table**
The column mapping each OECD principle to specific PDPA article numbers (e.g., 限制蒐集原則 → 第5、15、19條) approaches the detail level of a compliance reference guide rather than pure awareness. It does not instruct how to implement compliance, so it stays in scope — but adding any explanation of what those articles require in practice would tip into 中級 compliance procedure territory.
