# Research Notes: L21203 AI風險管理

Researcher pass — collected 2026-04-18. Practitioner-level cross-AI risk management. Past 初級 already taught framework names + GenAI-specific awareness; this lesson teaches the *how*.

## Official Sources

- **EU AI Act** (Regulation (EU) 2024/1689 — in force 2024-08-01)
  - 4 risk tiers: Unacceptable (Art.5 — banned), High (Art.6 + Annex III — heavy controls), Limited (Art.50 — transparency duties for chatbots/deepfakes), Minimal (no obligations).
  - Art.5 bans 8 practices: social scoring, subliminal manipulation, exploitation of vulnerabilities, untargeted facial-image scraping, emotion recognition at work/school, biometric categorisation by sensitive attributes, predictive policing on profiling alone, real-time remote biometric ID in public for law enforcement (3 narrow carve-outs).
  - Art.6 = classification rules; Annex III = high-risk use-case list (biometrics, critical infrastructure, education, employment, essential services incl. credit-scoring + life/health insurance pricing, law enforcement, migration/asylum/border, justice/democracy).
  - Art.27 FRIA — *deployers* that are public bodies / private entities providing public services must run a Fundamental Rights Impact Assessment **before** putting Annex III high-risk systems into use. Can re-use a GDPR DPIA. Must report to market-surveillance authority.
  - **2026 timeline (verify when teaching):**
    - GPAI obligations live since **2025-08-02**; Commission enforcement powers + Art.101 fines (up to €15M or 3 % global turnover) start **2026-08-02**.
    - High-risk Annex III rules become applicable **2026-08-02**; Annex I high-risk (regulated-product safety component) extended to **2027-08-02**.
    - Pre-existing GPAI models must reach full compliance by **2027-08-02**.
- **NIST AI RMF 1.0** (NIST AI 100-1, Jan 2023) — voluntary, lifecycle, risk-based.
  - 4 functions: **Govern** (cross-cutting org culture/policy/accountability), **Map** (context, intended use, stakeholders, impacts), **Measure** (metrics for trustworthy-AI characteristics), **Manage** (prioritise, treat, monitor risks).
  - Companion: **Playbook** (subcategory-level "how to") + **AI RMF Profile**.
  - **GenAI Profile = NIST AI 600-1** (released 2024-07-26) — adds 12 GenAI-specific risks (CBRN info, confabulation, dangerous/violent/hateful content, data privacy, environmental, harmful bias/homogenisation, human-AI configuration, info integrity, info security, IP, obscene/abusive content, value-chain/component integration) and aligned actions for Govern/Map/Measure/Manage.
- **Taiwan《人工智慧基本法》— 三讀通過 2025-12-23** (CRITICAL UPDATE — was 草案 in the 2024 syllabus).
  - Central competent authority: **國科會 (NSTC)**; local: 直轄市/縣市政府. 數發部 (MODA) handles risk-classification framework + data-governance mechanisms.
  - 7 governing principles: ① 永續發展與福祉  ② 人類自主  ③ 隱私保護與資料治理  ④ 資安與安全  ⑤ 透明與可解釋  ⑥ 公平與不歧視  ⑦ 問責.
  - 20 articles total. **Art.19** — 政府機關使用 AI 執行業務應進行風險評估並規劃因應措施; high-risk products/systems (認定 by 中央目的事業主管機關 + 數發部) must carry notices/warnings, with 兒少最佳利益 as priority.
  - Status: 三讀通過 2025-12-23；總統令 華總一義字第11500001671號於 2026-01-14 公布並依第 20 條自公布日起施行；主管機關 NSTC（國科會）.
  - Source: <https://moda.gov.tw/press/press-releases/18316>, <https://www.cna.com.tw/news/aipl/202512230036.aspx>, <https://law.nstc.gov.tw/LawContent.aspx?id=GL000592>.
- **金管會「金融業運用人工智慧（AI）指引」** — 發布 2024-06-20 (民國113-06-20).
  - 性質: **行政指導** (not 強制法令) — 提供金融機構及公會參考.
  - 結構: 總則 + 6 章; 涵蓋定義、AI 系統生命週期、風險評估考量、第三方業者監督.
  - 6 核心原則: ① 建立治理及問責機制  ② 重視公平性及以人為本的價值觀  ③ 保護隱私及客戶權益  ④ 確保系統穩健性與安全性  ⑤ 落實透明性與可解釋性  ⑥ 促進永續發展.
  - Source: <https://www.fsc.gov.tw/ch/home.jsp?id=96&parentpath=0,2&mcustomize=news_view.jsp&dataserno=202406200001&dtable=News>.
- **ISO/IEC 42001:2023** — first AI Management System (AIMS) standard, certifiable, PDCA structure (mirrors 27001/9001).
  - Purpose: requirements to *establish, implement, maintain, continually improve* an AIMS — policy, roles, AI impact assessment, lifecycle controls, supplier mgmt.
  - Contrast: **27001** = info-security management (CIA of data) — does **not** cover model drift, hallucination, fairness. **23894:2023** = guidance (non-certifiable) on AI risk-management process — operationalises ISO 31000 for AI; pairs with 42001 (42001 = the management system, 23894 = how to do the risk-management activity inside it).
  - Plays well with 27001/9001 — 42001 explicitly designed for integrated MS.

