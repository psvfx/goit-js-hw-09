'use strict';

// Імпорт бібліотеки, що дозволяє користувачеві кросбраузерно вибрати кінцеву дату і час в одному елементі інтерфейсу:
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів:
import 'flatpickr/dist/flatpickr.min.css';
// Імпорт бібліотеки для неблокуючих сповіщень на стороні клієнта:
import Notiflix from 'notiflix';

// Налаштування для бібліотеки flatpickr, що дозволяє користувачеві вибрати дату та час:
const options = {
  enableTime: true, //дозволяє користувачеві вибирати час у вибірнику
  time_24hr: true, //встановлює 24-годинний формат часу
  defaultDate: new Date(), //встановлює поточну дату та час як значення за замовчуванням у вибірник
  minuteIncrement: 1, // встановлює крок зміни хвилин у вибірнику на 1

  // Логіка виконання при закритті вибору дати:
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    // Вивід повідомлення при невідповідності умови (дата не змінена):
    if (selectedDate < currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }

    const startButtonEl = document.querySelector('[data-start]');
    startButtonEl.disabled = false;

    const inputEl = document.querySelector('#datetime-picker');
    inputEl.disabled = true; // Задісаблення вибіру дати після закриття календаря
  },
};

// Виклик функції бібліотеки з ідентифікацією з DOM елементом (поява календарного вибірника на інпуті):
flatpickr('#datetime-picker', options);

// Отримання посилань на елементи DOM:
const inputEl = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval = null;

// Додавання обробника події для кнопки "Start", який запускає таймер зворотного відліку:
startButton.addEventListener('click', () => {
  const selectedDate = new Date(inputEl.value);
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  startButton.disabled = true;

  // Таймер зворотного відліку, який оновлює значення днів, годин, хвилин і секунд на елементах DOM кожну секунду:
  countdownInterval = setInterval(() => {
    const remainingTime = selectedDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);

    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      startButton.disabled = false;
    }
  }, 1000);
});

// Функція, яка приймає кількість мілісекунд і повертає об'єкт з розрахунками днів, годин, хвилин і секунд:
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  let remainingTime = ms;

  if (remainingTime < 0) {
    remainingTime = 0;
  }

  // const days = Math.floor(ms / day);
  // const hours = Math.floor((ms % day) / hour);
  // const minutes = Math.floor(((ms % day) % hour) / minute);
  // const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  const days = Math.floor(remainingTime / day);
  const hours = Math.floor((remainingTime % day) / hour);
  const minutes = Math.floor(((remainingTime % day) % hour) / minute);
  const seconds = Math.floor(
    (((remainingTime % day) % hour) % minute) / second
  );

  return { days, hours, minutes, seconds };
}

// Функція, яка приймає число і додає ведучий нуль, якщо число менше 10:
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
