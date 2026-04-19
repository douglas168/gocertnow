To apply the structured, AI-assisted development workflow used for the dotLLM project to other software projects, you should avoid unstructured "vibe coding" or "prompt and pray" loops. Instead, rely on a highly disciplined approach where a human dictates the architecture and boundaries, and AI handles the implementation.

Here is the detailed, step-by-step workflow you can adopt:

### 1. The "Documentation-First" Foundation

The most crucial part of this workflow is recognizing that **time spent writing structured documentation for the AI is not overhead; it is the development methodology itself**. Without it, AI will code in circles or miss dependencies.

- **Create a Detailed Roadmap (`ROADMAP.md`):** Break your project down into distinct phases and highly granular implementation steps. Every step should include a feature name, a description, the key files to modify, and dependencies on other steps.
- **Establish an AI "Constitution" (`CLAUDE.md`):** Create a foundational file that defines exactly how the AI should work within your codebase, including strict coding rules and conventions.
- **Write Subsystem Design Docs:** Before writing any code, draft detailed design documents for every major component or subsystem and store them in a `/docs/` folder. Enforce a rule that the AI must read the relevant specification before touching any module.

### 2. Strict Task and Branch Management

Maintain a "relentlessly boring discipline" for tracking work.

- Start every single step from your roadmap as a distinct issue in your tracker (e.g., GitHub issues).
- Work on dedicated branches using a strict naming convention, such as `issue/{number}-{short-description}`.
- Ensure every Pull Request (PR) corresponds to an issue and updates the overarching roadmap upon completion.

### 3. The Implementation Loop (Human-Approved Planning)

When it is time to write code, separate the planning phase from the execution phase. In the dotLLM project, the developer used custom AI commands to automate this lifecycle:

- **Plan First:** Prompt your implementation AI (e.g., Claude) to read the roadmap step and relevant `/docs/`, and have it generate a step-by-step implementation plan.
- **Human Approval:** **Do not let the AI write code yet.** The human developer must review, brainstorm, and approve the step-by-step plan. This is where fundamental architectural decisions are made.
- **Implement and PR:** Once approved, allow the AI to implement the code step by step. Then, have the AI automatically commit the changes, push the branch, and create a detailed PR description.

### 4. Multi-Role AI Code Review

A critical lesson from this workflow is **two-role separation: the AI that writes the code should not be the only AI that reviews it**. Different AI models have different blind spots.

- Tag different, independent AI models (like Codex and Gemini) to act as PR reviewers.
- When the reviewer AIs leave comments, do not blindly apply them. Have your primary AI analyze the review comments and enter "plan mode" so you can manually approve which fixes are worth addressing.
- Once fixes are approved and implemented, have the AI reply to the reviewer's comment with a reference to the exact commit hash, creating a **fully traceable audit trail**.
- Squash-merge the PR into the main branch only after this review loop is complete.

### 5. Systemic Quality "Waves"

After reaching initial milestones or feature completeness, do not just move on. Run systematic quality passes—referred to as "Waves"—across the entire codebase.

- Dedicate specific waves to singular focus areas, such as a wave for security and crash fixes, a wave for correctness, a wave for presentation and dead code cleanup, or a wave for performance tuning. Group the findings from these reviews into new issues and run them back through the workflow.

By adopting this workflow, a solo developer or team can significantly amplify their productivity, provided they maintain the relentless structure and discipline required to guide the AI effectively.

https://kokosa.dev/blog/2026/dotllm/?fbclid=IwY2xjawRLugtleHRuA2FlbQIxMQBicmlkETFXNDJXdUhJQUw2am1qNkdQc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHv3V90-tOBXeUA9QLu02CH1L_TZjadQ-J_FiyX7xG9Te2SgPL_A5TUMqbkWY_aem_w9ggjHrcRjuPiyYTIlmjug
