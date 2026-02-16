const startBtn = document.getElementById("startBtn");
const letterChunks = Array.from(document.querySelectorAll(".pe-letter-chunk"));
const reasonCards = Array.from(document.querySelectorAll(".pe-reason-card"));
const timelineItems = Array.from(document.querySelectorAll(".pe-timeline-item"));
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const answerText = document.getElementById("answerText");
let noClickCount = 0;

const daysSpan = document.getElementById("peDays");
const hoursSpan = document.getElementById("peHours");
const minutesSpan = document.getElementById("peMinutes");
const secondsSpan = document.getElementById("peSeconds");
const timeNote = document.getElementById("peTimeNote");
const dateInput = document.getElementById("peDateInput");
const saveDateBtn = document.getElementById("peSaveDateBtn");
const yesHeartsLayer = document.getElementById("yesHearts");
const themeToggle = document.getElementById("themeToggle");

const STORAGE_KEY_START = "pe:relationship_start";
const STORAGE_KEY_THEME = "pe:theme";
let currentStartDate = null;
let currentTheme = "light";

function revealLetter() {
  letterChunks.forEach((chunk, index) => {
    setTimeout(() => {
      chunk.classList.add("pe-letter-chunk--visible");
    }, 550 * index);
  });
}

function revealReasons() {
  reasonCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("pe-reason-card--visible");
    }, 380 * index);
  });
}

function revealTimeline() {
  timelineItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("pe-timeline-item--visible");
    }, 420 * index);
  });
}

function smoothScrollTo(element) {
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateLoveTimer() {
  if (!currentStartDate) {
    daysSpan.textContent = "0";
    hoursSpan.textContent = "00";
    minutesSpan.textContent = "00";
    secondsSpan.textContent = "00";
    timeNote.textContent =
      "Elige la fecha en que empezó todo. Cada segundo con tu sonrisa vale la pena contarlo.";
    return;
  }

  const now = new Date();
  const diffMs = now.getTime() - currentStartDate.getTime();

  if (diffMs <= 0) {
    daysSpan.textContent = "0";
    hoursSpan.textContent = "00";
    minutesSpan.textContent = "00";
    secondsSpan.textContent = "00";
    timeNote.textContent =
      "Todavía no llega el gran día, pero ya estoy esperando esa sonrisa que me desordena todo.";
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = totalSeconds % 60;

  daysSpan.textContent = String(days);
  hoursSpan.textContent = String(hours).padStart(2, "0");
  minutesSpan.textContent = String(minutes).padStart(2, "0");
  secondsSpan.textContent = String(seconds).padStart(2, "0");

  if (days < 30) {
    timeNote.textContent =
      "Estamos en los primeros capítulos, y cada día que me regalas tu sonrisa quiero que esta historia sea larguísima.";
  } else if (days < 365) {
    timeNote.textContent =
      "Hemos juntado meses de tu sonrisa, discusiones tontas y abrazos que arreglan todo.";
  } else {
    const years = Math.floor(days / 365);
    const label = years === 1 ? "año" : "años";
    timeNote.textContent =
      `Llevamos más de ${years} ${label} y tu sonrisa sigue siendo mi lugar favorito.`;
  }
}

function restoreStartDate() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_START);
    if (stored) {
      dateInput.value = stored;
      currentStartDate = new Date(stored + "T00:00:00");
    }
  } catch {
    // ignorar si localStorage está bloqueado
  }

  updateLoveTimer();
}

saveDateBtn.addEventListener("click", () => {
  if (!dateInput.value) {
    dateInput.focus();
    return;
  }

  currentStartDate = new Date(dateInput.value + "T00:00:00");

  try {
    localStorage.setItem(STORAGE_KEY_START, dateInput.value);
  } catch {
    // ignorar errores de storage
  }

  updateLoveTimer();
});

restoreStartDate();
setInterval(updateLoveTimer, 1000);

