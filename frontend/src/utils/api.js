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
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {...this._headers, authorization: `Bearer ${jwt}`},
    }).then(this._checkResponse);
  }

  // метод отправляющий на сервер новые данные профиля пользователя
  setUserInfoApi(userData) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {...this._headers, authorization: `Bearer ${jwt}`},
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(this._checkResponse);
  }

  // метод отправляющий на сервер новый аватар профиля пользователя
  changeAvatar({ avatar }) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {...this._headers, authorization: `Bearer ${jwt}`},
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  // метод запрашивающий у сервера карточки для страницы
  getInitialCards() {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {...this._headers, authorization: `Bearer ${jwt}`},
    }).then(this._checkResponse);
  }

  // метод отправляющий данные карточки от клиента на сервер
  addCardServer(data) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {...this._headers, authorization: `Bearer ${jwt}`},
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  // метод удаляющий карточку с сервера
  deleteCard(cardId) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {...this._headers, authorization: `Bearer ${jwt}`},
    }).then(this._checkResponse);
  }

  // метод отправляющий на сервер информацио о постановке или снялии лайка
  changeLikeCardStatus(cardId, isLiked) {
    const jwt = localStorage.getItem("jwt");
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: `${isLiked ? 'PUT' : 'DELETE'}`,
      headers: {...this._headers, authorization: `Bearer ${jwt}`},
    }).then(this._checkResponse);
  }
}

// создаем класс апи для работы с данными от сервера
export default new Api({
  baseUrl: 'https://api.daniilg.nomoredomains.rocks',
  headers: {
    'content-Type': 'application/json',
  },
});
