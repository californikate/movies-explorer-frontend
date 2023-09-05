// компонент, который отвечает за меню навигации на сайте.

import React from 'react';
import './Navigation.css';

import icon from '../../images/icon-main-color.svg';

function Navigation() {
  return (
    <section className="nav">
      <img src={ icon } alt=".открывает профиль пользователя" className="nav__icon nav__icon_color"/>
    </section>
  );
}

export default Navigation;
