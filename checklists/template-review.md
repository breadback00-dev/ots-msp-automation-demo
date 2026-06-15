# Template Review Checklist

Run this against the template source folder after each major model, agent, or plugin release - or roughly quarterly, whichever comes first.

## Routing Still Valid

- Do all routed tools and skills still exist under the same names (`ce-*`, Superpowers, Spec Kit, `gh`, browser tools)?
- Has any routed tool changed enough that its good-fit/poor-fit guidance is stale? Check official docs or changelogs, not memory.
- Is there a new tool, framework, or skill worth adding as a routed mode? Research before adopting (`checklists/research-checklist.md`).
- Is any routed tool no longer earning its overhead? Remove it.

## Drift Check

- Has the same correction been made 3+ times since the last review? Fix the source file that caused it (the maintenance rule).
- Do `AGENTS.md`, `docs/02-tool-router.md`, and the prompts still agree? Each rule lives in exactly one file; everything else references it.
- Are the references in `docs/07-icm.md` (paper, repository) still valid?
- Are `CLAUDE.md`'s tool mappings still correct for the current Claude Code release?

## Propagation

- Update the version stamp and review date in `README.md`.
- Decide whether active projects running older copies should be refreshed with `scripts/new-project.ps1 -Merge`.

## Record

- Note any material change and its reason in `docs/03-decision-log.md`.
