import { MAINAPI_BASE_URL } from "./const";

export const register = async (data) => {
  return fetch(`${MAINAPI_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const authorize = async (email, password) => {
  return fetch(`${MAINAPI_BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};

export const getContent = async (token) => {
  return fetch(`${MAINAPI_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`
    }
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};