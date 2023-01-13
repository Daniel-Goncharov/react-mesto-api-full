class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  // метод выдающий ошибку если ответ от сервера пришел с ошибкой
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Упс, ошибка ${res.status}, что-то пошло не так.`);
  }

  // метод запрашивающий у сервера данные профиля пользователя
  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // метод отправляющий на сервер новые данные профиля пользователя
  setUserInfoApi(userData) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(this._checkResponse);
  }

  // метод отправляющий на сервер новый аватар профиля пользователя
  changeAvatar({ avatar }) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  // метод запрашивающий у сервера карточки для страницы
  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // метод отправляющий данные карточки от клиента на сервер
  addCardServer(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  // метод удаляющий карточку с сервера
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // метод отправляющий на сервер информацио о постановке или снялии лайка
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

// создаем класс апи для работы с данными от сервера
export default new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-51/',
  headers: {
    authorization: 'bfa40ffc-a9e7-4ab6-8334-2b3f41f7694b',
    'content-Type': 'application/json',
  },
});