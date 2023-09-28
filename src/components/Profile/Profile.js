// компонент страницы изменения профиля
import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import './Profile.css';

function Profile({ logOut, isAble, setIsAble, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  // Обработчики изменения инпута обновляют стейт
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditButton = () => {
    setIsAble(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    setIsAble(false);
    onEditProfile({ name, email });
  }

  return(
    <>
      <main className="profile">
        <h1 className="profile__header">Привет, { currentUser.name }!</h1>
        <form onSubmit={ handleSubmit } noValidate className="profile__form">
          <div className="profile__form-wrap">
            <label for="name" className="profile__label">Имя</label>
            <input
              id="name"
              name="name"
              type="text"
              minLength="2"
              maxLength="30"
              placeholder="Имя"
              value={ name || '' }
              onChange={ handleNameChange }
              className="profile__form-input"
              required
              disabled={ !isAble }
            />
          </div>
          <div className="profile__form-wrap">
            <label for="email" className="profile__label">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Почта"
              value={ email || '' }
              onChange={ handleEmailChange }
              className="profile__form-input"
              required
              disabled={ !isAble }
            />
          </div>

          {/* <span className="profile__error-span">При обновлении профиля произошла ошибка.</span> */}

          { !isAble && (
            <ul className="profile__buttons list">
              <li>
                <button onClick={ handleEditButton } type="button" className="profile__edit-button button">Редактировать</button>
              </li>
              <li>
                <button type="button" className="profile__exit-button button" onClick={ logOut }>Выйти из аккаунта</button>
              </li>
          </ul>
          )}

          { isAble && (
            <div className="profile__error">
              
              <button onClick={ handleSubmit } type="submit" className="profile__buttons_type_save button">Сохранить</button>
            </div>
          )}
        </form>
      </main>
    </>
  );
}

export default Profile;