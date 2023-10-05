// компонент страницы с сохранёнными карточками фильмов

import React, { useState, useEffect } from 'react';
import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

import { SHORTS_LENGTH } from '../../utils/const';

function SavedMovies({ movies, onMovieDelete }) {
  const [query, setQuery] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [checkedShorts, setCheckedShorts] = useState(false);
  const [isSearched, setIsSearched] = useState(false);

  const handleFilter = (query, checkedShorts) => {
    let filteredMovies = movies;

    if (checkedShorts) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= SHORTS_LENGTH); //короткометражки до 40мин включительно
    }

    const filterRes = filteredMovies.filter((movie) => {
      const movieName = movie.nameRU || movie.nameEN;
      return (
        movieName.toLowerCase().includes(query.toLowerCase())
      );
    });

    setSearchRes(filterRes);
  }

  const handleSearch = (newQuery, newCheckedShorts) => {
    setCheckedShorts(newCheckedShorts);

    const filteredMovies = movies.filter((movie) => {
      const includesQuery =
        movie.nameRU.toLowerCase().includes(newQuery.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(newQuery.toLowerCase());
        
      if (newCheckedShorts) {
        return includesQuery && movie.duration <= SHORTS_LENGTH;
      } else {
        return includesQuery;
      }
    });

    setSearchRes(filteredMovies);
    setIsSearched(true);
  };

  useEffect(() => {
    handleFilter(query, checkedShorts);
  }, [movies, query, checkedShorts]);

  return(
    <section className="saved-movies">
      <main>
        <SearchForm 
          query={ query }
          setQuery={ setQuery }
          checkedShorts={ checkedShorts }
          setCheckedShorts={ setCheckedShorts }
          onSearch ={ handleSearch }
          onFilter={ handleFilter }
        />
        { !movies || (isSearched && searchRes.length === 0) ? ( 
          <div className="movies__wrap">
            <p className="movies__empty">Ничего не найдено</p>
          </div>
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