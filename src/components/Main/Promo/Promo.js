// компонент с вёрсткой баннера страницы «О проекте»
import './Promo.css';

function Promo() {
  return(
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__header">Учебный проект студента факультета Веб-разработки.</h1>
      </div>
    </section>
  );
}

export default Promo;