function triggerYesHearts() {
  if (!yesHeartsLayer) return;

  yesHeartsLayer.innerHTML = "";
  const total = 24;

  for (let i = 0; i < total; i++) {
    const heart = document.createElement("span");
    heart.className = "pe-heart-float";
    const left = 10 + Math.random() * 80;
    const duration = 3 + Math.random() * 2;
    const delay = Math.random() * 0.6;
    const drift = (Math.random() - 0.5) * 60;

    heart.style.left = `${left}%`;
    heart.style.setProperty("--dur", `${duration}s`);
    heart.style.animationDelay = `${delay}s`;
    heart.style.setProperty("--drift", `${drift}px`);

    yesHeartsLayer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, (duration + delay + 0.5) * 1000);
  }
}

function applyTheme(theme) {
  currentTheme = theme === "dark" ? "dark" : "light";
  if (currentTheme === "dark") {
    document.body.classList.add("pe-dark");
  } else {
    document.body.classList.remove("pe-dark");
  }

  if (themeToggle) {
    const label = themeToggle.querySelector(".pe-theme-label");
    const icon = themeToggle.querySelector(".pe-theme-icon");
    if (label) {
      label.textContent = currentTheme === "dark" ? "Modo día" : "Modo noche";
    }
    if (icon) {
      icon.textContent = currentTheme === "dark" ? "☀" : "☾";
    }
  }

  try {
    localStorage.setItem(STORAGE_KEY_THEME, currentTheme);
  } catch {
    // ignorar errores de storage
  }
}

function restoreTheme() {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY_THEME);
  } catch {
    stored = null;
  }
  applyTheme(stored || "light");
}

restoreTheme();

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  startBtn.style.opacity = "0.7";

  revealLetter();

  const sectionReasons = document.getElementById("sectionReasons");
  const sectionTimeline = document.getElementById("sectionTimeline");

  setTimeout(() => {
    smoothScrollTo(sectionReasons);
    revealReasons();
  }, letterChunks.length * 550 + 800);

  setTimeout(() => {
    smoothScrollTo(sectionTimeline);
    revealTimeline();
  }, letterChunks.length * 550 + 800 + reasonCards.length * 380 + 800);
});

yesBtn.addEventListener("click", () => {
  answerText.textContent =
    "Sabía que ibas a decir que sí. Gracias por seguir eligiéndome; yo también te elijo hoy, mañana y en todos los planes locos que todavía no existen.";
  answerText.classList.remove("pe-answer-hidden");
  triggerYesHearts();
});

noBtn.addEventListener("click", () => {
  noClickCount += 1;

  const intensity = 30 + noClickCount * 5;
  // Siempre se mueve alejándose del botón verde (solo hacia la derecha),
  // con un pequeño saltico vertical para que se vea juguetón.
  const bounce = noClickCount % 2 === 0 ? -6 : 6;
  noBtn.style.transform = `translate(${intensity}px, ${bounce}px)`;

  if (noClickCount >= 5) {
    answerText.textContent =
      "No te cansas de presionarlo, eres bien terca JAJAJA. " +
      "Sabía que ibas a decir que sí. Gracias por seguir eligiéndome; yo también te elijo hoy, mañana y en todos los planes locos que todavía no existen.";
    answerText.classList.remove("pe-answer-hidden");
    noBtn.style.opacity = "0";
    noBtn.style.pointerEvents = "none";
  } else {
    answerText.textContent =
      "Acepto que lo pienses… pero este botón se va a seguir escapando hasta que tu respuesta sea un sí.";
    answerText.classList.remove("pe-answer-hidden");
  }
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

const ojitosOpenBtn = document.getElementById("ojitosOpenBtn");
const ojitosOverlay = document.getElementById("ojitosOverlay");
const ojitosBackdrop = document.getElementById("ojitosBackdrop");
const ojitosCloseBtn = document.getElementById("ojitosCloseBtn");

function openOjitosModal() {
  if (!ojitosOverlay) return;
  ojitosOverlay.classList.add("is-open");
  ojitosOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeOjitosModal() {
  if (!ojitosOverlay) return;
  ojitosOverlay.classList.remove("is-open");
  ojitosOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (ojitosOpenBtn) {
  ojitosOpenBtn.addEventListener("click", openOjitosModal);
}
if (ojitosBackdrop) {
  ojitosBackdrop.addEventListener("click", closeOjitosModal);
}
if (ojitosCloseBtn) {
  ojitosCloseBtn.addEventListener("click", closeOjitosModal);
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && ojitosOverlay && ojitosOverlay.classList.contains("is-open")) {
    closeOjitosModal();
  }
});
