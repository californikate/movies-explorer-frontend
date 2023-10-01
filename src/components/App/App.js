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

  const getUserInfo = () => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => setServerError(err));
    }
  }

  // получаем список сохраненных фильмов
  const getSavedMovies = () => {
    api.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => setServerError(err));
  }
  
  // получаем список всех фильмов
  const getMovies = () => {
    setIsLoading(true);
    return moviesApi.getMovies()
      .then((movies) => {
        setAllMoviesList(movies);
        return movies;
      })
      .catch((err) => setServerError(err))
      .finally(() => setIsLoading(false))
  }

  // регистрация
  function handleRegister(data) {
    auth.register(data)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => setServerError(err));
  }

  // авторизация
  function handleAuthorize({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => setServerError(err));
  }

  // выход из аккаунта
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('query');
    localStorage.removeItem('checkedShorts');
    localStorage.removeItem('searchRes');

    setLoggedIn(false);
    setCurrentUser({});
    navigate('/');
  }
  
  // проверка токена
  function handleTokenCheck() {
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
  function handleEditProfile({name, email}) {
    api.setUserInfo({ name, email })
    .then(({ name, email }) => {
      setCurrentUser({ name, email });
      setIsAble(false);
    })
    .catch((err) => {
      setServerError(err);
    })
  }

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
              />
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRoute
                loggedIn={ loggedIn }
                element={ SavedMovies }
                currentUser={ currentUser }
                movies={ savedMovies }
                getSavedMovies={ getSavedMovies }
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
              />
            }/>
            <Route path="/signin" element={
              <Auth 
                handleAuthorize={ handleAuthorize }
                authTitle={ "Вход" }
                serverError={ serverError }
              />} 
            />
            <Route path="/signup" element={
              <Register 
                handleRegister={ handleRegister }
                authTitle={ "Регистрация" }
                serverError={ serverError }
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
