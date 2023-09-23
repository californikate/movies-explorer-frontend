// компонент страницы с сохранёнными карточками фильмов

import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import { api } from '../../utils/MainApi';

import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    api.getSavedMovies()
      .then((data) => setMoviesList(data))
      .catch((err) => console.log(err));
  }, []);

  return(
    <section className="saved-movies">
      <main>
        <SearchForm />
        <MoviesCardList moviesList={ moviesList }/>
      </main>
      <Footer />
    </section>
  );
}

export default SavedMovies;