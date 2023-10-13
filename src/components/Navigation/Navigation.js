// компонент, который отвечает за меню навигации на сайте.

import React from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { useState  } from 'react';

import './Navigation.css';
import Navbar from './Navbar/Navbar';

function Navigation() {
  const { pathname } = useLocation();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  return (
    <nav className="nav">
      <ul className="nav__table list">
        <li>
          <NavLink to={"/movies"} className="nav__table-item link">Фильмы</NavLink>
        </li>
        <li>
          <NavLink to={"/saved-movies"} className="nav__table-item link">Сохраненные фильмы</NavLink>
        </li>
      </ul>
      <Link to={"/profile"} className="nav__profile-link link">
        <p className="nav__profile-text">Аккаунт</p>
        <span className={ pathname === "/" ? "nav__icon" : "nav__icon nav__icon_type_bw" }/>
      </Link>

      <button onClick={ setIsOpenPopup } type="button" className="nav__burger-button button"/>
      <Navbar isOpen={ isOpenPopup } onClose={() => setIsOpenPopup(false)} />
    </nav>
  );
}

export default Navigation;
