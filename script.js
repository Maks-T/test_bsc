const userData = localStorage.getItem('user');
const URI_DATA = './db/data.json';
const URI_SAVE_DATA = './api/data/save.php';
const URI_GET_QUESTIONS = './api/data/getQuestions.php';

let data = [];
let questions = [];
let verData = 0;

const maxQ = 10; //количество вопросов в билете

if (!userData) {
  window.location.href = './login';
}

const user = JSON.parse(userData);

const userNameElem = document.querySelector('#userName');
const quesElem = document.querySelector('#ques');
const answersElem = document.querySelector('#answers');
const btnNextElem = document.querySelector('#btnNext');
const exitElem = document.querySelector('#exit');

let countQues = 0;
let curIndQues = 0;

userNameElem.innerHTML = user.name;

window.onload = async function () {
  verData = +localStorage.getItem('verData');
  console.log(verData);

  const serverData = await getData({ verData, user });

  if (serverData.verData > verData) {
    verData = serverData.verData;
    questions = serverData.questions;

    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('verData', verData);
  } else {
    const questionsData = localStorage.getItem('questions');

    if (questionsData) {
      questions = JSON.parse(questionsData);
    } else {
      data = await loadData(URI_DATA);

      questions = prepareData(data).sort(() => (Math.random() > 0.5 ? 1 : -1));
      localStorage.setItem('questions', JSON.stringify(questions));
    }
  }

  exitElem.addEventListener('click', clickExit);
  answersElem.addEventListener('click', clickAnswer);
  btnNextElem.addEventListener('click', clickBtnNext);

  nextQues(questions);
};

const loadData = async (URI) => {
  const response = await fetch(URI, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  });

  return await response.json();
};

const nextQues = (data) => {
  if (curIndQues === maxQ) {
    questions.sort((a, b) => b.w - a.w).sort((a, b) => a.r - b.r);
    localStorage.setItem('questions', JSON.stringify(questions));
    verData += 1;
    localStorage.setItem('verData', verData);
    curIndQues = 0;

    saveData({ verData, questions, user });

    console.log(questions);
  }

  quesElem.innerHTML = data[curIndQues].q;

  const ansElem = data[curIndQues].ans
    .map((ans, i) => {
      if (i === 0) {
        return `<div class="answer" right>${ans}</div>`;
      } else {
        return `<div class="answer">${ans}</div>`;
      }
    })
    .sort(() => (Math.random() > 0.5 ? 1 : -1));
  answersElem.innerHTML = ansElem.join('');

  curIndQues += 1;
};

const clickAnswer = (e) => {
  const ansElem = e.target;

  if (ansElem.classList.contains('answer')) {
    if (ansElem.hasAttribute('right')) {
      clickRigthAnswer(ansElem);
    } else {
      clickWrongAnswer(ansElem);
    }
  }
};

const clickBtnNext = () => {
  nextQues(questions);
  hideBtnNext();
};

const clickRigthAnswer = (ansElem) => {
  console.log('right');

  ansElem.classList.add('success');

  questions[curIndQues - 1].r = questions[curIndQues - 1].r + 1;

  showBtnNext();
};

const clickWrongAnswer = (ansElem) => {
  ansElem.classList.add('mistake');
  answersElem.childNodes.forEach((child) => {
    if (child.hasAttribute('right')) {
      child.classList.add('success');
    }
  });

  console.log('mistake');

  questions[curIndQues - 1].w = questions[curIndQues - 1].w + 1;

  showBtnNext();
};

const showBtnNext = () => {
  btnNextElem.classList.remove('hide');
};

const hideBtnNext = () => {
  btnNextElem.classList.add('hide');
};

const prepareData = (data) => {
  return data.map((ques) => {
    return {
      ...ques,
      w: 0,
      r: 0,
    };
  });
};

selectQues = (questions) => {
  return [];
};

const saveData = async (data) => {
  const response = await fetch(URI_SAVE_DATA, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  return await response.json();
};

const getData = async (data) => {
  const response = await fetch(URI_GET_QUESTIONS, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });

  return await response.json();
};

const clickExit = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('verData');
  localStorage.removeItem('questions');
  window.location.href = './login';
};
