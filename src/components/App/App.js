import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { api } from '../../utils/MainApi';
import * as auth from '../../utils/Auth';
import * as moviesApi from '../../utils/MoviesApi';

import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Auth from '../Auth/Auth';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') || false)
  const [allMoviesList, setAllMoviesList] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isAble, setIsAble] = useState(false);

  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  // получаем список сохраненных фильмов
  const getSavedMovies = () => {
    api.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => setServerError(err))
      
  }
  
  // получаем список всех фильмов
  const getMovies = () => {
    setIsLoading(true);
    return moviesApi.getMovies()
      .then((movies) => {
        setAllMoviesList(movies);
        return movies;
      })
      .catch((err) => {
        console.log(err);
        setServerError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
      .finally(() => setIsLoading(false))
  }
  
  // кнопка управления сохранением фильма
  const handleMovieSave = (movie) => {
    const isSaved = savedMovies.some((item) => item.movieId === movie.id);

    if (!isSaved) {
      api.saveMovie(movie)
        .then((savedMovie) => {
          setSavedMovies([...savedMovies, savedMovie]);
        })
        .catch((err) => setServerError(err));
    } else {
      const movieToDelete = savedMovies.find(
        (item) => item.movieId === movie.id
      );

      if (movieToDelete && movieToDelete._id) {
        const movieId = savedMovies.find(
          (item) => item.movieId === movie.id
        )._id;

        api.deleteMovie(movieId)
          .then(() => {
            setSavedMovies((movies) => 
              movies.filter((item) => item._id !== movieId)
            );
          })
          .catch((err) => setServerError(err));
      } else {
        setServerError(serverError);
      }
    }
  }

  // function handleMovieDelete(movie) {
  //   api.deleteMovie(movie)
  //     .then(() => {
  //       const newArray = savedMovies.filter((item) => item._id !== movieId);
  //       setSavedMovies(newArray);
  //     })
  //     .catch((err) => setServerError(err));
  // }
  
  // кнопка удаления фильма
  const handleMovieDelete = (movie) => {
    return api.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies((savedMovies) => {
          savedMovies.filter((item) => item._id !== movie._id)
        })
      })
      .catch((err) => setServerError(err));
  }

  const getUserInfo = () => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => setServerError(err));
    }
  }

  // регистрация
  const handleRegister = ({ name, email, password }) => {
    setIsLoading(true);
    auth.register({ name, email, password })
      .then((data) => {
        console.log(data);
        handleAuthorize({ email, password });
      })
      .catch((err) => setServerError(err))
      .finally(() => setIsLoading(false))
  }

  // авторизация
  const handleAuthorize = ({ email, password }) => {
    setIsLoading(true);
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => setServerError(err))
      .finally(() => setIsLoading(false))
  }

  // выход из аккаунта
  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/');
  }
  
  // проверка токена
  const handleTokenCheck = () => {
    const token = localStorage.getItem('token');

    if(token) {
      auth.getContent(token)
        .then(() => {
          setLoggedIn(true);
          getSavedMovies();
        })
        .catch((err) => {
          localStorage.removeItem('token');
          setServerError(err);
        })
    }
  }

  // редактирование профиля
  const handleEditProfile = ({name, email}) => {
    setIsLoading(true);
    api.setUserInfo({ name, email })
    .then(({ name, email }) => {
      setCurrentUser({ name, email });
      setIsAble(false);
    })
    .catch((err) => {
      setServerError(err);
    })
    .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getSavedMovies();
  }, [loggedIn]);

  useEffect(() => {
    getUserInfo();
  }, [loggedIn]);

  useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="App">
        <div className="page">
          { pathname === "/" && <Header loggedIn={ loggedIn }/> }
          { pathname === "/movies" && <Header loggedIn={ loggedIn }/>}
          { pathname === "/saved-movies" && <Header loggedIn={ loggedIn }/>}
          { pathname === "/profile" && <Header loggedIn={ loggedIn }/>}

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={
              <ProtectedRoute 
                loggedIn={ loggedIn }
                element={ Movies }
                currentUser={ currentUser }
                movies={ allMoviesList }
                savedMovies={ savedMovies }
                getMovies={ getMovies }
                isLoading={ isLoading }
                onMovieSave={ handleMovieSave }               
              />
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRoute
                loggedIn={ loggedIn }
                element={ SavedMovies }
                currentUser={ currentUser }
                movies={ savedMovies }
                getSavedMovies={ getSavedMovies } 
                onMovieDelete={ handleMovieDelete }  
              />
            }/>
            <Route path="/profile" element={
              <ProtectedRoute
                loggedIn={ loggedIn }
                element={ Profile }
                logOut={ handleLogout }
                getUserInfo={ getUserInfo }
                currentUser={ currentUser }
                isAble={ isAble }
                setIsAble={ setIsAble }
                onEditProfile={ handleEditProfile }
                serverError={ serverError }
                setServerError={ setServerError }
                isLoading={ isLoading }
              />
            }/>
            <Route path="/signin" element={
              loggedIn && pathname === "/signin" ? navigate(-1) :
              <Auth 
                handleAuthorize={ handleAuthorize }
                authTitle={ "Вход" }
                serverError={ serverError }
                setServerError={ setServerError }
                isLoading={ isLoading }
              />} 
            />
            <Route path="/signup" element={
              loggedIn && pathname === "/signup" ? navigate(-1) :
              <Register 
                handleRegister={ handleRegister }
                authTitle={ "Регистрация" }
                serverError={ serverError }
                setServerError={ setServerError }
                isLoading={ isLoading }
              />} 
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
