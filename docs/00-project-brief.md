# Project Brief

## One-Line Description

Managed Service Provider Handover Pack Assistant is a local demo concept for Office Tech Suite outreach that turns messy managed service provider notes into structured handover packs, with an automation opportunity mapper as a secondary proof point.

## User / Customer

The demo is for Office Tech Suite decision makers, senior engineers, or operations leads who care about reducing engineer admin while preserving a high-trust, governance-aware client experience.

The imagined day-to-day user is a managed service provider engineer, project coordinator, or service-transition lead who has raw notes from a client call, ticket, project handover, onboarding workflow, or automation workshop.

## Primary Outcome

The prototype should help the viewer believe three things within two minutes:

- The builder understands Office Tech Suite's world: managed services, Microsoft 365, cyber, cloud, client projects, handovers, and automation.
- AI-assisted internal tooling could reduce documentation and service-transition admin without replacing existing PSA, documentation, SharePoint, Microsoft, or ticketing systems.
- The safest first collaboration is a low-risk internal workflow demo using dummy data, not a claim to provide frontline IT support.

## Product Thesis

Office Tech Suite likely already has ticketing, documentation, templates, Microsoft tooling, and perhaps informal AI use. The opportunity is not to invent documentation from scratch. The opportunity is to show how a small, controlled workflow layer could make existing notes and templates faster, more consistent, and easier to review.

The prototype should therefore position itself as:

> a workflow layer on top of existing managed service provider notes and templates, designed to reduce admin and surface missing information before engineer review.

## Scope

In scope:

- A browser-based local demo.
- Primary mode: handover pack.
- Secondary mode: automation opportunity mapper, shown only as an optional follow-on proof point.
- Dummy managed service provider-style sample notes tailored to Office Tech Suite's public positioning.
- Structured outputs that include risks, missing information, next actions, and review cues.
- Markdown copy/download export for a follow-up artifact.
- A short outreach pack with the one-pilot ask, boundaries, proof assets, and demo script.
- Basic tests for deterministic generation logic.
- Browser/manual verification for the user-visible demo.

Out of scope:

- Real client data.
- Live AI/API integration.
- Authentication, accounts, persistence, or database storage.
- PSA, Hudu, IT Glue, SharePoint, Microsoft Graph, or Power Automate integration.
- Claims that the output is technically correct without engineer review.
- Production deployment.

## Constraints

- Technical: keep the first version local, dependency-light, and easy to run from the project folder.
- Product: make the first screen usable as the demo; do not build a marketing landing page first.
- Security/privacy: use dummy data only and state that no notes leave the browser.
- Positioning: be honest that this is a prototype from someone with AI/code-tool experience, not traditional IT engineering experience.
- Time: optimise for a concise Loom or live walkthrough.
- Design: credible operations-console feel; restrained, readable, and specific to managed service provider workflows.

## Success Criteria

- A viewer can understand the tool's purpose without reading documentation.
- The handover sample produces a plausible client summary, risks, missing information, engineer checklist, runbook, neutral client-update draft, and internal handover notes.
- The automation sample produces ranked automation opportunities, discovery questions, a pilot plan, and safeguards, but is framed as secondary to the handover wedge.
- The UI makes review, safety, and export obvious.
- The README and outreach pack explain how to run the project and how to pitch one documentation/service-transition pilot.
- Tests pass for the deterministic generation logic.

## Important Links

- App entry point: `index.html`
- Current rough implementation: `app.js`, `styles.css`, `src/generator.js`
- Test command: `npm test`
- Local server command: `npm start`
- Source research: parent folder `Office Tech Suite - Deep Rersearch.md`
- Original build note: parent folder `build idea 1.txt`
