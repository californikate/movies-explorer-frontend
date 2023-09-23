export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

const getResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getMovies = async () => {
  return fetch(BASE_URL)
    .then((res) => getResponse(res))
    .then((movies) => {
      return movies;
    });
};