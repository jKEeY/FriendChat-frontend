export const api = (url, data) => {
  const token = localStorage.getItem('token');
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      ...data,
    }),
  })
    .then(responce => responce.json())
    .then(answer => Promise.resolve(answer));
}

export default api;
