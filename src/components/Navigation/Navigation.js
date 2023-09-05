// компонент, который отвечает за меню навигации на сайте.

import React from 'react';
import './Navigation.css';
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const { pathname } = useLocation();

  return (
    <section className="nav">
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
    </section>
  );
}

export default Navigation;
