//export const EMAIL_REGEX = /^\S+@\S+\.\S+$/; //проверка валидности email
export const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g; //проверка валидности email
export const NAME_REGEX = /^[\p{L}\s-]+$/u; //поле name содержит только латиницу, кириллицу, пробел или дефис

export const MAINAPI_BASE_URL = 'https://api.nekrasova.nomoreparties.co';
export const MOVIES_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';