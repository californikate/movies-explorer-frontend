export const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g; //проверка валидности email
export const NAME_REGEX = /^[\p{L}\s-]+$/u; //поле name содержит только латиницу, кириллицу, пробел или дефис

export const MAINAPI_BASE_URL = 'https://api.nekrasova.nomoreparties.co';
export const MOVIES_BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';
export const IMAGE_BASE_URL = 'https://api.nomoreparties.co';

export const SHORTS_LENGTH = 40;

export const SCREEN_WIDTH = {
  DESKTOP: 1280,
  TABLET: 768,
  MOBILE: 380,
}

export const DISPLAYED_CARDS = {
  DESKTOP: 12,
  TABLET: 8,
  MOBILE: 5,
}

export const CARDS_NUMBER = {
  DESKTOP: 3,
  TABLET: 2,
  MOBILE: 1,
}