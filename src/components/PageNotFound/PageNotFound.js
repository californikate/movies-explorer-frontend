import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return(
    <main className="notfound">
      <div className="notfound__container">
        <h1 className="notfound__header">404</h1>
        <p className="notfound__subtitle">Страница не найдена</p>
        <Link to={"/"} className="notfound__link link">Назад</Link>
      </div>
    </main>
  );
}

export default PageNotFound;