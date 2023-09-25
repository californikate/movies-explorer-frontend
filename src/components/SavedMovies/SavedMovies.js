// компонент страницы с сохранёнными карточками фильмов

import React, { useState, useEffect } from 'react';
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

function SavedMovies({ movies, onMovieDelete }) {
  const [query, setQuery] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [checkedShorts, setCheckedShorts] = useState(false);


  const [isLoading, setIsLoading] = useState(false);

  const handleFilter = (query, checkedShorts) => {
    setIsLoading(true);
    let filteredMovies = movies;

    if (checkedShorts) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40); //короткометражки до 40мин включительно
    }

    const filterRes = filteredMovies.filter((movie) => {
      const movieName = movie.nameRU || movie.nameEN;
      return (
        movieName.toLowerCase().includes(query.toLowerCase())
      );
    });

    setSearchRes(filterRes);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }

  const handleSearch = (newQuery, newCheckedShorts) => {
    setIsLoading(true);
    setCheckedShorts(newCheckedShorts);

    const filteredMovies = movies.filter((movie) => {
      const includesQuery =
        movie.nameRU.toLowerCase().includes(newQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(newQuery.toLowerCase());
      if (newCheckedShorts) {
        return includesQuery && movie.duration <= 40;
      } else {
        return includesQuery;
      }
    });

    setSearchRes(filteredMovies);


    setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return;
  };

  useEffect(() => {
    handleFilter(query, checkedShorts);
  }, [movies, query, checkedShorts]);

  return(
    <section className="saved-movies">
      <Header loggedIn={ true } />
      <main>
        <SearchForm 
          query={ query }
          setQuery={ setQuery }
          checkedShorts={ checkedShorts }
          setCheckedShorts={ setCheckedShorts }
          onSearch ={ handleSearch }
          onFilter={ handleFilter }
        />
        { isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList 
            savedMoviesList={ searchRes } 
            onMovieDelete={ onMovieDelete }
          />
        )}
      </main>
      <Footer />
    </section>
  );
}

export default SavedMovies;