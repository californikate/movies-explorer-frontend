import React from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Auth from '../Auth/Auth';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Auth type="signin" />} />
          <Route path="/signup" element={<Auth type="signup" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
