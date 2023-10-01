// компонент страницы «О проекте». Он будет содержать только 
// презентационные компоненты и в будущем, за исключением шапки навигации
import React from 'react';
import './Main.css';

import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import NavTab from './NavTab/NavTab';
import Portfolio from './Portfolio/Portfolio';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';
import Footer from '../Footer/Footer';

function Main() {
  return(
    <>
      <main>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </> 
  )
}

export default Main;