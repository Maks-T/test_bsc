const userData = localStorage.getItem('user');
const URI_DATA = './db/data.json';

if (!userData) {
  window.location.href = './login';
}

const user = JSON.parse(userData);

const userNameElem = document.querySelector('#userName');
const quesElem = document.querySelector('#ques');
const answersElem = document.querySelector('#answers');
let countQues = 0;
let curIndQues = 0;

userNameElem.innerHTML = user.name;

window.onload = async function () {
  const data = await loadData(URI_DATA);

  console.log(data);

  nextQues(data);
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
