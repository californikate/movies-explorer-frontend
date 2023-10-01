import React, { useEffect } from 'react';
import './Register.css';
import Logo from '../Logo/Logo';

import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { EMAIL_REGEX } from '../../utils/const';
import { NAME_REGEX } from '../../utils/const';

function Auth({ authTitle, handleRegister, serverError, setServerError, isLoading }) {
  const {
    register,
    handleSubmit,
    formState: {
      errors, isValid
    }, 
  } = useForm({ mode: "onChange" });

  const handleSubmitForm = (data) => {
    authTitle === 'Регистрация' && handleRegister(data);
  }

  useEffect(() => {
    setTimeout(() => {
      setServerError('');
    }, 1000);
  }, [serverError]);

  return (
    <main className="auth">
      <Logo />
      <h1 className="auth__title">{ authTitle }</h1>
      <form noValidate onSubmit={ handleSubmit(handleSubmitForm) } className="auth__form" action="#">
        <label for="name" className="auth__form-label">Имя</label>
        <input 
          id="name"
          name="name"
          type="text"
          placeholder="Введите имя"
          className={`auth__form-input ${errors.name && "auth__form-input auth__form-input_invalid"}`}
          disabled={ isLoading }
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
        <span isActive={ errors.name } className="auth__form-error" >
          { errors.name ? errors.name.message : '' }
        </span>

        <label for="email" className="auth__form-label">E-mail</label>
        <input 
          id="email"
          name="email"
          type="email"
          placeholder="Введите email"
          className={`auth__form-input ${errors.email && "auth__form-input auth__form-input_invalid"}`}
          disabled={ isLoading }
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
          disabled={ isLoading }
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

        { serverError && <span isActive className="auth__form-error">Что-то пошло не так...</span>}
        
        <button 
          disabled={ isLoading|| !isValid } 
          type="submit" 
          className="auth__button button"
        >
          Зарегистрироваться
        </button>
        <div className="auth__link-wrap">
          <span className="auth__link-span">
            Уже зарегистрированы?
          </span>
          <Link to={"/signin"} className="auth__link link">
            Войти
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Auth;