// компонент со ссылками на другие проекты
import { Link } from 'react-router-dom';
import './Portfolio.css';

function Portfolio() {
  return(
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__header">Портфолио</h2>
        <ul className="portfolio__table list">
          <li className="portfolio__table-item">
            <Link to={"https://californikate.github.io/how-to-learn/"} target="_blank" className="portfolio__table-link link">
              Статичный сайт
              <span className="portfolio__table-icon">↗</span>
            </Link>
          </li>
          <li className="portfolio__table-item">
            <Link to={"https://californikate.github.io/russian-travel/"} target="_blank" className="portfolio__table-link link">
              Адаптивный сайт
              <span className="portfolio__table-icon">↗</span>
            </Link>
          </li>
          <li className="portfolio__table-item">
            <Link to={"https://californikate.github.io/react-mesto-api-full-gha/"} target="_blank" className="portfolio__table-link link">
              Одностраничное приложение
              <span className="portfolio__table-icon">↗</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;