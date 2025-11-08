// 🌿 Переключение секций
const sections = document.querySelectorAll("section");
const navBtns = document.querySelectorAll(".nav-btn");
const gotoBtns = document.querySelectorAll(".js-goto");

function showSection(id) {
  sections.forEach(sec => sec.classList.toggle("active", sec.id === id));
  navBtns.forEach(btn => btn.classList.toggle("active", btn.dataset.target === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navBtns.forEach(btn => btn.addEventListener("click", () => showSection(btn.dataset.target)));
gotoBtns.forEach(btn => btn.addEventListener("click", () => showSection(btn.dataset.target)));
showSection("home");

// 🌗 Тема
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

function setTheme(mode) {
  if (mode === "dark") {
    body.classList.add("theme-dark");
    body.classList.remove("theme-light");
    themeToggle.textContent = "☀️ Светлая";
  } else {
    body.classList.add("theme-light");
    body.classList.remove("theme-dark");
    themeToggle.textContent = "🌙 Тёмная";
  }
  localStorage.setItem("theme", mode);
}

themeToggle.addEventListener("click", () => {
  const dark = body.classList.contains("theme-dark");
  setTheme(dark ? "light" : "dark");
});

setTheme(localStorage.getItem("theme") || "light");

// 🌿 Popup тарифов
const planPopup = document.getElementById("popup-plan");
const planTitle = document.getElementById("popup-title");
const planText = document.getElementById("popup-text");
const planClose = document.querySelector(".popup-close");

const plans = {
  start: { title: "Тариф «Старт»", text: "Поможет начать с аудита и базовых рекомендаций по прибыли." },
  growth: { title: "Тариф «Рост»", text: "Регулярный анализ отчётности и планирование роста." },
  control: { title: "Тариф «Контроль»", text: "Полное ведение учёта и контроль ключевых метрик." },
  vip: { title: "Тариф «ВИП»", text: "Индивидуальные стратегические сессии и личное сопровождение." }
};

document.querySelectorAll(".btn-details").forEach(btn => {
  btn.addEventListener("click", () => {
    const plan = plans[btn.dataset.plan];
    if (plan) {
      planTitle.textContent = plan.title;
      planText.textContent = plan.text;
      planPopup.classList.add("active");
    }
  });
});

if (planClose) planClose.addEventListener("click", () => planPopup.classList.remove("active"));
window.addEventListener("click", e => {
  if (e.target === planPopup) planPopup.classList.remove("active");
});

// 🌿 Popup советов
const tips = document.querySelectorAll(".tip-card");
const popup = document.getElementById("tip-popup");
const popupTitle2 = document.getElementById("popup-title2");
const popupText2 = document.getElementById("popup-text2");
const popupClose2 = document.querySelector(".popup-close2");

if (tips.length && popup) {
  tips.forEach((tip) => {
    tip.addEventListener("click", () => {
      const title = tip.querySelector("h3")?.textContent || "Совет";
      const text = tip.querySelector("p")?.textContent || "";
      popupTitle2.textContent = title;
      popupText2.textContent = text;
      popup.classList.add("active");
    });
  });

  popupClose2.addEventListener("click", () => popup.classList.remove("active"));
  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.classList.remove("active");
  });
}

// 🌿 Диагностика — показать результат
const showResultBtn = document.getElementById("show-result");
if (showResultBtn) {
  showResultBtn.addEventListener("click", () => {
    alert("💡 Твоя точка роста — начать системный учёт прибыли. После настройки финансовой отчётности ты увидишь, где уходят деньги!");
  });
}

// 🌿 Кнопка “Хочешь, покажу…” → Контакты
const contactLink = document.querySelector(".cta-link");
if (contactLink) {
  contactLink.addEventListener("click", () => showSection("contacts"));
}
// 🌿 Telegram SDK (безопасная инициализация)
let tg = null;

if (window.Telegram && window.Telegram.WebApp) {
  tg = window.Telegram.WebApp;
  tg.expand?.();
  tg.enableClosingConfirmation?.();
} else {
  console.log("🔹 Telegram WebApp SDK не найден — запущено в браузере.");
}

function sendDataToBot(data) {
  if (tg) {
    tg.sendData(JSON.stringify(data));
  } else {
    console.log("Отправка в бота (локально):", data);
  }
}
