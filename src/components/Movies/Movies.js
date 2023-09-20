// компонент страницы с поиском по фильмам

import React from "react";
import { useState, useEffect } from "react";
import './Movies.css';
import * as moviesApi from "../../utils/MoviesApi"

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  // Блок результатов появляется только после обработки запроса. 
  // Если пользователь ещё ничего не искал, блока с карточками на странице нет. 
  // Как только запрос сделан, данные передаются в стейт-переменную и блок появляется.

  const [moviesList, setMoviesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('query') || '');
  const [checkedShorts, setCheckedShorts] = useState(false);

  const handleSearch = (evt) => {
    setSearchQuery(evt.target.value);
    localStorage.setItem('query', evt.target.value);
  }

  const handleCheckShorts = () => {
    if (checkedShorts === false) {
      setCheckedShorts(true);
    } else {
      setCheckedShorts(false);
    }
  }

  useEffect(() => {
    moviesApi.getMovies()
      .then((data) => setMoviesList(data))
      .catch((err) => console.log(err));
  }, []);

  return(
    <section className="movies">
      <Header loggedIn={ true } />
      <main>
        <SearchForm 
          onSearch={ handleSearch }
          searchQuery={ searchQuery }
          onCheck={ handleCheckShorts }
          checkedShorts={ checkedShorts }
        />
        <MoviesCardList moviesList={ moviesList }/>
      </main>
      <Footer />
    </section>
  );
}

export default Movies;