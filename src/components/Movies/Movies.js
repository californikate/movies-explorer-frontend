// компонент страницы с поиском по фильмам

import React from "react";
import { useState, useEffect } from "react";
import './Movies.css';
import * as beatfilmMoviesApi from "../../utils/BeatfilmMoviesApi"

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    beatfilmMoviesApi.getMovies()
      .then((data) => setMoviesList(data))
      .catch((err) => console.log(err));
  }, []);

  return(
    <section className="movies">
      <Header loggedIn={ true } />
      <main>
        <SearchForm />
        <MoviesCardList moviesList={ moviesList }/>
      </main>
      <Footer />
    </section>
  );
}

export default Movies;