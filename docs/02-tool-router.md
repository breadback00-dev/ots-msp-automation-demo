# Tool And Skill Router

Use this file to decide what kind of help the project needs. The default is direct execution by the main agent. Escalate only when a tool, skill, plugin, or workflow reduces risk, saves time, or improves quality.

Before routing to a plugin, skill, browser, GitHub, or side-agent capability, confirm it is available in the current environment. If unavailable, use the closest fallback or state the limitation.

## Default Path: Direct Execution

Use direct execution when:

- The task is light or clearly scoped.
- The relevant files are local.
- No external research is needed.
- Existing project patterns are obvious.
- The change can be verified with focused tests or inspection.

Examples:

- small bug fix
- copy update
- focused test
- local refactor
- simple CLI/UI change

## Compound Engineering

Use Compound Engineering when the task benefits from flexible structure.

| Need | Use |
| --- | --- |
| Generate and compare possible directions | `ce-ideate` |
| Clarify product/feature shape | `ce-brainstorm` |
| Turn clear goal into implementation plan | `ce-plan` |
| Execute planned coding work | `ce-work` |
| Debug bug/error/test failure | `ce-debug` |
| Review changes before shipping | `ce-code-review` |
| Simplify recently changed code | `ce-simplify-code` |
| Capture reusable learning | `ce-compound` |
| Check plugin freshness | `ce-update` |

Do not use Compound Engineering by habit. Use it when the task would otherwise become vague, risky, or hard to review.

## Idea / Requirements Shaping

Route idea-shaped work before planning or coding:

| Task Shape | Route |
| --- | --- |
| Many possible directions, "what should we build/improve/change?" | Ideate |
| One vague direction, unclear users/scope/success criteria | Brainstorm |
| Clear goal but implementation path unclear | Plan |
| Clear local task | Execute |

Use `ce-ideate` when:

- the user asks for ideas, options, improvements, or surprising directions
- there are many possible paths
- the goal is to compare directions before choosing one

Use `ce-brainstorm` when:

- one direction exists but the product shape is unclear
- user flows, scope, non-goals, success criteria, or acceptance examples need definition
- planning would otherwise invent requirements

Capture brainstorm output as a filled `templates/project/feature-brief.md`.

Skip both when:

- the user already gave clear requirements
- the task is a bug fix
- the change is local and obvious
- the user explicitly wants execution

## Superpowers

Use `obra/superpowers`, if installed, as strict mode.

Good fit:

- TDD-first work
- systematic debugging
- high-stakes feature work
- disciplined refactors
- complex change sets where habits matter

Poor fit:

- tiny edits
- simple documentation updates
- quick explanations
- tasks where the overhead is larger than the risk

Reason: Superpowers is valuable because it enforces strong working discipline. That same strength makes it too heavy as an always-on default.

## Spec Kit (Spec-Driven Development)

Use GitHub Spec Kit (`github/spec-kit`), if installed, for Deep greenfield feature work that benefits from a formal specification pipeline: spec -> plan -> tasks -> implement, with quality gates.

Good fit:

- new product or major feature built from scratch
- formal requirements that multiple people or agents will execute against
- work where drift between intent and implementation is the main risk

Poor fit:

- small or local changes (the ceremony exceeds the value)
- brownfield bug fixes and refactors
- exploratory work where requirements are still forming (ideate/brainstorm first)

If Spec Kit is not installed, use `ce-plan` with `templates/project/technical-plan.md` instead.

## Skills

Use skills when a repeatable workflow has a dedicated instruction bundle.

Good skill triggers:

- frontend design work
- code review
- debugging
- PR/CI work
- image generation
- OpenAI API/model guidance
- Notion/GitHub workflows
- plugin or skill creation

Rule: if a skill exactly matches the task and adds value beyond direct execution, read and follow it. For Light tasks, use a skill only if the user names it or it materially changes safety, quality, or verification. If multiple useful skills apply, use the smallest set that covers the job.

Host or system-required skill rules still take precedence.

## GitHub

Use GitHub tools when the task involves:

- repositories
- issues
- pull requests
- CI checks
- review comments
- branches/releases
- finding examples from maintained repos

Use GitHub research before adopting a new library or plugin when maintenance/activity matters.

## Browser

Use Browser tools when:

