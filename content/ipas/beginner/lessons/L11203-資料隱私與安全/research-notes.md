# Research Notes: L11203 資料隱私與安全 (Data Privacy and Security)

**Prepared:** 2026-04-10
**Status:** Draft — for study guide writer use only. Do not publish.

---

## 1. 個人資料保護法 (Taiwan PDPA) — Current Text and 2023/2025 Amendments

### Key Timeline

| Date | Event |
|------|-------|
| 1995 | Original 《電腦處理個人資料保護法》 enacted |
| 2010 | Major revision, renamed 《個人資料保護法》 (個資法) |
| 2022-08 | Constitutional Court Ruling No. 13 (111年憲判字第13號): required independent oversight body within 3 years |
| 2023-05 | Legislative Yuan passed amendments designating 個人資料保護委員會 (PDPC) as primary supervisory authority |
| 2023-12-05 | 個人資料保護委員會籌備處 (PDPC Preparatory Office) officially established |
| 2025-03-28 | Executive Yuan passed draft 個人資料保護委員會組織法 and PDPA amendment bills |
| 2025-04-17 | Legislative Yuan passed PDPA amendments (3rd reading — 個資法部分條文修正) |
| 2025-10-17 | Further amendments passed conferring enforcement powers to PDPC |
| 2025-11-11 | President promulgated (公布) the 2025 PDPA amendments |

### What Changed with the 2023 Amendment

- Established 個人資料保護委員會 (個資會 / PDPC) as the unified independent supervisory authority
- Previously oversight was fragmented: 國發會 (National Development Council) handled some coordination, with each industry's "中央目的事業主管機關" overseeing its own sector
- After: 個資會 becomes the single regulator (相當中央三級獨立機關, independent agency equivalent to a third-level central authority), operates on collegiate basis (合議制)

### What Changed with the 2025 Amendment (promulgated 2025-11-11)

- Mandatory data breach notification to PDPC (triggers on objective fact of breach, not on determination of legal liability)
- PDPC gains administrative inspection authority
- Higher penalties: NT$150,000–NT$15,000,000 for serious violations or failure to correct
- Sector regulators/local governments may remain co-regulators for 6 years post-implementation
- PDPC enforcement decisions appealed directly through administrative litigation (not ordinary appeal channels)

### Official Website
- 個人資料保護委員會籌備處: https://www.pdpc.gov.tw/
- Note as of April 2026: The formal establishment of 個資會 is still pending passage of the 組織法 through full legislative process; the Preparatory Office is currently operational.

### Exam Trap
- Students often confuse "國發會" (old de facto coordinator) with 個資會 (new dedicated body). The 2023 amendment was the legislative trigger; the preparatory office launched December 2023.

---

## 2. 個人資料的定義 (Article 2 Definitions)

### Article 2 Definition of 個人資料

Official text (Article 2, Item 1):

> 個人資料：指自然人之姓名、出生年月日、國民身分證統一編號、護照號碼、特徵、指紋、婚姻、家庭、教育、職業、病歷、醫療、基因、性生活、健康檢查、犯罪前科、聯絡方式、財務情況、社會活動**及其他得以直接或間接方式識別該個人之資料**。

Key point: The list is non-exhaustive. The catch-all is "得以直接或間接方式識別該個人之資料" — data that can identify a specific individual either directly or indirectly.

### Article 2 Definitions of Collection / Processing / Use

| Term | Chinese | Article 2 Official Definition |
|------|---------|-------------------------------|
| Collection (蒐集) | 蒐集 | 指以任何方式取得個人資料 (obtaining personal data in any manner) |
| Processing (處理) | 處理 | 指為建立或利用個人資料檔案所為資料之**記錄、輸入、儲存、編輯、更正、複製、檢索、刪除、輸出、連結或內部傳送** |
| Use (利用) | 利用 | 指將蒐集之個人資料**為處理以外之使用** |

### Key Distinctions / Exam Traps

