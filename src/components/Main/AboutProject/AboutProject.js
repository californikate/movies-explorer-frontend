// компонент с описанием дипломного проекта
import './AboutProject.css';

function AboutProject() {
  return(
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__header">О проекте</h2>
        <ul className="about-project__table">
          <li className="about-project__table-item">
            <h3 className="about-project__table-title">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__table-subtitle">
              Составление плана, работу над бэкендом, вёрстку, добавление 
              функциональности и финальные доработки.
            </p>
          </li>
          <li className="about-project__table-item">
            <h3 className="about-project__table-title">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__table-subtitle">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно 
              было соблюдать, чтобы успешно защититься.
            </p>
          </li>
        </ul>
        <ul className="about-project__timeline">
            <li className="about-project__timeline-item about-project__timeline-item_one">1 неделя</li>
            <li className="about-project__timeline-item about-project__timeline-item_four">4 недели</li>
            <li className="about-project__timeline-item_name">Back-end</li>
            <li className="about-project__timeline-item_name">Front-end</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutProject;