// компонент страницы с поиском по фильмам

import React, { useState, useEffect } from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

import { SHORTS_LENGTH, SCREEN_WIDTH, DISPLAYED_CARDS, CARDS_NUMBER } from '../../utils/const';

function Movies({ movies, getMovies, savedMovies, isLoading, onMovieSave }) {
  // Блок результатов появляется только после обработки запроса. 
  // Если пользователь ещё ничего не искал, блока с карточками на странице нет. 
  // Как только запрос сделан, данные передаются в стейт-переменную и блок появляется.

  const [query, setQuery] = useState(localStorage.getItem('query') || '');
  const [searchRes, setSearchRes] = useState(JSON.parse(localStorage.getItem('searchRes')) || []);
  const [checkedShorts, setCheckedShorts] = useState(localStorage.getItem('checkedShorts') === 'true' || false);
  const [isSearched, setIsSearched] = useState(false);
  const [displayedCards, setDisplayedCards] = useState(getDisplayedCards());

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
    localStorage.setItem('searchRes', JSON.stringify(filterRes));
  }
  
  // поиск фильмов
  // Если карточки уже были отображены на странице в блоке результатов, то клик по чекбоксу «Короткометражки» 
  // должен приводить к новой фильтрации всех фильмов с учётом нового состояния чекбокса и введённого текста запроса в форме поиска. 
  const handleSearch = async (query, checkedShorts) => {
    let filteredMovies = movies;

    if(movies.length === 0) {
      filteredMovies = await getMovies();
    }

    let searchRes;
    if (checkedShorts) {
      filteredMovies = movies.filter((movie) => movie.duration <= SHORTS_LENGTH); //короткометражки до 40мин включительно
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
    setDisplayedCards(getDisplayedCards());

    return;
  };

  // Ширина 1280px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
  // Ширина 768px — 4 ряда карточек. Кнопка «Ещё» загружает дополнительный ряд карточек.
  // Ширина от 320px до 480px — 5 карточек по 1 в ряд. Кнопка «Ещё» загружает по 2 карточки.
  function getDisplayedCards() {
    const screenWidth = window.innerWidth;
    if (screenWidth > SCREEN_WIDTH.TABLET) {
      return DISPLAYED_CARDS.DESKTOP;
    } else if (screenWidth <= SCREEN_WIDTH.TABLET && screenWidth > SCREEN_WIDTH.MOBILE) {
      return DISPLAYED_CARDS.TABLET;
    } else {
      return DISPLAYED_CARDS.MOBILE;
    }
  }

  const handleMoreButton = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > SCREEN_WIDTH.TABLET) {
      setDisplayedCards((displayedCards) => displayedCards + CARDS_NUMBER.DESKTOP);
    } else if (screenWidth <= SCREEN_WIDTH.TABLET && screenWidth > SCREEN_WIDTH.MOBILE) {
      setDisplayedCards((displayedCards) => displayedCards + CARDS_NUMBER.TABLET);
    } else {
      setDisplayedCards((displayedCards) => displayedCards + CARDS_NUMBER.MOBILE);
    }
  };
  
  // слушатель зависимости между шириной экрана устройства и количеством отображаемых и подгружаемых карточек
  useEffect(() => {
    function handleResize() {
      setDisplayedCards(getDisplayedCards());
    }
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);  

  useEffect(() => {
    localStorage.setItem('query', query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem('checkedShorts', checkedShorts);
  }, [checkedShorts]);

  // useEffect(() => {
  //   handleFilter(query, checkedShorts);
  // }, [movies, query, checkedShorts]);

  useEffect(() => {
    handleSearch(query, checkedShorts);
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

        { isLoading ? <Preloader /> : '' }

        { !movies || (isSearched && searchRes.length === 0) ? ( 
          <div className="movies__wrap">
            <p className="movies__empty">Ничего не найдено</p>
          </div>
        ) : (
          <MoviesCardList 
            moviesList={ searchRes.slice(0, displayedCards) }
            savedMovies={ savedMovies }
            onMovieSave={ onMovieSave }
          />
        )}

        { searchRes === 0 || displayedCards < searchRes.length ? (
          <div className="more__container">
            <button onClick={ handleMoreButton } type="button" className="more__button button">
              Ещё
            </button>
          </div>
        ) : null }

      </main>
      <Footer />
    </section>
  );
}

export default Movies;