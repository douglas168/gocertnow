# Research Notes: L21201 AI導入評估

Research conducted 2026-04-18 for IPAS AI應用規劃師 中級 (115年度) — first sitting 2026-05-23.

## Official Sources

- **iPAS 115 簡章 (官方 PDF, 115.01 版)**: Confirms 中級 has 3 科目; 科目1 = 人工智慧技術應用與規劃 (含 L211 AI核心技術 + L212 AI導入評估規劃 + L213 AI技術應用與系統部署). 計分: 科目1+科目2 ≥70 → 數據分析證書; 科目1+科目3 ≥70 → 機器學習證書. → https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0(%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A)_0105_20260105184002.pdf
- **iPAS 中級 考試樣題 114.01 版 (官方 PDF)**: Sample questions for 中級 科目一. PDF redirected; could not extract verbatim L21201 items via WebFetch — the 樣題 set is small (~10 items per 科目) and skews to 技術 (BERT/GPT, CNN, PCA, MapReduce). No explicit scoring-matrix or TCO arithmetic items surfaced. → https://ipd.nat.gov.tw/ipas/DownloadFile.ashx?filename=...iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E4%B8%AD%E7%B4%9A%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A-%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B41%E6%9C%88%E7%89%88).pdf
- **iPAS 學習資源頁**: Lists 評鑑內容範圍參考 + 學習指引 PDFs (download required, syllabus item one-liners only). → https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources
- **iPAS 考試資訊頁**: Confirms three-subject structure and scoring rule. → https://ipd.nat.gov.tw/ipas/certification/AIAP/exam-info

## Community Insights (exam patterns)

- **CCChen vocus 中級 5/17 第一場 考題收集** (only 中級 sitting in 114 with public recall): 科目一 questions skew to 技術 nouns (BERT, GPT 差異, PCA, CNN 池化, 詞嵌入, 遷移學習, LoRA, RAG, 剪枝). **NO recall of explicit "scoring matrix / TCO / ROI 算術" items** in the 中級 first sitting. → https://vocus.cc/article/68288518fd89780001cf1c5f
- **CCChen 中級 科目一 整理筆記** explicitly tags "AI 導入效能評估" as a topic block: 量化指標 + KPI + A/B test + ROI 分析; example 領域應用 = 預測性維護模型效能、行銷轉換率回測、客服自動化成效. ROI 是被點名的概念; 沒有出現 NPV/IRR. → https://vocus.cc/article/6805fcbdfd89780001e1bd78
- **CCChen 115 簡章分析**: 中級 證書改為 5 年效期 (新), 不再分初/中考相同題庫. → https://vocus.cc/article/694bd68cfd897800011a6314
- **General community pattern (all CCChen 心得)**: 第二場+題目 "需理解文字意思、對名詞需融會貫通"; 不能只刷考古題. 中級 科目一 比初級 科目一 難度提升明顯.
- **Heuristic for L21201 question style**: Most likely concept-recall (e.g. "下列何者屬於 TCO 的構成要素" / "ROI 公式為") + one short calc (payback period, weighted score). 不太可能出現 NPV/IRR 折現現值 計算.

## Current State (technology / pricing — 2025-Q4 / 2026-Q1)

**LLM API pricing reference table** (per 1M tokens, USD; spot-check from vendor + aggregator pages, late 2025/early 2026):

| Model | Input $/1M | Output $/1M | Source |
|---|---|---|---|
| OpenAI GPT-4o | $2.50 | $10.00 | openai.com/api/pricing |
| OpenAI GPT-4o-mini | $0.15 | $0.60 | openai.com/api/pricing |
| Anthropic Claude Sonnet 4.6 | $3.00 | $15.00 | claude.com/pricing |
| Anthropic Claude Haiku 4.5 | $1.00 | $5.00 | claude.com/pricing |
| Google Gemini 2.5 Pro | $1.00 | $10.00 | ai.google.dev/gemini-api/docs/pricing |
| Google Gemini 2.0 Flash | $0.10 | $0.40 | ai.google.dev (DEPRECATED — sunset 2026-06-01) |

- **Cost-control levers worth knowing for exam intuition**: batch API ≈ 50% off; prompt caching ≈ 90% off cached input tokens. Both ride alongside ROI/TCO discussion.
- **Latency benchmarks (TTFT, April 2026)**: Anthropic Claude Sonnet p50 ≈ 500ms / p95 ≈ 900ms; OpenAI GPT-class p50 ≈ 450ms / p95 ≈ 1,200ms; Google Gemini 2.5 Pro p50 ≈ 600ms / p95 ≈ 1,800ms; Groq (Llama 3.3 70B) p50 ≈ 120ms / p95 ≈ 280ms (specialty inference). Source: tokenmix.ai, benchlm.ai, kunalganglani.com 2026 benchmarks. Useful for "latency < 200ms" dual-constraint case — only specialty providers (Groq/SambaNova) clear that bar consistently.

