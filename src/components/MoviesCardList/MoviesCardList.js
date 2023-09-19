// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import React from "react";
import './MoviesCardList.css';

import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import MoreButton from "./MoreButton/MoreButton";

function MoviesCardList({ moviesList }) {
  const { pathname } = useLocation();

  return (
    <section className="movies-cardlist">
      <div className="movies-cardlist__container">
        <ul className="movies-cardlist__table list">
          { moviesList.map((movie) => {
            return (
              <li key={ movie.movieId }>
                <MoviesCard movie={ movie } />
              </li>
            )
          })}
        </ul>
        
        <div className="movies-cardlist__loading">
          { pathname === "/movies" ? <MoreButton /> : null }
          { false ? <Preloader /> : null }
        </div>
      </div>
    </section>
  );
}

export default MoviesCardList;