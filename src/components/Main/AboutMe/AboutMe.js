//  компонент с информацией о студенте
import './AboutMe.css';
import photo from '../../../images/about-me-photo.svg';
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
            Я родился и живу в Саратове, закончил факультет экономики СГУ. 
            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
            После того, как прошёл курс по веб-разработке, начал заниматься 
            фриланс-заказами и ушёл с постоянной работы.
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