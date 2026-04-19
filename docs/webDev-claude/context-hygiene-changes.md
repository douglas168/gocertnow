# Claude Code Context Hygiene — Change Log

**Date:** 2026-04-12
**Driver:** Hitting Claude usage limits too often. Audited `docs/webDev-claude/stop-hitting-limits.md` + `docs/webDev-claude/context-audit/SKILL.md` and applied the valid recommendations.

## TL;DR

The method in `stop-hitting-limits.md` is mostly valid. Two of its setting-key names are wrong (see "Corrections" below). Everything else — MCP bloat, skill preloading, CLAUDE.md preloading, `/clear` discipline, model selection — is real. Four fixes landed in this pass. Two options are parked for future workflow / automation.

## Validity Audit

| Claim in `stop-hitting-limits.md` | Verdict | Notes |
|---|---|---|
| MCP servers load tool defs every turn | True | Each server adds ~15–20k tokens per turn |
| Skills metadata preloads into context | True | Confirmed — 20+ skill blurbs visible in system prompt |
| CLAUDE.md preloads every session | True | Both global + project files preload |
| Auto-compact at ~83%, quality degrades earlier | Directionally true | Real key is `autoCompactWindow` (token count), not a percentage |
| `/clear` between unrelated tasks saves tokens | True | Every message re-reads full prior conversation |
| Swap MCPs → CLIs when possible | True | CLIs cost zero tokens when idle |
| "Don't send follow-up corrections" | Partially true | Useful principle, not always actionable mid-session |
| Setting key names in doc | **Wrong on two keys** | See Corrections section |

The companion `context-audit/SKILL.md` is a concrete, valid playbook that implements those principles. It is the actionable asset; the `.md` summary is just the theory.

## Changes Applied

### 1. Moved `sync-rtx5090-reports` out of global scope

**From:** `~/.claude/skills/sync-rtx5090-reports/`
**To:** `/Users/douglaskuo/Projects/20-local-LLM-server/.claude/skills/sync-rtx5090-reports/`

**Why:** This skill runs `rsync` from `10.10.1.100:/opt/rtx5090-monitor/reports/` into `/Users/douglaskuo/Projects/20-local-LLM-server/envs/production/rtx-5090/monitoring/reports/`. It is entirely specific to the LLM-server project and had no business preloading into every session across every project. It was burning context on every LevelCert turn for zero benefit.

### 2. Parked `ui-ux-pro-max` skill

**From:** `.claude/skills/ui-ux-pro-max/`
**To:** `.claude/skills-parked/ui-ux-pro-max/`

**Why:** The skill's `SKILL.md` is 377 lines (well above the 200-line bloat threshold from `context-audit/SKILL.md`). Its job was one-time generation of the design system — Phase 1–3 output already exists at `design-system/MASTER.md` plus 9 page specs under `design-system/pages/` (all generated Mar 31–Apr 1). The skill's remaining use (Phase 4 — new page specs) is rare and doesn't justify preloading 377 lines every turn. Parked rather than deleted so the Python scripts and stack CSVs stay on disk if we need to re-run Phase 4 later. Reversible with one `mv` command.

### 3. Soft-disabled `codex@openai-codex` plugin

**Change:** `~/.claude/settings.json` → `"enabledPlugins": { "codex@openai-codex": false }`

**Why:** Not used in this project. The plugin adds 6 `codex:*` skills (`setup`, `rescue`, `gpt-5-4-prompting`, `codex-result-handling`, `codex-cli-runtime`) plus a `codex:codex-rescue` subagent, all of which preload on every session. Soft-disabled rather than uninstalled so re-enabling is one flag flip if we ever want Codex rescue handoff back.

### 4. Updated `CLAUDE.md` "UI Design System" section

**Before:** Told Claude to read `design-system/MASTER.md`, with a fallback: *"If these files don't exist yet, follow `docs/product-workflows/WORKFLOW-UI-DESIGN-SYSTEM.md` to generate them first."*

**After:** Dropped the fallback clause.

**Why:** The design system files already exist. The "generate first" branch was dead code — Claude would never hit it — but it was preloading into every turn and adding token weight. Pure waste.

### 5. Added context-hygiene settings to `~/.claude/settings.json`

```jsonc
{
  "env": {
    "BASH_MAX_OUTPUT_LENGTH": "150000"
  },
  "autoCompactWindow": 150000,
  "permissions": {
    "deny": [
      "Read(**/node_modules/**)",
      "Read(**/.next/**)",
      "Read(**/dist/**)",
      "Read(**/build/**)",
      "Read(**/coverage/**)",
      "Read(**/.turbo/**)",
      "Read(**/.vercel/**)",
      "Read(**/__pycache__/**)",
      "Read(**/.venv/**)"
    ]
  }
}
```

**Why each:**
- **`BASH_MAX_OUTPUT_LENGTH=150000`** — Default is ~30–50k chars. When Bash output exceeds the limit, Claude Code silently truncates and Claude wastes a full turn re-running the command. Raising to 150k eliminates that retry tax for any normal dev command (build logs, test output, `git diff`, etc.).
- **`autoCompactWindow: 150000`** — Compact earlier than the default (~166k at 83% of 200k). Compaction quality is much higher when triggered proactively than when forced at the edge of the window. Cheaper compaction = cleaner downstream context.
- **`permissions.deny`** — Stops Claude from wandering into build artifacts and virtual envs when globbing/grepping. LevelCert has `web/node_modules/`, `web/.next/`, and will soon have `__pycache__/` from content scripts — any accidental read into these blasts context for no value.

### 6. Switched default model from `opus` → `sonnet`

