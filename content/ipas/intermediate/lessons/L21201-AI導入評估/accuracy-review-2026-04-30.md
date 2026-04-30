# Accuracy Review — L21201: AI導入評估
Date: 2026-04-30
Reviewers: Claude (independent) + Gemini (adversarial)

---

## Summary

The guide's structure (5-stage funnel, decision trees, Trap Clinic) is pedagogically strong. The ROI/TCO/Payback framework is directionally correct, the Build vs Buy vs Hybrid logic is sound, and the dual-constraint-before-weighted-scoring ordering is correct and well-drilled.

However, two errors are publication-blocking: a fatal arithmetic error in Q8 that will teach the wrong formula application, and a wrong TAIDE base-model claim. Additionally, two conceptual labels (anchoring bias, Payback Period denominator) are imprecise in ways that could generate wrong answers on theory questions.

Convergence: Claude and Gemini independently flagged all four major issues.

---

## Critical Errors (must fix before publishing)

### Error 1: Q8 Break-even arithmetic is wrong by a factor of 10
- **Location**: Section 10 Q8 (Practice Questions)
- **Claim**: "自建 GPU 固定成本每月 NT$100,000；API 每萬請求 NT$2,000 → Break-even = 50,000 次/月（答案 B）"
- **Error**: This is a fatal unit error. If API costs NT$2,000 per 萬 (10,000) requests, the per-request cost is NT$0.2. Break-even = Fixed Cost ÷ Per-Request API Cost = 100,000 ÷ 0.2 = **500,000 requests/month**, not 50,000. The guide's answer B (50,000) is wrong by exactly one order of magnitude. Students who learn this example will derive the wrong break-even in exam scenarios.
- **Fix Option A**: Fix the numbers to make 50,000 correct — change the API price to NT$2,000 per 1,000 requests (not per 10,000), or change the fixed cost to NT$10,000/month.
- **Fix Option B**: Fix the answer to 500,000 requests/month and update the interpretation row.
- **Recommended**: Fix Option A — change "每萬請求 NT$2,000" to "每千請求 NT$2,000" (NT$2/request), which gives Break-even = 100,000 ÷ 2 = 50,000 requests. This keeps the answer B correct and the arithmetic clean.

### Error 2: TAIDE base model is wrong
- **Location**: Section 3 ("TAIDE（國科會 Llama-3.1-8B 衍生）")
- **Claim**: "TAIDE 基於 Llama-3.1-8B"
- **Error**: The primary TAIDE release (TAIDE-LX-7B-Chat) is based on **Meta LLaMA 2 (7B)**, not Llama 3.1. The National Science and Technology Council (國科會) announced TAIDE in 2024 as a LLaMA 2-derived model. A newer TAIDE-LX2 series was subsequently developed on Llama 3, but the canonical TAIDE product students and IPAS exams refer to is LLaMA 2-based. Claiming Llama-3.1-8B conflates the model generation and introduces a factual error on a Taiwan-specific technology that is directly relevant to the exam (data residency, national AI strategy).
- **Fix**: Update to "TAIDE-LX（國科會主導，基於 Meta LLaMA 2 7B 繁中微調；後續 TAIDE-LX2 系列採 Llama 3）"

---

## Minor Issues

### Issue 3: "Anchoring Bias" is the wrong cognitive bias label for this scenario
- **Location**: Section 6 (Step 2 note), Trap 6, Q13, Q16, Final Oral Recall item 5
- **Claim**: "看到分數後回頭調權重 = anchoring bias（錨定偏誤）"
- **Problem**: Anchoring bias (錨定偏誤) specifically refers to over-relying on the *first* piece of information encountered. Adjusting weights after seeing scores to favor a preferred outcome is more precisely **confirmation bias** (確認偏誤) or **post-hoc rationalization** (事後合理化) — the guide correctly uses "post-hoc rationalization" in Trap 9 for PoC success criteria, but uses "anchoring bias" for the same type of behavior in the scoring matrix. These are different biases. On an IPAS theory question about "which cognitive bias describes adjusting weights after seeing results," anchoring may not be among the correct options.
- **Fix**: Replace "anchoring bias" with "確認偏誤 (confirmation bias) 或事後合理化 (post-hoc rationalization)" in Section 6 and Trap 6. Note that some decision science textbooks do call this "anchoring" because the initial score "anchors" the weight decision — acknowledge both but use the more precise term.

### Issue 4: Payback Period denominator conceptually imprecise
- **Location**: Section 5 formula definition, Q6
- **Claim**: "Payback Period = 投資 ÷ 年度淨效益"
- **Problem**: Standard Payback Period (回收期) uses annual cash *inflows* as denominator, not "net benefit." Net benefit (淨效益) = Total Benefit − Total Cost, which is a different construct than annual cash flow. For AI investments, this may include intangible benefits or savings that are not cash flows. The Q6 example happens to be self-consistent (using the numbers from Q5), but the formula label is imprecise and could be exploited in a tricky exam question where "annual cash inflow" and "annual net benefit" differ.
- **Fix**: Add a clarifying note: "嚴格財務定義中，分母為『年度現金流入 (Annual Cash Inflow)』而非『淨效益』。在本課 AI 導入評估情境中，年度淨效益 = 每年節省的成本 + 每年增加的收入，可視同現金流入。中級考試採用本課簡化定義即可。"

