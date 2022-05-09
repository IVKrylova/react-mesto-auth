import { options } from './constants';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.contentType = options.headers['Content-Type'];
  }

  // метод проверки ошибок
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // метод получения информации о пользователе
  getUserInfo(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
  }

  // метод получения массива карточек
  getInitialCards(token) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
  }

  // метод отправки на сервер карточки с поставленным/удаленным лайком
  changeLikeCardStatus(idCard, isLiked, token) {
    if (isLiked) {
      return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': this.contentType
        }
      })
      .then(this._checkResponse)
    } else {
      return fetch(`${this.baseUrl}/cards/${idCard}/likes`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': this.contentType
        }
      })
      .then(this._checkResponse)
    }
  }

  // метод для редактирования информации о пользователе
  editProfileInfo(data, token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: data.name,
        about: data.description
      })
    })
    .then(res => {
      return res;
    })
    .then(this._checkResponse)
  }

  // метод отправки новой карточки на сервер
  sendNewCard(data, token) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => {
      return res;
    })
    .then(this._checkResponse)
  }

  // метод удаления карточки
  deleteCard(idCard, token) {
    return fetch(`${this.baseUrl}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': this.contentType
      }
    })
    .then(this._checkResponse)
  }

  // метод редактирования аватара
  editAvatar(newAvatarUrl, token) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': this.contentType
      },
      body: JSON.stringify({
        avatar: newAvatarUrl
      })
    })
    .then(res => {
      return res;
    })
    .then(this._checkResponse)
  }
}

// создание экземпляра класса Api
export const api = new Api(options);
