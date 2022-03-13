// базовый URL для регистрации/авторизации
export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then((res) => {
    if (res.status === 201) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}