## Responsible AI Frameworks

- **Microsoft 6 principles** (Responsible AI Standard v2): Fairness, Reliability & Safety, Privacy & Security, Inclusiveness, Transparency, Accountability. Last two (Transparency + Accountability) are framed as "foundational" — supporting the other four.
- **Google AI Principles** — note ambiguity: original 2018 set framed as 7 objectives + 4 "we will not pursue" applications; Google also published a separate "7 principles for AI regulation" in June 2024 (different scope — policy advice, not internal dev guide). For exam: when 「Google 7 原則」cited, default to 2018 dev-side set (socially beneficial; avoid bias; safety-tested; accountable; privacy; scientific excellence; restrict harmful uses). Verify against the question's framing.
- **EU HLEG Trustworthy AI** (Apr 2019) — 7 key requirements: ① Human Agency & Oversight  ② Technical Robustness & Safety  ③ Privacy & Data Governance  ④ Transparency  ⑤ Diversity, Non-discrimination & Fairness  ⑥ Societal & Environmental Well-being  ⑦ Accountability. 3 components: lawful + ethical + robust. Operational tool = **ALTAI** self-assessment checklist (Jul 2020).
- **Cross-walk note (high-leverage exam pattern):** MS-6, Google-7, HLEG-7, ISO 42001 controls, NIST AI RMF trustworthy-AI characteristics, MODA AI Act 7 原則, FSC 6 原則 — all converge on the same concept cluster (fairness / transparency / accountability / privacy / safety / human oversight / well-being). Differences are framing & owner, not substance. Drill students on *who issued which list* — that's the trap.

## Risk Identification Methodologies for AI

- **Risk register / 風險登記簿** — living document; per-risk row contains: ID, description, AI lifecycle stage, owner, likelihood, impact (multi-dimensional), inherent score, current controls, residual score, treatment (mitigate/transfer/accept/avoid), review date. Backbone of NIST Manage and ISO 42001 Clause 6/8.
- **Likelihood × Impact 風險矩陣** — typically 5×5 (score 1-25). Map cells to bands (Low / Medium / High / Critical) with pre-defined governance triggers (who must approve, what controls required, how often reviewed). For AI specifically, evaluate impact across **≥7 dimensions** (financial, operational, reputational, safety, ethical, legal, fundamental-rights) and take the **max** as the impact score — prevents under-counting fairness/rights harms that look small in NTD but huge in liability.
- **AIIA / FRIA** — AI Impact Assessment / Fundamental Rights Impact Assessment (EU AI Act Art.27). Pre-deployment, structured: intended-use description, frequency/duration, affected groups, specific harm risks, human-oversight measures, materialisation response, governance + complaint mechanism. May be combined with GDPR DPIA. For Taiwan equivalent → 個資法 PIA + Art.19 政府 AI 風險評估.
- **Risk appetite / 風險胃納** — Board-set ceiling on acceptable residual risk per category; defines what gets auto-accepted vs escalated. AI extension: typically tighter for fairness/rights risks than for financial. Tied to enterprise risk strategy.
- **Other useful identifications** (mention briefly): MIT AI Risk Repository (taxonomy of 1,600+ documented AI risks across 7 domains), threat modelling adapted for AI (STRIDE-AI, MITRE ATLAS for adversarial-ML threats), red-teaming as an *empirical* identification method that feeds the register.

## Community Insights (exam patterns)

- 樣題池 (官方 114 年版) leans heavily on: definition matching ("以下何者為倫理風險" — distractors mix 系統中斷=技術 / 儲存成本=財務 / 員工培訓=營運), EU AI Act tier classification of a described system, framework-author matching (which org owns which principle list), 高風險 vs 限制風險 區分.
- vocus.cc 模擬考題 (CCChen 整理 + 69ccd429... L21203 專題) confirm focus on: 偏見識別、可解釋性方法分類 (LIME/SHAP 為認知層，不必算數)、合規對照題、情境判斷 (給場景挑風險類型).
- **Common traps:**
  1. Confusing 限制風險 (transparency obligation only) with 低風險/最小風險 (no obligation).
  2. Naming **歐盟 AI 法案** as the issuer of the 7 trustworthy-AI requirements — those are **HLEG 2019**, not the AI Act itself.
  3. Always phrase as「2025-12-23 三讀通過，2026-01-14 經總統公布並施行」，避免再使用「待公布施行」語句。
  4. Putting 金融業 AI 指引 as 強制法規 — it is 行政指導.
  5. Treating ISO 27001 as sufficient for AI governance — it isn't (no fairness/drift/explainability coverage).
  6. Mixing FRIA (EU AI Act Art.27) with DPIA (GDPR Art.35) — overlapping but legally distinct.
- 115 年第一次中級鑑定: **2026-05-23**; 報名截止 2026-04-10 (founder is sitting this).

## Current State (as of 2026-04)

