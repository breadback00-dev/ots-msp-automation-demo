(function initApp() {
  const { SAMPLE_NOTES, generatePack, toMarkdown } = window.OtsGenerator;

  const notesInput = document.querySelector("#notesInput");
  const generateBtn = document.querySelector("#generateBtn");
  const output = document.querySelector("#output");
  const summaryStats = document.querySelector("#summaryStats");
  const modeButtons = Array.from(document.querySelectorAll(".mode-button"));
  const sampleButtons = Array.from(document.querySelectorAll(".sample-button"));
  const clearNotes = document.querySelector("#clearNotes");
  const copyMarkdown = document.querySelector("#copyMarkdown");
  const downloadMarkdown = document.querySelector("#downloadMarkdown");
  const modeDescription = document.querySelector("#modeDescription");
  const exportStatus = document.querySelector("#exportStatus");

  let activeMode = "handover";
  let currentPack = null;
  const modeDescriptions = {
    handover: "Turn raw project notes into a handover pack, runbook, checklist, and internal client-update draft.",
    automation: "Turn process notes into automation opportunities, workshop questions, and a 30-day pilot."
  };

  function setMode(mode) {
    activeMode = mode;
    modeButtons.forEach((button) => {
      const isActive = button.dataset.mode === mode;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
    modeDescription.textContent = modeDescriptions[mode];
    generateBtn.textContent = mode === "automation" ? "Generate opportunity map" : "Generate handover pack";
    generate();
  }

  function renderStats(pack) {
    const { stats } = pack;
    const statsConfig = [
      ["Systems", stats.systems],
      ["Risks", stats.risks],
      ["Missing info", stats.missing],
      pack.mode === "automation"
        ? ["Opportunities", stats.opportunities]
        : ["Sections", pack.sections.length]
    ];

    summaryStats.innerHTML = statsConfig
      .map(([label, value]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`)
      .join("");
  }

  function sectionMarkup(section) {
    const title = `
      <div class="section-title-row">
        <h3>${escapeHtml(section.title)}</h3>
        <span class="section-tag">${escapeHtml(section.tag)}</span>
      </div>
    `;

    if (section.type === "block") {
      return `<article class="output-section">${title}<pre class="${section.className}">${escapeHtml(section.content)}</pre></article>`;
    }

    if (section.type === "paragraph") {
      return `<article class="output-section">${title}<p>${escapeHtml(section.content)}</p></article>`;
    }

    if (section.type === "opportunities") {
      const items = section.items.map((item) => `
        <li class="opportunity-card">
          <div class="opportunity-card-header">
            <strong>${item.rank}. ${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(item.confidence)} confidence</span>
          </div>
          <p>${escapeHtml(item.impact)}</p>
          <dl>
            <div><dt>First step</dt><dd>${escapeHtml(item.firstStep)}</dd></div>
            <div><dt>Microsoft fit</dt><dd>${escapeHtml(item.microsoftFit)}</dd></div>
            <div><dt>Effort</dt><dd>${escapeHtml(item.effort)}</dd></div>
          </dl>
        </li>
      `).join("");
      return `<article class="output-section">${title}<ol class="opportunity-list">${items}</ol></article>`;
    }

    const listClass = section.type === "risk-list"
      ? "risk-list"
      : section.type === "missing-list"
        ? "missing-list"
        : "";

    const items = section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    return `<article class="output-section">${title}<ul class="${listClass}">${items}</ul></article>`;
  }

  function generate() {
    currentPack = generatePack(notesInput.value, activeMode);
    renderStats(currentPack);
    output.innerHTML = currentPack.sections.map(sectionMarkup).join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function copyCurrentMarkdown() {
    if (!currentPack) {
      generate();
    }

    try {
      await navigator.clipboard.writeText(toMarkdown(currentPack));
      setExportStatus("Copied Markdown to clipboard.", "success");
      copyMarkdown.textContent = "Copied";
      window.setTimeout(() => {
        copyMarkdown.textContent = "Copy";
      }, 1200);
    } catch (error) {
      setExportStatus("Copy blocked by the browser. Use Download instead.", "error");
    }
  }

  function downloadCurrentMarkdown() {
    if (!currentPack) {
      generate();
    }

    const blob = new Blob([toMarkdown(currentPack)], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = activeMode === "automation" ? "automation-opportunity-map.md" : "client-handover-pack.md";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setExportStatus(`Downloaded ${link.download}.`, "success");
  }

  function setExportStatus(message, tone) {
    exportStatus.textContent = message;
    exportStatus.dataset.tone = tone;
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextMode = button.dataset.mode;
      let loadedMatchingSample = false;
      if (nextMode === "automation" && notesInput.value === SAMPLE_NOTES.handover) {
        notesInput.value = SAMPLE_NOTES.automation;
        loadedMatchingSample = true;
      }
      if (nextMode === "handover" && notesInput.value === SAMPLE_NOTES.automation) {
        notesInput.value = SAMPLE_NOTES.handover;
        loadedMatchingSample = true;
      }
      setMode(nextMode);
      setExportStatus(
        loadedMatchingSample
          ? nextMode === "automation"
            ? "Loaded the automation sample."
            : "Loaded the handover sample."
          : nextMode === "automation"
            ? "Switched to automation mapper."
            : "Switched to handover pack.",
        "success"
      );
    });
  });

  sampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      notesInput.value = SAMPLE_NOTES[button.dataset.sample];
      if (button.dataset.sample === "automation") {
        setMode("automation");
      } else {
        setMode("handover");
      }
      notesInput.focus();
    });
  });

  clearNotes.addEventListener("click", () => {
    notesInput.value = "";
    generate();
    notesInput.focus();
  });

  generateBtn.addEventListener("click", generate);
  notesInput.addEventListener("input", generate);
  copyMarkdown.addEventListener("click", copyCurrentMarkdown);
  downloadMarkdown.addEventListener("click", downloadCurrentMarkdown);

  notesInput.value = SAMPLE_NOTES.handover;
  generate();
})();