- **蒐集 → 處理 → 利用** is a logical sequence, but the three can overlap or occur simultaneously.
- "處理" is specifically for building/maintaining data files (internal operations on data).
- "利用" is anything done *with* the data once collected that isn't processing — e.g., sharing it externally, using it for marketing, providing it to a third party.
- The same physical action (e.g., emailing data) could be "處理" (internal transmission) or "利用" (sharing externally) depending on context.
- All three must comply with 特定目的 (specified purpose) and 必要範圍 (necessary scope).

---

## 3. 特種個資 (Sensitive Personal Data) — Article 6

### Current Categories (Article 6, current law)

The law lists **6 categories** of 特種個資 that are generally prohibited from collection, processing, or use:

1. **病歷** — Medical records
2. **醫療** — Medical treatment/diagnosis information
3. **基因** — Genetic data
4. **性生活** — Sexual life (enforcement rules define this as including sexual orientation and sexual practices)
5. **健康檢查** — Health examination records
6. **犯罪前科** — Criminal history/records

### Notable Omissions vs. GDPR

GDPR Article 9 also protects: racial/ethnic origin (種族/民族), political opinions (政治見解), religious/philosophical beliefs (宗教信仰), trade union membership (工會成員). Taiwan's 個資法 does **not** include these as 特種個資 — a deliberate legislative choice based on Taiwan's national conditions. This is a common exam trap.

### Exceptions (Article 6 Exceptions — 6 grounds)

Collection/processing/use of 特種個資 is permitted when:
1. Law explicitly permits
2. Public agency performing statutory duties with appropriate safeguards
3. Data subject has publicly disclosed the data themselves
4. Statistical research or academic purposes with proper anonymization
5. Necessary to assist statutory functions
6. Written consent (書面同意) from the data subject

---

## 4. 當事人權利 (Data Subject Rights) — Article 3

### Full List (5 Rights — Article 3)

These rights **cannot be waived in advance or limited by contract**:

1. **查詢或請求閱覽** — Right to query or request access/inspection
2. **請求製給複製本** — Right to request a copy
3. **請求補充或更正** — Right to supplement or correct
4. **請求停止蒐集、處理或利用** — Right to request cessation of collection, processing, or use
5. **請求刪除** — Right to request deletion

### Response Timelines

- Requests for query/access/copies (Article 10): Controller must respond within **15 days**; extension up to additional 15 days permitted with written notice.
- Requests for correction/supplement/deletion/cessation (Article 11): Controller must respond within **30 days**; extension up to additional 30 days with written notice.

### Exam Trap

- Taiwan 個資法 does not include a GDPR-style "right to data portability" (資料可攜權) as a statutory right. Also no explicit "right to be forgotten" by that name — the closest is 請求刪除 under Article 3(5) + Article 11.
- The 5 rights cannot be pre-waived. Even if a contract says "you waive these rights," that clause is null.

---

## 5. 去識別化 vs. 假名化 (De-identification vs. Pseudonymization)

### Terminology Map

| Chinese Term | English Term | Standard |
|---|---|---|
| 去識別化 | De-identification (umbrella term) | Taiwan 個資法 uses this term |
| 匿名化 | Anonymization | GDPR, ISO |
| 假名化 | Pseudonymization | GDPR Article 4(5) |

### Anonymization (匿名化)

- Standard: Neither the data controller nor any third party can identify the data subject through reasonably available means.
- The link between data and individual is **permanently and irreversibly severed**.
- **GDPR status:** Anonymized data is **outside** GDPR scope — no longer personal data, no regulations apply.
- **Taiwan 個資法 status:** If data is truly anonymized (cannot identify subject directly or indirectly), it falls outside the law's scope (no longer "個人資料").

### Pseudonymization (假名化)

