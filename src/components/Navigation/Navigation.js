// компонент, который отвечает за меню навигации на сайте.

import React from 'react';
import './Navigation.css';

import icon from '../../images/icon-main-color.svg';
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <section className="nav">
      <ul className="nav__table">
        <li className="nav__table-item">Фильмы</li>
        <li className="nav__table-item">Сохраненные фильмы</li>
      </ul>
      <Link to={"/profile"} className="nav__profile-link">
        <p className="nav__profile-text">Аккаунт</p>
        <span className="nav__icon"/>
      </Link>
      
    </section>
  );
}

export default Navigation;
