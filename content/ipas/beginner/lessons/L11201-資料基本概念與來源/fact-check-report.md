# Fact Check Report: L11201 資料基本概念與來源

> Checked: 2026-04-08
> Source file: `research-notes.md`
> Study guide: not yet generated (file does not exist)

## Summary
- Verified claims: 14
- Flagged issues: 5 (1 error, 2 stale/inaccurate, 2 unverified)

---

## Verified Claims

- [OK] "Doug Laney 於 2001 年首先提出 3V（Volume, Velocity, Variety）" — Confirmed. Published as "3D Data Management: Controlling Data Volume, Velocity, and Variety" by META Group (now Gartner) in February 2001. ([BibSonomy](https://www.bibsonomy.org/bibtex/742811cb00b303261f79a98e9b80bf49), [TechTarget](https://www.techtarget.com/whatis/definition/3Vs))

- [OK] "後續擴展為 4V（加 Veracity）和 5V（加 Value）" — Confirmed. The 4th and 5th Vs were added over time by various authors; no single person is universally credited. The claim does not attribute them to Laney, which is correct. ([TechTarget 5Vs](https://www.techtarget.com/searchdatamanagement/definition/5-Vs-of-big-data))

- [OK] Volume, Velocity, Variety, Veracity, Value definitions — All five definitions in the research notes are accurate and consistent with standard references.

- [OK] "GIGO 原則（Garbage In, Garbage Out）" — Confirmed as a well-established computer science principle. The notes correctly use it under Veracity without attributing it to a specific person. The phrase dates to at least 1957. ([Wikipedia](https://en.wikipedia.org/wiki/Garbage_in,_garbage_out))

- [OK] "結構化及半結構化資料僅佔總體數據約 20%，剩餘 80% 為非結構化資料" — Confirmed. IDC and multiple sources cite that approximately 80% of global data is unstructured. ([VentureBeat](https://venturebeat.com/data-infrastructure/report-80-of-global-datasphere-will-be-unstructured-by-2025/), [IBM Blog](https://www.ibm.com/blog/managing-unstructured-data/))

- [OK] "JSON 是半結構化資料" — Confirmed. JSON has key-value pairs and hierarchical structure but no fixed schema, making it the textbook example of semi-structured data. ([Wikipedia — Semi-structured data](https://en.wikipedia.org/wiki/Semi-structured_data), [AltexSoft](https://www.altexsoft.com/blog/semi-structured-data/))

- [OK] "電子郵件是半結構化資料" — Confirmed. Emails have structured fields (sender, recipient, subject, date) but unstructured body text, making them a classic semi-structured example. ([Snowflake](https://www.snowflake.com/en/fundamentals/semi-structured-data/), [Redis](https://redis.io/glossary/semi-structured-data/))

- [OK] "CSV 是結構化資料的常見儲存格式" — Confirmed. CSV files have fixed column delimiters and row-per-record format, and are universally treated as structured data in data science contexts. ([Quora](https://www.quora.com/Is-CSV-structured-data))

- [OK] "data.gov.tw 提供 CSV、XML、JSON、OLAP、TXT 等多種格式" — Confirmed via the platform itself and Wikipedia entry on 政府資料開放平臺.

- [OK] "健保資料庫 2,300 萬人就診紀錄" — Confirmed. Taiwan's NHI covers approximately 23 million people (99.9% of the population). The figure is a reasonable approximation. ([行政院](https://www.ey.gov.tw/state/A01F61B9E9A9758D/a8110473-da2f-4c3f-84da-aeebbd92aab9))

- [OK] "EASY SHOP AI 推薦系統轉換率成長 390%" — Confirmed. awoo AMP's AI recommendation system achieved 390% growth in product recommendation conversion for EASY SHOP, and 5.2x increase in Pop-up recommendation conversion. ([INSIDE](https://www.inside.com.tw/article/33557-awooxeasyshop))

- [OK] "Data type → AI technique mappings (text→NLP, image→CV, numerical→regression)" — Confirmed as standard mappings used in AI/ML education materials. These are definitional-level associations.

- [OK] "四字箴言: 大、快、雜、疑" — Confirmed as a commonly used Taiwanese mnemonic for the first 4Vs of Big Data. ([INSIDE](https://www.inside.com.tw/article/4356-big-data-1-origin-and-4vs))

- [OK] "data.gov.tw 依據《政府資訊公開法》建立" — Partially confirmed. The platform is based on 《政府資訊公開法》 as the legal foundation, with the 2012 行政院 "政府資料開放作業原則" as the operational framework. The claim is acceptable for exam purposes.

---

## Flagged Issues

### Errors

#### 1. data.gov.tw 高應用價值主題：八大領域 → 實際為九大領域
- **Claim**: "優先聚焦八大領域：農業永續、空間資訊、氣候環境、災害防救、交通運輸、健康醫療、能源管理、社會救助"
- **Finding**: The official 高應用價值主題專區 on data.gov.tw lists **9 themes**, not 8. The missing theme is **企業永續**. The full list: 農業永續、空間資訊、氣候環境、災害防救、交通運輸、健康醫療、能源管理、社會救助、**企業永續**.
- **Source**: [data.gov.tw 高應用價值主題專區](https://data.gov.tw/high_value_datasets)
- **Risk**: HIGH — if an exam question lists 9 themes or includes 企業永續, students relying on "8 themes" would get it wrong.
- **Suggested fix**: Change "八大領域" to "九大領域" and add 企業永續 to the list. Note that the platform states themes may continue to expand.

### Stale Information

#### 2. Doug Laney described as "Gartner 分析師" — technically he was at META Group in 2001
- **Claim**: "Gartner 分析師 Doug Laney 於 2001 年首先提出 3V"
- **Finding**: In 2001, Laney was at **META Group**, not Gartner. META Group was later acquired by Gartner (in 2005). While many sources loosely say "Gartner analyst," the technically accurate attribution is "META Group analyst." Some sources write "META Group (now Gartner)."
- **Source**: [SCIRP Reference](https://www.scirp.org/reference/ReferencesPapers?ReferenceID=1611280), [TechTarget](https://www.techtarget.com/whatis/definition/3Vs)
- **Risk**: LOW — most exam prep materials say "Gartner," and iPAS is unlikely to test this distinction. However, for factual accuracy, it should be noted.
- **Suggested fix**: Change to "META Group（後被 Gartner 收購）分析師 Doug Laney" or keep "Gartner 分析師" with a footnote.

#### 3. 北醫大「健康存摺 2.0」整合生物資料庫預測肝癌風險 — attribution may be inaccurate
- **Claim**: "北醫大『健康存摺 2.0』整合生物資料庫預測肝癌風險，準確率達 80%"
- **Finding**: The "肝癌風險預測準確率達 80%" claim is verified, but it appears to originate from a different research team. The REACH-B model was developed by 中研院陳建仁院士 et al. A separate study by 台北榮總大數據中心 吳俊穎 team (with 輔大醫院 and 香港中文大學) also achieved 80%+ accuracy. Neither is clearly attributed to "北醫大 + 健康存摺 2.0." The "健康存摺" is a feature of the 健保快易通 APP run by 健保署, not by 北醫大.
- **Source**: [健康2.0 — 大數據立功！肝癌預測模式找到了](https://health.tvbs.com.tw/medical/313405)
- **Risk**: MEDIUM — the 80% accuracy figure is real, but the attribution to 北醫大 and 健康存摺 2.0 may be a conflation of multiple sources.
- **Suggested fix**: Either verify the exact 北醫大 study or replace with the more clearly sourced 台北榮總/中研院 example. Consider simply saying "台灣研究團隊利用健保大數據建立肝癌預測模型，準確率達 80%."

### Unsupported Claims

(none)

### Unverified

#### 4. 臺北市大數據中心 COVID-19 跨年實聯制儀表板
- **Claim**: "臺北市大數據中心：COVID-19跨年實聯制儀表板即時監控進場人數"
- **Finding**: The iThome source is cited but could not be fully verified via web search. The claim is plausible — Taipei's Big Data Center is well-documented as handling COVID-related dashboards — but the specific "跨年實聯制儀表板" detail could not be independently confirmed in this check.
- **Risk**: LOW — this is used as an illustrative example, not a testable exam fact.
- **Status**: [UNVERIFIED] — recommend keeping but marking as illustrative example rather than a precise factual claim.

#### 5. "大、快、雜、疑" as the standard Taiwanese mnemonic
- **Claim**: "四字箴言: 大、快、雜、疑 分別對應 Volume、Velocity、Variety、Veracity（台灣常用的記憶口訣）"
- **Finding**: Confirmed via INSIDE article. However, different sources use slightly different mnemonics. The mapping is: 大=Volume, 快=Velocity, 雜=Variety, 疑=Veracity. This checks out.
- **Status**: [OK after re-check] — upgraded to verified.

---

## Notes for Study Guide Author

1. **Priority fix**: Change "八大領域" to "九大領域" and add 企業永續 — this is the only error that could directly cause a wrong exam answer.
2. The 80/20 structured/unstructured split is widely cited but note that some sources now say 80-90% is unstructured. Using "approximately 80%" is safe for exam purposes.
3. The GIGO principle does not have a single universally agreed originator — do not attribute it to a specific person. The notes correctly avoid this.
4. For the 5Vs, the original 3Vs (Laney 2001) are rock-solid. The 4th and 5th Vs are industry additions without a single canonical source — present them as "commonly accepted extensions."
5. The EASY SHOP 390% claim is verified but comes from a marketing case study by awoo (the vendor). This is fine as an illustrative example but students should understand it is a vendor-reported metric.
