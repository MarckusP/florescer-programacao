/* ===== Florescer 2026 · App de Programação ===== */

const KIND_ICON = {
  palestra: "🎤",
  plenaria: "✨",
  louvor: "🎶",
  devocional: "🙏",
  pausa: "☕",
};
const KIND_LABEL = {
  palestra: "Palestra",
  plenaria: "Plenária",
  louvor: "Louvor",
  devocional: "Devocional",
  pausa: "Intervalo",
};

const STORE_KEY = "florescer2026_roteiro";

// Carrega as escolhas do localStorage de forma resiliente e descarta ids
// que não existam mais na programação (ex.: se a grade for editada).
function loadChosen() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr)) return new Set();
    return new Set(arr.filter((id) => findSession(id)));
  } catch (_) {
    return new Set();
  }
}

let currentView = "day"; // "day" | "mine"
let currentDay = 0;

const el = (id) => document.getElementById(id);
const app = el("app");

let chosen = loadChosen(); // Set de ids das palestras escolhidas

/* ---------- helpers ---------- */
function saveChosen() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify([...chosen]));
  } catch (_) {
    /* modo privado / storage cheio — mantém em memória na sessão */
  }
  updateMineCount();
}
function updateMineCount() {
  el("mine-count").textContent = chosen.size;
}
function findSession(sid) {
  for (const day of SCHEDULE)
    for (const slot of day.slots)
      for (const s of slot.sessions)
        if (s.id === sid) return { session: s, slot, day };
  return null;
}
function esc(str) {
  return String(str).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
// Chave única do horário (dia + hora) — usada para detectar simultâneas.
function slotKeyOf(found) {
  return found.day.id + "@" + found.slot.time;
}
// Retorna as sessões JÁ escolhidas que estão no mesmo horário de `sid`.
function conflictsFor(sid) {
  const target = findSession(sid);
  if (!target) return [];
  const key = slotKeyOf(target);
  const out = [];
  for (const id of chosen) {
    if (id === sid) continue;
    const f = findSession(id);
    if (f && slotKeyOf(f) === key) out.push(f);
  }
  return out;
}

/* ---------- render: abas de dia ---------- */
function renderTabs() {
  const nav = el("day-tabs");
  nav.innerHTML = SCHEDULE.map(
    (d, i) => `
    <button class="day-tab ${currentView === "day" && i === currentDay ? "active" : ""}" data-day="${i}">
      <span class="d-label">${d.label}</span>
      <span class="d-date">${d.date}</span>
    </button>`
  ).join("");
  nav.querySelectorAll(".day-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentView = "day";
      currentDay = +btn.dataset.day;
      render();
    });
  });
}

/* ---------- render: um cartão de sessão ---------- */
function sessionCard(s, isSimul) {
  const sp = s.speaker ? SPEAKERS[s.speaker] : null;
  const room = ROOMS[s.room];
  const isChosen = chosen.has(s.id);
  const canPick = s.kind === "palestra"; // só palestras entram no roteiro
  const media = sp
    ? `<img class="card-photo" src="${sp.photo}" alt="${esc(sp.name)}" loading="lazy" />`
    : `<div class="card-icon ${s.kind}">${KIND_ICON[s.kind] || "•"}</div>`;

  const pickBtn = canPick
    ? `<button class="card-pick" data-pick="${s.id}" aria-label="Adicionar ao meu roteiro">${isChosen ? "♥" : "♡"}</button>`
    : "";

  return `
    <div class="card ${isChosen ? "chosen" : ""} ${isSimul ? "simul" : ""}" data-open="${s.id}">
      ${media}
      <div class="card-main">
        <div class="card-title">${esc(s.title)}</div>
        ${sp ? `<div class="card-speaker">${esc(sp.name)}</div>` : ""}
        <div class="card-meta">
          <span class="chip room">📍 ${esc(room ? room.short : "")}</span>
          <span class="chip kind-${s.kind}">${KIND_LABEL[s.kind] || ""}</span>
        </div>
      </div>
      ${pickBtn}
    </div>`;
}

/* ---------- render: dia ---------- */
function renderDay() {
  const day = SCHEDULE[currentDay];
  let html = `
    <div class="day-intro">
      <h2>${esc(day.weekday)}</h2>
      <div class="rule"></div>
      <p>${esc(day.date)} · toque para ver detalhes<br>♥ escolha as palestras do seu roteiro</p>
    </div>`;

  day.slots.forEach((slot, idx) => {
    const simul = slot.sessions.filter((s) => s.kind === "palestra").length > 1;
    const last = idx === day.slots.length - 1;
    html += `
      <div class="slot">
        <div class="slot-rail">
          <div class="slot-time">${slot.time}</div>
          <div class="slot-dot"></div>
          ${last ? "" : '<div class="slot-line"></div>'}
        </div>
        <div class="slot-body">
          ${slot.note ? `<span class="slot-note">✦ ${esc(slot.note)}</span>` : ""}
          ${slot.sessions.map((s) => sessionCard(s, simul)).join("")}
        </div>
      </div>`;
  });

  app.innerHTML = html;
}

