import React from 'react';
import './Auth.css';
import Logo from '../Logo/Logo';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { EMAIL_REGEX } from '../../utils/const';

function Auth({ authTitle, handleAuthorize, serverError }) {
  const {
    register,
    handleSubmit,
    formState: {
      errors, isValid
    }, 
  } = useForm();

  const handleSubmitForm = (data) => {
    authTitle === 'Вход' && handleAuthorize(data);
  }
  
  return (
    <main className="auth">
      <Logo />
      <h1 className="auth__title">{ authTitle }</h1>
      <form noValidate onSubmit={ handleSubmit(handleSubmitForm) } className="auth__form" action="#">
        <label for="email" className="auth__form-label">E-mail</label>
        <input 
          id="email"
          name="email"
          type="email"
          placeholder="Введите email"
          className={`auth__form-input ${errors.email && "auth__form-input auth__form-input_invalid"}`}
          {...register('email', {
            required: 'Необходимо заполнить',
            pattern: {
              value: EMAIL_REGEX,
              message: 'Поле email не соответствует шаблону электронной почты'
            }
          })}
        />
        <span isActive={ errors.email } className="auth__form-error" >
          { errors.email ? errors.email.message : '' }
        </span>

        <label for="password" className="auth__form-label">Пароль</label>
        <input
          id="password" 
          name="password" 
          type="password"
          placeholder="••••••••••••••"
          className={`auth__form-input ${errors.password && "auth__form-input auth__form-input_invalid"}`}
          {...register('password', {
            required: 'Необходимо заполнить',          
            minLength: {
              value: 6,
              message: 'Минимум 6 символов'
            },
            maxLength: {
              value: 30,
              message: 'Максимум 30 символов'
            }
          })}
        />
        <span isActive={ errors.password } className="auth__form-error" >
          { errors.password ? errors.password.message : '' }
        </span>
        
        { serverError && <span isActive className="auth__form-error">Неправильные почта или пароль</span>}

        <button 
          disabled={ !isValid } 
          type="submit" 
          className="auth__button auth__button_type_signin button"
        >
          Войти
        </button>
        <div className="auth__link-wrap">
          <span className="auth__link-span">
            Еще не зарегистрированы?
          </span>
          <Link to={"/signup"} className="auth__link link">
            Регистрация
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Auth;