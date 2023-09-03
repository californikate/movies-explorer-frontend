// компонент с навигацией по странице «О проекте»
import './NavTab.css';

function NavTab() {
  return(
    <section className="navtab">
      <div className="navtab__container">
        <ul className="navtab__table">
          <li className="navtab__table-item">
            <a href="#about-project" className="navtab__table-link">О проекте</a>
          </li>
          <li className="navtab__table-item">
            <a href="#techs" className="navtab__table-link">Технологии</a>
          </li>
          <li className="navtab__table-item">
            <a href="#about-me" className="navtab__table-link">Студент</a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default NavTab;