- Standard (GDPR Article 4(5)): Data processed so it can no longer be attributed to a specific data subject without reference to additional information, which is kept separately with technical/organizational measures preventing re-identification.
- The link is **suspended, not destroyed** — re-identification is possible if the additional information is available.
- **GDPR status:** Pseudonymized data **remains personal data** and is subject to GDPR, though it qualifies as a privacy-enhancing measure (recognized in Articles 25, 32, 89).
- **Taiwan 個資法 status:** 個資法 does **not explicitly define or use the term 假名化**. The law uses "去識別化" as a general term. This creates legal ambiguity because Article 2 uses "cannot be identified" language (closer to anonymization), while Article 6 uses "unable to identify" language in exceptions (possibly covers pseudonymization). Academic literature notes this inconsistency and recommends future amendments address it.

### NIST / ISO Reference

- NIST SP 800-188 defines de-identification as "the process of removing or obscuring personal information from a dataset to limit the ability to identify individuals."
- ISO/IEC 20889:2018 provides a taxonomy of de-identification techniques including pseudonymization and anonymization.

### Exam Trap

- "去識別化" in Taiwan law is the umbrella term — it encompasses both 匿名化 and 假名化.
- 假名化 data is still 個人資料 under GDPR (though not explicitly addressed as such in 個資法).
- Re-identification risk: Even "anonymized" data can sometimes be re-identified through cross-referencing (e.g., Netflix prize dataset case). True anonymization is technically very hard to guarantee.

---

## 6. CIA Triad in Data Security — 資訊安全三要素

### Standard Chinese Terminology

| English | Chinese | Definition (Chinese standard) |
|---------|---------|-------------------------------|
| Confidentiality | **機密性** | 採用適當安全機制保護資料，避免暴露於無權限人員或程式之下 |
| Integrity | **完整性** | 確保維持資料原來的狀態，只允許有權限的使用者修改資料內容 |
| Availability | **可用性** | 已授權實體在需要時可存取與使用之特性，確保資訊與系統能持續正常運作 |

### Acronym
CIA三角 / CIA三元素 / 資安三要素 / 資訊安全三要素 — all are acceptable terms in Chinese. "CIA Triad" (英文縮寫) is also commonly used directly.

### Related: DAD Framework (Threats)

DAD is the opposite of CIA — used to describe threats:
- **D**isclosure (洩漏) — threatens Confidentiality
- **A**lteration (竄改) — threatens Integrity
- **D**enial (阻斷) — threatens Availability

### Exam Application

For the IPAS exam, expect questions pairing a scenario with the correct CIA element violated. Examples:
- Data stolen/leaked → 機密性 violated
- Database records tampered → 完整性 violated
- DDoS attack making system unavailable → 可用性 violated

---

## 7. 個資外洩通報規定 (Data Breach Notification)

### Pre-2025 Situation

- 個資法 Article 12: Organizations must notify data subjects when incidents occur (theft, alteration, damage, destruction, leakage of personal data).
- No fixed timeframe in the original law text; notification was triggered by subjective determination of legal violation, which allowed companies to delay.
- **Sector-specific rules**: Financial sector, e-commerce, and others had separate regulations with faster notification requirements.

### 2025 Amendment — Key Changes

Source: Stellex Law Firm analysis of 2025 PDPA amendments (promulgated 2025-11-11)

**The 72-Hour Rule:**
- Both notification to data subjects AND reporting to the PDPC must occur **within 72 hours of becoming aware** (知悉後72小時內).
- The clock starts from **discovery**, not from confirmation or determination of legal liability.
- The 72-hour window includes weekends and holidays.
- "Justifiable cause" (正當理由) exception: if genuine obstacles exist (e.g., natural disaster), must explain delay and supplement within 72 hours after cause resolves.

**Dual Reporting Obligations (雙軌通報):**
1. **Notify affected data subjects** — individuals (customers, employees) through appropriate channels (spoken, written, phone, SMS, email, fax, electronic document, or other sufficient means)
2. **Report to competent authority (PDPC)** — when thresholds are met, mandatory regulatory report

