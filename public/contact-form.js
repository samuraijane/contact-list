function formatFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key)
  }

  return data;
}

const handleSubmit = e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const body = formatFormData(data);
  executeRequest('http://localhost:8080/contacts/add', body, 'POST')
    .then(response => console.log(response));
}

const form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);