**Change:** `~/.claude/settings.json` → `"model": "sonnet"`

**Why:** This is the **highest-leverage single fix** for usage-limit hits. Opus-on-every-turn was almost certainly the dominant cause of hitting limits, given Opus's per-token cost. Sonnet handles the vast majority of coding, editing, refactoring, and research tasks at comparable quality for 4.6-class models. Opus is reserved for deep architectural planning (see Option B below).

## Corrections to `docs/webDev-claude/stop-hitting-limits.md`

The doc has two wrong setting-key names. Verified against the actual Claude Code settings schema via the `update-config` skill:

| What the doc says | Correct key | Location |
|---|---|---|
| `auto_compact_percentage_override` (a percentage like 75) | `autoCompactWindow` (integer token count, min 100000, max 1000000) | Top-level in `settings.json` |
| `bash_max_output_length` | `BASH_MAX_OUTPUT_LENGTH` (uppercase) | Inside the `env` object, not top-level |

Semantically the doc is also wrong about the first one — it is NOT a percentage threshold; it's an absolute token budget. To compact earlier in a 200k-window session, set a smaller number (e.g. 150000) rather than a smaller percentage.

The `stop-hitting-limits.md` file itself was left untouched in this pass to preserve provenance. Fix it later if it becomes a reference source again.

## Option B — Future Workflow Reference: Opus for Planning, Sonnet for Everything Else

Slash commands like `/plan` and `/brainstorm` in `.claude/commands/` are plain prompt templates with no model override. They run on whatever model the current session is using. So with the default now `sonnet`, `/plan` and `/brainstorm` will also run on sonnet unless you explicitly switch.

**Recommended workflow when deep planning is needed:**

1. **Keep the default session on sonnet.** This is the 95% case — implementation, edits, research, debugging, lesson content generation.
2. **Open a dedicated second terminal tab for planning:**
   ```bash
   claude --model opus
   ```
3. In that tab, run `/brainstorm <milestone-id>` or `/plan <milestone-id>`. Let Opus do the deep architectural thinking.
4. **Copy the resulting plan/spec** into the project (usually `milestones/<id>/specs/` or similar) so it persists.
5. **Back in the main sonnet tab**, point Claude at the spec file and implement.

**Why two tabs instead of `/model opus` in-session:**
- Physical separation means you can't forget to switch back to sonnet after planning — which is exactly how Opus costs silently bleed into implementation work.
- The planning session stays focused on planning and never gets polluted with implementation context, which is itself a context-hygiene win.
- Fits the "start fresh sessions" discipline from the `stop-hitting-limits.md` playbook.

**When NOT to use Opus:**
- Editing existing code you already have a clear plan for
- Writing new lesson content from the template
- Running scripts, debugging errors, reading logs
- Research that doesn't require judgment (file search, grep, doc lookup)
- Anything where the task is well-defined and the output is mechanical

**When Opus is genuinely worth it:**
- First-time architecture decisions (data model, auth flow, payment flow)
- Refactors that touch multiple subsystems
- Unblocking stuck problems where sonnet has tried and failed
- Strategic/business decisions where you want a second opinion

## Option C — Future Improvement: Wire Opus into `/plan` and `/brainstorm` Directly

If Option B's two-tab discipline becomes too much friction, the cleaner long-term fix is to make `/plan` and `/brainstorm` automatically invoke Opus without a manual session switch.

**Approach:** Convert the slash commands from `.claude/commands/*.md` (inline prompt templates) into **agent-backed skills** with a `model:` field in the frontmatter. The Claude Code agent subsystem supports per-invocation model overrides (confirmed in the `update-config` schema — both hook configs and agent configs accept a `model` field, e.g. `"model": "claude-opus-4-6"`).

**Pros:**
- Zero discipline required — `/plan` always runs on Opus automatically
- Main session stays on sonnet and planning context doesn't bleed in (the agent runs in its own sub-context and returns a summary)
- Works with the existing `$ARGUMENTS` pattern

**Cons:**
- Requires a refactor from slash commands to skill-with-agent structure
- Need to verify the exact skill frontmatter schema for the `model` field (the schema was shown for hook agents; skill-level model overrides may need a different shape)
- Agent sub-contexts return condensed summaries, not the full transcript — may lose some of the back-and-forth quality you get from interactive planning

**When to revisit:** If you find yourself forgetting to open the second tab (Option B) and either (a) missing Opus's depth on planning tasks or (b) accidentally running Opus on implementation work. Until then, Option B's discipline is lower-overhead.

## Important: These Changes Take Effect on the NEXT Session

None of the skill/plugin/model changes are live in the current session. Skill manifests and plugin state are loaded at session start and can't be unloaded mid-session. To realize the savings:

1. `/clear` or restart the current session
2. Run `/context` in the fresh session — "Skills" and "Plugins" rows should be meaningfully smaller
3. Confirm `model` shows `sonnet` in the status line

## Not Done / Deliberately Skipped

- **Did not edit `stop-hitting-limits.md`** to fix the two wrong setting keys — left untouched to preserve provenance. Can be corrected later if it becomes a reference source.
- **Did not move any CLAUDE.md content to reference files.** Project CLAUDE.md is 137 lines — under the 200-line threshold. The Vercel best-practices section is a weak candidate for progressive disclosure but not worth the churn yet.
- **Did not audit individual project skills** (`course-*`, `saas-entrepreneur-expert`) against the five-filter test from `context-audit/SKILL.md`. Worth doing later — run the context-audit skill with real `/context` numbers from a fresh session.
- **Did not uninstall** `codex@openai-codex` from the plugin cache — only soft-disabled. One-line revert if we want it back.