**Mass Notification Alternative:**
- When notifying huge numbers of individuals is impractical or contact info unavailable: may publish notice via website or media for at least **30 consecutive days** (30天以上), while protecting individual privacy (not disclosing identifying info publicly).

**New Penalty Structure (2025):**
- Baseline: NT$20,000–NT$2,000,000
- Serious violations or failure to correct: NT$150,000–NT$15,000,000

### Taiwan vs. GDPR Comparison

| Feature | Taiwan 個資法 (2025) | GDPR |
|---------|---------------------|------|
| Notification trigger | Objective fact of breach | Objective fact of breach |
| Deadline | 72 hours | 72 hours to supervisory authority |
| Data subject notification | Required | Required (if high risk) |
| Authority reporting | Required (per thresholds) | Required |

### Exam Trap

- Pre-2025 exam questions may reference the OLD rule where no specific timeframe existed. For current exams, 72小時 is the answer.
- The 2025 amendments have been promulgated but implementation depends on executive order — verify current exam syllabus for which version applies.
- 資安法 (Cybersecurity Management Act) has separate notification rules for government agencies and critical infrastructure operators — different from 個資法 breach notification.

---

## 8. 個人資料保護委員會 (PDPC) — Key Facts

### Official Information

- **Full name:** 個人資料保護委員會 (Personal Data Protection Commission)
- **Current status (as of April 2026):** Operating as 個人資料保護委員會籌備處 (Preparatory Office) — formal establishment pending 組織法 passage
- **Official website:** https://www.pdpc.gov.tw/
- **Preparatory Office established:** 2023-12-05
- **Legal basis:** 2023 PDPA amendment added provision designating PDPC as supervisory authority; 組織法 still moving through legislative process

### Nature of the Organization

- 相當中央三級獨立機關 — independent agency equivalent to a third-level central agency
- 合議制運作 — collegiate/committee-based decision-making
- Commissioner term guarantees and removal conditions — to ensure independence and conflict-of-interest avoidance
- Not subordinate to any ministry; independent from executive branch interference

### Key Functions

- Unified recipient of personal data breach notifications
- Establish common baseline security maintenance management standards (安全維護管理辦法) for both public and private entities
- Administrative inspection authority over organizations
- Coordinate with industry regulators and local governments for enforcement
- Receive and process data subject complaints

### Predecessor Oversight Structure

Before PDPC:
- 國發會 (National Development Council): nominally coordinated 個資法 policy
- 中央目的事業主管機關: each industry's central authority oversaw its own sector (e.g., FSC for financial sector, MOHW for healthcare)
- This fragmented approach was criticized for inconsistency and lack of enforcement teeth

---

## 9. AI Training Data Privacy Risks

### Key Risk Categories Relevant to IPAS Beginner Level

**1. Training Data Memorization (模型記憶 / 訓練資料記憶)**
- LLMs can inadvertently memorize and reproduce portions of training data, including personal information.
- Risk: A model trained on data containing PII can regurgitate that PII in response to certain prompts — even without the attacker explicitly asking for it.
- Technical term: "Model inversion attack" (模型逆向攻擊) — using model outputs to reverse-engineer training data.

**2. Prompt Leakage / Prompt Injection (提示詞洩漏 / 提示詞注入)**
- System prompt leakage: Attackers extract confidential system prompts that contain business logic or proprietary information.
- Prompt injection: Malicious instructions embedded in user input override the model's intended behavior.
- Accidental leakage: LLMs have demonstrated cases of "blurting out" (說溜嘴) one user's conversation content to another user (documented incidents).

