class Api {
  constructor({ baseUrl }) {
    this._url = baseUrl;
  };

  _getResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  async getUserInfo() {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(res => this._getResponse(res))
  };

  async setUserInfo(data) {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(res => this._getResponse(res))
  };

  async getSavedMovies() {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(res => this._getResponse(res))
  };

  async saveMovie(data) {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(res => this._getResponse(res))
  };

  async deleteMovie(id) {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
      credentials: 'include',
    }).then(res => this._getResponse(res))
  };
}

export const api = new Api({
  baseUrl: 'http://localhost:3001',
  //baseUrl: 'https://api.nekrasova.nomoreparties.co'
});