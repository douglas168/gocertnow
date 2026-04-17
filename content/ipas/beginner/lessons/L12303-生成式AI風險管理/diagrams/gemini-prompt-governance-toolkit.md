# Gemini Image Prompt — 規劃者風險治理四件套 + 三法對齊 Infographic

**Purpose:** A polished landscape infographic summarizing the planner-level risk governance toolkit (Guardrails / HITL / Red Team / Incident Response) and how each tool maps to specific GenAI risks and to Taiwan's "三法" (人工智慧基本法 / 個資法 / 著作權法). For embedding near the top of `study-guide.md` Section 3.8.

**Target tool:** Gemini 2.5 (Nano Banana / Imagen 3) or equivalent image generation model.

**Target placement:** Top of L12303 study guide Section 3.8 "規劃者的緩解工具四件套" — single hero image.

---

## Prompt

```
Create a clean, professional landscape infographic titled "規劃者風險治理四件套 × 台灣三法對齊" (Planner's GenAI Risk Governance Toolkit × Taiwan Three-Law Alignment).

Overall style:
- Flat, modern, corporate-friendly illustration (no stock photos, no emoji)
- Dark mode friendly: deep navy (#0f172a) background with light text
- Accent palette: navy #1e3a8a, teal #0f766e, amber #b45309, crimson #991b1b
- Traditional Chinese (繁體中文) labels as primary, with small English subtitles underneath
- LevelCert brand feel: minimal, data-dense but readable, line-art icons only
- No fake product UI screenshots, no fictional logos

Layout (landscape 1920 × 1080):

1. Header band (top 10%):
   Title on left: "規劃者風險治理四件套"
   Subtitle on right (smaller, lighter): "Planner's GenAI Risk Governance Toolkit × 台灣三法"
   Thin horizontal divider line below.

2. Center band (middle 60%): 四件套 toolkit cards — 4 equal-width cards arranged left-to-right.

   Card 1 — Guardrails 護欄
     Icon: shield with filter lines (line-art)
     Label: 護欄 Guardrails
     Sub-label: 輸入／輸出過濾規則
     Mitigates (bullet list, small text):
       • 幻覺 Hallucination
       • Prompt Injection（OWASP LLM01）
       • 提示洩漏 Prompt Leakage
       • 濫用 Misuse

   Card 2 — HITL 人工在環
     Icon: human silhouette + feedback loop arrow
     Label: 人工在環 HITL (Human-in-the-Loop)
     Sub-label: 高風險事前／即時覆核
     Mitigates:
       • 偏見 Bias（高風險決策）
       • 幻覺（醫療／金融／人事）
       • 個資誤用 PII Misuse
       • 合規例外審查

   Card 3 — Red Team 紅隊演練
     Icon: target crosshair + magnifying glass
     Label: 紅隊演練 Red Team
     Sub-label: 事前模擬攻擊找破口
     Mitigates:
       • Prompt Injection（三子類）
       • Jailbreak 越獄
       • 深偽 Deepfake 攻擊面
       • 湧現行為 Emergent Behavior

   Card 4 — Incident Response 事件應變
     Icon: siren + SOP checklist
     Label: 事件應變 Incident Response
     Sub-label: 出事後通報／止血／對外溝通
     Mitigates:
       • 訓練資料外洩
       • 錯假訊息擴散
       • 深偽冒名事件
       • 模型失準 Drift

   Between each card: thin vertical divider, color-coded badge showing "mitigates" count.

3. Bottom band (bottom 30%): 三法對齊 bar — three law cards arranged left-to-right.

   Law 1 — 人工智慧基本法 (2025-12-24 三讀通過)
     Planner-level reference:
       • 中央主管機關：國科會
       • §16 風險分級由 moda 數位發展部訂定 🔥
       • 七原則：永續/自主/隱私/資安/透明/公平/問責
     Connected (with thin lines) to: Guardrails + HITL cards above

   Law 2 — 個資法 Personal Data Protection Act
     Planner-level reference:
       • §20 特定目的外利用
       • §27 安全維護義務
       • 去識別化 ≠ 零風險
     Connected to: HITL + Incident Response cards above

   Law 3 — 著作權法 Copyright Act
     Planner-level reference:
       • 智慧局 2023-06 函釋
       • 純 AI 產出 → 不受保護
       • 訓練資料抓取 → 屬重製
     Connected to: Guardrails + Red Team cards above

Typography:
- Title: bold sans-serif, 繁體中文 friendly (Noto Sans TC / PingFang TC feel)
- Card headings: bold sans-serif, ~24px equivalent
- Body bullets: regular sans-serif, ~14–16px equivalent
- Avoid serif Chinese fonts; avoid decorative fonts

Visual rules:
- Consistent card corner radius (~12px)
- Consistent icon style: line-art, 2px stroke, monochrome on dark background
- Use color sparingly: one accent color per card (amber / teal / crimson / navy)
- All text must be legible at 1920×1080 — no over-crowding

Dimensions: 1920 × 1080 (landscape, 16:9)
No watermark. No decorative flourishes. No emoji characters rendered in the image itself (🔥 etc. in this prompt are only to signal "high frequency exam point" — the final image should use a small red dot or amber tag instead).

Output: one single PNG at 1920 × 1080, transparent or #0f172a background.
```

