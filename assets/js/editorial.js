document.addEventListener("DOMContentLoaded", () => {
  const tabs = [...document.querySelectorAll(".ed-tabs [role=tab]")];
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => t.setAttribute("aria-selected", "false"));
    document.querySelectorAll(".ed-student-panel").forEach(p => p.classList.remove("active"));
    tab.setAttribute("aria-selected", "true");
    document.getElementById(tab.dataset.panel)?.classList.add("active");
  }));

  const publications = window.PUBLICACOES || [];
  const search = document.getElementById("pub-search");
  const year = document.getElementById("pub-year");
  const list = document.getElementById("pub-list");
  const count = document.getElementById("pub-count");
  const normalize = text => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const render = () => {
    if (!list) return;
    const query = normalize(search.value.trim());
    const selectedYear = year.value;
    const shown = publications.filter(p => (!selectedYear || String(p.ano) === selectedYear) && (!query || normalize(`${p.autores} ${p.titulo} ${p.periodico}`).includes(query)));
    count.textContent = `${shown.length} ${shown.length === 1 ? "publicação" : "publicações"}`;
    list.innerHTML = shown.map(p => `<article><div class="ed-pub-year">${p.ano}</div><div><p class="ed-pub-authors">${p.autores}</p><h2>${p.titulo}</h2><p class="ed-pub-journal">${p.periodico}</p></div></article>`).join("");
  };
  if (year) {
    [...new Set(publications.map(p => p.ano))].sort((a,b) => b-a).forEach(value => year.insertAdjacentHTML("beforeend", `<option>${value}</option>`));
    search.addEventListener("input", render); year.addEventListener("change", render); render();
  }

  const local = ["pitom", "beira"].join("");
  const domain = ["musica", "ufrj", "br"].join(".");
  document.querySelectorAll(".js-email").forEach(button => button.addEventListener("click", () => { window.location.href = `mailto:${local}@${domain}`; }));
});
