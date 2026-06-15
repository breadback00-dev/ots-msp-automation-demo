# Claude Code Instructions

The canonical agent behavior rules for this project live in `AGENTS.md`. Follow them.

@AGENTS.md

## Claude Code Specifics

How the agent-neutral terms in `AGENTS.md` and `docs/` map to Claude Code:

- **Direct execution** means plain Claude Code tool use - no plugins, skills, or side agents.
- **Compound Engineering** workflows (`ce-ideate`, `ce-brainstorm`, `ce-plan`, `ce-work`, `ce-debug`, `ce-code-review`, `ce-simplify-code`, `ce-compound`) are plugin skills - invoke them with the Skill tool when `docs/02-tool-router.md` calls for them.
- **Superpowers strict mode** means the `superpowers:*` plugin skills (TDD, systematic debugging, etc.), if installed.
- **GitHub tools** means the `gh` CLI and any connected GitHub MCP tools.
- **Browser tools** means available browser capabilities (Claude in Chrome, preview tools) for UI/localhost verification.
- **Research Scout** means one subagent dispatched via the Agent tool, using `prompts/subagents/research-scout.md` as its prompt. If subagents are unavailable, run the same prompt as a bounded main-thread research pass.