/* ---------- render: meu roteiro ---------- */
function renderMine() {
  const items = [...chosen].map(findSession).filter(Boolean);

  if (items.length === 0) {
    app.innerHTML = `
      <div class="empty">
        <div class="e-flower">✿</div>
        <h3>Seu roteiro está vazio</h3>
        <p>Nas palestras simultâneas você escolhe para qual quer ir.<br>
        Toque no ♥ de uma palestra para montar o seu roteiro personalizado do Florescer.</p>
      </div>`;
    return;
  }

  // ordena por dia e horário
  const order = new Map();
  SCHEDULE.forEach((d, di) =>
    d.slots.forEach((slot) => slot.sessions.forEach((s) => order.set(s.id, di * 10000 + parseInt(slot.time.replace(":", "")))))
  );
  items.sort((a, b) => order.get(a.session.id) - order.get(b.session.id));

  let html = `
    <div class="mine-head">
      <h2>Meu Roteiro</h2>
      <div class="rule"></div>
      <p>As palestras que você escolheu para participar</p>
    </div>`;

  let lastDay = null;
  items.forEach(({ session, slot, day }) => {
    if (day.id !== lastDay) {
      html += `<div class="mine-day-label">${esc(day.label)} · ${esc(day.date)}</div>`;
      lastDay = day.id;
    }
    const sp = session.speaker ? SPEAKERS[session.speaker] : null;
    const room = ROOMS[session.room];
    html += `
      <div class="card chosen" data-open="${session.id}">
        ${sp ? `<img class="card-photo" src="${sp.photo}" alt="${esc(sp.name)}" loading="lazy" />` : `<div class="card-icon">${KIND_ICON[session.kind]}</div>`}
        <div class="card-main">
          <div class="card-title">${esc(session.title)}</div>
          ${sp ? `<div class="card-speaker">${esc(sp.name)}</div>` : ""}
          <div class="card-meta">
            <span class="chip room">🕑 ${slot.time}</span>
            <span class="chip room">📍 ${esc(room ? room.short : "")}</span>
          </div>
        </div>
        <button class="card-pick" data-pick="${session.id}" aria-label="Remover">♥</button>
      </div>`;
  });

  app.innerHTML = html;
}

