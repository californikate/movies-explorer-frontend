// компонент одной карточки фильма
import React from 'react';
import './MoviesCard.css';

import saveButton from '../../images/save-button.svg';
import deleteButton from '../../images/delete-button.svg';

import { useLocation } from "react-router-dom";

function MoviesCard({ movie }) {
  const { duration, link, name, isSave } = movie;
  const { pathname } = useLocation();

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const movieCardButton = 
    pathname === "/saved-movies" ? (
      <button type="button" className="movies-card__button movies-card__button_type_delete" />
    ) : isSave ? (
      <img src={ saveButton } alt="Сохранено" className="movies-card__button" />
    ) : (
      <button type="button" className="movies-card__button movies-card__button_type_save">Сохранить</button>
    );

  return (
    <article className="movies-card">
      { movieCardButton }
      <img className="movies-card__img" src={ link } alt={ name } />
      <div className="movies-card__info">
        <h2 className="movies-card__title">{ name }</h2>
        <span className="movies-card__duration">{ !!hours && `${hours}ч` } {`${minutes}м` }</span>
      </div>
    </article>
  );
}

export default MoviesCard;