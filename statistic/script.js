const userData = localStorage.getItem('user');

if (!userData) {
  window.location.href = '../login';
}

let questions = [];
let nonAnsweredQues = 0;
let mistakeQues = 0;
let rightQues = 0;

const user = JSON.parse(userData);

const userNameElem = document.querySelector('#userName');
const statElem = document.querySelector('#stat');
const exitElem = document.querySelector('#exit');

userNameElem.innerHTML = user.name;

window.onload = async function () {
  exitElem.addEventListener('click', clickExit);

  const questionsData = localStorage.getItem('questions');

  if (questionsData) {
    questions = JSON.parse(questionsData);

    questions.forEach((ques) => {
      if (ques.w == 0 && ques.r == 0) {
        nonAnsweredQues += 1;
      }

      mistakeQues += ques.w;
      rightQues += ques.r;
    });

    statElem.innerHTML = `
      Всего вопросов: ${questions.length} <br>
      Не показано вопросов: ${nonAnsweredQues} <br>
      Отвечено неверно: ${mistakeQues} <br>
      Отвечено верно: ${rightQues} <br>
    `;
  }
};

const clickExit = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('verData');
  localStorage.removeItem('questions');
  window.location.href = '../login';
};
