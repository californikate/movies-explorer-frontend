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
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(res => this._getResponse(res))
  };

  async setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    }).then(res => this._getResponse(res))
  };

  async getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(res => this._getResponse(res))
  };

  async addNewMovie(data) {    
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    }).then(res => this._getResponse(res))
  };

  async deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(res => this._getResponse(res))
  };
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;