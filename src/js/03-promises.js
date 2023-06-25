'use strict';
// Підключення бібліотеки для неблокуючих сповіщень на стороні клієнта:
import Notiflix from 'notiflix';

//Функція повернення нового промісу випадковим чином із затримкою:
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });
}

// Отримання посилання до форми:
const formEl = document.querySelector('.form');

// Прослуховування події відправки форми та виклику функції-обробника події, яка перевіряє введені дані форми:
formEl.addEventListener('submit', function (event) {
  // Скидання дефолтної поведінки
  event.preventDefault();

  // Зчитування значень полів форми:
  const delayInput = formEl.elements.delay;
  const stepInput = formEl.elements.step;
  const amountInput = formEl.elements.amount;

  // Перетворення на числа значень полів форми:
  const firstDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  // // Цикл створення зазначеної кількості промісів з відповідними затримками та виводами повідомлень у консоль виконання методів then або catch:
  // for (let i = 0; i < amount; i += 1) {
  //   createPromise(i, firstDelay + step * i)
  //     .then(({ position, delay }) => {
  //       console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  //     })
  //     .catch(({ position, delay }) => {
  //       console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  //     });
  // }

  // Цикл створення зазначеної кількості промісів з відповідними затримками та виводами повідомлень користувачеві, використовуючи бібліотеку notiflix:
  for (let i = 0; i < amount; i += 1) {
    createPromise(i, firstDelay + step * i)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }

  // Скидання в формі введених даних:
  formEl.reset();
});
