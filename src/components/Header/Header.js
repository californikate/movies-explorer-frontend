// компонент, который отрисовывает шапку сайта на страницу. 

import React from 'react';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  const { pathname } = useLocation();

  return(
    <header className={ pathname === "/" ? "header" : "header header_theme_bw" }>
      <div className="header__container">
        <Logo />

        { loggedIn ? (
          <Navigation />
        ) : (
          <nav className="header_nav">
            <Link to="/signup" className="header__link link">Регистрация</Link>
            <Link to="/signin" className="header__button button">Войти</Link>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header;