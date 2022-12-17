const contactList = document.getElementById('contactList');
contactList.addEventListener('click', handleClick);

function handleClick(e) {

  const target = e.target;
  let id = target.id;

  if (target.tagName === 'BUTTON' && target.innerText === 'Delete') {
    id = target.getAttribute('data-id');
    executeRequest(`http://localhost:8080/contacts/${id}`, null, 'DELETE')
      .then(res => {
        if (res.success) {
          location.reload();
        }
      })
      .catch(err => console.log(err))
  } else if (target.tagName === 'BUTTON') {

    const parent = target.parentElement;

    const body = {
      id: target.getAttribute('data-id'),
      name: parent.querySelector('input').value
    }
    executeRequest('http://localhost:8080/contacts/edit', body, 'POST')
      .then(res => console.log(res.message))
      .catch(err => console.log(err))
  } else {
    target.innerHTML = `
      <input value="${target.innerText}" />
      <button data-id="${id}">Update</button>
      <button data-id="${id}">Delete</button>
    `;
  }

}