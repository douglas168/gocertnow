---
name: adversarial-research-review
description: "Use when a baseline research answer (typically from Perplexity or a first LLM pass) needs to be stress-tested before decisions are made. Runs gemini CLI + codex CLI as independent adversaries against the baseline, then synthesizes against your hard constraints."
---

You orchestrate an adversarial multi-model review of a research answer. A baseline answer (usually from Perplexity, but could be any LLM or web source) is attacked independently by Gemini and Codex CLIs, then synthesized by Claude against the user's hard constraints.

**Inspired by:** The dotLLM dual-review pattern — "the AI that produced the answer should not be the only AI judging it." Different models have genuinely different blind spots, and different failure modes:

- **Perplexity:** confident, citation-style, often overfitted to SaaS playbooks, prone to generic advice
- **Gemini CLI:** fast, punchy, good at naming rhetorical flaws, less web verification
- **Codex CLI:** slower, methodical, **does real web searches** to verify load-bearing claims
- **Claude (synthesis):** integrates all three against the user's specific constraints

---

## When to Use

- You have a research question that affects a real decision
- You got an answer from Perplexity, ChatGPT, a Google search, or a single LLM
- The answer feels plausible but generic, or is load-bearing for a decision you're about to make
- You want a steelman + destroy pass before committing

