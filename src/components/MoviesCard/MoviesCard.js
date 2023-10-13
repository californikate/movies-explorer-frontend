// компонент одной карточки фильма
import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';

import { IMAGE_BASE_URL } from '../../utils/const';
import transformMovieDuration from '../../utils/utils';

function MoviesCard({ movie, onMovieSave, onMovieDelete, savedMovies }) {
  const { pathname } = useLocation();

  const isSaved = pathname !== '/saved-movies' && savedMovies.some((i) => i.movieId === movie.id);

  const handleDeleteClick = () => {
    onMovieDelete(movie);
  }

  const handleSaveClick = () => {
    onMovieSave(movie);
  }

  return (
    <li key={ movie.id } className="movies-card">
      {
        pathname !== '/saved-movies' ? (
          <button 
            onClick={ handleSaveClick } 
            type="button" 
            className={`button movies-card__button ${isSaved ? "movies-card__button_type_saved" : "movies-card__button_type_save"}`
          }>
            {!isSaved && 'Сохранить'}
          </button>
        ) : (
          <button onClick={ handleDeleteClick } type="button" className="button movies-card__button movies-card__button_type_delete" />
        )
      }
      
      <Link to={ movie.trailerLink } target="_blank" className="movies-card__link">
        <img className="movies-card__img" 
          src={ movie.image.url ? `${IMAGE_BASE_URL}${movie.image.url}` : movie.image} 
          alt={ movie.nameRU } 
        />
        <div className="movies-card__info">
          <h2 className="movies-card__title">{ movie.nameRU }</h2>
          <span className="movies-card__duration">{ transformMovieDuration(movie.duration) }</span>
        </div>
      </Link>
    </li>
  );
}

export default MoviesCard;