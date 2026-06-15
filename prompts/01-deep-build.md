# Deep Build Prompt

Use this for ambiguous, architectural, cross-cutting, security-sensitive, or high-risk work.

```text
Treat this as Deep work.

Read:
- AGENTS.md
- docs/00-project-brief.md
- docs/01-operating-loop.md
- docs/02-tool-router.md
- relevant source files, tests, and docs

Then:
- research current official docs/GitHub repos if external choices may be stale
- compare simple vs more-systematic approaches
- decide whether direct execution, Compound Engineering, Superpowers strict mode, GitHub tools, Browser tools, or ICM-style staging (docs/07-icm.md) is appropriate
- ask one blocking question only if needed
- create a concise plan before implementation (templates/project/technical-plan.md)
- record decisions that affect future work in docs/03-decision-log.md using templates/project/decision-record.md
- implement in controlled steps
- verify with relevant tests/checks (templates/project/test-plan.md for risky changes)
- review the diff
- capture durable learning only if it will help future work

Task:
<describe the task here>
```

