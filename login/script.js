const form = document.querySelector('#form');
const URI = './../api/login/index.php';

form.addEventListener('submit', submitHandler);

async function submitHandler(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const result = await sendFormData(Object.fromEntries(formData));

  if (result.status === 'success') {
    localStorage.setItem('user', JSON.stringify(result.user));

    window.location.href = './../';
  }

  console.log(result);
}

const sendFormData = async (formData) => {
  const response = await fetch(URI, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(formData),
  });

  return await response.json();
};
