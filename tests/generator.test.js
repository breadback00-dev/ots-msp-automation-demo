const assert = require("node:assert/strict");
const {
  SAMPLE_NOTES,
  detectSystems,
  detectRisks,
  detectOpportunities,
  generatePack,
  toMarkdown
} = require("../src/generator");

const handoverPack = generatePack(SAMPLE_NOTES.handover, "handover");
assert.equal(handoverPack.mode, "handover");
assert.equal(handoverPack.title, "Client documentation and handover pack");
assert.ok(detectSystems(SAMPLE_NOTES.handover).includes("Microsoft 365"));
assert.ok(detectSystems(SAMPLE_NOTES.handover).includes("MFA"));
assert.ok(detectRisks(SAMPLE_NOTES.handover).some((risk) => risk.includes("MFA")));
assert.ok(toMarkdown(handoverPack).includes("## Engineer checklist"));

const automationPack = generatePack(SAMPLE_NOTES.automation, "automation");
assert.equal(automationPack.mode, "automation");
assert.equal(automationPack.title, "Automation opportunity map");
assert.ok(detectOpportunities(SAMPLE_NOTES.automation).some((opportunity) => opportunity.title === "Client onboarding workflow"));
assert.equal(automationPack.sections.find((section) => section.title === "Ranked opportunities").type, "opportunities");
assert.equal(typeof automationPack.sections.find((section) => section.title === "Ranked opportunities").items[0], "object");
assert.ok(toMarkdown(automationPack).includes("## Ranked opportunities"));
assert.ok(toMarkdown(automationPack).includes("Microsoft fit:"));

const emptyPack = generatePack("", "handover");
assert.equal(emptyPack.title, "No notes yet");

console.log("generator tests passed");
