//  компонент с использованными технологиями

function Techs() {
  return(
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__header">Технологии</h2>
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, 
          которые применили в дипломном проекте.
        </p>
        <ul className="techs__table">
          <li className="techs__table-item">HTML</li>
          <li className="techs__table-item">CSS</li>
          <li className="techs__table-item">JS</li>
          <li className="techs__table-item">React</li>
          <li className="techs__table-item">Git</li>
          <li className="techs__table-item">Express.js</li>
          <li className="techs__table-item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;