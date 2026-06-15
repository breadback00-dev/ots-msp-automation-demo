# Operating Loop

This project uses a right-sized work loop. Start simple and add structure only when it prevents mistakes.

The behavior rules this loop applies (task depth definitions, sequential execution, question policy, verification) live in `AGENTS.md`. This file describes the loop, not the rules.

## 1. Classify

Classify the task as Light, Standard, or Deep using the definitions in `AGENTS.md`. After scanning relevant files, revise the classification if new risk appears.

## 2. Choose The Work Mode

| Mode | Use When | Output |
| --- | --- | --- |
| Direct | Clear light task | Code/docs change plus verification |
| Ideate | Many possible directions | Ranked options |
| Brainstorm | One vague direction | Requirements/scope (`templates/project/feature-brief.md`) |
| Planned | Standard task with several steps | Short checklist or plan (`templates/project/technical-plan.md`) |
| Deep | High ambiguity/risk | Options, tradeoffs, plan, staged execution |
| Strict | TDD/debug/refactor discipline matters | Superpowers or equivalent strict workflow |
| ICM | Sequential repeatable workflow with review gates | Stage folders and stage contracts (`docs/07-icm.md`) |

## 3. Scan

Read only the context needed for the current task:

- `AGENTS.md`
- `docs/00-project-brief.md`
- `docs/02-tool-router.md`
- relevant source files
- relevant tests
- current official docs or GitHub repos when external facts may be stale

Avoid loading everything just because it exists.

## 4. Ask Or Act

Apply the question policy in `AGENTS.md`. When a case is borderline, use `checklists/ask-or-act.md`.

## 5. Implement

- Use existing patterns.
- Keep the diff scoped.
- Complete one implementation step before starting the next.
- Add tests when behavior changes.
- Prefer root-cause fixes over broad rewrites.
- Use scripts for mechanical repeated work.

When unsure how much structure a change needs, use `checklists/simple-vs-complex.md`. For Standard/Deep work, `checklists/implementation-checklist.md` is the step-by-step version of this loop.

## 6. Verify

Run the smallest useful check first:

- focused test
- repro
- typecheck/lint/build
- browser/manual check
- review of risky areas

Escalate to broader checks when the change has wider risk. Plan verification for risky changes with `templates/project/test-plan.md`.

## 7. Review And Learn

Before finishing:

- review the diff for unrelated changes
- check edge cases and failure states
- note remaining risk
- capture durable learning only when it will help future work

Before shipping meaningful work, run `checklists/pre-ship-checklist.md`. Record decisions that affect future work in `docs/03-decision-log.md` using `templates/project/decision-record.md`.

If the same correction appears repeatedly, improve the source instruction, template, helper, or test.

## ICM Trigger

If the work looks like a sequential, repeatable pipeline that benefits from human review gates, see `docs/07-icm.md` for the criteria, folder layout, and a worked example. Do not create stage folders for one-off work or a single complex feature.
