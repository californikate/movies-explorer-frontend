// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством

import React from "react";
import './MoviesCardList.css';

import { useLocation } from "react-router-dom";
import  Movies from "../../utils/const";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList() {
  const { pathname } = useLocation();

  return (
    <section className="movies-cardlist">
      <div className="movies-cardlist__container">
        <ul className="movies-cardlist__table">
          {Movies.map((card) => {
            return (
              <li key={ card._id }>
                <MoviesCard movie={ card } />
              </li>
            )
          })}
        </ul>
        
        <button type="button" className="movies-cardlist__button button">
            Ещё
        </button>
        <Preloader />
      </div>
    </section>
  );
}

export default MoviesCardList;