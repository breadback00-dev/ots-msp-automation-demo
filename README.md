# Managed Service Provider Handover Pack Assistant

A static handover workflow concept built for Office Tech Suite outreach.

It leads with one internal workflow idea:

- **Client documentation and handover pack generator** - turns messy managed service provider notes into a client summary, risks, missing information, engineer checklist, draft runbook, internal client-update draft, and internal handover notes.

It also includes:

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
3. Show the engineer checklist, runbook draft, and neutral client-update draft.
4. Use **Copy** or **Download** to show the export-ready handover artifact.
5. Mention **Automation mapper** as a secondary follow-on proof point only if there is time or interest.
6. Close with the one-pilot ask from `docs/10-outreach-pack.md`.

## How To Use

1. Load a sample note set or paste rough ticket, call, or project notes.
2. Use **Handover pack** for the main documentation output.
3. Review the risks, missing information, checklist, and draft update.
4. Copy or download the Markdown once the structure is useful.

## Demo Readiness Checks

- `npm test` should pass before recording or sharing.
- Desktop check: default handover mode should show the review banner, mode-aware stats, and structured handover sections.
- Automation check: loading the automation sample should show ranked opportunity cards with impact, first step, Microsoft fit, confidence, and effort.
- Mobile check: the header, mode controls, sample buttons, and note textarea should fit without horizontal clipping.
- Export check: copied/downloaded Markdown should start with the handover pack export note.
- Generated QA screenshots are ignored by git via `qa-*.png`.

## Outreach Positioning

Do not pitch this as a replacement for Office Tech Suite's ticketing, documentation, PSA, SharePoint, Hudu, IT Glue, or Microsoft tooling.

Pitch it as:

> a small workflow layer that could sit on top of existing notes and templates to reduce engineer admin, standardise handovers, and surface missing information before engineer review.

The honest angle is strongest:

> I am not claiming to be an IT engineer. I built this after researching OTS to show how I can use AI/code tools to reduce admin around documentation, handovers, client updates, and automation discovery.

The first ask should be a 20-minute conversation about one documentation/service-transition pilot. Keep automation as a follow-on angle, not the headline.

## Project Shape

- `index.html` - app shell.
- `styles.css` - responsive UI styling.
- `app.js` - browser interactions.
- `src/generator.js` - reusable pack generation logic.
- `tests/generator.test.js` - smoke tests for the generator.
- `docs/00-project-brief.md` - project context.
- `docs/08-feature-brief.md` - product scope and success criteria.
- `docs/09-technical-plan.md` - implementation approach and verification plan.
- `docs/10-outreach-pack.md` - pilot ask, demo script, boundaries, and proof assets.

## Safety Notes

- Use dummy notes in the demo.
- Keep "human engineer review required" visible in the pitch.
- Treat Office Tech Suite branding as inspiration only.
- If this becomes a real build, decide approved data handling, retention, audit logging, model/provider, and integration boundaries before touching real client data.

## Privacy Verification Checklist

Before recording or sharing the demo, confirm:

- No `fetch`, `XMLHttpRequest`, or `sendBeacon` calls are used by the app logic.
- No notes are written to `localStorage`, `sessionStorage`, `IndexedDB`, cookies, or a backend database.
- No analytics or telemetry scripts are added.
- Generate, copy, and download actions work without network activity from the app logic.
- Samples, screenshots, and exports use dummy or sanitised data only.
