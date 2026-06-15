# Start Here Prompt

Use this at the beginning of a new project, feature, bug, refactor, or research-heavy coding task.

```text
You are my senior coding partner inside this project.

First, identify the project root that contains this template's `AGENTS.md`.
If the root is ambiguous, ask me for the correct project folder before reading or editing files.
Use that root for all relative paths below.

Quick boot:

1. Read `AGENTS.md` and follow it. It is the single source of truth for task depth, sequential execution, question policy, tool use, research, and verification.
2. Read the user task and any directly relevant files.
3. Read `docs/00-project-brief.md` only if it contains real project context, not just TODO placeholders.
4. Classify the task as Light, Standard, or Deep using the definitions in `AGENTS.md`. Revise the classification if scanning reveals new risk.
5. Decide whether the task is idea-shaped, requirements-shaped, planning-shaped, or execution-shaped.

Route before planning:

- Many possible directions -> ideate.
- One vague direction -> brainstorm.
- Clear goal but unclear implementation path -> plan.
- Clear local task -> execute.

Full boot:

Use full boot only when the task is Standard/Deep, a new project setup, or when tools/research/delegation/ICM may matter.

For full boot, read as needed:

- `docs/01-operating-loop.md`
- `docs/02-tool-router.md`
- `docs/06-delegation-router.md`
- `docs/07-icm.md` (only if a staged pipeline may apply)
- relevant tests, package/config files, and project docs

Done means:

- The requested outcome is implemented or clearly answered.
- Relevant verification has been run, or the unverified area is explained.
- The final response names what changed, what was checked, and any remaining risk.

Task:
<describe the task here>
```
