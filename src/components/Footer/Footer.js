// презентационный компонент, который отрисовывает подвал.

import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";

function Footer() {
  return(
    <footer className="footer">
      <div className="footer__container">
        <h3 className="footer__header">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__info">
          <p className="footer__copyright">© {new Date().getFullYear()}</p>
          <nav className="footer__nav">
            <Link
              to={"https://practicum.yandex.ru/"}
              target="_blank"
              className="footer__link"
            >
              Яндекс.Практикум
            </Link>
            <Link
              to={"https://github.com/californikate"}
              target="_blank"
              className="footer__link"
            >
              Github
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer;