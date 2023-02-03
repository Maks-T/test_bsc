const userData = localStorage.getItem('user');

if (!userData) {
  window.location.href = './login';
}

const user = JSON.parse(userData);

const userNameElem = document.querySelector('#userName');

userNameElem.innerHTML = user.name;
