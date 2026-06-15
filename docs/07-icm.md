# ICM: Interpretable Context Methodology

ICM (Interpretable Context Methodology) is a method by Jake Van Clief and David McDermott for orchestrating AI agent workflows with folder structure instead of framework code: numbered folders represent stages, plain markdown files carry the prompts and context, and a human reviews each stage's output before the next stage runs. One agent, reading the right files at the right moment, replaces a multi-agent framework.

This file is the single source of truth for what ICM is, when to use it, and how its folders are laid out. Other files link here instead of restating these rules. This template implements a lean adaptation of the published methodology; see References at the bottom for the full version.

## Design Principles

The methodology rests on five principles:

1. **One stage, one job.** A stage that fetches data does not also filter it. If a stage description needs "and", split it.
2. **Plain text as the interface.** Stages communicate through markdown and JSON files. Anyone with a text editor can inspect or modify any artifact.
3. **Layered context loading.** Each stage loads only the context it needs. Less irrelevant context means better model output.
4. **Every output is an edit surface.** Each stage's output is a file a human can open, edit, and save before the next stage runs. The next stage reads whatever the human left there.
5. **Configure the factory, not the product.** Set up the workspace once (rules, voice, structure). Each run then produces a new deliverable from the same configuration.

## The Context Layers

The full methodology defines a five-layer context hierarchy. In this template, the layers map as follows:

| Layer | In the paper | In this template |
| --- | --- | --- |
| 0 - workspace identity | `CLAUDE.md` | `AGENTS.md` / `CLAUDE.md` at the project root |
| 1 - task routing | workspace `CONTEXT.md` | `docs/02-tool-router.md`, or a pipeline-level README |
| 2 - stage contract | stage `CONTEXT.md` | each stage's `stage.md` |
| 3 - reference material (stable across runs, "the factory") | `references/`, `_config/`, `shared/` | the pipeline's `_config/` folder |
| 4 - working artifacts (change every run, "the product") | `output/` | each stage's `output/<run-id>/` |

The Layer 3 / Layer 4 distinction matters: reference material (Layer 3) tells the model "here are the rules, follow them"; working artifacts (Layer 4) tell it "here is the input, transform it." Keeping them structurally separate gives the model clearer signals than one undifferentiated prompt.

## When To Use ICM

Use ICM only when all three are true:

1. **Sequential** - each stage consumes the previous stage's output.
2. **Repeatable** - the same pipeline will run again with different input.
3. **Review-gated** - human review between stages would improve quality.

Do not use ICM just because the project is important. A one-off coding task usually needs a plan, not a stage pipeline.

Good fit:

- research-to-report pipeline
- content production pipeline (e.g. script-to-animation, slide deck production)
- proposal/tender workflow
- repeated client-deliverable workflow
- repeated feature-delivery pipeline where requirements, design, implementation, test, and docs each need separate human review

Poor fit:

- one-off coding tasks
- a single complex feature
- real-time multi-agent loops that need tight message passing
- high-concurrency systems with many simultaneous users
- workflows needing automated branching on AI decisions mid-pipeline (a human can choose between stages; automation should not)
- tiny changes

ICM should provide observability and stage discipline, not folder complexity for its own sake.

## Folder Layout

Create one folder per pipeline. Inside it:

```text
my-pipeline/
  _config/                  Layer 3: shared reference used by every stage
    rules.md                Pipeline-wide rules, tone, constraints, sources
  01_collect/               One folder per stage, numbered in execution order
    stage.md                Layer 2: stage contract (copy templates/icm/icm-stage-contract.md)
    output/
      run-2026-06-11/       Layer 4: one subfolder per run, so runs never overwrite
        findings.md
  02_draft/
    stage.md
    output/
      run-2026-06-11/
        draft.md
```

Two kinds of inputs flow into a stage:

- **Working input (Layer 4)** - the previous stage's reviewed output, e.g. `../01_collect/output/run-2026-06-11/findings.md`.
- **Shared reference (Layer 3)** - pipeline-wide material that does not change per run, e.g. `../_config/rules.md`.

## How A Run Works

1. Pick a run id (the date is usually enough, e.g. `run-2026-06-11`).
2. Execute stage 01 per its `stage.md` contract. Write outputs to `01_*/output/<run-id>/`.
3. **Human review gate:** review the output, edit it if needed, and only then continue.
4. Execute the next stage using the reviewed output as its working input.
5. Repeat until the final stage. The last stage's output folder holds the deliverable.

If a stage's output fails review, fix and re-run that stage before moving on. Do not patch problems downstream. Re-running one stage does not require re-running earlier stages whose outputs are still good.

## Edit The Source, Not Just The Output

Editing a stage's output fixes this run. Editing the source fixes every future run. If you keep making the same kind of edit to the same stage's output (tightening the opening, fixing the tone), that is debugging information: amend the stage contract or the `_config/` reference file instead. This is the pipeline-level version of this template's maintenance rule.

## Worked Example

A two-stage "research to report" pipeline:

**`research-report/_config/rules.md`** - audience, tone, citation requirements.

**`research-report/01_collect/stage.md`** - Purpose: gather findings on the topic. Inputs: the topic (provided per run) and `../_config/rules.md`. Output: `findings.md` with one claim per bullet, each labelled as sourced or assumption. Review gate: human checks that claims are labelled and sources are real.

**`research-report/02_report/stage.md`** - Purpose: turn reviewed findings into a report. Inputs: `../01_collect/output/<run-id>/findings.md` and `../_config/rules.md`. Output: `report.md`. Review gate: human checks the report only uses reviewed findings.

Next month, run the same pipeline on a new topic with a new run id. Nothing is rebuilt; only inputs change.

## Stage Contract Rules

- One job per stage. If a stage description needs "and", split it.
- Use exact paths for inputs and outputs. If a file is large, name the relevant section.
- Keep contracts short. A stage contract is an execution contract, not an essay.
- Each contract has a Verify section: check the output against the previous stage and against sources before handing off. Cross-stage drift (the final output diverging from earlier decisions) is the most common ICM failure mode.
- Use `templates/icm/icm-stage-contract.md` as the starting point for every stage.

## Ready-Made Workspace Templates

Complete social content pipeline workspaces (instagram-carousel, instagram-reel) live in the separate social media templates folder next to this repo (`..\00_social media templates\icm\`). Copy a workspace from there, fill in its `_config/rules.md`, and run. Each workspace's README explains its stages and review gates.

## References

- Van Clief, J. & McDermott, D., "Interpretable Context Methodology: Folder Structure as Agent Architecture" (arXiv:2603.16021, MIT-licensed).
- Official repository: https://github.com/RinDig/Interpretable-Context-Methodology-ICM-
- Local copy of the paper: `..\..\01_research\Interpretable Context Methodology - Jake Van Clief.pdf` (relative to this template's parent workspace).
