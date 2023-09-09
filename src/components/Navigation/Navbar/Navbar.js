import React from "react";
import './Navbar.css';
import { Link } from "react-router-dom";

function Navbar({ isOpen, onClose }) {
  return(
    <nav className={ `navbar ${ isOpen ? "navbar_opened" : ""}` }>
      <div className={ `navbar__overlay ${ isOpen ? "navbar__overlay_opened" : ""}` } onClick={ onClose } />
      <div className={ `navbar__content ${ isOpen ? "navbar__content_active" : ""}` }>
        <button type="button" className="navbar__close-button" onClick={ onClose }/>
        <ul className="navbar__table">
          <li className="navbar__item">
            <Link to={"/"} className="navbar__item-link">Главная</Link>
          </li>
          <li className="navbar__item">
            <Link to={"/movies"} className="navbar__item-link">Фильмы</Link>
          </li>
          <li className="navbar__item">
            <Link to={"/saved-movies"} className="navbar__item-link">Сохраненные фильмы</Link>
          </li>
        </ul>
        <Link to={"/profile"} className="navbar__profile-link">
          <p className="navbar__profile-text">Аккаунт</p>
          <span className="navbar__profile-icon"/>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;