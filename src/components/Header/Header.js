// компонент, который отрисовывает шапку сайта на страницу. 
// Шапка на главной странице, как и на других страницах, должна менять отображение, 
// если пользователь авторизован или не авторизован. 
// Такое поведение нужно сразу предусмотреть в вёрстке, даже несмотря на то, 
// что сама авторизация ещё не реализована.

import React from "react";
import './Header.css';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn }) {
  return(
    <header className="header">
      <div className="header__container">
        <Link to={"/"} className="header__logo-link">
          <img className="header__logo" src={ logo } alt="логотип сайта." />
        </Link>
        <div className="header__nav">
        
        </div>
      </div>
    </header>
  )
}

export default Header;