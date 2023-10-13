import { MAINAPI_BASE_URL, IMAGE_BASE_URL } from "./const";

class Api {
  constructor({ baseUrl, baseImageUrl }) {
    this._url = baseUrl;
    this._imageUrl = baseImageUrl;
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
    }).then(res => this._getResponse(res))
  };

  async saveMovie(movie) {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${this._imageUrl}/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${this._imageUrl}/${movie.image.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    }).then(res => this._getResponse(res))
  };

  async deleteMovie(movieId) {
    const token = localStorage.getItem('token');

    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(res => this._getResponse(res))
  };
}

export const api = new Api({
  baseUrl: MAINAPI_BASE_URL,
  baseImageUrl: IMAGE_BASE_URL
});