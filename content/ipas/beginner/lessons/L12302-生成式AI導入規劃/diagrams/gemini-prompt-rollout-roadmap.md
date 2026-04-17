# Gemini Image Prompt — 生成式AI 導入路線圖 Infographic

**Purpose:** A polished infographic summarizing the four-phase rollout with SMART / OKR goals, resource 4-dimensions, POC→Pilot→Scale progression, and Exit Criteria gates — for embedding at the top of `study-guide.md` Section 3.

**Target tool:** Gemini 2.5 (Nano Banana / Imagen) or equivalent.

---

## Prompt

```
Create a clean, professional vertical infographic titled "生成式 AI 導入規劃路線圖" (GenAI Adoption Planning Roadmap).

Style:
- Flat, modern, corporate-friendly illustration
- Dark navy (#1e3a8a) + teal (#0f766e) + amber (#b45309) palette on a light background
- Traditional Chinese (繁體中文) labels, with small English subtitles
- No stock photos, no emoji — icons only (use line-art icons)

Layout (top → bottom):

1. Header band: "生成式 AI 導入規劃路線圖 / GenAI Adoption Planning Roadmap"

2. Four horizontal phase cards, left-to-right with connecting arrows:
   [① 目標設置 Goal] → [② 資源規劃 Resource] → [③ 試行測試 Pilot] → [④ 擴大部署 Scale]
   Between each phase: a small amber "Exit Criteria" gate icon.

3. Below the four phases, a pyramid/2x2 showing the four resource dimensions:
   - 👥 人 People
   - 💰 錢 Money
   - 📊 料 Data
   - ⏱ 時 Time

4. Bottom strip: progression bar "POC (2–4 週) → Pilot (1–3 月) → Scale (3–6 月)"

5. Right sidebar callout: three small icons for 因應措施
   - Fallback（降級）
   - Rollback（版本回退）
   - HITL（人工介入）

Typography:
- Headings: bold sans-serif
- Body: readable sans-serif, 14–16px equivalent
- Avoid serif Chinese fonts

Dimensions: 1200 × 1800 (3:2 vertical, social-share friendly).
No watermark. No extra decorative elements.
```

---

## Notes for the designer

- Keep all 繁體中文 labels identical to the study guide to avoid confusion.
- If the model struggles with Chinese glyphs, fall back to rendering labels in English and overlaying Chinese text via a separate image editor.
- The Mermaid file `four-phase-rollout.mmd` is the structural source of truth — this infographic is a polished visual supplement.
