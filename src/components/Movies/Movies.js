// компонент страницы с поиском по фильмам

import React, { useState, useEffect } from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies({ movies, getMovies, savedMovies }) {
  // Блок результатов появляется только после обработки запроса. 
  // Если пользователь ещё ничего не искал, блока с карточками на странице нет. 
  // Как только запрос сделан, данные передаются в стейт-переменную и блок появляется.

  const [query, setQuery] = useState(localStorage.getItem('query') || '');
  const [searchRes, setSearchRes] = useState(JSON.parse(localStorage.getItem('searchRes')) || []);
  const [checkedShorts, setCheckedShorts] = useState(localStorage.getItem('checkedShorts') === 'true' || false);
  const [isSearched, setIsSearched] = useState(false);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateQuery = (newQuery) => {
    setQuery(newQuery);
  };

  const updateShorts = (newValue) => {
    setCheckedShorts(newValue);
  };
  
  // Фильтрация данных на стороне клиента
  // При фильтрации по тексту запроса нужно проверять, есть ли введенные слова в названиях фильма 
  // на русском и английском — поля nameRU и nameEN. При этом на поиск не должен влиять регистр символов.
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
    localStorage.setItem('searchRes', JSON.stringify(filterRes));

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  const handleSearch = async (query, checkedShorts) => {
    setIsLoading(true);
    let filteredMovies = movies;

    if(movies.length === 0) {
      filteredMovies = await getMovies();
    }

    let searchRes;
    if (checkedShorts) {
      filteredMovies = movies.filter((movie) => movie.duration <= 40); //короткометражки до 40мин включительно
      searchRes = filteredMovies.filter((movie) => {
        const movieName = movie.nameRU || movie.nameEN;
        return (
          movieName.toLowerCase().includes(query.toLowerCase())
        );
      });
    } else {
      searchRes= filteredMovies.filter((movie) => {
        const movieName = movie.nameRU || movie.nameEN;
        return (
          movieName.toLowerCase().includes(query.toLowerCase())
        );
      });
    }
    setSearchRes(searchRes);
    setIsSearched(true);
    localStorage.setItem('searchRes', JSON.stringify(searchRes));
    setDisplayedCards();

    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return;
  };

  useEffect(() => {
    localStorage.setItem('query', query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem('checkedShorts', checkedShorts);
  }, [checkedShorts]);

  return(
    <section className="movies">
      <main>
        <SearchForm 
          query={ query }
          setQuery={ updateQuery }
          checkedShorts={ checkedShorts }
          setCheckedShorts={ updateShorts }
          onSearch ={ handleSearch }
          onFilter={ handleFilter }
        />
        { isLoading ? (
          <Preloader />
        ) : !movies || (isSearched && searchRes.length === 0) ? ( 
          <p>Ничего не найдено</p>
        ) : (
          <MoviesCardList 
            moviesList={ searchRes.slice(0, displayedCards) }
            savedMovies={ savedMovies }
            savedMoviesPage={ false }
          />
        )}
        { searchRes === 0 || displayedCards < searchRes.length ? (
          <div className="more__container">
            <button type="button" className="more__button button">
              Ещё
            </button>
          </div>
        ) : null }
      </main>
    </section>
  );
}

export default Movies;