- **Taiwan**: 人工智慧基本法 三讀通過 2025-12-23，2026-01-14 經總統公布並依第 20 條自公布日起施行；施行細則待 NSTC 後續公告。主管機關 國科會，7 原則 + 20 條；數發部負責風險分類框架.
- **EU**: AI Act fully applicable **2026-08-02** for high-risk Annex III + GPAI enforcement powers; high-risk Annex I (product-safety integrated) deferred to 2027-08-02. GPAI substantive obligations have been live since 2025-08-02. Code of Practice for GPAI providers in active use.
- **US**: NIST AI RMF 1.0 + GenAI Profile 600-1 (Jul 2024) remain the de facto federal voluntary baseline. (Federal-government EO landscape is volatile post-2025; do not commit to specifics in study guide unless verified at writing time.)
- **Standards**: ISO/IEC 42001:2023 + 23894:2023 in market; certifications growing through 2025-2026.
- **Syllabus (2024 vintage) is now stale on Taiwan basic-law status** — flag to study-guide writer to teach the post-三讀 reality, not the 草案 reality.

## External Documents Found

- EU AI Act consolidated text — found via artificialintelligenceact.eu mirror + ai-act-service-desk.ec.europa.eu (official EC desk). Both cite Articles correctly.
- NIST AI 100-1 (RMF 1.0) — <https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf>.
- NIST AI 600-1 (GenAI Profile) — <https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf>.
- Taiwan AI 基本法 條文 — <https://law.nstc.gov.tw/LawContent.aspx?id=GL000592> (NSTC 法規網), <https://moda.gov.tw/press/press-releases/18316> (MODA 新聞).
- 金管會 AI 指引 PDF — <https://www.fsc.gov.tw/websitedowndoc?file=chfsc/202406201802440.pdf>.
- ISO/IEC 42001 official page — <https://www.iso.org/standard/42001>.
- iPAS 115 年簡章 — <https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115年度AI應用規劃師能力鑑定簡章(初、中級)_0105_20260105184002.pdf>.
- iPAS 114 年樣題 — <https://www.ipas.org.tw/DownloadFile.ashx?filename=...iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB...114%E5%B9%B41%E6%9C%88%E7%89%88).pdf>.
- PTT-specific L21203 threads — **not found**; community discussion sits on vocus.cc and FB groups, not PTT (small candidate population).

## Key Findings Summary

1. **Taiwan basic law landed since syllabus was written** — must teach 三讀通過 (2025-12-23), 主管機關 = 國科會, 7 原則, 20 條, Art.19 政府 AI 風險評估. Do not say 已施行.
2. **EU AI Act 2026-08-02 is the load-bearing date** for this exam — high-risk Annex III obligations + GPAI enforcement powers go live 3 months after the May sitting.
3. **4 tiers + 8 prohibited practices + Annex III + FRIA (Art.27)** is the EU AI Act question pattern. Drill tier-classification of described scenarios.
4. **NIST AI RMF 4 functions** (Govern is cross-cutting, Map/Measure/Manage are lifecycle). Pair with **600-1 GenAI Profile** for GenAI-specific (which the planner only references — depth lives in 初級 L12303).
5. **ISO 42001 ≠ 27001 ≠ 23894** — 42001 is the certifiable AIMS, 23894 is the risk-process guidance, 27001 covers info-security only. Easy distractor question.
6. **Responsible-AI principle lists converge** — drill *who issued which list*, not the substantive content (MS-6 / Google-7 / HLEG-7 / FSC-6 / Taiwan-7).
7. **Risk register + 5×5 likelihood-impact matrix + multi-dimension impact + risk appetite** is the practitioner toolkit — concrete artefacts the planner produces.
8. **金融業 AI 指引 is 行政指導 (2024-06-20)** with 6 核心原則 — non-binding but the de facto sector benchmark in Taiwan.

## Scope Notes — what to AVOID in study guide

- **L22404 territory (do NOT include):** differential privacy ε/δ math, federated-learning architecture, k-anonymity/l-diversity formulas, secure-multiparty computation. We may *name* PETs as a control category; we do not teach mechanics.
- **L23401 territory (do NOT include):** model card schema details, GDPR Art.22 mechanics, inference audit-log code, explainability algorithm internals (LIME/SHAP math), human-in-the-loop UI patterns. We may say "model card / explainability / audit logs are required controls" — depth lives in L23401.
- **L23402 territory (do NOT include):** specific bias-mitigation algorithms (reweighting, adversarial debiasing, reject-option classification, equalized-odds post-processing), fairness-metric math (demographic parity vs equal opportunity vs calibration). We may name "pre-/in-/post-processing mitigations exist" — algorithm depth is L23402.
- **L12303 territory (do NOT re-explain at definition level):** what GenAI risks *are* (hallucination, prompt injection, data leakage, copyright). Reference them; do not teach them again. Jump straight to *how to put them in a risk register and treat them*.
- **L11102 territory (do NOT re-explain at definition level):** what AI governance *is*, what frameworks *exist*. Assume awareness; jump to classification + control mapping.

End of research notes (~205 lines).
