# Stage NN: Stage Name

Stage contract for an ICM pipeline. See `docs/07-icm.md` for what ICM is, the folder layout, and when to use it.

## Purpose

One job only.

## Inputs

- Working input (Layer 4): `../NN_previous-stage/output/<run-id>/file.md`
- Shared reference (Layer 3): `../_config/rules.md`

Use exact paths. If a file is large, name the relevant section.

## Process

Describe the transformation this stage performs.

Keep this short. The stage contract is an execution contract, not an essay.

## Outputs

- `output/<run-id>/output-file.md`

Use a run-scoped folder (for example `output/run-2026-06-11/`) so repeated runs never overwrite earlier outputs.

## Human Review Gate

Before the next stage runs, a human should review and optionally edit the output.

Continue only when:

- required inputs were checked
- unsupported claims are labelled
- output matches the stage purpose
- blockers are visible

## Verify

- Check this output against the previous stage for alignment.
- Check claims against sources or references.
- Flag discrepancies before final handoff.
