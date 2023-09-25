// компонент одной карточки фильма
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './MoviesCard.css';

import { api } from '../../utils/MainApi';

function MoviesCard({ movie }) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image, 
    trailerLink,
    movieId,
    nameRU,
    nameEN, 
    id,  
  } = movie;

  const { pathname } = useLocation();

  const [isSaved, setIsSaved] = useState(movie.isSave);
  const [savedMovies, setSavedMovies] = useState([]);

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  
  // const isSaved = pathname !== "/saved-movies" && savedMovies.some((item) => item.movieId === movie.id);

  const handleSaveClick = (movie) => {
    const isSave = savedMovies.some((item) => item.movieId === movie.id);
    if (!isSave) {
      api.saveMovie({
        country,
        director,
        duration,
        year,
        description,
        image: `https://api.nomoreparties.co${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        movieId: id,
      })
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie.data]);
      })
      .catch((err) => console.log(err))
    } else {
      api.deleteMovie(pathname === '/saved-movies' ? movieId : id)
        .then(() => {
          setSavedMovies(false);
        })
        .catch((err) => console.log(err))
    }
  }

  const handleDeleteClick = () => {
    api.deleteMovie(movie._id)
        .then(() => {
          setSavedMovies((savedMovies) => 
            savedMovies.filter((item) => item._id !== movie._id)
          )
        })
        .catch((err) => console.log(err))
  }

  return (
    <li key={movie.id} className="movies-card">
      { pathname === "/saved-movies" ? (
        <button onClick={ handleDeleteClick } type="button" className="button movies-card__button movies-card__button_type_delete"/>
      ) : isSaved ? (
        <button onClick={ handleSaveClick } type="button" className="button movies-card__button movies-card__button_type_saved" />
      ) : (
        <button onClick={ handleSaveClick } type="button" className="button movies-card__button movies-card__button_type_save">Сохранить</button>
      )}
      
      <Link to={ trailerLink } target="_blank" className="movies-card__link link">
        <img className="movies-card__img" src={ image.url ? `https://api.nomoreparties.co${image.url}` : image} alt={ nameRU } />
        <div className="movies-card__info">
          <h2 className="movies-card__title">{ nameRU }</h2>
          <span className="movies-card__duration">{ !!hours && `${hours}ч` } {`${minutes}м` }</span>
        </div>
      </Link>
    </li>
  );
}

export default MoviesCard;