**3. Training Data from User Inputs (使用者輸入資料被用於訓練)**
- Many AI services (especially free tiers) may use user conversations to improve/fine-tune models.
- Enterprise concern: Employees inputting sensitive corporate or customer data into AI tools may inadvertently contribute that data to the service provider's training pipeline.
- Taiwan legal exposure: Uploading personal data of others to an AI service without consent may violate 個資法 (unauthorized collection/processing by a third party's system).

**4. Cross-User Data Leakage (跨用戶資料洩漏)**
- Documented incidents: Some AI chatbots have surfaced one user's conversation data in another user's session due to caching or indexing errors.
- Mechanism: Inadequate session isolation in multi-tenant AI infrastructure.

**5. Data Transmission Risk (資料傳輸風險)**
- Generative AI requires cloud computing — user data traverses networks multiple times.
- Each hop introduces exposure risk through inadequate security or insider threat.

### Types of Sensitive Data to Avoid Inputting to AI Tools

Taiwan guidance (government and enterprise recommendations) specifies:
- 個人識別資訊: name, ID number, passport, address, phone, email
- 財務資訊: bank accounts, credit cards, financial passwords
- 登入憑證: usernames, passwords, tokens
- Corporate confidential information (客戶資料, 合約內容, 商業機密)

### Legal Framework Applying to AI Privacy Risks in Taiwan

- **個資法 Article 27**: Companies holding personal data must adopt "適當的安全措施" (appropriate security measures) to prevent unauthorized access, alteration, destruction, loss, or disclosure.
- **Penalty**: NT$20,000–NT$2,000,000; up to NT$15,000,000 for serious cases under 2025 amendments.
- **Article 29**: Civil liability for damages unless company proves no fault.
- If personal data is uploaded to AI service without consent → possible violation of 個資法 蒐集/處理/利用 rules.

### Exam Angle

For IPAS beginner level, the exam is likely to test:
- Recognition that AI tools create new privacy risks (not just traditional cybersecurity risks)
- Understanding that 個資法 applies to AI data processing
- Basic awareness of model memorization and prompt leakage as concepts
- Best practice: do not input personal data into AI tools without proper assessment

---

## 10. OECD Privacy Principles and GDPR Principles

### OECD 8 Privacy Principles (1980, Revised 2013)

These principles form the foundation of most modern privacy laws including Taiwan's 個資法:

| # | English | Chinese | Core Idea |
|---|---------|---------|-----------|
| 1 | Collection Limitation | **限制蒐集原則** | Personal data should be collected by lawful/fair means; limit collection to what is necessary |
| 2 | Data Quality | **資料品質原則** | Data should be relevant, accurate, complete, and up to date for its purposes |
| 3 | Purpose Specification | **目的明確化原則** | Purposes must be specified at or before time of collection |
| 4 | Use Limitation | **限制利用原則** | Data should not be used for purposes other than those specified (without consent or legal authority) |
| 5 | Security Safeguards | **安全保護原則** | Reasonable technical/organizational measures to protect data from unauthorized access, destruction, modification, disclosure |
| 6 | Openness | **公開原則** | Individuals should be able to find out about data practices; data controller must be identifiable |
| 7 | Individual Participation | **個人參加原則** | Individuals have right to know if data is held, access it, and challenge/correct it |
| 8 | Accountability | **責任原則** | Data controller is accountable for complying with these principles |

Taiwan's 個資法 references the OECD principles; the 2010 revision also drew from the EU Privacy Directive and APEC Privacy Framework (9 principles).

### GDPR 7 Principles (Article 5)

For comparison — frequently tested in context of Taiwan-GDPR alignment:

| # | English | Chinese |
|---|---------|---------|
| 1 | Lawfulness, fairness, and transparency | 合法性、公平性與透明性 |
| 2 | Purpose limitation | 目的限制 |
| 3 | Data minimisation | 資料最小化 |
| 4 | Accuracy | 正確性 |
| 5 | Storage limitation | 儲存期限限制 |
| 6 | Integrity and confidentiality | 完整性與機密性（安全性） |
| 7 | Accountability | 當責性 |

### Mapping OECD → Taiwan 個資法 Corresponding Provisions

| OECD Principle | 個資法 Corresponding Article(s) |
|---------------|-------------------------------|
| 限制蒐集 | Article 5, 15, 19 (合法蒐集要件) |
| 資料品質 | Article 11 (更正、補充義務) |
| 目的明確化 | Article 5, 15, 19 (特定目的) |
| 限制利用 | Article 5, 16, 20 (利用限制) |
| 安全保護 | Article 27 (安全維護義務) |
| 公開 | Article 8 (告知義務) |
| 個人參加 | Article 3, 10, 11 (當事人權利) |
| 責任 | Article 27, 47, 48 (義務與罰則) |

### Exam Trap

- OECD has **8** principles; GDPR has **7** principles. These numbers are sometimes tested directly.
- 個資法 does not perfectly mirror either framework — it's a hybrid informed by both plus APEC.
- "資料最小化" (data minimisation) is a GDPR principle — it's implied in 個資法's 必要範圍 requirement but not explicitly named.

---

## Sources

1. 全國法規資料庫 — 個人資料保護法 全文: https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050021
2. 個人資料保護法 第2條: https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0050021&flno=2
3. 個人資料保護法 第3條: https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0050021&flno=3
4. 個人資料保護法 第6條: https://law.moj.gov.tw/LawClass/LawSingle.aspx?pcode=I0050021&flno=6
5. 個人資料保護委員會籌備處 (PDPC official site): https://www.pdpc.gov.tw/
6. 個人資料保護委員會籌備處 — 個資外洩通報義務: https://www.pdpc.gov.tw/News_Content/72/255/
7. 立法院三讀通過個資法修正案 (Lexology): https://www.lexology.com/library/detail.aspx?g=4a556264-a4cd-4475-84d2-a805f3109111
8. 行政院通過個資委員會組織法草案 (Executive Yuan): https://www.ey.gov.tw/Page/9277F759E41CCD91/747cda78-926f-4205-99b3-1a735fc1b97b
9. 個資保護委員會籌備處揭牌 (Lee and Li): https://www.leeandli.com/TW/NewslettersDetail/7197.htm
10. 總統公布個資法修正條文 (Lee and Li): https://www.leeandli.com/TW/NewslettersDetail/7532.htm
11. Taiwan PDPA Data Breach — 72-Hour Rule (Stellex Law): https://stellexlaw.com/en/taiwan-pdpa-data-breach-notification-72-hour-deadline-requirements/
12. 匿名化或假名化？去識別化概念釐清 (hsu.legal): https://hsu.legal/article/58
13. 個人資料去識別化國際規範趨勢 (Airiti Library): https://www.airitilibrary.com/Publication/alDetailedMesh?DocID=P20190905001-N202503180003-00002
14. 有哪些資料是特種個人資料 (Legispedia): https://www.legis-pedia.com/article/government-fundamental-rights/632
15. 使用生成式AI的個資風險 (Legispedia): https://www.legis-pedia.com/article/government-fundamental-rights/1341
16. CIA資安三要素 (SailPoint TW): https://www.sailpoint.com/identity-library/cia-triad
17. 資訊安全 CIA與DAD三要素 (Medium): https://andyludeveloper.medium.com/%E8%B3%87%E8%A8%8A%E5%AE%89%E5%85%A8-cia-%E8%88%87-dad-%E4%B8%89%E8%A6%81%E7%B4%A0%E6%98%AF%E4%BB%80%E9%BA%BC-f8274306caf2
18. OECD Guidelines 8 Privacy Principles (Piwik PRO): https://piwik.pro/blog/oecd-guidelines-8-privacy-principles-to-live-by/
19. OECD Privacy Principles official: https://oecdprivacy.org/
20. 世界經濟合作暨發展組織(OECD)修正隱私保護指導指引 (STLI): https://stli.iii.org.tw/article-detail.aspx?no=64&tp=1&d=6382
21. GDPR介紹 (Maya): https://www.maya.com.tw/share/t-safty-gdpr.php
22. 個資外洩企業最高罰1500萬 (iThome): https://www.ithome.com.tw/news/156904
23. 法源法律網 個資法立法動態: https://www.lawbank.com.tw/news/NewsContent.aspx?NID=207595.00
