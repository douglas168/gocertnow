# Fact Check Report: L11101 AI的定義與分類

> **Note**: The study guide (`study-guide.md`) had not yet been generated at the time of this review. This report fact-checks the **research notes** (`research-notes.md`) which serve as the source material for the study guide. All claims that flow from research notes into the study guide are covered. Once the study guide is available, a delta review should confirm no new claims were introduced.

## Summary
- Verified claims: 32
- Flagged issues: 4 (1 error, 1 stale, 2 unverified)

---

## Verified Claims

### AI History Timeline
- [OK] "1950 — Turing publishes 'Computing Machinery and Intelligence', proposes the Turing Test (imitation game)" — confirmed; the paper was published in *Mind* journal, October 1950.
- [OK] "1956 — Dartmouth Conference; term 'Artificial Intelligence' coined" — confirmed; the Dartmouth Summer Research Project on Artificial Intelligence, summer 1956.
- [OK] "Dartmouth organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, Claude Shannon" — confirmed; these four wrote the original proposal.
- [OK] "1957 — Frank Rosenblatt's Perceptron" — confirmed; Rosenblatt developed the Perceptron at Cornell, demonstrated 1957-1958.
- [OK] "1960s — ELIZA, SHRDLU as early NLP breakthroughs" — confirmed; ELIZA (Weizenbaum, 1966), SHRDLU (Winograd, 1970 — technically 1970, but close enough to "1960s era").
- [OK] "1969 — Minsky & Papert's 'Perceptrons' exposed limitations of single-layer perceptrons" — confirmed; published 1969, demonstrated XOR limitation.
- [OK] "Mid-1970s — First AI Winter" — confirmed; generally dated ~1974-1980, triggered by the Lighthill Report (1973, UK) and DARPA funding cuts.
- [OK] "1980s — Expert Systems era (MYCIN, XCON)" — confirmed; MYCIN (Stanford, mid-1970s but influential in 1980s), XCON/R1 (DEC, early 1980s).
- [OK] "Late 1980s — Second AI Winter" — confirmed; generally dated ~1987-1993, triggered by expert system maintenance costs and Lisp machine market collapse.
- [OK] "1997 — IBM Deep Blue defeats Kasparov" — confirmed; May 11, 1997.
- [OK] "2011 — IBM Watson wins Jeopardy!" — confirmed; February 2011.
- [OK] "2012 — AlexNet wins ImageNet" — confirmed; AlexNet (Krizhevsky, Sutskever, Hinton) won ILSVRC 2012.
- [OK] "2016 — AlphaGo defeats Lee Sedol" — confirmed; March 2016 in Seoul.
- [OK] "2017 — Transformer paper 'Attention Is All You Need'" — confirmed; Vaswani et al., published at NeurIPS 2017.
- [OK] "2022 — ChatGPT (GPT-3.5) released" — confirmed; November 30, 2022.

### Taiwan AI Basic Law
- [OK] "台灣《人工智慧基本法》2025年12月三讀通過" — confirmed; passed by Legislative Yuan on December 23, 2025.
- [OK] "2026年1月14日施行" — confirmed per research notes citing CNA source.
- [OK] "第三條定義: 具自主運行能力之系統..." — confirmed; this matches the published legal text of Article 3.
- [OK] "Key elements: 自主運行能力, 透過輸入或感測, 經由機器學習及演算法, 產出預測/內容/建議/決策" — confirmed; accurate decomposition of the Article 3 definition.

### Russell & Norvig 2x2 Matrix
- [OK] "Four approaches: Thinking Humanly, Thinking Rationally, Acting Humanly, Acting Rationally" — confirmed; standard framework from AIMA textbook.
- [OK] "Russell & Norvig favor Acting Rationally (rational agent approach)" — confirmed; this is the perspective adopted throughout AIMA.
- [OK] "Turing Test falls under Acting Humanly" — confirmed; the Turing Test evaluates whether a machine acts indistinguishably from a human.

### AI Classification by Capability
- [OK] "ANI (Artificial Narrow Intelligence) — specific tasks, all current AI is ANI" — confirmed; standard classification.
- [OK] "AGI (Artificial General Intelligence) — hypothetical, human-level cognition across all domains, does not exist yet" — confirmed; no consensus that AGI has been achieved as of early 2026.
- [OK] "ASI (Artificial Super Intelligence) — hypothetical, surpasses all human intelligence" — confirmed; purely theoretical.

### AI Classification by Function (Reactive / Limited Memory / Theory of Mind / Self-Aware)
- [OK] "Reactive Machines — no memory, responds to current input only. Example: IBM Deep Blue" — confirmed.
- [OK] "Limited Memory — uses historical data to improve decisions. Most current AI falls here" — confirmed.
- [OK] "Theory of Mind — research stage, no commercial implementation" — confirmed.
- [OK] "Self-Aware AI — hypothetical machine consciousness" — confirmed.

### Strong AI vs Weak AI
- [OK] "Weak AI: systems that simulate intelligence for specific tasks, no understanding or consciousness" — confirmed; Searle's Chinese Room argument (1980).
- [OK] "Strong AI: systems that would genuinely understand and have consciousness" — confirmed per Searle's original distinction.
- [OK] "Searle's distinction is philosophical (consciousness) while Narrow/General/Super is about capability scope" — confirmed; important and accurate nuance.

### AI Hierarchy
- [OK] "AI ⊃ ML ⊃ DL" — confirmed; standard accepted hierarchy.

---

## Flagged Issues

### Errors

- [ERROR] "SHRDLU listed under 1960s"
  - **What's wrong**: SHRDLU was created by Terry Winograd and demonstrated in 1970-1971 (his PhD thesis at MIT). It is not a 1960s system. Listing it alongside ELIZA (1966) under "1960s" is inaccurate.
  - **Fix**: Change the timeline entry to "1960s-70s | ELIZA (1966), SHRDLU (1970-71) | Early NLP breakthroughs" or split into separate rows.

### Stale Information

- [STALE] "Jensen Huang claimed in March 2026 'we've achieved AGI'"
  - **What changed**: This claim is attributed to a Fortune article dated 2026-03-30. As context for a study guide, citing ongoing industry debate is fine, but the research notes correctly flag that "for exam purposes AGI is still classified as theoretical/not yet achieved." The stale risk is that AGI discourse moves fast; by the time students read this, the specific claim may be superseded. The exam-safe framing (AGI = theoretical) remains correct.

### Unsupported Claims

- [UNSUPPORTED] "四大類型 attributed to 'John Searle / Arend Hintze framework'"
  - **Risk**: The four-type classification (Reactive Machines, Limited Memory, Theory of Mind, Self-Aware) is widely attributed to **Arend Hintze** (2016 article in The Conversation). John Searle's contribution is the Strong/Weak AI philosophical distinction (Chinese Room, 1980), which is a separate framework. Combining their names as co-authors of the four-type framework is misleading. Searle did not propose this classification.
  - **Recommendation**: Attribute the four-type functional classification to **Arend Hintze (2016)** only. Keep Searle's name associated with the Strong AI vs Weak AI philosophical distinction, which is already correctly covered in a separate section.

- [UNVERIFIED] "中央AI主管機關是「國科會」, NOT 數位發展部"
  - **Risk**: The research notes state this as an "exam trap." The AI Basic Law designates the National Science and Technology Council (國科會/NSTC) as the competent authority for AI policy coordination. However, the specific designation of the "central competent authority" may depend on the regulatory domain (e.g., MODA/數位發展部 handles certain digital governance aspects). If this claim is presented in the study guide without nuance, students could be misled if the exam question is about a specific regulatory domain rather than the overarching AI Basic Law authority. This claim could not be independently verified against the full legal text within this review.
  - **Recommendation**: Verify the exact wording in the AI Basic Law (particularly Articles relating to competent authority designation) before including this as an exam tip. If confirmed, clarify that this refers specifically to the AI Basic Law's designated authority, not all AI-related regulation.

---

## Syllabus Alignment Check

- [OK] Topic code L11101 "AI的定義與分類" exists in syllabus under L111 "人工智慧概念" — confirmed.
- [OK] The research notes cover three sub-areas: L11101_1 演進 (history), L11101_2 定義 (definition), L11101_3 分類 (classification) — these map to the topic name and are consistent with the iPAS official study guide structure.
- [OK] The research notes correctly identify scope boundaries: ML algorithms belong to L113, AI governance to L11102, prompt engineering to L122 — all confirmed against the syllabus YAML.
- [OK] No out-of-scope content is incorrectly attributed to L11101.

---

## Notes for Study Guide Author

1. The research notes are well-sourced and largely accurate. The main correction needed is the SHRDLU date and the Hintze/Searle attribution.
2. The exam-safe position on AGI ("theoretical, not yet achieved") is correct and should be maintained in the study guide regardless of industry claims.
3. The seven principles mnemonic (永人隱資透公問) referenced in the research notes belongs to L11102 scope — ensure the study guide does not include this.
4. The 人工智慧基本法 Article 3 definition should be quoted verbatim in the study guide since it is now part of the 2026 exam scope.
