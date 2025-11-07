const tabs = document.querySelectorAll('.tab');
const screens = document.querySelectorAll('.screen');
const ctaNav = document.querySelectorAll('[data-nav]');

function showScreen(id){
  screens.forEach(s => s.classList.remove('screen--active'));
  document.getElementById(id).classList.add('screen--active');

  tabs.forEach(t => t.classList.toggle('is-active', t.dataset.target === id));
  document.getElementById('app').setAttribute('data-route', id);
}

// нижнее меню
tabs.forEach(t => t.addEventListener('click', () => showScreen(t.dataset.target)));

// CTA-кнопки на Главной
ctaNav.forEach(b => b.addEventListener('click', () => showScreen(b.dataset.nav)));

// стартовый экран
showScreen('home');

const bubble = document.querySelector('.assistant-bubble');
const chat = document.getElementById('assistantChat');

bubble.addEventListener('click', () => {
  chat.style.display = chat.style.display === 'none' ? 'block' : 'none';
});

function nextStep(step) {
  chat.innerHTML = ''; // очищаем старое
  if (step === 1) {
    chat.innerHTML = `
      <div class="chat-bubble bot">Отлично 💪 Введи свой средний месячный оборот:</div>
      <input type="text" class="chat-input" placeholder="Например, 500 000 ₽">
    `;
  } else {
    chat.innerHTML = `<div class="chat-bubble bot">Хорошо 😊 Тогда просто посмотри советы ниже 👇</div>`;
  }
}
function openTip(id) {
  const tips = {
    tip1: {
      title: "Почему прибыль не совпадает с деньгами?",
      text: `
      💡 Прибыль — это расчёт, а деньги — факт.<br><br>
      🔹 Проверь, когда приходят оплаты и когда уходят авансы.<br>
      🔹 Отслеживай движение по расчётному счёту.<br>
      🔹 Раздели “кассовый поток” и “учётную прибыль” — это ключ.<br><br>
      `,
      link: "https://t.me/evgeniya_fin/1"
    },
    tip2: {
      title: "Как считать прибыль по брендам",
      text: `
      💡 Делай аналитику по категориям, не только по магазинам.<br><br>
      🔹 Составь таблицу по брендам и выручке.<br>
      🔹 Добавь себестоимость и комиссии.<br>
      🔹 Так ты увидишь, какие позиции реально тянут прибыль.<br><br>
      `,
      link: "https://t.me/evgeniya_fin/2"
    },
    tip3: {
      title: "Куда уходят деньги?",
      text: `
      💡 Основные “пожиратели” прибыли:<br><br>
      🔹 Скидки и акции без расчёта.<br>
      🔹 Логистика и возвраты.<br>
      🔹 Ошибки в учёте себестоимости.<br><br>
      Проверь эти пункты — часто проблема именно там.
      `,
      link: "https://t.me/evgeniya_fin/3"
    },
    tip4: {
      title: "Как планировать прибыль на месяц",
      text: `
      💡 Прогнозируй прибыль как проект:<br><br>
      🔹 Запланируй доходы и расходы по неделям.<br>
      🔹 Задай цель по чистой прибыли.<br>
      🔹 Сверяй факт каждую пятницу.<br><br>
      Это даёт уверенность и снижает тревожность у предпринимателя.
      `,
      link: "https://t.me/evgeniya_fin/4"
    },
  };

  const tip = tips[id];
  if (!tip) return;

  const modal = document.createElement("div");
  modal.className = "tip-modal";
  modal.innerHTML = `
    <div class="tip-modal-content">
      <span class="tip-close" onclick="this.closest('.tip-modal').remove()">✕</span>
      <h3>${tip.title}</h3>
      <p>${tip.text}</p>
      <button class="btn-primary" onclick="window.open('${tip.link}', '_blank')">Открыть разбор в Telegram →</button>
    </div>
  `;
  document.body.appendChild(modal);
}
