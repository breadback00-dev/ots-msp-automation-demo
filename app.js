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

  let activeMode = "handover";
  let currentPack = null;

  function setMode(mode) {
    activeMode = mode;
    modeButtons.forEach((button) => {
      const isActive = button.dataset.mode === mode;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });
    generate();
  }

  function renderStats(stats) {
    const statsConfig = [
      ["Systems", stats.systems],
      ["Risks", stats.risks],
      ["Missing", stats.missing],
      ["Opportunities", stats.opportunities]
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

    const listClass = section.type === "risk-list"
      ? "risk-list"
      : section.type === "missing-list" || section.type === "opportunities"
        ? "missing-list"
        : "";

    const items = section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    return `<article class="output-section">${title}<ul class="${listClass}">${items}</ul></article>`;
  }

  function generate() {
    currentPack = generatePack(notesInput.value, activeMode);
    renderStats(currentPack.stats);
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

    await navigator.clipboard.writeText(toMarkdown(currentPack));
    copyMarkdown.textContent = "Copied";
    window.setTimeout(() => {
      copyMarkdown.textContent = "Copy";
    }, 1200);
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
  }

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
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
