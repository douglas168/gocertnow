While the previous workflow you explored relied on using the heavy-duty Opus model exclusively and managing parallel terminals, this approach focuses entirely on **"context hygiene"**—ruthlessly pruning invisible background data to stop hitting usage limits.

The core issue with Claude Code limits is **invisible context bloat**. Every time you send a message, Claude rereads the entire conversation, meaning your 30th message costs 31 times more than your first. Furthermore, your `.md` files, MCP servers, and skills are preloaded into the context window for every single session.

Here is a detailed summary of the setup changes and daily habits to eliminate this bloat and conserve your usage limits:

### 1. Optimize Your Setup and Environment

- **Disconnect Unused MCP Servers:** Every connected MCP server loads its tool definitions into your context on every turn, which can easily add tens of thousands of tokens of "dead weight". Run `/MCP` to disconnect any servers you aren't actively using.
- **Swap MCPs for CLIs:** Whenever possible, use Command Line Interfaces (CLIs) instead of MCP servers. CLIs only cost tokens when Claude actually calls the command, whereas MCPs cost tokens just by existing in the session. This switch can save roughly 40% in token usage.
- **Streamline your `claude.md` File:**
  - **Remove fluff and contradictions:** Cut rules that are vague (e.g., "use a good tone"), repetitive, or things Claude already does by default.
  - **Use Progressive Disclosure:** Do not keep a massive `.md` file at the root of your project. The core `claude.md` should only contain universal rules (like project structure). For specific rules (like testing guidelines or API standards), put them in separate reference files and add a single-line pointer in your core file (e.g., "for API conventions read API standards.mmd"). Claude will only read those files on demand.
- **Prune Installed Skills:** Every installed skill loads its metadata into your context. Avoid hoarding verbose, multi-hundred-line skills from free marketplaces, as they burn context and cause Claude to lose focus. Keep skills concise.

### 2. Tweak Your Settings (`settings.json`)

- **Lower Autocompact:** Claude automatically compacts your context window at around 83%, but output quality degrades before it hits that point. Change the `auto_compact_percentage_override` setting to about **75%** so compaction triggers earlier.
- **Increase Bash Output Length:** When Claude runs a shell command, the default output limit is 30,000 to 50,000 characters. If exceeded, it silently truncates and Claude wastes tokens rerunning the command. Set the `bash_max_output_length` to **150,000**.
- **Set File Deny Rules:** By default, Claude can read everything, including bloated directories like `node_modules` or build artifacts. Add deny rules to your permissions (acting like a `.gitignore`) so Claude stops wasting context reading files it doesn't need.

### 3. Change Your Daily Coding Habits

- **Start Fresh Sessions:** Use the `/clear` command when switching between unrelated tasks. If you move from content research to script writing in the same session, you are paying a token "tax" for all the previous research messages on every new prompt.
- **Use Plan Mode:** Before starting non-trivial tasks, use plan mode to let Claude ask clarifying questions and map out an approach. Letting Claude write hundreds of lines of incorrect code because of a misunderstanding is the most expensive mistake you can make.
- **Don't Send Follow-up Corrections:** If Claude outputs something bad, do not send a message correcting it. This permanently bakes the bad output and your correction into the context history, compounding on future messages. Instead, replace the bad exchange entirely so it doesn't pollute the session.
- **Match the Model to the Task:** Unlike the Opus-only workflow we discussed previously, this strategy recommends using **Sonnet** for most coding, **Haiku** for simple lookups or sub-agents, and reserving **Opus** strictly for deep architectural planning.

To automate all of this, the source mentions a free **"Context Audit" skill** that can be installed to scan your setup, grade your context hygiene, and automatically apply fixes like splitting up your `.md` files and updating your `settings.json`.
