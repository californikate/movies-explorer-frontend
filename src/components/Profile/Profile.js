// компонент страницы изменения профиля
import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

function Profile({ logOut, getUserInfo }) {
  const currentUser = useContext(CurrentUserContext);
  
  return(
    <>
      <main className="profile">
        <h1 className="profile__header">Привет, { currentUser.name }!</h1>
        <form className="profile__form">
          <div className="profile__form-wrap">
            <label for="name" className="profile__label">Имя</label>
            <input
              id="name" 
              name="name" 
              type="text"
              minLength="2"
              maxLength="30"
              placeholder="Виталий"
              value={ currentUser.name }
              className="profile__form-input"
              required
              //disabled
            />
          </div>
          <div className="profile__form-wrap">
            <label for="email" className="profile__label">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="pochta@yandex.ru"
              className="profile__form-input"
              required
              //disabled
            />
          </div>
        </form>

        <ul className="profile__buttons list">
          <li>
            <button type="submit" className="profile__edit-button button">Редактировать</button>
          </li>
          <li>
            <button type="button" className="profile__exit-button button" onClick={ logOut }>Выйти из аккаунта</button>
          </li>
        </ul>

            <div className="profile__error">
              <span className="profile__error-span">При обновлении профиля произошла ошибка.</span>
              <button type="submit"  className="profile__buttons_type_error button">Сохранить</button>
            </div>

            <button type="submit"  className="profile__buttons_type_save button">Сохранить</button>
          
          
          
      </main>
    </>
      
  );
}

export default Profile;