### Issue 5: Break-even formula inconsistency between Section 5 and Q8
- **Location**: Section 5 formula box, Q8
- **Problem**: Section 5 defines Break-even = 固定成本 ÷ (API 單價 − 自建單位變動成本). Q8's worked example divides 100,000 ÷ 2,000 without subtracting any self-build variable cost. This means either the self-build variable cost is assumed to be zero (which should be stated explicitly) or the formula is not being applied consistently.
- **Fix**: In Q8, state "假設自建邊際成本接近 0（電費可忽略），故 Break-even ≈ 固定成本 ÷ API 單價" to make the simplification explicit. Alternatively, add a self-build variable cost parameter to the example.

### Issue 6: Latency figures for frontier APIs are presented as stable facts
- **Location**: Section 7 Worked Case table ("OpenAI GPT-4o ~1,200ms", "GPT-4o-mini ~900ms")
- **Problem**: p95 latency for commercial API providers varies significantly by region, time of day, load, and deployment configuration. Citing specific ms figures as exam-prep facts is inappropriate for a 2026 exam — these numbers were likely measured at a particular point and will change. GPT-4o-mini TTFT is often well below 500ms in 2025.
- **Fix**: Replace specific ms values with qualitative descriptions: "主流 frontier API 的 p95 latency 通常在數百 ms 至數秒（視地區與負載），普遍無法達到 200ms 即時客服需求" and remove the specific ms figures.

### Issue 7: Solution Ladder accuracy ranges are invented heuristics
- **Location**: Section 4 ladder diagram ("Prompt Engineering 70–85%*", "RAG 85–94%*", etc.)
- **Problem**: These accuracy ranges have no standard source — they vary dramatically by task type, domain, and model. The asterisk disclaimer ("典型範圍，依任務而定，請以實測為準") partially mitigates this, but students may still memorize these as exam facts.
- **Fix**: Remove the specific percentage ranges entirely. Replace with relative comparative language: "Prompt < RAG < Fine-tune，各方案準確率差異取決於任務複雜度，不存在通用數字。"

---

## Missing Key Concepts

1. **Discounted Payback Period**: The guide teaches only Simple Payback Period. The distinction between simple and discounted (considering time value of money) is a common intermediate-level exam trap. Should at least be named.

2. **GPU Utilization Rate and TCO**: TCO for self-hosted models is heavily dependent on utilization. A GPU cluster running at 20% utilization has 5x the effective cost per inference. This is a critical factor in Build vs Buy decisions that the guide omits.

3. **Chinese tokenizer efficiency penalty**: For Taiwan-context deployments, Chinese text incurs higher token counts with most frontier LLM tokenizers (vs. TAIDE or Llama 3's improved Chinese tokenization). This directly affects TCO calculation for Chinese-language applications — a practical exam topic.

4. **Cold Start Latency**: Serverless self-hosted deployments have cold start penalties that can violate latency SLAs. The guide discusses p95 latency but not the cold start scenario.

---

## Terminology Notes

| Guide term | Status | Recommendation |
|---|---|---|
| 雙約束過濾 (Dual-Constraint Filtering) | Non-standard; likely pedagogical invention | Acceptable as mnemonic; note that ITRI may use 可行性過濾 or 多準則篩選 |
| 準·延·量·伸·靠 | Mnemonic, not formal | Good for retention; ensure students know formal terms: 準確率·延遲·吞吐量·可擴展性·可靠性 |
| 錨定偏誤 (Anchoring Bias) | Wrong label for this scenario | See Issue 3 — change to 確認偏誤 / 事後合理化 |
| TCO / ROI / CapEx / OpEx | Mix of English/Chinese | Add formal Chinese equivalents: 總擁有成本 / 投資報酬率 / 資本支出 / 營運支出 |
| 加權評分矩陣 | Standard Chinese translation | Keep |
| Build vs Buy vs Hybrid | English terms dominant | Add: 自建 / 外購 / 混合 as ITRI may use Chinese terms in exams |

---

## Convergence Notes

Both Claude and Gemini independently flagged:
- Q8 arithmetic error (fatal, 10x magnitude error)
- TAIDE base model inaccuracy (Llama-3.1-8B vs LLaMA 2)
- Anchoring bias vs. post-hoc rationalization terminology issue
- Payback Period "淨效益" vs "現金流入" precision issue
- Solution ladder accuracy ranges as invented numbers

Gemini additionally flagged: tokenization cost for Chinese text, cold start latency, GPU utilization impact on TCO. These are valid additions for a v3 refresh.

---

## Verdict

**Grade: B-**

The evaluation framework (5-stage funnel, dual-constraint-then-weighted-scoring, ROI/TCO/Payback structure, PoC pre-defined criteria) is accurate and well-presented. The Trap Clinic is valuable. But the Q8 arithmetic error alone is publication-blocking — a student who memorizes this example will derive wrong break-even calculations on the actual exam. The TAIDE base model error is also a factual inaccuracy about a Taiwan-specific national AI program that IPAS examiners are likely to test precisely.

**Publish-blocking: 2 critical errors (Q8 math, TAIDE base model). Fix these two before publishing. Issues 3–7 should be addressed in the same pass.**
