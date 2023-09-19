// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import React from "react";
import './MoviesCardList.css';

import { useLocation } from "react-router-dom";
import Movies from "../../utils/const";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import MoreButton from "./MoreButton/MoreButton";

function MoviesCardList() {
  const { pathname } = useLocation();

  return (
    <section className="movies-cardlist">
      <div className="movies-cardlist__container">
        <ul className="movies-cardlist__table list">
          {Movies.map((card) => {
            return (
              <li key={ card.movieId }>
                <MoviesCard movie={ card } />
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