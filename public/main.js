async function executeRequest(url, body = null, type) {

  const response = await fetch(url, {
    method: type,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body, null, 4) : ''
  });
  return response.json();
}