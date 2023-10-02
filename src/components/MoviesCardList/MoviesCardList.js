// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import { useLocation } from 'react-router-dom';

function MoviesCardList({ moviesList, savedMovies, savedMoviesList, onSaveMovie, onDeleteMovie, isSaved }) {

  const { pathname } = useLocation();
  const searchedMoviesList = 
    pathname === "/saved-movies" ? (
      savedMoviesList
    ) : (
      moviesList
    );

  return (
    <section className="movies-cardlist">
      <div className="movies-cardlist__container">
        <ul className="movies-cardlist__table list">
          { searchedMoviesList.map((movie) => {
            return (
                <MoviesCard                  
                  movie={ movie } 
                  savedMovies={ savedMovies }
                  key={movie.id || movie._id}
                  onSaveMovie={ onSaveMovie }
                  onDeleteMovie={ onDeleteMovie }
                  isSaved={ isSaved }
                />
            )
          })}
        </ul>  
      </div>
    </section>
  );
}

export default MoviesCardList;