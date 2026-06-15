# Feature Brief

## Problem

MSP engineers and delivery teams often create useful information in messy places: ticket notes, call summaries, project handovers, onboarding emails, spreadsheets, and Teams messages. Turning those raw notes into client-safe updates, internal handovers, runbooks, and automation discovery outputs takes time and varies by person.

For Office Tech Suite outreach, the problem is sharper: the demo must show practical value without pretending to replace their existing systems or overselling the builder as an IT engineer.

## User

Primary user:

- An MSP engineer, project coordinator, or service-transition lead who needs to convert messy notes into structured outputs for review.

Secondary user:

- A senior engineer, director, or operations lead judging whether a small internal AI workflow could reduce admin without introducing client-data or quality risk.

## Current Workaround

The likely current workflow is a mix of:

- PSA/ticket notes.
- Internal documentation templates.
- SharePoint, Teams, or email.
- Manual rewriting for client updates.
- Manual checklists for onboarding, offboarding, and project handovers.
- Ad hoc AI/Copilot/ChatGPT use by individual staff, if allowed.

This means the issue is not absence of tools. It is the friction between raw notes, consistent structure, missing-info detection, review, and reusable documentation.

## Desired Outcome

The prototype should make it easier to:

- Convert raw MSP notes into a structured handover pack.
- Identify risks and missing information before client-facing communication.
- Generate a first-pass runbook, engineer checklist, client update, and internal handover.
- Map messy process notes into ranked automation opportunities.
- Show that the workflow can sit on top of existing tools rather than replace them.

## Scope

In:

- Static local web app.
- Direct first-screen tool experience.
- Two output modes:
  - Handover pack.
  - Automation opportunity mapper.
- Three sample note sets:
  - Microsoft 365 / onboarding handover.
  - Automation workshop.
  - Cyber readiness.
- Deterministic prototype logic that behaves like a credible demo without using real AI.
- Copy/download output in Markdown.
- Clear safety language: dummy data, no notes sent, human review required.

Out:

- Live LLM/API calls.
- Real client data.
- Integrations with Microsoft Graph, PSA tools, SharePoint, Hudu, IT Glue, Power Automate, or email.
- Multi-user collaboration.
- Authentication or permissions.
- Production hosting.
- Automated technical remediation.
- Advice framed as verified cyber/security assurance.

## Success Criteria

- The default loaded state already demonstrates a useful handover pack.
- Switching to automation mode produces a materially different output, not just renamed sections.
- The automation mapper recommends a realistic first pilot and explains why.
- The output highlights missing information and assumptions rather than inventing certainty.
- The demo can be shown in roughly two minutes.
- The pitch remains honest: "prototype workflow layer," not "finished production tool."

## Open Questions

- Should the outreach demo lead with the handover pack, the automation mapper, or show both equally?
- Should the prototype name mention Office Tech Suite directly, or stay generic as "MSP Ops Assistant" to avoid looking like an impersonation?
- Should the next version use a real AI API, or is a deterministic demo better until OTS shows interest?
- Should the follow-up artifact be a one-page PDF, a Loom video, or both?
