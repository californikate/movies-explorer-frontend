// компонент, который отвечает за меню навигации на сайте.

import React from 'react';
import './Navigation.css';
import { Link, useLocation } from "react-router-dom";
import { useState  } from 'react';

import Navbar from './Navbar/Navbar';

function Navigation() {
  const { pathname } = useLocation();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <nav className="nav">
      <ul className="nav__table">
        <li>
          <Link to={"/movies"} className="nav__table-item">Фильмы</Link>
        </li>
        <li>
          <Link to={"/saved-movies"} className="nav__table-item">Сохраненные фильмы</Link>
        </li>
      </ul>
      <Link to={"/profile"} className="nav__profile-link">
        <p className="nav__profile-text">Аккаунт</p>
        <span className={ pathname === "/" ? "nav__icon" : "nav__icon nav__icon_type_bw" }/>
      </Link>

      <button onClick={ setIsOpenPopup } type="button" className="nav__burger-button"/>
      <Navbar isOpen={ isOpenPopup } onClose={() => setIsOpenPopup(false)} />
    </nav>
  );
}

export default Navigation;
