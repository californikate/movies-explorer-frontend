// компонент одной карточки фильма
import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ movie, onMovieSave, onMovieDelete, savedMovies }) {
  const { pathname } = useLocation();

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  const isSaved = pathname !== '/saved-movies' && savedMovies.some((item) => item.movieId === movie.id);

  const handleDeleteClick = () => {
    onMovieDelete(movie);
  }

  const handleSaveClick = () => {
    onMovieSave(movie);
  }

  return (
    <article className="movies-card">
      {
        pathname !== '/saved-movies' ? (
          <button 
            onClick={ handleSaveClick } 
            type="button" 
            className={`button movies-card__button ${isSaved ? "movies-card__button_type_saved" : "movies-card__button_type_save"}`
          }>{!isSaved && 'Сохранить'}</button>
        ) : (
          <button onClick={ handleDeleteClick } type="button" className="button movies-card__button movies-card__button_type_delete" />
        )
      }
      
      <Link to={ movie.trailerLink } target="_blank" className="movies-card__link link">
        <img className="movies-card__img" src={ movie.image.url ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={ movie.nameRU } />
        <div className="movies-card__info">
          <h2 className="movies-card__title">{ movie.nameRU }</h2>
          <span className="movies-card__duration">{ !!hours && `${hours}ч` } {`${minutes}м` }</span>
        </div>
      </Link>
    </article>
  );
}

export default MoviesCard;