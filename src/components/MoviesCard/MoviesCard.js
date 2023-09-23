// компонент одной карточки фильма
import React from 'react';
import { Link, useLocation } from "react-router-dom";

import './MoviesCard.css';
import savedIcon from '../../images/save-button.svg';

function MoviesCard({ movie, onMovieDelete, onMovieSave }) {
  const { duration, image, nameRU, isSave,trailerLink } = movie;
  const { pathname } = useLocation();

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const movieCardButton = 
    pathname === "/saved-movies" ? (
      <button onclick={ handleDeleteClick } type="button" className="movies-card__button movies-card__button_type_delete button" />
    ) : isSave ? (
      <img src={ savedIcon } alt="Сохранено" className="movies-card__button" />
    ) : (
      <button onClick={ handleSaveClick } type="button" className="movies-card__button movies-card__button_type_save button">Сохранить</button>
    );

  function handleDeleteClick() {
    onMovieDelete(movie);
  }

  function handleSaveClick() {
    onMovieSave(movie);
  }

  return (
    <article className="movies-card">
      { movieCardButton }
      <Link to={ trailerLink } target="_blank" className="movies-card__link link">
        <img className="movies-card__img" src={ image.url ? `https://api.nomoreparties.co${image.url}` : image} alt={ nameRU } />
        <div className="movies-card__info">
          <h2 className="movies-card__title">{ nameRU }</h2>
          <span className="movies-card__duration">{ !!hours && `${hours}ч` } {`${minutes}м` }</span>
        </div>
      </Link>
    </article>
  );
}

export default MoviesCard;