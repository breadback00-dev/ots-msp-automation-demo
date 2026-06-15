# Technical Plan

## Objective

Build a credible local prototype that demonstrates two Office Tech Suite-relevant internal workflows:

1. Turning messy MSP notes into a client documentation and handover pack.
2. Turning process/workshop notes into an automation opportunity map.

The implementation should be simple enough to inspect and safe enough to demo with dummy data, while leaving a clear path to a future LLM-backed version if the outreach gets interest.

## Context

The duplicated project template is a process/workspace shell, not a frontend app scaffold. It provides instructions, docs, checklists, and templates. It does not provide React, Vite, Tailwind, a component system, or a test runner.

Given the project goal, the first build does not need a production framework. The risk is not scaling the frontend; the risk is building the wrong demo or making unsafe claims about client data and IT accuracy.

There is already a rough implementation in place from an earlier rushed pass. Treat it as a draft to audit against this plan, not as final product direction.

## Options Considered

### Option A: Static HTML/CSS/JS Prototype

Pros:

- Fastest to run and inspect.
- No build step or dependency overhead.
- Easy to send, demo, or host later.
- Keeps focus on product story and workflow.
- Good fit for dummy-data, local-only prototype.

Cons:

- Less scalable if the app becomes complex.
- Manual UI organization can get messy if more modes are added.
- No built-in component or type system.

### Option B: React/Vite App

Pros:

- Better structure if the prototype grows.
- Easier component reuse and state management.
- Familiar path for later API integration.

Cons:

- Adds setup and dependency management.
- More ceremony for a two-mode demo.
- Risks spending time on app infrastructure instead of the outreach artifact.

### Option C: No App, Just Loom/PDF Mockup

Pros:

- Fastest outreach artifact.
- Avoids technical implementation risk.
- Lets the story be edited quickly.

Cons:

- Less convincing as proof of coding/tool-building ability.
- Harder to demonstrate interaction, exports, and workflow thinking.
- Weaker evidence that the builder can actually make useful internal tools.

## Recommended Approach

Use **Option A: Static HTML/CSS/JS Prototype** for the first outreach version.

This is the lightest safe approach. It buys speed, inspectability, and privacy. It avoids framework overhead while still demonstrating the core value: transforming messy notes into structured, reviewable MSP outputs.

Move to React/Vite only if the scope expands to include real AI calls, persistence, user accounts, complex editing, or integrations.

## Implementation Steps

1. Confirm project scope from `docs/00-project-brief.md` and `docs/08-feature-brief.md`.
2. Audit the existing rough draft against the feature brief:
   - Does it open directly into the tool?
   - Are the two modes clearly different?
   - Does it avoid real-client-data claims?
   - Does the copy sound like internal MSP tooling rather than generic SaaS?
3. Keep or revise the static app structure:
   - `index.html` for semantic app shell.
   - `styles.css` for responsive operations-console UI.
   - `app.js` for browser interactions.
   - `src/generator.js` for deterministic generation logic.
   - `tests/generator.test.js` for smoke tests.
4. Build or refine the handover pack mode:
   - Client snapshot.
   - Systems/apps mentioned.
   - Risks.
   - Missing information.
   - Engineer checklist.
   - Draft runbook.
   - Client-friendly next steps email.
   - Internal handover notes.
5. Build or refine the automation opportunity mapper:
   - Existing tools/signals.
   - Ranked automation opportunities.
   - First pilot recommendation.
   - Workshop questions.
   - 30-day pilot plan.
   - Risks and safeguards.
   - Client-facing plain-English positioning.
6. Add export behavior:
   - Copy Markdown.
   - Download Markdown.
7. Add sample data:
   - Microsoft 365/onboarding handover.
   - Automation workshop.
   - Cyber readiness.
8. Add or update tests for generator behavior.
9. Run verification:
   - `npm test`.
   - Local browser check at `http://localhost:5173`.
   - Manual check for responsive layout and demo flow.
10. Update README with run commands, demo flow, and pitch guidance.

## Test Strategy

- Unit:
  - Test system detection, risk detection, automation opportunity detection, empty input behavior, and Markdown export.
- Integration:
  - For this static prototype, browser-level interaction is the integration check.
- Manual/browser:
  - Load the default handover sample.
  - Switch to automation mode.
  - Load the automation sample.
  - Confirm output updates.
  - Confirm copy/download controls work.
  - Check the first viewport on desktop and mobile widths.
- Regression:
  - Re-run `npm test` after generator changes.
  - Re-open the local page after UI changes.

## Risks

- **Looks like a generic AI wrapper.**
  Mitigation: use MSP-specific outputs, Office Tech Suite-relevant sample notes, and restrained operations UI.

- **Overclaims technical accuracy.**
  Mitigation: keep human-review language and missing-info sections visible.

- **Raises client-data concerns.**
  Mitigation: local-only demo, dummy data, no API calls, no storage.

- **Build gets over-engineered.**
  Mitigation: static first version; no framework until integration or complexity requires it.

- **Prototype name feels like impersonation.**
  Mitigation: present as "tailored prototype for Office Tech Suite," not an official OTS product.

## Rollback

Because this is a local static prototype, rollback is simple:

- Revert or remove app files if the direction changes.
- Keep planning docs as decision history unless the product direction is replaced.
- If a framework is introduced later and proves unnecessary, return to the static version before adding real integrations.
