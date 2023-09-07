// компонент страницы с сохранёнными карточками фильмов

import React from "react";
import './SavedMovies.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return(
    <section className="saved-movies">
      <Header loggedIn={ true } />

      <SearchForm />
      <MoviesCardList />
      
      <Footer />
    </section>
  );
}

export default SavedMovies;