import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { api } from '../../utils/MainApi';
import * as auth from '../../utils/Auth';
import * as moviesApi from '../../utils/MoviesApi';

import './App.css';

//import Header from '../Header/Header';
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

  const navigate = useNavigate();

  const getUserInfo = () => {
    if (loggedIn) {
      api.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => console.log(err))
    }
  }

  // получаем список сохраненных фильмов
  const getSavedMovies = () => {
    api.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  }
  
  // получаем список всех фильмов
  const getMovies = () => {
    return moviesApi.getMovies()
      .then((movies) => {
        setAllMoviesList(movies);
        return movies;
      })
      .catch((err) => console.log(err))
  }

  // регистрация
  function handleRegister(data) {
    auth.register(data)
      .then((data) => {
        console.log(data)
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        navigate('/movies');
      })
      .catch((err) => {
        console.log(err);
      })
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
      .catch((err) => {
        console.log(err);
      })
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
          navigate('/movies');
        })
        .catch((err) => {
          localStorage.removeItem('token');;
          console.log(err);
        })
    }
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
          {/* <Header loggedIn={ loggedIn } /> */}
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
              />
            }/>
            <Route path="/signin" element={
              <Auth 
                handleAuthorize={ handleAuthorize }
                authTitle={ "Вход" }
              />} 
            />
            <Route path="/signup" element={
              <Register 
                handleRegister={ handleRegister }
                authTitle={ "Регистрация" }
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
