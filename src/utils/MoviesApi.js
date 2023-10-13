import { MOVIES_BASE_URL } from "./const";

const getResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getMovies = async () => {
  return fetch(MOVIES_BASE_URL)
    .then((res) => getResponse(res))
    .then((movies) => {
      return movies;
    });
};