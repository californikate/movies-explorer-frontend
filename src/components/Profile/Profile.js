// компонент страницы изменения профиля
import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from 'react-hook-form';

import { NAME_REGEX } from '../../utils/const';
import { EMAIL_REGEX } from '../../utils/const';

import './Profile.css';

function Profile({ logOut, isAble, setIsAble, onEditProfile, serverError }) {
  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors, isValid
    },
  } = useForm({ mode: "onChange" });

  const nameInput = watch('name');
  const emailInput = watch('email');
  const [formValidation, setFormValidation] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const isSameForm = nameInput === currentUser.name && emailInput === currentUser.email;

    setFormValidation(!isSameForm);
  }, [nameInput, emailInput, currentUser]);

  const handleEditButton = () => {
    setIsAble(true);
  };

  const handleSubmitForm = ({name, email}) => {
    setIsAble(false);
    setSuccessMessage('Данные успешно обновлены');
    onEditProfile({name, email});
  }

  return(
    <>
      <main className="profile">
        <h1 className="profile__header">Привет, { currentUser.name }!</h1>
        <form onSubmit={ handleSubmit(handleSubmitForm) }  noValidate className="profile__form">
          <div className="profile__form-wrap">
            <label for="name" className="profile__label">Имя</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Имя"
              defaultValue={ currentUser.name }
              className="profile__form-input"
              disabled={ !isAble }
              {...register('name', {
                required: 'Необходимо заполнить',
                pattern: {
                  value: NAME_REGEX,
                  message: 'Поле имя может содержать только латиницу, кириллицу, пробел или дефис'
                },
                minLength: {
                  value: 2,
                  message: 'Минимум 2 символа'
                },
                maxLength: {
                  value: 30,
                  message: 'Максимум 30 символов'
                }
              })}
            />
          </div>
          <span isActive={ errors.name } className="profile__error-span" >
            { errors.name ? errors.name.message : '' }
          </span>

          <div className="profile__form-wrap">
            <label for="email" className="profile__label">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Почта"
              defaultValue={ currentUser.email }
              className="profile__form-input"
              disabled={ !isAble }
              {...register('email', {
                required: 'Необходимо заполнить',
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Поле email не соответствует шаблону электронной почты'
                }
              })}
            />
          </div>
          <span isActive={ errors.email } className="profile__error-span" >
            { errors.email ? errors.email.message : '' }
          </span>

          { serverError && <span isActive className="profile__error-span">При обновлении профиля произошла ошибка</span>}
          { successMessage && <span isActive className="profile__success-span">{ successMessage }</span>}
        
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
              <button 
                disabled={ !formValidation || !isValid } 
                onClick={ handleSubmit(handleSubmitForm) } 
                type="submit" 
                className="profile__buttons_type_save button"
              >
                Сохранить
              </button>
            </div>
          )}
        </form>
      </main>
    </>
  );
}

export default Profile;