/* ---------- render principal ---------- */
function render() {
  renderTabs();
  el("tab-roteiro").classList.toggle("active", currentView === "mine");
  if (currentView === "mine") renderMine();
  else renderDay();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ---------- bottom sheet ---------- */
function openSheet(sid) {
  const found = findSession(sid);
  if (!found) return;
  const { session: s, slot, day } = found;
  const sp = s.speaker ? SPEAKERS[s.speaker] : null;
  const room = ROOMS[s.room];
  const isChosen = chosen.has(s.id);
  const canPick = s.kind === "palestra";

  // sessões simultâneas no mesmo horário (outras palestras)
  const simulOthers = slot.sessions.filter((o) => o.id !== s.id && o.kind === "palestra");

  const hero = sp
    ? `<img src="${sp.photo}" alt="${esc(sp.name)}" />`
    : `<div class="s-icon">${KIND_ICON[s.kind] || "✿"}</div>`;

  let html = `
    <div class="sheet-hero">
      ${hero}
      <div>
        <h3>${esc(s.title)}</h3>
        <div class="s-role">${KIND_LABEL[s.kind] || ""} · ${esc(day.label)} ${slot.time}</div>
      </div>
    </div>

    <div class="sheet-block">
      <div class="sheet-row">
        <span class="chip room">🕑 ${esc(day.weekday)}, ${slot.time}</span>
        <span class="chip room">📍 ${esc(room ? room.name : "")}</span>
      </div>
    </div>`;

  if (s.desc) {
    html += `<div class="sheet-block"><div class="lbl">Sobre a sessão</div><p>${esc(s.desc)}</p></div>`;
  }

  if (sp) {
    html += `
      <div class="sheet-block">
        <div class="lbl">${esc(sp.role)} · ${esc(sp.tag)}</div>
        <p>${esc(sp.bio)}</p>
        ${sp.ig ? `<p class="ig">@${esc(sp.ig)}</p>` : ""}
      </div>`;
  }

  if (simulOthers.length) {
    html += `<div class="sheet-simul-title">✦ No mesmo horário (você escolhe uma)</div>`;
    simulOthers.forEach((o) => {
      const osp = o.speaker ? SPEAKERS[o.speaker] : null;
      html += `
        <div class="card" data-open="${o.id}" style="margin-bottom:8px;">
          ${osp ? `<img class="card-photo" src="${osp.photo}" alt="">` : `<div class="card-icon">${KIND_ICON[o.kind]}</div>`}
          <div class="card-main">
            <div class="card-title" style="font-size:14px;">${esc(o.title)}</div>
            ${osp ? `<div class="card-speaker">${esc(osp.name)}</div>` : ""}
            <div class="card-meta"><span class="chip room">📍 ${esc(ROOMS[o.room].short)}</span></div>
          </div>
        </div>`;
    });
  }

  if (canPick) {
    html += `
      <button class="sheet-cta ${isChosen ? "remove" : ""}" data-pick="${s.id}">
        ${isChosen ? "♥ No meu roteiro — remover" : "♡ Adicionar ao meu roteiro"}
      </button>`;
  }

  el("sheet-content").innerHTML = html;
  const bd = el("sheet-backdrop");
  bd.hidden = false;
}
function closeSheet() {
  el("sheet-backdrop").hidden = true;
}

/* ---------- escolher / remover ---------- */
function refreshView() {
  if (currentView === "mine") renderMine();
  else renderDay();
}
function refreshSheetIfOpen(sid) {
  if (!el("sheet-backdrop").hidden && el("sheet-content").querySelector(`[data-pick="${sid}"]`)) {
    openSheet(sid);
  }
}
function applyPick(sid, removeIds) {
  (removeIds || []).forEach((id) => chosen.delete(id));
  chosen.add(sid);
  saveChosen();
  refreshView();
  refreshSheetIfOpen(sid);
}
function removePick(sid) {
  chosen.delete(sid);
  saveChosen();
  refreshView();
  refreshSheetIfOpen(sid);
}
// Ponto de entrada ao tocar no ♥: trata remoção direta e conflito de horário.
function requestPick(sid) {
  if (chosen.has(sid)) {
    removePick(sid);
    return;
  }
  const conflicts = conflictsFor(sid);
  if (conflicts.length) {
    openConflictModal(sid, conflicts);
    return;
  }
  applyPick(sid, []);
}

/* ---------- confirmação de conflito de horário ---------- */
function openConflictModal(sid, conflicts) {
  const incoming = findSession(sid);
  const outgoing = conflicts[0]; // por horário, normalmente só há uma
  const inSp = incoming.session.speaker ? SPEAKERS[incoming.session.speaker] : null;
  const outSp = outgoing.session.speaker ? SPEAKERS[outgoing.session.speaker] : null;

  el("confirm-body").innerHTML = `
    <h3 id="confirm-title">Mesmo horário</h3>
    <p class="i-text">Às <b>${incoming.slot.time}</b> de ${esc(incoming.day.label)} você só pode participar de uma palestra. Marcar esta vai <b>remover a outra</b> do seu roteiro.</p>
    <div class="conflict-swap">
      <div class="conflict-col out">
        <div class="c-tag">✕ Sai do roteiro</div>
        <div class="c-title">${esc(outgoing.session.title)}</div>
        ${outSp ? `<div class="c-speaker">${esc(outSp.name)}</div>` : ""}
      </div>
      <div class="conflict-arrow">→</div>
      <div class="conflict-col in">
        <div class="c-tag">♥ Entra no lugar</div>
        <div class="c-title">${esc(incoming.session.title)}</div>
        ${inSp ? `<div class="c-speaker">${esc(inSp.name)}</div>` : ""}
      </div>
    </div>
    <div class="install-actions">
      <button class="install-primary ghost" id="conflict-back">Voltar</button>
      <button class="install-primary" id="conflict-go">Prosseguir</button>
    </div>`;

  el("confirm-modal").hidden = false;
  el("conflict-go").addEventListener("click", () => {
    closeConflict();
    applyPick(sid, conflicts.map((c) => c.session.id));
  });
  el("conflict-back").addEventListener("click", closeConflict);
}
function closeConflict() {
  el("confirm-modal").hidden = true;
}
el("confirm-modal").addEventListener("click", (e) => {
  if (e.target === el("confirm-modal")) closeConflict();
});

/* ---------- eventos (delegação) ---------- */
document.addEventListener("click", (e) => {
  const pick = e.target.closest("[data-pick]");
  if (pick) {
    e.stopPropagation();
    requestPick(pick.dataset.pick);
    return;
  }
  const open = e.target.closest("[data-open]");
  if (open) {
    openSheet(open.dataset.open);
    return;
  }
});

el("tab-roteiro").addEventListener("click", () => {
  currentView = "mine";
  render();
});

el("sheet-backdrop").addEventListener("click", (e) => {
  if (e.target === el("sheet-backdrop")) closeSheet();
});

/* ---------- abrir em tela cheia / instalar ---------- */
let deferredPrompt = null; // evento de instalação do Android/Chrome

const isIOS =
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
}
function canFullscreen() {
  return !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
}

