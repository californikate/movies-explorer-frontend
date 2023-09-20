import React from 'react';
import './App.css';

import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrenUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';

import { api } from '../../utils/MainApi';
import * as auth from '../../utils/Auth';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Auth from '../Auth/Auth';
import PageNotFound from '../PageNotFound/PageNotFound';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleRegister({ name, email, password }) {
    auth.register(name, email, password)
      .then(() => {
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAuthorize({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setLoggedIn(true);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setCurrentUser({});
    navigate('/sign-in');
  }

  function handleTokenCheck() {
    const token = localStorage.getItem('token');

    if(token) {
      auth.getContent(token)
        .then((res) => {
          setLoggedIn(true);
          navigate('/movies');
        })
        .catch((err) => {
          localStorage.removeItem('token');;
          console.log(err);
        })
    }
  }

  return (
    <CurrenUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <div className="page">
          <main className="main">
            <Routes>
              <Route path="/" element={<Main loggedIn={ loggedIn }/>} />
              <Route path="/movies" element={
                <ProtectedRoute 
                  loggedIn={ loggedIn }
                  element={ Movies }
                />
              }/>
              <Route path="/saved-movies" element={
                <ProtectedRoute
                  loggedIn={ loggedIn }
                  element={ SavedMovies }
                />
              }/>
              <Route path="/profile" element={
                <ProtectedRoute
                  loggedIn={ loggedIn }
                  element={ Profile }
                />
              }/>
              <Route path="/signin" element={<Auth type="signin" handleAuthorize={ handleAuthorize } />} />
              <Route path="/signup" element={<Auth type="signup" handleRegister={ handleRegister } />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </CurrenUserContext.Provider>
    
  );
}

export default App;