- testing localhost or a web app
- verifying UI behavior
- capturing screenshots
- checking responsive layout
- confirming user-visible frontend changes

For frontend work, browser verification is usually part of done.

## Web Research

Research current sources when facts may have changed or when the recommendation could cost time/money.

Research before:

- choosing libraries or frameworks
- adopting plugins or GitHub projects
- using new APIs or AI models
- making security/compliance claims
- changing deployment/platform assumptions
- recommending paid tools or infrastructure

Follow the source priority defined in `AGENTS.md`. Save durable findings as a `templates/project/research-note.md` in `docs/research/`.

## External Context Chooser

| Need | Use |
| --- | --- |
| Local repo, PR, issue, CI, branch, release | GitHub tools |
| One current official-doc lookup | Main agent researches directly |
| Multiple competing tools/libraries/plugins/repos | Research Scout |
| Maintenance/activity check for a GitHub project | GitHub research or Research Scout |
| Current API behavior for installed dependency | Check local version, then official docs/changelog |
| UI behavior or localhost verification | Browser tools |

## Local Scripts

Use scripts for mechanical work that does not need AI judgment:

- formatting generated files
- extracting text
- moving/copying template folders
- collecting static metadata
- running repeatable audits

If a step is repeated and mechanical, make or reuse a script instead of asking the model to do it manually every time.

## Side Agents

Use side agents sparingly. See `docs/06-delegation-router.md`.

Default:

- main agent only
- optional Research Scout for current external research or tool discovery
- ask before using more than one side agent

## ICM

Use ICM only for sequential, repeatable workflows that benefit from human review gates between stages. The definition, fit criteria, folder layout, and a worked example live in `docs/07-icm.md`.

## Templates And Checklists

Route to these when the work produces a matching artifact:

| Need | Use |
| --- | --- |
| Define a vague feature before planning | `templates/project/feature-brief.md` |
| Plan a Standard/Deep implementation | `templates/project/technical-plan.md` |
| Capture a bug worth tracking | `templates/project/bug-report.md` |
| Record a durable decision | `templates/project/decision-record.md` -> `docs/03-decision-log.md` |
| Plan verification for a risky change | `templates/project/test-plan.md` |
| Draft a PR description | `templates/project/pr-description.md` |
| Save durable research findings | `templates/project/research-note.md` -> `docs/research/` |
| Define an ICM pipeline stage | `templates/icm/icm-stage-contract.md` |
| Start a social content pipeline (carousel/reel) | copy a workspace from the separate social media templates folder (`..\00_social media templates\icm\`) |

| Situation | Checklist |
| --- | --- |
| Unsure whether to ask or act | `checklists/ask-or-act.md` |
| Unsure how much structure a change needs | `checklists/simple-vs-complex.md` |
| Deciding whether external research is needed | `checklists/research-checklist.md` |
| Executing Standard/Deep work | `checklists/implementation-checklist.md` |
| Before merging or shipping | `checklists/pre-ship-checklist.md` |
| Setting up a new machine or workspace | `checklists/foundation-checklist.md` |
| After a major model/tool/plugin release | `checklists/template-review.md` (run on the template source) |

## Foundation Tools To Prefer

Useful baseline for future coding work:

- Git
- ripgrep (`rg`)
- GitHub CLI (`gh`) for GitHub-backed work
- Node.js and `pnpm` for JS/TS projects
- Python and `uv` for Python or scripting-heavy projects
- Agent plugins/capabilities only when available and useful: Compound Engineering, GitHub, Browser
- Optional strict-mode plugin: Superpowers

Install only what you will actually use. Track project-specific setup in the project README or setup docs.

## Routing Examples

| Task | Route |
| --- | --- |
| Fix a typo | Direct execution, no tools |
| Add a small local function | Direct execution, focused test |
| Change user-visible UI | Direct execution plus Browser verification |
| Debug failing CI on GitHub | GitHub tools plus focused debug |
| Choose a new auth/library/tool | Research Scout or direct official-doc/GitHub research |
| Explore what to build next | Ideate |
| Full greenfield feature needing a formal spec | Spec Kit if installed, else `ce-plan` + `templates/project/technical-plan.md` |
| Clarify a vague feature | Brainstorm |
| Unclear product feature | Compound brainstorm or plan |
| Repeated research-to-report process | Consider ICM |
| Strict TDD/refactor session | Superpowers if installed and wanted |
