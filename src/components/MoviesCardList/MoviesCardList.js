// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import { useLocation } from 'react-router-dom';

function MoviesCardList({ onMovieSave, onMovieDelete, moviesList, savedMovies, savedMoviesList }) {

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
              <li key={ movie.id ?? movie._id }>
                <MoviesCard                  
                  movie={ movie } 
                  savedMovies={ savedMovies }
                  onMovieSave={ onMovieSave }
                  onMovieDelete={ onMovieDelete }
                />
              </li>
            )
          })}
        </ul>  
      </div>
    </section>
  );
}

export default MoviesCardList;