---

## Text content summary (for designer reference)

**四件套卡片文字（繁體中文）**

| Card | 中文標題 | 英文 | 一句話定義 | planner 角色 |
|---|---|---|---|---|
| 1 | 護欄 | Guardrails | 輸入／輸出過濾規則，擋掉違規請求與產出 | 定義哪些主題不能回答 |
| 2 | 人工在環 | HITL | 高風險決策事前或即時由人覆核 | 劃出哪些情境必須 HITL |
| 3 | 紅隊演練 | Red Team | 事前模擬攻擊、找破口 | 編預算、排期、找外部顧問 |
| 4 | 事件應變 | Incident Response | 出事後的通報、止血、對外溝通流程 | 寫 SOP、指定負責人、演練 |

**三法對齊文字（繁體中文）**

| 法規 | planner 層級引用 | 對應工具 |
|---|---|---|
| 人工智慧基本法（2025-12-24 三讀） | 中央主管：國科會／§16 風險分級：moda／七原則 | Guardrails + HITL |
| 個資法 | §20 特定目的外利用／§27 安全維護／去識別化非零風險 | HITL + Incident Response |
| 著作權法 | 智慧局 2023-06 函釋／純 AI 產出不受保護／訓練資料屬重製 | Guardrails + Red Team |

---

## Style notes (LevelCert brand)

- **Dark-mode friendly:** background #0f172a (slate-900) or pure black; all text white or very light slate (#e2e8f0).
- **Accent palette (consistent across all L12xxx diagrams):** navy `#1e3a8a`, teal `#0f766e`, amber `#b45309`, crimson `#991b1b`.
- **No fake UI:** do not render fictional ChatGPT/Gemini interface screenshots.
- **No emoji in final art:** the 🔥 / ⚖️ / 🛡️ symbols in this prompt are author signals — the final infographic should use small colored dots or tag badges instead.
- **繁體中文 primary, English secondary:** every concept gets 繁體中文 as the main label, English as supporting translation.
- **Typography hierarchy:** title > card heading > sub-label > bullets (4 levels max).

---

## Output instructions (for Claude / Codex when actually rendering)

1. Send the **Prompt** block above to Gemini 2.5 / Imagen 3.
2. Save output as `diagrams/governance-toolkit.png` in this lesson folder.
3. If the model struggles with 繁體中文 glyph rendering (common failure mode), fall back to:
   - Render the infographic with English labels only, then
   - Overlay 繁體中文 labels via a separate image editor (Figma / Photoshop) using Noto Sans TC or PingFang TC.
4. Verify at 100% zoom that all bullet points are legible; re-render at higher resolution if needed.
5. The Mermaid files `01-risk-taxonomy.mmd` and `03-risk-matrix-4quadrant.mmd` are the structural source of truth — this infographic is a polished visual supplement, not a replacement.

---

## Related diagrams

- `01-risk-taxonomy.mmd` — Risk taxonomy tree (三大類 + 子類)
- `02-injection-vs-engineering.mmd` — Prompt Injection vs Engineering decision tree
- `03-risk-matrix-4quadrant.mmd` — 4-quadrant risk matrix with example placements
- `gemini-prompt-governance-toolkit.md` — (this file)
