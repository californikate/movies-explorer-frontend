import React from 'react';
import './App.css';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrenUserContext } from '../../contexts/CurrentUserContext';
import { useState, useEffect } from 'react';

import { api } from '../../utils/MainApi';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Auth from '../Auth/Auth';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') || false);
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleTokenCheck() {
    const token = localStorage.getItem('token');

    if(token) {
      api.checkToken(token)
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

  return (
    <CurrenUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <div className="page">
          <main className="main">
            <Routes>
              <Route path="/" element={<Main loggedIn={ loggedIn }/>} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/saved-movies" element={<SavedMovies />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signin" element={<Auth type="signin" />} />
              <Route path="/signup" element={<Auth type="signup" />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </main>
        </div>
      </div>
    </CurrenUserContext.Provider>
    
  );
}

export default App;
