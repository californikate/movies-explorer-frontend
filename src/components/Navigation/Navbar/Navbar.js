import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isOpen, onClose }) {
  return(
    <nav className={ `navbar ${ isOpen ? "navbar_opened" : ""}` }>
      <div className={ `navbar__overlay ${ isOpen ? "navbar__overlay_opened" : ""}` } onClick={ onClose } />
      <div className={ `navbar__content ${ isOpen ? "navbar__content_active" : ""}` }>
        <button type="button" className="navbar__close-button button" onClick={ onClose }/>
        <ul className="navbar__table list">
          <li className="navbar__item">
            <NavLink to="/" className="navbar__item-link link">Главная</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/movies" className="navbar__item-link link">Фильмы</NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/saved-movies" className="navbar__item-link link">Сохраненные фильмы</NavLink>
          </li>
        </ul>
        <Link to={"/profile"} className="navbar__profile-link link">
          <p className="navbar__profile-text">Аккаунт</p>
          <span className="navbar__profile-icon"/>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;