'use strict';

// Функція генерування випадкового кольору у форматі шіснадцаткового числа:
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// Отримання посилань на кнопки Start та Stop:
const startButtonEl = document.querySelector('[data-start]');
const stopButtonEl = document.querySelector('[data-stop]');

// Змінна зберігання ідентифікатора інтервалу, що дозволить зупинити зміну кольору фону:
let intervalId = null;

// Прослуховування події Click кнопки Start, з послідуючим встановлння неактивної кнопки Start та активної кнопки Stop:
startButtonEl.addEventListener('click', () => {
  startButtonEl.disabled = true;
  stopButtonEl.disabled = false;

  // Зміна кольору фону раз на секунду через інлайн стиль:
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});
// Прослуховування події Click кнопки Stop,
stopButtonEl.addEventListener('click', () => {
  startButtonEl.disabled = false;
  stopButtonEl.disabled = true;

  // Зупинка виконання setInterval:
  clearInterval(intervalId);
});
