export const BASE_URL = "https://api.nomoreparties.co/beatfilm-movies";

const getResponse = (res) => {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export const getMovies = async () => {
  // const res = await fetch(BASE_URL);
  // return getResponse(res);
  return fetch(BASE_URL)
    .then((res) => getResponse(res))
};