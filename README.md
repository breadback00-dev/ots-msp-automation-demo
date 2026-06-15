# MSP Ops Assistant

A static prototype built for Office Tech Suite outreach.

It demonstrates two internal workflow ideas:

- **Client documentation and handover pack generator** - turns messy MSP notes into a client summary, risks, missing information, engineer checklist, draft runbook, client email, and internal handover notes.
- **Automation opportunity mapper** - turns workshop notes into ranked Microsoft 365 / Power Automate style automation opportunities, pilot questions, and a 30-day pilot plan.

The prototype is intentionally local and deterministic. It does not send client data anywhere and does not require an API key. That makes it safe for a short Loom demo while leaving a clear path to replace the local logic with an approved LLM workflow later.

## Run

```powershell
npm test
npm start
```

Then open:

```text
http://localhost:5173
```

You can also open `index.html` directly in a browser.

## Demo Flow

1. Start with the default M365 handover sample.
2. Generate the handover pack and call out the risks/missing-info sections.
3. Switch to **Automation mapper**.
4. Load the automation workshop sample.
5. Show the ranked opportunities and 30-day pilot plan.
6. Use **Copy** or **Download** to show export-ready output.

## Demo Readiness Checks

- `npm test` should pass before recording or sharing.
- Desktop check: default handover mode should show the review banner, mode-aware stats, and structured handover sections.
- Automation check: loading the automation sample should show ranked opportunity cards with impact, first step, Microsoft fit, confidence, and effort.
- Mobile check: the header, mode controls, sample buttons, and note textarea should fit without horizontal clipping.
- Generated QA screenshots are ignored by git via `qa-*.png`.

## Outreach Positioning

Do not pitch this as a replacement for Office Tech Suite's ticketing, documentation, PSA, SharePoint, Hudu, IT Glue, or Microsoft tooling.

Pitch it as:

> a small workflow layer that could sit on top of existing notes and templates to reduce engineer admin, standardise handovers, and identify low-risk automation pilots.

The honest angle is strongest:

> I am not claiming to be an IT engineer. I built this after researching OTS to show how I can use AI/code tools to reduce admin around documentation, handovers, client updates, and automation discovery.

## Project Shape

- `index.html` - app shell.
- `styles.css` - responsive UI styling.
- `app.js` - browser interactions.
- `src/generator.js` - reusable pack generation logic.
- `tests/generator.test.js` - smoke tests for the generator.
- `docs/00-project-brief.md` - project context.
- `docs/08-feature-brief.md` - product scope and success criteria.
- `docs/09-technical-plan.md` - implementation approach and verification plan.

## Safety Notes

- Use dummy notes in the demo.
- Keep "human engineer review required" visible in the pitch.
- If this becomes a real build, decide approved data handling, retention, audit logging, model/provider, and integration boundaries before touching real client data.
