import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrenUserContext } from '../../contexts/CurrentUserContext';

import { api } from '../../utils/MainApi';
import * as auth from '../../utils/Auth';
import * as moviesApi from '../../utils/MoviesApi';

import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Auth from '../Auth/Auth';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') || false)
  const [allMoviesList, setAllMoviesList] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const navigate = useNavigate();

  // получаем список сохраненных фильмов
  const getSavedMovies = () => {
    api.getSavedMovies()
      .then((movies) => {
        setSavedMoviesList(movies);
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
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/sign-in');
  }
  
  // проверка токена
  function handleTokenCheck() {
    const token = localStorage.getItem('token');

    if(token) {
      auth.getContent(token)
        .then(() => {
          setLoggedIn(true);
          navigate('/movies');
        })
        .catch((err) => {
          localStorage.removeItem('token');;
          console.log(err);
        })
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrenUserContext.Provider value={ currentUser }>
      <div className="App">
        <div className="page">
          <Header loggedIn={ loggedIn } />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={
              <ProtectedRoute 
                loggedIn={ loggedIn }
                element={ Movies }
                currentUser={ currentUser }
                movies={ allMoviesList }
                savedMovies={ savedMoviesList }
                getMovies={ getMovies }
              />
            }/>
            <Route path="/saved-movies" element={
              <ProtectedRoute
                loggedIn={ loggedIn }
                element={ SavedMovies }
                currentUser={ currentUser }
                movies={ savedMoviesList }
                getSavedMovies={ getSavedMovies }
              />
            }/>
            <Route path="/profile" element={
              <ProtectedRoute
                loggedIn={ loggedIn }
                element={ Profile }
              />
            }/>
            <Route path="/signin" element={
              <Auth 
                type="signin" 
                handleAuthorize={ handleAuthorize }
                authTitle={ "Вход" }
              />} 
            />
            <Route path="/signup" element={
              <Auth 
                type="signup" 
                handleRegister={ handleRegister }
                authTitle={ "Регистрация" }
              />} 
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </CurrenUserContext.Provider>
  );
}

export default App;
