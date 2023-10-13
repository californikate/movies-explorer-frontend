//  компонент с информацией о студенте
import './AboutMe.css';
import photo from '../../../images/about-me-photo.jpeg';
import { Link } from 'react-router-dom';

function AboutMe() {
  return(
    <section className="about-me" id="about-me">
      <h2 className="about-me__header">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__wrap">
          <h3 className="about-me__title">Катерина</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 34 года</p>
          <p className="about-me__description">
            Я родилась и живу в Уфе, закончила факультет Государственного и муниципального управления РГГУ. 
            После окончания университета успела поработать как в найме, так и партнером в собственном бизнесе.
            Год назад решила освоить новую профессию, чтобы иметь дополнительные возможности в карьере.
            До настоящего веб-разработчика мне еще далеко, но я очень упорна и кропотлива в своей работе.
          </p>
          <Link to={ "https://github.com/californikate" } target="_blank" className="about-me__link link">
            Github
          </Link>
        </div>
        <img src={ photo } className="about-me__photo" alt="фото студента." />
      </div>
    </section>
  );
}

export default AboutMe;