**Do NOT use when:**
- The question is tactical and reversible (just answer it)
- You already have strong convictions and just want confirmation (use regular chat)
- There is no baseline answer to attack (exception: use "steelman-then-destroy" variant for founder's own thesis)

---

## Prerequisites

- `gemini` CLI installed and authenticated (`gemini --version` should work)
- `codex` CLI installed and authenticated (`codex --version` should work)
- A baseline answer saved to a file (or pasted into the attack prompt directly)
- User's hard constraints documented somewhere you can cite

---

## The 5-Step Workflow

### Step 1 — Extract load-bearing claims

Read the baseline answer and extract the **3–7 claims the decision actually rests on**. Skip the hedge language, skip the "it depends," keep only the claims that would change the decision if falsified. These are what you'll attack.

Ask yourself:
- Which claims have specific numbers? (ARPU, percentages, thresholds)
- Which claims name specific products or strategies?
- Which claims are load-bearing for the recommendation?

### Step 2 — Write the attack prompt

For each question (or each document to attack), write a markdown file at `/tmp/attack-{topic}.md` with this structure:

```markdown
# Adversarial Review Task — {Topic}

You are an adversarial reviewer. Find what is wrong, overfitted, survivorship-biased, stale, or missing in the answer below. Be specific and ruthless. No hedging.

## The User's Context (hard constraints)
- {bullet list — these override any generic advice}
- {include deadlines, budgets, prior decisions, audience size, etc.}
- {the single question the user actually asked (direct quote)}

## Baseline Answer's Load-Bearing Claims (attack these)
1. **{claim 1, verbatim or paraphrased}**
2. **{claim 2}**
(3-7 claims)

## Your Adversarial Brief
Attack specifically:
1. {directive 1 — point at a specific weakness}
2. {directive 2}
(5-6 attack directives)

## Output Format (strict)
Markdown, cap 100 lines, no preamble:

```
## Attacks on Baseline Claims
(3-6 attacks)

## Alternative Recommendations
(2-4 concrete counter-recommendations)

## What Baseline Missed
(2-4 misses)

## One-Line Verdict
[Decision in ≤25 words]
```
```

**Why each section matters:**
- Hard constraints stop the reviewer from drifting into generic advice
- Load-bearing claims give the reviewer something specific to attack
- Attack directives prevent the reviewer from softballing
- Strict output format prevents the reviewer from burying the lede

### Step 3 — Fire adversaries in parallel

From the terminal (or via a Bash tool call), run all adversaries in parallel:

```bash
for Q in topic1 topic2 topic3; do
  gemini -p "$(cat /tmp/attack-$Q.md)" > /tmp/review-$Q-gemini.md 2>&1 &
  cat /tmp/attack-$Q.md | codex exec - > /tmp/review-$Q-codex.md 2>&1 &
done
wait
```

Notes:
- Both CLIs support headless / non-interactive mode (`gemini -p` and `codex exec -`)
- Gemini is fast (~30–60s); codex is slower (~60–180s) because it does web search
- 10 parallel calls (5 topics × 2 tools) typically complete in 2–3 minutes wall-clock
- Codex output includes preamble (`workdir:`, `model:`, session id) and a trailing duplicate block — read with `tail -N` if the file is large

### Step 4 — Synthesize against hard constraints

Read both reviews for each topic. Look for:

- **Convergence:** both tools attacking the same claim independently = high-confidence real weakness
- **Divergence:** one attacks, the other doesn't = check which is right by reading the evidence
- **Web-verified claims (codex):** codex does real web searches and cites URLs — these are the hardest to dismiss
- **Rhetorical flaws (gemini):** gemini is better at naming the pattern ("survivorship bias", "cargo cult", "stale playbook")
- **Missed moats:** what both adversaries say the baseline ignored

Then write the synthesis. Recommended shape per question:

```markdown
## Q — {question}

### What baseline got wrong
{table or bullet list — claim vs attack}

### What baseline missed
{2-4 bullets}

### Day-1 vs Day-100 implications
{split recommendations by time horizon — what to do this week vs later}

### Verdict
{direct, 1-3 sentences, answering the actual question}
```

### Step 5 — Save outputs

Save the synthesis to a permanent location (e.g., `docs/product development/SYNTHESIS-{DATE}.md`). Include at the bottom:

- Path to the baseline answer file
- Path to the attack prompts (`/tmp/attack-*.md`)
- Path to the raw reviews (`/tmp/review-*.md`)
- A one-line "workflow notes" block describing what converged and what didn't

The `/tmp/` files are ephemeral; the synthesis is the artifact you keep.

---

## Variant: Steelman-Then-Destroy (no baseline)

When there's no baseline answer to attack — e.g., you want to pressure-test **your own thesis** — use this variant:

```markdown
# Adversarial Review Task — {Topic} (Steelman-Then-Destroy)

## Context
{hard constraints}

## The Thesis to Attack
{1-5 numbered claims from the user's own notes/thinking}

## Your Brief
Part A — Steelman (be generous): make the strongest case for the thesis
Part B — Destroy (be ruthless): find every reason it's wrong for THIS person at THIS moment
Part C — Verdict: ≤50 words, (a) right but early, (b) wrong, (c) right but dangerous, or (d) park-and-ignore
```

Fire the same way (gemini + codex in parallel). Useful when the thesis is the user's own long-term vision ("workflow-as-product", "B2B pivot", "go premium") and you want both steelman and attack in one pass.

---

## Anti-patterns to avoid

- **Don't attack with Claude alone.** Claude produced the synthesis; it shouldn't be the sole judge of the baseline either. Use Claude as the synthesizer AFTER gemini + codex have attacked independently.
- **Don't run gemini + codex serially.** Fire them in parallel — they're independent processes.
- **Don't let the adversary drift.** If the attack prompt lacks hard constraints, the reviewer will generate generic SaaS advice instead of attacking the specific claims. The hard-constraints block is what keeps them on target.
- **Don't skip the "load-bearing claims" extraction.** Without specific claims to attack, reviewers default to "on the other hand" hedging. The whole point is to force adversarial mode.
- **Don't merge-synthesize without reading both reviews in full.** Convergence across tools is the highest-value signal; you only see it if you read both.
- **Don't save the raw reviews as the final artifact.** Raw reviews have preamble, duplicates, and minor errors. The synthesis is what gets cited in decision docs.

---

## Success signals

- Both adversaries independently attack the same claim → strong convergence, rewrite the plan
- Codex cites a URL that contradicts the baseline's claim → baseline was factually wrong
- Gemini names a rhetorical pattern (survivorship bias, cargo cult, stale playbook) → baseline was structurally wrong
- Your synthesis changes a decision you were about to make → the workflow paid for itself
- You can reuse the attack prompt structure across topics → the skill is working as designed

---

## Example invocations

```bash
# Fire on one topic against a Perplexity answer
# 1) Save Perplexity answer to file
# 2) Write /tmp/attack-pricing.md with context + claims + attack brief
gemini -p "$(cat /tmp/attack-pricing.md)" > /tmp/review-pricing-gemini.md 2>&1 &
cat /tmp/attack-pricing.md | codex exec - > /tmp/review-pricing-codex.md 2>&1 &
wait
# 3) Read both, write synthesis to docs/.../SYNTHESIS-{DATE}.md
```

```bash
# Fire on 5 topics in parallel (10 calls)
for Q in Q1 Q2 Q3 Q4 Q5; do
  gemini -p "$(cat /tmp/attack-$Q.md)" > /tmp/review-$Q-gemini.md 2>&1 &
  cat /tmp/attack-$Q.md | codex exec - > /tmp/review-$Q-codex.md 2>&1 &
done
wait
```

---

## Files in this skill

- `SKILL.md` — this file
- Attack prompt templates: write them ad-hoc per topic; do not templatize prematurely. The attack brief needs to be **specific** to the claims at hand — a generic template produces generic attacks.

---

## Reference: First use

Originally designed 2026-04-19 to attack Perplexity's answers on LevelCert's five brand/product questions (mass vs premium pricing, moats, RPG for 18-35, web vs mobile, workflow-as-product). Synthesis artifact: `docs/product development/SYNTHESIS-2026-04-19.md`. Raw attack prompts and reviews: `/tmp/attack-Q{1..5}.md`, `/tmp/review-Q{1..5}-{gemini,codex}.md`.