**Taiwan stack:**
- **TAIDE (國科會)**: Llama-2 / Llama-3 / Llama-3.1-8B based 繁中 model; free, open-weight, self-host. Designed for 公部門/企業 with localized 繁中 + 在地知識. Limitation: small parameter count (8B) — not competitive with frontier API quality. → https://taide.tw/
- **中華電信 hicloud AI 算力雲 (2025-08 launch)**: GPU-as-a-Service with NVIDIA MIG 切片 (1/4, 1/2, 1, 2, 4, 8 GPU); 計時計費 (1hr min); 首3個月 65 折. Positioned as the "self-host LLM in Taiwan with data-residency" option. 不是 LLM API — it sells compute, not tokens. → https://www.cht.com.tw/home/enterprise/news/latest-news/2025/0815-1030

## External Documents Found

- **經濟部「中小企業 AI 導入指引」一份單一 PDF — NOT FOUND** as a single document. What exists is a portfolio of programs:
  - 30人以下中小企業數位轉型培力補助 (最高 NT$10萬, 課程+雲端工具) → https://www.sme.gov.tw/30ai/
  - 產業競爭力輔導團 (一條龍: 諮詢診斷→進廠輔導→AI 工具導入) — 2025-10 啟動 → https://www.tca.org.tw/exhibit_info1.php?n=2546
  - 製造業 AI 升級引擎 → https://aimfg.org.tw/
  - 2025 中小企業白皮書 anchor stat: 僅 7.4% 中小企業已導入或規劃導入 AI → https://www.tesa.center/blog/posts/20251227
- **iPAS 中級 past papers**: 114年 had only ONE 中級 sitting (5/17). Official 公告試題 PDF for 中級 not surfaced (initial-level 公告試題 exists for 114 第四次 — 11/2025 sitting). Treat 樣題 + community recall as the only signal until first 115 sitting (2026-05-23).

## Key Findings Summary

1. **L21201 is concept-heavy, not arithmetic-heavy.** No surfaced past 中級 question requires NPV/IRR/break-even math. Most likely format: identify-the-component (TCO 包含哪些), pick-the-formula (ROI = (淨利 − 成本) / 成本 × 100%), or apply-the-rubric (weighted scoring matrix add-up).
2. **The four-criteria scoring matrix is industry-standard and survives the exam.** Vendor evaluation literature converges on 5-8 criteria: 技術契合度, 資料治理/安全, 整合性, 商業條款 (TCO), 衡量價值 (ROI), 供應商風險. The boundary-map.md scope (4-6 criteria) matches this — keep it tight.
3. **Build-vs-buy framing is the natural backbone.** Managed API (低 capex, 高 token cost, 資料外流風險) vs open-weight self-host (TAIDE on hicloud GPU 切片, 高 capex, 高人力, 資料留在台灣). Hybrid is the 2025/2026 mainstream answer.
4. **Solution-selection ladder (cost/complexity ascending): Prompt → RAG → Fine-tune → From-scratch.** 75-85% accuracy from prompt alone; 88-94% from RAG; 92-97% from fine-tune. Default rule = start at the cheapest tier that meets KPI; only escalate when a specific failure mode (hallucination → RAG; behavior shape → fine-tune) is unavoidable.
5. **Dual-constraint case is realistic.** "latency p95 < 200ms AND cost < $X / 1k tokens" filters ~all frontier APIs (Claude/GPT/Gemini all p95 > 800ms TTFT). The honest answer is specialty inference (Groq, SambaNova) or self-host on hicloud — exam-relevant insight that vendor choice depends on whether the latency budget is human-readable (<2s OK) or machine-pipeline (<200ms hard).

## Scope Notes

- **Out of scope (belongs to L21202 規劃)**: requirements gathering, RACI, 5-phase roadmap, change management, stakeholder mapping, project plan templates. If a sample question reads "在導入計畫的第二階段應該…" → that is L21202.
- **Out of scope (belongs to L21203 風險管理)**: 模型偏誤識別, GDPR/個資法遵循 detail, hallucination 防護機制 設計, AI 倫理框架. L21201 may *list* "vendor risk / 資料隱私" as one criterion in the matrix but should NOT teach mitigation.
- **Boundary vs 初級 L12301 生成式AI導入評估**: 初級 = checklist-style "should non-technical PM adopt this GenAI tool?" (3-5 yes/no items). 中級 L21201 = practitioner-grade weighted-scoring matrix + ROI/TCO arithmetic to defend a written architecture choice. Do not regress to checklist depth.
- **Math depth**: Stay at weighted-sum (Σ wᵢ × scoreᵢ) + ROI = (收益 − 成本) / 成本 × 100% + payback = 初始投資 / 年淨利. NPV/IRR/折現 are above the 中級 bar — mention by name only, do not teach the formula.
- **Taiwan-specific anchors to reinforce in the lesson**: TAIDE (國科會, 開源繁中), 中華電信 hicloud AI 算力雲 (在地 GPU), 經濟部產發署輔導團 + 30人以下補助 (政策入口). Avoid claiming a single "AI 導入指引 白皮書" exists — it doesn't.