// Android/Chrome: guarda o evento para instalar em 1 toque depois
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  el("btn-fullscreen").hidden = false; // mostra atalho no cabeçalho
});

// já instalado como app
window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  closeInstall();
  el("btn-fullscreen").hidden = true;
});

function openInstall() {
  if (isStandalone()) return; // já está em tela cheia como app
  const body = el("install-body");

  if (deferredPrompt) {
    // ANDROID — instalação nativa em 1 toque (estilo Game Pass)
    body.innerHTML = `
      <h3 id="install-title">Abrir em tela cheia?</h3>
      <p class="i-text">Instale o Florescer no seu celular e use como um app — em tela cheia e até sem internet.</p>
      <button class="install-primary" id="install-go">✨ Abrir em tela cheia</button>
      <button class="install-secondary" id="install-later">Agora não</button>`;
  } else if (isIOS) {
    // iOS — Apple não permite instalar sozinho; mostramos o passo a passo
    body.innerHTML = `
      <h3 id="install-title">Deixe em tela cheia</h3>
      <p class="i-text">No iPhone, adicione à tela de início em 2 passos para abrir como um app:</p>
      <div class="i-steps">
        <div class="i-step">
          <span class="n">1</span>
          <span class="t">Toque em
            <span class="ios-share"><svg viewBox="0 0 20 20" fill="none"><path d="M10 2v10M10 2L6.5 5.5M10 2l3.5 3.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 9H4v8h12V9h-1" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <b>Compartilhar</b> na barra do Safari</span>
        </div>
        <div class="i-step">
          <span class="n">2</span>
          <span class="t">Escolha <b>Adicionar à Tela de Início</b> ➕</span>
        </div>
      </div>
      <button class="install-secondary" id="install-later">Entendi</button>`;
  } else if (canFullscreen()) {
    // Desktop / outros navegadores — tela cheia imediata via Fullscreen API
    body.innerHTML = `
      <h3 id="install-title">Abrir em tela cheia?</h3>
      <p class="i-text">Veja toda a programação em tela cheia, sem distrações.</p>
      <button class="install-primary" id="install-go">⛶ Abrir em tela cheia</button>
      <button class="install-secondary" id="install-later">Agora não</button>`;
  } else {
    return;
  }

  el("install-modal").hidden = false;
  const go = el("install-go");
  if (go) go.addEventListener("click", doInstall);
  const later = el("install-later");
  if (later) later.addEventListener("click", () => {
    closeInstall();
    localStorage.setItem("florescer_install_dismissed", "1");
  });
}

async function doInstall() {
  if (deferredPrompt) {
    // Android: dispara o diálogo nativo de instalação
    deferredPrompt.prompt();
    try { await deferredPrompt.userChoice; } catch (_) {}
    deferredPrompt = null;
    closeInstall();
  } else if (canFullscreen()) {
    const root = document.documentElement;
    try {
      await (root.requestFullscreen ? root.requestFullscreen() : root.webkitRequestFullscreen());
    } catch (_) {}
    closeInstall();
  }
}

function closeInstall() {
  el("install-modal").hidden = true;
}

// botão do cabeçalho reabre a opção a qualquer momento
el("btn-fullscreen").addEventListener("click", openInstall);

// fecha ao tocar fora do cartão
el("install-modal").addEventListener("click", (e) => {
  if (e.target === el("install-modal")) closeInstall();
});

function maybeShowInstall() {
  if (isStandalone()) return;
  // mostra o atalho no cabeçalho quando dá pra ir em tela cheia
  if (isIOS || canFullscreen()) el("btn-fullscreen").hidden = false;
  // abre o convite automaticamente na primeira visita
  if (!localStorage.getItem("florescer_install_dismissed")) {
    setTimeout(openInstall, 1600);
  }
}

/* ---------- boot ---------- */
function boot() {
  updateMineCount();
  render();
  maybeShowInstall();
  setTimeout(() => el("splash").classList.add("hide"), 1100);
}
boot();

/* ---------- service worker ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
