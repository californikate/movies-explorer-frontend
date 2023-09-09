// компонент страницы изменения профиля
import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();

  return(
    <>
      <Header loggedIn={ true } />

      <section className="profile">
        <h1 className="profile__header">Привет, Виталий!</h1>
        <form className="profile__form">
          <div className="profile__form-wrap">
            <label for="name" className="profile__label">Имя</label>
            <input
              id="name" 
              name="name" 
              type="text"
              minLength="2"
              maxLength="30"
              defaultValue={"Виталий" || ""}
              className="profile__form-input"
              required
              disabled
            />
          </div>
          <div className="profile__form-wrap">
            <label for="email" className="profile__label">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={"pochta@yandex.ru" || ""}
              className="profile__form-input"
              required
              disabled
            />
          </div>
        </form>

        <ul className="profile__buttons">
          <li>
            <button type="button" className="profile__edit-button button">Редактировать</button>
          </li>
          <li>
            <button type="button" className="profile__exit-button" onClick={ () => navigate("/") }>Выйти из аккаунта</button>
          </li>
        </ul>

          
          <button className="profile__buttons_type_save">Сохранить</button>
          <div className="profile__error">
            <span className="profile__error-span">При обновлении профиля произошла ошибка.</span>
            <button className="profile__buttons_type_error">Сохранить</button>
          </div>
          
      </section>
    </>
  );
}

export default Profile;