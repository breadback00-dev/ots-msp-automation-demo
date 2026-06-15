(function initGenerator(globalScope) {
  const SYSTEM_PATTERNS = [
    ["Microsoft 365", /\b(microsoft 365|m365|office 365|o365)\b/i],
    ["Intune", /\bintune|autopilot\b/i],
    ["Entra ID", /\bentra|azure ad|aad\b/i],
    ["MFA", /\bmfa|multi[- ]?factor|2fa\b/i],
    ["SharePoint", /\bsharepoint\b/i],
    ["Teams", /\bteams\b/i],
    ["Power BI", /\bpower bi|powerbi\b/i],
    ["Power Automate", /\bpower automate|flow\b/i],
    ["VoIP / Cloud PBX", /\bvoip|cloud pbx|phone system|telephony\b/i],
    ["Wi-Fi / Connectivity", /\bwi[- ]?fi|wifi|starlink|broadband|connectivity|network\b/i],
    ["Backups", /\bbackup|recovery|disaster recovery|restore\b/i],
    ["Laptops / endpoints", /\blaptop|desktop|device|endpoint|windows 10|windows 11\b/i],
    ["Email / shared mailboxes", /\bemail|mailbox|shared mailbox|outlook\b/i]
  ];

  const RISK_RULES = [
    {
      label: "MFA gaps may expose accounts to avoidable compromise.",
      pattern: /\b(no|missing|not all|some).{0,24}\b(mfa|2fa|multi[- ]?factor)\b|\b(mfa|2fa).{0,24}\b(gap|missing|not enabled|disabled)\b/i
    },
    {
      label: "Backup ownership or coverage is unclear.",
      pattern: /\bbackup.{0,30}(unknown|unclear|unsure|not sure|missing|no)|\b(no|unclear|unknown).{0,20}backup\b/i
    },
    {
      label: "Aging or unsupported endpoints may create security and support risk.",
      pattern: /\bold laptop|old desktop|aging device|windows 10|unsupported|end of life|eol/i
    },
    {
      label: "Joiner/leaver steps appear manual, creating access-control and audit risk.",
      pattern: /\b(onboarding|offboarding|joiner|leaver|new starter).{0,50}(manual|spreadsheet|miss|delay|inconsistent|chase)|\bspreadsheet.{0,30}(onboarding|offboarding|joiner|leaver)\b/i
    },
    {
      label: "Shared mailbox ownership or routing is unclear.",
      pattern: /\bshared mailbox|mailbox confusion|unclear mailbox|email routing/i
    },
    {
      label: "Manual rekeying or duplicated admin is wasting engineer/client time.",
      pattern: /\brekey|copy.{0,10}paste|duplicate entry|manual report|manual admin|spreadsheet|chasing/i
    },
    {
      label: "Approvals or handoffs lack a clear owner and audit trail.",
      pattern: /\b(approval|sign[- ]?off|handoff|handover).{0,50}(unclear|chasing|stalled|no owner|owner unknown|audit trail)|\b(no owner|owner unknown|audit trail).{0,50}(approval|sign[- ]?off|handoff|handover)\b/i
    }
  ];

  const MISSING_INFO_RULES = [
    ["Confirmed user and device count", /\b\d+\s*(users|staff|people|desktops|laptops|devices)\b/i],
    ["Primary business owner and technical approver", /\b(owner|approver|sponsor|decision maker)\b/i],
    ["Current backup scope and last restore test", /\bbackup|restore|recovery\b/i],
    ["MFA status for users and admin accounts", /\bmfa|2fa|multi[- ]?factor\b/i],
    ["Target date, urgency, or service window", /\b(deadline|target|urgent|by \d|date|window|off[- ]?peak)\b/i],
    ["Current tools used for the workflow", /\b(sharepoint|teams|forms|monday|power automate|excel|spreadsheet|psa|portal|hudu|it glue)\b/i],
    ["Success measure for the pilot", /\b(success|kpi|measure|save|hours|faster|reduce)\b/i]
  ];

  const AUTOMATION_RULES = [
    {
      title: "Client onboarding workflow",
      pattern: /\bonboarding|new client|welcome pack|collect forms|first check|new starter|joiner/i,
      impact: "Reduces repeated chasing and makes first-contact steps consistent.",
      firstStep: "Turn the existing onboarding checklist into a staged form, task list, and welcome email sequence.",
      microsoftFit: "Forms, SharePoint, Teams, Planner, Power Automate"
    },
    {
      title: "Leaver and access removal checklist",
      pattern: /\boffboarding|leaver|access removal|disable account|licen[cs]e|entra|groups/i,
      impact: "Reduces access-control risk and creates a reviewable trail.",
      firstStep: "Generate a leaver request intake, approval step, account action checklist, and completion note.",
      microsoftFit: "Entra ID, Microsoft 365 admin, Teams approvals"
    },
    {
      title: "Weekly reporting pack",
      pattern: /\bweekly report|manual report|power bi|visibility|dashboard|spreadsheet|kpi|reporting/i,
      impact: "Turns recurring reporting into a repeatable client update instead of a manual task.",
      firstStep: "Define the report fields, data owner, frequency, and client-facing summary template.",
      microsoftFit: "Power BI, Excel, SharePoint, Power Automate"
    },
    {
      title: "Approval routing",
      pattern: /\bapproval|sign[- ]?off|expense|quote|purchase|authorise|chasing/i,
      impact: "Keeps decisions moving and makes stalled approvals visible.",
      firstStep: "Map the requester, approver, fallback approver, SLA, and final record location.",
      microsoftFit: "Teams approvals, Power Automate, SharePoint lists"
    },
    {
      title: "File naming and document filing",
      pattern: /\bfile naming|folder|lost|document|sharepoint|naming convention|saving rules/i,
      impact: "Prevents project documents from disappearing into ad hoc folders.",
      firstStep: "Create one naming rule, one metadata rule, and one save-location rule for the chosen workflow.",
      microsoftFit: "SharePoint, OneDrive, Teams"
    },
    {
      title: "Support handover summariser",
      pattern: /\bticket|handover|support|engineer notes|client update|runbook|kb|knowledge base/i,
      impact: "Converts messy notes into reusable internal and client-facing records.",
      firstStep: "Standardise the handover fields: issue, systems, actions taken, risks, missing info, next owner.",
      microsoftFit: "PSA export, SharePoint, Teams, internal docs"
    }
  ];

  const SAMPLE_NOTES = {
    handover: `Client has 22 users and uses Microsoft 365, Teams and SharePoint. They want a cleaner onboarding and leaver process because requests currently arrive by email and get tracked in a spreadsheet.

Some users have MFA enabled but not all. There are old laptops still on Windows 10. Shared mailbox ownership is confusing and nobody is sure whether backups cover SharePoint.

They want a client-friendly next steps email, an engineer checklist, and a short runbook before any changes are made.`,
    automation: `Operations team says they are drowning in manual admin. New client onboarding uses emails, spreadsheets and Teams messages. Reports are built manually every Friday by copying numbers from Excel into a client update.

Approvals for quotes and new starters are chased by email. Files are saved into inconsistent SharePoint folders and people lose the latest version. They already use Microsoft 365, Teams, SharePoint and Power BI but have not used Power Automate much.

Goal: find the first small automation pilot that saves time without disrupting the team.`,
    cyber: `Client is preparing for Cyber Essentials. They use Microsoft 365 and Entra ID. MFA is enabled for admins but not all users. Several laptops are old and patch status is unclear.

Firewall ownership is unknown, backup coverage is not documented, and there is no clear evidence pack for user access reviews. The client wants a practical remediation checklist and a plain-English update for leadership.`
  };

  function unique(items) {
    return Array.from(new Set(items.filter(Boolean)));
  }

  function sentenceCase(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function detectSystems(notes) {
    return SYSTEM_PATTERNS
      .filter(([, pattern]) => pattern.test(notes))
      .map(([label]) => label);
  }

  function detectRisks(notes) {
    const risks = RISK_RULES.filter((rule) => rule.pattern.test(notes)).map((rule) => rule.label);
    if (risks.length === 0 && notes.trim()) {
      risks.push("No critical risk was obvious from the notes, but engineer review is still required.");
    }
    return unique(risks);
  }

  function detectMissingInfo(notes) {
    const missing = MISSING_INFO_RULES
      .filter(([, evidencePattern]) => !evidencePattern.test(notes))
      .map(([label]) => label);

    if (/backup|recovery/i.test(notes) && !/restore test|last restore|tested/i.test(notes)) {
      missing.unshift("Last successful backup restore test");
    }

    return unique(missing).slice(0, 7);
  }

  function detectOpportunities(notes) {
    const matched = AUTOMATION_RULES.filter((rule) => rule.pattern.test(notes));
    const fallback = AUTOMATION_RULES.find((rule) => rule.title === "Support handover summariser");
    return (matched.length ? matched : [fallback]).map((rule, index) => ({
      rank: index + 1,
      title: rule.title,
      impact: rule.impact,
      firstStep: rule.firstStep,
      microsoftFit: rule.microsoftFit,
      effort: index === 0 ? "Low to medium" : "Medium",
      confidence: index === 0 ? "High" : "Medium"
    }));
  }

  function countSignals(notes) {
    return {
      systems: detectSystems(notes).length,
      risks: detectRisks(notes).length,
      missing: detectMissingInfo(notes).length,
      opportunities: detectOpportunities(notes).length
    };
  }

  function buildHandoverPack(notes) {
    const systems = detectSystems(notes);
    const risks = detectRisks(notes);
    const missing = detectMissingInfo(notes);
    const userMatch = notes.match(/\b(\d+)\s*(users|staff|people)\b/i);
    const deviceMatch = notes.match(/\b(\d+)\s*(desktops|laptops|devices|endpoints)\b/i);
    const clientSize = userMatch ? `${userMatch[1]} ${userMatch[2].toLowerCase()}` : "Client size not confirmed";
    const deviceCount = deviceMatch ? `${deviceMatch[1]} ${deviceMatch[2].toLowerCase()}` : "Device count not confirmed";

    return {
      mode: "handover",
      title: "Client documentation and handover pack",
      stats: countSignals(notes),
      sections: [
        {
          title: "Client snapshot",
          tag: "Summary",
          type: "list",
          items: [
            `Known size: ${clientSize}.`,
            `Known estate: ${deviceCount}.`,
            systems.length
              ? `Systems mentioned: ${systems.join(", ")}.`
              : "Systems mentioned: none detected from the notes.",
            "Primary outcome: turn loose notes into a reviewed handover, client update, and next-action checklist."
          ]
        },
        {
          title: "Key risks",
          tag: "Review",
          type: "risk-list",
          items: risks
        },
        {
          title: "Missing information",
          tag: "Questions",
          type: "missing-list",
          items: missing.length ? missing : ["No major missing fields detected. Confirm details before client use."]
        },
        {
          title: "Engineer checklist",
          tag: "Internal",
          type: "list",
          items: [
            "Confirm scope, owner, urgency, and affected users before making changes.",
            "Validate MFA, backup coverage, device status, and shared mailbox ownership.",
            "Capture screenshots or evidence links for any security or configuration changes.",
            "Write final notes in client-safe language and mark assumptions clearly.",
            "Agree next owner and target date for every open action."
          ]
        },
        {
          title: "Draft runbook",
          tag: "Runbook",
          type: "block",
          className: "runbook-block",
          content: `1. Intake: collect client notes, affected users, systems, and desired outcome.
2. Triage: separate urgent risks from documentation gaps.
3. Validate: confirm MFA, backup, endpoint, and mailbox facts with the relevant admin view.
4. Document: update the handover pack, internal notes, and client-facing summary.
5. Handover: assign owner, due date, evidence link, and review point.`
        },
        {
          title: "Client-friendly next steps email",
          tag: "Client",
          type: "block",
          className: "email-block",
          content: `Hi,

Thanks for sharing the initial details. We have summarised the main points and identified a few areas to confirm before any changes are made.

The immediate priorities are to validate account protection, confirm backup coverage, clarify mailbox ownership, and agree the next steps for onboarding/offboarding. Once those details are confirmed, we can provide a cleaner action plan with owners and timescales.

Best,
Office Tech Suite`
        },
        {
          title: "Internal handover notes",
          tag: "OTS",
          type: "list",
          items: [
            "Use as a first draft only; engineer review required before client delivery.",
            "Keep assumptions visible rather than turning them into facts.",
            "Good candidate for a lightweight AI workflow layered over existing PSA/docs tooling."
          ]
        }
      ]
    };
  }

  function buildAutomationMap(notes) {
    const systems = detectSystems(notes);
    const risks = detectRisks(notes);
    const missing = detectMissingInfo(notes);
    const opportunities = detectOpportunities(notes);
    const first = opportunities[0];

    return {
      mode: "automation",
      title: "Automation opportunity map",
      stats: countSignals(notes),
      sections: [
        {
          title: "Automation readout",
          tag: "Summary",
          type: "list",
          items: [
            systems.length
              ? `Existing tools mentioned: ${systems.join(", ")}.`
              : "Existing tools were not clear from the notes.",
            `Best first pilot: ${first.title}.`,
            `${sentenceCase(first.impact)}`,
            "Recommended principle: start with the least disruptive workflow that removes repeated chasing or rekeying."
          ]
        },
        {
          title: "Ranked opportunities",
          tag: "Pilot",
          type: "opportunities",
          items: opportunities
        },
        {
          title: "Workshop questions",
          tag: "Discovery",
          type: "missing-list",
          items: unique([
            "Which task is repeated every week and annoys the team most?",
            "Where does the source data live today?",
            "Who approves the output and what counts as done?",
            "What must stay human-reviewed for client trust or compliance?",
            ...missing.slice(0, 3)
          ])
        },
        {
          title: "Pilot plan",
          tag: "30 days",
          type: "list",
          items: [
            "Week 1: map current workflow, owners, systems, exceptions, and approval points.",
            "Week 2: build a small proof using dummy or low-risk data.",
            "Week 3: test with one internal user and capture time saved, errors avoided, and friction.",
            "Week 4: package the workflow, handover notes, and a client-safe before/after summary."
          ]
        },
        {
          title: "Risks and safeguards",
          tag: "Governance",
          type: "risk-list",
          items: unique([
            ...risks,
            "Avoid automating unclear responsibility; name the human owner before building.",
            "Do not process sensitive client data in unapproved AI tools.",
            "Keep an audit trail for approvals, account changes, and client-facing outputs."
          ])
        },
        {
          title: "Client-facing positioning",
          tag: "Plain English",
          type: "block",
          className: "email-block",
          content: `We have identified a small automation opportunity that could reduce manual admin without changing how your team works overnight.

The first pilot should focus on one repeatable workflow, use tools you already have, and keep human review in place. The goal is not to replace people; it is to remove the chasing, rekeying, and inconsistent handoffs that slow good teams down.`
        }
      ]
    };
  }

  function generatePack(notes, mode) {
    const cleanNotes = String(notes || "").trim();
    if (!cleanNotes) {
      return {
        mode,
        title: "No notes yet",
        stats: { systems: 0, risks: 0, missing: 0, opportunities: 0 },
        sections: [
          {
            title: "Empty state",
            tag: "Input",
            type: "paragraph",
            content: "Paste messy notes or load a demo sample, then generate a pack."
          }
        ]
      };
    }

    return mode === "automation" ? buildAutomationMap(cleanNotes) : buildHandoverPack(cleanNotes);
  }

  function toMarkdown(pack) {
    const lines = [`# ${pack.title}`, ""];

    pack.sections.forEach((section) => {
      lines.push(`## ${section.title}`, "");
      if (section.type === "block" || section.type === "paragraph") {
        lines.push(section.content, "");
      } else {
        section.items.forEach((item) => {
          if (section.type === "opportunities") {
            lines.push(`- ${item.rank}. ${item.title}`);
            lines.push(`  - Impact: ${item.impact}`);
            lines.push(`  - First step: ${item.firstStep}`);
            lines.push(`  - Microsoft fit: ${item.microsoftFit}`);
            lines.push(`  - Effort: ${item.effort}`);
            lines.push(`  - Confidence: ${item.confidence}`);
          } else {
            lines.push(`- ${item}`);
          }
        });
        lines.push("");
      }
    });

    return lines.join("\n").trim() + "\n";
  }

  const api = {
    SAMPLE_NOTES,
    detectSystems,
    detectRisks,
    detectMissingInfo,
    detectOpportunities,
    generatePack,
    toMarkdown
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  globalScope.OtsGenerator = api;
})(typeof window !== "undefined" ? window : globalThis);
