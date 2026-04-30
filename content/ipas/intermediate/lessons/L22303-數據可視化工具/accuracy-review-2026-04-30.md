# Accuracy Review — L22303: 數據可視化工具
Date: 2026-04-30

## Summary

Gemini adversarial review ran successfully; Codex CLI unavailable (model version error). Review based on Gemini + independent analysis.

This guide covers chart type selection, Python visualization tools (matplotlib, seaborn, Plotly), BI tools (Tableau, Power BI), and design principles (data-ink ratio, chart junk, pre-attentive attributes, color scales). Technical content is generally strong, but there is **one critical factual error** about Tableau Public that could actively mislead students on the exam, and one imprecise claim about the pre-attentive attribute hierarchy that contradicts the research literature.

## Critical Errors (must fix before publishing)

- **Tableau Public description is directionally wrong**: The guide states "Tableau Public 可免費，但公開分享限制" (free but has public sharing restrictions). This is the opposite of the truth. Tableau Public **requires** all workbooks to be publicly shared — it is not possible to save privately. The "restriction" is on **privacy/confidentiality**, not on the extent of sharing. A student reading this and encountering an exam question like "which tool restricts private data storage?" would give the wrong answer. → **Fix**: Change to "Tableau Public 可免費，但所有作品強制公開分享，不適合存放機密或私有資料" (free, but all work is forced to be publicly shared; unsuitable for confidential or private data).

- **Pre-attentive attribute hierarchy is imprecise**: The guide states "位置 > 顏色 > 大小 > 形狀" (position > color > size > shape). This conflates two different perceptual tasks: (1) **pop-out/detection** (where color IS highly effective) and (2) **quantitative comparison accuracy** (where the Cleveland & McGill 1984 hierarchy places position > length > angle > area > color saturation). Color is excellent for categorical grouping and outlier detection, but is much less accurate than size (length) for comparing magnitudes. The current ranking undersells size/length relative to color for quantitative comparison. → **Fix**: Add a clarification that the hierarchy differs by task: for **比較數值大小 (quantitative comparison)**, position > length/size > color; for **類別分組辨識 (categorical grouping)**, color is highly effective. The simple ranking as stated can mislead on nuanced exam questions.

## Minor Issues

- **violin plot limitation — "not intuitive" is secondary**: The guide lists "對初學者較不直覺" as the limitation. The more technically important limitation is that violin plots use **Kernel Density Estimation (KDE)**, which can produce misleading smooth curves for small sample sizes (n < 30). The KDE bandwidth choice also affects the shape significantly. For an exam question about violin plot limitations, "small sample size misleading" is more likely to appear than "not intuitive." → Fix: Add "當樣本數少時，KDE 平滑曲線可能不代表真實分佈" as the primary technical limitation.

- **seaborn "建立在 matplotlib 上" remains accurate for exam purposes**: Gemini notes that seaborn 0.12+ introduced a more declarative "objects" interface that partially decouples from matplotlib. However, seaborn still renders through matplotlib as its backend, and the guide's framing is correct for the 2026 exam context. No fix required; the current description is exam-appropriate.

- **data-ink ratio "maximize" — Tufte's intent correctly captured**: The guide says to "maximize" data-ink ratio. Technically, complete maximization would mean removing all grid lines and axes, which can hurt readability. The pedagogically sound advice is to "maximize while keeping essential non-data ink." For IPAS exam purposes, "提高" (increase/raise) is safer than "最大化" (maximize). Minor wording fix recommended.

- **Plotly Express vs. Plotly Graph Objects distinction not made**: The guide uses `px.scatter()` examples but doesn't distinguish Plotly Express (high-level, like seaborn for Plotly) from Plotly Graph Objects (low-level, full control). For exam questions that ask about Plotly's API levels, this distinction could appear. Low priority for current IPAS scope.

- **viridis color-blind friendliness — correctly stated**: viridis is designed to be perceptually uniform and safe for the most common forms of color blindness (deuteranopia, protanopia). The guide's claim is accurate.

- **Power BI Desktop free tier — accurately described**: Power BI Desktop is indeed free to download. The limitation (sharing requires Power BI Pro/Premium subscription) is not mentioned but is not wrong. The guide focuses on the desktop creation aspect, which is exam-appropriate.

## Missing Key Concepts

1. **Dual-axis (secondary axis) chart as a misleading visualization**: Business tools like Power BI and Tableau make dual-axis charts easy to create, but they are a classic source of visual manipulation (different scales distort comparison). This is a high-frequency exam topic under "misleading visualizations" — notably absent.
2. **Plotly Dash / Streamlit**: The guide implies Plotly alone handles web dashboards, but Python-native web dashboard frameworks (Dash, Streamlit) are the actual deployment layer. For a 中級 exam, knowing that Plotly charts can be embedded in Dash/Streamlit apps is relevant context.
3. **D3.js**: For completeness in a data visualization tools lesson, D3.js (the underlying web standard library) is notable. However, given the IPAS 中級 scope focuses on Python + BI tools, its absence is justifiable — low priority.

## Terminology Notes

- "公開分享限制" for Tableau Public must be corrected — it implies *limited* public sharing when the reality is *mandatory* public sharing. This is the most important terminology fix.
- "data-ink ratio" correctly attributed to Tufte. The concept is accurately explained.
- "chart junk" correctly defined and examples (3D bar charts, excessive shadows, background images) are appropriate.
- "pre-attentive attributes" (前注意屬性) — term is correct; hierarchy needs nuance per Critical Errors section.
- Five analysis purposes (comparison, distribution, composition, relationship, trend) — these align with standard dataviz frameworks (Few, Knaflic) and are appropriate for the exam.

## Convergence Notes

- Gemini and independent analysis **fully converge** on the Tableau Public critical error (directionally wrong description) — this is confirmed by both reviewers.
- Gemini and independent analysis converge on pre-attentive hierarchy being oversimplified.
- Gemini flagged violin plot KDE limitation and Plotly Dash as missing.
- Codex unavailable — single adversary source.
- Chart type selection content (bar/histogram/line/scatter/box/violin/heatmap/pie) is well-executed and technically accurate across both review perspectives.

## Verdict

**Grade: B+**

Chart selection guidance and Python tool descriptions are accurate and well-structured. The Tableau Public description is factually reversed and must be corrected before publishing — it could directly cause wrong answers on exam questions about tool limitations. Pre-attentive attribute hierarchy needs a nuance note for quantitative comparison vs. categorical detection. Those two fixes make this an A-grade guide.
