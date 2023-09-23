// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import React from "react";
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesList, savedMoviesPage, savedMovies, savedMoviesList }) {
  const searchedMoviesList = savedMoviesPage ? savedMoviesList : moviesList;

  return (
    <section className="movies-cardlist">
      <div className="movies-cardlist__container">
        <ul className="movies-cardlist__table list">
          { searchedMoviesList.map((movie) => {
            return (
              <li key={ movie.id }>
                <MoviesCard movie={ movie } savedMoviesPage={ savedMoviesPage } savedMovies={ savedMovies }/>
              </li>
            )
          })}
        </ul>  
      </div>
    </section>
  );
}

export default MoviesCardList;